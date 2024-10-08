import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { TurfControllers } from './turf.controller'
import { TurfValidations } from './turf.validation'

const router = express.Router()

router.get('/filter_by_facilities', TurfControllers.getAllTurfByFacilities)

router.get('/:id', TurfControllers.getSingleTurf)

router.get('/timeslot/:id', TurfControllers.getAllTimeslotByTurf)

router.patch(
  '/:id',
  // auth(USER_ROLE.admin),
  validateRequest(TurfValidations.updateTurfSchema),
  TurfControllers.updateTurf,
)

router.delete(
  '/:id',
  // auth(USER_ROLE.admin),
  TurfControllers.deleteTurf,
)

router.post(
  '/create-turf',
  validateRequest(TurfValidations.createTurfSchema),
  TurfControllers.createTurf,
)

router.get('/', TurfControllers.getAllTurf)

export const TurfRoutes = router
