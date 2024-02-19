import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../../app/AuthProvider";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

interface formData {
  verification_number: string;
}

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { setToken } = useAuth();
  const { token } = useAuth();
  const [countDownTime, setCountDownTime] = useState(30);
  const [resendAttempts, setResendAttempts] = useState(0);

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

      if (res.status === 200) {
        navigate("/");
      }
      console.log(data);
      

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendCode = async () => {
    try {
      const verifyEmailEndpoint =
        import.meta.env.VITE_BASE_URL + "signup/resend-code";

      const currentToken = Cookies.get("token");
      const res = await axios.post(verifyEmailEndpoint, null, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setResendAttempts((prevAttempts) => prevAttempts + 1);

      // Set countdown time based on attempts
      setCountDownTime(resendAttempts === 0 ? 30 : 60);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountDownTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countDownTime]);

  return (
    <>
      <div className="w-full h-screen p-4 py-44 md:block items-center max-w-[1200px] m-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto lg:px-8 flex flex-col gap-4 lg:w-2/6 rounded-md"
        >
          <div className="flex flex-col items-center m-auto gap-3 mb-3">
            <h1 className="text-2xl font-bold">Verify Your Email</h1>
            <p className="text-sm text-center">
              A verification code has been sent to your email address. Please
              enter the code to complete the verification process.
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
            className="btn btn-md bg-btnprimary w-full text-white mt-6"
          >
            Verify Email
          </button>
        </form>
        <div className="m-auto lg:px-8 flex mt-4 flex-col gap-4 lg:w-2/6 rounded-md">
          <button
            className="btn btn-md bg-neutral-content w-full text-black"
            onClick={() => handleResendCode()}
            disabled={countDownTime > 0}
          >
            {countDownTime > 0
              ? `Resend Code (${countDownTime}s)`
              : "Resend Code"}
          </button>
          <p className="text-xs text-center">
            If you haven't received the code, you can request a new one by
            clicking "Resend Code."
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
