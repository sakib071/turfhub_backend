/* eslint-disable @typescript-eslint/no-explicit-any */
import { endOfDay, startOfDay, subDays } from 'date-fns'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { Booking } from '../Booking/booking.model'
import { Turf } from '../Turf/turf.model'
import { User } from '../User/user.model'
import {
  AdminDashboardResult,
  ConfirmedBooking,
  Result,
} from './dashboard.interface'

const getTurfOwnerDashboardFromDB = async (id: string) => {
  // Check if admin exists
  const isTurfOwnerExists = await User.findById(id)
  if (!isTurfOwnerExists || isTurfOwnerExists.role !== 'turf_owner') {
    throw new AppError(httpStatus.NOT_FOUND, 'Turf Owner is not found!')
  }
  // Get all Turf by UserId
  const isTurfExistsByUser = await Turf.findOne({ owner: id })
  if (!isTurfExistsByUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'the owner has no turf !')
  }

  const todayStart = startOfDay(new Date())
  const todayEnd = endOfDay(new Date())
  const last7Days = startOfDay(subDays(new Date(), 7))

  const result: Result = {
    active_bookings_count: 0,
    get_total_bookings_for_turf: 0,
    get_total_confirmed_revenue_for_turf: 0,
    dates_array: [],
    bookings_count: [],
  }

  // Aggregation pipeline
  const aggregateResults = await Booking.aggregate([
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
  ])

  // Extracting the values from the aggregation results
  result['active_bookings_count'] =
    aggregateResults[0]?.activeBookingsCount[0]?.count || 0

  result['get_total_bookings_for_turf'] =
    aggregateResults[0]?.totalBookings[0]?.count || 0

  result['get_total_confirmed_revenue_for_turf'] =
    aggregateResults[0]?.totalConfirmedRevenue[0]?.totalRevenue || 0

  // Extracting the dates and confirmed bookings per day
  const confirmedBookingsPerDay: ConfirmedBooking[] =
    aggregateResults[0]?.confirmedBookingsPerDay || []
  result['dates_array'] = confirmedBookingsPerDay.map((item) => item._id.day)
  result['bookings_count'] = confirmedBookingsPerDay.map(
    (item) => item.confirmedBookingsCount,
  )

  return result
}
const getAdminDashboardFromDB = async (id: string) => {
  // Check if admin exists
  const isAdminExists = await User.findById(id)
  if (!isAdminExists || isAdminExists.role !== 'admin') {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin is not found!')
  }

  const todayStart = startOfDay(new Date())
  const todayEnd = endOfDay(new Date())
  const last7Days = startOfDay(subDays(new Date(), 7))

  const result: AdminDashboardResult = {
    all_bookings_today: 0,
    total_pending_orders: 0,
    total_products_sold: 0,
    dates_array: [],
    confirmed_bookings_count: [],
  }

  // Aggregation pipeline for dashboard stats
  const aggregateResults = await Booking.aggregate([
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
  ])

  // Extract the values from the aggregation results
  result['all_bookings_today'] =
    aggregateResults[0]?.allBookingsToday[0]?.count || 0

  result['total_pending_orders'] =
    aggregateResults[0]?.totalPendingOrders[0]?.count || 0

  result['total_products_sold'] =
    aggregateResults[0]?.totalProductsSold[0]?.totalSold || 0

  // Extract the dates and confirmed bookings count per day for last 7 days
  const confirmedBookingsPerDay: ConfirmedBooking[] =
    aggregateResults[0]?.confirmedBookingsPerDay || []
  result['dates_array'] = confirmedBookingsPerDay.map((item) => item._id.day)
  result['confirmed_bookings_count'] = confirmedBookingsPerDay.map(
    (item) => item.confirmedBookingsCount,
  )

  return result
}
export const DashboardServices = {
  getTurfOwnerDashboardFromDB,
  getAdminDashboardFromDB,
}
