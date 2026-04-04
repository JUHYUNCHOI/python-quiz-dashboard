"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import type { SimDefinition, SimFrame, BarColor } from "./types"

interface Props {
  sim: SimDefinition
}

// ─── 색상 맵 ────────────────────────────────────────────────
const BAR_COLORS: Record<BarColor, string> = {
  default:    'bg-blue-400',
  comparing:  'bg-red-400',
  sorted:     'bg-green-400',
  selected:   'bg-yellow-400',
  pivot:      'bg-purple-400',
  min:        'bg-orange-400',
  found:      'bg-emerald-500',
}

const BLOCK_COLORS = {
  default:   'bg-gray-100 text-gray-700 border-gray-200',
  active:    'bg-orange-100 text-orange-800 border-orange-300',
  found:     'bg-green-100 text-green-800 border-green-300',
  done:      'bg-blue-100 text-blue-800 border-blue-200',
  mismatch:  'bg-red-100 text-red-800 border-red-200',
  highlight: 'bg-yellow-100 text-yellow-800 border-yellow-300',
}

// ─── 렌더러들 ────────────────────────────────────────────────
function BarRenderer({ frame }: { frame: SimFrame }) {
  if (!frame.bars?.length) return null
  const maxVal = Math.max(...frame.bars.map(b => b.value), 1)

  return (
    <div className="flex items-end gap-1 justify-center h-32 px-2">
      {frame.bars.map((bar, i) => {
        const heightPct = Math.max((bar.value / maxVal) * 100, 4)
        const pointer = frame.pointers?.find(p => p.index === i)
        return (
          <div key={i} className="flex flex-col items-center gap-0.5 flex-1 max-w-[40px]">
            {pointer && (
              <span className="text-[9px] font-bold text-orange-600 whitespace-nowrap">
                {pointer.label}
              </span>
            )}
            <div
              className={cn("w-full rounded-t transition-all duration-300", BAR_COLORS[bar.color])}
              style={{ height: `${heightPct}%` }}
            />
            <span className="text-[10px] text-gray-500 font-mono">{bar.value}</span>
            {bar.label && <span className="text-[9px] text-gray-400">{bar.label}</span>}
          </div>
        )
      })}
    </div>
  )
}

