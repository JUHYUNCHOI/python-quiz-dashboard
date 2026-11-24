// ============================================
// 레슨 57: 이진 탐색
// ============================================
import { LessonData } from './types'

export const lesson57Data: LessonData = {
  id: "57",
  title: "이진 탐색",
  emoji: "🔍",
  description: "반씩 잘라내며 찾아요 — 100만 개를 20번에!",
  chapters: [
    {
      id: "ch1",
      title: "하나씩 찾으면 느리다",
      emoji: "🐢",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `🔍 오늘 배울 것 — 반씩 자르기`,
          content: `이 앱의 **배치고사**가 문제 3~4개로 티어 10개 중 하나를 고르는 방법이 바로 이거예요.

1️⃣ **하나씩 찾기** — \`in\` 의 한계
2️⃣ **반씩 자르기** — 왜 100만 개가 20번이 되는지
3️⃣ **직접 짜기** — lo, hi, mid 세 변수
4️⃣ **bisect** — 파이썬이 이미 만들어 둔 것`
        },
        {
          id: "linear-search",
          type: "explain",
          title: `🐢 앞에서부터 하나씩`,
          content: `리스트에 7 이 있는지 보려면 보통 이렇게 해요.

\`\`\`python
nums = [1, 3, 5, 7, 9, 11]

print(7 in nums)   # True
\`\`\`

\`in\` 은 **앞에서부터 하나씩** 비교해요. 1 → 3 → 5 → 7, 네 번 만에 찾았어요.

운이 나쁘면? 찾는 값이 맨 뒤에 있거나 아예 없으면 **전부** 봐야 해요.`
        },
        {
          id: "predict-million",
          type: "predict",
          title: `💭 100만 개에서 10만 번 찾으면?`,
          content: `숫자 100만 개짜리 리스트에서 \`in\` 으로 10만 번 검색하면 최악의 경우 몇 번 비교할까요?`,
          options: ["100만 번", "1000억 번 (100만 × 10만)"],
          answer: 1,
          explanation: "검색 한 번에 최대 100만 번 비교 × 검색 10만 번 = 1000억 번. 절대 시간 안에 안 끝나요."
        },
        {
          id: "sorted-hint",
          type: "explain",
          title: `💡 정렬돼 있다는 걸 안 쓰고 있다`,
          content: `\`nums = [1, 3, 5, 7, 9, 11]\` — 이건 **이미 작은 순으로 정렬돼 있어요.**

\`in\` 은 그걸 전혀 쓰지 않아요. 정렬된 리스트에서 가운데 값을 봤을 때:

\`\`\`
nums = [1, 3, 5, 7, 9, 11]
                ↑ 가운데 = 7

7 보다 작은 걸 찾는 중? → 오른쪽은 다 7 이상이니까 **볼 필요가 없어요**
7 보다 큰 걸 찾는 중?  → 왼쪽은 다 7 이하니까 **볼 필요가 없어요**
\`\`\`

@핵심: 한 번 비교할 때마다 **후보의 절반이 사라져요.** 이게 이진 탐색이에요.`
        }
      ]
    },
    {
      id: "ch2",
      title: "반씩 자르면 얼마나 빠른가",
      emoji: "⚡",
      steps: [
        {
          id: "halving-table",
          type: "explain",
          title: `⚡ 절반, 절반, 절반...`,
          content: `100만 개에서 시작해 계속 반으로 줄이면:

\`\`\`
100만 → 50만 → 25만 → 12만 → 6만 → 3만 → 1.5만 → 8천
→ 4천 → 2천 → 1천 → 500 → 250 → 125 → 62 → 31
→ 15 → 7 → 3 → 1
\`\`\`

**20 번**이에요. 100만 번이 20 번이 됐어요.

| 데이터 개수 | 하나씩 | 반씩 자르기 |
|---|---|---|
| 1,000 | 1,000 번 | 10 번 |
| 100만 | 100만 번 | 20 번 |
| 10억 | 10억 번 | 30 번 |

@핵심: 데이터가 1000 배 늘어도 비교는 10 번만 늘어요. 이걸 \`log\` 라고 불러요.`
        },
        {
          id: "predict-placement",
          type: "predict",
          title: `💭 배치고사도 같은 원리`,
          content: `이 앱의 배치고사는 난이도 1~10 단계 중 학생의 실력이 어디인지를 찾아요.
문제를 **최대 몇 개** 내면 10 단계를 다 가를 수 있을까요?`,
          options: ["10개 — 단계마다 하나씩", "4개 — 10 → 5 → 3 → 2 → 1 로 반씩 줄어드니까"],
          answer: 1,
          explanation: "후보가 11 개(0단계 포함)여도 반씩 자르면 4 번이면 충분해요. 그래서 배치고사가 문제 10개를 다 내지 않고 3~4개로 끝나요. 여러분이 치는 시험이 바로 이진 탐색이에요."
        },
        {
          id: "precondition",
          type: "explain",
          title: `⚠️ 전제 조건 — 정렬돼 있어야 한다`,
          content: `이진 탐색은 **"가운데보다 작으면 왼쪽에만 있다"** 를 믿고 반을 버려요.
정렬이 안 돼 있으면 이 믿음이 깨져서 **있는 값도 못 찾아요.**

\`\`\`python
nums = [5, 1, 9, 3]     # 정렬 안 됨
# 가운데가 9 → "3 은 9 보다 작으니 왼쪽" → [5, 1] 만 봄 → 3 을 못 찾음 ❌
\`\`\`

🚫 자주 하는 실수: 정렬을 안 하고 이진 탐색을 돌리는 것. 에러가 안 나고 **조용히 틀린 답**이 나와요.

\`\`\`python
nums.sort()      # ✅ 먼저 정렬
\`\`\``
        }
      ]
    },
    {
      id: "ch3",
      title: "직접 짜보기",
      emoji: "✍️",
      steps: [
        {
          id: "three-vars",
          type: "explain",
          title: `✍️ 변수 세 개 — lo, hi, mid`,
          content: `"아직 가능성이 남은 구간"을 \`lo\` 와 \`hi\` 로 들고 다녀요.

\`\`\`python
def find(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid          # 찾았다
        if nums[mid] < target:
            lo = mid + 1        # 가운데가 작다 → 오른쪽만 남긴다
        else:
            hi = mid - 1        # 가운데가 크다 → 왼쪽만 남긴다
    return -1                   # 없다
\`\`\`

\`\`\`
nums = [1, 3, 5, 7, 9, 11], target = 9
lo=0 hi=5 mid=2 → nums[2]=5 < 9  → lo=3
lo=3 hi=5 mid=4 → nums[4]=9 == 9 → 찾았다! 인덱스 4
\`\`\`

@핵심: \`mid + 1\`, \`mid - 1\` 의 **1 이 중요해요.** 가운데는 이미 확인했으니 구간에서 빼야 해요.`
        },
        {
          id: "predict-infinite",
          type: "predict",
          title: `💭 1 을 빼먹으면?`,
          content: `\`lo = mid + 1\` 대신 \`lo = mid\` 라고 쓰면 어떻게 될까요?`,
          options: [
            "결과는 같고 조금 느려져요",
            "구간이 줄지 않아서 while 이 영원히 돌아요"
          ],
          answer: 1,
          explanation: "lo=3, hi=4 일 때 mid=(3+4)//2=3. lo=mid 라고 쓰면 lo 가 그대로 3 이라 구간이 하나도 안 줄어요. 다음 반복에서 또 mid=3 → 무한 루프. 이미 확인한 mid 는 반드시 구간에서 빼야 해요."
        },
        {
          id: "try-binary",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 이진 탐색 완성`,
          task: `빈칸을 채워 7 의 인덱스를 찾으세요!`,
          initialCode: `nums = [1, 3, 5, 7, 9, 11]
target = 7

lo, hi = 0, len(nums) - 1
while lo <= hi:
    mid = (lo + hi) // 2
    if nums[mid] == target:
        print(mid)
        break
    if nums[mid] < target:
        lo = mid + ___
    else:
        hi = mid - ___`,
          expectedOutput: "3",
          hint: `가운데는 이미 확인했으니 구간에서 한 칸 빼요.`,
          hint2: `1 / 1`
        },
        {
          id: "try-count-steps",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 몇 번 봤나 세기`,
          task: `1부터 100까지 중에서 99 를 찾을 때 비교를 몇 번 하는지 세보세요!`,
          initialCode: `nums = list(range(1, 101))
target = 99

lo, hi = 0, len(nums) - 1
steps = 0
while lo <= hi:
    steps += ___
    mid = (lo + hi) // 2
    if nums[mid] == target:
        break
    if nums[mid] < target:
        lo = mid + 1
    else:
        hi = mid - 1

print(steps)`,
          expectedOutput: "6",
          hint: `한 번 돌 때마다 1 씩 더해요.`,
          hint2: `1`
        },
        {
          id: "mission-binary",
          type: "mission",
          title: `🏆 미션 — 없는 값이면 -1`,
          task: `정렬 후 이진 탐색으로 8 을 찾고, 없으면 -1 을 출력하세요!`,
          initialCode: `nums = [9, 1, 7, 3, 11, 5]
nums.___()          # 이진 탐색 전에 꼭!
target = 8

lo, hi = 0, len(nums) - 1
ans = -1
while lo <= hi:
    mid = (lo + hi) // 2
    if nums[mid] == target:
        ans = mid
        break
    if nums[mid] < target:
        lo = mid + 1
    else:
        hi = mid - 1

print(ans)`,
          expectedOutput: "-1",
          hint: `이진 탐색의 전제 조건을 만들어야 해요.`,
          hint2: `sort`
        }
      ]
    },
    {
      id: "ch4",
      title: "bisect — 이미 만들어져 있다",
      emoji: "📦",
      steps: [
        {
          id: "bisect-intro",
          type: "explain",
          title: `📦 직접 안 짜도 돼요`,
          content: `파이썬에는 \`bisect\` 모듈이 있어요. 시험에서는 보통 이걸 써요 — 짧고 틀릴 일이 없어요.

\`\`\`python
import bisect

nums = [1, 3, 5, 7, 9, 11]

print(bisect.bisect_left(nums, 7))    # 3  ← 7 이 들어갈 자리 (왼쪽 끝)
print(bisect.bisect_right(nums, 7))   # 4  ← 7 이 들어갈 자리 (오른쪽 끝)
\`\`\`

\`bisect_left\` 는 "이 값을 **정렬을 유지한 채** 끼워 넣으려면 몇 번 칸인가"를 돌려줘요.`
        },
        {
          id: "bisect-exists",
          type: "explain",
          title: `🔎 있는지 확인하기`,
          content: `\`bisect_left\` 가 돌려준 자리에 실제로 그 값이 있는지 보면 돼요.

\`\`\`python
import bisect

def exists(nums, x):
    i = bisect.bisect_left(nums, x)
    return i < len(nums) and nums[i] == x

nums = [1, 3, 5, 7, 9, 11]
print(exists(nums, 7))    # True
print(exists(nums, 8))    # False
\`\`\`

⚠️ \`i < len(nums)\` 를 꼭 같이 확인해요. 찾는 값이 전부보다 크면 \`i\` 가 리스트 끝을 넘어서
\`nums[i]\` 가 **IndexError** 를 내요.`
        },
        {
          id: "predict-count",
          type: "predict",
          title: `💭 같은 값이 몇 개 있나?`,
          content: `\`nums = [1, 3, 3, 3, 5]\` 에서 3 이 몇 개인지 bisect 로 세려면?`,
          options: [
            "bisect_right(nums, 3) - bisect_left(nums, 3)",
            "bisect_right(nums, 3) - bisect_right(nums, 2)"
          ],
          answer: 0,
          explanation: "bisect_left 는 3 이 시작되는 자리(1), bisect_right 는 3 이 끝난 다음 자리(4). 4 - 1 = 3 개. 55 과의 누적 합처럼 '끝 - 시작' 뺄셈이에요."
        },
        {
          id: "try-bisect",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 개수 세기`,
          task: `nums 에 3 이 몇 개 있는지 bisect 로 세어 출력하세요!`,
          initialCode: `import bisect

nums = [1, 3, 3, 3, 5]

print(bisect.bisect_right(nums, 3) - bisect.___(nums, 3))`,
          expectedOutput: "3",
          hint: `3 이 시작되는 자리를 구하는 함수.`,
          hint2: `bisect_left`
        },
        {
          id: "mission-real",
          type: "mission",
          title: `🏆 최종 미션 — 있으면 1, 없으면 0`,
          task: `입력받은 수들을 정렬하고, 찾을 수마다 있으면 1, 없으면 0 을 한 줄씩 출력하세요!`,
          initialCode: `import bisect

n = int(input())
nums = sorted(map(int, input().split()))
m = int(input())
queries = list(map(int, input().split()))

for x in queries:
    i = bisect.bisect_left(nums, x)
    if i < len(nums) and nums[i] == x:
        print(___)
    else:
        print(___)`,
          stdin: "5\n4 1 5 2 3\n3\n1 3 7\n",
          expectedOutput: "1\n1\n0",
          hint: `있으면 1, 없으면 0.`,
          hint2: `1 / 0`
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 완료!`,
          content: `## 오늘 배운 것

✅ **반씩 자르기** — 100만 개를 20 번에 (\`log\`)
✅ **전제 조건** — **정렬돼 있어야** 해요. 안 하면 조용히 틀려요
✅ **직접 짜기** — \`lo\`, \`hi\`, \`mid = (lo + hi) // 2\`, 그리고 \`mid ± 1\`
✅ **bisect** — \`bisect_left\` 로 자리 찾고, 그 자리 값이 맞는지 확인
✅ **개수 세기** — \`bisect_right - bisect_left\`

🚫 \`lo = mid\` 는 무한 루프. 꼭 \`mid + 1\`.
🚫 \`nums[i]\` 전에 \`i < len(nums)\` 확인.

💡 여러분이 본 배치고사가 바로 이 알고리즘이에요 — 10 단계를 4 문제로 가른 것.

다음엔 "앞에서 구한 답을 다시 쓰는" 방법을 배워요.`
        }
      ]
    }
  ]
}
