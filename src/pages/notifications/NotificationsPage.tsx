import { NotificationsSection } from "../../features/notifications";
import { Header } from "../../widgets/header";

export const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NotificationsSection />
      </main>
    </div>
  );
};
