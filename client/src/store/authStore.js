import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api/auth' : '/api/auth'

// Axios will put the cookies into the request header
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  message: null,
  isLoading: false,
  isCheckingAuth: true,

  resetErrorMsg: () => {
    set({ error: null })
  },

  resetMsg: () => {
    set({ message: null })
  },

  signup: async (email, password, name) => {
    set({
      isLoading: true,
      error: null
    })

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email, password, name
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error.response.data.message || 'Error signing up.',
        isLoading: false,
      })
      throw error;
    }
  },

  login: async (email, password) => {
    set({
      isLoading: true,
      error: null
    })

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email, password
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error.response.data.message || 'Error logging in.',
        isLoading: false,
      })
      throw error;
    } 
  },

  addCategory: async (categoryName, categoryColor) => {
    try {
      const response = await axios.post(`${API_URL}/addCategory`, {
        categoryName, categoryColor
      });   

      set({
        user: response.data.user,
        message: response.data.message,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }) 
    } catch (error) {
      set({
        error: error.response.data.message || 'Error adding category.',
        isLoading: false,
      })
      throw error
    }
  },

  editCategory: async (id, categoryName, categoryColor) => {
    try {
      const response = await axios.post(`${API_URL}/editCategory`, {
        id, categoryName, categoryColor
      })

      set({
        user: response.data.user,
        message: response.data.message,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }) 
    } catch (error) {
      set({
        error: error.response.data.message || 'Error editing category.',
        isLoading: false,
      })
      throw error
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/deleteCategory`, {id})

      set({
        user: response.data.user,
        message: response.data.message,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }) 
    } catch (error) {
      set({
        error: error.response.data.message || 'Error deleting category.',
        isLoading: false,
      })
      throw error
    }
  },

  addTask: async (taskName, taskDescription, taskCategory, taskDeadline) => {
    try {
      const response = await axios.post(`${API_URL}/addTask`, {
        taskName, taskDescription, taskCategory, taskDeadline
      });   

      set({
        user: response.data.user,
        message: response.data.message,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }) 
    } catch (error) {
      set({
        error: error.response.data.message || 'Error adding task.',
        isLoading: false,
      })
      throw error
    }
  },

  editTask: async (id, taskName, taskDescription, taskCategory, taskDeadline) => {
    try {
      const response = await axios.post(`${API_URL}/editTask`, {
        id, taskName, taskDescription, taskCategory, taskDeadline
      })

      set({
        user: response.data.user,
        message: response.data.message,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }) 
    } catch (error) {
      set({
        error: error.response.data.message || 'Error editing task.',
        isLoading: false,
      })
      throw error
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/deleteTask`, {id})

      set({
        user: response.data.user,
        message: response.data.message,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }) 
    } catch (error) {
      set({
        error: error.response.data.message || 'Error deleting task.',
        isLoading: false,
      })
      throw error
    }
  },

  completeTask: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/completeTask`, {id})

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      console.log(error)
    }
  },

  incompleteTask: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/incompleteTask`, {id})

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      console.log(error)
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: 'Error logging out.', isLoading: false});
      throw error;
    }
  },

  checkAuth: async () => {
    set({
      isCheckingAuth: true,
      error: null,
    })

    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      })
    } catch (error) {
      set({
        error: null,
        isCheckingAuth: false,
      })
    }
  }
}))
