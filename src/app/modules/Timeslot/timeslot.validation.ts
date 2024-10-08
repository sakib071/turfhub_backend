import { z } from 'zod'

const createTimeslotSchema = z.object({
  body: z.object({
    startTime: z.string(),
    endTime: z.string(),
    turf: z.string(),
    isDeleted: z.boolean().optional().default(false),
  }),
})

const updateTimeslotSchema = z.object({
  body: z.object({
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    turf: z.string().optional(),
    activity: z.string().optional(),
    status: z.enum(['active', 'deactivate']).optional(),
    isDeleted: z.boolean().optional(),
  }),
})

export const TimeslotValidations = {
  createTimeslotSchema,
  updateTimeslotSchema,
}
