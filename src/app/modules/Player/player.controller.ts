import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { Request, Response } from 'express'
import { PlayerServices } from './player.service'

const getAllPlayer = catchAsync(async (req: Request, res: Response) => {
  const result = await PlayerServices.getAllPlayerFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Player are retrieved successfully',
    data: result,
  })
})

const getSinglePlayer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await PlayerServices.getSinglePlayerFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Player are retrieved successfully',
    data: result,
  })
})

const updatePlayer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await PlayerServices.updatePlayerIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Player is updated successfully',
    data: result,
  })
})

const deletePlayer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await PlayerServices.deletePlayerFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Player is deleted successfully',
    data: result,
  })
})

const createPlayer = catchAsync(async (req: Request, res: Response) => {
  const result = await PlayerServices.createPlayerFromDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Player is created successfully!',
    data: result,
  })
})
export const PlayerControllers = {
  getAllPlayer,
  getSinglePlayer,
  updatePlayer,
  deletePlayer,
  createPlayer,
}
