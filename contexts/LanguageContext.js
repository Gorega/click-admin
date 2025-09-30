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
      pleaseWait: 'يرجى الانتظار...',
      verified: 'تم التحقق بنجاح!',
      verifiedSuccessfully: 'تم التحقق من بريدك الإلكتروني بنجاح.',
      welcomeToClick: 'مرحباً بك في Click',
      accountActive: 'حسابك الآن نشط ويمكنك البدء في استخدام جميع الميزات.',
      continueToLogin: 'متابعة إلى تسجيل الدخول',
      linkExpired: 'انتهت صلاحية الرابط',
      linkExpiredTitle: 'انتهت صلاحية رابط التحقق',
      linkExpiredText: 'انتهت صلاحية رابط التحقق. يرجى طلب رابط جديد للمتابعة.',
      requestNewLink: 'طلب رابط جديد',
      sending: 'جاري الإرسال...',
      backToRegistration: 'العودة للتسجيل',
      alreadyVerified: 'تم التحقق بالفعل؟ سجل الدخول',
      verificationFailed: 'فشل التحقق',
      somethingWentWrong: 'حدث خطأ ما',
      verificationErrorText: 'حدث خطأ أثناء التحقق من بريدك الإلكتروني. يرجى المحاولة مرة أخرى.',
      tryToSignIn: 'محاولة تسجيل الدخول',
      enterEmailPrompt: 'يرجى إدخال بريدك الإلكتروني:'
    },
    
    // Verify Pending page
    verifyPending: {
      checkYourEmail: 'تحقق من بريدك الإلكتروني',
      sentVerificationLink: 'لقد أرسلنا رابط تحقق إلى',
      step1Title: 'افتح بريدك الإلكتروني',
      step1Text: 'ابحث عن رسالة من Click في صندوق الوارد الخاص بك.',
      step2Title: 'انقر على رابط التحقق',
      step2Text: 'انقر على الزر أو الرابط الموجود في الرسالة لتأكيد بريدك الإلكتروني.',
      step3Title: 'ابدأ في استخدام Click',
      step3Text: 'بمجرد التحقق، ستتمكن من تسجيل الدخول والبدء في الحجز.',
      didntReceiveEmail: 'لم تستلم الرسالة؟',
      resendEmail: 'إعادة إرسال الرسالة',
      resendIn: 'إعادة الإرسال خلال',
      sending: 'جاري الإرسال...',
      checkSpamTitle: 'تحقق من مجلد الرسائل غير المرغوب فيها',
      checkSpamText: 'أحياناً تصل رسائل التحقق إلى مجلد الرسائل غير المرغوب فيها أو الإعلانات.',
      alreadyVerifiedTitle: 'تم التحقق بالفعل؟',
      alreadyVerifiedText: 'إذا كنت قد تحققت من بريدك الإلكتروني بالفعل، يمكنك',
      signInHere: 'تسجيل الدخول هنا',
      backToRegistration: 'العودة للتسجيل'
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
      pleaseWait: 'Please wait...',
      verified: 'Verification Successful!',
      verifiedSuccessfully: 'Your email has been verified successfully.',
      welcomeToClick: 'Welcome to Click',
      accountActive: 'Your account is now active and you can start using all features.',
      continueToLogin: 'Continue to Login',
      linkExpired: 'Link Expired',
      linkExpiredTitle: 'Verification Link Expired',
      linkExpiredText: 'The verification link has expired. Please request a new link to continue.',
      requestNewLink: 'Request New Link',
      sending: 'Sending...',
      backToRegistration: 'Back to Registration',
      alreadyVerified: 'Already verified? Sign in',
      verificationFailed: 'Verification Failed',
      somethingWentWrong: 'Something went wrong',
      verificationErrorText: 'An error occurred while verifying your email. Please try again.',
      tryToSignIn: 'Try to Sign In',
      enterEmailPrompt: 'Please enter your email address:'
    },
    
    // Verify Pending page
    verifyPending: {
      checkYourEmail: 'Check Your Email',
      sentVerificationLink: 'We sent a verification link to',
      step1Title: 'Open your email',
      step1Text: 'Look for an email from Click in your inbox.',
      step2Title: 'Click the verification link',
      step2Text: 'Click the button or link in the email to confirm your email address.',
      step3Title: 'Start using Click',
      step3Text: 'Once verified, you\'ll be able to sign in and start booking.',
      didntReceiveEmail: 'Didn\'t receive the email?',
      resendEmail: 'Resend Email',
      resendIn: 'Resend in',
      sending: 'Sending...',
      checkSpamTitle: 'Check your spam folder',
      checkSpamText: 'Sometimes verification emails end up in spam or promotions folders.',
      alreadyVerifiedTitle: 'Already verified?',
      alreadyVerifiedText: 'If you\'ve already verified your email, you can',
      signInHere: 'sign in here',
      backToRegistration: 'Back to Registration'
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
      pleaseWait: 'אנא המתן...',
      verified: 'האימות הצליח!',
      verifiedSuccessfully: 'האימייל שלך אומת בהצלחה.',
      welcomeToClick: 'ברוך הבא ל-Click',
      accountActive: 'החשבון שלך כעת פעיל ותוכל להתחיל להשתמש בכל התכונות.',
      continueToLogin: 'המשך להתחברות',
      linkExpired: 'הקישור פג',
      linkExpiredTitle: 'קישור האימות פג תוקף',
      linkExpiredText: 'קישור האימות פג תוקף. אנא בקש קישור חדש כדי להמשיך.',
      requestNewLink: 'בקש קישור חדש',
      sending: 'שולח...',
      backToRegistration: 'חזור להרשמה',
      alreadyVerified: 'כבר אומת? התחבר',
      verificationFailed: 'האימות נכשל',
      somethingWentWrong: 'משהו השתבש',
      verificationErrorText: 'אירעה שגיאה בעת אימות האימייל שלך. אנא נסה שוב.',
      tryToSignIn: 'נסה להתחבר',
      enterEmailPrompt: 'אנא הכנס את כתובת האימייל שלך:'
    },
    
    // Verify Pending page
    verifyPending: {
      checkYourEmail: 'בדוק את האימייל שלך',
      sentVerificationLink: 'שלחנו קישור אימות אל',
      step1Title: 'פתח את האימייל שלך',
      step1Text: 'חפש הודעה מ-Click בתיבת הדואר הנכנס שלך.',
      step2Title: 'לחץ על קישור האימות',
      step2Text: 'לחץ על הכפתור או הקישור בהודעה כדי לאשר את כתובת האימייל שלך.',
      step3Title: 'התחל להשתמש ב-Click',
      step3Text: 'לאחר האימות, תוכל להתחבר ולהתחיל להזמין.',
      didntReceiveEmail: 'לא קיבלת את האימייל?',
      resendEmail: 'שלח אימייל מחדש',
      resendIn: 'שלח מחדש בעוד',
      sending: 'שולח...',
      checkSpamTitle: 'בדוק את תיקיית הספאם',
      checkSpamText: 'לפעמים הודעות אימות מגיעות לתיקיית הספאם או הפרסומות.',
      alreadyVerifiedTitle: 'כבר אומת?',
      alreadyVerifiedText: 'אם כבר אימתת את האימייל שלך, תוכל',
      signInHere: 'להתחבר כאן',
      backToRegistration: 'חזור להרשמה'
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