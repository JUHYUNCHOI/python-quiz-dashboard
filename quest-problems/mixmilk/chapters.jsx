import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMixMilkSections } from "./components";

/* Python syntax highlighter (shared across snippets) */
const PY_KW = new Set(["from","import","for","in","if","else","elif","def","return","and","or","not","while","break","continue","pass","class","with","as","try","except","finally","raise","yield","lambda","is","None","True","False","global","nonlocal"]);
const PY_BUILTIN = new Set(["print","input","range","len","sum","map","int","str","chr","ord","min","max","sorted","reversed","list","dict","set","tuple","enumerate","zip","abs","round","type","isinstance","open","filter","any","all","bool","float"]);

function pyHighlight(line, baseColor) {
  const tokens = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "'" || line[i] === '"') {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== q) { if (line[j] === "\\") j++; j++; }
      tokens.push({ text: line.slice(i, j + 1), color: "#a5d6a7" });
      i = j + 1;
    } else if (line[i] === "#") {
      tokens.push({ text: line.slice(i), color: "#6b7280" });
      i = line.length;
    } else if (/[0-9]/.test(line[i]) && (i === 0 || /[\s(,=+\-*/<>[\]:]/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#f9a825" });
      i = j;
    } else if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z_0-9]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (PY_KW.has(word)) tokens.push({ text: word, color: "#c792ea" });
      else if (PY_BUILTIN.has(word)) tokens.push({ text: word, color: "#82aaff" });
      else tokens.push({ text: word, color: baseColor });
      i = j;
    } else if ("=<>!+-*/%&|^~".includes(line[i])) {
      let j = i;
      while (j < line.length && "=<>!+-*/%&|^~".includes(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: "#89ddff" });
      i = j;
    } else {
      tokens.push({ text: line[i], color: baseColor });
      i++;
    }
  }
  return tokens;
}

/* Helper: code snippet box (token-highlighted Python) */
const CodeSnippet = ({ lines, highlight: hl }) => (
  <div style={{
    background: "#1e293b", borderRadius: 10, padding: "10px 8px",
    overflowX: "auto", fontSize: 12, lineHeight: 1.8,
    fontFamily: "'JetBrains Mono', monospace", marginTop: 8,
  }}>
    {lines.map((l, i) => {
      const isHl = hl && hl.includes(i);
      const baseColor = isHl ? "#fbbf24" : "#e2e8f0";
      const tokens = pyHighlight(l, baseColor);
      return (
        <div key={i} style={{
          display: "flex", minHeight: 20,
          background: isHl ? "rgba(217,119,6,.15)" : "transparent",
          borderRadius: 4, padding: "0 4px",
        }}>
          <span style={{ color: "#4b5563", width: 24, textAlign: "right", marginRight: 10, flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
          <span style={{ whiteSpace: "pre", wordBreak: "break-all" }}>
            {tokens.map((tk, j) => (
              <span key={j} style={{ color: tk.color }}>{tk.text}</span>
            ))}
          </span>
        </div>
      );
    })}
  </div>
);

/* Helper: bucket visual */
const BucketViz = ({ buckets, labels, highlight, E: isE }) => (
  <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: "8px 0" }}>
    {buckets.map((b, i) => {
      const pct = b.cap > 0 ? (b.milk / b.cap) * 100 : 0;
      const colors = ["#3b82f6", "#10b981", "#f59e0b"];
      const bgs = ["#dbeafe", "#d1fae5", "#fef3c7"];
      const isHl = highlight === i;
      return (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: isHl ? colors[i] : C.dim,
            fontFamily: "'JetBrains Mono',monospace", marginBottom: 4,
          }}>{labels ? labels[i] : (isE ? `Bucket ${i + 1}` : `양동이 ${i + 1}`)}</div>
          <div style={{
            width: 56, height: 72, borderRadius: "0 0 10px 10px",
            border: `3px solid ${isHl ? colors[i] : "#d1d5db"}`,
            borderTop: "none", position: "relative", overflow: "hidden",
            background: "#f9fafb",
            boxShadow: isHl ? `0 0 8px ${colors[i]}40` : "none",
          }}>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: `${pct}%`, background: bgs[i],
              borderTop: pct > 0 && pct < 100 ? `2px dashed ${colors[i]}` : "none",
              transition: "height .4s ease",
            }} />
            <div style={{
              position: "absolute", bottom: 4, left: 0, right: 0,
              fontSize: 14, fontWeight: 700, color: colors[i],
              fontFamily: "'JetBrains Mono',monospace",
            }}>{b.milk}</div>
          </div>
          <div style={{
            fontSize: 10, color: C.dim, marginTop: 4,
            fontFamily: "'JetBrains Mono',monospace",
          }}>{isE ? `cap: ${b.cap}` : `용량: ${b.cap}`}</div>
        </div>
      );
    })}
  </div>
);


