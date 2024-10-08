import { Schema, model } from 'mongoose'
import { BookingModel, TBooking } from './booking.interface'

const BookingSchema = new Schema<TBooking, BookingModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    turf: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Turfs',
    },
    timeslot: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Timeslots',
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'deactivate', 'confirmed'],
      default: 'pending',
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true, // Ensures price is required
    },
    turf_ground: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'TurfGround',
    },
    confirm_by: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

// filter out deleted documents
BookingSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

BookingSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

BookingSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

BookingSchema.statics.isBookingExists = async function (id: string) {
  const existingUser = await Booking.findById({ _id: id })
  return existingUser
}

export const Booking = model<TBooking, BookingModel>('Bookings', BookingSchema)
