import { C, t } from "@/components/quest/theme";
import { MiniCode } from "./helpers";
import { getMooSections, getMooBruteSections } from "./components";

export { isMoo, findAllMoos, bruteSolve } from "./helpers";

export function makeMooCh1(E) {
  return [
    { type: "reveal",
      narr: t(E, "Bessie mooed a LOT at a contest.\nBut the recording might have 1 typo...\ncan we still figure out what she said?\n🐄", "Bessie 의 울음을 녹음했는데 1글자가 틀렸을 수 있어요.\n뭐라고 울었는지 알아낼까요? 🐄"),
      content: (<div style={{ padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 4 }}>🐄</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#7c5cfc" }}>It's Mooin' Time</div>
        <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2024 Bronze #3</div>
        <div style={{ marginTop: 12, background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E, "A string of letters → find patterns like 'moo',\n'baa' → but 1 letter might be wrong!", "글자가 쭉 이어진 문자열에서\n'moo', 'baa' 같은 패턴을 찾아요.\n그런데 1글자가 틀렸을 수도 있어요!")}
        </div>
      </div>),
    },
    { type: "reveal",
      narr: t(E, "A 'moo' is 3 letters: the first is different, and the last two are the SAME.\nLike how a cow says 'moo' — one sound, then the same sound twice!", "'moo' 는 3글자예요.\n첫 글자는 다르고 뒤 2글자는 같아요.\n소가 '무우' 하듯이 한 소리, 그다음 같은 소리 2번!"),
      content: (<div style={{ padding: 16 }}>
        <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.accent, marginBottom: 10 }}>{t(E, "Moo Pattern: ABB (A≠B)", "Moo 패턴 — ABB (A≠B)")}</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
            {[["m","o","o",true],["b","a","a",true],["o","o","o",false],["a","b","c",false]].map(([a,b,c,ok],i) => (
              <div key={i} style={{ padding: "8px 10px", borderRadius: 10, background: ok ? C.okBg : C.noBg, border: `2px solid ${ok ? C.okBd : C.noBd}`, fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 900, color: ok ? C.ok : C.no }}>{a}{b}{c} {ok ? "✅" : "❌"}</div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "'ooo' fails: first = last two. 'abc' fails: last two differ.", "'ooo' 는 첫 글자가 뒤 글자와 같아서 실패예요.\n'abc' 는 뒤 2글자가 달라서 실패예요.")}
          </div>
        </div>
      </div>),
    },
    { type: "quiz",
      narr: t(E, "Quick check! Which of these is a valid moo?", "퀴즈! 어떤 게 유효한 moo일까요?"),
      question: t(E, "Which is a valid moo (ABB, A≠B)?", "유효한 moo (ABB, A≠B)는?"),
      options: ["att", "aab", "xyz"], correct: 0,
      explain: t(E, "'att': a≠t and t=t → valid! 'aab': first two same (AA_). 'xyz': last two differ (_YZ).", "'att' 는 a≠t 이고 t=t 라서 유효해요.\n'aab' 는 앞 2개가 같아요 (AA_).\n'xyz' 는 뒤 2개가 달라요 (_YZ)."),
    },
    { type: "reveal",
      narr: t(E, "Here's the twist: the recording might have exactly 1 wrong letter, so we try changing every possible letter.", "여기서 반전이 있어요.\n녹음에 딱 1글자 오타가 있을 수 있대요.\n이 글자를 바꾸면? 저 글자를 바꾸면?\n모든 경우를 다 해 봐요!"),
      content: (<div style={{ padding: 16, textAlign: "center" }}>
        <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.carry, marginBottom: 8 }}>{t(E, "Key Constraint", "핵심 조건")}</div>
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>{t(E, "Original string + change at most 1 letter → find ALL moo patterns appearing at least F times", "원래 문자열 + 최대 1글자 변경 → F번 이상 나오는 모든 moo 패턴 찾기")}</div>
          <div style={{ marginTop: 8, padding: "6px 10px", background: "#fff", border: `1.5px solid ${C.carry}`, borderRadius: 8, fontSize: 12, color: "#92400e", fontWeight: 600 }}>
            {t(E, "💡 F is just a target count the problem gives us. F=2 means \"appears 2 or more times.\"", "💡 F 는 문제에서 정해주는 '기준 횟수' 예요. F=2 면 \"2번 이상 나온다\"는 뜻.")}
          </div>
        </div>
      </div>),
    },
    { type: "quiz",
      narr: t(E, "Example: 'zzmoozzmoo' with F=2.\n'moo' appears 2 times already!\nEven changing 1 letter, no NEW moo reaches 2.\nSo the answer is just 'moo'.", "'zzmoozzmoo' 에서 F=2 일 때를 볼게요."),
      question: t(E, "What are we looking for?", "우리가 찾는 건?"),
      options: [
        t(E, "All moo patterns with count ≥ F (trying 0 or 1 letter change)", "0~1글자 바꿨을 때 F번 이상인 모든 moo 패턴"),
        t(E, "Only the most common pattern", "가장 많은 패턴만"),
        t(E, "The position of the typo", "오타 위치"),
      ], correct: 0,
      explain: t(E, "All possible moos that could reach the threshold! We collect them ALL.", "기준치에 도달할 수 있는 moo 를 전부 모아요."),
    },

    // 1-6: 입출력 형식 + 제약 (USACO 원문)
    { type: "reveal",
      narr: t(E, "Actual problem format: read N (string length) and F (threshold), then the string.\nOutput count + sorted moos.", "N 과 F 를 먼저 읽고, 그다음 줄에 문자열이 와요."),
      content: (<div style={{ padding: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
          <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7 }}>
            <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>N F</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(first line)", "(첫 줄)")}</span></div>
            <div><span style={{ color: "#5b21b6", fontWeight: 800 }}>S</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(lowercase string of length N)", "(길이 N 의 소문자 문자열)")}</span></div>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
            {t(E, "K (count of distinct qualifying moos), then K moos sorted alphabetically.",
                "먼저 K (F 번 이상 나오는 서로 다른 moo 개수) 를 쓰고, 그다음 알파벳순으로 정렬한 moo K 개를 써요.")}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
          <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
            <div>3 ≤ N ≤ 20,000</div>
            <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "S = lowercase letters only", "S 는 영어 소문자만")}</div>
          </div>
        </div>
      </div>),
    },

    // 1-7: Sample I/O 미리보기 — sim 탭과 다리
    { type: "reveal",
      narr: t(E, "Here's the sample input/output we'll explore in the Sim tab:", "시뮬 탭에서 직접 가지고 놀 샘플 입출력이에요."),
      content: (<div style={{ padding: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#f8fafc" }}>
              <div><span style={{ color: "#fbbf24" }}>10</span> <span style={{ color: "#fbbf24" }}>2</span> <span style={{ color: "#94a3b8", fontSize: 10 }}>{t(E, "// N=10, F=2", "// N=10, F=2")}</span></div>
              <div>zzmoozzmoo</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#f8fafc" }}>
              <div>1</div>
              <div style={{ color: "#34d399", fontWeight: 900 }}>moo</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12, padding: "10px 12px", background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, fontSize: 12, color: "#92400e", lineHeight: 1.7, fontWeight: 600 }}>
          🤔 {t(E, "Why is the answer just 'moo' and not 'oo?' patterns?\nIn the Sim tab, try changing letters and see which patterns reach 2.", "왜 답이 'moo' 하나뿐이고 다른 패턴은 없을까요?\n시뮬 탭에서 글자를 바꿔 보면서 어떤 패턴이 2번에 도달하는지 봐요.")}
        </div>
      </div>),
    },
  ];
}

