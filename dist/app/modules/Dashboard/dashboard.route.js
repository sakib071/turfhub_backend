"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = require("./dashboard.controller");
const router = express_1.default.Router();
router.get('/admin/:id', dashboard_controller_1.DashboardControllers.getAdminDashboard);
router.get('/turf_owner/:id', dashboard_controller_1.DashboardControllers.getTurfOwnerDashboard);
exports.DashboardRoutes = router;
