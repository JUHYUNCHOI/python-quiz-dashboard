"use client";

/**
 * UsacoVerifiedBadge — quest 의 실제 USACO 제출 검증 결과를 학생에게 노출.
 *
 * USACO_VERIFICATION.md 에 기록된 실제 데이터만 표시. 추측 X.
 *
 * 사용:
 *   <UsacoVerifiedBadge questId="mooin3" E={E} />
 *
 * questId 가 데이터 없으면 null 반환 (안전).
 */

import { t } from "@/components/quest/theme";

/**
 * 검증된 USACO 제출 결과 — USACO_VERIFICATION.md 기반.
 * 정직성 원칙: 실제 제출 결과만, 추측 없음.
 */
const VERIFIED_RESULTS = {
  // ── 부분 점수 (Python / C++ 둘 다 brute) ──
  mooin3:      { py: "3/11",  cpp: "4/11",  note_ko: "Python brute O(N)/쿼리, C++ brute O(N²)", note_en: "Python brute O(N)/query, C++ brute O(N²)" },
  cowphotos:   { py: "6/8",   cpp: "11/11", note_ko: "Python O(N²), C++ 통과", note_en: "Python O(N²), C++ passes" },
  reflection:  { py: "3/16",  cpp: "15/15", note_ko: "Python 너무 느림, C++ 통과", note_en: "Python too slow, C++ passes" },
  checkups:    { py: "6/13",  cpp: "6/13",  note_ko: "의도된 O(N³) — Bronze 정답 수준", note_en: "Intended O(N³) — Bronze-level solution" },
  buymilk:     { py: "5/14",  cpp: "8/9",   note_ko: "Python 재귀 느림, C++ brute", note_en: "Python recursion slow, C++ brute" },
  photoshoot25:{ py: "12/18", cpp: "18/18", note_ko: "Python 너무 느림, C++ 통과", note_en: "Python too slow, C++ passes" },
  moohunt:     { py: "5/12",  cpp: "10/12", note_ko: "brute 너무 느림", note_en: "brute too slow" },
  permutation: { py: "2/11",  cpp: "2/11",  note_ko: "backtracking 너무 느림", note_en: "backtracking too slow" },
  favperm2:    { py: "2/11",  cpp: "2/11",  note_ko: "backtracking 너무 느림 (permutation 과 동일)", note_en: "backtracking too slow (same as permutation)" },
  walkfence:   { py: "6/11",  cpp: "6/11",  note_ko: "O(NP) brute", note_en: "O(NP) brute" },
  logicalmoos: { py: "8/14",  cpp: "8/22",  note_ko: "O(NQ) brute slice eval", note_en: "O(NQ) brute slice eval" },
  exchange:    { py: "8/13",  cpp: "8/14",  note_ko: "brute simulation", note_en: "brute simulation" },
  milkexchange:{ py: "8/13",  cpp: "8/14",  note_ko: "brute simulation (exchange 와 동일)", note_en: "brute simulation (same as exchange)" },
  palindrome:  { py: "4/10",  cpp: "6/13",  note_ko: "O(S²) DP per test case", note_en: "O(S²) DP per test case" },
  fjfarms:     { py: "4/12",  cpp: "4/13",  note_ko: "1 WA + 다수 TLE (O(N²))", note_en: "1 WA + multiple TLE (O(N²))" },
  rotshift:    { py: "1/10",  cpp: "7/10",  note_ko: "O(T·N·K) brute, T up to 10⁹", note_en: "O(T·N·K) brute, T up to 10⁹" },
  feb23:       { py: "2/20",  cpp: "2/20",  note_ko: "brute 2^|F| 너무 느림 + WA", note_en: "brute 2^|F| too slow + WA" },
  countliars:  { py: "2/9",   cpp: "2/12",  note_ko: "O(10⁶·N) loop 너무 느림", note_en: "O(10⁶·N) loop too slow" },
  cowsplits:   { py: "3/14",  cpp: "3/14",  note_ko: "의도적 k=1 only", note_en: "intentional k=1 only" },
  chipxchg:    { py: "12/12", cpp: "5/12",  note_ko: "Python 통과, C++ overflow 버그", note_en: "Python passes, C++ overflow bug" },
};

export function UsacoVerifiedBadge({ questId, E, compact = false }) {
  const r = VERIFIED_RESULTS[questId];
  if (!r) return null;

  const note = E ? r.note_en : r.note_ko;

  if (compact) {
    return (
      <span style={{
        display: "inline-block",
        padding: "2px 8px",
        background: "#fef3c7",
        border: "1px solid #fbbf24",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 700,
        color: "#78350f",
        fontFamily: "'JetBrains Mono',monospace",
      }}>
        🏆 {t(E, "Verified", "검증")}: Py {r.py} · C++ {r.cpp}
      </span>
    );
  }

  return (
    <div style={{
      marginTop: 10,
      padding: "10px 12px",
      background: "linear-gradient(135deg,#fef3c7,#fde68a)",
      border: "2px solid #f59e0b",
      borderRadius: 10,
      fontSize: 12,
      color: "#78350f",
      lineHeight: 1.6,
    }}>
      <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 4, letterSpacing: 0.3 }}>
        🏆 {t(E, "Actual USACO submission (verified)", "실제 USACO 제출 (검증됨)")}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, marginBottom: 3 }}>
        Python: <b>{r.py} PASS</b> &nbsp;·&nbsp; C++: <b>{r.cpp} PASS</b>
      </div>
      <div style={{ fontSize: 11, color: "#92400e", fontStyle: "italic" }}>
        {note}
      </div>
    </div>
  );
}
