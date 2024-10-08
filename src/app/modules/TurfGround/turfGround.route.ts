import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { TurfGroundControllers } from './turfGround.controller'
import { TurfGroundValidations } from './turfGround.validation'

const router = express.Router()

router.get('/:id', TurfGroundControllers.getSingleTurfGround)

router.patch(
  '/:id',
  // auth(USER_ROLE.admin),
  validateRequest(TurfGroundValidations.updateTurfGroundSchema),
  TurfGroundControllers.updateTurfGround,
)

router.delete(
  '/:id',
  // auth(USER_ROLE.admin),
  TurfGroundControllers.deleteTurfGround,
)

router.post(
  '/create-turf-ground',
  validateRequest(TurfGroundValidations.createTurfGroundSchema),
  TurfGroundControllers.createTurfGround,
)

router.get('/', TurfGroundControllers.getAllTurfGround)

export const TurfGroundRoutes = router
