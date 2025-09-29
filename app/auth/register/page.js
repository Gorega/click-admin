'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiUserPlus, FiGlobe } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import { useLanguage } from '../../../contexts/LanguageContext';
import styles from './register.module.css';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    const result = await registerUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    if (result.success) {
      // Redirect to verification pending page
      router.push(`/auth/verify-pending?email=${encodeURIComponent(data.email)}`);
    }
  };

  return (
    <div className={`${styles.container} ${isRTL ? styles.rtl : styles.ltr}`}>
      <div className={styles.content}>
        <div className={styles.registerCard}>
          {/* Language Toggle */}
          <div className={styles.languageToggle}>
            <button
              type="button"
              onClick={toggleLanguage}
              className={styles.languageButton}
              aria-label="Toggle language"
            >
              <FiGlobe className="w-4 h-4" />
              {t.toggleLanguage}
            </button>
          </div>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <FiUserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className={styles.title}>{t.register.title}</h1>
            <p className={styles.subtitle}>{t.register.subtitle}</p>
          </div>

          {/* Registration Form */}
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {/* Name Field */}
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  {t.name}
                </label>
                <div className={styles.inputContainer}>
                  <FiUser className={styles.inputIcon} />
                  <input
                    {...register('name', {
                      required: t.register.nameRequired,
                      minLength: {
                        value: 2,
                        message: t.register.nameRequired,
                      },
                    })}
                    type="text"
                    id="name"
                    className={`${styles.input} ${errors.name ? styles.error : ''}`}
                    placeholder={t.register.namePlaceholder}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
                {errors.name && (
                  <div className={styles.errorMessage}>
                    <FiAlertCircle className="w-4 h-4" />
                    {errors.name.message}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  {t.email}
                </label>
                <div className={styles.inputContainer}>
                  <FiMail className={styles.inputIcon} />
                  <input
                    {...register('email', {
                      required: t.register.emailRequired,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t.register.emailInvalid,
                      },
                    })}
                    type="email"
                    id="email"
                    className={`${styles.input} ${errors.email ? styles.error : ''}`}
                    placeholder={t.register.emailPlaceholder}
                    dir="ltr"
                  />
                </div>
                {errors.email && (
                  <div className={styles.errorMessage}>
                    <FiAlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>
                  {t.phone}
                </label>
                <div className={styles.inputContainer}>
                  <FiPhone className={styles.inputIcon} />
                  <input
                    {...register('phone', {
                      required: t.register.phoneRequired,
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: t.register.phoneRequired,
                      },
                    })}
                    type="tel"
                    id="phone"
                    className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                    placeholder={t.register.phonePlaceholder}
                    dir="ltr"
                  />
                </div>
                {errors.phone && (
                  <div className={styles.errorMessage}>
                    <FiAlertCircle className="w-4 h-4" />
                    {errors.phone.message}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  {t.password}
                </label>
                <div className={styles.inputContainer}>
                  <FiLock className={styles.inputIcon} />
                  <input
                    {...register('password', {
                      required: t.register.passwordRequired,
                      minLength: {
                        value: 6,
                        message: t.register.passwordMinLength,
                      },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`${styles.input} ${errors.password ? styles.error : ''}`}
                    placeholder={t.register.passwordPlaceholder}
                    dir="ltr"
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

              {/* Confirm Password Field */}
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  {t.confirmPassword}
                </label>
                <div className={styles.inputContainer}>
                  <FiLock className={styles.inputIcon} />
                  <input
                    {...register('confirmPassword', {
                      required: t.register.confirmPasswordRequired,
                      validate: (value) =>
                        value === password || t.register.passwordsNotMatch,
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
                    placeholder={t.register.confirmPasswordPlaceholder}
                    dir="ltr"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className={styles.errorMessage}>
                    <FiAlertCircle className="w-4 h-4" />
                    {errors.confirmPassword.message}
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
                    {t.loading}
                  </div>
                ) : (
                  t.register.createAccount
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className={styles.loginLink}>
              <p className={styles.loginText}>
                {t.register.alreadyHaveAccount}{' '}
                <button
                  type="button"
                  onClick={() => router.push('/auth/login')}
                  className={styles.linkButton}
                >
                  {t.register.signIn}
                </button>
              </p>
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