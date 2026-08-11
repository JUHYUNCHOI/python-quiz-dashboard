// Innovation (MCC 2023 P3) 용 시뮬 — components.jsx 는 건드리지 않고 여기에만
// (cowsplits / chipxchg 와 같은 방식).
//
// 원칙 (quest_problem_standard + pain_points):
//   · 학생이 주인공 — 학생 목소리로(해요체, 반말 X)
//   · 관찰 → 추론 — "겹치면 c·d 는 가려진다 → 마지막 한 장만 c+d" 를 눈으로 발견
//   · 시뮬로 개념: 카드 그림(a 위 · b/c/d 아래) + 마지막 한 장만 4개 다 보임
//
// InnovationSim — [무엇이 보이나]
//   Step 1  겹친 카드들 → 앞 카드는 a·b 만, 마지막 카드만 a·b·c·d 다 보임
//   Step 2  그래서 합 = Σ(a+b) + max(c+d)  (c+d 는 한 장만!)
//   Step 3  샘플 5장 중 ②⑤④ → a+b = 13+18+4 = 35, 마지막 ④의 c+d = 17 → 52

import { t } from "@/components/quest/theme";
import { useTraceStep, SimNav, StepHeader } from "@/components/quest/TraceStepper";

const A = "#2563eb";
const AB = { bg: "#eff6ff", bd: "#2563eb", fg: "#1e3a8a" };   // a·b (보이는 기본)
const CD = { bg: "#fef3c7", bd: "#d97706", fg: "#92400e" };   // c·d (마지막 한 장만)
const HID = { bg: "#f1f5f9", bd: "#cbd5e1", fg: "#94a3b8" };  // 가려진 c·d

