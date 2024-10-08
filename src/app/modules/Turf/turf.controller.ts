import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TurfServices } from './turf.service'
import { Request, Response } from 'express'

const getAllTurf = catchAsync(async (req: Request, res: Response) => {
  const result = await TurfServices.getAllTurfFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Turf are retrieved successfully',
    data: result,
  })
})

const getAllTurfByFacilities = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TurfServices.getAllTurfByFacilitiesFromDB(req.query)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Turf are retrieved successfully',
      data: result,
    })
  },
)

const getSingleTurf = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await TurfServices.getSingleTurfFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Turf are retrieved successfully',
    data: result,
  })
})

const getAllTimeslotByTurf = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await TurfServices.getAllTimeslotByTurfFromDB(req.query, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Turf are retrieved successfully',
    data: result,
  })
})

const updateTurf = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await TurfServices.updateTurfIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Turf is updated successfully',
    data: result,
  })
})

const deleteTurf = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await TurfServices.deleteTurfFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Turf is deleted successfully',
    data: result,
  })
})

const createTurf = catchAsync(async (req: Request, res: Response) => {
  const result = await TurfServices.createTurfFromDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Turf is created successfully!',
    data: result,
  })
})
export const TurfControllers = {
  getAllTurfByFacilities,
  getAllTurf,
  getSingleTurf,
  getAllTimeslotByTurf,
  updateTurf,
  deleteTurf,
  createTurf,
}
