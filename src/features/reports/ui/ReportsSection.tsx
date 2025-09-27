import { ClockIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, Chip } from "@heroui/react";
import { useState } from "react";
import { mockReports } from "../model/mockData";
import type { Report } from "../model/types";
import { UploadModal } from "./UploadModal";

interface ReportCardProps {
  report: Report;
  onUploadClick: (report: Report) => void;
}

const ReportCard = ({ report, onUploadClick }: ReportCardProps) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{report.title}</h3>
              <p className="text-sm text-gray-500">{report.code}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {report.tags.map((tag, index) => (
            <Chip
              key={index}
              size="sm"
              variant="flat"
              className="bg-gray-100 text-gray-700"
            >
              {tag}
            </Chip>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <ClockIcon className="w-4 h-4" />
            <span>Сегодня до {report.deadline}</span>
          </div>
          <Button
            color="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onPress={() => onUploadClick(report)}
          >
            Загрузить
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export const ReportsSection = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleUploadClick = (report: Report) => {
    setSelectedReport(report);
    setIsUploadModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUploadModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Ближайшие отчеты</h2>
        <div className="flex items-center space-x-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onUploadClick={handleUploadClick}
          />
        ))}

        {/* Add Report Card */}
        {/* <Card className="bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
          <CardBody className="p-6 flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-600 text-xl font-bold">A</span>
              </div>
              <p className="text-gray-500 text-sm">Добавить отчет</p>
            </div>
          </CardBody>
        </Card> */}
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseModal}
        reportTitle={selectedReport?.code}
      />
    </div>
  );
};
