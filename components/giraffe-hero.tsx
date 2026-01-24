import { Card } from "@/components/ui/card"

export function GiraffeHero() {
  return (
    <Card className="overflow-hidden border-2 border-orange-200 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="flex flex-col items-center gap-4 p-8 md:flex-row md:justify-between">
        <div className="flex-1 text-center md:text-left">
          <h2 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl">안녕! 오늘도 함께 배워요</h2>
          <p className="text-lg text-gray-600">
            다음 복습까지 <span className="font-semibold text-orange-600">2시간</span> 남았어요
          </p>
        </div>

        <div className="relative">
          <div className="text-[120px] md:text-[150px]">🦒</div>
          <div className="absolute -right-2 -top-2 animate-bounce text-4xl">✨</div>
        </div>
      </div>
    </Card>
  )
}
