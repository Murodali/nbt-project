import { apiClient } from "../../../../../shared/api/axios";
import { API_ENDPOINTS } from "../../../../../shared/lib/constants/api";
import type { AssignRolesData, AssignRolesResponse, CreateUserData, RolesResponse, UpdateUserData, User, UsersResponse, RemoveRolesData, RemoveRolesResponse } from "../model";

export const rolesApi = {
  // Get all roles
  getRoles: async (): Promise<RolesResponse> => {
    const response = await apiClient.get<RolesResponse>(API_ENDPOINTS.ROLES.ROLES);
    return response.data;
  },

  // Get all users
  getUsers: async (): Promise<UsersResponse> => {
    const response = await apiClient.get<UsersResponse>(API_ENDPOINTS.ROLES.USERS);
    return response.data;
  },

  // Get user by ID
  getUser: async (userId: string): Promise<User> => {
    const response = await apiClient.get<User>(
      API_ENDPOINTS.ROLES.USER_BY_ID.replace(":id", userId)
    );
    return response.data;
  },

  // Create new user
  createUser: async (data: CreateUserData): Promise<User> => {
    const response = await apiClient.post<User>(API_ENDPOINTS.ROLES.USERS, data);
    return response.data;
  },

  // Update user
  updateUser: async (userId: string, data: UpdateUserData): Promise<User> => {
    const response = await apiClient.put<User>(
      API_ENDPOINTS.ROLES.USER_BY_ID.replace(":id", userId),
      data
    );
    return response.data;
  },

  // Delete user
  deleteUser: async (userId: string): Promise<void> => {
    await apiClient.delete(
      API_ENDPOINTS.ROLES.USER_BY_ID.replace(":id", userId)
    );
  },

  // Assign role to user
  assignRoleToUser: async (userId: string, roleName: string): Promise<void> => {
    await apiClient.post(
      API_ENDPOINTS.ROLES.USER_ROLES.replace(":id", userId),
      { role: roleName }
    );
  },

  // Remove role from user
  removeRoleFromUser: async (userId: string, roleName: string): Promise<void> => {
    await apiClient.delete(
      API_ENDPOINTS.ROLES.USER_ROLES.replace(":id", userId),
      { data: { role: roleName } }
    );
  },

  // Deactivate user
  deactivateUser: async (userId: string): Promise<void> => {
    await apiClient.post(
      API_ENDPOINTS.ROLES.DEACTIVATE_USER.replace(":id", userId)
    );
  },

  // Assign roles to user
  assignRolesToUser: async (userId: string, data: AssignRolesData): Promise<AssignRolesResponse> => {
    const response = await apiClient.post<AssignRolesResponse>(
      API_ENDPOINTS.ROLES.USER_ROLES.replace(":id", userId),
      data
    );
    return response.data;
  },

  // Remove roles from user
  removeRolesFromUser: async (userId: string, data: RemoveRolesData): Promise<RemoveRolesResponse> => {
    const response = await apiClient.delete<RemoveRolesResponse>(
      API_ENDPOINTS.ROLES.USER_ROLES.replace(":id", userId),
      { data }
    );
    return response.data;
  },
};
