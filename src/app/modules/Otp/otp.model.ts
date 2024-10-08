import { Schema, model } from 'mongoose'
import { TOtp, OtpModel } from './otp.interface'
import { User } from '../User/user.model'

const OtpSchema = new Schema<TOtp, OtpModel>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
})

OtpSchema.statics.isOtpExists = async function (id: string) {
  const existingUser = await Otp.findById({ _id: id })
  return existingUser
}

OtpSchema.pre('save', async function (next) {
  const existingUser = await User.findById({ _id: this.user_id })

  if (existingUser) {
    if (!existingUser.isVerified) {
      await Otp.deleteOne({ user_id: existingUser._id })

      return next() // proceed with the save
    } else {
      // If the user exists and is verified, throw an error
      return next(new Error('Email already exists. Please log in.'))
    }
  }
  next()
})

export const Otp = model<TOtp, OtpModel>('Otps', OtpSchema)
