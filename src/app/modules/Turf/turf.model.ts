import { Schema, model } from 'mongoose'
import { TTurf, TurfModel } from './turf.interface'

const turfSchema = new Schema<TTurf, TurfModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  contactNo: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: String, default: '0' },
  address: { type: String, required: true },
  city: { type: String, required: true },
  turf_ground: [
    { type: Schema.Types.ObjectId, ref: 'TurfGround', default: [] },
  ], // Assuming turfImage is an array of strings representing image URLs
  facilities: [{ type: Schema.Types.ObjectId, ref: 'Facilities' }], // Assuming Facility is another Mongoose model
  logoImage: { type: [String], required: true }, // Assuming turfImage is an array of strings representing image URLs
  coverImage: { type: [String], required: true }, // Assuming turfImage is an array of strings representing image URLs
  activity: [{ type: Schema.Types.ObjectId, ref: 'Activity' }], // Assuming Activity is another Mongoose model
  status: { type: String, default: 'active' },
  isDeleted: { type: Boolean, default: false },
})

// filter out deleted documents
turfSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

turfSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

turfSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

turfSchema.statics.isTurfExists = async function (id: string) {
  const existingUser = await Turf.findById({ _id: id })
  return existingUser
}

export const Turf = model<TTurf, TurfModel>('Turfs', turfSchema)
