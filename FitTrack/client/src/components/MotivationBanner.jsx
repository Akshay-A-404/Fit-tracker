// MotivationBanner.jsx
// Shows a random motivational one-liner alongside the flexed-arm icon.

import { MuscleIcon } from './GymIcons';

const quotes = [
  "Every rep counts. Show up for yourself today.",
  "Strength doesn't come from what you can do - it comes from what you thought you couldn't.",
  "Progress isn't always on the scale. Feel it in your lifts.",
  "The only bad workout is the one that didn't happen.",
  "Discipline today, strength tomorrow.",
  "Small weights, big changes - consistency wins.",
  "Your future self is watching this workout right now.",
  "One more rep. That's how it's built."
];

export default function MotivationBanner() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="motivation-banner">
      <MuscleIcon size={36} color="#ffffff" />
      <p>{quote}</p>
    </div>
  );
}
