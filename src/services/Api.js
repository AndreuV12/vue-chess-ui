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
  async fetchInitialPos() {
    console.log(`${apiUrl}/position`);
    const res = await axios.get(`${apiUrl}/position`);
    return res.data;
  }

  async login(username, password) {
    const res = await axios.post(`${apiUrl}/users/login`, {
      username,
      password,
    });
    console.log("Call Set token", res.data.access_token);

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
}

const api = new Api();

export default api;
