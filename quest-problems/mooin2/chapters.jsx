import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { getMooin2Sections, MooinExplorer, MooinDeepAudit } from "./components";
import { MooinBruteRunner, MooinCountTrace } from "./sims";

/* ════════════════════════════════════════════════════════════════════
   Ch1 — Understand the problem (도입 / 기)
   ════════════════════════════════════════════════════════════════════ */
export function makeMooin2Ch1(E) {
  return [
    /* 1-1 — Hook. */
    {
      type: "reveal",
      narr: t(E,
        "Farmer John recorded his cows. He wants to know how many different 'moo' sounds happened during the day — let's help him count! 🐄",
        "농부 존이 소들을 녹음했어요. 하루 동안 서로 다른 'moo' 소리가 몇 번 났는지 알고 싶대요 — 세는 걸 도와줘요! 🐄"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>🐄</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#ea580c" }}>It's Mooin' Time II</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4, marginBottom: 14 }}>USACO Jan 2025 Bronze #2</div>
          <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 12, padding: "14px 16px", fontSize: 14, color: "#9a3412", lineHeight: 1.7, textAlign: "left", maxWidth: 460, margin: "0 auto" }}>
            <div>
              {t(E, "The cows make sounds that look like numbers.",
                    "소들이 숫자처럼 보이는 소리를 내요.")}
            </div>
            <div style={{ marginTop: 8 }}>
              {t(E, "A special pattern — a number, then another number twice — is called a ",
                    "특별한 패턴 — 한 숫자, 그다음 다른 숫자가 두 번 — 을 ")}
              <b>moo</b>{t(E, ".", " 라고 불러요.")}
            </div>
            <div style={{ marginTop: 10, fontSize: 13 }}>
              {t(E, "Our job: count how many DIFFERENT moos can be heard. Let's first figure out exactly what a moo is. 👇",
                    "우리 일: 서로 다른 moo 가 몇 개 들리는지 세기. 먼저 moo 가 정확히 뭔지부터 알아봐요. 👇")}
            </div>
          </div>
        </div>),
    },

    /* 1-2 — What's a moo. */
    {
      type: "reveal",
      narr: t(E,
        "A 'moo' is 3 numbers: (x, y, y). The last two are the SAME, and the first is DIFFERENT — like a cow: one sound, then the same sound twice!",
        "'moo' 는 숫자 3개: (x, y, y). 뒤 둘은 같고, 첫째는 달라요 — 소처럼 한 소리, 그다음 같은 소리 두 번!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", border: "1.5px solid #fdba74", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: C.text, lineHeight: 1.7, marginBottom: 12 }}>
            <div style={{ fontWeight: 700, color: "#9a3412", marginBottom: 6 }}>
              {t(E, "What's a moo?", "moo 가 뭐예요?")}
            </div>
            {t(E, "A moo is 3 numbers ", "moo 는 숫자 3개 ")}<b>(x, y, y)</b>
            {t(E, " — the second and third are EQUAL, but the first is DIFFERENT.",
                  " — 둘째와 셋째는 같고, 첫째는 달라요.")}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "1 1 160px", background: "#dcfce7", border: "1.5px solid #16a34a", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>✅ {t(E, "These ARE moos", "이건 moo 맞음")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#166534", lineHeight: 1.9 }}>
                (1, 4, 4)<br/>(3, 7, 7)<br/>(2, 5, 5)
              </div>
            </div>
            <div style={{ flex: "1 1 160px", background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#991b1b", marginBottom: 6 }}>❌ {t(E, "These are NOT", "이건 아님")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#991b1b", lineHeight: 1.9 }}>
                (4, 4, 4) <span style={{ fontSize: 10 }}>{t(E, "all same", "다 같음")}</span><br/>
                (1, 4, 7) <span style={{ fontSize: 10 }}>{t(E, "last two differ", "뒤 둘 다름")}</span>
              </div>
            </div>
          </div>
        </div>),
    },

    /* 1-3 — moo quiz. */
    {
      type: "quiz",
      narr: t(E, "Quick check! Remember: first DIFFERENT, last two SAME.", "퀴즈! 기억해요: 첫째는 다르게, 뒤 둘은 같게."),
      question: t(E, "Which one is a valid moo?", "어떤 게 유효한 moo 일까요?"),
      options: ["(5, 5, 5)", "(2, 9, 9)", "(2, 9, 3)"],
      correct: 1,
      explain: t(E,
        "(2, 9, 9): first (2) is different, last two (9, 9) are the same. ✅  (5,5,5) is all-same; (2,9,3) has different last two.",
        "(2, 9, 9): 첫째(2)는 다르고 뒤 둘(9, 9)은 같음. ✅  (5,5,5)는 전부 같고, (2,9,3)은 뒤 둘이 다름."),
    },

    /* 1-4 — "occurs" = subsequence. */
    {
      type: "reveal",
      narr: t(E,
        "A moo 'occurs' in the array if we can find the 3 numbers in ORDER — left to right — even with gaps in between.",
        "moo 가 배열에서 '발생'한다는 건, 그 숫자 3개를 왼→오 순서로 찾을 수 있다는 뜻 — 사이를 건너뛰어도 돼요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eef6ff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: "#1e3a8a", lineHeight: 1.7, marginBottom: 12 }}>
            {t(E, "Moo (x, y, y) ", "moo (x, y, y) 가 ")}<b>{t(E, "occurs", "발생")}</b>
            {t(E,
              " if, scanning left to right, you can find x → y → y in order — and gaps in between are totally fine!",
              " 한다는 건, 왼쪽부터 오른쪽으로 보면서 x → y → y 를 순서대로 찾을 수 있다는 뜻이에요 — 사이를 건너뛰어도 괜찮아요!")}
            <div style={{ marginTop: 8, fontSize: 12.5, color: "#3b5bdb" }}>
              {t(E,
                "Picking items in order while skipping some is called a ",
                "이렇게 순서는 지키되 사이를 건너뛰며 고르는 걸 ")}
              <b>{t(E, "subsequence", "부분수열")}</b>
              {t(E, ". In position form: i < j < k with a[i]=x, a[j]=y, a[k]=y.",
                    " 이라고 불러요. 자리로 쓰면 i < j < k 에서 a[i]=x, a[j]=y, a[k]=y.")}
            </div>
          </div>
          <div style={{ textAlign: "center", marginBottom: 8, fontSize: 12, color: "#9a3412", fontWeight: 700 }}>
            a = [1, 2, 3, 4, 4, 4] → {t(E, "find (1, 4, 4):", "(1, 4, 4) 찾기:")}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 6 }}>
            {[1, 2, 3, 4, 4, 4].map((v, i) => {
              const pick = i === 0 || i === 3 || i === 5;
              const role = i === 0 ? "x" : i === 3 ? "y" : i === 5 ? "y" : "";
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <div style={{
                    width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 8, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", fontSize: 15,
                    background: pick ? "#ea580c" : "#fff", color: pick ? "#fff" : "#cbd5e1",
                    border: `2px solid ${pick ? "#ea580c" : C.border}`,
                  }}>{v}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#ea580c", height: 14 }}>{role}</div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", fontSize: 12, color: C.dim }}>
            {t(E, "Pick index 0 (=1), 3 (=4), 5 (=4). Skipping 2 and 3 is fine!",
                  "인덱스 0(=1), 3(=4), 5(=4) 선택. 2, 3 건너뛰어도 괜찮아요!")}
          </div>
        </div>),
    },

    /* 1-5 — Sample I/O + the goal (distinct). */
    {
      type: "reveal",
      narr: t(E,
        "Two moos count as the SAME if their (x, y) pair is the same — we count DISTINCT (x, y) pairs. Here's the official sample.",
        "두 moo 의 (x, y) 쌍이 같으면 같은 걸로 쳐요. 서로 다른 (x, y) 쌍을 세는 거예요. 공식 샘플을 볼까요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>{`6
1 2 3 4 4 4`}</div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#166534" }}>3</div>
            </div>
          </div>
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: 12, fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
            {t(E, "The 3 distinct moos here are ", "여기서 서로 다른 moo 3 개는 ")}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>(1,4,4)</code>{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>(2,4,4)</code>{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>(3,4,4)</code>
            {t(E, " — all use the (4, 4) pair, with three different x's.",
                  " — 모두 (4, 4) 짝을 쓰고, x 만 세 가지로 달라요.")}
          </div>
          <div style={{ marginTop: 10, padding: "8px 10px", background: "#ecfdf5", border: "1px dashed #6ee7b7", borderRadius: 8, fontSize: 11.5, color: "#065f46", lineHeight: 1.6 }}>
            📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 10⁶</code>,{" "}
            <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ a[i] ≤ N</code>{" "}
            {t(E, "(answer can be big — 64-bit in C++).", "(답이 클 수 있음 — C++ 는 64-bit).")}
          </div>
        </div>),
    },

    /* 1-6 — input quiz. */
    {
      type: "input",
      narr: t(E,
        "Your turn! Walk through a = [1, 2, 2] by hand. Which value can be the (y, y) pair, and who can be x before it?",
        "직접! a = [1, 2, 2] 를 손으로 따라가요. 어떤 값이 (y, y) 짝이 되고, 그 앞에 x 로 올 수 있는 값은?"),
      question: t(E, "How many distinct moos occur in [1, 2, 2]?", "[1, 2, 2] 의 서로 다른 moo 개수?"),
      hint: t(E, "Only 2 appears twice → y = 2. Before the (2,2) pair, the value 1 sits → x = 1. So (1, 2, 2).",
                 "2 만 두 번 나옴 → y = 2. (2,2) 짝 앞에 값 1 → x = 1. 그래서 (1, 2, 2)."),
      answer: 1,
    },
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Ch2 — First idea & its limit (승 / 전)
   ════════════════════════════════════════════════════════════════════ */
export function makeMooin2Ch2(E, lang = "py") {
  const isCpp = lang === "cpp";
  // Brute split into 3 build-up pieces (read → loops → check) so the code
  // is never dumped all at once.
  const bruteReadPy = [
    "import sys",
    "data = sys.stdin.read().split()",
    "N = int(data[0])",
    "a = [int(data[1 + i]) for i in range(N)]",
  ];
  const bruteLoopPy = [
    "seen = set()                       # distinct (x, y) moos",
    "for i in range(N):                 # x is at i",
    "    for j in range(i + 1, N):      # first y at j",
    "        for k in range(j + 1, N):  # second y at k",
  ];
  const bruteBodyPy = [
    "            if a[j] == a[k] and a[i] != a[j]:",
    "                seen.add((a[i], a[j]))",
    "print(len(seen))",
  ];
  const bruteReadCpp = [
    "#include <bits/stdc++.h>",
    "using namespace std;",
    "int main() {",
    "    int N; cin >> N;",
    "    vector<int> a(N);",
    "    for (int& x : a) cin >> x;",
  ];
  const bruteLoopCpp = [
    "    set<pair<int,int>> seen;                // distinct (x, y) moos",
    "    for (int i = 0; i < N; i++)             // x at i",
    "        for (int j = i + 1; j < N; j++)     // first y at j",
    "            for (int k = j + 1; k < N; k++) // second y at k",
  ];
  const bruteBodyCpp = [
    "                if (a[j] == a[k] && a[i] != a[j])",
    "                    seen.insert({a[i], a[j]});",
    "    cout << seen.size() << endl;",
    "}",
  ];

  return [
    /* 2-1 — first idea */
    {
      type: "reveal",
      narr: t(E,
        "Before any clever trick — what's the most OBVIOUS way? Just try every possible moo and collect the ones that fit.",
        "영리한 트릭 전에 — 가장 뻔한 방법은? 가능한 moo 를 전부 시도해서 맞는 것만 모으면 돼요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#0891b2", textAlign: "center", marginBottom: 10 }}>
            🐢 {t(E, "First idea: try EVERY triple", "첫 아이디어: 모든 삼중을 다 해보기")}
          </div>
          <div style={{ background: "#ecfeff", border: "1.5px solid #67e8f9", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: "#155e75", lineHeight: 1.7 }}>
            <div style={{ marginBottom: 9 }}>
              {t(E,
                "A moo is 3 spots: a front value (x), then the SAME value twice after it (y, y). So just try them all:",
                "moo 는 자리 3개예요: 앞 칸 하나(x), 그 뒤에 같은 값 두 개(y, y). 그러니 그냥 다 해봐요:")}
            </div>
            {[
              t(E, "Pick a front value → that's the x.", "앞 칸 하나 고르기 → 이게 x."),
              t(E, "Pick two spots after it → the (y, y) pair.", "그 뒤에서 두 칸 고르기 → 여기가 y, y 자리."),
              t(E, "Check: are the back two the SAME? and is the front DIFFERENT?", "확인: 뒤 두 칸이 같아? 그리고 첫 칸은 달라?"),
              t(E, "If yes → it's a moo! Put its (x, y) into a set.", "맞으면 → moo! 그 (x, y) 를 집합에 넣기."),
            ].map((line, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                <span style={{ fontWeight: 800, color: "#0891b2", flexShrink: 0 }}>{i + 1}.</span>
                <span>{line}</span>
              </div>
            ))}
            <div style={{ marginTop: 9, padding: "8px 10px", background: "#fff", border: "1px dashed #67e8f9", borderRadius: 8 }}>
              💡 {t(E, "A set throws away duplicates automatically — so its final size IS the number of DISTINCT moos.",
                       "집합(set)은 중복을 알아서 버려요 — 그래서 마지막 크기가 곧 서로 다른 moo 개수예요.")}
            </div>
          </div>
        </div>),
    },
    /* 2-2 — brute code, piece 1: read input */
    {
      type: "reveal",
      narr: t(E,
        "Let's write it one piece at a time. Piece 1: read N, then the N numbers into the list a.",
        "코드를 한 조각씩 써요. 1조각: N 을 읽고, 그다음 숫자 N 개를 리스트 a 로."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0891b2", marginBottom: 8 }}>
            🐢 {t(E, "Brute — piece 1: read the input", "브루트 — 1조각: 입력 읽기")}
          </div>
          <CodeBlock lines={isCpp ? bruteReadCpp : bruteReadPy} lang={isCpp ? "cpp" : "py"} />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E, "Nothing clever yet — just get the numbers into a so we can look at them.",
                  "아직 영리한 건 없어요 — 그냥 숫자를 a 에 담아 들여다볼 준비.")}
          </div>
        </div>),
    },
    /* 2-2 — brute code, piece 2: the three loops */
    {
      type: "reveal",
      narr: t(E,
        "Piece 2: a moo is 3 positions i < j < k. So loop all three — every i, every j after it, every k after that.",
        "2조각: moo 는 위치 3개 i < j < k. 그러니 셋 다 돌려요 — 모든 i, 그 뒤 모든 j, 또 그 뒤 모든 k."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0891b2", marginBottom: 8 }}>
            🐢 {t(E, "Brute — piece 2: three nested loops", "브루트 — 2조각: 3중 반복")}
          </div>
          <CodeBlock lines={isCpp ? bruteLoopCpp : bruteLoopPy} lang={isCpp ? "cpp" : "py"} />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E, "seen is a set — it auto-drops duplicates, so its size will be the count of DISTINCT moos.",
                  "seen 은 집합 — 중복을 알아서 버려요. 그래서 크기가 곧 서로 다른 moo 개수가 돼요.")}
          </div>
        </div>),
    },
    /* 2-2 — brute code, piece 3: keep the ones that fit + print */
    {
      type: "reveal",
      narr: t(E,
        "Piece 3: inside, keep only real moos — a[j] = a[k] (the y-pair) and a[i] ≠ a[j] (a real x). Then print how many distinct ones we found.",
        "3조각: 안에서 진짜 moo 만 남겨요 — a[j] = a[k] (y 짝) 이고 a[i] ≠ a[j] (진짜 x). 그다음 서로 다른 개수를 출력."),
      content: (
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0891b2", marginBottom: 8 }}>
            🐢 {t(E, "Brute — piece 3: check & count", "브루트 — 3조각: 판정 후 집계")}
          </div>
          <CodeBlock lines={isCpp ? bruteBodyCpp : bruteBodyPy} lang={isCpp ? "cpp" : "py"} />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E, "Correct and easy to read. Now the big question: how fast is it?",
                  "맞고 읽기도 쉬워요. 이제 큰 질문: 얼마나 빠를까요?")}
          </div>
        </div>),
    },
    /* 2-3 — RUN it (feel the pain) */
    {
      type: "bruteRunner",
      narr: t(E,
        "Let's RUN it. N = 40 finishes instantly — then jump to N = 2000 🐌 and watch it actually crawl. Hit Stop whenever you've felt enough!",
        "직접 돌려봐요. N = 40 은 순식간 — 그다음 N = 2000 🐌 로 올리면 진짜로 기어가는 걸 봐요. 충분히 느꼈으면 Stop 눌러요!"),
    },
    /* 2-4 — the limit */
    {
      type: "reveal",
      narr: t(E,
        "Did you feel it? Three nested loops means roughly N × N × N work. That number EXPLODES.",
        "느꼈어요? 3중 반복은 대략 N × N × N 만큼 일해요. 그 수가 폭발해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: "#991b1b", lineHeight: 1.75 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>🚧 {t(E, "Why brute force loses", "브루트포스가 지는 이유")}</div>
            {t(E, "Triples for N numbers ≈ N³ ÷ 6. Watch it grow:", "N 개 숫자의 삼중 ≈ N³ ÷ 6. 커지는 걸 봐요:")}
            <div style={{ marginTop: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.9 }}>
              N = 100 → ~160,000 {t(E, "triples (fine)", "삼중 (괜찮음)")}<br/>
              N = 10,000 → ~1.6 × 10¹¹ {t(E, "(slow)", "(느림)")}<br/>
              N = 1,000,000 → ~1.7 × 10¹⁷ {t(E, "(forever)", "(영원)")}
            </div>
            <div style={{ marginTop: 8, fontWeight: 700, color: "#7c2d12" }}>
              {t(E,
                "At a billion steps per second, N = 10⁶ would take ~30 YEARS. The time limit is ~2 seconds.",
                "1초에 10억 번 해도 N = 10⁶ 은 약 30년 걸려요. 제한 시간은 약 2초예요.")}
            </div>
          </div>
        </div>),
    },
    /* 2-6 — collapse to per-y count (the realization, now earned) */
    {
      type: "reveal",
      narr: t(E,
        "So: the answer is right, but we need a MUCH faster way to count it. Time to think smarter. 👉",
        "그래서: 답은 맞지만 훨씬 빠르게 세는 방법이 필요해요. 더 똑똑하게 생각할 시간. 👉"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 34, marginBottom: 8 }}>🐢 → 🚀</div>
          <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 12, padding: "14px 16px", fontSize: 14, color: "#9a3412", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>
            {t(E,
              "Key realization: we don't actually need to LOOK at every triple. For each repeated value y, we just need to know one thing — how many different x's can sit before y's pair. Let's build that next.",
              "핵심 깨달음: 사실 모든 삼중을 볼 필요가 없어요. 반복되는 값 y 마다 딱 하나만 알면 돼요 — y 의 짝 앞에 서로 다른 x 가 몇 개 올 수 있는가. 다음에 이걸 만들어요.")}
          </div>
        </div>),
    },
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Ch3 — The fast idea (전 → 결)
   ════════════════════════════════════════════════════════════════════ */
export function makeMooin2Ch3(E) {
  return [
    /* 3-1 — the recipe */
    {
      type: "reveal",
      narr: t(E,
        "The fast idea: don't check triples. For each value y that repeats, ask one question.",
        "빠른 아이디어: 삼중을 확인하지 말자. 반복되는 각 값 y 마다 질문 하나만 해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#ea580c", textAlign: "center", marginBottom: 10 }}>
            🚀 {t(E, "Faster idea: count per y", "빠른 아이디어: y 마다 세기")}
          </div>
          <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: "#9a3412", lineHeight: 1.75 }}>
            {t(E, "For each value y that appears at least twice:", "두 번 이상 나오는 각 값 y 에 대해:")}
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
              <div><b>1.</b> {t(E, "Find p = y's second-to-last spot (so two y's are still at/after p).", "p = y 의 '끝에서 두 번째' 자리 (그래야 p 부터 뒤로 y 가 2개).")}</div>
              <div><b>2.</b> {t(E, "Count how many DIFFERENT values appear before p. Each is a candidate x.", "p 앞에 서로 다른 값이 몇 개인지 세기. 각각이 x 후보.")}</div>
              <div><b>3.</b> {t(E, "Add that count to the answer.", "그 개수를 답에 더하기.")}</div>
            </div>
          </div>
        </div>),
    },
    /* 3-2 — why the latest j */
    {
      type: "reveal",
      narr: t(E,
        "Why y's SECOND-TO-LAST spot? A moo needs two y's after x — and everything before that spot still has two y's after it.",
        "왜 '끝에서 두 번째 y'? moo 는 x 뒤에 y 가 2개 있어야 해요 — 그 자리 앞이면 뒤에 y 가 딱 2개 남거든요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eef6ff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#1e3a8a", lineHeight: 1.75, marginBottom: 12 }}>
            {t(E,
              "A moo is x, y, y — so you need TWO y's after x. Take y's second-to-last spot (call it p): exactly two y's sit from p onward. So every value before p can be the x — the widest 'before' zone, so no x is missed.",
              "moo 는 x, y, y — 그러니 x 뒤에 y 가 2개 있어야 해요. y 의 '끝에서 두 번째' 자리(= p)를 잡으면, p 부터 뒤로 y 가 딱 2개 남아요. 그래서 p 앞에 나온 값은 전부 x 가 될 수 있어요 — 가장 넓은 '앞 구역'이라 x 를 하나도 안 놓쳐요.")}
          </div>
          <div style={{ textAlign: "center", fontSize: 12, color: "#9a3412", fontWeight: 700, marginBottom: 6 }}>
            a = [1, 2, 3, 4, 4, 4] · y = 4
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 6 }}>
            {[1, 2, 3, 4, 4, 4].map((v, i) => {
              const before = i <= 3;
              const isP = i === 4;
              return (
                <div key={i} style={{
                  width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", fontSize: 15,
                  background: isP ? "#ea580c" : before ? "#dbeafe" : "#fff",
                  color: isP ? "#fff" : C.text,
                  border: `2px solid ${isP ? "#ea580c" : before ? "#93c5fd" : C.border}`,
                }}>{v}</div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", fontSize: 11.5, color: C.dim }}>
            {t(E, "p = 4 (the second-to-last 4). The blue zone before it holds the x candidates: {1, 2, 3, 4}.",
                  "p = 4 (끝에서 두 번째 4). 그 앞 파란 구역이 x 후보: {1, 2, 3, 4}.")}
          </div>
        </div>),
    },
    /* 3-5 — D[p] meaning */
    {
      type: "reveal",
      narr: t(E,
        "One tool to count it fast — D[p]: how many DIFFERENT values appear before p. That's exactly the x-candidate count.",
        "빠르게 세는 도구 하나 — D[p]: p 앞에 나온 서로 다른 값의 수. 그게 바로 x 후보 수예요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: "#065f46", lineHeight: 1.75 }}>
            {t(E, "Recall: p = second_last[y], and D[p] = distinct values in a[0..p-1]. So for y = 4: p = 4, D[4] = 4 (the values 1, 2, 3, 4).",
                  "기억: p = second_last[y], D[p] = a[0..p-1] 의 서로 다른 값 수. y = 4 면: p = 4, D[4] = 4 (값 1, 2, 3, 4).")}
            <div style={{ marginTop: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#15803d", textAlign: "center", fontWeight: 800 }}>
              D[second_last[y]] = {t(E, "candidate x count", "x 후보 수")}
            </div>
          </div>
        </div>),
    },
    /* 3-6 — subtract-1 subtlety */
    {
      type: "reveal",
      narr: t(E,
        "One tricky case to watch! x must be DIFFERENT from y. Sometimes y sneaks into the candidate count.",
        "조심할 함정 하나! x 는 y 와 달라야 해요. 가끔 y 가 후보 수에 슬쩍 끼어들어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: "#92400e", lineHeight: 1.75 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>
              ⚠️ {t(E, "Subtract 1 when count[y] ≥ 3", "count[y] ≥ 3 이면 1 빼기")}
            </div>
            {t(E,
              "D[p] counts ALL distinct values before p — including y itself, if y already showed up there. But y can't be its own x. So when y appears before p (which happens exactly when count[y] ≥ 3), subtract 1.",
              "D[p] 는 p 앞의 모든 서로 다른 값을 세요 — y 가 거기 이미 나왔다면 y 도 포함. 하지만 y 는 자기 자신의 x 가 못 돼요. 그래서 y 가 p 앞에 나오면 (count[y] ≥ 3 일 때 정확히 그럼) 1 빼요.")}
            <div style={{ marginTop: 10, padding: "9px 11px", background: "#fff", border: "1px dashed #fbbf24", borderRadius: 8, fontSize: 12.5 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{t(E, "Example", "예시")}: a = [4, 1, 4, 4]</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, lineHeight: 1.8 }}>
                y = 4, count[4] = 3 (≥ 3)<br/>
                p = second_last[4] = {t(E, "index 2", "인덱스 2")}<br/>
                {t(E, "values before p", "p 앞의 값")}: {"{4, 1}"} → D[p] = 2<br/>
                {t(E, "but 4 can't be its own x → −1", "그런데 4 는 자기 x 가 못 됨 → −1")}<br/>
                <span style={{ color: "#15803d", fontWeight: 800 }}>→ 2 − 1 = 1 moo: (1, 4, 4) ✓</span>
              </div>
            </div>
            <div style={{ marginTop: 6 }}>
              {t(E, "If count[y] = 2, both y's sit at or after p, so y wasn't counted before p — no subtraction.",
                    "count[y] 가 2 면 두 y 가 모두 p 거나 그 뒤라 p 앞에 y 가 안 세어져요 — 뺄 필요 없음.")}
            </div>
          </div>
        </div>),
    },
    /* 3-7 — count trace payoff sim */
    {
      type: "countTrace",
      narr: t(E,
        "Now watch the answer ADD UP. Step through each candidate y and see the running total grow. Try all 3 presets!",
        "이제 답이 더해지는 걸 봐요. 각 후보 y 를 밟으며 누적 합이 커지는 걸 보세요. 3개 preset 다 해봐요!"),
    },
    /* 3-8 — recap quiz */
    {
      type: "quiz",
      narr: t(E,
        "Quick check. y needs ≥ 2 copies AND some x ≠ y before its pair.",
        "퀴즈. y 는 2개 이상 + 짝 앞에 x ≠ y 가 있어야."),
      question: t(E, "a = [1, 1]. How many moos occur?", "a = [1, 1]. 발생 moo 개수?"),
      options: ["0", "1", "2"],
      correct: 0,
      explain: t(E,
        "y = 1 has count 2, but there's no x ≠ 1 before the (1, 1) pair. No moos. Answer = 0.",
        "y = 1 은 count 2 지만 (1, 1) 짝 앞에 x ≠ 1 이 없음. moo 0 개."),
    },
    /* 3-9 — free explorer */
    {
      type: "explorer",
      narr: t(E,
        "Free play! Try the presets and see which moos occur. Notice values with count = 1 never become y.",
        "자유 탐험! preset 을 눌러 발생 moo 를 봐요. count = 1 인 값은 절대 y 가 못 되는 걸 확인해요."),
    },
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Ch4 — The code (결) — verified sections, rich narration each.
   ════════════════════════════════════════════════════════════════════ */
export function makeMooin2Ch4(E, lang = "py") {
  const sections = getMooin2Sections(E);
  const narrs = [
    t(E, "Section 1: read the input. N first, then N numbers into the list a.",
         "섹션 1: 입력 읽기. 먼저 N, 그다음 N 개 숫자를 리스트 a 로."),
    t(E, "Section 2: in one pass, build count[] and second_last[]. The trick: keep last_seen[v]; when v repeats, the OLD last_seen becomes the new second_last (that's p!).",
         "섹션 2: 왼→오로 한 번 훑으며 count[] 와 second_last[] 만들기. 비결: last_seen[v] 를 기억하다가 v 가 반복되면 이전 last_seen 이 새 second_last (그게 p!) 가 돼요."),
    t(E, "Section 3: build D[]. Walk left-to-right; D goes up by 1 only the FIRST time each value appears. D[k] = distinct values before position k.",
         "섹션 3: D[] 만들기. 왼→오로 가며 각 값이 처음 나올 때만 D 가 1 증가. D[k] = 위치 k 앞 서로 다른 값 수."),
    t(E, "Section 4: the payoff. For each y with count ≥ 2, add D[second_last[y]] — minus 1 when count ≥ 3. That whole loop is O(N). Done!",
         "섹션 4: 결실. count ≥ 2 인 각 y 마다 D[second_last[y]] 더하기 — count ≥ 3 이면 1 빼기. 그 반복 전체가 O(N). 끝!"),
  ];
  return sections.map((sec, i) => ({
    type: "code-section",
    section: sec,
    narr: narrs[i] || "",
  }));
}
