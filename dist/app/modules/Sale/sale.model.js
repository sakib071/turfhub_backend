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
exports.Sales = void 0;
const mongoose_1 = require("mongoose");
// Define the ProductSchema
const ProductSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    sales_quantity: { type: Number, required: true, min: 1 }, // count must be at least 1
});
// Define the SalesSchema
const SalesSchema = new mongoose_1.Schema({
    buyer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    products: { type: [ProductSchema], required: true }, // Ensure this is an array of ProductSchema
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
// filter out deleted documents
SalesSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
SalesSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
SalesSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
SalesSchema.statics.isSalesExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Sales.findById({ _id: id });
        return existingUser;
    });
};
exports.Sales = (0, mongoose_1.model)('Sales', SalesSchema);
