import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CommunityServices } from './community.service'
import { Request, Response } from 'express'

const getAllCommunity = catchAsync(async (req: Request, res: Response) => {
  const result = await CommunityServices.getAllCommunityFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Community are retrieved successfully',
    data: result,
  })
})

const getSingleCommunity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await CommunityServices.getSingleCommunityFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Community are retrieved successfully',
    data: result,
  })
})

const updateCommunity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await CommunityServices.updateCommunityIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Community is updated successfully',
    data: result,
  })
})

const deleteCommunity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await CommunityServices.deleteCommunityFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Community is deleted successfully',
    data: result,
  })
})

const createCommunity = catchAsync(async (req: Request, res: Response) => {
  const result = await CommunityServices.createCommunityFromDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Community is created successfully!',
    data: result,
  })
})
export const CommunityControllers = {
  getAllCommunity,
  getSingleCommunity,
  updateCommunity,
  deleteCommunity,
  createCommunity,
}
