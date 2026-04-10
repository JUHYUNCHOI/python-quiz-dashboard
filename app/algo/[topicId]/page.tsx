import { ALGO_TOPIC_MAP, ALGO_TOPICS } from "@/data/algo/topics"
import { AlgoTopicPage } from "./client-page"

export function generateStaticParams() {
  return ALGO_TOPICS.map(t => ({ topicId: t.id }))
}

export default async function Page({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params
  const topic = ALGO_TOPIC_MAP[topicId]
  if (!topic) return <div className="p-8 text-gray-500">토픽을 찾을 수 없어요.</div>
  return <AlgoTopicPage topic={topic} />
}
