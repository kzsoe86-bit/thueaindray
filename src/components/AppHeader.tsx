import { ArrowLeft } from 'lucide-react';
import { Brand } from './Brand';
import { LanguageSwitch } from './LanguageSwitch';
import type { Language } from '../types';

export function AppHeader({ onBack, compact = false, language, onLanguageChange }: { onBack?: () => void; compact?: boolean; language: Language; onLanguageChange: (language: Language) => void }) {
  return <header className={`app-header ${compact ? 'app-header--compact' : ''}`}>
    {onBack ? <button className="icon-button" onClick={onBack} aria-label={language === 'en' ? 'Back' : 'နောက်သို့'}><ArrowLeft size={22} /></button> : <Brand />}
    {onBack && <Brand />}
    <div className="header-actions"><LanguageSwitch language={language} onChange={onLanguageChange}/><div className="level-pill">P1 <span>{language === 'en' ? 'Learning' : 'သင်ယူခန်း'}</span></div></div>
  </header>;
}
