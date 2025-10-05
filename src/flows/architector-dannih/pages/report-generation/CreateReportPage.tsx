import {
  CheckIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../shared/lib/constants/routes";

const mockAvailableFields = [
  { id: "1", name: "Text", category: "Поток 1" },
  { id: "2", name: "Text", category: "Поток 1" },
  { id: "3", name: "Text", category: "Поток 1" },
  { id: "4", name: "Text", category: "Поток 1" },
  { id: "5", name: "Text", category: "Поток 1" },
  { id: "6", name: "Text", category: "Поток 1" },
  { id: "7", name: "Text", category: "Поток 1" },
  { id: "8", name: "Text", category: "Поток 1" },
  { id: "9", name: "Text", category: "Поток 2" },
  { id: "10", name: "Text", category: "Поток 2" },
  { id: "11", name: "Text", category: "Поток 2" },
  { id: "12", name: "Text", category: "Поток 2" },
  { id: "13", name: "Text", category: "Поток 2" },
];

const departments = [
  { id: "1", name: "Финансовый" },
  { id: "2", name: "Технологический" },
  { id: "3", name: "Здравоохранение" },
  { id: "4", name: "Образование" },
  { id: "5", name: "Энергетика" },
];

export const CreateReportPage = () => {
  const navigate = useNavigate();
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
  ]);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("1");

  const addField = (fieldId: string) => {
    if (!selectedFields.includes(fieldId)) {
      setSelectedFields([...selectedFields, fieldId]);
    }
  };

  const removeField = (fieldId: string) => {
    setSelectedFields(selectedFields.filter((id) => id !== fieldId));
  };

  const handleContinue = () => {
    setIsDepartmentModalOpen(true);
  };

  const handleSendReport = () => {
    setIsDepartmentModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const groupedFields = mockAvailableFields.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, typeof mockAvailableFields>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-large">
          <button
            onClick={() => navigate(ROUTES.ARCHITECTOR_REPORT_GENERATION)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Формирование отчета
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-black font-medium">Создание отчета</span>
        </div>
        <Button color="primary" size="lg" onPress={handleContinue}>
          Продолжить
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Fields */}
        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-6">Поля</h2>

              <div className="space-y-4">
                {selectedFields.map((fieldId) => {
                  return (
                    <div key={fieldId} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Input
                          value="Text"
                          size="lg"
                          placeholder="Text"
                          className="flex-1"
                          classNames={{
                            input: "bg-gray-100",
                            inputWrapper: "bg-gray-100 border-gray-200",
                          }}
                        />
                        <Button
                          color="danger"
                          variant="light"
                          size="sm"
                          onPress={() => removeField(fieldId)}
                          className="min-w-0 w-8 h-8 p-0"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar - Add Fields */}
        <div>
          <Card className="bg-white">
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-4">Добавить поля</h2>

              <div className="mb-6">
                <Input
                  placeholder="Найти нужные поля"
                  startContent={
                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
                  }
                />
              </div>

              <div className="space-y-6">
                {Object.entries(groupedFields).map(([category, fields]) => (
                  <div key={category}>
                    <h3 className="font-medium text-gray-900 mb-3">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {fields.map((field) => (
                        <div
                          key={field.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedFields.includes(field.id)
                              ? "bg-blue-50 border-blue-200"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => addField(field.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="text-gray-400">⋮⋮</div>
                              <span className="text-sm font-medium">
                                {field.name} id {field.id}
                              </span>
                            </div>
                            {selectedFields.includes(field.id) && (
                              <CheckIcon className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Department Selection Modal */}
      <Modal
        isOpen={isDepartmentModalOpen}
        onClose={() => setIsDepartmentModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold">Выберите департамент</h3>
          </ModalHeader>
          <ModalBody>
            <p className="text-sm text-gray-600 mb-4">
              Выберите в какой департамент отправить сформированный отчет
            </p>

            <div className="space-y-3">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedDepartment === dept.id
                      ? "bg-blue-50 border-blue-200"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedDepartment(dept.id)}
                >
                  {selectedDepartment === dept.id && (
                    <CheckIcon className="w-5 h-5 text-blue-600 mr-3" />
                  )}
                  <span className="font-medium">{dept.name}</span>
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onPress={() => setIsDepartmentModalOpen(false)}
            >
              Отменить
            </Button>
            <Button color="primary" onPress={handleSendReport}>
              Отправить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <ModalContent>
          <ModalBody className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Отчет отправлен на проверку
            </h3>
            <p className="text-gray-600">
              Ожидайте ответ по проверке отчета, мы пришлем уведомление когда
              все будет готово
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="w-full"
              onPress={() => setIsSuccessModalOpen(false)}
            >
              Понятно
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
