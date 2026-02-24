// ============================================
// Lesson 16: List Basics
// ============================================
import { LessonData } from './types'

export const lesson16EnData: LessonData = {
  id: "16",
  title: "List Basics",
  emoji: "📋",
  description: "Lists let you store multiple data items at once!",
  chapters: [
    {
      id: "ch1",
      title: "Creating Lists",
      emoji: "📝",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📋 What is a List?",
          content: `**List** = a data structure that stores multiple values in order

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]
\`\`\`

- Use **square brackets [ ]**
- Separate items with **commas (,)**
- You can mix **different types** together!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Create a fruit list and print it!",
          initialCode: "fruits = [\"apple\", \"banana\", \"strawberry\"]\nprint(fruits)",
          expectedOutput: "['apple', 'banana', 'strawberry']",
          hint: "Put the values inside square brackets!",
          hint2: "[\"apple\", \"banana\", \"strawberry\"]"
        },
        {
          id: "index-explain",
          type: "explain",
          title: "🔢 Accessing by Index",
          content: `You can access each element by its **index (position)**!

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
#          [0]       [1]        [2]

print(fruits[0])  # apple (first)
print(fruits[1])  # banana (second)
print(fruits[2])  # strawberry (third)
\`\`\`

⚠️ Indexes start from **0**!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Access by Index!",
          task: "Print the second fruit!",
          initialCode: "fruits = [\"apple\", \"banana\", \"strawberry\"]\nprint(fruits[1])",
          expectedOutput: "banana",
          hint: "The second item is index 1!",
          hint2: "fruits[1]"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of [10, 20, 30][2]?",
          options: ["10", "20", "30", "Error"],
          answer: 2,
          explanation: "Index 2 is the third element! It's 30."
        }
      ]
    },
    {
      id: "ch2",
      title: "Modifying Lists",
      emoji: "✏️",
      steps: [
        {
          id: "modify-explain",
          type: "explain",
          title: "✏️ Changing Values",
          content: `You can change values by accessing them with an index:

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
fruits[1] = "grape"  # banana → grape
print(fruits)  # ['apple', 'grape', 'strawberry']
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Change a Value!",
          task: "Change the first value to 'orange'!",
          initialCode: "fruits = [\"apple\", \"banana\", \"strawberry\"]\nfruits[0] = \"orange\"\nprint(fruits)",
          expectedOutput: "['orange', 'banana', 'strawberry']",
          hint: "Index 0 is the first item!",
          hint2: "fruits[0] = \"orange\""
        },
        {
          id: "add-explain",
          type: "explain",
          title: "➕ Adding/Removing Elements",
          content: `**append()** - add to the end
\`\`\`python
fruits = ["apple", "banana"]
fruits.append("strawberry")
print(fruits)  # ['apple', 'banana', 'strawberry']
\`\`\`

**remove()** - delete by value
\`\`\`python
fruits.remove("banana")
print(fruits)  # ['apple', 'strawberry']
\`\`\`

**pop()** - delete by index (default: last)
\`\`\`python
fruits.pop()   # remove last
fruits.pop(0)  # remove first
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Add an Element!",
          task: "Add 'grape' to the list!",
          initialCode: "fruits = [\"apple\", \"banana\"]\nfruits.append(\"grape\")\nprint(fruits)",
          expectedOutput: "['apple', 'banana', 'grape']",
          hint: "Use append() to add!",
          hint2: "fruits.append(\"grape\")"
        }
      ]
    },
    {
      id: "ch3",
      title: "List Features",
      emoji: "🔧",
      steps: [
        {
          id: "len-explain",
          type: "explain",
          title: "📏 Length and Searching",
          content: `**len()** - get the length
\`\`\`python
fruits = ["apple", "banana", "strawberry"]
print(len(fruits))  # 3
\`\`\`

**in** - check membership
\`\`\`python
print("apple" in fruits)  # True
print("grape" in fruits)  # False
\`\`\`

**index()** - find position
\`\`\`python
print(fruits.index("banana"))  # 1
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Get the Length!",
          task: "Print the length of the list!",
          initialCode: "numbers = [10, 20, 30, 40, 50]\nprint(f\"Count: {len(numbers)} items\")",
          expectedOutput: "Count: 5 items",
          hint: "Use len() for the length!",
          hint2: "len(numbers)"
        },
        {
          id: "negative-explain",
          type: "explain",
          title: "➖ Negative Indexing",
          content: `You can also count from the end!

\`\`\`python
fruits = ["apple", "banana", "strawberry"]
#          [0]       [1]        [2]
#          [-3]      [-2]       [-1]

print(fruits[-1])  # strawberry (last)
print(fruits[-2])  # banana (second from last)
\`\`\``
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of [1, 2, 3, 4, 5][-1]?",
          options: ["1", "5", "-1", "Error"],
          answer: 1,
          explanation: "[-1] is the last element! It's 5."
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Build a shopping cart system!",
          initialCode: "cart = []\n\n# Add items\ncart.___(\"apple\")\ncart.___(\"milk\")\ncart.___(\"bread\")\n\nprint(\"Cart:\", cart)\nprint(f\"Total: {___(cart)} items\")\n\n# Remove milk\ncart.___(\"milk\")\nprint(\"After removing milk:\", cart)",
          expectedOutput: "Cart: ['apple', 'milk', 'bread']\nTotal: 3 items\nAfter removing milk: ['apple', 'bread']",
          hint: "Use append() to add, remove() to delete!",
          hint2: "Use len() to count the items!"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **Lists [ ]** - store items in order
✅ **Indexing [0]** - starts from 0
✅ **append(), remove()** - add/delete
✅ **len(), in** - length/membership check
✅ **Negative indexing [-1]** - count from the end

Next time we'll learn about **lists and loops**! 🚀`
        }
      ]
    }
  ]
}
