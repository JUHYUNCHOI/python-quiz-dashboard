"use client"

import { useState, useEffect, Suspense, lazy } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { ChevronLeft, ChevronRight, CheckCircle, Loader2, ExternalLink, Columns2, X, ZoomIn, ZoomOut } from "lucide-react"
import { ALL_PROBLEMS, PROBLEM_MAP, PROBLEM_INDEX, getOriginalProblemUrl, type ProblemMeta } from "./data"
import { PROBLEM_LOADERS } from "./loaders"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { ALL_TOPICS } from "@/data/algorithm/topics"

const ALGO_UNLOCK_THRESHOLD = 8

const STORAGE_KEY = "quest-solved"

function useQuestSolved(problemId: string) {
  const [solved, setSolved] = useState(false)

  useEffect(() => {
    // 1단계: localStorage 즉시 확인
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[]
      if (stored.includes(problemId)) setSolved(true)
    } catch {}

    // 2단계: DB 확인 (비로그인 시 빈 배열 반환)
    fetch("/api/quest/progress")
      .then(r => r.ok ? r.json() : { solved: [] })
      .then(({ solved: dbSolved }: { solved: string[] }) => {
        if (dbSolved.includes(problemId)) setSolved(true)
        // localStorage에만 있는 항목 → DB 마이그레이션
        const lsSolved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[]
        const toMigrate = lsSolved.filter((id: string) => !dbSolved.includes(id))
        if (toMigrate.length > 0) {
          for (const id of toMigrate) {
            fetch("/api/quest/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ problemId: id }),
            }).catch(() => {})
          }
        }
        // localStorage 최신화
        const merged = [...new Set([...dbSolved, ...lsSolved])]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      })
      .catch(() => {})
  }, [problemId])

  const markSolved = () => {
    // 즉시 UI 반영
    setSolved(true)
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[]
      if (!stored.includes(problemId)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...stored, problemId]))
      }
    } catch {}
    // DB 저장
    fetch("/api/quest/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId }),
    }).catch(() => {})
  }

  return { solved, markSolved }
}

function ProblemLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <Loader2 size={36} className="animate-spin text-purple-500" />
      <div className="text-sm font-semibold text-gray-500">튜토리얼 로딩 중...</div>
    </div>
  )
}

// Cache of lazily-created components so we don't recreate them on every render
const LAZY_CACHE = new Map<string, React.LazyExoticComponent<React.ComponentType<{ lang?: string }>>>()

function getLazyComponent(problemId: string) {
  if (LAZY_CACHE.has(problemId)) return LAZY_CACHE.get(problemId)!
  const loader = PROBLEM_LOADERS[problemId]
  if (!loader) return null
  const LazyComp = lazy(loader)
  LAZY_CACHE.set(problemId, LazyComp)
  return LazyComp
}

declare global { interface Window { _questLang?: string } }

