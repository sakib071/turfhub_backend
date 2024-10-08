"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilitiesValidationSchema = void 0;
const zod_1 = require("zod");
const createFacilitiesValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
    }),
});
const updateFacilitiesValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
    }),
});
exports.FacilitiesValidationSchema = {
    createFacilitiesValidation,
    updateFacilitiesValidation,
};
