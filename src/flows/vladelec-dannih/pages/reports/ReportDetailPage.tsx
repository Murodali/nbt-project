import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, InputOtp, Textarea } from "@heroui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ReportDetailPage = () => {
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId: string }>();

  // Modal states
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [revisionComment, setRevisionComment] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [countdown, setCountdown] = useState(133); // 2:13 in seconds

  // Mock report data based on ID
  const getReportData = (id: string) => {
    const reports = {
      "1": {
        title: "Отчет EKSDU2984-JFHA",
        type: "Финансы",
        period: "Ежеквартальный",
        status: "pending",
      },
      "2": {
        title: "Отчет EKSDU2985-JFHB",
        type: "Финансы",
        period: "Ежеквартальный",
        status: "pending",
      },
      "3": {
        title: "Отчет EKSDU2986-JFHC",
        type: "Финансы",
        period: "Ежеквартальный",
        status: "pending",
      },
    };
    return (
      reports[id as keyof typeof reports] || {
        title: `Отчет ${id}`,
        type: "Финансы",
        period: "Ежеквартальный",
        status: "pending",
      }
    );
  };

  const reportData = getReportData(reportId || "1");

  const handleBack = () => {
    navigate(-1);
  };

  const handleRevision = () => {
    setIsRevisionModalOpen(true);
  };

  const handleSign = () => {
    setIsOtpModalOpen(true);
  };

  const handleCloseRevisionModal = () => {
    setIsRevisionModalOpen(false);
    setRevisionComment("");
  };

  const handleCloseOtpModal = () => {
    setIsOtpModalOpen(false);
    setOtpValue("");
  };

  const handleSubmitRevision = () => {
    console.log("Submit revision:", { reportId, comment: revisionComment });
    // Here you would implement the revision submission logic
    handleCloseRevisionModal();
  };

  const handleSubmitOtp = () => {
    console.log("Submit OTP:", { reportId, code: otpValue });
    // Here you would implement the OTP verification logic
    handleCloseOtpModal();
  };

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBack}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {reportData.title}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="flat"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              onPress={handleRevision}
            >
              На доработку
            </Button>
            <Button color="primary" onPress={handleSign}>
              Подписать
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - File Reader with Grid */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-200px)] relative overflow-hidden">
          {/* Grid Pattern Background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                Файл ридер
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Revision Modal */}
      {isRevisionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                На доработку
              </h2>
              <button
                onClick={handleCloseRevisionModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Введите комментарий причины отказа отчета
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Комментарий
              </label>
              <Textarea
                value={revisionComment}
                onChange={(e) => setRevisionComment(e.target.value)}
                placeholder="Введите комментарий..."
                className="w-full"
                rows={4}
              />
            </div>

            <Button
              color="primary"
              className="w-full"
              onPress={handleSubmitRevision}
              isDisabled={!revisionComment.trim()}
            >
              Отправить на доработку
            </Button>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Проверка ОТР
              </h2>
              <button
                onClick={handleCloseOtpModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Введите проверочный код, который мы отправили на указанную
              электронную почту
            </p>

            <div className="flex justify-center mb-6">
              <InputOtp
                autoFocus={true}
                length={5}
                value={otpValue}
                onValueChange={handleOtpChange}
                variant="flat"
                size="lg"
                classNames={{
                  base: "gap-3",
                  segment:
                    "w-16 h-16 text-2xl font-bold rounded-lg focus:border-blue-500 data-[focus=true]:border-blue-500",
                }}
              />
            </div>

            <Button
              color="primary"
              className="w-full mb-4"
              onPress={handleSubmitOtp}
              isDisabled={otpValue.length !== 5}
            >
              Подписать
            </Button>

            <p className="text-sm text-gray-500 text-center">
              Повторно отправить код через{" "}
              <span className="text-blue-600 font-medium">
                {formatCountdown(countdown)}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
