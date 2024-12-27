import api from "./api";

class UserService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api/users";
  }

  async userSignUp({ name, email, password, address, phoneNumber }) {
    try {
      return await this.api.post(
        `${this.baseUrl}/register`,
        { name, email, password, address, phoneNumber },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async verifyUserEmail({ email, verificationCode }) {
    try {
      return await this.api.post(
        `${this.baseUrl}/verify-email`,
        { email, verificationCode },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async userLogin({ email, password }) {
    try {
      return await this.api.post(
        `${this.baseUrl}/login`,
        { email, password },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async userLogout() {
    try {
      await this.api.get(`${this.baseUrl}/logout`, { withCredentials: true });
    } catch (error) {
      throw error;
    }
  }

  async getLoggedinUser() {
    try {
      return await this.api.get(`${this.baseUrl}/profile`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async googleLogin() {
    try {
      return await this.api.get(`${this.baseUrl}/auth/google`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      return await this.api.post(
        `${this.baseUrl}/forgot-password`,
        { email },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token, password) {
    try {
      await this.api.post(
        `${this.baseUrl}/reset-password/${token}`,
        {
          password,
        },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async editProfile(edit) {
    try {
      return await this.api.put(`${this.baseUrl}/update/profile`, edit, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async getLoggedinGoogleProfile() {
    try {
      return this.api.get(`${this.baseUrl}/auth/success`,{withCredentials: true})
    } catch (error) {
      throw error
    }
  }
}

let userService = new UserService();

export default userService;
