import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductControllers } from './product.controller'
import { ProductValidations } from './product.validation'

const router = express.Router()

router.get('/:id', ProductControllers.getSingleProduct)

router.patch(
  '/:id',
  // auth(USER_ROLE.admin),
  validateRequest(ProductValidations.updateProductSchema),
  ProductControllers.updateProduct,
)

router.delete(
  '/:id',
  // auth(USER_ROLE.admin),
  ProductControllers.deleteProduct,
)

router.post(
  '/create-product',
  validateRequest(ProductValidations.createProductSchema),
  ProductControllers.createProduct,
)

router.get('/', ProductControllers.getAllProduct)

export const ProductRoutes = router
