import { CalendarSection, ReportsSection } from "../../features";
import { PostavshikHeader } from "../../widgets/PostavshikHeader";

export const PostavshikDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Widget */}
      <PostavshikHeader />

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
