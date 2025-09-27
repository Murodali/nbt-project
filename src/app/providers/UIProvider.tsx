import { HeroUIProvider } from "@heroui/react";
import { type ReactNode } from "react";
import { ThemeProvider } from "../../shared/lib/contexts/ThemeContext";

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider = ({ children }: UIProviderProps) => {
  return (
    <ThemeProvider>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </ThemeProvider>
  );
};
