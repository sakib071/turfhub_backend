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
exports.Community = void 0;
const mongoose_1 = require("mongoose");
const CommunitySchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    content: { type: String, required: true },
    location: { type: String, required: true },
    tags: [{ type: String, default: [] }],
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: String },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: [] }],
    visibility: { type: String, default: 'public' },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
// filter out deleted documents
CommunitySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
CommunitySchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
CommunitySchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
CommunitySchema.statics.isCommunityExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.Community.findById({ _id: id });
        return existingUser;
    });
};
exports.Community = (0, mongoose_1.model)('Community', CommunitySchema);
