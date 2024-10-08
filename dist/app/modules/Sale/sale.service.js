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
exports.SalesServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sale_constant_1 = require("./sale.constant");
const sale_model_1 = require("./sale.model");
const product_model_1 = require("../Product/product.model");
const getAllSalesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const SalesQuery = new QueryBuilder_1.default(sale_model_1.Sales.find()
        .populate('buyer')
        .populate({
        path: 'products',
        populate: [{ path: 'id' }],
    }), query)
        .search(sale_constant_1.SalesSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield SalesQuery.countTotal();
    const result = yield SalesQuery.modelQuery;
    const count_products = (result === null || result === void 0 ? void 0 : result.length) > 0 ? result[0].products.length : 0;
    return { meta, count_products, result };
});
const getSingleSalesFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isSalesExists = yield sale_model_1.Sales.isSalesExists(id);
    if (!isSalesExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Sales is not found !');
    }
    const result = yield sale_model_1.Sales.findById(id)
        .populate('buyer')
        .populate({
        path: 'products',
        populate: [{ path: 'id' }],
    });
    const count_products = result === null || result === void 0 ? void 0 : result.products.length;
    return { count_products, result };
});
const updateSalesIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isSalesExists = yield sale_model_1.Sales.findById(id);
    if (!isSalesExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Sales is not found !');
    }
    const result = yield sale_model_1.Sales.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteSalesFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // to check is Delete is ture
        const isSalesExists = yield sale_model_1.Sales.isSalesExists(id);
        if (!isSalesExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Sales is not found !');
        }
        const deletedSales = yield sale_model_1.Sales.findByIdAndUpdate(id, { isDeleted: true });
        console.log({ deletedSales, id });
        if (!deletedSales) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Sales');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return { deletedSales };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createSalesFromDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buyer, products } = req.body;
        // Validate buyer ID
        if (!buyer) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Buyer ID is required');
        }
        // Validate products and check availability
        const productsToUpdate = yield product_model_1.Product.find({
            _id: { $in: products.map((p) => p.id) },
        });
        const productMap = new Map();
        for (const p of productsToUpdate) {
            productMap.set(p._id.toString(), p);
        }
        const stockOutMessages = []; // Array to collect stock out messages
        for (const p of products) {
            const productFound = productMap.get(p.id);
            // If the product is not found
            if (!productFound) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Product ID ${p.id} not found.`);
            }
            if (productFound.quantity < p.sales_quantity) {
                stockOutMessages.push(`Insufficient stock for product ${p.id}. Requested: ${p.sales_quantity}, Available: ${productFound.quantity}`);
            }
        }
        // If there are stock out messages, return them
        if (stockOutMessages.length > 0) {
            return res.status(400).json({ messages: stockOutMessages });
        }
        // Create BuyerProduct entry
        const buyerProduct = yield sale_model_1.Sales.create({ buyer, products });
        // Update product quantities
        for (const p of products) {
            const productToUpdate = productMap.get(p.id);
            productToUpdate.quantity -= p.sales_quantity;
            yield productToUpdate.save();
        }
        return buyerProduct;
    }
    catch (error) {
        console.error(error);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
});
exports.SalesServices = {
    getAllSalesFromDB,
    getSingleSalesFromDB,
    updateSalesIntoDB,
    deleteSalesFromDB,
    createSalesFromDB,
};
