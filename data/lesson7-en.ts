// ============================================
// Lesson 7: print() Options
// ============================================
import { LessonData } from './types'

export const lesson7EnData: LessonData = {
  id: "7",
  title: "print() Options",
  emoji: "⚙️",
  description: "Use print() more freely!",
  chapters: [
    {
      id: "ch1",
      title: "The sep Option",
      emoji: "🔸",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "⚙️ print() Has Options!",
          content: `When you give \`print()\` several values, it puts a **space** between them:

\`\`\`python
print("A", "B", "C")  # A B C
\`\`\`

But sometimes you want "no space, please — use \`-\` instead!"
That's what **options** are for. Today we'll learn two of them:

- **sep (separator)** — what goes *between* values
- **end** — what goes at the *end* of the output

You add options inside \`print()\` as \`name=value\`.`
        },
        {
          id: "sep-explain",
          type: "explain",
          title: "🔸 sep — Change What Goes Between",
          content: `**sep** = separator. The text that goes *between* values.

\`\`\`python
print("A", "B", "C", sep="-")
# A-B-C

print("2024", "01", "15", sep="/")
# 2024/01/15

print("Alice", "Bob", "Charlie", sep=", ")
# Alice, Bob, Charlie
\`\`\`

**The default is \`sep=" "\` (one space)** — that's why you normally see spaces.

**When to use it?**
- Glue a date with \`/\` → \`2024/01/15\`
- List items with \`, \` → \`Alice, Bob, Charlie\`
- No gap at all → \`sep=""\`

⚠️ **Common mix-up:** \`sep\` only goes *between* values. Never at the very start or very end!`
        },
        {
          id: "sep-visualizer",
          type: "interactive",
          title: "🎬 Step Through sep",
          component: "pyPrintOptionsVisualizer",
          componentProps: { hideEnd: true },
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print the date separated by dashes!",
          initialCode: "print(\"2024\", \"01\", \"15\", sep=___)",
          expectedOutput: "2024-01-15",
          hint: "Use the sep=\"-\" option!",
          hint2: "print(\"2024\", \"01\", \"15\", sep=\"-\")"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Remove the Separator!",
          task: "Print ABC with no spaces between them!",
          initialCode: "print(\"A\", \"B\", \"C\", sep=___)",
          expectedOutput: "ABC",
          hint: "Set sep=\"\" (empty string)!",
          hint2: "sep=\"\""
        },
        {
          id: "predict-sep",
          type: "predict",
          title: "💭 What Will It Print?",
          content: `What does this code output?

\`\`\`python
print("python", "java", "c++", sep=" | ")
\`\`\``,
          options: [
            "python java c++",
            "python | java | c++",
            "| python | java | c++ |",
            "pythonjavac++"
          ],
          answer: 1,
          explanation: "sep=\" | \" goes *between* values. Never at the very start or end!"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of `print(1, 2, 3, sep=\"★\")`?",
          options: ["1 2 3", "1★2★3", "★1★2★3★", "123"],
          answer: 1,
          explanation: "sep only goes *between* values → 1★2★3"
        }
      ]
    },
    {
      id: "ch2",
      title: "The end Option",
      emoji: "🔚",
      steps: [
        {
          id: "end-explain",
          type: "explain",
          title: "🔚 end — Change the Ending",
          content: `By default, \`print()\` ends with a **newline** (\`\\n\`). So calling it twice gives you two lines:

\`\`\`python
print("Hello")
print("World")
# Hello
# World
\`\`\`

Use **end** to change that ending character. Replace the newline with a space, and the two prints sit on one line:

\`\`\`python
print("Hello", end=" ")
print("World")
# Hello World
\`\`\`

**When to use it?**
- Glue two \`print\` calls onto one line → \`end=" "\`
- Build a loading bar \`Loading...\` → \`end=""\`
- Chain with arrows \`A -> B -> C\` → \`end=" -> "\`

❌ **Common mix-up:** \`end\` only affects the end of *that one* print. The next \`print\` has its own \`end\`!`
        },
        {
          id: "end-visualizer",
          type: "interactive",
          title: "🎬 Step Through end",
          component: "pyPrintOptionsVisualizer",
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print two print statements on one line!",
          initialCode: "print(\"Hello\", end=___)\nprint(\"World\")",
          expectedOutput: "Hello World",
          hint: "Use end=\" \" instead of a newline!",
          hint2: "print(\"Hello\", end=\" \")"
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Connect with Arrows!",
          task: "Print in the format A -> B -> C!",
          initialCode: "print(\"A\", end=___)\nprint(\"B\", end=___)\nprint(\"C\")",
          expectedOutput: "A -> B -> C",
          hint: "Set end=\" -> \"!",
          hint2: "print(\"A\", end=\" -> \")"
        },
        {
          id: "predict-end",
          type: "predict",
          title: "💭 What Will It Print?",
          content: `What does this code output?

\`\`\`python
print("yum", end="*")
print("yum", end="*")
print("yum")
\`\`\``,
          options: [
            "yum\nyum\nyum",
            "yum*yum*yum",
            "yum yum yum*",
            "*yum*yum*yum"
          ],
          answer: 1,
          explanation: "Each \`print\` ends with \`*\`, and the last one uses the default (\\n). So one line: \`yum*yum*yum\`."
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "If `print(\"A\", end=\"\")` is followed by another print, what happens?",
          options: ["Prints on a new line", "Prints right after", "Causes an error", "Prints after a space"],
          answer: 1,
          explanation: "end=\"\" prints nothing at the end, so the next output continues right after!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Using sep and end Together",
      emoji: "🎨",
      steps: [
        {
          id: "both-explain",
          type: "explain",
          title: "🎨 sep and end Together!",
          content: `You can use both options at once. \`sep\` handles *between* values, \`end\` handles the *very end* — so their jobs never overlap.

\`\`\`python
print("A", "B", "C", sep="-", end="!")
print("Done")
# A-B-C!Done
\`\`\`

Look at the output — \`A-B-C\` came from \`sep\`, \`!\` came from \`end\`, and then \`Done\` got stuck right after *with no newline*.

**Order doesn't matter** — options are named, so you can write them in any order:
\`\`\`python
print("A", "B", end="!", sep="-")  # Same A-B!
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Fill in both sep and end so the output is `A/B/C.` (with a newline after the period).",
          initialCode: "print(\"A\", \"B\", \"C\", sep=___, end=___)",
          expectedOutput: "A/B/C.",
          hint: "Between: a single /. End: a period then a newline (\\n).",
          hint2: "\"/\" / \".\\n\""
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 Mission — Loading Indicator!",
          task: "Print Loading, then three dots appearing one by one, then Done! — all on one line. (No spaces between the dots.)",
          initialCode: "print(\"Loading\", end=___)\nprint(\".\", end=___)\nprint(\".\", end=___)\nprint(\".\", end=___)\nprint(\" Done!\")",
          expectedOutput: "Loading... Done!",
          hint: "Use end=\"\" — an empty string means nothing at the end, so output keeps flowing!",
          hint2: "\"\" / \"\" / \"\" / \"\""
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "summary",
          type: "explain",
          title: "📝 Summary",
          content: `## print() Options — Cheat Sheet

| Option | Where? | Default |
|---|---|---|
| **sep** | *between* values | \`" "\` (one space) |
| **end** | *at the end* | \`"\\n"\` (newline) |

\`\`\`python
print("A", "B", sep="-")     # A-B
print("Hello", end=" ")      # No newline at the end
print("A", "B", sep="-", end="!")   # A-B!
\`\`\`

💡 **Memory hook:** *multiple values* → \`sep\`. *multiple prints on one line* → \`end\`.`
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Final Mission — Progress Bar!",
          task: "Build a progress bar that looks like [#####] 100%. No spaces between the #s, and no space between [ and the #s.",
          initialCode: "print(\"[\", end=___)\nprint(\"#\", \"#\", \"#\", \"#\", \"#\", sep=___, end=___)\nprint(\"]\", \"100%\", sep=\" \")",
          expectedOutput: "[#####] 100%",
          hint: "No newline after [ so end=\"\". No space between #s so sep=\"\". Then end=\"\" again so ] sticks on naturally.",
          hint2: "\"\" / \"\" / \"\""
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **sep** — change what goes *between* values
✅ **end** — change what goes at the *end* (default: newline)
✅ Use **both** together — order doesn't matter

Next time, we'll learn **f-strings** to drop variables right inside a sentence! 🚀`
        }
      ]
    }
  ]
}
