import { ALL_PROBLEMS } from "./data"
import QuestProblemClient from "./client"

export function generateStaticParams() {
  return ALL_PROBLEMS.map(p => ({ problemId: p.id }))
}

export default function QuestProblemPage({ params }: { params: { problemId: string } }) {
  return <QuestProblemClient problemId={params.problemId} />
}
