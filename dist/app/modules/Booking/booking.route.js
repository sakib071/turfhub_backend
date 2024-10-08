"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.get('/:id', booking_controller_1.BookingControllers.getSingleBooking);
router.patch('/:id', 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(booking_validation_1.BookingValidations.updateBookingSchema), booking_controller_1.BookingControllers.updateBooking);
router.delete('/:id', booking_controller_1.BookingControllers.deleteBooking);
router.post('/create-booking', 
// validateRequest(BookingValidations.createBookingSchema),
booking_controller_1.BookingControllers.createBooking);
router.get('/', booking_controller_1.BookingControllers.getAllBooking);
exports.BookingRoutes = router;
