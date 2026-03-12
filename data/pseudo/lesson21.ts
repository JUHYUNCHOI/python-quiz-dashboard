// ============================================
// 수도코드 레슨 21: 플로우차트 기초 (Flowchart Basics)
// CIE 스타일 수도코드 - 플로우차트 기호와 읽기
// ============================================

import { LessonData } from '../types'

export const pseudoLesson21Data: LessonData = {
  id: "pseudo-21",
  title: "플로우차트 기초",
  emoji: "📐",
  description: "알고리즘을 그림으로 표현해요!",
  chapters: [
    {
      id: "ch1",
      title: "플로우차트 기호",
      emoji: "🔷",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📐 플로우차트란?",
          content: `**플로우차트(Flowchart)**는 알고리즘을 **그림**으로 표현하는 방법이에요!

수도코드가 **글**로 알고리즘을 표현한다면, 플로우차트는 **기호와 화살표**로 표현해요.

왜 플로우차트를 사용할까요?
- 알고리즘의 **흐름을 한눈에** 볼 수 있어요
- 프로그래밍을 시작하기 **전에 설계**할 수 있어요
- **다른 사람과 소통**하기 쉬워요
- CIE IGCSE Paper 2에서 **자주 출제**돼요!

플로우차트에는 **6가지 표준 기호**가 있어요. 하나씩 배워볼까요?`
        },
        {
          id: "ch1-symbols",
          type: "explain",
          title: "🔷 6가지 표준 기호",
          content: `플로우차트에서 사용하는 **6가지 표준 기호**를 알아볼게요!

**1) Terminator (터미네이터) — 타원형 (Oval)**
- 프로그램의 **시작(START)**과 **끝(STOP)**을 나타내요
- 모든 플로우차트는 반드시 START로 시작하고 STOP으로 끝나야 해요

**2) Process (프로세스) — 직사각형 (Rectangle)**
- **계산, 대입** 등의 처리를 나타내요
- 예: \`Total ← Total + 1\`, \`Count ← 0\`

**3) Decision (결정) — 마름모 (Diamond)**
- **조건을 검사**하는 곳이에요 (Yes/No 분기)
- 예: \`Is Score > 50?\`
- 반드시 **두 개의 출구**(Yes/No)가 있어야 해요!

**4) Input/Output (입출력) — 평행사변형 (Parallelogram)**
- 데이터를 **입력받거나 출력**하는 곳이에요
- 예: \`INPUT Name\`, \`OUTPUT Total\`

**5) Subroutine (서브루틴) — 이중 테두리 직사각형**
- **다른 곳에서 정의된 프로시저/함수**를 호출해요
- 양쪽에 세로 선이 추가된 직사각형이에요

**6) Flow Lines (흐름선) — 화살표 (Arrows)**
- 기호들을 **연결**하고 실행 **순서**를 나타내요
- 항상 **한 방향**으로만 흐르도록 해야 해요`
        },
        {
          id: "ch1-table",
          type: "explain",
          title: "📋 기호 정리 표",
          content: `기호를 한눈에 정리해 볼게요!

| 기호 이름 | 모양 | 용도 | 예시 |
|---|---|---|---|
| Terminator | 타원형 (Oval) | 시작/끝 | START, STOP |
| Process | 직사각형 (Rectangle) | 계산/대입 | Total ← Total + 1 |
| Decision | 마름모 (Diamond) | 조건 검사 | Is x > 0? |
| Input/Output | 평행사변형 (Parallelogram) | 입력/출력 | INPUT x, OUTPUT x |
| Subroutine | 이중 직사각형 | 함수/프로시저 호출 | CALL CalculateAverage |
| Flow Line | 화살표 (Arrow) | 흐름 연결 | → |

**시험 팁!**
- Decision(마름모)에는 반드시 **Yes와 No** 두 갈래가 있어야 해요
- 모든 플로우차트는 **START로 시작**, **STOP으로 끝**나야 해요
- 화살표는 반드시 **방향**이 있어야 해요 (선만 있으면 안 돼요!)`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 기호 퀴즈!",
          content: '플로우차트에서 조건을 검사하여 Yes/No로 분기하는 기호의 모양은?',
          options: [
            '마름모 (Diamond)',
            '직사각형 (Rectangle)',
            '타원형 (Oval)',
            '평행사변형 (Parallelogram)'
          ],
          answer: 0,
          explanation: '**마름모(Diamond)**가 Decision 기호예요! 조건을 검사하고 Yes와 No 두 갈래로 나눠져요. 직사각형은 Process(처리), 타원형은 Terminator(시작/끝), 평행사변형은 Input/Output(입출력)이에요.'
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 플로우차트 읽기!",
          content: `다음 플로우차트가 하는 일은 무엇일까요?

\`\`\`
[START] (타원형)
   ↓
[INPUT Number] (평행사변형)
   ↓
[Result ← Number * 2] (직사각형)
   ↓
[OUTPUT Result] (평행사변형)
   ↓
[STOP] (타원형)
\`\`\``,
          options: [
            '숫자를 입력받아서 2배를 출력한다',
            '숫자를 입력받아서 2를 더해서 출력한다',
            '숫자를 입력받아서 반으로 나눠서 출력한다',
            '두 개의 숫자를 입력받아서 곱한다'
          ],
          answer: 0,
          explanation: '이 플로우차트를 순서대로 따라가면: 1) 시작 → 2) Number를 입력받음 → 3) Result에 Number * 2를 저장 → 4) Result를 출력 → 5) 끝. 따라서 **숫자를 입력받아서 2배를 출력**하는 알고리즘이에요!'
        }
      ]
    },
    {
      id: "ch2",
      title: "플로우차트 읽기",
      emoji: "👁️",
      steps: [
        {
          id: "ch2-trace",
          type: "explain",
          title: "👁️ 플로우차트 추적하기",
          content: `플로우차트를 **추적(trace)**한다는 것은 화살표를 따라 **한 단계씩 실행**하는 거예요!

추적하는 방법:
1. **START** 기호에서 시작해요
2. **화살표** 방향을 따라 이동해요
3. 각 기호에서 해당 작업을 수행해요:
   - 평행사변형: 데이터 입력/출력
   - 직사각형: 계산 수행
   - 마름모: 조건을 확인하고 Yes/No 방향으로 이동
4. **STOP** 기호에 도달하면 끝이에요

변수의 값을 추적할 때는 **Trace Table**을 사용하면 편리해요!
(Trace Table은 다음 레슨에서 자세히 배울 거예요)`
        },
        {
          id: "ch2-decision",
          type: "explain",
          title: "💎 Decision 기호 자세히 보기",
          content: `**Decision(마름모)** 기호는 가장 중요한 기호예요!

Decision 기호의 규칙:
- 조건을 **질문 형태**로 써요 (예: \`Is x > 0?\`)
- 반드시 **Yes**와 **No** 두 개의 출구가 있어요
- 조건이 참이면 **Yes** 방향으로, 거짓이면 **No** 방향으로 이동해요

수도코드의 IF문과 비교하면:

\`\`\`
IF x > 0 THEN           ← Decision 기호: "Is x > 0?"
    OUTPUT "양수"        ← Yes 방향
ELSE
    OUTPUT "음수 또는 0"  ← No 방향
ENDIF
\`\`\`

**주의!** Yes/No 레이블은 반드시 표시해야 해요.
시험에서 Yes/No를 빠뜨리면 감점될 수 있어요!`
        },
        {
          id: "ch2-example",
          type: "explain",
          title: "📊 예제: 양수/음수/0 판별",
          content: `숫자가 양수인지, 음수인지, 0인지 판별하는 플로우차트를 볼까요?

\`\`\`
[START]
   ↓
[INPUT Number]
   ↓
◇ Is Number > 0? ◇
  |Yes        |No
  ↓           ↓
[OUTPUT    ◇ Is Number < 0? ◇
"양수"]      |Yes        |No
  ↓           ↓           ↓
  |        [OUTPUT    [OUTPUT
  |        "음수"]     "영"]
  |           ↓           ↓
  ↓←----------←-----------←
[STOP]
\`\`\`

이것을 수도코드로 쓰면:

\`\`\`
INPUT Number
IF Number > 0 THEN
    OUTPUT "양수"
ELSE
    IF Number < 0 THEN
        OUTPUT "음수"
    ELSE
        OUTPUT "영"
    ENDIF
ENDIF
\`\`\`

Decision 기호가 **2개** 있는 것이 보이죠? 중첩 IF문과 같아요!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 플로우차트 추적!",
          content: `다음 플로우차트에 **7**을 입력하면 출력은?

\`\`\`
[START]
   ↓
[INPUT x]
   ↓
◇ Is x > 10? ◇
  |Yes        |No
  ↓           ↓
[OUTPUT    ◇ Is x > 5? ◇
 "크다"]     |Yes        |No
              ↓           ↓
           [OUTPUT    [OUTPUT
            "중간"]    "작다"]
              ↓           ↓
[STOP] ←------←-----------←
\`\`\``,
          options: [
            '"중간"',
            '"크다"',
            '"작다"',
            '출력 없음'
          ],
          answer: 0,
          explanation: 'x = 7로 추적해 볼게요. 1) x > 10? → 7 > 10은 **No** → 오른쪽으로 이동. 2) x > 5? → 7 > 5는 **Yes** → "중간"을 출력해요. 따라서 답은 **"중간"**이에요!'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: `다음 플로우차트를 보고, 이 알고리즘이 수행하는 작업은 무엇인가요?

\`\`\`
[START] → [INPUT a] → [INPUT b] →
◇ Is a > b? ◇
  |Yes         |No
  ↓            ↓
[OUTPUT a]  [OUTPUT b]
  ↓            ↓
[STOP] ←-------←
\`\`\``,
          options: [
            '두 수 중 큰 수를 출력한다',
            '두 수 중 작은 수를 출력한다',
            '두 수의 합을 출력한다',
            '두 수가 같은지 확인한다'
          ],
          answer: 0,
          explanation: 'a > b가 Yes이면 a를 출력하고, No이면 b를 출력해요. 즉, **두 수 중 큰 수를 출력**하는 알고리즘이에요! (단, a = b인 경우 b를 출력해요)'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸 채우기!",
          content: `다음은 플로우차트의 Decision 기호에 들어갈 조건이에요. 합격/불합격을 판별하려면 (합격 기준: 50점 이상) 빈칸에 무엇이 들어갈까요?

\`\`\`
[INPUT Score]
   ↓
◇ Is Score ___ 50? ◇
  |Yes          |No
  ↓             ↓
[OUTPUT       [OUTPUT
 "합격"]       "불합격"]
\`\`\``,
          code: '◇ Is Score ___ 50? ◇\n  |Yes → OUTPUT "합격"\n  |No  → OUTPUT "불합격"',
          fillBlanks: [
            { id: 1, answer: ">=", options: [">=", ">", "<=", "="] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "플로우차트와 수도코드",
      emoji: "🔄",
      steps: [
        {
          id: "ch3-selection",
          type: "explain",
          title: "🔄 플로우차트 → 수도코드 (선택문)",
          content: `플로우차트를 수도코드로 변환하는 방법을 배워볼게요!

**선택문(Selection) 변환 규칙:**
- **Decision 기호 (마름모)** → \`IF...THEN...ELSE...ENDIF\`
- **Yes 방향** → THEN 이후의 코드
- **No 방향** → ELSE 이후의 코드

예시 플로우차트:
\`\`\`
[START]
   ↓
[INPUT Age]
   ↓
◇ Is Age >= 18? ◇
  |Yes           |No
  ↓              ↓
[OUTPUT        [OUTPUT
 "성인"]        "미성년자"]
  ↓              ↓
[STOP] ←---------←
\`\`\`

변환된 수도코드:
\`\`\`
INPUT Age
IF Age >= 18 THEN
    OUTPUT "성인"
ELSE
    OUTPUT "미성년자"
ENDIF
\`\`\`

Decision 기호 하나가 IF문 하나에 대응돼요!`
        },
        {
          id: "ch3-loop",
          type: "explain",
          title: "🔁 플로우차트 → 수도코드 (반복문)",
          content: `플로우차트에서 **화살표가 위로 돌아가면** 반복문(Loop)이에요!

**WHILE 반복문 플로우차트:**
\`\`\`
[START]
   ↓
[Count ← 1]
   ↓
◇ Is Count <= 5? ◇ ←──────┐
  |Yes        |No          |
  ↓           ↓            |
[OUTPUT    [STOP]          |
 Count]                    |
  ↓                        |
[Count ← Count + 1] ──────┘
\`\`\`

변환된 수도코드:
\`\`\`
Count ← 1
WHILE Count <= 5 DO
    OUTPUT Count
    Count ← Count + 1
ENDWHILE
\`\`\`

**핵심 포인트:**
- 화살표가 **되돌아가는 곳**에 Decision 기호가 있으면 → **WHILE 루프**
- Decision의 **Yes 방향**이 루프 본문, **No 방향**이 루프 탈출이에요
- 출력: 1, 2, 3, 4, 5

**REPEAT...UNTIL도 비슷해요:**
- 차이점: 조건 검사가 **루프 끝**에 있어요 (최소 1번은 실행)
- 화살표가 되돌아가기 **직전**에 Decision 기호가 있으면 → REPEAT...UNTIL`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 반복 플로우차트 추적!",
          content: `다음 플로우차트에 **5**를 입력하면 출력은?

\`\`\`
[START]
   ↓
[INPUT N]
   ↓
[Total ← 0]
   ↓
[i ← 1]
   ↓
◇ Is i <= N? ◇ ←──────┐
  |Yes      |No        |
  ↓         ↓          |
[Total ←  [OUTPUT      |
Total + i] Total]      |
  ↓         ↓          |
[i ← i+1]──┘ [STOP]   |
  ↓                    |
  └────────────────────┘
\`\`\``,
          options: [
            '15',
            '10',
            '5',
            '6'
          ],
          answer: 0,
          explanation: `N = 5로 추적해 볼게요!

- i=1: Total = 0 + 1 = 1, i = 2
- i=2: Total = 1 + 2 = 3, i = 3
- i=3: Total = 3 + 3 = 6, i = 4
- i=4: Total = 6 + 4 = 10, i = 5
- i=5: Total = 10 + 5 = 15, i = 6
- i=6: 6 <= 5? No → OUTPUT 15

이 플로우차트는 **1부터 N까지의 합**을 구해요! 1+2+3+4+5 = **15**`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 수도코드 매칭!",
          content: `다음 플로우차트에 대응하는 올바른 수도코드는?

\`\`\`
[START]
   ↓
[INPUT x]
   ↓
◇ Is x > 0? ◇ ←─────┐
  |Yes      |No       |
  ↓         ↓         |
[OUTPUT x] [STOP]     |
  ↓                   |
[x ← x - 1] ─────────┘
\`\`\``,
          options: [
            'INPUT x\nWHILE x > 0 DO\n    OUTPUT x\n    x ← x - 1\nENDWHILE',
            'INPUT x\nREPEAT\n    OUTPUT x\n    x ← x - 1\nUNTIL x > 0',
            'INPUT x\nFOR i ← 1 TO x\n    OUTPUT x\nNEXT i',
            'INPUT x\nIF x > 0 THEN\n    OUTPUT x\n    x ← x - 1\nENDIF'
          ],
          answer: 0,
          explanation: `이 플로우차트에서:
1. Decision 기호(x > 0?)가 **루프 시작 부분**에 있어요
2. Yes → 본문 실행 (OUTPUT, x-1) → 되돌아감
3. No → STOP

이것은 **WHILE 루프** 패턴이에요! 조건을 먼저 확인하고, 참이면 반복해요. REPEAT...UNTIL은 조건이 루프 **끝**에 있어야 하므로 틀려요.`
        },
        {
          id: "ch3-fill1",
          type: "fillblank",
          title: "✏️ 수도코드 변환!",
          content: `다음 플로우차트를 수도코드로 변환할 때 빈칸을 채우세요.

플로우차트:
\`\`\`
[START] → [Total ← 0] → [INPUT Num] →
◇ Is Num <> -1? ◇ ←────────────────┐
  |Yes           |No                |
  ↓              ↓                  |
[Total ←      [OUTPUT Total]       |
Total + Num]     ↓                  |
  ↓           [STOP]               |
[INPUT Num] ────────────────────────┘
\`\`\`

수도코드:`,
          code: 'Total ← 0\nINPUT Num\n___ Num <> -1 DO\n    Total ← Total + Num\n    INPUT Num\nENDWHILE\nOUTPUT Total',
          fillBlanks: [
            { id: 1, answer: "WHILE", options: ["WHILE", "REPEAT", "FOR", "IF"] }
          ]
        }
      ]
    }
  ]
}
