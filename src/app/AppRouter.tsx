import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { LoginPage } from "../pages/login/LoginPage";
import { NotificationsPage } from "../pages/notifications/NotificationsPage";
import { OtpPage } from "../pages/otp/OtpPage";
import { ReportsHistoryPage } from "../pages/reports-history/ReportsHistoryPage";
import { ROUTES } from "../shared/lib/constants/routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.OTP} element={<OtpPage />} />
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
      <Route path={ROUTES.REPORTS_HISTORY} element={<ReportsHistoryPage />} />
      <Route
        path={ROUTES.HOME}
        element={<Navigate to={ROUTES.LOGIN} replace />}
      />
      {/* Add more routes here */}
    </Routes>
  );
};
