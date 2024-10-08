import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TFacilities } from './facilities.interface'
import { Facilities } from './facilities.model'

const getAllFacilityFromDB = async () => {
  const result = await Facilities.find()
  return result
}
const createFacilityFromDB = async (payload: TFacilities) => {
  const result = await Facilities.create(payload)
  return result
}

const updateFacilityFromDB = async (
  id: string,
  payload: Partial<TFacilities>,
) => {
  const isNameExists = await Facilities.findOne({ name: payload.name })
  if (isNameExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Facility name already exists')
  }
  const result = await Facilities.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteFacilityFromDB = async (id: string) => {
  const result = await Facilities.findByIdAndDelete({ _id: id })
  return result
}

export const FacilitiesServices = {
  getAllFacilityFromDB,
  createFacilityFromDB,
  updateFacilityFromDB,
  deleteFacilityFromDB,
}
