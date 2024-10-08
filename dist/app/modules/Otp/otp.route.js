"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRoutes = void 0;
const express_1 = __importDefault(require("express"));
const otp_validation_1 = require("./otp.validation");
const otp_controller_1 = require("./otp.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(otp_validation_1.OtpValidations.verificationOtpSchema), otp_controller_1.OtpControllers.verificationOtp);
exports.OtpRoutes = router;
