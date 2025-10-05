export type ReportStatus = "accepted" | "overdue" | "under_review";

export interface ReportHistoryItem {
  id: string;
  reportId: string;
  assignedDate: string;
  submissionDate: string;
  reportType: string;
  status: ReportStatus;
}

export interface ReportsHistoryResponse {
  reports: ReportHistoryItem[];
  total: number;
}
