import { CalendarSection } from "../../features/calendar";
import { ReportsSection } from "../../features/reports";
import { Header } from "../../widgets/header";

export const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Widget */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Reports Section */}
          <ReportsSection />

          {/* Calendar Section */}
          <CalendarSection />
        </div>
      </main>
    </div>
  );
};
