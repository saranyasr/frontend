import api from "../utils/api";

export const registerUser = async (userData) => {
  try {
    const response = await api.post(`auth/register/`, userData);
    return response.data;
    return true;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post(`/auth/`, credentials);
    return response.data;

  } catch (error) {
    throw error;
  }
};

export const getTasks = async (data) => {
  try {
    const response = await api.get('/tasks', { params: data });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};


export const addTask = async (task) => {
  try {
    const response = await api.post(`/tasks/`, task);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const response = await api.patch(`/tasks/${taskId}/`, updates);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}/`);
  } catch (error) {
    throw error;
  }
};

export const getOneTask = async (id) => {
  try {
    const response = await api.get(`/tasks/${id}/`);
    return response.data;
   
  } catch (error) {
    throw error;
  }
};
