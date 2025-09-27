import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider = ({ children }: UIProviderProps) => {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
};
