import { Schema, model } from 'mongoose'
import { TFacilities } from './facilities.interface'

const FacilitiesSchema = new Schema<TFacilities>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

export const Facilities = model<TFacilities>('Facilities', FacilitiesSchema)
