import { MoonIcon, SunIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { useTheme } from '../../lib/hooks/useTheme';
import type { Theme } from '../../lib/contexts/ThemeContext';

const themeOptions = [
  {
    key: 'light' as Theme,
    label: 'Light',
    icon: SunIcon,
  },
  {
    key: 'dark' as Theme,
    label: 'Dark', 
    icon: MoonIcon,
  },
  {
    key: 'system' as Theme,
    label: 'System',
    icon: ComputerDesktopIcon,
  },
];

export const ThemeToggle = () => {
  const { theme, setTheme, actualTheme } = useTheme();

  const currentThemeOption = themeOptions.find(option => option.key === theme);
  const CurrentIcon = currentThemeOption?.icon || SunIcon;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="ghost"
          isIconOnly
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          aria-label="Toggle theme"
        >
          <CurrentIcon className="h-5 w-5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Theme selection"
        selectedKeys={[theme]}
        selectionMode="single"
        onSelectionChange={(keys) => {
          const selectedTheme = Array.from(keys)[0] as Theme;
          setTheme(selectedTheme);
        }}
      >
        {themeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownItem
              key={option.key}
              startContent={<Icon className="h-4 w-4" />}
            >
              {option.label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};
