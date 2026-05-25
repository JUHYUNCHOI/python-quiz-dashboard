"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface AlgoViewerProps {
  topicId: string
  codeTrack: "cpp" | "python"
}

interface StageProblem {
  id: string
  title: string
  difficulty?: string
}

interface Stage {
  num: number
  title: string
  desc?: string
  problems: StageProblem[]
}

interface ProblemTab {
  id: string
  label: string
  icon: string
}

declare global {
  interface Window {
    _algoLang?: string
    _algoTrack: string
    _setAlgoLang?: (lang: string) => void
    _switchToTab?: (tabId: string) => void
  }
}

const DIFF_STYLE: Record<string, string> = {
  silver: "bg-slate-100 text-slate-600 border-slate-200",
  gold:   "bg-yellow-100 text-yellow-700 border-yellow-200",
  bronze: "bg-amber-100 text-amber-700 border-amber-200",
  easy:   "bg-green-100 text-green-700 border-green-200",
  medium: "bg-orange-100 text-orange-700 border-orange-200",
  hard:   "bg-red-100 text-red-700 border-red-200",
}
const DIFF_LABEL: Record<string, string> = {
  silver: "Silver", gold: "Gold", bronze: "Bronze",
  easy: "Easy", medium: "Medium", hard: "Hard",
}

