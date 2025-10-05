import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../../shared/lib/constants/routes";
import { NotificationsPage } from "../../shared/pages/notifications/NotificationsPage";
import { PostavshikDashboardPage } from "../pages/dashboard/PostavshikDashboardPage";
import { PostavshikReportsHistoryPage } from "../pages/reports-history/PostavshikReportsHistoryPage";

export const PostavshikRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<PostavshikDashboardPage />} />
      <Route
        path="/reports-history"
        element={<PostavshikReportsHistoryPage />}
      />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route
        path="/"
        element={<Navigate to={ROUTES.POSTAVSHIK_DASHBOARD} replace />}
      />
    </Routes>
  );
};
