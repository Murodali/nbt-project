import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "../api/accessSettingsApi";
import type { UpdateUserData } from "../model";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateUserData }) =>
      rolesApi.updateUser(userId, data),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
