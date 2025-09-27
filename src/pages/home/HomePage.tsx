import { Card, CardBody, CardHeader } from "@heroui/react";
import { APP_NAME } from "../../shared/constants";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {APP_NAME}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Built with React 19, TypeScript, Tailwind CSS, and TanStack Query
            </p>
          </header>

          <main className="space-y-8">
            <Card>
              <CardHeader className="pb-3">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Project Features
                </h2>
              </CardHeader>
              <CardBody>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    React 19 with TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    Tailwind CSS v3 for styling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    TanStack Query for data fetching
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    Hero UI for components
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    Feature-Sliced Design architecture
                  </li>
                </ul>
              </CardBody>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};
