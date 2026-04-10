import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "올파트너스 - 국내 제휴 마케팅 프로그램 비교",
  description:
    "국내 모든 어필리에이트(제휴 마케팅) 프로그램을 한눈에 비교하세요. 쿠팡 파트너스, 네이버 쇼핑 커넥트, 올리브영, 무신사 등 수수료율, 정산 조건, 가입 난이도를 한곳에서 확인할 수 있습니다.",
  keywords:
    "제휴 마케팅, 어필리에이트, 쿠팡 파트너스, 네이버 커넥트, 수수료 비교, 블로그 수익화, 유튜브 수익화",
  openGraph: {
    title: "올파트너스 - 국내 제휴 마케팅 프로그램 비교",
    description:
      "국내 모든 어필리에이트 프로그램을 한눈에 비교하세요.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
