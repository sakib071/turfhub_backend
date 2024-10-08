import { Schema, model } from 'mongoose'
import { PlayerModel, TPlayer } from './player.interface'

const PlayerSchema = new Schema<TPlayer, PlayerModel>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  turfImage: { type: [String], required: true },
  turf: { type: Schema.Types.ObjectId, ref: 'Turf', required: true },
  status: {
    type: String,
    enum: ['active', 'pending', 'deactivate'],
    default: 'active',
  },
  isDeleted: { type: Boolean, default: false },
})

// filter out deleted documents
PlayerSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

PlayerSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

PlayerSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

PlayerSchema.statics.isPlayerExists = async function (id: string) {
  const existingUser = await Player.findById({ _id: id })
  return existingUser
}

export const Player = model<TPlayer, PlayerModel>('Players', PlayerSchema)