function BlockRenderer({ frame }: { frame: SimFrame }) {
  if (!frame.blocks?.length) return null
  return (
    <div className="flex flex-wrap gap-1.5 justify-center py-2">
      {frame.blocks.map((block, i) => {
        const pointer = frame.pointers?.find(p => p.index === i)
        return (
          <div key={i} className="flex flex-col items-center gap-0.5">
            {pointer && (
              <span className="text-[9px] font-bold" style={{ color: pointer.color }}>
                {pointer.label}
              </span>
            )}
            <div className={cn(
              "min-w-[36px] text-center px-2 py-1.5 rounded-lg border font-mono text-sm font-bold transition-all duration-200",
              BLOCK_COLORS[block.color]
            )}>
              {block.text}
              {block.subText && (
                <div className="text-[9px] font-normal opacity-70">{block.subText}</div>
              )}
            </div>
            {block.index !== undefined && (
              <span className="text-[9px] text-gray-400">{block.index}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

function TableRenderer({ frame }: { frame: SimFrame }) {
  if (!frame.table) return null
  const { rows, highlights, done } = frame.table
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-xs mx-auto">
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => {
                const isHighlight = highlights.some(([hr, hc]) => hr === r && hc === c)
                const isDone = done.some(([dr, dc]) => dr === r && dc === c)
                return (
                  <td key={c} className={cn(
                    "border border-gray-200 w-8 h-8 text-center font-mono transition-all duration-200",
                    isDone      ? "bg-green-100 text-green-800 font-bold" :
                    isHighlight ? "bg-orange-100 text-orange-800 font-bold" :
                    r === 0 || c === 0 ? "bg-gray-50 text-gray-500" :
                    "bg-white text-gray-700"
                  )}>
                    {cell}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GraphRenderer({ frame }: { frame: SimFrame }) {
  if (!frame.nodes?.length) return null
  const NODE_COLORS = {
    default:  { fill: '#e5e7eb', stroke: '#9ca3af', text: '#374151' },
    visiting: { fill: '#fed7aa', stroke: '#f97316', text: '#7c2d12' },
    visited:  { fill: '#bbf7d0', stroke: '#22c55e', text: '#14532d' },
    found:    { fill: '#fde68a', stroke: '#f59e0b', text: '#78350f' },
    path:     { fill: '#c4b5fd', stroke: '#8b5cf6', text: '#4c1d95' },
  }

  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-xs mx-auto">
      {frame.edges?.map((edge, i) => {
        const from = frame.nodes!.find(n => n.id === edge.from)
        const to   = frame.nodes!.find(n => n.id === edge.to)
        if (!from || !to) return null
        return (
          <line key={i}
            x1={from.x} y1={from.y} x2={to.x} y2={to.y}
            stroke={edge.highlight ? '#f97316' : '#d1d5db'}
            strokeWidth={edge.highlight ? 2.5 : 1.5}
          />
        )
      })}
      {frame.nodes.map(node => {
        const c = NODE_COLORS[node.color]
        return (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={16}
              fill={c.fill} stroke={c.stroke} strokeWidth={2}
              className="transition-all duration-300"
            />
            <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="middle"
              fontSize={11} fontWeight="bold" fill={c.text}>
              {node.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── 메인 플레이어 ────────────────────────────────────────────
export function SimPlayer({ sim }: Props) {
  const [input, setInput] = useState(sim.defaultInput ?? "")
  const [frameIdx, setFrameIdx] = useState(0)

  const frames = useMemo(() => {
    try { return sim.generate(input) }
    catch { return [] }
  }, [sim, input])

  const frame: SimFrame | undefined = frames[frameIdx]
  const total = frames.length

  function reset(newInput?: string) {
    setFrameIdx(0)
    if (newInput !== undefined) setInput(newInput)
  }

  if (!frame) return (
    <div className="text-center text-gray-400 py-8 text-sm">
      유효한 입력을 넣어주세요
    </div>
  )

  return (
    <div className="space-y-3">
      {/* 입력 */}
      {sim.defaultInput !== undefined && (
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 flex-shrink-0">
            {sim.inputLabel ?? "입력"}
          </label>
          <input
            type="text"
            value={input}
            onChange={e => reset(e.target.value)}
            className="flex-1 text-xs font-mono border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-orange-400"
            placeholder={sim.defaultInput}
          />
        </div>
      )}

      {/* 설명 */}
      <div className="bg-orange-50 rounded-xl px-3 py-2 text-xs text-orange-700 font-medium min-h-[36px] flex items-center">
        {frame.description}
      </div>

      {/* 시각화 */}
      <div className="bg-gray-50 rounded-xl p-3 min-h-[120px] flex flex-col justify-center">
        {frame.bars     && <BarRenderer   frame={frame} />}
        {frame.blocks   && <BlockRenderer frame={frame} />}
        {frame.table    && <TableRenderer frame={frame} />}
        {frame.nodes    && <GraphRenderer frame={frame} />}
      </div>

      {/* 컨트롤 */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {Array.from({ length: Math.min(total, 40) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setFrameIdx(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === frameIdx ? "bg-orange-500 flex-[3]" : "bg-gray-200 flex-1"
              )}
            />
          ))}
        </div>
        <span className="text-[10px] text-gray-400 flex-shrink-0">{frameIdx + 1}/{total}</span>
        <button
          onClick={() => setFrameIdx(i => Math.max(0, i - 1))}
          disabled={frameIdx === 0}
          className="px-2.5 py-1 rounded-lg text-xs border border-gray-200 text-gray-500 disabled:opacity-30 hover:border-orange-300 hover:text-orange-600 transition-colors"
        >←</button>
        <button
          onClick={() => setFrameIdx(i => Math.min(total - 1, i + 1))}
          disabled={frameIdx === total - 1}
          className="px-2.5 py-1 rounded-lg text-xs bg-orange-500 text-white disabled:opacity-30 hover:bg-orange-600 transition-colors"
        >→</button>
        <button
          onClick={() => reset()}
          className="px-2.5 py-1 rounded-lg text-xs border border-gray-200 text-gray-400 hover:border-gray-300 transition-colors"
        >↺</button>
      </div>
    </div>
  )
}
