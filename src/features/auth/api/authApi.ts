import { apiClient } from "../../../shared/api/axios";
import type { LoginFormData } from "../model";

export interface LoginResponse {
  success: boolean;
  message: string;
  phone: string; // Return phone for OTP step
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  // Login user - only validates credentials, doesn't return tokens
  login: async (data: LoginFormData): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  // Refresh token
  refresh: async (refreshToken: string): Promise<RefreshResponse> => {
    const response = await apiClient.post<RefreshResponse>("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      // Even if logout fails on server, clear local tokens
      console.error("Logout error:", error);
    } finally {
      // Always clear tokens locally
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },

  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get("/auth/profile");
    return response.data;
  },
};
