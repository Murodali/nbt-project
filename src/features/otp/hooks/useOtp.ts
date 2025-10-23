import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/lib/constants/routes";
import { otpApi, type VerifyOtpResponse } from "../api/otpApi";
import type { OtpFormData } from "../model/otpSchema";

export const useOtp = () => {
  const navigate = useNavigate();

  return useMutation<VerifyOtpResponse, Error, OtpFormData & { phone: string }>({
    mutationFn: async (data) => {
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
          name: "Test User",
          role: "postavshik" as const, // Mock role - replace with actual API call
        },
      };
    },
    onSuccess: (response) => {
      console.log("OTP verification successful:", response);
      
      // Navigate based on user role
      const { role } = response.user;
      
      if (role === "postavshik") {
        navigate(ROUTES.POSTAVSHIK_DASHBOARD);
      } else if (role === "vladelec") {
        navigate(ROUTES.VLADELEC_DASHBOARD);
      } else if (role === "architector") {
        navigate(ROUTES.ARCHITECTOR_BANK_REPORTS);
      } else {
        // Fallback to login if role is unknown
        navigate(ROUTES.LOGIN);
      }
    },
    onError: (error) => {
      console.error("OTP verification failed:", error);
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (phone: string) => otpApi.resendOtp(phone),
    onError: (error) => {
      console.error("Resend OTP failed:", error);
    },
  });
};