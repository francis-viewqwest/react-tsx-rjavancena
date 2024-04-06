import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../../app/AuthProvider";
import Cookies from "js-cookie";
import axios from "axios";

interface formData {
  email: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const form = useForm();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<formData> = async (data) => {
    const registerEndpoint = import.meta.env.VITE_BASE_URL + "register";

    try {
      const res = await axios.post(registerEndpoint, data);

      if (res.status === 200 && res.data.url_token) {
        const queryParams = new URLSearchParams(res.data.url_token.split("?")[1]);
        const tjParam = queryParams.get("tj");
        Cookies.set("token", tjParam);
        setToken(tjParam);

        if (tjParam) {
          navigate(`/signup/verify-email?tj=${tjParam}`);
          console.log(tjParam);
          console.log("url_token: ", res.data.url_token);
        } else {
          console.error("Invalid token format");
        }
      } else {
        console.error("Invalid response format");
      }

      console.log("Form submit", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen p-4 py-44 md:flex items-center max-w-[1200px] m-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto lg:p-8 flex flex-col gap-4 lg:w-2/6 rounded-md"
        >
          <div className="flex flex-col items-center m-auto gap-3 mb-10">
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-sm text-center">
              Get started with RJ Avancena Enterprises and enjoy a seamless
              shopping experience.
            </p>
          </div>
          <label className="form-control w-full">
            <input
              type="text"
              placeholder="Email Address"
              className="input input-bordered w-full"
              {...register("email", {
                required: {
                  value: true,
                  message: "email is required",
                },
              })}
            />
          </label>
          <label className="form-control w-full">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
          </label>
          <label className="form-control w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              {...register("password_confirmation", {
                required: {
                  value: true,
                  message: "Confirm Password not matche",
                },
              })}
            />
          </label>

          <button className="btn btn-md bg-btnprimary w-full text-white mt-10">
            Sign Up
          </button>
          <div className="text-sm text-center flex gap-1 m-auto">
            Already have an account?
            <span className="font-bold">
              <Link to="/signin">Sign In</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
