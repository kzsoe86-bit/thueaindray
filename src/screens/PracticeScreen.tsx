import { AppHeader } from '../components/AppHeader';
import { DrawingCanvas } from '../components/DrawingCanvas';
import { ProgressBar } from '../components/ProgressBar';
import type { LetterLesson } from '../data/content';
import type { Language } from '../types';
import { StrokeGuide } from '../components/StrokeGuide';

export function PracticeScreen({ nickname, lesson, index, completed, onBack, onDone, language, onLanguageChange }: { nickname: string; lesson: LetterLesson; index: number; completed: number; onBack: () => void; onDone: () => void; language: Language; onLanguageChange: (language: Language) => void }) {
  const en = language === 'en';
  return <main className="inner-screen practice-screen"><AppHeader onBack={onBack} compact language={language} onLanguageChange={onLanguageChange}/>
    <div className="practice-top"><div><span className="step-label">English · {en ? 'A–Z Handwriting' : 'A–Z လက်ရေး'}</span><h1>{en ? <>{nickname}, let’s write <em>{lesson.upper}</em>!</> : <>{nickname} ရေ၊ <em>{lesson.upper}</em> ရေးကြည့်ရအောင်!</>}</h1></div><ProgressBar value={completed} max={26} language={language}/></div>
    <section className="practice-layout">
      <aside className="lesson-card"><span className="lesson-number">{en ? 'Letter' : 'အက္ခရာ'} {index + 1} / 26</span><div className="letter-display"><strong>{lesson.upper}</strong><span>{lesson.lower}</span></div><div className="word-card"><b>{lesson.emoji}</b><span><strong>{lesson.upper} is for {lesson.word}</strong><small>{en ? lesson.word : lesson.myWord}</small></span></div><div className="trace-row"><StrokeGuide letter={lesson.upper} label={en ? 'How to write' : 'ရေးသားနည်း'}/></div></aside>
      <section className="canvas-card"><div className="canvas-card__title"><span><strong>{en ? 'Write it yourself' : 'ကိုယ်တိုင် ရေးကြည့်ပါ'}</strong><small>{en ? 'Use a mouse, pen, stylus, or finger' : 'Mouse၊ Pen သို့မဟုတ် လက်ချောင်းကို သုံးနိုင်ပါသည်'}</small></span><b>✏️</b></div><DrawingCanvas guideLetter={lesson.upper} onDone={onDone} language={language}/></section>
    </section>
  </main>;
}
