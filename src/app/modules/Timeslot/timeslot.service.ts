/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TimeslotSearchableFields } from './timeslot.constant'
import { TTimeslot } from './timeslot.interface'
import { Timeslot } from './timeslot.model'

const getAllTimeslotFromDB = async (query: Record<string, unknown>) => {
  const TimeslotQuery = new QueryBuilder(
    Timeslot.find({ status: { $ne: 'deactivate' } }).populate({
      path: 'turf',
      populate: [
        { path: 'facilities' }, // Populate facilities
        { path: 'activity' }, // Populate activity
      ],
    }),
    query,
  )
    .search(TimeslotSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await TimeslotQuery.countTotal()
  const result = await TimeslotQuery.modelQuery
  return { meta, result }
}

const getAllDashboardTimeslotFromDB = async (
  query: Record<string, unknown>,
) => {
  const TimeslotQuery = new QueryBuilder(
    Timeslot.find().populate({
      path: 'turf',
      populate: [
        { path: 'facilities' }, // Populate facilities
        { path: 'activity' }, // Populate activity
      ],
    }),
    query,
  )
    .search(TimeslotSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await TimeslotQuery.countTotal()
  const result = await TimeslotQuery.modelQuery
  return { meta, result }
}

const getSingleTimeslotFromDB = async (id: string) => {
  const isTimeslotExists = await Timeslot.isTimeslotExists(id)
  if (!isTimeslotExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Timeslot is not found !')
  }
  const result = await Timeslot.findOne({
    _id: id,
    status: { $ne: 'deactivate' },
  }).populate({
    path: 'turf',
    populate: [
      { path: 'facilities' }, // Populate facilities
      { path: 'activity' }, // Populate activity
    ],
  }) //.populate('academicDepartment')

  return result
}

const getSingleDashboardTimeslotFromDB = async (id: string) => {
  const isTimeslotExists = await Timeslot.isTimeslotExists(id)
  if (!isTimeslotExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Timeslot is not found !')
  }
  const result = await Timeslot.findById(id).populate({
    path: 'turf',
    populate: [
      { path: 'facilities' }, // Populate facilities
      { path: 'activity' }, // Populate activity
    ],
  }) //.populate('academicDepartment')

  return result
}

// const updateTimeslotIntoDB = async (id: string, payload: Partial<TTimeslot>) => {
//   const { name, ...remainingTimeslotData } = payload

//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingTimeslotData,
//   }

//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }

//   const result = await Timeslot.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }

const updateTimeslotIntoDB = async (
  id: string,
  payload: Partial<TTimeslot>,
) => {
  const isTimeslotExists = await Timeslot.findById(id)
  if (!isTimeslotExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Timeslot is not found !')
  }

  const result = await Timeslot.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteTimeslotFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // to check is Delete is ture
    const isTimeslotExists = await Timeslot.isTimeslotExists(id)
    if (!isTimeslotExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Timeslot is not found !')
    }
    const deletedTimeslot = await Timeslot.findByIdAndUpdate(id, {
      isDeleted: true,
    })

    console.log({ deletedTimeslot, id })
    if (!deletedTimeslot) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Timeslot')
    }

    await session.commitTransaction()
    await session.endSession()

    const { _id, startTime, turf } = deletedTimeslot
    return { _id, startTime, turf }
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createTimeslotFromDB = async (payload: TTimeslot) => {
  const result = await Timeslot.create(payload)
  return result
}

export const TimeslotServices = {
  getAllTimeslotFromDB,
  getSingleTimeslotFromDB,
  updateTimeslotIntoDB,
  deleteTimeslotFromDB,
  createTimeslotFromDB,
  getAllDashboardTimeslotFromDB,
  getSingleDashboardTimeslotFromDB,
}
