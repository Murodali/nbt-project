import { apiClient } from "../../../../../shared/api/axios";
import { API_ENDPOINTS } from "../../../../../shared/lib/constants/api";
import type {
  AddRoleAttributesData,
  AddRoleAttributesResponse,
  CreateRoleData,
  CreateRoleResponse,
  RemoveRoleAttributesData,
  RemoveRoleAttributesResponse,
  RolesResponse,
  UpdateRoleAttributesData,
  UpdateRoleAttributesResponse
} from "../model";

export const rolesApi = {
  // Get all roles
  getRoles: async (): Promise<RolesResponse> => {
    const response = await apiClient.get<RolesResponse>(API_ENDPOINTS.ROLES.ROLES);
    return response.data;
  },

  // Create new role
  createRole: async (data: CreateRoleData): Promise<CreateRoleResponse> => {
    const response = await apiClient.post<CreateRoleResponse>(
      API_ENDPOINTS.ROLES.ROLES,
      data
    );
    return response.data;
  },

  // Update role attributes (replace all)
  updateRoleAttributes: async (roleName: string, data: UpdateRoleAttributesData): Promise<UpdateRoleAttributesResponse> => {
    const response = await apiClient.put<UpdateRoleAttributesResponse>(
      `${API_ENDPOINTS.ROLES.ROLES}/${roleName}/attributes`,
      data
    );
    return response.data;
  },

  // Add attributes to role (add without removing existing)
  addRoleAttributes: async (roleName: string, data: AddRoleAttributesData): Promise<AddRoleAttributesResponse> => {
    const response = await apiClient.post<AddRoleAttributesResponse>(
      `${API_ENDPOINTS.ROLES.ROLES}/${roleName}/attributes`,
      data
    );
    return response.data;
  },

  // Remove attributes from role
  removeRoleAttributes: async (roleName: string, data: RemoveRoleAttributesData): Promise<RemoveRoleAttributesResponse> => {
    const response = await apiClient.delete<RemoveRoleAttributesResponse>(
      `${API_ENDPOINTS.ROLES.ROLES}/${roleName}/attributes`,
      { data }
    );
    return response.data;
  },
};
