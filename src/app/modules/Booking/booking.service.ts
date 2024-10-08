/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { BookingSearchableFields } from './booking.constant'
import { TBooking } from './booking.interface'
import { Booking } from './booking.model'

const getAllBookingFromDB = async (query: Record<string, unknown>) => {
  const BookingQuery = new QueryBuilder(
    Booking.find()
      .populate('user')
      .populate('timeslot')
      .populate('turf_ground')
      .populate({
        path: 'turf',
        populate: [
          { path: 'facilities' }, // Populate facilities
          { path: 'activity' }, // Populate activity
        ],
      }),
    query,
  )
    .search(BookingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await BookingQuery.countTotal()
  const result = await BookingQuery.modelQuery
  return { meta, result }
}

const getSingleBookingFromDB = async (id: string) => {
  const isBookingExists = await Booking.isBookingExists(id)
  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Booking is not found !')
  }
  const result = await Booking.findById(id)
    .populate('user')
    .populate('timeslot')
    .populate({
      path: 'turf',
      populate: [
        { path: 'facilities' }, // Populate facilities
        { path: 'activity' }, // Populate activity
      ],
    })

  return result
}

// const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
//   const { name, ...remainingBookingData } = payload

//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingBookingData,
//   }

//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }

//   const result = await Booking.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }

const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const isBookingExists = await Booking.findById(id)
  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Booking is not found !')
  }

  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteBookingFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // to check is Delete is ture
    const isBookingExists = await Booking.isBookingExists(id)
    if (!isBookingExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Booking is not found !')
    }
    const deletedBooking = await Booking.findByIdAndUpdate(id, {
      isDeleted: true,
    })

    console.log({ deletedBooking, id })
    if (!deletedBooking) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Booking')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedBooking
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createBookingFromDB = async (payload: TBooking) => {
  const result = await Booking.create(payload)
  return result
}

export const BookingServices = {
  getAllBookingFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
  createBookingFromDB,
}
