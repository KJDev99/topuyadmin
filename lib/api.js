import axios from "axios";

const api = axios.create({
  baseURL: "https://api.topuy.uz/",
});

export default api;
