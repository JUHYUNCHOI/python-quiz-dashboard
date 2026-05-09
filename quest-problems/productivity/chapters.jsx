import { C, t } from "@/components/quest/theme";
import { getProductivitySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "from bisect import bisect_left",
  "",
  "data = sys.stdin.read().split()",
  "p = 0",
  "N = int(data[p])",
  "p += 1",
  "Q = int(data[p])",
  "p += 1",
  "c  = [int(x) for x in data[p:p+N]]; p += N   # closing times",
  "ti = [int(x) for x in data[p:p+N]]; p += N   # travel times",
  "",
  "# Reachable farm i iff S + t[i] < c[i]  ⇔  d[i] := c[i] - t[i] > S.",
  "d = sorted(c[i] - ti[i] for i in range(N))",
  "",
  "out = []",
  "for _ in range(Q):",
  "    V = int(data[p]); p += 1   # query is 'V S' (V first, then S)",
  "    S = int(data[p])",
  "    p += 1",
  "    # count of d[i] > S = N - (first index with d[i] >= S+1)",
  "    reachable = N - bisect_left(d, S + 1)",
  "    out.append('YES' if reachable >= V else 'NO')",
  "",
  "print(chr(10).join(out))",
];

/* ================================================================
   Chapter 1: Problem Understanding (4 steps)
   ================================================================ */
