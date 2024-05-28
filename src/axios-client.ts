import axios from "axios";
import Cookies from "js-cookie";


const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
