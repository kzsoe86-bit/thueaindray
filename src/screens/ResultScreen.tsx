import { ArrowRight, Home, RotateCcw, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import type { LetterLesson } from '../data/content';

export function ResultScreen({ nickname, lesson, completed, onNext, onAgain, onHome }: { nickname: string; lesson: LetterLesson; completed: number; onNext: () => void; onAgain: () => void; onHome: () => void }) {
  return <main className="result-screen"><div className="confetti" aria-hidden="true">✦ <i>●</i> ◆ <i>▲</i> ✦</div><section className="result-card">
    <div className="result-badge"><Star fill="currentColor"/>✓</div><span className="eyebrow">ကောင်းကောင်း လုပ်နိုင်ခဲ့တယ်!</span><h1>တော်လိုက်တာ၊ {nickname} ရေ! 🎉</h1><p><strong>{lesson.upper} {lesson.lower}</strong> ကို အောင်မြင်စွာ လေ့ကျင့်ပြီးပါပြီ။</p>
    <div className="completed-letter"><span>{lesson.emoji}</span><strong>{lesson.upper}</strong><small>{lesson.word}</small><b>ပြီးပါပြီ ✓</b></div><ProgressBar value={completed} max={26} label="A–Z တိုးတက်မှု"/>
    <div className="result-actions"><Button onClick={onNext}>နောက်အက္ခရာ ဆက်သွားမယ် <ArrowRight size={20}/></Button><Button variant="secondary" onClick={onAgain}><RotateCcw size={18}/> ထပ်ရေးမယ်</Button></div>
    <button className="home-link" onClick={onHome}><Home size={17}/> ပင်မစာမျက်နှာသို့</button>
  </section></main>;
}
