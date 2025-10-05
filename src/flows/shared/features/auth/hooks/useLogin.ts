import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../shared/lib/constants/routes";
import { authApi, type LoginResponse } from "../api";
import type { LoginFormData } from "../model";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: async (data: LoginFormData) => {
      // Mock successful response for now
      console.log("Mock login with:", data);
      return {
        success: true,
        message: "Login successful",
        phone: data.phone,
      };
    },
    onSuccess: (response, variables) => {
      console.log("Login successful:", response);
      
      // Navigate to OTP page with phone number
      navigate(ROUTES.OTP, {
        state: { phone: response.phone || variables.phone },
      });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => authApi.refresh(refreshToken),
    onError: (error) => {
      console.error("Token refresh failed:", error);
      // Clear tokens and redirect to login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = ROUTES.LOGIN;
    },
  });
};
