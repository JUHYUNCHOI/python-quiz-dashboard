import { C, t } from "@/components/quest/theme";
import { getPhotoshootSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "from collections import deque",
  "",
  "N = int(input())",
  "start = input().strip()",
  "target = input().strip()",
  "",
  "# Allowed move: pick a prefix s[:i] (i >= 2) and reverse it.",
  "# Find the minimum number of moves to turn start into target.",
  "# BFS over all reachable arrangements (works for small N).",
  "if sorted(start) != sorted(target):",
  "    print(-1)",
  "else:",
  "    seen = {start: 0}",
  "    q = deque([start])",
  "    ans = -1",
  "    while q:",
  "        s = q.popleft()",
  "        if s == target:",
  "            ans = seen[s]",
  "            break",
  "        for i in range(2, N + 1):",
  "            nxt = s[:i][::-1] + s[i:]",
  "            if nxt not in seen:",
  "                seen[nxt] = seen[s] + 1",
  "                q.append(nxt)",
  "    print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhotoshootCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has a row of N cows, each Guernsey (G) or Holstein (H). He's given a final desired arrangement b[].\nHis only allowed move: pick a prefix of the row and REVERSE it. He wants to reach b in as few moves as possible.\nPrint the minimum number of prefix reversals.",
        "FJ에게 한 줄로 선 N마리 소가 있고, 각 소는 건지(G) 또는 홀스타인(H)이에요. 목표 배치 b[] 가 주어져요.\nFJ가 쓸 수 있는 유일한 동작: 접두사(앞부분 일정 길이)를 골라 그 부분을 뒤집기. 목표 b에 도달하기까지 동작을 가장 적게 사용해요.\n최소 뒤집기 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📸"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Photoshoot</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2022 Bronze #1</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "N cows in a row", "한 줄로 선 N마리 소")}</b>
                  {t(E, ", each ", "가 있고, 각 소는 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>G</code>
                  {t(E, " (Guernsey) or ", " 또는 ")}
                  <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>H</code>
                  {t(E, " (Holstein).", " (홀스타인) 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given a ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "target arrangement b", "목표 배치 b")}</b>
                  {t(E, " (also a string of G and H, same length N).",
                        " (G와 H로 된 같은 길이 N의 문자열)도 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One move: pick a ", "한 동작: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "prefix length k and reverse the first k cows", "접두사 길이 k를 골라 앞에서부터 k마리를 뒤집기")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of moves", "최소 동작 횟수")}</b>
                  {t(E, " to transform the starting row into b.",
                        " 를 출력해요. 시작 줄을 b로 만드는 데 필요한.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's check: in \"GHHG\", how many G's are at even positions (1-indexed, even = 2,4)?", "확인해보자: \"GHHG\"에서 짝수 위치(1-인덱스, 짝수=2,4)에 G가 몇 개예요?"),
      question: t(E,
        "\"GHHG\": pos 2 is H, pos 4 is G. How many G at even positions?",
        "\"GHHG\": 위치2는 H, 위치4는 G. 짝수 위치의 G 개수는?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "0", "0"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Position 2 has H, position 4 has G. Only 1 G at an even position.",
        "맞아! 위치2는 H, 위치4는 G. 짝수 위치에 G는 1개뿐이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "In \"GHHG\", how many G's are at even 1-indexed positions?", "\"GHHG\"에서 1-인덱스 짝수 위치에 G가 몇 개예요?"),
      question: t(E,
        "\"GHHG\": How many G at even positions (2,4)?",
        "\"GHHG\": 짝수 위치(2,4)에 G가 몇 개?"),
      hint: t(E,
        "Pos 2 = H, Pos 4 = G. Count only G's.",
        "위치2 = H, 위치4 = G. G만 세."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makePhotoshootCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Reverse-engineer from b: undo the cyclic shifts in b to derive the missing original a. Each prefix reversal in the original corresponds to one Bessie's b[i] = b[i-1] - 1 step.",
        "b 에서 거꾸로 추적: b 의 순환 이동을 되돌려서 원래 a 를 복원. 원본의 각 접두사 뒤집기는 b[i] = b[i-1] - 1 한 단계에 대응돼요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read N and target b", "N 과 목표 b 읽기"), code: "b = list(map(int, input().split()))", color: "#dc2626" },
              { n: 2, label: t(E, "Compare b[i] to b[i-1]", "b[i] 와 b[i-1] 비교"), code: "if b[i] == b[i-1] - 1: same direction", color: "#7c3aed" },
              { n: 3, label: t(E, "Each direction change = one move", "방향 전환마다 동작 1번"), code: "if direction differs from prev: moves += 1", color: "#0891b2" },
              { n: 4, label: t(E, "Print total moves", "총 동작 수 출력"), code: "print(moves)", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single linear scan", "선형 한 번 스캔")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getPhotoshootSections(E),
    },
  ];
}
