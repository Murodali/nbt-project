import { z } from "zod";

export const userFormSchema = z.object({
  first_name: z.string().min(1, "Имя обязательно"),
  last_name: z.string().min(1, "Фамилия обязательна"),
  username: z.string().min(3, "Имя пользователя должно содержать минимум 3 символа"),
  email: z.string().email("Некорректный email адрес"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов").optional(),
  roles: z.array(z.string()).min(1, "Выберите хотя бы одну роль"),
});

export type UserFormData = z.infer<typeof userFormSchema>;
