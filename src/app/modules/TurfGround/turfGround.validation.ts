import { z } from 'zod'

const createTurfGroundSchema = z.object({
  body: z.object({
    unit: z.string(),
    size: z.string(),
    sport: z.string(),
    price_per_hour: z.number(),
    field_size: z.string(),
    isDeleted: z.boolean().optional().default(false),
  }),
})

const updateTurfGroundSchema = z.object({
  body: z.object({
    unit: z.string().optional(),
    size: z.string().optional(),
    sport: z.string().optional(),
    price_per_hour: z.number().optional(),
    discount: z.number().optional(),
    field_size: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
})

export const TurfGroundValidations = {
  createTurfGroundSchema,
  updateTurfGroundSchema,
}
