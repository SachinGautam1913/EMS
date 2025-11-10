import axiosClient from '../api/axiosClient';

/**
 * Employee Service
 * TODO: Replace mock functions with actual API calls
 */

export const employeeService = {
  // Get all employees
  getAll: async () => {
    // TODO: Uncomment when backend is ready
    // return await axiosClient.get('/employees');
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: [] });
      }, 500);
    });
  },

  // Get employee by ID
  getById: async (id) => {
    // TODO: Uncomment when backend is ready
    // return await axiosClient.get(`/employees/${id}`);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: null });
      }, 500);
    });
  },

  // Create new employee
  create: async (employeeData) => {
    // TODO: Uncomment when backend is ready
    // return await axiosClient.post('/employees', employeeData);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { ...employeeData, id: `EMP${Date.now()}` } });
      }, 500);
    });
  },

  // Update employee
  update: async (id, employeeData) => {
    // TODO: Uncomment when backend is ready
    // return await axiosClient.put(`/employees/${id}`, employeeData);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { ...employeeData, id } });
      }, 500);
    });
  },

  // Delete employee
  delete: async (id) => {
    // TODO: Uncomment when backend is ready
    // return await axiosClient.delete(`/employees/${id}`);
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true } });
      }, 500);
    });
  },

  // Upload employee document
  uploadDocument: async (employeeId, file) => {
    // TODO: Uncomment when backend is ready
    // const formData = new FormData();
    // formData.append('file', file);
    // return await axiosClient.post(`/employees/${employeeId}/documents`, formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { url: URL.createObjectURL(file) } });
      }, 500);
    });
  },

  // Upload avatar
  uploadAvatar: async (employeeId, file) => {
    // TODO: Uncomment when backend is ready
    // const formData = new FormData();
    // formData.append('avatar', file);
    // return await axiosClient.post(`/employees/${employeeId}/avatar`, formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });
    
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { url: URL.createObjectURL(file) } });
      }, 500);
    });
  },
};

