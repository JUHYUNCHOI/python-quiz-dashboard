"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

interface OnboardingModalProps {
  onComplete: (course: "python" | "cpp") => void
}

// 학습 플랜 3가지 — 시작할 때 한 번에 잡음
//  python-only : Python만 (C++ 숨김)
//  python-cpp  : Python부터 → 나중에 C++
//  cpp         : C++부터 (Python 알거나 대회)
type Plan = "python-only" | "python-cpp" | "cpp"

/**
 * 신규 학생 온보딩 모달
 * - 첫 방문 시 자동 표시 (localStorage "onboarding-done" 체크)
 * - 플랜 선택 → selectedCourse + cppPlan 저장 → 첫 레슨으로 안내
 */
export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const { t } = useLanguage()
  const [step, setStep] = useState<"welcome" | "course">("welcome")
  const [plan, setPlan] = useState<Plan | null>(null)

  const handleStart = () => {
    if (!plan) return
    const course: "python" | "cpp" = plan === "cpp" ? "cpp" : "python"
    try {
      localStorage.setItem("selectedCourse", course)
      // C++ 노출 여부: 'Python만'이면 only(숨김), 그 외엔 later(노출)
      localStorage.setItem("cppPlan", plan === "python-only" ? "only" : "later")
      localStorage.setItem("onboarding-done", "1")
    } catch {}
    onComplete(course)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-4 pb-0 sm:pb-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">

        {step === "welcome" && (
          <div className="p-6 text-center">
            {/* Giraffe + title */}
            <div className="text-7xl mb-3 animate-bounce">🦒</div>
            <h1 className="text-2xl font-black text-gray-800 mb-1">
              {t("코드린에 오신 걸 환영해요!", "Welcome to Coderin!")}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {t(
                "퀴즈와 실습으로 코딩을 배우는 앱이에요.\n중학생·고등학생을 위한 Python, C++ 커리큘럼을 제공해요.",
                "Learn coding through quizzes and hands-on practice.\nPython & C++ curriculum for middle & high school students."
              )}
            </p>

            {/* 3-step highlights */}
            <div className="space-y-2 mb-6 text-left">
              {[
                { icon: "📚", text: t("단계별 레슨으로 차근차근 배워요", "Learn step by step with structured lessons") },
                { icon: "🧠", text: t("퀴즈로 배운 내용을 확인해요", "Test your knowledge with quizzes") },
                { icon: "🏆", text: t("XP와 스트릭으로 꾸준히 성장해요", "Grow steadily with XP and streaks") },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 px-3 py-2 bg-orange-50 rounded-xl">
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm text-gray-700 font-medium">{text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep("course")}
              className="w-full py-4 rounded-2xl text-lg font-black text-white bg-orange-500 hover:from-orange-500 hover:to-orange-600 transition-all active:scale-95"
            >
              {t("시작하기 🚀", "Get Started 🚀")}
            </button>
          </div>
        )}

        {step === "course" && (
          <div className="p-6">
            <h2 className="text-xl font-black text-gray-800 text-center mb-1">
              {t("어떻게 배울까요?", "How do you want to learn?")}
            </h2>
            <p className="text-sm text-gray-500 text-center mb-5">
              {t("나중에 언제든 바꿀 수 있어요!", "You can always switch later!")}
            </p>

            <div className="space-y-3 mb-6">
              {[
                {
                  id: "python-cpp" as const,
                  emoji: "🐍→⚡",
                  name: t("Python부터 → C++", "Python → C++"),
                  desc: t("Python으로 시작해서, 익숙해지면 C++까지!", "Start with Python, then move on to C++."),
                  badge: t("입문 추천", "Recommended"),
                  colors: "border-green-300 bg-green-50",
                  selectedColors: "border-green-500 bg-green-100 ring-2 ring-green-400",
                  badgeColors: "bg-green-100 text-green-700",
                },
                {
                  id: "python-only" as const,
                  emoji: "🐍",
                  name: t("Python만", "Python only"),
                  desc: t("Python 하나만 차근차근. (C++은 나중에 추가 가능)", "Just Python, step by step. (Add C++ later anytime)"),
                  badge: t("입문", "Beginner"),
                  colors: "border-green-300 bg-green-50",
                  selectedColors: "border-green-500 bg-green-100 ring-2 ring-green-400",
                  badgeColors: "bg-green-100 text-green-700",
                },
                {
                  id: "cpp" as const,
                  emoji: "⚡",
                  name: t("C++부터", "C++ first"),
                  desc: t("Python을 이미 알거나 대회 준비 중이라면!", "Already know Python or preparing for competitions!"),
                  badge: t("중급 ~ USACO", "Intermediate ~ USACO"),
                  colors: "border-blue-300 bg-blue-50",
                  selectedColors: "border-blue-500 bg-blue-100 ring-2 ring-blue-400",
                  badgeColors: "bg-blue-100 text-blue-700",
                },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setPlan(opt.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    plan === opt.id ? opt.selectedColors : opt.colors
                  } hover:scale-[1.01] active:scale-[0.99]`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{opt.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-gray-800">{opt.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${opt.badgeColors}`}>
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 whitespace-pre-line">{opt.desc}</p>
                    </div>
                    {plan === opt.id && (
                      <span className="text-lg">✅</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleStart}
              disabled={!plan}
              className="w-full py-4 rounded-2xl text-lg font-black text-white bg-orange-500 hover:from-orange-500 hover:to-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {t("레슨 시작하기! 📚", "Start Learning! 📚")}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
