import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/lib/constants/routes";

const navigationItems = [
  {
    id: "bank-reports",
    label: "Отчеты банков",
    path: ROUTES.ARCHITECTOR_BANK_REPORTS,
  },
  {
    id: "flows",
    label: "Потоки",
    path: ROUTES.ARCHITECTOR_FLOWS,
  },
  {
    id: "report-generation",
    label: "Формирование отчета",
    path: ROUTES.ARCHITECTOR_REPORT_GENERATION,
  },
];

const rolesDepartmentsItems = [
  {
    id: "roles",
    label: "Роли",
    path: ROUTES.ARCHITECTOR_ROLES,
  },
  {
    id: "departments",
    label: "Департаменты",
    path: ROUTES.ARCHITECTOR_DEPARTMENTS,
  },
];

const supportItems = [
  {
    id: "help",
    label: "Справочная",
  },
  {
    id: "report-error",
    label: "Сообщить об ошибке",
  },
];

const userItems = [
  {
    id: "notifications",
    label: "Уведомления",
  },
  {
    id: "settings",
    label: "Настройки",
  },
  {
    id: "account",
    label: "Аккаунт",
  },
];

export const ArchitectorSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const getActiveItem = () => {
    const currentPath = location.pathname;
    return (
      [...navigationItems, ...rolesDepartmentsItems].find((item) =>
        currentPath.includes(item.path)
      )?.id || "bank-reports"
    );
  };

  const activeItem = getActiveItem();

  return (
    <div className="bg-gray-100 h-screen w-64">
      <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
        {/* Logo */}
        <div className="p-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <span className="text-gray-700 font-sans text-sm">LOGO</span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="px-4 pb-4">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                  activeItem === item.id
                    ? "bg-white text-gray-900 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="px-4 pb-4">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Roles and Departments */}
        <div className="px-4 pb-4">
          <div className="space-y-1">
            {rolesDepartmentsItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                  activeItem === item.id
                    ? "bg-white text-gray-900 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="px-4 pb-4">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Support Section */}
        <div className="px-4 pb-4">
          <div className="space-y-1">
            {supportItems.map((item) => (
              <button
                key={item.id}
                className="w-full text-left py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span className="text-base">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom User Section */}
        <div className="mt-auto px-4 pb-6">
          <div className="space-y-1">
            {userItems.map((item) => (
              <button
                key={item.id}
                onClick={() => item.path && handleNavigation(item.path)}
                className="w-full text-left py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span className="text-base">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
