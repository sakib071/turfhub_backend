import express from 'express'
import { FacilitiesController } from './facilities.controller'
import validateRequest from '../../middlewares/validateRequest'
import { FacilitiesValidationSchema } from './facilities.validation'

const router = express.Router()

router.get('/', FacilitiesController.getAllFacilities)

router.post(
  '/',
  validateRequest(FacilitiesValidationSchema.createFacilitiesValidation),
  FacilitiesController.createFacilities,
)
router.patch(
  '/:id',
  // auth(USER_ROLE.admin),
  validateRequest(FacilitiesValidationSchema.updateFacilitiesValidation),
  FacilitiesController.updateFacilities,
)
router.delete(
  '/:id',
  // auth(USER_ROLE.admin),
  FacilitiesController.deleteFacilities,
)

export const FacilitiesRoutes = router
