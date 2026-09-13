import { ArrowRight, MousePointer2, PencilLine, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { Button } from '../components/Button';
import { SubjectCard } from '../components/SubjectCard';
import { subjects } from '../data/content';

export function HomeScreen({ onStart }: { onStart: () => void }) {
  return <main className="home-screen">
    <AppHeader />
    <section className="hero">
      <div className="hero__copy">
        <span className="eyebrow"><Sparkles size={16} /> P1 ကလေးငယ်များအတွက်</span>
        <h1>ရေးရင်း၊ ဖတ်ရင်း<br/><em>ပျော်ပျော်ပါးပါး သင်ယူမယ်</em></h1>
        <p>အင်္ဂလိပ် A မှ Z အထိ Mouse၊ Pen သို့မဟုတ် လက်ချောင်းဖြင့် အခမဲ့ လေ့ကျင့်လိုက်ပါ။</p>
        <Button onClick={onStart}>အခမဲ့ စလေ့လာမယ် <ArrowRight size={20} /></Button>
        <div className="hero__trust"><span>✓ အကောင့်မလိုပါ</span><span>✓ ကလေး၏အချက်အလက် လုံခြုံပါသည်</span></div>
      </div>
      <div className="hero__art" aria-label="ခဲတံနှင့် အက္ခရာလေ့ကျင့်ခန်း ပုံရိပ်">
        <span className="floating-letter letter-a">A</span><span className="floating-letter letter-b">b</span>
        <div className="paper-card"><span className="paper-clip"/><small>ဒီနေ့ လေ့ကျင့်မယ်</small><strong>A a</strong><span>Apple 🍎</span><i>A&nbsp;&nbsp; A&nbsp;&nbsp; A</i></div>
        <div className="big-pencil"><span className="pencil-tip"/><span className="pencil-body"/><span className="pencil-rubber"/></div>
      </div>
    </section>
    <section className="subjects-section">
      <div className="section-heading"><div><span>သင်ယူခန်းများ</span><h2>P1 ဘာသာရပ်များ</h2></div><p>English A–Z ကို ယခုစမ်းသပ်နိုင်ပြီး ကျန်ဘာသာရပ်များကို မကြာမီ ထည့်သွင်းပါမည်။</p></div>
      <div className="subject-grid">{subjects.map(s => <SubjectCard key={s.id} subject={s} onOpen={onStart} />)}</div>
    </section>
    <section className="how-it-works"><div><PencilLine/><strong>အက္ခရာကို ကြည့်ပါ</strong></div><span>→</span><div><MousePointer2/><strong>ကိုယ်တိုင် ရေးကြည့်ပါ</strong></div><span>→</span><div><Sparkles/><strong>တိုးတက်မှုကို ကြည့်ပါ</strong></div></section>
    <footer><span>© 2026 ရွှေစာအုပ်</span><span>ကလေးများအတွက် ရိုးရှင်းလုံခြုံသော သင်ယူခန်း</span></footer>
  </main>;
}
