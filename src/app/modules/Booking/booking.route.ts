import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookingControllers } from './booking.controller'
import { BookingValidations } from './booking.validation'

const router = express.Router()

router.get('/:id', BookingControllers.getSingleBooking)

router.patch(
  '/:id',
  // auth(USER_ROLE.admin),
  validateRequest(BookingValidations.updateBookingSchema),
  BookingControllers.updateBooking,
)

router.delete('/:id', BookingControllers.deleteBooking)

router.post(
  '/create-booking',
  // validateRequest(BookingValidations.createBookingSchema),
  BookingControllers.createBooking,
)

router.get('/', BookingControllers.getAllBooking)

export const BookingRoutes = router
