import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "../api/accessSettingsApi";
import type { RemoveRolesData } from "../model";

export const useRemoveRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: RemoveRolesData }) => 
      rolesApi.removeRolesFromUser(userId, data),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
