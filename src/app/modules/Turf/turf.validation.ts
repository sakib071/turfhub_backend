import { z } from 'zod'

const createTurfSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    location: z.string(),
    rating: z.string().optional(),
    owner: z.string(),
    address: z.string(),
    city: z.string(),
    facilities: z.array(z.string()), // Assuming facilities is a string ID
    logoImage: z.array(z.string()).min(1),
    coverImage: z.array(z.string()).min(1),
    activity: z.array(z.string()), // Assuming activity is a string ID
    status: z.enum(['active', 'pending', 'deactivate']).optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
})

const updateTurfSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    rating: z.string().optional(),
    owner: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    facilities: z.string().optional(), // Assuming facilities is a string ID

    logoImage: z.array(z.string()).optional(),
    coverImage: z.array(z.string()).optional(),
    activity: z.string().optional(), // Assuming activity is a string ID
    status: z.enum(['active', 'pending', 'deactivate']).optional(),
    isDeleted: z.boolean().optional(),
  }),
})

export const TurfValidations = {
  createTurfSchema,
  updateTurfSchema,
}
