import { getAllLessonIds } from "@/data"
import PracticePage from "./client-page"
import { ErrorBoundary } from "@/components/error-boundary"

export function generateStaticParams() {
  return getAllLessonIds().map((id) => ({ lessonId: id }))
}

export default function Page({ params }: { params: Promise<{ lessonId: string }> }) {
  return (
    <ErrorBoundary>
      <PracticePage params={params} />
    </ErrorBoundary>
  )
}
