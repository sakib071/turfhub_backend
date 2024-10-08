"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
router.get('/:id', product_controller_1.ProductControllers.getSingleProduct);
router.patch('/:id', 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(product_validation_1.ProductValidations.updateProductSchema), product_controller_1.ProductControllers.updateProduct);
router.delete('/:id', 
// auth(USER_ROLE.admin),
product_controller_1.ProductControllers.deleteProduct);
router.post('/create-product', (0, validateRequest_1.default)(product_validation_1.ProductValidations.createProductSchema), product_controller_1.ProductControllers.createProduct);
router.get('/', product_controller_1.ProductControllers.getAllProduct);
exports.ProductRoutes = router;
