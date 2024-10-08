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
exports.Timeslot = void 0;
const mongoose_1 = require("mongoose");
const TimeslotSchema = new mongoose_1.Schema({
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    turf: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Turfs', required: true },
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
});
// filter out deleted documents
TimeslotSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
TimeslotSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
TimeslotSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
TimeslotSchema.statics.isTimeslotExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Timeslot.findById({ _id: id });
        return existingUser;
    });
};
exports.Timeslot = (0, mongoose_1.model)('Timeslots', TimeslotSchema);
