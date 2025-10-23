import { z } from "zod";

export const roleFormSchema = z.object({
  name: z.string().min(1, "Название роли обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  endpoint_ids: z.array(z.string()).min(1, "Выберите хотя бы один доступ"),
});

export type RoleFormData = z.infer<typeof roleFormSchema>;
