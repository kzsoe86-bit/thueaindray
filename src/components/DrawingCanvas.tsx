import { useEffect, useRef, useState } from 'react';
import { Eraser, Pencil, Redo2, Trash2, Undo2 } from 'lucide-react';
import { Button } from './Button';

type Point = { x: number; y: number; pressure: number };
type Stroke = { points: Point[]; eraser: boolean };

function renderStrokes(canvas: HTMLCanvasElement, items: Stroke[]) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  items.forEach(stroke => {
    if (stroke.points.length < 2) return;
    ctx.globalCompositeOperation = stroke.eraser ? 'destination-out' : 'source-over';
    ctx.strokeStyle = '#123c8c';
    ctx.lineWidth = stroke.eraser ? 28 : 7;
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    stroke.points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
  });
  ctx.globalCompositeOperation = 'source-over';
}

export function DrawingCanvas({ guideLetter, onDone }: { guideLetter: string; onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const strokesRef = useRef<Stroke[]>([]);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redo, setRedo] = useState<Stroke[]>([]);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current; const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      const rect = wrap.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1;
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width; canvas.height = height;
      canvas.style.width = `${rect.width}px`; canvas.style.height = `${rect.height}px`;
      renderStrokes(canvas, strokesRef.current);
    };
    resize(); const observer = new ResizeObserver(resize); if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

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
    e.currentTarget.setPointerCapture(e.pointerId); drawing.current = true; setRedo([]);
    setStrokes(prev => [...prev, { points: [point(e)], eraser: tool === 'eraser' }]);
  };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    e.preventDefault();
    const p = point(e); setStrokes(prev => prev.map((s, i) => i === prev.length - 1 ? { ...s, points: [...s.points, p] } : s));
  };
  const stop = () => { drawing.current = false; };

  return <div className="draw-area">
    <div className="canvas-wrap" ref={wrapRef}>
      <span className="canvas-guide" aria-hidden="true">{guideLetter}</span>
      <div className="writing-lines" aria-hidden="true" />
      <canvas ref={canvasRef} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} aria-label={`${guideLetter} အက္ခရာရေးရန် နေရာ`} />
      {!strokes.length && <span className="canvas-hint">ဤနေရာတွင် ရေးပါ</span>}
    </div>
    <div className="canvas-tools">
      <button className={tool === 'pen' ? 'active' : ''} onClick={() => setTool('pen')}><Pencil size={19} /> ခဲတံ</button>
      <button className={tool === 'eraser' ? 'active' : ''} onClick={() => setTool('eraser')}><Eraser size={19} /> ဖျက်ခဲ</button>
      <button disabled={!strokes.length} onClick={() => setStrokes(prev => { const last = prev.at(-1); if (last) setRedo(r => [...r, last]); return prev.slice(0, -1); })}><Undo2 size={19} /> နောက်ပြန်</button>
      <button disabled={!redo.length} onClick={() => setRedo(prev => { const last = prev.at(-1); if (last) setStrokes(s => [...s, last]); return prev.slice(0, -1); })}><Redo2 size={19} /> ရှေ့ပြန်</button>
      <button disabled={!strokes.length} onClick={() => { setStrokes([]); setRedo([]); }}><Trash2 size={19} /> အားလုံးဖျက်</button>
    </div>
    <Button onClick={onDone} disabled={!strokes.some(s => !s.eraser)} className="done-button">ရေးပြီးပြီ <span>✓</span></Button>
  </div>;
}
