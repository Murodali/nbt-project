import { type ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { RouterProvider } from "./RouterProvider";
import { UIProvider } from "./UIProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <RouterProvider>
      <UIProvider>
        <QueryProvider>{children}</QueryProvider>
      </UIProvider>
    </RouterProvider>
  );
};
