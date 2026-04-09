"use client"

import { useRef, useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

interface AlgoConceptVizProps {
  topicId: string  // e.g. "string", "sorting"
}

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

function loadTopicScript(topicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.AlgoTopics?.[topicId]) {
      resolve()
      return
    }
    const src = `/algo-topics/${topicId}.js`
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (existingScript) {
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
    _algoLang?: string
  }
}

export function AlgoConceptViz({ topicId }: AlgoConceptVizProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { lang } = useLanguage()

  useEffect(() => {
    // Algo Lab Vanilla JS가 window._algoLang을 참조함
    window._algoLang = lang
  }, [lang])

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

        if (typeof topic.renderConcept !== 'function') {
          setError(`'${topicId}' 개념 뷰가 없습니다.`)
          setLoading(false)
          return
        }

        if (containerRef.current) {
          containerRef.current.innerHTML = ''
          window._algoLang = lang
          topic.renderConcept(containerRef.current)
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
      if (window.AlgoTopics?.[topicId]?._clearVizState) {
        try { window.AlgoTopics[topicId]._clearVizState() } catch {}
      }
    }
  }, [topicId, lang])

  if (error) {
    return null  // 개념 뷰 없으면 조용히 숨김
  }

  return (
    <div className="algo-scope">
      {loading && (
        <div className="flex items-center justify-center py-12 text-gray-400 text-sm">
          개념 로드 중...
        </div>
      )}
      <div ref={containerRef} />
    </div>
  )
}
