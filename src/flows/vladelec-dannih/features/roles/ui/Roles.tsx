import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
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
  Tooltip,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEndpoints } from "../../endpoints/hooks/index";
import {
  useAddRoleAttributes,
  useCreateRole,
  useRemoveRoleAttributes,
  useRoles,
} from "../hooks/index";
import type { Role, RoleFormData } from "../model";
import { roleFormSchema } from "../model";

export const RolesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedAttributesToRemove, setSelectedAttributesToRemove] = useState<
    string[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: "",
      description: "",
      endpoint_ids: [],
    },
  });

  // API hooks
  const {
    data: rolesData,
    isLoading: rolesLoading,
    error: rolesError,
  } = useRoles();
  const { data: endpointsData, isLoading: endpointsLoading } = useEndpoints();
  const createRoleMutation = useCreateRole();
  const addRoleAttributesMutation = useAddRoleAttributes();
  const removeRoleAttributesMutation = useRemoveRoleAttributes();

  const roles = rolesData?.roles || [];
  const endpoints = endpointsData?.endpoints || [];

  const handleAddRole = () => {
    setSelectedRole(null);
    setIsEditMode(false);
    reset({
      name: "",
      description: "",
      endpoint_ids: [],
    });
    setIsModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditMode(true);

    // Extract endpoint keys from role attributes and store them as keys for form
    const currentEndpointKeys = role.attributes?.map((attr) => attr.key) || [];

    reset({
      name: role.name,
      description: role.description,
      endpoint_ids: currentEndpointKeys,
    });
    setIsModalOpen(true);
  };

  const handleDeleteRole = async (roleName: string) => {
    if (confirm("Вы уверены, что хотите удалить эту роль?")) {
      try {
        // TODO: Implement delete role API call
        console.log("Delete role:", roleName);
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    }
  };

  const handleRemoveAttributes = (role: Role) => {
    setSelectedRole(role);
    setSelectedAttributesToRemove([]);
    setIsRemoveModalOpen(true);
  };

  const handleConfirmRemoveAttributes = async () => {
    if (!selectedRole || selectedAttributesToRemove.length === 0) return;

    try {
      // Convert endpoint keys to endpoint IDs for API
      const endpointIds = selectedAttributesToRemove
        .map((key) => {
          const endpoint = endpoints.find(
            (ep) => `${ep.method}:${ep.path}` === key
          );
          return endpoint?.id || key;
        })
        .filter((id) => endpoints.some((ep) => ep.id === id));

      await removeRoleAttributesMutation.mutateAsync({
        roleName: selectedRole.name,
        data: { endpoint_ids: endpointIds },
      });

      setIsRemoveModalOpen(false);
      setSelectedAttributesToRemove([]);
    } catch (error) {
      console.error("Error removing attributes:", error);
    }
  };

  const onSubmit = async (data: RoleFormData) => {
    try {
      if (selectedRole && isEditMode) {
        // Add attributes to existing role - convert endpoint keys back to IDs for API
        const endpointIds = data.endpoint_ids
          .map((key) => {
            const endpoint = endpoints.find(
              (ep) => `${ep.method}:${ep.path}` === key
            );
            return endpoint?.id || key;
          })
          .filter((id) => endpoints.some((ep) => ep.id === id));

        await addRoleAttributesMutation.mutateAsync({
          roleName: selectedRole.name,
          data: { endpoint_ids: endpointIds },
        });
      } else {
        // Create new role - convert endpoint keys back to IDs for API
        const endpointIds = data.endpoint_ids
          .map((key) => {
            const endpoint = endpoints.find(
              (ep) => `${ep.method}:${ep.path}` === key
            );
            return endpoint?.id || key;
          })
          .filter((id) => endpoints.some((ep) => ep.id === id));

        await createRoleMutation.mutateAsync({
          ...data,
          endpoint_ids: endpointIds,
        });
      }
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error("Error saving role:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-sm">
        <CardBody className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">Роли</h2>
            <Button
              color="primary"
              startContent={<PlusIcon className="w-4 h-4" />}
              onPress={handleAddRole}
            >
              Добавить роль
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Название роли
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Описание
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Атрибуты
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {rolesLoading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center">
                      <Spinner size="sm" />
                    </td>
                  </tr>
                ) : rolesError ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-red-500">
                      Ошибка загрузки ролей
                    </td>
                  </tr>
                ) : roles.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-muted-foreground"
                    >
                      Роли не найдены
                    </td>
                  </tr>
                ) : (
                  roles.map((role: Role) => (
                    <tr key={role.name} className="border-b border-border">
                      <td className="py-3 px-4 font-medium">{role.name}</td>
                      <td className="py-3 px-4">{role.description}</td>
                      <td className="py-3 px-4">
                        {role.attributes && role.attributes.length > 0
                          ? `${role.attributes.length} атрибутов`
                          : "Нет атрибутов"}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end space-x-2">
                          <Tooltip content="Добавить доступы" placement="top">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => handleEditRole(role)}
                            >
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                          </Tooltip>
                          {role.attributes && role.attributes.length > 0 && (
                            <Tooltip content="Удалить доступы" placement="top">
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                color="warning"
                                onPress={() => handleRemoveAttributes(role)}
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </Button>
                            </Tooltip>
                          )}
                          <Tooltip content="Удалить роль" placement="top">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              color="danger"
                              onPress={() => handleDeleteRole(role.name)}
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </Tooltip>
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

      {/* Add/Edit Role Drawer */}
      <Drawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        placement="right"
        size="lg"
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              {isEditMode ? "Добавить доступы к роли" : "Добавить роль"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isEditMode
                ? "Выберите доступы для добавления к роли"
                : "Заполните информацию для новой роли"}
            </p>
          </DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                {...register("name")}
                label="Название роли"
                placeholder="Введите название роли"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                isDisabled={isEditMode}
                readOnly={isEditMode}
              />

              <Input
                {...register("description")}
                label="Описание"
                placeholder="Введите описание роли"
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message}
              />

              <Select
                label="Доступы (Endpoints)"
                placeholder="Выберите доступы"
                selectionMode="multiple"
                selectedKeys={(() => {
                  // Convert stored endpoint keys back to endpoint IDs for the select
                  const storedKeys = watch("endpoint_ids") || [];
                  return storedKeys
                    .map((key) => {
                      const endpoint = endpoints.find(
                        (ep) => `${ep.method}:${ep.path}` === key
                      );
                      return endpoint?.id || key;
                    })
                    .filter((id) => endpoints.some((ep) => ep.id === id));
                })()}
                onSelectionChange={(keys) => {
                  const selectedEndpoints = Array.from(keys) as string[];
                  // Convert endpoint IDs to endpoint keys
                  const endpointKeys = selectedEndpoints.map((endpointId) => {
                    const endpoint = endpoints.find(
                      (ep) => ep.id === endpointId
                    );
                    return endpoint
                      ? `${endpoint.method}:${endpoint.path}`
                      : endpointId;
                  });
                  setValue("endpoint_ids", endpointKeys);
                }}
                isInvalid={!!errors.endpoint_ids}
                errorMessage={errors.endpoint_ids?.message}
              >
                {endpointsLoading ? (
                  <SelectItem key="loading" isDisabled>
                    Загрузка доступов...
                  </SelectItem>
                ) : (
                  endpoints.map((endpoint) => {
                    const endpointKey = `${endpoint.method}:${endpoint.path}`;
                    return (
                      <SelectItem
                        key={endpoint.id}
                        textValue={`${endpointKey} - ${endpoint.name}`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium font-mono">
                            {endpointKey}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {endpoint.name}
                          </span>
                        </div>
                      </SelectItem>
                    );
                  })
                )}
              </Select>
            </form>
          </DrawerBody>
          <DrawerFooter>
            <div className="flex gap-2 justify-end">
              <Button variant="light" onPress={() => setIsModalOpen(false)}>
                Отменить
              </Button>
              <Button
                type="submit"
                color="primary"
                onPress={() => handleSubmit(onSubmit)()}
                isLoading={
                  createRoleMutation.isPending ||
                  addRoleAttributesMutation.isPending
                }
              >
                {isEditMode ? "Добавить доступы" : "Добавить роль"}
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Remove Attributes Drawer */}
      <Drawer
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        placement="right"
        size="lg"
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">Удалить доступы из роли</h3>
            <p className="text-sm text-muted-foreground">
              Выберите доступы для удаления из роли "{selectedRole?.name}"
            </p>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4">
              <Select
                label="Доступы для удаления"
                placeholder="Выберите доступы для удаления"
                selectionMode="multiple"
                selectedKeys={selectedAttributesToRemove}
                onSelectionChange={(keys) => {
                  const selectedKeys = Array.from(keys) as string[];
                  setSelectedAttributesToRemove(selectedKeys);
                }}
              >
                {selectedRole?.attributes?.map((attr) => (
                  <SelectItem key={attr.key} textValue={attr.key}>
                    <div className="flex flex-col">
                      <span className="font-medium font-mono">{attr.key}</span>
                      <span className="text-sm text-muted-foreground">
                        Значение: {attr.value}
                      </span>
                    </div>
                  </SelectItem>
                )) || []}
              </Select>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <div className="flex gap-2 justify-end">
              <Button
                variant="light"
                onPress={() => setIsRemoveModalOpen(false)}
              >
                Отменить
              </Button>
              <Button
                color="danger"
                onPress={handleConfirmRemoveAttributes}
                isLoading={removeRoleAttributesMutation.isPending}
                isDisabled={selectedAttributesToRemove.length === 0}
              >
                Удалить доступы
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
