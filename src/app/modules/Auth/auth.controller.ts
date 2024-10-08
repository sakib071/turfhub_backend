import httpStatus from 'http-status'
import config from '../../config'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)
  const { refreshToken, accessToken, needsPasswordChange, user } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
      needsPasswordChange,
      user,
    },
  })
})

// const changePassword = catchAsync(async (req, res) => {
//   const { ...passwordData } = req.body
//   console.log(req.user)
//   // const result = await AuthServices.changePassword(req.user, passwordData);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Password is updated succesfully!',
//     data: null,
//   })
// })

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  })
})

const forgetPassword = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await AuthServices.forgetPassword(payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your new password has been successfully sent to your email!',
    data: result,
  })
})

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string
  const result = await AuthServices.resetPassword(req.body, token)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password reset successfully!',
    data: result,
  })
})

export const AuthControllers = {
  loginUser,
  //   changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}
