export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/normaluser/registernormaluser',
};

export const USER_ENDPOINTS = {
  REGISTER: '/users/register',
  GET_ALL: '/users/',
  EDIT: (id) => `/users/edit/${id}`,
  DELETE: (id) => `/users/delete/${id}`,
};

export const ROLE_ENDPOINTS = {
  GET_ALL: '/roles',
  CREATE: '/roles',
  // Add more role endpoints as needed
};
