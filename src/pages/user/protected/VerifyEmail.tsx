import { Link, useLocation, Navigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../app/AuthProvider";
import Cookies from "js-cookie";
import axios from "axios";

interface formData {
  verification_number: string;
}

const VerifyEmail: React.FC = () => {
  const form = useForm();
  const { setToken } = useAuth();
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  const { register, handleSubmit, formState } = form;


  const onSubmit: SubmitHandler<formData> = async (data) => {
    const verifyEmailEndpoint =
      import.meta.env.VITE_BASE_URL + "signup/verify-email";

    try {
      const currentToken = Cookies.get("token");

      const res = await axios.post(verifyEmailEndpoint, data, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setToken(currentToken);
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
          <div className="flex flex-col items-center m-auto gap-3 mb-3">
            <h1 className="text-2xl font-bold">Email Verification</h1>
            <p className="text-sm text-center">
              We’ve sent a code to user@info.com
            </p>
          </div>
          <label className="form-control w-full">
            <input
              type="text"
              placeholder="Enter verification code"
              className="input input-bordered w-full"
              {...register("verification_number", {
                required: {
                  value: true,
                  message: "Invalid verification code",
                },
              })}
            />
          </label>
          <button
            type="submit"
            className="btn btn-md bg-btnprimary w-full text-white mt-10"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default VerifyEmail;
