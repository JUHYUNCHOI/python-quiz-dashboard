// ============================================
// Lesson 58: First Steps in Dynamic Programming
// ============================================
import { LessonData } from './types'

export const lesson58EnData: LessonData = {
  id: "58",
  title: "First Steps in DP",
  emoji: "🧱",
  description: "Write down the small answers and stack them into the big one!",
  chapters: [
    {
      id: "ch1",
      title: "Recursion Recomputes the Same Thing",
      emoji: "🔁",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `🧱 Today — Writing Answers Down`,
          content: `In lesson 55 you wrote down sums. This time you write down **answers to problems**.

1️⃣ **Recursion's waste** — why Fibonacci explodes
2️⃣ **Writing it down** — one table fixes it
3️⃣ **Climbing stairs** — finding the recurrence yourself
4️⃣ **Fewest coins** — the hardest problem on the placement test`
        },
        {
          id: "fib-recursive",
          type: "explain",
          title: `🔁 Fibonacci, Recursively`,
          content: `Each number is the sum of the two before it: 1, 1, 2, 3, 5, 8, 13...

\`\`\`python
def fib(n):
    if n <= 2:
        return 1
    return fib(n - 1) + fib(n - 2)

print(fib(10))   # 55
\`\`\`

It's a direct translation of the definition, so it reads nicely and works fine for small \`n\`.`
        },
        {
          id: "fib-tree",
          type: "explain",
          title: `🌳 But Count the Calls`,
          content: `Calling \`fib(5)\` fans out like this.

\`\`\`
                fib(5)
              /        \\
         fib(4)        fib(3)
        /     \\        /     \\
   fib(3)  fib(2)  fib(2)  fib(1)
   /    \\
fib(2) fib(1)
\`\`\`

\`fib(3)\` was called **twice**, \`fib(2)\` **three times**. As \`n\` grows:

| n | calls |
|---|---|
| 10 | 109 |
| 30 | about 1.6 million |
| 50 | about 25 billion |

@Key: \`fib(30)\` has one answer, computed 1.6 million times. **You recompute the same answer over and over.**`
        },
        {
          id: "predict-fib50",
          type: "predict",
          title: `💭 What About fib(50) Recursively?`,
          content: `What happens if you compute \`fib(50)\` with the recursive code above?`,
          options: ["It's instant — it's just one number", "It takes minutes — 25 billion calls"],
          answer: 1,
          explanation: "The answer is a single number, 12,586,269,025 — but getting there calls the function 25 billion times. A small answer doesn't mean a small computation."
        }
      ]
    },
    {
      id: "ch2",
      title: "Write It Down, Compute Once",
      emoji: "📝",
      steps: [
        {
          id: "memo-idea",
          type: "explain",
          title: `📝 Keep a Table`,
          content: `Once you've computed \`fib(3)\`, **write it down** and just read it next time.

\`\`\`python
def fib(n, memo={}):
    if n <= 2:
        return 1
    if n in memo:          # already solved → just read it
        return memo[n]
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]

print(fib(50))   # 12586269025  — instant
\`\`\`

Each \`n\` is computed **exactly once**. 25 billion calls became 50.

@Key: This is **dynamic programming**. Intimidating name, but all it does is "write down answers you already found".`
        },
        {
          id: "bottom-up",
          type: "explain",
          title: `🧱 Stacking Up From the Bottom`,
          content: `Skip recursion and fill the table **in order**, smallest first. It's simpler.

\`\`\`python
n = 50
dp = [0] * (n + 1)
dp[1] = dp[2] = 1

for i in range(3, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]

print(dp[n])   # 12586269025
\`\`\`

When you fill \`dp[i]\`, both \`dp[i-1]\` and \`dp[i-2]\` are **already filled** — you went smallest first.

💡 \`dp\` stands for "dynamic programming" and is the conventional name for this table.

@Key: Stacking up **with a for loop** is usually faster than recursion and never hits the recursion depth limit.`
        },
        {
          id: "try-fib-dp",
          type: "tryit",
          title: `🖥️ Try It — Fibonacci With a Table`,
          task: `Fill in the blank to compute fib(10) with a dp table!`,
          initialCode: `n = 10
dp = [0] * (n + 1)
dp[1] = dp[2] = 1

for i in range(3, n + 1):
    dp[i] = dp[i - 1] + dp[i - ___]

print(dp[n])`,
          expectedOutput: "55",
          hint: `Fibonacci adds 'the two before'. One is i-1, what's the other?`,
          hint2: `2`
        },
        {
          id: "predict-dp-size",
          type: "predict",
          title: `💭 What If the Table Has Only n Slots?`,
          content: `What happens with \`dp = [0] * n\` instead of \`dp = [0] * (n + 1)\`?`,
          options: ["Works the same", "dp[n] raises an IndexError"],
          answer: 1,
          explanation: "A length-n list has valid indexes 0 through n-1. dp[n] doesn't exist. If you want the n-th answer to live at dp[n], you need n+1 slots — slot 0 just sits there unused."
        }
      ]
    },
    {
      id: "ch3",
      title: "Practice Finding the Recurrence",
      emoji: "🪜",
      steps: [
        {
          id: "stairs-problem",
          type: "explain",
          title: `🪜 Climbing Stairs`,
          content: `You can climb **1 or 2 steps** at a time. How many ways are there to climb n steps?

\`\`\`
n = 1 → (1)                        1 way
n = 2 → (1,1) (2)                  2 ways
n = 3 → (1,1,1) (1,2) (2,1)        3 ways
n = 4 → (1,1,1,1) (1,1,2) (1,2,1)
        (2,1,1) (2,2)              5 ways
\`\`\`

1, 2, 3, 5... recognize that sequence?`
        },
        {
          id: "predict-stairs",
          type: "predict",
          title: `💭 Where Were You Right Before Step n?`,
          content: `If you reached step n, your **last move** was either 1 step or 2. So what is \`dp[n]\`?`,
          options: [
            "dp[n] = dp[n-1] + dp[n-2] — arriving from n-1 plus arriving from n-2",
            "dp[n] = dp[n-1] × 2 — two choices at every step"
          ],
          answer: 0,
          explanation: "Every way to reach step n is either 'be at n-1 and take 1' or 'be at n-2 and take 2'. Those two groups don't overlap, so you just add them. An equation that writes a big problem as a sum of smaller ones is called a recurrence."
        },
        {
          id: "recurrence-recipe",
          type: "explain",
          title: `🍳 The Recipe for a Recurrence`,
          content: `Every DP problem comes down to deciding just these two things.

1️⃣ **Say what dp[i] means in one sentence** — "the number of ways to climb i steps"
2️⃣ **Split on what the last move was** — 1 step? 2 steps?

\`\`\`python
n = 4
dp = [0] * (n + 1)
dp[0] = 1          # 0 steps: exactly 1 way — do nothing
dp[1] = 1

for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]

print(dp[n])   # 5
\`\`\`

💡 If \`dp[0] = 1\` feels odd, read it as "there's 1 way to be standing at the start".
Get that one slot wrong and every answer shifts.`
        },
        {
          id: "try-stairs",
          type: "tryit",
          title: `🖥️ Try It — 10 Steps`,
          task: `Find the number of ways to climb 10 steps!`,
          initialCode: `n = 10
dp = [0] * (n + 1)
dp[0] = ___
dp[1] = 1

for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]

print(dp[n])`,
          expectedOutput: "89",
          hint: `There's exactly one way to climb 0 steps: do nothing.`,
          hint2: `1`
        },
        {
          id: "try-three-steps",
          type: "tryit",
          title: `🖥️ Try It — What If You Can Jump 3?`,
          task: `With 1, 2, or 3 steps allowed, find the number of ways to climb 5 steps!`,
          initialCode: `n = 5
dp = [0] * (n + 1)
dp[0] = 1
dp[1] = 1
dp[2] = 2

for i in range(3, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - ___]

print(dp[n])`,
          expectedOutput: "13",
          hint: `If the last move was 3 steps, where were you before it?`,
          hint2: `3`
        }
      ]
    },
    {
      id: "ch4",
      title: "The Real Thing — Fewest Coins",
      emoji: "🪙",
      steps: [
        {
          id: "coin-problem",
          type: "explain",
          title: `🪙 As Few Coins as Possible`,
          content: `You're given coin values. Find the **fewest coins** that make the target amount.

\`\`\`
Coins: 1, 4, 5     Target: 8

Greedy, biggest first: 5 + 1 + 1 + 1 = 4 coins
The real answer:       4 + 4         = 2 coins   ✅
\`\`\`

@Key: **"Always take the biggest coin" can be wrong.** So you have to consider everything — and that's DP.`
        },
        {
          id: "coin-recurrence",
          type: "explain",
          title: `🍳 The Recurrence — What Was the Last Coin?`,
          content: `Apply the recipe from before.

1️⃣ \`dp[i]\` = **the fewest coins that make i**
2️⃣ If the last coin added was \`c\`, you were at \`i - c\` before it → \`dp[i - c] + 1\`

Try every coin and keep **the smallest** result.

\`\`\`python
coins = [1, 4, 5]
target = 8
INF = float("inf")          # marks "not reachable yet"

dp = [INF] * (target + 1)
dp[0] = 0                   # 0 needs 0 coins
for i in range(1, target + 1):
    for c in coins:
        if c <= i:
            dp[i] = min(dp[i], dp[i - c] + 1)

print(dp[target])   # 2
\`\`\`

💡 Why \`INF\`: if \`dp[i]\` starts at 0, \`min()\` always picks that 0. "No answer yet" must be **infinity** for \`min()\` to behave.`
        },
        {
          id: "predict-inf",
          type: "predict",
          title: `💭 What About an Impossible Amount?`,
          content: `With only coins \`[3, 5]\`, what happens to \`dp[4]\`?`,
          options: ["It becomes 0", "It stays INF — 4 can't be made from 3 and 5"],
          answer: 1,
          explanation: "4 isn't 3+something or 5+something. So dp[4] stays INF to the end. If the problem says 'print -1 when impossible', add if dp[target] == INF: print(-1) at the end."
        },
        {
          id: "try-coin",
          type: "tryit",
          title: `🖥️ Try It — Fewest Coins`,
          task: `Fill in the blank to find the fewest coins making 8!`,
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
          hint: `How many coins does it take to make 0?`,
          hint2: `0`
        },
        {
          id: "mission-real",
          type: "mission",
          title: `🏆 Final Mission — Fewest Coins With Real Input`,
          task: `Read the input and print the fewest coins, or -1 if impossible! (2 blanks)`,
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
          hint: `The function that keeps the smallest, and the slot for the target amount.`,
          hint2: `min / target`
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 Part 9 Complete!`,
          content: `## What You Learned

✅ **Recursion's waste** — \`fib(50)\` makes 25 billion calls for one answer
✅ **Writing it down** — compute once and store it in \`memo\` or \`dp\`
✅ **Stacking up** — filling smallest-first with a for loop avoids recursion depth limits
✅ **The recipe** — ① say what dp[i] means ② split on the last move
✅ **When minimizing** — start at \`INF\`, not \`0\`

🚫 \`dp = [0] * n\` crashes at \`dp[n]\` → use \`n + 1\`.
🚫 The greedy biggest-coin method gets 8 wrong with \`[1,4,5]\`.

## All of Part 9

| Lesson | Topic | Where it shows up |
|---|---|---|
| 55 | Prefix Sums | Range Sum Queries (Gold I) |
| 56 | Solving by Sorting | Top K Frequent Words / Merging Intervals (Gold II · Plat II) |
| 57 | Binary Search | the placement test itself |
| 58 | Dynamic Programming | Fewest Coins (Plat I) |

You're ready for the Gold and Platinum problems on the ladder. Head to the Practice tab!`
        }
      ]
    }
  ]
}
