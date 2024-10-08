"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const userValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: 'Password must be string',
    })
        .max(20, { message: 'Password can not be more than 20 characters' })
        .optional(),
});
const createStuffSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty('Name is required'), // 'name' is required
        contactNo: zod_1.z.string().optional(), // 'contactNo' is optional
        profileImg: zod_1.z.string().optional(), // 'profileImg' is optional
        email: zod_1.z.string().email('Invalid email format'), // 'email' is required and must be valid
        phone: zod_1.z.string().optional(), // 'phone' is optional
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'), // 'password' is required with a minimum length
        needsPasswordChange: zod_1.z.boolean().optional(), // 'needsPasswordChange' is optional
        passwordChangedAt: zod_1.z.date().optional(), // 'passwordChangedAt' is optional
        role: zod_1.z.enum(['stuff', 'player', 'turf_owner', 'admin']).default('player'),
        status: zod_1.z.enum(['in-progress', 'blocked']).default('in-progress'), // 'status' defaults to 'in-progress'
        isDeleted: zod_1.z.boolean().optional(), // 'isDeleted' is required
    }),
});
const updateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(), // 'name' is required
        email: zod_1.z.string().email('Invalid email format').optional(), // 'email' is required and must be valid
        contactNo: zod_1.z.string().optional(), // 'contactNo' is optional
        profileImg: zod_1.z.string().optional(), // 'profileImg' is optional
        phone: zod_1.z.string().optional(), // 'phone' is optional
        needsPasswordChange: zod_1.z.boolean().optional(), // 'needsPasswordChange' is optional
        isVerified: zod_1.z.boolean().optional(), // 'needsPasswordChange' is optional
        passwordChangedAt: zod_1.z.date().optional(), // 'passwordChangedAt' is optional
        isDeleted: zod_1.z.boolean().optional(), // 'isDeleted' is required
    }),
});
const changeStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...user_constant_1.Userstatus]),
    }),
});
exports.UserValidation = {
    userValidationSchema,
    updateValidationSchema,
    createStuffSchema,
    changeStatusValidationSchema,
};
