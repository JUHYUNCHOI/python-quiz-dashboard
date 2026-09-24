import { C, t } from "@/components/quest/theme";
import { getProductivitySections } from "./components";

/* ================================================================
   Chapter 1: Problem Understanding (4 steps)
   ================================================================ */
export function makeProdCh1(E) {
  return [
    // 1-1: Intro
    {
      type: "reveal",
      narr: t(E,
        "Bessie wants to visit as many farms as possible!\nEach farm closes at a certain time, and she needs travel time to get there.\nCan she visit enough?\n📊", "Bessie 는 문 닫기 전에 농장을 몇 개나 돌 수 있을까요?"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>📊</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Max Productivity</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2024 Bronze #3</div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", margin: "12px 0", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "For each (V, S) query, output YES if Bessie can reach ≥ V farms, else NO.",
                "물음 (V, S) 마다, Bessie 가 농장 V 개 이상에 갈 수 있으면 YES 를, 아니면 NO 를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "N farms, each closes at time c_i. Bessie wakes at time S, arrives at farm i at time t_i + S. She can visit farm i only if t_i + S < c_i. Given Q queries (V, S): can she visit at least V farms?",
              "농장이 N 개 있고, 농장 i 는 c_i 시각에 문을 닫아요.\nBessie 는 S 시각에 일어나서 농장 i 에 t_i + S 시각에 닿아요.\n닿은 시각이 닫는 시각보다 빨라야, 그러니까 t_i + S < c_i 여야 들어갈 수 있어요.\n물음이 Q 개 와요. 물음 (V, S) 는 '농장 V 개 이상에 갈 수 있나요?' 라는 뜻이에요.")}
          </div>
        </div>),
    },
    // 1-1b: Official sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Input format: N Q, then N closing times, then N travel times, then Q queries each on its own line as 'V S'.",
        "첫 줄은 N Q, 다음은 닫는 시각과 이동 시간, 끝에 물음 Q 줄이에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f97316", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9a3412", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#9a3412" }}>
                <div>5 5 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← N Q", "← N Q")}</span></div>
                <div>3 5 7 9 12 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← closing c", "← 닫는 시각 c")}</span></div>
                <div>4 2 3 3 8 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← travel t", "← 이동 시간 t")}</span></div>
                <div>1 5 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← query 1: V S", "← 물음1 V S")}</span></div>
                <div>1 6 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← query 2", "← 물음2")}</span></div>
                <div>3 3 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← query 3", "← 물음3")}</span></div>
                <div>4 2 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← query 4", "← 물음4")}</span></div>
                <div>5 1 <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← query 5", "← 물음5")}</span></div>
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534" }}>
                <div>YES <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← query 1", "← 물음1")}</span></div>
                <div>NO <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← query 2", "← 물음2")}</span></div>
                <div>YES <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← query 3", "← 물음3")}</span></div>
                <div>YES <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← query 4", "← 물음4")}</span></div>
                <div>NO <span style={{ color: "#94a3b8", fontSize: 10.5 }}>{t(E, "← query 5", "← 물음5")}</span></div>
              </div>
            </div>
          </div>
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#9a3412", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough — query 1: V=1, S=5", "풀이 — 첫 번째 물음 (V=1, S=5)")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "Reachable iff S + t[i] < c[i]:",
                    "S + t[i] < c[i] 면 갈 수 있어요.")}
              <br/>
              {t(E, "farm 0: 5 + 4 = 9 < 3? NO.  farm 1: 5 + 2 = 7 < 5? NO.",
                    "농장 0: 5+4=9 < 3? NO.  농장 1: 5+2=7 < 5? NO.")}
              <br/>
              {t(E, "farm 2: 5 + 3 = 8 < 7? NO.  farm 3: 5 + 3 = 8 < 9? YES.  farm 4: 5 + 8 = 13 < 12? NO.",
                    "농장 2: 5+3=8 < 7? NO.  농장 3: 5+3=8 < 9? YES.  농장 4: 5+8=13 < 12? NO.")}
            </div>
            <div style={{ marginTop: 6, color: "#15803d", fontWeight: 700 }}>
              {t(E, "→ reachable = 1.  V = 1.  1 ≥ 1 → YES.", "→ 방문 가능 = 1. V = 1. 1 ≥ 1 → YES.")}
            </div>
          </div>
        </div>),
    },
    // 1-2: Key transformation
    {
      type: "reveal",
      narr: t(E,
        "The trick is to rearrange the condition!\nt_i + S < c_i means S < c_i - t_i.\nSo precompute d_i = c_i - t_i!", "조건을 옮겨 쓰면 S 와 d 만 견주면 돼요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#f97316", marginBottom: 10 }}>
              {t(E, "Transform the Condition", "조건을 옮겨 쓰기")}
            </div>
            <div style={{ background: "#fff", border: "1px solid #fdba74", borderRadius: 10, padding: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ea580c", fontFamily: "'JetBrains Mono',monospace", textAlign: "center", lineHeight: 2 }}>
                t_i + S {"<"} c_i<br/>
                S {"<"} c_i - t_i<br/>
                S {"<"} d_i
              </div>
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {t(E,
                "d_i = c_i - t_i is the latest Bessie can wake up and still visit farm i.\nOnce d[] is sorted, every d bigger than S sits together at the tail — so one binary search for the boundary tells us how many there are.", "d_i = c_i - t_i 는 Bessie 가 농장 i 에 갈 수 있는 가장 늦은 기상 시각이에요.\nd 를 정렬해 두면 S 보다 큰 d 들이 뒤쪽에 나란히 모여요.\n그래서 그 경계만 이분 탐색으로 찾으면 개수가 바로 나와요.")}
            </div>
          </div>
        </div>),
    },
    // 1-2b: Deep audit sim — slide S, watch d[i] > S light up
    {
      type: "sim",
      narr: t(E,
        "Deep audit time! Slide S left and right and watch which farms turn green (d[i] > S).",
        "S 를 좌우로 밀어 보면 d[i] > S 인 농장이 초록이 돼요."),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's check: c=[10,5,8], t=[3,2,4], S=3. Which farms can Bessie visit?", "c=[10,5,8], t=[3,2,4], S=3 일 때 몇 곳에 갈 수 있을까요?"),
      question: t(E,
        "c=[10,5,8], t=[3,2,4], S=3. Farm 1: 3+3=6<10 OK. Farm 2: 2+3=5, NOT <5. Farm 3: 4+3=7<8 OK. How many farms?",
        "c=[10,5,8], t=[3,2,4], S=3 이에요.\n농장1 은 3+3=6 이고 6 < 10 이라 돼요.\n농장2 는 2+3=5 인데 5 < 5 가 아니라서 안 돼요.\n농장3 은 4+3=7 이고 7 < 8 이라 돼요.\n갈 수 있는 농장은 몇 개일까요?"),
      options: [
        t(E, "1 farm", "농장 1 개"),
        t(E, "2 farms", "농장 2 개"),
        t(E, "3 farms (all)", "농장 3 개 (전부)"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Farm 1 (6<10) and Farm 3 (7<8) are reachable. Farm 2 fails because 5 is NOT strictly less than 5. Answer: 2!",
        "정답이에요! 농장1 (6<10) 과 농장3 (7<8) 에는 갈 수 있어요.\n농장2 는 5 가 5 보다 작아야 하는데 딱 같아서 안 돼요.\n그래서 답은 2 개예요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Now you try! Same example but count it yourself.", "이제 직접 세어 봐요. 같은 예제예요."),
      question: t(E,
        "c=[10,5,8], t=[3,2,4], S=3. How many farms can Bessie visit? (strict inequality: t_i + S < c_i)",
        "c=[10,5,8], t=[3,2,4], S=3 이에요. Bessie 가 갈 수 있는 농장은 몇 개일까요?\n(딱 같으면 안 돼요 — t_i + S 가 c_i 보다 작아야 해요)"),
      hint: t(E,
        "Check each farm with the strict inequality and tally the yes's.",
        "농장마다 t_i + S < c_i 인지 따져 보고, 맞는 것만 세어 봐요."),
      answer: 2,
    },
  ];
}

/* ================================================================
   Chapter 2: Code (2 steps)
   ================================================================ */
export function makeProdCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Farm i is reachable iff S < c[i] − t[i]; precompute d[i] = c[i] − t[i], sort it, then binary-search each query.",
        "S < c[i]−t[i] 인 농장만 갈 수 있어요. d[i] 정렬 후 질문마다 이분 탐색해요."),
      sections: getProductivitySections(E),
    },
  ];
}
