"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilitiesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const facilities_controller_1 = require("./facilities.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facilities_validation_1 = require("./facilities.validation");
const router = express_1.default.Router();
router.get('/', facilities_controller_1.FacilitiesController.getAllFacilities);
router.post('/', (0, validateRequest_1.default)(facilities_validation_1.FacilitiesValidationSchema.createFacilitiesValidation), facilities_controller_1.FacilitiesController.createFacilities);
router.patch('/:id', 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(facilities_validation_1.FacilitiesValidationSchema.updateFacilitiesValidation), facilities_controller_1.FacilitiesController.updateFacilities);
router.delete('/:id', 
// auth(USER_ROLE.admin),
facilities_controller_1.FacilitiesController.deleteFacilities);
exports.FacilitiesRoutes = router;
