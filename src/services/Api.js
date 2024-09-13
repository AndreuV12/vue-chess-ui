import axios from "axios"

const apiUrl = import.meta.env?.VITE_API_URL

class Api {
  async fetchInitialPos() {
    console.log(`${apiUrl}/position`);
    const res = await axios.get(`${apiUrl}/position`)
    return res.data
  }

//   async registerUser() {
//     const res = await axios.post(`${apiUrl}/users`)
//     return res.data
//   }
}

const api = new Api()

export default api