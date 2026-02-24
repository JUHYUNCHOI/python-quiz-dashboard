import { GiraffeHero } from "@/components/giraffe-hero"
import { QuizCard } from "@/components/quiz-card"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { BarChart3, LineChart, GraduationCap } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <Header studentName="지민" level={5} />

      {/* 대시보드: 넓은 레이아웃 + 양쪽 여백 */}
      <main className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-24 pt-8">
        
        {/* 상단: 기린 히어로 */}
        <div className="mb-8 max-w-[1600px] mx-auto">
          <GiraffeHero />
        </div>

        {/* 메뉴 카드 그리드 - 반응형 */}
        <div className="max-w-[1600px] mx-auto">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto">
            <QuizCard
              title="수업 & 퀴즈"
              description="커리큘럼을 따라 학습하세요"
              icon={<GraduationCap className="h-8 w-8 lg:h-10 lg:w-10" />}
              color="lavender"
              href="/curriculum"
            />

            <QuizCard
              title="내 현황"
              description="학습 진도를 확인하세요"
              icon={<BarChart3 className="h-8 w-8 lg:h-10 lg:w-10" />}
              color="orange"
              href="/progress"
            />

            <QuizCard
              title="학습 분석"
              description="상세한 학습 패턴 분석"
              icon={<LineChart className="h-8 w-8 lg:h-10 lg:w-10" />}
              color="mint"
              href="/analytics"
            />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
