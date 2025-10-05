import { Header } from "../../../../widgets/header";
import { NotificationsSection } from "../../features/notifications";

export const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NotificationsSection />
      </main>
    </div>
  );
};
