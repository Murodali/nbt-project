import { apiClient, setTokens } from "../../../../../shared/api/axios";
import type { OtpFormData } from "../model";

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    phone: string;
    name?: string;
  };
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
  expiresIn: number; // seconds until next resend allowed
}

export const otpApi = {
  // Verify OTP code - returns tokens after successful verification
  verifyOtp: async (data: OtpFormData & { phone: string }): Promise<VerifyOtpResponse> => {
    const response = await apiClient.post<VerifyOtpResponse>("/auth/verify-otp", data);
    
    // Store tokens after successful OTP verification
    const { accessToken, refreshToken } = response.data;
    setTokens(accessToken, refreshToken);
    
    return response.data;
  },

  // Resend OTP code
  resendOtp: async (phone: string): Promise<ResendOtpResponse> => {
    const response = await apiClient.post<ResendOtpResponse>("/auth/resend-otp", {
      phone,
    });
    return response.data;
  },
};
