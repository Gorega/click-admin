'use client';

import { useState } from 'react';
import styles from './policy.module.css';

const translations = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: January 2024',
    introduction: {
      title: 'Introduction',
      content: 'Welcome to Click Reserve App. This privacy policy explains how we collect, use, and protect your personal information when you use our local reservation service in the West Bank.'
    },
    dataCollection: {
      title: 'Information We Collect',
      content: 'We collect only the essential information needed to provide our reservation services:',
      items: [
        'Name and contact information (phone number, email if provided)',
        'Reservation details (dates, times, preferences)',
        'Location data only when using map features to find venues',
        'Basic app usage information to improve our service'
      ]
    },
    googleData: {
      title: 'Google Maps Usage',
      content: 'We use Google Maps solely to display venue locations and help you navigate:',
      items: [
        'Google Maps API: Only for showing venue locations on the map',
        'Location services: Only when you actively use the map feature'
      ],
      note: 'We do not use any other Google services. Google Maps may collect location data as described in Google\'s Privacy Policy when you use the map feature.'
    },
    dataUsage: {
      title: 'How We Use Your Information',
      content: 'We use your information only for:',
      items: [
        'Processing and managing your reservations',
        'Contacting you about your bookings',
        'Showing you venue locations on the map',
        'Improving our app based on usage patterns'
      ]
    },
    dataSharing: {
      title: 'Information Sharing',
      content: 'We do not sell or share your personal information. We only share data:',
      items: [
        'With venue owners when you make a reservation (name and contact info only)',
        'When required by Palestinian law',
        'With Google Maps only for location display purposes'
      ]
    },
    dataSecurity: {
      title: 'Data Security',
      content: 'We protect your information using standard security measures. Your data is stored securely and we do not keep unnecessary information longer than needed for reservations.'
    },
    userRights: {
      title: 'Your Rights',
      content: 'You can:',
      items: [
        'Request to see what information we have about you',
        'Ask us to correct wrong information',
        'Request deletion of your data',
        'Stop using our app at any time'
      ]
    },
    contact: {
      title: 'Contact Us',
      content: 'For questions about this privacy policy or your data:',
      email: 'support@clickreserve.ps',
      address: 'Click Reserve, West Bank, Palestine'
    },
    toggleLanguage: 'عربي'
  },
  ar: {
    title: 'سياسة الخصوصية',
    lastUpdated: 'آخر تحديث: يناير 2024',
    introduction: {
      title: 'مقدمة',
      content: 'مرحباً بك في تطبيق كليك للحجوزات. تشرح سياسة الخصوصية هذه كيف نجمع ونستخدم ونحمي معلوماتك الشخصية عند استخدام خدمة الحجوزات المحلية في الضفة الغربية.'
    },
    dataCollection: {
      title: 'المعلومات التي نجمعها',
      content: 'نجمع فقط المعلومات الأساسية اللازمة لتقديم خدمات الحجز:',
      items: [
        'الاسم ومعلومات الاتصال (رقم الهاتف، البريد الإلكتروني إذا تم توفيره)',
        'تفاصيل الحجز (التواريخ، الأوقات، التفضيلات)',
        'بيانات الموقع فقط عند استخدام ميزة الخريطة للعثور على الأماكن',
        'معلومات أساسية عن استخدام التطبيق لتحسين خدمتنا'
      ]
    },
    googleData: {
      title: 'استخدام خرائط جوجل',
      content: 'نستخدم خرائط جوجل فقط لعرض مواقع الأماكن ومساعدتك في التنقل:',
      items: [
        'واجهة برمجة تطبيقات خرائط جوجل: فقط لعرض مواقع الأماكن على الخريطة',
        'خدمات الموقع: فقط عند استخدام ميزة الخريطة بشكل نشط'
      ],
      note: 'لا نستخدم أي خدمات أخرى من جوجل. قد تجمع خرائط جوجل بيانات الموقع كما هو موضح في سياسة خصوصية جوجل عند استخدام ميزة الخريطة.'
    },
    dataUsage: {
      title: 'كيف نستخدم معلوماتك',
      content: 'نستخدم معلوماتك فقط من أجل:',
      items: [
        'معالجة وإدارة حجوزاتك',
        'التواصل معك بخصوص حجوزاتك',
        'عرض مواقع الأماكن على الخريطة',
        'تحسين تطبيقنا بناءً على أنماط الاستخدام'
      ]
    },
    dataSharing: {
      title: 'مشاركة المعلومات',
      content: 'لا نبيع أو نشارك معلوماتك الشخصية. نشارك البيانات فقط:',
      items: [
        'مع أصحاب الأماكن عند القيام بحجز (الاسم ومعلومات الاتصال فقط)',
        'عندما يتطلب القانون الفلسطيني ذلك',
        'مع خرائط جوجل فقط لأغراض عرض المواقع'
      ]
    },
    dataSecurity: {
      title: 'أمان البيانات',
      content: 'نحمي معلوماتك باستخدام تدابير أمنية معيارية. يتم تخزين بياناتك بشكل آمن ولا نحتفظ بمعلومات غير ضرورية لفترة أطول من اللازم للحجوزات.'
    },
    userRights: {
      title: 'حقوقك',
      content: 'يمكنك:',
      items: [
        'طلب رؤية المعلومات التي لدينا عنك',
        'طلب تصحيح المعلومات الخاطئة',
        'طلب حذف بياناتك',
        'التوقف عن استخدام تطبيقنا في أي وقت'
      ]
    },
    contact: {
      title: 'اتصل بنا',
      content: 'للأسئلة حول سياسة الخصوصية هذه أو بياناتك:',
      email: 'goregaclick@gmail.com',
      address: 'كليك للحجوزات، الضفة الغربية، فلسطين'
    },
    toggleLanguage: 'English'
  }
};

