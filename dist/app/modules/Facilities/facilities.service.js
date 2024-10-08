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
exports.FacilitiesServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const facilities_model_1 = require("./facilities.model");
const getAllFacilityFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_model_1.Facilities.find();
    return result;
});
const createFacilityFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_model_1.Facilities.create(payload);
    return result;
});
const updateFacilityFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isNameExists = yield facilities_model_1.Facilities.findOne({ name: payload.name });
    if (isNameExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Facility name already exists');
    }
    const result = yield facilities_model_1.Facilities.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facilities_model_1.Facilities.findByIdAndDelete({ _id: id });
    return result;
});
exports.FacilitiesServices = {
    getAllFacilityFromDB,
    createFacilityFromDB,
    updateFacilityFromDB,
    deleteFacilityFromDB,
};
