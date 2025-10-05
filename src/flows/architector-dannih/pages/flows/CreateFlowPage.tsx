import {
  closestCenter,
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Button,
  Chip,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../shared/lib/constants/routes";

const mockAvailableFields = [
  { id: "1", label: "Text", category: "Финансовые показатели" },
  { id: "2", label: "Text", category: "Финансовые показатели" },
  { id: "3", label: "Text", category: "Финансовые показатели" },
  { id: "4", label: "Text", category: "Финансовые показатели" },
  { id: "5", label: "Text", category: "Финансовые показатели" },
  { id: "6", label: "Text", category: "Финансовые показатели" },
  { id: "7", label: "Text", category: "Финансовые показатели" },
  { id: "8", label: "Text", category: "Финансовые показатели" },
  { id: "9", label: "Text", category: "Портфель" },
  { id: "10", label: "Text", category: "Портфель" },
  { id: "11", label: "Text", category: "Портфель" },
  { id: "12", label: "Text", category: "Портфель" },
  { id: "13", label: "Text", category: "Портфель" },
];

const mockFlowFields = [
  { id: "1", label: "", validations: [] },
  { id: "2", label: "", validations: ["Только числовые значения"] },
  { id: "3", label: "", validations: ["50 символов"], hasDropdown: true },
  { id: "4", label: "", validations: [] },
  { id: "5", label: "", validations: [] },
];

// Sortable Field Component for Available Fields (Sidebar)
const SortableAvailableField = ({ field }: { field: any }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors select-none ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-gray-400">⋮⋮</div>
        <div className="text-sm font-medium text-gray-900">{field.label}</div>
      </div>
      <div className="text-xs text-gray-500">id {field.id}</div>
    </div>
  );
};

// Droppable Area Component (unused)
// const DroppableArea = ({
//   children,
//   id,
// }: {
//   children: React.ReactNode;
//   id: string;
// }) => {
//   const { isOver, setNodeRef } = useDroppable({
//     id,
//   });
//
//   console.log("DroppableArea render:", { id, isOver });
//
//   return (
//     <div
//       ref={setNodeRef}
//       className={`space-y-4 min-h-32 border-2 border-dashed rounded-lg p-4 transition-colors ${
//         isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
//       }`}
//     >
//       {children}
//     </div>
//   );
// };

