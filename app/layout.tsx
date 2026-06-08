import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ตลาดผ้าอ้อมผู้ใหญ่ไทย | Market Research Dashboard",
  description:
    "Dashboard วิจัยตลาดผ้าอ้อมผู้ใหญ่และสินค้าดูแลผู้ป่วยติดเตียงในประเทศไทย",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={notoThai.variable}>
      <body className="bg-bg font-sans text-ink">
        <Sidebar />
        <div className="lg:pl-64">
          <Header />
          <main className="print-full mx-auto max-w-[1400px] px-4 py-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
