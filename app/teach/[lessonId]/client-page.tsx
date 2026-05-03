"use client"

import { use, useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Lock, Unlock, X, BookOpen } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { renderContent } from "@/components/learn/render-content"
import { lessonsData, bilingualLessons, lessonVariants } from "@/components/learn/lesson-registry"
import { cn } from "@/lib/utils"

/**
 * /teach/[lessonId] — 선생님 한국어 미러 창
 *
 * 용도: 영어 수업 중 학생들에겐 영어 화면 공유, 선생님 본인은 노트북에서 같은 페이지를
 * 한국어로 봄. 자동 동기화로 학생 화면 따라옴.
 *
 * 접근 권한: julia.juhyun@gmail.com 만 (다른 계정은 안내 후 차단).
 *
 * 표시 내용: 학생이 보는 `content` 필드를 그대로 KO 로 보여줌. 별도 스크립트/가이드 없음.
 * tryit/quiz/practice 같은 인터랙티브 스텝은 task + initialCode + expectedOutput 만 정적으로 표시.
 */
const ALLOWED_EMAIL = "julia.juhyun@gmail.com"

export default function TeachPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params)
  const { t } = useLanguage()
  const { user, profile, isLoading: authLoading } = useAuth()

  // 한국어 강제 — useLanguage 의 lang 값과 무관하게 KO 데이터 사용.
  const lesson = (() => {
    if (lessonId in lessonVariants) {
      const variants = lessonVariants[lessonId]
      const firstKey = Object.keys(variants)[0]
      return variants[firstKey]?.ko
    }
    if (lessonId in bilingualLessons) {
      return bilingualLessons[lessonId].ko
    }
    return lessonsData[lessonId]
  })()

  // 학생 화면 위치 동기화 — localStorage `lesson-position-{lessonId}` 읽음
  const [chapterIdx, setChapterIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [syncOn, setSyncOn] = useState<boolean>(true)

  const followStudent = useCallback(() => {
    if (typeof window === "undefined") return
    try {
      const raw = localStorage.getItem(`lesson-position-${lessonId}`)
      if (!raw) return
      const pos = JSON.parse(raw)
      if (typeof pos.chapter === "number" && typeof pos.step === "number") {
        setChapterIdx(pos.chapter)
        setStepIdx(pos.step)
      }
    } catch {}
  }, [lessonId])

  useEffect(() => { followStudent() }, [followStudent])

  useEffect(() => {
    if (typeof window === "undefined") return
    const handler = (e: StorageEvent) => {
      if (!syncOn) return
      if (e.key !== `lesson-position-${lessonId}` || !e.newValue) return
      try {
        const pos = JSON.parse(e.newValue)
        if (typeof pos.chapter === "number" && typeof pos.step === "number") {
          setChapterIdx(pos.chapter)
          setStepIdx(pos.step)
        }
      } catch {}
    }
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }, [lessonId, syncOn])

  const toggleSync = () => {
    setSyncOn(prev => {
      const next = !prev
      if (next) setTimeout(() => followStudent(), 0) // OFF→ON: 즉시 학생 위치로
      return next
    })
  }

  // ── 권한 체크 ────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    )
  }

  if (!user || user.email !== ALLOWED_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <BookOpen className="w-10 h-10 text-purple-400 mx-auto mb-3" />
          <h1 className="text-lg font-bold text-gray-900 mb-2">선생님 전용 페이지</h1>
          <p className="text-sm text-gray-600 mb-1">
            이 페이지는 <span className="font-mono">{ALLOWED_EMAIL}</span> 계정만 사용할 수 있어요.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            현재 로그인: {user?.email ?? "(로그인 안 됨)"}
          </p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <p className="text-lg text-purple-700">레슨을 찾을 수 없어요: {lessonId}</p>
      </div>
    )
  }

  const chapter = lesson.chapters[chapterIdx]
  const step = chapter?.steps[stepIdx]
  const totalSteps = lesson.chapters.reduce((s, c) => s + c.steps.length, 0)
  const globalStepIdx = lesson.chapters.slice(0, chapterIdx).reduce((s, c) => s + c.steps.length, 0) + stepIdx

  const goPrev = () => {
    if (stepIdx > 0) setStepIdx(stepIdx - 1)
    else if (chapterIdx > 0) {
      const prevCh = chapterIdx - 1
      setChapterIdx(prevCh)
      setStepIdx(lesson.chapters[prevCh].steps.length - 1)
    }
  }
  const goNext = () => {
    if (stepIdx < (chapter?.steps.length ?? 0) - 1) setStepIdx(stepIdx + 1)
    else if (chapterIdx < lesson.chapters.length - 1) {
      setChapterIdx(chapterIdx + 1)
      setStepIdx(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50/30">
      {/* 헤더 */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-purple-200 shadow-sm">
        <div className="max-w-[900px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <BookOpen className="w-5 h-5 text-purple-600 shrink-0" />
              <span className="font-bold text-purple-900 text-sm truncate">
                선생님 화면 (한국어) — {lesson.emoji} {lesson.title}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={toggleSync}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors",
                  syncOn
                    ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
                    : "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100"
                )}
                title={syncOn
                  ? "자동 동기화 켜짐 — 학생 화면 따라감. 클릭하면 자유 탐색."
                  : "자유 탐색 — 직접 페이지 이동. 클릭하면 학생 위치로 점프."
                }
              >
                {syncOn ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                {syncOn ? "동기화 ON" : "자유 탐색"}
              </button>
              <button
                onClick={() => window.close()}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1"
                title="창 닫기"
                aria-label="창 닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* 진행 표시 */}
          <div className="flex items-center justify-between gap-3 text-xs text-purple-700">
            <span className="truncate">
              {chapter?.emoji} {chapter?.title} · {step?.title}
            </span>
            <span className="shrink-0 font-mono">{globalStepIdx + 1} / {totalSteps}</span>
          </div>
        </div>
      </div>

      {/* 본문 — 학생 화면과 동일한 content (KO) */}
      <div className="max-w-[900px] mx-auto px-5 py-6 pb-24">
        {step ? (
          <>
            {/* 스텝 타입 + 수동 네비 (자유 탐색 모드일 때만) */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 capitalize">
                {step.type}
              </span>
              {!syncOn && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={goPrev}
                    className="px-2 py-1 rounded-lg bg-white border border-purple-200 hover:bg-purple-50 text-purple-700 disabled:opacity-50"
                    title="이전 페이지"
                    disabled={chapterIdx === 0 && stepIdx === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goNext}
                    className="px-2 py-1 rounded-lg bg-white border border-purple-200 hover:bg-purple-50 text-purple-700"
                    title="다음 페이지"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* 본문 — 학생이 보는 그대로 (KO) */}
            <div className="text-base md:text-lg space-y-3 leading-relaxed">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h2>

              {/* explain 스텝: content 표시 */}
              {step.content && renderContent(step.content)}

              {/* tryit/mission/quiz 등 인터랙티브 스텝의 정적 표시 */}
              {step.task && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xs font-bold text-blue-700 mb-1">📝 과제</div>
                  <div className="text-sm text-blue-900">{step.task}</div>
                </div>
              )}
              {step.initialCode && (
                <div className="mt-3">
                  <div className="text-xs font-bold text-gray-600 mb-1">시작 코드</div>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                    {step.initialCode}
                  </pre>
                </div>
              )}
              {step.expectedOutput && (
                <div className="mt-3">
                  <div className="text-xs font-bold text-gray-600 mb-1">기대 출력</div>
                  <pre className="bg-green-50 border border-green-200 text-green-900 p-3 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                    {step.expectedOutput}
                  </pre>
                </div>
              )}
              {step.stdin && (
                <div className="mt-3">
                  <div className="text-xs font-bold text-gray-600 mb-1">입력 (stdin)</div>
                  <pre className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                    {step.stdin}
                  </pre>
                </div>
              )}
              {step.options && step.options.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs font-bold text-gray-600 mb-2">선택지</div>
                  <ul className="space-y-1">
                    {step.options.map((opt, i) => (
                      <li
                        key={i}
                        className={cn(
                          "text-sm px-3 py-2 rounded-lg border",
                          step.answer === i
                            ? "bg-green-50 border-green-300 text-green-900 font-bold"
                            : "bg-gray-50 border-gray-200 text-gray-700"
                        )}
                      >
                        {step.answer === i && "✅ "}{opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {step.explanation && (
                <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="text-xs font-bold text-purple-700 mb-1">💡 풀이</div>
                  <div className="text-sm text-purple-900">{step.explanation}</div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-purple-700">스텝을 찾을 수 없어요.</p>
        )}
      </div>
    </div>
  )
}
