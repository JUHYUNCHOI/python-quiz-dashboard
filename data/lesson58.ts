// ============================================
// 레슨 58: 동적 계획법 첫걸음
// ============================================
// 36 과에서 재귀를 배우지만 "재귀가 왜 느린가"와 "그걸 어떻게 고치는가"는
// 안 다룬다. 배치고사 최고 난이도(플래티넘 I)가 동전 최소 개수다 —
// 그 문제를 풀 수 있게 하는 게 이 과의 목표다.
import { LessonData } from './types'

export const lesson58Data: LessonData = {
  id: "58",
  title: "동적 계획법 첫걸음",
  emoji: "🧱",
  description: "작은 답을 적어 두고 쌓아 올려 큰 답을 만들어요!",
  chapters: [
    {
      id: "ch1",
      title: "재귀는 같은 걸 또 계산한다",
      emoji: "🔁",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `🧱 오늘 배울 것 — 답을 적어 두기`,
          content: `55 과에서 덧셈을 적어 뒀죠. 이번엔 **문제의 답**을 적어 둬요.

1️⃣ **재귀의 낭비** — 피보나치가 왜 터지는지
2️⃣ **적어 두기** — 표 한 줄로 고치기
3️⃣ **계단 오르기** — 점화식을 스스로 찾는 연습
4️⃣ **동전 최소 개수** — 배치고사 최고 난이도 문제`
        },
        {
          id: "fib-recursive",
          type: "explain",
          title: `🔁 피보나치, 재귀로`,
          content: `앞의 두 수를 더하는 수열이에요. 1, 1, 2, 3, 5, 8, 13...

\`\`\`python
def fib(n):
    if n <= 2:
        return 1
    return fib(n - 1) + fib(n - 2)

print(fib(10))   # 55
\`\`\`

정의를 그대로 옮겼으니 보기 좋고, 작은 \`n\` 에서는 잘 돌아요.`
        },
        {
          id: "fib-tree",
          type: "explain",
          title: `🌳 그런데 같은 걸 몇 번이나 부를까`,
          content: `\`fib(5)\` 를 부르면 이렇게 퍼져요.

\`\`\`
                fib(5)
              /        \\
         fib(4)        fib(3)
        /     \\        /     \\
   fib(3)  fib(2)  fib(2)  fib(1)
   /    \\
fib(2) fib(1)
\`\`\`

\`fib(3)\` 이 **두 번**, \`fib(2)\` 가 **세 번** 불렸어요. \`n\` 이 커지면:

| n | 호출 횟수 |
|---|---|
| 10 | 109 번 |
| 30 | 약 160 만 번 |
| 50 | 약 250 억 번 |

@핵심: \`fib(30)\` 의 답은 하나인데 160 만 번 계산해요. **같은 답을 매번 새로 구하고 있어요.**`
        },
        {
          id: "predict-fib50",
          type: "predict",
          title: `💭 fib(50) 을 재귀로 돌리면?`,
          content: `위 재귀 코드로 \`fib(50)\` 을 구하면?`,
          options: ["금방 나와요 — 숫자 하나 구하는 거니까", "몇 분 넘게 걸려요 — 250 억 번을 호출하니까"],
          answer: 1,
          explanation: "답은 12,586,269,025 라는 숫자 하나지만, 그걸 구하려고 250 억 번 함수를 불러요. 답이 작다고 계산이 작은 게 아니에요."
        }
      ]
    },
    {
      id: "ch2",
      title: "적어 두면 한 번씩만",
      emoji: "📝",
      steps: [
        {
          id: "memo-idea",
          type: "explain",
          title: `📝 표에 적어 두기`,
          content: `\`fib(3)\` 을 한 번 구했으면 **적어 두고**, 다음엔 그걸 읽어요.

\`\`\`python
def fib(n, memo={}):
    if n <= 2:
        return 1
    if n in memo:          # 이미 구해 놨으면 읽기만
        return memo[n]
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]

print(fib(50))   # 12586269025  — 즉시 나와요
\`\`\`

\`n\` 마다 **딱 한 번**만 계산해요. 250 억 번이 50 번이 됐어요.

@핵심: 이게 **동적 계획법**이에요. 어려운 이름이지만 하는 일은 "구한 답을 적어 두기" 하나예요.`
        },
        {
          id: "bottom-up",
          type: "explain",
          title: `🧱 아래에서부터 쌓아 올리기`,
          content: `재귀 없이, 작은 것부터 **순서대로** 채우면 더 간단해요.

\`\`\`python
n = 50
dp = [0] * (n + 1)
dp[1] = dp[2] = 1

for i in range(3, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]

print(dp[n])   # 12586269025
\`\`\`

\`dp[i]\` 를 채울 때 \`dp[i-1]\`, \`dp[i-2]\` 는 **이미 채워져 있어요** — 작은 것부터 돌았으니까요.

💡 \`dp\` 는 "dynamic programming" 의 약자이자, 관례적으로 쓰는 표 이름이에요.

@핵심: 재귀보다 **for 로 쌓아 올리는 쪽**이 보통 더 빠르고, 재귀 깊이 제한도 안 걸려요.`
        },
        {
          id: "try-fib-dp",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 표로 피보나치`,
          task: `빈칸을 채워 dp 표로 fib(10) 을 구하세요!`,
          initialCode: `n = 10
dp = [0] * (n + 1)
dp[1] = dp[2] = 1

for i in range(3, n + 1):
    dp[i] = dp[i - 1] + dp[i - ___]

print(dp[n])`,
          expectedOutput: "55",
          hint: `피보나치는 '앞의 두 수'를 더해요. 하나는 i-1, 다른 하나는?`,
          hint2: `2`
        },
        {
          id: "predict-dp-size",
          type: "predict",
          title: `💭 표 크기를 n 으로 만들면?`,
          content: `\`dp = [0] * (n + 1)\` 대신 \`dp = [0] * n\` 으로 만들면?`,
          options: ["똑같이 동작해요", "dp[n] 에서 IndexError 가 나요"],
          answer: 1,
          explanation: "길이가 n 이면 쓸 수 있는 인덱스는 0 ~ n-1 이에요. dp[n] 은 없어요. 'n번째 답'을 dp[n] 에 넣고 싶으면 칸이 n+1 개 필요해요 — 0번 칸을 쓰지 않고 비워 두는 거죠."
        }
      ]
    },
    {
      id: "ch3",
      title: "점화식 찾는 연습",
      emoji: "🪜",
      steps: [
        {
          id: "stairs-problem",
          type: "explain",
          title: `🪜 계단 오르기`,
          content: `한 번에 **1칸 또는 2칸**씩 오를 수 있어요. n 칸을 오르는 방법은 몇 가지일까요?

\`\`\`
n = 1 → (1)                        1 가지
n = 2 → (1,1) (2)                  2 가지
n = 3 → (1,1,1) (1,2) (2,1)        3 가지
n = 4 → (1,1,1,1) (1,1,2) (1,2,1)
        (2,1,1) (2,2)              5 가지
\`\`\`

1, 2, 3, 5... 어디서 본 수열이죠?`
        },
        {
          id: "predict-stairs",
          type: "predict",
          title: `💭 n 칸에 도착하기 직전은?`,
          content: `n 칸에 도착했다면 **마지막 한 걸음**은 1칸 또는 2칸이었어요. 그러면 \`dp[n]\` 은?`,
          options: [
            "dp[n] = dp[n-1] + dp[n-2] — n-1 에서 1칸 온 경우 + n-2 에서 2칸 온 경우",
            "dp[n] = dp[n-1] × 2 — 매 칸마다 선택이 2개니까"
          ],
          answer: 0,
          explanation: "n 칸에 도착하는 모든 방법은 'n-1 에 있다가 1칸' 아니면 'n-2 에 있다가 2칸' 중 하나예요. 둘은 겹치지 않으니 그냥 더하면 돼요. 이렇게 '큰 문제 = 작은 문제들의 합'으로 쓴 식을 점화식이라고 해요."
        },
        {
          id: "recurrence-recipe",
          type: "explain",
          title: `🍳 점화식 찾는 순서`,
          content: `DP 문제는 전부 이 두 가지만 정하면 끝이에요.

1️⃣ **dp[i] 가 무슨 뜻인지 한 문장으로** — "i 칸을 오르는 방법의 수"
2️⃣ **마지막 한 걸음을 뭐였을지 나눠 보기** — 1칸이었나? 2칸이었나?

\`\`\`python
n = 4
dp = [0] * (n + 1)
dp[0] = 1          # 0 칸: 아무것도 안 하는 1 가지
dp[1] = 1

for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]

print(dp[n])   # 5
\`\`\`

💡 \`dp[0] = 1\` 이 어색하면 "출발점에 서 있는 방법이 1 가지"라고 생각하세요.
이 한 칸을 잘못 두면 전체 답이 밀려요.`
        },
        {
          id: "try-stairs",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 10칸 계단`,
          task: `10칸 계단을 오르는 방법의 수를 구하세요!`,
          initialCode: `n = 10
dp = [0] * (n + 1)
dp[0] = ___
dp[1] = 1

for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]

print(dp[n])`,
          expectedOutput: "89",
          hint: `0칸을 오르는 방법은 '아무것도 안 하기' 한 가지예요.`,
          hint2: `1`
        },
        {
          id: "try-three-steps",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 3칸까지 뛸 수 있다면`,
          task: `1, 2, 3칸씩 오를 수 있을 때 5칸 오르는 방법의 수를 구하세요!`,
          initialCode: `n = 5
dp = [0] * (n + 1)
dp[0] = 1
dp[1] = 1
dp[2] = 2

for i in range(3, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - ___]

print(dp[n])`,
          expectedOutput: "13",
          hint: `마지막 걸음이 3칸이었다면 그 전엔 몇 칸에 있었을까요?`,
          hint2: `3`
        }
      ]
    },
    {
      id: "ch4",
      title: "실전 — 동전 최소 개수",
      emoji: "🪙",
      steps: [
        {
          id: "coin-problem",
          type: "explain",
          title: `🪙 동전을 가장 적게`,
          content: `동전 종류가 주어져요. 목표 금액을 만드는 **최소 동전 개수**를 구해요.

\`\`\`
동전: 1, 4, 5     목표: 8

큰 것부터 욕심내면: 5 + 1 + 1 + 1 = 4 개
정답은:            4 + 4         = 2 개   ✅
\`\`\`

@핵심: **"큰 동전부터 쓰면 된다"가 틀릴 수 있어요.** 그래서 전부 따져봐야 하고, 그게 DP 예요.`
        },
        {
          id: "coin-recurrence",
          type: "explain",
          title: `🍳 점화식 — 마지막 동전은?`,
          content: `아까 배운 순서를 그대로 적용해요.

1️⃣ \`dp[i]\` = **i 원을 만드는 최소 동전 개수**
2️⃣ 마지막에 넣은 동전이 \`c\` 였다면, 그 전엔 \`i - c\` 원이었어요 → \`dp[i - c] + 1\`

동전 종류마다 다 해보고 **가장 작은 것**을 고르면 돼요.

\`\`\`python
coins = [1, 4, 5]
target = 8
INF = float("inf")          # "아직 못 만듦" 표시

dp = [INF] * (target + 1)
dp[0] = 0                   # 0 원은 동전 0 개
for i in range(1, target + 1):
    for c in coins:
        if c <= i:
            dp[i] = min(dp[i], dp[i - c] + 1)

print(dp[target])   # 2
\`\`\`

💡 \`INF\` 를 쓰는 이유: \`dp[i]\` 를 0 으로 시작하면 \`min()\` 이 늘 0 을 골라요. "아직 아무 답도 없음"은 **무한대**로 둬야 \`min()\` 이 제대로 작동해요.`
        },
        {
          id: "predict-inf",
          type: "predict",
          title: `💭 못 만드는 금액이면?`,
          content: `동전이 \`[3, 5]\` 뿐일 때 \`dp[4]\` 는 어떻게 될까요?`,
          options: ["0 이 돼요", "INF 로 남아요 — 4 원은 3 과 5 로 만들 수 없으니까"],
          answer: 1,
          explanation: "4 = 3+? 도 5+? 도 안 돼요. 그래서 dp[4] 는 끝까지 INF 로 남아요. 문제에서 '만들 수 없으면 -1' 이라고 하면 마지막에 if dp[target] == INF: print(-1) 을 붙여요."
        },
        {
          id: "try-coin",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 최소 동전`,
          task: `빈칸을 채워 8 원을 만드는 최소 동전 개수를 구하세요!`,
          initialCode: `coins = [1, 4, 5]
target = 8
INF = float("inf")

dp = [INF] * (target + 1)
dp[0] = ___
for i in range(1, target + 1):
    for c in coins:
        if c <= i:
            dp[i] = min(dp[i], dp[i - c] + 1)

print(dp[target])`,
          expectedOutput: "2",
          hint: `0 원을 만드는 데 필요한 동전은 몇 개?`,
          hint2: `0`
        },
        {
          id: "mission-real",
          type: "mission",
          title: `🏆 최종 미션 — 입력받아 최소 동전`,
          task: `입력을 받아 최소 동전 개수를 출력하세요! 만들 수 없으면 -1 (빈칸 2개)`,
          initialCode: `n, target = map(int, input().split())
coins = list(map(int, input().split()))
INF = float("inf")

dp = [INF] * (target + 1)
dp[0] = 0
for i in range(1, target + 1):
    for c in coins:
        if c <= i:
            dp[i] = ___(dp[i], dp[i - c] + 1)

print(-1 if dp[target] == INF else dp[___])`,
          stdin: "3 8\n1 4 5\n",
          expectedOutput: "2",
          hint: `가장 작은 걸 고르는 함수, 그리고 목표 금액 칸.`,
          hint2: `min / target`
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 Part 9 완료!`,
          content: `## 오늘 배운 것

✅ **재귀의 낭비** — \`fib(50)\` 은 250 억 번 호출, 답은 하나
✅ **적어 두기** — \`memo\` 또는 \`dp\` 표에 한 번만 계산해 저장
✅ **쌓아 올리기** — 작은 것부터 for 로 채우면 재귀 깊이 걱정이 없어요
✅ **점화식 찾는 순서** — ① dp[i] 의 뜻을 한 문장으로 ② 마지막 한 걸음을 나눠 보기
✅ **최소를 구할 때** — 시작값은 \`0\` 이 아니라 \`INF\`

🚫 \`dp = [0] * n\` 은 \`dp[n]\` 에서 터져요 → \`n + 1\`.
🚫 큰 동전부터 쓰는 욕심쟁이 방법은 \`[1,4,5]\` 로 8 원에서 틀려요.

## Part 9 전체

| 과 | 주제 | 어디에 쓰나 |
|---|---|---|
| 55 | 누적 합 | 구간 합 구하기 (골드 I) |
| 56 | 정렬로 푸는 문제 | 많이 나온 단어 K개 / 구간 병합 (골드 II · 플래 II) |
| 57 | 이진 탐색 | 배치고사 그 자체 |
| 58 | 동적 계획법 | 동전 최소 개수 (플래 I) |

이제 사다리의 골드~플래티넘 문제를 풀 준비가 됐어요. 연습 탭으로 가요!`
        }
      ]
    }
  ]
}
