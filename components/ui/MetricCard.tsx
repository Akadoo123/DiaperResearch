import { cn } from "@/lib/utils";
import { DataType } from "@/lib/types";
import { DataConfidenceBadge } from "./Badges";
import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  unit,
  sub,
  icon: Icon,
  tone = "brand",
  dataType,
  className,
}: {
  label: string;
  value: string | number;
  unit?: string;
  sub?: string;
  icon?: LucideIcon;
  tone?: "brand" | "leaf" | "warn" | "danger" | "neutral";
  dataType?: DataType;
  className?: string;
}) {
  const toneMap: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600",
    leaf: "bg-leaf-50 text-leaf-600",
    warn: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-500",
    neutral: "bg-slate-100 text-slate-500",
  };
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-card p-4 shadow-soft avoid-break",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-ink-soft leading-snug">{label}</p>
        {Icon && (
          <span className={cn("rounded-xl p-2", toneMap[tone])}>
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold tracking-tight text-ink">{value}</span>
        {unit && <span className="text-xs font-medium text-ink-soft">{unit}</span>}
      </div>
      {sub && <p className="mt-1 text-[11px] text-ink-soft leading-snug">{sub}</p>}
      {dataType && (
        <div className="mt-2">
          <DataConfidenceBadge type={dataType} />
        </div>
      )}
    </div>
  );
}
