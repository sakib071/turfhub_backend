"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facilities_route_1 = require("../modules/Facilities/facilities.route");
const activity_route_1 = require("../modules/Activity/activity.route");
const turf_route_1 = require("../modules/Turf/turf.route");
const timeslot_route_1 = require("../modules/Timeslot/timeslot.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const user_route_1 = require("../modules/User/user.route");
const turfGround_route_1 = require("../modules/TurfGround/turfGround.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const community_route_1 = require("../modules/Community/community.route");
const product_route_1 = require("../modules/Product/product.route");
const sale_route_1 = require("../modules/Sale/sale.route");
const dashboard_route_1 = require("../modules/Dashboard/dashboard.route");
const otp_route_1 = require("../modules/Otp/otp.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/facilities',
        route: facilities_route_1.FacilitiesRoutes,
    },
    {
        path: '/activity',
        route: activity_route_1.ActivityRoutes,
    },
    {
        path: '/turf',
        route: turf_route_1.TurfRoutes,
    },
    {
        path: '/turf-ground',
        route: turfGround_route_1.TurfGroundRoutes,
    },
    {
        path: '/timeslot',
        route: timeslot_route_1.TimeslotRoutes,
    },
    {
        path: '/booking',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/community',
        route: community_route_1.CommunityRoutes,
    },
    {
        path: '/product',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/sales',
        route: sale_route_1.SalesRoutes,
    },
    {
        path: '/dashboard',
        route: dashboard_route_1.DashboardRoutes,
    },
    {
        path: '/otp',
        route: otp_route_1.OtpRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
