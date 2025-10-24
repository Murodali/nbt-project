import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../lib/constants/api";

// Extend the InternalAxiosRequestConfig to include _retry property
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Debug logging for production CORS issues
if (import.meta.env.PROD) {
  console.log("API Base URL:", API_BASE_URL);
  console.log("Environment:", import.meta.env.VITE_APP_ENV);
}

// Token management
const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging for CORS issues
    if (import.meta.env.PROD) {
      console.log(`Making request to: ${config.baseURL}${config.url}`);
      console.log('Request headers:', config.headers);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh and 401 errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Debug logging for successful responses
    if (import.meta.env.PROD) {
      console.log(`Response from: ${response.config.url}`, response.status);
    }
    return response;
  },
  async (error: AxiosError) => {
    // Debug logging for CORS and other errors
    if (import.meta.env.PROD) {
      console.error(`Error from: ${error.config?.url}`, {
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        message: error.message
      });
    }
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
          // No refresh token, redirect to login
          clearTokens();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Attempt to refresh token
        const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token: newRefreshToken } = response.data as {
          access_token: string;
          refresh_token: string;
        };
        
        // Update tokens
        setTokens(access_token, newRefreshToken);
        
        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      console.error("Access forbidden");
    }

    if (error.response && error.response.status >= 500) {
      // Server error
      console.error("Server error:", error.response.status);
    }

    return Promise.reject(error);
  }
);

export { clearTokens, getAccessToken, getRefreshToken, setTokens };
