import { Button, Card, CardBody } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../shared/lib/constants/routes";

export const FlowSelector = () => {
  const navigate = useNavigate();
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

  const handleFlowSelect = (
    flow: "postavshik" | "vladelec" | "architector"
  ) => {
    setSelectedFlow(flow);

    // Navigate to the appropriate flow dashboard
    if (flow === "postavshik") {
      navigate(ROUTES.POSTAVSHIK_DASHBOARD);
    } else if (flow === "vladelec") {
      navigate(ROUTES.VLADELEC_DASHBOARD);
    } else {
      navigate(ROUTES.ARCHITECTOR_BANK_REPORTS);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-2xl">
        <CardBody className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Выберите тип пользователя
            </h1>
            <p className="text-muted-foreground">
              Выберите соответствующий тип пользователя для доступа к функциям
              системы
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Postavshik Dannih Flow */}
            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedFlow === "postavshik" ? "ring-2 ring-primary" : ""
              }`}
              isPressable
              onPress={() => handleFlowSelect("postavshik")}
            >
              <CardBody className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Поставщик данных
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Загрузка и управление отчетами, календарь событий
                </p>
                <Button color="primary" variant="flat" className="w-full">
                  Войти как поставщик
                </Button>
              </CardBody>
            </Card>

            {/* Vladelec Dannih Flow */}
            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedFlow === "vladelec" ? "ring-2 ring-primary" : ""
              }`}
              isPressable
              onPress={() => handleFlowSelect("vladelec")}
            >
              <CardBody className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Владелец данных
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Настройка доступов, управление пользователями
                </p>
                <Button color="success" variant="flat" className="w-full">
                  Войти как владелец
                </Button>
              </CardBody>
            </Card>

            {/* Architector Dannih Flow */}
            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedFlow === "architector" ? "ring-2 ring-primary" : ""
              }`}
              isPressable
              onPress={() => handleFlowSelect("architector")}
            >
              <CardBody className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Архитектор данных
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Управление потоками, формирование отчетов, настройка системы
                </p>
                <Button color="secondary" variant="flat" className="w-full">
                  Войти как архитектор
                </Button>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
