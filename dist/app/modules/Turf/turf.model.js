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
exports.Turf = void 0;
const mongoose_1 = require("mongoose");
const turfSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    contactNo: { type: String, required: true, unique: true },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: String, default: '0' },
    address: { type: String, required: true },
    city: { type: String, required: true },
    turf_ground: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'TurfGround', default: [] },
    ], // Assuming turfImage is an array of strings representing image URLs
    facilities: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Facilities' }], // Assuming Facility is another Mongoose model
    logoImage: { type: [String], required: true }, // Assuming turfImage is an array of strings representing image URLs
    coverImage: { type: [String], required: true }, // Assuming turfImage is an array of strings representing image URLs
    activity: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Activity' }], // Assuming Activity is another Mongoose model
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
});
// filter out deleted documents
turfSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
turfSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
turfSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
turfSchema.statics.isTurfExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Turf.findById({ _id: id });
        return existingUser;
    });
};
exports.Turf = (0, mongoose_1.model)('Turfs', turfSchema);
