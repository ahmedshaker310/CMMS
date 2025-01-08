import { create } from 'zustand';

type Language = 'en' | 'ar';

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useI18nStore = create<I18nStore>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
}));

export const getDirection = (language: Language) => {
  return language === 'ar' ? 'rtl' : 'ltr';
};