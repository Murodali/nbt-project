import { Navigate, Route, Routes } from "react-router-dom";
import { LoginForm } from "../features/auth/ui/LoginForm";
import { OtpForm } from "../features/otp/ui/OtpForm";
import { ArchitectorRouter } from "../flows/architector-dannih/routes/ArchitectorRouter";
import { PostavshikRouter } from "../flows/postavshik-dannih/routes/PostavshikRouter";
import { VladelecRouter } from "../flows/vladelec-dannih/routes/VladelecRouter";
import { ROUTES } from "../shared/lib/constants/routes";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Shared authentication routes */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.OTP} element={<OtpPage />} />

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
        element={<Navigate to={ROUTES.LOGIN} replace />}
      />
    </Routes>
  );
};

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <LoginForm />
    </div>
  );
};

const OtpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <OtpForm />
    </div>
  );
};
