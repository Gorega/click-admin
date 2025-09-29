'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiMail, FiRefreshCw, FiArrowLeft, FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import { authUtils } from '../../../lib/api/auth';
import { useLanguage } from '../../../contexts/LanguageContext';
import styles from './verify-pending.module.css';

function VerifyPendingContent() {
  const [email, setEmail] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resendVerificationEmail, isLoading } = useAuth();
  const { t, currentLanguage, setLanguage, isRTL } = useLanguage();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // If no email provided, redirect to register
      router.push('/auth/register');
    }
  }, [searchParams, router]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResendEmail = useCallback(async () => {
    if (!email || isLoading || cooldown > 0) return;

    const result = await resendVerificationEmail(email);
    
    if (result.success) {
      setCooldown(60); // 60 second cooldown
    }
  }, [email, isLoading, cooldown, resendVerificationEmail]);

  const maskEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return email;
    const maskedLocal = localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1];
    return `${maskedLocal}@${domain}`;
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

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <FiMail className="w-8 h-8 text-white" />
            </div>
            <h1 className={styles.title}>{t.verifyPending.checkYourEmail}</h1>
            <p className={styles.subtitle}>
              {t.verifyPending.sentVerificationLink}{' '}
              <strong>{authUtils.maskEmail(email)}</strong>
            </p>
          </div>

          {/* Email Info */}
          <div className={styles.emailInfo}>
            <div className={styles.emailDisplay}>
              <FiMail className={styles.emailIcon} />
              <span className={styles.emailText}>{maskEmail(email)}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className={styles.instructions}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{t.verifyPending.step1Title}</h3>
                <p className={styles.stepText}>
                  {t.verifyPending.step1Text}
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{t.verifyPending.step2Title}</h3>
                <p className={styles.stepText}>
                  {t.verifyPending.step2Text}
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{t.verifyPending.step3Title}</h3>
                <p className={styles.stepText}>
                  {t.verifyPending.step3Text}
                </p>
              </div>
            </div>
          </div>

          {/* Resend Section */}
          <div className={styles.resendSection}>
            <p className={styles.resendText}>{t.verifyPending.didntReceiveEmail}</p>
            <button
                onClick={handleResendEmail}
                disabled={isLoading || cooldown > 0}
                className={styles.resendButton}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className={styles.loadingSpinner}></div>
                    {t.verifyPending.sending}
                  </div>
                ) : cooldown > 0 ? (
                  `${t.verifyPending.resendIn} ${cooldown}s`
                ) : (
                  <>
                    <FiRefreshCw className="w-4 h-4" />
                    {t.verifyPending.resendEmail}
                  </>
                )}
              </button>
          </div>

          {/* Help Section */}
          <div className={styles.helpSection}>
            <div className={styles.helpItem}>
              <FiAlertCircle className={styles.helpIcon} />
              <div>
                <h4 className={styles.helpTitle}>{t.verifyPending.checkSpamTitle}</h4>
                <p className={styles.helpText}>
                  {t.verifyPending.checkSpamText}
                </p>
              </div>
            </div>

            <div className={styles.helpItem}>
              <FiCheckCircle className={styles.helpIcon} />
              <div>
                <h4 className={styles.helpTitle}>{t.verifyPending.alreadyVerifiedTitle}</h4>
                <p className={styles.helpText}>
                  {t.verifyPending.alreadyVerifiedText}{' '}
                  <button
                    onClick={() => router.push('/auth/login')}
                    className={styles.linkButton}
                  >
                    {t.verifyPending.signInHere}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Back to Register */}
          <div className={styles.backSection}>
            <button
              onClick={() => router.push('/auth/register')}
              className={styles.backButton}
            >
              <FiArrowLeft className="w-4 h-4" />
              {t.verifyPending.backToRegistration}
            </button>
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

export default function VerifyPending() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPendingContent />
    </Suspense>
  );
}