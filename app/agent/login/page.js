'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiUser, FiLock, FiEye, FiEyeOff, FiShield, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import styles from './login.module.css';

export default function AgentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // First, authenticate the user
      const loginResponse = await axios.post('http://localhost:8000/api/users/login', {
        identifier: data.identifier,
        password: data.password,
      });

      const { token, ...user } = loginResponse.data.data;

      // Check if user is an agent
      if (!user.is_agent) {
        toast.error('Access denied. Agent privileges required.');
        setIsLoading(false);
        return;
      }

      // Store token and user data
      localStorage.setItem('agentToken', token);
      localStorage.setItem('agentUser', JSON.stringify(user));

      toast.success('Login successful! Welcome to Agent Dashboard');
      router.push('/agent/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.loginCard}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <FiShield className="w-8 h-8 text-white" />
            </div>
            <h1 className={styles.title}>Agent Portal</h1>
            <p className={styles.subtitle}>Secure access for authorized agents only</p>
          </div>

          {/* Login Form */}
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {/* Identifier Field */}
              <div className={styles.inputGroup}>
                <label htmlFor="identifier" className={styles.label}>
                  Email or Phone
                </label>
                <div className={styles.inputContainer}>
                  <FiUser className={styles.inputIcon} />
                  <input
                    {...register('identifier', {
                      required: 'Email or phone is required',
                    })}
                    type="text"
                    id="identifier"
                    className={`${styles.input} ${errors.identifier ? styles.error : ''}`}
                    placeholder="Enter your email or phone"
                  />
                </div>
                {errors.identifier && (
                  <div className={styles.errorMessage}>
                    <FiAlertCircle className="w-4 h-4" />
                    {errors.identifier.message}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <div className={styles.inputContainer}>
                  <FiLock className={styles.inputIcon} />
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`${styles.input} ${errors.password ? styles.error : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className={styles.errorMessage}>
                    <FiAlertCircle className="w-4 h-4" />
                    {errors.password.message}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={styles.submitButton}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className={styles.loadingSpinner}></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In to Agent Portal'
                )}
              </button>
            </form>

            {/* Security Notice */}
            <div className={styles.securityNotice}>
              <div className={styles.securityContent}>
                <FiShield className={styles.securityIcon} />
                <div>
                  <h3 className={styles.securityTitle}>Security Notice</h3>
                  <p className={styles.securityText}>
                    This portal is restricted to authorized agents only. All access attempts are logged and monitored.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              © 2025 Click. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}