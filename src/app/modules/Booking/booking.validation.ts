import { z } from 'zod'

const createBookingSchema = z.object({
  body: z.object({
    confirm_by: z.string().optional(),
    user: z.string(),
    turf: z.string(),
    timeslot: z.string(),
    status: z.enum(['active', 'pending', 'deactivate', 'confirmed']).optional(),
    price: z.string(),
    turf_ground: z.string(),
    isDeleted: z.boolean().optional(),
  }),
})

const updateBookingSchema = z.object({
  body: z.object({
    confirm_by: z.string().optional(),
    user: z.string().optional(),
    turf: z.string().optional(),
    timeslot: z.string().optional(),
    status: z.enum(['active', 'pending', 'deactivate', 'confirmed']).optional(),
    isDeleted: z.boolean().optional(),
  }),
})

export const BookingValidations = {
  createBookingSchema,
  updateBookingSchema,
}
