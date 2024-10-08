"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesValidations = void 0;
const zod_1 = require("zod");
// Define the product validation schema
const ProductSchema = zod_1.z.object({
    id: zod_1.z.string(), // Validate as an instance of ObjectId
    sales_quantity: zod_1.z.number().min(1, { message: 'Count must be at least 1' }), // Ensure count is a number and at least 1
});
const createSalesSchema = zod_1.z.object({
    body: zod_1.z.object({
        buyer: zod_1.z.string(), // Validate as an instance of ObjectId
        products: zod_1.z.array(ProductSchema), // Product is an array of Product
        isDeleted: zod_1.z.boolean().optional(), // Optional boolean
    }),
});
const updateSalesSchema = zod_1.z.object({
    body: zod_1.z.object({
        buyer: zod_1.z.string().optional(), // Validate as an instance of ObjectId
        products: zod_1.z.array(ProductSchema).optional(), // Product is an array of Product
        isDeleted: zod_1.z.boolean().optional(), // Optional boolean
    }),
});
exports.SalesValidations = {
    createSalesSchema,
    updateSalesSchema,
};