export function makeProdCh1(E) {
  return [
    // 1-1: Intro
    {
      type: "reveal",
      narr: t(E,
        "Bessie wants to visit as many farms as possible!\nEach farm closes at a certain time, and she needs travel time to get there.\nCan she visit enough?\n📊", "Bessie가 최대한 많은 농장을 방문하고 싶어! 각 농장은 특정 시간에 닫히고, 가는 데 이동 시간이 필요해요. 충분히 방문할 수 있을까? 📊"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>📊</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Max Productivity</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2024 Bronze #3</div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", margin: "12px 0", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "For each (V, S) query, output YES if Bessie can reach ≥ V farms, else NO.",
                "각 (V, S) 쿼리마다 Bessie 가 V 개 이상 농장에 갈 수 있으면 YES, 아니면 NO 출력.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "N farms, each closes at time c_i. Bessie wakes at time S, arrives at farm i at time t_i + S. She can visit farm i only if t_i + S < c_i. Given Q queries (V, S): can she visit at least V farms?",
              "N개 농장, 각각 시간 c_i에 닫혀.\nBessie는 시간 S에 일어나서, 농장 i에 t_i + S에 도착.\nt_i + S < c_i일 때만 방문 가능.\nQ개 쿼리 (V, S): V개 이상 방문 가능?")}
          </div>
        </div>),
    },
    // 1-1b: Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input format: N Q, then N closing times, then N travel times, then Q queries each on its own line as 'V S'.",
        "입력: 첫 줄 N Q, 그 다음 닫힘 시간 N 개, 이동 시간 N 개, 마지막에 'V S' 형식 쿼리 Q 줄."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f97316", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9a3412", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#9a3412", whiteSpace: "pre" }}>
{`5 5
3 5 7 9 12
4 2 3 3 8
1 5
1 6
3 3
4 2
5 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`YES
NO
YES
YES
NO`}
              </div>
            </div>
          </div>
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#9a3412", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough — query 1: V=1, S=5", "풀이 — 1 번 쿼리: V=1, S=5")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "Reachable iff S + t[i] < c[i]:",
                    "방문 가능 조건: S + t[i] < c[i]:")}
              <br/>
              {t(E, "farm 0: 5 + 4 = 9 < 3? NO.  farm 1: 5 + 2 = 7 < 5? NO.",
                    "농장 0: 5+4=9 < 3? NO.  농장 1: 5+2=7 < 5? NO.")}
              <br/>
              {t(E, "farm 2: 5 + 3 = 8 < 7? NO.  farm 3: 5 + 3 = 8 < 9? YES.  farm 4: 5 + 8 = 13 < 12? NO.",
                    "농장 2: 5+3=8 < 7? NO.  농장 3: 5+3=8 < 9? YES.  농장 4: 5+8=13 < 12? NO.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "→ reachable = 1.  V = 1.  1 ≥ 1 → YES.", "→ 방문 가능 = 1. V = 1. 1 ≥ 1 → YES.")}
            </div>
          </div>
        </div>),
    },
    // 1-2: Key transformation
    {
      type: "reveal",
      narr: t(E,
        "The trick is to rearrange the condition!\nt_i + S < c_i means S < c_i - t_i.\nSo precompute d_i = c_i - t_i!", "핵심 트릭은 조건을 변환하는 거예요! t_i + S < c_i는 S < c_i - t_i를 의미해요. d_i = c_i - t_i를 미리 계산하면 돼요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#f97316", marginBottom: 10 }}>
              {t(E, "Transform the Condition", "조건 변환")}
            </div>
            <div style={{ background: "#fff", border: "1px solid #fdba74", borderRadius: 10, padding: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ea580c", fontFamily: "'JetBrains Mono',monospace", textAlign: "center", lineHeight: 2 }}>
                t_i + S {"<"} c_i<br/>
                S {"<"} c_i - t_i<br/>
                S {"<"} d_i
              </div>
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {t(E,
                "d_i = c_i - t_i is the latest Bessie can wake up and still visit farm i.\nSort d[], then for each query S, binary search to count how many d_i > S!", "d_i = c_i - t_i는 Bessie가 농장 i를 방문할 수 있는 가장 늦은 기상 시간이에요.\nd[]를 정렬한 후, 각 쿼리 S에 대해 이진 탐색으로 d_i > S인 개수를 세!")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's check: c=[10,5,8], t=[3,2,4], S=3. Which farms can Bessie visit?", "확인해보자: c=[10,5,8], t=[3,2,4], S=3. Bessie가 어떤 농장을 방문할 수 있어요?"),
      question: t(E,
        "c=[10,5,8], t=[3,2,4], S=3. Farm 1: 3+3=6<10 OK. Farm 2: 2+3=5, NOT <5. Farm 3: 4+3=7<8 OK. How many farms?",
        "c=[10,5,8], t=[3,2,4], S=3. 농장1: 3+3=6<10 OK. 농장2: 2+3=5, 5<5 아님. 농장3: 4+3=7<8 OK. 몇 개 농장?"),
      options: [
        t(E, "1 farm", "1개 농장"),
        t(E, "2 farms", "2개 농장"),
        t(E, "3 farms (all)", "3개 농장 (전부)"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Farm 1 (6<10) and Farm 3 (7<8) are reachable. Farm 2 fails because 5 is NOT strictly less than 5. Answer: 2!",
        "정답! 농장1 (6<10)과 농장3 (7<8)이 방문 가능. 농장2는 5가 5보다 엄격히 작지 않아서 실패. 답: 2개!"),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Now you try! Same example but count it yourself.", "이제 직접 해봐요! 같은 예제로 직접 세봐요."),
      question: t(E,
        "c=[10,5,8], t=[3,2,4], S=3. How many farms can Bessie visit? (strict inequality: t_i + S < c_i)",
        "c=[10,5,8], t=[3,2,4], S=3. Bessie가 방문할 수 있는 농장 수는? (엄격한 부등식: t_i + S < c_i)"),
      hint: t(E,
        "Check each farm with the strict inequality and tally the yes's.",
        "각 농장을 엄격한 부등식으로 확인하고 yes 인 것을 세어 봐."),
      answer: 2,
    },
  ];
}

/* ================================================================
   Chapter 2: Code (2 steps)
   ================================================================ */
export function makeProdCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Farm i reachable iff S < c[i] − t[i]. Precompute d[i] = c[i] − t[i], sort, and for each query do one binary search for 'how many d > S'. Sections build it one piece at a time.",
        "농장 i 도달 가능 ↔ S < c[i] − t[i]. d[i] = c[i] − t[i] 계산·정렬, 쿼리마다 'd > S 개수' 이분탐색 한 번. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getProductivitySections(E),
    },
  ];
}
