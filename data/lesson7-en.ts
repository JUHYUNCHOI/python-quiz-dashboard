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
          content: `By default, print() separates values with spaces:

\`\`\`python
print("A", "B", "C")  # A B C
\`\`\`

But you can change this with **options**!`
        },
        {
          id: "sep-explain",
          type: "explain",
          title: "🔸 sep - Change the Separator",
          content: `**sep** = separator

\`\`\`python
print("A", "B", "C", sep="-")
# A-B-C

print("2024", "01", "15", sep="/")
# 2024/01/15

print("Alice", "Bob", "Charlie", sep=", ")
# Alice, Bob, Charlie
\`\`\`

The default value is \`sep=" "\` (a space)!`
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
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of `print(1, 2, 3, sep=\"★\")`?",
          options: ["1 2 3", "1★2★3", "★1★2★3★", "123"],
          answer: 1,
          explanation: "sep goes 'between' the values! 1★2★3"
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
          title: "🔚 end - Change the Ending Character",
          content: `By default, print() ends with a newline(\\n):

\`\`\`python
print("Hello")
print("World")
# Hello
# World
\`\`\`

You can change it with **end**:
\`\`\`python
print("Hello", end=" ")
print("World")
# Hello World
\`\`\``
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
          task: "Print in the format A → B → C!",
          initialCode: "print(\"A\", end=___)\nprint(\"B\", end=___)\nprint(\"C\")",
          expectedOutput: "A → B → C",
          hint: "Set end=\" → \"!",
          hint2: "print(\"A\", end=\" → \")"
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
          content: `You can use both options together:

\`\`\`python
print("A", "B", "C", sep="-", end="!")
print("Done")
# A-B-C!Done
\`\`\`

**The order doesn't matter:**
\`\`\`python
print("A", "B", end="!", sep="-")  # Same result
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Use both sep and end!",
          initialCode: "print(\"A\", \"B\", \"C\", sep=___, end=___)",
          expectedOutput: "A/B/C.",
          hint: "sep=\"/\", end=\".\\n\"",
          hint2: "print(\"A\", \"B\", \"C\", sep=\"/\", end=\".\\n\")"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 Mission!",
          task: "Create a loading indicator!",
          initialCode: "print(\"Loading\", end=___)\nprint(\".\", end=___)\nprint(\".\", end=___)\nprint(\".\", end=___)\nprint(\" Done!\")",
          expectedOutput: "Loading... Done!",
          hint: "Use end=\"\" to continue without a newline!",
          hint2: "end=\"\""
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
          content: `## print() Options Summary

**sep** - Separator between values (default: space)
\`\`\`python
print("A", "B", sep="-")  # A-B
\`\`\`

**end** - Ending character (default: newline)
\`\`\`python
print("Hello", end=" ")  # No newline
\`\`\`

**Using both together**
\`\`\`python
print("A", "B", sep="-", end="!")  # A-B!
\`\`\``
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Create a nice progress bar!",
          initialCode: "print(\"[\", end=___)\nprint(\"#\", \"#\", \"#\", \"#\", \"#\", sep=___, end=___)\nprint(\"]\", \"100%\", sep=\" \")",
          expectedOutput: "[#####] 100%",
          hint: "Use end=\"\" to chain them together, and sep=\"\" for no spaces!",
          hint2: "end=\"\", sep=\"\""
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **sep** - Changing the separator
✅ **end** - Changing the ending character
✅ Using both options **together**

Next time, we'll learn about **f-strings** to make printing even easier! 🚀`
        }
      ]
    }
  ]
}