export function makeMooCh2(E) {
  return [
    { type: "mooSim",
      narr: t(E, "Play with it — type a string, click any letter to change it, and watch how the moos change!", "직접 해 봐요! 글자를 눌러 바꾸면 moo 가 어떻게 변할까요?"),
    },
    { type: "quiz",
      narr: t(E, "Did you notice? When you change ONE letter, only the moos right next to it change. Far ones stay the same!",
            "눈치챘나요?\n글자 하나를 바꾸면 그 글자 바로 옆 moo 만 변해요.\n멀리 있는 건 그대로예요."),
      question: t(E, "Change one letter. How many 3-letter chunks (called windows) can it affect at most?",
            "글자 하나를 바꾸면 영향받는 3 글자 묶음 (= **윈도우**) 은 많아야 몇 개일까요?"),
      options: [
        t(E, "At most 3 — only the windows that contain that letter", "많아야 3 개 — 그 글자가 들어있는 윈도우만"),
        t(E, "All windows in the string", "문자열의 모든 윈도우"),
        t(E, "Just 1 — the window that starts at that letter", "1 개 — 그 글자에서 시작하는 윈도우만"),
      ], correct: 0,
      explain: t(E, "Yes — at most 3. That letter can sit as the 1st, 2nd, or 3rd character of a window. This is the KEY insight! 💡",
            "맞아요 — 많아야 3 개예요.\n그 글자는 윈도우의 1 번째, 2 번째, 3 번째 자리에 올 수 있거든요.\n이게 핵심이에요! 💡"),
    },
    { type: "reveal",
      narr: t(E, "Let's see it clearly.\nIn 'abcdef', if we change position 3 (the 'd'), only 3 windows are affected:", "'abcdef' 에서 위치 3 ('d') 을 바꾸면\n딱 3개 윈도우만 영향을 받아요."),
      content: (<div style={{ padding: 16 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, textAlign: "center", marginBottom: 12 }}>
          {["a","b","c","d","e","f"].map((ch,i) => (
            <span key={i} style={{ display: "inline-block", width: 28, height: 28, lineHeight: "28px", textAlign: "center", borderRadius: 6, margin: "0 2px", fontWeight: 800, background: i===3 ? "#fde68a" : i>=1&&i<=5 ? "#ede9fe" : "#f8f9fc", border: `2px solid ${i===3 ? "#f59e0b" : i>=1&&i<=5 ? "#c4b5fd" : C.border}`, color: i===3 ? "#92400e" : C.text }}>{ch}</span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: C.dim, lineHeight: 2 }}>
          <div>🟣 {t(E, "Window [1,2,3] = 'bcd' — d is 3rd letter", "윈도우 [1,2,3] = 'bcd' — d가 3번째")}</div>
          <div>🟣 {t(E, "Window [2,3,4] = 'cde' — d is 2nd letter", "윈도우 [2,3,4] = 'cde' — d가 2번째")}</div>
          <div>🟣 {t(E, "Window [3,4,5] = 'def' — d is 1st letter", "윈도우 [3,4,5] = 'def' — d가 1번째")}</div>
          <div>⬜ {t(E, "Window [0,1,2] = 'abc' — d not here!", "윈도우 [0,1,2] = 'abc' — d 가 없어요!")}</div>
        </div>
      </div>),
    },
    // 2-4 (NEW): edge cases — corners have fewer windows
    { type: "reveal",
      narr: t(E, "Wait — positions at the edge have fewer than 3 windows, since there's nothing beyond the string's ends.", "가장자리 글자는 들어갈 수 있는 자리가 적어요."),
      content: (<div style={{ padding: 16 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, textAlign: "center", marginBottom: 10, color: C.dim }}>
          {t(E, "Example: N=10 string", "N=10 인 문자열 예시")}
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.9, color: C.text }}>
          {[
            ["pos = 0", t(E, "1 window — [0,1,2] only", "윈도우 1 개 — [0,1,2] 만"), "#fef3c7", "#fbbf24"],
            ["pos = 1", t(E, "2 windows — [0,1,2], [1,2,3]", "윈도우 2 개 — [0,1,2], [1,2,3]"), "#fff7ed", "#fdba74"],
            ["pos = 2 ~ N-3", t(E, "3 windows (full case)", "윈도우 3 개 (꽉 찬 경우)"), "#ede9fe", "#c4b5fd"],
            ["pos = N-2", t(E, "2 windows — [N-4,N-3,N-2], [N-3,N-2,N-1]", "윈도우 2 개 — [N-4..N-2], [N-3..N-1]"), "#fff7ed", "#fdba74"],
            ["pos = N-1", t(E, "1 window — [N-3,N-2,N-1] only", "윈도우 1 개 — [N-3,N-2,N-1] 만"), "#fef3c7", "#fbbf24"],
          ].map(([lbl, txt, bg, bd], i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 10px", marginBottom: 4, borderRadius: 8, background: bg, border: `1.5px solid ${bd}` }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 900, color: C.text, minWidth: 110 }}>{lbl}</span>
              <span>{txt}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, padding: "10px 12px", background: "#0f172a", borderRadius: 10, color: "#f8fafc", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.8 }}>
          <div style={{ color: "#94a3b8", fontSize: 11 }}>{t(E, "// One formula handles all cases", "// 한 식이 모든 경우 처리")}</div>
          <div>minIdx = <span style={{ color: "#fbbf24" }}>max</span>(pos - 2, 0)</div>
          <div>maxIdx = <span style={{ color: "#fbbf24" }}>min</span>(pos, N - 3)</div>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center" }}>
          {t(E, "Same formula appears in the smart code (Ch5). max/min clip to valid window range.", "이 식이 그대로 스마트 코드(Ch5)에 나와요.\nmax/min 으로 올바른 윈도우 범위까지만 잘라요.")}
        </div>
      </div>),
    },
  ];
}

