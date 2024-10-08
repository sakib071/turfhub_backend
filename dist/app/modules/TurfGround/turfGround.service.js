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
exports.TurfGroundServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const turfGround_model_1 = require("./turfGround.model");
const turfGround_constant_1 = require("./turfGround.constant");
const getAllTurfGroundFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const TurfQuery = new QueryBuilder_1.default(turfGround_model_1.TurfGround.find(), //.populate('academicDepartment'),
    query)
        .search(turfGround_constant_1.TurfSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield TurfQuery.countTotal();
    const result = yield TurfQuery.modelQuery;
    return { meta, result };
});
const getSingleTurfGroundFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isTurfExists = yield turfGround_model_1.TurfGround.isTurfGroundExists(id);
    if (!isTurfExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Turf ground is not found !');
    }
    const result = yield turfGround_model_1.TurfGround.findById(id);
    return result;
});
// const updateTurfGroundIntoDB = async (id: string, payload: Partial<TTurf>) => {
//   const { name, ...remainingTurfData } = payload
//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingTurfData,
//   }
//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }
//   const result = await Turf.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }
const updateTurfGroundIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isTurfExists = yield turfGround_model_1.TurfGround.findById(id);
    if (!isTurfExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Turf ground is not found !');
    }
    const result = yield turfGround_model_1.TurfGround.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteTurfGroundFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // to check is Delete is ture
        const isTurfExists = yield turfGround_model_1.TurfGround.isTurfGroundExists(id);
        if (!isTurfExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Turf ground is not found !');
        }
        const deletedTurfGround = yield turfGround_model_1.TurfGround.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        console.log({ deletedTurfGround, id });
        if (!deletedTurfGround) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Turf ground');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const { _id, size, sport } = deletedTurfGround;
        return { _id, size, sport };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createTurfGroundFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield turfGround_model_1.TurfGround.create(payload);
    return result;
});
exports.TurfGroundServices = {
    getAllTurfGroundFromDB,
    getSingleTurfGroundFromDB,
    updateTurfGroundIntoDB,
    deleteTurfGroundFromDB,
    createTurfGroundFromDB,
};
