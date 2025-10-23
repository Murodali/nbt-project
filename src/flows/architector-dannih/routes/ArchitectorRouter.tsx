import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../../shared/lib/constants/routes";
import { ArchitectorNotificationsPage } from "../pages/notifications/NotificationsPage";
import { ArchitectorLayout } from "../layouts/ArchitectorLayout";
import { BankDetailsPage } from "../pages/bank-reports/BankDetailsPage";
import { BankReportsPage } from "../pages/bank-reports/BankReportsPage";
import { CreateFlowPage } from "../pages/flows/CreateFlowPage";
import { ExcelGridPage } from "../pages/flows/ExcelGridPage";
import { FlowsPage } from "../pages/flows/FlowsPage";
import { CreateReportPage } from "../pages/report-generation/CreateReportPage";
import { ReportGenerationPage } from "../pages/report-generation/ReportGenerationPage";

export const ArchitectorRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ArchitectorLayout />}>
        <Route
          index
          element={<Navigate to={ROUTES.ARCHITECTOR_BANK_REPORTS} replace />}
        />
        <Route path="bank-reports" element={<BankReportsPage />} />
        <Route path="bank-reports/:bankId" element={<BankDetailsPage />} />
        <Route path="flows" element={<FlowsPage />} />
        <Route path="flows/create" element={<CreateFlowPage />} />
        <Route path="flows/excel-grid" element={<ExcelGridPage />} />
        <Route path="report-generation" element={<ReportGenerationPage />} />
        <Route path="report-generation/create" element={<CreateReportPage />} />
        <Route path="roles" element={<div>Roles Page - Coming Soon</div>} />
        <Route
          path="departments"
          element={<div>Departments Page - Coming Soon</div>}
        />
        <Route path="notifications" element={<ArchitectorNotificationsPage />} />
      </Route>
    </Routes>
  );
};
