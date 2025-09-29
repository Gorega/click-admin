import { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authAPI, authUtils } from '../lib/api/auth';

// Create Auth Context
const AuthContext = createContext({});

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      
      // Check if user data exists in localStorage
      const userData = authUtils.getCurrentUser();
      const token = authUtils.getToken();
      
      if (userData && token) {
        // Verify token with server
        const result = await authAPI.checkAuth();
        
        if (result.success && result.isAuthenticated) {
          setUser(result.user);
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clear auth data
          authUtils.clearAuth();
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      authUtils.clearAuth();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const result = await authAPI.login(credentials);
      
      if (result.success) {
        const { token, ...userData } = result.data.data;
        
        // Check if email is verified
        if (!userData.email_verified) {
          toast.error('Please verify your email address before logging in.');
          router.push(`/auth/verify-pending?email=${encodeURIComponent(userData.email)}`);
          return { success: false, requiresVerification: true };
        }
        
        // Store auth data
        authUtils.setAuth(token, userData);
        setUser(userData);
        setIsAuthenticated(true);
        
        toast.success('Login successful! Welcome back.');
        return { success: true, user: userData };
      } else {
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true);
      const result = await authAPI.register(userData);
      
      if (result.success) {
        toast.success('Registration successful! Please check your email for verification.');
        return { success: true, data: result.data };
      } else {
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return { success: false, error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      await authAPI.logout();
      
      // Clear state
      setUser(null);
      setIsAuthenticated(false);
      
      toast.success('Logged out successfully.');
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email function
  const verifyEmail = async (token) => {
    try {
      setIsLoading(true);
      const result = await authAPI.verifyEmail(token);
      
      if (result.success) {
        toast.success('Email verified successfully! You can now log in.');
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Email verification error:', error);
      return { success: false, error: 'Email verification failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification email function
  const resendVerificationEmail = async (email) => {
    try {
      const result = await authAPI.resendVerificationEmail(email);
      
      if (result.success) {
        toast.success('Verification email sent successfully!');
        return { success: true };
      } else {
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      toast.error('Failed to send verification email.');
      return { success: false, error: 'Failed to send verification email' };
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true);
      const result = await authAPI.updateProfile(profileData);
      
      if (result.success) {
        const updatedUser = result.data.data;
        setUser(updatedUser);
        authUtils.setAuth(authUtils.getToken(), updatedUser);
        toast.success('Profile updated successfully!');
        return { success: true, user: updatedUser };
      } else {
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile.');
      return { success: false, error: 'Failed to update profile' };
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const result = await authAPI.getProfile();
      
      if (result.success) {
        const userData = result.data.data;
        setUser(userData);
        authUtils.setAuth(authUtils.getToken(), userData);
        return { success: true, user: userData };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      return { success: false, error: 'Failed to refresh user data' };
    }
  };

  const value = {
    // State
    user,
    isLoading,
    isAuthenticated,
    
    // Actions
    login,
    register,
    logout,
    verifyEmail,
    resendVerificationEmail,
    updateProfile,
    refreshUser,
    
    // Utilities
    isEmailVerified: user?.email_verified || false,
    isHost: user?.is_host || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Higher-order component for protected routes
export function withAuth(WrappedComponent, options = {}) {
  const { requireEmailVerification = false, redirectTo = '/auth/login' } = options;
  
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push(redirectTo);
          return;
        }
        
        if (requireEmailVerification && !user?.email_verified) {
          router.push(`/auth/verify-pending?email=${encodeURIComponent(user.email)}`);
          return;
        }
      }
    }, [isAuthenticated, isLoading, user, router]);
    
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      return null;
    }
    
    if (requireEmailVerification && !user?.email_verified) {
      return null;
    }
    
    return <WrappedComponent {...props} />;
  };
}

// Hook for route protection
export function useRequireAuth(options = {}) {
  const { requireEmailVerification = false, redirectTo = '/auth/login' } = options;
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }
      
      if (requireEmailVerification && !user?.email_verified) {
        router.push(`/auth/verify-pending?email=${encodeURIComponent(user.email)}`);
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, router, requireEmailVerification, redirectTo]);
  
  return {
    isAuthenticated,
    isLoading,
    user,
    isEmailVerified: user?.email_verified || false,
  };
}