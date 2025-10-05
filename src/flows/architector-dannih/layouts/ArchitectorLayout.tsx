import { Outlet } from "react-router-dom";
import { ArchitectorSidebar } from "../widgets/ArchitectorSidebar";

export const ArchitectorLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <ArchitectorSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
