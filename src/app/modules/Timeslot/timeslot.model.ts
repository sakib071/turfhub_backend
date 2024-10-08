import { Schema, model } from 'mongoose'
import { TTimeslot, TimeslotModel } from './timeslot.interface'

const TimeslotSchema = new Schema<TTimeslot>({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  turf: { type: Schema.Types.ObjectId, ref: 'Turfs', required: true },
  status: { type: String, default: 'active' },
  isDeleted: { type: Boolean, default: false },
})

// filter out deleted documents
TimeslotSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

TimeslotSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

TimeslotSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

TimeslotSchema.statics.isTimeslotExists = async function (id: string) {
  const existingUser = await Timeslot.findById({ _id: id })
  return existingUser
}

export const Timeslot = model<TTimeslot, TimeslotModel>(
  'Timeslots',
  TimeslotSchema,
)
