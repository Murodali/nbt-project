import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../shared/lib/constants/routes";

const mockFlows = [
  {
    id: "1",
    name: "EKSDU2984-JFHA",
    status: "Активен",
    statusColor: "text-green-600",
    fields: 42,
    deadline: "До 12.09.2025",
  },
];

export const FlowsSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    status: "",
    type: "",
    department: "",
    period: "",
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Потоки</h1>
        <Button
          color="primary"
          size="lg"
          onPress={() => navigate(ROUTES.ARCHITECTOR_CREATE_FLOW)}
        >
          Создать
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white">
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск"
                value={searchTerm}
                onValueChange={setSearchTerm}
                startContent={
                  <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
                }
                className="max-w-md"
              />
            </div>

            <div className="flex gap-2">
              <Select
                placeholder="Фильтр"
                className="w-32"
                selectedKeys={
                  selectedFilters.status ? [selectedFilters.status] : []
                }
                onSelectionChange={(keys) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    status: Array.from(keys)[0] as string,
                  }))
                }
              >
                <SelectItem key="active">Активные</SelectItem>
                <SelectItem key="inactive">Неактивные</SelectItem>
              </Select>

              <Select placeholder="Фильтр" className="w-32">
                <SelectItem key="type1">Тип 1</SelectItem>
                <SelectItem key="type2">Тип 2</SelectItem>
              </Select>

              <Select placeholder="Фильтр" className="w-32">
                <SelectItem key="dept1">Отдел 1</SelectItem>
                <SelectItem key="dept2">Отдел 2</SelectItem>
              </Select>

              <Select placeholder="Фильтр" className="w-32">
                <SelectItem key="period1">Период 1</SelectItem>
                <SelectItem key="period2">Период 2</SelectItem>
              </Select>

              <Button isIconOnly variant="bordered" size="lg">
                <FunnelIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Flows Table */}
      <Card className="bg-white">
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Поток
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Полей
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Регулярн
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Срок отправки
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockFlows.map((flow) => (
                  <tr key={flow.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {flow.name}
                        </div>
                        <div className={`text-sm ${flow.statusColor}`}>
                          {flow.status}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{flow.fields}</td>
                    <td className="px-6 py-4 text-gray-900">До 12.09.</td>
                    <td className="px-6 py-4 text-gray-900">{flow.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
