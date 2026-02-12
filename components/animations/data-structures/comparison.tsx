"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { SetAnimationYoutube } from "../set-youtube"
import { ListAnimation } from "./list-animation"
import { TupleAnimation } from "./tuple-animation"
import { DictAnimation } from "./dict-animation"

export function DataStructuresComparison() {
  const [activeTab, setActiveTab] = useState<"list" | "tuple" | "dict" | "set">("list")

  const tabs = [
    { id: "list" as const, label: "List", emoji: "🧊", bgColor: "bg-blue-500", bgLight: "bg-blue-100", textColor: "text-blue-700" },
    { id: "tuple" as const, label: "Tuple", emoji: "🔒", bgColor: "bg-purple-500", bgLight: "bg-purple-100", textColor: "text-purple-700" },
    { id: "dict" as const, label: "Dict", emoji: "🏷️", bgColor: "bg-amber-500", bgLight: "bg-amber-100", textColor: "text-amber-700" },
    { id: "set" as const, label: "Set", emoji: "👍", bgColor: "bg-red-500", bgLight: "bg-red-100", textColor: "text-red-700" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={cn("px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200",
              activeTab === tab.id ? `${tab.bgColor} text-white shadow-lg scale-105` : `${tab.bgLight} ${tab.textColor} hover:scale-105`)}>
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      <div className="transition-all duration-300">
        {activeTab === "list" && <ListAnimation />}
        {activeTab === "tuple" && <TupleAnimation />}
        {activeTab === "dict" && <DictAnimation />}
        {activeTab === "set" && <SetAnimationYoutube />}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-3">📊 한눈에 비교!</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-1">타입</th>
                <th className="text-center py-2 px-1">언제 쓸까?</th>
                <th className="text-center py-2 px-1">순서</th>
                <th className="text-center py-2 px-1">중복</th>
                <th className="text-center py-2 px-1">수정</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-blue-50"><td className="py-2 px-1 font-bold text-blue-700">List</td><td className="text-center py-2 px-1">여러 개 저장</td><td className="text-center py-2 px-1 text-green-600">✅</td><td className="text-center py-2 px-1 text-green-600">✅</td><td className="text-center py-2 px-1 text-green-600">✅</td></tr>
              <tr className="border-b bg-purple-50"><td className="py-2 px-1 font-bold text-purple-700">Tuple</td><td className="text-center py-2 px-1">바뀌면 안 됨</td><td className="text-center py-2 px-1 text-green-600">✅</td><td className="text-center py-2 px-1 text-green-600">✅</td><td className="text-center py-2 px-1 text-red-600">❌</td></tr>
              <tr className="border-b bg-amber-50"><td className="py-2 px-1 font-bold text-amber-700">Dict</td><td className="text-center py-2 px-1">이름으로 찾기</td><td className="text-center py-2 px-1 text-gray-400">-</td><td className="text-center py-2 px-1 text-red-600">key❌</td><td className="text-center py-2 px-1 text-green-600">✅</td></tr>
              <tr className="bg-green-50"><td className="py-2 px-1 font-bold text-green-700">Set</td><td className="text-center py-2 px-1">중복 없이</td><td className="text-center py-2 px-1 text-red-600">❌</td><td className="text-center py-2 px-1 text-red-600">❌</td><td className="text-center py-2 px-1 text-green-600">✅</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
