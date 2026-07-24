import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";
import { getMooin2Sections } from "./components";
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
    t(E, "seen = set()                       # distinct (x, y) moos", "seen = set()                       # 서로 다른 (x, y) moo 모음"),
    t(E, "for i in range(N):                 # x is at i", "for i in range(N):                 # x 는 i 자리"),
    t(E, "    for j in range(i + 1, N):      # first y at j", "    for j in range(i + 1, N):      # 첫 y 는 j 자리"),
    t(E, "        for k in range(j + 1, N):  # second y at k", "        for k in range(j + 1, N):  # 둘째 y 는 k 자리"),
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
    t(E, "    set<pair<int,int>> seen;                // distinct (x, y) moos", "    set<pair<int,int>> seen;                // 서로 다른 (x, y) moo 모음"),
    t(E, "    for (int i = 0; i < N; i++)             // x at i", "    for (int i = 0; i < N; i++)             // x 는 i 자리"),
    t(E, "        for (int j = i + 1; j < N; j++)     // first y at j", "        for (int j = i + 1; j < N; j++)     // 첫 y 는 j 자리"),
    t(E, "            for (int k = j + 1; k < N; k++) // second y at k", "            for (int k = j + 1; k < N; k++) // 둘째 y 는 k 자리"),
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
            🐢 {t(E, "First idea: try EVERY 3-spot combo", "첫 아이디어: 3칸을 모든 방법으로 골라보기")}
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
          <CodeBlock
            lines={isCpp ? [...bruteReadCpp, ...bruteLoopCpp] : [...bruteReadPy, ...bruteLoopPy]}
            dimUntil={isCpp ? bruteReadCpp.length : bruteReadPy.length}
            lang={isCpp ? "cpp" : "py"} />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E, "Gray = already written; colored = the new lines. seen is a set — it auto-drops duplicates, so its size = the count of DISTINCT moos.",
                  "회색 = 이미 짠 줄, 색 = 새로 추가한 줄. seen 은 집합 — 중복을 알아서 버려요. 그래서 크기 = 서로 다른 moo 개수.")}
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
          <CodeBlock
            lines={isCpp ? [...bruteReadCpp, ...bruteLoopCpp, ...bruteBodyCpp] : [...bruteReadPy, ...bruteLoopPy, ...bruteBodyPy]}
            lang={isCpp ? "cpp" : "py"} />
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
            {t(E, "↑ The full brute program — all of it. Correct and easy to read — now the big question: how fast is it?",
                  "↑ 완성된 전체 브루트 코드 (전부). 맞고 읽기 쉬운데 — 이제 큰 질문: 얼마나 빠를까요?")}
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
    /* 2-4 (limit/bridge) REMOVED 2026-06-18 — narr·박스가 같은 말이었고, 체감은 BruteRunner(2-3)가,
       동기는 빠른풀이 첫 페이지가 담당 → 불필요 (선생님). 첫시도는 BruteRunner 로 끝남. */
  ];
}

/* ════════════════════════════════════════════════════════════════════
   Ch3 — The fast idea (전 → 결)
   ════════════════════════════════════════════════════════════════════ */
