"use client"

import { useRef, useEffect, useState } from "react"

interface AlgoTopicVizProps {
  topicId: string   // e.g. "string", "sorting"
  problemId: string // e.g. "boj-10809"
}

// algo-style.css 주입 (한 번만)
function injectAlgoStyle() {
  if (typeof document === 'undefined') return
  const id = 'algo-style-link'
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = '/algo-style.css'
  document.head.appendChild(link)
}

// 토픽 JS 동적 로드
function loadTopicScript(topicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 이미 토픽이 등록됐으면 즉시 resolve
    if (window.AlgoTopics?.[topicId]) {
      resolve()
      return
    }
    const src = `/algo-topics/${topicId}.js`
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (existingScript) {
      // 스크립트 태그는 있지만 아직 실행 중 — load 이벤트 대기
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })
}

declare global {
  interface Window {
    AlgoTopics: Record<string, any>
    hljs?: { highlightElement: (el: Element) => void }
    _algoLang?: string
  }
}

export function AlgoTopicViz({ topicId, problemId }: AlgoTopicVizProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        injectAlgoStyle()
        await loadTopicScript(topicId)

        if (cancelled) return

        const topic = window.AlgoTopics?.[topicId]
        if (!topic) {
          setError(`토픽 '${topicId}'를 찾을 수 없습니다.`)
          setLoading(false)
          return
        }

        const meta = topic.problemMeta?.[problemId]
        if (!meta?.vizMethod) {
          setError(`문제 '${problemId}'의 시각화가 없습니다.`)
          setLoading(false)
          return
        }

        const vizFn = topic[meta.vizMethod]
        if (typeof vizFn !== 'function') {
          setError(`시각화 함수 '${meta.vizMethod}'를 찾을 수 없습니다.`)
          setLoading(false)
          return
        }

        if (containerRef.current) {
          containerRef.current.innerHTML = ''
          vizFn.call(topic, containerRef.current)
          setLoading(false)
        }
      } catch (e) {
        if (!cancelled) {
          setError(String(e))
          setLoading(false)
        }
      }
    }

    init()

    return () => {
      cancelled = true
      // 키보드 이벤트 리스너 정리 (Algorithm Lab의 _clearVizState 참고)
      if (window.AlgoTopics?.[topicId]?._clearVizState) {
        try { window.AlgoTopics[topicId]._clearVizState() } catch {}
      }
    }
  }, [topicId, problemId])

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
        시각화 로드 실패: {error}
      </div>
    )
  }

  return (
    <div className="algo-scope">
      {loading && (
        <div className="flex items-center justify-center py-12 text-gray-400 text-sm">
          시각화 로드 중...
        </div>
      )}
      <div ref={containerRef} />
    </div>
  )
}
