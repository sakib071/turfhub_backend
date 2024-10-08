import { z } from 'zod'

const createFacilitiesValidation = z.object({
  body: z.object({
    name: z.string(),
  }),
})

const updateFacilitiesValidation = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
})

export const FacilitiesValidationSchema = {
  createFacilitiesValidation,
  updateFacilitiesValidation,
}
