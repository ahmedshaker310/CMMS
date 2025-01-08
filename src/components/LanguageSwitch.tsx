import { Button } from './ui/button';
import { useI18nStore } from '../lib/i18n';

export function LanguageSwitch() {
  const { language, setLanguage } = useI18nStore();

  return (
    <Button
      variant="ghost"
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
    >
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
}