import { cn } from "@/lib/utils";

function toneForScore(score: number) {
  if (score >= 7) return { ring: "text-leaf-500", label: "น่าสนใจ" };
  if (score >= 4) return { ring: "text-brand-500", label: "ปานกลาง" };
  return { ring: "text-red-400", label: "ต่ำ" };
}

/** วงกลมคะแนน 1-10 */
export function ScoreCard({
  score,
  max = 10,
  title,
  subtitle,
  size = 140,
}: {
  score: number;
  max?: number;
  title?: string;
  subtitle?: string;
  size?: number;
}) {
  const pct = Math.max(0, Math.min(1, score / max));
  const r = 54;
  const c = 2 * Math.PI * r;
  const { ring, label } = toneForScore((score / max) * 10);
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#E5EAF2" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            className={ring}
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-ink">{score.toFixed(1)}</span>
          <span className="text-xs text-ink-soft">/ {max}</span>
        </div>
      </div>
      {title && <p className="mt-2 text-sm font-semibold text-ink">{title}</p>}
      {subtitle && <p className="text-xs text-ink-soft">{subtitle}</p>}
      <span
        className={cn(
          "mt-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
          score / max >= 0.7
            ? "bg-leaf-50 text-leaf-600"
            : score / max >= 0.4
            ? "bg-brand-50 text-brand-600"
            : "bg-red-50 text-red-500"
        )}
      >
        {label}
      </span>
    </div>
  );
}

/** แถบคะแนนแนวนอน 1-10 */
export function ScoreBar({ score, max = 10 }: { score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color =
    score / max >= 0.7 ? "bg-leaf-500" : score / max >= 0.4 ? "bg-brand-500" : "bg-red-400";
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 rounded-full bg-slate-100">
        <div className={cn("h-2 rounded-full", color)} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-right text-xs font-semibold text-ink">{score}</span>
    </div>
  );
}
