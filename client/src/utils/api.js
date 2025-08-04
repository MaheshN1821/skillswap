import axios from "axios";

const api = axios.create({
  baseURL: "https://skillswap-tau.vercel.app/api",
});

export default api;
