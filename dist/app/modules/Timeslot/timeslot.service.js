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
exports.TimeslotServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const timeslot_constant_1 = require("./timeslot.constant");
const timeslot_model_1 = require("./timeslot.model");
const getAllTimeslotFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const TimeslotQuery = new QueryBuilder_1.default(timeslot_model_1.Timeslot.find({ status: { $ne: 'deactivate' } }).populate({
        path: 'turf',
        populate: [
            { path: 'facilities' }, // Populate facilities
            { path: 'activity' }, // Populate activity
        ],
    }), query)
        .search(timeslot_constant_1.TimeslotSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield TimeslotQuery.countTotal();
    const result = yield TimeslotQuery.modelQuery;
    return { meta, result };
});
const getAllDashboardTimeslotFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const TimeslotQuery = new QueryBuilder_1.default(timeslot_model_1.Timeslot.find().populate({
        path: 'turf',
        populate: [
            { path: 'facilities' }, // Populate facilities
            { path: 'activity' }, // Populate activity
        ],
    }), query)
        .search(timeslot_constant_1.TimeslotSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield TimeslotQuery.countTotal();
    const result = yield TimeslotQuery.modelQuery;
    return { meta, result };
});
const getSingleTimeslotFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isTimeslotExists = yield timeslot_model_1.Timeslot.isTimeslotExists(id);
    if (!isTimeslotExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Timeslot is not found !');
    }
    const result = yield timeslot_model_1.Timeslot.findOne({
        _id: id,
        status: { $ne: 'deactivate' },
    }).populate({
        path: 'turf',
        populate: [
            { path: 'facilities' }, // Populate facilities
            { path: 'activity' }, // Populate activity
        ],
    }); //.populate('academicDepartment')
    return result;
});
const getSingleDashboardTimeslotFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isTimeslotExists = yield timeslot_model_1.Timeslot.isTimeslotExists(id);
    if (!isTimeslotExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Timeslot is not found !');
    }
    const result = yield timeslot_model_1.Timeslot.findById(id).populate({
        path: 'turf',
        populate: [
            { path: 'facilities' }, // Populate facilities
            { path: 'activity' }, // Populate activity
        ],
    }); //.populate('academicDepartment')
    return result;
});
// const updateTimeslotIntoDB = async (id: string, payload: Partial<TTimeslot>) => {
//   const { name, ...remainingTimeslotData } = payload
//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingTimeslotData,
//   }
//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }
//   const result = await Timeslot.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }
const updateTimeslotIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isTimeslotExists = yield timeslot_model_1.Timeslot.findById(id);
    if (!isTimeslotExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Timeslot is not found !');
    }
    const result = yield timeslot_model_1.Timeslot.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteTimeslotFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // to check is Delete is ture
        const isTimeslotExists = yield timeslot_model_1.Timeslot.isTimeslotExists(id);
        if (!isTimeslotExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Timeslot is not found !');
        }
        const deletedTimeslot = yield timeslot_model_1.Timeslot.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        console.log({ deletedTimeslot, id });
        if (!deletedTimeslot) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Timeslot');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const { _id, startTime, turf } = deletedTimeslot;
        return { _id, startTime, turf };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createTimeslotFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield timeslot_model_1.Timeslot.create(payload);
    return result;
});
exports.TimeslotServices = {
    getAllTimeslotFromDB,
    getSingleTimeslotFromDB,
    updateTimeslotIntoDB,
    deleteTimeslotFromDB,
    createTimeslotFromDB,
    getAllDashboardTimeslotFromDB,
    getSingleDashboardTimeslotFromDB,
};