export function makeMooCh3(E) {
  return [
    { type: "mooRunner",
      narr: t(E, "Simplest approach: for each position, try all 26 letters, scanning the entire string each time to count moos.", "제일 단순한 방법부터 해봐요. 자리마다 26 글자를 다 넣어 보는 거예요."),
    },
    { type: "quiz",
      narr: t(E, "Did you feel it getting MUCH slower — why?", "엄청 느려지는 게 느껴졌나요? 왜 그럴까요?"),
      question: t(E, "Time complexity of brute force?", "브루트포스의 시간복잡도는 얼마일까요?"),
      options: ["O(N)", "O(26 × N²)", "O(N³)"], correct: 1,
      explain: t(E, "O(26N²)! N=20,000 → 26 × 400,000,000 = ~10 billion operations. Way too slow! ⏰", "O(26N²) 예요.\nN=20,000 이면 26 × 4억 = 약 100억 번 계산해요.\n너무 느려요! ⏰"),
    },
    { type: "input",
      narr: t(E, "Let's feel how bad it is.\nN=20,000: 26 × 20,000² = 10.4 billion operations.\nAt 100 million ops/sec, how many seconds?", "얼마나 느린지 숫자로 재 봐요.\nN=20,000 이면 26 × 20,000² = 약 104억 번이에요.\n초당 1억 번이면 몇 초 걸릴까요?"),
      question: t(E, "10.4 billion ÷ 100 million = ? seconds", "104억 ÷ 1억 = ? 초"),
      hint: t(E, "10,400,000,000 ÷ 100,000,000 = ?", "10,400,000,000 ÷ 100,000,000 = ?"),
      answer: 104,
    },
    // 3-NEW: brute 가 매번 무엇을 하는지 — TLE 직관 강화
    { type: "reveal",
      narr: t(E, "Where does the N² come from — watch ONE position carefully; nothing gets reused across positions.", "N² 은 어디서 나올까요? 한 자리를 자세히 봐요."),
      content: (<div style={{ padding: 16 }}>
        <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
          <div style={{ color: "#dc2626", fontWeight: 800 }}>pos = 0:</div>
          <div style={{ paddingLeft: 12, color: C.text }}>
            <div>{t(E, "try 'a' → scan all N-2 windows → count moos", "'a' 시도 → N-2 윈도우 전부 훑기 → moo 세기")}</div>
            <div>{t(E, "try 'b' → scan all N-2 windows AGAIN", "'b' 시도 → N-2 윈도우 또 전부 훑기")}</div>
            <div>{t(E, "try 'c' → scan all N-2 windows AGAIN", "'c' 시도 → 또 전부 훑기")}</div>
            <div style={{ color: C.dim }}>{t(E, "... 26 times (a, b, c, ..., z)", "... 26 번 (a, b, c, ..., z)")}</div>
          </div>
          <div style={{ color: "#dc2626", fontWeight: 800, marginTop: 6 }}>pos = 1:</div>
          <div style={{ paddingLeft: 12, color: C.dim }}>
            <div>{t(E, "another 26 full scans...", "또 26 번 전체 훑기...")}</div>
          </div>
          <div style={{ color: "#dc2626", fontWeight: 800, marginTop: 6 }}>pos = 2, 3, ..., N-1:</div>
          <div style={{ paddingLeft: 12, color: C.dim }}>
            <div>{t(E, "same — 26 full scans per position", "동일 — 위치마다 26 번 전체 훑기")}</div>
          </div>
        </div>
        <div style={{ marginTop: 10, padding: "10px 12px", background: C.noBg, border: `1.5px solid ${C.noBd}`, borderRadius: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, color: C.no, textAlign: "center" }}>
          N <span style={{ fontWeight: 400 }}>positions</span> × 26 <span style={{ fontWeight: 400 }}>letters</span> × (N-2) <span style={{ fontWeight: 400 }}>windows</span> ≈ 26·N²
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.6 }}>
          {t(E, "The wasted work: 25 of the 26 trials at the SAME position keep re-counting the exact same far-away moos that didn't change.", "낭비가 생기는 곳이에요.\n같은 위치에서 26 번 넣어 보는데, 그중 25 번은 변하지도 않은 먼 곳의 moo 를 또 세고 있어요.")}
        </div>
      </div>),
    },
    // 브루트 코드 — 섹션 1 개 = 페이지 1 개 (라이브 수업 흐름)
    ...getMooBruteSections(E).map((sec, i, arr) => ({
      type: "code-section",
      narr: i === 0
        ? t(E,
            `Brute force code — walk through ${arr.length} parts. Notice how the inner loop calls count_all 26N times — that's the TLE source.`,
            `브루트포스 코드예요 — ${arr.length} 부분으로 나눠서 따라가요. 안쪽 반복이 count_all 을 26N 번 부르는 게 TLE 원인이에요.`)
        : "",
      section: sec,
    })),
    { type: "reveal",
      narr: t(E, "104 seconds!\n😱 But remember from the simulator — changing 1 letter only affects 3 windows, not N.\nThere MUST be a better way!", "104초예요. 더 좋은 방법이 있을 거예요."),
      content: (<div style={{ fontSize: 13, textAlign: "center", padding: 8 }}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <div style={{ flex: 1, background: C.noBg, borderRadius: 12, padding: "14px 8px", border: `2px solid ${C.noBd}` }}>
            <div style={{ fontSize: 11, color: C.no, fontWeight: 700 }}>🐌 {t(E, "Brute", "브루트")}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.no, marginTop: 4 }}>O(26N²)</div>
            <div style={{ fontSize: 11, color: C.no, marginTop: 6 }}>N=20K → 104s 😱</div>
          </div>
          <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 12, padding: "14px 8px", border: "2px dashed #86efac" }}>
            <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 700 }}>⚡ {t(E, "Better way?", "더 좋은 방법은?")}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#16a34a", marginTop: 4 }}>???</div>
            <div style={{ fontSize: 11, color: "#16a34a", marginTop: 6 }}>{t(E, "Next tab! →", "다음 탭! →")}</div>
          </div>
        </div>
      </div>),
    },
  ];
}

