// ============================================
// Lesson 53: 2D Lists (English)
// ============================================
import { LessonData } from './types'

export const lesson53EnData: LessonData = {
  id: "53",
  title: "2D Lists",
  emoji: "🧩",
  description: "A list inside a list — working with table-shaped data!",
  chapters: [
    {
      id: "ch1",
      title: "A List Inside a List",
      emoji: "📋",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `🧩 What We'll Learn Today — Lists Inside Lists`,
          content: `There are four things in this lesson.

1️⃣ **A list inside a list** — hold several students' attendance records at once
2️⃣ **Making one** — avoid the trap that comes from building it the wrong way
3️⃣ **Going through it** — stack two for loops to visit every single cell
4️⃣ **Rebuilding it all at once** — make a new 2D list in one line`
        },
        {
          id: "review-three-vars",
          type: "explain",
          title: `📋 Attendance, Three Students`,
          content: `In Lesson 16 we wrote attendance as a single list.

\`\`\`python
att = [1, 1, 0, 1, 1]   # 1 = present, 0 = absent
\`\`\`

Now what if there are three students? We can just make three lists.

\`\`\`python
att1 = [1, 1, 0, 1, 1]   # Minji
att2 = [1, 0, 1, 1, 1]   # Seojun
att3 = [0, 1, 1, 0, 1]   # Haeun

print(att2)
\`\`\`

Still fine — three separate variables work okay for now.`
        },
        {
          id: "try-att2-index",
          type: "tryit",
          title: `🖥️ Try It!`,
          task: `Print the second value (index 1) of att2!`,
          initialCode: `att1 = [1, 1, 0, 1, 1]
att2 = [1, 0, 1, 1, 1]
att3 = [0, 1, 1, 0, 1]

print(att2[___])`,
          expectedOutput: "0",
          hint: `Index starts at 0. The second value is index 1.`,
          hint2: `1`
        },
        {
          id: "predict-thirty-students",
          type: "predict",
          title: `💭 But what if there are 30 students?`,
          content: `With 30 students you'd need att1, att2, att3, ... all the way to att30. Can a for loop go through those 30 variable names at once?`,
          options: ["Yes, a for loop can read variable names one by one", "No — a for loop can only go through values *inside* a list, not variable names themselves"],
          answer: 1,
          explanation: "A for loop pulls values out of a container like a list one at a time — it can't read variable names such as att1, att2, att3 in order. With 30 separate variables you'd need 30 separate lines of code."
        },
        {
          id: "students-list-explain",
          type: "explain",
          title: `📦 So — a List Inside a List`,
          content: `What if, instead of separate names att1, att2, att3, we put all three inside one big list?

\`\`\`python
att1 = [1, 1, 0, 1, 1]
att2 = [1, 0, 1, 1, 1]
att3 = [0, 1, 1, 0, 1]

students = [att1, att2, att3]

print(students)
# [[1, 1, 0, 1, 1], [1, 0, 1, 1, 1], [0, 1, 1, 0, 1]]
\`\`\`

Now students is a single list. But all three values inside it are themselves lists. **A list inside a list** — that's everything you'll learn today.`
        },
        {
          id: "try-students-one-row",
          type: "tryit",
          title: `🖥️ Pull Out One Row`,
          task: `Print the first student's (Minji's) record from students!`,
          initialCode: `att1 = [1, 1, 0, 1, 1]
att2 = [1, 0, 1, 1, 1]
att3 = [0, 1, 1, 0, 1]
students = [att1, att2, att3]

print(students[___])`,
          expectedOutput: "[1, 1, 0, 1, 1]",
          hint: `First = index 0.`,
          hint2: `0`
        },
        {
          id: "interactive-grid-explore",
          type: "interactive",
          title: `🎮 Whole Row vs. One Cell`,
          description: `Toggle between 'whole row' and 'one cell only', then click any cell.`,
          component: "py2dGridExplore"
        },
        {
          id: "try-students-cell",
          type: "tryit",
          title: `🖥️ Pull Out One Cell`,
          task: `Print the second student's (Seojun's) third-day record from students!`,
          initialCode: `att1 = [1, 1, 0, 1, 1]
att2 = [1, 0, 1, 1, 1]
att3 = [0, 1, 1, 0, 1]
students = [att1, att2, att3]

print(students[___][___])`,
          expectedOutput: "1",
          hint: `Second student = index 1. Third day = index 2.`,
          hint2: `1 / 2`
        },
        {
          id: "predict-cell-meaning",
          type: "predict",
          title: `💭 Whose record is students[1][0]?`,
          content: `Which student and which day does students[1][0] point to? (Remember, indexes start at 0!)`,
          options: ["1st student's 1st day", "2nd student's 1st day", "2nd student's 2nd day", "1st student's 2nd day"],
          answer: 1,
          explanation: "Since indexing starts at 0, students[1] is the 2nd student (Seojun), and [0] inside that is the 1st day. So it's '2nd student's 1st day'."
        },
        {
          id: "name-2d-list",
          type: "explain",
          title: `📛 Giving It a Name — 2D List`,
          content: `What we built — a list with more lists inside it, like students — is called a **2D list**.

- **A row** — one student's whole record. You grab it with one index, like students[1].
- **A column** — the same day across students. There's no direct way to grab a column yet; you pick it by indexing inside each row.

\`\`\`python
students[1]        # one row — Seojun's whole record
students[1][0]      # one cell inside a row — Seojun's first day
\`\`\`

**In short:** two square brackets — the first picks 'which row', the second picks 'which cell in that row'.`
        }
      ]
    },
    {
      id: "ch2",
      title: "Building One",
      emoji: "🧱",
      steps: [
        {
          id: "review-repeat-mult",
          type: "explain",
          title: `🔁 Review — List × Number`,
          content: `In Lesson 16, \`[0] * 5\` gave us a list of five zeros.

\`\`\`python
row = [0] * 5
print(row)   # [0, 0, 0, 0, 0]
\`\`\`

So wouldn't the same trick work to repeat that line three times?

\`\`\`python
board = [row] * 3
print(board)
# [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
\`\`\`

A 15-cell 2D list, just like that. Let's try it ourselves in the next step.`
        },
        {
          id: "try-mult-trap",
          type: "tryit",
          title: `🖥️ Try It — Change Just One Cell`,
          task: `Fill in the blank to build board, set board[0][0] to 9, then print it!`,
          initialCode: `board = [[0] * 5] * ___
board[0][0] = 9
print(board)`,
          expectedOutput: "[[9, 0, 0, 0, 0], [9, 0, 0, 0, 0], [9, 0, 0, 0, 0]]",
          hint: `3 rows, so 3.`,
          hint2: `3`
        },
        {
          id: "predict-why-all-changed",
          type: "predict",
          title: `💭 We only touched board[0] — so why did all three change?`,
          content: `We only changed board[0][0] to 9, yet board[1] and board[2] changed too. Why?`,
          options: ["Because board[0], board[1], and board[2] all actually point to the exact same list", "Because Python automatically keeps all three rows in sync"],
          answer: 0,
          explanation: "[row] * 3 doesn't copy row — it makes three arrows that all point to the same list. So changing it through any one of them changes what all three show."
        },
        {
          id: "interactive-alias-arrows",
          type: "interactive",
          title: `🎮 Three Arrows, One List`,
          description: `Switch between the ❌ and ✅ tabs, then press the button to see what happens.`,
          component: "py2dAliasArrows"
        },
        {
          id: "try-comprehension-fix",
          type: "tryit",
          title: `🖥️ Try It — This Time It Doesn't Spread`,
          task: `Fill in the blank to build board, then check that changing board[0][0] to 9 only changes one row!`,
          initialCode: `board = [[0] * 5 for _ in range(___)]
board[0][0] = 9
print(board)`,
          expectedOutput: "[[9, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]",
          hint: `3 rows.`,
          hint2: `3`
        },
        {
          id: "predict-transfer-check",
          type: "predict",
          title: `💭 Check Again — rows = [[1] * 3] * 2`,
          content: `Let's check with a different example.

\`\`\`python
rows = [[1] * 3] * 2
rows[1][0] = 9
print(rows)
\`\`\`

Which result is correct?`,
          options: ["[[9, 1, 1], [9, 1, 1]]", "[[1, 1, 1], [9, 1, 1]]"],
          answer: 0,
          explanation: "Anything built with * still points to the same shared list. It looks like we only changed rows[1], but rows[0] is the same list, so it changes to 9 as well."
        },
        {
          id: "mistake-box-mult-vs-comprehension",
          type: "explain",
          title: `🚫 A Common Mistake — Building a 2D List`,
          content: `\`\`\`python
# ❌ Don't build it this way — all m rows point to the same list
board = [[0] * n] * m

# ✅ Build it this way — each row is its own separate list
board = [[0] * n for _ in range(m)]
\`\`\`

From now on, always use the version on the right when you build a 2D list.`
        },
        {
          id: "mission-build-board",
          type: "mission",
          title: `🏆 Mission — Build a 4×6 Board`,
          task: `Build a board with 4 rows and 6 columns, fill it all with '.', and print it! (Use the comprehension method.)`,
          initialCode: `board = [['.'] * ___ for _ in range(___)]
print(board)`,
          expectedOutput: "[['.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.']]",
          hint: `The inner part is the number of columns; range() is the number of rows.`,
          hint2: `6 / 4`
        }
      ]
    },
    {
      id: "ch3",
      title: "Going Through It",
      emoji: "🚶",
      steps: [
        {
          id: "explain-row-loop",
          type: "explain",
          title: `🔄 Pulling Out One Row at a Time`,
          content: `When you loop over students with for, you get one row (one whole list) at a time.

\`\`\`python
students = [[1, 1, 0], [0, 1, 1], [1, 0, 0]]

for row in students:
    print(row)
# [1, 1, 0]
# [0, 1, 1]
# [1, 0, 0]
\`\`\`

Each time, row holds a whole list. But how do we look at each cell *inside* that row?`
        },
        {
          id: "try-nested-for-first",
          type: "tryit",
          title: `🖥️ Two for Loops — a Nested for`,
          task: `Fill in the blank to print every single cell, one per line!`,
          initialCode: `students = [[1, 1, 0], [0, 1, 1], [1, 0, 0]]

for row in students:
    for day in ___:
        print(day)`,
          expectedOutput: "1\n1\n0\n0\n1\n1\n1\n0\n0",
          hint: `The inner for loops over the row we just pulled out in the outer loop.`,
          hint2: `row`
        },
        {
          id: "interactive-grid-walk",
          type: "interactive",
          title: `🎮 Follow the Cursor`,
          description: `Press Next/Prev to see the order a nested for loop visits each cell.`,
          component: "py2dGridWalk"
        },
        {
          id: "predict-total-visits",
          type: "predict",
          title: `💭 2 rows, 3 columns — how many times does print(day) run?`,
          content: `For a list with 2 rows and 3 cells per row, how many times does print(day) run inside the nested for loop?`,
          options: ["2 times", "3 times", "5 times", "6 times"],
          answer: 3,
          explanation: "The outer for runs 2 times (2 rows), and each time the inner for runs 3 times (3 cells) — so 2 × 3 = 6 times."
        },
        {
          id: "try-nested-for-index",
          type: "tryit",
          title: `🖥️ With Indexes Too — range(len(...))`,
          task: `Loop with indexes and print in the format 'row i col j: value'!`,
          initialCode: `students = [[1, 1, 0], [0, 1, 1]]

for i in range(len(students)):
    for j in range(len(___)):
        print(f"row{i} col{j}: {students[i][j]}")`,
          expectedOutput: "row0 col0: 1\nrow0 col1: 1\nrow0 col2: 0\nrow1 col0: 0\nrow1 col1: 1\nrow1 col2: 1",
          hint: `The inner range should be the length of 'that row' — students[i].`,
          hint2: `students[i]`
        },
        {
          id: "mission-attendance-total",
          type: "mission",
          title: `🏆 Mission — Total Attendance`,
          task: `Use a nested for loop and accumulation (+=) to find the total attendance! (1 = present)`,
          initialCode: `students = [[1, 1, 0, 1], [0, 1, 1, 1], [1, 1, 1, 0]]
total = 0

for row in students:
    for day in row:
        total ___ day

print(f"Total attendance: {total} days")`,
          expectedOutput: "Total attendance: 9 days",
          hint: `Add day to the running total, and store it back in total.`,
          hint2: `+=`
        }
      ]
    },
    {
      id: "ch4",
      title: "Rebuilding It All at Once",
      emoji: "🔀",
      steps: [
        {
          id: "explain-doubled-verbose",
          type: "explain",
          title: `✖️ Doubling Every Cell — the Long Way`,
          content: `Let's build a new list where every cell in students is doubled. We can already do this with a nested for loop.

\`\`\`python
students = [[1, 1, 0], [0, 1, 1]]

doubled = []
for row in students:
    new_row = []
    for v in row:
        new_row.append(v * 2)
    doubled.append(new_row)

print(doubled)
# [[2, 2, 0], [0, 2, 2]]
\`\`\`

That took 5 lines. There's a way to shrink it to one — a comprehension.`
        },
        {
          id: "try-nested-comprehension",
          type: "tryit",
          title: `🖥️ One Line — Two Comprehensions Stacked`,
          task: `Fill in the blank to build doubled with a single comprehension line!`,
          initialCode: `students = [[1, 1, 0], [0, 1, 1]]

doubled = [[___ for v in row] for row in students]
print(doubled)`,
          expectedOutput: "[[2, 2, 0], [0, 2, 2]]",
          hint: `Double one cell (v).`,
          hint2: `v * 2`
        },
        {
          id: "explain-comprehension-parts",
          type: "explain",
          title: `🎨 Taking the Comprehension Apart — Inner and Outer for`,
          content: `It looks like one line, but it splits into the same two parts as a nested for loop.

\`\`\`python
doubled = [[v * 2 for v in row] for row in students]
#           ------- inner -------   -------- outer --------
\`\`\`

- **Outer (\`for row in students\`)** — same as the outer for in a nested loop. Pulls out one row at a time.
- **Inner (\`[v * 2 for v in row]\`)** — goes through that row's cells one at a time, doubling each one.

**The whole inner bracket is the 'body' of the outer for.** For every row, the inner comprehension runs completely, once, to build a whole new row.`
        },
        {
          id: "predict-transpose-outer",
          type: "predict",
          title: `💭 What if we want to transpose (swap rows and columns)?`,
          content: `We want to build a new list with rows and columns swapped (a transpose). This time the outer for shouldn't loop over 'rows' — what should it loop over instead?`,
          options: ["Still the original rows (row)", "Column numbers (0, 1, 2, ... the column index)"],
          answer: 1,
          explanation: "Transposing means each column becomes a new row. So the outer for should loop over 'column numbers', gathering the cells at that column into a new row each time."
        },
        {
          id: "mission-transpose",
          type: "mission",
          title: `🏆 Final Mission — Transpose It`,
          task: `Transpose grid (2 rows × 3 columns) into 3 rows × 2 columns! Write it yourself with a nested for loop + append.`,
          initialCode: `grid = [[1, 2, 3], [4, 5, 6]]
rows = len(grid)
cols = len(grid[0])

transposed = []
for c in range(cols):
    new_row = []
    for r in range(rows):
        new_row.append(grid[___][___])
    transposed.append(new_row)

print(transposed)`,
          expectedOutput: "[[1, 4], [2, 5], [3, 6]]",
          hint: `In the original grid, the row index is r and the column index is c.`,
          hint2: `r / c`
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 Complete!`,
          content: `## What You Learned Today

✅ **2D lists** — a list inside a list, rows and columns
✅ **Building one** — \`[[0] * n for _ in range(m)]\` (not \`[[0] * n] * m\`!)
✅ **Going through it** — nested for loops, row by row and then cell by cell
✅ **Rebuilding it all at once** — \`[[expr for v in row] for row in students]\`

Next up, we stack one more layer.`
        }
      ]
    }
  ]
}
