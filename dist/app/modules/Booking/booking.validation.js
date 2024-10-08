"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const createBookingSchema = zod_1.z.object({
    body: zod_1.z.object({
        confirm_by: zod_1.z.string().optional(),
        user: zod_1.z.string(),
        turf: zod_1.z.string(),
        timeslot: zod_1.z.string(),
        status: zod_1.z.enum(['active', 'pending', 'deactivate', 'confirmed']).optional(),
        price: zod_1.z.string(),
        turf_ground: zod_1.z.string(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateBookingSchema = zod_1.z.object({
    body: zod_1.z.object({
        confirm_by: zod_1.z.string().optional(),
        user: zod_1.z.string().optional(),
        turf: zod_1.z.string().optional(),
        timeslot: zod_1.z.string().optional(),
        status: zod_1.z.enum(['active', 'pending', 'deactivate', 'confirmed']).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.BookingValidations = {
    createBookingSchema,
    updateBookingSchema,
};
