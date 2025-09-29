'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiCheckCircle, FiXCircle, FiLoader, FiMail, FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import { useLanguage } from '../../../contexts/LanguageContext';
import styles from './verify-email.module.css';

function VerifyEmailContent() {
  const [verificationState, setVerificationState] = useState('loading'); // loading, success, error, expired
  const [errorMessage, setErrorMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail, resendVerificationEmail, isLoading } = useAuth();
  const { t, currentLanguage, setLanguage, isRTL } = useLanguage();

  useEffect(() => {
    const verifyEmailToken = async (token) => {
      setVerificationState('loading');
      
      const result = await verifyEmail(token);
      
      if (result.success) {
        setVerificationState('success');
      } else {
        const errorMsg = result.error;
        if (errorMsg.includes('expired') || errorMsg.includes('invalid')) {
          setVerificationState('expired');
          setErrorMessage(errorMsg);
        } else {
          setVerificationState('error');
          setErrorMessage(errorMsg);
        }
      }
    };

    const token = searchParams.get('token');
    if (token) {
      verifyEmailToken(token);
    } else {
      setVerificationState('error');
      setErrorMessage('Invalid verification link. No token provided.');
    }
  }, [searchParams]);

  const handleResendVerification = useCallback(async () => {
    const email = prompt(t.verifyEmail.enterEmailPrompt);
    if (!email) return;

    const result = await resendVerificationEmail(email);
    
    if (result.success) {
      router.push(`/auth/verify-pending?email=${encodeURIComponent(email)}`);
    }
  }, [resendVerificationEmail, router, t.verifyEmail.enterEmailPrompt]);

  const renderContent = () => {
    switch (verificationState) {
      case 'loading':
        return (
          <>
            <div className={styles.iconContainer}>
              <FiLoader className="w-8 h-8 text-white animate-spin" />
            </div>
            <h1 className={styles.title}>{t.verifyEmail.verifying}</h1>
            <p className={styles.subtitle}>{t.verifyEmail.pleaseWait}</p>
            <div className={styles.loadingBar}>
              <div className={styles.loadingProgress}></div>
            </div>
          </>
        );

      case 'success':
        return (
          <>
            <div className={styles.iconContainer}>
              <FiCheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className={styles.title}>{t.verifyEmail.verified}</h1>
            <p className={styles.subtitle}>{t.verifyEmail.verifiedSuccessfully}</p>
            
            <div className={styles.successMessage}>
              <FiMail className={styles.successIcon} />
              <div>
                <h3 className={styles.successTitle}>{t.verifyEmail.welcomeToClick}</h3>
                <p className={styles.successText}>
                  {t.verifyEmail.accountActive}
                </p>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button
                onClick={() => router.push('/auth/login')}
                className={styles.primaryButton}
              >
                <span>{t.verifyEmail.continueToLogin}</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        );

      case 'expired':
        return (
          <>
            <div className={styles.iconContainer}>
              <FiXCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className={styles.title}>{t.verifyEmail.linkExpired}</h1>
            <p className={styles.subtitle}>{errorMessage}</p>
            
            <div className={styles.errorMessage}>
              <FiRefreshCw className={styles.errorIcon} />
              <div>
                <h3 className={styles.errorTitle}>{t.verifyEmail.linkExpiredTitle}</h3>
                <p className={styles.errorText}>
                  {t.verifyEmail.linkExpiredText}
                </p>
              </div>
            </div>

            <div className={styles.actionButtons}>
              {userEmail ? (
                <button
                  onClick={handleResendVerification}
                  disabled={isLoading}
                  className={styles.primaryButton}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t.verifyEmail.sending}
                    </div>
                  ) : (
                    <>
                      <FiRefreshCw className="w-4 h-4" />
                      {t.verifyEmail.requestNewLink}
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => router.push('/auth/register')}
                  className={styles.primaryButton}
                >
                  <span>{t.verifyEmail.backToRegistration}</span>
                </button>
              )}
              
              <button
                onClick={() => router.push('/auth/login')}
                className={styles.secondaryButton}
              >
                {t.verifyEmail.alreadyVerified}
              </button>
            </div>
          </>
        );

      case 'error':
      default:
        return (
          <>
            <div className={styles.iconContainer}>
              <FiXCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className={styles.title}>{t.verifyEmail.verificationFailed}</h1>
            <p className={styles.subtitle}>{errorMessage}</p>
            
            <div className={styles.errorMessage}>
              <FiXCircle className={styles.errorIcon} />
              <div>
                <h3 className={styles.errorTitle}>{t.verifyEmail.somethingWentWrong}</h3>
                <p className={styles.errorText}>
                  {t.verifyEmail.verificationErrorText}
                </p>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button
                onClick={() => router.push('/auth/register')}
                className={styles.primaryButton}
              >
                <span>{t.verifyEmail.backToRegistration}</span>
              </button>
              
              <button
                onClick={() => router.push('/auth/login')}
                className={styles.secondaryButton}
              >
                {t.verifyEmail.tryToSignIn}
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className={styles.container} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={styles.content}>
        <div className={styles.verificationCard}>
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

          {renderContent()}

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

export default function VerifyEmail() {  
  return (
    <Suspense fallback={
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.verificationCard}>
            <div className={styles.iconContainer}>
              <FiLoader className="w-8 h-8 text-white animate-spin" />
            </div>
            <h1 className={styles.title}>Loading...</h1>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}