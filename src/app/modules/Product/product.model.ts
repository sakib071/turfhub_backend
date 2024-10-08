import { Schema, model } from 'mongoose'
import { ProductModel, TProduct } from './product.interface'

const ProductSchema = new Schema<TProduct, ProductModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'cancelled', 'failed'],
      default: 'pending',
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true, // Ensures price is required
    },
    discount: {
      type: Number,
      default: null,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    notes: {
      type: String,
      default: '', // Optional field, defaults to an empty string if not provided
    },
    image: {
      type: [String], // Array of strings for image URLs
      default: [], // Optional, defaults to an empty array
    },
    isDeleted: {
      type: Boolean,
      default: false, // Optional, defaults to false
    },
  },
  { timestamps: true },
)

// filter out deleted documents
ProductSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

ProductSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

ProductSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

ProductSchema.statics.isProductExists = async function (id: string) {
  const existingUser = await Product.findById({ _id: id })
  return existingUser
}

export const Product = model<TProduct, ProductModel>('Product', ProductSchema)
