import { useEffect, useState } from 'react';
import type { Progress, Student } from '../types';

const KEY = 'p1-learning-mvp';
type Saved = { student: Student; progress: Progress };
const initial: Saved = { student: { nickname: '' }, progress: { completed: [], lastLetter: 'a' } };

export function useLocalProgress() {
  const [saved, setSaved] = useState<Saved>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '') as Saved; } catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(saved)); }, [saved]);
  return { saved, setSaved };
}
