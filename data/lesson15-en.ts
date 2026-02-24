// ============================================
// Lesson 15: Data Structures Overview
// ============================================
import { LessonData } from './types'

export const lesson15EnData: LessonData = {
  id: "15",
  title: "Data Structures Overview",
  emoji: "📦",
  description: "An introduction to Python's data structures!",
  chapters: [
    {
      id: "ch1",
      title: "What Are Data Structures?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📦 Ways to Organize Data",
          content: `You want to store student names!

\`\`\`python
name1 = "Alice"
name2 = "Bob"
name3 = "Charlie"
\`\`\`

What if there are 100 students? **100 variables?** 😱

With **data structures**, you can manage them all at once!`
        },
        {
          id: "solution",
          type: "explain",
          title: "✅ One List Is All You Need!",
          content: `\`\`\`python
students = ["Alice", "Bob", "Charlie"]
\`\`\`

You can store multiple items in **a single variable** like this!

Python has **4 data structures**:
- **List [ ]** - the most commonly used!
- **Tuple ( )** - cannot be modified
- **Dictionary { }** - look up by name
- **Set { }** - no duplicates`
        },
        {
          id: "tryit-list-basic",
          type: "tryit",
          title: "💻 Compare the 4 Data Structures!",
          task: "Run the code to compare Python's 4 data structures!",
          initialCode: `# 1. List - ordered and modifiable!
fruits = ['apple', 'banana', 'grape']
print(f'List: {fruits}')
print(f'First: {fruits[0]}')

# 2. Tuple - ordered but NOT modifiable!
colors = (255, 0, 128)
print(f'\\nTuple: {colors}')
print(f'Red: {colors[0]}')

# 3. Dictionary - look up by name!
scores = {'Alice': 90, 'Bob': 95}
print(f'\\nDictionary: {scores}')
print(f'Bob\\'s score: {scores["Bob"]}')

# 4. Set - duplicates automatically removed!
numbers = {1, 2, 2, 3, 3, 3}
print(f'\\nSet: {numbers}')`,
          expectedOutput: `List: ['apple', 'banana', 'grape']\nFirst: apple\n\nTuple: (255, 0, 128)\nRed: 255\n\nDictionary: {'Alice': 90, 'Bob': 95}\nBob's score: 95\n\nSet: {1, 2, 3}`,
          hint: "[ ] List, ( ) Tuple, {'key': value} Dictionary, {value} Set!",
          hint2: "Just run the code as-is!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Hands-On Experience!",
      emoji: "🎮",
      steps: [
        {
          id: "interactive-intro",
          type: "explain",
          title: "🎮 Learn by Clicking Around!",
          content: `Let's experience **why each data structure is needed**!

- 🧊 **List** - Fridge (store multiple items)
- 🔒 **Tuple** - RGB Color (must not change)
- 🏷️ **Dict** - Locker (find by name)
- ✋ **Set** - Attendance (no duplicates)

On the next screen, **click each tab** to feel the difference!`
        },
        {
          id: "interactive",
          type: "interactive",
          title: "🎮 Try It Yourself!",
          component: "dataStructures",
          description: "Click each tab to experience the differences between List, Tuple, Dict, and Set!"
        },
        {
          id: "coding-dict",
          type: "coding",
          title: "📝 Build a Dictionary Yourself",
          description: "Create a dictionary that works like a locker where you look up items by name!",
          starterCode: `# Create a locker dictionary!\n# Alice: soccer ball, Bob: backpack\n\nlocker = {\n    # Write your code here\n}\n\nprint(locker["Alice"])`,
          testCases: [
            {
              expectedOutput: "soccer ball",
              description: "Alice's locker has a soccer ball!"
            }
          ],
          hints: [
            "In a dictionary, write 'name': 'value' inside { }",
            "Write it like this: 'Alice': 'soccer ball', 'Bob': 'backpack'",
            "Answer: locker = { 'Alice': 'soccer ball', 'Bob': 'backpack' }"
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "Summary",
      emoji: "📊",
      steps: [
        {
          id: "tryit-when",
          type: "tryit",
          title: "💻 When to Use What?",
          task: "Run the examples to see which data structure fits each situation!",
          initialCode: `# Situation 1: Shopping list → List! (ordered, modifiable)
shopping = ['milk', 'bread', 'eggs']
shopping.append('cheese')
print(f'Shopping: {shopping}')

# Situation 2: Coordinates → Tuple! (must not change)
position = (37, 127)
print(f'Position: {position}')

# Situation 3: Student scores → Dictionary! (find by name)
scores = {'Alice': 85, 'Bob': 92, 'Charlie': 78}
print(f'Bob\\'s score: {scores["Bob"]} points')

# Situation 4: Attendance check → Set! (no duplicates)
attendance = {'Alice', 'Bob', 'Alice', 'Charlie'}
print(f'Attendance: {attendance} ({len(attendance)} people)')`,
          expectedOutput: `Shopping: ['milk', 'bread', 'eggs', 'cheese']\nPosition: (37, 127)\nBob's score: 92 points\nAttendance: {'Alice', 'Bob', 'Charlie'} (3 people)`,
          hint: "Each data structure has a situation that fits it best!",
          hint2: "Just run the code as-is!"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Which data structure is ordered AND modifiable?",
          options: ["Tuple ()", "List []", "Set {}", "Dictionary {}"],
          answer: 1,
          explanation: "Lists are ordered, allow duplicates, and are modifiable! They're the most commonly used."
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Which one should you use for values that must NEVER change, like RGB colors?",
          options: ["List []", "Tuple ()", "Set {}", "Dictionary {}"],
          answer: 1,
          explanation: "Tuples cannot be modified, so you can't accidentally change them!"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz!",
          content: "When you want to look up something by name, like 'What's Alice's score?'",
          options: ["List []", "Tuple ()", "Set {}", "Dictionary {}"],
          answer: 3,
          explanation: "Dictionaries let you find values instantly by their key (name)!"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 Mission: Pick the Right Data Structure!",
          task: "Fill in the 3 blanks to complete the data structures!",
          initialCode: `# 1. Fruit list → List!
fruits = ___'strawberry', 'grape', 'mango']
print(f'Fruits: {fruits}')
print(f'Count: {len(fruits)} items')

# 2. Student info → Dictionary!
student = {'name': 'Alice', 'age': 15, 'hobby': 'soccer'}
print(f'Name: {student[___]}')

# 3. Remove duplicates → Set!
colors = {'red', 'blue', 'red', 'green', 'blue'}
print(f'Color types: {___(colors)} types')`,
          expectedOutput: `Fruits: ['strawberry', 'grape', 'mango']\nCount: 3 items\nName: Alice\nColor types: 3 types`,
          hint: "Lists use [, dictionaries access by key, len() counts items!",
          hint2: "[ / 'name' / len"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **List 🧊** - Fridge (ordered, duplicates OK, modifiable)
✅ **Tuple 🔒** - RGB Color (cannot modify!)
✅ **Dict 🏷️** - Locker (find by name)
✅ **Set ✋** - Attendance (no duplicates!)

Next time, we'll dive deep into **Lists**! 🚀`
        }
      ]
    }
  ]
}
