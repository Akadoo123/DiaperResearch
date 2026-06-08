import { cn } from "@/lib/utils";
import { Lightbulb, ArrowRight, Info } from "lucide-react";

/** กล่อง Key Insight — "ข้อมูลนี้แปลว่าอะไร" */
export function InsightCard({
  title = "Key Insight — ข้อมูลนี้บอกอะไร",
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-100 bg-brand-50/60 p-5 avoid-break",
        className
      )}
    >
      <div className="flex items-center gap-2 text-brand-700">
        <Lightbulb className="h-4 w-4" />
        <h4 className="text-sm font-bold">{title}</h4>
      </div>
      <div className="mt-2 text-sm leading-relaxed text-ink">{children}</div>
    </div>
  );
}

/** กล่อง Recommended Action — "เราควรทำอะไรต่อ" */
export function RecommendationBox({
  title = "Recommended Action — เราควรทำอะไรต่อ",
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-leaf-100 bg-leaf-50/60 p-5 avoid-break",
        className
      )}
    >
      <div className="flex items-center gap-2 text-leaf-600">
        <ArrowRight className="h-4 w-4" />
        <h4 className="text-sm font-bold">{title}</h4>
      </div>
      <div className="mt-2 text-sm leading-relaxed text-ink">{children}</div>
    </div>
  );
}

/** คำอธิบายใต้กราฟ: บอกอะไร / สำคัญอย่างไร / ตัดสินใจอะไร */
export function ChartNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 flex gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-ink-soft">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
      <p>{children}</p>
    </div>
  );
}
