import { Header } from "../../../../widgets/header/Header";

export const PostavshikDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Панель поставщика данных
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Добро пожаловать в систему управления отчетами
          </p>
        </div>
      </main>
    </div>
  );
};
