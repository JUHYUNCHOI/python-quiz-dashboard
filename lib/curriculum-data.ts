/**
 * 커리큘럼 메타데이터 — 진도 계산용
 * curriculum page의 하드코딩된 데이터에서 최소 정보만 추출
 */

export interface PartMeta {
  id: string
  title: string
  titleEn: string
  lessonIds: (number | string)[]
}

export const pythonParts: PartMeta[] = [
  { id: "part1", title: "Part 1: 기초", titleEn: "Part 1: Basics", lessonIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "p1"] },
  { id: "part2", title: "Part 2: 제어문", titleEn: "Part 2: Control Flow", lessonIds: [11, 12, 13, 14, "p2"] },
  { id: "part3", title: "Part 3: 자료구조", titleEn: "Part 3: Data Structures", lessonIds: [15, 16, 17, 18, 19, 20, 21, 22, "p3"] },
  { id: "part3+", title: "Part 3+: 자료구조 심화", titleEn: "Part 3+: Advanced DS", lessonIds: [23, 24, 25, 26] },
  { id: "part4", title: "Part 4: 프로젝트", titleEn: "Part 4: Projects", lessonIds: [27, 28, 29, 30, 31] },
  { id: "part5", title: "Part 5: 함수", titleEn: "Part 5: Functions", lessonIds: [32, 33, 34, 35, 36] },
  { id: "part6", title: "Part 6: 에러와 파일", titleEn: "Part 6: Errors & Files", lessonIds: [37, 38, 39, 40] },
  { id: "part7", title: "Part 7: 클래스", titleEn: "Part 7: Classes", lessonIds: [41, 42, 43, 44] },
  { id: "part8", title: "Part 8: 모듈", titleEn: "Part 8: Modules", lessonIds: [45, 46, 47, 48] },
  { id: "part9", title: "Part 9: 종합 프로젝트", titleEn: "Part 9: Final Projects", lessonIds: [49, 50, 51, 52, "p4"] },
]

export const cppParts: PartMeta[] = [
  { id: "cpp-part1", title: "Part 1: C++ 기초", titleEn: "Part 1: C++ Basics", lessonIds: ["cpp-1", "cpp-2", "cpp-3", "cpp-4", "cpp-5", "cpp-6", "cpp-7", "cpp-8", "cpp-p1"] },
  { id: "cpp-part2", title: "Part 2: 더 깊은 C++", titleEn: "Part 2: Deeper C++", lessonIds: ["cpp-9", "cpp-10", "cpp-11", "cpp-12", "cpp-13", "cpp-14", "cpp-p2"] },
  { id: "cpp-part3", title: "Part 3: USACO 준비", titleEn: "Part 3: USACO Prep", lessonIds: ["cpp-15", "cpp-16", "cpp-17", "cpp-18", "cpp-19", "cpp-20", "cpp-p3"] },
]

export const pseudoParts: PartMeta[] = [
  { id: "pseudo-part1", title: "Part 1: 수도코드 기초", titleEn: "Part 1: Pseudocode Basics", lessonIds: ["pseudo-1", "pseudo-2", "pseudo-3", "pseudo-4", "pseudo-5", "pseudo-6", "pseudo-7", "pseudo-8", "pseudo-p1"] },
]

/** 완료된 레슨 Set을 localStorage에서 로드 */
export function getCompletedLessons(): Set<number | string> {
  try {
    const saved = localStorage.getItem("completedLessons")
    if (!saved) return new Set()
    const arr: (string | number)[] = JSON.parse(saved)
    // 숫자로 변환 가능한 문자열은 숫자로 통일 (lessonIds와 타입 일치)
    return new Set(arr.map(id => typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id))
  } catch {
    return new Set()
  }
}

/** 파트별 완료율 계산 */
export function getPartProgress(parts: PartMeta[], completed: Set<number | string>): { part: PartMeta; completedCount: number; totalCount: number; progress: number }[] {
  return parts.map(part => {
    const totalCount = part.lessonIds.length
    const completedCount = part.lessonIds.filter(id => completed.has(id)).length
    return {
      part,
      completedCount,
      totalCount,
      progress: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
    }
  })
}

/** 전체 완료율 */
export function getOverallProgress(parts: PartMeta[], completed: Set<number | string>): { completedCount: number; totalCount: number; progress: number } {
  const allIds = parts.flatMap(p => p.lessonIds)
  const totalCount = allIds.length
  const completedCount = allIds.filter(id => completed.has(id)).length
  return {
    completedCount,
    totalCount,
    progress: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
  }
}
