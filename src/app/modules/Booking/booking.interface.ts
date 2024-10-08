/* eslint-disable no-unused-vars */
import { Decimal128, Model, Types } from 'mongoose'

export type TBooking = {
  _id: string
  confirm_by: Types.ObjectId
  user: Types.ObjectId
  turf: Types.ObjectId
  timeslot: Types.ObjectId
  price: Decimal128
  turf_ground: Types.ObjectId
  status: 'active' | 'pending' | 'deactivate' | 'confirmed'
  isDeleted: boolean
}

export interface BookingModel extends Model<TBooking> {
  isBookingExists(id: string): Promise<TBooking | null>
}
