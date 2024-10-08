/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { User } from '../User/user.model'
import { TOtp } from './otp.interface'
import { Otp } from './otp.model'
const verificationOtpFromDB = async (payload: TOtp) => {
  // Find the user by email
  const user = await User.findOne({ email: payload.email })

  // Check if the user exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  // Find and delete the OTP entry associated with the user
  const otpEntry = await Otp.findOneAndDelete({
    user_id: user._id,
    otp: payload.otp,
  })

  // Check if the OTP entry was found
  if (!otpEntry) {
    throw new AppError(httpStatus.NOT_FOUND, 'OTP not found!')
  }

  // Update the user to set isVerified to true
  await User.updateOne({ _id: user._id }, { $set: { isVerified: true } })

  // Return the verified OTP entry
  return otpEntry
}

export const OtpServices = {
  verificationOtpFromDB,
}
