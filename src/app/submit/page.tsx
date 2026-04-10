"use client";

import { useState } from "react";
import Link from "next/link";

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    programName: "",
    companyName: "",
    commissionType: "CPS",
    commissionRate: "",
    officialUrl: "",
    description: "",
    contactEmail: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // MVP: 제출 완료 표시만 (실제 저장은 향후 구현)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">신청이 접수되었습니다!</h2>
          <p className="text-sm text-gray-500 mb-6">
            검토 후 프로그램이 등록되면 안내드리겠습니다.
            <br />감사합니다.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl font-bold text-blue-600">올파트너스</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← 목록으로
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            프로그램 등록 신청
          </h1>
          <p className="text-sm text-gray-500">
            올파트너스에 어필리에이트 프로그램을 등록하고 싶으시다면
            <br />아래 양식을 작성해주세요.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
          {/* 프로그램명 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              프로그램명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="예: 쿠팡 파트너스"
              value={formData.programName}
              onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 운영사 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              운영사(회사명) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="예: 쿠팡"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 수수료 유형 + 수수료율 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                수수료 유형
              </label>
              <select
                value={formData.commissionType}
                onChange={(e) => setFormData({ ...formData, commissionType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="CPS">CPS (판매당)</option>
                <option value="CPA">CPA (행동당)</option>
                <option value="CPC">CPC (클릭당)</option>
                <option value="CPM">CPM (노출당)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                수수료율
              </label>
              <input
                type="text"
                placeholder="예: 3~10%"
                value={formData.commissionRate}
                onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 공식 사이트 URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              공식 사이트 URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              placeholder="https://"
              value={formData.officialUrl}
              onChange={(e) => setFormData({ ...formData, officialUrl: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 한줄 소개 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              한줄 소개
            </label>
            <textarea
              rows={3}
              placeholder="프로그램에 대한 간단한 소개를 작성해주세요."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* 연락처 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              연락처 (이메일) <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="example@company.com"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm"
          >
            등록 신청하기
          </button>

          <p className="text-xs text-gray-400 text-center">
            신청 내용 검토 후 등록 여부를 안내드립니다.
          </p>
        </form>
      </main>
    </div>
  );
}
