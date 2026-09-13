export type Subject = { id: string; name: string; subtitle: string; icon: string; color: string; active: boolean };
export type LetterLesson = { id: string; upper: string; lower: string; word: string; myWord: string; emoji: string };

export const subjects: Subject[] = [
  { id: 'english', name: 'English', subtitle: 'အင်္ဂလိပ်စာ', icon: 'Aa', color: '#ffd629', active: true },
  { id: 'math', name: 'Mathematics', subtitle: 'သင်္ချာ', icon: '123', color: '#75d8ed', active: false },
  { id: 'science', name: 'Science', subtitle: 'သိပ္ပံ', icon: '⚗', color: '#8ed683', active: false },
  { id: 'myanmar', name: 'မြန်မာစာ', subtitle: 'ဖတ်စာနှင့် ရေးသားခြင်း', icon: 'က', color: '#ff9a76', active: false },
  { id: 'history', name: 'သမိုင်း', subtitle: 'အတိတ်မှ ပုံပြင်များ', icon: '⌛', color: '#c9a8ef', active: false },
  { id: 'geography', name: 'ပထဝီ', subtitle: 'ကမ္ဘာမြေကို လေ့လာမယ်', icon: '◉', color: '#83d8bb', active: false },
];

const rows = [
  ['A','a','Apple','ပန်းသီး','🍎'],['B','b','Ball','ဘောလုံး','⚽'],['C','c','Cat','ကြောင်','🐱'],['D','d','Dog','ခွေး','🐶'],
  ['E','e','Egg','ကြက်ဥ','🥚'],['F','f','Fish','ငါး','🐟'],['G','g','Goat','ဆိတ်','🐐'],['H','h','Hat','ဦးထုပ်','🎩'],
  ['I','i','Ice cream','ရေခဲမုန့်','🍦'],['J','j','Juice','သစ်သီးဖျော်ရည်','🧃'],['K','k','Kite','စွန်','🪁'],['L','l','Lion','ခြင်္သေ့','🦁'],
  ['M','m','Moon','လ','🌙'],['N','n','Nest','ငှက်သိုက်','🪺'],['O','o','Orange','လိမ္မော်သီး','🍊'],['P','p','Pencil','ခဲတံ','✏️'],
  ['Q','q','Queen','ဘုရင်မ','👸'],['R','r','Rabbit','ယုန်','🐰'],['S','s','Sun','နေ','☀️'],['T','t','Tree','သစ်ပင်','🌳'],
  ['U','u','Umbrella','ထီး','☂️'],['V','v','Van','ကား','🚐'],['W','w','Whale','ဝေလငါး','🐋'],['X','x','Xylophone','ဇိုင်လိုဖုန်း','🎼'],
  ['Y','y','Yo-yo','ယိုယို','🪀'],['Z','z','Zebra','မြင်းကျား','🦓'],
] as const;

export const alphabet: LetterLesson[] = rows.map(([upper, lower, word, myWord, emoji]) => ({ id: upper.toLowerCase(), upper, lower, word, myWord, emoji }));

export const curriculum = {
  level: 'P1',
  subjects,
  units: [{ id: 'english-alphabet', subjectId: 'english', title: 'A–Z လက်ရေးလေ့ကျင့်ခန်း', activities: alphabet }],
};
