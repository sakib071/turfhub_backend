/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type TCommunity = {
  category: string
  content: string
  location: string
  tags: Types.ObjectId[]
  author: Types.ObjectId
  likes: string
  comments: Types.ObjectId[]
  visibility: 'public' | 'private'
  isDeleted: boolean
}

export interface CommunityModel extends Model<TCommunity> {
  isCommunityExists(id: string): Promise<TCommunity | null>
}
