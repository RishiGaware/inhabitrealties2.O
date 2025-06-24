import api from '../api';
import { USER_ENDPOINTS } from '../apiEndpoints';

// Example: Fetch all users
export const fetchUsers = async () => {
  const response = await api.get(USER_ENDPOINTS.GET_ALL);
  return response.data;
};

// Example: Create a new user
export const createUser = async (userData) => {
  const response = await api.post(USER_ENDPOINTS.CREATE, userData);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post(USER_ENDPOINTS.REGISTER, userData);
  return response.data;
};

export const editUser = async (id, userData) => {
  const response = await api.put(USER_ENDPOINTS.EDIT(id), userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(USER_ENDPOINTS.DELETE(id));
  return response.data;
};

// Add more user management functions as needed 