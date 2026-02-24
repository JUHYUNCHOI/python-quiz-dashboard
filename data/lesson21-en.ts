// ============================================
// Lesson 21: Sets (set)
// ============================================
import { LessonData } from './types'

export const lesson21EnData: LessonData = {
  id: "21",
  title: "Sets (set)",
  emoji: "🎯",
  description: "Learn about collections with no duplicates!",
  chapters: [
    {
      id: "ch1",
      title: "What is a Set?",
      emoji: "🎯",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎯 Want to Remove Duplicates?",
          content: `**Set** = a data structure with no duplicates and no order

\`\`\`python
numbers = {1, 2, 2, 3, 3, 3}
print(numbers)  # {1, 2, 3} - duplicates removed!

names = {"Alice", "Bob", "Alice"}
print(names)  # {'Alice', 'Bob'}
\`\`\`

**Features:**
- ❌ No duplicates
- ❌ No order (no indexing)
- ⭕ Fast lookup`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Remove duplicates and count the unique elements!",
          initialCode: "numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\nunique = set(numbers)\nprint(f\"Count after removing duplicates: {len(unique)}\")",
          expectedOutput: "Count after removing duplicates: 4",
          hint: "Use set() to convert a list to a set!",
          hint2: "Use len() to check the count"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of set([1, 1, 2, 2, 3])?",
          options: ["{1, 1, 2, 2, 3}", "{1, 2, 3}", "[1, 2, 3]", "Error"],
          answer: 1,
          explanation: "Sets automatically remove duplicates!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Set Operations",
      emoji: "🔧",
      steps: [
        {
          id: "add-remove",
          type: "explain",
          title: "➕➖ Add and Remove",
          content: `**add()** - add an element
**remove()** - remove (error if not found)
**discard()** - remove (OK if not found)

\`\`\`python
fruits = {"apple", "banana"}

fruits.add("strawberry")
print(fruits)  # {'apple', 'banana', 'strawberry'}

fruits.remove("banana")
print(fruits)  # {'apple', 'strawberry'}
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Add an Element!",
          task: "Add 'orange' to the set and check the count!",
          initialCode: "fruits = {\"apple\", \"banana\"}\nfruits.add(\"orange\")\nprint(f\"Number of fruits: {len(fruits)}\")",
          expectedOutput: "Number of fruits: 3",
          hint: "Use add() to add!",
          hint2: "fruits.add(\"orange\")"
        },
        {
          id: "in-explain",
          type: "explain",
          title: "🔍 Checking Membership",
          content: `Use the **in** operator for fast lookup!

\`\`\`python
fruits = {"apple", "banana", "strawberry"}

print("apple" in fruits)   # True
print("grape" in fruits)   # False
\`\`\`

💡 Sets search **much faster** than lists!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Check Membership!",
          task: "Check if 'banana' is in the set!",
          initialCode: "fruits = {\"apple\", \"banana\", \"strawberry\"}\nprint(\"banana\" in fruits)",
          expectedOutput: "True",
          hint: "Use the in operator!",
          hint2: "\"banana\" in fruits"
        }
      ]
    },
    {
      id: "ch3",
      title: "Set Operations",
      emoji: "🧮",
      steps: [
        {
          id: "set-ops",
          type: "explain",
          title: "🧮 Mathematical Set Operations!",
          content: `\`\`\`python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Union (A or B)
print(A | B)  # {1, 2, 3, 4, 5, 6}

# Intersection (A and B)
print(A & B)  # {3, 4}

# Difference (only in A)
print(A - B)  # {1, 2}
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Find the Intersection!",
          task: "Find the number of common elements between two sets!",
          initialCode: "A = {1, 2, 3, 4, 5}\nB = {4, 5, 6, 7, 8}\ncommon = A & B\nprint(f\"Number of common elements: {len(common)}\")",
          expectedOutput: "Number of common elements: 2",
          hint: "Use the & operator for intersection!",
          hint2: "Use len() for the count"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Find the Difference!",
          task: "Find the number of elements only in A!",
          initialCode: "A = {1, 2, 3, 4, 5}\nB = {4, 5, 6, 7, 8}\nonly_A = A - B\nprint(f\"Elements only in A: {len(only_A)}\")",
          expectedOutput: "Elements only in A: 3",
          hint: "Use the - operator for difference!",
          hint2: "A - B"
        },
        {
          id: "mission-ops",
          type: "mission",
          title: "🎯 Mission: Master Set Operations!",
          task: "Fill in the 3 blanks to complete the set operations!",
          initialCode: "fruits_a = {'apple', 'banana', 'grape', 'strawberry'}\nfruits_b = {'banana', 'strawberry', 'mango', 'kiwi'}\n\n# Fruits sold by both stores (intersection)\nboth = fruits_a ___ fruits_b\nprint(f'Both: {both}')\n\n# Fruits sold only by store A (difference)\nonly_a = fruits_a ___ fruits_b\nprint(f'Only A: {only_a}')\n\n# All fruits (union)\nall_fruits = fruits_a ___ fruits_b\nprint(f'Total: {len(all_fruits)} kinds')",
          expectedOutput: "Both: {'banana', 'strawberry'}\nOnly A: {'apple', 'grape'}\nTotal: 6 kinds",
          hint: "Intersection &, Difference -, Union |",
          hint2: "& / - / |"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of {1, 2, 3} | {3, 4, 5}?",
          options: ["{3}", "{1, 2, 3, 4, 5}", "{1, 2, 4, 5}", "Error"],
          answer: 1,
          explanation: "| is the union operator! It combines all elements."
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
          task: "Find the number of common students and total students between two classes!",
          initialCode: "class_a = {\"Alice\", \"Bob\", \"Charlie\", \"Diana\"}\nclass_b = {\"Bob\", \"Charlie\", \"Eve\", \"Frank\"}\n\n# Common students (intersection)\ncommon = class_a ___ class_b\n\n# All students (union)\nall_students = class_a ___ class_b\n\nprint(f\"Class A students: {len(class_a)}\")\nprint(f\"Class B students: {len(class_b)}\")\nprint(f\"Common students: {len(common)}\")\nprint(f\"Total students: {len(all_students)}\")",
          expectedOutput: "Class A students: 4\nClass B students: 4\nCommon students: 2\nTotal students: 6",
          hint: "& is intersection, | is union!",
          hint2: "Use len() to check the count"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **Sets { }** - no duplicates, no order
✅ **add(), remove()** - add/remove elements
✅ **in** - fast lookup
✅ **| & -** - union, intersection, difference

Next time we'll learn about **slicing**! 🚀`
        }
      ]
    }
  ]
}
