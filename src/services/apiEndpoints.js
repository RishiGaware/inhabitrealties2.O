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
  GET_ALL: '/roles/',
  CREATE: '/roles/create',
  EDIT: (id) => `/roles/edit/${id}`,
  DELETE: (id) => `/roles/delete/${id}`,
};

export const PROPERTY_TYPE_ENDPOINTS = {
  GET_ALL: '/properytypes',
  CREATE: '/properytypes/create',
  EDIT: (id) => `/properytypes/edit/${id}`,
  DELETE: (id) => `/properytypes/delete/${id}`,
};

export const LEAD_STATUS_ENDPOINTS = {
  GET_ALL: '/leadstatus/',
  GET_BY_ID: (id) => `/leadstatus/${id}`,
  CREATE: '/leadstatus/create',
  EDIT: (id) => `/leadstatus/edit/${id}`,
  DELETE: (id) => `/leadstatus/delete/${id}`,
};

export const FOLLOWUP_STATUS_ENDPOINTS = {
  GET_ALL: '/followupstatus/',
  GET_BY_ID: (id) => `/followupstatus/${id}`,
  CREATE: '/followupstatus/create',
  EDIT: (id) => `/followupstatus/edit/${id}`,
  DELETE: (id) => `/followupstatus/delete/${id}`,
};

export const LEADS_ENDPOINTS = {
  GET_ALL: '/leads/',
  GET_BY_ID: (id) => `/leads/${id}`,
  CREATE: '/leads/create',
  EDIT: (id) => `/leads/edit/${id}`,
  DELETE: (id) => `/leads/delete/${id}`,
  GET_ALL_WITH_PARAMS: '/leads/getallleadswithparams',
};

export const PROPERTY_ENDPOINTS = {
  CREATE: '/property/create',
  GET_ALL: '/property/',
  GET_WITH_PARAMS: '/property/withparams',
  EDIT: (id) => `/property/edit/${id}`,
  DELETE: (id) => `/property/delete/${id}`,
  UPLOAD_IMAGE: (id) => `/property/image/create/${id}`,
  GET_IMAGES: (id) => `/property/images/all/${id}`,
  DELETE_IMAGE: (id) => `/property/image/delete/${id}`,
  DELETE_ALL_IMAGES: (id) => `/property/image/delete/all/${id}`,
  GET_IMAGE_BY_ID: (id) => `/property/image/${id}`,
};