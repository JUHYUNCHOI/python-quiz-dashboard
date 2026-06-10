"use client"

// 재사용 학습 맵 — 깔끔한 카드 노드 한 줄기 + 점선 연결 + 현재 위치 + 추천 강조 + 자유 점프.
// 반응형: 모바일 = 세로 1열 / 데스크탑 = 좌우 지그재그(구불구불). /journey 스타일(게임틱 X).
import Link from "next/link"
import { Fragment } from "react"
import { cn } from "@/lib/utils"

export type NodeState = "done" | "current" | "ahead"

export interface MapNode {
  id: string
  label: string
  sub?: string
  emoji: string
  href: string
  state: NodeState
  /** 이 노드 앞에 구간 밴드(예: "🥉 Bronze") 표시 */
  section?: string
  /** 큰 관문 노드(코딩뱅크·대회 등) */
  milestone?: boolean
}

function Connector({ filled }: { filled: boolean }) {
  return (
    <div className="flex justify-center" aria-hidden>
      <div className={cn("h-5 w-0 border-l-2", filled ? "border-emerald-400" : "border-dashed border-gray-300")} />
    </div>
  )
}

export function LearningMap({ nodes, recommendLabel }: { nodes: MapNode[]; recommendLabel?: string }) {
  return (
    <div className="flex flex-col">
      {nodes.map((n, i) => {
        const prev = nodes[i - 1]
        const filledConn = !!prev && prev.state === "done" && n.state !== "ahead"
        // 데스크탑 지그재그: 짝수=왼쪽, 홀수=오른쪽 (모바일은 가운데)
        const align = i % 2 === 0 ? "md:self-start md:ml-[8%]" : "md:self-end md:mr-[8%]"
        return (
          <Fragment key={n.id}>
            {n.section && (
              <div className="flex items-center gap-2 mt-5 mb-2">
                <span className="text-xs font-black text-gray-400 tracking-wide">{n.section}</span>
                <div className="flex-1 border-t border-dashed border-gray-200" />
              </div>
            )}
            {i > 0 && !n.section && <Connector filled={filledConn} />}
            <Link
              href={n.href}
              className={cn(
                "self-center w-full max-w-[420px] relative flex items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-all hover:shadow-md",
                align,
                n.milestone && "max-w-[460px]",
                n.state === "done" && "border-emerald-300 bg-emerald-50",
                n.state === "current" && "border-violet-400 bg-violet-50 ring-4 ring-violet-200",
                n.state === "ahead" && "border-gray-200 bg-white opacity-70 hover:opacity-100",
              )}
            >
              {n.state === "current" && (
                <span className="absolute -top-2.5 left-4 bg-violet-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">
                  ▶ {recommendLabel ?? "여기서 이어서"}
                </span>
              )}
              <span className={cn("shrink-0 flex items-center justify-center rounded-xl", n.milestone ? "text-3xl w-12 h-12" : "text-2xl w-10 h-10")}>{n.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className={cn("font-bold truncate", n.milestone ? "text-base" : "text-sm", n.state === "ahead" ? "text-gray-500" : "text-gray-900")}>{n.label}</p>
                {n.sub && <p className="text-[11px] text-gray-400 truncate mt-0.5">{n.sub}</p>}
              </div>
              {n.state === "done"
                ? <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center">✓</span>
                : <span className={cn("shrink-0", n.state === "current" ? "text-violet-500" : "text-gray-300")} aria-hidden>→</span>}
            </Link>
          </Fragment>
        )
      })}
    </div>
  )
}
