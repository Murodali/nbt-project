export type NotificationStatus = "accepted" | "returned" | "overdue" | "sent";

export interface Notification {
  id: string;
  title: string;
  description: string;
  status: NotificationStatus;
  date: string;
  reportId?: string;
}

export interface NotificationGroup {
  date: string;
  notifications: Notification[];
}
