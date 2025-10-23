import { apiClient } from "../../../../../shared/api/axios";
import { API_ENDPOINTS } from "../../../../../shared/lib/constants/api";
import type {
    CreateEndpointData,
    CreateEndpointResponse,
    EndpointsResponse,
    UpdateEndpointData,
    UpdateEndpointResponse
} from "../model";

export const endpointsApi = {
  // Get all endpoints
  getEndpoints: async (service?: string, category?: string): Promise<EndpointsResponse> => {
    const params = new URLSearchParams();
    if (service) params.append('service', service);
    if (category) params.append('category', category);
    
    const queryString = params.toString();
    const url = queryString ? `${API_ENDPOINTS.ENDPOINTS.ENDPOINTS}?${queryString}` : API_ENDPOINTS.ENDPOINTS.ENDPOINTS;
    
    const response = await apiClient.get<EndpointsResponse>(url);
    return response.data;
  },

  // Create new endpoint
  createEndpoint: async (data: CreateEndpointData): Promise<CreateEndpointResponse> => {
    const response = await apiClient.post<CreateEndpointResponse>(
      API_ENDPOINTS.ENDPOINTS.ENDPOINTS,
      data
    );
    return response.data;
  },

  // Update existing endpoint
  updateEndpoint: async (id: string, data: UpdateEndpointData): Promise<UpdateEndpointResponse> => {
    const response = await apiClient.put<UpdateEndpointResponse>(
      `${API_ENDPOINTS.ENDPOINTS.ENDPOINTS}/${id}`,
      data
    );
    return response.data;
  },

  // Delete endpoint (soft delete)
  deleteEndpoint: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.ENDPOINTS.ENDPOINTS}/${id}`);
  },
};
