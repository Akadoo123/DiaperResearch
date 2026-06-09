import { cn } from "@/lib/utils";

/** Word cloud อย่างง่าย — ขนาด/ความเข้มตามน้ำหนัก */
export function WordCloud({
  words,
  tone,
}: {
  words: { word: string; weight: number }[];
  tone: "positive" | "negative";
}) {
  const max = Math.max(...words.map((w) => w.weight), 1);
  const base = tone === "positive" ? "text-leaf-600 bg-leaf-50" : "text-red-500 bg-red-50";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {words.map((w) => {
        const scale = 0.5 + (w.weight / max) * 0.9; // 0.5 - 1.4
        return (
          <span
            key={w.word}
            className={cn("rounded-full px-3 py-1 font-semibold", base)}
            style={{ fontSize: `${0.72 + scale * 0.4}rem`, opacity: 0.55 + (w.weight / max) * 0.45 }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
}
