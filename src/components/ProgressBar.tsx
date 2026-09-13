export function ProgressBar({ value, max, label }: { value: number; max: number; label?: string }) {
  const percent = max ? Math.round(value / max * 100) : 0;
  return <div className="progress-wrap" aria-label={label || `ပြီးစီးမှု ${percent}%`}>
    <div className="progress-meta"><span>{label || 'လေ့ကျင့်ပြီး'}</span><strong>{value} / {max}</strong></div>
    <div className="progress"><span style={{ width: `${percent}%` }} /></div>
  </div>;
}
