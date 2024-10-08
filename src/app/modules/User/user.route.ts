// import express, { NextFunction, Request, Response } from 'express';
import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserControllers } from './user.controller'
// import { upload } from '../../utils/sendImageToCloudinary';
import { UserValidation } from './user.validation'

const router = express.Router()

router.get('/', UserControllers.getAllUser)

router.get('/:id', UserControllers.getSingleUser)

// General user data insert route
router.post(
  '/create-user',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
)

// General user data updating route
router.patch(
  '/:id',
  // auth(USER_ROLE.admin),
  validateRequest(UserValidation.updateValidationSchema),
  UserControllers.updateUser,
)

// General user data updating route
router.patch(
  '/:id/role',
  // auth(USER_ROLE.admin),
  validateRequest(UserValidation.updateValidationSchema),
  UserControllers.updateUserRole,
)

export const UserRoutes = router
