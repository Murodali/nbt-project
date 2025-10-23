import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "../api/accessSettingsApi";
import type { AssignRolesData } from "../model";

export const useAssignRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: AssignRolesData }) =>
      rolesApi.assignRolesToUser(userId, data),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
