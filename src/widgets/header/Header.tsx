import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { BellIcon, ClockIcon, UserIcon } from "@heroicons/react/24/solid";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { clearTokens } from "../../shared/api/axios";
import { ROUTES } from "../../shared/lib/constants/routes";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Clear tokens and navigate to login
      clearTokens();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear tokens and navigate even if there's an error
      clearTokens();
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Logo</h1>
          </div>

          {/* Right side - User info and actions */}
          <div className="flex items-center space-x-4">
            {/* History Reports Button */}
            <Button
              variant="flat"
              size="md"
              color="primary"
              startContent={<ClockIcon className="w-4 h-4" />}
              onClick={() => navigate(ROUTES.REPORTS_HISTORY)}
            >
              История отчетов
            </Button>

            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <Button
                variant="solid"
                size="md"
                color="primary"
                isIconOnly
                radius="full"
                startContent={<BellIcon className="w-4 h-4" />}
                onClick={() => navigate(ROUTES.NOTIFICATIONS)}
              ></Button>

              {/* User Profile Popover */}
              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    isIconOnly
                    radius="full"
                    startContent={<UserIcon className="w-4 h-4" />}
                  ></Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <div className="px-1 py-2 w-64">
                    {/* User Info Section */}
                    <div className="px-3 py-2 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <UserCircleIcon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">
                            Пользователь
                          </div>
                          <div className="text-xs text-gray-500">
                            user@example.com
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Button
                        variant="light"
                        size="sm"
                        className="w-full justify-start px-3 py-2 text-left"
                        startContent={<UserCircleIcon className="w-4 h-4" />}
                      >
                        Профиль
                      </Button>

                      <Button
                        variant="light"
                        size="sm"
                        color="danger"
                        className="w-full justify-start px-3 py-2 text-left"
                        startContent={
                          <ArrowRightOnRectangleIcon className="w-4 h-4" />
                        }
                        onClick={handleLogout}
                      >
                        Выйти
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
