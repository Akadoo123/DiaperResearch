import { Confidence } from "@/data/competitors";
import { cn } from "@/lib/utils";
import { Database } from "lucide-react";

const confMap: Record<Confidence, { t: string; c: string }> = {
  high: { t: "Confidence: High", c: "bg-leaf-50 text-leaf-600" },
  medium: { t: "Confidence: Medium", c: "bg-amber-50 text-amber-600" },
  low: { t: "Confidence: Low", c: "bg-red-50 text-red-500" },
};

/** แถบความโปร่งใสข้อมูลใต้กราฟ/ตาราง — Source / Date / Confidence */
export function SourceFooter({
  source = "Marketplace + Retail observation + Brand sites (modeled)",
  date = "อัปเดต: มิ.ย. 2569",
  confidence,
  type = "Modeled",
  className,
}: {
  source?: string;
  date?: string;
  confidence: Confidence;
  type?: "Estimated" | "Reported" | "Modeled";
  className?: string;
}) {
  const c = confMap[confidence];
  return (
    <div className={cn("mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-2 text-[11px] text-ink-soft", className)}>
      <span className="inline-flex items-center gap-1">
        <Database className="h-3 w-3" /> ที่มา: {source}
      </span>
      <span className="text-line">|</span>
      <span>{date}</span>
      <span className="text-line">|</span>
      <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-ink-soft">{type}</span>
      <span className={cn("rounded-full px-2 py-0.5 font-medium", c.c)}>{c.t}</span>
    </div>
  );
}
