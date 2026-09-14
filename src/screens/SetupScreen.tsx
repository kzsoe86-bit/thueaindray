import { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { Button } from '../components/Button';
import { siteConfig } from '../config/site';
import type { Language, Student } from '../types';

export function SetupScreen({ initial, onBack, onSubmit, language, onLanguageChange }: { initial: Student; onBack: () => void; onSubmit: (student: Student) => void; language: Language; onLanguageChange: (language: Language) => void }) {
  const en = language === 'en';
  const [nickname, setNickname] = useState(initial.nickname);
  const [gender, setGender] = useState<Student['gender']>(initial.gender);
  return <main className="inner-screen setup-screen"><AppHeader onBack={onBack} compact language={language} onLanguageChange={onLanguageChange}/>
    <section className="setup-layout">
      <div className="setup-intro"><span className="step-label">{en ? 'STEP 1 / 2' : 'အဆင့် ၁ / ၂'}</span><h1>{en ? <>Hello 👋<br/>What should we call you?</> : <>မင်္ဂလာပါ 👋<br/>ဘယ်လိုခေါ်ရမလဲ?</>}</h1><p>{en ? 'We only need a nickname to greet the child during practice.' : 'လေ့ကျင့်ခန်းထဲမှာ နှုတ်ဆက်နိုင်ဖို့ ခေါ်နေကျအမည်လေးပဲ လိုပါတယ်။'}</p><div className="privacy-card"><ShieldCheck/><span><strong>{en ? 'Minimal information only' : 'အချက်အလက် အနည်းဆုံးသာ'}</strong>{en ? 'The nickname and progress stay only on this device.' : siteConfig.privacyNote}</span></div></div>
      <form className="setup-card" onSubmit={e => { e.preventDefault(); onSubmit({ nickname: nickname.trim(), gender }); }}>
        <label>{en ? 'Name or nickname' : siteConfig.labels.name}<input autoFocus maxLength={30} value={nickname} onChange={e => setNickname(e.target.value)} placeholder={en ? 'Example — Alex' : 'ဥပမာ — မောင်မောင်'} required /><small>{en ? 'A full name is not needed. A nickname is enough.' : 'နာမည်အပြည့်အစုံ မလိုပါ။ ခေါ်နေကျအမည်လည်း ရပါသည်။'}</small></label>
        <fieldset><legend>{en ? 'Gender (optional)' : siteConfig.labels.gender}</legend><div className="gender-options">
          <button type="button" className={gender === 'boy' ? 'selected' : ''} onClick={() => setGender('boy')}>👦 <span>{en ? 'Boy' : siteConfig.labels.boy}</span></button>
          <button type="button" className={gender === 'girl' ? 'selected' : ''} onClick={() => setGender('girl')}>👧 <span>{en ? 'Girl' : siteConfig.labels.girl}</span></button>
          <button type="button" className={!gender ? 'selected' : ''} onClick={() => setGender(undefined)}>🙂 <span>{en ? 'Skip' : siteConfig.labels.skip}</span></button>
        </div></fieldset>
        <label>{en ? 'Class' : 'အတန်း'}<div className="fixed-level"><strong>P1</strong><span>{en ? 'Primary 1' : 'မူလတန်း ပထမနှစ်'}</span><b>{en ? 'Fixed for now' : 'သတ်မှတ်ထားသည်'}</b></div></label>
        <Button type="submit" disabled={!nickname.trim()}>{en ? 'Start A–Z practice' : 'A–Z စလေ့ကျင့်မယ်'} <ArrowRight size={20}/></Button>
      </form>
    </section>
  </main>;
}