export function makeMooin2Ch3(E) {
  return [
    /* 흐름 (선생님 2026-06-19): ① 브루트 안 됨 → 다른 방법 ② 우리가 만든 방법 시뮬
       ③ '이걸 코드로?' → 정보 담을 변수 소개 ④ 그 변수 채우기 시뮬 → ⚡코드.
       워밍업 퀴즈 제거 (선생님: '필요 없다'). */

    /* 3-1 — 동기 ONLY: 브루트가 왜 느렸나 + moo 특징으로 hook. 방법은 안 알려주고
       궁금하게만 → 2-2 시뮬이 진짜 reveal 이 되도록 (선생님 2026-06-19: 1/4가 방법을
       미리 다 말하면 시뮬이 스포일러 반복됨). */
    {
      type: "reveal",
      narr: t(E,
        "Brute force timed out when N got big — so we need a smarter way.",
        "브루트포스는 N 이 커지면 타임오버였죠 — 그러니 다른 방법을 생각해봐야 해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 12, padding: "14px 16px", fontSize: 14, color: "#9a3412", lineHeight: 1.7, maxWidth: 480, margin: "0 auto", wordBreak: "keep-all" }}>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>
              🐢 {t(E, "Why was brute so slow?", "브루트는 왜 그렇게 느렸을까?")}
            </div>
            <div>
              {t(E,
                "It tried EVERY 3 spots one by one — so when N gets big, the work explodes. 💥",
                "모든 3칸 조합을 하나하나 다 봤거든요 — 그래서 N 이 커지면 일이 폭발해요. 💥")}
            </div>
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px dashed #fdba74" }}>
              {t(E,
                "But a moo has a special trait: its last two numbers are the SAME. Could we use that to skip the wasted work? 🤔",
                "그런데 moo 엔 특별한 점이 있어요 — 뒤 두 숫자가 같다는 것. 이걸 이용하면 헛수고를 건너뛸 수 있지 않을까? 🤔")}
            </div>
          </div>
          <div style={{ textAlign: "center", fontSize: 12.5, color: "#7c5cfc", fontWeight: 700, marginTop: 12, wordBreak: "keep-all" }}>
            👉 {t(E, "Hit Next — let's find out, step by step.", "「다음」을 누르면 직접 알아볼 수 있어요.")}
          </div>
        </div>),
    },

    /* 3-2 — 방법 시뮬 (CountTrace). 방법이 '여기서 처음' 밝혀지는 reveal — narr 은 짧게,
       설명은 전부 시뮬 말풍선이 담당 (선생님 2026-06-18). */
    {
      type: "reveal",
      narr: t(E,
        "Here's the smarter method — discover it one move at a time, no code, just the picture.",
        "더 똑똑한 방법, 여기서 한 동작씩 직접 알아봐요 — 코드 없이 그림만."),
      content: (
        <div style={{ padding: 16 }}>
          {/* recipe 박스 전부 제거 (선생님 2026-06-18: '빠른 아이디어 볼 필요 없다 — 시뮬 각
              스텝 말풍선으로 녹여라'). 설명은 전부 MooinCountTrace 의 스텝 말풍선이 담당. */}
          <div style={{ textAlign: "center", fontSize: 12.5, color: "#7c5cfc", fontWeight: 700, marginBottom: 10, wordBreak: "keep-all" }}>
            👇 {t(E, "Step through it — each move is explained in the bubble.", "한 동작씩 눌러봐요 — 각 동작을 말풍선이 설명해요.")}
          </div>
          <MooinCountTrace E={E} />
        </div>),
    },

    /* 3-3 — 다리: '방법은 알았다 → 이걸 코드로? → 정보를 담을 변수가 필요'.
       DeepAudit 의 변수들이 갑자기 안 튀어나오게, 먼저 '왜 이 변수가 필요한지' 소개. */
    {
      type: "reveal",
      narr: t(E,
        "We've got the method. Now — how do we turn it into code? The computer has to remember a bit of info in variables.",
        "방법은 알았어요. 그럼 이걸 코드로 어떻게 만들까요? 컴퓨터는 필요한 정보를 변수(메모지)에 담아둬야 해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13.5, color: C.text, lineHeight: 1.7, marginBottom: 4, textAlign: "center", wordBreak: "keep-all" }}>
            {t(E, "So we don't recount every time, the code jots down 2 notes:",
                  "매번 다시 세지 않으려고, 코드는 메모 2장을 적어둬요:")}
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, textAlign: "center", marginBottom: 12, wordBreak: "keep-all" }}>
            {t(E, "(a “number” = a value in the array · a “spot” = a position: 0, 1, 2, …)",
                  "(여기서 ‘숫자’ = 배열에 든 값 · ‘자리’ = 위치 0, 1, 2, …)")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 500, margin: "0 auto" }}>
            {[
              {
                plain: t(E, "Each spot — how many DIFFERENT numbers (≠ this one) came before it?", "자리마다 — 그 앞에 (이 값과) 서로 다른 숫자가 몇 종류지?"),
                why: t(E, "That count is exactly the x's we can pick for a moo ending here.", "그 종류 수가 곧 여기서 고를 수 있는 x 개수예요."),
                code: "memo",
              },
              {
                plain: t(E, "Each number — where's its 2nd-to-last spot?", "숫자마다 — ‘끝에서 두 번째’로 나온 자리는?"),
                why: t(E, "A same y still sits after it, so that spot j completes the (y, y) pair — and everything before j is where x comes from.", "그 뒤에 같은 y 가 하나 더 있어 (y, y) 짝이 완성돼요 — 그리고 그 자리 앞쪽이 x 구역."),
                code: "second_last",
              },
            ].map((m, i) => (
              <div key={i} style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13.5, fontWeight: 800, color: C.text, wordBreak: "keep-all" }}>{m.plain}</span>
                  <span style={{ fontSize: 10.5, color: C.dim, flexShrink: 0 }}>{t(E, "code:", "코드 이름:")}</span>
                  <code style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 800, color: "#7c3aed", background: "#fff", border: "1px solid #ddd6fe", borderRadius: 6, padding: "1px 6px", flexShrink: 0 }}>{m.code}</code>
                </div>
                <div style={{ fontSize: 12.5, color: C.dim, lineHeight: 1.6, wordBreak: "keep-all" }}>{m.why}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 12.5, color: "#7c5cfc", fontWeight: 700, marginTop: 12, wordBreak: "keep-all" }}>
            👉 {t(E, "Hit Next — watch these notes fill in as we scan.", "「다음」을 누르면 이 메모들이 배열을 훑으며 채워지는 걸 볼 수 있어요.")}
          </div>
        </div>),
    },

    /* 3-4 — 변수 채우기 시뮬 (정답 코드 '바로 직전'). 선생님 2026-06-19:
       "이런 정보를 보관하는 변수들을 만들고 그거에 대한 시뮬을 보여주면 될 것 같다."
       → 위에서 소개한 변수들이 배열을 훑으며 채워지는 걸 코드 없이 봄. */
    {
      type: "deepAudit",
      narr: t(E,
        "Scan the array once and the notes fill in. The ⚡ Code tab simply writes down exactly this.",
        "배열을 한 번 훑으면 이 메모들이 채워져요. ⚡코드 탭은 바로 이걸 그대로 적는 거예요."),
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
    t(E, "Section 2: build memo[]. At each spot i, count the distinct values before it that DIFFER from a[i] — that's how many x's could sit there. (If a[i] already appeared, don't count itself.)",
         "섹션 2: memo[] 만들기. 각 자리 i 에서, 그 앞에 나온 서로 다른 값 중 a[i] 와 '다른' 것의 개수 = 그 자리 앞에 올 수 있는 x 후보 수. (a[i] 가 앞에 이미 있었으면 자기 자신은 빼기.)"),
    t(E, "Section 3: build second_last. Scan from the RIGHT; the moment a value's count hits 2, that spot j is its 2nd-to-last — a same y still sits after it, so the (j, k) pair is ready.",
         "섹션 3: second_last 만들기. 오른쪽부터 세다가 어떤 값의 count 가 2 되는 순간 — 그 자리 j 가 '끝에서 두 번째'. 뒤에 같은 y 가 하나 더 있으니 (j, k) 짝 완성."),
    t(E, "Section 4: the payoff. For each pair's j, add memo[j] — the distinct x's that can go before it. Sum them all. The whole thing is O(N). Done!",
         "섹션 4: 결실. 짝의 j 마다 memo[j] (그 앞에 올 수 있는 서로 다른 x 수) 를 더하기. 다 합치면 끝. 전체가 O(N)!"),
  ];
  return sections.map((sec, i) => ({
    type: "code-section",
    section: sec,
    narr: narrs[i] || "",
  }));
}
