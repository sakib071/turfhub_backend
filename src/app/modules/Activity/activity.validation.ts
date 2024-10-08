import { z } from 'zod'

const createActivityValidation = z.object({
  body: z.object({
    name: z.string(),
  }),
})

const updateActivityValidation = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
})

export const ActivityValidationSchema = {
  createActivityValidation,
  updateActivityValidation,
}
