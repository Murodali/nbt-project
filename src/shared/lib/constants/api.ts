export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
    VERIFY_OTP: "/auth/verify-otp",
    RESEND_OTP: "/auth/resend-otp",
  },
  NOTIFICATIONS: {
    GET_ALL: "/notifications",
    MARK_AS_READ: "/notifications/:id/read",
    MARK_ALL_AS_READ: "/notifications/read-all",
    DELETE: "/notifications/:id",
  },
  ROLES: {
    ROLES: "/api/v1/roles",
    USERS: "/api/v1/users",
    USER_BY_ID: "/api/v1/users/:id",
    USER_ROLES: "/api/v1/users/:id/roles",
    DEACTIVATE_USER: "/api/v1/users/:id/deactivate",
  },
  ENDPOINTS: {
    ENDPOINTS: "/api/v1/endpoints",
  },
} as const;

// Get API base URL with fallback for production
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.PROD 
    ? "https://65.21.129.245:8081" // HTTPS for production
    : "http://65.21.129.245:8081"  // HTTP for development
  );

// Additional environment-based configuration
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;
export const IS_DEVELOPMENT = import.meta.env.DEV;
export const IS_PRODUCTION = import.meta.env.PROD;
export const APP_ENV = import.meta.env.VITE_APP_ENV || (IS_DEVELOPMENT ? "development" : "production");

export type ApiEndpointGroups = keyof typeof API_ENDPOINTS;
export type AuthEndpoints = keyof typeof API_ENDPOINTS.AUTH;
export type NotificationEndpoints = keyof typeof API_ENDPOINTS.NOTIFICATIONS;
export type RolesEndpoints = keyof typeof API_ENDPOINTS.ROLES;
export type EndpointsEndpoints = keyof typeof API_ENDPOINTS.ENDPOINTS;

