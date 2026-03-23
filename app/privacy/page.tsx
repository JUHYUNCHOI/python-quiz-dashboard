import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "개인정보처리방침 - 코드린",
  description: "코드린 개인정보처리방침",
}

const EFFECTIVE_DATE = "2025년 3월 1일"
const CONTACT_EMAIL = "hello@coderin.kr"

export default function PrivacyPage() {
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
            <h1 className="text-2xl font-black text-gray-900">개인정보처리방침</h1>
          </div>
          <p className="text-sm text-gray-500">시행일: {EFFECTIVE_DATE}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">1. 개요</h2>
            <p>
              코드린(이하 "서비스")은 중학생·고등학생을 위한 코딩 학습 플랫폼입니다.
              본 방침은 서비스가 이용자의 개인정보를 어떻게 수집·이용·보관하는지 안내합니다.
              서비스를 이용함으로써 본 방침에 동의하는 것으로 간주됩니다.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">2. 수집하는 개인정보 항목</h2>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold text-gray-800 mb-1">📧 회원가입·로그인 시 (Google 계정 연동)</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>이메일 주소</li>
                  <li>이름 (Google 계정에 등록된 표시 이름)</li>
                  <li>Google 고유 사용자 ID</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold text-gray-800 mb-1">📚 서비스 이용 중 자동 수집</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>레슨 완료 여부 및 진도 데이터</li>
                  <li>퀴즈 결과 (정답률, 소요 시간, 획득 점수)</li>
                  <li>학습 스트릭 및 XP 기록</li>
                  <li>접속 일시</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">3. 개인정보의 수집 및 이용 목적</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>회원 식별 및 서비스 제공</li>
              <li>학습 진도 저장 및 복원</li>
              <li>퀴즈 결과 분석을 통한 맞춤 학습 제공</li>
              <li>선생님·학부모 대상 학습 리포트 제공</li>
              <li>서비스 개선 및 통계 분석 (개인 식별 불가 형태)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">4. 개인정보의 보유 및 이용 기간</h2>
            <p className="mb-2">
              이용자가 서비스를 탈퇴하거나 삭제를 요청하면 <strong>즉시</strong> 개인정보를 파기합니다.
            </p>
            <p className="text-gray-500 text-xs">
              단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관 후 파기합니다.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">5. 개인정보 처리 위탁</h2>
            <p className="mb-3">서비스 제공을 위해 아래 업체에 개인정보 처리를 위탁합니다.</p>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">수탁자</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">위탁 내용</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">소재지</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-2.5 font-medium">Supabase</td>
                    <td className="px-4 py-2.5 text-gray-600">데이터베이스 저장 및 인증</td>
                    <td className="px-4 py-2.5 text-gray-600">미국</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium">Vercel</td>
                    <td className="px-4 py-2.5 text-gray-600">웹 서비스 호스팅</td>
                    <td className="px-4 py-2.5 text-gray-600">미국</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-medium">Google</td>
                    <td className="px-4 py-2.5 text-gray-600">소셜 로그인(OAuth) 인증</td>
                    <td className="px-4 py-2.5 text-gray-600">미국</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">6. 만 14세 미만 이용자</h2>
            <p>
              만 14세 미만 이용자는 법정대리인(부모님 등)의 동의를 받은 후 서비스를 이용해야 합니다.
              법정대리인의 동의 없이 가입한 사실이 확인될 경우 해당 계정을 즉시 삭제합니다.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">7. 이용자의 권리</h2>
            <p className="mb-2">이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>개인정보 열람 요청</li>
              <li>개인정보 수정·삭제 요청</li>
              <li>개인정보 처리 정지 요청</li>
              <li>회원 탈퇴 (프로필 페이지에서 직접 또는 이메일 요청)</li>
            </ul>
            <p className="mt-3 text-gray-500 text-xs">
              요청은 아래 개인정보 보호책임자 이메일로 접수하시면 10영업일 이내 처리합니다.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">8. 개인정보 보호책임자</h2>
            <div className="bg-indigo-50 rounded-xl p-4">
              <p className="font-semibold text-indigo-900 mb-1">코드린 개인정보 보호팀</p>
              <p className="text-indigo-700">이메일: <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a></p>
              <p className="text-xs text-indigo-500 mt-2">개인정보 관련 불만 및 권리 행사 요청을 접수합니다.</p>
            </div>
          </section>

          <section>
            <h2 className="font-bold text-base text-gray-900 mb-3">9. 방침 변경 안내</h2>
            <p>
              본 방침이 변경될 경우 시행 7일 전 서비스 공지사항 또는 이메일을 통해 사전 안내합니다.
            </p>
          </section>

        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <Link href="/terms" className="hover:text-gray-600 underline">이용약관</Link>
          <span className="mx-2">·</span>
          <Link href="/" className="hover:text-gray-600">코드린 홈</Link>
        </div>
      </div>
    </div>
  )
}
