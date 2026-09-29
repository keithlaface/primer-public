import { useState } from 'react';
import { pickDailyQuote, todayKey } from '../data/quotes';
import type { AppStateApi } from '../hooks/useAppState';

export function Household({ api, onGoPro }: { api: AppStateApi; onGoPro: () => void }) {
  const { state, addHouseholdMember, removeHouseholdMember, saveHouseholdLine, seedDemoHousehold } = api;
  const [name, setName] = useState('');
  const [line, setLine] = useState('');
  const dateKey = todayKey();
  const quote = pickDailyQuote(state.selectedFocuses.length ? state.selectedFocuses : ['training'], dateKey);
  const lines = state.householdLines[dateKey] || {};
  const you = state.householdMembers.find((m) => m.isYou);

  if (!state.isPro) {
    return (
      <div className="screen household">
        <header className="topbar">
          <div>
            <p className="eyebrow">Household</p>
            <h1>Morning line</h1>
          </div>
        </header>
        <div className="gate-card">
          <h2>Primer Pro</h2>
          <p>Invite 2–4 people. Same daily quote. Each posts one private sentence. No likes. No public feed.</p>
          <ul className="benefit-list">
            <li>Shared board of one-liners</li>
            <li>Invite code for your household</li>
            <li>Up to 4 members</li>
          </ul>
          <div className="invite-stub muted">
            Invite stub · code <code>{state.householdInviteCode}</code>
          </div>
          <button type="button" className="btn primary wide" onClick={onGoPro}>
            Unlock household
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen household">
      <header className="topbar">
        <div>
          <p className="eyebrow">Household · Pro</p>
          <h1>Morning line</h1>
        </div>
      </header>

      <article className="quote-card compact">
        <blockquote>{quote.text}</blockquote>
        <cite>— {quote.author}</cite>
      </article>

      <section className="board">
        <h2>Today’s board</h2>
        {state.householdMembers.length === 0 && (
          <p className="muted">Add members or seed a demo household.</p>
        )}
        <ul className="board-list">
          {state.householdMembers.map((m) => (
            <li key={m.id} className="board-item">
              <div className="board-meta">
                <strong>{m.name}</strong>
                {m.isYou && <span className="badge">You</span>}
                {!m.isYou && (
                  <button type="button" className="linkish danger" onClick={() => removeHouseholdMember(m.id)}>
                    Remove
                  </button>
                )}
              </div>
              <p className="board-line">{lines[m.id] || <em className="muted">No line yet</em>}</p>
            </li>
          ))}
        </ul>
      </section>

      {you && (
        <section className="reflect-card">
          <h2>Your household one-liner</h2>
          <input
            value={line}
            onChange={(e) => setLine(e.target.value)}
            placeholder="One sentence for the board…"
            maxLength={140}
          />
          <button
            type="button"
            className="btn secondary"
            onClick={() => {
              saveHouseholdLine(you.id, line);
              setLine('');
            }}
          >
            Post to board
          </button>
        </section>
      )}

      <section className="invite-card">
        <h2>Invite (stub)</h2>
        <p className="muted">
          Share code <code>{state.householdInviteCode}</code> · 2–4 members · no real invites yet
        </p>
        <div className="row">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Member name"
            maxLength={30}
          />
          <button
            type="button"
            className="btn secondary"
            disabled={state.householdMembers.length >= 4}
            onClick={() => {
              if (!name.trim()) return;
              addHouseholdMember(name);
              setName('');
            }}
          >
            Add
          </button>
        </div>
        <button type="button" className="linkish" onClick={seedDemoHousehold}>
          Seed demo household (Alex + Sam)
        </button>
        <p className="hint">{state.householdMembers.length}/4 members</p>
      </section>
    </div>
  );
}
