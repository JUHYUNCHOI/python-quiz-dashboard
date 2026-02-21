// ============================================
// Lesson 35: Built-in Functions Summary
// Part 5: Functions - Built-in (English)
// ============================================

import { LessonData } from './types'

export const lesson35EnData: LessonData = {
  id: "35en",
  title: "Built-in Functions",
  emoji: "📚",
  description: "Master the essential Python built-in functions!",
  chapters: [
    // ============================================
    // Chapter 1: len(), sum()
    // ============================================
    {
      id: "ch1",
      title: "len() and sum()",
      emoji: "📏",
      steps: [
        {
          id: "ch1-1",
          type: "explain",
          title: "Essential Built-in Functions!",
          content: `## ⭐ Master These 5!

1. \`len()\` - Length
2. \`sum()\` - Sum total
3. \`max()\`, \`min()\` - Maximum/Minimum
4. \`sorted()\` - Sort
5. \`map()\` - Transform

Know these 5 well and you're set!`
        },
        {
          id: "ch1-2",
          type: "tryit",
          title: "len() - Length",
          task: "Check various lengths with len()",
          initialCode: `print(len([1, 2, 3]))       # List length
print(len('Hello'))         # String length
print(len({'a': 1, 'b': 2}))  # Dictionary key count`,
          expectedOutput: "3\n5\n2",
          hint: "3 items, 5 characters, 2 keys"
        },
        {
          id: "ch1-3",
          type: "tryit",
          title: "sum() - Total",
          task: "Calculate sums with sum()",
          initialCode: `print(sum([1, 2, 3, 4, 5]))   # Basic
print(sum([10, 20, 30]))      # Basic

# Starting value
print(sum([1, 2, 3], 10))     # Start from 10`,
          expectedOutput: "15\n60\n16",
          hint: "Third one: 10 + 1 + 2 + 3 = 16"
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "Understanding sum()",
          content: `What is the output?
\`\`\`python
print(sum([1, 2, 3, 4, 5]))
\`\`\``,
          options: [
            "12345",
            "15",
            "[1, 2, 3, 4, 5]",
            "Error occurs"
          ],
          answer: 1,
          explanation: "sum() adds all numbers in the list. 1+2+3+4+5 = 15"
        },
        {
          id: "ch1-5",
          type: "mission",
          title: "Calculate Average",
          task: "Use sum() and len() to calculate average",
          initialCode: `numbers = [80, 90, 70, 85, 95]

# average = sum / count
average = # Write code here

print(f'Average: {average}')`,
          expectedOutput: "Average: 84.0",
          hint: "sum(numbers) / len(numbers)",
          hint2: "sum(numbers) / len(numbers)"
        }
      ]
    },
    // ============================================
    // Chapter 2: max(), min()
    // ============================================
    {
      id: "ch2",
      title: "max() and min()",
      emoji: "🔝",
      steps: [
        {
          id: "ch2-1",
          type: "tryit",
          title: "max(), min() Basics",
          task: "Find maximum and minimum values",
          initialCode: `print(max([3, 7, 1, 9]))    # Max from list
print(min([3, 7, 1, 9]))    # Min from list

# Can also use multiple arguments
print(max(3, 7, 1, 9))      # Max of values
print(min(3, 7, 1, 9))      # Min of values`,
          expectedOutput: "9\n1\n9\n1",
          hint: "9 is largest, 1 is smallest"
        },
        {
          id: "ch2-2",
          type: "quiz",
          title: "Understanding max()",
          content: `What is the output?
\`\`\`python
print(max([3, 7, 1, 9, 2]))
\`\`\``,
          options: [
            "1",
            "3",
            "7",
            "9"
          ],
          answer: 3,
          explanation: "max() returns the largest value. 9 is the maximum!"
        },
        {
          id: "ch2-3",
          type: "mission",
          title: "Score Analysis",
          task: "Use max(), min(), sum(), len() to analyze",
          initialCode: `scores = [85, 92, 78, 95, 88]

highest = max(scores)
lowest = min(scores)
average = sum(scores) / len(scores)

print(f'Highest: {highest}')
print(f'Lowest: {lowest}')
print(f'Average: {average}')`,
          expectedOutput: "Highest: 95\nLowest: 78\nAverage: 87.6",
          hint: "Just run the code as is!"
        }
      ]
    },
    // ============================================
    // Chapter 3: sorted()
    // ============================================
    {
      id: "ch3",
      title: "sorted() - Sort",
      emoji: "📊",
      steps: [
        {
          id: "ch3-1",
          type: "tryit",
          title: "Basic Sorting",
          task: "Try ascending and descending sort",
          initialCode: `numbers = [3, 1, 4, 1, 5, 9]

print(sorted(numbers))                    # Ascending
print(sorted(numbers, reverse=True))     # Descending`,
          expectedOutput: "[1, 1, 3, 4, 5, 9]\n[9, 5, 4, 3, 1, 1]",
          hint: "reverse=True for descending"
        },
        {
          id: "ch3-2",
          type: "quiz",
          title: "sorted() Descending",
          content: `What is the output?
\`\`\`python
print(sorted([3, 1, 4, 1, 5], reverse=True))
\`\`\``,
          options: [
            "[1, 1, 3, 4, 5]",
            "[5, 4, 3, 1, 1]",
            "[1, 1, 4, 3, 5]",
            "Error occurs"
          ],
          answer: 1,
          explanation: "reverse=True is descending! 5, 4, 3, 1, 1 order."
        },
        {
          id: "ch3-3",
          type: "explain",
          title: "⭐ Sort with key",
          content: `## Common Exam Pattern!

\`\`\`python
words = ['apple', 'pie', 'banana']

# Sort by length
print(sorted(words, key=len))
# ['pie', 'apple', 'banana']
\`\`\`

Each word's length: apple=5, pie=3, banana=6
Sorted by length: 3, 5, 6 → pie, apple, banana`
        },
        {
          id: "ch3-4",
          type: "tryit",
          title: "Sort Tuple List",
          task: "Sort by score",
          initialCode: `students = [('Tom', 85), ('Jane', 92), ('Mike', 78)]

# Sort by score (second element)
print(sorted(students, key=lambda x: x[1]))`,
          expectedOutput: "[('Mike', 78), ('Tom', 85), ('Jane', 92)]",
          hint: "x[1] is score! 78, 85, 92 order"
        },
        {
          id: "ch3-5",
          type: "mission",
          title: "Find Top Student",
          task: "Sort by score descending and print the top student's name",
          initialCode: `students = [('Tom', 85), ('Jane', 92), ('Mike', 78)]

# Sort by score descending
result = sorted(students, key=lambda x: x[1], reverse=True)

# Print top student's name
print(result[0][0])`,
          expectedOutput: "Jane",
          hint: "result[0] is top student, result[0][0] is their name"
        }
      ]
    },
    // ============================================
    // Chapter 4: map()
    // ============================================
    {
      id: "ch4",
      title: "map() - Transform",
      emoji: "🔄",
      steps: [
        {
          id: "ch4-1",
          type: "explain",
          title: "What is map()?",
          content: `## 🔄 Apply function to all elements!

\`\`\`
['1', '2', '3']  ── map(int, ...) ──→  [1, 2, 3]
   strings              transform!      integers
\`\`\`

**Basic usage:**
\`\`\`python
# Convert string numbers to integers
strings = ['1', '2', '3']
numbers = list(map(int, strings))
print(numbers)  # [1, 2, 3]
\`\`\`

🚨 **Note!** \`map()\` returns a map object!
Wrap with \`list()\` to get a list.`
        },
        {
          id: "ch4-2",
          type: "tryit",
          title: "map() Basics",
          task: "Convert strings to integers",
          initialCode: `strings = ['1', '2', '3']
numbers = list(map(int, strings))
print(numbers)`,
          expectedOutput: "[1, 2, 3]",
          hint: "map(int, ...) converts each to int"
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "Understanding map()",
          content: `What is the output?
\`\`\`python
nums = ['3', '1', '4']
result = list(map(int, nums))
print(sum(result))
\`\`\``,
          options: [
            "'314'",
            "8",
            "[3, 1, 4]",
            "Error occurs"
          ],
          answer: 1,
          explanation: "['3','1','4'] → [3,1,4] → sum = 3+1+4 = 8"
        },
        {
          id: "ch4-4",
          type: "explain",
          title: "⭐⭐ map() for Input (Essential!)",
          content: `## Reading Multiple Numbers

\`\`\`python
# Read multiple numbers on one line
a, b, c = map(int, input().split())

# Read as list
numbers = list(map(int, input().split()))
\`\`\`

💡 This pattern appears on almost every exam!`
        },
        {
          id: "ch4-5",
          type: "mission",
          title: "Convert and Sum",
          task: "Combine map() and sum()",
          initialCode: `string_nums = ['10', '20', '30', '40']

# 1. Convert to integers
numbers = list(map(int, string_nums))

# 2. Print sum
print(sum(numbers))`,
          expectedOutput: "100",
          hint: "10 + 20 + 30 + 40 = 100"
        }
      ]
    },
    // ============================================
    // Chapter 5: Other Useful Functions
    // ============================================
    {
      id: "ch5",
      title: "Other Useful Functions",
      emoji: "🧰",
      steps: [
        {
          id: "ch5-1",
          type: "tryit",
          title: "abs(), round()",
          task: "Try absolute value and rounding",
          initialCode: `# abs() - Absolute value
print(abs(-5))
print(abs(5))

# round() - Rounding
print(round(3.7))
print(round(3.14159, 2))  # 2 decimal places`,
          expectedOutput: "5\n5\n4\n3.14",
          hint: "abs() for absolute value, round() for rounding"
        },
        {
          id: "ch5-2",
          type: "tryit",
          title: "filter() - Filter",
          task: "Keep only elements that match condition",
          initialCode: `numbers = [1, -2, 3, -4, 5]

# Keep only positive numbers
positives = list(filter(lambda x: x > 0, numbers))
print(positives)`,
          expectedOutput: "[1, 3, 5]",
          hint: "Only x > 0 ones remain"
        },
        {
          id: "ch5-3",
          type: "quiz",
          title: "Understanding filter()",
          content: `What is the output?
\`\`\`python
numbers = [1, -2, 3, -4, 5]
result = list(filter(lambda x: x > 0, numbers))
print(sum(result))
\`\`\``,
          options: [
            "3",
            "9",
            "-2",
            "15"
          ],
          answer: 1,
          explanation: "Filter positives: [1, 3, 5] → 1+3+5 = 9"
        },
        {
          id: "ch5-4",
          type: "tryit",
          title: "enumerate() - Index and Value",
          task: "Print index with value",
          initialCode: `fruits = ['apple', 'banana', 'cherry']

for i, f in enumerate(fruits):
    print(f'{i}: {f}')`,
          expectedOutput: "0: apple\n1: banana\n2: cherry",
          hint: "enumerate() gives both index and value"
        },
        {
          id: "ch5-5",
          type: "tryit",
          title: "zip() - Combine",
          task: "Combine two lists into one",
          initialCode: `names = ['Tom', 'Jane']
scores = [85, 92]

result = list(zip(names, scores))
print(result)`,
          expectedOutput: "[('Tom', 85), ('Jane', 92)]",
          hint: "zip() combines lists into tuples"
        }
      ]
    }
  ]
}
