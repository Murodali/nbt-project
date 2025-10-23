import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "../api/accessSettingsApi";

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => rolesApi.deactivateUser(userId),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
