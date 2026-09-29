import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Focus } from '../data/quotes';
import { todayKey, yesterdayKey } from '../data/quotes';

const STORAGE_KEY = 'primer.v1.state';

export interface HouseholdMember {
  id: string;
  name: string;
  isYou?: boolean;
}

export interface AppState {
  onboardingDone: boolean;
  userName: string;
  selectedFocuses: Focus[];
  isPro: boolean;
  practiceDates: string[];
  reflections: Record<string, string>;
  householdMembers: HouseholdMember[];
  householdLines: Record<string, Record<string, string>>;
  householdInviteCode: string;
}

const defaultState = (): AppState => ({
  onboardingDone: false,
  userName: '',
  selectedFocuses: [],
  isPro: false,
  practiceDates: [],
  reflections: {},
  householdMembers: [],
  householdLines: {},
  householdInviteCode: 'PRIMER-' + Math.random().toString(36).slice(2, 6).toUpperCase(),
});

function load(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

function computeStreak(practiceDates: string[]): number {
  const set = new Set(practiceDates);
  const today = todayKey();
  const yest = yesterdayKey();
  let cursor = set.has(today) ? today : set.has(yest) ? yest : null;
  if (!cursor) return 0;
  let streak = 0;
  let d = new Date(cursor + 'T12:00:00');
  while (set.has(todayKey(d))) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function useAppState() {
  const [state, setState] = useState<AppState>(() =>
    typeof window !== 'undefined' ? load() : defaultState()
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);
  const streak = useMemo(() => computeStreak(state.practiceDates), [state.practiceDates]);
  const practicedToday = state.practiceDates.includes(todayKey());
  const completeOnboarding = useCallback((name: string, focuses: Focus[]) => {
    setState((s) => ({
      ...s,
      onboardingDone: true,
      userName: name.trim() || 'You',
      selectedFocuses: focuses.slice(0, s.isPro ? 5 : 1),
      householdMembers: s.householdMembers.length > 0 ? s.householdMembers : [{ id: 'you', name: name.trim() || 'You', isYou: true }],
    }));
  }, []);
  const setFocuses = useCallback((focuses: Focus[]) => {
    setState((s) => ({ ...s, selectedFocuses: s.isPro ? focuses.slice(0, 5) : focuses.slice(0, 1) }));
  }, []);
  const markPracticeDone = useCallback(() => {
    const key = todayKey();
    setState((s) => s.practiceDates.includes(key) ? s : { ...s, practiceDates: [...s.practiceDates, key] });
  }, []);
  const saveReflection = useCallback((text: string) => {
    const key = todayKey();
    setState((s) => ({ ...s, reflections: { ...s.reflections, [key]: text.slice(0, 200) } }));
  }, []);
  const togglePro = useCallback((on: boolean) => {
    setState((s) => ({ ...s, isPro: on, selectedFocuses: on ? s.selectedFocuses : s.selectedFocuses.slice(0, 1) }));
  }, []);
  const addHouseholdMember = useCallback((name: string) => {
    setState((s) => {
      if (!s.isPro || s.householdMembers.length >= 4) return s;
      const id = 'm-' + Math.random().toString(36).slice(2, 8);
      return { ...s, householdMembers: [...s.householdMembers, { id, name: name.trim() || 'Member' }] };
    });
  }, []);
  const removeHouseholdMember = useCallback((id: string) => {
    setState((s) => ({ ...s, householdMembers: s.householdMembers.filter((m) => m.id !== id || m.isYou) }));
  }, []);
  const saveHouseholdLine = useCallback((memberId: string, line: string) => {
    const key = todayKey();
    setState((s) => ({
      ...s,
      householdLines: { ...s.householdLines, [key]: { ...(s.householdLines[key] || {}), [memberId]: line.slice(0, 140) } },
    }));
  }, []);
  const seedDemoHousehold = useCallback(() => {
    setState((s) => {
      if (!s.isPro) return s;
      const you = s.householdMembers.find((m) => m.isYou) || { id: 'you', name: s.userName || 'You', isYou: true };
      const demos = [you, { id: 'demo-alex', name: 'Alex' }, { id: 'demo-sam', name: 'Sam' }].slice(0, 4);
      const key = todayKey();
      return {
        ...s,
        householdMembers: demos,
        householdLines: {
          ...s.householdLines,
          [key]: { ...(s.householdLines[key] || {}), 'demo-alex': 'Showing up for the morning line.', 'demo-sam': 'One breath before the day starts.' },
        },
      };
    });
  }, []);
  const resetStreak = useCallback(() => setState((s) => ({ ...s, practiceDates: [], reflections: {} })), []);
  const resetAll = useCallback(() => {
    const fresh = defaultState();
    setState(fresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  }, []);
  return { state, streak, practicedToday, completeOnboarding, setFocuses, markPracticeDone, saveReflection, togglePro, addHouseholdMember, removeHouseholdMember, saveHouseholdLine, seedDemoHousehold, resetStreak, resetAll };
}

export type AppStateApi = ReturnType<typeof useAppState>;
