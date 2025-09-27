import { apiClient } from "../../../shared/api/axios";
import type { ReportsHistoryResponse } from "../model/types";

export const reportsHistoryApi = {
  // Get reports history
  getReportsHistory: async (): Promise<ReportsHistoryResponse> => {
    const response = await apiClient.get<ReportsHistoryResponse>("/reports/history");
    return response.data;
  },

  // Get report details
  getReportDetails: async (reportId: string) => {
    const response = await apiClient.get(`/reports/${reportId}`);
    return response.data;
  },

  // Download report
  downloadReport: async (reportId: string): Promise<Blob> => {
    const response = await apiClient.get(`/reports/${reportId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
