import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "../api/accessSettingsApi";
import type { CreateUserData } from "../model";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserData) => rolesApi.createUser(data),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
