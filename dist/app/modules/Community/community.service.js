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
exports.CommunityServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const community_constant_1 = require("./community.constant");
const community_model_1 = require("./community.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const getAllCommunityFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const CommunityQuery = new QueryBuilder_1.default(community_model_1.Community.find().populate('author'), query)
        .search(community_constant_1.CommunitySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield CommunityQuery.countTotal();
    const result = yield CommunityQuery.modelQuery;
    return { meta, result };
});
const getSingleCommunityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCommunityExists = yield community_model_1.Community.isCommunityExists(id);
    if (!isCommunityExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Community is not found !');
    }
    const result = yield community_model_1.Community.findById(id).populate('author');
    return result;
});
// const updateCommunityIntoDB = async (id: string, payload: Partial<TCommunity>) => {
//   const { name, ...remainingCommunityData } = payload
//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingCommunityData,
//   }
//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }
//   const result = await Community.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }
const updateCommunityIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCommunityExists = yield community_model_1.Community.findById(id);
    if (!isCommunityExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Community is not found !');
    }
    const result = yield community_model_1.Community.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteCommunityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // to check is Delete is ture
        const isCommunityExists = yield community_model_1.Community.isCommunityExists(id);
        if (!isCommunityExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Community is not found !');
        }
        const deletedCommunity = yield community_model_1.Community.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        console.log({ deletedCommunity, id });
        if (!deletedCommunity) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Community');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const { _id, content, location } = deletedCommunity;
        return { _id, content, location };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createCommunityFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield community_model_1.Community.create(payload);
    return result;
});
exports.CommunityServices = {
    getAllCommunityFromDB,
    getSingleCommunityFromDB,
    updateCommunityIntoDB,
    deleteCommunityFromDB,
    createCommunityFromDB,
};
