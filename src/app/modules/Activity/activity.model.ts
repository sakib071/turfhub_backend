import { Schema, model } from 'mongoose'
import { TActivity } from './activity.interface'

const ActivitySchema = new Schema<TActivity>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

export const Activity = model<TActivity>('Activity', ActivitySchema)
