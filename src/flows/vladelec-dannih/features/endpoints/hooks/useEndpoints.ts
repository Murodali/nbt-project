import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endpointsApi } from "../api/endpointsApi";
import type { CreateEndpointData, UpdateEndpointData } from "../model";

export const useEndpoints = (service?: string, category?: string) => {
  return useQuery({
    queryKey: ["endpoints", service, category],
    queryFn: () => endpointsApi.getEndpoints(service, category),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateEndpoint = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateEndpointData) => endpointsApi.createEndpoint(data),
    onSuccess: () => {
      // Invalidate and refetch endpoints after successful creation
      queryClient.invalidateQueries({ queryKey: ["endpoints"] });
    },
  });
};

export const useUpdateEndpoint = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEndpointData }) => 
      endpointsApi.updateEndpoint(id, data),
    onSuccess: () => {
      // Invalidate and refetch endpoints after successful update
      queryClient.invalidateQueries({ queryKey: ["endpoints"] });
    },
  });
};

export const useDeleteEndpoint = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => endpointsApi.deleteEndpoint(id),
    onSuccess: () => {
      // Invalidate and refetch endpoints after successful deletion
      queryClient.invalidateQueries({ queryKey: ["endpoints"] });
    },
  });
};
