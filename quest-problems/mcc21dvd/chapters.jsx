import { C, t } from "@/components/quest/theme";
import { getMcc21DvdSections, FULL_PY } from "./components";

const KA = { wordBreak: "keep-all" };

// Full reference solution (used by the study-guide export / registry).
export const SOLUTION_CODE = FULL_PY;

export function makeMcc21DvdCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "A DVD logo starts at cell (1,1) of an H×W grid and moves one row up and one column right each second, reflecting off the walls.\nFor each query (H, W, T), print where it is after T seconds.",
        "DVD 로고가 (1,1) 칸에서 출발해 매 초 위로 한 칸, 오른쪽으로 한 칸 움직여요.\n벽에 닿으면 튕겨요. T 초 뒤에 로고는 어느 칸에 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"📀"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#d97706" }}>DVD Screensaver</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P2</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "For each query, tell where the bouncing DVD logo sits after T seconds.",
                "물음마다 튕기는 DVD 로고가 T 초 뒤에 어느 칸에 있는지 알려줘요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A screen is an ", "화면은 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "H×W grid", "H×W 격자")}</b>
                  {t(E, ". Cell ", "예요. 칸 ")}
                  <b style={{ color: "#d97706" }}>(r, c)</b>
                  {t(E, " is the r-th row from the bottom and the c-th column from the left (both start at 1).",
                        " 는 아래에서 r 번째 행, 왼쪽에서 c 번째 열이에요. 행도 열도 1 부터 세요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A 1×1 logo starts at ", "1×1 로고가 ")}
                  <b style={{ color: "#d97706" }}>(1, 1)</b>
                  {t(E, " and each second moves ", " 에서 출발해 매 초 ")}
                  <b>{t(E, "+1 row and +1 column", "+1 행, +1 열")}</b>
                  {t(E, ".", "씩 움직여요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Hitting one wall ", "한 쪽 벽에 닿으면 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "reflects", "반사돼요")}</b>
                  {t(E, " (angle preserved); hitting a corner reverses direction. Speed stays the same.",
                        " (들어온 각도 그대로 튕겨 나가요). 모서리에 닿으면 방향이 반대로 뒤집혀요. 빠르기는 그대로예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each of Q queries, print ", "Q 개의 물음마다 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "the position (r c) after T seconds", "T 초 뒤의 위치 (r c)")}</b>
                  {t(E, ".", " 를 출력해요.")}
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
        "Read the input format and the official example. The queries come as three arrays H, W, T of length Q — query i uses H[i], W[i], T[i].",
        "입력 형식과 공식 예제를 봐요. i 번째 물음은 H[i], W[i], T[i] 예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• <b>Q</b> — {t(E, "number of queries", "물음이 몇 개인지")}</div>
              <div>• <b>H</b>, <b>W</b>, <b>T</b> — {t(E, "three arrays of length Q; H[i]×W[i] grid, T[i] seconds", "길이가 Q 인 배열 세 개예요. i 번째 물음은 H[i]×W[i] 격자에서 T[i] 초 뒤를 물어요.")}</div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8 }}>
              {t(E, "Limits: 1 ≤ Q ≤ 1000, 2 ≤ H, W ≤ 10^12, 0 ≤ T ≤ 10^16.", "제약: 1 ≤ Q ≤ 1000, 2 ≤ H, W ≤ 10^12, 0 ≤ T ≤ 10^16.")}
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 6 }}>
              {t(E, "Output: for each query, 'r c' (one space) on its own line, in the original order.",
                    "출력은 물음마다 한 줄이에요. 두 수 사이에 공백 하나를 두고 'r c' 처럼 쓰고, 물음이 들어온 순서 그대로 내보내요.")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 170 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div style={{ color: "#94a3b8" }}>Q = 4</div>
              <div>H = [3, 2, 7, 36]</div>
              <div>W = [5, 2, 2, 28]</div>
              <div>T = [5, 5, 0, 127]</div>
            </div>
            <div style={{ background: "#0f172a", color: "#6ee7b7", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>2 4</div>
              <div style={{ fontWeight: 800 }}>2 2</div>
              <div style={{ fontWeight: 800 }}>1 1</div>
              <div style={{ fontWeight: 800 }}>14 20</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "Query 1 (H=3, W=5, T=5) → row 2, col 4. Query 3 has T=0, so the logo is still at its start (1 1).",
              "첫 번째 물음 (H=3, W=5, T=5) 의 답은 행 2, 열 4 예요. 세 번째 물음은 T=0 이라 로고가 아직 출발점 (1 1) 에 있어요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "sim",
      narr: t(E,
        "Feel the motion. Step T and watch the row and the column bounce on their own — the formula reads the position straight off T.",
        "T 를 하나씩 넘기면서 행과 열이 따로 튕기는 모습을 봐요."),
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "On a grid 3 rows tall, the row starts at 1 (bottom) and goes up: 1→2→3, then bounces back down 3→2→1.",
        "높이가 3 인 격자에서 행은 1→2→3 으로 올라갔다가 3→2→1 로 내려와요."),
      question: t(E,
        "Grid height H=3. The row starts at 1 and moves up, bouncing at the walls. Which row (from the bottom) after 4 seconds?",
        "격자 높이가 H=3 이에요. 행이 1 에서 출발해 위로 가다 벽에서 튕겨요. 4 초 뒤에는 아래에서 몇 번째 행일까요?"),
      options: [
        t(E, "1", "1"),
        t(E, "3", "3"),
        t(E, "2", "2"),
      ],
      correct: 0,
      explain: t(E,
        "Rows over time: 1(t0) → 2(t1) → 3(t2) → 2(t3) → 1(t4). It repeats every 2(H−1)=4 seconds, so T=4 is back to 1.",
        "행은 시간에 따라 1(t0) → 2(t1) → 3(t2) → 2(t3) → 1(t4) 로 움직여요. 2(H−1)=4 초마다 똑같이 되풀이되니까 T=4 는 다시 1 이에요."),
    },
  ];
}

