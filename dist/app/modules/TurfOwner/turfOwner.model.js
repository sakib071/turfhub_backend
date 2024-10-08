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
exports.TurfOwner = void 0;
const mongoose_1 = require("mongoose");
const TurfOwnerSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    turfImage: { type: [String], required: true },
    createBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    turf: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Turf', required: true },
    status: {
        type: String,
        enum: ['active', 'pending', 'deactivate'],
        default: 'active',
    },
    isDeleted: { type: Boolean, default: false },
});
// filter out deleted documents
TurfOwnerSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
TurfOwnerSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
TurfOwnerSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
TurfOwnerSchema.statics.isTurfOwnerExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.TurfOwner.findById({ _id: id });
        return existingUser;
    });
};
exports.TurfOwner = (0, mongoose_1.model)('TurfOwners', TurfOwnerSchema);
