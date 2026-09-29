import { useState } from 'react';
import { FOCUS_META, type Focus } from '../data/quotes';
import type { AppStateApi } from '../hooks/useAppState';

const ALL: Focus[] = ['training', 'anxiety', 'parenting', 'sales', 'faith'];

export function Onboarding({ api, onGoPro }: { api: AppStateApi; onGoPro: () => void }) {
  const [name, setName] = useState('');
  const [picked, setPicked] = useState<Focus[]>([]);
  const max = api.state.isPro ? 5 : 1;
  const toggle = (f: Focus) => {
    setPicked((prev) => {
      if (prev.includes(f)) return prev.filter((x) => x !== f);
      if (prev.length >= max) {
        if (!api.state.isPro) return [f];
        return prev;
      }
      return [...prev, f];
    });
  };
  const finish = () => {
    if (!picked.length) return;
    api.completeOnboarding(name, picked);
  };
  return (
    <div className="screen onboarding">
      <div className="hero">
        <div className="logo-mark">P</div>
        <h1>Primer</h1>
        <p className="tagline">One daily line + one 30-second practice — alone or with your household.</p>
      </div>
      <label className="field">
        <span>Your name (optional)</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex" maxLength={40} autoComplete="name" />
      </label>
      <div className="section-head">
        <h2>Pick your focus</h2>
        <span className="hint">{api.state.isPro ? 'Pro · up to 5' : 'Free · 1 focus'}</span>
      </div>
      <div className="focus-grid">
        {ALL.map((f) => {
          const meta = FOCUS_META[f];
          const on = picked.includes(f);
          return (
            <button key={f} type="button" className={`focus-card ${on ? 'on' : ''}`} onClick={() => toggle(f)}>
              <span className="emoji">{meta.emoji}</span>
              <span className="label">{meta.label}</span>
              <span className="blurb">{meta.blurb}</span>
            </button>
          );
        })}
      </div>
      {!api.state.isPro && (
        <button type="button" className="linkish" onClick={onGoPro}>Want more focuses? Primer Pro →</button>
      )}
      <button type="button" className="btn primary wide" disabled={!picked.length} onClick={finish}>Start Primer</button>
    </div>
  );
}
