/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type TTurf = {
  name: string
  description: string
  location: string
  contactNo: string
  rating: string
  owner: Types.ObjectId
  address: string
  city: string
  turf_ground: Types.ObjectId[]
  facilities: Types.ObjectId[]
  logoImage: string[]
  coverImage: string[]
  activity: Types.ObjectId[]
  status: 'active' | 'pending' | 'deactivate'
  isDeleted: boolean
}

export interface TurfModel extends Model<TTurf> {
  isTurfExists(id: string): Promise<TTurf | null>
}
