// ============================================
// Lesson 56: Problems You Solve by Sorting
// ============================================
import { LessonData } from './types'

export const lesson56EnData: LessonData = {
  id: "56",
  title: "Solving by Sorting",
  emoji: "🗂️",
  description: "Change the order and a hard problem becomes easy!",
  chapters: [
    {
      id: "ch1",
      title: "When There Are Two Criteria",
      emoji: "📐",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `🗂️ Today — When Sorting Is the Answer`,
          content: `You already know \`sort()\`. Today you learn to **use sorting as a weapon**.

1️⃣ **Two criteria** — "highest score first, ties broken by name"
2️⃣ **Mixing directions** — one descending, one ascending
3️⃣ **Sort, then one pass** — merging overlapping ranges
4️⃣ **The real format** — Top K Frequent Words / Merging Intervals`
        },
        {
          id: "key-recap",
          type: "explain",
          title: `🔑 key= Recap`,
          content: `Give \`key=\` a function and you decide **what gets compared**.

\`\`\`python
words = ["banana", "fig", "apple"]

print(sorted(words))              # ['apple', 'banana', 'fig']  (alphabetical)
print(sorted(words, key=len))     # ['fig', 'apple', 'banana']  (by length)
\`\`\`

\`key=len\` means "compare each word by what \`len()\` returns for it".`
        },
        {
          id: "predict-tie",
          type: "predict",
          title: `💭 What If the Lengths Tie?`,
          content: `\`sorted(["cat", "ant", "bee"], key=len)\` — all three have length 3. The result?`,
          options: [
            "['ant', 'bee', 'cat'] — ties are broken alphabetically for you",
            "['cat', 'ant', 'bee'] — ties keep their original order"
          ],
          answer: 1,
          explanation: "Python's sort is 'stable'. When the compared values tie, it leaves the original order alone. If you want alphabetical tie-breaking you have to put it in the key yourself."
        },
        {
          id: "tuple-key",
          type: "explain",
          title: `📐 Bundle the Criteria Into a Tuple`,
          content: `If \`key=\` returns a **tuple**, Python compares the items in order, front first.

\`\`\`python
words = ["cat", "ant", "bee", "fig"]

print(sorted(words, key=lambda w: (len(w), w)))
# ['ant', 'bee', 'cat', 'fig']
\`\`\`

\`(len(w), w)\` = **"length first, alphabetical when lengths tie"**

\`\`\`
"ant" → (3, 'ant')
"bee" → (3, 'bee')   ← same length → decided by 'ant' < 'bee'
"cat" → (3, 'cat')
\`\`\`

@Key: With several criteria, **list them in a tuple from most important to least**.`
        },
        {
          id: "try-tuple-key",
          type: "tryit",
          title: `🖥️ Try It — By Score, Then by Name`,
          task: `Sort by lowest score first, breaking ties by name!`,
          initialCode: `students = [("bora", 90), ("ara", 85), ("dam", 90), ("chan", 85)]

print(sorted(students, key=lambda s: (s[___], s[___])))`,
          expectedOutput: "[('ara', 85), ('chan', 85), ('bora', 90), ('dam', 90)]",
          hint: `The tuples are (name, score), so score is index 1 and name is index 0.`,
          hint2: `1 / 0`
        }
      ]
    },
    {
      id: "ch2",
      title: "Mixing Descending and Ascending",
      emoji: "🔀",
      steps: [
        {
          id: "reverse-problem",
          type: "explain",
          title: `🔀 When the Directions Disagree`,
          content: `"**Highest** score first, ties by **lowest** name" — opposite directions.

\`reverse=True\` flips **everything**, so the names end up descending too.

\`\`\`python
students = [("bora", 90), ("ara", 85), ("dam", 90), ("chan", 85)]

# ❌ the names get flipped too
print(sorted(students, key=lambda s: (s[1], s[0]), reverse=True))
# [('dam', 90), ('bora', 90), ('chan', 85), ('ara', 85)]
#   dam comes before bora — names are now descending
\`\`\``
        },
        {
          id: "minus-trick",
          type: "explain",
          title: `➖ Put a Minus on the Number`,
          content: `Negate a number and the biggest becomes the smallest. Then one ascending sort handles both.

\`\`\`python
# ✅ score descending, name ascending
print(sorted(students, key=lambda s: (-s[1], s[0])))
# [('bora', 90), ('dam', 90), ('ara', 85), ('chan', 85)]
\`\`\`

\`\`\`
score 90 → -90
score 85 → -85
-90 < -85, so 90 comes first ✅
names were not negated, so they stay ascending ✅
\`\`\`

@Key: **When directions disagree, don't use \`reverse=True\` — negate the number.** You can't negate text, so only the numeric part gets flipped.`
        },
        {
          id: "predict-minus",
          type: "predict",
          title: `💭 What If You Negate the Text?`,
          content: `What happens with \`key=lambda s: (-s[1], -s[0])\`, negating the name too?`,
          options: [
            "The names sort in reverse as well",
            "It errors — you can't negate a string"
          ],
          answer: 1,
          explanation: "TypeError: bad operand type for unary -: 'str'. To reverse text you'd sort twice (using stability) or use reverse separately. That's why test problems are usually phrased as 'numbers descending, text ascending'."
        },
        {
          id: "try-minus",
          type: "tryit",
          title: `🖥️ Try It — Most Frequent First, Ties Alphabetical`,
          task: `Sort by highest count first, breaking ties by word!`,
          initialCode: `cnt = [("apple", 3), ("banana", 2), ("cherry", 1), ("date", 2)]

print(sorted(cnt, key=lambda p: (___p[1], p[0])))`,
          expectedOutput: "[('apple', 3), ('banana', 2), ('date', 2), ('cherry', 1)]",
          hint: `Counts go descending = negate them.`,
          hint2: `-`
        },
        {
          id: "mission-topk",
          type: "mission",
          title: `🏆 Mission — Top K Frequent Words`,
          task: `Count the words, then print the top 2 (most frequent first, ties alphabetical), one per line!`,
          initialCode: `words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
k = 2

cnt = {}
for w in words:
    cnt[w] = cnt.get(w, 0) + 1

order = sorted(cnt, key=lambda w: (___cnt[w], w))
for w in order[:k]:
    print(w)`,
          expectedOutput: "apple\nbanana",
          hint: `Counts go descending, so negate.`,
          hint2: `-`
        }
      ]
    },
    {
      id: "ch3",
      title: "Sort, Then One Pass",
      emoji: "🚶",
      steps: [
        {
          id: "merge-intro",
          type: "explain",
          title: `🚶 Merging Overlapping Ranges`,
          content: `You have several time ranges. Overlapping ones should become one.

\`\`\`
Input: (1,3) (2,6) (8,10) (15,18)
       ├─┤
         ├───┤        overlap!
                 ├─┤
                         ├─┤
Answer: (1,6) (8,10) (15,18)
\`\`\`

If they aren't sorted, you have to check "does this range overlap **any** earlier one?" against all of them.`
        },
        {
          id: "predict-why-sort",
          type: "predict",
          title: `💭 What Does Sorting by Start Buy You?`,
          content: `If you sort the ranges by **smallest start first**, what gets easier?`,
          options: [
            "A new range only needs checking against **the one range you merged last**",
            "The ranges get shorter so the math is faster"
          ],
          answer: 0,
          explanation: "In start order, the current range's start is greater than or equal to every earlier start. So the only range it can overlap is the most recently merged one. You never have to search back through all of them."
        },
        {
          id: "merge-code",
          type: "explain",
          title: `📝 The Merge Rule`,
          content: `After sorting, walk through them: if it overlaps the previous range, **stretch the end**; otherwise **append a new one**.

\`\`\`python
iv = sorted([(1, 3), (2, 6), (8, 10), (15, 18)])

out = []
for l, r in iv:
    if out and l <= out[-1][1]:     # start <= previous end means overlap
        out[-1][1] = max(out[-1][1], r)
    else:
        out.append([l, r])

print(out)   # [[1, 6], [8, 10], [15, 18]]
\`\`\`

💡 Why \`max()\` is needed: if \`(2,3)\` follows \`(1,10)\`, then \`(2,3)\` sits entirely inside \`(1,10)\`.
Writing just \`out[-1][1] = r\` would **shrink** the end from 10 down to 3.

@Key: Store **lists** in \`out\` (\`[l, r]\`). Tuples can't be modified, so you couldn't stretch the end.`
        },
        {
          id: "try-merge-cond",
          type: "tryit",
          title: `🖥️ Try It — The Overlap Test`,
          task: `Fill in the blank to merge the overlapping ranges!`,
          initialCode: `iv = sorted([(1, 3), (2, 6), (8, 10)])

out = []
for l, r in iv:
    if out and l <= out[-1][___]:
        out[-1][1] = max(out[-1][1], r)
    else:
        out.append([l, r])

print(out)`,
          expectedOutput: "[[1, 6], [8, 10]]",
          hint: `Compare against the previous range's 'end'. In [l, r], which index is the end?`,
          hint2: `1`
        },
        {
          id: "predict-max",
          type: "predict",
          title: `💭 What If You Drop max()?`,
          content: `Merging \`(1,10)\` with \`(2,3)\` using \`out[-1][1] = r\` gives what?`,
          options: ["[[1, 10]] — same thing either way", "[[1, 3]] — the end shrinks from 10 to 3"],
          answer: 1,
          explanation: "(2,3) sits entirely inside (1,10). Overwriting the end drops 10 to 3 and you lose the 7–10 stretch. max() keeps the farther end."
        },
        {
          id: "mission-merge",
          type: "mission",
          title: `🏆 Mission — Fully Contained Ranges`,
          task: `(2,3) and (4,5) both sit inside (1,10). Merge them correctly and print the result!`,
          initialCode: `iv = sorted([(1, 10), (2, 3), (4, 5)])

out = []
for l, r in iv:
    if out and l <= out[-1][1]:
        out[-1][1] = ___(out[-1][1], r)
    else:
        out.append([l, r])

print(out)`,
          expectedOutput: "[[1, 10]]",
          hint: `You need the farther of the two ends.`,
          hint2: `max`
        }
      ]
    },
    {
      id: "ch4",
      title: "The Real Thing — With Input",
      emoji: "🎯",
      steps: [
        {
          id: "real-format",
          type: "explain",
          title: `🎯 How It Looks on a Test`,
          content: `\`\`\`
[Input]
Line 1: N, the number of ranges
Next N lines: start end on each line

[Output]
Line 1: how many ranges remain after merging
Then: each merged range on its own line, smallest start first
\`\`\`

\`\`\`
Sample Input       Sample Output
4                   3
1 3                 1 6
2 6                 8 10
8 10                15 18
15 18
\`\`\``
        },
        {
          id: "full-code",
          type: "explain",
          title: `📝 The Whole Program`,
          content: `\`\`\`python
n = int(input())
iv = sorted(tuple(map(int, input().split())) for _ in range(n))

out = []
for l, r in iv:
    if out and l <= out[-1][1]:
        out[-1][1] = max(out[-1][1], r)
    else:
        out.append([l, r])

print(len(out))
for l, r in out:
    print(l, r)
\`\`\`

Sorting costs \`n log n\`, the pass costs \`n\`. Comparing everything without sorting was \`n × n\`.

@Key: **Sorting isn't free, but it erases far more comparisons than it costs.**`
        },
        {
          id: "mission-real",
          type: "mission",
          title: `🏆 Final Mission — Merge With Real Input`,
          task: `Read the input and print the merged count and ranges! (2 blanks)`,
          initialCode: `n = int(input())
iv = ___(tuple(map(int, input().split())) for _ in range(n))

out = []
for l, r in iv:
    if out and l <= out[-1][1]:
        out[-1][1] = max(out[-1][1], r)
    else:
        out.append([l, r])

print(___(out))
for l, r in out:
    print(l, r)`,
          stdin: "4\n1 3\n2 6\n8 10\n15 18\n",
          expectedOutput: "3\n1 6\n8 10\n15 18",
          hint: `One function lines the ranges up by start, the other counts them.`,
          hint2: `sorted / len`
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 Done!`,
          content: `## What You Learned

✅ **Several criteria** — \`key=lambda x: (first, second)\`
✅ **Mixed directions** — negate the number (\`reverse=True\` flips everything)
✅ **Sort, then one pass** — the only overlap candidate shrinks to **the previous one**
✅ **Merging intervals** — \`out[-1][1] = max(out[-1][1], r)\`

🚫 Tuples in \`out\` can't have their end stretched → use lists.
🚫 Dropping \`max()\` shrinks the end on contained ranges.

Next: finding things by cutting a sorted list in half.`
        }
      ]
    }
  ]
}
