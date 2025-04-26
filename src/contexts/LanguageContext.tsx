import React, { createContext, useContext, useState } from 'react';

type TranslationKey = 
  | 'features.title'
  | 'features.subtitle'
  | 'features.aiSummarization.title'
  | 'features.aiSummarization.description'
  | 'features.examPrep.title'
  | 'features.examPrep.description'
  | 'features.studyPlans.title'
  | 'features.studyPlans.description'
  | 'features.smartQuizzes.title'
  | 'features.smartQuizzes.description';

interface LanguageContextType {
  t: (key: TranslationKey) => string;
  currentLanguage: string;
  setLanguage: (lang: string) => void;
}

type Translations = {
  [key: string]: {
    [K in TranslationKey]: string;
  };
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Translations = {
  en: {
    'features.title': 'Key Features',
    'features.subtitle': 'Our AI-powered platform helps you study more efficiently and effectively',
    'features.aiSummarization.title': 'AI Summarization',
    'features.aiSummarization.description': 'Convert PDFs, videos, and podcasts into concise, easy-to-understand summaries.',
    'features.examPrep.title': 'Exam Prep',
    'features.examPrep.description': 'Practice with DTM & IELTS mock tests and quizzes tailored to your needs.',
    'features.studyPlans.title': 'AI Study Plans',
    'features.studyPlans.description': 'Get personalized study schedules based on your goals and learning pace.',
    'features.smartQuizzes.title': 'Smart Quizzes',
    'features.smartQuizzes.description': 'Adaptive quizzes that adjust to your learning progress and focus on weak areas.'
  },
  ru: {
    'features.title': 'Ключевые возможности',
    'features.subtitle': 'Наша платформа с ИИ помогает учиться более эффективно',
    'features.aiSummarization.title': 'ИИ-Суммаризация',
    'features.aiSummarization.description': 'Преобразуйте PDF, видео и подкасты в краткие, понятные резюме.',
    'features.examPrep.title': 'Подготовка к экзаменам',
    'features.examPrep.description': 'Практикуйтесь с пробными тестами DTM и IELTS, адаптированными под ваши потребности.',
    'features.studyPlans.title': 'ИИ-Планы обучения',
    'features.studyPlans.description': 'Получайте персонализированные расписания занятий на основе ваших целей и темпа обучения.',
    'features.smartQuizzes.title': 'Умные тесты',
    'features.smartQuizzes.description': 'Адаптивные тесты, которые подстраиваются под ваш прогресс и фокусируются на слабых местах.'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage]?.[key] || key;
  };

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ t, currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 