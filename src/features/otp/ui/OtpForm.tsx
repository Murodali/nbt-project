import { InputOtp } from "@heroui/input-otp";
import { Button, Card, CardBody } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/lib/constants/routes";
import { useOtp, useResendOtp } from "../hooks/useOtp";
import { otpSchema, type OtpFormData } from "../model/otpSchema";

export const OtpForm = () => {
  const [resendCooldown] = useState(0);
  const otpMutation = useOtp();
  const resendMutation = useResendOtp();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  const handleOtpSubmit = () => {
    navigate(ROUTES.VLADELEC_DASHBOARD);
  };

  const handleResend = () => {
    console.log("Resend");
  };

  const onBack = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <Card className="w-full max-w-md bg-card shadow-lg">
      <CardBody className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Подтверждение
          </h1>
          <p className="text-muted-foreground text-sm">
            Введите код из SMS, отправленный на номер
          </p>
          <p className="text-muted-foreground text-sm font-medium">
            +992999999999
          </p>
        </div>

        <form onSubmit={handleSubmit(handleOtpSubmit)} className="space-y-6">
          {errors.root && (
            <div className="text-red-500 text-sm text-center">
              {errors.root.message}
            </div>
          )}

          <div className="flex justify-center">
            <InputOtp
              value={otpValue}
              onValueChange={(value) => setValue("otp", value)}
              length={5}
              color="default"
              variant="flat"
              isInvalid={!!errors.otp}
              errorMessage={errors.otp?.message}
              className="text-center text-2xl tracking-widest  py-[8px] px-[12px]"
              size="lg"
              inputMode="numeric"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              color="primary"
              size="lg"
              isLoading={otpMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl"
            >
              {otpMutation.isPending ? "Проверка..." : "Подтвердить"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="light"
                size="sm"
                onClick={handleResend}
                disabled={resendCooldown > 0 || resendMutation.isPending}
                className="text-blue-600 hover:text-blue-700"
              >
                {resendCooldown > 0
                  ? `Повторить через ${resendCooldown}с`
                  : "Отправить код повторно"}
              </Button>
            </div>

            <Button
              type="button"
              variant="light"
              size="sm"
              onClick={onBack}
              className="text-gray-600 hover:text-gray-700"
            >
              Назад к авторизации
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
