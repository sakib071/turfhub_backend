import express from 'express'
import { DashboardControllers } from './dashboard.controller'

const router = express.Router()

router.get('/admin/:id', DashboardControllers.getAdminDashboard)

router.get('/turf_owner/:id', DashboardControllers.getTurfOwnerDashboard)

export const DashboardRoutes = router
