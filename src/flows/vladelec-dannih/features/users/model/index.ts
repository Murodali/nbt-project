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

// User types
export interface User {
  user_id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  enabled: boolean;
}

export interface UsersResponse {
  count: number;
  users: User[];
}

// Form data types
export interface CreateUserData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
}

// Role assignment types
export interface AssignRolesData {
  role_names: string[];
}

export interface AssignRolesResponse {
  success: boolean;
  message: string;
}

// Remove roles from user types
export interface RemoveRolesData {
  role_names: string[];
}

export interface RemoveRolesResponse {
  success: boolean;
  message: string;
}

// Export user form schema and types
export { userFormSchema, type UserFormData } from "./userFormSchema";

export interface AccessSettingsState {
  selectedUser: User | null;
  isModalOpen: boolean;
  isEditing: boolean;
}
