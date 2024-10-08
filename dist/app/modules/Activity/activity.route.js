"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const activity_validation_1 = require("./activity.validation");
const activity_controller_1 = require("./activity.controller");
const router = express_1.default.Router();
router.get('/', activity_controller_1.ActivityController.getAllActivity);
router.post('/', (0, validateRequest_1.default)(activity_validation_1.ActivityValidationSchema.createActivityValidation), activity_controller_1.ActivityController.createActivity);
router.patch('/:id', (0, validateRequest_1.default)(activity_validation_1.ActivityValidationSchema.updateActivityValidation), activity_controller_1.ActivityController.updateActivity);
router.delete('/:id', activity_controller_1.ActivityController.deleteActivity);
exports.ActivityRoutes = router;
