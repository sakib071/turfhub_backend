"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'cancelled', 'failed'],
        default: 'pending',
    },
    price: {
        type: mongoose_1.Schema.Types.Decimal128,
        required: true, // Ensures price is required
    },
    discount: {
        type: Number,
        default: null,
    },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    notes: {
        type: String,
        default: '', // Optional field, defaults to an empty string if not provided
    },
    image: {
        type: [String], // Array of strings for image URLs
        default: [], // Optional, defaults to an empty array
    },
    isDeleted: {
        type: Boolean,
        default: false, // Optional, defaults to false
    },
}, { timestamps: true });
// filter out deleted documents
ProductSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
ProductSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
ProductSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
ProductSchema.statics.isProductExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Product.findById({ _id: id });
        return existingUser;
    });
};
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
