import type { AppStateApi } from '../hooks/useAppState';

export function Pro({ api, onBack }: { api: AppStateApi; onBack: () => void }) {
  const { state, togglePro } = api;
  return (
    <div className="screen pro">
      <header className="topbar">
        <button type="button" className="linkish" onClick={onBack}>← Back</button>
        <div><p className="eyebrow">Primer Pro</p><h1>Depth & people</h1></div>
      </header>
      <p className="lead">The daily quote is never paywalled. Pro unlocks multi-focus, household, and archive — not the line.</p>
      <div className="pricing">
        <div className="price-card"><h3>Monthly</h3><p className="price">$4.99<span>/mo</span></p><p className="muted">Cancel anytime · stub</p></div>
        <div className="price-card featured"><span className="badge ok">Best value</span><h3>Annual</h3><p className="price">$29.99<span>/yr</span></p><p className="muted">≈ $2.50/mo · stub</p></div>
      </div>
      <ul className="benefit-list">
        <li>Multi-focus (training, anxiety, parenting, sales, faith)</li>
        <li>Household ritual · up to 4 people</li>
        <li>Archive & search of past practices</li>
        <li>More Lock Screen widgets (stub)</li>
      </ul>
      {!state.isPro ? (
        <button type="button" className="btn primary wide" onClick={() => togglePro(true)}>Unlock Primer Pro (demo)</button>
      ) : (
        <div className="pro-on">
          <p className="badge ok">Primer Pro active (demo)</p>
          <button type="button" className="btn secondary wide" onClick={() => togglePro(false)}>Turn off Pro (demo)</button>
        </div>
      )}
      <p className="fineprint">No real payment. Local toggle only for this prototype.</p>
    </div>
  );
}
