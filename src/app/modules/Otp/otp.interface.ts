/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type TOtp = {
  user_id: Types.ObjectId
  email: string
  otp: string
}

export interface OtpModel extends Model<TOtp> {
  isOtpExists(id: string): Promise<TOtp | null>
}
