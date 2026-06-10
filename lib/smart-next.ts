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
  | "coding-bank"      // 코딩 뱅크 (문법 → 알고리즘 다리)
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
/**
 * 클라이언트에서만 호출되는 코딩 뱅크 진행도 조회. 서버 SSR 에선 0 반환.
 */
function getCodingBankSolvedCount(): number {
  if (typeof window === "undefined") return 0
  try {
    const raw = localStorage.getItem("coding-bank-solved")
    if (!raw) return 0
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.length : 0
  } catch {
    return 0
  }
}

/** 학생이 "했음" 표시한 대회/quest 수 (학생이 직접 체크 — quest 는 자동 채점 불가). */
function getQuestSolvedCount(): number {
  if (typeof window === "undefined") return 0
  try {
    const raw = localStorage.getItem("quest-solved")
    if (!raw) return 0
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.length : 0
  } catch {
    return 0
  }
}

const CODING_BANK_THRESHOLD = 5  // 5개 풀면 코딩 뱅크 "충분히 했음" 으로 보고 알고리즘 추천
const CONTEST_THRESHOLD = 8  // 알고리즘 8 토픽 완료 → 실전 대회(quest) 단계 진입 (대회 해금 기준과 동일)

export function getSmartNext(
  completedIds: Set<string | number>,
  preferredTrack: "python" | "cpp" | "pseudo" = "python"
): SmartNextResult {
  const track = TRACKS[preferredTrack]

  // 🌉 다리 1: C++ 메인 트랙 (cpp-16) 완료 → 코딩 뱅크 추천
  // cpp-17/18/19/20 은 참고용이라 Smart-Next 가 강제 추천하지 않음.
  // 코딩 뱅크 5문제 풀면 다음 단계 (알고리즘) 로 넘어감.
  if (preferredTrack === "cpp" && (completedIds.has("cpp-16") || completedIds.has("cpp-p3"))) {
    const bankSolved = getCodingBankSolvedCount()
    if (bankSolved < CODING_BANK_THRESHOLD) {
      return {
        type: "coding-bank",
        title: bankSolved > 0
          ? `코딩 뱅크 (${bankSolved}/${CODING_BANK_THRESHOLD})`
          : "코딩 뱅크 — 알고리즘 가기 전",
        titleEn: bankSolved > 0
          ? `Coding Bank (${bankSolved}/${CODING_BANK_THRESHOLD})`
          : "Coding Bank — Before Algorithm",
        href: "/coding-bank",
        subtitle: "문법 → 실전 감각 — 알고리즘 가기 전 워밍업",
        emoji: "🌟",
        reason: "cpp-16 완료, 알고리즘 입문 전 코딩 뱅크 다리",
      }
    }
  }

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

  // 2. 트랙 모든 레슨 완료 → 알고리즘 추천 (Python / C++ 트랙)
  // Wave 1 → 2 → 3 순서로 첫 미완료 토픽
  if (preferredTrack === "python" || preferredTrack === "cpp") {
    // 🌉 다리 3: 알고리즘 **Wave 1 기초(정렬·배열·스택큐·해시·누적합·문자열)** 를 마치면
    // 대회(quest)로 안내. USACO Bronze 는 구현 위주라 Wave 1 기초면 도전 가능 —
    // graph/dp 등 Wave 2/3 는 선수조건이 아니라 "필요할 때 / Silver+" 에서.
    // (이전엔 8토픽 — Silver 일부까지 — 요구했음. 기준을 낮춤 = 기존 학생 영향 없음.)
    const wave1Done = ALGO_TOPICS.filter(tp => tp.wave === 1).every(tp => completedIds.has(tp.lessonId))

    if (wave1Done) {
      const qSolved = getQuestSolvedCount()
      return {
        type: "quest",
        title: qSolved > 0 ? `실전 대회 문제 (${qSolved} 풀이)` : "실전 대회 문제 — 이제 진짜 대회!",
        titleEn: qSolved > 0 ? `Contest Problems (${qSolved} solved)` : "Contest Problems — the real thing!",
        href: "/quest",
        subtitle: "USACO Bronze · MCC — 배운 알고리즘으로 실전",
        emoji: "🏆",
        reason: `알고리즘 Wave 1 기초(스택/큐 포함) 완료 → 대회 단계 진입`,
      }
    }

    const sortedAlgo = [...ALGO_TOPICS].sort((a, b) => a.wave - b.wave)
    const nextAlgo = sortedAlgo.find(tp => !completedIds.has(tp.lessonId))
    if (nextAlgo) {
      const waveLabel = nextAlgo.wave === 1 ? "Bronze" : nextAlgo.wave === 2 ? "Silver" : "Gold+"
      return {
        type: "algo-topic",
        title: `${nextAlgo.title}`,
        titleEn: `${nextAlgo.titleEn}`,
        href: `/algo/${nextAlgo.id}`,
        subtitle: `알고리즘 · Wave ${nextAlgo.wave} (${waveLabel})`,
        emoji: nextAlgo.icon,
        reason: `다음 알고리즘 토픽 (wave ${nextAlgo.wave})`,
      }
    }
  }

  // pseudo/IGCSE: 시험 트랙이라 USACO 대회로 보내지 않음 — 트랙 완료/복습으로 안내
  if (preferredTrack === "pseudo") {
    return {
      type: "complete",
      title: "🎓 Pseudocode 트랙 완료!",
      titleEn: "🎓 Pseudocode track complete!",
      href: "/curriculum?course=pseudo",
      subtitle: "IGCSE 의사코드 — 복습하거나 시험 대비를 이어가요",
      emoji: "🎓",
      reason: "pseudo 트랙 모든 레슨 완료 (USACO 대상 아님)",
    }
  }

  // 3. 알고리즘 토픽이 8개 미만이라 위 다리에 안 걸렸는데 다 끝낸 경우(예외적) → 대회로
  {
    const qSolved = getQuestSolvedCount()
    return {
      type: "quest",
      title: qSolved > 0 ? `실전 대회 문제 (${qSolved} 풀이)` : "실전 대회 문제 🏆",
      titleEn: qSolved > 0 ? `Contest Problems (${qSolved} solved)` : "Contest Problems 🏆",
      href: "/quest",
      subtitle: "USACO Bronze · MCC — 실전 대회",
      emoji: "🏆",
      reason: "모든 학습 단계 완료 → 대회",
    }
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
