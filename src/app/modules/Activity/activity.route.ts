import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ActivityValidationSchema } from './activity.validation'
import { ActivityController } from './activity.controller'

const router = express.Router()

router.get('/', ActivityController.getAllActivity)

router.post(
  '/',
  validateRequest(ActivityValidationSchema.createActivityValidation),
  ActivityController.createActivity,
)
router.patch(
  '/:id',
  validateRequest(ActivityValidationSchema.updateActivityValidation),
  ActivityController.updateActivity,
)
router.delete('/:id', ActivityController.deleteActivity)

export const ActivityRoutes = router
