"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface AlgoViewerProps {
  topicId: string
}

declare global {
  interface Window {
    AlgoTopics: Record<string, {
      id: string
      title: string
      renderConcept: (container: HTMLElement) => void
      renderProblemContent?: (container: HTMLElement, problemId: string, tabId: string) => void
    }>
    _algoLang: string
    _algoTrack: string
  }
}

export function AlgoViewer({ topicId }: AlgoViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [errorMsg, setErrorMsg] = useState("")
  const { lang } = useLanguage()

  useEffect(() => {
    // 알고리즘 랩 전용 CSS 로드
    const cssId = "algo-lab-css"
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link")
      link.id = cssId
      link.rel = "stylesheet"
      link.href = "/algo/style.css"
      document.head.appendChild(link)
    }

    // 전역 언어/트랙 설정
    window._algoLang = lang === "en" ? "cpp" : "cpp"  // 기본값: C++
    window._algoTrack = "cpp"

    // 이미 로드된 토픽이면 바로 렌더링
    if (window.AlgoTopics?.[topicId]) {
      renderTopic()
      return
    }

    // 토픽 JS 파일 로드
    const scriptId = `algo-topic-${topicId}`
    if (document.getElementById(scriptId)) {
      // 이미 script 태그가 있지만 아직 실행 안 됨 — 대기
      const check = setInterval(() => {
        if (window.AlgoTopics?.[topicId]) {
          clearInterval(check)
          renderTopic()
        }
      }, 50)
      return () => clearInterval(check)
    }

    const script = document.createElement("script")
    script.id = scriptId
    const topicFile = lang === "en" ? `/algo/topics/en/${topicId}.js` : `/algo/topics/${topicId}.js`
    script.src = topicFile
    script.async = true
    script.onload = () => {
      if (window.AlgoTopics?.[topicId]) {
        renderTopic()
      } else {
        setErrorMsg(`토픽 '${topicId}'를 찾을 수 없어요.`)
        setStatus("error")
      }
    }
    script.onerror = () => {
      setErrorMsg(`파일을 불러오지 못했어요: /algo/topics/${topicId}.js`)
      setStatus("error")
    }
    document.head.appendChild(script)

    function renderTopic() {
      if (!containerRef.current) return
      try {
        window.AlgoTopics[topicId].renderConcept(containerRef.current)
        setStatus("ready")
      } catch (e) {
        setErrorMsg(`렌더링 오류: ${e}`)
        setStatus("error")
      }
    }

    return () => {
      // CSS는 페이지 이동 후에도 유지 (성능)
    }
  }, [topicId, lang])

  if (status === "error") {
    return (
      <div className="flex items-center justify-center py-20 text-red-500">
        <p>{errorMsg}</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center py-20 z-10">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      )}
      {/* 알고 랩 CSS가 적용될 컨테이너 — algo-content 클래스로 스코프 */}
      <div
        ref={containerRef}
        className="algo-content"
        style={{ visibility: status === "ready" ? "visible" : "hidden" }}
      />
    </div>
  )
}
