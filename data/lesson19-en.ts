// ============================================
// Lesson 19: Tuples
// ============================================
import { LessonData } from './types'

export const lesson19EnData: LessonData = {
  id: "19",
  title: "Tuples",
  emoji: "📦",
  description: "Learn about tuples -- lists that can't be modified!",
  chapters: [
    {
      id: "ch1",
      title: "What Are Tuples?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📦 Tuple = Immutable List",
          content: `**Tuple** = A list that cannot be modified once created

\`\`\`python
# List - can be modified
fruits = ["apple", "banana"]
fruits[0] = "grape"  # OK!

# Tuple - cannot be modified
colors = ("red", "blue")
colors[0] = "green"  # ❌ Error!
\`\`\`

Use **parentheses ( )** or just commas to create them!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Create a coordinate as a tuple!",
          initialCode: "point = (100, 200)\nprint(point)\nprint(f\"x: {point[0]}, y: {point[1]}\")",
          expectedOutput: "(100, 200)\nx: 100, y: 200",
          hint: "Indexing works the same as lists!",
          hint2: "point[0], point[1]"
        },
        {
          id: "try1b",
          type: "tryit",
          title: "🖥️ List vs Tuple!",
          task: "See the difference between lists and tuples for yourself!",
          initialCode: "# List - can be modified!\nfruits = ['apple', 'banana', 'grape']\nfruits[0] = 'strawberry'\nfruits.append('mango')\nprint(f'List: {fruits}')\n\n# Tuple - cannot be modified! (but safe!)\ncolors = ('red', 'blue', 'green')\nprint(f'Tuple: {colors}')\nprint(f'Length: {len(colors)}')\nprint(f'Contains? {\"blue\" in colors}')\n\n# Multiple types are OK!\nmixed = ('Alice', 15, True, 3.14)\nfor item in mixed:\n    print(f'  {item} ({type(item).__name__})')",
          expectedOutput: "List: ['strawberry', 'banana', 'grape', 'mango']\nTuple: ('red', 'blue', 'green')\nLength: 3\nContains? True\n  Alice (str)\n  15 (int)\n  True (bool)\n  3.14 (float)",
          hint: "Tuples can't be modified, but reading, iterating, and 'in' operations work!",
          hint2: "Just run the code as-is!"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the difference between (1) and (1,)?",
          options: ["Both are tuples", "(1) is a number, (1,) is a tuple", "Both are numbers", "Error"],
          answer: 1,
          explanation: "(1) is just the number 1, while (1,) is a tuple with one element!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Unpacking",
      emoji: "📤",
      steps: [
        {
          id: "unpack-explain",
          type: "explain",
          title: "📤 Unpacking",
          content: `Assign tuple values to multiple variables at once!

\`\`\`python
point = (10, 20)
x, y = point  # Unpacking!
print(x)  # 10
print(y)  # 20
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try Unpacking!",
          task: "Unpack the RGB values!",
          initialCode: "rgb = (255, 128, 0)\nr, g, b = rgb\nprint(f\"R: {r}, G: {g}, B: {b}\")",
          expectedOutput: "R: 255, G: 128, B: 0",
          hint: "The number of variables must match the number of elements",
          hint2: "r, g, b = rgb does it all at once!"
        },
        {
          id: "swap-explain",
          type: "explain",
          title: "🔄 Value Swapping",
          content: `Swapping values is easy with tuples!

\`\`\`python
a = 10
b = 20
a, b = b, a  # Swap in one line!
print(a)  # 20
print(b)  # 10
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Swap Values!",
          task: "Swap the values of x and y!",
          initialCode: "x = 100\ny = 200\nprint(f\"Before swap: x={x}, y={y}\")\nx, y = y, x\nprint(f\"After swap: x={x}, y={y}\")",
          expectedOutput: "Before swap: x=100, y=200\nAfter swap: x=200, y=100",
          hint: "Swap without a temporary variable!",
          hint2: "x, y = y, x in one line!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Manage student info using tuples!",
          initialCode: "students = [\n    (\"Alice\", 85),\n    (\"Bob\", 92),\n    (\"Charlie\", 78)\n]\n\nfor ___, ___ in students:\n    print(f\"{name}: {score} points\")",
          expectedOutput: "Alice: 85 points\nBob: 92 points\nCharlie: 78 points",
          hint: "Unpack directly in the for loop!",
          hint2: "for name, score in students:"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **Tuples ( )** - Immutable lists
✅ **Unpacking** - Assign to multiple variables at once
✅ **Value Swapping** - a, b = b, a

Next time we'll learn about **dictionaries**! 🚀`
        }
      ]
    }
  ]
}
