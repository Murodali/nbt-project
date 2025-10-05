import {
  Button,
  Card,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type Selection,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const mockBanks = [
  {
    id: "1",
    name: "Dushanbe city bank",
    icon: "DC",
    iconColor: "bg-blue-500",
  },
  {
    id: "2",
    name: "Alif bank",
    icon: "A",
    iconColor: "bg-green-500",
  },
  {
    id: "3",
    name: "Душанбе сити",
    icon: "DC",
    iconColor: "bg-blue-500",
  },
];

const mockUnsubmittedFlows = [
  {
    id: "1",
    reportId: "EKSDU2984-JFHA",
    category: "Финансы",
    frequency: "Ежеквартальный",
    status: "overdue",
    daysOverdue: 2,
    dueDate: "12.09.2025",
  },
  {
    id: "2",
    reportId: "EKSDU2984-JFHA",
    category: "Финансы",
    frequency: "Ежеквартальный",
    status: "pending",
    dueDate: "12.09.2025",
  },
  {
    id: "3",
    reportId: "EKSDU2984-JFHA",
    category: "Финансы",
    frequency: "Ежеквартальный",
    status: "pending",
    dueDate: "12.09.2025",
  },
];

const mockIncomingFlows = [
  {
    id: "1",
    reportId: "EKSDU2984-JFHA",
    frequency: "Каждый месяц",
    submissionDeadline: "12.09.2025",
    submissionDate: "12.09.2025",
  },
];

interface Bank {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
}

const columns = [
  { key: "report", label: "Отчет" },
  { key: "frequency", label: "Регулярность" },
  { key: "submissionDeadline", label: "Срок отправки" },
  { key: "submissionDate", label: "Дата отправки" },
];

export const BankDetailsPage = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const navigate = useNavigate();
  const [bank, setBank] = useState<Bank | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  useEffect(() => {
    // Try to get bank from localStorage first
    const storedBank = localStorage.getItem("selectedBank");

    if (storedBank) {
      try {
        const parsedBank = JSON.parse(storedBank);
        setBank(parsedBank);
      } catch (error) {
        console.error("Error parsing stored bank data:", error);
      }
    }

    // Fallback to mockBanks if localStorage fails
    if (!storedBank) {
      const fallbackBank = mockBanks.find((b) => b.id === bankId);
      setBank(fallbackBank || null);
    }

    setLoading(false);
  }, [bankId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  if (!bank) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Банк не найден</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb Header */}
      <div className="bg-gray-50 px-6 py-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 ${bank.iconColor} rounded-full flex items-center justify-center`}
          >
            <span className="text-white font-bold text-sm">{bank.icon}</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              <span
                className="text-gray-500 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                Отчеты банков
              </span>{" "}
              / <span className="text-gray-900 font-bold">{bank.name}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Несданные потоки */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Несданные потоки
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockUnsubmittedFlows.map((flow) => (
            <Card key={flow.id} className="bg-white shadow-sm">
              <CardBody className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`w-8 h-8 ${
                      flow.status === "overdue"
                        ? "bg-orange-500"
                        : "bg-gray-800"
                    } rounded flex items-center justify-center`}
                  >
                    <span className="text-white text-xs">📄</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      Отчет {flow.reportId}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {flow.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {flow.frequency}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  {flow.status === "overdue" ? (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                      Просрочено на {flow.daysOverdue} дня
                    </span>
                  ) : (
                    <span className="text-gray-600 text-sm">
                      До {flow.dueDate}
                    </span>
                  )}
                  <Button size="sm" color="primary" variant="solid">
                    Напомнить
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Входящие потоки */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Входящие потоки
        </h2>
        <Card className="bg-white shadow-sm">
          <CardBody className="p-0">
            <Table
              aria-label="Incoming flows table"
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
              classNames={{
                wrapper: "shadow-none",
                th: "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm",
                td: "text-gray-900 dark:text-gray-100 text-sm",
              }}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={mockIncomingFlows}>
                {(flow) => (
                  <TableRow key={flow.id}>
                    <TableCell className="font-medium">
                      Отчет {flow.reportId}
                    </TableCell>
                    <TableCell>{flow.frequency}</TableCell>
                    <TableCell>{flow.submissionDeadline}</TableCell>
                    <TableCell>{flow.submissionDate}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
