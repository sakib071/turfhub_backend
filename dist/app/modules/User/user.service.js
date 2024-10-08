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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const sendEmail_1 = require("./../../utils/sendEmail");
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
// import { verifyToken } from '../Auth/auth.utils'
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const otp_model_1 = require("../Otp/otp.model");
// const updateUserDB = async (payload: TUser) =>{
// }
const sendEmailTemplate = function (email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = `Your OTP Code for Verification`;
        const emailContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; text-align: center; color: #333;"><h2 style="color: #4CAF50;">Your OTP Code</h2><h2 style="font-size: 28px; font-weight: bold; color: #000;">${otp}</h2><p style="font-size: 16px;">Please enter this code to complete your process. If you did not request this, please ignore this email.</p><p style="font-size: 12px; color: #999;">Thank you!</p></div>`;
        (0, sendEmail_1.sendEmail)(email, emailContent, subject);
    });
};
const createUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const isUserExistsByEmail = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (isUserExistsByEmail && isUserExistsByEmail.isVerified) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User already exists with this email');
    }
    //if password is not given , use deafult password
    payload.password = payload.password || config_1.default.default_password;
    //set Stuff email
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // create a user (transaction-1)
        const generateOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const isUserExistsByEmail = yield user_model_1.User.isUserExistsByEmail(payload.email);
        if (!isUserExistsByEmail) {
            const newUser = yield user_model_1.User.create([payload], { session }); // array
            yield otp_model_1.Otp.create({ user_id: newUser[0]._id, otp: generateOtp });
            if (!newUser.length) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
            }
            yield sendEmailTemplate(newUser[0].email, generateOtp);
        }
        else {
            yield otp_model_1.Otp.create({ user_id: isUserExistsByEmail === null || isUserExistsByEmail === void 0 ? void 0 : isUserExistsByEmail._id, otp: generateOtp });
            yield sendEmailTemplate(isUserExistsByEmail.email, generateOtp);
        }
        yield session.commitTransaction();
        yield session.endSession();
        return 'success';
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const changeStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, { status: payload }, { new: true });
    return result;
});
const updateUserDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = payload, updatedPayload = __rest(payload
    // Check if the name is being updated
    , ["email", "role"]);
    // Check if the name is being updated
    if ((updateUserDB === null || updateUserDB === void 0 ? void 0 : updateUserDB.name) == '') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Name cannot be empty');
    }
    // Check if the email is being updated
    if (email) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Email cannot be updated');
    }
    // Check if the role is being updated
    if (role) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Role cannot be updated');
    }
    const result = yield user_model_1.User.findByIdAndUpdate({ _id: id }, updatedPayload, {
        new: true,
        runValidators: true,
    });
    return { user: result };
});
const updateUserRoleDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload, updatedPayload = __rest(payload
    // Check if the name is being updated
    , ["email"]);
    // Check if the name is being updated
    if ((updateUserDB === null || updateUserDB === void 0 ? void 0 : updateUserDB.name) == '') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Name cannot be empty');
    }
    // Check if the email is being updated
    if (email) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Email cannot be updated');
    }
    const result = yield user_model_1.User.findByIdAndUpdate({ _id: id }, updatedPayload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const getAllUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield ProductQuery.countTotal();
    const result = yield ProductQuery.modelQuery;
    return { meta, result };
});
exports.UserServices = {
    createUserDB,
    updateUserDB,
    getSingleUserFromDB,
    changeStatus,
    updateUserRoleDB,
    getAllUserFromDB,
};
