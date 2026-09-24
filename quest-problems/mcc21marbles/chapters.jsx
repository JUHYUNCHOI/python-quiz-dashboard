import { C, t } from "@/components/quest/theme";
import { getMcc21MarblesSections, getMcc21MarblesWalk, Mcc21MarblesBoundarySim } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";

const KA = { wordBreak: "keep-all" };

/* ================================================================
   SOLUTION CODE  (fast: one prefix-carry pass over D = A - B)
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */

export function makeMcc21MarblesCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Move marbles one step at a time to turn box counts A into target counts B.",
        "구슬을 옆 상자로 옮겨서 A 를 B 로 만들어 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔴"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#dc2626" }}>Marbles and Boxes</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E, "Find the minimum single-marble moves to turn the start counts A into the target counts B.", "시작 개수 A 를 목표 개수 B 로 만드는 최소 이동 횟수를 구해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "N boxes in a row. Box i has ", "한 줄의 N 개 상자. 상자 i 는 ")}
                  <b style={{ color: "#dc2626" }}>A[i]</b>{t(E, " marbles now and must reach ", " 개를 가지고 있고 ")}<b style={{ color: "#7c3aed" }}>B[i]</b>
                  {t(E, ".", " 개가 되어야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation: ", "한 번 할 수 있는 일은 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "move 1 marble to an adjacent box", "구슬 1 개를 인접한 상자로 옮기기")}</b>
                  {t(E, " (box i−1 or i+1).", " 예요 (상자 i−1 또는 i+1).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum operations to turn A into B", "A 를 B 로 만드는 최소 이동 횟수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "Read the input format and the official example. Three values come in: N, array A, array B — position i pairs them up (box i goes from A[i] to B[i]).",
        "입력은 N, 배열 A, 배열 B 이렇게 셋이에요. 같은 자리끼리 짝이에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff1f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>N</b> — {t(E, "number of boxes", "상자 개수")}</div>
              <div>• <b>A</b> — {t(E, "N integers: the START count of each box", "N 개 정수: 각 상자의 시작 개수")}</div>
              <div>• <b>B</b> — {t(E, "N integers: the TARGET count of each box", "N 개 정수: 각 상자의 목표 개수")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ N ≤ 5·10⁴ (50,000), sum(A) ≤ 5·10¹¹ (500 billion), sum(A) = sum(B).", "제약: 1 ≤ N ≤ 5·10⁴(5만), sum(A) ≤ 5·10¹¹(5000억), sum(A) = sum(B).")}
            </div>
            {/* 2026-09-17: 원문(public/problems/mcc21marbles.pdf)은 N = 5 / A = [2,2,2,6,3] /
                B = [1,2,3,4,5] 처럼 값을 변수로 준다. 줄 형식은 우리 연습 방식이다. */}
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6, lineHeight: 1.55, whiteSpace: "pre-line", ...KA }}>
              {t(E,
                "The original problem hands the data over as values: N = 5, A = [2,2,2,6,3], B = [1,2,3,4,5].\nOur code writes those same values down and starts from there.\nReading them line by line with input() shows up in the 2022 problems.",
                "원문은 N = 5, A = [2,2,2,6,3], B = [1,2,3,4,5] 처럼 값을 변수로 줘요.\n코드도 원문 그대로 값을 적어 두고 시작해요.\ninput() 으로 줄을 읽어 오는 법은 2022년 문제에서 만나요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>N = 5</div>
              <div>A = [2, 2, 2, 6, 3]</div>
              <div>B = [1, 2, 3, 4, 5]</div>
            </div>
            <div style={{ background: "#0f172a", color: "#fca5a5", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>4 <span style={{ color: "#fca5a5", fontSize: 10.5, fontWeight: 400 }}>{t(E, "← min moves", "← 최소 횟수")}</span></div>
            </div>
          </div>
          {/* 2026-09-17: 98 자가 한 줄로 이어져 있었다. 절 단위로 끊는다. */}
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55,
            whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
            {t(E,
              "A = [2,2,2,6,3] → B = [1,2,3,4,5].\nOne optimal way: 1→2, 2→3, then twice 4→5.\nThat's 4 single-marble moves.",
              "A = [2,2,2,6,3] → B = [1,2,3,4,5] 예요.\n제일 좋은 방법 하나는 1→2, 2→3, 그다음 4→5 를 두 번 옮기는 거예요.\n모두 4 번 옮기면 돼요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Look at each box's surplus/shortage: D = A − B.",
        "상자마다 남거나 모자란 양 D = A − B 를 봐요."),
      content: <Mcc21MarblesBoundarySim E={E} />,
    },

    // 1-4: understanding quiz
    {
      type: "quiz",
      narr: t(E,
        "Box 1 has 2 too many, box 2 is 2 short.",
        "상자 1 은 2 개 많고 상자 2 는 2 개 모자라요."),
      question: t(E,
        "A = [5, 1], target B = [3, 3]. Minimum moves?",
        "A = [5, 1], 목표 B = [3, 3]. 최소 이동?"),
      options: [
        t(E, "1 move", "1번"),
        t(E, "2 moves", "2번"),
        t(E, "4 moves", "4번"),
      ],
      correct: 1,
      explain: t(E,
        // 2026-09-24 (6th round, fix①): "Prefix" here / "carry" on the table
        // (page 3) was a 4th name for the same value. Now they match.
        "D = [+2, −2]. Carry after box 1 = +2, so 2 marbles cross the boundary. |+2| = 2 moves.",
        "D = [+2, −2] 예요.\n상자 1 까지의 carry 가 +2 라서 구슬 2 개가 경계를 건너요.\n|+2| = 2 번이에요."),
    },

    // 1-5: hand-computed input
    {
      type: "input",
      narr: t(E,
        "Now three boxes. Add up the amount crossing both boundaries.",
        "이번엔 상자 3 개예요. 경계 두 곳을 건너는 양을 더해 봐요."),
      question: t(E,
        "A = [3, 0, 3], B = [1, 4, 1]. Min moves?",
        "A = [3, 0, 3], B = [1, 4, 1]. 최소 이동?"),
      hint: t(E, "D = [+2, −4, +2]. Carry after box 1 = +2, after box 2 = −2. Add |+2| + |−2|.", "D = [+2, −4, +2] 예요.\n상자 1 까지의 carry 는 +2, 상자 2 까지는 −2 예요.\n|+2| + |−2| 를 더해요."),
      answer: 4,
    },
  ];
}

export function makeMcc21MarblesCh2(E, lang = "py") {
  const w = getMcc21MarblesWalk(E);
  return [
    // 2-1: plan — slow vs fast
    {
      type: "reveal",
      narr: t(E,
        "The slow way moves marbles one by one; the fast way just counts.",
        "느린 방법은 구슬을 하나씩 옮기고, 빠른 방법은 세기만 해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: move the marbles one hop at a time", "느림: 구슬을 한 칸씩 진짜로 옮겨 보기")}
              </div>
              {/* 2026-09-17: 98 자가 한 줄로 이어져 있었다. 절 단위로 끊는다. */}
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55,
                whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
                {t(E,
                  "We did NOT try this one in the sim — here is why.\nMarbles can travel far and the totals reach 5·10¹¹ (500 billion),\nso the number of hops is astronomically large. It times out.",
                  "이 방법은 앞 시뮬에서 해 보지 않았어요. 왜 안 하는지만 보고 넘어가요.\n구슬이 멀리 갈 수 있고 합이 5·10¹¹(5000억)까지라 옮기는 횟수가 어마어마해요.\n그래서 시간 초과예요.")}
              </div>
            </div>
            <div style={{ background: "#fff1f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#7f1d1d", marginBottom: 4 }}>
                🚀 {t(E, "Fast: prefix-carry over D = A − B", "빠름: D = A − B 를 쌓아 가며 세기")}
              </div>
              {/* 2026-09-24: mcc21marbles 4쪽 polish — "경계 왼쪽에 남은 차이는 반드시
                  그 경계를 건너요" 가 이 문단·코드 why(components.jsx)·시뮬 완료 패널까지
                  세 번 나왔다. 여기는 시뮬로 이어주는 한 줄 콜백만 남긴다. */}
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55,
                whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
                {t(E,
                  "This is the method from the sim — turn it into code, one boundary at a time.",
                  "이건 앞 시뮬에서 해 본 그 방법이에요. 그대로 코드로 옮겨요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ Next page: the fast code, section by section.", "↓ 다음 쪽에서 빠른 코드를 한 단락씩 봐요.")}
          </div>
        </div>),
    },
    // 2-2: code, CodeWalk — bubbles sit on the lines they explain
    {
      type: "reveal",
      narr: t(E,
        "Read the solution top to bottom — each bubble sits on the lines it explains.",
        "말풍선이 설명하는 코드 줄에 붙어 있어요."),
      content: (
        <CodeWalk E={E} lang="py" code={w.code} vars={w.vars} beats={w.beats} accent="#dc2626" />
      ),
    },
  ];
}
