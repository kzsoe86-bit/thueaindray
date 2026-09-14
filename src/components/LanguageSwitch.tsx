import { Languages } from 'lucide-react';
import type { Language } from '../types';

export function LanguageSwitch({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return <div className="language-switch" aria-label="Language / ဘာသာစကား">
    <Languages size={17} aria-hidden="true" />
    <button className={language === 'en' ? 'active' : ''} onClick={() => onChange('en')} aria-pressed={language === 'en'}>EN</button>
    <button className={language === 'my' ? 'active' : ''} onClick={() => onChange('my')} aria-pressed={language === 'my'}>မြန်မာ</button>
  </div>;
}
