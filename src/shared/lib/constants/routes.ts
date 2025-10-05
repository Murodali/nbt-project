export const ROUTES = {
  // Shared routes
  LOGIN: "/login",
  OTP: "/otp",
  HOME: "/",
  
  // Postavshik Dannih (Data Provider) routes
  POSTAVSHIK_DASHBOARD: "/postavshik-dannih/dashboard",
  POSTAVSHIK_REPORTS_HISTORY: "/postavshik-dannih/reports-history",
  POSTAVSHIK_NOTIFICATIONS: "/postavshik-dannih/notifications",
  
  // Vladelec Dannih (Data Owner) routes
  VLADELEC_DASHBOARD: "/vladelec-dannih/dashboard",
  VLADELEC_ACCESS_SETTINGS: "/vladelec-dannih/access-settings",
  VLADELEC_NOTIFICATIONS: "/vladelec-dannih/notifications",
  VLADELEC_REPORT_DETAIL: "/vladelec-dannih/reports/:reportId",
  
  // Architector Dannih (Data Architect) routes
  ARCHITECTOR_BANK_REPORTS: "/architector-dannih/bank-reports",
  ARCHITECTOR_FLOWS: "/architector-dannih/flows",
  ARCHITECTOR_CREATE_FLOW: "/architector-dannih/flows/create",
  ARCHITECTOR_EXCEL_GRID: "/architector-dannih/flows/excel-grid",
  ARCHITECTOR_REPORT_GENERATION: "/architector-dannih/report-generation",
  ARCHITECTOR_CREATE_REPORT: "/architector-dannih/report-generation/create",
  ARCHITECTOR_ROLES: "/architector-dannih/roles",
  ARCHITECTOR_DEPARTMENTS: "/architector-dannih/departments",
  ARCHITECTOR_NOTIFICATIONS: "/architector-dannih/notifications",
  
  // Legacy routes for backward compatibility
  DASHBOARD: "/dashboard",
  NOTIFICATIONS: "/notifications",
  REPORTS_HISTORY: "/reports-history",
} as const;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = typeof ROUTES[RouteKeys];
