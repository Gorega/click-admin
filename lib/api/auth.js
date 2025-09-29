import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Authentication API functions
export const authAPI = {
  // User Registration
  register: async (userData) => {
    try {
      // Detect language from browser locale
      const browserLanguage = navigator.language || navigator.userLanguage || 'en';
      let language = 'ar'; // Default to Arabic
      
      if (browserLanguage.startsWith('en')) {
        language = 'en';
      } else if (browserLanguage.startsWith('he')) {
        language = 'he';
      } else if (browserLanguage.startsWith('ar')) {
        language = 'ar';
      }
      
      const registrationData = {
        ...userData,
        language
      };
      
      const response = await apiClient.post('/api/users/register', registrationData);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Registration successful',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
        details: error.response?.data,
      };
    }
  },

  // User Login
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/api/users/login', credentials);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Login successful',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
        details: error.response?.data,
      };
    }
  },

  // User Logout
  logout: async () => {
    try {
      const response = await apiClient.post('/api/users/logout');
      
      // Clear local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
      }
      
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Logout successful',
      };
    } catch (error) {
      // Even if API call fails, clear local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
      }
      
      return {
        success: false,
        error: error.response?.data?.message || 'Logout failed',
        details: error.response?.data,
      };
    }
  },

  // Email Verification
  verifyEmail: async (token) => {
    try {
      // Detect language from browser locale
      const browserLanguage = navigator.language || navigator.userLanguage || 'en';
      let language = 'ar'; // Default to Arabic
      
      if (browserLanguage.startsWith('en')) {
        language = 'en';
      } else if (browserLanguage.startsWith('he')) {
        language = 'he';
      } else if (browserLanguage.startsWith('ar')) {
        language = 'ar';
      }
      
      const response = await apiClient.get(`/api/users/verify-email/${token}?language=${language}`);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Email verified successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Email verification failed',
        details: error.response?.data,
      };
    }
  },

  // Resend Verification Email
  resendVerificationEmail: async (email) => {
    try {
      // Detect language from browser locale
      const browserLanguage = navigator.language || navigator.userLanguage || 'en';
      let language = 'ar'; // Default to Arabic
      
      if (browserLanguage.startsWith('en')) {
        language = 'en';
      } else if (browserLanguage.startsWith('he')) {
        language = 'he';
      } else if (browserLanguage.startsWith('ar')) {
        language = 'ar';
      }
      
      const response = await apiClient.post('/api/users/resend-verification', { 
        email, 
        language 
      });
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Verification email sent successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send verification email',
        details: error.response?.data,
      };
    }
  },

  // Get User Profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/api/users/profile');
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Profile retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get profile',
        details: error.response?.data,
      };
    }
  },

  // Update User Profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/api/users/profile', profileData);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Profile updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update profile',
        details: error.response?.data,
      };
    }
  },

  // Check Authentication Status
  checkAuth: async () => {
    try {
      const response = await apiClient.get('/api/users/profile');
      return {
        success: true,
        isAuthenticated: true,
        user: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        isAuthenticated: false,
        error: error.response?.data?.message || 'Not authenticated',
      };
    }
  },

  // Password Reset Request
  requestPasswordReset: async (email) => {
    try {
      const response = await apiClient.post('/api/users/forgot-password', { email });
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Password reset email sent',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send password reset email',
        details: error.response?.data,
      };
    }
  },

  // Password Reset
  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiClient.post('/api/users/reset-password', {
        token,
        password: newPassword,
      });
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Password reset successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to reset password',
        details: error.response?.data,
      };
    }
  },
};

// Utility functions
export const authUtils = {
  // Check if user is logged in
  isLoggedIn: () => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    return !!(token && userData);
  },

  // Get current user data
  getCurrentUser: () => {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  // Get auth token
  getToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('userToken');
  },

  // Clear auth data
  clearAuth: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  },

  // Set auth data
  setAuth: (token, userData) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('userToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  },

  // Check if email is verified
  isEmailVerified: () => {
    const user = authUtils.getCurrentUser();
    return user?.email_verified || false;
  },

  // Mask email for display
  maskEmail: (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    if (username.length <= 2) return email;
    const maskedUsername = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1];
    return `${maskedUsername}@${domain}`;
  },

  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone format (basic)
  isValidPhone: (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },
};

export default apiClient;