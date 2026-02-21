// ============================================
// Lesson 36: Function Problems 30
// Part 5: Functions - Practice (English)
// ============================================

import { LessonData } from './types'

export const lesson36EnData: LessonData = {
  id: "36en",
  title: "Function Problems 30",
  emoji: "🏆",
  description: "30 problems to master functions!",
  chapters: [
    // ============================================
    // Chapter 1: Function Basics (1-10)
    // ============================================
    {
      id: "ch1",
      title: "Function Basics (1-10)",
      emoji: "⭐",
      steps: [
        {
          id: "ch1-1",
          type: "quiz",
          title: "Problem 1",
          content: `What is the output?
\`\`\`python
def greet():
    print('Hello!')

greet()
greet()
\`\`\``,
          options: ["Hello!", "Hello!\\nHello!", "Nothing outputs", "Error occurs"],
          answer: 1,
          explanation: "Function called twice, so 'Hello!' prints twice!"
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "Problem 2",
          content: `What is the output?
\`\`\`python
def greet(name):
    print(f'Hi {name}!')

greet('Tom')
\`\`\``,
          options: ["Hi name!", "Hi Tom!", "Hello!", "Error occurs"],
          answer: 1,
          explanation: "'Tom' is passed to the name parameter!"
        },
        {
          id: "ch1-3",
          type: "quiz",
          title: "Problem 3",
          content: `What is the output?
\`\`\`python
def calc(a, b):
    return a * b

result = calc(4, 5)
print(result)
\`\`\``,
          options: ["9", "20", "45", "Error occurs"],
          answer: 1,
          explanation: "4 × 5 = 20"
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "Problem 4",
          content: `What is the output?
\`\`\`python
def test():
    print('A')
    return 'B'
    print('C')

result = test()
print(result)
\`\`\``,
          options: ["A\\nB\\nC", "A\\nB", "B", "Error occurs"],
          answer: 1,
          explanation: "Code after return doesn't run!"
        },
        {
          id: "ch1-5",
          type: "mission",
          title: "Problem 5: Square Function",
          task: "Complete a function that returns the square of a number",
          initialCode: `def square(n):
    # Write code here


print(square(5))
print(square(3))`,
          expectedOutput: "25\n9",
          hint: "return n ** 2",
          hint2: "return n ** 2"
        },
        {
          id: "ch1-6",
          type: "mission",
          title: "Problem 6: Average of Two",
          task: "Complete a function that returns the average of two numbers",
          initialCode: `def average(a, b):
    # Write code here


print(average(10, 20))
print(average(3, 7))`,
          expectedOutput: "15.0\n5.0",
          hint: "return (a + b) / 2",
          hint2: "return (a + b) / 2"
        },
        {
          id: "ch1-7",
          type: "quiz",
          title: "Problem 7",
          content: `What is the output?
\`\`\`python
def greet(name, msg='Hello'):
    print(f'{msg}, {name}!')

greet('Tom')
\`\`\``,
          options: ["Tom, Hello!", "Hello, Tom!", "Error occurs", "None"],
          answer: 1,
          explanation: "Default 'Hello' is used!"
        },
        {
          id: "ch1-8",
          type: "quiz",
          title: "Problem 8",
          content: `What is the output?
\`\`\`python
def power(n, exp=2):
    return n ** exp

print(power(5, 3))
\`\`\``,
          options: ["10", "25", "125", "Error occurs"],
          answer: 2,
          explanation: "5³ = 125"
        },
        {
          id: "ch1-9",
          type: "quiz",
          title: "Problem 9",
          content: `What is the output?
\`\`\`python
def calc(a, b):
    return a + b, a - b

x, y = calc(10, 3)
print(x, y)
\`\`\``,
          options: ["13, 7", "13 7", "(13, 7)", "Error occurs"],
          answer: 1,
          explanation: "10+3=13, 10-3=7"
        },
        {
          id: "ch1-10",
          type: "mission",
          title: "Problem 10: Even Check",
          task: "Return True if even, False if odd",
          initialCode: `def is_even(n):
    # Write code here


print(is_even(4))
print(is_even(7))`,
          expectedOutput: "True\nFalse",
          hint: "n % 2 == 0",
          hint2: "return n % 2 == 0"
        }
      ]
    },
    // ============================================
    // Chapter 2: Variables (11-15)
    // ============================================
    {
      id: "ch2",
      title: "Local/Global (11-15)",
      emoji: "⭐⭐",
      steps: [
        {
          id: "ch2-1",
          type: "quiz",
          title: "Problem 11",
          content: `What is the output?
\`\`\`python
x = 5

def func():
    x = 10
    print(x)

func()
print(x)
\`\`\``,
          options: ["10\\n10", "5\\n5", "10\\n5", "5\\n10"],
          answer: 2,
          explanation: "Inside x(10) and outside x(5) are different variables!"
        },
        {
          id: "ch2-2",
          type: "quiz",
          title: "Problem 12",
          content: `What is the output?
\`\`\`python
x = 1

def func():
    global x
    x = x + 10

func()
print(x)
\`\`\``,
          options: ["1", "10", "11", "Error occurs"],
          answer: 2,
          explanation: "global modifies global variable! 1+10=11"
        },
        {
          id: "ch2-3",
          type: "quiz",
          title: "Problem 13",
          content: `Why does this code cause an error?
\`\`\`python
def func(a=1, b):
    return a + b
\`\`\``,
          options: [
            "Too many parameters",
            "Parameter with default comes before one without",
            "return is wrong",
            "Function name is wrong"
          ],
          answer: 1,
          explanation: "Parameters with defaults must come LAST!"
        },
        {
          id: "ch2-4",
          type: "quiz",
          title: "Problem 14",
          content: `What is the output?
\`\`\`python
def outer():
    x = 10
    def inner():
        return x * 2
    return inner()

print(outer())
\`\`\``,
          options: ["10", "20", "Error occurs", "None"],
          answer: 1,
          explanation: "inner can use outer's x! 10×2=20"
        },
        {
          id: "ch2-5",
          type: "mission",
          title: "Problem 15: Counter",
          task: "Increase counter without using global",
          initialCode: `count = 0

def increase(n):
    return n + 1

count = increase(count)
count = increase(count)
count = increase(count)
print(count)`,
          expectedOutput: "3",
          hint: "Return value and reassign!"
        }
      ]
    },
    // ============================================
    // Chapter 3: Lambda & sorted (16-22)
    // ============================================
    {
      id: "ch3",
      title: "Lambda & sorted (16-22)",
      emoji: "⭐⭐⭐",
      steps: [
        {
          id: "ch3-1",
          type: "quiz",
          title: "Problem 16",
          content: `What is the output?
\`\`\`python
square = lambda x: x ** 2
print(square(5))
\`\`\``,
          options: ["5", "10", "25", "Error occurs"],
          answer: 2,
          explanation: "5² = 25"
        },
        {
          id: "ch3-2",
          type: "quiz",
          title: "Problem 17",
          content: `What is the output?
\`\`\`python
print(sorted([3, 1, 4, 1, 5]))
\`\`\``,
          options: [
            "[1, 1, 3, 4, 5]",
            "[5, 4, 3, 1, 1]",
            "[3, 1, 4, 1, 5]",
            "Error occurs"
          ],
          answer: 0,
          explanation: "Ascending sort!"
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "Problem 18",
          content: `What is the output?
\`\`\`python
print(sorted([3, 1, 4], reverse=True))
\`\`\``,
          options: ["[1, 3, 4]", "[4, 3, 1]", "[3, 1, 4]", "Error occurs"],
          answer: 1,
          explanation: "reverse=True is descending!"
        },
        {
          id: "ch3-4",
          type: "quiz",
          title: "Problem 19",
          content: `What is the output?
\`\`\`python
data = [(3, 'a'), (1, 'c'), (2, 'b')]
result = sorted(data, key=lambda x: x[0])
print(result)
\`\`\``,
          options: [
            "[(1, 'c'), (2, 'b'), (3, 'a')]",
            "[(3, 'a'), (2, 'b'), (1, 'c')]",
            "[('a', 3), ('b', 2), ('c', 1)]",
            "Error occurs"
          ],
          answer: 0,
          explanation: "Sorted by first element (number) ascending!"
        },
        {
          id: "ch3-5",
          type: "quiz",
          title: "Problem 20",
          content: `What is the output?
\`\`\`python
students = [('Tom', 85), ('Jane', 92), ('Mike', 78)]
result = sorted(students, key=lambda x: x[1], reverse=True)
print(result[0][0])
\`\`\``,
          options: ["Tom", "Jane", "Mike", "92"],
          answer: 1,
          explanation: "Score descending → Top is Jane!"
        },
        {
          id: "ch3-6",
          type: "mission",
          title: "Problem 21: Sort by Length",
          task: "Sort words by their length",
          initialCode: `words = ['apple', 'hi', 'banana', 'cat']

# Sort by length using key=lambda
result = sorted(words, key=lambda x: len(x))
print(result)`,
          expectedOutput: "['hi', 'cat', 'apple', 'banana']",
          hint: "Just run it!"
        },
        {
          id: "ch3-7",
          type: "mission",
          title: "Problem 22: Descending by Second",
          task: "Sort by second element descending",
          initialCode: `data = [('a', 3), ('b', 1), ('c', 2)]

# x[1] descending
result = # Write code here

print(result)`,
          expectedOutput: "[('a', 3), ('c', 2), ('b', 1)]",
          hint: "sorted(data, key=lambda x: x[1], reverse=True)",
          hint2: "sorted(data, key=lambda x: x[1], reverse=True)"
        }
      ]
    },
    // ============================================
    // Chapter 4: Built-in Functions (23-30)
    // ============================================
    {
      id: "ch4",
      title: "Built-in Functions (23-30)",
      emoji: "🏆",
      steps: [
        {
          id: "ch4-1",
          type: "quiz",
          title: "Problem 23",
          content: `What is the output?
\`\`\`python
print(sum([1, 2, 3, 4, 5]))
\`\`\``,
          options: ["15", "12345", "[1,2,3,4,5]", "Error occurs"],
          answer: 0,
          explanation: "1+2+3+4+5 = 15"
        },
        {
          id: "ch4-2",
          type: "quiz",
          title: "Problem 24",
          content: `What is the output?
\`\`\`python
print(max([3, 7, 1, 9, 2]))
\`\`\``,
          options: ["1", "3", "7", "9"],
          answer: 3,
          explanation: "Maximum = 9"
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "Problem 25",
          content: `What is the output?
\`\`\`python
nums = ['3', '1', '4']
result = list(map(int, nums))
print(sum(result))
\`\`\``,
          options: ["314", "8", "[3,1,4]", "Error occurs"],
          answer: 1,
          explanation: "['3','1','4'] → [3,1,4] → 3+1+4=8"
        },
        {
          id: "ch4-4",
          type: "quiz",
          title: "Problem 26",
          content: `What is the output?
\`\`\`python
nums = [1, -2, 3, -4, 5]
result = list(filter(lambda x: x > 0, nums))
print(sum(result))
\`\`\``,
          options: ["3", "9", "-2", "15"],
          answer: 1,
          explanation: "Positives only: [1,3,5] → 1+3+5=9"
        },
        {
          id: "ch4-5",
          type: "mission",
          title: "Problem 27: Average",
          task: "Calculate average with sum() and len()",
          initialCode: `scores = [80, 90, 70, 85, 95]

average = sum(scores) / len(scores)
print(average)`,
          expectedOutput: "84.0",
          hint: "Just run it!"
        },
        {
          id: "ch4-6",
          type: "mission",
          title: "Problem 28: Range",
          task: "Find the difference between max and min",
          initialCode: `numbers = [3, 7, 1, 9, 4]

range_val = max(numbers) - min(numbers)
print(range_val)`,
          expectedOutput: "8",
          hint: "9 - 1 = 8"
        },
        {
          id: "ch4-7",
          type: "mission",
          title: "Problem 29: String to Number",
          task: "Convert strings to integers with map()",
          initialCode: `strings = ['10', '20', '30']

numbers = list(map(int, strings))
print(numbers)
print(sum(numbers))`,
          expectedOutput: "[10, 20, 30]\n60",
          hint: "Just run it!"
        },
        {
          id: "ch4-8",
          type: "mission",
          title: "Problem 30: Comprehensive",
          task: "Filter passing scores (≥60) and find their average",
          initialCode: `scores = [85, 45, 92, 55, 78, 30]

# 1. Filter 60 or above
passing = list(filter(lambda x: x >= 60, scores))

# 2. Calculate average
avg = sum(passing) / len(passing)

print(f'Passing: {passing}')
print(f'Average: {avg}')`,
          expectedOutput: "Passing: [85, 92, 78]\nAverage: 85.0",
          hint: "Just run it!"
        }
      ]
    }
  ]
}
