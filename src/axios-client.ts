import axios from "axios";
// import { useAuth } from "./app/AuthProvider";
import Cookies from "js-cookie";


const useAxiosClient = () => {
  // const { token } = useAuth();

  const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  axiosClient.interceptors.request.use(
    (config) => {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosClient;
};

export default useAxiosClient;
