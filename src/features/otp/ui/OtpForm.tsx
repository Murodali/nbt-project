import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { InputOtp } from "@heroui/input-otp";
import { Button, Card, CardBody } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useResendOtp, useVerifyOtp } from "../hooks";
import { otpSchema, type OtpFormData } from "../model";

interface OtpFormProps {
  phone: string;
  onBack?: () => void;
}

export const OtpForm = ({ phone, onBack }: OtpFormProps) => {
  const [otpValue, setOtpValue] = useState("");
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);

  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Format countdown as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP input change
  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    // Clear errors when user starts typing
    clearErrors();
  };

  // Handle OTP verification
  const handleVerifyOtp = () => {
    if (otpValue.length !== 5) {
      setError("root", {
        type: "manual",
        message: "Введите полный код",
      });
      return;
    }

    verifyOtpMutation.mutate(
      { otp: otpValue, phone },
      {
        onError: (error: any) => {
          if (error.response?.status === 400) {
            setError("root", {
              type: "manual",
              message: "Неверный код. Попробуйте еще раз",
            });
          } else if (error.response?.status === 410) {
            setError("root", {
              type: "manual",
              message: "Код истек. Запросите новый код",
            });
          } else {
            setError("root", {
              type: "manual",
              message: "Произошла ошибка. Попробуйте позже",
            });
          }
        },
      }
    );
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    resendOtpMutation.mutate(phone, {
      onSuccess: (response: any) => {
        setCountdown(response.expiresIn || 120);
        setCanResend(false);
        setOtpValue("");
        clearErrors();
      },
      onError: (error: any) => {
        console.error("Resend OTP failed:", error);
        setError("root", {
          type: "manual",
          message: "Не удалось отправить код. Попробуйте позже",
        });
      },
    });
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardBody className="p-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Назад</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Проверка OTP
          </h1>
          <p className="text-gray-600 text-sm">
            Введите проверочный код, который мы отправили на указанную
            электронную почту
          </p>
        </div>

        <form onSubmit={handleSubmit(handleVerifyOtp)} className="space-y-6">
          {/* OTP Input */}
          <div className="flex justify-center mb-6">
            <InputOtp
              length={5}
              value={otpValue}
              onValueChange={handleOtpChange}
              variant="flat"
              size="lg"
              classNames={{
                base: "gap-3",
                segment:
                  "w-16 h-16 text-2xl font-bold  rounded-lg focus:border-blue-500 data-[focus=true]:border-blue-500",
              }}
            />
          </div>

          {/* Error message */}
          {errors.root && (
            <div className="text-red-500 text-sm text-center">
              {errors.root.message}
            </div>
          )}

          {/* Continue button */}
          <Button
            type="submit"
            color="primary"
            size="lg"
            isLoading={verifyOtpMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl"
            onPress={handleVerifyOtp}
          >
            {verifyOtpMutation.isPending ? "Проверка..." : "Продолжить"}
          </Button>

          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendOtpMutation.isPending}
                className="text-blue-600 hover:text-blue-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendOtpMutation.isPending
                  ? "Отправка..."
                  : "Повторно отправить код"}
              </button>
            ) : (
              <p className="text-gray-500 text-sm">
                Повторно отправить код через{" "}
                <span className="text-blue-600 font-medium">
                  {formatTime(countdown)}
                </span>
              </p>
            )}
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
