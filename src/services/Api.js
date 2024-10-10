import axios from "axios";
import { getValidToken, setToken } from "./Auth";
const apiUrl = import.meta.env?.VITE_API_URL;

class Api {
  constructor() {
    axios.interceptors.request.use((config) => {
      const token = getValidToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
  }

  async login(username, password) {
    const dataForm = new FormData();
    dataForm.append("username", username);
    dataForm.append("password", password);
    const res = await axios.post(`${apiUrl}/users/login`, dataForm);
    setToken(res.data.access_token);
    return res.data;
  }

  async signup(username, email, password) {
    const res = await axios.post(`${apiUrl}/users/register`, {
      username,
      email,
      password,
    });
    setToken(res.data.access_token);
    return res.data;
  }

  async createOpening({ name, data }) {
    const res = await axios.post(`${apiUrl}/openings`, {
      name,
      data,
    });
    return res.data;
  }

  async fetchOpenings({ name, page = 1, limit = 10 }) {
    const res = await axios.get(`${apiUrl}/openings`, {
      params: {
        name,
        offset: limit * (page - 1),
        limit,
      },
    });
    return res.data;
  }

  async fetchOpening(id) {
    const res = await axios.get(`${apiUrl}/openings/${id}`);
    return res.data;
  }

  async deleteOpening(id) {
    const res = await axios.delete(`${apiUrl}/openings/${id}`);
    return res.data;
  }

  async addMoveToOpening(id, move, path) {
    const res = await axios.patch(`${apiUrl}/openings/${id}/add_move`, {
      move,
      path,
    });
    return res.data;
  }

  async deleteMoveFromOpening(id, move, path) {
    const res = await axios.patch(`${apiUrl}/openings/${id}/delete_move`, {
      move,
      path,
    });
    return res.data;
  }
}

const api = new Api();

export default api;
