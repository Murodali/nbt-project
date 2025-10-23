import { useQuery } from "@tanstack/react-query";
import { rolesApi } from "../api/accessSettingsApi";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => rolesApi.getUsers(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};
