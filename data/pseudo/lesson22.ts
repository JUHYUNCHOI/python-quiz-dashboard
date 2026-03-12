// ============================================
// 수도코드 레슨 22: 플로우차트 실전 (Flowchart Practice)
// CIE 스타일 수도코드 - Trace Table과 설계, 시험 대비
// ============================================

import { LessonData } from '../types'

export const pseudoLesson22Data: LessonData = {
  id: "pseudo-22",
  title: "플로우차트 실전",
  emoji: "✏️",
  description: "플로우차트로 문제를 풀어봐요!",
  chapters: [
    {
      id: "ch1",
      title: "Trace Table과 플로우차트",
      emoji: "📋",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 Trace Table이 뭐예요?",
          content: `**Trace Table(추적표)**은 플로우차트나 수도코드를 실행할 때, **변수의 값이 어떻게 변하는지** 표로 기록하는 거예요!

왜 Trace Table을 사용할까요?
- 알고리즘이 **올바르게 동작하는지** 확인할 수 있어요
- **디버깅**(오류 찾기)에 도움이 돼요
- IGCSE 시험에서 **자주 출제**돼요!

Trace Table 만드는 방법:
1. **열(column)**: 각 변수마다 하나의 열을 만들어요
2. **OUTPUT 열**: 출력값을 기록하는 열도 추가해요
3. **행(row)**: 변수의 값이 바뀔 때마다 새 행을 추가해요

간단한 예시를 볼까요?

\`\`\`
x ← 1
x ← x + 3
x ← x * 2
OUTPUT x
\`\`\`

| x | OUTPUT |
|---|--------|
| 1 | |
| 4 | |
| 8 | |
| | 8 |

x가 1 → 4 → 8로 변하고, 최종적으로 **8**을 출력해요!`
        },
        {
          id: "ch1-loop-trace",
          type: "explain",
          title: "🔁 반복문 Trace Table",
          content: `반복문이 있는 플로우차트의 Trace Table을 만들어 볼게요!

**카운팅 루프 플로우차트:**
\`\`\`
[START]
   ↓
[Count ← 0]
[Total ← 0]
   ↓
◇ Is Count < 3? ◇ ←───────┐
  |Yes        |No          |
  ↓           ↓            |
[INPUT Num] [OUTPUT        |
  ↓          Total]        |
[Total ←      ↓            |
Total+Num] [STOP]          |
  ↓                        |
[Count ←                   |
Count+1] ──────────────────┘
\`\`\`

입력값이 순서대로 **10, 20, 30**이라면:

| Count | Total | Num | OUTPUT |
|-------|-------|-----|--------|
| 0 | 0 | | |
| | | 10 | |
| | 10 | | |
| 1 | | | |
| | | 20 | |
| | 30 | | |
| 2 | | | |
| | | 30 | |
| | 60 | | |
| 3 | | | |
| | | | 60 |

이 플로우차트는 **3개의 숫자를 입력받아서 합계를 출력**해요!

**팁:** 변수가 바뀔 때만 해당 열에 값을 적어요. 안 바뀐 열은 비워둬요.`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Trace Table 완성하기!",
          content: `다음 플로우차트에 입력 **8, 3, 12**가 주어질 때, 최종 OUTPUT은?

\`\`\`
[START]
   ↓
[Max ← 0]
[Count ← 0]
   ↓
◇ Is Count < 3? ◇ ←────────┐
  |Yes         |No          |
  ↓            ↓            |
[INPUT Num]  [OUTPUT Max]   |
  ↓            ↓            |
◇ Is Num>Max?◇ [STOP]      |
  |Yes    |No              |
  ↓       ↓               |
[Max←Num] |               |
  ↓       ↓               |
  └───→ [Count←Count+1]───┘
\`\`\`

Trace Table:
| Count | Max | Num |
|-------|-----|-----|
| 0 | 0 | |
| | | 8 |
| | 8 | |
| 1 | | |
| | | 3 |
| 2 | | |
| | | 12 |
| | 12 | |
| 3 | | |`,
          options: [
            '12',
            '8',
            '3',
            '23'
          ],
          answer: 0,
          explanation: `한 단계씩 추적해 볼게요!

- Count=0: Num=8, 8>0? Yes → Max=8, Count=1
- Count=1: Num=3, 3>8? No → Max 그대로, Count=2
- Count=2: Num=12, 12>8? Yes → Max=12, Count=3
- Count=3: 3<3? No → OUTPUT Max → **12**

이 플로우차트는 **3개의 수 중 가장 큰 수**를 찾아요! Max=**12**`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Trace Table 퀴즈!",
          content: `다음 플로우차트를 추적한 후 X의 최종 값은?

\`\`\`
[START]
   ↓
[X ← 10]
[Y ← 3]
   ↓
◇ Is X > 0? ◇ ←─────┐
  |Yes      |No       |
  ↓         ↓         |
[X ← X-Y] [STOP]     |
  ↓                   |
  └───────────────────┘
\`\`\``,
          options: [
            '1',
            '-2',
            '0',
            '4'
          ],
          answer: 1,
          explanation: `X = 10, Y = 3으로 시작해서 추적해 볼게요!

| X | Y |
|---|---|
| 10 | 3 |
| 7 | |
| 4 | |
| 1 | |
| -2 | |

- X=10: 10>0? Yes → X=10-3=7
- X=7: 7>0? Yes → X=7-3=4
- X=4: 4>0? Yes → X=4-3=1
- X=1: 1>0? Yes → X=1-3=**-2**
- X=-2: -2>0? **No** → STOP

X의 최종 값은 **-2**예요! (나머지 연산과 비슷한 패턴이에요)`
        }
      ]
    },
    {
      id: "ch2",
      title: "플로우차트 설계",
      emoji: "🎨",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "🎨 플로우차트 설계 방법",
          content: `문제를 보고 플로우차트를 **직접 설계**하는 방법을 배워볼게요!

**설계 단계:**

**1단계: 문제 분석**
- 입력(Input)은 무엇인가?
- 출력(Output)은 무엇인가?
- 어떤 처리(Process)가 필요한가?
- 조건(Decision)이 필요한가?
- 반복(Loop)이 필요한가?

**2단계: 순서 정리**
- 알고리즘의 순서를 글로 먼저 적어봐요
- 수도코드로 먼저 작성하면 도움이 돼요

**3단계: 기호 배치**
- START로 시작해요
- 순서대로 기호를 그려요
- 화살표로 연결해요
- STOP으로 끝내요

**4단계: 검증**
- 테스트 데이터로 추적해 봐요
- 모든 경로가 STOP에 도달하는지 확인해요`
        },
        {
          id: "ch2-patterns",
          type: "explain",
          title: "📌 자주 나오는 플로우차트 패턴",
          content: `IGCSE에서 자주 나오는 **3가지 패턴**을 알아볼게요!

**패턴 1: 입력 검증 루프 (Validation Loop)**
\`\`\`
[INPUT Data]
   ↓
◇ Is Data valid? ◇ ←──┐
  |Yes         |No     |
  ↓            ↓       |
(계속)     [OUTPUT     |
           "Error"]    |
              ↓        |
           [INPUT Data]┘
\`\`\`

**패턴 2: 카운팅/합산 (Counting/Totalling)**
\`\`\`
[Count ← 0, Total ← 0]
   ↓
◇ 조건? ◇ ←──────┐
  |Yes    |No     |
  ↓       ↓       |
(처리) (OUTPUT)   |
  ↓               |
[Count←Count+1]──┘
\`\`\`

**패턴 3: 검색 (Searching)**
\`\`\`
[Found ← FALSE, i ← 0]
   ↓
◇ Found=FALSE AND i<Length? ◇ ←──┐
  |Yes              |No           |
  ↓                 ↓             |
◇ Item=Target? ◇  (결과출력)     |
  |Yes    |No                     |
  ↓       ↓                      |
[Found  [i←i+1]──────────────────┘
←TRUE]
  ↓
  └→──→──→┘
\`\`\`

이 패턴들을 기억해 두면 시험에서 큰 도움이 돼요!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 오류 찾기!",
          content: `한 학생이 **N개 숫자의 평균**을 구하는 플로우차트를 만들었어요. 입력이 **3, 6, 9** (N=3)일 때, 이 플로우차트의 문제점은?

\`\`\`
[START]
   ↓
[INPUT N]
[Total ← 0]
[Count ← 0]
   ↓
◇ Is Count < N? ◇ ←──────┐
  |Yes         |No        |
  ↓            ↓          |
[INPUT Num]  [Average ←   |
  ↓          Total / N]   |
[Total ←       ↓          |
Total+Num]  [OUTPUT       |
  ↓          Average]     |
[Count ←       ↓          |
Count+1]──┘ [STOP]        |
\`\`\`

Trace: Total = 3+6+9 = 18, Average = 18/3 = 6
결과는 맞게 나오는데... 이 플로우차트의 **설계 문제**는?`,
          options: [
            'N이 0일 때 0으로 나누는 오류가 발생한다',
            'Total을 초기화하지 않았다',
            'Count가 1부터 시작해야 한다',
            'Average를 출력하지 않는다'
          ],
          answer: 0,
          explanation: `일반적인 입력(3, 6, 9)에서는 올바르게 동작해요. 하지만 **N = 0**을 입력하면?

- Count=0, 0 < 0? → No → Average = Total / 0 → **0으로 나누기 오류!**

이것은 시험에서 자주 나오는 패턴이에요. 해결 방법:
- N을 입력받은 후 \`Is N > 0?\` 검사를 추가해야 해요
- 0으로 나누기(Division by Zero)를 방지하는 것은 중요한 검증이에요!`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 설계 퀴즈!",
          content: `"사용자에게 비밀번호를 입력받아서, 비밀번호가 'abc123'과 같으면 'Access Granted'를 출력하고, 다르면 'Access Denied'를 출력한 후 다시 입력받는다. 최대 3번까지만 시도할 수 있다."

이 요구사항을 구현하려면 어떤 플로우차트 패턴이 필요한가요?`,
          options: [
            '카운팅이 있는 입력 검증 루프 (Validation Loop with Counter)',
            '단순 선택문 (Simple Selection)',
            '합산 루프 (Totalling Loop)',
            '검색 패턴 (Search Pattern)'
          ],
          answer: 0,
          explanation: `이 문제는 두 가지가 필요해요:

1. **입력 검증 루프**: 비밀번호가 틀리면 다시 입력받아야 해요
2. **카운터**: 최대 3번까지만 시도할 수 있으므로 시도 횟수를 세야 해요

따라서 **카운팅이 있는 입력 검증 루프**가 필요해요! 루프 조건이 두 가지:
- 비밀번호가 틀렸을 때 AND
- 시도 횟수가 3 미만일 때`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 플로우차트 완성!",
          content: `다음은 1부터 10까지의 짝수만 출력하는 플로우차트를 수도코드로 변환한 것이에요. 빈칸을 채우세요.

플로우차트:
\`\`\`
[START] → [i ← 1]
   ↓
◇ Is i <= 10? ◇ ←──────────────┐
  |Yes          |No             |
  ↓             ↓               |
◇ Is i MOD 2 = 0? ◇  [STOP]   |
  |Yes        |No              |
  ↓           ↓               |
[OUTPUT i]   (skip)           |
  ↓           ↓               |
  └──→ [i ← i + 1] ──────────┘
\`\`\``,
          codeTemplate: 'i ← 1\nWHILE i <= 10 DO\n    IF i ___ 2 = 0 THEN\n        OUTPUT i\n    ENDIF\n    i ← i + 1\nENDWHILE',
          fillBlanks: [
            { id: 1, answer: "MOD", options: ["MOD", "DIV", "/", "*"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "시험 대비 연습",
      emoji: "📝",
      steps: [
        {
          id: "ch3-types",
          type: "explain",
          title: "📝 IGCSE 플로우차트 문제 유형",
          content: `IGCSE Computer Science Paper 2에서 나오는 **플로우차트 문제 유형**을 정리해 볼게요!

**유형 1: 플로우차트 추적 (Trace Table)**
- 주어진 입력으로 플로우차트를 추적해요
- Trace Table을 작성하고 최종 출력을 답해요
- 가장 자주 나오는 유형이에요!

**유형 2: 플로우차트 → 수도코드 변환**
- 플로우차트를 보고 동일한 수도코드를 작성해요
- IF, WHILE, REPEAT 등을 정확하게 써야 해요

**유형 3: 빈칸 채우기**
- 플로우차트의 일부가 비어있어요
- 올바른 조건, 처리, 입출력을 채워야 해요

**유형 4: 오류 찾기/수정**
- 잘못된 플로우차트를 보고 오류를 찾아요
- 올바른 수정 방법을 제시해야 해요

**유형 5: 플로우차트 설계**
- 문제 설명을 보고 플로우차트를 직접 그려요
- 올바른 기호, 흐름, Yes/No 레이블이 필요해요`
        },
        {
          id: "ch3-tips",
          type: "explain",
          title: "💡 시험 팁!",
          content: `IGCSE 시험에서 플로우차트 문제를 풀 때 주의할 점이에요!

**필수 체크리스트:**
- **START/STOP**: 반드시 타원형으로 표시했는지 확인하세요
- **올바른 기호**: 각 작업에 맞는 기호를 사용했는지 확인하세요
  - 입출력 → 평행사변형
  - 처리 → 직사각형
  - 조건 → 마름모
- **Yes/No 레이블**: Decision 기호에 반드시 Yes와 No를 표시하세요!
- **화살표 방향**: 모든 흐름선에 화살표가 있는지 확인하세요
- **하나의 STOP**: 여러 경로가 있어도 최종적으로 하나의 STOP으로 모아야 해요

**자주 하는 실수:**
- Decision 기호에 Yes/No를 안 써서 감점
- 화살표 없이 선만 그어서 감점
- Process(직사각형)에 입출력을 써서 감점
- STOP을 빠뜨려서 감점

**추적 시 팁:**
- 변수 값을 한 줄씩 적으면서 따라가세요
- 루프가 있으면 반복 횟수를 세면서 추적하세요
- 최종 답을 쓰기 전에 **한 번 더 확인**하세요!`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 오류 찾기!",
          content: `다음 플로우차트 설명에서 **오류**는 무엇인가요?

\`\`\`
[START] (직사각형)
   ↓
[INPUT Score] (평행사변형)
   ↓
◇ Is Score >= 50? ◇ (마름모)
  |Yes
  ↓
[OUTPUT "Pass"] (평행사변형)
  ↓
[STOP] (타원형)
\`\`\``,
          options: [
            'START가 직사각형이고, Decision에 No 경로가 없다',
            'Score를 평행사변형으로 입력받은 것이 틀리다',
            'STOP이 타원형인 것이 틀리다',
            'Decision의 조건이 잘못되었다'
          ],
          answer: 0,
          explanation: `두 가지 오류가 있어요!

**오류 1: START가 직사각형(Rectangle)**이에요
- START/STOP은 반드시 **타원형(Oval)**이어야 해요!

**오류 2: Decision에 No 경로가 없어요**
- 마름모(Decision)는 반드시 **Yes와 No** 두 개의 출구가 있어야 해요!
- Score < 50일 때 어떻게 할지가 빠져있어요

올바른 플로우차트는 START를 타원형으로 바꾸고, No 경로(예: OUTPUT "Fail")를 추가해야 해요.`
        },
        {
          id: "ch3-predict1",
          type: "predict",
          title: "🔮 복합 추적 문제!",
          content: `다음 플로우차트에 입력값 **4, 7, 2, 9, 1**이 차례로 주어질 때, 최종 출력은?

\`\`\`
[START]
   ↓
[Max ← 0]
[Min ← 999]
[Count ← 0]
   ↓
◇ Is Count < 5? ◇ ←──────────┐
  |Yes          |No           |
  ↓             ↓             |
[INPUT Num]  [OUTPUT          |
  ↓           Max - Min]      |
◇ Num>Max? ◇    ↓            |
 |Yes  |No   [STOP]          |
 ↓     ↓                     |
[Max←  ◇ Num<Min? ◇          |
 Num]   |Yes  |No            |
 ↓      ↓     ↓              |
 |   [Min←    |              |
 |    Num]    |              |
 ↓      ↓     ↓              |
 └──→ [Count←Count+1] ───────┘
\`\`\``,
          options: [
            '8',
            '9',
            '1',
            '10'
          ],
          answer: 0,
          explanation: `한 단계씩 추적해 볼게요!

| Count | Num | Max | Min |
|-------|-----|-----|-----|
| 0 | | 0 | 999 |
| | 4 | 4 | 4 |
| 1 | 7 | 7 | |
| 2 | 2 | | 2 |
| 3 | 9 | 9 | |
| 4 | 1 | | 1 |
| 5 | | | |

- Num=4: 4>0? Yes→Max=4, 4<999? Yes→Min=4
- Num=7: 7>4? Yes→Max=7, (스킵)
- Num=2: 2>7? No, 2<4? Yes→Min=2
- Num=9: 9>7? Yes→Max=9, (스킵)
- Num=1: 1>9? No, 1<2? Yes→Min=1

OUTPUT Max - Min = 9 - 1 = **8**

이 플로우차트는 **최댓값과 최솟값의 차이(범위)**를 구해요!`
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🧠 검증 유형 퀴즈!",
          content: `다음 플로우차트가 수행하는 검증(Validation)의 종류는?

\`\`\`
[START]
   ↓
[INPUT Mark]
   ↓
◇ Is Mark >= 0 AND Mark <= 100? ◇ ←──┐
  |Yes                      |No       |
  ↓                         ↓         |
[OUTPUT "Valid"]      [OUTPUT         |
  ↓                  "Invalid -       |
[STOP]               enter 0-100"]   |
                         ↓            |
                     [INPUT Mark] ────┘
\`\`\``,
          options: [
            'Range Check (범위 검사)',
            'Length Check (길이 검사)',
            'Type Check (자료형 검사)',
            'Presence Check (존재 검사)'
          ],
          answer: 0,
          explanation: `이 플로우차트는 Mark가 **0 이상 100 이하**인지 확인해요.

값이 허용된 **범위 안에 있는지** 확인하므로 **Range Check(범위 검사)**예요!

- Range Check: 값이 최솟값과 최댓값 사이에 있는지 확인
- 여기서는 0 <= Mark <= 100인지 확인해요
- 범위 밖이면 오류 메시지를 출력하고 다시 입력받아요

이것은 **입력 검증 루프(Validation Loop)** 패턴과 **Range Check**의 결합이에요!`
        }
      ]
    }
  ]
}
