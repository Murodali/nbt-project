import { z } from "zod";

export const endpointFormSchema = z.object({
  category: z.string().min(1, "Категория обязательна"),
  description: z.string().min(1, "Описание обязательно"),
  method: z.string().min(1, "Метод обязателен"),
  path: z.string().min(1, "Путь обязателен"),
  service: z.string().min(1, "Сервис обязателен"),
  is_active: z.boolean().default(true),
});

export type EndpointFormData = z.infer<typeof endpointFormSchema>;
