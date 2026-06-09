// ============================================
// C++ 트랙(Track C) "길" 척추 — 한 줄 순서
// 설계: docs/superpowers/specs/2026-06-09-journey-path-restructure-design.md
// 핵심: 모든 단계를 하나의 순서로. 선수과목(cpp-18/19)은 제자리에 끼움.
//       참고용(cpp-17/20)은 척추에서 빠지고 offPath(자료실)로만.
// Phase 1: 레슨 시퀀스 + 단계 capstone(코딩뱅크/알고리즘/대회) 항목.
// ============================================

export type SpineKind = "lesson" | "project" | "prereq" | "bank" | "algo" | "contest"

export interface SpineItem {
  /** 진도/완료 식별자. lesson/project 는 completedLessons 의 id 와 일치. stage 는 자체 키. */
  key: string
  kind: SpineKind
  title: string
  emoji: string
  /** 클릭 시 이동 경로 (?stepId 등 포함 가능) */
  route: string
  /** 왜 지금 이게 다음인지 — 카드 부제 */
  why?: string
  /** 단계 구분선 라벨 (이 항목부터 새 구간 시작) */
  section?: string
}

// 척추 밖 "자료실" — 절대 다음으로 안 떠밂. 필요하면 들르는 참고용.
export const CPP_OFF_PATH: SpineItem[] = [
  { key: "cpp-17", kind: "lesson", title: "STL 탐색 함수", emoji: "📌", route: "/learn/cpp-17", why: "find/count_if/accumulate 정리 (대부분 다른 데서 다룸)" },
  { key: "cpp-20", kind: "lesson", title: "CP 실전 팁", emoji: "📌", route: "/learn/cpp-20", why: "비트연산·typedef·다익스트라 맛보기" },
]

// 한 줄 척추 (위 → 아래 순서대로 "다음 1개")
export const CPP_SPINE: SpineItem[] = [
  // ── 문법 기초 ──────────────────────────────
  { key: "cpp-1", kind: "lesson", title: "파이썬 vs C++", emoji: "🟦", route: "/learn/cpp-1", section: "문법" },
  { key: "cpp-2", kind: "lesson", title: "cout 심화 & namespace", emoji: "🟦", route: "/learn/cpp-2" },
  { key: "cpp-3", kind: "lesson", title: "변수와 타입", emoji: "🟦", route: "/learn/cpp-3" },
  { key: "cpp-4", kind: "lesson", title: "cin 입력", emoji: "🟦", route: "/learn/cpp-4" },
  { key: "cpp-5", kind: "lesson", title: "연산자", emoji: "🟦", route: "/learn/cpp-5" },
  { key: "cpp-6", kind: "lesson", title: "조건문", emoji: "🟦", route: "/learn/cpp-6" },
  { key: "cpp-7", kind: "lesson", title: "반복문", emoji: "🟦", route: "/learn/cpp-7" },
  { key: "cpp-8", kind: "lesson", title: "함수", emoji: "🟦", route: "/learn/cpp-8" },
  { key: "cpp-p1", kind: "project", title: "숫자 맞추기 게임", emoji: "🎮", route: "/learn/cpp-p1", why: "Part 1 복습 프로젝트" },

  { key: "cpp-9", kind: "lesson", title: "배열 & 벡터", emoji: "🟦", route: "/learn/cpp-9" },
  { key: "cpp-21", kind: "lesson", title: "2차원 배열 & 2D 벡터", emoji: "🟦", route: "/learn/cpp-21" },
  { key: "cpp-10", kind: "lesson", title: "range-for & auto", emoji: "🟦", route: "/learn/cpp-10" },
  { key: "cpp-11", kind: "lesson", title: "문자열 심화", emoji: "🟦", route: "/learn/cpp-11" },
  { key: "cpp-12", kind: "lesson", title: "참조와 함수", emoji: "🟦", route: "/learn/cpp-12" },
  { key: "cpp-13", kind: "lesson", title: "포인터 기초", emoji: "🟦", route: "/learn/cpp-13" },
  { key: "cpp-14", kind: "lesson", title: "구조체 (struct)", emoji: "🟦", route: "/learn/cpp-14" },
  { key: "cpp-22", kind: "lesson", title: "클래스 (class)", emoji: "🟦", route: "/learn/cpp-22" },
  { key: "cpp-p2", kind: "project", title: "RPG 캐릭터 관리", emoji: "🎮", route: "/learn/cpp-p2", why: "Part 2 복습 프로젝트" },

  { key: "cpp-15", kind: "lesson", title: "pair & tuple", emoji: "🟦", route: "/learn/cpp-15" },
  { key: "cpp-23", kind: "lesson", title: "sort 마스터", emoji: "🟦", route: "/learn/cpp-23" },
  { key: "cpp-16", kind: "lesson", title: "map & set", emoji: "🟦", route: "/learn/cpp-16", why: "여기까지면 USACO Bronze 80%!" },

  // ── 도전 (코딩뱅크) ────────────────────────
  { key: "bank-functional", kind: "bank", title: "코딩 뱅크 — 함수형 도전", emoji: "⭐", route: "/coding-bank", section: "도전", why: "배운 STL/문법만으로 멀티스텝 문제 풀기 (알고리즘 이름 몰라도 OK)" },

  // ── 알고리즘 ──────────────────────────────
  { key: "algo-wave1", kind: "algo", title: "알고리즘 — 정렬·배열·누적합·해시", emoji: "🧪", route: "/algo", section: "알고리즘", why: "Bronze 직결 패턴부터" },
  { key: "cpp-18", kind: "prereq", title: "stack & queue", emoji: "📦", route: "/learn/cpp-18", why: "곧 배울 BFS/DFS 에 꼭 필요해서 지금 먼저!" },
  { key: "algo-graph", kind: "algo", title: "알고리즘 — BFS / DFS", emoji: "🧪", route: "/algo", why: "방금 배운 큐를 바로 써먹어요" },

  // ── 대회 ──────────────────────────────────
  { key: "cpp-19", kind: "prereq", title: "파일 I/O & Fast I/O", emoji: "📄", route: "/learn/cpp-19", section: "대회", why: "USACO 는 파일로 입출력 받아요 — 진입 직전 챙기기" },
  { key: "contest-usaco", kind: "contest", title: "USACO Bronze 문제", emoji: "🏆", route: "/quest", why: "이제 진짜 대회 문제!" },
]

export const CPP_OFF_PATH_KEYS = new Set(CPP_OFF_PATH.map((i) => i.key))
