import { useAuth } from "@/app/AuthProvider";
import useAxiosClient from "@/axios-client";

const useRefreshToken = () => {
  const { setToken } = useAuth();

  const axiosClient = useAxiosClient();

  const refresh = async () => {
    try {
      const res = await axiosClient.get("/check-token");
      console.log(res);

      //   setToken((prev) => [...prev, res.data.access_token]);
      setToken(res.data.access_token);
    } catch (error) {
      console.log(error);
    }
  };
  return refresh;
};

export default useRefreshToken;
