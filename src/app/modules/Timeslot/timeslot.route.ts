import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { TimeslotControllers } from './timeslot.controller'
import { TimeslotValidations } from './timeslot.validation'

const router = express.Router()

router.get('/dashboard', TimeslotControllers.getDashboardAllTimeslot)
router.get('/dashboard/:id', TimeslotControllers.getDashboardSingleTimeslot)

router.get('/:id', TimeslotControllers.getSingleTimeslot)

router.patch(
  '/:id',
  // auth(USER_ROLE.admin),
  validateRequest(TimeslotValidations.updateTimeslotSchema),
  TimeslotControllers.updateTimeslot,
)

router.delete(
  '/:id',
  // auth(USER_ROLE.admin),
  TimeslotControllers.deleteTimeslot,
)

router.post(
  '/create-time',
  validateRequest(TimeslotValidations.createTimeslotSchema),
  TimeslotControllers.createTimeslot,
)

router.get('/', TimeslotControllers.getAllTimeslot)

export const TimeslotRoutes = router
