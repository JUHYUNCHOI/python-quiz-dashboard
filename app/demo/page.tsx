"use client"

import { DataStructuresComparison } from "@/components/animations"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/curriculum"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          돌아가기
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🎨 데이터 구조 애니메이션 데모
        </h1>
        <p className="text-gray-600 mb-8">
          List, Tuple, Set, Dictionary의 차이를 시각적으로 배워보세요!
        </p>
        
        <DataStructuresComparison />
      </div>
    </div>
  )
}
