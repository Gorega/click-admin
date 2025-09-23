'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './success.module.css';

const translations = {
  en: {
    title: 'Payment Successful!',
    subtitle: 'Thank you for using our service. Your reservation has been confirmed.',
    reservationDetails: 'Reservation Details',
    property: 'Property:',
    checkIn: 'Check-in:',
    checkOut: 'Check-out:',
    amountPaid: 'Amount Paid:',
    reservationId: 'Reservation ID:',
    paymentId: 'Payment ID:',
    viewReservation: 'View Reservation',
    done: 'Done',
    confirmationEmail: 'A confirmation email has been sent to your registered email address.',
    supportContact: 'If you have any questions, please contact our support team.',
    toggleLanguage: 'عربي / עברית'
  },
  ar: {
    title: 'تم الدفع بنجاح!',
    subtitle: 'شكراً لاستخدام خدمتنا. تم تأكيد حجزك.',
    reservationDetails: 'تفاصيل الحجز',
    property: 'العقار:',
    checkIn: 'تاريخ الوصول:',
    checkOut: 'تاريخ المغادرة:',
    amountPaid: 'المبلغ المدفوع:',
    reservationId: 'رقم الحجز:',
    paymentId: 'رقم الدفع:',
    viewReservation: 'عرض الحجز',
    done: 'تم',
    confirmationEmail: 'تم إرسال رسالة تأكيد إلى عنوان بريدك الإلكتروني المسجل.',
    supportContact: 'إذا كان لديك أي أسئلة، يرجى الاتصال بفريق الدعم.',
    toggleLanguage: 'English / עברית'
  },
  he: {
    title: 'התשלום בוצע בהצלחה!',
    subtitle: 'תודה שהשתמשת בשירות שלנו. ההזמנה שלך אושרה.',
    reservationDetails: 'פרטי ההזמנה',
    property: 'נכס:',
    checkIn: 'תאריך כניסה:',
    checkOut: 'תאריך יציאה:',
    amountPaid: 'סכום ששולם:',
    reservationId: 'מספר הזמנה:',
    paymentId: 'מספר תשלום:',
    viewReservation: 'צפה בהזמנה',
    done: 'סיום',
    confirmationEmail: 'הודעת אישור נשלחה לכתובת האימייל הרשומה שלך.',
    supportContact: 'אם יש לך שאלות, אנא צור קשר עם צוות התמיכה שלנו.',
    toggleLanguage: 'English / عربي'
  }
};

// Component that handles search params
function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reservationDetails, setReservationDetails] = useState(null);
  const [language, setLanguage] = useState('ar');
  const t = translations[language];

  // Extract payment and reservation details from URL parameters
  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const reservationId = searchParams.get('reservation_id');
    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency');
    const listingTitle = searchParams.get('listing_title');
    const checkIn = searchParams.get('check_in');
    const checkOut = searchParams.get('check_out');

    if (paymentId || reservationId) {
      setReservationDetails({
        paymentId,
        reservationId,
        amount,
        currency: currency || 'USD',
        listingTitle: listingTitle || 'Your Reservation',
        checkIn,
        checkOut
      });
    }
  }, [searchParams]);

  const toggleLanguage = () => {
    const languages = ['en', 'ar', 'he'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const handleDone = () => {
    // Redirect to the main app or dashboard
    router.push('/dashboard');
  };

  const handleViewReservation = () => {
    if (reservationDetails?.reservationId) {
      router.push(`/dashboard/reservations/${reservationDetails.reservationId}`);
    } else {
      router.push('/dashboard/reservations');
    }
  };

  return (
    <div className={`${styles.container} ${(language === 'ar' || language === 'he') ? styles.rtl : styles.ltr}`}>
      <div className={styles.successCard}>
        {/* Header with Logo and Language Toggle */}
        <div className={styles.header}>
          <button 
            className={styles.languageToggle}
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            {t.toggleLanguage}
          </button>
        </div>

        {/* Success Icon */}
        <div className={styles.iconContainer}>
          <svg 
            className={styles.successIcon} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>
          {t.subtitle}
        </p>

        {/* Reservation Details */}
        {reservationDetails && (
          <div className={styles.detailsCard}>
            <h3 className={styles.detailsTitle}>{t.reservationDetails}</h3>
            
            {reservationDetails.listingTitle && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{t.property}</span>
                <span className={styles.detailValue}>{reservationDetails.listingTitle}</span>
              </div>
            )}
            
            {reservationDetails.checkIn && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{t.checkIn}</span>
                <span className={styles.detailValue}>
                  {new Date(reservationDetails.checkIn).toLocaleDateString(
                    language === 'ar' ? 'ar-EG' : language === 'he' ? 'he-IL' : 'en-US'
                  )}
                </span>
              </div>
            )}
            
            {reservationDetails.checkOut && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{t.checkOut}</span>
                <span className={styles.detailValue}>
                  {new Date(reservationDetails.checkOut).toLocaleDateString(
                    language === 'ar' ? 'ar-EG' : language === 'he' ? 'he-IL' : 'en-US'
                  )}
                </span>
              </div>
            )}
            
            {reservationDetails.amount && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{t.amountPaid}</span>
                <span className={styles.detailValue}>
                  {reservationDetails.currency} {reservationDetails.amount}
                </span>
              </div>
            )}
            
            {reservationDetails.reservationId && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{t.reservationId}</span>
                <span className={styles.detailValue}>{reservationDetails.reservationId}</span>
              </div>
            )}
            
            {reservationDetails.paymentId && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{t.paymentId}</span>
                <span className={styles.detailValue}>{reservationDetails.paymentId}</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.buttonContainer}>
          {reservationDetails?.reservationId && (
            <button 
              className={styles.secondaryButton}
              onClick={handleViewReservation}
            >
              {t.viewReservation}
            </button>
          )}
          
          <button 
            className={styles.primaryButton}
            onClick={handleDone}
          >
            {t.done}
          </button>
        </div>

        {/* Additional Information */}
        {/* <div className={styles.infoSection}>
          <p className={styles.infoText}>
            {t.confirmationEmail}
          </p>
          <p className={styles.infoText}>
            {t.supportContact}
          </p>
        </div> */}
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function PaymentSuccessLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.iconContainer}>
          <div className={styles.loadingSpinner}></div>
        </div>
        <h1 className={styles.title}>Loading...</h1>
        <p className={styles.subtitle}>Please wait while we load your payment details.</p>
      </div>
    </div>
  );
}

// Main export component with Suspense boundary
export default function PaymentSuccess() {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}