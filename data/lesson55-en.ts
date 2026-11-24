// ============================================
// Lesson 55: Prefix Sums
// ============================================
import { LessonData } from './types'

export const lesson55EnData: LessonData = {
  id: "55",
  title: "Prefix Sums",
  emoji: "📊",
  description: "Get the sum of any range with one subtraction instead of adding every time!",
  chapters: [
    {
      id: "ch1",
      title: "Adding Every Time Is Slow",
      emoji: "🐢",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `📊 Today — Range Sums`,
          content: `When numbers are lined up, you learn how to answer **"what is the sum from the 3rd to the 7th?"**

1️⃣ **Adding with a slice** — the first idea that comes to mind, and where it breaks
2️⃣ **Building a prefix sum** — a table filled in from the front
3️⃣ **One subtraction** — pulling a range sum out of that table
4️⃣ **The real format** — "Range Sum Queries" exactly as it appears on judges`
        },
        {
          id: "slice-sum",
          type: "explain",
          title: `➕ Just Add Them Up`,
          content: `Here are 5 scores. Let's get the sum from the 2nd to the 4th.

\`\`\`python
score = [10, 20, 30, 40, 50]

print(sum(score[1:4]))   # 2nd ~ 4th = 20 + 30 + 40
\`\`\`

\`score[1:4]\` is indexes 1, 2, 3 — what people call "2nd through 4th".

It works. One \`sum()\` and you're done.`
        },
        {
          id: "try-slice-sum",
          type: "tryit",
          title: `🖥️ Try It!`,
          task: `Print the sum of score from the 3rd to the 5th (indexes 2, 3, 4)!`,
          initialCode: `score = [10, 20, 30, 40, 50]

print(sum(score[___:___]))`,
          expectedOutput: "120",
          hint: `Start at index 2 and include index 4 — the end goes one higher.`,
          hint2: `2 / 5`
        },
        {
          id: "predict-many-queries",
          type: "predict",
          title: `💭 But What If There Are 100,000 Questions?`,
          content: `You have 100,000 numbers and 100,000 questions of the form "sum from a to b".
What happens if you call \`sum(score[a:b])\` for every question?`,
          options: [
            "It's fine — sum() is very fast",
            "It's slow — each question adds up to 100,000 numbers, so 10 billion additions total"
          ],
          answer: 1,
          explanation: "sum() still adds the numbers one by one. 100,000 numbers × 100,000 questions = 10 billion additions. If a computer does about 100 million additions per second, that's 100 seconds. On a timed test, that's a time-limit exceeded."
        },
        {
          id: "key-insight",
          type: "explain",
          title: `💡 You're Repeating the Same Addition`,
          content: `Say two questions come in.

\`\`\`
Question 1: sum 1st ~ 4th → 10 + 20 + 30 + 40
Question 2: sum 1st ~ 5th → 10 + 20 + 30 + 40 + 50
\`\`\`

You added \`10 + 20 + 30 + 40\` **twice.** With 100,000 questions you repeat the same addition tens of thousands of times.

@Key: If you **write down** a sum once, you never have to add it again. That's a prefix sum.`
        }
      ]
    },
    {
      id: "ch2",
      title: "Building a Prefix Sum",
      emoji: "📈",
      steps: [
        {
          id: "prefix-idea",
          type: "explain",
          title: `📈 A Table Filled In From the Front`,
          content: `Write down "the sum from the start up to the i-th" for every i. That's called a **prefix sum**.

\`\`\`
score  =       10   20   30   40   50
prefix = 0     10   30   60  100  150
         ↑      ↑    ↑    ↑    ↑    ↑
      nothing  1st  2nd  3rd  4th  5th
       added   only  up   up   up   up
\`\`\`

Putting a **0** at the very front matters. It's the slot for "the sum of nothing = 0".
With that 0 there, the subtraction later needs no special cases.`
        },
        {
          id: "prefix-build",
          type: "explain",
          title: `🔨 One Loop Builds It`,
          content: `Add the current number to the previous slot and append it.

\`\`\`python
score = [10, 20, 30, 40, 50]

prefix = [0]
for x in score:
    prefix.append(prefix[-1] + x)

print(prefix)   # [0, 10, 30, 60, 100, 150]
\`\`\`

\`prefix[-1]\` is "the last value stacked so far". Add \`x\` to it and append.

@Key: You build the prefix sum **once**. For n numbers that's n additions. After that it doesn't matter how many questions arrive.`
        },
        {
          id: "try-prefix-build",
          type: "tryit",
          title: `🖥️ Try It — Build a Prefix Sum`,
          task: `Fill in the blank to complete prefix!`,
          initialCode: `nums = [3, 1, 4, 1, 5]

prefix = [0]
for x in nums:
    prefix.append(prefix[___] + x)

print(prefix)`,
          expectedOutput: "[0, 3, 4, 8, 9, 14]",
          hint: `You need the value you just appended. What index is the end of a list?`,
          hint2: `-1`
        },
        {
          id: "predict-prefix-length",
          type: "predict",
          title: `💭 How Long Is prefix?`,
          content: `If there are \`n\` numbers, how long is the \`prefix\` list?`,
          options: ["n items", "n + 1 items"],
          answer: 1,
          explanation: "Because you put an extra 0 at the front. 5 numbers means prefix has 6 slots ([0, 10, 30, 60, 100, 150])."
        }
      ]
    },
    {
      id: "ch3",
      title: "Pulling It Out With One Subtraction",
      emoji: "➖",
      steps: [
        {
          id: "subtract-idea",
          type: "explain",
          title: `➖ Subtract the Smaller From the Bigger`,
          content: `You need the sum from the 2nd to the 4th.

\`\`\`
prefix[4] = sum 1st ~ 4th = 100
prefix[1] = sum 1st       =  10
                            ────────
            sum 2nd ~ 4th =  90
\`\`\`

\`\`\`python
prefix = [0, 10, 30, 60, 100, 150]

print(prefix[4] - prefix[1])   # 90
\`\`\`

Sum from a to b = \`prefix[b] - prefix[a - 1]\`

@Key: However many numbers the range covers, it's **one subtraction**. A 100,000-wide range costs the same.`
        },
        {
          id: "interactive-check",
          type: "explain",
          title: `🔍 Why a - 1?`,
          content: `\`prefix[a - 1]\` is "the sum **up to just before** a". Subtracting it keeps the a-th item alive.

\`\`\`
If a = 2, b = 4
prefix[b]     = prefix[4] → 10 + 20 + 30 + 40
prefix[a - 1] = prefix[1] → 10
subtract                  → 20 + 30 + 40   ✅ the 2nd is included
\`\`\`

Subtracting \`prefix[a]\` would also erase 20, leaving you with **the 3rd onward**. One slot off and the answer is wrong.

🚫 Common mistake: \`prefix[b] - prefix[a]\``
        },
        {
          id: "try-range-sum",
          type: "tryit",
          title: `🖥️ Try It — Pull Out a Range Sum`,
          task: `Use subtraction to get the sum of nums from the 2nd to the 4th (1+4+1=6)!`,
          initialCode: `nums = [3, 1, 4, 1, 5]
prefix = [0]
for x in nums:
    prefix.append(prefix[-1] + x)
# prefix = [0, 3, 4, 8, 9, 14]

a, b = 2, 4
print(prefix[b] - prefix[___])`,
          expectedOutput: "6",
          hint: `Subtract the sum up to just before a. a is 2, so what index?`,
          hint2: `a - 1`
        },
        {
          id: "predict-whole-sum",
          type: "predict",
          title: `💭 What About the Total?`,
          content: `With 5 numbers, how do you get the **total** (1st through 5th) from the prefix sum?`,
          options: ["prefix[5] - prefix[0]", "prefix[5] - prefix[1]"],
          answer: 0,
          explanation: "a = 1, so prefix[a - 1] = prefix[0] = 0. Thanks to the 0 at the front, the total comes out of the exact same formula — no 'but what if a is 1' special case."
        },
        {
          id: "mission-two-queries",
          type: "mission",
          title: `🏆 Mission — Answer Two Questions`,
          task: `Build the prefix sum, then print the sums for ranges (2, 4) and (1, 5), one per line!`,
          initialCode: `nums = [10, 20, 30, 40, 50]

prefix = [0]
for x in nums:
    prefix.append(prefix[-1] + x)

for a, b in [(2, 4), (1, 5)]:
    print(prefix[___] - prefix[___])`,
          expectedOutput: "90\n150",
          hint: `The back one is just b, the front one is a - 1.`,
          hint2: `b / a - 1`
        }
      ]
    },
    {
      id: "ch4",
      title: "The Real Thing — Range Sum Queries",
      emoji: "🎯",
      steps: [
        {
          id: "real-problem",
          type: "explain",
          title: `🎯 How It Looks on a Test`,
          content: `On judges and rank-up exams it arrives like this.

\`\`\`
[Input]
Line 1: N numbers, M questions
Line 2: the N numbers
Next M lines: a b on each line

[Output]
For each question, the sum from a to b on its own line
\`\`\`

\`\`\`
Sample Input       Sample Output
5 3                 15
1 2 3 4 5           12
1 3                 15
2 4
1 5
\`\`\`

Add the input-reading part and everything you've learned is already the answer.`
        },
        {
          id: "full-solution",
          type: "explain",
          title: `📝 The Whole Program`,
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

Building the prefix sum is \`n\` steps, answering the questions is \`m\` steps — \`n + m\` total.
With \`sum()\` it was \`n × m\`. So 100,000 × 100,000 = 10 billion became 200,000.`
        },
        {
          id: "mission-real",
          type: "mission",
          title: `🏆 Final Mission — With Real Input`,
          task: `Read the input and print the range sum for each question! (2 blanks)`,
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
          hint: `Subtract prefix[a - 1] from prefix[b].`,
          hint2: `b / a - 1`
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 Done!`,
          content: `## What You Learned

✅ **Repeated addition** — calling \`sum()\` per question costs \`n × m\`
✅ **Prefix sum** — start with \`prefix = [0]\` and keep appending \`prefix[-1] + x\`
✅ **Range sum** — \`prefix[b] - prefix[a - 1]\` (one subtraction!)
✅ **The leading 0** — the total comes from the same formula, no special case

🚫 \`prefix[b] - prefix[a]\` is off by one slot. Always \`a - 1\`.

Next up: problems you solve by sorting.`
        }
      ]
    }
  ]
}
