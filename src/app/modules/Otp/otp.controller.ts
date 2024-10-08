import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { OtpServices } from './otp.service'
import { Request, Response } from 'express'

const verificationOtp = catchAsync(async (req: Request, res: Response) => {
  const result = await OtpServices.verificationOtpFromDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OTP verification successful! Proceed to the next step',
    data: result,
  })
})

export const OtpControllers = {
  verificationOtp,
}
