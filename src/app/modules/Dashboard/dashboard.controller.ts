import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { DashboardServices } from './dashboard.service'
import { Request, Response } from 'express'

const getTurfOwnerDashboard = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await DashboardServices.getTurfOwnerDashboardFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Turf Owner Dashboard are retrieved successfully',
      data: result,
    })
  },
)
const getAdminDashboard = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await DashboardServices.getAdminDashboardFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Dashboard are retrieved successfully',
    data: result,
  })
})

export const DashboardControllers = {
  getAdminDashboard,
  getTurfOwnerDashboard,
}
