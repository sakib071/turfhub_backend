import { Schema, model } from 'mongoose'
import { TTurfGround, TurfGroundModel } from './turfGround.interface'

const turfGroundSchema = new Schema<TTurfGround, TurfGroundModel>({
  unit: { type: String, required: true },
  size: { type: String, required: true },
  sport: { type: String, required: true },
  price_per_hour: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  field_size: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
})

// filter out deleted documents
turfGroundSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

turfGroundSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

turfGroundSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

turfGroundSchema.statics.isTurfGroundExists = async function (id: string) {
  const existingUser = await TurfGround.findById({ _id: id })
  return existingUser
}

export const TurfGround = model<TTurfGround, TurfGroundModel>(
  'TurfGround',
  turfGroundSchema,
)
