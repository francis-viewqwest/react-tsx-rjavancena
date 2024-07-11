import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/app/AuthProvider";
import useAxiosClient from "@/axios-client";
import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

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

  const { token, setToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const euDevice = Cookies.get("eu");
  const axiosClient = useAxiosClient();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const res = await axiosClient.post("/login", {
        ...data,
        eu_device: euDevice,
      });

      Cookies.set("token", res.data.token);
      setToken(token);

      if (token) {
        navigate("/app/menu");
      }
    } catch (error: any) {
      let errorMessage = error.response.data.message;
      setLoading(false);

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
              <Button className="font-bold">
                {loading ? (
                  <span className="flex items-center gap-2">
                    Signing in...
                    <MoonLoader size={12} color="#ffffff" />
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
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
