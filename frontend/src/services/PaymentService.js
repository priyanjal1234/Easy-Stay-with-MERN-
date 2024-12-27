import api from "./api";

class PaymentService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://easy-stay-with-mern-backend.onrender.com/api/payment";
  }

  async createPaymentIntent(amount) {
    try {
      return await this.api.post(
        `${this.baseUrl}/create-payment-intent`,
        {amount},
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }
}

let paymentService = new PaymentService();

export default paymentService;
