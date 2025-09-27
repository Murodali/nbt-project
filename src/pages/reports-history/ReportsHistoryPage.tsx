import { ReportsHistorySection } from "../../features/reports-history";
import { Header } from "../../widgets/header";

export const ReportsHistoryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReportsHistorySection />
      </main>
    </div>
  );
};
