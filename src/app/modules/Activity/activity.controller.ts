import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ActivityServices } from './activity.service'

const getAllActivity = catchAsync(async (req, res) => {
  const result = await ActivityServices.getAllActivityFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Activity are retrieved successfully',
    data: result,
  })
})
const createActivity = catchAsync(async (req, res) => {
  const result = await ActivityServices.createActivityFromDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Activity is created successfully',
    data: result,
  })
})
const updateActivity = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ActivityServices.updateActivityFromDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Activity is updated successfully',
    data: result,
  })
})
const deleteActivity = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ActivityServices.deleteActivityFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Activity is deleted successfully',
    data: result,
  })
})

export const ActivityController = {
  getAllActivity,
  createActivity,
  updateActivity,
  deleteActivity,
}
