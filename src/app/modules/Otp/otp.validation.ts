import { z } from 'zod'

const verificationOtpSchema = z.object({
  body: z.object({
    otp: z.string(),
  }),
})

export const OtpValidations = {
  verificationOtpSchema,
}
