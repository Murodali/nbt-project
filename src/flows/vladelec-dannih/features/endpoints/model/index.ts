// Endpoint types
export interface Endpoint {
  id: string;
  name: string;
  path: string;
  method: string;
  service: string;
  category: string;
  description?: string;
  is_active: boolean;
  parameters?: EndpointParameter[];
  responses?: EndpointResponse[];
}

export interface EndpointParameter {
  name: string;
  type: string;
  required: boolean;
  description?: string;
}

export interface EndpointResponse {
  status: number;
  description: string;
  schema?: any;
}

export interface EndpointsResponse {
  endpoints: Endpoint[];
  total: number;
}

// Create endpoint types
export interface CreateEndpointData {
  category: string;
  description: string;
  method: string;
  path: string;
  service: string;
}

export interface CreateEndpointResponse {
  id: string;
  category: string;
  description: string;
  method: string;
  path: string;
  service: string;
}

// Update endpoint types
export interface UpdateEndpointData {
  category: string;
  description: string;
  is_active: boolean;
  method: string;
  path: string;
}

export interface UpdateEndpointResponse {
  id: string;
  category: string;
  description: string;
  is_active: boolean;
  method: string;
  path: string;
  service: string;
}

// Export form schema and types
export { endpointFormSchema, type EndpointFormData } from "./endpointFormSchema";
