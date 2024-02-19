import { Link, useLocation, Navigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../app/AuthProvider";
import Cookies from "js-cookie";
import axios from "axios";

interface forgotPassForm {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const form = useForm();
  const { setToken } = useAuth();

  const { register, handleSubmit, formState } = form;

  const onSubmit: SubmitHandler<forgotPassForm> = async (data) => {
    const forgotPassEndpoint =
      import.meta.env.VITE_BASE_URL + "forgot-password";

    try {
      const res = await axios.post(forgotPassEndpoint, data);

      if (res.status === 200) {
        const resToken = res.data.token;
        setToken(resToken);
        Cookies.set("token", resToken);
      }

      console.log(res);
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
            <h1 className="text-2xl font-bold">Forgot Your Password?</h1>
            <p className="text-sm text-center">
              No worries, it happens to the best of us. Just follow the steps
              below to reset your password.
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

          <button className="btn btn-md bg-btnprimary w-full text-white mt-10">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
