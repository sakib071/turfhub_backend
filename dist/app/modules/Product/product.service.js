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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("./product.model");
const product_constant_1 = require("./product.constant");
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductQuery = new QueryBuilder_1.default(product_model_1.Product.find().populate('owner'), query)
        .search(product_constant_1.ProductSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield ProductQuery.countTotal();
    const result = yield ProductQuery.modelQuery;
    return { meta, result };
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield product_model_1.Product.isProductExists(id);
    if (!isProductExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Product is not found !');
    }
    const result = yield product_model_1.Product.findById(id).populate('owner');
    return result;
});
const updateProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield product_model_1.Product.findById(id);
    if (!isProductExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Product is not found !');
    }
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // to check is Delete is ture
        const isProductExists = yield product_model_1.Product.isProductExists(id);
        if (!isProductExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Product is not found !');
        }
        const deletedProduct = yield product_model_1.Product.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        console.log({ deletedProduct, id });
        if (!deletedProduct) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Product');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const { _id, name, quantity, price } = deletedProduct;
        return { _id, name, quantity, price };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createProductFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
exports.ProductServices = {
    getAllProductFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
    createProductFromDB,
};
