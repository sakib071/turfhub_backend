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
exports.PlayerServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const player_constant_1 = require("./player.constant");
const player_model_1 = require("./player.model");
const getAllPlayerFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const PlayerQuery = new QueryBuilder_1.default(player_model_1.Player.find().populate('facilities').populate('activity'), //.populate('academicDepartment'),
    query)
        .search(player_constant_1.PlayerSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield PlayerQuery.countTotal();
    const result = yield PlayerQuery.modelQuery;
    return { meta, result };
});
const getSinglePlayerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isPlayerExists = yield player_model_1.Player.isPlayerExists(id);
    if (!isPlayerExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Player is not found !');
    }
    const result = yield player_model_1.Player.findById(id)
        .populate('facilities')
        .populate('activity'); //.populate('academicDepartment')
    return result;
});
// const updatePlayerIntoDB = async (id: string, payload: Partial<TPlayer>) => {
//   const { name, ...remainingPlayerData } = payload
//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingPlayerData,
//   }
//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }
//   const result = await Player.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }
const updatePlayerIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isPlayerExists = yield player_model_1.Player.findById(id);
    if (!isPlayerExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Player is not found !');
    }
    const result = yield player_model_1.Player.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deletePlayerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // to check is Delete is ture
        const isPlayerExists = yield player_model_1.Player.isPlayerExists(id);
        if (!isPlayerExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Player is not found !');
        }
        const deletedPlayer = yield player_model_1.Player.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        console.log({ deletedPlayer, id });
        if (!deletedPlayer) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Player');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const { _id, name, turf, status } = deletedPlayer;
        return { _id, name, turf, status };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createPlayerFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield player_model_1.Player.create(payload);
    return result;
});
exports.PlayerServices = {
    getAllPlayerFromDB,
    getSinglePlayerFromDB,
    updatePlayerIntoDB,
    deletePlayerFromDB,
    createPlayerFromDB,
};
