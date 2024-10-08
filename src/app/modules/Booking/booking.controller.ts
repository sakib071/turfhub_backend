import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'
import { Request, Response } from 'express'

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllBookingFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking are retrieved successfully',
    data: result,
  })
})

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await BookingServices.getSingleBookingFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking are retrieved successfully',
    data: result,
  })
})

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await BookingServices.updateBookingIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is updated successfully',
    data: result,
  })
})

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await BookingServices.deleteBookingFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is deleted successfully',
    data: result,
  })
})

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.createBookingFromDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is created successfully!',
    data: result,
  })
})
export const BookingControllers = {
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  createBooking,
}
