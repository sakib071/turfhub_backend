import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SalesServices } from './sale.service'
import { Request, Response } from 'express'

const getAllSales = catchAsync(async (req: Request, res: Response) => {
  const result = await SalesServices.getAllSalesFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales are retrieved successfully',
    data: result,
  })
})

const getSingleSales = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await SalesServices.getSingleSalesFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales are retrieved successfully',
    data: result,
  })
})

const updateSales = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await SalesServices.updateSalesIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales is updated successfully',
    data: result,
  })
})

const deleteSales = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await SalesServices.deleteSalesFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales is deleted successfully',
    data: result,
  })
})

const createSales = catchAsync(async (req: Request, res: Response) => {
  const result = await SalesServices.createSalesFromDB(req, res)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales is created successfully!',
    data: result,
  })
})
export const SalesControllers = {
  getAllSales,
  getSingleSales,
  updateSales,
  deleteSales,
  createSales,
}
