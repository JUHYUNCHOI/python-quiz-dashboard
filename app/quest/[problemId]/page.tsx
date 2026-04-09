import { ALL_PROBLEMS } from "./data"
import QuestProblemClient from "./client"

export function generateStaticParams() {
  return ALL_PROBLEMS.map(p => ({ problemId: p.id }))
}

export default async function QuestProblemPage({ params }: { params: Promise<{ problemId: string }> }) {
  const { problemId } = await params
  return <QuestProblemClient problemId={problemId} />
}
