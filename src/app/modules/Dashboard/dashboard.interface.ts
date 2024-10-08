export interface ConfirmedBooking {
  _id: {
    day: string // Format YYYY-MM-DD
  }
  confirmedBookingsCount: number
}

// Adjust the result object type as necessary
export interface Result {
  active_bookings_count: number
  get_total_bookings_for_turf: number
  get_total_confirmed_revenue_for_turf: number
  dates_array: string[]
  bookings_count: number[]
}

export interface AdminDashboardResult {
  all_bookings_today: number
  total_pending_orders: number
  total_products_sold: number
  dates_array: string[]
  confirmed_bookings_count: number[]
}
