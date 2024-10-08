/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type TPlayer = {
  user: Types.ObjectId
  name: string
  location: string
  contactNo: string
  address: string
  email: string
  turfImage: string[]
  turf: Types.ObjectId
  status: 'active' | 'pending' | 'deactivate'
  isDeleted: boolean
}

export interface PlayerModel extends Model<TPlayer> {
  isPlayerExists(id: string): Promise<TPlayer | null>
}
