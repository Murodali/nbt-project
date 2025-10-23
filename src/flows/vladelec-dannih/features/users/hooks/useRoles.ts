import { useQuery } from "@tanstack/react-query";
import { rolesApi } from "../api/accessSettingsApi";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => rolesApi.getRoles(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
