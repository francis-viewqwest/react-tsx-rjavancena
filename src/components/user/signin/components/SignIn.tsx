import { Link, useNavigate } from "react-router-dom";
import rjlogo from "../../../../assets/rjavancenalogo.svg";
import Cookies from "js-cookie";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/app/AuthProvider";
import axiosClient from "@/axios-client";

interface FormValues {
  email: String;
  password: String;
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const { setToken } = useAuth();

  const navigate = useNavigate();

  const euDevice = Cookies.get("eu");

  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // const res = await axios.post(import.meta.env.VITE_BASE_URL + "login", {
      //   ...data,
      //   eu_device: euDevice,
      // });
      const res = await axiosClient.post('/login',{
        ...data,
        eu_device: euDevice,
      });
      console.log(res);
      const access_token = res.data.access_token;
      Cookies.set("token", res.data.access_token);
      // setToken(access_token);

      if (access_token) {
        navigate("/app/menu");
      }
    } catch (error: any) {
      console.log(error);

      let errorMessage = error.response.data.message;

      setError("email", {
        type: "custom",
        message: errorMessage.email,
      });
      setError("password", {
        type: "custom",
        message: errorMessage.password,
      });
    }
  };

  return (
    <>
      <div className="w-full h-screen p-4 md:flex md:flex-col items-center m-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto pt-20 md:w-96 lg:p-7 flex flex-col gap-3 lg:gap-8 rounded-md lg:border-[1px] lg:shadow-sm"
        >
          <div className="flex flex-col items-center m-auto gap-2">
            <h1 className="text-2xl font-bold">RJ Avancena</h1>
          </div>
          <div className="flex flex-col gap-5">
            <div className="grid w-full items-center gap-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
              />
              {errors.email && (
                <small className="text-red-500 text-xs  max-w-96">
                  {errors.email.message}
                </small>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              {errors.password && (
                <small className="text-red-500 text-xs  max-w-96">
                  {errors.password.message}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-4 mt-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-x-1">
                <Checkbox className="checkbox" />
                <label className="text-sm">Remember me</label>
              </div>
              <div>
                <label className="text-sm sm:text-md">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </label>
              </div>
            </div>
            <div className="flex flex-col w-full mt-5 gap-4">
              <Button className="font-bold">Sign In</Button>

              <div className="text-sm text-center m-auto">
                Don’t have an account?{" "}
                <span className="font-bold">
                  <Link to="/signup">Sign Up</Link>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
