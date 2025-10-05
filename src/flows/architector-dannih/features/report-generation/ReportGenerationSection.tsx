import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../shared/lib/constants/routes";

const mockReports = [
  {
    id: "1",
    reportName: "EKSDU2984-JFHA",
    status: "Отправлен",
    department: "Финансовый",
    fieldsCount: 12,
    sendDate: "12.09.2025",
  },
  {
    id: "2",
    reportName: "EKSDU2985-JFHB",
    status: "В обработке",
    department: "Технологический",
    fieldsCount: 8,
    sendDate: "10.09.2025",
  },
  {
    id: "3",
    reportName: "EKSDU2986-JFHC",
    status: "Черновик",
    department: "Здравоохранение",
    fieldsCount: 15,
    sendDate: "08.09.2025",
  },
];

export const ReportGenerationSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const handleCreateReport = () => {
    navigate(ROUTES.ARCHITECTOR_CREATE_REPORT);
  };

  const handleSelectReport = (reportId: string) => {
    setSelectedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    setSelectedReports(
      selectedReports.length === mockReports.length
        ? []
        : mockReports.map((report) => report.id)
    );
  };

  const filteredReports = mockReports.filter(
    (report) =>
      report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Формирование отчета
        </h1>
        <Button color="primary" size="lg" onPress={handleCreateReport}>
          Сформировать
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Поиск"
          value={searchTerm}
          onValueChange={setSearchTerm}
          className="max-w-md"
          startContent={
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
          }
        />
        <Button variant="flat" className="bg-white">
          Фильтр
        </Button>
        <Button variant="flat" className="bg-white">
          Фильтр
        </Button>
        <Button variant="flat" className="bg-white">
          Фильтр
        </Button>
        <Button variant="flat" className="bg-white">
          Фильтр
        </Button>
        <Button variant="flat" className="bg-white">
          <FunnelIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Reports Table */}
      <Card className="bg-white">
        <CardBody className="p-0">
          <Table aria-label="Reports table">
            <TableHeader>
              <TableColumn>
                <Checkbox
                  isSelected={selectedReports.length === mockReports.length}
                  onValueChange={handleSelectAll}
                />
              </TableColumn>
              <TableColumn>ОТЧЕТ</TableColumn>
              <TableColumn>ДЕПАРТАМЕНТ</TableColumn>
              <TableColumn>ПОЛЕЙ</TableColumn>
              <TableColumn>ДАТА ОТПРАВКИ</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <Checkbox
                      isSelected={selectedReports.includes(report.id)}
                      onValueChange={() => handleSelectReport(report.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">
                        {report.reportName}
                      </div>
                      <div
                        className={`text-sm ${
                          report.status === "Отправлен"
                            ? "text-green-600"
                            : report.status === "В обработке"
                            ? "text-yellow-600"
                            : "text-gray-500"
                        }`}
                      >
                        {report.status}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900">{report.department}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900">{report.fieldsCount}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900">{report.sendDate}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
