import { useMemo, useState } from 'react';
import { alphabet } from './data/content';
import { useLocalProgress } from './hooks/useLocalProgress';
import { HomeScreen } from './screens/HomeScreen';
import { SetupScreen } from './screens/SetupScreen';
import { PracticeScreen } from './screens/PracticeScreen';
import { ResultScreen } from './screens/ResultScreen';
import type { Language, Screen, Student } from './types';

export default function App() {
  const { saved, setSaved } = useLocalProgress();
  const [screen, setScreen] = useState<Screen>('home');
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('p1-language') === 'en' ? 'en' : 'my'));
  const changeLanguage = (next: Language) => { setLanguage(next); localStorage.setItem('p1-language', next); };
  const [letterId, setLetterId] = useState(saved.progress.lastLetter || 'a');
  const index = Math.max(0, alphabet.findIndex(item => item.id === letterId));
  const lesson = alphabet[index];
  const completed = useMemo(() => new Set(saved.progress.completed), [saved.progress.completed]);
  const saveStudent = (student: Student) => { setSaved(prev => ({ ...prev, student })); setScreen('practice'); };
  const complete = () => {
    setSaved(prev => ({ ...prev, progress: { lastLetter: letterId, completed: [...new Set([...prev.progress.completed, letterId])] } }));
    setScreen('result');
  };
  const next = () => { const nextLesson = alphabet[(index + 1) % alphabet.length]; setLetterId(nextLesson.id); setSaved(prev => ({ ...prev, progress: { ...prev.progress, lastLetter: nextLesson.id } })); setScreen('practice'); };
  const languageProps = { language, onLanguageChange: changeLanguage };
  if (screen === 'setup') return <SetupScreen {...languageProps} initial={saved.student} onBack={() => setScreen('home')} onSubmit={saveStudent}/>;
  if (screen === 'practice') return <PracticeScreen {...languageProps} nickname={saved.student.nickname || (language === 'en' ? 'Child' : 'ကလေး')} lesson={lesson} index={index} completed={completed.size} onBack={() => setScreen('home')} onDone={complete}/>;
  if (screen === 'result') return <ResultScreen {...languageProps} nickname={saved.student.nickname || (language === 'en' ? 'Child' : 'ကလေး')} lesson={lesson} completed={completed.size} onNext={next} onAgain={() => setScreen('practice')} onHome={() => setScreen('home')}/>;
  return <HomeScreen {...languageProps} onStart={() => setScreen(saved.student.nickname ? 'practice' : 'setup')}/>;
}
