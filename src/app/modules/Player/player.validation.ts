import { z } from 'zod'

const createPlayerSchema = z.object({
  body: z.object({
    user: z.string(), // Assuming user is a string ObjectId
    name: z.string().min(1),
    location: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1),
    turfImage: z.array(z.string()),
    createBy: z.string(), // Assuming createBy is a string ObjectId
    turf: z.string(), // Assuming turf is a string ObjectId
    status: z.enum(['active', 'pending', 'deactivate']).optional(),
    isDeleted: z.boolean().optional(),
  }),
})

const updatePlayerSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    contactNo: z.string().optional(),
    owner: z.string().optional(),
    address: z.string().optional(),
    facilities: z.string().optional(), // Assuming facilities is a string ID
    turfImage: z.array(z.string()).min(1).optional(),
    activity: z.string().optional(), // Assuming activity is a string ID
    status: z.enum(['active ', 'pending', 'deactivate']).optional(),
    isDeleted: z.boolean().optional(),
  }),
})

export const PlayerValidations = {
  createPlayerSchema,
  updatePlayerSchema,
}
