import { Navigate, Route, Routes } from "react-router-dom";
import { FlowSelector } from "../flows/FlowSelector";
import { ArchitectorRouter } from "../flows/architector-dannih/routes/ArchitectorRouter";
import { PostavshikRouter } from "../flows/postavshik-dannih/routes/PostavshikRouter";
import { LoginPage } from "../flows/shared/pages/login/LoginPage";
import { OtpPage } from "../flows/shared/pages/otp/OtpPage";
import { VladelecRouter } from "../flows/vladelec-dannih/routes/VladelecRouter";
import { ROUTES } from "../shared/lib/constants/routes";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Shared authentication routes */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.OTP} element={<OtpPage />} />

      {/* Flow selector */}
      <Route path="/select-flow" element={<FlowSelector />} />

      {/* Postavshik Dannih (Data Provider) flow */}
      <Route path="/postavshik-dannih/*" element={<PostavshikRouter />} />

      {/* Vladelec Dannih (Data Owner) flow */}
      <Route path="/vladelec-dannih/*" element={<VladelecRouter />} />

      {/* Architector Dannih (Data Architect) flow */}
      <Route path="/architector-dannih/*" element={<ArchitectorRouter />} />

      {/* Legacy routes for backward compatibility */}
      <Route
        path={ROUTES.DASHBOARD}
        element={<Navigate to={ROUTES.POSTAVSHIK_DASHBOARD} replace />}
      />
      <Route
        path={ROUTES.NOTIFICATIONS}
        element={<Navigate to={ROUTES.POSTAVSHIK_NOTIFICATIONS} replace />}
      />
      <Route
        path={ROUTES.REPORTS_HISTORY}
        element={<Navigate to={ROUTES.POSTAVSHIK_REPORTS_HISTORY} replace />}
      />

      {/* Default redirect */}
      <Route
        path={ROUTES.HOME}
        element={<Navigate to="/select-flow" replace />}
      />
    </Routes>
  );
};
