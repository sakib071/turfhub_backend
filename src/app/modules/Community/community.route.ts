import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CommunityControllers } from './community.controller'
import { CommunityValidations } from './community.validation'

const router = express.Router()

router.get('/:id', CommunityControllers.getSingleCommunity)

router.patch(
  '/:id',
  // auth(USER_ROLE.admin),
  validateRequest(CommunityValidations.updateCommunitySchema),
  CommunityControllers.updateCommunity,
)

router.delete(
  '/:id',
  // auth(USER_ROLE.admin),
  CommunityControllers.deleteCommunity,
)

router.post(
  '/create-community',
  validateRequest(CommunityValidations.createCommunitySchema),
  CommunityControllers.createCommunity,
)

router.get('/', CommunityControllers.getAllCommunity)

export const CommunityRoutes = router
