"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { programs, type AffiliateProgram } from "@/data/programs";

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
  instagram: "인스타",
  website: "웹사이트",
  cafe: "카페",
  sns: "SNS",
};

type SortOption = "name" | "commission";

function extractMaxCommission(rate: string): number {
  const numbers = rate.match(/[\d.]+/g);
  if (!numbers) return 0;
  return Math.max(...numbers.map(Number));
}

export default function Home() {
  const [typeFilter, setTypeFilter] = useState<string>("전체");
  const [categoryFilter, setCategoryFilter] = useState<string>("전체");
  const [channelFilter, setChannelFilter] = useState<string>("전체");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("전체");
  const [sortBy, setSortBy] = useState<SortOption>("name");

  const filtered = useMemo(() => {
    let result = programs.filter((p) => {
      if (typeFilter !== "전체" && !p.type.includes(typeFilter as AffiliateProgram["type"][number])) return false;
      if (categoryFilter !== "전체") {
        const catMap: Record<string, string[]> = {
          "종합": ["종합"],
          "패션/뷰티": ["패션", "뷰티"],
          "여행": ["여행"],
          "인테리어": ["인테리어"],
          "CPA네트워크": ["CPA네트워크"],
        };
        const cats = catMap[categoryFilter];
        if (cats && !cats.includes(p.category)) return false;
      }
      if (channelFilter !== "전체") {
        const chanMap: Record<string, string> = {
          "블로그": "blog",
          "유튜브": "youtube",
          "인스타그램": "instagram",
        };
        const ch = chanMap[channelFilter];
        if (ch && !p.channels.includes(ch as AffiliateProgram["channels"][number])) return false;
      }
      if (difficultyFilter !== "전체") {
        const diffMap: Record<string, string> = {
          "쉬움": "easy",
          "보통": "medium",
          "어려움": "hard",
        };
        if (p.signupDifficulty !== diffMap[difficultyFilter]) return false;
      }
      return true;
    });

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    } else {
      result.sort((a, b) => extractMaxCommission(b.commissionRate) - extractMaxCommission(a.commissionRate));
    }

    return result;
  }, [typeFilter, categoryFilter, channelFilter, difficultyFilter, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">파트너스뷰</h1>
          </Link>
          <p className="mt-1 text-sm sm:text-base text-gray-500">
            한눈에 비교하는 국내 제휴 마케팅 프로그램
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              <FilterSelect
                label="수수료 유형"
                value={typeFilter}
                onChange={setTypeFilter}
                options={["전체", "CPS", "CPA", "CPC"]}
              />
              <FilterSelect
                label="카테고리"
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={["전체", "종합", "패션/뷰티", "여행", "인테리어", "CPA네트워크"]}
              />
              <FilterSelect
                label="채널"
                value={channelFilter}
                onChange={setChannelFilter}
                options={["전체", "블로그", "유튜브", "인스타그램"]}
              />
              <FilterSelect
                label="가입 난이도"
                value={difficultyFilter}
                onChange={setDifficultyFilter}
                options={["전체", "쉬움", "보통", "어려움"]}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                총 <span className="font-semibold text-gray-900">{filtered.length}</span>개 프로그램
              </p>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400 mr-1">정렬</span>
                <button
                  onClick={() => setSortBy("name")}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                    sortBy === "name"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  이름순
                </button>
                <button
                  onClick={() => setSortBy("commission")}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                    sortBy === "commission"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  수수료 높은순
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">조건에 맞는 프로그램이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-sm font-medium text-gray-500">
            파트너스뷰 — 국내 제휴 마케팅 프로그램 비교 플랫폼
          </p>
          <div className="mt-3">
            <Link href="/submit" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
              프로그램 등록 신청 →
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            본 사이트의 정보는 참고용이며, 정확한 조건은 각 프로그램 공식 사이트에서 확인하세요.
            수수료율 및 정산 조건은 변경될 수 있습니다.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function ProgramCard({ program }: { program: AffiliateProgram }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex flex-col">
      {/* Top: Name + Company */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-bold text-base text-gray-900 truncate">{program.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{program.company}</p>
          </div>
          {program.warning && (
            <span className="shrink-0 text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
              주의
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
        {program.description}
      </p>

      {/* Type badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {program.type.map((t) => (
          <span
            key={t}
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[t]}`}
          >
            {t}
          </span>
        ))}
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {program.category}
        </span>
      </div>

      {/* Commission Rate - BIG */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-1">수수료율</p>
        <p className="text-2xl font-extrabold text-blue-600 leading-tight">
          {program.commissionRate}
        </p>
      </div>

      {/* Channels */}
      <div className="flex flex-wrap gap-1 mb-3">
        {program.channels.map((ch) => (
          <span
            key={ch}
            className="text-[10px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 border border-gray-100"
          >
            {CHANNEL_LABELS[ch] || ch}
          </span>
        ))}
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            DIFFICULTY_COLORS[program.signupDifficulty]
          }`}
        >
          가입 {DIFFICULTY_LABELS[program.signupDifficulty]}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-auto">
        <Link
          href={`/programs/${program.id}`}
          className="flex-1 text-center text-sm font-medium py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          자세히 보기
        </Link>
        <a
          href={program.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-sm font-medium py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          공식 사이트
        </a>
      </div>
    </div>
  );
}
