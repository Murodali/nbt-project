import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Имя пользователя обязательно"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(6, "Пароль должен содержать минимум 6 символов"),
});

export type LoginFormData = z.infer<typeof loginSchema>;