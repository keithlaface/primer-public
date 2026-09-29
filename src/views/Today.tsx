import { useMemo, useState } from 'react';
import { pickDailyQuote, todayKey, FOCUS_META } from '../data/quotes';
import type { AppStateApi } from '../hooks/useAppState';

export function Today({ api }: { api: AppStateApi }) {
  const { state, streak, practicedToday, markPracticeDone, saveReflection } = api;
  const dateKey = todayKey();
  const quote = useMemo(
    () => pickDailyQuote(state.selectedFocuses, dateKey),
    [state.selectedFocuses, dateKey]
  );
  const [reflection, setReflection] = useState(state.reflections[dateKey] || '');
  const [savedFlash, setSavedFlash] = useState(false);
  const [showReflect, setShowReflect] = useState(practicedToday);
  const focusLabels = state.selectedFocuses.map((f) => FOCUS_META[f].label).join(' · ');
  const onDone = () => { markPracticeDone(); setShowReflect(true); };
  const onSaveReflection = () => {
    saveReflection(reflection);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };
  return (
    <div className="screen today">
      <header className="topbar">
        <div>
          <p className="eyebrow">Today</p>
          <h1>{state.userName ? `Hi, ${state.userName}` : 'Primer'}</h1>
        </div>
        <div className="streak-pill" title="Days with practice finished">
          <span className="streak-num">{streak}</span>
          <span className="streak-label">day streak</span>
        </div>
      </header>
      <p className="focus-chip">{focusLabels || 'No focus'}</p>
      <article className="quote-card">
        <div className="quote-mark">“</div>
        <blockquote>{quote.text}</blockquote>
        <cite>— {quote.author}</cite>
        <p className="never-paywalled">Daily quote · never paywalled</p>
      </article>
      <section className={`practice-card ${practicedToday ? 'done' : ''}`}>
        <div className="practice-head">
          <h2>30s practice</h2>
          {practicedToday && <span className="badge ok">Done</span>}
        </div>
        <p className="practice-text">{quote.practice}</p>
        {!practicedToday ? (
          <button type="button" className="btn primary wide" onClick={onDone}>Mark done</button>
        ) : (
          <p className="muted">Streak counts practices finished — not opens. Nice work.</p>
        )}
      </section>
      {showReflect && (
        <section className="reflect-card">
          <h2>Private reflection</h2>
          <p className="muted">Optional one line. Only you see this.</p>
          <input value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="One sentence…" maxLength={200} />
          <button type="button" className="btn secondary" onClick={onSaveReflection}>{savedFlash ? 'Saved' : 'Save'}</button>
        </section>
      )}
    </div>
  );
}
