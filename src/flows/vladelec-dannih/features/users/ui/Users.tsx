import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
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
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAssignRoles,
  useCreateUser,
  useDeleteUser,
  useRoles,
  useUpdateUser,
  useUsers,
} from "../hooks/index";
import type { Role, User, UserFormData } from "../model";
import { userFormSchema } from "../model";

export const AccessSettingsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      roles: [],
    },
  });

  // API hooks
  const {
    data: rolesData,
    isLoading: rolesLoading,
    error: rolesError,
  } = useRoles();
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const assignRolesMutation = useAssignRoles();

  const roles = rolesData?.roles || [];
  const users = usersData?.users || [];

  const handleAddUser = () => {
    setSelectedUser(null);
    reset({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      roles: [],
    });
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    reset({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      password: "", // Don't pre-fill password for security
      roles: user.roles || [],
    });
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      try {
        await deleteUserMutation.mutateAsync(userId);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      if (selectedUser) {
        // Update existing user
        await updateUserMutation.mutateAsync({
          userId: selectedUser.user_id,
          data,
        });

        // Update user roles
        if (data.roles.length > 0) {
          console.log("Assigning roles to user:", {
            userId: selectedUser.user_id,
            roles: data.roles,
            requestData: { role_names: data.roles },
          });
          await assignRolesMutation.mutateAsync({
            userId: selectedUser.user_id,
            data: { role_names: data.roles },
          });
        }
      } else {
        // Create new user
        const { roles, password, ...userData } = data;
        const newUser = await createUserMutation.mutateAsync({
          ...userData,
          password: password || "",
        });

        // Assign roles to user after creation
        if (roles.length > 0 && newUser?.user_id) {
          console.log("Assigning roles to new user:", {
            userId: newUser.user_id,
            roles: roles,
            requestData: { role_names: roles },
          });
          await assignRolesMutation.mutateAsync({
            userId: newUser.user_id,
            data: { role_names: roles },
          });
        }
      }
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-sm">
        <CardBody className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">
              Пользователи
            </h2>
            <Button
              color="primary"
              startContent={<PlusIcon className="w-4 h-4" />}
              onPress={handleAddUser}
            >
              Добавить пользователя
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    ФИО
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Роль
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Имя пользователя
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Статус
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersLoading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center">
                      <Spinner size="sm" />
                    </td>
                  </tr>
                ) : usersError ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-red-500">
                      Ошибка загрузки пользователей
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-muted-foreground"
                    >
                      Пользователи не найдены
                    </td>
                  </tr>
                ) : (
                  users.map((user: User) => (
                    <tr key={user.user_id} className="border-b border-border">
                      <td className="py-3 px-4">{`${user.first_name} ${user.last_name}`}</td>
                      <td className="py-3 px-4">
                        {user.roles && user.roles.length > 0
                          ? user.roles.map((role: string) => role).join(", ")
                          : "Нет роли"}
                      </td>
                      <td className="py-3 px-4">{user.username}</td>
                      <td className="py-3 px-4">
                        {user.enabled ? "Активен" : "Неактивен"}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end space-x-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => handleEditUser(user)}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => handleDeleteUser(user.user_id)}
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

      {/* Add/Edit User Drawer */}
      <Drawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        placement="right"
        size="lg"
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              {selectedUser
                ? "Редактировать пользователя"
                : "Добавить пользователя"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedUser
                ? "Редактируйте информацию о пользователе"
                : "Заполните информацию для нового пользователя"}
            </p>
          </DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  {...register("first_name")}
                  label="Имя"
                  placeholder="Введите имя"
                  isInvalid={!!errors.first_name}
                  errorMessage={errors.first_name?.message}
                />
                <Input
                  {...register("last_name")}
                  label="Фамилия"
                  placeholder="Введите фамилию"
                  isInvalid={!!errors.last_name}
                  errorMessage={errors.last_name?.message}
                />
              </div>

              <Input
                {...register("username")}
                label="Имя пользователя"
                placeholder="Введите имя пользователя"
                isInvalid={!!errors.username}
                errorMessage={errors.username?.message}
              />

              <Input
                {...register("email")}
                label="Email"
                placeholder="Введите email"
                type="email"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />

              <Input
                {...register("password")}
                label="Пароль"
                placeholder="Введите пароль"
                type="password"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />

              <Select
                label="Роли"
                placeholder="Выберите роли"
                selectionMode="multiple"
                selectedKeys={watch("roles")}
                onSelectionChange={(keys) => {
                  const selectedRoles = Array.from(keys) as string[];
                  setValue("roles", selectedRoles);
                }}
                isInvalid={!!errors.roles}
                errorMessage={errors.roles?.message}
              >
                {rolesLoading ? (
                  <SelectItem key="loading" isDisabled>
                    Загрузка ролей...
                  </SelectItem>
                ) : rolesError ? (
                  <SelectItem key="error" isDisabled>
                    Ошибка загрузки ролей
                  </SelectItem>
                ) : (
                  roles.map((role: Role) => (
                    <SelectItem key={role.name}>{role.name}</SelectItem>
                  ))
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
                  createUserMutation.isPending ||
                  updateUserMutation.isPending ||
                  assignRolesMutation.isPending
                }
              >
                {selectedUser ? "Сохранить" : "Добавить"}
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
