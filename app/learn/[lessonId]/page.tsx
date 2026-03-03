import { getAllLessonIds } from "@/data"
import PracticePage from "./client-page"

export function generateStaticParams() {
  return getAllLessonIds().map((id) => ({ lessonId: id }))
}

export default function Page({ params }: { params: Promise<{ lessonId: string }> }) {
  return <PracticePage params={params} />
}
