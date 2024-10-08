import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ProductServices } from './product.service'
import { Request, Response } from 'express'

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product are retrieved successfully',
    data: result,
  })
})

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await ProductServices.getSingleProductFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product are retrieved successfully',
    data: result,
  })
})

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ProductServices.updateProductIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated successfully',
    data: result,
  })
})

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ProductServices.deleteProductFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is deleted successfully',
    data: result,
  })
})

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProductFromDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is created successfully!',
    data: result,
  })
})
export const ProductControllers = {
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
}
