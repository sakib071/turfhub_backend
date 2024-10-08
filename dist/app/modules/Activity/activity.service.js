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
exports.ActivityServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const activity_model_1 = require("./activity.model");
const getAllActivityFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activity_model_1.Activity.find();
    return result;
});
const createActivityFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activity_model_1.Activity.create(payload);
    return result;
});
const updateActivityFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isNameExists = yield activity_model_1.Activity.findOne({ name: payload.name });
    if (isNameExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Activity name already exists');
    }
    const result = yield activity_model_1.Activity.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteActivityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activity_model_1.Activity.findByIdAndDelete({ _id: id });
    return result;
});
exports.ActivityServices = {
    getAllActivityFromDB,
    createActivityFromDB,
    updateActivityFromDB,
    deleteActivityFromDB,
};
