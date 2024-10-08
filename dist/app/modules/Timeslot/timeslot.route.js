"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeslotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const timeslot_controller_1 = require("./timeslot.controller");
const timeslot_validation_1 = require("./timeslot.validation");
const router = express_1.default.Router();
router.get('/dashboard', timeslot_controller_1.TimeslotControllers.getDashboardAllTimeslot);
router.get('/dashboard/:id', timeslot_controller_1.TimeslotControllers.getDashboardSingleTimeslot);
router.get('/:id', timeslot_controller_1.TimeslotControllers.getSingleTimeslot);
router.patch('/:id', 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(timeslot_validation_1.TimeslotValidations.updateTimeslotSchema), timeslot_controller_1.TimeslotControllers.updateTimeslot);
router.delete('/:id', 
// auth(USER_ROLE.admin),
timeslot_controller_1.TimeslotControllers.deleteTimeslot);
router.post('/create-time', (0, validateRequest_1.default)(timeslot_validation_1.TimeslotValidations.createTimeslotSchema), timeslot_controller_1.TimeslotControllers.createTimeslot);
router.get('/', timeslot_controller_1.TimeslotControllers.getAllTimeslot);
exports.TimeslotRoutes = router;
