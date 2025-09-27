import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/lib/constants/routes";
import { otpApi, type ResendOtpResponse, type VerifyOtpResponse } from "../api";
import type { OtpFormData } from "../model";

interface VerifyOtpData extends OtpFormData {
  phone: string;
}

export const useVerifyOtp = () => {
  const navigate = useNavigate();

  return useMutation<VerifyOtpResponse, Error, VerifyOtpData>({
    mutationFn: async (data: VerifyOtpData) => {
      // Mock successful response for now
      console.log("Mock OTP verification with:", data);
      return {
        success: true,
        message: "OTP verified successfully",
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        user: {
          id: "1",
          phone: data.phone,
          name: "Mock User",
        },
      };
    },
    onSuccess: (response) => {
      console.log("OTP verification successful:", response);
      
      // Navigate to dashboard after successful verification
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      console.error("OTP verification failed:", error);
    },
  });
};

export const useResendOtp = () => {
  return useMutation<ResendOtpResponse, Error, string>({
    mutationFn: (phone: string) => otpApi.resendOtp(phone),
    onSuccess: (response) => {
      console.log("OTP resent successfully:", response);
    },
    onError: (error) => {
      console.error("OTP resend failed:", error);
    },
  });
};
