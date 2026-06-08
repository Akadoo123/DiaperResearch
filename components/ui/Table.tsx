import { cn } from "@/lib/utils";
import { Card } from "./Card";

export function DataTable({
  columns,
  rows,
  caption,
  className,
}: {
  columns: { key: string; label: string; className?: string }[];
  rows: Record<string, React.ReactNode>[];
  caption?: string;
  className?: string;
}) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="thin-scroll overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-slate-50/70 text-left">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-soft",
                    c.className
                  )}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className="border-b border-line/70 last:border-0 hover:bg-brand-50/30"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn("px-4 py-3 align-top text-ink", c.className)}
                  >
                    {r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <p className="border-t border-line px-4 py-2 text-[11px] text-ink-soft">
          {caption}
        </p>
      )}
    </Card>
  );
}
