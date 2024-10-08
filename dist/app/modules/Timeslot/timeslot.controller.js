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
exports.TimeslotControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const timeslot_service_1 = require("./timeslot.service");
const getAllTimeslot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield timeslot_service_1.TimeslotServices.getAllTimeslotFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: result ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        success: result ? true : false,
        message: result
            ? 'Timeslot are retrieved successfully'
            : 'Timeslot not found',
        data: result,
    });
}));
const getDashboardAllTimeslot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield timeslot_service_1.TimeslotServices.getAllDashboardTimeslotFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: result ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        success: result ? true : false,
        message: result
            ? 'Timeslot are retrieved successfully'
            : 'Timeslot not found',
        data: result,
    });
}));
const getDashboardSingleTimeslot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield timeslot_service_1.TimeslotServices.getSingleDashboardTimeslotFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Timeslot are retrieved successfully',
        data: result,
    });
}));
const getSingleTimeslot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield timeslot_service_1.TimeslotServices.getSingleTimeslotFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: result ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        success: result ? true : false,
        message: result
            ? 'Timeslot are retrieved successfully'
            : 'Timeslot not found',
        data: result,
    });
}));
const updateTimeslot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield timeslot_service_1.TimeslotServices.updateTimeslotIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Timeslot is updated successfully',
        data: result,
    });
}));
const deleteTimeslot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield timeslot_service_1.TimeslotServices.deleteTimeslotFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Timeslot is deleted successfully',
        data: result,
    });
}));
const createTimeslot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield timeslot_service_1.TimeslotServices.createTimeslotFromDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Timeslot is created successfully!',
        data: result,
    });
}));
exports.TimeslotControllers = {
    getAllTimeslot,
    getSingleTimeslot,
    updateTimeslot,
    deleteTimeslot,
    createTimeslot,
    getDashboardAllTimeslot,
    getDashboardSingleTimeslot,
};
