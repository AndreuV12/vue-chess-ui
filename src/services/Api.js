import axios from "axios";

const apiUrl = import.meta.env?.VITE_API_URL;

class Api {
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
    return res.data;
  }

  async signup(username, email, password) {
    const res = await axios.post(`${apiUrl}/users/register`, {
      username,
      email,
      password,
    });
    return res.data;
  }
}

const api = new Api();

export default api;
