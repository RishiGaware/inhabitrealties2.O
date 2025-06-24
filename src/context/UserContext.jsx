import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchUsers, registerUser, editUser, deleteUser } from '../services/usermanagement/userService';
import { showSuccessToast, showErrorToast } from '../utils/toastUtils';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchUsers();
      setUsers(res.data || []);
    } catch (err) {
      showErrorToast(err?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = async (userData) => {
    setLoading(true);
    try {
      await registerUser(userData);
      showSuccessToast('User added successfully');
      await getAllUsers();
    } catch (err) {
      showErrorToast(err?.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    setLoading(true);
    try {
      await editUser(id, userData);
      showSuccessToast('User updated successfully');
      await getAllUsers();
    } catch (err) {
      showErrorToast(err?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    setLoading(true);
    try {
      await deleteUser(id);
      showSuccessToast('User deleted successfully');
      await getAllUsers();
    } catch (err) {
      showErrorToast(err?.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ users, loading, getAllUsers, addUser, updateUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext); 