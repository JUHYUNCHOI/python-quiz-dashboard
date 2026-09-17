import { C, t } from "@/components/quest/theme";
import { CodeWalk } from "@/components/quest/CodeWalk";

// CodeWalk 코드 — 설명은 밝아진 줄 위 말풍선으로 (선생님 스타일).
const PR_WALK_PY = [
  "N, Q = map(int, input().split())",
  "stack = list(map(int, input().split()))",
  "",
  "for _ in range(Q):",
  "    target = int(input())",
  "    pos = stack.index(target)",
  "    print(pos)",
  "    del stack[:pos + 1]  # target 과 그 위에 있는 것 모두 영영 사라져요",
];
const PR_WALK_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    vector<int> stack(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> stack[i];",
  "    }",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int target;",
  "        cin >> target;",
  "        int pos = 0;",
  "        while (stack[pos] != target) {",
  "            pos++;",
  "        }",
  "        cout << pos << endl;",
  "        stack.erase(stack.begin(), stack.begin() + pos + 1);",
  "    }",
  "    return 0;",
  "}",
];
function getPresentsWalk(E, lang) {
  if (lang === "cpp") {
    return { code: PR_WALK_CPP, beats: [
      { hi: [5, 10],  bubble: t(E, "Read N presents and Q queries, then the stack (top → bottom).", "선물 N개와 요청 Q개를 읽고, stack 에 위→아래 순서로 담아요.") },
      { hi: [12, 14], bubble: t(E, "For each query, read which present (target) to grab.", "요청마다 찾을 선물 target 을 읽어요.") },
      { hi: [15, 18], bubble: t(E, "Count from the top until target — pos = how many presents sit above it.", "맨 위부터 세어요. pos 는 target 위에 쌓인 선물 수예요.") },
      { hi: [19, 19], bubble: t(E, "Print pos — you must lift off that many to reach it.", "pos 를 출력해요. 그만큼 치워야 target 을 꺼낼 수 있으니까요.") },
      { hi: [20, 20], bubble: t(E, "Take the target out of the stack.", "그 선물을 stack 에서 빼내요.") },
    ] };
  }
  return { code: PR_WALK_PY, beats: [
    { hi: [0, 1], bubble: t(E, "Read N presents & Q queries; stack is listed top → bottom.", "선물 N개와 요청 Q개를 읽어요. stack 은 위→아래 순서예요.") },
    { hi: [3, 4], bubble: t(E, "For each query, read which present (target) to grab.", "요청마다 찾을 선물 target 을 읽어요.") },
    { hi: [5, 6], bubble: t(E, "pos = target's index = how many presents sit above it → print it.", "pos 는 target 의 위치예요.\n위에 쌓인 선물 수라서 그대로 출력해요.") },
    { hi: [7, 7], bubble: t(E, "Take the target out of the stack.", "그 선물을 stack 에서 빼내요.") },
  ] };
}

/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */

