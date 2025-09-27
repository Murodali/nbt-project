import {
  ArrowRightOnRectangleIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { BellIcon, ClockIcon, UserIcon } from "@heroicons/react/24/solid";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { clearTokens } from "../../shared/api/axios";
import { ROUTES } from "../../shared/lib/constants/routes";
import type { Theme } from "../../shared/lib/contexts/ThemeContext";
import { useTheme } from "../../shared/lib/hooks/useTheme";

const themeOptions = [
  {
    key: "light" as Theme,
    label: "Светлая тема",
    icon: SunIcon,
  },
  {
    key: "dark" as Theme,
    label: "Темная тема",
    icon: MoonIcon,
  },
  {
    key: "system" as Theme,
    label: "Системная",
    icon: ComputerDesktopIcon,
  },
];

export const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

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
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">Logo</h1>
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
                    <div className="px-3 py-2 border-b border-border">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                          <UserCircleIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground">
                            Пользователь
                          </div>
                          <div className="text-xs text-muted-foreground">
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

                      {/* Theme Selection */}
                      <div className="px-3 py-2">
                        <div className="text-xs font-medium text-muted-foreground mb-2">
                          Тема
                        </div>
                        <div className="space-y-1">
                          {themeOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = theme === option.key;
                            return (
                              <Button
                                key={option.key}
                                variant={isSelected ? "flat" : "light"}
                                size="sm"
                                className="w-full justify-start px-3 py-1 text-left"
                                startContent={<Icon className="w-4 h-4" />}
                                onClick={() => setTheme(option.key)}
                                color={isSelected ? "primary" : "default"}
                              >
                                {option.label}
                              </Button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="border-t border-border my-1"></div>

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