/* Helper: interactive pour simulator (3 buckets, cyclic 1→2→3→1, up to 100 steps) */
const PourSim = ({ E: isE }) => {
  const CAP = [10, 8, 6];
  const INIT = [3, 5, 2];
  const [step, setStep] = useState(0);
  const [milk, setMilk] = useState(INIT);
  const [last, setLast] = useState(null); // {src, dst, amount}

  const doStep = () => {
    if (step >= 100) return;
    const src = step % 3;
    const dst = (step + 1) % 3;
    const amount = Math.min(milk[src], CAP[dst] - milk[dst]);
    const nm = milk.slice();
    nm[src] -= amount;
    nm[dst] += amount;
    setMilk(nm);
    setLast({ src, dst, amount });
    setStep(step + 1);
  };
  const runToEnd = () => {
    let s = step, m = milk.slice(), lastOp = last;
    while (s < 100) {
      const src = s % 3;
      const dst = (s + 1) % 3;
      const amount = Math.min(m[src], CAP[dst] - m[dst]);
      m[src] -= amount;
      m[dst] += amount;
      lastOp = { src, dst, amount };
      s++;
    }
    setMilk(m); setStep(s); setLast(lastOp);
  };
  const reset = () => { setStep(0); setMilk(INIT); setLast(null); };

  const colors = ["#3b82f6", "#10b981", "#f59e0b"];
  const bgs = ["#dbeafe", "#d1fae5", "#fef3c7"];
  const nextSrc = step < 100 ? step % 3 : -1;
  const nextDst = step < 100 ? (step + 1) % 3 : -1;
  const done = step >= 100;

  return (
    <div style={{ marginTop: 10, background: "#fffbeb", borderRadius: 10, padding: 12, border: "1.5px solid #fbbf24" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 8, textAlign: "center" }}>
        {isE ? "🧪 Try it: pour up to 100 steps" : "🧪 직접 해보기 — 100단계까지 부어보기"}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 14, padding: "4px 0" }}>
        {milk.map((m, i) => {
          const pct = (m / CAP[i]) * 100;
          const isSrc = !done && i === nextSrc;
          const isDst = !done && i === nextDst;
          const ring = isSrc ? colors[i] : isDst ? colors[i] : "#d1d5db";
          return (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 10, fontWeight: 700,
                color: isSrc || isDst ? colors[i] : C.dim,
                fontFamily: "'JetBrains Mono',monospace", marginBottom: 3,
              }}>
                {isE ? `B${i + 1}` : `${i + 1}번`}
                {isSrc ? (isE ? " (src)" : " (출발지)") : isDst ? (isE ? " (dst)" : " (목적지)") : ""}
              </div>
              <div style={{
                width: 50, height: 64, borderRadius: "0 0 8px 8px",
                border: `3px solid ${ring}`, borderTop: "none",
                position: "relative", overflow: "hidden", background: "#f9fafb",
                boxShadow: (isSrc || isDst) ? `0 0 6px ${colors[i]}50` : "none",
              }}>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: `${pct}%`, background: bgs[i],
                  transition: "height .35s ease",
                }} />
                <div style={{
                  position: "absolute", bottom: 3, left: 0, right: 0,
                  fontSize: 12, fontWeight: 700, color: colors[i],
                  fontFamily: "'JetBrains Mono',monospace",
                }}>{m}</div>
              </div>
              <div style={{ fontSize: 9, color: C.dim, marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>
                {isE ? `cap ${CAP[i]}` : `용량 ${CAP[i]}`}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 8, textAlign: "center", fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#92400e", minHeight: 18 }}>
        {done
          ? (isE ? `step = 100 (done) — final: [${milk.join(", ")}]` : `step = 100 (완료) — 최종: [${milk.join(", ")}]`)
          : last
            ? (isE
                ? `step ${step}: poured ${last.amount} from B${last.src + 1}→B${last.dst + 1}`
                : `${step}단계: ${last.src + 1}번→${last.dst + 1}번 ${last.amount} 이동`)
            : (isE ? `step = 0 (start) — next: B${nextSrc + 1}→B${nextDst + 1}` : `0단계 (시작) — 다음: ${nextSrc + 1}번→${nextDst + 1}번`)}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
        <button onClick={doStep} disabled={done} style={{
          background: done ? "#e5e7eb" : "#d97706", color: done ? "#9ca3af" : "#fff",
          border: "none", borderRadius: 6, padding: "5px 12px",
          fontSize: 11, fontWeight: 700, cursor: done ? "default" : "pointer",
        }}>{isE ? "▶ Step" : "▶ 한 단계"}</button>
        <button onClick={runToEnd} disabled={done} style={{
          background: done ? "#e5e7eb" : "#92400e", color: done ? "#9ca3af" : "#fff",
          border: "none", borderRadius: 6, padding: "5px 12px",
          fontSize: 11, fontWeight: 700, cursor: done ? "default" : "pointer",
        }}>{isE ? "⏭ Run to 100" : "⏭ 100까지"}</button>
        <button onClick={reset} style={{
          background: "#fff", color: "#92400e", border: "1.5px solid #fbbf24",
          borderRadius: 6, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer",
        }}>{isE ? "↻ Reset" : "↻ 처음"}</button>
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 문제 이해 (7 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMixMilkCh1(E) {
  return [
    // 1-1: Title
    {
      type: "reveal",
      narr: t(E,
        "Pour milk between three buckets 100 times. How much is left in each?",
        "양동이 세 개로 우유를 100 번 부어요.\n마지막에 각 양동이에 얼마가 남을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🥛"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Mixing Milk</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2018 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the milk in each of the 3 buckets after 100 cyclic pours (1→2, 2→3, 3→1, …).",
                "100 번의 순환 붓기 (1→2, 2→3, 3→1, …) 를 끝낸 뒤, 각 양동이의 우유량을 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#d97706" }}>{t(E, "3 buckets numbered 1, 2, 3", "1, 2, 3 번 양동이")}</b>
                  {t(E, " with given capacities and starting milk amounts.",
                        " 가 있고, 각자 정해진 용량과 시작 우유량이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "100 pours happen in a ", "100 번의 붓기를 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "fixed cycle: 1→2, 2→3, 3→1, 1→2, ...", "정해진 순환 순서 (1→2, 2→3, 3→1, 1→2, ...)")}</b>
                  {t(E, ".", " 로 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each pour moves ", "한 번의 붓기는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "as much milk as possible", "가능한 만큼")}</b>
                  {t(E, " — bounded by source amount and destination's remaining capacity.",
                        " 옮겨요. 출발지에 남은 양과 목적지의 빈 공간 중 더 작은 만큼만 옮길 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "100 번 붓기 후 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "milk in each of the 3 buckets after 100 pours", "각 양동이의 우유량")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Bucket concept visual
    {
      type: "reveal",
      narr: t(E,
        "Each bucket has a capacity and a current amount. Current milk can never exceed capacity.", "양동이마다 두 가지 값이 있어요.\n담을 수 있는 최대량인 용량과, 지금 들어 있는 현재 우유량이에요.\n현재 우유는 절대로 용량을 넘을 수 없어요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
            {t(E, "Understanding Buckets", "양동이 이해하기")}
          </div>
          <BucketViz
            buckets={[{ cap: 10, milk: 3 }, { cap: 8, milk: 5 }, { cap: 6, milk: 2 }]}
            E={E}
          />
          <div style={{ marginTop: 10, background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: 10, fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div><span style={{ fontWeight: 600, color: "#d97706" }}>{t(E, "Capacity", "용량")}</span> = {t(E, "max the bucket can hold", "양동이가 담을 수 있는 최대량")}</div>
            <div><span style={{ fontWeight: 600, color: "#3b82f6" }}>{t(E, "Milk", "우유")}</span> = {t(E, "current amount inside", "현재 들어있는 양")}</div>
            <div style={{ marginTop: 4, fontWeight: 700, color: "#b45309" }}>
              {t(E, "Remaining space = capacity - milk", "남은 공간 = 용량 - 우유")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz on remaining capacity
    {
      type: "quiz",
      narr: t(E,
        "Before we pour milk, we need to know: how much SPACE is left in the destination bucket?\nThis is capacity minus current milk.", "우유를 붓기 전에 목적지 양동이에 남은 공간부터 알아야 해요.\n용량에서 현재 우유를 빼면 나와요."),
      question: t(E,
        "Bucket B: capacity 8, milk 5. How much SPACE is left?",
        "양동이 B 는 용량 8, 우유 5 예요. 남은 공간은 얼마일까요?"),
      options: [
        t(E, "8", "8"),
        t(E, "5", "5"),
        t(E, "3", "3"),
      ],
      correct: 2,
      explain: t(E,
        "Remaining space = capacity - milk = 8 - 5 = 3. Only 3 more units can fit!",
        "남은 공간은 용량 - 우유 = 8 - 5 = 3 이에요. 3 만큼만 더 들어갈 수 있어요!"),
    },
    // 1-4: Pouring rules visual
    {
      type: "reveal",
      narr: t(E,
        "When pouring from bucket A to bucket B, how much actually transfers?\nIt's the MINIMUM of what A has and what B can receive!", "A 에서 B 로 부을 때 실제로 얼마나 옮겨질까요?\nA 가 가진 양과 B 가 받을 수 있는 양 중 더 작은 값이에요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 8 }}>
            {t(E, "The Pouring Rule", "붓기 규칙")}
          </div>
          <div style={{ background: "#fef3c7", borderRadius: 10, padding: 12, border: "1px solid #fbbf24" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 600, color: "#92400e", textAlign: "center", lineHeight: 2 }}>
              amount = min(source_milk, dest_remaining)<br />
              source_milk -= amount<br />
              dest_milk += amount
            </div>
          </div>
          {/* Example */}
          <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.8, color: C.text }}>
            <div style={{ fontWeight: 600, color: "#d97706", marginBottom: 4 }}>
              {t(E, "Example: Pour A -> B", "예시: A 에서 B 로 붓기")}
            </div>
            <div>{t(E, "A: milk=7, B: cap=5, milk=2", "A: 우유=7, B: 용량=5, 우유=2")}</div>
            <div>{t(E, "B remaining = 5 - 2 = 3", "B 남은 공간 = 5 - 2 = 3")}</div>
            <div style={{ fontWeight: 600, color: "#b45309" }}>
              {t(E, "amount = min(7, 3) = 3", "이동량 = min(7, 3) = 3")}
            </div>
            <div>{t(E, "After: A=4, B=5 (full!)", "이후: A=4, B=5 (가득!)")}</div>
          </div>
        </div>),
    },
    // 1-5: Pour quiz (key problem understanding)
    {
      type: "quiz",
      narr: t(E,
        "Let's test!\nBucket A has 5ml, Bucket B has capacity 3 with 1ml already.\nPour A into B.\nHow much transfers?", "직접 해봐요! A 에는 5ml 가 있고, B 는 용량 3 에 1ml 가 들어 있어요.\nA 에서 B 로 부으면 얼마나 옮겨질까요?"),
      question: t(E,
        "A: milk=5. B: cap=3, milk=1. Pour A->B. How much transfers?",
        "A 는 우유=5, B 는 용량=3, 우유=1 이에요. A 에서 B 로 부으면 이동량은 얼마일까요?"),
      options: [
        t(E, "5 (all of A)", "5 (A의 전부)"),
        t(E, "3 (B's capacity)", "3 (B의 용량)"),
        t(E, "2 (B's remaining space)", "2 (B의 남은 공간)"),
      ],
      correct: 2,
      explain: t(E,
        "B remaining = 3 - 1 = 2. min(5, 2) = 2. Only 2 transfers! A goes to 3, B fills to 3.",
        "B 의 남은 공간은 3 - 1 = 2 예요. min(5, 2) = 2 라서 2 만 옮겨져요. A 는 3 이 되고, B 는 3 으로 가득 차요."),
    },
    // 1-6: Cycle pattern visual
    {
      type: "reveal",
      narr: t(E,
        "The 100 pours follow a repeating cycle: 1->2, 2->3, 3->1, 1->2, 2->3, 3->1, ...\nThis cycle of 3 repeats.\nStep number mod 3 tells us which pour!", "100번의 붓기는 같은 순서를 되풀이해요.\n1->2, 2->3, 3->1, 1->2, 2->3, 3->1, ... 이렇게 세 개씩 돌아가요.\nstep % 3 으로 어떤 붓기인지 알 수 있어요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 8 }}>
            {t(E, "Pour Cycle Pattern", "붓기가 도는 순서")}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            {[
              { s: 0, label: "1→2", col: "#3b82f6" },
              { s: 1, label: "2→3", col: "#10b981" },
              { s: 2, label: "3→1", col: "#f59e0b" },
              { s: 3, label: "1→2", col: "#3b82f6" },
              { s: 4, label: "2→3", col: "#10b981" },
              { s: 5, label: "3→1", col: "#f59e0b" },
            ].map(({ s, label, col }) => (
              <div key={s} style={{
                background: `${col}15`, border: `1px solid ${col}`, borderRadius: 8,
                padding: "6px 10px", textAlign: "center", minWidth: 52,
              }}>
                <div style={{ fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
                  step {s}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: col, fontFamily: "'JetBrains Mono',monospace" }}>
                  {label}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", fontSize: 18, color: C.dim }}>...</div>
          </div>
          <div style={{ marginTop: 10, background: "#fffbeb", borderRadius: 10, padding: 10, border: "1px solid #fcd34d", textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 600, color: "#92400e" }}>
              src = step % 3<br />
              dst = (step + 1) % 3
            </div>
          </div>
        </div>),
    },
    // 1-7: Input practice
    {
      type: "input",
      narr: t(E,
        "Try this — figure out how much B can accept, then how much A loses.",
        "직접 해봐요. B 가 얼마나 더 받을 수 있는지 보고, A 에서 그만큼 빼요."),
      question: t(E,
        "A=5 milk, B=cap 3, milk 1. Pour A->B. Milk left in A?",
        "A 는 우유 5, B 는 용량 3 에 우유 1 이에요. A 에서 B 로 부으면 A 의 우유는 얼마가 될까요?"),
      hint: t(E,
        "B can still take (cap − current) more.  Transfer is the smaller of A's milk and B's free space.",
        "B 는 (용량 − 현재) 만큼 더 받을 수 있어요. 이동량은 A 의 우유와 B 의 빈 공간 중 더 작은 쪽이에요."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 시뮬레이션 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMixMilkCh2(E) {
  return [
    // 2-1: Trace step 0
    {
      type: "reveal",
      narr: t(E,
        "Let's trace the simulation with a concrete example!\nBuckets: cap=[10,8,6], milk=[3,5,2].\nStep 0: pour bucket 1 -> bucket 2.", "구체적인 예시로 한 단계씩 따라가 봐요!\n양동이는 용량=[10,8,6], 우유=[3,5,2] 예요.\n0단계에서는 1번에서 2번으로 부어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 8 }}>
            {t(E, "Step 0: Pour Bucket 1 → Bucket 2", "0단계: 양동이 1 → 양동이 2")}
          </div>
          <BucketViz
            buckets={[{ cap: 10, milk: 3 }, { cap: 8, milk: 5 }, { cap: 6, milk: 2 }]}
            labels={[t(E, "B1 (src)", "1번(출발지)"), t(E, "B2 (dst)", "2번(목적지)"), t(E, "B3", "3번")]}
            highlight={0}
            E={E}
          />
          {/* Trace table */}
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
              <thead>
                <tr style={{ background: "#fef3c7" }}>
                  <th style={{ padding: "6px 8px", textAlign: "left", borderBottom: "2px solid #fbbf24", color: "#92400e" }}>{t(E, "Calc", "계산")}</th>
                  <th style={{ padding: "6px 8px", textAlign: "center", borderBottom: "2px solid #fbbf24", color: "#92400e" }}>{t(E, "Value", "값")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [t(E, "B2 remaining", "B2 남은 공간"), "8 - 5 = 3"],
                  [t(E, "B1 milk", "B1 우유"), "3"],
                  ["min(3, 3)", "3"],
                  [t(E, "After: B1", "이후: B1"), "3 - 3 = 0"],
                  [t(E, "After: B2", "이후: B2"), "5 + 3 = 8"],
                ].map(([label, val], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fffbeb" : "#fff" }}>
                    <td style={{ padding: "5px 8px", borderBottom: "1px solid #fde68a", color: C.text }}>{label}</td>
                    <td style={{ padding: "5px 8px", borderBottom: "1px solid #fde68a", textAlign: "center", fontWeight: 600, color: "#d97706" }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>),
    },
    // 2-2: Trace step 1
    {
      type: "reveal",
      narr: t(E,
        "After step 0: milk=[0,8,2].\nStep 1: pour bucket 2 -> bucket 3.\nB3 remaining = 6-2 = 4.\nTransfer min(8, 4) = 4.", "0단계가 끝나면 우유=[0,8,2] 예요.\n1단계에서는 2번에서 3번으로 부어요.\nB3 의 남은 공간은 6-2 = 4 라서 이동량은 min(8, 4) = 4 예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 8 }}>
            {t(E, "Step 1: Pour Bucket 2 → Bucket 3", "1단계: 양동이 2 → 양동이 3")}
          </div>
          <BucketViz
            buckets={[{ cap: 10, milk: 0 }, { cap: 8, milk: 8 }, { cap: 6, milk: 2 }]}
            labels={[t(E, "B1", "1번"), t(E, "B2 (src)", "2번(출발지)"), t(E, "B3 (dst)", "3번(목적지)")]}
            highlight={1}
            E={E}
          />
          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
              <thead>
                <tr style={{ background: "#fef3c7" }}>
                  <th style={{ padding: "6px 8px", textAlign: "left", borderBottom: "2px solid #fbbf24", color: "#92400e" }}>{t(E, "Calc", "계산")}</th>
                  <th style={{ padding: "6px 8px", textAlign: "center", borderBottom: "2px solid #fbbf24", color: "#92400e" }}>{t(E, "Value", "값")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [t(E, "B3 remaining", "B3 남은 공간"), "6 - 2 = 4"],
                  [t(E, "B2 milk", "B2 우유"), "8"],
                  ["min(8, 4)", "4"],
                  [t(E, "After: B2", "이후: B2"), "8 - 4 = 4"],
                  [t(E, "After: B3", "이후: B3"), "2 + 4 = 6"],
                ].map(([label, val], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fffbeb" : "#fff" }}>
                    <td style={{ padding: "5px 8px", borderBottom: "1px solid #fde68a", color: C.text }}>{label}</td>
                    <td style={{ padding: "5px 8px", borderBottom: "1px solid #fde68a", textAlign: "center", fontWeight: 600, color: "#d97706" }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: "#d97706", textAlign: "center" }}>
            {t(E, "State after step 1: milk = [0, 4, 6]", "1단계가 끝난 뒤 우유 = [0, 4, 6]")}
          </div>
        </div>),
    },
    // 2-3: Trace step 2
    {
      type: "reveal",
      narr: t(E,
        "Step 2: pour bucket 3 -> bucket 1.\nB1 remaining = 10-0 = 10.\nTransfer min(6, 10) = 6.\nNow milk=[6, 4, 0].\nOne full cycle done!", "2단계에서는 3번에서 1번으로 부어요.\nB1 의 남은 공간은 10-0 = 10 이라 이동량은 min(6, 10) = 6 이에요.\n이제 우유=[6, 4, 0] 이고, 한 바퀴를 다 돌았어요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 8 }}>
            {t(E, "Step 2: Pour Bucket 3 → Bucket 1", "2단계: 양동이 3 → 양동이 1")}
          </div>
          <BucketViz
            buckets={[{ cap: 10, milk: 0 }, { cap: 8, milk: 4 }, { cap: 6, milk: 6 }]}
            labels={[t(E, "B1 (dst)", "1번(목적지)"), t(E, "B2", "2번"), t(E, "B3 (src)", "3번(출발지)")]}
            highlight={2}
            E={E}
          />
          {/* Summary state table */}
          <div style={{ marginTop: 10, background: "#d1fae5", borderRadius: 10, padding: 10, border: "1px solid #6ee7b7" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#059669", marginBottom: 6 }}>
              {t(E, "Full cycle summary:", "한 바퀴 전체 요약")}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
              <thead>
                <tr>
                  <th style={{ padding: "4px 6px", textAlign: "left", color: "#059669" }}>{t(E, "Step", "단계")}</th>
                  <th style={{ padding: "4px 6px", color: "#3b82f6" }}>B1</th>
                  <th style={{ padding: "4px 6px", color: "#10b981" }}>B2</th>
                  <th style={{ padding: "4px 6px", color: "#f59e0b" }}>B3</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [t(E, "Start", "시작"), 3, 5, 2],
                  ["0: 1→2", 0, 8, 2],
                  ["1: 2→3", 0, 4, 6],
                  ["2: 3→1", 6, 4, 0],
                ].map(([step, a, b, c], i) => (
                  <tr key={i} style={{ background: i === 3 ? "#d1fae520" : "transparent" }}>
                    <td style={{ padding: "4px 6px", fontWeight: i === 3 ? 800 : 400 }}>{step}</td>
                    <td style={{ padding: "4px 6px", textAlign: "center", fontWeight: 600 }}>{a}</td>
                    <td style={{ padding: "4px 6px", textAlign: "center", fontWeight: 600 }}>{b}</td>
                    <td style={{ padding: "4px 6px", textAlign: "center", fontWeight: 600 }}>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PourSim E={E} />
        </div>),
    },
    // 2-4: Quiz on trace
    {
      type: "quiz",
      narr: t(E,
        "Now you try!  At state [6, 4, 0], the next step pours 1 → 2.  Compute the transfer yourself.",
        "이제 해봐요! 상태가 [6, 4, 0] 일 때 다음은 1 → 2 붓기예요.\n이동량을 직접 계산해 봐요."),
      question: t(E,
        "State [6,4,0]. Step 3: pour 1→2. What is milk[1] after?",
        "상태가 [6,4,0] 이에요. 3단계에서 1→2 로 부으면 milk[1] 은 얼마가 될까요?"),
      options: [
        t(E, "4 (no change)", "4 (변화 없음)"),
        t(E, "8 (full)", "8 (가득)"),
        t(E, "10", "10"),
      ],
      correct: 1,
      explain: t(E,
        "B2 remaining = 8-4 = 4. min(6, 4) = 4 transfers. B2: 4+4 = 8 (full!). B1: 6-4 = 2.",
        "B2 의 남은 공간은 8-4 = 4 예요. min(6, 4) = 4 만큼 옮겨져서 B2 는 4+4 = 8 로 가득 차고, B1 은 6-4 = 2 가 돼요."),
    },
    // 2-5: Complexity + insight
    {
      type: "input",
      narr: t(E,
        "The total number of pour operations is fixed. How many times do we loop?", "붓는 횟수는 정해져 있어요. 몇 번 반복할까요?"),
      question: t(E,
        "How many pour operations total?",
        "붓기는 모두 몇 번 할까요?"),
      hint: t(E,
        "The problem says 100 steps!",
        "문제에서 100단계라고 했어요!"),
      answer: 100,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMixMilkCh3(E, lang = "py") {
  return [
    // 3-1: Step 1 — Read input
    {
      type: "reveal",
      narr: t(E,
        "The answer is milk left in each bucket after pouring.\nFirst read the values.", "답은 붓기가 다 끝난 뒤 세 양동이에 남은 우유량이에요.\n먼저 값을 읽어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 1: Read the 3 buckets", "1단계: 양동이 3개 읽기")}
          </div>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 4, lineHeight: 1.6 }}>
            {t(E,
              "Input: 3 lines, each \"capacity milk\"",
              "입력은 3줄이고, 한 줄에 \"용량 우유\" 가 들어 있어요.")}
          </div>
          <CodeSnippet
            lines={[
              "with open('mixmilk.in') as file:",
              "    lines = file.readlines()",
              "cap = [0] * 3",
              "milk = [0] * 3",
              "for i in range(3):",
              "    cap[i], milk[i] = map(int, lines[i].split())",
            ]}
            highlight={[0, 1, 4, 5]}
          />
          <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.5 }}>
            {t(E,
              "Two arrays: cap[] stores max capacity, milk[] stores current amount.",
              "배열을 2개 써요. cap[] 은 최대 용량을, milk[] 는 현재 양을 담아요.")}
          </div>
        </div>),
    },
    // 3-2: Step 2 — Loop structure
    {
      type: "reveal",
      narr: t(E,
        "The order 1→2, 2→3, 3→1 repeats 100 times.\nSo loop that fixed cycle.", "정해진 순서 1→2, 2→3, 3→1 이 100번 반복돼요.\n그래서 그 순서대로 돌아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 2: The simulation loop", "2단계: 붓기를 반복하는 부분")}
          </div>
          <CodeSnippet
            lines={[
              "with open('mixmilk.in') as file:",
              "    lines = file.readlines()",
              "cap = [0] * 3",
              "milk = [0] * 3",
              "for i in range(3):",
              "    cap[i], milk[i] = map(int, lines[i].split())",
              "",
              "for step in range(100):",
              "    src = step % 3",
              "    dst = (step + 1) % 3",
            ]}
            highlight={[7, 8, 9]}
          />
          <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "center" }}>
            {[
              { step: 0, src: 0, dst: 1 },
              { step: 1, src: 1, dst: 2 },
              { step: 2, src: 2, dst: 0 },
            ].map(({ step, src, dst }) => (
              <div key={step} style={{
                background: "#fffbeb", borderRadius: 6, padding: "4px 8px",
                border: "1.5px solid #fcd34d", fontSize: 11,
                fontFamily: "'JetBrains Mono',monospace", color: "#92400e",
              }}>
                s={step}: {src}→{dst}
              </div>
            ))}
          </div>
        </div>),
    },
    // 3-3: Step 3 — Pour logic
    {
      type: "reveal",
      narr: t(E,
        "Each pour moves as much as fits —\nlimited by the source's milk or the space left.", "한 번의 붓기는 이만큼만 옮겨요 —\n출발지 우유량과 받는 쪽 남은 자리 중 작은 값."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d97706", marginBottom: 6 }}>
            {t(E, "Step 3: The pour logic", "3단계: 붓는 양 계산하기")}
          </div>
          <CodeSnippet
            lines={[
              "for step in range(100):",
              "    src = step % 3",
              "    dst = (step + 1) % 3",
              "    # pour src -> dst",
              "    amount = min(milk[src], cap[dst] - milk[dst])",
              "    milk[src] -= amount",
              "    milk[dst] += amount",
            ]}
            highlight={[4, 5, 6]}
          />
          <div style={{ marginTop: 8, background: "#fef3c7", borderRadius: 8, padding: 8, border: "1.5px solid #fbbf24", fontSize: 12, lineHeight: 1.8, color: "#92400e" }}>
            <div><span style={{ fontWeight: 600 }}>cap[dst] - milk[dst]</span> = {t(E, "remaining space in destination", "목적지의 남은 공간")}</div>
            <div><span style={{ fontWeight: 600 }}>min(...)</span> = {t(E, "can't pour more than source has OR dest can fit", "출발지가 가진 양과 목적지의 남은 공간 중 더 작은 값")}</div>
          </div>
        </div>),
    },
    // 3-4: Quiz on code understanding
    {
      type: "quiz",
      narr: t(E,
        "Why do we use min() in the amount calculation?\nThink about what could go wrong without it!", "이동량을 계산할 때 왜 min() 을 쓸까요?\nmin() 이 없으면 무엇이 잘못될지 생각해 봐요!"),
      question: t(E,
        "Why min(milk[src], cap[dst] - milk[dst])?",
        "왜 min(milk[src], cap[dst] - milk[dst]) 일까요?"),
      options: [
        t(E, "To make the code shorter", "코드를 짧게 만들려고"),
        t(E, "Can't pour more than source has, can't overflow destination", "출발지보다 많이 부을 수 없고, 목적지를 넘칠 수 없으니까"),
        t(E, "It's always the same value anyway", "어차피 항상 같은 값이니까"),
      ],
      correct: 1,
      explain: t(E,
        "Two constraints: (1) can't pour more milk than source has, (2) can't exceed destination capacity. min() ensures both!",
        "지켜야 할 게 두 가지예요. (1) 출발지가 가진 것보다 많이 부을 수 없고, (2) 목적지 용량을 넘을 수 없어요. min() 이 둘 다 지켜 줘요!"),
    },
    // 3-5: Complete code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드를 부분별로 읽어봐요.\n위쪽에서 Python ↔ C++ 를 바꿀 수 있어요."),
      sections: (() => {
        const sections = getMixMilkSections(E);
        // 🔗 다리 문장 — components.jsx(🔒)의 FULL_PY/FULL_CPP 는 3-3 에서 배운
        // min() 대신 if/else 로, FULL_PY 는 3-1 에서 배운 map(int, ...) 대신
        // int(parts[0]) 로 하나씩 꺼내 같은 일을 한다. 왜 그런지는 모르니
        // 지어내지 않고, "하는 일은 같다" 는 사실만 한 줄씩 알려준다.
        // (billboard/chapters.jsx 의 max()/min() 다리 문장과 같은 처방 — 2026-09-23)
        sections[0].why = [
          ...sections[0].why,
          t(E,
            "Here the code uses if/else instead of min() — it does the same thing.",
            "여기서는 min() 대신 if/else 를 써요. 하는 일은 똑같아요."),
        ];
        sections[0].pyOnly = [
          ...sections[0].pyOnly,
          t(E,
            "Here the code reads each value with int(parts[0]) instead of map(int, ...) — same thing, one at a time.",
            "여기서는 map(int, ...) 대신 int(parts[0]) 로 하나씩 꺼내요. 하는 일은 똑같아요."),
        ];
        return sections;
      })(),
    },
  ];
}
