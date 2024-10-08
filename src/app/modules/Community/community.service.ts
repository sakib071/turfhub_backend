/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { CommunitySearchableFields } from './community.constant'
import { Community } from './community.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { TCommunity } from './community.interface'

const getAllCommunityFromDB = async (query: Record<string, unknown>) => {
  const CommunityQuery = new QueryBuilder(
    Community.find().populate('author'),
    query,
  )
    .search(CommunitySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await CommunityQuery.countTotal()
  const result = await CommunityQuery.modelQuery
  return { meta, result }
}

const getSingleCommunityFromDB = async (id: string) => {
  const isCommunityExists = await Community.isCommunityExists(id)
  if (!isCommunityExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Community is not found !')
  }
  const result = await Community.findById(id).populate('author')

  return result
}

// const updateCommunityIntoDB = async (id: string, payload: Partial<TCommunity>) => {
//   const { name, ...remainingCommunityData } = payload

//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingCommunityData,
//   }

//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }

//   const result = await Community.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }

const updateCommunityIntoDB = async (
  id: string,
  payload: Partial<TCommunity>,
) => {
  const isCommunityExists = await Community.findById(id)
  if (!isCommunityExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Community is not found !')
  }

  const result = await Community.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteCommunityFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // to check is Delete is ture
    const isCommunityExists = await Community.isCommunityExists(id)
    if (!isCommunityExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Community is not found !')
    }
    const deletedCommunity = await Community.findByIdAndUpdate(id, {
      isDeleted: true,
    })

    console.log({ deletedCommunity, id })
    if (!deletedCommunity) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Community')
    }

    await session.commitTransaction()
    await session.endSession()

    const { _id, content, location } = deletedCommunity
    return { _id, content, location }
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createCommunityFromDB = async (payload: TCommunity) => {
  const result = await Community.create(payload)
  return result
}

export const CommunityServices = {
  getAllCommunityFromDB,
  getSingleCommunityFromDB,
  updateCommunityIntoDB,
  deleteCommunityFromDB,
  createCommunityFromDB,
}
