/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { PlayerSearchableFields } from './player.constant'
import { TPlayer } from './player.interface'
import { Player } from './player.model'

const getAllPlayerFromDB = async (query: Record<string, unknown>) => {
  const PlayerQuery = new QueryBuilder(
    Player.find().populate('facilities').populate('activity'), //.populate('academicDepartment'),
    query,
  )
    .search(PlayerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await PlayerQuery.countTotal()
  const result = await PlayerQuery.modelQuery
  return { meta, result }
}

const getSinglePlayerFromDB = async (id: string) => {
  const isPlayerExists = await Player.isPlayerExists(id)
  if (!isPlayerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Player is not found !')
  }
  const result = await Player.findById(id)
    .populate('facilities')
    .populate('activity') //.populate('academicDepartment')

  return result
}

// const updatePlayerIntoDB = async (id: string, payload: Partial<TPlayer>) => {
//   const { name, ...remainingPlayerData } = payload

//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingPlayerData,
//   }

//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }

//   const result = await Player.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }

const updatePlayerIntoDB = async (id: string, payload: Partial<TPlayer>) => {
  const isPlayerExists = await Player.findById(id)
  if (!isPlayerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Player is not found !')
  }

  const result = await Player.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deletePlayerFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // to check is Delete is ture
    const isPlayerExists = await Player.isPlayerExists(id)
    if (!isPlayerExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Player is not found !')
    }
    const deletedPlayer = await Player.findByIdAndUpdate(id, {
      isDeleted: true,
    })

    console.log({ deletedPlayer, id })
    if (!deletedPlayer) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Player')
    }

    await session.commitTransaction()
    await session.endSession()

    const { _id, name, turf, status } = deletedPlayer
    return { _id, name, turf, status }
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createPlayerFromDB = async (payload: TPlayer) => {
  const result = await Player.create(payload)
  return result
}

export const PlayerServices = {
  getAllPlayerFromDB,
  getSinglePlayerFromDB,
  updatePlayerIntoDB,
  deletePlayerFromDB,
  createPlayerFromDB,
}
