/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type TTimeslot = {
  startTime: string
  endTime: string
  turf: Types.ObjectId
  status?: 'active ' | 'deactivate'
  isDeleted: boolean
}

export interface TimeslotModel extends Model<TTimeslot> {
  isTimeslotExists(id: string): Promise<TTimeslot | null>
}
