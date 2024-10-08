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
exports.BookingServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const booking_constant_1 = require("./booking.constant");
const booking_model_1 = require("./booking.model");
const getAllBookingFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const BookingQuery = new QueryBuilder_1.default(booking_model_1.Booking.find()
        .populate('user')
        .populate('timeslot')
        .populate('turf_ground')
        .populate({
        path: 'turf',
        populate: [
            { path: 'facilities' }, // Populate facilities
            { path: 'activity' }, // Populate activity
        ],
    }), query)
        .search(booking_constant_1.BookingSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield BookingQuery.countTotal();
    const result = yield BookingQuery.modelQuery;
    return { meta, result };
});
const getSingleBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookingExists = yield booking_model_1.Booking.isBookingExists(id);
    if (!isBookingExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Booking is not found !');
    }
    const result = yield booking_model_1.Booking.findById(id)
        .populate('user')
        .populate('timeslot')
        .populate({
        path: 'turf',
        populate: [
            { path: 'facilities' }, // Populate facilities
            { path: 'activity' }, // Populate activity
        ],
    });
    return result;
});
// const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
//   const { name, ...remainingBookingData } = payload
//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingBookingData,
//   }
//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }
//   const result = await Booking.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }
const updateBookingIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookingExists = yield booking_model_1.Booking.findById(id);
    if (!isBookingExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Booking is not found !');
    }
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // to check is Delete is ture
        const isBookingExists = yield booking_model_1.Booking.isBookingExists(id);
        if (!isBookingExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Booking is not found !');
        }
        const deletedBooking = yield booking_model_1.Booking.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        console.log({ deletedBooking, id });
        if (!deletedBooking) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Booking');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedBooking;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createBookingFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.create(payload);
    return result;
});
exports.BookingServices = {
    getAllBookingFromDB,
    getSingleBookingFromDB,
    updateBookingIntoDB,
    deleteBookingFromDB,
    createBookingFromDB,
};
