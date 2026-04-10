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
  title: "제휴비교 - 국내 제휴 마케팅 프로그램 비교",
  description:
    "쿠팡 파트너스, 네이버 쇼핑 커넥트, 애드픽 등 국내 30개+ 어필리에이트 프로그램의 수수료, 정산 조건, 가입 방법을 한눈에 비교하세요.",
  keywords:
    "제휴마케팅, 어필리에이트, 쿠팡파트너스, 네이버쇼핑커넥트, 수수료비교, 블로그수익화",
  alternates: {
    canonical: "https://jehyubigyo.vercel.app",
  },
  openGraph: {
    title: "제휴비교 - 국내 제휴 마케팅 프로그램 비교",
    description:
      "쿠팡 파트너스, 네이버 쇼핑 커넥트, 애드픽 등 국내 30개+ 어필리에이트 프로그램의 수수료, 정산 조건, 가입 방법을 한눈에 비교하세요.",
    type: "website",
    url: "https://jehyubigyo.vercel.app",
    siteName: "제휴비교",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "제휴비교 - 국내 제휴 마케팅 프로그램 비교",
    description:
      "쿠팡 파트너스, 네이버 쇼핑 커넥트, 애드픽 등 국내 30개+ 어필리에이트 프로그램의 수수료, 정산 조건, 가입 방법을 한눈에 비교하세요.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "제휴비교",
              url: "https://jehyubigyo.vercel.app",
              description:
                "쿠팡 파트너스, 네이버 쇼핑 커넥트, 애드픽 등 국내 30개+ 어필리에이트 프로그램의 수수료, 정산 조건, 가입 방법을 한눈에 비교하세요.",
              inLanguage: "ko",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
