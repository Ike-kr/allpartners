import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { programs } from "@/data/programs";

const TYPE_COLORS: Record<string, string> = {
  CPS: "bg-blue-100 text-blue-700",
  CPA: "bg-green-100 text-green-700",
  CPC: "bg-orange-100 text-orange-700",
  CPM: "bg-purple-100 text-purple-700",
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "쉬움",
  medium: "보통",
  hard: "어려움",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

const CHANNEL_LABELS: Record<string, string> = {
  blog: "블로그",
  youtube: "유튜브",
  instagram: "인스타그램",
  website: "웹사이트",
  cafe: "카페",
  sns: "SNS",
};

const CHANNEL_ICONS: Record<string, string> = {
  blog: "📝",
  youtube: "🎬",
  instagram: "📸",
  website: "🌐",
  cafe: "☕",
  sns: "💬",
};

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return programs.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const program = programs.find((p) => p.id === id);
  if (!program) return { title: "프로그램을 찾을 수 없습니다" };

  const title = `${program.name} - 수수료, 정산조건, 가입방법 | 제휴비교`;
  const description = `${program.name}(${program.company}) 제휴 마케팅 프로그램. 수수료율 ${program.commissionRate}, 정산 주기 ${program.settlementCycle}. 가입 방법과 조건을 확인하세요.`;
  const url = `https://jehyubigyo.vercel.app/programs/${program.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "제휴비교",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { id } = await params;
  const program = programs.find((p) => p.id === id);

  if (!program) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: program.name,
    provider: {
      "@type": "Organization",
      name: program.company,
      url: program.officialUrl,
    },
    description: program.description,
    url: `https://jehyubigyo.vercel.app/programs/${program.id}`,
    category: "Affiliate Marketing",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "commissionRate",
        value: program.commissionRate,
      },
      {
        "@type": "PropertyValue",
        name: "settlementCycle",
        value: program.settlementCycle,
      },
      {
        "@type": "PropertyValue",
        name: "minimumPayout",
        value: program.minimumPayout,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-4"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            전체 목록으로
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {program.name}
                </h1>
                {program.type.map((t) => (
                  <span
                    key={t}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[t]}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">{program.company}</p>
            </div>
            {program.status === "unknown" && (
              <span className="inline-flex items-center text-xs bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full font-medium border border-yellow-200 self-start">
                운영 상태 미확인
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <MetricCard label="수수료율" value={program.commissionRate} highlight />
          <MetricCard label="정산 주기" value={program.settlementCycle} />
          <MetricCard label="최소 출금액" value={program.minimumPayout} />
          <MetricCard
            label="가입 난이도"
            value={DIFFICULTY_LABELS[program.signupDifficulty]}
            badgeClass={DIFFICULTY_COLORS[program.signupDifficulty]}
          />
        </div>

        {/* Description */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">프로그램 소개</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {program.description}
          </p>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">주요 특징</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{program.features}</p>
        </section>

        {/* Channels */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">참여 가능 채널</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {program.channels.map((ch) => (
              <div
                key={ch}
                className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
              >
                <span className="text-lg">{CHANNEL_ICONS[ch]}</span>
                <span className="text-sm font-medium text-gray-700">
                  {CHANNEL_LABELS[ch] || ch}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        {program.warning && (
          <section className="bg-red-50 border border-red-200 rounded-2xl p-5 sm:p-6 mb-4">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-red-800 mb-1">주의사항</h2>
                <p className="text-sm text-red-700 leading-relaxed">{program.warning}</p>
              </div>
            </div>
          </section>
        )}

        {/* Category & Status */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">추가 정보</h2>
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">카테고리</p>
              <span className="text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                {program.category}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">운영 상태</p>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  program.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : program.status === "inactive"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {program.status === "active"
                  ? "운영 중"
                  : program.status === "inactive"
                  ? "중단"
                  : "미확인"}
              </span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={program.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-semibold py-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-colors text-base"
          >
            공식 사이트 바로가기
          </a>
          <Link
            href="/"
            className="flex-1 text-center font-semibold py-4 rounded-2xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-base"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-sm font-medium text-gray-500">
            제휴비교 — 국내 제휴 마케팅 프로그램 비교 플랫폼
          </p>
          <p className="text-xs text-gray-400 mt-2">
            본 사이트의 정보는 참고용이며, 정확한 조건은 각 프로그램 공식 사이트에서
            확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}

function MetricCard({
  label,
  value,
  highlight,
  badgeClass,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  badgeClass?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
      <p className="text-xs text-gray-400 mb-2">{label}</p>
      {badgeClass ? (
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${badgeClass}`}>
          {value}
        </span>
      ) : (
        <p
          className={`font-bold leading-snug ${
            highlight
              ? "text-xl sm:text-2xl text-blue-600"
              : "text-sm sm:text-base text-gray-900"
          }`}
        >
          {value}
        </p>
      )}
    </div>
  );
}
