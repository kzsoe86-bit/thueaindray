export const siteConfig = {
  brand: { my: 'ရွှေစာအုပ်', en: 'SHWE SAR OAK', mark: 'ပ၁' },
  level: 'P1',
  labels: {
    start: 'အခမဲ့ စလေ့လာမယ်', continue: 'ဆက်လေ့ကျင့်မယ်', name: 'အမည် (သို့) ခေါ်နေကျအမည်',
    gender: 'ကျား/မ (မဖြည့်လည်း ရပါသည်)', boy: 'သားသား', girl: 'မီးမီး', skip: 'မဖြည့်ပါ',
  },
  privacyNote: 'ကလေး၏ ခေါ်နေကျအမည်နှင့် လေ့ကျင့်မှုအခြေအနေကို ဤစက်ထဲတွင်သာ သိမ်းထားပါသည်။',
} as const;

export const theme = {
  colors: { ink: '#123c8c', royal: '#1452c7', navy: '#0a2458', sun: '#ffd629', coral: '#f15a4f', paper: '#fffaf0', mint: '#2cb998' },
  radius: { sm: '12px', md: '20px', lg: '32px' },
  spacing: { page: 'clamp(18px, 4vw, 64px)' },
} as const;
