"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurfGroundRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const turfGround_controller_1 = require("./turfGround.controller");
const turfGround_validation_1 = require("./turfGround.validation");
const router = express_1.default.Router();
router.get('/:id', turfGround_controller_1.TurfGroundControllers.getSingleTurfGround);
router.patch('/:id', 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(turfGround_validation_1.TurfGroundValidations.updateTurfGroundSchema), turfGround_controller_1.TurfGroundControllers.updateTurfGround);
router.delete('/:id', 
// auth(USER_ROLE.admin),
turfGround_controller_1.TurfGroundControllers.deleteTurfGround);
router.post('/create-turf-ground', (0, validateRequest_1.default)(turfGround_validation_1.TurfGroundValidations.createTurfGroundSchema), turfGround_controller_1.TurfGroundControllers.createTurfGround);
router.get('/', turfGround_controller_1.TurfGroundControllers.getAllTurfGround);
exports.TurfGroundRoutes = router;
