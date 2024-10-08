/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { SalesSearchableFields } from './sale.constant'
import { TSales } from './sale.interface'
import { Sales } from './sale.model'
import { Product } from '../Product/product.model'

const getAllSalesFromDB = async (query: Record<string, unknown>) => {
  const SalesQuery = new QueryBuilder(
    Sales.find()
      .populate('buyer')
      .populate({
        path: 'products',
        populate: [{ path: 'id' }],
      }),
    query,
  )
    .search(SalesSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await SalesQuery.countTotal()
  const result = await SalesQuery.modelQuery
  const count_products = result?.length > 0 ? result[0].products.length : 0
  return { meta, count_products, result }
}

const getSingleSalesFromDB = async (id: string) => {
  const isSalesExists = await Sales.isSalesExists(id)
  if (!isSalesExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Sales is not found !')
  }
  const result = await Sales.findById(id)
    .populate('buyer')
    .populate({
      path: 'products',
      populate: [{ path: 'id' }],
    })

  const count_products = result?.products.length
  return { count_products, result }
}

const updateSalesIntoDB = async (id: string, payload: Partial<TSales>) => {
  const isSalesExists = await Sales.findById(id)
  if (!isSalesExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Sales is not found !')
  }

  const result = await Sales.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteSalesFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // to check is Delete is ture
    const isSalesExists = await Sales.isSalesExists(id)
    if (!isSalesExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Sales is not found !')
    }
    const deletedSales = await Sales.findByIdAndUpdate(id, { isDeleted: true })

    console.log({ deletedSales, id })
    if (!deletedSales) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Sales')
    }

    await session.commitTransaction()
    await session.endSession()

    return { deletedSales }
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createSalesFromDB = async (req: any, res: any) => {
  try {
    const { buyer, products } = req.body

    // Validate buyer ID
    if (!buyer) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Buyer ID is required')
    }

    // Validate products and check availability
    const productsToUpdate = await Product.find({
      _id: { $in: products.map((p: any) => p.id) },
    })

    const productMap = new Map()

    for (const p of productsToUpdate) {
      productMap.set(p._id.toString(), p)
    }

    const stockOutMessages: string[] = [] // Array to collect stock out messages
    for (const p of products) {
      const productFound = productMap.get(p.id)
      // If the product is not found
      if (!productFound) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Product ID ${p.id} not found.`,
        )
      }
      if (productFound.quantity < p.sales_quantity) {
        stockOutMessages.push(
          `Insufficient stock for product ${p.id}. Requested: ${p.sales_quantity}, Available: ${productFound.quantity}`,
        )
      }
    }

    // If there are stock out messages, return them
    if (stockOutMessages.length > 0) {
      return res.status(400).json({ messages: stockOutMessages })
    }

    // Create BuyerProduct entry
    const buyerProduct = await Sales.create({ buyer, products })

    // Update product quantities
    for (const p of products) {
      const productToUpdate = productMap.get(p.id)
      productToUpdate.quantity -= p.sales_quantity
      await productToUpdate.save()
    }

    return buyerProduct
  } catch (error) {
    console.error(error)
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
    )
  }
}
export const SalesServices = {
  getAllSalesFromDB,
  getSingleSalesFromDB,
  updateSalesIntoDB,
  deleteSalesFromDB,
  createSalesFromDB,
}
