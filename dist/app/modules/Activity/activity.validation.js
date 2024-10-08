"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityValidationSchema = void 0;
const zod_1 = require("zod");
const createActivityValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
    }),
});
const updateActivityValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
    }),
});
exports.ActivityValidationSchema = {
    createActivityValidation,
    updateActivityValidation,
};
