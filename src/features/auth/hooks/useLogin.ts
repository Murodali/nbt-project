import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "../../../shared/lib/constants/routes";
import { authApi } from "../api/authApi";
import type { LoginResponse, RefreshResponse } from "../model";
import type { LoginFormData } from "../model/loginSchema";
import { clearTokens, saveTokens } from "../utils/tokenUtils";

export const useLogin = () => {

  return useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: async (data: LoginFormData) => {
      return await authApi.login(data);
    },
    onSuccess: (data: LoginResponse) => {
      // Save tokens to localStorage
      saveTokens({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
        refresh_expires_in: data.refresh_expires_in,
      });
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => authApi.refresh(refreshToken),
    onSuccess: (data: RefreshResponse) => {
      // Save new tokens to localStorage
      saveTokens({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
        refresh_expires_in: data.refresh_expires_in,
      });
    },
    onError: (error) => {
      console.error("Token refresh failed:", error);
      // Clear tokens and redirect to login
      clearTokens();
      window.location.href = ROUTES.LOGIN;
    },
  });
};