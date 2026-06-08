import {
  LayoutDashboard,
  Globe2,
  Package,
  Users,
  TrendingUp,
  Swords,
  Tag,
  Network,
  Building2,
  ShoppingCart,
  Wallet,
  Target,
  ShieldCheck,
  AlertTriangle,
  Flag,
  Calculator,
  LineChart,
  ClipboardCheck,
  BookOpen,
  FileText,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string; // Thai
  icon: LucideIcon;
};

export type NavGroup = {
  title: string; // กลุ่มเมนู (อังกฤษตามสเปก)
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    title: "Core Research Flow",
    items: [
      { href: "/", label: "บทสรุปผู้บริหาร", icon: LayoutDashboard },
      { href: "/market-overview", label: "ภาพรวมตลาด", icon: Globe2 },
      { href: "/product-analysis", label: "วิเคราะห์สินค้า", icon: Package },
      { href: "/customer-segmentation", label: "กลุ่มลูกค้า", icon: Users },
      { href: "/market-size", label: "ขนาดตลาดและการเติบโต", icon: TrendingUp },
      { href: "/competitors", label: "คู่แข่งในตลาด", icon: Swords },
      { href: "/pricing", label: "เปรียบเทียบราคา", icon: Tag },
      { href: "/channels", label: "กลยุทธ์ช่องทางขาย", icon: Network },
      { href: "/b2b", label: "โอกาส B2B", icon: Building2 },
      { href: "/b2c", label: "โอกาส B2C", icon: ShoppingCart },
      { href: "/finance", label: "ความเป็นไปได้ทางการเงิน", icon: Wallet },
      { href: "/positioning", label: "กลยุทธ์การวางตำแหน่ง", icon: Target },
      { href: "/regulation", label: "กฎระเบียบและซัพพลายเชน", icon: ShieldCheck },
      { href: "/risks", label: "วิเคราะห์ความเสี่ยง", icon: AlertTriangle },
      { href: "/recommendation", label: "ข้อเสนอแนะเชิงกลยุทธ์", icon: Flag },
    ],
  },
  {
    title: "Research Tools",
    items: [
      { href: "/tools/market-calculator", label: "เครื่องคำนวณขนาดตลาด", icon: Calculator },
      { href: "/tools/financial-calculator", label: "เครื่องคำนวณการเงิน", icon: LineChart },
      { href: "/field-research", label: "เช็กลิสต์เก็บข้อมูลภาคสนาม", icon: ClipboardCheck },
      { href: "/sources", label: "แหล่งข้อมูลและสมมติฐาน", icon: BookOpen },
      { href: "/investor-summary", label: "สรุปหน้าเดียวสำหรับนักลงทุน", icon: FileText },
    ],
  },
];

export const allNavItems = navGroups.flatMap((g) => g.items);
