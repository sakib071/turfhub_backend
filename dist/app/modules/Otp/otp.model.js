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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../User/user.model");
const OtpSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    otp: { type: String, required: true },
});
OtpSchema.statics.isOtpExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Otp.findById({ _id: id });
        return existingUser;
    });
};
OtpSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield user_model_1.User.findById({ _id: this.user_id });
        if (existingUser) {
            if (!existingUser.isVerified) {
                yield exports.Otp.deleteOne({ user_id: existingUser._id });
                return next(); // proceed with the save
            }
            else {
                // If the user exists and is verified, throw an error
                return next(new Error('Email already exists. Please log in.'));
            }
        }
        next();
    });
});
exports.Otp = (0, mongoose_1.model)('Otps', OtpSchema);
