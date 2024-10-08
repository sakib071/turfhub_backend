"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
// import express, { NextFunction, Request, Response } from 'express';
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
// import { upload } from '../../utils/sendImageToCloudinary';
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get('/', user_controller_1.UserControllers.getAllUser);
router.get('/:id', user_controller_1.UserControllers.getSingleUser);
// General user data insert route
router.post('/create-user', (0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), user_controller_1.UserControllers.createUser);
// General user data updating route
router.patch('/:id', 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(user_validation_1.UserValidation.updateValidationSchema), user_controller_1.UserControllers.updateUser);
// General user data updating route
router.patch('/:id/role', 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(user_validation_1.UserValidation.updateValidationSchema), user_controller_1.UserControllers.updateUserRole);
exports.UserRoutes = router;
