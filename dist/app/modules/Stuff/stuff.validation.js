"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StuffValidations = void 0;
const zod_1 = require("zod");
const createStuffSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().optional(), // Ensures it's a valid email format
        password: zod_1.z.string().min(6).optional(), // Ensures the password has a minimum length of 6 charactersrole to specific values
        status: zod_1.z.enum(['in-progress', 'blocked']).optional(), // Restricts status to specific values
        isDeleted: zod_1.z.boolean().optional(), // Validates that it's a boolean value
    }),
});
const updateStuffSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        owner: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        facilities: zod_1.z.string().optional(), // Assuming facilities is a string ID
        turfImage: zod_1.z.array(zod_1.z.string()).min(1).optional(),
        activity: zod_1.z.string().optional(), // Assuming activity is a string ID
        status: zod_1.z.enum(['active ', 'pending', 'deactivate']).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.StuffValidations = {
    createStuffSchema,
    updateStuffSchema,
};
