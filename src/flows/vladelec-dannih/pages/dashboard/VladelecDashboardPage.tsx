import { useState } from "react";
import { CalendarSection } from "../../../postavshik-dannih/features";
import { BlizhayshieOtchetySection } from "../../features/blizhayshie-otchety/BlizhayshieOtchetySection";
import { VladelecHeader } from "../../widgets/VladelecHeader";

export const VladelecDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<"otchety" | "calendar">("otchety");

  return (
    <div className="min-h-screen bg-background">
      {/* Header Widget */}
      <VladelecHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab("otchety")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "otchety"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Ближайшие отчеты
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "calendar"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Календарь
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "otchety" && <BlizhayshieOtchetySection />}
          {activeTab === "calendar" && <CalendarSection />}
        </div>
      </main>
    </div>
  );
};
