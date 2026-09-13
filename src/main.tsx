import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

class AppErrorBoundary extends React.Component<React.PropsWithChildren, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <main className="app-error">
        <h1>စာမျက်နှာတွင် အခက်အခဲဖြစ်နေပါသည်</h1>
        <p>{this.state.error.message}</p>
        <button onClick={() => window.location.reload()}>ပြန်ဖွင့်မည်</button>
      </main>;
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AppErrorBoundary><App /></AppErrorBoundary></React.StrictMode>,
);