export function makePresentsCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "FJ stacked N presents. People ask for specific presents — count how many sit on top of each one before pulling it out.",
        "FJ가 선물 N개를 쌓아 놨어요.\n요청받은 선물 위에 몇 개가 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🎁</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Stack of Presents</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>Bronze warm-up</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "For each query, print how many presents had to be removed before reaching the target.",
                "요청마다, 그 선물을 꺼내기 전에 치운 선물이 몇 개인지 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has a ", "FJ에게 ")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "vertical stack of N presents", "세로로 쌓인 선물 N개 더미")}</b>
                  {t(E, ", numbered 1..N. The top of the stack is index 0.",
                        "가 있어요. 선물마다 1번부터 N번까지 번호가 붙어 있어요. 맨 위 선물의 자리는 0번이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Q queries arrive — each names ONE present FJ should fetch.",
                        "요청이 Q개 와요. 요청마다 FJ가 꺼낼 선물 하나를 말해 줘요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ must remove all presents ", "FJ는 그 선물 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "above", "위에")}</b>
                  {t(E, " the target first, then take the target itself out (gone forever).",
                        " 있는 선물을 먼저 모두 치워요. 그다음 그 선물도 꺼내요. 꺼낸 선물은 다시 안 돌아와요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each query, print how many presents had to be removed first.",
                        "요청마다, 먼저 치운 선물이 몇 개인지 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Query: find 4.\nThe 2 presents above 4 must be removed.\nThen 4 is taken out — gone forever.",
        "이번 요청은 4 찾기예요.\n4 위에 있는 2개를 먼저 치워요.\n그다음 4도 꺼내면 다시 안 돌아와요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 30px 1fr", gap: 6, alignItems: "center" }}>
            {/* BEFORE */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
                {t(E, "BEFORE", "전")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                {[3,1,4,2].map((v, i) => {
                  const isTarget = v === 4;
                  const isAbove = i < 2;
                  return (
                    <div key={i} style={{
                      width: 70, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 7, fontWeight: 700, fontSize: 17, fontFamily: "'JetBrains Mono',monospace",
                      background: isTarget ? "#dcfce7" : (isAbove ? "#fef2f2" : "#fff"),
                      border: `1px solid ${isTarget ? "#16a34a" : (isAbove ? "#dc2626" : "#cbd5e1")}`,
                      color: isTarget ? "#15803d" : (isAbove ? "#7f1d1d" : C.text),
                    }}>{v}{isTarget ? " ←" : isAbove ? " ✗" : ""}</div>
                  );
                })}
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>↑ {t(E, "top", "맨 위")}</div>
              </div>
            </div>
            {/* arrow */}
            <div style={{ fontSize: 24, color: "#8b5cf6", textAlign: "center", fontWeight: 700 }}>→</div>
            {/* AFTER */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
                {t(E, "AFTER", "후")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                <div style={{
                  width: 70, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 7, fontWeight: 700, fontSize: 17, fontFamily: "'JetBrains Mono',monospace",
                  background: "#fff", border: `1px solid #cbd5e1`, color: C.text,
                }}>2</div>
                <div style={{ fontSize: 9, color: C.dim, marginTop: 2 }}>↑ {t(E, "top", "맨 위")}</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, background: "#ede9fe", border: "1.5px solid #c4b5fd", borderRadius: 8, padding: "8px 10px", textAlign: "center", fontSize: 12, color: "#5b21b6", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "Output: 2  (2 presents above 4)", "출력: 2  (4 위에 2개)")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "After removing a present, it's gone from the stack forever.\nThe remaining presents stay in their original order.", "꺼낸 선물은 스택에서 영영 사라져요.\n남은 선물은 순서가 그대로예요."),
      question: t(E,
        "Stack = [5,3,1,4,2]. Find present 1. How many presents above it?",
        "스택 = [5,3,1,4,2] 예요. 선물 1 위에는 몇 개가 있을까요?"),
      options: ["1", "2", "3", "4"],
      correct: 1,
      explain: t(E, "5 and 3 are above 1 → 2 presents to remove!", "1 위에 5와 3이 있어요 → 2개를 치워요!"),
    },
    {
      type: "reveal",
      narr: t(E,
        "Watch what happens after the first query — 5, 3, and 1 itself are all gone. Only [4, 2] remain.",
        "첫 요청이 끝나면 5, 3, 1 이 사라지고 [4, 2] 만 남아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10, fontSize: 12, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>
            {t(E, "Stack starts [5,3,1,4,2] — Query 1: find 1", "스택 [5,3,1,4,2] — 첫 요청은 1 찾기")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 24px 1fr", gap: 6, alignItems: "center" }}>
            {/* BEFORE Q1 */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
                {t(E, "BEFORE Q1", "요청 1 전")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                {[5,3,1,4,2].map((v, i) => {
                  const isTarget = v === 1;
                  const isAbove = i < 2;
                  return (
                    <div key={i} style={{
                      width: 60, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 6, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
                      background: isTarget ? "#dcfce7" : (isAbove ? "#fef2f2" : "#fff"),
                      border: `1px solid ${isTarget ? "#16a34a" : (isAbove ? "#dc2626" : "#cbd5e1")}`,
                      color: isTarget ? "#15803d" : (isAbove ? "#7f1d1d" : C.text),
                    }}>{v}{isTarget ? " ←" : isAbove ? " ✗" : ""}</div>
                  );
                })}
              </div>
            </div>
            <div style={{ fontSize: 18, color: "#8b5cf6", textAlign: "center", fontWeight: 700 }}>→</div>
            {/* AFTER Q1 */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#8b5cf6", textAlign: "center", marginBottom: 6 }}>
                {t(E, "AFTER Q1 (now ask Q2)", "요청 1 후 (이제 요청 2)")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                {[4,2].map((v, i) => (
                  <div key={i} style={{
                    width: 60, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 6, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
                    background: "#fff", border: `1px solid #cbd5e1`, color: C.text,
                  }}>{v}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
            <b>{t(E, "Output for Q1: ", "요청 1 출력: ")}</b>
            {t(E, "2 (presents 5 and 3 above 1).  Then 1 itself is removed too.",
                  "2 예요 (1 위에 5와 3).  그다음 1 도 함께 사라져요.")}
          </div>
          <div style={{ marginTop: 6, background: "#ede9fe", border: "1.5px solid #c4b5fd", borderRadius: 8, padding: "8px 10px", fontSize: 12, color: "#5b21b6", lineHeight: 1.5, textAlign: "center" }}>
            {t(E, "👉 Next step asks: in the right stack [4, 2], how many are above 2?",
                  "👉 다음 질문이에요. 오른쪽 스택 [4, 2] 에서 2 위에는 몇 개일까요?")}
          </div>
        </div>),
    },
    {
      type: "input",
      narr: t(E,
        "Two queries in a row — keep track of what's left in the stack after the first one.",
        "요청이 두 번 이어져요.\n첫 요청 뒤에 스택에 뭐가 남는지 보세요."),
      question: t(E,
        "Stack starts [5,3,1,4,2]. Query 1 = find 1, then query 2 = find 2. Presents above for query 2?",
        "스택 [5,3,1,4,2]. 첫 요청은 1 찾기, 두 번째 요청은 2 찾기예요. 2 위에는 몇 개일까요?"),
      hint: t(E,
        "After query 1 some presents are gone. Recount from the new stack.",
        "첫 요청 뒤에 몇 개가 사라졌어요.\n남은 스택에서 다시 세어 보세요."),
      answer: 1,
    },
    {
      type: "sim",
      narr: t(E,
        "Step through find + pop for each query. Yellow = above target, green = target.", "요청마다 찾기 → 치우기를 한 걸음씩 봐요.\n노랑은 치울 선물, 초록은 찾는 선물이에요."),
    },
  ];
}

export function makePresentsCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "For each query: find target's position, print it, then remove — each line lights up with a note above it.",
        "요청마다 위치 찾기 → 출력 → 치우기.\n밝아진 줄 위에 설명 말풍선이 떠요."),
      content: (() => {
        const w = getPresentsWalk(E, lang);
        return <CodeWalk E={E} lang={lang} code={w.code} beats={w.beats} accent="#f97316" />;
      })(),
    },
    {
      type: "runner",
      narr: t(E,
        "Try your own stack and queries.",
        "스택과 요청을 직접 넣어 보세요."),
    },
  ];
}
