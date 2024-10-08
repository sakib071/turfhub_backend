import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SalesControllers } from './sale.controller'
import { SalesValidations } from './sale.validation'

const router = express.Router()

router.get('/:id', SalesControllers.getSingleSales)

router.patch(
  '/:id',
  // auth(USER_ROLE.admin),
  validateRequest(SalesValidations.updateSalesSchema),
  SalesControllers.updateSales,
)

router.delete(
  '/:id',
  // auth(USER_ROLE.admin),
  SalesControllers.deleteSales,
)

router.post(
  '/create-Sales',
  validateRequest(SalesValidations.createSalesSchema),
  SalesControllers.createSales,
)

router.get('/', SalesControllers.getAllSales)

export const SalesRoutes = router
