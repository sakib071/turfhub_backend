"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../User/user.model");
const otp_model_1 = require("./otp.model");
const verificationOtpFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user by email
    const user = yield user_model_1.User.findOne({ email: payload.email });
    // Check if the user exists
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    // Find and delete the OTP entry associated with the user
    const otpEntry = yield otp_model_1.Otp.findOneAndDelete({
        user_id: user._id,
        otp: payload.otp,
    });
    // Check if the OTP entry was found
    if (!otpEntry) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'OTP not found!');
    }
    // Update the user to set isVerified to true
    yield user_model_1.User.updateOne({ _id: user._id }, { $set: { isVerified: true } });
    // Return the verified OTP entry
    return otpEntry;
});
exports.OtpServices = {
    verificationOtpFromDB,
};
