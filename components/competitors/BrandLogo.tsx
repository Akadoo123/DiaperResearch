import { cn } from "@/lib/utils";

/** โลโก้แบรนด์แบบ initials (ไม่ใช้โลโก้จริงเพื่อเลี่ยงลิขสิทธิ์) */
export function BrandLogo({
  name,
  color,
  size = 44,
  className,
}: {
  name: string;
  color: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-xl font-bold text-white", className)}
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  );
}
