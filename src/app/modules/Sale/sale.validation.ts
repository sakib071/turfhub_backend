import { z } from 'zod'

// Define the product validation schema
const ProductSchema = z.object({
  id: z.string(), // Validate as an instance of ObjectId
  sales_quantity: z.number().min(1, { message: 'Count must be at least 1' }), // Ensure count is a number and at least 1
})

const createSalesSchema = z.object({
  body: z.object({
    buyer: z.string(), // Validate as an instance of ObjectId
    products: z.array(ProductSchema), // Product is an array of Product
    isDeleted: z.boolean().optional(), // Optional boolean
  }),
})

const updateSalesSchema = z.object({
  body: z.object({
    buyer: z.string().optional(), // Validate as an instance of ObjectId
    products: z.array(ProductSchema).optional(), // Product is an array of Product
    isDeleted: z.boolean().optional(), // Optional boolean
  }),
})

export const SalesValidations = {
  createSalesSchema,
  updateSalesSchema,
}
