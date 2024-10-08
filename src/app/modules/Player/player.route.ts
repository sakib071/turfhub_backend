import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { PlayerControllers } from './player.controller'
import { PlayerValidations } from './player.validation'

const router = express.Router()

router.get('/:id', PlayerControllers.getSinglePlayer)

router.patch(
  '/:id',
  // auth(USER_ROLE.admin),
  validateRequest(PlayerValidations.updatePlayerSchema),
  PlayerControllers.updatePlayer,
)

router.delete(
  '/:id',
  // auth(USER_ROLE.admin),
  PlayerControllers.deletePlayer,
)

router.post(
  '/create-turf',
  validateRequest(PlayerValidations.createPlayerSchema),
  PlayerControllers.createPlayer,
)

router.get('/', PlayerControllers.getAllPlayer)

export const PlayerRoutes = router
