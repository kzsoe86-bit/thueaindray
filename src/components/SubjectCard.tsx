import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import type { Subject } from '../data/content';

export function SubjectCard({ subject, onOpen }: { subject: Subject; onOpen: () => void }) {
  return <button className={`subject-card ${!subject.active ? 'is-locked' : ''}`} style={{ '--card-color': subject.color } as React.CSSProperties} onClick={onOpen} disabled={!subject.active}>
    <span className="subject-card__icon">{subject.icon}</span>
    <span><strong>{subject.name}</strong><small>{subject.subtitle}</small></span>
    <span className="subject-card__action">{subject.active ? <ArrowUpRight size={21} /> : <LockKeyhole size={16} />}</span>
  </button>;
}