export default function QuestProblemClient({ problemId }: { problemId: string }) {
  const router = useRouter()
  const { lang, t } = useLanguage()
  const { profile } = useAuth()
  const meta = PROBLEM_MAP.get(problemId)

  // ── 잠금 체크: 알고 토픽 8개 미만이면 /quest로 리다이렉트 ──
  const [lockChecked, setLockChecked] = useState(false)
  useEffect(() => {
    const isTeacher = profile?.role === "teacher"
    if (isTeacher) { setLockChecked(true); return }
    try {
      const algoCompleted = JSON.parse(localStorage.getItem("algo-completed") || "[]") as string[]
      const algoCompletedSet = new Set(algoCompleted)
      const topicsDone = ALL_TOPICS.filter(topic =>
        topic.problems.some((p: { id: string }) => algoCompletedSet.has(p.id))
      ).length
      if (topicsDone < ALGO_UNLOCK_THRESHOLD) {
        router.replace("/quest")
        return
      }
    } catch { /* ignore */ }
    setLockChecked(true)
  }, [profile, router])

  // ⚠️ 모든 hook 호출은 early return 앞에 있어야 함 (Rules of Hooks).
  // useQuestSolved 가 아래에 있던 시절: lockChecked=false → return null → hook 개수
  // 줄어듦 → "change in the order of Hooks" 에러 발생. 위로 끌어올려서 매 렌더
  // 동일하게 호출되도록 보장.
  const { solved, markSolved } = useQuestSolved(problemId)

  // 반반 스크린: 좌=튜토리얼, 우=USACO 원본 문제 iframe
  const [splitView, setSplitView] = useState(false)
  const [iframeBlocked, setIframeBlocked] = useState(false)
  const [iframeZoom, setIframeZoom] = useState(1) // 0.5 ~ 1.5

  if (!lockChecked) return null

  // Sync synchronously so lazy-loaded App components initialize with correct lang
  if (typeof window !== "undefined") {
    window._questLang = lang
  }

  const idx = PROBLEM_INDEX.get(problemId) ?? -1
  const prevProblem = idx > 0 ? ALL_PROBLEMS[idx - 1] : null
  const nextProblem = idx < ALL_PROBLEMS.length - 1 ? ALL_PROBLEMS[idx + 1] : null

  if (!meta) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center flex-col gap-4 p-6">
          <div className="text-4xl">🔍</div>
          <div className="text-lg font-bold text-gray-700">{t("문제를 찾을 수 없어요", "Problem not found")}</div>
          <Link href="/quest" className="text-sm text-blue-600 font-semibold underline">
            {t("문제 목록으로 돌아가기", "Back to problem list")}
          </Link>
        </main>
      </div>
    )
  }

  const LazyComp = getLazyComponent(meta.id)

  return (
    <div className="min-h-screen bg-[#f3f0ff] flex flex-col">
      <Header />

      {/* Breadcrumb: USACO · Dec 2024 Bronze #2 + done button */}
      <div className="bg-white border-b-2 border-black px-3 py-2 sticky top-[57px] z-30 flex items-center gap-2">
        <Link href="/quest" className="text-gray-400 hover:text-gray-700 flex-shrink-0" title={t("문제 목록", "Problem list")}>
          <ChevronLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{meta.section}</span>
          <span className="text-gray-300 mx-1.5">·</span>
          <span className="text-xs font-semibold text-gray-700 truncate">{meta.sub}</span>
        </div>
        {/* 원래 문제 — 반반 스크린 토글 (md 이상) + 새 탭 열기 */}
        <button
          onClick={() => {
            setIframeBlocked(false)
            setSplitView(v => !v)
          }}
          className={`hidden md:flex flex-shrink-0 items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md border transition-colors ${
            splitView
              ? "bg-amber-100 border-amber-400 text-amber-800"
              : "text-gray-500 hover:text-amber-700 border-gray-200 hover:border-amber-300 hover:bg-amber-50"
          }`}
          title={t("원본 문제를 옆에 띄우기", "Show original problem side-by-side")}
        >
          <Columns2 size={11} />
          <span>{splitView ? t("닫기", "Close") : t("원래 문제", "Original")}</span>
        </button>
        <a
          href={getOriginalProblemUrl(meta)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-amber-700 px-2 py-1 rounded-md border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors"
          title={t("새 탭에서 원본 문제 열기", "Open original problem in new tab")}
        >
          <ExternalLink size={11} />
          <span className="md:hidden">{t("원래 문제", "Original")}</span>
        </a>
        {solved ? (
          <div className="flex items-center gap-1 bg-green-50 border border-green-300 rounded-full px-2 py-0.5 flex-shrink-0">
            <CheckCircle size={12} className="text-green-600" />
            <span className="text-xs font-bold text-green-700">{t("완료", "Done")}</span>
          </div>
        ) : (
          <button
            onClick={markSolved}
            className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border-2 border-black bg-green-400 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            ✅ {t("완료", "Done")}
          </button>
        )}
      </div>

      {/* Prev / Next problem — 위쪽으로 이동. App 내부의 step ←→ 와 헷갈리지 않도록.
          이전엔 페이지 하단에 있어서 App 의 fixed bottom nav (step 이동) 와 한 화면에 같이 노출 → 학생 혼동. */}
      <div className="bg-amber-50/40 border-b border-amber-200 px-3 py-2 flex gap-2">
        {prevProblem ? (
          <button
            onClick={() => router.push(`/quest/${prevProblem.id}`)}
            className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white text-xs font-semibold text-gray-700 hover:bg-amber-50 transition-colors min-w-0"
          >
            <ChevronLeft size={14} className="flex-shrink-0 text-amber-600" />
            <div className="text-left min-w-0">
              <div className="text-[9px] text-gray-400 font-medium leading-none">{t("이전 문제", "Prev problem")}</div>
              <div className="truncate leading-tight">{prevProblem.title}</div>
            </div>
          </button>
        ) : <div className="flex-1" />}

        {nextProblem ? (
          <button
            onClick={() => router.push(`/quest/${nextProblem.id}`)}
            className="flex-1 flex items-center justify-end gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white text-xs font-semibold text-gray-700 hover:bg-amber-50 transition-colors min-w-0"
          >
            <div className="text-right min-w-0">
              <div className="text-[9px] text-gray-400 font-medium leading-none">{t("다음 문제", "Next problem")}</div>
              <div className="truncate leading-tight">{nextProblem.title}</div>
            </div>
            <ChevronRight size={14} className="flex-shrink-0 text-amber-600" />
          </button>
        ) : <div className="flex-1" />}
      </div>

      {/* Problem App + (옵션) 원본 문제 iframe 반반 스크린.
          md 이상에서만 split. 모바일은 너무 좁아서 토글 버튼 자체를 숨김. */}
      <div className="flex-1 flex min-h-0">
        {/* key=lang forces remount so useState initializer re-runs with new lang */}
        <main className={splitView ? "flex-1 md:w-1/2 min-w-0 overflow-auto" : "flex-1 min-w-0"}>
          {LazyComp ? (
            <Suspense fallback={<ProblemLoadingSpinner />}>
              <LazyComp key={lang} />
            </Suspense>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-24 px-6 text-center">
              <div className="text-5xl">🚧</div>
              <div className="text-base font-bold text-gray-700">{t("튜토리얼 준비 중입니다", "Tutorial coming soon")}</div>
            </div>
          )}
        </main>

        {splitView && (() => {
          const originalUrl = getOriginalProblemUrl(meta)
          // Google 검색 fallback (url 필드 비어있을 때) → iframe 차단되므로 친절한 안내 UI
          const isGoogleFallback = originalUrl.startsWith("https://www.google.com/search")
          return (
            <aside className="hidden md:flex flex-1 md:w-1/2 min-w-0 border-l-2 border-black bg-white flex-col">
              <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-gray-300 bg-amber-50 flex-shrink-0">
                {/* URL 박스 — 클릭하면 새 탭에서 열림 */}
                <a
                  href={originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-0 flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-gray-300 hover:border-amber-400 hover:bg-amber-50 transition-colors group"
                  title={t("새 탭에서 원본 문제 열기", "Open original in new tab")}
                >
                  <ExternalLink size={11} className="text-amber-700 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] text-gray-600 truncate font-mono">{originalUrl.replace(/^https?:\/\//, "")}</span>
                </a>
                {/* Zoom 컨트롤 */}
                {!isGoogleFallback && !iframeBlocked && (
                  <div className="flex items-center gap-0.5 flex-shrink-0 border border-gray-300 rounded-md bg-white">
                    <button
                      onClick={() => setIframeZoom(z => Math.max(0.5, +(z - 0.1).toFixed(2)))}
                      disabled={iframeZoom <= 0.5}
                      className="p-1 text-gray-600 hover:bg-amber-100 disabled:opacity-30 disabled:cursor-not-allowed rounded-l-md"
                      title={t("축소", "Zoom out")}
                    >
                      <ZoomOut size={13} />
                    </button>
                    <button
                      onClick={() => setIframeZoom(1)}
                      className="px-1 text-[10px] font-semibold text-gray-600 hover:bg-amber-100 min-w-[2.5rem]"
                      title={t("100% 로 리셋", "Reset to 100%")}
                    >
                      {Math.round(iframeZoom * 100)}%
                    </button>
                    <button
                      onClick={() => setIframeZoom(z => Math.min(1.5, +(z + 0.1).toFixed(2)))}
                      disabled={iframeZoom >= 1.5}
                      className="p-1 text-gray-600 hover:bg-amber-100 disabled:opacity-30 disabled:cursor-not-allowed rounded-r-md"
                      title={t("확대", "Zoom in")}
                    >
                      <ZoomIn size={13} />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setSplitView(false)}
                  className="text-gray-500 hover:text-gray-800 p-1 hover:bg-gray-200 rounded-md flex-shrink-0"
                  title={t("닫기", "Close")}
                >
                  <X size={14} />
                </button>
              </div>
              {isGoogleFallback || iframeBlocked ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="text-3xl">{isGoogleFallback ? "🔗" : "🚫"}</div>
                  <div className="text-sm font-bold text-gray-700">
                    {isGoogleFallback
                      ? t("이 문제는 원본 링크가 아직 등록되지 않았어요", "Original link not registered yet")
                      : t("이 페이지는 옆에 띄울 수 없어요", "This page can't be embedded")}
                  </div>
                  <div className="text-xs text-gray-500 max-w-xs">
                    {isGoogleFallback
                      ? t("Google에서 직접 검색해서 찾아볼 수 있어요.", "You can search Google to find it.")
                      : t("새 탭에서 열어주세요.", "Open it in a new tab instead.")}
                  </div>
                  <a
                    href={originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]"
                  >
                    <ExternalLink size={11} />
                    {isGoogleFallback ? t("Google 검색 열기", "Open Google search") : t("새 탭에서 열기", "Open in new tab")}
                  </a>
                </div>
              ) : (
                // 확대 시 scrollWrapper 가 자동으로 스크롤바 띄움 → 모두가 아는 패턴.
                // 별도 pan 모드/단축키 없이 휠/트랙패드/스크롤바로 자연스럽게 이동.
                //
                // 레이아웃 트릭:
                //   sizedBox: zoom 비율로 layout 크기 늘림 (zoom>1 일 때 wrapper 보다 커짐)
                //   iframe: sizedBox 안에 100%×100% 로 넣고 transform: scale(zoom) 으로 시각 확대
                //   → 결과적으로 iframe 시각 크기 = sizedBox layout 크기 → wrapper 가 정확히 그만큼 스크롤
                <div className="flex-1 overflow-auto bg-white">
                  <div
                    style={{
                      width: `${iframeZoom * 100}%`,
                      height: `${iframeZoom * 100}%`,
                      // zoom < 1 일 때는 sizedBox 가 wrapper 보다 작아서 빈 공간 생김 → 그대로 OK
                    }}
                  >
                    <iframe
                      key={meta.id}
                      src={originalUrl}
                      style={{
                        width: `${100 / iframeZoom}%`,
                        height: `${100 / iframeZoom}%`,
                        transform: `scale(${iframeZoom})`,
                        transformOrigin: "top left",
                        border: 0,
                      }}
                      onError={() => setIframeBlocked(true)}
                      title={t("원본 문제", "Original problem")}
                    />
                  </div>
                </div>
              )}
            </aside>
          )
        })()}
      </div>
    </div>
  )
}
