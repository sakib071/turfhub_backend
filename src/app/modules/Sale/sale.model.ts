import { Schema, model } from 'mongoose'
import { SalesModel, TSales } from './sale.interface'

// Define the ProductSchema
const ProductSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  sales_quantity: { type: Number, required: true, min: 1 }, // count must be at least 1
})

// Define the SalesSchema
const SalesSchema = new Schema<TSales>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: { type: [ProductSchema], required: true }, // Ensure this is an array of ProductSchema
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

// filter out deleted documents
SalesSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

SalesSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

SalesSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

SalesSchema.statics.isSalesExists = async function (id: string) {
  const existingUser = await Sales.findById({ _id: id })
  return existingUser
}

export const Sales = model<TSales, SalesModel>('Sales', SalesSchema)
