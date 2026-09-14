import { ArrowRight, MousePointer2, PencilLine, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { Button } from '../components/Button';
import { SubjectCard } from '../components/SubjectCard';
import { subjects } from '../data/content';
import type { Language } from '../types';

export function HomeScreen({ onStart, language, onLanguageChange }: { onStart: () => void; language: Language; onLanguageChange: (language: Language) => void }) {
  const en = language === 'en';
  return <main className="home-screen">
    <AppHeader language={language} onLanguageChange={onLanguageChange}/>
    <section className="hero">
      <div className="hero__copy">
        <span className="eyebrow"><Sparkles size={16} /> {en ? 'For Primary 1 children' : 'P1 ကလေးငယ်များအတွက်'}</span>
        <h1>{en ? <>Learn by writing and reading<br/><em>with joy</em></> : <>ရေးရင်း၊ ဖတ်ရင်း<br/><em>ပျော်ပျော်ပါးပါး သင်ယူမယ်</em></>}</h1>
        <p>{en ? 'Practise English A to Z for free using a mouse, pen, stylus, or finger.' : 'အင်္ဂလိပ် A မှ Z အထိ Mouse၊ Pen သို့မဟုတ် လက်ချောင်းဖြင့် အခမဲ့ လေ့ကျင့်လိုက်ပါ။'}</p>
        <Button onClick={onStart}>{en ? 'Start free practice' : 'အခမဲ့ စလေ့လာမယ်'} <ArrowRight size={20} /></Button>
        <div className="hero__trust"><span>✓ {en ? 'No account needed' : 'အကောင့်မလိုပါ'}</span><span>✓ {en ? 'Child-friendly privacy' : 'ကလေး၏အချက်အလက် လုံခြုံပါသည်'}</span></div>
      </div>
      <div className="hero__art" aria-label="ခဲတံနှင့် အက္ခရာလေ့ကျင့်ခန်း ပုံရိပ်">
        <span className="floating-letter letter-a">A</span><span className="floating-letter letter-b">b</span>
        <div className="paper-card"><span className="paper-clip"/><small>{en ? "Today's practice" : 'ဒီနေ့ လေ့ကျင့်မယ်'}</small><strong>A a</strong><span>Apple 🍎</span><i>A&nbsp;&nbsp; A&nbsp;&nbsp; A</i></div>
        <div className="big-pencil"><span className="pencil-tip"/><span className="pencil-body"/><span className="pencil-rubber"/></div>
      </div>
    </section>
    <section className="subjects-section">
      <div className="section-heading"><div><span>{en ? 'LEARNING ROOMS' : 'သင်ယူခန်းများ'}</span><h2>{en ? 'P1 Subjects' : 'P1 ဘာသာရပ်များ'}</h2></div><p>{en ? 'Try English A–Z now. More subjects will be added soon.' : 'English A–Z ကို ယခုစမ်းသပ်နိုင်ပြီး ကျန်ဘာသာရပ်များကို မကြာမီ ထည့်သွင်းပါမည်။'}</p></div>
      <div className="subject-grid">{subjects.map(s => <SubjectCard key={s.id} subject={s} language={language} onOpen={onStart} />)}</div>
    </section>
    <section className="how-it-works"><div><PencilLine/><strong>{en ? 'Look at the letter' : 'အက္ခရာကို ကြည့်ပါ'}</strong></div><span>→</span><div><MousePointer2/><strong>{en ? 'Write it yourself' : 'ကိုယ်တိုင် ရေးကြည့်ပါ'}</strong></div><span>→</span><div><Sparkles/><strong>{en ? 'See your progress' : 'တိုးတက်မှုကို ကြည့်ပါ'}</strong></div></section>
    <footer><span>© 2026 {en ? 'Shwe Sar Oak' : 'ရွှေစာအုပ်'}</span><span>{en ? 'A simple, safe learning room for children' : 'ကလေးများအတွက် ရိုးရှင်းလုံခြုံသော သင်ယူခန်း'}</span></footer>
  </main>;
}
