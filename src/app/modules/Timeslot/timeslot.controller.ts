import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { Request, Response } from 'express'
import { TimeslotServices } from './timeslot.service'

const getAllTimeslot = catchAsync(async (req: Request, res: Response) => {
  const result = await TimeslotServices.getAllTimeslotFromDB(req.query)

  sendResponse(res, {
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: result ? true : false,
    message: result
      ? 'Timeslot are retrieved successfully'
      : 'Timeslot not found',
    data: result,
  })
})

const getDashboardAllTimeslot = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TimeslotServices.getAllDashboardTimeslotFromDB(
      req.query,
    )

    sendResponse(res, {
      statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
      success: result ? true : false,
      message: result
        ? 'Timeslot are retrieved successfully'
        : 'Timeslot not found',
      data: result,
    })
  },
)

const getDashboardSingleTimeslot = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await TimeslotServices.getSingleDashboardTimeslotFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Timeslot are retrieved successfully',
      data: result,
    })
  },
)

const getSingleTimeslot = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await TimeslotServices.getSingleTimeslotFromDB(id)

  sendResponse(res, {
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: result ? true : false,
    message: result
      ? 'Timeslot are retrieved successfully'
      : 'Timeslot not found',
    data: result,
  })
})

const updateTimeslot = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await TimeslotServices.updateTimeslotIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Timeslot is updated successfully',
    data: result,
  })
})

const deleteTimeslot = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await TimeslotServices.deleteTimeslotFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Timeslot is deleted successfully',
    data: result,
  })
})

const createTimeslot = catchAsync(async (req: Request, res: Response) => {
  const result = await TimeslotServices.createTimeslotFromDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Timeslot is created successfully!',
    data: result,
  })
})
export const TimeslotControllers = {
  getAllTimeslot,
  getSingleTimeslot,
  updateTimeslot,
  deleteTimeslot,
  createTimeslot,
  getDashboardAllTimeslot,
  getDashboardSingleTimeslot,
}
