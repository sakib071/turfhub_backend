"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurfGroundValidations = void 0;
const zod_1 = require("zod");
const createTurfGroundSchema = zod_1.z.object({
    body: zod_1.z.object({
        unit: zod_1.z.string(),
        size: zod_1.z.string(),
        sport: zod_1.z.string(),
        price_per_hour: zod_1.z.number(),
        field_size: zod_1.z.string(),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
const updateTurfGroundSchema = zod_1.z.object({
    body: zod_1.z.object({
        unit: zod_1.z.string().optional(),
        size: zod_1.z.string().optional(),
        sport: zod_1.z.string().optional(),
        price_per_hour: zod_1.z.number().optional(),
        discount: zod_1.z.number().optional(),
        field_size: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.TurfGroundValidations = {
    createTurfGroundSchema,
    updateTurfGroundSchema,
};
