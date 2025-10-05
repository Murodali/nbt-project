export interface Report {
  id: string;
  title: string;
  code: string;
  type: "financial" | "quarterly";
  status: "pending" | "completed" | "overdue";
  deadline: string;
  tags: string[];
}

export interface ReportsState {
  reports: Report[];
  loading: boolean;
  error: string | null;
}
