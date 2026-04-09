"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface AlgoViewerProps {
  topicId: string
  codeTrack: "cpp" | "python"
}

// Window augmentation is defined in components/algorithm/AlgoConceptViz.tsx (AlgoTopics, _algoLang)
// We only declare _algoTrack here which is not declared elsewhere
declare global {
  interface Window {
    _algoTrack: string
    _setAlgoLang?: (lang: string) => void
  }
}

export function AlgoViewer({ topicId, codeTrack }: AlgoViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [errorMsg, setErrorMsg] = useState("")
  const { lang } = useLanguage()

  // highlight.js 한번만 로드
  useEffect(() => {
    const hljsCssId = "hljs-css"
    if (!document.getElementById(hljsCssId)) {
      const link = document.createElement("link")
      link.id = hljsCssId
      link.rel = "stylesheet"
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
      document.head.appendChild(link)
    }
    const hljsId = "hljs-js"
    if (!document.getElementById(hljsId)) {
      const s = document.createElement("script")
      s.id = hljsId
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
      s.async = true
      document.head.appendChild(s)
    }
  }, [])

  // codeTrack 변경 → body[data-lang] 즉시 반영 (CSS 토글)
  useEffect(() => {
    document.body.setAttribute("data-lang", codeTrack)
    window._algoLang = codeTrack
    window._algoTrack = codeTrack
    // algo CSS에서 사용하는 _setAlgoLang 전역 함수 정의
    window._setAlgoLang = (newLang: string) => {
      document.body.setAttribute("data-lang", newLang)
      window._algoLang = newLang
    }
  }, [codeTrack])

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

    // body[data-lang] 초기 설정
    document.body.setAttribute("data-lang", codeTrack)
    window._algoLang = codeTrack
    window._algoTrack = codeTrack
    window._setAlgoLang = (newLang: string) => {
      document.body.setAttribute("data-lang", newLang)
      window._algoLang = newLang
    }

    // 컨테이너 초기화 (topicId / lang 바뀔 때 이전 내용 지움)
    if (containerRef.current) {
      containerRef.current.innerHTML = ""
    }
    setStatus("loading")

    // 이미 로드된 토픽이면 바로 렌더링
    if (window.AlgoTopics?.[topicId]) {
      renderTopic()
      return
    }

    // script 태그는 같은 src를 두 번 추가할 수 없으니 id로 구분
    // lang이 다르면 다른 id를 써서 재로드 허용
    const scriptId = `algo-topic-${topicId}-${lang}`
    if (document.getElementById(scriptId)) {
      const check = setInterval(() => {
        if (window.AlgoTopics?.[topicId]) {
          clearInterval(check)
          renderTopic()
        }
      }, 50)
      return () => clearInterval(check)
    }

    // 이전 언어 script 태그가 있으면 교체 (en ↔ ko 전환)
    const prevScriptId = `algo-topic-${topicId}-${lang === "en" ? "ko" : "en"}`
    const prevScript = document.getElementById(prevScriptId)
    if (prevScript) prevScript.remove()
    // window.AlgoTopics에서도 이전 항목 제거해서 강제 재등록
    if (window.AlgoTopics?.[topicId]) {
      delete (window.AlgoTopics as Record<string, unknown>)[topicId]
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
      setErrorMsg(`파일을 불러오지 못했어요: ${topicFile}`)
      setStatus("error")
    }
    document.head.appendChild(script)

    function renderTopic() {
      if (!containerRef.current) return
      try {
        containerRef.current.innerHTML = ""
        window.AlgoTopics[topicId].renderConcept(containerRef.current)
        // renderConcept 후 hljs로 코드 블록 하이라이팅
        if (typeof window !== "undefined" && (window as unknown as { hljs?: { highlightAll: () => void } }).hljs) {
          ;(window as unknown as { hljs: { highlightAll: () => void } }).hljs.highlightAll()
        }
        setStatus("ready")
      } catch (e) {
        setErrorMsg(`렌더링 오류: ${e}`)
        setStatus("error")
      }
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
