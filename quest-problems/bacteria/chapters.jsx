import { C, t } from "@/components/quest/theme";
import { getBacteriaSections, BacteriaTrickSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBacteriaCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Find the fewest walks needed to zero out every deviation.",
        "워크를 써서 편차를 모두 0 으로 만드는 최소 횟수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udda0"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Balancing Bacteria</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2024 Bronze #3</div>
          </div>

          {/* \ud83c\udfaf Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              \ud83c\udfaf {t(E, "Mission", "\ubbf8\uc158")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the smallest number of walks (any mix of type-1 and type-2) that zero out every a[i].",
                "\ubaa8\ub4e0 a[i] \ub97c 0 \uc73c\ub85c \ub9cc\ub4e4 \uc218 \uc788\ub294 \ucd5c\uc18c \uc6cc\ud06c \ud69f\uc218 (\ud0c0\uc785 1 / 2 \uc11e\uc5b4\uc11c) \ucd9c\ub825.")}
            </div>
          </div>

          {/* Mini-visual: linear ramp added to a[h..N] */}
          <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", textAlign: "center", marginBottom: 10 }}>
              {t(E, "What ONE walk does — type-1 starting at h=2 on a 5-patch row:",
                    "워크 한 번이 하는 일 — 5 칸 패치, 타입 1, h=2:")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, marginBottom: 8 }}>
              {[
                { i: 1, before: 0, add: 0, color: "#9ca3af" },
                { i: 2, before: 0, add: 1, color: "#16a34a" },
                { i: 3, before: 0, add: 2, color: "#16a34a" },
                { i: 4, before: 0, add: 3, color: "#16a34a" },
                { i: 5, before: 0, add: 4, color: "#16a34a" },
              ].map((c) => (
                <div key={c.i} style={{ background: "#fff", border: `1px solid ${c.color}`, borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.dim, fontWeight: 700 }}>a[{c.i}]</div>
                  <div style={{ fontSize: 10, color: c.add > 0 ? "#16a34a" : "#9ca3af", fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>
                    {c.add > 0 ? `+${c.add}` : "—"}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#065f46", fontFamily: "'JetBrains Mono',monospace" }}>{c.before + c.add}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: C.text, lineHeight: 1.6, textAlign: "center" }}>
              {t(E, "Linear ramp 1, 2, 3, 4 added to a[2..5].  Position 1 unchanged.",
                    "1, 2, 3, 4 가 차례로 a[2..5] 에 더해져요. 위치 1 은 그대로예요.")}
              <br/>
              <b style={{ color: "#059669" }}>{t(E, "Type-2 walk = same ramp, but subtracted.",
                                                       "타입 2 워크는 같은 ramp 를 빼요.")}</b>
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N patches in a row", "한 줄로 늘어선 N개의 패치")}</b>
                  {t(E, " with deviation values ", "가 있어요. 각 패치의 편차값 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>a[1..N]</code>
                  {t(E, " (positive or negative).", " (양수 또는 음수)이 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "Type-1 walk starting at h", "타입 1 워크 (시작 h)")}</b>
                  {t(E, ": adds the ramp ", ": ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>1, 2, 3, …, N − h + 1</code>
                  {t(E, " to positions ", " 만큼을 위치 ")}
                  <code style={{ background: "#d1fae5", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>h, h+1, …, N</code>
                  {t(E, ".", " 에 더해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Type-2 walk", "타입 2 워크")}</b>
                  {t(E, " is the same ramp but ", " 도 같은 ramp 인데 ")}
                  <b>{t(E, "subtracted", "빼기")}</b>
                  {t(E, ". Each walk counts as ONE operation, regardless of how long the ramp is.",
                        ". 워크 한 번은 ramp 길이와 관계없이 1번으로 계산해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of walks", "필요한 워크의 최소 횟수")}</b>
                  {t(E, " to make every a[i] equal 0.", ", 곧 모든 a[i] 를 0 으로 만드는 횟수를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input: N on line 1, then N values on line 2.  Output: minimum walks.",
        "첫 줄에 N, 둘째 줄에 값 N 개가 들어와요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#065f46", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#065f46" }}>
                <div>2 <span style={{ fontSize: 10.5, color: "#065f46", opacity: 0.6 }}>← {t(E, "N (patches)", "N (패치 수)")}</span></div>
                <div>-1 3 <span style={{ fontSize: 10.5, color: "#065f46", opacity: 0.6 }}>← {t(E, "a[1..N]", "a[1..N]")}</span></div>
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534" }}>
                <div>6 <span style={{ fontSize: 10.5, color: "#166534", opacity: 0.6 }}>← {t(E, "min walks", "최소 워크 수")}</span></div>
              </div>
            </div>
          </div>
          <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#065f46", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough", "풀이")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "a = [-1, 3]. To zero out a[1]=-1, do 1 type-1 walk starting at h=1: it adds (1, 2) → a = [0, 5].",
                    "a = [-1, 3] 이에요. a[1]=-1 을 없애려면 h=1 에서 타입 1 워크를 한 번 해요.\n(1, 2) 가 더해져서 a = [0, 5] 가 돼요.")}
              <br/>
              {t(E, "Now a[2]=5. A type-2 walk at h=2 subtracts (1) from a[2] only.  Need 5 such walks.",
                    "이제 a[2]=5 예요. h=2 의 타입 2 워크는 a[2] 에서 1 만 빼니까 5 번이 필요해요.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "Total walks: 1 + 5 = 6.", "총 워크 수는 1 + 5 = 6 이에요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Sim — eye-evident: one walk = one ±1 in diff(diff(a))
    {
      type: "reveal",
      narr: t(E,
        "Try walks. Watch diff(diff(a)) — only ONE cell flickers ±1 per walk. That's the whole trick.",
        "워크를 눌러 diff(diff(a)) 가 어떻게 바뀌는지 봐요."),
      content: (<BacteriaTrickSim E={E} />),
    },
    // 1-4: Quiz — single-position walk
    {
      type: "quiz",
      narr: t(E,
        "A walk starting at h=N only touches a[N] (it's a 1-element ramp).",
        "h=N 에서 시작하는 워크는 a[N] 한 칸만 건드려요 (길이 1 ramp)."),
      question: t(E,
        "If a = [0, 5] (N=2), how many type-2 walks at h=2 do we need to make a[2] = 0?",
        "a = [0, 5] (N=2) 일 때 h=2 타입 2 워크를 몇 번 해야 a[2] 가 0 이 될까요?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "5", "5"),
      ],
      correct: 2,
      explain: t(E,
        "A type-2 walk at h=2 subtracts a 1-length ramp (just 1) from a[2].  Need 5 walks to drop a[2] from 5 → 0.",
        "h=2 의 타입 2 워크는 a[2] 에서 1 만 빼요.\n5 를 0 으로 만들려면 5 번 해야 해요."),
    },
    // 1-5: Input — second-difference intuition (now backed by sim above)
    {
      type: "input",
      narr: t(E,
        "Practice the arithmetic — given the two diffs already computed, what does the formula give?",
        "diff 는 이미 구해 뒀어요. 식대로 답을 내 봐요."),
      question: t(E,
        "a = [-1, 3].  diff(a) = [-1, 4].  diff(diff(a)) = [-1, 5].  Sum of absolute values?",
        "a = [-1, 3] 이에요. diff(a) = [-1, 4], diff(diff(a)) = [-1, 5] 예요.\n절댓값을 더하면 얼마일까요?"),
      hint: t(E,
        "Sum the absolute values of the two entries.",
        "두 값의 절댓값을 더해 봐요."),
      answer: 6,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBacteriaCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — sections explain the diff(diff) trick as it unfolds.
    {
      type: "progressive",
      narr: t(E,
        "See, piece by piece, why one walk changes just a single cell.",
        "워크 한 번이 왜 한 칸만 바꾸는지 한 단락씩 봐요."),
      sections: getBacteriaSections(E),
    },
  ];
}
