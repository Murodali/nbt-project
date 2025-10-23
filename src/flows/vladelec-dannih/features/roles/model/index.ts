// Role types
export interface Role {
  name: string;
  description: string;
  attributes: RoleAttribute[] | null;
}

export interface RoleAttribute {
  id: string;
  key: string;
  value: string;
}

export interface RolesResponse {
  roles: Role[];
}

// Create role types
export interface CreateRoleData {
  name: string;
  description: string;
  endpoint_ids: string[];
}

export interface CreateRoleResponse {
  id: string;
  name: string;
  description: string;
  attributes: RoleAttribute[] | null;
}

// Update role attributes types
export interface UpdateRoleAttributesData {
  endpoint_ids: string[];
}

export interface UpdateRoleAttributesResponse {
  success: boolean;
  message: string;
}

// Add attributes to role types
export interface AddRoleAttributesData {
  endpoint_ids: string[];
}

export interface AddRoleAttributesResponse {
  success: boolean;
  message: string;
}

// Remove attributes from role types
export interface RemoveRoleAttributesData {
  endpoint_ids: string[];
}

export interface RemoveRoleAttributesResponse {
  success: boolean;
  message: string;
}

// Export form schema and types
export { roleFormSchema, type RoleFormData } from "./roleFormSchema";
