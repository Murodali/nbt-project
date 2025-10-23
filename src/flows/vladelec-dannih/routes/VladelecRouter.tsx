import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../../shared/lib/constants/routes";
import { AccessSettingsPage } from "../pages/access-settings/AccessSettingsPage";
import { VladelecDashboardPage } from "../pages/dashboard/VladelecDashboardPage";
import { EndpointsPage } from "../pages/endpoints/EndpointsPage";
import { VladelecNotificationsPage } from "../pages/notifications/NotificationsPage";
import { ReportDetailPage } from "../pages/reports/ReportDetailPage";
import { RolesPage } from "../pages/roles/RolesPage";

export const VladelecRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<VladelecDashboardPage />} />
      <Route path="/access-settings" element={<AccessSettingsPage />} />
      <Route path="/roles" element={<RolesPage />} />
      <Route path="/endpoints" element={<EndpointsPage />} />
      <Route path="/notifications" element={<VladelecNotificationsPage />} />
      <Route path="/reports/:reportId" element={<ReportDetailPage />} />
      <Route
        path="/"
        element={<Navigate to={ROUTES.VLADELEC_DASHBOARD} replace />}
      />
    </Routes>
  );
};
