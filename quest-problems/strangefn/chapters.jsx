import { C, t } from "@/components/quest/theme";
import { getStrangeFnSections, getStrangeFnWalk } from "./components";
import { CodeWalk } from "@/components/quest/CodeWalk";
import { StrangeFnDigitSim } from "./sims";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeStrangeFnCh1
   ═══════════════════════════════════════════════════════════════ */
export function makeStrangeFnCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "How many times must f run to turn x into 0?",
        "이상한 함수 f 를 몇 번 써야 x 가 0 이 되는지 세는 문제예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔮"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#5b21b6" }}>Strange Function</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2026 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 , wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                "Output how many applications of f are needed to reach 0, mod 10⁹+7.",
                "f 를 몇 번 써야 0 이 되는지 10⁹+7 로 나눈 나머지를 출력해요.")}
            </div>
            {/* 2026-09-22: 10⁹+7 이 화면에 16번 나오지만 뜻은 한 번도 안 밝혀져 있었다.
                학생이 처음 만나는 이 자리(1쪽 미션)에서 한 번만 정의한다. */}
            <div style={{ fontSize: 11, color: "#7c3aed", marginTop: 6, wordBreak: "keep-all", textWrap: "balance", whiteSpace: "pre-line" }}>
              {t(E,
                "10⁹+7 = 1,000,000,007, a huge prime.\nThe true answer can get astronomically large, so we only report the remainder after dividing by it.",
                "10⁹+7 은 10억 7, 즉 1,000,000,007 이에요.\n답이 어마어마하게 커질 수 있어서, 이 수로 나눈 나머지만 답으로 내요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 , wordBreak: "keep-all", textWrap: "balance" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A function ", "함수 ")}
                  <b style={{ color: "#8b5cf6" }}>f(x)</b>
                  {t(E, " is defined on positive integers.", " 가 양의 정수에 정의돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If x has any digit other than 0 or 1: replace ",
                        "x 에 0/1 이 아닌 자릿수가 하나라도 있으면: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "each digit", "각 자릿수")}</b>
                  {t(E, " by 1 if odd, 0 if even.", " 를 홀수면 1, 짝수면 0 으로 바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Otherwise (x contains only 0/1): ",
                        "그게 아니면 (x 가 0/1 만 가짐): ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "x − 1", "x − 1")}</b>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print how many ", "")}
                  <b style={{ color: "#15803d" }}>f</b>
                  {t(E, " applications make x become 0, mod ",
                        " 를 몇 번 쓰면 x 가 0 이 되는지를 ")}
                  <b style={{ color: "#15803d" }}>10⁹+7</b>
                  {t(E, ".", " 로 나눈 나머지를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Input/Output format (2026-09-22 신설 — 형식 카드를 샘플에서 분리, photoshoot25 시즌 표준 그대로)
    {
      type: "reveal",
      narr: t(E,
        "First line T, then one x per line — one test each.",
        "첫 줄에 T, 그다음 줄마다 x 가 하나씩 있어요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>T</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of tests", "— 테스트 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #c4b5fd" }}>
                <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>x</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— one number, on its own line", "— 수 하나, 한 줄에 하나")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats T times", "↑ 이 줄이 T 번 반복")}</div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "For each x, how many times f applies until it hits 0, mod 10⁹+7 (T lines).",
                  "x 마다 f 를 몇 번 써야 0 이 되는지를 10⁹+7 로 나눈 나머지로, 한 줄씩 출력해요 (T 줄).")}
            </div>
          </div>
          {/* 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 100,000 (= 10⁵)</div>
              <div>1 ≤ x &lt; 10^(2×10⁵)  <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(x can have up to 200,000 digits)", "(x 는 최대 20만 자리짜리 수일 수 있음)")}</span></div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "total digits across all x ≤ 10⁶ (one million)", "모든 x 의 자릿수 합 ≤ 10⁶ (백만)")}</div>
            </div>
          </div>
        </div>),
    },

    // 1-3: Sample I/O + x=210 시뮬 (2026-09-22 — 정적 텍스트 트레이스를 SimNav 시뮬로 교체)
    {
      type: "reveal",
      narr: t(E,
        "Two samples, then walk x = 210 one step at a time.",
        "예제 두 개를 보고, x = 210 은 한 단계씩 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
            📥 {t(E, "Sample I/O", "샘플 입출력")}
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1, background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
              <div style={{ color: "#94a3b8", fontSize: 10, marginBottom: 4 }}>{t(E, "Input", "입력")}</div>
              <div>2</div>
              <div>24680</div>
              <div>210</div>
            </div>
            <div style={{ flex: 1, background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
              <div style={{ color: "#94a3b8", fontSize: 10, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
              <div>1</div>
              <div>4</div>
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "Trace x = 24680", "추적 x = 24680")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" , wordBreak: "keep-all", textWrap: "balance" }}>
              <div>24680 → {t(E, "has digits other than 0/1", "0/1 이 아닌 자릿수 있음")}</div>
              <div>{t(E, "each digit by parity:", "자리별 홀짝:")} 2→0, 4→0, 6→0, 8→0, 0→0</div>
              <div>= 00000 = 0 ✅ <b style={{ color: "#15803d" }}>{t(E, "1 op (f used once)", "1번 (f 를 한 번 씀)")}</b></div>
            </div>
          </div>

          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <StrangeFnDigitSim E={E} />
          </div>
        </div>),
    },

    // 1-4: 한계 — 하나씩 세면 못 센다 (2026-09-22 신설. 브루트 코드 없음 — feedback_why_and_how_over_slowness)
    {
      type: "reveal",
      narr: t(E,
        "What if we just count f, one use at a time? We can't.",
        "f 를 하나씩 세면 어떻게 될까요? 그럴 수 없어요."),
      content: (
        <div style={{ padding: 20, wordBreak: "keep-all" }}>
          <div style={{
            maxWidth: 470, margin: "0 auto", background: "#fef2f2",
            border: "1.5px solid #fca5a5", borderRadius: 12, padding: "14px 16px",
          }}>
            <div style={{ fontWeight: 800, color: "#b91c1c", marginBottom: 8, fontSize: 13 }}>
              🐌 {t(E, "Count f one use at a time?", "f 를 한 번씩 세어 가면?")}
            </div>
            <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.9, fontFamily: "'JetBrains Mono',monospace" }}>
              <div>1 ≤ x &lt; 10^(2×10⁵)</div>
              <div style={{ color: "#b91c1c", fontWeight: 800, marginTop: 4 }}>
                {t(E, "total digits across all x ≤ 10⁶", "모든 x 의 자릿수 합 ≤ 10⁶")}
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: "#7f1d1d", marginTop: 8, lineHeight: 1.6 }}>
              {t(E,
                "x itself can already be a number with up to 200,000 digits. Even after it becomes 0/1 only, it stays that big — the digit count didn't shrink. And since f only subtracts 1 each time, reaching 0 takes as many steps as the value itself. So the number of times f must be applied can itself be astronomically large. Counting one use at a time means looping that many times, which is far more than any loop could finish.",
                "x 자체가 이미 20만 자리에 가까운 수일 수 있어요. 0/1 만 남은 뒤에도 그 크기는 그대로예요. 자릿수가 그대로니 값도 그대로 크고, f 는 1 씩 빼니 0 까지 그 값만큼 걸려요. 그러니 f 를 써야 하는 횟수 자체가 어마어마하게 클 수 있어요 — 하나씩 세는 건 그 횟수만큼 반복해야 하는데, 어떤 반복문도 끝낼 수 없는 크기예요.")}
            </div>
          </div>
          <div style={{ maxWidth: 470, margin: "12px auto 0", fontSize: 12.5, color: "#5b21b6", textAlign: "center", fontWeight: 700 }}>
            {t(E,
              "→ So: don't count one by one. Find a rule from small values, and get the answer with one formula.",
              "→ 그러니 하나씩 세지 말고, 작은 값에서 규칙을 찾아 식 하나로 한 번에 구해요.")}
          </div>
        </div>),
    },

    // 1-5: 도입 — 작은 n 부터 직접 세어보기 (input, 2026-09-22 신설. 공식 없이 손으로)
    {
      type: "input",
      narr: t(E,
        "Let's count by hand for small values first.",
        "작은 값부터 직접 세어 봐요."),
      question: t(E,
        "x = 10 (only 0s and 1s). How many f's until it hits 0? Count it out.",
        "x = 10 이에요 (0 과 1 만 있어요). 0 이 될 때까지 f 를 몇 번 써야 할까요? 직접 세어 보세요."),
      hint: t(E,
        "Warm-up: x = 1 takes 1 f (1 − 1 = 0).\nNow x = 10: it's only 0/1, so 10 − 1 = 9.\n9 has a digit other than 0/1, so flip by parity — 9 is odd, so it becomes 1.\n1 is only 0/1, so 1 − 1 = 0. How many f's was that in total?",
        "몸풀기 — x = 1 은 f 한 번(1 − 1 = 0)이에요.\n이제 x = 10 이에요. 0/1 만 있으니 10 − 1 = 9.\n9 는 0/1 이 아닌 자리가 있으니 홀짝으로 바꿔요 — 9 는 홀수라서 1.\n1 은 0/1 만 있으니 1 − 1 = 0. 모두 몇 번이었나요?"),
      answer: 3,
      explain: t(E,
        "3 is right. 10 → 9 → 1 → 0, three f's.\nx = 1 took 1, x = 10 took 3 — it didn't just go up by one. Let's find the real rule next.",
        "3 이 맞아요. 10 → 9 → 1 → 0, 세 번이에요.\nx = 1 은 1 번, x = 10 은 3 번 — 그냥 하나씩 늘어나지 않아요. 진짜 규칙을 다음 쪽에서 찾아봐요."),
    },

    // 1-6: 해결 — 패턴 정리 (2026-09-22: '왜 이진수 뺄셈과 같나' 지어낸 설명 제거, 관찰→규칙으로만)
    {
      type: "reveal",
      narr: t(E,
        "Once x is 0/1 only, read it as binary n — and look for a rule.",
        "x 가 0/1 만 남으면 이진수 n 으로 읽고 규칙을 찾아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
            🧩 {t(E, "What's the pattern?", "패턴이 뭘까?")}
          </div>

          <div style={{ background: "#fff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7 , wordBreak: "keep-all", textWrap: "balance" }}>
              {/* ⚠️ 2026-09-22: 예전 문장은 "이진수에서 1 빼기와 똑같다" 고 주장했는데
                  틀렸다 (10−1=9 ≠ 이진 10−1=1). 검증해 주지 않은 인과는 쓰지 않는다 —
                  작은 n 을 세어서 나온 값을 그대로 관찰만 한다.
                  ⚠️ 2026-09-22 학생 검증: 앞 쪽(3쪽) 시뮬은 순수 십진 뺄셈인데
                  여기서 갑자기 "이진수로 읽는다" 고 해서 다리가 끊겨 있었다.
                  또 "x=10 은 3번" (5쪽) 과 "n=2 는 3" (이 표) 을 잇는 문장이
                  빠져 있었다 — 직접 채워 넣는다.
                  2026-09-22 재검증: "이진수" 를 처음 쓰는 이 자리에서 읽는 법(자리마다
                  2의 몇 제곱)을 한 번도 안 알려줬다 — 학생이 8쪽까지 혼자 짐작했다.
                  한 줄만 추가하고, 대신 앞부분을 줄여서 전체 길이를 늘리지 않는다. */}
              {t(E,
                "Page 3 subtracted in plain decimal — that was correct there. Here we read the same 0/1 digits as binary instead: from the right, place values go 1, 2, 4, 8 … doubling each time. \"10\" is 1×2 + 0×1 = 2, so n = 2. x = 10 took 3 f's, so the n = 2 row below is 3. Let's line up a few more n's and look for a rule.",
                "3쪽은 십진수로 뺐어요, 거기선 그게 맞아요. 여기선 규칙을 찾으려 같은 0과 1을 이진수로 읽어요 — 오른쪽부터 1, 2, 4, 8 … 두 배씩이에요. \"10\" 은 1×2 + 0×1 = 2, 그래서 n = 2예요. x = 10 은 세 번이었으니 표의 n = 2 칸이 3이에요. 다른 n 도 늘어놓고 규칙을 찾아봐요.")}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "g(n) = ops to kill the binary number n", "g(n) = 이진수 n 을 0 으로 만드는 데 드는 횟수")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginBottom: 6, wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                "\"form\" writes n as 2k (even) or 2k+1 (odd).",
                "\"형태\" 는 n 이 짝수(2k)인지 홀수(2k+1)인지를 나타내요.")}
            </div>
            <table style={{ width: "100%", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: C.text, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#ede9fe", color: "#5b21b6" }}>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>n</th>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>g(n)</th>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>{t(E, "form", "형태")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: "3px 8px" }}>0</td><td>0</td><td>—</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>1</td><td>1</td><td>2k+1, k=0 → 3k+1=1</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>2</td><td>3</td><td>2k, k=1 → 3k=3</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>3</td><td>4</td><td>2k+1, k=1 → 3k+1=4</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>4</td><td>6</td><td>2k, k=2 → 3k=6</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>5</td><td>7</td><td>2k+1, k=2 → 3k+1=7</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>6</td><td>9</td><td>2k, k=3 → 3k=9</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>7</td><td>10</td><td>2k+1, k=3 → 3k+1=10</td></tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>
              {t(E, "✅ Formula", "✅ 공식")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" , wordBreak: "keep-all", textWrap: "balance" }}>
              <div>g(2k)   = 3k</div>
              <div>g(2k+1) = 3k + 1</div>
            </div>
            <div style={{ fontSize: 11, color: "#166534", marginTop: 4, fontFamily: "inherit", wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                "n=2k → 3n/2=3k. n=2k+1 → 3n/2=3k+1.5, drop the decimal → 3k+1 — so both become one formula:",
                "n=2k 면 3n/2=3k. n=2k+1 이면 3n/2=3k+1.5, 소수점을 버리면 3k+1 — 둘 다 이 식 하나로 써요:")}
            </div>
            <div style={{ fontSize: 12, color: "#15803d", fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>
              {t(E, "= floor(3·n / 2)", "= floor(3·n / 2)")}
            </div>
            <div style={{ fontSize: 11, color: "#166534", marginTop: 6, fontFamily: "inherit", wordBreak: "keep-all", textWrap: "balance" }}>
              {t(E,
                "floor drops anything after the decimal point — floor(3.5) is 3.",
                "floor 는 소수점 아래를 버리는 거예요 — floor(3.5) 는 3 이에요.")}
            </div>
          </div>
        </div>),
    },

    // 1-7: 연습1 — 0/1 이 아닌 자리가 있는 값 (input, x=37 → 5. 2026-09-22 신설)
    {
      type: "input",
      narr: t(E,
        "Practice — a value with a digit other than 0/1.",
        "0/1 이 아닌 자리가 있는 값도 연습해 봐요."),
      question: t(E,
        "How many f's for x = 37?",
        "x = 37 은 몇 번 만에 0 이 될까요?"),
      hint: t(E,
        "Same three ideas as before.\nDoes it need a parity-flip first — what do 3 and 7 become?\nThen read that result as binary — what's n?\nThen look up g(n) in the table above.",
        "앞에서 배운 세 가지를 그대로 써요.\n먼저 홀짝 변환이 필요한가요? 3 과 7 은 뭐가 되나요?\n그 결과를 이진수로 읽으면 n 은 얼마인가요?\n표에서 g(n) 을 찾아요."),
      answer: 5,
      explain: t(E,
        "5 is right. 37 → 11 (1) → 10 (2) → 9 (3) → 1 (4) → 0 (5).\nSame as 1 + g(3) = 1 + 4 = 5.",
        "5 가 맞아요. 37 → 11 (1) → 10 (2) → 9 (3) → 1 (4) → 0 (5).\n1 + g(3) = 1 + 4 = 5 와 같아요."),
    },

    // 1-8: 연습2 — 이미 0/1 인 큰 값 (input, x=1010 → 15. 2026-09-22 신설)
    {
      type: "input",
      narr: t(E,
        "Practice — a bigger value that's already 0/1.",
        "이미 0 과 1 만 있는, 더 큰 값도 연습해 봐요."),
      question: t(E,
        "How many f's for x = 1010?",
        "x = 1010 은 몇 번 만에 0 이 될까요?"),
      hint: t(E,
        "This one is already 0/1, so skip the parity-flip.\nGo straight to reading it as binary, then plug that n into the formula.",
        "이 값은 이미 0/1 이라 홀짝 변환은 건너뛰어요.\n바로 이진수로 읽고, 그 n 을 공식에 넣어요."),
      answer: 15,
      explain: t(E,
        "15 is right. g(10) = 3 × 5 = 15 — counting by hand would take 15 steps, but the formula gives it in one shot.",
        "15 가 맞아요. g(10) = 3 × 5 = 15 — 직접 세면 15 단계나 걸리지만, 식으로는 한 번에 나와요."),
    },
  ];
}


/* ── 계획: 코드 전에 세 단계로 정리 (2026-09-23 신설) ─────────────
   선생님: "코드 전에 뭘 어떻게 하겠다고 자세히 설명한건가?
            시뮬만 보고도 코드를 짤수 있나?" → 못 짠다.
   원인(pedagogy): 3쪽 시뮬은 f 를 4번 되풀이 적용하는 걸 보여주는데
   코드는 그걸 안 한다 — ①홀짝 한 번 ②이진수로 읽기 ③공식. 그 세 단계가
   화면에 없고 7쪽 힌트 안에 정답 전문으로 숨어 있었다(memory/usaco_quest_learning_flow.md
   의 "계획" 단계 부재 · memory/feedback_students_copy_the_answer.md 와 같은 모양).
   모양은 buymilk 의 "Plan" 쪽(BuyMilkPlan)을 그대로 베꼈다 — 파란 박스 +
   번호 걸음, 새 시뮬은 만들지 않는다. 숫자는 전부 학생이 이미 본 것만 쓴다
   (x=210 은 3쪽 시뮬, n=2·g(2)=3 은 6쪽 표). */
function StrangeFnPlan({ E }) {
  const Step = ({ n, children }) => (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
      <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, background: "#8b5cf6",
        color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {n}
      </span>
      <div style={{ fontSize: 12.5, lineHeight: 1.7, color: "#334155", wordBreak: "keep-all", textWrap: "balance" }}>
        {children}
      </div>
    </div>
  );
  return (
    <div style={{ padding: 16, maxWidth: 470, margin: "0 auto" }}>
      <div style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd", borderRadius: 12,
        padding: "12px 16px", marginBottom: 12, wordBreak: "keep-all", textWrap: "balance" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 8 }}>
          🗺️ {t(E, "Three steps, in code order", "코드가 할 세 단계")}
        </div>
        <Step n={1}>
          {t(E,
            "If any digit isn't 0/1: flip every digit to 0/1 by parity, all at once (1 op).",
            "0/1 이 아닌 자리가 있으면, 한 번에 다 홀짝으로 0/1 로 바꿔요 (1번).")}
        </Step>
        <Step n={2}>
          {t(E,
            "Read the leftover 0/1 digits as binary — that's n.",
            "남은 0/1 을 이진수로 읽어요 — 그게 n 이에요.")}
        </Step>
        <Step n={3}>
          {t(E,
            "Put n into the formula: floor(3n/2).",
            "n 을 공식 floor(3n/2) 에 넣어요.")}
        </Step>
      </div>

      <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12,
        padding: "12px 16px", marginBottom: 10 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
          🔁 {t(E, "Double-check with x = 210", "x = 210 으로 다시 세어 봐요")}
        </div>
        <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.9, fontFamily: "'JetBrains Mono',monospace",
          wordBreak: "keep-all", textWrap: "balance" }}>
          <div>{t(E, "One by one (page 3): 210 → 10 → 9 → 1 → 0 = 4", "하나씩 세면 (3쪽): 210 → 10 → 9 → 1 → 0 = 4번")}</div>
          <div style={{ marginTop: 6 }}>{t(E, "① parity-flip once → \"010\"", "① 홀짝 변환 1번 → \"010\"")}</div>
          <div>{t(E, "② read as binary → n = 2 (same n as page 6's table)", "② 이진수로 읽으면 → n = 2 (6쪽 표와 같아요)")}</div>
          <div>{t(E, "③ g(2) = 3", "③ g(2) = 3")}</div>
          <div style={{ marginTop: 4, fontWeight: 800 }}>1 + 3 = 4</div>
        </div>
      </div>

      <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10,
        padding: "9px 14px", fontSize: 12.5, color: "#166534", fontWeight: 700, textAlign: "center",
        wordBreak: "keep-all", textWrap: "balance" }}>
        {t(E,
          "✅ Same answer, both ways — so these three steps become the code.",
          "✅ 두 방법 다 답이 같아요 — 그래서 이 세 단계가 그대로 코드가 돼요.")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeStrangeFnCh2
   ═══════════════════════════════════════════════════════════════ */
export function makeStrangeFnCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      label: t(E, "Plan", "계획"),
      narr: t(E,
        "Before the code: what will it actually do? Three steps.",
        "코드로는 뭘 할까요? 세 단계예요."),
      content: (<StrangeFnPlan E={E} />),
    },
    /* 코드 위 '왜 이렇게?' 노트 벽 → 코드 줄에 붙는 CodeWalk 말풍선 (선생님 2026-07-27). */
    (() => {
      const w = getStrangeFnWalk(E, lang);
      return {
        type: "reveal",
        label: t(E, "Code", "코드"),
        narr: t(E,
          "Flip digits once if needed, then use the formula.",
          "필요하면 자릿수를 한 번 바꾸고, 그 다음 공식을 써요."),
        content: (<CodeWalk E={E} lang={lang} code={w.code} vars={w.vars} beats={w.beats} accent="#8b5cf6" />),
      };
    })(),
  ];
}
