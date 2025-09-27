import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, Tooltip } from "@heroui/react";
import { useState } from "react";
import { mockCalendarEvents } from "../model/mockData";
import type { CalendarDay, CalendarEvent } from "../model/types";

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const generateCalendarDays = (
  year: number,
  month: number,
  events: CalendarEvent[]
): CalendarDay[] => {
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(
    startDate.getDate() - (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1)
  );

  const days: CalendarDay[] = [];
  const today = new Date();

  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dateString = currentDate.toISOString().split("T")[0];
    const dayEvents = events.filter((event) => event.date === dateString);

    days.push({
      date: currentDate.getDate(),
      isCurrentMonth: currentDate.getMonth() === month,
      isToday: currentDate.toDateString() === today.toDateString(),
      events: dayEvents,
    });
  }

  return days;
};

export const CalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11)); // December 2025

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = generateCalendarDays(year, month, mockCalendarEvents);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardBody className="p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Календарь{" "}
              <span className="text-gray-400">
                {MONTHS[month]} {year}
              </span>
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth("prev")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => navigateMonth("next")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-[80px] p-2 border border-gray-100 ${
                  !day.isCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white"
                } ${day.isToday ? "bg-blue-50 border-blue-200" : ""}`}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    day.isToday
                      ? "text-blue-600"
                      : day.isCurrentMonth
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {day.date}
                </div>

                {/* Events */}
                <div className="space-y-1">
                  {day.events.slice(0, 2).map((event) => (
                    <Tooltip
                      key={event.id}
                      content={
                        <div className="p-2">
                          <div className="font-semibold text-sm">
                            {event.title}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Тип:{" "}
                            {event.type === "report"
                              ? "Отчет"
                              : event.type === "meeting"
                              ? "Встреча"
                              : "Дедлайн"}
                          </div>
                          <div className="text-xs text-gray-600">
                            Дата:{" "}
                            {new Date(event.date).toLocaleDateString("ru-RU")}
                          </div>
                        </div>
                      }
                      placement="top"
                      delay={300}
                      closeDelay={100}
                      classNames={{
                        arrow: "bg-neutral-400 dark:bg-white",
                      }}
                    >
                      <div className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate cursor-pointer hover:bg-blue-200 transition-colors">
                        {event.title}
                      </div>
                    </Tooltip>
                  ))}
                  {day.events.length > 2 && (
                    <Tooltip
                      content={
                        <div className="p-2">
                          <div className="font-semibold text-sm mb-2">
                            Дополнительные события:
                          </div>
                          {day.events.slice(2).map((event) => (
                            <div key={event.id} className="text-xs mb-1">
                              • {event.title}
                            </div>
                          ))}
                        </div>
                      }
                      placement="top"
                      delay={300}
                      closeDelay={100}
                      classNames={{
                        arrow: "bg-neutral-400 dark:bg-white",
                      }}
                    >
                      <div className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
                        +{day.events.length - 2} еще
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
