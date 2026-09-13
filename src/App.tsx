import { useMemo, useState } from 'react';
import { alphabet } from './data/content';
import { useLocalProgress } from './hooks/useLocalProgress';
import { HomeScreen } from './screens/HomeScreen';
import { SetupScreen } from './screens/SetupScreen';
import { PracticeScreen } from './screens/PracticeScreen';
import { ResultScreen } from './screens/ResultScreen';
import type { Screen, Student } from './types';

export default function App() {
  const { saved, setSaved } = useLocalProgress();
  const [screen, setScreen] = useState<Screen>('home');
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
  if (screen === 'setup') return <SetupScreen initial={saved.student} onBack={() => setScreen('home')} onSubmit={saveStudent}/>;
  if (screen === 'practice') return <PracticeScreen nickname={saved.student.nickname || 'ကလေး'} lesson={lesson} index={index} completed={completed.size} onBack={() => setScreen('home')} onDone={complete}/>;
  if (screen === 'result') return <ResultScreen nickname={saved.student.nickname || 'ကလေး'} lesson={lesson} completed={completed.size} onNext={next} onAgain={() => setScreen('practice')} onHome={() => setScreen('home')}/>;
  return <HomeScreen onStart={() => setScreen(saved.student.nickname ? 'practice' : 'setup')}/>;
}
