/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { Facilities } from '../Facilities/facilities.model'
import { Timeslot } from '../Timeslot/timeslot.model'
import { TurfSearchableFields } from './turf.constant'
import { TTurf } from './turf.interface'
import { Turf } from './turf.model'

const getAllTurfFromDB = async (query: Record<string, unknown>) => {
  const TurfQuery = new QueryBuilder(
    Turf.find()
      .populate('turf_ground')
      .populate('facilities')
      .populate('activity'),
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

const getAllTurfByFacilitiesFromDB = async (query: Record<string, unknown>) => {
  // Check if the facility exists
  const facilityExists = await Facilities.findOne({
    name: query?.searchTerm,
  }).exec()
  if (!facilityExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This facility is not found!')
  }

  // Perform aggregation to filter turfs by facility name
  const turfs = await Turf.aggregate([
    // Match to find turfs that have the specified facility ID
    {
      $match: {
        facilities: facilityExists._id, // Use the ID of the found facility
      },
    },
    // Lookup to populate the facilities field
    {
      $lookup: {
        from: 'facilities', // Name of the facilities collection
        localField: 'facilities',
        foreignField: '_id',
        as: 'facilitiesInfo', // The array that will hold facility information
      },
    },
    // Lookup to populate the turf_ground field
    {
      $lookup: {
        from: 'turfgrounds', // Name of the turf_ground collection
        localField: 'turf_ground',
        foreignField: '_id',
        as: 'turfGroundInfo', // The array for turf_ground info
      },
    },
    // Lookup to populate the activity field
    {
      $lookup: {
        from: 'activities', // Name of the activity collection
        localField: 'activity',
        foreignField: '_id',
        as: 'activityInfo', // The array for activity info
      },
    },
    // Unwind to flatten the facilitiesInfo array (if needed)
    {
      $unwind: {
        path: '$facilitiesInfo',
        preserveNullAndEmptyArrays: true,
      },
    },
    // Group to combine data back into a single document per turf
    {
      /*
      
                "location": "https://maps.app.goo.gl/KwUyagkYfV4Ey8NZ9",
                "contactNo": "01987654321",
                "owner": "66f599e1ac1e207b45eb9a05",
                "rating": "4.3",
                "address": "Khulshi, Chittagong",
                "city": "Chittagong",
      */
      $group: {
        _id: '$_id',
        name: { $first: '$name' }, // Turf name

        description: { $first: '$description' }, // Turf description
        location: { $first: '$location' }, // Turf location
        contactNo: { $first: '$contactNo' }, // Turf contactNo
        rating: { $first: '$rating' }, // Turf rating
        address: { $first: '$address' }, // Turf rating
        facilities: { $addToSet: '$facilitiesInfo.name' }, // Facility names
        turfGround: { $first: '$turfGroundInfo' }, // Turf ground details
        activity: { $first: '$activityInfo' }, // Activity details
      },
    },
    // Project to shape the final output
    {
      $project: {
        _id: '$_id',
        name: '$name',
        description: '$description',
        location: '$location',
        contactNo: '$contactNo',
        rating: '$rating',
        address: '$address',
        facilities: 1, // Include facility names
        turfGround: 1, // Include turf ground details
        activity: 1, // Include activity details
      },
    },
  ])

  return { meta: { total: turfs.length }, result: turfs }
}

const getSingleTurfFromDB = async (id: string) => {
  const isTurfExists = await Turf.isTurfExists(id)
  if (!isTurfExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Turf is not found !')
  }
  const result = await Turf.findById(id)
    .populate('turf_ground')
    .populate('facilities')
    .populate('activity') //.populate('academicDepartment')

  return result
}
const getAllTimeslotByTurfFromDB = async (
  query: Record<string, unknown>,
  id: string,
) => {
  const isTurfExists = await Turf.isTurfExists(id)
  if (!isTurfExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Turf is not found !')
  }
  const TimeslotQuery = new QueryBuilder(
    Timeslot.find({
      turf: id, // Match by turf ID
      status: { $ne: 'deactivate' },
    }).populate({
      path: 'turf',
      populate: [
        { path: 'facilities' }, // Populate facilities
        { path: 'activity' }, // Populate activity
      ],
    }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await TimeslotQuery.countTotal()
  const result = await TimeslotQuery.modelQuery
  return { meta, result }

  // const result = await Timeslot.find({ turf: id })

  // return result
}

// const updateTurfIntoDB = async (id: string, payload: Partial<TTurf>) => {
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

const updateTurfIntoDB = async (id: string, payload: Partial<TTurf>) => {
  const isTurfExists = await Turf.findById(id)
  if (!isTurfExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Turf is not found !')
  }

  const result = await Turf.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteTurfFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // to check is Delete is ture
    const isTurfExists = await Turf.isTurfExists(id)
    if (!isTurfExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Turf is not found !')
    }
    const deletedTurf = await Turf.findByIdAndUpdate(id, { isDeleted: true })

    console.log({ deletedTurf, id })
    if (!deletedTurf) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Turf')
    }

    await session.commitTransaction()
    await session.endSession()

    const { _id, name, description } = deletedTurf
    return { _id, name, description }
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createTurfFromDB = async (payload: TTurf) => {
  const result = await Turf.create(payload)
  return result
}

export const TurfServices = {
  getAllTurfByFacilitiesFromDB,
  getAllTimeslotByTurfFromDB,
  getAllTurfFromDB,
  getSingleTurfFromDB,
  updateTurfIntoDB,
  deleteTurfFromDB,
  createTurfFromDB,
}
