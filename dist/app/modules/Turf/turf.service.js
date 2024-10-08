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
exports.TurfServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const facilities_model_1 = require("../Facilities/facilities.model");
const timeslot_model_1 = require("../Timeslot/timeslot.model");
const turf_constant_1 = require("./turf.constant");
const turf_model_1 = require("./turf.model");
const getAllTurfFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const TurfQuery = new QueryBuilder_1.default(turf_model_1.Turf.find()
        .populate('turf_ground')
        .populate('facilities')
        .populate('activity'), query)
        .search(turf_constant_1.TurfSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield TurfQuery.countTotal();
    const result = yield TurfQuery.modelQuery;
    return { meta, result };
});
const getAllTurfByFacilitiesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the facility exists
    const facilityExists = yield facilities_model_1.Facilities.findOne({
        name: query === null || query === void 0 ? void 0 : query.searchTerm,
    }).exec();
    if (!facilityExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This facility is not found!');
    }
    // Perform aggregation to filter turfs by facility name
    const turfs = yield turf_model_1.Turf.aggregate([
        // Match to find turfs that have the specified facility ID
        {
            $match: {
                facilities: facilityExists._id, // Use the ID of the found facility
            },
        },
        // Lookup to populate the facilities field
        {
            $lookup: {
                from: 'facilities', // Name of the facilities collection
                localField: 'facilities',
                foreignField: '_id',
                as: 'facilitiesInfo', // The array that will hold facility information
            },
        },
        // Lookup to populate the turf_ground field
        {
            $lookup: {
                from: 'turfgrounds', // Name of the turf_ground collection
                localField: 'turf_ground',
                foreignField: '_id',
                as: 'turfGroundInfo', // The array for turf_ground info
            },
        },
        // Lookup to populate the activity field
        {
            $lookup: {
                from: 'activities', // Name of the activity collection
                localField: 'activity',
                foreignField: '_id',
                as: 'activityInfo', // The array for activity info
            },
        },
        // Unwind to flatten the facilitiesInfo array (if needed)
        {
            $unwind: {
                path: '$facilitiesInfo',
                preserveNullAndEmptyArrays: true,
            },
        },
        // Group to combine data back into a single document per turf
        {
            /*
            
                      "location": "https://maps.app.goo.gl/KwUyagkYfV4Ey8NZ9",
                      "contactNo": "01987654321",
                      "owner": "66f599e1ac1e207b45eb9a05",
                      "rating": "4.3",
                      "address": "Khulshi, Chittagong",
                      "city": "Chittagong",
            */
            $group: {
                _id: '$_id',
                name: { $first: '$name' }, // Turf name
                description: { $first: '$description' }, // Turf description
                location: { $first: '$location' }, // Turf location
                contactNo: { $first: '$contactNo' }, // Turf contactNo
                rating: { $first: '$rating' }, // Turf rating
                address: { $first: '$address' }, // Turf rating
                facilities: { $addToSet: '$facilitiesInfo.name' }, // Facility names
                turfGround: { $first: '$turfGroundInfo' }, // Turf ground details
                activity: { $first: '$activityInfo' }, // Activity details
            },
        },
        // Project to shape the final output
        {
            $project: {
                _id: '$_id',
                name: '$name',
                description: '$description',
                location: '$location',
                contactNo: '$contactNo',
                rating: '$rating',
                address: '$address',
                facilities: 1, // Include facility names
                turfGround: 1, // Include turf ground details
                activity: 1, // Include activity details
            },
        },
    ]);
    return { meta: { total: turfs.length }, result: turfs };
});
const getSingleTurfFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isTurfExists = yield turf_model_1.Turf.isTurfExists(id);
    if (!isTurfExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Turf is not found !');
    }
    const result = yield turf_model_1.Turf.findById(id)
        .populate('turf_ground')
        .populate('facilities')
        .populate('activity'); //.populate('academicDepartment')
    return result;
});
const getAllTimeslotByTurfFromDB = (query, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isTurfExists = yield turf_model_1.Turf.isTurfExists(id);
    if (!isTurfExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Turf is not found !');
    }
    const TimeslotQuery = new QueryBuilder_1.default(timeslot_model_1.Timeslot.find({
        turf: id, // Match by turf ID
        status: { $ne: 'deactivate' },
    }).populate({
        path: 'turf',
        populate: [
            { path: 'facilities' }, // Populate facilities
            { path: 'activity' }, // Populate activity
        ],
    }), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield TimeslotQuery.countTotal();
    const result = yield TimeslotQuery.modelQuery;
    return { meta, result };
    // const result = await Timeslot.find({ turf: id })
    // return result
});
// const updateTurfIntoDB = async (id: string, payload: Partial<TTurf>) => {
//   const { name, ...remainingTurfData } = payload
//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingTurfData,
//   }
//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value
//     }
//   }
//   const result = await Turf.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   })
//   return result
// }
const updateTurfIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isTurfExists = yield turf_model_1.Turf.findById(id);
    if (!isTurfExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Turf is not found !');
    }
    const result = yield turf_model_1.Turf.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteTurfFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // to check is Delete is ture
        const isTurfExists = yield turf_model_1.Turf.isTurfExists(id);
        if (!isTurfExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Turf is not found !');
        }
        const deletedTurf = yield turf_model_1.Turf.findByIdAndUpdate(id, { isDeleted: true });
        console.log({ deletedTurf, id });
        if (!deletedTurf) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Turf');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const { _id, name, description } = deletedTurf;
        return { _id, name, description };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createTurfFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield turf_model_1.Turf.create(payload);
    return result;
});
exports.TurfServices = {
    getAllTurfByFacilitiesFromDB,
    getAllTimeslotByTurfFromDB,
    getAllTurfFromDB,
    getSingleTurfFromDB,
    updateTurfIntoDB,
    deleteTurfFromDB,
    createTurfFromDB,
};
