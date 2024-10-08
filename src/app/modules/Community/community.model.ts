import { Schema, model } from 'mongoose'
import { CommunityModel, TCommunity } from './community.interface'

const CommunitySchema = new Schema<TCommunity, CommunityModel>(
  {
    category: { type: String, required: true },
    content: { type: String, required: true },
    location: { type: String, required: true },
    tags: [{ type: String, default: [] }],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    visibility: { type: String, default: 'public' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

// filter out deleted documents
CommunitySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

CommunitySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

CommunitySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

CommunitySchema.statics.isCommunityExists = async function (id: string) {
  const existingUser = await Community.findById({ _id: id })
  return existingUser
}

export const Community = model<TCommunity, CommunityModel>(
  'Community',
  CommunitySchema,
)
