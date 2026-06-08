import { cn } from "@/lib/utils";
import { DataType, dataTypeLabel } from "@/lib/types";
import { CheckCircle2, Calculator, Lightbulb, AlertCircle } from "lucide-react";

const styles: Record<DataType, { cls: string; Icon: typeof CheckCircle2 }> = {
  verified: { cls: "bg-leaf-50 text-leaf-600 border-leaf-100", Icon: CheckCircle2 },
  estimate: { cls: "bg-brand-50 text-brand-600 border-brand-100", Icon: Calculator },
  assumption: { cls: "bg-amber-50 text-amber-600 border-amber-100", Icon: Lightbulb },
  needs_validation: { cls: "bg-red-50 text-red-500 border-red-100", Icon: AlertCircle },
};

export function DataConfidenceBadge({
  type,
  className,
}: {
  type: DataType;
  className?: string;
}) {
  const { cls, Icon } = styles[type];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
        cls,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {dataTypeLabel[type]}
    </span>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "leaf" | "warn" | "danger";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-slate-100 text-slate-600",
    brand: "bg-brand-50 text-brand-600",
    leaf: "bg-leaf-50 text-leaf-600",
    warn: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-500",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function RiskBadge({ level }: { level: "high" | "medium" | "low" }) {
  const map = {
    high: { t: "สูง", c: "bg-red-50 text-red-500 border-red-100" },
    medium: { t: "ปานกลาง", c: "bg-amber-50 text-amber-600 border-amber-100" },
    low: { t: "ต่ำ", c: "bg-leaf-50 text-leaf-600 border-leaf-100" },
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold",
        map[level].c
      )}
    >
      {map[level].t}
    </span>
  );
}
