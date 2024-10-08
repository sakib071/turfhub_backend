"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const community_controller_1 = require("./community.controller");
const community_validation_1 = require("./community.validation");
const router = express_1.default.Router();
router.get('/:id', community_controller_1.CommunityControllers.getSingleCommunity);
router.patch('/:id', 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(community_validation_1.CommunityValidations.updateCommunitySchema), community_controller_1.CommunityControllers.updateCommunity);
router.delete('/:id', 
// auth(USER_ROLE.admin),
community_controller_1.CommunityControllers.deleteCommunity);
router.post('/create-community', (0, validateRequest_1.default)(community_validation_1.CommunityValidations.createCommunitySchema), community_controller_1.CommunityControllers.createCommunity);
router.get('/', community_controller_1.CommunityControllers.getAllCommunity);
exports.CommunityRoutes = router;
