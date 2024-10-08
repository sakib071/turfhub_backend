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
exports.DashboardServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const date_fns_1 = require("date-fns");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const booking_model_1 = require("../Booking/booking.model");
const turf_model_1 = require("../Turf/turf.model");
const user_model_1 = require("../User/user.model");
const getTurfOwnerDashboardFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    // Check if admin exists
    const isTurfOwnerExists = yield user_model_1.User.findById(id);
    if (!isTurfOwnerExists || isTurfOwnerExists.role !== 'turf_owner') {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Turf Owner is not found!');
    }
    // Get all Turf by UserId
    const isTurfExistsByUser = yield turf_model_1.Turf.findOne({ owner: id });
    if (!isTurfExistsByUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'the owner has no turf !');
    }
    const todayStart = (0, date_fns_1.startOfDay)(new Date());
    const todayEnd = (0, date_fns_1.endOfDay)(new Date());
    const last7Days = (0, date_fns_1.startOfDay)((0, date_fns_1.subDays)(new Date(), 7));
    const result = {
        active_bookings_count: 0,
        get_total_bookings_for_turf: 0,
        get_total_confirmed_revenue_for_turf: 0,
        dates_array: [],
        bookings_count: [],
    };
    // Aggregation pipeline
    const aggregateResults = yield booking_model_1.Booking.aggregate([
        {
            $match: {
                turf: isTurfExistsByUser._id,
                isDeleted: false, // Filter only non-deleted bookings
            },
        },
        {
            $facet: {
                // Pipeline for active bookings count (today)
                activeBookingsCount: [
                    {
                        $match: {
                            status: 'active',
                            createdAt: { $gte: todayStart, $lte: todayEnd },
                        },
                    },
                    { $count: 'count' }, // Counts active bookings for today
                ],
                // Pipeline for total bookings count
                totalBookings: [
                    { $count: 'count' }, // Counts total bookings
                ],
                // Pipeline for total confirmed revenue (active bookings)
                totalConfirmedRevenue: [
                    {
                        $match: { status: 'active' }, // Only consider active (confirmed) bookings
                    },
                    {
                        $group: {
                            _id: null,
                            totalRevenue: { $sum: '$price' }, // Sum up the price for all confirmed bookings
                        },
                    },
                ],
                // Pipeline for confirmed bookings per day (last 7 days)
                confirmedBookingsPerDay: [
                    {
                        $match: {
                            status: 'active',
                            createdAt: { $gte: last7Days }, // Only bookings in the last 7 days
                        },
                    },
                    {
                        $group: {
                            _id: {
                                day: {
                                    $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                                }, // Group by day
                            },
                            confirmedBookingsCount: { $sum: 1 }, // Count the number of bookings per day
                        },
                    },
                    {
                        $sort: { '_id.day': 1 }, // Sort by day in ascending order
                    },
                ],
            },
        },
    ]);
    // Extracting the values from the aggregation results
    result['active_bookings_count'] =
        ((_b = (_a = aggregateResults[0]) === null || _a === void 0 ? void 0 : _a.activeBookingsCount[0]) === null || _b === void 0 ? void 0 : _b.count) || 0;
    result['get_total_bookings_for_turf'] =
        ((_d = (_c = aggregateResults[0]) === null || _c === void 0 ? void 0 : _c.totalBookings[0]) === null || _d === void 0 ? void 0 : _d.count) || 0;
    result['get_total_confirmed_revenue_for_turf'] =
        ((_f = (_e = aggregateResults[0]) === null || _e === void 0 ? void 0 : _e.totalConfirmedRevenue[0]) === null || _f === void 0 ? void 0 : _f.totalRevenue) || 0;
    // Extracting the dates and confirmed bookings per day
    const confirmedBookingsPerDay = ((_g = aggregateResults[0]) === null || _g === void 0 ? void 0 : _g.confirmedBookingsPerDay) || [];
    result['dates_array'] = confirmedBookingsPerDay.map((item) => item._id.day);
    result['bookings_count'] = confirmedBookingsPerDay.map((item) => item.confirmedBookingsCount);
    return result;
});
const getAdminDashboardFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    // Check if admin exists
    const isAdminExists = yield user_model_1.User.findById(id);
    if (!isAdminExists || isAdminExists.role !== 'admin') {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin is not found!');
    }
    const todayStart = (0, date_fns_1.startOfDay)(new Date());
    const todayEnd = (0, date_fns_1.endOfDay)(new Date());
    const last7Days = (0, date_fns_1.startOfDay)((0, date_fns_1.subDays)(new Date(), 7));
    const result = {
        all_bookings_today: 0,
        total_pending_orders: 0,
        total_products_sold: 0,
        dates_array: [],
        confirmed_bookings_count: [],
    };
    // Aggregation pipeline for dashboard stats
    const aggregateResults = yield booking_model_1.Booking.aggregate([
        {
            $facet: {
                // Pipeline for all bookings today
                allBookingsToday: [
                    {
                        $match: {
                            createdAt: { $gte: todayStart, $lte: todayEnd },
                            isDeleted: false,
                        },
                    },
                    { $count: 'count' }, // Counts all bookings for today
                ],
                // Pipeline for total pending product orders
                totalPendingOrders: [
                    {
                        $match: {
                            status: 'pending',
                            isDeleted: false,
                        },
                    },
                    { $count: 'count' }, // Counts total pending product orders
                ],
                // Pipeline for total products sold
                totalProductsSold: [
                    {
                        $lookup: {
                            from: 'products', // Join with products collection
                            localField: 'productId',
                            foreignField: '_id',
                            as: 'productDetails',
                        },
                    },
                    {
                        $match: {
                            status: 'completed',
                            isDeleted: false,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalSold: { $sum: '$productDetails.quantity' }, // Summing up the quantity of sold products
                        },
                    },
                ],
                // Pipeline for confirmed bookings per day (last 7 days globally)
                confirmedBookingsPerDay: [
                    {
                        $match: {
                            status: 'confirmed',
                            createdAt: { $gte: last7Days },
                            isDeleted: false,
                        },
                    },
                    {
                        $group: {
                            _id: {
                                day: {
                                    $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                                },
                            },
                            confirmedBookingsCount: { $sum: 1 }, // Count confirmed bookings per day
                        },
                    },
                    {
                        $sort: { '_id.day': 1 }, // Sort by day ascending
                    },
                ],
            },
        },
    ]);
    // Extract the values from the aggregation results
    result['all_bookings_today'] =
        ((_b = (_a = aggregateResults[0]) === null || _a === void 0 ? void 0 : _a.allBookingsToday[0]) === null || _b === void 0 ? void 0 : _b.count) || 0;
    result['total_pending_orders'] =
        ((_d = (_c = aggregateResults[0]) === null || _c === void 0 ? void 0 : _c.totalPendingOrders[0]) === null || _d === void 0 ? void 0 : _d.count) || 0;
    result['total_products_sold'] =
        ((_f = (_e = aggregateResults[0]) === null || _e === void 0 ? void 0 : _e.totalProductsSold[0]) === null || _f === void 0 ? void 0 : _f.totalSold) || 0;
    // Extract the dates and confirmed bookings count per day for last 7 days
    const confirmedBookingsPerDay = ((_g = aggregateResults[0]) === null || _g === void 0 ? void 0 : _g.confirmedBookingsPerDay) || [];
    result['dates_array'] = confirmedBookingsPerDay.map((item) => item._id.day);
    result['confirmed_bookings_count'] = confirmedBookingsPerDay.map((item) => item.confirmedBookingsCount);
    return result;
});
exports.DashboardServices = {
    getTurfOwnerDashboardFromDB,
    getAdminDashboardFromDB,
};