export function makeMooCh4(E) {
  return [
    { type: "quiz",
      narr: t(E, "Remember from the simulator: changing 1 letter only affects nearby windows.", "1 글자를 바꾸면 근처 윈도우 3 개만 영향을 받아요."),
      question: t(E, "1 letter sits in at most how many 3-letter windows?", "1글자가 들어가는 3글자 윈도우는 많아야 몇 개일까요?"),
      options: ["1", "2", "3", "N"], correct: 2,
      explain: t(E, "3! It can be 1st, 2nd, or 3rd character of a window. Not N — just 3!", "3개예요.\n윈도우의 1번째, 2번째, 3번째 자리에 올 수 있으니까요.\nN개가 아니라 딱 3개예요!"),
    },
    { type: "reveal",
      narr: t(E, "So here's the big idea: count ALL moos in the original string FIRST.\nThen when we try a change, only update the 3 affected windows!", "큰 아이디어예요.\n원래 문자열에 있는 moo 를 먼저 다 세어 둬요.\n그다음 글자를 바꿀 때는 영향받는 3개 윈도우만 고쳐요."),
      content: (<div style={{ padding: 16 }}>
        <div style={{ background: "#ede9fe", border: "2px solid #c4b5fd", borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.accent, marginBottom: 10 }}>{t(E, "The Smart Approach 💡", "똑똑한 접근 💡")}</div>
          <div style={{ fontSize: 13, lineHeight: 2.2, color: C.text }}>
            <div>① {t(E, "Pre-count all moos in original string", "원본의 모든 moo 미리 세기")}</div>
            <div>② {t(E, "For each position: REMOVE that position's 3 windows", "각 위치에서 그 위치의 3개 윈도우 빼기")}</div>
            <div>③ {t(E, "Try 26 letters: temporarily add new windows & check", "26글자를 넣어 보며 임시로 새 윈도우 더하고 확인")}</div>
            <div>④ {t(E, "RESTORE original windows", "원래 윈도우 복원")}</div>
          </div>
        </div>
      </div>),
    },
    { type: "reveal",
      narr: t(E, "Think of it like a puzzle!\nTake out the piece, try new pieces, put the original back.\nWe call it 'Remove → Try → Restore'.", "빼기 → 넣어 보기 → 되돌리기. 퍼즐 조각처럼요."),
      content: (<div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          ["🔴", t(E, "REMOVE: take out 3 windows' moo counts", "빼기 — 3개 윈도우의 moo 개수를 빼요"), C.noBg, C.noBd, C.no],
          ["🟡", t(E, "TRY: for each of 26 letters, temporarily add & check ≥ F", "시도 — 26글자마다 임시로 더하고 ≥ F 인지 확인해요"), "#fffbeb", "#fde68a", "#92400e"],
          ["🟢", t(E, "RESTORE: put original moo counts back", "복원 — 원래 moo 개수를 다시 넣어요"), C.okBg, C.okBd, C.ok],
        ].map(([emoji, text, bg, bd, color], i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 12px", borderRadius: 10, background: bg, border: `1.5px solid ${bd}` }}>
            <span style={{ fontSize: 18 }}>{emoji}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color }}>{text}</span>
          </div>
        ))}
      </div>),
    },
    { type: "reveal",
      narr: t(E, "Let's trace it by hand — string = 'momoo', position 0 ('m').", "손으로 해 봐요. 'momoo' 의 0 번 자리예요."),
      content: (<div style={{ padding: 16 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", textAlign: "center", marginBottom: 12 }}>
          {["m","o","m","o","o"].map((ch,i) => (
            <span key={i} style={{ display: "inline-block", width: 28, height: 28, lineHeight: "28px", textAlign: "center", borderRadius: 6, margin: "0 2px", fontWeight: 800, background: i===0 ? "#fde68a" : "#f8f9fc", border: `2px solid ${i===0 ? "#f59e0b" : C.border}`, color: i===0 ? "#92400e" : C.text, fontSize: 14 }}>{ch}</span>
          ))}
          <div style={{ fontSize: 10, color: C.dimLight, marginTop: 4 }}>
            {["0","1","2","3","4"].map((n,i) => <span key={i} style={{ display: "inline-block", width: 32, textAlign: "center" }}>{n}</span>)}
          </div>
        </div>
        <div style={{ fontSize: 12, lineHeight: 2, color: C.dim }}>
          <div>🔴 {t(E, "REMOVE: window [0,1,2]='mom' → not moo → nothing to remove", "빼기 — 윈도우 [0,1,2]='mom' → moo 아님 → 뺄 게 없어요")}</div>
          <div>🟡 {t(E, "TRY 'a': window becomes 'aom' → not moo", "시도 'a': 윈도우가 'aom' → moo 아님")}</div>
          <div>🟡 {t(E, "TRY 'o': window becomes 'oom' → not moo (o=o, first=second!)", "시도 'o': 윈도우가 'oom' → moo 아님 (o=o, 첫째=둘째!)")}</div>
          <div>🟡 {t(E, "TRY 'z': window becomes 'zom' → not moo (o≠m)", "시도 'z': 윈도우가 'zom' → moo 아님 (o≠m)")}</div>
          <div>🟢 {t(E, "RESTORE: nothing was removed, nothing to restore!", "복원 — 뺀 게 없으니 복원할 것도 없어요!")}</div>
        </div>
      </div>),
    },
    // 4-NEW: 중간 위치 손-trace (3 windows 다 활성 — 가장자리와 대비)
    { type: "reveal",
      narr: t(E, "Now a middle position — all 3 windows active: string = 'mommoo', pos = 3 (the second 'm').", "이번엔 가운데 자리예요. 윈도우 3 개가 다 살아 있어요."),
      content: (<div style={{ padding: 16 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", textAlign: "center", marginBottom: 12 }}>
          {["m","o","m","m","o","o"].map((ch,i) => (
            <span key={i} style={{ display: "inline-block", width: 28, height: 28, lineHeight: "28px", textAlign: "center", borderRadius: 6, margin: "0 2px", fontWeight: 800, background: i===3 ? "#fde68a" : (i>=1 && i<=5) ? "#ede9fe" : "#f8f9fc", border: `2px solid ${i===3 ? "#f59e0b" : (i>=1 && i<=5) ? "#c4b5fd" : C.border}`, color: i===3 ? "#92400e" : C.text, fontSize: 14 }}>{ch}</span>
          ))}
          <div style={{ fontSize: 10, color: C.dimLight, marginTop: 4 }}>
            {["0","1","2","3","4","5"].map((n,i) => <span key={i} style={{ display: "inline-block", width: 32, textAlign: "center" }}>{n}</span>)}
          </div>
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.9, color: C.dim }}>
          <div style={{ color: C.no, fontWeight: 700 }}>🔴 REMOVE</div>
          <div>{t(E, "idx=1 → 'omm': o≠m, m=m → IS moo → mydict['omm'] -= 1", "idx=1 → 'omm': o≠m, m=m → moo 맞음 → mydict['omm'] -= 1")}</div>
          <div>{t(E, "idx=2 → 'mmo': m=m → not moo → skip", "idx=2 → 'mmo': m=m → moo 아님 → 패스")}</div>
          <div>{t(E, "idx=3 → 'moo': m≠o, o=o → IS moo → mydict['moo'] -= 1", "idx=3 → 'moo': m≠o, o=o → moo 맞음 → mydict['moo'] -= 1")}</div>

          <div style={{ color: "#92400e", fontWeight: 700, marginTop: 6 }}>🟡 TRY {t(E, "— just watch ONE letter, 'a'", "— 한 글자 'a' 만 봐요")}</div>
          <div>{t(E, "3 windows become → 'oma' (no), 'mao' (no), 'aoo' (YES! a≠o, o=o)", "3 윈도우가 → 'oma' (X), 'mao' (X), 'aoo' (O! a≠o, o=o)")}</div>
          <div style={{ paddingLeft: 14, color: C.accent, fontWeight: 600 }}>{t(E, "→ mydict['aoo'] +=1 → check ≥ F → -=1", "→ mydict['aoo'] +=1 → ≥ F 확인 → -=1")}</div>

          <div style={{ color: C.ok, fontWeight: 700, marginTop: 6 }}>🟢 RESTORE</div>
          <div>{t(E, "mydict['omm'] += 1, mydict['moo'] += 1 → counter is exactly as it was", "mydict['omm'] += 1, mydict['moo'] += 1 → 세던 값이 시작 전과 똑같아져요")}</div>
        </div>
        <div style={{ marginTop: 10, padding: "8px 12px", background: "#ede9fe", border: "1.5px solid #c4b5fd", borderRadius: 8, fontSize: 11, color: "#5b21b6", textAlign: "center", fontWeight: 600 }}>
          {t(E, "Notice: only windows [1,2,3], [2,3,4], [3,4,5] are touched. 'mo' at [0,1] never moves.", "[1,2,3], [2,3,4], [3,4,5] 만 건드려요.\n[0,1] 의 'mo' 는 절대 안 움직여요.")}
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: C.dim, textAlign: "center" }}>
          {t(E, "The other 25 letters work the same way — play through all of them in the next step's simulator. 👇", "나머지 25 글자도 똑같아요 — 다음 스텝 시뮬레이터에서 전부 직접 돌려봐요. 👇")}
        </div>
      </div>),
    },
    { type: "mooRTR",
      narr: t(E, "Now play with it — pick a position, click ▶ Step, and watch mydict change as we remove, try, and restore.", "직접 해 봐요! 글자를 눌러 바꾸면 moo 가 어떻게 변할까요?"),
    },
    { type: "quiz",
      narr: t(E, "Important: when trying letter 'c', we add its contribution (+1), check the counter, then IMMEDIATELY undo it (-1).\nWhy can't we just leave it?", "글자 'c' 를 넣어 볼 때는 이렇게 해요.\n먼저 +1 을 더하고, 세던 값을 확인하고, 바로 -1 로 되돌려요.\n왜 그냥 놔두면 안 될까요?"),
      question: t(E, "Why must we undo each trial immediately?", "왜 각 시도를 바로 되돌려야 해요?"),
      options: [
        t(E, "Next trial letter needs a clean state — without previous trial's counts!", "다음 글자를 넣어 볼 때 깨끗한 상태여야 하니까요 — 앞 시도의 개수가 남으면 안 돼요"),
        t(E, "To save memory", "메모리를 아끼려고"),
      ], correct: 0,
      explain: t(E, "Exactly! If we try 'a' and don't undo, then trying 'b' would still have 'a's counts mixed in! Each of 26 trials must start from the same clean state. 🐛", "맞아요!\n'a' 를 넣어 보고 안 되돌리면 'b' 를 넣을 때 'a' 의 개수가 섞여요.\n26번 시도가 모두 똑같이 깨끗한 상태에서 시작해야 해요. 🐛"),
    },
    { type: "quiz",
      narr: t(E, "Now let's see how fast this is — brute vs smart, side by side.", "이제 얼마나 빨라졌는지 봐요."),
      question: "O(78N) vs O(26N²), N=20,000?",
      options: [
        t(E, "About 2× faster", "약 2배"),
        t(E, "About N/3 ≈ 6,667× faster!", "약 N/3 ≈ 6,667배!"),
        t(E, "Same speed", "같은 속도"),
      ], correct: 1,
      explain: t(E, "~6,667×! From scanning N windows to just 3. That's the power of local updates! 104 seconds → 0.016 seconds! ⚡", "약 6,667배예요!\nN개 윈도우 대신 3개만 보니까요.\n바뀐 곳만 고치는 힘이에요. 104초가 0.016초로! ⚡"),
    },
    { type: "reveal",
      narr: t(E, "The whole algorithm in one picture:", "알고리즘 전체를 한 그림으로 봐요."),
      content: (<div style={{ background: C.card, borderRadius: 14, padding: 16, border: "2px solid #7c5cfc" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#7c5cfc", marginBottom: 10 }}>{t(E, "Remove → Try → Restore 🎯", "빼기 → 시도 → 복원 🎯")}</div>
        <div style={{ fontSize: 13, lineHeight: 2.2, color: C.text }}>
          <div>① {t(E, "Pre-count all moos in original", "원본 moo 전부 미리 세기")}</div>
          <div>② {t(E, "For each position:", "각 위치에서")}</div>
          <div style={{ paddingLeft: 16 }}>
            <div>🔴 {t(E, "Remove 3 windows", "3개 윈도우 빼기")}</div>
            <div>🟡 {t(E, "Try 26 letters × 3 windows (+1, check, -1)", "26글자 × 3윈도우 (+1, 확인, -1)")}</div>
            <div>🟢 {t(E, "Restore 3 windows", "3개 윈도우 복원")}</div>
          </div>
        </div>
        <div style={{ marginTop: 10, padding: "8px 12px", background: C.okBg, borderRadius: 8, fontWeight: 800, color: C.ok, textAlign: "center", fontSize: 13 }}>
          {t(E, "O(78N) — blazing fast! ⚡", "O(78N) — 번개처럼 빨라요! ⚡")}
        </div>
      </div>),
    },
  ];
}

