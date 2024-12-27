import api from "./api";

class PaymentService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api/payment";
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
