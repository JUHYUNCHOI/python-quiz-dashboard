// ============================================
// 레슨 13: 반복문 (for)
// ============================================
import { LessonData } from './types'

export const lesson13Data: LessonData = {
  id: "13",
  title: "반복문 (for)",
  emoji: "🔄",
  description: "정해진 횟수만큼 반복하는 방법을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "for문 기초",
      emoji: "🔁",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔄 같은 걸 5 번? 100 번? — 복붙은 너무 힘들어",
          content: `"안녕하세요"를 5 번 찍어야 해요.

\`\`\`python
print("안녕하세요")
print("안녕하세요")
print("안녕하세요")
print("안녕하세요")
print("안녕하세요")
\`\`\`

5 번이면 어떻게든 되는데... **100 번**이면? 😱

손가락 아프죠. 그래서 만든 게 **반복문** = "for 문".`
        },
        {
          id: "for-explain",
          type: "explain",
          title: "🔁 for 문 = \"이만큼 반복해!\"",
          content: `\`\`\`python
for i in range(5):
    print("안녕하세요")
\`\`\`

이 4 줄이 "안녕하세요"를 **5 번** 찍어요!

각 부품 뜻:
- \`for\` = "반복해"
- \`i\` = 반복할 때마다 0, 1, 2, 3, 4 로 바뀌는 변수
- \`range(5)\` = **range = 범위**, 0 부터 5 직전까지 (= 0, 1, 2, 3, 4 → 5 개)
- \`:\` 콜론 + 들여쓰기 → if 문 때 배운 그 규칙!

> 💡 \`i\` 는 그냥 변수 이름. \`x\` 든 \`count\` 든 마음대로 — 보통 \`i\` (index = 차례).`
        },
        {
          id: "syntax-builder",
          type: "interactive",
          title: "🧱 for 문 조립해보기",
          content: `for 문이 어떻게 한 조각씩 쌓이는지 봐요. **▶ 재생** 누르고 따라가요!`,
          component: "pyForBuilder",
        },
        {
          id: "for-sim",
          type: "explain",
          title: "🔍 실행 추적 — for 가 한 줄씩 도는 모습",
          content: `for 문이 진짜로 어떻게 돌아가는지 한 줄씩 봐요!

total 에 1, 2, 3 이 차례로 더해지면서 i 와 total 이 어떻게 바뀌는지 눈으로 확인.

**▶ 실행하기** 또는 **▷ 한 단계** 눌러보세요.`,
          component: "codeTracePyForSum",
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 빈칸 채우기 — \"Hello!\" 3 번 찍기",
          task: "\"Hello!\" 를 정확히 3 번 출력하세요!",
          initialCode: "for i in range(___):\n    print(\"Hello!\")",
          expectedOutput: "Hello!\nHello!\nHello!",
          hint: "3 번 반복하려면 range(?) 안에 뭐가 들어가야 할까?",
          hint2: "3"
        },
        {
          id: "predict1",
          type: "predict",
          title: "💭 range(4) 면 몇 번 돌까?",
          content: "이 코드를 돌리면?\n\n```python\nfor i in range(4):\n    print(\"안녕\")\n```",
          options: ["3 번", "4 번", "5 번", "에러"],
          answer: 1,
          explanation: "range(4) = 0, 1, 2, 3 → 숫자 4 개 → 4 번 반복!\n\n핵심: range(n) 은 **0 부터 n 직전까지** = **n 개** 의 숫자."
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈 — for 문에 꼭 필요한 것",
          content: "for 문 다음 줄을 **들여쓰기** 안 하면?",
          options: ["그냥 잘 돌아감", "에러: IndentationError", "한 번만 반복", "무한 반복"],
          answer: 1,
          explanation: "if 문이랑 똑같아요! 콜론(:) + 들여쓰기 = 반복할 코드의 표시.\n안 하면 \"들여쓰기 잘못됐어요\" (IndentationError)."
        }
      ]
    },
    {
      id: "ch2",
      title: "range() 활용",
      emoji: "🔢",
      steps: [
        {
          id: "range-explain",
          type: "explain",
          title: "🔢 range() = \"어디부터 어디까지\" 정하기",
          content: `range 안에 숫자를 **1 개 / 2 개 / 3 개** 넣을 수 있어요. 각각 뜻이 달라요.

**① range(끝)** — 0 부터 끝 직전까지
\`\`\`python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4
\`\`\`

**② range(시작, 끝)** — 시작부터 끝 직전까지
\`\`\`python
for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5
\`\`\`

**③ range(시작, 끝, 간격)** — 간격만큼 뛰면서
\`\`\`python
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8
\`\`\`

> 💡 \`끝\` 은 **항상 안 포함**. 1 ~ 5 까지 찍고 싶으면 \`range(1, 6)\`!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 빈칸 채우기 — 1 부터 5 까지",
          task: "1, 2, 3, 4, 5 를 한 줄씩 출력하세요!",
          initialCode: "# 1 부터 5 까지 출력\nfor i in range(___, ___):\n    print(i)",
          expectedOutput: "1\n2\n3\n4\n5",
          hint: "끝은 안 포함이에요. 5 까지 찍으려면 끝에 뭐를 써야 할까?",
          hint2: "1 / 6"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 빈칸 채우기 — 짝수만 (2, 4, 6, 8, 10)",
          task: "2, 4, 6, 8, 10 — 2 씩 뛰면서 출력!",
          initialCode: "# 2 부터 10 까지 2 씩 증가\nfor i in range(___, ___, ___):\n    print(i)",
          expectedOutput: "2\n4\n6\n8\n10",
          hint: "range(시작, 끝, 간격) — 10 까지 포함하려면 끝은 11!",
          hint2: "2 / 11 / 2"
        },
        {
          id: "predict2",
          type: "predict",
          title: "💭 range(1, 10, 3) 은 뭘 만들까?",
          content: "이 코드의 결과는?\n\n```python\nfor i in range(1, 10, 3):\n    print(i)\n```",
          options: ["1, 2, 3", "1, 4, 7", "1, 4, 7, 10", "3, 6, 9"],
          answer: 1,
          explanation: "1 부터 시작 → 3 씩 더해요. 1 → 4 → 7 → (다음은 10 인데 끝이 10 이라 **안 포함**) → 멈춤!\n\n결과: 1, 4, 7"
        }
      ]
    },
    {
      id: "ch3",
      title: "문자열 순회와 합계",
      emoji: "🔤",
      steps: [
        {
          id: "list-explain",
          type: "explain",
          title: "🔤 문자열을 한 글자씩 꺼내기",
          content: `range 말고 **문자열** 도 for 문에 넣을 수 있어요. 그러면 글자가 **하나씩** 꺼내져요!

\`\`\`python
word = "사과"
for ch in word:
    print(ch)
# 사
# 과
\`\`\`

문법: **for 변수 in 문자열:**
\`ch\` 라는 변수에 **사 → 과** 가 차례로 들어가요. (변수 이름은 마음대로 — 글자라서 \`ch\` 추천)`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 빈칸 채우기 — 이름 세로로 쓰기",
          task: "이름을 한 글자씩 세로로 출력하세요!",
          initialCode: "name = \"홍길동\"\n\nfor ___ in name:\n    print(___)",
          expectedOutput: "홍\n길\n동",
          hint: "두 빈칸은 **같은 변수 이름** 이어야 해요. (글자라서 ch 추천)",
          hint2: "ch / ch"
        },
        {
          id: "sum-explain",
          type: "explain",
          title: "🧮 합계 구하기 — 변수 더하기 패턴",
          content: `for 문 + 변수 = **합계 구하기**!

\`\`\`python
total = 0   # 시작은 0 부터

for num in range(1, 6):   # 1, 2, 3, 4, 5
    total = total + num   # 매번 total 에 num 을 더해 다시 저장

print(f"합계: {total}")  # 합계: 15
\`\`\`

흐름:
- 첫 번째: total = 0 + 1 = 1
- 두 번째: total = 1 + 2 = 3
- ... 계속 누적 → 마지막: 15

> 💡 \`total = total + num\` 은 \`total += num\` 으로 짧게 쓸 수도 있어요.`
        },
        {
          id: "forif-sim",
          type: "explain",
          title: "🔍 실행 추적 — for + if 짝수/홀수 가르기",
          content: `반복문 안에서 **if** 로 짝수만 골라낼 수 있어요. 한 단계씩 따라가 보세요!

**▶ 실행하기** 또는 **▷ 한 단계** 눌러보세요.`,
          component: "codeTracePyForIf",
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 빈칸 채우기 — 1 부터 10 까지 합치기",
          task: "1 부터 10 까지 모두 더해 합계를 구하세요!",
          initialCode: "total = 0\n\nfor i in range(1, 11):\n    # total 에 i 를 더해 다시 total 에 넣으세요\n    total = ___\n\nprint(f\"합계: {total}\")",
          expectedOutput: "합계: 55",
          hint: "지금 total 에 이번 i 를 더한 값을, 다시 total 에 넣어요.",
          hint2: "total + i"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션 — 구구단 5 단 출력기",
          task: "구구단 **5 단** 을 출력하세요!\n\n```\n5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n...\n5 x 9 = 45\n```\n\n빈칸 3 개:\n- range 의 시작과 끝 — 1 부터 9 까지 (끝은 안 포함 기억!)\n- result — 5 와 i 를 어떻게 합쳐야 결과가 나올까?",
          initialCode: "dan = 5\n\nfor i in range(___, ___):\n    result = ___\n    print(f\"{dan} x {i} = {result}\")",
          expectedOutput: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45",
          hint: "1 ~ 9 까지 = range(1, 10). 곱셈은 * 기호!",
          hint2: "1 / 10 / dan * i"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 오늘 배운 것",
          content: `## 오늘 배운 것

✅ \`for i in range(n):\` — n 번 반복
✅ \`range(시작, 끝, 간격)\` — 범위 정하기 (끝은 안 포함!)
✅ \`for 글자 in 문자열:\` — 문자열 한 글자씩
✅ **합계 패턴** — \`total = total + num\` (또는 \`total += num\`)

다음 시간엔 **while 반복문** — "조건이 참인 동안 반복" 을 배워요! 🚀`
        }
      ]
    }
  ]
}
