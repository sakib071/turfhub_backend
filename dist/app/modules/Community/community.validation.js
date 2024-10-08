"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityValidations = void 0;
const zod_1 = require("zod");
const createCommunitySchema = zod_1.z.object({
    body: zod_1.z.object({
        category: zod_1.z.string(),
        content: zod_1.z.string(),
        location: zod_1.z.string(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        author: zod_1.z.string(),
        likes: zod_1.z.string().optional(),
        comments: zod_1.z.array(zod_1.z.string()).optional(),
        visibility: zod_1.z.enum(['public', 'private']).default('public'),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
const updateCommunitySchema = zod_1.z.object({
    body: zod_1.z.object({
        category: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        author: zod_1.z.string().optional(),
        likes: zod_1.z.string().optional(),
        comments: zod_1.z.array(zod_1.z.string()).optional(),
        visibility: zod_1.z.enum(['public', 'private']).default('public'),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.CommunityValidations = {
    createCommunitySchema,
    updateCommunitySchema,
};
