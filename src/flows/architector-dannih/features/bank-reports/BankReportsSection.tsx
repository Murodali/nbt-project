import { Button, Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";

const mockBanks = [
  {
    id: "1",
    name: "Dushanbe city bank",
    icon: "DC",
    iconColor: "bg-blue-500",
    reports: {
      sent: 12,
      unviewed: 1,
      pending: 3,
    },
  },
  {
    id: "2",
    name: "Alif bank",
    icon: "A",
    iconColor: "bg-green-500",
    reports: {
      sent: 12,
      unviewed: 1,
      pending: 3,
    },
  },
  {
    id: "3",
    name: "Душанбе сити",
    icon: "DC",
    iconColor: "bg-blue-500",
    reports: {
      sent: 12,
      unviewed: 1,
      pending: 3,
    },
  },
];

export const BankReportsSection = () => {
  const navigate = useNavigate();

  const handleBankDetails = (bankId: string) => {
    const bank = mockBanks.find((b) => b.id === bankId);
    if (bank) {
      localStorage.setItem("selectedBank", JSON.stringify(bank));
    }
    navigate(`/architector-dannih/bank-reports/${bankId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Отчеты банков</h1>
        <p className="text-gray-600">Управление отчетами от различных банков</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBanks.map((bank) => (
          <Card key={bank.id} className="bg-white shadow-sm">
            <CardBody className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`w-12 h-12 ${bank.iconColor} rounded-full flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-lg">
                    {bank.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {bank.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Отправлено:</span>
                  <span className="font-medium">
                    {bank.reports.sent} отчетов
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Непросмотренных:</span>
                  <span className="font-medium">
                    {bank.reports.unviewed} отчет
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">В ожидании:</span>
                  <span className="font-medium">
                    {bank.reports.pending} отчета
                  </span>
                </div>
              </div>

              <Button
                color="primary"
                className="w-[50%]"
                variant="solid"
                onClick={() => handleBankDetails(bank.id)}
              >
                Подробнее
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
