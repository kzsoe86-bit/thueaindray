import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import type { Subject } from '../data/content';
import type { Language } from '../types';

export function SubjectCard({ subject, onOpen, language }: { subject: Subject; onOpen: () => void; language: Language }) {
  return <button className={`subject-card ${!subject.active ? 'is-locked' : ''}`} style={{ '--card-color': subject.color } as React.CSSProperties} onClick={onOpen} disabled={!subject.active}>
    <span className="subject-card__icon">{subject.icon}</span>
    <span><strong>{language === 'en' ? subject.enName : subject.myName}</strong><small>{language === 'en' ? subject.enSubtitle : subject.mySubtitle}</small></span>
    <span className="subject-card__action">{subject.active ? <ArrowUpRight size={21} /> : <LockKeyhole size={16} />}</span>
  </button>;
}
