/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

interface Product {
  id: Types.ObjectId // Product ID
  sales_quantity: number // Count of the product
}

export type TSales = {
  buyer: Types.ObjectId
  products: Product[] // Should be an array of Product
  isDeleted: boolean
}

export interface SalesModel extends Model<TSales> {
  isSalesExists(id: string): Promise<TSales | null>
}
