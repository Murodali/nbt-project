export const APP_NAME = "Modern React App";
export const API_BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
} as const;
