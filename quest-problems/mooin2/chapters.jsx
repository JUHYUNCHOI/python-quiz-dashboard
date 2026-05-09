import { C, t } from "@/components/quest/theme";
import { getMooin2Sections, MooinExplorer } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makeMooin2Ch1(E) {
  return [
    /* 1-1 — Problem statement. */
    {
      type: "reveal",
      narr: t(E,
        "A 'moo' is a triple (x, y, y) with x ≠ y. It 'occurs in the array' if there exist positions i < j < k with a[i]=x, a[j]=y, a[k]=y. Count the number of DISTINCT moos (distinct (x, y) pairs) that occur.",
        "'moo' = 삼중 (x, y, y), x ≠ y. 배열에서 i < j < k 인 자리가 있어 a[i]=x, a[j]=a[k]=y 이면 'occurs'. 발생하는 서로 다른 moo (서로 다른 (x, y) 쌍) 의 개수를 셈."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🐄</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#ea580c" }}>It's Mooin' Time II</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2025 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #ea580c", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of DISTINCT moos (x, y, y) — pairs (x, y) — that occur as a subsequence in a.",
                "배열 a 에 부분수열로 등장하는 서로 다른 moo (x, y, y) — 즉 (x, y) 쌍 — 의 개수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 8 }}>
              📖 {t(E, "Problem", "문제")}
            </div>

            <div style={{ background: "#fff", border: "1.5px solid #fdba74", borderRadius: 8, padding: "10px 12px", marginBottom: 10, fontSize: 13, color: C.text, lineHeight: 1.65 }}>
              <div style={{ fontWeight: 600, color: "#9a3412", marginBottom: 4 }}>
                {t(E, "What's a moo?", "moo 가 뭐?")}
              </div>
              {t(E, "A 'moo' is a 3-tuple (x, y, y) where the second and third are EQUAL but DIFFERENT from the first.",
                    "'moo' 는 3-튜플 (x, y, y) — 둘째와 셋째는 같고 첫째와는 다름.")}
              <div style={{ marginTop: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#9a3412" }}>
                Examples: (1, 4, 4), (3, 7, 7), (2, 5, 5)<br/>
                Not moos: (4, 4, 4), (1, 4, 7)
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.55 }}>
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #fdba74", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#0891b2", fontWeight: 600, flexShrink: 0 }}>1.</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "Occurs in the array", "배열에서 발생")}</b>
                  {t(E, " — moo (x, y, y) occurs if there exist positions i < j < k with a[i]=x, a[j]=y, a[k]=y. (Subsequence — gaps allowed.)",
                        " — moo (x, y, y) 가 i < j < k 인 자리에서 a[i]=x, a[j]=y, a[k]=y 면 발생. (부분수열 — 사이 건너뛰기 OK.)")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, background: "#fff", border: "1.5px solid #fdba74", borderRadius: 8, padding: "8px 10px" }}>
                <span style={{ color: "#7c3aed", fontWeight: 600, flexShrink: 0 }}>2.</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Distinct moos", "서로 다른 moo")}</b>
                  {t(E, " — two moos are distinct iff their tuples (x, y, y) differ. Count DISTINCT (x, y) pairs.",
                        " — 두 moo 는 (x, y, y) 가 다르면 서로 다름. 서로 다른 (x, y) 쌍을 셈.")}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#ecfdf5", border: "1px dashed #6ee7b7", borderRadius: 8, fontSize: 11.5, color: "#065f46", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 10⁶</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ a[i] ≤ N</code>
              <div style={{ marginTop: 4 }}>{t(E, "(Answer can be large — use 64-bit integers in C++.)", "(답이 클 수 있음 — C++ 에선 64-bit 정수.)")}</div>
            </div>
          </div>
        </div>),
    },

    /* 1-2 — Sample I/O. */
    {
      type: "reveal",
      narr: t(E,
        "Sample: a = [1, 2, 3, 4, 4, 4]. Three moos occur: (1, 4, 4), (2, 4, 4), (3, 4, 4) — 4 has count 3, and three distinct values come before its second-to-last position.",
        "샘플: a = [1, 2, 3, 4, 4, 4]. 발생하는 moo 3 개: (1, 4, 4), (2, 4, 4), (3, 4, 4) — 4 가 3 번 등장하고 그 끝에서 두 번째 위치 앞에 서로 다른 값 3 개."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#ea580c", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`6
1 2 3 4 4 4`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`3`}
              </div>
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#9a3412", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough", "풀이")}
            </div>
            <div>
              {t(E, "Only y values with COUNT ≥ 2 can be the (y, y) part of a moo. In a = [1, 2, 3, 4, 4, 4]:",
                    "(y, y) 가 되려면 y 가 2 번 이상 등장해야. a = [1, 2, 3, 4, 4, 4] 에서:")}
            </div>
            <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              count[1] = 1, count[2] = 1, count[3] = 1 → {t(E, "can't be y", "y 가 될 수 없음")}<br/>
              count[4] = 3 → {t(E, "could be y", "y 후보")}
            </div>
            <div style={{ marginTop: 6 }}>
              {t(E, "For y = 4: we need x ≠ 4 to appear BEFORE there are still ≥ 2 fours after. The second-to-last 4 is at position 5 (1-indexed). Distinct values appearing in positions 1..4: {1, 2, 3, 4}. Excluding 4 itself: {1, 2, 3} → 3 distinct x values.",
                    "y = 4 일 때: x ≠ 4 가 4 가 아직 ≥ 2 개 남은 위치 앞에 와야 함. 끝에서 두 번째 4 는 위치 5 (1-indexed). 위치 1..4 에 나타나는 서로 다른 값: {1, 2, 3, 4}. 자기 자신 4 제외: {1, 2, 3} → 서로 다른 x 값 3 개.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "Answer = 3.", "답 = 3.")}
            </div>
          </div>
        </div>),
    },

    /* 1-3 — Explorer. */
    {
      type: "reveal",
      narr: t(E,
        "Try different arrays. Each preset shows which moos occur. Notice values with count = 1 contribute nothing as y.",
        "여러 배열 시도. 각 preset 이 발생 moo 를 보여줌. count = 1 값은 y 가 못 됨."),
      content: (<MooinExplorer E={E} />),
    },

    /* 1-4 — Quiz. */
    {
      type: "quiz",
      narr: t(E,
        "Think: for y to be the moo's repeated value, y needs ≥ 2 occurrences. AND we need some x ≠ y BEFORE there are still ≥ 2 y's remaining.",
        "y 가 moo 의 반복 값이 되려면 y 가 ≥ 2 번. 그리고 ≥ 2 개의 y 가 남은 위치 앞에 x ≠ y 가 와야."),
      question: t(E,
        "a = [1, 1]. How many moos occur?",
        "a = [1, 1]. 발생 moo 개수?"),
      options: ["0", "1", "2"],
      correct: 0,
      explain: t(E,
        "y = 1 has count 2, but there's no x ≠ 1 before the (1, 1) pair. So no moos. Answer = 0.",
        "y = 1 은 count 2 지만 (1, 1) 쌍 앞에 x ≠ 1 인 위치가 없음. moo 0 개."),
    },

    /* 1-5 — Input quiz. */
    {
      type: "input",
      narr: t(E,
        "Walk through a = [1, 2, 2] yourself — which (x, y, y) tuples actually fit?",
        "a = [1, 2, 2] 직접 — (x, y, y) 중 어떤 게 자리를 갖춰?"),
      question: t(E,
        "Distinct moos in [1, 2, 2]?",
        "[1, 2, 2] 의 서로 다른 moo 개수?"),
      hint: t(E,
        "Which value can be the (y, y) pair?  Then who can come before as x?",
        "(y, y) 가 될 수 있는 값은? 그 앞에 x 로 올 수 있는 값은?"),
      answer: 1,
    },
  ];
}

export function makeMooin2Ch2(E, lang = "py") {
  return [
    /* 2-1..2-N — sections, no upfront prose page. */
    ...getMooin2Sections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E,
            "For each y with count ≥ 2, find the second-to-last position and count distinct earlier values (minus y itself).  Sections build it one piece at a time.",
            "count ≥ 2 인 각 y 마다 — y 의 끝에서 두 번째 자리를 찾고 그 앞 서로 다른 값 (y 자신 제외) 을 세. 아래 섹션이 한 단락씩 쌓아요.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
