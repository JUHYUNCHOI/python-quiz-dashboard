import { GiraffeHero } from "@/components/giraffe-hero"
import { QuizCard } from "@/components/quiz-card"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { BookOpen, RotateCcw, BarChart3, LineChart, GraduationCap } from "lucide-react"

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
          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            <QuizCard
              title="강의 커리큘럼"
              description="Notion 강의를 순서대로 학습"
              icon={<GraduationCap className="h-8 w-8 lg:h-10 lg:w-10" />}
              color="lavender"
              href="/curriculum"
            />

            <QuizCard
              title="퀴즈 시작"
              description="새로운 문제를 풀어보세요"
              icon={<BookOpen className="h-8 w-8 lg:h-10 lg:w-10" />}
              color="orange"
              href="/quiz/setup"
            />

            <QuizCard
              title="복습 하기"
              description="틀린 문제를 다시 풀어요"
              icon={<RotateCcw className="h-8 w-8 lg:h-10 lg:w-10" />}
              color="mint"
              href="/quiz/results"
            />

            <QuizCard
              title="내 현황"
              description="학습 진도를 확인하세요"
              icon={<BarChart3 className="h-8 w-8 lg:h-10 lg:w-10" />}
              color="lavender"
              href="/progress"
            />

            <QuizCard
              title="학습 분석"
              description="상세한 학습 패턴 분석"
              icon={<LineChart className="h-8 w-8 lg:h-10 lg:w-10" />}
              color="orange"
              href="/analytics"
            />

            <QuizCard
              title="강의 관리"
              description="문제를 만들고 관리하세요"
              icon={<BookOpen className="h-8 w-8 lg:h-10 lg:w-10" />}
              color="mint"
              href="/admin"
            />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