export const CreateFlowPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [flowName] = useState("Поток EKSDU2984-JFHA");
  const [flowValidations, setFlowValidations] = useState(["5 мб"]);
  const [flowFields, setFlowFields] = useState(mockFlowFields);
  const [availableFields, setAvailableFields] = useState(mockAvailableFields);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleRemoveValidation = (index: number) => {
    setFlowValidations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveFieldValidation = (
    fieldId: string,
    validationIndex: number
  ) => {
    setFlowFields((prev) =>
      prev.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              validations: field.validations.filter(
                (_, i) => i !== validationIndex
              ),
            }
          : field
      )
    );
  };

  const handleAddValidation = (fieldId: string) => {
    // This would open a modal or dropdown for adding validation
    console.log("Add validation for field:", fieldId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    console.log("Drag started:", event.active.id);
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("Drag ended:", { active: active.id, over: over?.id });
    setActiveId(null);

    if (!over) return;

    // Handle reordering within available fields (sidebar)
    if (
      active.id !== over.id &&
      availableFields.some((field) => field.id === active.id)
    ) {
      const oldIndex = availableFields.findIndex(
        (field) => field.id === active.id
      );
      const newIndex = availableFields.findIndex(
        (field) => field.id === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        setAvailableFields((prev) => arrayMove(prev, oldIndex, newIndex));
        return;
      }
    }

    // Handle adding new field from available fields to flow fields
    if (over.id === "flow-fields") {
      const fieldToAdd = availableFields.find(
        (field) => field.id === active.id
      );
      console.log("Field to add:", fieldToAdd);
      if (fieldToAdd) {
        const newField = {
          id: `${Date.now()}`,
          label: fieldToAdd.label,
          validations: [],
        };
        console.log("Adding new field:", newField);
        setFlowFields((prev) => [...prev, newField]);
      }
    }
  };

  const filteredFields = availableFields.filter((field) =>
    field.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const financialFields = filteredFields.filter(
    (field) => field.category === "Финансовые показатели"
  );
  const portfolioFields = filteredFields.filter(
    (field) => field.category === "Портфель"
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
              <span className="text-black font-medium">Создание потока</span>
            </div>
            <Button
              color="primary"
              size="lg"
              onPress={() => navigate(ROUTES.ARCHITECTOR_EXCEL_GRID)}
            >
              Продолжить
            </Button>
          </div>
        </div>

        <div className="flex !mt-0 gap-6">
          <div className="flex-1 p-6">
            <div className="space-y-6 bg-white rounded-[40px] p-12">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Название потока
                </h2>
                <div className="text-xl m-0 p-0 font-bold text-gray-900">
                  {flowName}
                </div>
              </div>
              <Divider />

              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Валидация потока
              </h2>
              <div className="flex items-center gap-3">
                {flowValidations.map((validation, index) => (
                  <Chip
                    key={index}
                    onClose={() => handleRemoveValidation(index)}
                    variant="flat"
                    color="primary"
                    size="lg"
                    radius="lg"
                    classNames={{
                      base: "bg-gray-100 text-gray-700 border-gray-200 py-1 !h-auto",
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="text-[13px] text-gray-600">
                        Максимальный размер файла
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        {validation}
                      </span>
                    </div>
                  </Chip>
                ))}
                <Button
                  color="primary"
                  variant="flat"
                  size="lg"
                  onPress={() => console.log("Add flow validation")}
                >
                  Добавить валидацию
                </Button>
              </div>

              <h2 className="text-lg font-semibold text-gray-900 mb-4">Поля</h2>

              <div className="space-y-4">
                {flowFields.map((field) => (
                  <div key={field.id} className="space-y-3">
                    {/* Field Input Row */}
                    <div className="flex items-center gap-3">
                      <Input
                        value={field.label}
                        size="lg"
                        placeholder="Text"
                        className="flex-1"
                        classNames={{
                          input: "bg-gray-100",
                          inputWrapper: "bg-gray-100 border-gray-200",
                        }}
                      />
                      {field.validations.length === 0 ? (
                        <Button
                          color="primary"
                          variant="flat"
                          size="lg"
                          onPress={() => handleAddValidation(field.id)}
                        >
                          Добавить валидацию
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="flex gap-2">
                            {field.validations.map((validation, index) => (
                              <Chip
                                key={index}
                                onClose={() =>
                                  handleRemoveFieldValidation(field.id, index)
                                }
                                variant="flat"
                                color="primary"
                                size="lg"
                                classNames={{
                                  base: "bg-gray-100 text-gray-700 border-gray-200 py-1 min-h-[48px] !h-auto",
                                }}
                              >
                                {validation}
                              </Chip>
                            ))}
                          </div>

                          {field.hasDropdown && (
                            <div className="ml-0">
                              <Select
                                placeholder="Длина строки"
                                className="w-48"
                                selectedKeys={["not_more_than"]}
                                classNames={{
                                  trigger: "bg-gray-100 border-gray-200",
                                }}
                              >
                                <SelectItem key="not_more_than">
                                  Не более
                                </SelectItem>
                                <SelectItem key="exactly">Точно</SelectItem>
                                <SelectItem key="at_least">Не менее</SelectItem>
                              </Select>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Dropdown for string length validation */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-80">
            <div className="bg-white rounded-lg p-6 sticky top-20 z-40">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Доступные поля
              </h3>

              {/* Search */}
              <Input
                placeholder="Найти нужные поля"
                value={searchTerm}
                onValueChange={setSearchTerm}
                className="mb-6"
              />

              {/* Financial Indicators */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Финансовые показатели
                </h4>
                <SortableContext
                  items={financialFields.map((field) => field.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {financialFields.map((field) => (
                      <SortableAvailableField key={field.id} field={field} />
                    ))}
                  </div>
                </SortableContext>
              </div>

              {/* Portfolio */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Портфель
                </h4>
                <SortableContext
                  items={portfolioFields.map((field) => field.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {portfolioFields.map((field) => (
                      <SortableAvailableField key={field.id} field={field} />
                    ))}
                  </div>
                </SortableContext>
              </div>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-move opacity-90">
              <div className="flex items-center space-x-3">
                <div className="text-gray-400">⋮⋮</div>
                <div className="text-sm font-medium text-gray-900">
                  {availableFields.find((f) => f.id === activeId)?.label ||
                    "Text"}
                </div>
              </div>
              <div className="text-xs text-gray-500">id {activeId}</div>
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};
