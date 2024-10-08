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
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    turf: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Turfs',
    },
    timeslot: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Timeslots',
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'deactivate', 'confirmed'],
        default: 'pending',
    },
    price: {
        type: mongoose_1.Schema.Types.Decimal128,
        required: true, // Ensures price is required
    },
    turf_ground: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'TurfGround',
    },
    confirm_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// filter out deleted documents
BookingSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
BookingSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
BookingSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
BookingSchema.statics.isBookingExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Booking.findById({ _id: id });
        return existingUser;
    });
};
exports.Booking = (0, mongoose_1.model)('Bookings', BookingSchema);
