import { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { Button } from '../components/Button';
import { siteConfig } from '../config/site';
import type { Student } from '../types';

export function SetupScreen({ initial, onBack, onSubmit }: { initial: Student; onBack: () => void; onSubmit: (student: Student) => void }) {
  const [nickname, setNickname] = useState(initial.nickname);
  const [gender, setGender] = useState<Student['gender']>(initial.gender);
  return <main className="inner-screen setup-screen"><AppHeader onBack={onBack} compact />
    <section className="setup-layout">
      <div className="setup-intro"><span className="step-label">အဆင့် ၁ / ၂</span><h1>မင်္ဂလာပါ 👋<br/>ဘယ်လိုခေါ်ရမလဲ?</h1><p>လေ့ကျင့်ခန်းထဲမှာ နှုတ်ဆက်နိုင်ဖို့ ခေါ်နေကျအမည်လေးပဲ လိုပါတယ်။</p><div className="privacy-card"><ShieldCheck/><span><strong>အချက်အလက် အနည်းဆုံးသာ</strong>{siteConfig.privacyNote}</span></div></div>
      <form className="setup-card" onSubmit={e => { e.preventDefault(); onSubmit({ nickname: nickname.trim(), gender }); }}>
        <label>{siteConfig.labels.name}<input autoFocus maxLength={30} value={nickname} onChange={e => setNickname(e.target.value)} placeholder="ဥပမာ — မောင်မောင်" required /><small>နာမည်အပြည့်အစုံ မလိုပါ။ ခေါ်နေကျအမည်လည်း ရပါသည်။</small></label>
        <fieldset><legend>{siteConfig.labels.gender}</legend><div className="gender-options">
          <button type="button" className={gender === 'boy' ? 'selected' : ''} onClick={() => setGender('boy')}>👦 <span>{siteConfig.labels.boy}</span></button>
          <button type="button" className={gender === 'girl' ? 'selected' : ''} onClick={() => setGender('girl')}>👧 <span>{siteConfig.labels.girl}</span></button>
          <button type="button" className={!gender ? 'selected' : ''} onClick={() => setGender(undefined)}>🙂 <span>{siteConfig.labels.skip}</span></button>
        </div></fieldset>
        <label>အတန်း<div className="fixed-level"><strong>P1</strong><span>မူလတန်း ပထမနှစ်</span><b>သတ်မှတ်ထားသည်</b></div></label>
        <Button type="submit" disabled={!nickname.trim()}>A–Z စလေ့ကျင့်မယ် <ArrowRight size={20}/></Button>
      </form>
    </section>
  </main>;
}
