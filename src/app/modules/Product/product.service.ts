/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { Product } from './product.model'
import { ProductSearchableFields } from './product.constant'
import { TProduct } from './product.interface'

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const ProductQuery = new QueryBuilder(Product.find().populate('owner'), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await ProductQuery.countTotal()
  const result = await ProductQuery.modelQuery
  return { meta, result }
}

const getSingleProductFromDB = async (id: string) => {
  const isProductExists = await Product.isProductExists(id)
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Product is not found !')
  }
  const result = await Product.findById(id).populate('owner')

  return result
}

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const isProductExists = await Product.findById(id)
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Product is not found !')
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteProductFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // to check is Delete is ture
    const isProductExists = await Product.isProductExists(id)
    if (!isProductExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Product is not found !')
    }
    const deletedProduct = await Product.findByIdAndUpdate(id, {
      isDeleted: true,
    })

    console.log({ deletedProduct, id })
    if (!deletedProduct) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Product')
    }

    await session.commitTransaction()
    await session.endSession()

    const { _id, name, quantity, price } = deletedProduct
    return { _id, name, quantity, price }
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createProductFromDB = async (payload: TProduct) => {
  const result = await Product.create(payload)
  return result
}

export const ProductServices = {
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  createProductFromDB,
}
