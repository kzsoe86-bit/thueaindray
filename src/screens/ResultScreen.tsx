import { ArrowRight, Home, RotateCcw, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import type { LetterLesson } from '../data/content';
import { AppHeader } from '../components/AppHeader';
import type { Language } from '../types';

export function ResultScreen({ nickname, lesson, completed, onNext, onAgain, onHome, language, onLanguageChange }: { nickname: string; lesson: LetterLesson; completed: number; onNext: () => void; onAgain: () => void; onHome: () => void; language: Language; onLanguageChange: (language: Language) => void }) {
  const en = language === 'en';
  return <main className="result-screen"><div className="result-language"><AppHeader compact language={language} onLanguageChange={onLanguageChange}/></div><div className="confetti" aria-hidden="true">✦ <i>●</i> ◆ <i>▲</i> ✦</div><section className="result-card">
    <div className="result-badge"><Star fill="currentColor"/>✓</div><span className="eyebrow">{en ? 'Great work!' : 'ကောင်းကောင်း လုပ်နိုင်ခဲ့တယ်!'}</span><h1>{en ? `Well done, ${nickname}! 🎉` : `တော်လိုက်တာ၊ ${nickname} ရေ! 🎉`}</h1><p><strong>{lesson.upper} {lesson.lower}</strong> {en ? 'practice completed successfully.' : 'ကို အောင်မြင်စွာ လေ့ကျင့်ပြီးပါပြီ။'}</p>
    <div className="completed-letter"><span>{lesson.emoji}</span><strong>{lesson.upper}</strong><small>{lesson.word}</small><b>{en ? 'Done' : 'ပြီးပါပြီ'} ✓</b></div><ProgressBar value={completed} max={26} language={language} label={en ? 'A–Z Progress' : 'A–Z တိုးတက်မှု'}/>
    <div className="result-actions"><Button onClick={onNext}>{en ? 'Next letter' : 'နောက်အက္ခရာ ဆက်သွားမယ်'} <ArrowRight size={20}/></Button><Button variant="secondary" onClick={onAgain}><RotateCcw size={18}/> {en ? 'Write again' : 'ထပ်ရေးမယ်'}</Button></div>
    <button className="home-link" onClick={onHome}><Home size={17}/> {en ? 'Back to home' : 'ပင်မစာမျက်နှာသို့'}</button>
  </section></main>;
}
