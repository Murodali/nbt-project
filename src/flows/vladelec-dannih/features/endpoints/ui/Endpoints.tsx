import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Select,
  SelectItem,
  Spinner,
  Switch,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateEndpoint,
  useDeleteEndpoint,
  useEndpoints,
  useUpdateEndpoint,
} from "../hooks/index";
import type { Endpoint, EndpointFormData } from "../model";
import { endpointFormSchema } from "../model";

export const EndpointsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(
    null
  );
  const [serviceFilter, setServiceFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EndpointFormData>({
    resolver: zodResolver(endpointFormSchema) as any,
    defaultValues: {
      category: "",
      description: "",
      method: "",
      path: "",
      service: "",
      is_active: true,
    },
  });

  // API hooks
  const {
    data: endpointsData,
    isLoading: endpointsLoading,
    error: endpointsError,
  } = useEndpoints(serviceFilter || undefined, categoryFilter || undefined);
  const createEndpointMutation = useCreateEndpoint();
  const updateEndpointMutation = useUpdateEndpoint();
  const deleteEndpointMutation = useDeleteEndpoint();

  const endpoints = endpointsData?.endpoints || [];

  const handleAddEndpoint = () => {
    setSelectedEndpoint(null);
    setIsViewMode(false);
    reset({
      category: "",
      description: "",
      method: "",
      path: "",
      service: "",
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleEditEndpoint = (endpoint: Endpoint) => {
    setSelectedEndpoint(endpoint);
    setIsViewMode(false);
    reset({
      category: endpoint.category,
      description: endpoint.description || "",
      method: endpoint.method,
      path: endpoint.path,
      service: endpoint.service,
      is_active: endpoint.is_active,
    });
    setIsModalOpen(true);
  };

  const handleViewEndpoint = (endpoint: Endpoint) => {
    setSelectedEndpoint(endpoint);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteEndpoint = async (endpointId: string) => {
    if (confirm("Вы уверены, что хотите удалить этот endpoint?")) {
      try {
        await deleteEndpointMutation.mutateAsync(endpointId);
      } catch (error) {
        console.error("Error deleting endpoint:", error);
      }
    }
  };

  const onSubmit = async (data: EndpointFormData) => {
    try {
      if (selectedEndpoint) {
        // Update existing endpoint
        await updateEndpointMutation.mutateAsync({
          id: selectedEndpoint.id,
          data,
        });
      } else {
        // Create new endpoint
        await createEndpointMutation.mutateAsync(data);
      }
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error("Error saving endpoint:", error);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "text-green-600 bg-green-100";
      case "POST":
        return "text-blue-600 bg-blue-100";
      case "PUT":
        return "text-yellow-600 bg-yellow-100";
      case "DELETE":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Get unique services and categories for filters
  const uniqueServices = Array.from(new Set(endpoints.map((ep) => ep.service)));
  const uniqueCategories = Array.from(
    new Set(endpoints.map((ep) => ep.category))
  );

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-sm">
        <CardBody className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">
              Доступы к API
            </h2>
            <Button
              color="primary"
              startContent={<PlusIcon className="w-4 h-4" />}
              onPress={handleAddEndpoint}
            >
              Добавить доступ
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Select
              label="Сервис"
              placeholder="Все сервисы"
              selectedKeys={serviceFilter ? [serviceFilter] : ["all-services"]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setServiceFilter(selected === "all-services" ? "" : selected);
              }}
              className="max-w-xs"
            >
              {[
                <SelectItem key="all-services">Все сервисы</SelectItem>,
                ...uniqueServices.map((service) => (
                  <SelectItem key={service}>{service}</SelectItem>
                )),
              ]}
            </Select>

            <Select
              label="Категория"
              placeholder="Все категории"
              selectedKeys={
                categoryFilter ? [categoryFilter] : ["all-categories"]
              }
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setCategoryFilter(
                  selected === "all-categories" ? "" : selected
                );
              }}
              className="max-w-xs"
            >
              {[
                <SelectItem key="all-categories">Все категории</SelectItem>,
                ...uniqueCategories.map((category) => (
                  <SelectItem key={category}>{category}</SelectItem>
                )),
              ]}
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Метод
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Путь
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Название
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Сервис
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Категория
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {endpointsLoading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center">
                      <Spinner size="sm" />
                    </td>
                  </tr>
                ) : endpointsError ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-red-500">
                      Ошибка загрузки endpoints
                    </td>
                  </tr>
                ) : endpoints.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      Endpoints не найдены
                    </td>
                  </tr>
                ) : (
                  endpoints.map((endpoint: Endpoint) => (
                    <tr key={endpoint.id} className="border-b border-border">
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(
                            endpoint.method
                          )}`}
                        >
                          {endpoint.method}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-sm">
                        {endpoint.path}
                      </td>
                      <td className="py-3 px-4">{endpoint.name}</td>
                      <td className="py-3 px-4">{endpoint.service}</td>
                      <td className="py-3 px-4">{endpoint.category}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end space-x-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => handleViewEndpoint(endpoint)}
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => handleEditEndpoint(endpoint)}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => handleDeleteEndpoint(endpoint.id)}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Add/Edit/View Endpoint Drawer */}
      <Drawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        placement="right"
        size="lg"
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              {isViewMode
                ? "Детали доступа"
                : selectedEndpoint
                ? "Редактировать доступ"
                : "Добавить доступ"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isViewMode
                ? "Информация о выбранном доступе"
                : selectedEndpoint
                ? "Редактируйте информацию о доступе"
                : "Заполните информацию для нового доступа"}
            </p>
          </DrawerHeader>
          <DrawerBody>
            {isViewMode && selectedEndpoint ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Метод
                    </label>
                    <div className="mt-1">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(
                          selectedEndpoint.method
                        )}`}
                      >
                        {selectedEndpoint.method}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Сервис
                    </label>
                    <p className="mt-1 text-sm">{selectedEndpoint.service}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Путь
                  </label>
                  <p className="mt-1 font-mono text-sm bg-gray-100 p-2 rounded">
                    {selectedEndpoint.path}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Название
                  </label>
                  <p className="mt-1 text-sm">{selectedEndpoint.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Категория
                  </label>
                  <p className="mt-1 text-sm">{selectedEndpoint.category}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Статус
                  </label>
                  <p className="mt-1 text-sm">
                    {selectedEndpoint.is_active ? "Активен" : "Неактивен"}
                  </p>
                </div>

                {selectedEndpoint.description && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Описание
                    </label>
                    <p className="mt-1 text-sm">
                      {selectedEndpoint.description}
                    </p>
                  </div>
                )}

                {selectedEndpoint.parameters &&
                  selectedEndpoint.parameters.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Параметры
                      </label>
                      <div className="mt-2 space-y-2">
                        {selectedEndpoint.parameters.map((param, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-sm">
                                {param.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {param.type}{" "}
                                {param.required && "(обязательный)"}
                              </span>
                            </div>
                            {param.description && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {param.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit as any)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    {...register("service")}
                    label="Сервис"
                    placeholder="Введите название сервиса"
                    isInvalid={!!errors.service}
                    errorMessage={errors.service?.message}
                  />
                  <Input
                    {...register("category")}
                    label="Категория"
                    placeholder="Введите категорию"
                    isInvalid={!!errors.category}
                    errorMessage={errors.category?.message}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    {...register("method")}
                    label="HTTP Метод"
                    placeholder="Выберите метод"
                    selectedKeys={watch("method") ? [watch("method")] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setValue("method", selected);
                    }}
                    isInvalid={!!errors.method}
                    errorMessage={errors.method?.message}
                  >
                    <SelectItem key="GET">GET</SelectItem>
                    <SelectItem key="POST">POST</SelectItem>
                    <SelectItem key="PUT">PUT</SelectItem>
                    <SelectItem key="DELETE">DELETE</SelectItem>
                    <SelectItem key="PATCH">PATCH</SelectItem>
                  </Select>
                  <div className="flex items-center">
                    <Switch
                      {...register("is_active")}
                      isSelected={watch("is_active")}
                      onValueChange={(value) => setValue("is_active", value)}
                    >
                      Активен
                    </Switch>
                  </div>
                </div>

                <Input
                  {...register("path")}
                  label="Путь"
                  placeholder="/api/v1/example"
                  isInvalid={!!errors.path}
                  errorMessage={errors.path?.message}
                />

                <Input
                  {...register("description")}
                  label="Описание"
                  placeholder="Введите описание endpoint"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              </form>
            )}
          </DrawerBody>
          <DrawerFooter>
            <div className="flex gap-2 justify-end">
              <Button variant="light" onPress={() => setIsModalOpen(false)}>
                {isViewMode ? "Закрыть" : "Отменить"}
              </Button>
              {!isViewMode && (
                <Button
                  type="submit"
                  color="primary"
                  onPress={() => handleSubmit(onSubmit as any)()}
                  isLoading={
                    createEndpointMutation.isPending ||
                    updateEndpointMutation.isPending
                  }
                >
                  {selectedEndpoint ? "Сохранить" : "Добавить"}
                </Button>
              )}
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
