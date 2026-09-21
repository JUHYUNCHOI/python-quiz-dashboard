/**
 * Quest Health Registry — Phase 0 of redesign.
 *
 * Central status registry for quests with known issues. The
 * QuestHealthBanner component reads this and shows a warning at the
 * top of affected quests so students don't unknowingly study broken
 * content.
 *
 * Editing this file is non-destructive — it doesn't change quest IDs,
 * URLs, lesson_progress data, or any persisted student state. It only
 * adds a banner above existing content.
 *
 * As fixes land, remove the entry from STATUS so the banner disappears.
 *
 * Categories:
 *   - "algorithm-bug"   — Python or C++ implements wrong algorithm
 *   - "stub-cpp"        — C++ section is incomplete; Python is fine
 *   - "logic-bug"       — answer/output is wrong for some inputs
 *   - "py-cpp-mismatch" — both languages run, but they implement
 *                         different algorithms (one might be correct,
 *                         one might not)
 *
 * Severity:
 *   - "critical" — banner shown to all students
 *   - "minor"    — no banner (e.g. untaught syntax that still works)
 */

export type QuestHealthStatus = {
  category: "algorithm-bug" | "stub-cpp" | "logic-bug" | "py-cpp-mismatch" | "input-format";
  severity: "critical" | "minor";
  detail: string; // one-line description (Korean)
  detailEn?: string;
};

