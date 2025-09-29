'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import { useLanguage } from '../../../contexts/LanguageContext';
import styles from './login.module.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { t, currentLanguage, setLanguage, isRTL } = useLanguage();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await login({
      identifier: data.identifier,
      password: data.password,
    });

    if (result.success) {
      // Redirect to dashboard or home page
      router.push('/dashboard');
    } else if (result.requiresVerification) {
      // Already handled in the login function
      return;
    }
  };

  return (
    <div className={styles.container} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={styles.content}>
        <div className={styles.loginCard}>
          {/* Header */}
          <div className={styles.header}>
            {/* Language Toggle */}
            <div className={styles.languageToggle}>
              <button
                onClick={() => setLanguage('ar')}
                className={`${styles.languageButton} ${currentLanguage === 'ar' ? styles.active : ''}`}
              >
                عربي
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`${styles.languageButton} ${currentLanguage === 'en' ? styles.active : ''}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('he')}
                className={`${styles.languageButton} ${currentLanguage === 'he' ? styles.active : ''}`}
              >
                עברית
              </button>
            </div>
            
            <div className={styles.iconContainer}>
              <FiLogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className={styles.title}>{t.login.title}</h1>
            <p className={styles.subtitle}>{t.login.subtitle}</p>
          </div>

          {/* Login Form */}
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {/* Identifier Field */}
              <div className={styles.inputGroup}>
                <label htmlFor="identifier" className={styles.label}>
                  {t.login.emailOrPhone}
                </label>
                <div className={styles.inputContainer}>
                  <FiUser className={styles.inputIcon} />
                  <input
                    {...register('identifier', {
                      required: t.login.emailOrPhoneRequired,
                    })}
                    type="text"
                    id="identifier"
                    className={`${styles.input} ${errors.identifier ? styles.error : ''}`}
                    placeholder={t.login.emailOrPhonePlaceholder}
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
                  {t.password}
                </label>
                <div className={styles.inputContainer}>
                  <FiLock className={styles.inputIcon} />
                  <input
                    {...register('password', {
                      required: t.login.passwordRequired,
                    })}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`${styles.input} ${errors.password ? styles.error : ''}`}
                    placeholder={t.login.passwordPlaceholder}
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
                    {t.login.signingIn}
                  </div>
                ) : (
                  t.login.signIn
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className={styles.registerLink}>
              <p className={styles.registerText}>
                {t.login.noAccount}{' '}
                <button
                  type="button"
                  onClick={() => router.push('/auth/register')}
                  className={styles.linkButton}
                >
                  {t.login.createAccount}
                </button>
              </p>
            </div>

            {/* Forgot Password Link */}
            <div className={styles.forgotPassword}>
              <button
                type="button"
                onClick={() => router.push('/auth/forgot-password')}
                className={styles.linkButton}
              >
                {t.login.forgotPassword}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              {t.footer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}