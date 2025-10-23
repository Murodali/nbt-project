import { useQuery } from "@tanstack/react-query";
import { reportsHistoryApi } from "../api/reportsHistoryApi";

export const useReportsHistory = () => {
  return useQuery({
    queryKey: ["reports-history"],
    queryFn: reportsHistoryApi.getReportsHistory,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useReportDetails = (reportId: string) => {
  return useQuery({
    queryKey: ["report-details", reportId],
    queryFn: () => reportsHistoryApi.getReportDetails(reportId),
    enabled: !!reportId,
  });
};
