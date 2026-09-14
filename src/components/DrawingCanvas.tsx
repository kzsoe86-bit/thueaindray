import { useEffect, useRef, useState } from 'react';
import { Eraser, Pencil, Redo2, Trash2, Undo2 } from 'lucide-react';
import { Button } from './Button';
import type { Language } from '../types';

type Point = { x: number; y: number; pressure: number };
type Stroke = { points: Point[]; eraser: boolean };

function renderStrokes(canvas: HTMLCanvasElement, items: Stroke[]) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = rect.width ? canvas.width / rect.width : 1;
  const scaleY = rect.height ? canvas.height / rect.height : 1;
  const widthScale = Math.max(scaleX, scaleY);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  items.forEach(stroke => {
    ctx.globalCompositeOperation = stroke.eraser ? 'destination-out' : 'source-over';
    ctx.strokeStyle = '#123c8c';
    ctx.fillStyle = '#123c8c';
    ctx.lineWidth = (stroke.eraser ? 28 : 7) * widthScale;
    if (stroke.points.length === 1) {
      const point = stroke.points[0];
      ctx.beginPath();
      ctx.arc(point.x * scaleX, point.y * scaleY, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (stroke.points.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x * scaleX, stroke.points[0].y * scaleY);
    stroke.points.slice(1).forEach(p => ctx.lineTo(p.x * scaleX, p.y * scaleY));
    ctx.stroke();
  });
  ctx.globalCompositeOperation = 'source-over';
}

export function DrawingCanvas({ guideLetter, onDone, language }: { guideLetter: string; onDone: () => void; language: Language }) {
  const en = language === 'en';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const strokesRef = useRef<Stroke[]>([]);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redo, setRedo] = useState<Stroke[]>([]);
  const [feedback, setFeedback] = useState<'idle' | 'invalid'>('idle');

  useEffect(() => {
    strokesRef.current = strokes;
    if (canvasRef.current) renderStrokes(canvasRef.current, strokes);
  }, [strokes]);
  const point = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, pressure: e.pressure || .5 };
  };
  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const firstPoint = point(e);
    setFeedback('idle');
    drawing.current = true; setRedo([]);
    setStrokes(prev => [...prev, { points: [firstPoint], eraser: tool === 'eraser' }]);
  };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    e.preventDefault();
    const p = point(e); setStrokes(prev => prev.map((s, i) => i === prev.length - 1 ? { ...s, points: [...s.points, p] } : s));
  };
  const stop = () => { drawing.current = false; };
  const validateAndFinish = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const check = document.createElement('canvas');
    check.width = Math.max(1, Math.round(rect.width));
    check.height = Math.max(1, Math.round(rect.height));
    const ctx = check.getContext('2d');
    if (!ctx) return;
    const fontSize = Math.min(check.height * .73, check.width * .42);
    ctx.font = `800 ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = Math.max(26, fontSize * .13);
    ctx.strokeText(guideLetter, check.width / 2, check.height / 2 + fontSize * .05);
    const pixels = ctx.getImageData(0, 0, check.width, check.height).data;
    const points = strokes.filter(s => !s.eraser).flatMap(s => s.points);
    const matches = points.filter(p => {
      const x = Math.max(0, Math.min(check.width - 1, Math.round(p.x)));
      const y = Math.max(0, Math.min(check.height - 1, Math.round(p.y)));
      return pixels[(y * check.width + x) * 4 + 3] > 0;
    }).length;
    const xs = points.map(p => p.x), ys = points.map(p => p.y);
    const width = points.length ? Math.max(...xs) - Math.min(...xs) : 0;
    const height = points.length ? Math.max(...ys) - Math.min(...ys) : 0;
    const enoughWriting = points.length >= 6 && width > rect.width * .12 && height > rect.height * .2;
    if (enoughWriting && matches / points.length >= .52) onDone();
    else setFeedback('invalid');
  };

  return <div className="draw-area">
    <div className="canvas-wrap">
      <span className="canvas-guide" aria-hidden="true">{guideLetter}</span>
      <div className="writing-lines" aria-hidden="true" />
      <canvas ref={canvasRef} width={1000} height={500} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onPointerLeave={stop} aria-label={en ? `Area for writing the letter ${guideLetter}` : `${guideLetter} အက္ခရာရေးရန် နေရာ`} />
      {!strokes.length && <span className="canvas-hint">{en ? 'Write here' : 'ဤနေရာတွင် ရေးပါ'}</span>}
    </div>
    <div className="canvas-tools">
      <button className={tool === 'pen' ? 'active' : ''} onClick={() => setTool('pen')}><Pencil size={19} /> {en ? 'Pencil' : 'ခဲတံ'}</button>
      <button className={tool === 'eraser' ? 'active' : ''} onClick={() => setTool('eraser')}><Eraser size={19} /> {en ? 'Eraser' : 'ဖျက်ခဲ'}</button>
      <button disabled={!strokes.length} onClick={() => setStrokes(prev => { const last = prev.at(-1); if (last) setRedo(r => [...r, last]); return prev.slice(0, -1); })}><Undo2 size={19} /> {en ? 'Undo' : 'နောက်ပြန်'}</button>
      <button disabled={!redo.length} onClick={() => setRedo(prev => { const last = prev.at(-1); if (last) setStrokes(s => [...s, last]); return prev.slice(0, -1); })}><Redo2 size={19} /> {en ? 'Redo' : 'ရှေ့ပြန်'}</button>
      <button disabled={!strokes.length} onClick={() => { setStrokes([]); setRedo([]); setFeedback('idle'); }}><Trash2 size={19} /> {en ? 'Clear all' : 'အားလုံးဖျက်'}</button>
    </div>
    {feedback === 'invalid' && <p className="writing-feedback" role="alert">{en ? `Stay close to the ${guideLetter} guide and try again.` : `${guideLetter} စာလုံးဘောင်အတိုင်း နီးနီးကပ်ကပ် ပြန်ရေးကြည့်ပါ။`}</p>}
    <Button onClick={validateAndFinish} disabled={!strokes.some(s => !s.eraser)} className="done-button">{en ? 'Check my writing' : 'ရေးသားမှု စစ်မယ်'} <span>✓</span></Button>
  </div>;
}
