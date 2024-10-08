/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface TUser {
  _id?: string
  id: string
  name: string
  contactNo?: string
  profileImg?: string
  email: string
  password: string
  needsPasswordChange?: boolean
  passwordChangedAt?: Date
  isVerified: boolean
  role: 'stuff' | 'player' | 'turf_owner' | 'admin'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}
