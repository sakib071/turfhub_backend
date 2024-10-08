import { z } from 'zod'

const createProductSchema = z.object({
  body: z.object({
    name: z.string(),
    quantity: z.number(),
    status: z
      .enum(['pending', 'in_progress', 'completed', 'cancelled', 'failed'])
      .default('pending'),
    price: z.string(),
    discount: z.number().optional(),
    owner: z.string(),
    notes: z.string().optional(),
    image: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
})

const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    quantity: z.number().optional(),
    status: z
      .enum(['pending', 'in_progress', 'completed', 'cancelled', 'failed'])
      .optional(),
    price: z.string().optional(),
    discount: z.number().optional(),
    owner: z.string().optional(),
    notes: z.string().optional(),
    image: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional(),
  }),
})

export const ProductValidations = {
  createProductSchema,
  updateProductSchema,
}
