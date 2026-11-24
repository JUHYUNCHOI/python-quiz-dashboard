// ============================================
// Lesson 57: Binary Search
// ============================================
import { LessonData } from './types'

export const lesson57EnData: LessonData = {
  id: "57",
  title: "Binary Search",
  emoji: "🔍",
  description: "Cut the candidates in half each time — a million in 20 steps!",
  chapters: [
    {
      id: "ch1",
      title: "Checking One at a Time Is Slow",
      emoji: "🐢",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `🔍 Today — Cutting in Half`,
          content: `This is exactly how this app's **placement test** picks 1 of 10 tiers from only 3–4 problems.

1️⃣ **One at a time** — the limit of \`in\`
2️⃣ **Cutting in half** — why a million becomes 20
3️⃣ **Writing it yourself** — three variables: lo, hi, mid
4️⃣ **bisect** — what Python already built for you`
        },
        {
          id: "linear-search",
          type: "explain",
          title: `🐢 From the Front, One by One`,
          content: `To check whether 7 is in a list you'd normally write this.

\`\`\`python
nums = [1, 3, 5, 7, 9, 11]

print(7 in nums)   # True
\`\`\`

\`in\` compares **from the front, one at a time**. 1 → 3 → 5 → 7, found on the fourth try.

Unlucky? If the value is at the very end or missing entirely, it checks **all** of them.`
        },
        {
          id: "predict-million",
          type: "predict",
          title: `💭 A Million Items, 100,000 Searches?`,
          content: `Searching a 1,000,000-item list with \`in\` 100,000 times — how many comparisons in the worst case?`,
          options: ["1 million", "100 billion (1 million × 100,000)"],
          answer: 1,
          explanation: "Up to 1 million comparisons per search × 100,000 searches = 100 billion. That will never finish in time."
        },
        {
          id: "sorted-hint",
          type: "explain",
          title: `💡 You're Ignoring the Fact That It's Sorted`,
          content: `\`nums = [1, 3, 5, 7, 9, 11]\` — this is **already in increasing order.**

\`in\` doesn't use that at all. In a sorted list, once you look at the middle value:

\`\`\`
nums = [1, 3, 5, 7, 9, 11]
                ↑ middle = 7

Looking for something below 7? → everything right is 7 or more, **skip it**
Looking for something above 7? → everything left is 7 or less, **skip it**
\`\`\`

@Key: Every single comparison deletes **half the candidates**. That's binary search.`
        }
      ]
    },
    {
      id: "ch2",
      title: "How Fast Halving Really Is",
      emoji: "⚡",
      steps: [
        {
          id: "halving-table",
          type: "explain",
          title: `⚡ Half, Half, Half...`,
          content: `Start at a million and keep halving:

\`\`\`
1M → 500K → 250K → 125K → 62K → 31K → 15K → 8K
→ 4K → 2K → 1K → 500 → 250 → 125 → 62 → 31
→ 15 → 7 → 3 → 1
\`\`\`

**20 steps.** A million comparisons became 20.

| Items | One at a time | Halving |
|---|---|---|
| 1,000 | 1,000 | 10 |
| 1,000,000 | 1,000,000 | 20 |
| 1,000,000,000 | 1 billion | 30 |

@Key: Multiply the data by 1,000 and the comparisons grow by only 10. That relationship is called \`log\`.`
        },
        {
          id: "predict-placement",
          type: "predict",
          title: `💭 The Placement Test Works the Same Way`,
          content: `This app's placement test figures out where a student sits among difficulty levels 1–10.
**At most how many problems** does it need to separate all 10 levels?`,
          options: ["10 — one per level", "4 — because 10 → 5 → 3 → 2 → 1 halves each time"],
          answer: 1,
          explanation: "Even with 11 candidates (including level 0), halving needs only 4 probes. That's why the placement test ends after 3–4 problems instead of giving you all 10. The test you took is binary search."
        },
        {
          id: "precondition",
          type: "explain",
          title: `⚠️ The Precondition — It Must Be Sorted`,
          content: `Binary search throws away half the list by trusting **"if it's below the middle, it's on the left."**
Without sorting, that trust is false and you **miss values that are actually there.**

\`\`\`python
nums = [5, 1, 9, 3]     # not sorted
# middle is 9 → "3 < 9, go left" → only looks at [5, 1] → never finds 3 ❌
\`\`\`

🚫 Common mistake: running binary search without sorting first. It doesn't crash — it quietly returns **the wrong answer**.

\`\`\`python
nums.sort()      # ✅ sort first
\`\`\``
        }
      ]
    },
    {
      id: "ch3",
      title: "Writing It Yourself",
      emoji: "✍️",
      steps: [
        {
          id: "three-vars",
          type: "explain",
          title: `✍️ Three Variables — lo, hi, mid`,
          content: `Carry "the range that still might contain it" in \`lo\` and \`hi\`.

\`\`\`python
def find(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid          # found it
        if nums[mid] < target:
            lo = mid + 1        # middle too small → keep the right half
        else:
            hi = mid - 1        # middle too big → keep the left half
    return -1                   # not here
\`\`\`

\`\`\`
nums = [1, 3, 5, 7, 9, 11], target = 9
lo=0 hi=5 mid=2 → nums[2]=5 < 9  → lo=3
lo=3 hi=5 mid=4 → nums[4]=9 == 9 → found! index 4
\`\`\`

@Key: The **1 in \`mid + 1\` and \`mid - 1\` matters.** You already checked the middle, so drop it from the range.`
        },
        {
          id: "predict-infinite",
          type: "predict",
          title: `💭 What If You Forget the 1?`,
          content: `What happens if you write \`lo = mid\` instead of \`lo = mid + 1\`?`,
          options: [
            "Same answer, just a bit slower",
            "The range never shrinks, so the while loop runs forever"
          ],
          answer: 1,
          explanation: "With lo=3, hi=4, mid=(3+4)//2=3. Writing lo=mid leaves lo at 3, so the range doesn't shrink at all. The next pass computes mid=3 again — infinite loop. The checked mid must always leave the range."
        },
        {
          id: "try-binary",
          type: "tryit",
          title: `🖥️ Try It — Complete the Binary Search`,
          task: `Fill in the blanks to find the index of 7!`,
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
          hint: `You already checked the middle, so step one slot past it.`,
          hint2: `1 / 1`
        },
        {
          id: "try-count-steps",
          type: "tryit",
          title: `🖥️ Try It — Count the Comparisons`,
          task: `Count how many comparisons it takes to find 99 among 1 through 100!`,
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
          hint: `Add one each time through the loop.`,
          hint2: `1`
        },
        {
          id: "mission-binary",
          type: "mission",
          title: `🏆 Mission — Return -1 When Missing`,
          task: `Sort first, binary search for 8, and print -1 if it isn't there!`,
          initialCode: `nums = [9, 1, 7, 3, 11, 5]
nums.___()          # required before binary search!
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
          hint: `You have to establish binary search's precondition.`,
          hint2: `sort`
        }
      ]
    },
    {
      id: "ch4",
      title: "bisect — Already Built",
      emoji: "📦",
      steps: [
        {
          id: "bisect-intro",
          type: "explain",
          title: `📦 You Don't Have to Write It`,
          content: `Python ships a \`bisect\` module. On tests you usually reach for it — it's short and you can't get the ±1 wrong.

\`\`\`python
import bisect

nums = [1, 3, 5, 7, 9, 11]

print(bisect.bisect_left(nums, 7))    # 3  ← where 7 goes (leftmost)
print(bisect.bisect_right(nums, 7))   # 4  ← where 7 goes (rightmost)
\`\`\`

\`bisect_left\` answers "which slot would this value go into **while keeping the list sorted**".`
        },
        {
          id: "bisect-exists",
          type: "explain",
          title: `🔎 Checking Whether It Exists`,
          content: `Look at the slot \`bisect_left\` returned and see whether the value is actually there.

\`\`\`python
import bisect

def exists(nums, x):
    i = bisect.bisect_left(nums, x)
    return i < len(nums) and nums[i] == x

nums = [1, 3, 5, 7, 9, 11]
print(exists(nums, 7))    # True
print(exists(nums, 8))    # False
\`\`\`

⚠️ Always check \`i < len(nums)\` too. If the value is bigger than everything, \`i\` lands past the end
and \`nums[i]\` raises an **IndexError**.`
        },
        {
          id: "predict-count",
          type: "predict",
          title: `💭 How Many Copies Are There?`,
          content: `In \`nums = [1, 3, 3, 3, 5]\`, how do you count the 3s with bisect?`,
          options: [
            "bisect_right(nums, 3) - bisect_left(nums, 3)",
            "bisect_right(nums, 3) - bisect_right(nums, 2)"
          ],
          answer: 0,
          explanation: "bisect_left gives where the 3s start (1), bisect_right gives the slot just after they end (4). 4 - 1 = 3. It's the same 'end minus start' subtraction as the prefix sums in lesson 55."
        },
        {
          id: "try-bisect",
          type: "tryit",
          title: `🖥️ Try It — Count Them`,
          task: `Use bisect to count how many 3s are in nums!`,
          initialCode: `import bisect

nums = [1, 3, 3, 3, 5]

print(bisect.bisect_right(nums, 3) - bisect.___(nums, 3))`,
          expectedOutput: "3",
          hint: `The function that finds where the 3s start.`,
          hint2: `bisect_left`
        },
        {
          id: "mission-real",
          type: "mission",
          title: `🏆 Final Mission — 1 If Present, 0 If Not`,
          task: `Sort the input numbers, then print 1 or 0 for each query, one per line!`,
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
          hint: `1 when present, 0 when not.`,
          hint2: `1 / 0`
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 Done!`,
          content: `## What You Learned

✅ **Halving** — a million in 20 steps (\`log\`)
✅ **Precondition** — it **must be sorted**, or you get silently wrong answers
✅ **Writing it** — \`lo\`, \`hi\`, \`mid = (lo + hi) // 2\`, and \`mid ± 1\`
✅ **bisect** — find the slot with \`bisect_left\`, then verify the value there
✅ **Counting** — \`bisect_right - bisect_left\`

🚫 \`lo = mid\` is an infinite loop. Always \`mid + 1\`.
🚫 Check \`i < len(nums)\` before \`nums[i]\`.

💡 The placement test you took *is* this algorithm — 10 levels split by 4 problems.

Next: reusing answers you already computed.`
        }
      ]
    }
  ]
}