export default function PolicyPage() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className={`${styles.container} ${language === 'ar' ? styles.rtl : styles.ltr}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.title}</h1>
        <button 
          className={styles.languageToggle}
          onClick={toggleLanguage}
          aria-label="Toggle language"
        >
          {t.toggleLanguage}
        </button>
      </div>
      
      <div className={styles.content}>
        <p className={styles.lastUpdated}>{t.lastUpdated}</p>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.introduction.title}</h2>
          <p className={styles.sectionContent}>{t.introduction.content}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.dataCollection.title}</h2>
          <p className={styles.sectionContent}>{t.dataCollection.content}</p>
          <ul className={styles.list}>
            {t.dataCollection.items.map((item, index) => (
              <li key={index} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.googleData.title}</h2>
          <p className={styles.sectionContent}>{t.googleData.content}</p>
          <ul className={styles.list}>
            {t.googleData.items.map((item, index) => (
              <li key={index} className={styles.listItem}>{item}</li>
            ))}
          </ul>
          <div className={styles.note}>
            <p>{t.googleData.note}</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.dataUsage.title}</h2>
          <p className={styles.sectionContent}>{t.dataUsage.content}</p>
          <ul className={styles.list}>
            {t.dataUsage.items.map((item, index) => (
              <li key={index} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.dataSharing.title}</h2>
          <p className={styles.sectionContent}>{t.dataSharing.content}</p>
          <ul className={styles.list}>
            {t.dataSharing.items.map((item, index) => (
              <li key={index} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.dataSecurity.title}</h2>
          <p className={styles.sectionContent}>{t.dataSecurity.content}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.userRights.title}</h2>
          <p className={styles.sectionContent}>{t.userRights.content}</p>
          <ul className={styles.list}>
            {t.userRights.items.map((item, index) => (
              <li key={index} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.contact.title}</h2>
          <p className={styles.sectionContent}>{t.contact.content}</p>
          <div className={styles.contactInfo}>
            <p className={styles.contactItem}>
              <strong>Email:</strong> {t.contact.email}
            </p>
            <p className={styles.contactItem}>
              <strong>Address:</strong> {t.contact.address}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}