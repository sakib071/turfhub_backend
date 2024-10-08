import { sendEmail } from './../../utils/sendEmail'
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../config'
// import { verifyToken } from '../Auth/auth.utils'
import AppError from '../../errors/AppError'
import { TUser } from './user.interface'
import { User } from './user.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { Otp } from '../Otp/otp.model'

// const updateUserDB = async (payload: TUser) =>{

// }

const sendEmailTemplate = async function (email: string, otp: string) {
  const subject = `Your OTP Code for Verification`
  const emailContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; text-align: center; color: #333;"><h2 style="color: #4CAF50;">Your OTP Code</h2><h2 style="font-size: 28px; font-weight: bold; color: #000;">${otp}</h2><p style="font-size: 16px;">Please enter this code to complete your process. If you did not request this, please ignore this email.</p><p style="font-size: 12px; color: #999;">Thank you!</p></div>`

  sendEmail(email, emailContent, subject)
}

const createUserDB = async (payload: TUser) => {
  // create a user object
  const isUserExistsByEmail = await User.isUserExistsByEmail(payload.email)
  if (isUserExistsByEmail && isUserExistsByEmail.isVerified) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User already exists with this email',
    )
  }
  //if password is not given , use deafult password
  payload.password = payload.password || (config.default_password as string)

  //set Stuff email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // create a user (transaction-1)

    const generateOtp = Math.floor(100000 + Math.random() * 900000).toString()

    const isUserExistsByEmail = await User.isUserExistsByEmail(payload.email)

    if (!isUserExistsByEmail) {
      const newUser = await User.create([payload], { session }) // array
      await Otp.create({ user_id: newUser[0]._id, otp: generateOtp })

      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
      }
      await sendEmailTemplate(newUser[0].email, generateOtp)
    } else {
      await Otp.create({ user_id: isUserExistsByEmail?._id, otp: generateOtp })

      await sendEmailTemplate(isUserExistsByEmail.email, generateOtp)
    }

    await session.commitTransaction()
    await session.endSession()

    return 'success'
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const changeStatus = async (id: string, payload: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { status: payload },
    { new: true },
  )
  return result
}

const updateUserDB = async (id: string, payload: Partial<TUser>) => {
  const { email, role, ...updatedPayload } = payload

  // Check if the name is being updated
  if (updateUserDB?.name == '') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Name cannot be empty')
  }

  // Check if the email is being updated
  if (email) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email cannot be updated')
  }

  // Check if the role is being updated
  if (role) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Role cannot be updated')
  }
  const result = await User.findByIdAndUpdate({ _id: id }, updatedPayload, {
    new: true,
    runValidators: true,
  })
  return { user: result }
}

const updateUserRoleDB = async (id: string, payload: Partial<TUser>) => {
  const { email, ...updatedPayload } = payload

  // Check if the name is being updated
  if (updateUserDB?.name == '') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Name cannot be empty')
  }

  // Check if the email is being updated
  if (email) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email cannot be updated')
  }

  const result = await User.findByIdAndUpdate({ _id: id }, updatedPayload, {
    new: true,
    runValidators: true,
  })
  return result
}
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id)
  return result
}

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const ProductQuery = new QueryBuilder(User.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await ProductQuery.countTotal()
  const result = await ProductQuery.modelQuery
  return { meta, result }
}

export const UserServices = {
  createUserDB,
  updateUserDB,
  getSingleUserFromDB,
  changeStatus,
  updateUserRoleDB,
  getAllUserFromDB,
}
