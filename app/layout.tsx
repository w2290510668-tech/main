import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "来访人员预约系统",
  description: "商务简约风的来访预约管理系统（Next.js 初始版本）"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