export function makeMcc21DvdCh2(E, lang = "py") {
  return [
    // 2-1: plan — brute limit → fast idea
    {
      type: "reveal",
      narr: t(E,
        "Stepping second by second is hopeless: T can be 10^16 and there are up to 1000 queries — around 10^19 steps. The fast way sees the row and the column as two independent triangle waves, each repeating every 2(N−1) seconds, so one modulo gives each answer.",
        "한 초씩 세는 건 가망이 없어요. 행과 열을 따로 보면 나머지 계산 한 번으로 끝나요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                🐢 {t(E, "Slow: step one second at a time", "느림: 한 초씩 세기")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "T ≤ 10^16 per query × up to 1000 queries ≈ 10^19 steps. Never finishes.", "물음 하나에 T 가 10^16 까지, 물음은 1000 개예요. 다 합치면 10^19 번쯤 세야 해서 절대 못 끝나요.")}
              </div>
            </div>
            <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
                🚀 {t(E, "Fast: two independent triangle waves", "빠름: 따로 노는 삼각파 두 개")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E, "Row (from H) and column (from W) never interact. Each bounces with period 2(N−1), so r = N − |(N−1) − (T mod 2(N−1))|. O(1) per query.",
                      "행은 H 만, 열은 W 만 보면 돼요. 둘은 서로 영향을 주지 않아요. 둘 다 2(N−1) 초마다 똑같이 되풀이돼서 r = N − |(N−1) − (T mod 2(N−1))| 로 바로 구해요. 물음 하나를 O(1) 에 끝내요.")}
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
        "Solution code — read part by part.", "풀이 코드를 한 부분씩 읽어봐요."),
      sections: getMcc21DvdSections(E),
    },
  ];
}
