import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** จัดรูปแบบตัวเลขแบบไทย (มี comma) */
export function fmt(n: number, digits = 0): string {
  if (!isFinite(n)) return "-";
  return n.toLocaleString("th-TH", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/** ฟอร์แมตเงินบาทแบบย่อ (ล้าน / พันล้าน) */
export function fmtBaht(n: number): string {
  if (!isFinite(n)) return "-";
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)} พันล้านบาท`;
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} ล้านบาท`;
  if (abs >= 1_000) return `${fmt(n)} บาท`;
  return `${fmt(n)} บาท`;
}

export function fmtPct(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`;
}
