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
  { id: "pseudo-part1", title: "Part 1: 수도코드 기초", titleEn: "Part 1: Pseudocode Basics", lessonIds: ["pseudo-1", "pseudo-2", "pseudo-3", "pseudo-4", "pseudo-28", "pseudo-5", "pseudo-6", "pseudo-7", "pseudo-8", "pseudo-p1"] },
  { id: "pseudo-part2", title: "Part 2: 중급", titleEn: "Part 2: Intermediate", lessonIds: ["pseudo-9", "pseudo-10", "pseudo-11", "pseudo-12", "pseudo-13", "pseudo-14", "pseudo-p2"] },
  { id: "pseudo-part3", title: "Part 3: 알고리즘", titleEn: "Part 3: Algorithms", lessonIds: ["pseudo-15", "pseudo-16", "pseudo-17", "pseudo-18", "pseudo-19", "pseudo-20", "pseudo-p3"] },
  { id: "pseudo-part4", title: "Part 4: 시험 대비", titleEn: "Part 4: Exam Prep", lessonIds: ["pseudo-21", "pseudo-22", "pseudo-23"] },
  { id: "pseudo-part5", title: "Part 5: CS 이론", titleEn: "Part 5: CS Theory", lessonIds: ["pseudo-24", "pseudo-25", "pseudo-26", "pseudo-27"] },
  { id: "igcse-sql", title: "기출: SQL", titleEn: "Past Papers: SQL", lessonIds: ["igcse-sql1", "igcse-sql2"] },
  { id: "igcse-logic", title: "기출: Logic Gates", titleEn: "Past Papers: Logic Gates", lessonIds: ["igcse-logic1"] },
]

/** 레슨 ID → 짧은 이름 매핑 */
export const lessonNames: Record<string, string> = {
  // Python Part 1
  "1": "print() 출력", "2": "데이터 타입", "3": "변수", "4": "연산자",
  "5": "문자열 연산", "6": "문자열 메서드", "7": "print() 옵션", "8": "f-string",
  "9": "타입 변환", "10": "input() 입력", "p1": "🎮 미니 계산기",
  // Python Part 2
  "11": "조건문 (if)", "12": "조건문 심화", "13": "반복문 (for)", "14": "반복문 (while)", "p2": "🎮 숫자 맞추기",
  // Python Part 3
  "15": "자료구조 개요", "16": "리스트 기초", "17": "리스트와 반복문", "18": "split/join",
  "19": "튜플", "20": "딕셔너리", "21": "집합 (set)", "22": "슬라이싱", "p3": "🎮 Hangman",
  // Python Part 3+
  "23": "스택", "24": "큐", "25": "2D 리스트", "26": "정렬",
  // Python Part 4-9
  "27": "Turtle 기초", "28": "Turtle 그림", "29": "Turtle 게임", "30": "Pygame 기초", "31": "Pygame 게임",
  "32": "함수 기초", "33": "매개변수", "34": "반환값", "35": "스코프", "36": "재귀",
  "37": "에러 처리", "38": "파일 읽기", "39": "파일 쓰기", "40": "CSV",
  "41": "클래스 기초", "42": "메서드", "43": "상속", "44": "다형성",
  "45": "모듈 만들기", "46": "표준 라이브러리", "47": "pip", "48": "API",
  "49": "프로젝트1", "50": "프로젝트2", "51": "프로젝트3", "52": "프로젝트4", "p4": "🎮 최종",
  // C++
  "cpp-1": "파이썬 vs C++", "cpp-2": "cout & namespace", "cpp-3": "변수와 타입", "cpp-4": "cin 입력",
  "cpp-5": "연산자", "cpp-6": "조건문 (if/else)", "cpp-7": "반복문 (for/while)", "cpp-8": "함수", "cpp-p1": "🎮 숫자 맞추기",
  "cpp-9": "배열 & 벡터", "cpp-10": "Range-for & auto", "cpp-11": "문자열 심화", "cpp-12": "참조와 함수",
  "cpp-13": "포인터 기초", "cpp-14": "구조체 & 클래스", "cpp-p2": "⚔️ RPG 캐릭터",
  "cpp-15": "pair & 정렬", "cpp-16": "map & set", "cpp-17": "STL 알고리즘", "cpp-18": "stack/queue/deque",
  "cpp-19": "파일 & Fast I/O", "cpp-20": "CP 실전 팁", "cpp-p3": "🏆 USACO 모의전",
  // Pseudocode
  "pseudo-1": "기초", "pseudo-2": "변수", "pseudo-3": "입출력", "pseudo-4": "조건문",
  "pseudo-28": "Boolean", "pseudo-5": "반복문", "pseudo-6": "배열", "pseudo-7": "함수",
  "pseudo-8": "문자열", "pseudo-p1": "🎮 프로젝트",
  "pseudo-9": "2D 배열", "pseudo-10": "파일", "pseudo-11": "레코드",
  "pseudo-12": "검색", "pseudo-13": "정렬", "pseudo-14": "스택/큐", "pseudo-p2": "🎮 프로젝트",
  "pseudo-15": "재귀", "pseudo-16": "링크드리스트", "pseudo-17": "트리",
  "pseudo-18": "그래프", "pseudo-19": "해싱", "pseudo-20": "복잡도", "pseudo-p3": "🎮 프로젝트",
  "pseudo-21": "기출1", "pseudo-22": "기출2", "pseudo-23": "기출3",
  "pseudo-24": "수 체계", "pseudo-25": "논리 게이트", "pseudo-26": "네트워크", "pseudo-27": "보안",
  "igcse-sql1": "SQL 기초", "igcse-sql2": "SQL 심화", "igcse-logic1": "Logic Gates",
}

/** 레슨 ID로 이름 가져오기 */
export function getLessonName(lessonId: string | number): string {
  return lessonNames[String(lessonId)] || String(lessonId)
}

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
