# ရွှေစာအုပ် — P1 Learning MVP

## GitHub Pages

Repository ၏ `main` branch သို့ ပြင်ဆင်ချက်တင်တိုင်း GitHub Actions က website ကို အလိုအလျောက် build နှင့် publish လုပ်ပေးပါသည်။ Repository Settings → Pages → Source တွင် **GitHub Actions** ကို ရွေးပါ။ ထုတ်လွှင့်ပြီးသောလိပ်စာမှာ `https://kzsoe86-bit.github.io/thueaindray/` ဖြစ်ပါသည်။ GitHub Free account အသုံးပြုနေပါက Pages အတွက် repository ကို Public ထားရန် လိုနိုင်ပါသည်။

**Live websites:**

- Worker + D1: https://p1-learning-mvp.myanmar-games.workers.dev
- Static Pages fallback: https://p1-learning.pages.dev

အချို့ network/ISP များတွင် `workers.dev` နှင့် `pages.dev` host များ ပိတ်ထားနိုင်ပါသည်။ ထိုအခါ Cloudflare account ထဲသို့ ကိုယ်ပိုင် domain ထည့်ပြီး Pages project နှင့် ချိတ်ဆက်ပါ။

P1 ကလေးများအတွက် English A–Z လက်ရေးလေ့ကျင့်နိုင်သည့် responsive web app ဖြစ်ပါသည်။ Mouse၊ stylus/pen နှင့် touch တို့ဖြင့် ရေးနိုင်ပြီး လက်ရှိ MVP တွင် ကလေး၏ ခေါ်နေကျအမည်နှင့် လေ့ကျင့်ပြီးသော အက္ခရာများကို browser စက်အတွင်း၌သာ သိမ်းထားပါသည်။

## ပါဝင်ပြီးသော လုပ်ဆောင်ချက်များ

- Responsive landing page နှင့် P1 ဘာသာရပ် card များ
- Nickname/name၊ optional gender နှင့် fixed P1 setup
- A–Z data set; A မှစ၍ letter တစ်ခုချင်း ဆက်လေ့ကျင့်နိုင်ခြင်း
- Pointer Events canvas: mouse၊ pen/stylus၊ finger
- ခဲတံ၊ ဖျက်ခဲ၊ undo၊ redo၊ clear
- Completion/result နှင့် device-local progress
- Myanmar Unicode စာသားနှင့် Pyidaungsu preferred font stack
- အနာဂတ် D1 progress API၊ R2 lesson media အတွက် Cloudflare-ready structure

## Local run

Node.js 20 သို့မဟုတ် နောက်ဆုံး LTS ကို အသုံးပြုပါ။

```bash
npm install
npm run dev
```

Production build စစ်ဆေးရန်:

```bash
npm run build
npm run preview
```

## လွယ်ကူစွာ ပြင်ဆင်ရန်

- အရောင်၊ brand၊ UI label: `src/config/site.ts`
- ဘာသာရပ် card နှင့် A–Z အကြောင်းအရာ: `src/data/content.ts`
- စာမျက်နှာများ: `src/screens/`
- Reusable UI: `src/components/`
- Font၊ spacing နှင့် responsive design: `src/styles/global.css`

နောက်ပိုင်း P1 class-book lesson တစ်ခုထည့်ရာတွင် `curriculum.units` ထဲသို့ subject, unit, activity data ကို ထပ်ထည့်ပြီး ရှိပြီးသား subject/lesson UI ကို ပြန်အသုံးပြုနိုင်ပါသည်။ အသစ်မှ UI structure ပြန်ဆောက်ရန် မလိုပါ။

## Cloudflare architecture

အခု MVP သည် static-first ဖြစ်ပြီး Worker က compiled site ကို serve လုပ်ပေးနိုင်ပါသည်။ D1 ကို device progress sync အတွက် နောက်ပိုင်း opt-in အဖြစ် ထားပြီး R2 ကို lesson audio/image/video ထည့်ချိန်မှ သုံးပါမည်။ ကလေး၏ ပုံ၊ အသံ၊ လိပ်စာ၊ email၊ မွေးနေ့ စသည့် မလိုအပ်သော ကိုယ်ရေးအချက်အလက်များ မကောက်ခံပါ။

```text
Browser (React/Vite)
  ├─ device-only nickname + progress (current MVP)
  └─ /api/progress (optional)
          ↓
Cloudflare Worker
  ├─ Static Assets / Pages-compatible dist
  ├─ D1: anonymous device progress (optional)
  └─ R2: lesson media (future)
```

## Cloudflare deploy မလုပ်မီ

1. Cloudflare account တွင် D1 database တစ်ခုဖန်တီးပါ။
2. `wrangler.jsonc` ထဲတွင် production D1 database binding ကို သတ်မှတ်ပြီးဖြစ်ကြောင်း စစ်ပါ။
3. Migration ကို remote D1 တွင် apply လုပ်ပါ။
4. Login စစ်ဆေးပြီးမှ deploy လုပ်ပါ။

```bash
npx wrangler login
npx wrangler d1 migrations apply p1-learning --remote
npm run cf:deploy
```

Static-only Pages ကို သုံးလိုပါက `npm run build` ပြီးနောက် output directory ကို `dist` ဟု သတ်မှတ်ပါ။ Framework preset သည် Vite ဖြစ်သည်။ Git integration အသုံးပြုလျှင် build command ကို `npm run build` ဟု သတ်မှတ်ပါ။

> `kzsoe86@gmail.com` Cloudflare account သို့ Worker Static Assets + D1 ဖြင့် deploy လုပ်ပြီးပါပြီ။
