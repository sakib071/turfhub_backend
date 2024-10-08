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
exports.SuperAdminServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const superAdmin_constant_1 = require("./superAdmin.constant");
const superAdmin_model_1 = require("./superAdmin.model");
const getAllSuperAdminFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const SuperAdminQuery = new QueryBuilder_1.default(superAdmin_model_1.SuperAdmin.find().populate('facilities').populate('activity'), //.populate('academicDepartment'),
    query)
        .search(superAdmin_constant_1.SuperAdminSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield SuperAdminQuery.countTotal();
    const result = yield SuperAdminQuery.modelQuery;
    return { meta, result };
});
const getSingleSuperAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isSuperAdminExists = yield superAdmin_model_1.SuperAdmin.isSuperAdminExists(id);
    if (!isSuperAdminExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This SuperAdmin is not found !');
    }
    const result = yield superAdmin_model_1.SuperAdmin.findById(id)
        .populate('facilities')
        .populate('activity'); //.populate('academicDepartment')
    return result;
});
// const updateSuperAdminIntoDB = async (id: string, payload: Partial<TSuperAdmin>) => {
//   const { name, ...remainingSuperAdminData } = payload
//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingSuperAdminData,
//   }
//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }
//   const result = await SuperAdmin.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }
const updateSuperAdminIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isSuperAdminExists = yield superAdmin_model_1.SuperAdmin.findById(id);
    if (!isSuperAdminExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This SuperAdmin is not found !');
    }
    const result = yield superAdmin_model_1.SuperAdmin.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteSuperAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // to check is Delete is ture
        const isSuperAdminExists = yield superAdmin_model_1.SuperAdmin.isSuperAdminExists(id);
        if (!isSuperAdminExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This SuperAdmin is not found !');
        }
        const deletedSuperAdmin = yield superAdmin_model_1.SuperAdmin.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        console.log({ deletedSuperAdmin, id });
        if (!deletedSuperAdmin) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete SuperAdmin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const { _id, name, turf, status } = deletedSuperAdmin;
        return { _id, name, turf, status };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createSuperAdminFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield superAdmin_model_1.SuperAdmin.create(payload);
    return result;
});
exports.SuperAdminServices = {
    getAllSuperAdminFromDB,
    getSingleSuperAdminFromDB,
    updateSuperAdminIntoDB,
    deleteSuperAdminFromDB,
    createSuperAdminFromDB,
};
