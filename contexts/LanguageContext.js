'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language translations for authentication pages
const translations = {
  ar: {
    // Common
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    name: 'الاسم',
    phone: 'رقم الهاتف',
    submit: 'إرسال',
    cancel: 'إلغاء',
    back: 'رجوع',
    continue: 'متابعة',
    
    // Register page
    register: {
      title: 'إنشاء حساب',
      subtitle: 'انضم إلى Click لبدء الحجوزات',
      createAccount: 'إنشاء حساب',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      signIn: 'تسجيل الدخول',
      nameRequired: 'الاسم مطلوب',
      emailRequired: 'البريد الإلكتروني مطلوب',
      emailInvalid: 'البريد الإلكتروني غير صحيح',
      phoneRequired: 'رقم الهاتف مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
      passwordMinLength: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
      confirmPasswordRequired: 'تأكيد كلمة المرور مطلوب',
      passwordsNotMatch: 'كلمات المرور غير متطابقة',
      namePlaceholder: 'أدخل اسمك الكامل',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      phonePlaceholder: 'أدخل رقم هاتفك',
      passwordPlaceholder: 'أدخل كلمة المرور',
      confirmPasswordPlaceholder: 'أكد كلمة المرور'
    },
    
    // Login page
    login: {
      title: 'مرحباً بعودتك',
      subtitle: 'سجل الدخول إلى حساب Click الخاص بك',
      signIn: 'تسجيل الدخول',
      emailOrPhone: 'البريد الإلكتروني أو رقم الهاتف',
      identifierRequired: 'البريد الإلكتروني أو رقم الهاتف مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
      forgotPassword: 'نسيت كلمة المرور؟',
      noAccount: 'ليس لديك حساب؟',
      createAccount: 'إنشاء حساب',
      identifierPlaceholder: 'أدخل بريدك الإلكتروني أو رقم الهاتف',
      passwordPlaceholder: 'أدخل كلمة المرور'
    },
    
    // Verify Email page
    verifyEmail: {
      title: 'تحقق من البريد الإلكتروني',
      verifying: 'جاري التحقق من بريدك الإلكتروني...',
      success: 'تم التحقق بنجاح!',
      successMessage: 'تم التحقق من بريدك الإلكتروني بنجاح. يمكنك الآن تسجيل الدخول.',
      error: 'فشل التحقق',
      expired: 'انتهت صلاحية الرابط',
      expiredMessage: 'انتهت صلاحية رابط التحقق. يرجى طلب رابط جديد.',
      invalidToken: 'رابط تحقق غير صالح',
      resendVerification: 'إعادة إرسال التحقق',
      goToLogin: 'الذهاب لتسجيل الدخول',
      backToRegister: 'العودة للتسجيل'
    },
    
    // Verify Pending page
    verifyPending: {
      title: 'تحقق من بريدك الإلكتروني',
      subtitle: 'لقد أرسلنا رابط تحقق إلى بريدك الإلكتروني',
      message: 'يرجى فتح بريدك الإلكتروني والنقر على رابط التحقق لتفعيل حسابك.',
      checkSpam: 'إذا لم تجد الرسالة، تحقق من مجلد الرسائل غير المرغوب فيها.',
      didntReceive: 'لم تستلم الرسالة؟',
      resendEmail: 'إعادة إرسال الرسالة',
      resendCooldown: 'يمكنك إعادة الإرسال خلال {seconds} ثانية',
      backToRegister: 'العودة للتسجيل',
      emailSent: 'تم إرسال رسالة التحقق! يرجى فحص صندوق الوارد.',
      resendError: 'فشل في إعادة إرسال الرسالة. يرجى المحاولة مرة أخرى.'
    },
    
    // Language toggle
    toggleLanguage: 'English / עברית'
  },
  
  en: {
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Name',
    phone: 'Phone',
    submit: 'Submit',
    cancel: 'Cancel',
    back: 'Back',
    continue: 'Continue',
    
    // Register page
    register: {
      title: 'Create Account',
      subtitle: 'Join Click to start making reservations',
      createAccount: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign In',
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email address',
      phoneRequired: 'Phone number is required',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters',
      confirmPasswordRequired: 'Confirm password is required',
      passwordsNotMatch: 'Passwords do not match',
      namePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email',
      phonePlaceholder: 'Enter your phone number',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordPlaceholder: 'Confirm your password'
    },
    
    // Login page
    login: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your Click account',
      signIn: 'Sign In',
      emailOrPhone: 'Email or Phone',
      identifierRequired: 'Email or phone is required',
      passwordRequired: 'Password is required',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      createAccount: 'Create Account',
      identifierPlaceholder: 'Enter your email or phone',
      passwordPlaceholder: 'Enter your password'
    },
    
    // Verify Email page
    verifyEmail: {
      title: 'Verify Email',
      verifying: 'Verifying your email...',
      success: 'Verification Successful!',
      successMessage: 'Your email has been verified successfully. You can now sign in.',
      error: 'Verification Failed',
      expired: 'Link Expired',
      expiredMessage: 'The verification link has expired. Please request a new one.',
      invalidToken: 'Invalid verification link',
      resendVerification: 'Resend Verification',
      goToLogin: 'Go to Login',
      backToRegister: 'Back to Register'
    },
    
    // Verify Pending page
    verifyPending: {
      title: 'Check Your Email',
      subtitle: 'We sent a verification link to your email',
      message: 'Please open your email and click the verification link to activate your account.',
      checkSpam: "If you don't see the email, check your spam folder.",
      didntReceive: "Didn't receive the email?",
      resendEmail: 'Resend Email',
      resendCooldown: 'You can resend in {seconds} seconds',
      backToRegister: 'Back to Register',
      emailSent: 'Verification email sent! Please check your inbox.',
      resendError: 'Failed to resend email. Please try again.'
    },
    
    // Language toggle
    toggleLanguage: 'عربي / עברית'
  },
  
  he: {
    // Common
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    email: 'אימייל',
    password: 'סיסמה',
    confirmPassword: 'אישור סיסמה',
    name: 'שם',
    phone: 'טלפון',
    submit: 'שלח',
    cancel: 'ביטול',
    back: 'חזור',
    continue: 'המשך',
    
    // Register page
    register: {
      title: 'יצירת חשבון',
      subtitle: 'הצטרף ל-Click כדי להתחיל לבצע הזמנות',
      createAccount: 'יצירת חשבון',
      alreadyHaveAccount: 'כבר יש לך חשבון?',
      signIn: 'התחברות',
      nameRequired: 'שם נדרש',
      emailRequired: 'אימייל נדרש',
      emailInvalid: 'כתובת אימייל לא תקינה',
      phoneRequired: 'מספר טלפון נדרש',
      passwordRequired: 'סיסמה נדרשת',
      passwordMinLength: 'הסיסמה חייבת להכיל לפחות 6 תווים',
      confirmPasswordRequired: 'אישור סיסמה נדרש',
      passwordsNotMatch: 'הסיסמאות אינן תואמות',
      namePlaceholder: 'הכנס את שמך המלא',
      emailPlaceholder: 'הכנס את האימייל שלך',
      phonePlaceholder: 'הכנס את מספר הטלפון שלך',
      passwordPlaceholder: 'הכנס את הסיסמה שלך',
      confirmPasswordPlaceholder: 'אשר את הסיסמה שלך'
    },
    
    // Login page
    login: {
      title: 'ברוך שובך',
      subtitle: 'התחבר לחשבון Click שלך',
      signIn: 'התחברות',
      emailOrPhone: 'אימייל או טלפון',
      identifierRequired: 'אימייל או טלפון נדרש',
      passwordRequired: 'סיסמה נדרשת',
      forgotPassword: 'שכחת סיסמה?',
      noAccount: 'אין לך חשבון?',
      createAccount: 'יצירת חשבון',
      identifierPlaceholder: 'הכנס אימייל או טלפון',
      passwordPlaceholder: 'הכנס את הסיסמה שלך'
    },
    
    // Verify Email page
    verifyEmail: {
      title: 'אימות אימייל',
      verifying: 'מאמת את האימייל שלך...',
      success: 'האימות הצליח!',
      successMessage: 'האימייל שלך אומת בהצלחה. כעת תוכל להתחבר.',
      error: 'האימות נכשל',
      expired: 'הקישור פג',
      expiredMessage: 'קישור האימות פג תוקף. אנא בקש קישור חדש.',
      invalidToken: 'קישור אימות לא תקין',
      resendVerification: 'שלח אימות מחדש',
      goToLogin: 'עבור להתחברות',
      backToRegister: 'חזור להרשמה'
    },
    
    // Verify Pending page
    verifyPending: {
      title: 'בדוק את האימייל שלך',
      subtitle: 'שלחנו קישור אימות לאימייל שלך',
      message: 'אנא פתח את האימייל שלך ולחץ על קישור האימות כדי להפעיל את החשבון שלך.',
      checkSpam: 'אם אינך רואה את האימייל, בדוק את תיקיית הספאם.',
      didntReceive: 'לא קיבלת את האימייל?',
      resendEmail: 'שלח אימייל מחדש',
      resendCooldown: 'תוכל לשלוח מחדש בעוד {seconds} שניות',
      backToRegister: 'חזור להרשמה',
      emailSent: 'אימייל אימות נשלח! אנא בדוק את תיבת הדואר שלך.',
      resendError: 'נכשל בשליחת האימייל מחדש. אנא נסה שוב.'
    },
    
    // Language toggle
    toggleLanguage: 'English / عربي'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar'); // Default to Arabic

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['ar', 'en', 'he'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language);
    
    // Set document direction and language
    document.documentElement.dir = language === 'ar' || language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const languages = ['ar', 'en', 'he'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const t = translations[language];

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isRTL: language === 'ar' || language === 'he'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};