import type { Language } from '../types';
export function ProgressBar({ value, max, label, language = 'my' }: { value: number; max: number; label?: string; language?: Language }) {
  const percent = max ? Math.round(value / max * 100) : 0;
  return <div className="progress-wrap" aria-label={label || (language === 'en' ? `${percent}% complete` : `ပြီးစီးမှု ${percent}%`)}>
    <div className="progress-meta"><span>{label || (language === 'en' ? 'Completed' : 'လေ့ကျင့်ပြီး')}</span><strong>{value} / {max}</strong></div>
    <div className="progress"><span style={{ width: `${percent}%` }} /></div>
  </div>;
}
