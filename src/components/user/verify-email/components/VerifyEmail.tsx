import { Navigate, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../../app/AuthProvider";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface FormValues {
  verification_number: String;
}

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { token } = useAuth();
  const [countDownTime, setCountDownTime] = useState(30);
  const [resendAttempts, setResendAttempts] = useState(0);

  if (!token) {
    return <Navigate to="/" />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  useForm({
    defaultValues: {
      verification_number: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const currentToken: any = Cookies.get("token");

      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "signup/verify-email",
        data,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );
      setToken(currentToken);

      if (res.status === 200) {
        navigate("/");
      }
      console.log(data);

      console.log(res);
    } catch (error: any) {
      console.log(error);
      let verificationNumberError = error.response.data.message.email || "";

      setError("verification_number", {
        type: "custom",
        message: verificationNumberError,
      });
    }
  };

  const handleResendCode = async () => {
    try {
      const currentToken = Cookies.get("token");
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "signup/resend-code",
        null,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );
      setResendAttempts((prevAttempts) => prevAttempts + 1);

      // Set countdown time based on attempts
      setCountDownTime(resendAttempts === 0 ? 30 : 60);
      console.log(res);
    } catch (error: any) {
      console.log(error);

      let verificationNumberError = error.response.data.message.email || "";

      setError("verification_number", {
        type: "custom",
        message: verificationNumberError,
      });
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
      <div className="w-full h-screen p-4 py-44 md:block items-center max-w-[75em] m-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto lg:px-8 flex flex-col gap-4 max-w-96 rounded-md"
        >
          <div className="flex flex-col items-center m-auto gap-3 mb-3">
            <h1 className="text-2xl font-bold">Verify Your Email</h1>
            <p className="text-xs text-center text-neutral-500">
              A verification code has been sent to your email address. Please
              enter the code to complete the verification process.
            </p>
          </div>
          <div className="grid w-full items-center gap-1.5 max-w-sm m-auto">
            {/* <Input
              type="text"
              placeholder="Enter verification code"
              className="input input-bordered w-full"
              {...register("verification_number", {
                required: {
                  value: true,
                  message: "Invalid verification code",
                },
              })}
            /> */}
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {errors.verification_number && (
              <small className="text-red-500 text-xs  max-w-96">
                {errors.verification_number.message}
              </small>
            )}
          </div>
          <Button
            type="submit"
            className="font-medium mt-6 w-full max-w-sm m-auto"
          >
            Verify Email
          </Button>
        </form>
        <div className="m-auto lg:px-8 flex mt-3 flex-col gap-4 max-w-sm rounded-md">
          <Button
            className="font-medium"
            variant="ghost"
            onClick={() => handleResendCode()}
            disabled={countDownTime > 0}
          >
            {countDownTime > 0
              ? `Resend Code (${countDownTime}s)`
              : "Resend Code"}
          </Button>
          <p className="text-xs text-center">
            If you haven't received the code, you can request a new one by
            clicking <span className="font-bold">"Resend Code."</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
