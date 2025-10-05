import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, "Номер телефона обязателен")
    .regex(/^\+992\s?\d{9}$/, "Неверный формат номера телефона"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(6, "Пароль должен содержать минимум 6 символов"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
