import type { Notification } from "./types";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Отчет EKSDU2984-JFHA принят",
    description: "Ожидайте отчет по проверке отчета, мы пришлем уведомление когда все будет готово",
    status: "accepted",
    date: "2025-12-22",
    reportId: "EKSDU2984-JFHA",
  },
  {
    id: "2", 
    title: "Отчет EKSDU2984-JFHA возвращен на доработку",
    description: "Ошибка загрузки — строка 27, невалидный ИНН",
    status: "returned",
    date: "2025-12-22",
    reportId: "EKSDU2984-JFHA",
  },
  {
    id: "3",
    title: "Отчет EKSDU2984-JFHA просрочен на 4 дня",
    description: "Отчет просрочен на 4 дня. Пожалуйста, сдайте его в ближайшее время",
    status: "overdue",
    date: "2025-12-22",
    reportId: "EKSDU2984-JFHA",
  },
  {
    id: "4",
    title: "Отчет EKSDU2984-JFHA отправлен на проверку",
    description: "Ожидайте отчет по проверке отчета, мы пришлем уведомление когда все будет готово",
    status: "sent",
    date: "2025-12-22",
    reportId: "EKSDU2984-JFHA",
  },
  {
    id: "5",
    title: "Отчет EKSDU2984-JFHA принят",
    description: "Ожидайте отчет по проверке отчета, мы пришлем уведомление когда все будет готово",
    status: "accepted",
    date: "2025-12-21",
    reportId: "EKSDU2984-JFHA",
  },
  {
    id: "6",
    title: "Отчет EKSDU2984-JFHA отправлен на проверку",
    description: "Ожидайте отчет по проверке отчета, мы пришлем уведомление когда все будет готово",
    status: "sent",
    date: "2025-12-21",
    reportId: "EKSDU2984-JFHA",
  },
];
