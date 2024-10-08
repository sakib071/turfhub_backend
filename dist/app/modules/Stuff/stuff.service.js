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
exports.StuffServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const stuff_model_1 = require("./stuff.model");
const stuff_constant_1 = require("./stuff.constant");
const getAllStuffFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const StuffQuery = new QueryBuilder_1.default(stuff_model_1.Stuff.find().populate('facilities').populate('activity'), //.populate('academicDepartment'),
    query)
        .search(stuff_constant_1.StuffSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield StuffQuery.countTotal();
    const result = yield StuffQuery.modelQuery;
    return { meta, result };
});
const getSingleStuffFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isStuffExists = yield stuff_model_1.Stuff.isStuffExists(id);
    if (!isStuffExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Stuff is not found !');
    }
    const result = yield stuff_model_1.Stuff.findById(id)
        .populate('facilities')
        .populate('activity'); //.populate('academicDepartment')
    return result;
});
// const updateStuffIntoDB = async (id: string, payload: Partial<TStuff>) => {
//   const { name, ...remainingStuffData } = payload
//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingStuffData,
//   }
//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }
//   const result = await Stuff.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }
const updateStuffIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isStuffExists = yield stuff_model_1.Stuff.findById(id);
    if (!isStuffExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Stuff is not found !');
    }
    const result = yield stuff_model_1.Stuff.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteStuffFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // to check is Delete is ture
        const isStuffExists = yield stuff_model_1.Stuff.isStuffExists(id);
        if (!isStuffExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Stuff is not found !');
        }
        const deletedStuff = yield stuff_model_1.Stuff.findByIdAndUpdate(id, { isDeleted: true });
        console.log({ deletedStuff, id });
        if (!deletedStuff) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Stuff');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const { _id, name, turf, status } = deletedStuff;
        return { _id, name, turf, status };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createStuffFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stuff_model_1.Stuff.create(payload);
    return result;
});
exports.StuffServices = {
    getAllStuffFromDB,
    getSingleStuffFromDB,
    updateStuffIntoDB,
    deleteStuffFromDB,
    createStuffFromDB,
};
