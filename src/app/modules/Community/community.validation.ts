import { z } from 'zod'

const createCommunitySchema = z.object({
  body: z.object({
    category: z.string(),
    content: z.string(),
    location: z.string(),
    tags: z.array(z.string()).optional(),
    author: z.string(),
    likes: z.string().optional(),
    comments: z.array(z.string()).optional(),
    visibility: z.enum(['public', 'private']).default('public'),
    isDeleted: z.boolean().optional().default(false),
  }),
})

const updateCommunitySchema = z.object({
  body: z.object({
    category: z.string().optional(),
    content: z.string().optional(),
    location: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    likes: z.string().optional(),
    comments: z.array(z.string()).optional(),
    visibility: z.enum(['public', 'private']).default('public'),
    isDeleted: z.boolean().optional(),
  }),
})

export const CommunityValidations = {
  createCommunitySchema,
  updateCommunitySchema,
}
