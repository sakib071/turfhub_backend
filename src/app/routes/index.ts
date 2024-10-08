import { Router } from 'express'
import { FacilitiesRoutes } from '../modules/Facilities/facilities.route'
import { ActivityRoutes } from '../modules/Activity/activity.route'
import { TurfRoutes } from '../modules/Turf/turf.route'
import { TimeslotRoutes } from '../modules/Timeslot/timeslot.route'
import { BookingRoutes } from '../modules/Booking/booking.route'
import { UserRoutes } from '../modules/User/user.route'
import { TurfGroundRoutes } from '../modules/TurfGround/turfGround.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { CommunityRoutes } from '../modules/Community/community.route'
import { ProductRoutes } from '../modules/Product/product.route'
import { SalesRoutes } from '../modules/Sale/sale.route'
import { DashboardRoutes } from '../modules/Dashboard/dashboard.route'
import { OtpRoutes } from '../modules/Otp/otp.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/facilities',
    route: FacilitiesRoutes,
  },
  {
    path: '/activity',
    route: ActivityRoutes,
  },
  {
    path: '/turf',
    route: TurfRoutes,
  },
  {
    path: '/turf-ground',
    route: TurfGroundRoutes,
  },
  {
    path: '/timeslot',
    route: TimeslotRoutes,
  },
  {
    path: '/booking',
    route: BookingRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/community',
    route: CommunityRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/sales',
    route: SalesRoutes,
  },
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
  {
    path: '/otp',
    route: OtpRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
