import {
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
} from "@heroui/react";
import { useRef, useState } from "react";

export type UploadState = "idle" | "uploading" | "success" | "error";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle?: string;
}

export const UploadModal = ({
  isOpen,
  onClose,
  reportTitle,
}: UploadModalProps) => {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (
        file.type.includes("spreadsheet") ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls") ||
        file.name.endsWith(".csv")
      ) {
        setSelectedFile(file);
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploadState("uploading");
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate random success/error
          const isSuccess = Math.random() > 0.3;
          setUploadState(isSuccess ? "success" : "error");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleClose = () => {
    setUploadState("idle");
    setSelectedFile(null);
    setUploadProgress(0);
    setIsDragOver(false);
    onClose();
  };

  const handleRetry = () => {
    setUploadState("idle");
    setSelectedFile(null);
    setUploadProgress(0);
    setIsDragOver(false);
  };

  const renderContent = () => {
    switch (uploadState) {
      case "idle":
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-3xl font-semibold">Загрузить отчет</h3>
            </ModalHeader>
            <ModalBody>
              <div className="py-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                    isDragOver
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <ArrowUpTrayIcon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700 text-base">
                    Перетяните или{" "}
                    <span className="text-blue-600 underline">
                      выберите файл
                    </span>{" "}
                    для загрузки
                  </p>
                </div>
                {selectedFile && (
                  <div className="bg-gray-50 p-3 rounded-lg w-full mt-4">
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".xlsx,.xls,.csv"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={handleClose}>
                Отмена
              </Button>
              <Button
                color="primary"
                onPress={handleUpload}
                isDisabled={!selectedFile}
              >
                Загрузить
              </Button>
            </ModalFooter>
          </>
        );

      case "uploading":
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Загрузить отчет</h3>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <ArrowDownTrayIcon className="w-8 h-8 text-blue-600" />
                </div>
                {selectedFile && (
                  <div className="bg-gray-50 p-3 rounded-lg w-full mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <button onClick={handleClose}>
                        <XMarkIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <Progress
                      value={uploadProgress}
                      color="success"
                      className="mb-2"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {uploadProgress}%
                      </span>
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold">A</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" isLoading isDisabled>
                Загрузить
              </Button>
            </ModalFooter>
          </>
        );

      case "success":
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold">
                  Отчет {reportTitle || "EKSDU2984-JFHA"} отправлен на проверку
                </h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600 text-center">
                  Ожидайте ответ по проверке отчета, мы пришлем уведомление
                  когда все будет готово
                </p>
              </div>
            </ModalBody>
          </>
        );

      case "error":
        return (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold">
                  Ошибка загрузки — строка 27: невалидный ИНН
                </h3>
                <button onClick={handleClose}>
                  <XMarkIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center py-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <ExclamationTriangleIcon className="w-8 h-8 text-orange-600" />
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-semibold text-sm">M</span>
                </div>
                <p className="text-gray-600 text-center mb-4">
                  Исправьте ошибки и отправьте на проверку еще раз
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={handleRetry}>
                Загрузить заново
              </Button>
            </ModalFooter>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      classNames={{
        base: "max-w-md",
        body: "py-6",
      }}
    >
      <ModalContent>{renderContent()}</ModalContent>
    </Modal>
  );
};
