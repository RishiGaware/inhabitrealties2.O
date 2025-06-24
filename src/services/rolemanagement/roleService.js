import api from '../api';
import { ROLE_ENDPOINTS } from '../apiEndpoints';

// Example: Fetch all roles
export const fetchRoles = async () => {
  const response = await api.get(ROLE_ENDPOINTS.GET_ALL);
  return response.data;
};

// Example: Create a new role
export const createRole = async (roleData) => {
  const response = await api.post(ROLE_ENDPOINTS.CREATE, roleData);
  return response.data;
};

// Add more role management functions as needed 