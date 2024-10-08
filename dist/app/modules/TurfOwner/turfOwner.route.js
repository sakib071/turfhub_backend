"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurfOwnerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const turfOwner_controller_1 = require("./turfOwner.controller");
const turfOwner_validation_1 = require("./turfOwner.validation");
const router = express_1.default.Router();
router.get('/:id', turfOwner_controller_1.TurfOwnerControllers.getSingleTurfOwner);
router.patch('/:id', (0, validateRequest_1.default)(turfOwner_validation_1.TurfOwnerValidations.updateTurfOwnerSchema), turfOwner_controller_1.TurfOwnerControllers.updateTurfOwner);
router.delete('/:id', turfOwner_controller_1.TurfOwnerControllers.deleteTurfOwner);
router.post('/create-turf', (0, validateRequest_1.default)(turfOwner_validation_1.TurfOwnerValidations.createTurfOwnerSchema), turfOwner_controller_1.TurfOwnerControllers.createTurfOwner);
router.get('/', turfOwner_controller_1.TurfOwnerControllers.getAllTurfOwner);
exports.TurfOwnerRoutes = router;
