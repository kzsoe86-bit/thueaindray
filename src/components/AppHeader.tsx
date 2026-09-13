import { ArrowLeft } from 'lucide-react';
import { Brand } from './Brand';

export function AppHeader({ onBack, compact = false }: { onBack?: () => void; compact?: boolean }) {
  return <header className={`app-header ${compact ? 'app-header--compact' : ''}`}>
    {onBack ? <button className="icon-button" onClick={onBack} aria-label="နောက်သို့"><ArrowLeft size={22} /></button> : <Brand />}
    {onBack && <Brand />}
    <div className="level-pill">P1 <span>သင်ယူခန်း</span></div>
  </header>;
}
