export type Focus = 'training' | 'anxiety' | 'parenting' | 'sales' | 'faith';

export const FOCUS_META: Record<Focus, { label: string; emoji: string; blurb: string }> = {
  training: { label: 'Training', emoji: '💪', blurb: 'Strength, discipline, showing up' },
  anxiety: { label: 'Anxiety', emoji: '🌊', blurb: 'Calm, breath, steady mind' },
  parenting: { label: 'Parenting', emoji: '🌱', blurb: 'Presence, patience, love' },
  sales: { label: 'Sales', emoji: '🎯', blurb: 'Courage, clarity, follow-through' },
  faith: { label: 'Faith', emoji: '✨', blurb: 'Trust, gratitude, meaning (optional)' },
};

export interface Quote {
  id: string;
  text: string;
  author: string;
  focuses: Focus[];
  practice: string;
}

export const QUOTES: Quote[] = [
  { id: 't1', text: 'Discipline is choosing between what you want now and what you want most.', author: 'Abraham Lincoln', focuses: ['training'], practice: 'Do 10 slow push-ups. Count out loud.' },
  { id: 't2', text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle', focuses: ['training'], practice: 'Put on your shoes and stand ready for 20 seconds.' },
  { id: 't3', text: 'The only bad workout is the one that didn\'t happen.', author: 'Unknown', focuses: ['training'], practice: 'Hold a 20-second plank. Breathe.' },
  { id: 't4', text: 'Suffer the pain of discipline or suffer the pain of regret.', author: 'Jim Rohn', focuses: ['training'], practice: 'Drink a full glass of water right now.' },
  { id: 't5', text: 'Don\'t count the days; make the days count.', author: 'Muhammad Ali', focuses: ['training', 'sales'], practice: 'Do 15 bodyweight squats. Slow on the way down.' },
  { id: 't6', text: 'Motivation gets you going. Habit gets you there.', author: 'Zig Ziglar', focuses: ['training'], practice: 'Set a 30-second timer and stretch your hips.' },
  { id: 't7', text: 'The secret of getting ahead is getting started.', author: 'Mark Twain', focuses: ['training', 'sales'], practice: 'Open your calendar and block 20 minutes for movement today.' },
  { id: 'a1', text: 'You don\'t have to control your thoughts. You just have to stop letting them control you.', author: 'Dan Millman', focuses: ['anxiety'], practice: 'Box breathe: inhale 4, hold 4, exhale 4, hold 4. One round.' },
  { id: 'a2', text: 'Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.', author: 'Charles Spurgeon', focuses: ['anxiety', 'faith'], practice: 'Name 3 things you can see. Say them quietly.' },
  { id: 'a3', text: 'Feelings are just visitors. Let them come and go.', author: 'Mooji', focuses: ['anxiety'], practice: 'Place a hand on your chest. Feel 5 breaths.' },
  { id: 'a4', text: 'Nothing diminishes anxiety faster than action.', author: 'Walter Anderson', focuses: ['anxiety', 'sales'], practice: 'Write one next step on a sticky note. Just one.' },
  { id: 'a5', text: 'This too shall pass.', author: 'Persian proverb', focuses: ['anxiety', 'faith'], practice: 'Exhale slowly for a count of 6. Repeat 3 times.' },
  { id: 'a6', text: 'Worry is a misuse of imagination.', author: 'Dan Zadra', focuses: ['anxiety'], practice: 'Unclench your jaw. Drop your shoulders. Hold 10 seconds.' },
  { id: 'a7', text: 'Be where your feet are.', author: 'Unknown', focuses: ['anxiety', 'parenting'], practice: 'Press both feet into the floor. Notice the pressure for 15 seconds.' },
  { id: 'a8', text: 'You are allowed to be both a masterpiece and a work in progress.', author: 'Sophia Bush', focuses: ['anxiety'], practice: 'Say out loud: "I am safe in this moment." Once.' },
  { id: 'p1', text: 'Children are not things to be molded, but are people to be unfolded.', author: 'Jess Lair', focuses: ['parenting'], practice: 'Send a one-line text of appreciation to your child or co-parent.' },
  { id: 'p2', text: 'The days are long, but the years are short.', author: 'Gretchen Rubin', focuses: ['parenting'], practice: 'Put your phone face-down for 30 seconds. Just notice them.' },
  { id: 'p3', text: 'What we are teaches the child more than what we say.', author: 'Anonymous', focuses: ['parenting'], practice: 'Smile at someone in your household — no words needed.' },
  { id: 'p4', text: 'Listen with curiosity. Speak with honesty. Act with integrity.', author: 'Roy T. Bennett', focuses: ['parenting', 'sales'], practice: 'Ask one open question today: "How was that for you?"' },
  { id: 'p5', text: 'There is no such thing as a perfect parent. So just be a real one.', author: 'Sue Atkins', focuses: ['parenting'], practice: 'Take 3 slow breaths before your next reply to a child.' },
  { id: 'p6', text: 'Connection before correction.', author: 'Unknown', focuses: ['parenting'], practice: 'Offer a 10-second hug or high-five — no agenda.' },
  { id: 'p7', text: 'Your children need your presence more than your presents.', author: 'Jesse Jackson', focuses: ['parenting'], practice: 'Kneel or sit at their eye level for one short check-in.' },
  { id: 's1', text: 'Every sale has five basic obstacles: no need, no money, no hurry, no desire, no trust.', author: 'Zig Ziglar', focuses: ['sales'], practice: 'Open your CRM or notes. Add one honest next step to a deal.' },
  { id: 's2', text: 'You miss 100% of the shots you don\'t take.', author: 'Wayne Gretzky', focuses: ['sales', 'training'], practice: 'Send one follow-up message you\'ve been avoiding. Keep it short.' },
  { id: 's3', text: 'People don\'t buy what you do; they buy why you do it.', author: 'Simon Sinek', focuses: ['sales'], practice: 'Write one sentence: why this product helps a real person.' },
  { id: 's4', text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese proverb', focuses: ['sales', 'training'], practice: 'Make one ask today. Draft it in 20 seconds, then send.' },
  { id: 's5', text: 'Success is the sum of small efforts repeated day in and day out.', author: 'Robert Collier', focuses: ['sales', 'training'], practice: 'Log one win from yesterday — even a tiny one.' },
  { id: 's6', text: 'Don\'t find customers for your products; find products for your customers.', author: 'Seth Godin', focuses: ['sales'], practice: 'Write one question you\'d ask a customer this week.' },
  { id: 's7', text: 'Courage is resistance to fear, mastery of fear—not absence of fear.', author: 'Mark Twain', focuses: ['sales', 'anxiety'], practice: 'Stand tall for 15 seconds. Soften your face. Ready.' },
  { id: 'f1', text: 'Be still, and know.', author: 'Psalm 46:10 (paraphrase)', focuses: ['faith', 'anxiety'], practice: 'Sit still for 20 seconds. No phone. Just be.' },
  { id: 'f2', text: 'Gratitude turns what we have into enough.', author: 'Anonymous', focuses: ['faith', 'parenting'], practice: 'Name one thing you\'re grateful for out loud.' },
  { id: 'f3', text: 'Faith is taking the first step even when you don\'t see the whole staircase.', author: 'Martin Luther King Jr.', focuses: ['faith', 'sales'], practice: 'Take one small faithful action you\'ve delayed. Start only.' },
  { id: 'f4', text: 'Do not be anxious about tomorrow.', author: 'Matthew 6:34 (paraphrase)', focuses: ['faith', 'anxiety'], practice: 'Write tomorrow\'s worry on paper. Fold it. Set it aside.' },
  { id: 'f5', text: 'We walk by faith, not by sight.', author: '2 Corinthians 5:7', focuses: ['faith'], practice: 'Whisper a one-sentence prayer or intention for today.' },
  { id: 'f6', text: 'In all things give thanks.', author: '1 Thessalonians 5:18 (paraphrase)', focuses: ['faith'], practice: 'Text someone "thank you" with no ask attached.' },
  { id: 'f7', text: 'The light shines in the darkness, and the darkness has not overcome it.', author: 'John 1:5', focuses: ['faith', 'anxiety'], practice: 'Open a window or turn on a light. Notice brightness for 10 seconds.' },
  { id: 'x1', text: 'Start where you are. Use what you have. Do what you can.', author: 'Arthur Ashe', focuses: ['training', 'sales', 'anxiety'], practice: 'Identify the smallest useful action. Do only that in 30 seconds.' },
  { id: 'x2', text: 'Progress, not perfection.', author: 'Unknown', focuses: ['training', 'parenting', 'anxiety'], practice: 'Cross one tiny item off a list — or write and cross it.' },
  { id: 'x3', text: 'Comparison is the thief of joy.', author: 'Theodore Roosevelt', focuses: ['anxiety', 'parenting', 'sales'], practice: 'Mute one comparison trigger (scroll, feed) for the next hour.' },
  { id: 'x4', text: 'What you practice grows stronger.', author: 'Unknown', focuses: ['training', 'faith', 'anxiety'], practice: 'Repeat your focus word once, slowly: calm / strong / present.' },
];

export function pickDailyQuote(focuses: Focus[], dateKey: string): Quote {
  const pool = QUOTES.filter((q) => q.focuses.some((f) => focuses.includes(f)));
  const list = pool.length ? pool : QUOTES;
  let hash = 0;
  const seed = `${dateKey}:${focuses.sort().join(',')}`;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return list[hash % list.length];
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function yesterdayKey(d = new Date()): string {
  const y = new Date(d);
  y.setDate(y.getDate() - 1);
  return todayKey(y);
}
