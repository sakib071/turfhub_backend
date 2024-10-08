import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TActivity } from './activity.interface'
import { Activity } from './activity.model'

const getAllActivityFromDB = async () => {
  const result = await Activity.find()
  return result
}
const createActivityFromDB = async (payload: TActivity) => {
  const result = await Activity.create(payload)
  return result
}

const updateActivityFromDB = async (
  id: string,
  payload: Partial<TActivity>,
) => {
  const isNameExists = await Activity.findOne({ name: payload.name })
  if (isNameExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Activity name already exists')
  }
  const result = await Activity.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteActivityFromDB = async (id: string) => {
  const result = await Activity.findByIdAndDelete({ _id: id })
  return result
}

export const ActivityServices = {
  getAllActivityFromDB,
  createActivityFromDB,
  updateActivityFromDB,
  deleteActivityFromDB,
}
