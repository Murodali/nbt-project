import { Button, Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";

const mockReports = [
  {
    id: "1",
    title: "Отчет EKSDU2984-JFHA",
    type: "Финансы",
    period: "Ежеквартальный",
    dueDate: "Сегодня до 18:00",
    status: "pending",
  },
  {
    id: "2",
    title: "Отчет EKSDU2984-JFHA",
    type: "Финансы",
    period: "Ежеквартальный",
    dueDate: "Сегодня до 18:00",
    status: "pending",
  },
  {
    id: "3",
    title: "Отчет EKSDU2984-JFHA",
    type: "Финансы",
    period: "Ежеквартальный",
    dueDate: "Сегодня до 18:00",
    status: "pending",
  },
];

export const BlizhayshieOtchetySection = () => {
  const navigate = useNavigate();

  const handleReportClick = (reportId: string) => {
    navigate(`/vladelec-dannih/reports/${reportId}`);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-sm">
        <CardBody className="p-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-6">
            Ближайшие отчеты
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockReports.map((report) => (
              <Card
                key={report.id}
                className="border border-border cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleReportClick(report.id)}
              >
                <CardBody className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{report.title}</h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {report.type}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {report.period}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {report.dueDate}
                  </p>

                  <Button
                    color="primary"
                    size="sm"
                    className="w-full"
                    onPress={() => handleReportClick(report.id)}
                  >
                    Загрузить
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
