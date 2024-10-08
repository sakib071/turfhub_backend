"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const zod_1 = require("zod");
const createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        quantity: zod_1.z.number(),
        status: zod_1.z
            .enum(['pending', 'in_progress', 'completed', 'cancelled', 'failed'])
            .default('pending'),
        price: zod_1.z.string(),
        discount: zod_1.z.number().optional(),
        owner: zod_1.z.string(),
        notes: zod_1.z.string().optional(),
        image: zod_1.z.array(zod_1.z.string()).optional(),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
const updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        quantity: zod_1.z.number().optional(),
        status: zod_1.z
            .enum(['pending', 'in_progress', 'completed', 'cancelled', 'failed'])
            .optional(),
        price: zod_1.z.string().optional(),
        discount: zod_1.z.number().optional(),
        owner: zod_1.z.string().optional(),
        notes: zod_1.z.string().optional(),
        image: zod_1.z.array(zod_1.z.string()).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.ProductValidations = {
    createProductSchema,
    updateProductSchema,
};
