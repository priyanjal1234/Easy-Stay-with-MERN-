import api from "./api";

class BookingService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://easy-stay-with-mern-backend.onrender.com/api/bookings";
  }

  async createBooking(
    id,
    { user, checkInDate, checkOutDate, numberOfGuests, totalPrice }
  ) {
    try {
      await this.api.post(`${this.baseUrl}/create/${id}`, {
        user,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        totalPrice,
      },{withCredentials: true});
    } catch (error) {
        throw error
    }
  }
}

let bookingService = new BookingService();

export default bookingService;
