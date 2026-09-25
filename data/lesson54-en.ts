// ============================================
// Lesson 54: 3D Lists (English)
// ============================================
import { LessonData } from './types'

export const lesson54EnData: LessonData = {
  id: "54",
  title: "3D Lists",
  emoji: "🧊",
  description: "What if lists stack into floors? And an axis doesn't always have to mean 'a place'!",
  chapters: [
    {
      id: "ch1",
      title: "Three Layers of Lists",
      emoji: "📦",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `📦 What We'll Learn Today — Three Layers of Lists`,
          content: `There are four things in this lesson.

1️⃣ **Three layers of lists** — when several tables stack up, you get floors too
2️⃣ **Building one** — the same trap from Lesson 53, one layer deeper
3️⃣ **An axis doesn't have to be a place** — a third axis can mean something other than floor/row/cell
4️⃣ **Going through it all** — stack three for loops to visit every cell`,
        },
        {
          id: "review-board",
          type: "explain",
          title: `📋 Review — Remember board from Lesson 53?`,
          content: `Remember board from Lesson 53?

\`\`\`python
board = [[0, 0, 0],
         [0, 0, 0]]
\`\`\`

It was a single table made of rows and columns.

But what if there are several of these tables? Say each class needs its own score table — you'd need to stack several tables.

\`\`\`python
board1 = [[0, 0, 0], [0, 0, 0]]   # Floor 1 — Class 1's scores
board2 = [[1, 0, 1], [0, 1, 0]]   # Floor 2 — Class 2's scores
\`\`\`

What happens if we bundle these two tables together, stacked like floors?`,
        },
        {
          id: "try-floors-first-floor",
          type: "tryit",
          title: `🖥️ Pull Out One Whole Floor`,
          task: `Print the entire Floor 1 table from floors!`,
          initialCode: `board1 = [[0, 0, 0], [0, 0, 0]]   # Floor 1
board2 = [[1, 0, 1], [0, 1, 0]]   # Floor 2
floors = [board1, board2]

print(floors[___])`,
          expectedOutput: "[[0, 0, 0], [0, 0, 0]]",
          hint: `Floor 1 = index 0.`,
          hint2: `0`,
        },
        {
          id: "try-floors-cell",
          type: "tryit",
          title: `🖥️ Pull Out One Cell Inside a Floor`,
          task: `Print the value at Floor 1's 2nd row, 3rd cell!`,
          initialCode: `board1 = [[0, 0, 0], [0, 0, 0]]   # Floor 1
board2 = [[1, 0, 1], [0, 1, 0]]   # Floor 2
floors = [board1, board2]

print(floors[0][___][___])`,
          expectedOutput: "0",
          hint: `2nd row = index 1. 3rd cell = index 2.`,
          hint2: `1 / 2`,
        },
        {
          id: "predict-floor-cell-meaning",
          type: "predict",
          title: `💭 Which floor, row, and cell is floors[1][0][2]?`,
          content: `Which floor, row, and cell does floors[1][0][2] point to? (Remember, indexes start at 0!)`,
          options: ["Floor 1's row 1, cell 1", "Floor 2's row 1, cell 3", "Floor 2's row 3, cell 1", "Floor 1's row 3, cell 2"],
          answer: 1,
          explanation: "Since indexing starts at 0, floors[1] is Floor 2 (the second table), [0] inside that is row 1 (the first row), and [2] inside that is cell 3 (the third cell).",
        },
        {
          id: "interactive-floor-explore",
          type: "interactive",
          title: `🎮 Browse Floor by Floor`,
          description: `Use ◀▶ to move between floors, then click any cell.`,
          component: "py3dFloorExplore",
        },
        {
          id: "name-3d-list",
          type: "explain",
          title: `📛 Giving It a Name — 3D List`,
          content: `What we built — floors, where several 2D lists sit inside one outer list — is called a **3D list**.

- **Floor** — floors[1] grabs one whole table with a single index.
- **Row** — floors[1][0] grabs one row inside that table.
- **Cell** — floors[1][0][2] grabs one cell inside that row.

Each bracket — floor, row, cell — picks along one **axis**. floors has three axes.

**In short:** three square brackets — floor, row, cell. It's the same two brackets from Lesson 53, plus one more layer.`,
        }
      ]
    },
    {
      id: "ch2",
      title: "Building One",
      emoji: "🧱",
      steps: [
        {
          id: "recall-2d-trap",
          type: "explain",
          title: `🔁 Recall — The Lesson 53 Trap`,
          content: `In Lesson 53, we learned not to build it this way:

\`\`\`python
board = [[0] * n] * m   # ❌ all m rows point to the same list
\`\`\`

3D lists have the exact same trap — just one layer deeper.`,
        },
        {
          id: "try-3d-mult-trap",
          type: "tryit",
          title: `🖥️ Try It — Change Just One Cell`,
          task: `Fill in the blank to build floors, set floors[0][0][0] to 9, then print it!`,
          initialCode: `floors = [[[0] * 3] * 2] * ___
floors[0][0][0] = 9
print(floors)`,
          expectedOutput: "[[[9, 0, 0], [9, 0, 0]], [[9, 0, 0], [9, 0, 0]]]",
          hint: `2 floors, so 2.`,
          hint2: `2`,
        },
        {
          id: "predict-3d-why-all-changed",
          type: "predict",
          title: `💭 We only touched floors[0][0][0] — so why did everything change?`,
          content: `We only changed floors[0][0][0] to 9, yet every other floor and row changed too. Why?`,
          options: ["Because repeating with * — from the inside out — makes everything point to the exact same list", "Because Python automatically keeps floors and rows in sync"],
          answer: 0,
          explanation: "Building [[0]*3]*2 already made both rows point to the same list. Repeating that whole thing with *2 for the floors makes both floors point to the same thing too. So changing one cell shows up everywhere — every floor, every row.",
        },
        {
          id: "explain-3d-comprehension-fix",
          type: "explain",
          title: `🎨 A Triple Comprehension — Building It Correctly`,
          content: `Just stack one more comprehension on top of what you learned in Lesson 53.

\`\`\`python
# ❌ Don't build it this way
floors = [[[0] * n] * m] * k

# ✅ Build it this way — range() three times
floors = [[[0] * n for _ in range(m)] for _ in range(k)]
\`\`\`

From the inside out: cells (n), rows (m), floors (k).`,
        },
        {
          id: "try-3d-comprehension-fix",
          type: "tryit",
          title: `🖥️ Try It — This Time It Doesn't Spread`,
          task: `Fill in the blank to build floors, then check that changing floors[0][0][0] to 9 only changes one cell!`,
          initialCode: `floors = [[[0] * 3 for _ in range(2)] for _ in range(___)]
floors[0][0][0] = 9
print(floors)`,
          expectedOutput: "[[[9, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0]]]",
          hint: `2 floors.`,
          hint2: `2`,
        },
        {
          id: "mission-build-3d-board",
          type: "mission",
          title: `🏆 Mission — Build a 2×3×4 Board`,
          task: `Build a 3D list with 2 floors, 3 rows, and 4 cells, fill it all with '.', and print it! (Use the comprehension method.)`,
          initialCode: `floors = [[['.'] * ___ for _ in range(___)] for _ in range(___)]
print(floors)`,
          expectedOutput: "[[['.', '.', '.', '.'], ['.', '.', '.', '.'], ['.', '.', '.', '.']], [['.', '.', '.', '.'], ['.', '.', '.', '.'], ['.', '.', '.', '.']]]",
          hint: `From the inside out: cells, rows, floors.`,
          hint2: `4 / 3 / 2`,
        }
      ]
    },
    {
      id: "ch3",
      title: "An Axis Doesn't Have to Be a Place",
      emoji: "🧭",
      steps: [
        {
          id: "explain-axis-not-space-intro",
          type: "explain",
          title: `🧭 So Far, Every Axis Meant 'Where'`,
          content: `Floor, row, cell — all three axes we've built so far meant **'where something is'**. A location inside the table.

But does an axis have to be a location? Could it mean something else?`,
        },
        {
          id: "explain-state-axis-table",
          type: "explain",
          title: `📊 ways[row][col][items used so far]`,
          content: `Say we have this 3D list.

\`\`\`python
ways = [
    [[1, 0], [2, 1]],
    [[3, 1], [0, 2]],
]
\`\`\`

The first two axes (row, col) still mean 'where', like before. But **the third axis means 'how many items we've used so far'**. It's not a location — it's a box that stores how far along we are.

- ways[0][1][0] — row 0, col 1, having used 0 items so far
- ways[0][1][1] — row 0, col 1, having used 1 item so far

Same row, same column, but a different third number gives a completely different value.`,
        },
        {
          id: "try-ways-lookup",
          type: "tryit",
          title: `🖥️ Pull One Value Out of the Table`,
          task: `Print the value at row 0, col 1, having used 0 items so far!`,
          initialCode: `ways = [
    [[1, 0], [2, 1]],
    [[3, 1], [0, 2]],
]

print(ways[0][___][0])`,
          expectedOutput: "2",
          hint: `Row 0, col 1 — so the second bracket is 1.`,
          hint2: `1`,
        },
        {
          id: "predict-state-axis-trap",
          type: "predict",
          title: `💭 What does ways[1][0][1] mean?`,
          content: `Pick what ways[1][0][1] means.`,
          options: ["Row 1, col 0, where there's 1 item sitting there", "Row 1, col 0, having used 1 item so far"],
          answer: 1,
          explanation: "The third axis doesn't mean 'where' — it means 'how far along we are'. So it's not '1 item is there', it's '1 item has been used so far'.",
        },
        {
          id: "interactive-state-toggle",
          type: "interactive",
          title: `🎮 Keep the Location, Toggle the State`,
          description: `Pick a location (row, col), then press the k tabs to see how the value changes.`,
          component: "py3dStateToggle",
        },
        {
          id: "predict-state-axis-range",
          type: "predict",
          title: `💭 How many values can the k axis take?`,
          content: `If there's only 1 item total, how many values can 'items used so far' take?`,
          options: ["1 value (0 only)", "2 values (0 or 1)", "3 values (0, 1, 2)", "It isn't fixed"],
          answer: 1,
          explanation: "With only 1 item, you've used either 0 or 1 — exactly two values. So this axis needs its size set too, just like range(2).",
        },
        {
          id: "mission-fill-ways-table",
          type: "mission",
          title: `🏆 Mission — Fill the Table`,
          task: `Build a table with 2 rows, 2 columns, and 2 states, fill it all with 0, then set row 1, col 1, state 0 to 5 and print it!`,
          initialCode: `ways = [[[0] * 2 for _ in range(2)] for _ in range(___)]
ways[1][1][0] = 5
print(ways)`,
          expectedOutput: "[[[0, 0], [0, 0]], [[0, 0], [5, 0]]]",
          hint: `2 rows, so 2.`,
          hint2: `2`,
        }
      ]
    },
    {
      id: "ch4",
      title: "Going Through It All",
      emoji: "🚶",
      steps: [
        {
          id: "explain-triple-for",
          type: "explain",
          title: `🔄 Stack Three for Loops`,
          content: `With three axes, just stack three for loops.

\`\`\`python
for f in range(len(floors)):
    for r in range(len(floors[f])):
        for c in range(len(floors[f][r])):
            print(floors[f][r][c])
\`\`\`

From the outside in: floor → row → cell. It's the nested for loop from Lesson 53, plus one more layer.`,
        },
        {
          id: "predict-triple-for-count",
          type: "predict",
          title: `💭 2 floors, 3 rows, 4 cells — how many times does print run?`,
          content: `For a list with 2 floors, 3 rows per floor, and 4 cells per row, how many times does print run inside the triple for loop?`,
          options: ["9 times (2+3+4)", "24 times (2×3×4)", "12 times (3×4)", "20 times"],
          answer: 1,
          explanation: "The floor loop runs 2 times, and each time the row loop runs 3 times, and each of those runs the cell loop 4 times — so 2 × 3 × 4 = 24 times. It's multiplication, not addition.",
        },
        {
          id: "try-triple-for-fill",
          type: "tryit",
          title: `🖥️ Fill In the Triple for — Total Sum`,
          task: `Fill in the blank to add up every cell inside floors!`,
          initialCode: `floors = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]

count = 0
for f in range(len(floors)):
    for r in range(len(floors[f])):
        for c in range(len(___)):
            count += floors[f][r][c]

print(count)`,
          expectedOutput: "36",
          hint: `The inner range should be the length of the current row — floors[f][r].`,
          hint2: `floors[f][r]`,
        },
        {
          id: "mission-count-condition",
          type: "mission",
          title: `🏆 Final Mission — Count Cells That Match a Condition`,
          task: `Count how many cells in floors have a value of 5 or more!`,
          initialCode: `floors = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
count = 0

for f in range(len(floors)):
    for r in range(len(floors[f])):
        for c in range(len(floors[f][r])):
            if floors[f][r][c] ___ 5:
                count += 1

print(count)`,
          expectedOutput: "4",
          hint: `Count it if it's 5 or more.`,
          hint2: `>=`,
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 Complete!`,
          content: `## What You Learned Today

✅ **3D lists** — several 2D lists inside one list: floor, row, cell
✅ **Building one** — \`[[[0]*n for _ in range(m)] for _ in range(k)]\` (not \`[[[0]*n]*m]*k\`!)
✅ **An axis doesn't have to be a place** — the third axis can hold 'how far along we are' instead
✅ **Going through it all** — a triple for loop, floor → row → cell

The same trick works even with 4 or 5 axes. You'll use it right away in the next problems (Cheese, Walk Home)!`,
        }
      ]
    }
  ]
}
