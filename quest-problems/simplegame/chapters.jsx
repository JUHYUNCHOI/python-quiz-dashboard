import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getSimpleGameSections } from "./components";

const KA = { wordBreak: "keep-all" };
const A = "#dc2626";

/* ─────────────────────────────────────────────────────────────
   Concept sim: pairs (a, b). Evirir adds a, Rhae subtracts b.
   Sort by a+b descending, then step turn by turn — Evirir grabs
   the top (+a), Rhae takes the next (−b), accumulating X−Y.
   Teaches: both players fight for the high-(a+b) pairs first, so
   optimal play just processes them in a+b order, alternating sign.
   ───────────────────────────────────────────────────────────── */
const DEMO = [
  { a: 6, b: 2 },
  { a: 2, b: 5 },
  { a: 4, b: 1 },
  { a: 1, b: 2 },
];
// sorted by a+b desc: (6,2)=8, (2,5)=7, (4,1)=5, (1,2)=3
const SORTED = [...DEMO].sort((p, q) => (q.a + q.b) - (p.a + p.b));

function PairPickSim({ E }) {
  // turn = how many pairs have been taken (0..SORTED.length)
  const [turn, setTurn] = useState(0);

  // running X-Y after `turn` picks
  let running = 0;
  for (let i = 0; i < turn; i++) {
    running += i % 2 === 0 ? SORTED[i].a : -SORTED[i].b;
  }
  const done = turn >= SORTED.length;
  const nextIsEvirir = turn % 2 === 0;

  const pairCard = (p, i) => {
    const taken = i < turn;
    const active = i === turn && !done;
    const isEvirir = i % 2 === 0;
    return (
      <div key={i} style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        borderRadius: 10, padding: "8px 10px", minWidth: 66,
        border: active ? `2px solid ${A}` : taken ? "1.5px solid #cbd5e1" : "1.5px solid #fca5a5",
        background: active ? "#fef2f2" : taken ? "#f1f5f9" : "#fff",
        opacity: taken ? 0.55 : 1, ...KA,
      }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800, color: "#334155" }}>
          ({p.a}, {p.b})
        </div>
        <div style={{ fontSize: 10.5, color: C.dim }}>
          a+b = <b style={{ color: "#7c3aed" }}>{p.a + p.b}</b>
        </div>
        {taken && (
          <div style={{ fontSize: 10.5, fontWeight: 800, color: isEvirir ? "#15803d" : "#dc2626" }}>
            {isEvirir ? `+${p.a}` : `−${p.b}`}
          </div>
        )}
        {active && (
          <div style={{ fontSize: 10, fontWeight: 700, color: A }}>
            {isEvirir ? t(E, "Evirir", "Evirir") : t(E, "Rhae", "Rhae")}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
          🎮 {t(E, "Sort by a+b, then take turns", "a+b 로 정렬한 뒤 번갈아 가져가기")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "Each pair is worth a to Evirir and b to Rhae — a total pull of a+b. Both want the high-a+b pairs first, so we sort by a+b (biggest first). Evirir takes the top (+a), Rhae the next (−b), and so on. Step through it.",
            "각 쌍은 Evirir 에게 a, Rhae 에게 b 만큼 값져요 — 합쳐서 a+b 만큼 당겨요. 둘 다 a+b 큰 쌍을 먼저 원하니 a+b 로 (큰 것부터) 정렬해요. Evirir 가 맨 위(+a), Rhae 가 다음(−b), … 이렇게요. 한 칸씩 눌러봐요.")}
        </div>

        {/* sorted pairs */}
        <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 6 }}>
          {t(E, "pairs sorted by a+b (high → low)", "a+b 내림차순 정렬된 쌍 (큰 것 → 작은 것)")}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {SORTED.map((p, i) => pairCard(p, i))}
        </div>

        {/* controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => setTurn(Math.max(0, turn - 1))} disabled={turn === 0} style={navBtn(turn === 0)}>◀ {t(E, "back", "이전")}</button>
          <button onClick={() => setTurn(Math.min(SORTED.length, turn + 1))} disabled={done} style={navBtn(done)}>
            {done ? t(E, "done", "끝") : nextIsEvirir ? t(E, "Evirir takes +a ▶", "Evirir 가 +a ▶") : t(E, "Rhae takes −b ▶", "Rhae 가 −b ▶")}
          </button>
          <button onClick={() => setTurn(0)} style={{ ...navBtn(false), background: "#fff", color: "#7f1d1d" }}>↺ {t(E, "reset", "처음")}</button>
        </div>

        {/* running total */}
        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.6, ...KA }}>
          <span style={{ color: "#8b949e" }}>X − Y = </span>
          {SORTED.slice(0, turn).map((p, i) => (
            <span key={i}>
              <b style={{ color: i % 2 === 0 ? "#86efac" : "#fca5a5" }}>{i % 2 === 0 ? `+${p.a}` : `−${p.b}`}</b>{" "}
            </span>
          ))}
          {turn > 0 && <span style={{ color: "#8b949e" }}>= </span>}
          <b style={{ color: "#fbbf24" }}>{running}</b>
          {done && <span style={{ color: "#86efac", fontWeight: 800 }}>  ✓ {t(E, "final", "최종")}</span>}
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {t(E,
            "No game tree needed: once the pairs sit in a+b order, the answer is just +a, −b, +a, −b, … added up. That is the final X−Y under optimal play.",
            "게임 트리를 그릴 필요 없어요: 쌍이 a+b 순서로 놓이면, 답은 그냥 +a, −b, +a, −b, … 를 더한 것. 그게 최적 플레이에서의 최종 X−Y 예요.")}
        </div>
      </div>
    </div>
  );
}
function navBtn(disabled) {
  return {
    padding: "6px 12px", borderRadius: 8, border: `1.5px solid ${A}`,
    background: disabled ? "#f1f5f9" : A, color: disabled ? "#94a3b8" : "#fff",
    fontSize: 12.5, fontWeight: 700, cursor: disabled ? "default" : "pointer",
  };
}

