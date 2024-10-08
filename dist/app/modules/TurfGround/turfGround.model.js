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
exports.TurfGround = void 0;
const mongoose_1 = require("mongoose");
const turfGroundSchema = new mongoose_1.Schema({
    unit: { type: String, required: true },
    size: { type: String, required: true },
    sport: { type: String, required: true },
    price_per_hour: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    field_size: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
});
// filter out deleted documents
turfGroundSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
turfGroundSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
turfGroundSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
turfGroundSchema.statics.isTurfGroundExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.TurfGround.findById({ _id: id });
        return existingUser;
    });
};
exports.TurfGround = (0, mongoose_1.model)('TurfGround', turfGroundSchema);