/* 학생 목소리 말풍선 (파랑=관찰/진행, 노랑=막힘, 하늘=발견) */
function Say({ children, tone = "go" }) {
  const c = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
          : { bg: "#f0f9ff", bd: "#7dd3fc", fg: "#075985" };
  return (
    <div style={{ maxWidth: 540, margin: "6px auto 16px", padding: "12px 16px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
      fontSize: 13.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

function Row({ children, gap = 8 }) {
  return <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap, flexWrap: "wrap" }}>{children}</div>;
}
function Caption({ color, children }) {
  return <div style={{ textAlign: "center", marginTop: 13, fontSize: 13.5, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace", wordBreak: "keep-all" }}>{children}</div>;
}

/* 숫자 칩 — a/b/c/d 한 칸. lbl = 글자 라벨, tone = 색 */
function NumChip({ n, lbl, tone = AB, size = 30 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{ width: size, height: size, borderRadius: 7, background: tone.bg, border: `2px solid ${tone.bd}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: size * 0.46, color: tone.fg }}>
        {n}
      </div>
      <div style={{ fontSize: 8.5, fontWeight: 800, color: tone.bd === HID.bd ? "#94a3b8" : "#64748b", fontFamily: "'JetBrains Mono',monospace" }}>{lbl}</div>
    </div>
  );
}

/* 카드 한 장 — 위에 a, 아래 줄에 b·c·d.
   mode="last" → c·d 도 다 보임(강조) · mode="front" → c·d 는 가려짐(회색) */
function Card({ a, b, c, d, mode = "front", tag }) {
  const last = mode === "last";
  const cdTone = last ? CD : HID;
  return (
    <div style={{ position: "relative", padding: "10px 10px 8px", borderRadius: 12,
      background: "#fff", border: `2.5px solid ${last ? "#d97706" : "#cbd5e1"}`,
      boxShadow: last ? "0 6px 16px rgba(217,119,6,.22)" : "0 2px 8px rgba(0,0,0,.06)",
      opacity: 1 }}>
      {tag != null && (
        <div style={{ position: "absolute", top: -10, left: -8, width: 20, height: 20, borderRadius: 999,
          background: last ? "#d97706" : "#64748b", color: "#fff", fontSize: 11, fontWeight: 800,
          display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px rgba(0,0,0,.2)" }}>{tag}</div>
      )}
      {/* 위: a */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
        <NumChip n={a} lbl="a" tone={AB} />
      </div>
      {/* 아래 줄: b · c · d */}
      <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
        <NumChip n={b} lbl="b" tone={AB} />
        <NumChip n={c} lbl="c" tone={cdTone} />
        <NumChip n={d} lbl="d" tone={cdTone} />
      </div>
      {!last && (
        <div style={{ marginTop: 6, textAlign: "center", fontSize: 9.5, fontWeight: 800, color: "#94a3b8", wordBreak: "keep-all" }}>
          {t(true, "c·d hidden", "c·d 가림")}
        </div>
      )}
      {last && (
        <div style={{ marginTop: 6, textAlign: "center", fontSize: 9.5, fontWeight: 800, color: "#b45309", wordBreak: "keep-all" }}>
          {t(true, "all four!", "네 개 다!")}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   InnovationSim — 겹쳐 놓으면 뭐가 보이나 → 합 = Σ(a+b) + max(c+d)
   ═══════════════════════════════════════════════════════════════ */
export function InnovationSim({ E }) {
  // 샘플 5장 중 고른 3장: ②(4 9 1 2) ⑤(8 10 2 3) ④(2 2 9 8) — ④가 c+d 최대(17)라 마지막.
  const chosen = [
    { tag: 2, a: 4, b: 9, c: 1, d: 2 },   // a+b=13, c+d=3
    { tag: 5, a: 8, b: 10, c: 2, d: 3 },  // a+b=18, c+d=5
    { tag: 4, a: 2, b: 2, c: 9, d: 8 },   // a+b=4,  c+d=17  ← 마지막
  ];

  const steps = [{ kind: "overlap" }, { kind: "formula" }, { kind: "compute" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const say =
    s.kind === "overlap" ? t(E, <>Lay the chosen cards left → right, overlapping. Each card now shows only <b>a</b> (top) and <b>b</b> (bottom-left) — <b>c·d get covered</b> by the next card. <b>Only the last card</b> shows all four.</>,
                              <>고른 카드를 왼쪽 → 오른쪽으로 겹쳐 놓아요. 그러면 각 카드는 <b>a</b>(위)와 <b>b</b>(왼쪽 아래)만 보여요 — <b>c·d 는 다음 카드에 가려져요</b>. <b>맨 마지막 카드만</b> 네 개 다 보여요.</>)
    : s.kind === "formula" ? t(E, <>So the visible sum = <b>every card's a+b</b>, <b>plus c+d of just ONE card</b> (the last one). To make it biggest, put the card with the <b>largest c+d</b> last.</>,
                                <>그래서 보이는 합 = <b>모든 카드의 a+b</b>, 거기에 <b>딱 한 장의 c+d</b>(마지막 카드)만 더해요. 제일 크게 하려면 <b>c+d 가 가장 큰</b> 카드를 마지막에 두면 돼요.</>)
    : t(E, <>Sample: pick ②⑤④. a+b = <b>13+18+4 = 35</b>. Last card ④ has the biggest c+d = <b>17</b>. Total = <b>35 + 17 = 52</b> ✓</>,
           <>샘플: ②⑤④ 를 골라요. a+b = <b>13+18+4 = 35</b>. 마지막 카드 ④의 c+d 가 가장 커요 = <b>17</b>. 합 = <b>35 + 17 = 52</b> ✓</>);

  return (
    <div style={{ padding: 16 }}>
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "What do you actually see?", "실제로 뭐가 보이나?")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "overlap" ? "go" : "aha"}>{say}</Say>

      {/* 카드 3장 — 마지막(④)만 c·d 보임 */}
      <Row gap={10}>
        {chosen.map((cd, i) => (
          <Card key={cd.tag} {...cd} tag={cd.tag} mode={i === chosen.length - 1 ? "last" : "front"} />
        ))}
      </Row>

      {s.kind === "overlap" && (
        <Caption color="#64748b">{t(E, "front cards → a + b only · last card → a + b + c + d", "앞 카드 → a + b 만 · 마지막 카드 → a + b + c + d")}</Caption>
      )}

      {s.kind === "formula" && (
        <div style={{ marginTop: 14, maxWidth: 460, margin: "14px auto 0",
          background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 12, padding: "12px 16px",
          textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 15, color: "#1e3a8a", wordBreak: "keep-all", lineHeight: 1.8 }}>
          {t(E, "answer = Σ(a+b) + max(c+d)", "답 = Σ(a+b) + max(c+d)")}
          <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", marginTop: 6, fontFamily: "system-ui, sans-serif" }}>
            {t(E, "sum of a+b over all chosen · plus one biggest c+d", "고른 카드 a+b 전부 합 · 거기에 가장 큰 c+d 하나")}
          </div>
        </div>
      )}

      {s.kind === "compute" && (
        <div style={{ marginTop: 14, maxWidth: 480, margin: "14px auto 0",
          display: "grid", gap: 8 }}>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 10, padding: "9px 13px",
            fontSize: 13, fontWeight: 700, color: "#1e3a8a", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
            Σ(a+b) = 13 + 18 + 4 = <b style={{ color: A }}>35</b>
          </div>
          <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: "9px 13px",
            fontSize: 13, fontWeight: 700, color: "#92400e", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
            max(c+d) = {t(E, "card ④ ", "④ 카드 ")}9 + 8 = <b style={{ color: "#b45309" }}>17</b>
          </div>
          <div style={{ background: "#dcfce7", border: "1.5px solid #16a34a", borderRadius: 10, padding: "10px 13px",
            fontSize: 16, fontWeight: 800, color: "#166534", textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
            35 + 17 = 52 ✓
          </div>
        </div>
      )}

      <SimNav idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels />
    </div>
  );
}
