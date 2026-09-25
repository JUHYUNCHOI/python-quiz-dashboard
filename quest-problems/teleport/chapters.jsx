import { useState } from "react";
import { C, t } from "@/components/quest/theme";

/* ──────────────────────────────────────────────────────────────
   Bilingual route sim — pick teleporter endpoints, watch the
   walking distance update vs the direct route. Number line is
   0..20; a=2 (start), b=18 (target) fixed. Student moves x, y.
   ────────────────────────────────────────────────────────────── */
function TeleportRouteSim({ E }) {
  const A_POS = 2, B_POS = 18, MIN = 0, MAX = 20;
  const [x, setX] = useState(6);
  const [y, setY] = useState(14);

  const direct = Math.abs(A_POS - B_POS);
  const via1 = Math.abs(A_POS - x) + Math.abs(y - B_POS); // a→x, tele, y→b
  const via2 = Math.abs(A_POS - y) + Math.abs(x - B_POS); // a→y, tele, x→b
  const best = Math.min(direct, via1, via2);
  const winner =
    best === direct ? (E ? "Direct" : "직접")
    : best === via1 ? (E ? "a → x, tele, y → b" : "a → x, 텔레포트, y → b")
    : (E ? "a → y, tele, x → b" : "a → y, 텔레포트, x → b");

  const pct = (v) => ((v - MIN) / (MAX - MIN)) * 100;

  const Marker = ({ pos, label, color, top }) => (
    <div style={{
      position: "absolute",
      left: `${pct(pos)}%`,
      top,
      transform: "translateX(-50%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      pointerEvents: "none",
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color, marginBottom: 2 }}>{label}</div>
      <div style={{ width: 2, height: 14, background: color }} />
      <div style={{
        width: 14, height: 14, borderRadius: "50%",
        background: color, border: "2px solid #fff",
        boxShadow: "0 1px 4px rgba(0,0,0,.2)",
      }} />
      <div style={{ fontSize: 10, color: "#475569", marginTop: 2 }}>{pos}</div>
    </div>
  );

  const RowStat = ({ label, value, isBest, color }) => (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "6px 10px",
      background: isBest ? `${color}18` : "#fff",
      border: `1.5px solid ${isBest ? color : "#e5e7eb"}`,
      borderRadius: 8, marginBottom: 4,
      fontSize: 12,
    }}>
      <span style={{ color: isBest ? color : "#475569", fontWeight: isBest ? 700 : 500 }}>
        {label}
      </span>
      <span style={{
        fontFamily: "JetBrains Mono, monospace",
        fontWeight: 800,
        color: isBest ? color : "#1f2937",
      }}>
        {value}
      </span>
    </div>
  );

  return (
    <div style={{
      background: "#fff", border: "1.5px solid #fcd34d",
      borderRadius: 12, padding: 14, marginTop: 10,
    }}>
      <div style={{
        fontSize: 13, fontWeight: 700, color: "#92400e",
        marginBottom: 4, textAlign: "center",
      }}>
        🎮 {t(E, "Route Sim — pick the teleporter (x, y)", "경로 시뮬 — 텔레포터 (x, y) 골라보기")}
      </div>
      <div style={{
        fontSize: 11, color: "#92400e", textAlign: "center",
        marginBottom: 10, lineHeight: 1.4,
      }}>
        {t(E,
          "a = 2 (start), b = 18 (goal). Move the sliders — the best route updates live.",
          "a = 2 (출발), b = 18 (목표) 이에요. 슬라이더를 움직이면 제일 좋은 길이 바로 다시 그려져요.")}
      </div>

      {/* number line */}
      <div style={{
        position: "relative", height: 96,
        margin: "8px 6px 12px",
      }}>
        <div style={{
          position: "absolute", top: 50, left: 0, right: 0,
          height: 3, background: "#cbd5e1", borderRadius: 2,
        }} />
        {/* tick labels */}
        {[0, 5, 10, 15, 20].map(n => (
          <div key={n} style={{
            position: "absolute", top: 56,
            left: `${pct(n)}%`, transform: "translateX(-50%)",
            fontSize: 9, color: "#94a3b8",
          }}>
            {n}
          </div>
        ))}
        {/* a (green), b (green) */}
        <Marker pos={A_POS} label="a" color="#15803d" top={6} />
        <Marker pos={B_POS} label="b" color="#15803d" top={6} />
        {/* x, y (purple — teleporter endpoints) */}
        <Marker pos={x} label="x" color="#7c3aed" top={68} />
        <Marker pos={y} label="y" color="#7c3aed" top={68} />
      </div>

      {/* sliders */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
        <label style={{ fontSize: 11, color: "#475569", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 700, color: "#7c3aed", minWidth: 56 }}>x = {x}</span>
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={x}
            onChange={e => setX(Number(e.target.value))}
            style={{ flex: 1, accentColor: "#7c3aed" }}
          />
        </label>
        <label style={{ fontSize: 11, color: "#475569", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 700, color: "#7c3aed", minWidth: 56 }}>y = {y}</span>
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={y}
            onChange={e => setY(Number(e.target.value))}
            style={{ flex: 1, accentColor: "#7c3aed" }}
          />
        </label>
      </div>

      {/* stats */}
      <RowStat
        label={t(E, "Direct  |a − b|", "직접  |a − b|")}
        value={direct}
        isBest={best === direct}
        color="#15803d"
      />
      <RowStat
        label={t(E, "a → x, tele, y → b", "a → x, 텔레포트, y → b")}
        value={`${Math.abs(A_POS - x)} + ${Math.abs(y - B_POS)} = ${via1}`}
        isBest={best === via1}
        color="#7c3aed"
      />
      <RowStat
        label={t(E, "a → y, tele, x → b", "a → y, 텔레포트, x → b")}
        value={`${Math.abs(A_POS - y)} + ${Math.abs(x - B_POS)} = ${via2}`}
        isBest={best === via2}
        color="#7c3aed"
      />

      <div style={{
        marginTop: 8, padding: "8px 10px",
        background: "#fffbeb", border: "1.5px solid #d97706",
        borderRadius: 8, textAlign: "center",
        fontSize: 12, color: "#92400e",
      }}>
        🏆 {t(E, "Min walking", "최소 걷기")} = <b>{best}</b> &nbsp;·&nbsp; {winner}
      </div>

      <div style={{
        marginTop: 8, fontSize: 11, color: "#64748b",
        lineHeight: 1.5, padding: "0 4px",
      }}>
        💡 {t(E,
          "Two teleporter routes exist because you can enter at x and exit at y, OR enter at y and exit at x. min(direct, via1, via2) is the answer.",
          "텔레포터로 가는 길이 두 가지인 까닭은, x 로 들어가 y 로 나오거나 y 로 들어가 x 로 나올 수 있기 때문이에요. 직접·길1·길2 중 가장 작은 값이 답이에요.")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTeleportCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ wants to go from a to b; a two-way teleporter links x and y for free. Print the minimum total walking distance.",
        "x 와 y 를 잇는 텔레포터를 쓸 수 있어요.\na 에서 b 까지 가장 적게 걷는 거리를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf00"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Teleportation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2018 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum total walking distance from a to b.",
                "a 에서 b 까지 걷는 거리의 최솟값을 출력해요.")}
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
                  {t(E, "FJ travels from position ", "FJ 가 수직선의 위치 ")}
                  <b style={{ color: "#d97706" }}>a</b>
                  {t(E, " to position ", " 에서 ")}
                  <b style={{ color: "#d97706" }}>b</b>
                  {t(E, " on a number line.", " 로 가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There's a ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "two-way teleporter linking x and y", "x 와 y 를 잇는 양방향 텔레포터")}</b>
                  {t(E, " — using it costs ZERO walking distance.",
                        " 가 있어요. 이걸 쓰면 걷는 거리가 0 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum total walking distance from a to b", "a 에서 b 까지 걷는 거리의 최솟값")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  One line: a, b, x, y.  Print one number.",
        "입력은 한 줄에 a, b, x, y 네 수로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>a b x y</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— start, end, teleporter endpoints", "— 출발, 도착, 텔레포터 양 끝")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The minimum total walking distance from a to b (one line).",
                  "a 에서 b 까지 걷는 거리의 최솟값을 한 줄로 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>0 ≤ a, b, x, y ≤ 100</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "the four values are not necessarily distinct", "네 값은 서로 달라야 하는 건 아니에요")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "a=0, b=10, teleporter 3<->8.\nDirect distance is 10.\nVia teleporter: 0->3 teleport->8->10 = 3+2=5.\nWhich is shorter?", "곧장 걸으면 10, 텔레포터를 거치면 3+2=5 예요.\n어느 쪽이 더 짧을까요?"),
      question: t(E,
        "a=0, b=10, teleporter 3<->8. Min distance?",
        "a=0, b=10, 텔레포터는 3<->8 이에요. 걷는 거리의 최솟값은 얼마일까요?"),
      options: [
        t(E, "10 (direct)", "10 (직접)"),
        t(E, "5 (via teleporter)", "5 (텔레포터 경유)"),
        t(E, "7", "7"),
      ],
      correct: 1,
      explain: t(E,
        "Via teleporter: |0-3| + |8-10| = 3 + 2 = 5, which is less than direct 10!",
        "텔레포터를 거치면 |0-3| + |8-10| = 3 + 2 = 5 예요.\n곧장 걷는 10 보다 작아요!"),
    },
    // 1-3: Bilingual route sim
    {
      type: "reveal",
      narr: t(E,
        "Try sliding x and y. When x and y sit far from a and b, walking to the teleporter costs more than the shortcut saves — so going straight wins.",
        "x 와 y 를 움직여 봐요.\nx·y 가 a·b 에서 멀면 입구까지 걷는 값이 더 커서\n곧장 걷는 쪽이 이겨요."),
      content: <TeleportRouteSim E={E} />,
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "a=0, b=10, teleporter 3<->8. What's the minimum distance?", "a=0, b=10 이고 텔레포터는 3<->8 이에요.\n걷는 거리의 최솟값은 얼마일까요?"),
      question: t(E,
        "a=0, b=10, teleporter 3<->8. Minimum distance?",
        "a=0, b=10, 텔레포터는 3<->8 이에요. 최소 거리는 얼마일까요?"),
      hint: t(E,
        "Compare three options: direct, teleport x→y, teleport y→x.",
        "세 가지 길을 견줘 봐요. 곧장 걷기, x→y 텔레포트, y→x 텔레포트예요."),
      answer: 5,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTeleportCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "teleport-codewalk",
      narr: t(E,
        "The fast solution, start to finish — toggle Python ↔ C++ via the header.",
        "빠른 풀이를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
  ];
}
