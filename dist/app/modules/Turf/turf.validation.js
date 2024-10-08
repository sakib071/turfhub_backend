"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurfValidations = void 0;
const zod_1 = require("zod");
const createTurfSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        location: zod_1.z.string(),
        rating: zod_1.z.string().optional(),
        owner: zod_1.z.string(),
        address: zod_1.z.string(),
        city: zod_1.z.string(),
        facilities: zod_1.z.array(zod_1.z.string()), // Assuming facilities is a string ID
        logoImage: zod_1.z.array(zod_1.z.string()).min(1),
        coverImage: zod_1.z.array(zod_1.z.string()).min(1),
        activity: zod_1.z.array(zod_1.z.string()), // Assuming activity is a string ID
        status: zod_1.z.enum(['active', 'pending', 'deactivate']).optional(),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
const updateTurfSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        rating: zod_1.z.string().optional(),
        owner: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        facilities: zod_1.z.string().optional(), // Assuming facilities is a string ID
        logoImage: zod_1.z.array(zod_1.z.string()).optional(),
        coverImage: zod_1.z.array(zod_1.z.string()).optional(),
        activity: zod_1.z.string().optional(), // Assuming activity is a string ID
        status: zod_1.z.enum(['active', 'pending', 'deactivate']).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.TurfValidations = {
    createTurfSchema,
    updateTurfSchema,
};
