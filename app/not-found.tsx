import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <div className="text-8xl mb-6 animate-bounce inline-block">🦒</div>
        <h1 className="text-2xl font-black text-gray-800 mb-2">페이지를 찾을 수 없어요</h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          기린이 이 페이지를 아무리 목을 늘여도<br />
          찾을 수가 없대요. 주소를 확인해주세요.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors"
        >
          홈으로 돌아가기
        </Link>
        <p className="mt-4 text-xs text-gray-400">Error 404</p>
      </div>
    </div>
  )
}
