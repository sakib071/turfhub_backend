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
exports.TurfOwnerServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const turfOwner_model_1 = require("./turfOwner.model");
const turfOwner_constant_1 = require("./turfOwner.constant");
const getAllTurfOwnerFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const TurfOwnerQuery = new QueryBuilder_1.default(turfOwner_model_1.TurfOwner.find().populate('facilities').populate('activity'), //.populate('academicDepartment'),
    query)
        .search(turfOwner_constant_1.TurfOwnerSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield TurfOwnerQuery.countTotal();
    const result = yield TurfOwnerQuery.modelQuery;
    return { meta, result };
});
const getSingleTurfOwnerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isTurfOwnerExists = yield turfOwner_model_1.TurfOwner.isTurfOwnerExists(id);
    if (!isTurfOwnerExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This TurfOwner is not found !');
    }
    const result = yield turfOwner_model_1.TurfOwner.findById(id)
        .populate('facilities')
        .populate('activity'); //.populate('academicDepartment')
    return result;
});
// const updateTurfOwnerIntoDB = async (id: string, payload: Partial<TTurfOwner>) => {
//   const { name, ...remainingTurfOwnerData } = payload
//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingTurfOwnerData,
//   }
//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }
//   const result = await TurfOwner.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }
const updateTurfOwnerIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isTurfOwnerExists = yield turfOwner_model_1.TurfOwner.findById(id);
    if (!isTurfOwnerExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This TurfOwner is not found !');
    }
    const result = yield turfOwner_model_1.TurfOwner.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteTurfOwnerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // to check is Delete is ture
        const isTurfOwnerExists = yield turfOwner_model_1.TurfOwner.isTurfOwnerExists(id);
        if (!isTurfOwnerExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This TurfOwner is not found !');
        }
        const deletedTurfOwner = yield turfOwner_model_1.TurfOwner.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        console.log({ deletedTurfOwner, id });
        if (!deletedTurfOwner) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete TurfOwner');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const { _id, name, turf, status } = deletedTurfOwner;
        return { _id, name, turf, status };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createTurfOwnerFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield turfOwner_model_1.TurfOwner.create(payload);
    return result;
});
exports.TurfOwnerServices = {
    getAllTurfOwnerFromDB,
    getSingleTurfOwnerFromDB,
    updateTurfOwnerIntoDB,
    deleteTurfOwnerFromDB,
    createTurfOwnerFromDB,
};
