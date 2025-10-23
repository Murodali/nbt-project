import { apiClient } from "../../../shared/api/axios";
import type { LoginResponse, RefreshResponse } from "../model";
import type { LoginFormData } from "../model/loginSchema";
import { clearTokens } from "../utils/tokenUtils";

export const authApi = {
  // Login user - returns role for navigation
  login: async (data: LoginFormData): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  // Refresh token
  refresh: async (refreshToken: string): Promise<RefreshResponse> => {
    const response = await apiClient.post<RefreshResponse>("/auth/refresh", {
      refresh_token: refreshToken,
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
      clearTokens();
    }
  },

  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get("/auth/profile");
    return response.data;
  },
};