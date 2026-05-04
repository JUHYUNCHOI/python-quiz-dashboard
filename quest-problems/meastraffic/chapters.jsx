import { C, t } from "@/components/quest/theme";
import { getMeasTrafficSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "segments = []",
  "for _ in range(N):",
  "    parts = input().split()",
  "    typ = parts[0]        # 'none', 'on', 'off'",
  "    lo = int(parts[1])",
  "    hi = int(parts[2])",
  "    segments.append((typ, lo, hi))",
  "",
  "# Forward pass: propagate flow from start to end",
  "fwd_lo, fwd_hi = segments[0][1], segments[0][2]",
  "for i in range(1, N):",
  "    typ, lo, hi = segments[i]",
  "    if typ == 'none':",
  "        fwd_lo = max(fwd_lo, lo)",
  "        fwd_hi = min(fwd_hi, hi)",
  "    elif typ == 'on':",
  "        fwd_lo += lo",
  "        fwd_hi += hi",
  "    elif typ == 'off':",
  "        fwd_lo -= hi",
  "        fwd_hi -= lo",
  "    fwd_lo = max(fwd_lo, 0)",
  "",
  "# Backward pass: propagate flow from end to start",
  "bwd_lo, bwd_hi = segments[-1][1], segments[-1][2]",
  "for i in range(N-2, -1, -1):",
  "    typ, lo, hi = segments[i+1]",
  "    if typ == 'none':",
  "        pass  # sensor doesn't change flow",
  "    elif typ == 'on':",
  "        # reverse: on-ramp added, so subtract going back",
  "        bwd_lo -= hi",
  "        bwd_hi -= lo",
  "    elif typ == 'off':",
  "        # reverse: off-ramp removed, so add going back",
  "        bwd_lo += lo",
  "        bwd_hi += hi",
  "    bwd_lo = max(bwd_lo, 0)",
  "    cur_lo, cur_hi = segments[i][1], segments[i][2]",
  "    bwd_lo = max(bwd_lo, cur_lo)",
  "    bwd_hi = min(bwd_hi, cur_hi)",
  "",
  "print(bwd_lo, bwd_hi)",
  "print(fwd_lo, fwd_hi)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTrafficCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A highway has N segments with sensors giving flow ranges.\nBetween segments, on-ramps add cars and off-ramps remove cars.\nFind the possible flow range at the start and end of the highway.", "고속도로에 N개 구간이 있고 센서가 유량 범위를 알려줘요.\n구간 사이에 진입로(on-ramp)는 차를 추가하고 출구로(off-ramp)는 차를 빼.\n고속도로 시작과 끝의 가능한 유량 범위를 구해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\ude97"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Measuring Traffic</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2019 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Constraint propagation.\nForward pass computes end flow range. Backward pass computes start flow range. On-ramps add, off-ramps subtract (reversed going backward).",
              "핵심: 제약 전파.\n순방향 패스로 끝 유량 범위 계산.\n역방향 패스로 시작 유량 범위 계산.\n진입로는 더하고 출구로는 빼 (역방향은 반대).")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If highway flow is [10,20] and an on-ramp adds [5,10] cars, what's the flow after?", "고속도로 유량이 [10,20]이고 진입로가 [5,10]대를 추가하면 이후 유량은?"),
      question: t(E,
        "Flow [10,20] + on-ramp [5,10] = ?",
        "유량 [10,20] + 진입로 [5,10] = ?"),
      options: [
        t(E, "[15, 30]", "[15, 30]"),
        t(E, "[5, 10]", "[5, 10]"),
        t(E, "[10, 20]", "[10, 20]"),
        t(E, "[15, 20]", "[15, 20]"),
      ],
      correct: 0,
      explain: t(E,
        "On-ramp adds to both bounds: [10+5, 20+10] = [15, 30].",
        "진입로는 양쪽 경계에 더해: [10+5, 20+10] = [15, 30]."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If the initial flow range is [10, 20], what is the maximum flow?", "초기 유량 범위가 [10, 20]이면 최대 유량은?"),
      question: t(E,
        "Flow range [10, 20]. Maximum?",
        "유량 범위 [10, 20]. 최대값?"),
      hint: t(E,
        "The upper bound of [10, 20] is 20.",
        "[10, 20]의 상한은 20."),
      answer: 20,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTrafficCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Two linear passes over the segments. O(N) time!", "구간에 대해 두 번의 선형 패스. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Forward pass: start with first sensor range, apply on/off ramps, intersect with sensor ranges.\nBackward pass: same in reverse. Two O(N) passes.",
              "순방향: 첫 센서 범위에서 시작, on/off 적용, 센서 범위와 교차.\n역방향: 반대로.\nO(N) 패스 두 번.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMeasTrafficSections(E),
    },
  ];
}
