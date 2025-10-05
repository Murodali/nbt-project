import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../../shared/lib/constants/routes";
import { NotificationsPage } from "../../shared/pages/notifications/NotificationsPage";
import { AccessSettingsPage } from "../pages/access-settings/AccessSettingsPage";
import { VladelecDashboardPage } from "../pages/dashboard/VladelecDashboardPage";
import { ReportDetailPage } from "../pages/reports/ReportDetailPage";

export const VladelecRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<VladelecDashboardPage />} />
      <Route path="/access-settings" element={<AccessSettingsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/reports/:reportId" element={<ReportDetailPage />} />
      <Route
        path="/"
        element={<Navigate to={ROUTES.VLADELEC_DASHBOARD} replace />}
      />
    </Routes>
  );
};
