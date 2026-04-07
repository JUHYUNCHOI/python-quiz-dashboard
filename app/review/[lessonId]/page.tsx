import { lessonsData } from "./data/lessons"
import ClientPage from "./client-page"

export function generateStaticParams() {
  return Object.keys(lessonsData).map((id) => ({ lessonId: id }))
}

export default function Page({ params }: { params: Promise<{ lessonId: string }> }) {
  return <ClientPage params={params} />
}
