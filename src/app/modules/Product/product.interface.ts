/* eslint-disable no-unused-vars */
import { Decimal128, Model, Types } from 'mongoose'

export type TProduct = {
  name: string
  quantity: number
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'failed'
  price: Decimal128
  discount: number
  owner: Types.ObjectId
  notes: string
  image: string[]
  isDeleted: boolean
}

export interface ProductModel extends Model<TProduct> {
  isProductExists(id: string): Promise<TProduct | null>
}
