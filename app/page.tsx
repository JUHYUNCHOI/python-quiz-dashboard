import { GiraffeHero } from "@/components/giraffe-hero"
import { QuizCard } from "@/components/quiz-card"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { GraduationCap } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <Header />

      <main className="w-full px-4 sm:px-6 pb-24 pt-6 max-w-2xl mx-auto">

        {/* 상단: 기린 히어로 (컴팩트) */}
        <div className="mb-6">
          <GiraffeHero />
        </div>

        {/* 메뉴 카드 */}
        <div className="grid gap-4 grid-cols-1">
          <QuizCard
            title="수업 & 퀴즈"
            description="커리큘럼을 따라 학습하세요"
            icon={<GraduationCap className="h-8 w-8 lg:h-10 lg:w-10" />}
            color="lavender"
            href="/curriculum"
          />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
