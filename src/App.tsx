import { useState } from 'react';
import { useAppState } from './hooks/useAppState';
import { Onboarding } from './views/Onboarding';
import { Today } from './views/Today';
import { Household } from './views/Household';
import { Pro } from './views/Pro';
import { Settings } from './views/Settings';
import './App.css';

type Tab = 'today' | 'household' | 'settings';
type Screen = Tab | 'pro' | 'onboarding';

export default function App() {
  const api = useAppState();
  const [tab, setTab] = useState<Tab>('today');
  const [showPro, setShowPro] = useState(false);
  const goPro = () => setShowPro(true);
  const backFromPro = () => setShowPro(false);
  let screen: Screen = 'onboarding';
  if (!api.state.onboardingDone) screen = showPro ? 'pro' : 'onboarding';
  else if (showPro) screen = 'pro';
  else screen = tab;
  return (
    <div className="app-shell">
      <div className="phone">
        {screen === 'onboarding' && <Onboarding api={api} onGoPro={goPro} />}
        {screen === 'today' && <Today api={api} />}
        {screen === 'household' && <Household api={api} onGoPro={goPro} />}
        {screen === 'settings' && <Settings api={api} onGoPro={goPro} />}
        {screen === 'pro' && <Pro api={api} onBack={backFromPro} />}
        {api.state.onboardingDone && screen !== 'pro' && (
          <nav className="tabbar" aria-label="Main">
            <button type="button" className={tab === 'today' ? 'on' : ''} onClick={() => setTab('today')}>
              <span className="tab-icon">◎</span>Today
            </button>
            <button type="button" className={tab === 'household' ? 'on' : ''} onClick={() => setTab('household')}>
              <span className="tab-icon">⌂</span>Household
            </button>
            <button type="button" className={tab === 'settings' ? 'on' : ''} onClick={() => setTab('settings')}>
              <span className="tab-icon">⚙</span>Settings
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