export const QUEST_HEALTH: Record<string, QuestHealthStatus> = {
  // ─── Algorithm bugs / wrong outputs ──────────────────────────────
  bacteria: {
    category: "logic-bug",
    severity: "critical",
    detail: "코드가 살포 횟수가 아니라 살포량 합을 셈 (둘 다 답 다름).",
    detailEn: "Code counts spray magnitude, not number of sprays.",
  },
  feedcows: {
    category: "logic-bug",
    severity: "critical",
    detail: "i+K vs i+K-1 인덱스 off-by-one — 일부 입력에 답 1 차이.",
    detailEn: "i+K vs i+K-1 off-by-one — some inputs give wrong answer.",
  },
  hoofball: {
    category: "logic-bug",
    severity: "critical",
    detail: "C++ 코드에 인덱스 OOB 가능 (i=0 또는 i=N-1 에서 crash).",
    detailEn: "C++ code has potential index-out-of-bounds.",
  },
  hps17: {
    category: "algorithm-bug",
    severity: "critical",
    detail: "알고리즘 자체가 문제 정답이 아님. 검토 중.",
    detailEn: "Algorithm doesn't actually solve the problem.",
  },
  race: {
    category: "logic-bug",
    severity: "critical",
    detail: "감속 공식이 의심 — 일부 sample 답 안 맞음.",
    detailEn: "Deceleration formula suspicious; sample mismatch.",
  },

  // ─── Python / C++ algorithm mismatches ──────────────────────────
  acowdemia1: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "Python 정답, C++ 미완성 (lambda + bitmask 구현 안 됨).",
    detailEn: "Python correct, C++ incomplete bitmask logic.",
  },
  acowdemia2: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "C++ 가 negation 체크 누락 — 잘못된 페어 카운트.",
    detailEn: "C++ missing negation check.",
  },
  acowdemia3: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "Ch2 narration 은 bipartite matching, 코드는 단순 카운트.",
    detailEn: "Ch2 says bipartite matching, code does counting.",
  },
  billboard2: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "Python 과 C++ 가 다른 접근 — 일부 입력 답 다름 가능.",
    detailEn: "Python and C++ implement different approaches.",
  },
  blocks: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "C++ 가 'distinct letters per cube' 카운트, 문제와 다름.",
    detailEn: "C++ counts distinct letters; doesn't match problem.",
  },
  cannonball: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "Python 은 (위치, 방향, 파워) 상태 추적, C++ 가 다른 알고리즘.",
    detailEn: "Python tracks state, C++ uses different algorithm.",
  },
  cowntrace: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "C++ 가 K-tracking 누락.",
    detailEn: "C++ missing K-tracking logic.",
  },
  leaders: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "C++ 의 bound 검사 로직 Python 과 다름.",
    detailEn: "C++ bound-check logic differs from Python.",
  },
  lifeguards: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "두 언어가 다른 sweep 방식 사용.",
    detailEn: "Two languages use different sweep approaches.",
  },
  livestock: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "C++ visited-set 처리 위험.",
    detailEn: "C++ has risky visited-set handling.",
  },
  milkexchange: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "C++ 의 modulo 표현식 검토 필요.",
    detailEn: "C++ modulo expression needs verification.",
  },
  milkorder: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "Python topo sort, C++ brute force — 다른 접근.",
    detailEn: "Python topo sort vs C++ brute force.",
  },
  photoshoot2: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "Python 과 C++ swap 카운트 방식 다름.",
    detailEn: "Python vs C++ swap counting differs.",
  },
  stampgrid: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "두 언어 알고리즘 방향 반대 (forward vs backward).",
    detailEn: "Two languages use opposite directions.",
  },
  swapity: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "Cycle decomposition 방식이 두 언어 사이 다름.",
    detailEn: "Cycle decomposition logic differs between languages.",
  },
  teleport: {
    category: "py-cpp-mismatch",
    severity: "critical",
    detail: "Python 은 3 경로, C++ 은 2 경로 — C++ 가 부족.",
    detailEn: "Python tries 3 routes, C++ only 2.",
  },

  // ─── Stub C++ (Python is the working version) ──────────────────
  aircond: {
    category: "stub-cpp",
    severity: "critical",
    detail: "C++ 구현 미완성 (bitmask enumeration 없음). Python 사용 권장.",
    detailEn: "C++ is incomplete. Use Python.",
  },
  aircond1: {
    category: "stub-cpp",
    severity: "critical",
    detail: "C++ 가 difference array 구현 안 됨. Python 사용 권장.",
    detailEn: "C++ difference-array logic missing. Use Python.",
  },
  alchemy: {
    category: "stub-cpp",
    severity: "critical",
    detail: "C++ recipe 파싱 미완성. Python 사용 권장.",
    detailEn: "C++ recipe parsing incomplete. Use Python.",
  },
  madscientist: {
    category: "stub-cpp",
    severity: "critical",
    detail: "C++ 미완성. Python 사용 권장.",
    detailEn: "C++ incomplete. Use Python.",
  },
  /* 2026-09-21: 이 배너가 **정반대**를 말하고 있었다. quest-auditor 가 잡았다.
     적혀 있던 말: "C++ scaffold 만 있음. Python 사용 권장." (severity: critical)
     실제:
       · C++  — 2026-06-16 채점기 재제출 **AC 12/12** (cpid=1253).
                `components.jsx:1` 헤더와 `USACO_VERIFICATION.md:75` 둘 다 그렇게 적고 있다.
       · Python — 채점기 제출 이력 **없음**(로컬 확인만). 게다가 **원문 입력 형식에서 죽는다** —
                원문은 테스트 케이스 사이에 빈 줄이 있는데(`pre class='in'` 에서 직접 확인)
                `input().split()` 이 그 빈 줄을 못 건너뛰어 `ValueError` 로 멈춘다.
                내가 화면의 코드를 그대로 떼어 원문 샘플로 돌려 재현했다.
                알고리즘 자체는 맞다 — 빈 줄만 걸러 주면 `OK OK LIE LIE` 로 정답이다.
     2026-06-15 재작성 전의 기록이 그대로 남아 있었던 것으로 보인다.
     학생에게 **검증된 쪽(C++)을 피하고 안 되는 쪽(Python)을 쓰라**고 말하고 있었다.
     ⚠️ Python 코드 자체는 🔒 `USACO_VERIFIED` 파일이라 손대지 않았다 — 선생님 판정 대기. */
  reverseeng: {
    category: "input-format",
    severity: "critical",
    detail: "Python 이 원문 입력 형식(케이스 사이 빈 줄)에서 멈춰요. C++ 은 채점기 AC 12/12.",
    detailEn: "The Python here stops on the official input format (blank lines between cases). The C++ is judge-verified 12/12.",
  },
  socialdist2: {
    category: "stub-cpp",
    severity: "critical",
    detail: "C++ 가 단순 카운트만 — clustering 로직 없음. Python 사용 권장.",
    detailEn: "C++ has no clustering logic. Use Python.",
  },
  stuckinrut: {
    category: "stub-cpp",
    severity: "critical",
    detail: "C++ 가 INFINITY 하드코딩 placeholder. Python 사용 권장.",
    detailEn: "C++ hardcodes INFINITY. Use Python.",
  },
  tameherd: {
    category: "stub-cpp",
    severity: "critical",
    detail: "C++ gap handling 미완성. Python 사용 권장.",
    detailEn: "C++ gap handling incomplete. Use Python.",
  },
};

/**
 * Returns health status for a quest, or null if it's healthy.
 */
export function getQuestHealth(questId: string): QuestHealthStatus | null {
  return QUEST_HEALTH[questId] ?? null;
}

/**
 * For admin dashboard / CI — list of all quests with known issues.
 */
export function listUnhealthyQuests(): Array<{ id: string } & QuestHealthStatus> {
  return Object.entries(QUEST_HEALTH).map(([id, status]) => ({ id, ...status }));
}
