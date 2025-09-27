import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type Selection,
} from "@heroui/react";
import { useState } from "react";
import { mockReportsHistory } from "../model/mockData";
import type { ReportStatus } from "../model/types";

const getStatusChip = (status: ReportStatus) => {
  switch (status) {
    case "accepted":
      return (
        <Chip
          startContent={<CheckCircleIcon className="w-4 h-4" />}
          variant="flat"
          color="success"
          size="sm"
        >
          Принят
        </Chip>
      );
    case "overdue":
      return (
        <Chip
          startContent={<ExclamationTriangleIcon className="w-4 h-4" />}
          variant="flat"
          color="warning"
          size="sm"
        >
          Просрочен
        </Chip>
      );
    case "under_review":
      return (
        <Chip
          startContent={<ClockIcon className="w-4 h-4" />}
          variant="flat"
          color="primary"
          size="sm"
        >
          На проверке
        </Chip>
      );
    default:
      return (
        <Chip variant="flat" color="default" size="sm">
          Неизвестно
        </Chip>
      );
  }
};

const columns = [
  { key: "reportId", label: "Отчет" },
  { key: "assignedDate", label: "Назначен" },
  { key: "submissionDate", label: "Дата сдачи" },
  { key: "reportType", label: "Тип отчета" },
  { key: "status", label: "Статус" },
];

export const ReportsHistorySection = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          История отчетов
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <Table
          aria-label="Reports history table"
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
          <TableBody items={mockReportsHistory}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.reportId}</TableCell>
                <TableCell>{item.assignedDate}</TableCell>
                <TableCell>{item.submissionDate}</TableCell>
                <TableCell>{item.reportType}</TableCell>
                <TableCell>{getStatusChip(item.status)}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
