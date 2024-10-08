"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminValidations = void 0;
const zod_1 = require("zod");
const createSuperAdminSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string(), // Assuming user is a string ObjectId
        name: zod_1.z.string().min(1),
        location: zod_1.z.string().min(1),
        contactNo: zod_1.z.string().min(1),
        address: zod_1.z.string().min(1),
        turfImage: zod_1.z.array(zod_1.z.string()),
        createBy: zod_1.z.string(), // Assuming createBy is a string ObjectId
        turf: zod_1.z.string(), // Assuming turf is a string ObjectId
        status: zod_1.z.enum(['active', 'pending', 'deactivate']).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateSuperAdminSchema = zod_1.z.object({
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
exports.SuperAdminValidations = {
    createSuperAdminSchema,
    updateSuperAdminSchema,
};
