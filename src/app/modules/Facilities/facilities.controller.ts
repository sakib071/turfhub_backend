import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { FacilitiesServices } from './facilities.service'

const getAllFacilities = catchAsync(async (req, res) => {
  const result = await FacilitiesServices.getAllFacilityFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities are retrieved successfully',
    data: result,
  })
})
const createFacilities = catchAsync(async (req, res) => {
  const result = await FacilitiesServices.createFacilityFromDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities is created successfully',
    data: result,
  })
})
const updateFacilities = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await FacilitiesServices.updateFacilityFromDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities is updated successfully',
    data: result,
  })
})
const deleteFacilities = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await FacilitiesServices.deleteFacilityFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities is deleted successfully',
    data: result,
  })
})

export const FacilitiesController = {
  getAllFacilities,
  createFacilities,
  updateFacilities,
  deleteFacilities,
}
