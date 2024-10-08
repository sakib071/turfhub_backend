import express from 'express'
import { OtpValidations } from './otp.validation'
import { OtpControllers } from './otp.controller'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/',
  validateRequest(OtpValidations.verificationOtpSchema),
  OtpControllers.verificationOtp,
)

export const OtpRoutes = router
