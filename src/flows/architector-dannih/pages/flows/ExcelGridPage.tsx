import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../shared/lib/constants/routes";

export const ExcelGridPage = () => {
  const navigate = useNavigate();

  // Create grid data - 13 columns (1 header + 12 data columns) and 23 rows (1 header + 22 data rows)

  // State to store cell values
  const [cellValues, setCellValues] = useState<{ [key: string]: string }>({});

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regularity, setRegularity] = useState("Каждый месяц");
  const [date, setDate] = useState("Каждое 2 число");
  const [comment, setComment] = useState("");

  // Function to handle cell value changes
  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    setCellValues((prev) => ({
      ...prev,
      [cellKey]: value,
    }));
  };

  // Function to get cell value
  const getCellValue = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    return cellValues[cellKey] || "";
  };

  // Handle modal actions
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSendFlow = () => {
    // Handle sending the flow
    console.log("Sending flow with:", { regularity, date, comment });
    setIsModalOpen(false);
    navigate(ROUTES.ARCHITECTOR_FLOWS);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 -mx-6 mt-[-20px] sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-large">
            <button
              onClick={() => navigate(ROUTES.ARCHITECTOR_FLOWS)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Потоки
            </button>
            <span className="text-gray-300">/</span>
            <button
              onClick={() => navigate(ROUTES.ARCHITECTOR_CREATE_FLOW)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Создание потока
            </button>
            <span className="text-gray-300">/</span>
            <span className="text-black font-medium">Предпросмотр</span>
          </div>
          <Button color="primary" size="lg" onPress={handleOpenModal}>
            Продолжить
          </Button>
        </div>
      </div>

      {/* Excel-like Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {/* First column with triangle icon */}
                <th className="w-12 h-12 bg-gray-50 border-r border-b border-gray-200 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-gray-400"></div>
                </th>
                {/* Text columns */}
                {Array.from({ length: 12 }, (_, i) => (
                  <th
                    key={i}
                    className="w-32 h-12 bg-gray-50 border-r border-b border-gray-200 text-left px-3 text-sm font-medium text-gray-700"
                  >
                    Text
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 22 }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {/* Row number */}
                  <td className="w-12 h-12 bg-gray-50 border-r border-b border-gray-200 text-center text-sm text-gray-500 font-medium">
                    {rowIndex + 1}
                  </td>
                  {/* Data cells */}
                  {Array.from({ length: 12 }, (_, colIndex) => (
                    <td
                      key={colIndex}
                      className="w-32 h-12 border-r border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors relative p-0"
                    >
                      <input
                        type="text"
                        value={getCellValue(rowIndex, colIndex)}
                        onChange={(e) =>
                          handleCellChange(rowIndex, colIndex, e.target.value)
                        }
                        className="w-full h-full border-0 outline-none px-2 text-sm bg-transparent focus:bg-blue-50 focus:ring-1 focus:ring-blue-300"
                        placeholder=""
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Send Flow Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        backdrop="blur"
        size="md"
        classNames={{
          base: "mx-4",
          backdrop: "bg-black/50",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-black">Отправьте поток</h2>
            <p className="text-sm text-gray-600 font-normal">
              Выберите в какой день запрашивать отчет
            </p>
          </ModalHeader>
          <ModalBody className="space-y-2 py-6">
            {/* Regularity Field */}
            <div className="space-y-2">
              <Select
                label="Регулярность"
                selectedKeys={[regularity]}
                onSelectionChange={(keys) =>
                  setRegularity(Array.from(keys)[0] as string)
                }
                classNames={{
                  trigger: "bg-gray-100 border-gray-200",
                }}
              >
                <SelectItem key="Каждый месяц">Каждый месяц</SelectItem>
                <SelectItem key="Каждую неделю">Каждую неделю</SelectItem>
                <SelectItem key="Каждый день">Каждый день</SelectItem>
                <SelectItem key="По запросу">По запросу</SelectItem>
              </Select>
            </div>

            {/* Date Field */}
            <div className="space-y-2">
              <Select
                label="Дата"
                selectedKeys={[date]}
                onSelectionChange={(keys) =>
                  setDate(Array.from(keys)[0] as string)
                }
                classNames={{
                  trigger: "bg-gray-100 border-gray-200",
                }}
              >
                <SelectItem key="Каждое 1 число">Каждое 1 число</SelectItem>
                <SelectItem key="Каждое 2 число">Каждое 2 число</SelectItem>
                <SelectItem key="Каждое 15 число">Каждое 15 число</SelectItem>
                <SelectItem key="Последний день месяца">
                  Последний день месяца
                </SelectItem>
              </Select>
            </div>

            {/* Comment Field */}
            <div className="space-y-2">
              <Textarea
                label="Комментарий"
                color="default"
                value={comment}
                onValueChange={setComment}
                placeholder="Введите комментарий..."
                classNames={{
                  input: "dsa border-gray-200",
                  inputWrapper: " border-gray-200",
                }}
                minRows={3}
              />
            </div>
          </ModalBody>
          <ModalFooter className="flex gap-3">
            <Button
              variant="flat"
              onPress={handleCloseModal}
              className="flex-1 bg-gray-100 text-black hover:bg-gray-200"
            >
              Отменить
            </Button>
            <Button color="primary" onPress={handleSendFlow} className="flex-1">
              Отправить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
