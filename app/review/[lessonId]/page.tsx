import { lessonsData } from "./data/lessons"
import ReviewRedirect from "./review-redirect"

export function generateStaticParams() {
  return Object.keys(lessonsData).map((id) => ({ lessonId: id }))
}

export default function Page({ params }: { params: Promise<{ lessonId: string }> }) {
  return <ReviewRedirect params={params} />
}
