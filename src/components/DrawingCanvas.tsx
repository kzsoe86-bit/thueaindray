import { useEffect, useRef, useState } from 'react';
import { Eraser, Pencil, Redo2, Trash2, Undo2 } from 'lucide-react';
import { Button } from './Button';

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

export function DrawingCanvas({ guideLetter, onDone }: { guideLetter: string; onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const strokesRef = useRef<Stroke[]>([]);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redo, setRedo] = useState<Stroke[]>([]);

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
    drawing.current = true; setRedo([]);
    setStrokes(prev => [...prev, { points: [firstPoint], eraser: tool === 'eraser' }]);
  };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    e.preventDefault();
    const p = point(e); setStrokes(prev => prev.map((s, i) => i === prev.length - 1 ? { ...s, points: [...s.points, p] } : s));
  };
  const stop = () => { drawing.current = false; };

  return <div className="draw-area">
    <div className="canvas-wrap">
      <span className="canvas-guide" aria-hidden="true">{guideLetter}</span>
      <div className="writing-lines" aria-hidden="true" />
      <canvas ref={canvasRef} width={1000} height={500} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onPointerLeave={stop} aria-label={`${guideLetter} အက္ခရာရေးရန် နေရာ`} />
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
