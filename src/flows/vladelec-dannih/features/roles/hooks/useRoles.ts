import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "../api/rolesApi";
import type { AddRoleAttributesData, CreateRoleData, RemoveRoleAttributesData, UpdateRoleAttributesData } from "../model";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => rolesApi.getRoles(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateRoleData) => rolesApi.createRole(data),
    onSuccess: () => {
      // Invalidate and refetch roles after successful creation
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useUpdateRoleAttributes = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ roleName, data }: { roleName: string; data: UpdateRoleAttributesData }) => 
      rolesApi.updateRoleAttributes(roleName, data),
    onSuccess: () => {
      // Invalidate and refetch roles after successful update
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useAddRoleAttributes = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ roleName, data }: { roleName: string; data: AddRoleAttributesData }) => 
      rolesApi.addRoleAttributes(roleName, data),
    onSuccess: () => {
      // Invalidate and refetch roles after successful addition
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useRemoveRoleAttributes = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ roleName, data }: { roleName: string; data: RemoveRoleAttributesData }) => 
      rolesApi.removeRoleAttributes(roleName, data),
    onSuccess: () => {
      // Invalidate and refetch roles after successful removal
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
