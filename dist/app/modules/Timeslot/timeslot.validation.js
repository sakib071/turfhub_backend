"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeslotValidations = void 0;
const zod_1 = require("zod");
const createTimeslotSchema = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string(),
        turf: zod_1.z.string(),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
const updateTimeslotSchema = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional(),
        turf: zod_1.z.string().optional(),
        activity: zod_1.z.string().optional(),
        status: zod_1.z.enum(['active', 'deactivate']).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.TimeslotValidations = {
    createTimeslotSchema,
    updateTimeslotSchema,
};
