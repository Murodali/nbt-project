import {
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Card, CardBody } from "@heroui/react";
import { useMemo } from "react";
import { mockNotifications } from "../model/mockData";
import type {
  Notification,
  NotificationGroup,
  NotificationStatus,
} from "../model/types";

const getStatusIcon = (status: NotificationStatus) => {
  switch (status) {
    case "accepted":
      return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
    case "returned":
      return <BriefcaseIcon className="w-6 h-6 text-orange-500" />;
    case "overdue":
      return <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" />;
    case "sent":
      return <ClockIcon className="w-6 h-6 text-blue-500" />;
    default:
      return <ClockIcon className="w-6 h-6 text-gray-500" />;
  }
};

const getStatusColor = (status: NotificationStatus) => {
  switch (status) {
    case "accepted":
      return "bg-white border-green-200 shadow-sm";
    case "returned":
      return "bg-white border-orange-200 shadow-sm";
    case "overdue":
      return "bg-white border-orange-200 shadow-sm";
    case "sent":
      return "bg-white border-blue-200 shadow-sm";
    default:
      return "bg-white border-gray-200 shadow-sm";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const groupNotificationsByDate = (
  notifications: Notification[]
): NotificationGroup[] => {
  const groups = notifications.reduce((acc, notification) => {
    const date = notification.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);

  return Object.entries(groups)
    .map(([date, notifications]) => ({
      date,
      notifications,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <Card className={`border ${getStatusColor(notification.status)} h-full`}>
      <CardBody className="p-4 flex flex-col h-full">
        <div className="flex flex-col items-start space-y-3">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            {getStatusIcon(notification.status)}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-600 mb-2">
              {notification.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {notification.description}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export const NotificationsSection = () => {
  const notificationGroups = useMemo(
    () => groupNotificationsByDate(mockNotifications),
    []
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Уведомления</h1>

      {notificationGroups.map((group) => (
        <div key={group.date} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {formatDate(group.date)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
