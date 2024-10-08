"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const superAdmin_controller_1 = require("./superAdmin.controller");
const superAdmin_validation_1 = require("./superAdmin.validation");
const router = express_1.default.Router();
router.get('/:id', superAdmin_controller_1.SuperAdminControllers.getSingleSuperAdmin);
router.patch('/:id', (0, validateRequest_1.default)(superAdmin_validation_1.SuperAdminValidations.updateSuperAdminSchema), superAdmin_controller_1.SuperAdminControllers.updateSuperAdmin);
router.delete('/:id', superAdmin_controller_1.SuperAdminControllers.deleteSuperAdmin);
router.post('/create-turf', (0, validateRequest_1.default)(superAdmin_validation_1.SuperAdminValidations.createSuperAdminSchema), superAdmin_controller_1.SuperAdminControllers.createSuperAdmin);
router.get('/', superAdmin_controller_1.SuperAdminControllers.getAllSuperAdmin);
exports.SuperAdminRoutes = router;
