import api from "./api";

class RoomService {
  constructor() {
    this.api = api;
    this.baseUrl = "https://easy-stay-with-mern-backend.onrender.com/api";
  }

  async createRoom(roomData) {
    try {
      return await this.api.post(
        `${this.baseUrl}/admin/room/create`,
        roomData,
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllRooms() {
    try {
      return await this.api.get(`${this.baseUrl}/rooms/all-rooms`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async getOneRoom(id) {
    try {
      return await this.api.get(`${this.baseUrl}/rooms/room/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async checkAvailableRoom(id, formdata) {
    try {
      return await this.api.post(
        `${this.baseUrl}/rooms/check/room/${id}`,
        formdata,
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteRoom(id) {
    try {
      return await this.api.delete(`${this.baseUrl}/admin/delete/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }
}

let roomService = new RoomService();

export default roomService;
