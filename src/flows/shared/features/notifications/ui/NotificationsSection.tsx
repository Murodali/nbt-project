import {
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
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
      return <CheckCircleIcon className="w-8 w-8  text-green-500" />;
    case "returned":
      return <BriefcaseIcon className="w-8 h-8  text-orange-500" />;
    case "overdue":
      return <ExclamationTriangleIcon className="w-8 h-8  text-orange-500" />;
    case "sent":
      return <ClockIcon className="w-8 h-8  text-blue-500" />;
    default:
      return <ClockIcon className="w-8 h-8  text-gray-500" />;
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
    <Card className="h-full p-4 rounded-[40px]">
      <CardBody className="p-4 flex flex-col h-full">
        <div className="flex flex-col items-start space-y-3">
          {getStatusIcon(notification.status)}

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
              {notification.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Уведомления
      </h1>

      {notificationGroups.map((group) => (
        <div key={group.date} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
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
