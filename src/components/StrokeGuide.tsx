type Stroke = { d: string; x: number; y: number };

// Primary manuscript formation: each item is one continuous pencil stroke.
const guides: Record<string, Stroke[]> = {
  A:[{d:'M45 12 L20 84',x:45,y:12},{d:'M45 12 L72 84',x:45,y:12},{d:'M29 58 L63 58',x:29,y:58}],
  B:[{d:'M22 12 L22 84',x:22,y:12},{d:'M23 13 C70 9 76 43 23 48',x:23,y:13},{d:'M23 48 C76 44 79 83 23 84',x:23,y:48}],
  C:[{d:'M73 23 C45 3 18 24 18 50 C18 78 45 96 73 78',x:73,y:23}],
  D:[{d:'M22 12 L22 84',x:22,y:12},{d:'M23 13 C84 10 84 85 23 84',x:23,y:13}],
  E:[{d:'M22 12 L22 84',x:22,y:12},{d:'M23 13 L72 13',x:23,y:13},{d:'M23 49 L62 49',x:23,y:49},{d:'M23 84 L72 84',x:23,y:84}],
  F:[{d:'M22 12 L22 84',x:22,y:12},{d:'M23 13 L72 13',x:23,y:13},{d:'M23 49 L62 49',x:23,y:49}],
  G:[{d:'M73 23 C45 3 18 24 18 50 C18 78 45 96 73 76',x:73,y:23},{d:'M73 76 L73 55 L50 55',x:73,y:76}],
  H:[{d:'M20 12 L20 84',x:20,y:12},{d:'M72 12 L72 84',x:72,y:12},{d:'M21 49 L71 49',x:21,y:49}],
  I:[{d:'M18 13 L74 13',x:18,y:13},{d:'M46 14 L46 84',x:46,y:14},{d:'M18 84 L74 84',x:18,y:84}],
  J:[{d:'M18 13 L74 13',x:18,y:13},{d:'M64 14 L64 67 C64 91 25 91 25 67',x:64,y:14}],
  K:[{d:'M20 12 L20 84',x:20,y:12},{d:'M72 12 L21 52',x:72,y:12},{d:'M22 52 L74 84',x:22,y:52}],
  L:[{d:'M22 12 L22 84',x:22,y:12},{d:'M23 84 L74 84',x:23,y:84}],
  M:[{d:'M15 84 L15 13',x:15,y:84},{d:'M16 14 L45 66',x:16,y:14},{d:'M45 66 L75 14',x:45,y:66},{d:'M75 15 L75 84',x:75,y:15}],
  N:[{d:'M18 84 L18 13',x:18,y:84},{d:'M19 14 L74 84',x:19,y:14},{d:'M74 83 L74 13',x:74,y:83}],
  O:[{d:'M48 12 C12 12 12 86 48 86 C84 86 84 12 48 12',x:48,y:12}],
  P:[{d:'M22 84 L22 13',x:22,y:84},{d:'M23 14 C73 8 76 52 23 52',x:23,y:14}],
  Q:[{d:'M48 12 C12 12 12 86 48 86 C84 86 84 12 48 12',x:48,y:12},{d:'M53 66 L78 89',x:53,y:66}],
  R:[{d:'M22 84 L22 13',x:22,y:84},{d:'M23 14 C73 8 76 52 23 52',x:23,y:14},{d:'M43 52 L76 84',x:43,y:52}],
  S:[{d:'M72 22 C48 3 20 17 25 40 C29 56 68 52 68 69 C68 91 37 94 20 77',x:72,y:22}],
  T:[{d:'M15 13 L79 13',x:15,y:13},{d:'M47 14 L47 84',x:47,y:14}],
  U:[{d:'M20 12 L20 63 C20 94 72 94 72 63 L72 12',x:20,y:12}],
  V:[{d:'M18 13 L46 85',x:18,y:13},{d:'M46 85 L74 13',x:46,y:85}],
  W:[{d:'M12 13 L27 85',x:12,y:13},{d:'M27 85 L45 42',x:27,y:85},{d:'M45 42 L62 85',x:45,y:42},{d:'M62 85 L79 13',x:62,y:85}],
  X:[{d:'M18 13 L74 85',x:18,y:13},{d:'M74 13 L18 85',x:74,y:13}],
  Y:[{d:'M18 13 L46 51',x:18,y:13},{d:'M74 13 L46 51',x:74,y:13},{d:'M46 51 L46 85',x:46,y:51}],
  Z:[{d:'M18 13 L75 13',x:18,y:13},{d:'M75 14 L20 84',x:75,y:14},{d:'M20 84 L76 84',x:20,y:84}],
};

export function StrokeGuide({ letter, label }: { letter: string; label: string }) {
  const strokes = guides[letter] || guides.A;
  const markerId = `arrow-${letter}`;
  return <div className="stroke-guide"><small>{label}</small><svg viewBox="0 0 94 100" role="img" aria-label={`${letter} stroke order`}>
    <defs><marker id={markerId} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z"/></marker></defs>
    <line className="guide-line guide-line--top" x1="4" y1="10" x2="90" y2="10"/><line className="guide-line guide-line--middle" x1="4" y1="50" x2="90" y2="50"/><line className="guide-line guide-line--bottom" x1="4" y1="90" x2="90" y2="90"/>
    <text className="guide-letter" x="47" y="85" textAnchor="middle">{letter}</text>
    {strokes.map((stroke, index)=><g key={index} className={`stroke-step stroke-step--${index % 6 + 1}`}><circle className="stroke-start" cx={stroke.x} cy={stroke.y} r="4"/><text className="stroke-number" x={stroke.x} y={stroke.y+2} textAnchor="middle">{index+1}</text><path className="stroke-arrow" d={stroke.d} markerEnd={`url(#${markerId})`}/></g>)}
  </svg><div className="step-order" aria-label="Stroke steps">{strokes.map((_, index)=><span key={index} className={`step-chip step-chip--${index % 6 + 1}`}><b>{index+1}</b> Step {index+1}{index < strokes.length-1 && <i>→</i>}</span>)}</div></div>;
}