/* ================================================================
   SOLUTION CODE  (sort by a+b desc, alternate +a / -b)
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "def main():",
  "    data = sys.stdin.read().split()",
  "    idx = 0",
  "    n = int(data[idx]); idx += 1",
  "    pairs = []",
  "    for _ in range(n):",
  "        a = int(data[idx]); b = int(data[idx + 1]); idx += 2",
  "        pairs.append((a, b))",
  "    pairs.sort(key=lambda p: -(p[0] + p[1]))",
  "    res = 0",
  "    for t, (a, b) in enumerate(pairs):",
  "        res += a if t % 2 == 0 else -b",
  "    print(res)",
  "main()",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem
   ═══════════════════════════════════════════════════════════════ */
export function makeSimpleGameCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Evirir and Rhae share n pairs (a, b). They alternate, Evirir first. On his turn Evirir takes a pair and adds its a to X; on her turn Rhae takes a pair and adds its b to Y. Evirir maximizes X−Y, Rhae minimizes it.\nBoth play optimally — print the final X−Y.",
        "Evirir 와 Rhae 가 n 개의 쌍 (a, b) 를 나눠 가져요. 번갈아 두고, Evirir 가 먼저예요. Evirir 차례엔 쌍 하나를 골라 그 a 를 X 에 더하고, Rhae 차례엔 쌍 하나를 골라 그 b 를 Y 에 더해요. Evirir 는 X−Y 를 최대로, Rhae 는 최소로 만들어요.\n둘 다 최적으로 둘 때의 최종 X−Y 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🎮"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: A }}>Simple Game</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P4</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Both players play optimally — print the final X−Y.",
                "두 사람이 최적으로 둘 때의 최종 X−Y 를 출력해요.")}
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
                  {t(E, "There are ", "총 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "n pairs", "n 개의 쌍")}</b>
                  {t(E, " ", " ")}<b style={{ color: "#334155" }}>(a, b)</b>
                  {t(E, ". Evirir and Rhae take turns, Evirir first.", ". Evirir 와 Rhae 가 번갈아 두고, Evirir 가 먼저예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "On his turn ", "차례에 ")}<b style={{ color: "#15803d" }}>Evirir</b>
                  {t(E, " removes a pair and adds its ", " 는 쌍 하나를 없애고 그 ")}<b style={{ color: "#15803d" }}>a</b>
                  {t(E, " to ", " 를 ")}<b>X</b>{t(E, ". On her turn ", " 에 더해요. 차례에 ")}<b style={{ color: "#dc2626" }}>Rhae</b>
                  {t(E, " removes a pair and adds its ", " 는 쌍 하나를 없애고 그 ")}<b style={{ color: "#dc2626" }}>b</b>
                  {t(E, " to ", " 를 ")}<b>Y</b>{t(E, ".", " 에 더해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#15803d" }}>Evirir</b>{t(E, " wants ", " 는 ")}<b>X−Y</b>{t(E, " as big as possible; ", " 를 최대한 크게, ")}
                  <b style={{ color: "#dc2626" }}>Rhae</b>{t(E, " wants it as small as possible.", " 는 최대한 작게 만들려 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "final X−Y under optimal play", "최적 플레이에서의 최종 X−Y")}</b>
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
        "Read the input format and the official example. The first line is n; then n lines each hold one pair a b.",
        "입력 형식과 공식 예제를 봐요. 첫 줄은 n, 그다음 n 줄에 각각 쌍 a b 가 들어와요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          {/* INPUT */}
          <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>n</b> — {t(E, "number of pairs (first line)", "쌍의 개수 (첫 줄)")}</div>
              <div>• {t(E, "then ", "그다음 ")}<b>n</b>{t(E, " lines, each ", " 줄, 각 줄에 ")}<b>a b</b>{t(E, " — one pair", " — 쌍 하나")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 2 ≤ n ≤ 10^4, −10^9 ≤ a, b ≤ 10^9.", "제약: 2 ≤ n ≤ 10^4, −10^9 ≤ a, b ≤ 10^9.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, flex: 1, minWidth: 130 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>2</div>
              <div>4 2</div>
              <div>1 3</div>
            </div>
            <div style={{ background: "#0f172a", color: "#86efac", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>1</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "Pairs (4,2) and (1,3) have a+b = 6 and 4. Evirir takes the bigger-sum pair (4,2) → X=4. Rhae takes (1,3) → Y=3. X−Y = 4−3 = 1.",
              "쌍 (4,2) 와 (1,3) 의 a+b 는 6 과 4. Evirir 가 합이 큰 (4,2) 를 가져가 X=4. Rhae 가 (1,3) 을 가져가 Y=3. X−Y = 4−3 = 1.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "Feel the strategy. Sort the pairs by a+b, then step through the turns and watch X−Y build up.",
        "전략을 직접 느껴봐요. 쌍을 a+b 로 정렬한 뒤, 차례를 한 칸씩 밟으며 X−Y 가 쌓이는 걸 봐요."),
      content: <PairPickSim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "Both players fight hardest over the pair with the largest a+b: Evirir wants its a, Rhae wants to deny its b. So the very first pick is the one with the biggest a+b.",
        "두 사람은 a+b 가 가장 큰 쌍을 놓고 가장 치열하게 다퉈요: Evirir 는 그 a 를, Rhae 는 그 b 를 뺏기지 않으려 해요. 그래서 맨 처음 고르는 건 a+b 가 가장 큰 쌍이에요."),
      question: t(E,
        "Pairs: (3, 1), (2, 6), (5, 2). Which pair does Evirir take on the first turn?",
        "쌍: (3, 1), (2, 6), (5, 2). Evirir 가 첫 차례에 가져가는 쌍은?"),
      options: [
        t(E, "(2, 6) — largest a+b = 8", "(2, 6) — a+b = 8 로 가장 큼"),
        t(E, "(5, 2) — largest a = 5", "(5, 2) — a = 5 로 가장 큼"),
        t(E, "(3, 1) — smallest b = 1", "(3, 1) — b = 1 로 가장 작음"),
      ],
      correct: 0,
      explain: t(E,
        "Sort by a+b: (2,6)=8, (5,2)=7, (3,1)=4. Evirir takes (2,6) first (+2 to X), then Rhae takes (5,2) (−2), then Evirir takes (3,1) (+3). X−Y = 2−2+3 = 3.",
        "a+b 로 정렬: (2,6)=8, (5,2)=7, (3,1)=4. Evirir 가 (2,6) 을 먼저(X 에 +2), Rhae 가 (5,2)(−2), Evirir 가 (3,1)(+3). X−Y = 2−2+3 = 3."),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeSimpleGameCh2(E, lang = "py") {
  return [
    // 2-1: slow vs fast plan
    {
      type: "reveal",
      narr: t(E,
        "The slow way tries every possible sequence of choices (a game tree): with n pairs that is about 2^n branches — hopeless past n≈20. The fast way proves both players just take pairs in a+b order, turning the whole game into one sort plus a single pass.",
        "느린 방법은 모든 선택 순서를 다 시도해요 (게임 트리): n 개 쌍이면 약 2^n 갈래 — n≈20 만 넘어도 불가능해요. 빠른 방법은 두 사람 모두 a+b 순서로 쌍을 가져간다는 걸 증명해서, 게임 전체를 정렬 한 번 + 한 번 훑기로 바꿔요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: search the whole game tree", "느림: 게임 트리 전체 탐색")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Try every choice at every turn (minimax): ≈ 2^n states. With n up to 10^4 this never finishes.", "매 차례 모든 선택을 시도 (미니맥스): ≈ 2^n 상태. n 이 10^4 까지면 절대 못 끝나요.")}
              </div>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>
                🚀 {t(E, "Fast: sort by a+b, then alternate +a / −b", "빠름: a+b 로 정렬 후 +a / −b 번갈아")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Sort the pairs by a+b descending (n log n), then add +a on even turns and −b on odd turns. That sum IS the optimal X−Y.", "쌍을 a+b 내림차순으로 정렬(n log n)한 뒤, 짝수 차례엔 +a, 홀수 차례엔 −b 를 더해요. 그 합이 바로 최적 X−Y 예요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the fast code, section by section.", "↓ 빠른 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getSimpleGameSections(E),
    },
  ];
}
