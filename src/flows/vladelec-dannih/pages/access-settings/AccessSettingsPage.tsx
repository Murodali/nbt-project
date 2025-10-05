import { AccessSettingsSection } from "../../features/access-settings/AccessSettingsSection";
import { VladelecHeader } from "../../widgets/VladelecHeader";

export const AccessSettingsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Widget */}
      <VladelecHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Access Settings Section */}
          <AccessSettingsSection />
        </div>
      </main>
    </div>
  );
};
