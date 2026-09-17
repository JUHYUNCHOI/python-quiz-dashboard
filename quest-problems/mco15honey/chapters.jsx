import { C, t } from "@/components/quest/theme";
import { getHoneySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHoneyCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      /* 2026-09-17: 영어 narr 이 문제 원문 전체(265자·6문장)를 파란 바에 그대로
         쏟아붓고 있었다. 바로 아래 🎯 미션 · 📖 문제 카드가 같은 말을 또 한다.
         한국어 쪽은 이미 짧다 — 영어도 같은 몫만 하게 맞춘다. */
      narr: t(E,
        "You get at most K trips. Collect as much honey as you can.",
        "K 번만 오갈 수 있어요. 꿀을 가장 많이 모아 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf6f"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Honey</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E, "Maximize total honey across at most K trips, where each trip drains up to M ml from one hive.",
                    "최대 K 번 왕복 안에서, 각 왕복마다 한 벌집에서 최대 M ml 을 가져와 총 꿀을 최대로 모아요.")}
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
                  {t(E, "A squirrel has a ", "다람쥐가 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "pot of capacity M ml", "용량이 M ml 인 항아리")}</b>
                  {t(E, " and faces ", " 를 들고 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N beehives, each holding some honey", "꿀이 들어 있는 벌집 N 개")}</b>
                  {t(E, ".", " 를 만나요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "She can make at most ", "최대 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "K trips", "K 번 왕복(한 번 가서 가져오기)")}</b>
                  {t(E, "; each trip visits ONE hive and carries up to M — or whatever is left there, if less.",
                        " 까지 할 수 있어요. 한 번 갈 때마다 벌집 하나에 들러서\n그 벌집에 남은 꿀을 최대 M 만큼 담아 와요.\nM 보다 적게 남았으면 남은 것만 담아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MAXIMUM total honey collected", "가장 많이 모을 수 있는 꿀의 양")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    /* 1-2: 입출력 형식 (mcc19rect2 4-박스 표준)
       2026-09-17: 이 quest 에는 형식 카드가 아예 없었다. 학생이 코드까지 가서야
       input() 을 보고 "몇 줄에 뭐가 들어오나" 를 역추론하고 있었다. */
    {
      type: "reveal",
      narr: t(E,
        "First line N M K, then one hive per line.",
        "첫 줄에 N M K, 그다음 줄마다 벌집의 꿀이 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N M K</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— hives, pot size, trips", "— 벌집 수, 항아리 용량, 왕복 횟수")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>h1</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— honey in hive 1", "— 1 번 벌집의 꿀")}</span></div>
              <div style={{ color: C.dim }}>…</div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>hN</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— honey in hive N", "— N 번 벌집의 꿀")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line: the largest total honey you can carry home.",
                    "한 줄에, 집으로 가장 많이 가져올 수 있는 꿀의 양을 적어요.")}
            </div>
          </div>
          {/* Sample */}
          <div style={{ marginBottom: 12, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#92400e", marginBottom: 8 }}>🔍 {t(E, "Sample", "샘플")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>{t(E, "input", "입력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`3 10 4
25
12
8`}
                </div>
              </div>
              <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>{t(E, "output", "출력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>{`38`}</div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", fontStyle: "italic" }}>
              {t(E, "Why 38? — drag K in the sim on the next page.",
                    "왜 38 일까? — 다음 쪽 시뮬에서 K 를 움직여 봐요.")}
            </div>
          </div>
          {/* CONSTRAINTS */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {/* 2026-09-17: 원문 상한을 못 찾았다. 지어내지 않고, 이 방법이 감당하는 크기를 적는다.
                  같은 날 2차: 그 크기를 "벌집을 M 짜리 조각으로 쪼갠 뒤 정렬해요" 라고 적고 있었다.
                  이건 풀이 전체다. 바로 세 줄 위에서 "왜 38 일까? — 다음 쪽 시뮬에서" 라고
                  물어 놓고, 답을 여기서 먼저 말해 버린 셈이다. 조각 = 왕복 한 번이므로,
                  뜻은 그대로 두고 **학생이 이미 아는 말(왕복)** 로 바꿔 적는다. */}
              {t(E, "We could not find the original limits on N, M, K. What we can say is how big this quest's solution can go: a few hundred thousand trips in total — counting every trip it would take to empty all the hives — is comfortable.",
                    "N · M · K 가 얼마까지 커질 수 있는지는 원문에서 확인하지 못했어요.\n대신 이 quest 의 풀이가 감당하는 크기를 적어요.\n모든 벌집을 다 비우는 데 드는 왕복이 수십만 번까지는 넉넉해요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Sim — drag K, watch which trip-yields the squirrel picks
    {
      type: "sim",
      narr: t(E,
        "Which blocks light up first as you drag K?",
        "K 를 움직이면 어떤 조각부터 골라질까요?"),
    },
    /* 1-4: Quiz
       2026-09-17: 여기 퀴즈가 **틀린 전략**을 가르치고 있었다.
       "왜 꿀이 많은 벌집부터 정렬할까요?" → "큰 벌집부터 가면 갈 때마다 M 에 가깝게 채울 수 있어요".
       이건 "벌집 하나를 다 비우고 다음 벌집으로" 라고 읽힌다. 반례로 검산했다:
         H1=15, H2=15, M=10, K=2
         · 벌집 하나를 먼저 다 비우면  → 10 + 5 = 15
         · 왕복 조각으로 쪼개 큰 것부터 → 10 + 10 = 20   ← 정답 코드가 내는 값
       15 ≠ 20. 그 위 HoneySim 도 "조각 단위로 쪼개 정렬" 을 보여주고 있어서
       바로 앞 쪽과도 앞뒤가 안 맞았다. 시뮬이 보여준 관찰을 그대로 퀴즈로 바꾼다. */
    {
      type: "quiz",
      narr: t(E,
        "Now try it without the sim's help.",
        "이번엔 시뮬 없이 직접 골라 볼 차례예요."),
      question: t(E,
        "Two hives with 15 each, M=10, K=2. Which way collects more?",
        "벌집 두 개에 꿀이 15 씩, M=10, K=2 예요. 어느 쪽이 더 많이 모을까요?"),
      /* 2026-09-17 2차: 보기 둘이 각자 합계(20 · 15)를 적고 있었다.
         질문이 "어느 쪽이 더 많이 모을까요?" 인데 보기가 답을 다 적어 줘서,
         학생은 20 > 15 만 보고 찍으면 끝이었다. 합계는 explain 으로 내린다. */
      options: [
        t(E, "10 from one hive, 10 from the other",
            "벌집 하나에서 10, 다른 벌집에서 10"),
        t(E, "Empty one hive first — 10, then the leftover 5",
            "한 벌집을 끝까지 비우기 — 10, 그다음 남은 5"),
      ],
      correct: 0,
      explain: t(E,
        "Right. 10 + 10 = 20, while 10 + 5 = 15. A hive's leftover 5 is a small trip. Each trip should carry the biggest block still available — across all hives, not one hive at a time.",
        "맞아요. 10 + 10 = 20 이고, 10 + 5 = 15 예요.\n한 벌집을 끝까지 비우면 마지막 왕복은 5 밖에 못 담아요.\n왕복마다 남은 조각 중 가장 큰 것을 담아야 해요.\n벌집 하나씩이 아니라, 모든 벌집의 조각을 한데 놓고 고르는 거예요."),
    },
    // 1-5: Input
    {
      type: "input",
      /* 2026-09-17: question 이 "(10+10+5)" 로 답 구하는 식을 미리 다 풀어 줬다.
         학생은 항 개수만 세면 끝이었다. 괄호를 지우고 필요한 말은 hint 로 내린다. */
      narr: t(E,
        "One hive this time. How many trips does it take to empty it?",
        "벌집 하나만 볼게요. 다 비우려면 몇 번 다녀와야 할까요?"),
      question: t(E,
        "Pot M=10, hive has 25 honey. Trips to empty it?",
        "항아리 M=10, 벌집에 꿀 25. 몇 번 다녀올까요?"),
      hint: t(E,
        "Each trip takes up to 10. Subtract 10 each time until the hive is empty.",
        "한 번에 최대 10 씩 가져와요. 벌집이 빌 때까지 10 씩 빼 봐요."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHoneyCh2(E, lang = "py") {
  return [
    // 2-1: Code (greedy strategy + progressive sections)
    {
      type: "progressive",
      /* 2026-09-17: 이 narr 도 1-2 퀴즈와 같은 틀린 전략("벌집 단위로 정렬해
         ceil(honey/M) 번씩")을 적고 있었다. 아래 코드는 그렇게 하지 않는다. */
      narr: t(E,
        "Split every hive into trip-sized blocks, then take the K biggest.",
        "모든 벌집을 왕복 조각으로 쪼갠 뒤 큰 것부터 K 개를 골라요."),
      sections: getHoneySections(E),
    },
  ];
}
