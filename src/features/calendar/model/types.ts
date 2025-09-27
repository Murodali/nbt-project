export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "report" | "meeting" | "deadline";
}

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}
