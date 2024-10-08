import { z } from 'zod'
import { Userstatus } from './user.constant'

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
})

const createStuffSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'), // 'name' is required
    contactNo: z.string().optional(), // 'contactNo' is optional
    profileImg: z.string().optional(), // 'profileImg' is optional
    email: z.string().email('Invalid email format'), // 'email' is required and must be valid
    phone: z.string().optional(), // 'phone' is optional
    password: z.string().min(6, 'Password must be at least 6 characters'), // 'password' is required with a minimum length
    needsPasswordChange: z.boolean().optional(), // 'needsPasswordChange' is optional
    passwordChangedAt: z.date().optional(), // 'passwordChangedAt' is optional
    role: z.enum(['stuff', 'player', 'turf_owner', 'admin']).default('player'),
    status: z.enum(['in-progress', 'blocked']).default('in-progress'), // 'status' defaults to 'in-progress'
    isDeleted: z.boolean().optional(), // 'isDeleted' is required
  }),
})
const updateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(), // 'name' is required
    email: z.string().email('Invalid email format').optional(), // 'email' is required and must be valid
    contactNo: z.string().optional(), // 'contactNo' is optional
    profileImg: z.string().optional(), // 'profileImg' is optional
    phone: z.string().optional(), // 'phone' is optional
    needsPasswordChange: z.boolean().optional(), // 'needsPasswordChange' is optional
    isVerified: z.boolean().optional(), // 'needsPasswordChange' is optional
    passwordChangedAt: z.date().optional(), // 'passwordChangedAt' is optional
    isDeleted: z.boolean().optional(), // 'isDeleted' is required
  }),
})

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...Userstatus] as [string, ...string[]]),
  }),
})

export const UserValidation = {
  userValidationSchema,
  updateValidationSchema,
  createStuffSchema,
  changeStatusValidationSchema,
}
