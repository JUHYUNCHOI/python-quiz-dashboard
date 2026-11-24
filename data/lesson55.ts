// ============================================
// 레슨 55: 누적 합
// ============================================
// Part 9 는 원래 "텍스트 RPG 만들기" 4 과였다. 게임을 만드는 재미는 있었지만,
// 배치고사·사다리·승급 시험이 재는 것과 **겹치는 게 하나도 없었다** —
// 구간 합, 정렬, 이진 탐색, DP 를 묻는데 레슨 탭에 그걸 가르치는 과가 없었다.
// 그래서 Part 9 를 알고리즘 입문으로 바꿨다. 55~58 이 그 네 과다.
import { LessonData } from './types'

export const lesson55Data: LessonData = {
  id: "55",
  title: "누적 합",
  emoji: "📊",
  description: "구간의 합을 매번 더하지 않고 한 번의 뺄셈으로 구해요!",
  chapters: [
    {
      id: "ch1",
      title: "매번 더하면 느리다",
      emoji: "🐢",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `📊 오늘 배울 것 — 구간 합`,
          content: `숫자가 줄지어 있을 때 **"3번째부터 7번째까지 다 더하면?"** 같은 질문에 답하는 방법을 배워요.

1️⃣ **슬라이싱으로 더하기** — 제일 먼저 떠오르는 방법, 그리고 그 한계
2️⃣ **누적 합 만들기** — 앞에서부터 쌓아 둔 표
3️⃣ **뺄셈 한 번** — 쌓아 둔 표에서 구간 합을 꺼내기
4️⃣ **실전 형태** — 백준에서 그대로 나오는 "구간 합 구하기"`
        },
        {
          id: "slice-sum",
          type: "explain",
          title: `➕ 일단 더해보기`,
          content: `점수가 5 개 있어요. 2번째부터 4번째까지의 합을 구해볼게요.

\`\`\`python
score = [10, 20, 30, 40, 50]

print(sum(score[1:4]))   # 2번째 ~ 4번째 = 20 + 30 + 40
\`\`\`

\`score[1:4]\` 는 인덱스 1, 2, 3 — 사람이 세는 "2번째~4번째" 예요.

잘 되네요. \`sum()\` 하나로 끝나요.`
        },
        {
          id: "try-slice-sum",
          type: "tryit",
          title: `🖥️ 직접 해보기!`,
          task: `score 의 3번째부터 5번째까지(인덱스 2, 3, 4) 합을 출력하세요!`,
          initialCode: `score = [10, 20, 30, 40, 50]

print(sum(score[___:___]))`,
          expectedOutput: "120",
          hint: `인덱스 2 부터 시작해서 4 까지 포함 — 끝은 하나 더 큰 수를 써요.`,
          hint2: `2 / 5`
        },
        {
          id: "predict-many-queries",
          type: "predict",
          title: `💭 그런데 질문이 10만 개면?`,
          content: `숫자가 10만 개 있고, "a번째부터 b번째까지 합" 질문이 10만 개 들어와요.
질문마다 \`sum(score[a:b])\` 를 쓰면 어떻게 될까요?`,
          options: [
            "괜찮아요 — sum() 은 아주 빠르니까요",
            "느려요 — 질문 하나마다 최대 10만 번을 더하니까 전부 100억 번이 돼요"
          ],
          answer: 1,
          explanation: "sum() 은 결국 하나씩 다 더해요. 숫자 10만 개 × 질문 10만 개 = 100억 번. 컴퓨터가 1 초에 1 억 번쯤 더한다고 치면 100 초예요. 시험이면 시간 초과예요."
        },
        {
          id: "key-insight",
          type: "explain",
          title: `💡 같은 덧셈을 또 하고 있다`,
          content: `질문이 두 개 들어왔다고 해볼게요.

\`\`\`
질문 1: 1번째 ~ 4번째 합 → 10 + 20 + 30 + 40
질문 2: 1번째 ~ 5번째 합 → 10 + 20 + 30 + 40 + 50
\`\`\`

\`10 + 20 + 30 + 40\` 을 **두 번 더했어요.** 질문이 10만 개면 같은 덧셈을 수만 번 반복해요.

@핵심: 한 번 더한 결과를 **적어 두면** 다시 더할 필요가 없어요. 그게 누적 합이에요.`
        }
      ]
    },
    {
      id: "ch2",
      title: "누적 합 만들기",
      emoji: "📈",
      steps: [
        {
          id: "prefix-idea",
          type: "explain",
          title: `📈 앞에서부터 쌓아 둔 표`,
          content: `"처음부터 i번째까지의 합"을 미리 전부 적어 둬요. 이걸 **누적 합**(prefix sum)이라고 해요.

\`\`\`
score  =       10   20   30   40   50
prefix = 0     10   30   60  100  150
         ↑      ↑    ↑    ↑    ↑    ↑
      아무것도  1개  2개  3개  4개  5개
       안 더함  까지  까지  까지  까지  까지
\`\`\`

맨 앞에 **0** 을 하나 둔 게 중요해요. "아무것도 안 더한 합 = 0" 자리예요.
이 0 이 있으면 뒤에서 뺄셈할 때 예외 처리를 안 해도 돼요.`
        },
        {
          id: "prefix-build",
          type: "explain",
          title: `🔨 for 하나로 만든다`,
          content: `앞 칸의 값에 지금 숫자를 더해서 뒤에 붙이면 끝이에요.

\`\`\`python
score = [10, 20, 30, 40, 50]

prefix = [0]
for x in score:
    prefix.append(prefix[-1] + x)

print(prefix)   # [0, 10, 30, 60, 100, 150]
\`\`\`

\`prefix[-1]\` 은 "지금까지 쌓은 마지막 값"이에요. 거기에 \`x\` 를 더해 붙여요.

@핵심: 누적 합은 **한 번만** 만들어요. 길이 n 이면 덧셈 n 번. 그 뒤로는 질문이 몇 개든 다시 안 만들어요.`
        },
        {
          id: "try-prefix-build",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 누적 합 만들기`,
          task: `빈칸을 채워 prefix 를 완성하세요!`,
          initialCode: `nums = [3, 1, 4, 1, 5]

prefix = [0]
for x in nums:
    prefix.append(prefix[___] + x)

print(prefix)`,
          expectedOutput: "[0, 3, 4, 8, 9, 14]",
          hint: `방금 붙인 마지막 값을 가져와야 해요. 리스트의 맨 끝 인덱스는?`,
          hint2: `-1`
        },
        {
          id: "predict-prefix-length",
          type: "predict",
          title: `💭 prefix 의 길이는?`,
          content: `숫자가 \`n\` 개일 때 \`prefix\` 리스트의 길이는 몇일까요?`,
          options: ["n 개", "n + 1 개"],
          answer: 1,
          explanation: "맨 앞에 0 을 한 칸 더 뒀으니까요. 숫자 5 개면 prefix 는 6 칸 ([0, 10, 30, 60, 100, 150])."
        }
      ]
    },
    {
      id: "ch3",
      title: "뺄셈 한 번으로 꺼내기",
      emoji: "➖",
      steps: [
        {
          id: "subtract-idea",
          type: "explain",
          title: `➖ 큰 것에서 작은 것을 뺀다`,
          content: `2번째부터 4번째까지의 합이 필요해요.

\`\`\`
prefix[4] = 1번째 ~ 4번째 합 = 100
prefix[1] = 1번째        합 =  10
                            ────────
            2번째 ~ 4번째 합 =  90
\`\`\`

\`\`\`python
prefix = [0, 10, 30, 60, 100, 150]

print(prefix[4] - prefix[1])   # 90
\`\`\`

a번째부터 b번째까지의 합 = \`prefix[b] - prefix[a - 1]\`

@핵심: 몇 개를 더해야 하든 **뺄셈 한 번**이에요. 구간이 10만 칸이어도 똑같이 한 번.`
        },
        {
          id: "interactive-check",
          type: "explain",
          title: `🔍 왜 a - 1 인가`,
          content: `\`prefix[a - 1]\` 은 "a번째 **앞까지**의 합"이에요. 그걸 빼면 a번째가 살아남아요.

\`\`\`
a = 2, b = 4 라면
prefix[b]     = prefix[4] → 10 + 20 + 30 + 40
prefix[a - 1] = prefix[1] → 10
빼면                        → 20 + 30 + 40   ✅ 2번째가 포함됨
\`\`\`

\`prefix[a]\` 를 빼면 20 까지 사라져서 **3번째부터**가 되어버려요. 한 칸 차이로 답이 틀려요.

🚫 자주 하는 실수: \`prefix[b] - prefix[a]\``
        },
        {
          id: "try-range-sum",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 구간 합 꺼내기`,
          task: `nums 의 2번째부터 4번째까지(1+4+1=6) 합을 뺄셈으로 구하세요!`,
          initialCode: `nums = [3, 1, 4, 1, 5]
prefix = [0]
for x in nums:
    prefix.append(prefix[-1] + x)
# prefix = [0, 3, 4, 8, 9, 14]

a, b = 2, 4
print(prefix[b] - prefix[___])`,
          expectedOutput: "6",
          hint: `a번째 앞까지의 합을 빼야 해요. a 가 2 니까 인덱스는?`,
          hint2: `a - 1`
        },
        {
          id: "predict-whole-sum",
          type: "predict",
          title: `💭 전체 합은 어떻게?`,
          content: `숫자가 5 개일 때 **전체 합**(1번째~5번째)을 누적 합으로 구하면?`,
          options: ["prefix[5] - prefix[0]", "prefix[5] - prefix[1]"],
          answer: 0,
          explanation: "a = 1 이니까 prefix[a - 1] = prefix[0] = 0. 맨 앞에 0 을 둔 덕분에 전체 합도 똑같은 식으로 구해져요 — 'a 가 1 이면 어쩌지' 같은 예외 처리가 필요 없어요."
        },
        {
          id: "mission-two-queries",
          type: "mission",
          title: `🏆 미션 — 질문 두 개 답하기`,
          task: `누적 합을 만들고, (2, 4) 와 (1, 5) 두 구간의 합을 각각 한 줄씩 출력하세요!`,
          initialCode: `nums = [10, 20, 30, 40, 50]

prefix = [0]
for x in nums:
    prefix.append(prefix[-1] + x)

for a, b in [(2, 4), (1, 5)]:
    print(prefix[___] - prefix[___])`,
          expectedOutput: "90\n150",
          hint: `뒤쪽은 b 그대로, 앞쪽은 a - 1.`,
          hint2: `b / a - 1`
        }
      ]
    },
    {
      id: "ch4",
      title: "실전 — 구간 합 구하기",
      emoji: "🎯",
      steps: [
        {
          id: "real-problem",
          type: "explain",
          title: `🎯 시험에 나오는 모양`,
          content: `백준·승급 시험에서는 이렇게 나와요.

\`\`\`
[입력]
첫 줄: 숫자의 개수 N, 질문의 개수 M
둘째 줄: 숫자 N 개
그 다음 M 줄: 각 줄에 a b

[출력]
질문마다 a번째부터 b번째까지의 합을 한 줄씩
\`\`\`

\`\`\`
예제 입력          예제 출력
5 3                 15
1 2 3 4 5           12
1 3                 15
2 4
1 5
\`\`\`

입력을 받는 부분만 더해지면 지금까지 배운 게 그대로 답이에요.`
        },
        {
          id: "full-solution",
          type: "explain",
          title: `📝 전체 코드`,
          content: `\`\`\`python
n, m = map(int, input().split())
nums = list(map(int, input().split()))

prefix = [0]
for x in nums:
    prefix.append(prefix[-1] + x)

for _ in range(m):
    a, b = map(int, input().split())
    print(prefix[b] - prefix[a - 1])
\`\`\`

누적 합을 만드는 건 \`n\` 번, 질문에 답하는 건 \`m\` 번. 더해서 \`n + m\` 번이에요.
\`sum()\` 으로 풀면 \`n × m\` 번이었죠 — 10만 × 10만 = 100억 이 20만 이 됐어요.`
        },
        {
          id: "mission-real",
          type: "mission",
          title: `🏆 최종 미션 — 입력까지 받아서`,
          task: `입력을 받아 질문마다 구간 합을 출력하세요! (빈칸 2개)`,
          initialCode: `n, m = map(int, input().split())
nums = list(map(int, input().split()))

prefix = [0]
for x in nums:
    prefix.append(prefix[-1] + x)

for _ in range(m):
    a, b = map(int, input().split())
    print(prefix[___] - prefix[___])`,
          stdin: "5 3\n1 2 3 4 5\n1 3\n2 4\n1 5\n",
          expectedOutput: "6\n9\n15",
          hint: `prefix[b] 에서 prefix[a - 1] 을 빼요.`,
          hint2: `b / a - 1`
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 완료!`,
          content: `## 오늘 배운 것

✅ **같은 덧셈 반복** — 질문마다 \`sum()\` 하면 \`n × m\` 번
✅ **누적 합** — \`prefix = [0]\` 으로 시작해서 \`prefix[-1] + x\` 를 붙여 나가기
✅ **구간 합** — \`prefix[b] - prefix[a - 1]\` (뺄셈 한 번!)
✅ **맨 앞의 0** — 전체 합도 예외 없이 같은 식으로

🚫 \`prefix[b] - prefix[a]\` 는 한 칸 밀린 오답이에요. 꼭 \`a - 1\`.

다음엔 정렬로 푸는 문제들을 봐요.`
        }
      ]
    }
  ]
}
