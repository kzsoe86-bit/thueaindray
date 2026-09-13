import { AppHeader } from '../components/AppHeader';
import { DrawingCanvas } from '../components/DrawingCanvas';
import { ProgressBar } from '../components/ProgressBar';
import type { LetterLesson } from '../data/content';

export function PracticeScreen({ nickname, lesson, index, completed, onBack, onDone }: { nickname: string; lesson: LetterLesson; index: number; completed: number; onBack: () => void; onDone: () => void }) {
  return <main className="inner-screen practice-screen"><AppHeader onBack={onBack} compact />
    <div className="practice-top"><div><span className="step-label">English · A–Z လက်ရေး</span><h1>{nickname} ရေ၊ <em>{lesson.upper}</em> ရေးကြည့်ရအောင်!</h1></div><ProgressBar value={completed} max={26} /></div>
    <section className="practice-layout">
      <aside className="lesson-card"><span className="lesson-number">အက္ခရာ {index + 1} / 26</span><div className="letter-display"><strong>{lesson.upper}</strong><span>{lesson.lower}</span></div><div className="word-card"><b>{lesson.emoji}</b><span><strong>{lesson.upper} is for {lesson.word}</strong><small>{lesson.myWord}</small></span></div><div className="trace-row"><small>မျဉ်းကြောင်းအတိုင်း လိုက်ရေးကြည့်ပါ</small><strong>{lesson.upper}&nbsp;&nbsp; {lesson.upper}&nbsp;&nbsp; {lesson.upper}</strong></div></aside>
      <section className="canvas-card"><div className="canvas-card__title"><span><strong>ကိုယ်တိုင် ရေးကြည့်ပါ</strong><small>Mouse၊ Pen သို့မဟုတ် လက်ချောင်းကို သုံးနိုင်ပါသည်</small></span><b>✏️</b></div><DrawingCanvas guideLetter={lesson.upper} onDone={onDone}/></section>
    </section>
  </main>;
}
