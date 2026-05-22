/**
 * Smart-Next — 학생이 "다음에 뭐 해야 하지?" 결정 자동화.
 *
 * 코드린 Official Path (B+A hybrid, soft progression):
 *   Part 안: 1강 수업 → 2강 수업 → ... → 마지막 강 수업
 *   Part 끝: 그 Part 의 도전 클러스터 (있으면)
 *   트랙 끝: 다음 트랙
 *
 * '소프트' = 모든 단계 클릭 가능, 추천만 강조. 학생 자율성 존중.
 */

import { pythonParts, cppParts, pseudoParts } from "./curriculum-data"
import { ALL_CLUSTERS } from "@/data/practice"
import { ALGO_TOPICS } from "@/data/algo/topics"

export type SmartNextType =
  | "lesson"           // 다음 레슨 학습
  | "practice"         // Part 도전 클러스터
  | "algo-topic"       // 알고리즘 토픽
  | "quest"            // USACO quest
  | "complete"         // 다 끝남 (마스터)

export interface SmartNextResult {
  type: SmartNextType
  title: string           // 학생에게 보여줄 한글 제목 (예: "7강 반복문")
  titleEn: string         // 영어 제목
  href: string            // 클릭 시 갈 곳
  subtitle?: string       // 부제 (예: "+50 XP", "Part 2 마무리")
  emoji?: string          // 시각 표시
  reason?: string         // 왜 이걸 추천하는지 (디버그/툴팁용)
}

interface Track {
  parts: typeof pythonParts
  trackName: string
  trackNameEn: string
  emoji: string
}

const TRACKS: Record<"python" | "cpp" | "pseudo", Track> = {
  python: { parts: pythonParts, trackName: "Python", trackNameEn: "Python", emoji: "🐍" },
  cpp:    { parts: cppParts,    trackName: "C++",    trackNameEn: "C++",    emoji: "⚡" },
  pseudo: { parts: pseudoParts, trackName: "IGCSE",  trackNameEn: "IGCSE",  emoji: "📄" },
}

/**
 * 학생의 완료 진도 + 현재 트랙 → 다음 추천 활동.
 *
 * 알고리즘:
 *   1. 현재 트랙의 첫 미완료 Part 찾기
 *   2. 그 Part 안의 첫 미완료 레슨 → 추천
 *   3. Part 의 모든 레슨 완료 + Part 도전 클러스터 미완료 → 도전 추천
 *   4. 모든 Python Part 완료 → 알고리즘 추천
 *   5. 알고리즘 어느 정도 완료 → quest 추천
 */
export function getSmartNext(
  completedIds: Set<string | number>,
  preferredTrack: "python" | "cpp" | "pseudo" = "python"
): SmartNextResult {
  const track = TRACKS[preferredTrack]

  // 1. 트랙 안에서 첫 미완료 Part 찾기
  for (const part of track.parts) {
    const allDone = part.lessonIds.every(id => completedIds.has(id) || completedIds.has(String(id)))
    if (allDone) {
      // Part 의 도전 클러스터 — 마지막 레슨 기준으로 찾기
      const lastLessonId = part.lessonIds[part.lessonIds.length - 1]
      const cluster = ALL_CLUSTERS.find(c => String(c.unlockAfter) === String(lastLessonId))
      if (cluster) {
        // 도전 클러스터의 절반 이상 풀었으면 다음 Part 로 진행 (소프트)
        // 여기선 단순히 클러스터를 안 풀었으면 추천
        // (실제로 클러스터 완료 여부는 localStorage 에 있음 — 여기선 안 봄)
      }
      continue
    }
    // 이 Part 의 첫 미완료 레슨 추천
    for (const id of part.lessonIds) {
      if (!completedIds.has(id) && !completedIds.has(String(id))) {
        const isProject = String(id).startsWith("p")
        return {
          type: "lesson",
          title: `${id}강${isProject ? " 프로젝트" : ""}`,
          titleEn: `Lesson ${id}${isProject ? " Project" : ""}`,
          href: `/learn/${id}`,
          subtitle: `${track.trackName} · ${part.title}`,
          emoji: isProject ? "🏆" : "📚",
          reason: `${part.title} 의 다음 레슨`,
        }
      }
    }
  }

  // 2. 트랙 모든 레슨 완료 → 알고리즘 추천 (Python 트랙 한정)
  if (preferredTrack === "python") {
    const firstAlgo = ALGO_TOPICS.find(tp => tp.wave === 1)
    if (firstAlgo) {
      return {
        type: "algo-topic",
        title: `알고리즘 — ${firstAlgo.title}`,
        titleEn: `Algorithm — ${firstAlgo.titleEn}`,
        href: `/algo/${firstAlgo.id}`,
        subtitle: "Python 마스터 ! 이제 알고리즘",
        emoji: firstAlgo.icon,
        reason: "Python 전체 완료 → 알고리즘 첫 토픽 추천",
      }
    }
  }

  // 3. 다 끝났으면 마스터
  return {
    type: "complete",
    title: "🏆 마스터!",
    titleEn: "🏆 Master!",
    href: "/curriculum",
    subtitle: "모든 단계 완료",
    emoji: "🏆",
    reason: "모든 트랙 완료",
  }
}

/**
 * 학생의 주력 트랙 추정 (어디서 진도 더 많이 났나).
 */
export function getPreferredTrack(completedIds: Set<string | number>): "python" | "cpp" | "pseudo" {
  let pythonCount = 0, cppCount = 0, pseudoCount = 0
  for (const id of completedIds) {
    const s = String(id)
    if (s.startsWith("cpp-")) cppCount++
    else if (s.startsWith("pseudo-") || s.startsWith("igcse-")) pseudoCount++
    else if (/^\d+$/.test(s) || s.startsWith("p")) pythonCount++
  }
  if (cppCount > pythonCount && cppCount > pseudoCount) return "cpp"
  if (pseudoCount > pythonCount && pseudoCount > cppCount) return "pseudo"
  return "python"
}
