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
  title: "파트너스뷰 - 국내 제휴 마케팅 프로그램 비교",
  description:
    "쿠팡 파트너스, 네이버 쇼핑 커넥트, 애드픽 등 국내 30개+ 어필리에이트 프로그램의 수수료, 정산 조건, 가입 방법을 한눈에 비교하세요.",
  keywords:
    "제휴마케팅, 어필리에이트, 쿠팡파트너스, 네이버쇼핑커넥트, 수수료비교, 블로그수익화",
  verification: {
    google: "google78aeaeea604a8e94",
    other: {
      "naver-site-verification": "13f68e8028ee8db15106dda9ea8bf7bf929c6dc2",
    },
  },
  alternates: {
    canonical: "https://partnersview.co.kr",
  },
  openGraph: {
    title: "파트너스뷰 - 국내 제휴 마케팅 프로그램 비교",
    description:
      "쿠팡 파트너스, 네이버 쇼핑 커넥트, 애드픽 등 국내 30개+ 어필리에이트 프로그램의 수수료, 정산 조건, 가입 방법을 한눈에 비교하세요.",
    type: "website",
    url: "https://partnersview.co.kr",
    siteName: "파트너스뷰",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "파트너스뷰 - 국내 제휴 마케팅 프로그램 비교",
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
              name: "파트너스뷰",
              url: "https://partnersview.co.kr",
              description:
                "쿠팡 파트너스, 네이버 쇼핑 커넥트, 애드픽 등 국내 30개+ 어필리에이트 프로그램의 수수료, 정산 조건, 가입 방법을 한눈에 비교하세요.",
              inLanguage: "ko",
            }),
          }}
        />
        {children}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "1a80b716f2c14c56bb593fcebb7c00a0"}'
        />
      </body>
    </html>
  );
}
