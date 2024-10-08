"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpValidations = void 0;
const zod_1 = require("zod");
const verificationOtpSchema = zod_1.z.object({
    body: zod_1.z.object({
        otp: zod_1.z.string(),
    }),
});
exports.OtpValidations = {
    verificationOtpSchema,
};
