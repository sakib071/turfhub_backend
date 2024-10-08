/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type TTurfGround = {
  unit: string
  size: string
  sport: string
  price_per_hour: number
  discount: number
  field_size: string
  isDeleted: boolean
}

export interface TurfGroundModel extends Model<TTurfGround> {
  isTurfGroundExists(id: string): Promise<TTurfGround | null>
}
