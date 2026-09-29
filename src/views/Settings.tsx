import { FOCUS_META, pickDailyQuote, todayKey, type Focus } from '../data/quotes';
import type { AppStateApi } from '../hooks/useAppState';

const ALL: Focus[] = ['training', 'anxiety', 'parenting', 'sales', 'faith'];

export function Settings({
  api,
  onGoPro,
}: {
  api: AppStateApi;
  onGoPro: () => void;
}) {
  const { state, setFocuses, resetStreak, resetAll, streak } = api;
  const quote = pickDailyQuote(
    state.selectedFocuses.length ? state.selectedFocuses : ['training'],
    todayKey()
  );

  const toggleFocus = (f: Focus) => {
    const has = state.selectedFocuses.includes(f);
    if (has) {
      if (state.selectedFocuses.length === 1) return;
      setFocuses(state.selectedFocuses.filter((x) => x !== f));
    } else {
      if (!state.isPro && state.selectedFocuses.length >= 1) {
        onGoPro();
        return;
      }
      setFocuses([...state.selectedFocuses, f]);
    }
  };

  return (
    <div className="screen settings">
      <header className="topbar">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Primer</h1>
        </div>
        {state.isPro && <span className="badge ok">Pro</span>}
      </header>

      <section className="settings-block">
        <h2>Focus</h2>
        <p className="muted">{state.isPro ? 'Pro · pick up to 5' : 'Free · 1 focus. Tap another to open Pro.'}</p>
        <div className="focus-grid compact">
          {ALL.map((f) => {
            const meta = FOCUS_META[f];
            const on = state.selectedFocuses.includes(f);
            return (
              <button
                key={f}
                type="button"
                className={`focus-card ${on ? 'on' : ''}`}
                onClick={() => toggleFocus(f)}
              >
                <span className="emoji">{meta.emoji}</span>
                <span className="label">{meta.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="settings-block">
        <h2>Lock Screen widget</h2>
        <p className="muted">Visual mock · ship-ready concept for iOS Lock Screen</p>
        <div className="widget-mock">
          <div className="phone-frame">
            <div className="phone-time">9:41</div>
            <div className="widget-card">
              <p className="widget-brand">Primer</p>
              <p className="widget-quote">“{quote.text.slice(0, 72)}{quote.text.length > 72 ? '…' : ''}”</p>
              <p className="widget-cta">Tap · 30s practice</p>
            </div>
          </div>
        </div>
      </section>

      <section className="settings-block">
        <h2>Streak</h2>
        <p>
          Current streak: <strong>{streak}</strong> day{streak === 1 ? '' : 's'} (practices finished)
        </p>
        <button type="button" className="btn secondary" onClick={resetStreak}>
          Reset streak
        </button>
      </section>

      <section className="settings-block">
        <h2>Primer Pro</h2>
        <button type="button" className="btn primary" onClick={onGoPro}>
          {state.isPro ? 'Manage Pro' : 'See Primer Pro'}
        </button>
      </section>

      <section className="settings-block">
        <h2>About</h2>
        <p className="muted">
          Primer v1 · practice over wallpaper · no ads · no chatbot · no public social. State lives in
          localStorage on this device.
        </p>
        <button
          type="button"
          className="linkish danger"
          onClick={() => {
            if (confirm('Reset all Primer data on this device?')) resetAll();
          }}
        >
          Reset all data
        </button>
      </section>
    </div>
  );
}
