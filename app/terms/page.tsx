import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "이용약관 - 코드린",
  description: "코드린 서비스 이용약관",
}

const EFFECTIVE_DATE = "2025년 3월 1일"
const CONTACT_EMAIL = "hello@coderin.kr"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* 헤더 */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-indigo-600 hover:underline mb-4 inline-block">
            ← 코드린 홈
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🦒</span>
            <h1 className="text-2xl font-black text-gray-900">이용약관</h1>
          </div>
          <p className="text-sm text-gray-500">시행일: {EFFECTIVE_DATE}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">제1조 (목적)</h2>
            <p>
              본 약관은 코드린(이하 "서비스")이 제공하는 코딩 학습 서비스의 이용 조건 및 절차,
              서비스 제공자와 이용자 간의 권리·의무·책임 사항을 규정합니다.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">제2조 (서비스 내용)</h2>
            <p className="mb-2">코드린은 다음 서비스를 제공합니다.</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Python, C++, Pseudocode(IGCSE) 코딩 학습 레슨</li>
              <li>인터랙티브 퀴즈 및 간격 반복 복습 시스템</li>
              <li>학습 진도 및 통계 대시보드</li>
              <li>선생님 반 관리 및 학부모 학습 리포트</li>
              <li>XP, 레벨, 스트릭 등 게이미피케이션 요소</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">제3조 (회원가입 및 자격)</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>만 14세 미만은 법정대리인의 동의가 필요합니다.</li>
              <li>Google 계정을 통한 소셜 로그인 또는 이메일로 가입할 수 있습니다.</li>
              <li>1인 1계정 원칙을 준수해야 합니다.</li>
              <li>타인의 개인정보나 계정을 도용하면 즉시 이용이 제한됩니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">제4조 (이용자 의무)</h2>
            <p className="mb-2">이용자는 다음 행위를 해서는 안 됩니다.</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>타인의 계정 또는 학습 데이터 무단 접근</li>
              <li>서비스 시스템 또는 서버에 대한 해킹, 비정상적인 부하 발생</li>
              <li>자동화된 프로그램(봇)을 이용한 퀴즈 풀기 또는 XP 조작</li>
              <li>학습 데이터 위변조</li>
              <li>서비스 내 콘텐츠의 무단 복제·배포·상업적 이용</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">제5조 (서비스 제공 및 변경)</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>서비스는 연중무휴 제공을 원칙으로 하나, 시스템 점검 등으로 일시 중단될 수 있습니다.</li>
              <li>서비스 내용은 사전 공지 후 변경될 수 있습니다.</li>
              <li>무료로 제공되는 서비스는 사전 고지 없이 종료될 수 있습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">제6조 (지적재산권)</h2>
            <p>
              서비스 내 레슨 콘텐츠, 퀴즈 문제, 디자인, 소프트웨어 등의 지적재산권은
              코드린에 귀속됩니다. 이용자는 서비스 이용 목적 범위 내에서만 콘텐츠를 사용할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">제7조 (면책)</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>천재지변, 불가항력적 사유로 인한 서비스 중단은 책임을 지지 않습니다.</li>
              <li>이용자의 귀책으로 발생한 학습 데이터 손실에 대해 책임을 지지 않습니다.</li>
              <li>서비스는 학습 도구이며, 특정 시험 합격이나 성과를 보장하지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">제8조 (약관의 변경)</h2>
            <p>
              약관이 변경될 경우 시행 7일 전 서비스 공지사항 또는 이메일을 통해 안내합니다.
              변경 후 서비스 이용을 계속하면 변경된 약관에 동의한 것으로 간주됩니다.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">제9조 (준거법 및 분쟁 해결)</h2>
            <p>
              본 약관은 대한민국 법을 준거법으로 합니다.
              서비스 이용과 관련한 분쟁은 관할 법원을 통해 해결합니다.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">문의</h2>
            <div className="bg-indigo-50 rounded-xl p-4">
              <p className="font-semibold text-indigo-900 mb-1">코드린 운영팀</p>
              <p className="text-indigo-700">이메일: <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a></p>
            </div>
          </section>

        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <Link href="/privacy" className="hover:text-gray-600 underline">개인정보처리방침</Link>
          <span className="mx-2">·</span>
          <Link href="/" className="hover:text-gray-600">코드린 홈</Link>
        </div>
      </div>
    </div>
  )
}
