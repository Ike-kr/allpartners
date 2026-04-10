# 제휴비교 (JehyuBigyo)

국내 제휴 마케팅(어필리에이트) 프로그램을 한눈에 비교할 수 있는 웹 서비스입니다.

**Live:** https://jehyubigyo.vercel.app

## Features

- 국내 30개+ 어필리에이트 프로그램 정보 제공
- 수수료 유형(CPS/CPA/CPC), 카테고리, 채널, 가입 난이도별 필터링
- 이름순 / 수수료 높은순 정렬
- 프로그램별 상세 페이지 (수수료율, 정산 조건, 최소 출금액, 참여 채널 등)
- 프로그램 등록 신청 페이지
- SEO 최적화 (OpenGraph, Twitter Card, JSON-LD, sitemap, robots.txt)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Deployment:** Vercel

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

http://localhost:3000 에서 확인할 수 있습니다.

## Project Structure

```
src/
  app/
    layout.tsx          # 루트 레이아웃 (메타데이터, JSON-LD)
    page.tsx            # 메인 페이지 (프로그램 목록, 필터, 정렬)
    sitemap.ts          # 동적 사이트맵 생성
    robots.ts           # robots.txt 생성
    programs/[id]/
      page.tsx          # 프로그램 상세 페이지
    submit/
      page.tsx          # 프로그램 등록 신청 페이지
  data/
    programs.ts         # 어필리에이트 프로그램 데이터
```
