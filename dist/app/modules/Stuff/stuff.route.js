"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StuffRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const stuff_controller_1 = require("./stuff.controller");
const stuff_validation_1 = require("./stuff.validation");
const router = express_1.default.Router();
router.get('/:id', stuff_controller_1.StuffControllers.getSingleStuff);
router.patch('/:id', (0, validateRequest_1.default)(stuff_validation_1.StuffValidations.updateStuffSchema), stuff_controller_1.StuffControllers.updateStuff);
router.delete('/:id', stuff_controller_1.StuffControllers.deleteStuff);
// router.post(
//   '/create-turf',
//   validateRequest(StuffValidations.createStuffSchema),
//   StuffControllers.createStuff,
// )
router.get('/', stuff_controller_1.StuffControllers.getAllStuff);
exports.StuffRoutes = router;
