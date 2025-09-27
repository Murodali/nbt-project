import type { Report } from "./types";

export const mockReports: Report[] = [
  {
    id: "1",
    title: "Отчет EKSDU2984-JFHA",
    code: "EKSDU2984-JFHA",
    type: "financial",
    status: "pending",
    deadline: "18:00",
    tags: ["Финансы", "Ежеквартальный"],
  },
  {
    id: "2", 
    title: "Отчет EKSDU2984-JFHA",
    code: "EKSDU2984-JFHA",
    type: "quarterly",
    status: "pending", 
    deadline: "18:00",
    tags: ["Финансы", "Ежеквартальный"],
  },
  {
    id: "3",
    title: "Отчет EKSDU2984-JFHA", 
    code: "EKSDU2984-JFHA",
    type: "financial",
    status: "pending",
    deadline: "18:00", 
    tags: ["Финансы", "Ежеквартальный"],
  },
];