export function AlgoViewer({ topicId, codeTrack }: AlgoViewerProps) {
  const conceptRef  = useRef<HTMLDivElement>(null)
  const problemRef  = useRef<HTMLDivElement>(null)
  const problemAreaRef = useRef<HTMLDivElement>(null)

  const [status, setStatus]           = useState<"loading" | "ready" | "error">("loading")
  const [errorMsg, setErrorMsg]       = useState("")
  const [stages, setStages]           = useState<Stage[]>([])
  const [selectedId, setSelectedId]   = useState<string | null>(null)
  const [activeTab, setActiveTab]     = useState("problem")
  const [problemTabs, setProblemTabs] = useState<ProblemTab[]>([])
  // 📚 개념 섹션 페이지네이션 — 4000줄 HTML 덤프를 .concept-section 단위로 잘라서 한 번에 하나만 보여줌
  const [conceptSections, setConceptSections] = useState<{ idx: number; title: string }[]>([])
  const [conceptIdx, setConceptIdx] = useState(0)

  const { lang } = useLanguage()

  // ── 전역 함수: JS 내부 버튼에서 탭 전환 ──────────────────────────
  const switchTabRef = useRef(setActiveTab)
  switchTabRef.current = setActiveTab

  useEffect(() => {
    window._switchToTab = (tabId: string) => {
      switchTabRef.current(tabId)
      setTimeout(() => {
        problemAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 50)
    }
    ;(window as any).selectProblem = (tid: string, pid: string) => {
      if (tid === topicId) handleSelectProblem(pid)
    }
    return () => {
      delete window._switchToTab
      delete (window as any).selectProblem
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId])

  // ── highlight.js 한번만 로드 ──────────────────────────────────────
  useEffect(() => {
    const cssId = "hljs-css"
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link")
      link.id = cssId; link.rel = "stylesheet"
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
      document.head.appendChild(link)
    }
    const jsId = "hljs-js"
    if (!document.getElementById(jsId)) {
      const s = document.createElement("script")
      s.id = jsId; s.async = true
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
      document.head.appendChild(s)
    }
  }, [])

  // ── codeTrack 변경 → body[data-lang] 반영 ──────────────────────
  useEffect(() => {
    document.body.setAttribute("data-lang", codeTrack)
    window._algoLang  = codeTrack
    window._algoTrack = codeTrack
    window._setAlgoLang = (l: string) => {
      document.body.setAttribute("data-lang", l)
      window._algoLang = l
    }
  }, [codeTrack])

  // ── 토픽 JS 로드 + 개념 렌더링 ──────────────────────────────────
  useEffect(() => {
    // CSS
    const cssId = "algo-lab-css"
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link")
      link.id = cssId; link.rel = "stylesheet"; link.href = "/algo/style.css"
      document.head.appendChild(link)
    }
    // 공유 유틸 (renderSolutionsCodeTab 등)
    const sharedId = "algo-shared-js"
    if (!document.getElementById(sharedId)) {
      const s = document.createElement("script")
      s.id = sharedId; s.src = "/algo/shared.js"
      document.head.appendChild(s)
    }

    document.body.setAttribute("data-lang", codeTrack)
    window._algoLang = codeTrack; window._algoTrack = codeTrack
    window._setAlgoLang = (l: string) => {
      document.body.setAttribute("data-lang", l); window._algoLang = l
    }

    if (conceptRef.current) conceptRef.current.innerHTML = ""
    setStatus("loading")
    setStages([])
    setSelectedId(null)
    setActiveTab("problem")

    // 이전 언어 스크립트 교체 (언어 전환 시 캐시 무효화)
    const prevId = `algo-topic-${topicId}-${lang === "en" ? "ko" : "en"}`
    if (document.getElementById(prevId)) {
      document.getElementById(prevId)?.remove()
      delete (window.AlgoTopics as Record<string, unknown>)[topicId]
    }

    // 현재 언어로 이미 캐시된 경우 바로 렌더
    if (window.AlgoTopics?.[topicId]) { renderTopic(); return }

    const scriptId = `algo-topic-${topicId}-${lang}`
    if (document.getElementById(scriptId)) {
      const check = setInterval(() => {
        if (window.AlgoTopics?.[topicId]) { clearInterval(check); renderTopic() }
      }, 50)
      return () => clearInterval(check)
    }

    const script = document.createElement("script")
    script.id = scriptId
    script.src = lang === "en" ? `/algo/topics/en/${topicId}.js` : `/algo/topics/${topicId}.js`
    script.async = true
    script.onload  = () => window.AlgoTopics?.[topicId] ? renderTopic()
      : (setErrorMsg(`토픽 '${topicId}'를 찾을 수 없어요.`), setStatus("error"))
    script.onerror = () => (setErrorMsg(`파일 로드 실패: ${script.src}`), setStatus("error"))
    document.head.appendChild(script)

    function renderTopic() {
      if (!conceptRef.current) return
      try {
        conceptRef.current.innerHTML = ""
        window.AlgoTopics[topicId].renderConcept(conceptRef.current)
        hljs()
        // 문제 목록 추출
        setStages(buildStages(window.AlgoTopics[topicId]))

        // 📚 개념 섹션 추출 — .concept-section 단위로 페이지네이션
        const sectionEls = conceptRef.current.querySelectorAll<HTMLElement>(".concept-section")
        const sections = Array.from(sectionEls).map((el, i) => {
          // 섹션 제목 추출 (.concept-section-title 텍스트, 없으면 "Section N")
          const titleEl = el.querySelector(".concept-section-title")
          const title = titleEl?.textContent?.replace(/^\d+\s*/, "").trim() || `Section ${i + 1}`
          return { idx: i, title }
        })
        setConceptSections(sections)
        setConceptIdx(0)  // 펼쳤을 때 첫 섹션부터

        setStatus("ready")
      } catch (e) {
        setErrorMsg(`렌더링 오류: ${e}`)
        setStatus("error")
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, lang])

  // ── 📚 개념 섹션 전환 — display:none 토글 (이벤트 핸들러 유지 위해 DOM 그대로) ──
  useEffect(() => {
    if (!conceptRef.current || conceptSections.length === 0) return
    const sectionEls = conceptRef.current.querySelectorAll<HTMLElement>(".concept-section")
    sectionEls.forEach((el, i) => {
      el.style.display = i === conceptIdx ? "" : "none"
    })
  }, [conceptIdx, conceptSections])

  // ── 문제 탭 내용 렌더링 ─────────────────────────────────────────
  useEffect(() => {
    if (!selectedId || !problemRef.current) return
    const topic = window.AlgoTopics?.[topicId]
    if (!topic?.renderProblemContent) return
    try {
      problemRef.current.innerHTML = ""
      topic.renderProblemContent(problemRef.current, selectedId, activeTab)
      hljs()
    } catch (e) {
      if (problemRef.current)
        problemRef.current.innerHTML = `<p style="color:red;padding:1rem">렌더링 오류: ${e}</p>`
    }
  }, [selectedId, activeTab, topicId])

  // ── 문제 선택 핸들러 ────────────────────────────────────────────
  const handleSelectProblem = useCallback((pid: string) => {
    const topic = window.AlgoTopics?.[topicId]
    const tabs: ProblemTab[] = topic?.getProblemTabs?.(pid) ?? [
      { id: "problem", label: "문제",       icon: "📋" },
      { id: "think",   label: "생각해볼것", icon: "💡" },
      { id: "sim",     label: "시뮬레이션", icon: "🎮" },
      { id: "code",    label: "코드",       icon: "💻" },
    ]
    setProblemTabs(tabs)
    setSelectedId(pid)
    setActiveTab("problem")
    setTimeout(() => {
      problemAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }, [topicId])

  // ── hljs 유틸 ───────────────────────────────────────────────────
  function hljs() {
    const w = window as any
    if (w.hljs?.highlightAll) w.hljs.highlightAll()
  }

  // ── 스테이지 데이터 추출 ─────────────────────────────────────────
  function buildStages(topic: any): Stage[] {
    if (!topic) return []
    const probById: Record<string, any> = {}
    ;(topic.problems ?? []).forEach((p: any) => { probById[p.id] = p })

    if (topic.stages?.length) {
      return topic.stages.map((s: any) => ({
        num: s.num,
        title: s.title,
        desc: s.desc ?? "",
        problems: (s.problemIds ?? [])
          .map((pid: string) => probById[pid])
          .filter(Boolean)
          .map((p: any) => ({ id: p.id, title: p.title, difficulty: p.difficulty })),
      }))
    }

    // stages 없으면 flat list → 하나의 stage로
    if (topic.problems?.length) {
      return [{
        num: 1,
        title: lang === "en" ? "Problems" : "연습 문제",
        problems: topic.problems.map((p: any) => ({
          id: p.id, title: p.title, difficulty: p.difficulty,
        })),
      }]
    }
    return []
  }

  // ── 에러 ────────────────────────────────────────────────────────
  if (status === "error") {
    return (
      <div className="flex items-center justify-center py-20 text-red-500 px-4">
        <p>{errorMsg}</p>
      </div>
    )
  }

  // ── 현재 선택된 문제 제목 ────────────────────────────────────────
  const selectedProblemTitle = (() => {
    if (!selectedId) return null
    const topic = window.AlgoTopics?.[topicId]
    return topic?.problems?.find((p: any) => p.id === selectedId)?.title ?? selectedId
  })()

  return (
    <div className="relative">
      {status === "loading" && (
        <div className="flex items-center justify-center py-20 z-10">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
        </div>
      )}

      {/* ── 문제 목록 섹션 — 학생이 '뭘 풀어야 하지?' 답이 먼저 보이게 위로 ── */}
      {status === "ready" && stages.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            {lang === "en" ? "🧪 Practice Problems" : "🧪 연습 문제"}
            <span className="ml-2 text-sm font-normal text-gray-400">
              {stages.reduce((n, s) => n + s.problems.length, 0)}{lang === "en" ? " problems" : "개"}
            </span>
          </h2>
          <p className="text-xs text-gray-500 mb-5">
            {lang === "en"
              ? "Pick a problem to start. Concept reference is below — open if you need it."
              : "풀어볼 문제를 골라요. 개념 설명은 아래에서 필요할 때 펼쳐봐요."}
          </p>

          <div className="flex flex-col gap-4">
            {stages.map(stage => (
              <div key={stage.num} className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                {/* 스테이지 헤더 */}
                <div className="flex items-center gap-3 px-4 py-2.5 bg-purple-50 border-b border-purple-100">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center">
                    {stage.num}
                  </span>
                  <span className="font-bold text-sm text-purple-900">{stage.title}</span>
                  {stage.desc && (
                    <span className="text-xs text-purple-400 ml-1">{stage.desc}</span>
                  )}
                  <span className="ml-auto text-xs text-purple-300 font-medium">
                    {stage.problems.length}{lang === "en" ? " prob" : "문제"}
                  </span>
                </div>
                {/* 문제 리스트 */}
                <div className="divide-y divide-gray-100">
                  {stage.problems.map(prob => {
                    const isSelected = prob.id === selectedId
                    const diffStyle = DIFF_STYLE[prob.difficulty ?? ""] ?? ""
                    const diffLabel = DIFF_LABEL[prob.difficulty ?? ""] ?? ""
                    return (
                      <button
                        key={prob.id}
                        onClick={() => handleSelectProblem(prob.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-left transition-all group",
                          isSelected
                            ? "bg-purple-50 border-l-4 border-purple-500"
                            : "hover:bg-gray-50 border-l-4 border-transparent"
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm font-semibold truncate",
                            isSelected ? "text-purple-700" : "text-gray-800 group-hover:text-purple-600"
                          )}>
                            {prob.title}
                          </p>
                        </div>
                        {diffLabel && (
                          <span className={cn("flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded border", diffStyle)}>
                            {diffLabel}
                          </span>
                        )}
                        <span className={cn(
                          "flex-shrink-0 text-gray-300 group-hover:text-purple-400 transition-colors font-bold",
                          isSelected && "text-purple-500"
                        )}>→</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 개념 설명 — 페이지네이션. 한 번에 한 섹션만 노출.
          항상 마운트 (status 와 무관하게 conceptRef 가 같은 DOM 노드 가리키도록).
          로딩 중에는 Tailwind hidden 으로 숨김. */}
      <details className={cn("max-w-[1400px] mx-auto px-4 sm:px-6 my-4 group", status !== "ready" && "hidden")}>
        <summary className="cursor-pointer list-none flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border-2 border-amber-200 hover:border-amber-300 transition-colors text-sm font-bold text-amber-800">
          <span className="group-open:rotate-90 transition-transform text-xs">▶</span>
          📖 {lang === "en" ? "Concept reference" : "개념 설명"}
          {conceptSections.length > 0 && (
            <span className="ml-auto text-xs font-normal text-amber-600">
              {conceptSections.length}{lang === "en" ? " sections" : "개 섹션"}
            </span>
          )}
        </summary>

        {/* 섹션 네비게이션 — 칩 + 진도 + 이전/다음 */}
        {conceptSections.length > 1 && (
          <div className="mt-3 mb-2 px-1 space-y-2">
            {/* 섹션 칩 리스트 — 클릭으로 점프 */}
            <div className="flex flex-wrap gap-1">
              {conceptSections.map(s => (
                <button
                  key={s.idx}
                  onClick={() => setConceptIdx(s.idx)}
                  className={cn(
                    "px-2 py-1 rounded-md text-[11px] font-bold border transition-colors text-left max-w-[200px] truncate",
                    s.idx === conceptIdx
                      ? "bg-purple-500 text-white border-purple-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  )}
                  title={s.title}
                >
                  {s.idx + 1}. {s.title}
                </button>
              ))}
            </div>
            {/* 진도 바 */}
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${((conceptIdx + 1) / conceptSections.length) * 100}%` }}
              />
            </div>
            {/* 이전/다음 + 위치 표시 */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => setConceptIdx(Math.max(0, conceptIdx - 1))}
                disabled={conceptIdx === 0}
                className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-gray-700"
              >
                ← {lang === "en" ? "Prev" : "이전"}
              </button>
              <span className="text-gray-500 font-bold tabular-nums">
                {conceptIdx + 1} / {conceptSections.length}
              </span>
              <button
                onClick={() => setConceptIdx(Math.min(conceptSections.length - 1, conceptIdx + 1))}
                disabled={conceptIdx === conceptSections.length - 1}
                className="px-2.5 py-1 rounded-md bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed font-bold"
              >
                {lang === "en" ? "Next" : "다음"} →
              </button>
            </div>
          </div>
        )}

        <div ref={conceptRef} className="algo-content mt-3" />

        {/* 섹션 끝 → 이전/다음 (콘텐츠 아래에도) */}
        {conceptSections.length > 1 && (
          <div className="mt-4 flex items-center justify-between gap-2 px-1 pb-2">
            <button
              onClick={() => setConceptIdx(Math.max(0, conceptIdx - 1))}
              disabled={conceptIdx === 0}
              className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-sm font-bold text-gray-700"
            >
              ← {lang === "en" ? "Prev section" : "이전 섹션"}
            </button>
            <span className="text-sm text-gray-500 font-bold">
              {conceptIdx + 1} / {conceptSections.length}
            </span>
            <button
              onClick={() => {
                setConceptIdx(Math.min(conceptSections.length - 1, conceptIdx + 1))
                setTimeout(() => conceptRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
              }}
              disabled={conceptIdx === conceptSections.length - 1}
              className="px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-40 text-sm font-bold"
            >
              {lang === "en" ? "Next section" : "다음 섹션"} →
            </button>
          </div>
        )}
      </details>

      {/* ── 문제 상세 뷰 (탭 + 내용) ── */}
      {selectedId && (
        <div ref={problemAreaRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-16 border-t border-gray-200">
          {/* 문제 제목 */}
          <div className="py-4 flex items-center gap-2">
            <button
              onClick={() => { setSelectedId(null); setActiveTab("problem") }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← {lang === "en" ? "Back to list" : "목록으로"}
            </button>
            <span className="text-gray-300">·</span>
            <span className="text-sm font-semibold text-gray-700 truncate">{selectedProblemTitle}</span>
          </div>

          {/* 탭 바 */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-4">
            {problemTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === tab.id
                    ? "bg-white text-purple-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* 문제 내용 (JS 렌더링) */}
          <div
            ref={problemRef}
            className="algo-content"
          />
        </div>
      )}
    </div>
  )
}
