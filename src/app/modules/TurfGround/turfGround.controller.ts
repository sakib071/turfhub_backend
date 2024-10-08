import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TurfGroundServices } from './turfGround.service'
import { Request, Response } from 'express'

const getAllTurfGround = catchAsync(async (req: Request, res: Response) => {
  const result = await TurfGroundServices.getAllTurfGroundFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TurfGround are retrieved successfully',
    data: result,
  })
})

const getSingleTurfGround = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await TurfGroundServices.getSingleTurfGroundFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TurfGround are retrieved successfully',
    data: result,
  })
})

const updateTurfGround = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await TurfGroundServices.updateTurfGroundIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TurfGround is updated successfully',
    data: result,
  })
})

const deleteTurfGround = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await TurfGroundServices.deleteTurfGroundFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TurfGround is deleted successfully',
    data: result,
  })
})

const createTurfGround = catchAsync(async (req: Request, res: Response) => {
  const result = await TurfGroundServices.createTurfGroundFromDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TurfGround is created successfully!',
    data: result,
  })
})
export const TurfGroundControllers = {
  getAllTurfGround,
  getSingleTurfGround,
  updateTurfGround,
  deleteTurfGround,
  createTurfGround,
}
