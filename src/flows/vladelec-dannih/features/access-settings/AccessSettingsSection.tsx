import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
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
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";

const mockUsers = [
  {
    id: "1",
    name: "Халилов Мухаммадризо",
    role: "Поставщик данных",
    createdDate: "22.09.2025",
    modifiedDate: "22.09.2025",
  },
  {
    id: "2",
    name: "Халилов Мухаммадризо",
    role: "Поставщик данных",
    createdDate: "22.09.2025",
    modifiedDate: "22.09.2025",
  },
  {
    id: "3",
    name: "Халилов Мухаммадризо",
    role: "Поставщик данных",
    createdDate: "22.09.2025",
    modifiedDate: "22.09.2025",
  },
];

const roles = [
  { key: "provider", label: "Поставщик данных" },
  { key: "owner", label: "Владелец данных" },
  { key: "admin", label: "Администратор" },
];

export const AccessSettingsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    console.log("Delete user:", userId);
    // Implement delete logic
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-sm">
        <CardBody className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">
              Настройка доступов
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
                    Дата создания
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Дата изменения
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4">{user.createdDate}</td>
                    <td className="py-3 px-4">{user.modifiedDate}</td>
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
                          onPress={() => handleDeleteUser(user.id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        placement="center"
      >
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold">
              {selectedUser
                ? "Редактировать пользователя"
                : "Добавить пользователя"}
            </h3>
          </ModalHeader>
          <ModalBody>
            <p className="text-sm text-muted-foreground mb-4">
              Введите проверочный код, который мы отправили на указанную
              электронную почту
            </p>

            <div className="space-y-4">
              <Input
                label="ФИО"
                placeholder="Введите полное имя"
                defaultValue={selectedUser?.name || ""}
              />

              <Select
                label="Роль"
                placeholder="Выберите роль"
                defaultSelectedKeys={selectedUser ? ["provider"] : []}
              >
                {roles.map((role) => (
                  <SelectItem key={role.key} value={role.key}>
                    {role.label}
                  </SelectItem>
                ))}
              </Select>

              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-bold text-xl">A</span>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setIsModalOpen(false)}>
              Отменить
            </Button>
            <Button color="primary" onPress={() => setIsModalOpen(false)}>
              {selectedUser ? "Сохранить" : "Добавить"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
