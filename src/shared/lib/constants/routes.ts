export const ROUTES = {
  LOGIN: "/login",
  OTP: "/otp",
  DASHBOARD: "/dashboard",
  NOTIFICATIONS: "/notifications",
  REPORTS_HISTORY: "/reports-history",
  HOME: "/",
} as const;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = typeof ROUTES[RouteKeys];