export function makeMooCh5(E, lang = "py") {
  return [
    // 5-1: 자료구조 비유 + 언어별 도구
    { type: "reveal",
      narr: lang === "cpp"
        ? t(E,
            "We need to store moo counts — like a notebook.\nC++ uses std::map<string, int> for this — clean syntax for keyed counters.",
            "moo 개수를 어딘가에 적어 둬야 해요 — 공책처럼요.\nC++ 은 std::map<string, int> 를 써요.\n이름마다 개수를 따로 세기에 딱 좋아요.")
        : t(E,
            "We need to store moo counts — like a notebook.\n'moo' appears 3 times?\nWrite it down!\nPython has defaultdict(int) for this — it auto-starts at 0.",
            "moo 개수를 어딘가에 적어 둬야 해요 — 공책처럼요.\n'moo' 가 3번 나왔으면 3 이라고 적어 두는 거예요.\nPython 에는 defaultdict(int) 가 있어요 — 처음부터 0 으로 시작해요."),
      content: (<div style={{ padding: 12 }}>
        <MiniCode lang={lang} lines={lang === "cpp"
          ? [
              "#include <map>",
              "#include <string>",
              "using namespace std;",
              "",
              "map<string, int> mydict;",
              "// mydict[\"moo\"] auto-inits to 0",
              "mydict[\"moo\"] += 1;",
              "// mydict[\"moo\"] is now 1",
            ]
          : [
              "from collections import defaultdict",
              "",
              "mydict = defaultdict(int)",
              "# mydict['moo'] → auto 0!",
              "mydict['moo'] += 1",
              "# mydict['moo'] → now 1!",
            ]}
        />
      </div>),
    },
    // 5-2: Python-specific quiz — C++ 에선 생략 (C++ string 은 변경 가능해서 무의미)
    ...(lang === "cpp" ? [] : [{ type: "quiz",
      narr: t(E, "The code uses `string = list(input())` instead of just `input()`.\nWhy not keep it as a string?",
                  "코드에서 `string = list(input())`을 써요. 그냥 문자열로 쓰면 안 돼요?"),
      question: t(E, "Why list(input())?", "왜 list(input()) 로 감쌀까요?"),
      options: [
        t(E, "Python strings can't be changed! 'abc'[1]='x' gives an error. Lists allow it.",
              "Python 문자열은 바꿀 수 없어요. 'abc'[1]='x' 는 에러가 나요. 리스트는 바꿀 수 있어요."),
        t(E, "It's faster", "빨라서"),
      ], correct: 0,
      explain: t(E,
        "Try it: 'abc'[1]='x' → TypeError! But ['a','b','c'][1]='x' works perfectly. We need to swap characters, so we need a list.",
        "'abc'[1]='x' 는 TypeError 예요.\n하지만 ['a','b','c'][1]='x' 는 잘 돼요.\n글자를 바꿔야 하니까 리스트가 필요해요."),
    }]),
    // 5-3: window range — 언어 중립 (인덱스 산수)
    { type: "quiz",
      narr: t(E, "The window range: minIndex = max(pos-2, 0), maxIndex = min(n-3, pos).\nFor pos=3, N=10: indices [1, 2, 3].\nLet's verify each window contains pos=3.",
                  "이 자리가 들어가는 윈도우만 골라내요 (pos=3, N=10 기준)."),
      question: t(E, "idx=1→[1,2,3], idx=2→[2,3,4], idx=3→[3,4,5]. All contain pos=3?",
                      "idx=1→[1,2,3], idx=2→[2,3,4], idx=3→[3,4,5]. 전부 pos=3 을 품고 있을까요?"),
      options: [
        t(E, "Yes! Each window covers pos=3 in a different position", "맞아요 — 윈도우마다 pos=3 이 다른 자리에 들어 있어요"),
        t(E, "No, should be indices [1, 4]", "아니에요 — [1, 4] 범위여야 해요"),
      ], correct: 0,
      explain: t(E,
        "Correct! idx=1: pos=3 is the 3rd letter. idx=2: the 2nd. idx=3: the 1st. All 3 windows include pos=3.",
        "맞아요.\nidx=1 에서는 pos=3 이 3번째, idx=2 에서는 2번째, idx=3 에서는 1번째예요.\n윈도우 3 개 모두 pos=3 을 품고 있어요."),
    },
    // 5-4: Python slicing quiz — C++ 에선 생략 (slicing 개념 달라서 별도 설명 필요)
    ...(lang === "cpp" ? [] : [{ type: "quiz",
      narr: t(E, "Tricky line: `t[pos - idx] = c`.",
                  "까다로운 줄이 하나 있어요."),
      question: t(E, "idx=1, pos=3: t[pos-idx] = t[?]", "idx=1, pos=3: t[pos-idx] = t[?]"),
      options: ["t[2]", "t[3]", "t[1]"], correct: 0,
      explain: t(E,
        "t[3-1] = t[2]! The window starts at idx=1, so pos=3 is at offset 2 (the 3rd letter of the window).",
        "t[3-1] = t[2] 예요.\n윈도우가 idx=1 에서 시작하니까 pos=3 은 두 칸 뒤, 윈도우의 3 번째 글자예요."),
    }]),
    // 5-5: +1 → check → -1 (언어별 코드)
    { type: "reveal",
      narr: t(E, "The cleverest part of the code: +1 → check → -1.",
                  "코드에서 제일 영리한 부분이에요. 더하고, 보고, 되돌려요."),
      content: (<div style={{ padding: 12 }}>
        <MiniCode lang={lang} lines={lang === "cpp"
          ? [
              "mydict[key] += 1;        // temporarily add",
              "if (mydict[key] >= f) {  // crosses threshold?",
              "    result.insert(key);  // yes → save it!",
              "}",
              "mydict[key] -= 1;        // immediately undo",
            ]
          : [
              "mydict[key] += 1        # temporarily add",
              "if mydict[key] >= f:    # crosses threshold?",
              "  result.add(key)       # yes → save it!",
              "mydict[key] -= 1        # immediately undo",
            ]} />
        <div style={{ marginTop: 8, fontSize: 12, color: C.accent, fontWeight: 700, textAlign: "center" }}>+1 → check → -1 = {t(E, "clean state for next trial!", "다음 시도를 위한 깨끗한 상태!")} ✨</div>
      </div>),
    },
    // 메인 코드 — 섹션 1 개 = 페이지 1 개 (라이브 수업 흐름)
    ...getMooSections(E).map((sec, i, arr) => ({
      type: "code-section",
      narr: i === 0
        ? t(E,
            `Walk through the smart solution one part at a time (${arr.length} pages). Toggle Python ↔ C++ via the header. Save as PDF for later.`,
            `제일 좋은 풀이를 한 부분씩 따라가요 (총 ${arr.length} 페이지). 위 헤더에서 Python ↔ C++ 을 바꿔 볼 수 있어요. PDF 로 저장할 수도 있어요.`)
        : "",
      section: sec,
    })),
    // 5-NEW: 왜 sorted(result) + distinct
    { type: "reveal",
      narr: lang === "cpp"
        ? t(E, "Last detail: the output format.\nThe judge expects DISTINCT moos in ALPHABETICAL order.\nC++ set<string> handles both for free — it dedupes AND iterates sorted.\nWe just print result.size() then iterate.",
              "마지막으로 출력 형식이에요.\n채점기는 서로 다른 moo 들을 알파벳순으로 내놓으라고 해요.\nC++ set<string> 은 둘 다 알아서 해 줘요 — 중복을 없애고 알파벳순으로 하나씩 꺼내요.\nresult.size() 를 출력한 뒤 그냥 하나씩 꺼내면 돼요.")
        : t(E, "Last detail: the output format.\nThe judge expects DISTINCT moos in ALPHABETICAL order.\nresult is a Python set → already distinct, but in RANDOM order!\nSo we MUST call sorted(result) before printing.",
              "마지막으로 출력 형식이에요.\n채점기는 서로 다른 moo 들을 알파벳순으로 내놓으라고 해요.\nresult 는 Python set 이라 중복은 없지만 순서가 뒤죽박죽이에요.\n그래서 print 하기 전에 반드시 sorted(result) 를 불러야 해요."),
      content: (<div style={{ padding: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ background: C.noBg, border: `2px solid ${C.noBd}`, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.no, marginBottom: 4 }}>{t(E, "❌ Without sort", "❌ 정렬 없이")}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text, lineHeight: 1.7 }}>
              <div>3</div>
              <div>moo</div>
              <div>baa</div>
              <div>tee</div>
              <div style={{ color: C.no, fontSize: 10, marginTop: 4 }}>{t(E, "→ WA (wrong order)", "→ WA (순서 틀림)")}</div>
            </div>
          </div>
          <div style={{ background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.ok, marginBottom: 4 }}>{t(E, "✅ Sorted", "✅ 정렬됨")}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text, lineHeight: 1.7 }}>
              <div>3</div>
              <div>baa</div>
              <div>moo</div>
              <div>tee</div>
              <div style={{ color: C.ok, fontSize: 10, marginTop: 4 }}>{t(E, "→ AC", "→ AC")}</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 10, padding: "10px 12px", background: "#0f172a", borderRadius: 10, color: "#f8fafc", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.8 }}>
          {lang === "cpp" ? (<>
            <div><span style={{ color: "#c084fc" }}>cout</span> &lt;&lt; result.size() &lt;&lt; <span style={{ color: "#34d399" }}>"\n"</span>;</div>
            <div><span style={{ color: "#c084fc" }}>for</span> (<span style={{ color: "#c084fc" }}>auto</span>&amp; m : result)</div>
            <div>  <span style={{ color: "#c084fc" }}>cout</span> &lt;&lt; m &lt;&lt; <span style={{ color: "#34d399" }}>"\n"</span>;</div>
            <div style={{ color: "#94a3b8", fontSize: 10, marginTop: 4 }}>{t(E, "// set iterates alphabetically — no sort needed", "// set 은 알파벳순 순회 — 정렬 불필요")}</div>
          </>) : (<>
            <div>result = <span style={{ color: "#fbbf24" }}>sorted</span>(result)</div>
            <div><span style={{ color: "#c084fc" }}>print</span>(<span style={{ color: "#fbbf24" }}>len</span>(result))</div>
            <div><span style={{ color: "#c084fc" }}>print</span>(<span style={{ color: "#34d399" }}>'\n'</span>.join(result))</div>
            <div style={{ color: "#94a3b8", fontSize: 10, marginTop: 4 }}>{t(E, "# set has no order — sorted() makes a list", "# set 은 순서 없음 — sorted() 로 리스트 만듦")}</div>
          </>)}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center" }}>
          {t(E, "Distinct: result is a set, so duplicate moos found via different positions count once.", "result 는 set 이라 다른 위치에서 같은 moo 가 나와도 1 번만 세어요.")}
        </div>
      </div>),
    },
    { type: "reveal",
      narr: t(E, "That's it!\nThe whole insight: don't rescan everything — only update the 3 windows that actually changed.\nRemove → Try → Restore!\n🎉", "이게 전부예요!\n핵심은 이거예요 — 전부 다시 훑지 말고 실제로 바뀐 3개 윈도우만 고쳐요.\n빼기 → 시도 → 복원! 🎉"),
      content: (<div style={{ textAlign: "center", padding: 8 }}>
        <div style={{ background: "linear-gradient(135deg,#4f46e5,#7c5cfc)", borderRadius: 14, padding: "20px 16px" }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", lineHeight: 1.6 }}>
            {t(E, "Don't rescan everything —", "전부 다시 훑지 말고 —")}<br/>{t(E, "only update what changed!", "바뀐 것만 고쳐요!")}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginTop: 8 }}>🐌 O(26N²) → ⚡ O(78N)</div>
        </div>
      </div>),
    },
  ];
}
