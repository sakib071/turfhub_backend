"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const sale_controller_1 = require("./sale.controller");
const sale_validation_1 = require("./sale.validation");
const router = express_1.default.Router();
router.get('/:id', sale_controller_1.SalesControllers.getSingleSales);
router.patch('/:id', 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(sale_validation_1.SalesValidations.updateSalesSchema), sale_controller_1.SalesControllers.updateSales);
router.delete('/:id', 
// auth(USER_ROLE.admin),
sale_controller_1.SalesControllers.deleteSales);
router.post('/create-Sales', (0, validateRequest_1.default)(sale_validation_1.SalesValidations.createSalesSchema), sale_controller_1.SalesControllers.createSales);
router.get('/', sale_controller_1.SalesControllers.getAllSales);
exports.SalesRoutes = router;
