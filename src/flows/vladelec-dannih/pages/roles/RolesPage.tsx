import { RolesSection } from "../../features/roles/ui/Roles";
import { VladelecHeader } from "../../widgets/VladelecHeader";

export const RolesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <VladelecHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RolesSection />
      </main>
    </div>
  );
};
