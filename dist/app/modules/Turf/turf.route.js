"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurfRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const turf_controller_1 = require("./turf.controller");
const turf_validation_1 = require("./turf.validation");
const router = express_1.default.Router();
router.get('/filter_by_facilities', turf_controller_1.TurfControllers.getAllTurfByFacilities);
router.get('/:id', turf_controller_1.TurfControllers.getSingleTurf);
router.get('/timeslot/:id', turf_controller_1.TurfControllers.getAllTimeslotByTurf);
router.patch('/:id', 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(turf_validation_1.TurfValidations.updateTurfSchema), turf_controller_1.TurfControllers.updateTurf);
router.delete('/:id', 
// auth(USER_ROLE.admin),
turf_controller_1.TurfControllers.deleteTurf);
router.post('/create-turf', (0, validateRequest_1.default)(turf_validation_1.TurfValidations.createTurfSchema), turf_controller_1.TurfControllers.createTurf);
router.get('/', turf_controller_1.TurfControllers.getAllTurf);
exports.TurfRoutes = router;
