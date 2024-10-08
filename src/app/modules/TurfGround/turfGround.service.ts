/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TurfGround } from './turfGround.model'
import { TurfSearchableFields } from './turfGround.constant'
import { TTurfGround } from './turfGround.interface'

const getAllTurfGroundFromDB = async (query: Record<string, unknown>) => {
  const TurfQuery = new QueryBuilder(
    TurfGround.find(), //.populate('academicDepartment'),
    query,
  )
    .search(TurfSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await TurfQuery.countTotal()
  const result = await TurfQuery.modelQuery
  return { meta, result }
}

const getSingleTurfGroundFromDB = async (id: string) => {
  const isTurfExists = await TurfGround.isTurfGroundExists(id)
  if (!isTurfExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Turf ground is not found !')
  }
  const result = await TurfGround.findById(id)

  return result
}

// const updateTurfGroundIntoDB = async (id: string, payload: Partial<TTurf>) => {
//   const { name, ...remainingTurfData } = payload

//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingTurfData,
//   }

//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }

//   const result = await Turf.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }

const updateTurfGroundIntoDB = async (
  id: string,
  payload: Partial<TTurfGround>,
) => {
  const isTurfExists = await TurfGround.findById(id)
  if (!isTurfExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Turf ground is not found !')
  }

  const result = await TurfGround.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteTurfGroundFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // to check is Delete is ture
    const isTurfExists = await TurfGround.isTurfGroundExists(id)
    if (!isTurfExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This Turf ground is not found !',
      )
    }
    const deletedTurfGround = await TurfGround.findByIdAndUpdate(id, {
      isDeleted: true,
    })

    console.log({ deletedTurfGround, id })
    if (!deletedTurfGround) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Turf ground')
    }

    await session.commitTransaction()
    await session.endSession()

    const { _id, size, sport } = deletedTurfGround
    return { _id, size, sport }
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createTurfGroundFromDB = async (payload: TTurfGround) => {
  const result = await TurfGround.create(payload)
  return result
}

export const TurfGroundServices = {
  getAllTurfGroundFromDB,
  getSingleTurfGroundFromDB,
  updateTurfGroundIntoDB,
  deleteTurfGroundFromDB,
  createTurfGroundFromDB,
}
