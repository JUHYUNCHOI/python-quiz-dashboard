// ============================================
// Lesson 15: Data Structures Overview
// ============================================
// ⚠️ This lesson is a MAP, not a class.
//    Each structure gets its own lesson (List 16·17, Tuple 19, Dict 20, Set 21).
//    2026-08-23: removed the 4-type syntax dump, comparison table, missions and quizzes —
//    students were asked to solve things they hadn't learned yet (dict/tuple/set), which was too big a hurdle.
//    → motivation → one list line → taste of a list → "there are 3 more" (read only) → roadmap.
//    Comparing and choosing lives in Lesson 26.
import { LessonData } from './types'

export const lesson15EnData: LessonData = {
  id: "15",
  title: "Data Structures Overview",
  emoji: "📦",
  description: "Holding many values in one variable — a map of what's coming!",
  chapters: [
    {
      id: "ch1",
      title: "Holding Many Things at Once",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📦 100 students → 100 variables? 😱",
          content: `You want to store your classmates' names!

\`\`\`python
name1 = "Alex"
name2 = "Bella"
name3 = "Chris"
\`\`\`

Fine for 3. But **100 students**? Would you make 100 variables? Your fingers would fall off 🤚

→ **Data structures** to the rescue! One variable holds many values at once.`
        },
        {
          id: "solution",
          type: "explain",
          title: "✅ One variable, many values — the list",
          content: `Here's how:

\`\`\`python
students = ["Alex", "Bella", "Chris"]
\`\`\`

One variable now holds **all** the students! Even 100 of them fit on one line.

Wrap values in square brackets \`[ ]\`, separated by commas. This is called a **list**.

It's the most used data structure, so you'll dig into lists starting next lesson. But first — let's build one yourself 👇`
        },
        {
          id: "tryit-list-taste",
          type: "tryit",
          title: "🖥️ Build a list — first taste",
          task: "Fill the blank with a list of 3 fruits! (inside [ ], separated by commas)",
          initialCode: "# Make a list holding 'apple', 'banana', 'grape'\nfruits = ___\n\nprint(fruits)\nprint(f\"count: {len(fruits)}\")",
          expectedOutput: "['apple', 'banana', 'grape']\ncount: 3",
          hint: "Put the 3 values inside [ ], separated by commas.",
          hint2: "fruits = ['apple', 'banana', 'grape']"
        },
        {
          id: "others-preview",
          type: "explain",
          title: "👀 There are 3 more besides lists",
          content: `Lists cover most cases, but sometimes:

- What if a value must **never change**, like a coordinate \`(37, 127)\`?
- What if you want to look something up **by name** — \`Alex → 90 points\`?
- What if you only care about **distinct kinds**, no duplicates?

That's why Python has three more:

- 🔒 **Tuple** \`( )\` — once made, it can't change
- 🏷️ **Dictionary (dict)** \`{ }\` — name tag → value
- ✋ **Set** \`{ }\` — duplicates disappear automatically

> For now, just knowing **they exist** is enough. You'll learn how to build and use each one, lesson by lesson!`
        },
        {
          id: "roadmap",
          type: "explain",
          title: "🗺️ Here's how you'll learn them",
          content: `You won't learn all of them at once. **One at a time**:

| Lesson | What you'll learn |
|---|---|
| **16 · 17** | 🧊 **List** — build, access, modify, use with loops |
| **19** | 🔒 **Tuple** — the bundle that never changes |
| **20** | 🏷️ **Dictionary** — look up by name |
| **21** | ✋ **Set** — remove duplicates |
| **26** | 📊 **Compare** all four and pick the right one |

That was just the map. **Next lesson (16): lists for real!** 🚀`
        }
      ]
    }
  ]
}
