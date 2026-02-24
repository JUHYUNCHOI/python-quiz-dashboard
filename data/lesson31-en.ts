// ============================================
// Lesson 31: Comprehensive Quiz Collection
// Review Challenge: Basics to Data Structures (English)
// ============================================

import { LessonData } from './types'

export const lesson31EnData: LessonData = {
  id: "31en",
  title: "Comprehensive Quiz Collection",
  emoji: "🏆",
  description: "A comprehensive challenge from basics to data structures!",
  chapters: [
    // ============================================
    // Chapter 1: Basic Problems (1~10)
    // ============================================
    {
      id: "ch1",
      title: "Basic Problems (1~10)",
      emoji: "⭐",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "🏆 Comprehensive Challenge!",
          content: `## Parts 1~3 Full Review!

| Part | # of Problems |
|------|---------------|
| ⭐ Basics | 10 problems |
| ⭐⭐ Data Structures | 10 problems |
| ⭐⭐⭐ Comprehensive | 10 problems |

30 problems total! Get 24 or more correct to pass! 🎯`
        },
        {
          id: "ch1-1",
          type: "quiz",
          title: "Problem 1",
          content: "What is the output?\n\n```python\nprint(10 // 3)\n```",
          options: ["3", "3.33", "3.0", "4"],
          answer: 0,
          explanation: "// is the floor division operator! The quotient of 10 divided by 3 is 3!"
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "Problem 2",
          content: "What is the output?\n\n```python\nprint(10 % 3)\n```",
          options: ["3", "1", "0", "3.33"],
          answer: 1,
          explanation: "% is the modulo operator! The remainder of 10 divided by 3 is 1!"
        },
        {
          id: "ch1-3",
          type: "quiz",
          title: "Problem 3",
          content: "What is the output?\n\n```python\nx = 'Python'\nprint(x * 3)\n```",
          options: ["Error", "Python3", "PythonPythonPython", "9"],
          answer: 2,
          explanation: "String * number = repetition! 'Python' * 3 = 'PythonPythonPython'!"
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "Problem 4",
          content: "What is the output?\n\n```python\nfor i in range(3):\n    print(i, end=' ')\n```",
          options: ["1 2 3 ", "0 1 2 ", "0 1 2 3 ", "1 2 "],
          answer: 1,
          explanation: "range(3) gives 0, 1, 2! end=' ' prints them on one line!"
        },
        {
          id: "ch1-5",
          type: "quiz",
          title: "Problem 5",
          content: "What is the output?\n\n```python\nx = 15\nif x > 20:\n    print('A')\nelif x > 10:\n    print('B')\nelse:\n    print('C')\n```",
          options: ["A", "B", "C", "AB"],
          answer: 1,
          explanation: "15 > 20? No → 15 > 10? Yes → 'B'!"
        },
        {
          id: "ch1-6",
          type: "tryit",
          title: "Problem 6: Times Table",
          task: "Run the code to print the 7 times table!",
          initialCode: `for i in range(1, 10):
    print(f'7 x {i} = {7 * i}')`,
          expectedOutput: `7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63`,
          hint: "range(1, 10) gives 1~9!",
          hint2: "7 * i calculates the multiplication result!"
        },
        {
          id: "ch1-7",
          type: "quiz",
          title: "Problem 7",
          content: "What is the output?\n\n```python\ntext = 'Hello World'\nprint(text[0:5])\n```",
          options: ["Hello", "Hello ", "Hello World", "H"],
          answer: 0,
          explanation: "text[0:5] is index 0~4! 'Hello'!"
        },
        {
          id: "ch1-8",
          type: "mission",
          title: "Problem 8: Sum of Evens",
          task: "Fill in the 2 blanks to find the sum of even numbers from 1 to 20!",
          initialCode: `total = 0
for i in range(1, ___):
    if i ___ 2 == 0:
        total += i
print(f'Sum of evens 1~20: {total}')`,
          expectedOutput: `Sum of evens 1~20: 110`,
          hint: "range(1, 21) for 1~20, % 2 == 0 means even!",
          hint2: "21 / %"
        },
        {
          id: "ch1-9",
          type: "quiz",
          title: "Problem 9",
          content: "What is the output?\n\n```python\nresult = ''\nfor ch in 'Python':\n    if ch.isupper():\n        result += ch\nprint(result)\n```",
          options: ["Python", "P", "PYTHON", "python"],
          answer: 1,
          explanation: "In 'Python', the only uppercase letter is 'P'!"
        },
        {
          id: "ch1-10",
          type: "quiz",
          title: "Problem 10",
          content: "What is the output?\n\n```python\nnums = [3, 1, 4, 1, 5]\nnums.sort()\nprint(nums[-1])\n```",
          options: ["3", "5", "1", "Error"],
          answer: 1,
          explanation: "sort() sorts the list → [1, 1, 3, 4, 5], [-1] is the last element = 5!"
        }
      ]
    },

    // ============================================
    // Chapter 2: Data Structure Problems (11~20)
    // ============================================
    {
      id: "ch2",
      title: "Data Structure Problems (11~20)",
      emoji: "⭐⭐",
      steps: [
        {
          id: "ch2-0",
          type: "quiz",
          title: "Problem 11",
          content: "What is the output?\n\n```python\nfruits = ['apple', 'banana', 'cherry']\nfruits.append('grape')\nprint(len(fruits))\n```",
          options: ["3", "4", "5", "Error"],
          answer: 1,
          explanation: "3 items + append adds 1 more → 4 items!"
        },
        {
          id: "ch2-1",
          type: "quiz",
          title: "Problem 12",
          content: "What is the output?\n\n```python\ninfo = {'name': 'Tom', 'age': 15}\ninfo['grade'] = 'A'\nprint(len(info))\n```",
          options: ["2", "3", "4", "Error"],
          answer: 1,
          explanation: "2 items + adding a new key → 3 items!"
        },
        {
          id: "ch2-2",
          type: "quiz",
          title: "Problem 13",
          content: "What is the output?\n\n```python\ns = {1, 2, 3, 2, 1}\nprint(len(s))\n```",
          options: ["5", "3", "2", "Error"],
          answer: 1,
          explanation: "Sets remove duplicates! {1, 2, 3} → 3 items!"
        },
        {
          id: "ch2-3",
          type: "mission",
          title: "Problem 14: Reverse a List",
          task: "Fill in the 2 blanks to reverse the list!",
          initialCode: `nums = [1, 2, 3, 4, 5]
reversed_nums = []

for i in range(len(nums)-1, -1, ___):
    reversed_nums.___(nums[i])

print(reversed_nums)`,
          expectedOutput: `[5, 4, 3, 2, 1]`,
          hint: "Use range in reverse order, and append to add!",
          hint2: "-1 / append"
        },
        {
          id: "ch2-4",
          type: "quiz",
          title: "Problem 15",
          content: "What is the output?\n\n```python\nd = {'a': 1, 'b': 2, 'c': 3}\nprint(list(d.keys()))\n```",
          options: ["[1, 2, 3]", "['a', 'b', 'c']", "[('a',1), ('b',2)]", "Error"],
          answer: 1,
          explanation: ".keys() returns only the keys! ['a', 'b', 'c']!"
        },
        {
          id: "ch2-5",
          type: "tryit",
          title: "Problem 16: Remove Duplicates",
          task: "Remove duplicates from a list and sort it!",
          initialCode: `nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
unique = sorted(set(nums))
print(f'Original: {nums}')
print(f'Deduplicated: {unique}')
print(f'Original {len(nums)} items -> {len(unique)} items')`,
          expectedOutput: `Original: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]\nDeduplicated: [1, 2, 3, 4, 5, 6, 9]\nOriginal 11 items -> 7 items`,
          hint: "set() removes duplicates, sorted() sorts them!",
          hint2: "sorted(set(list)) is the key!"
        },
        {
          id: "ch2-6",
          type: "quiz",
          title: "Problem 17",
          content: "What is the output?\n\n```python\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)\n```",
          options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "Error"],
          answer: 1,
          explanation: "b = a points to the same list! Appending to b also changes a!"
        },
        {
          id: "ch2-7",
          type: "mission",
          title: "Problem 18: Count Characters",
          task: "Fill in the 2 blanks to count character frequencies!",
          initialCode: `text = 'banana'
counter = {}

for ch in text:
    if ch in ___:
        counter[ch] += 1
    else:
        counter[ch] = ___

for ch, count in counter.items():
    print(f'{ch}: {count} times')`,
          expectedOutput: `b: 1 times\na: 3 times\nn: 2 times`,
          hint: "If it's in the dictionary, add 1. If not, start at 1!",
          hint2: "counter / 1"
        },
        {
          id: "ch2-8",
          type: "quiz",
          title: "Problem 19",
          content: "What is the output?\n\n```python\nnums = [10, 20, 30, 40, 50]\nprint(nums[1:4])\n```",
          options: ["[10, 20, 30]", "[20, 30, 40]", "[20, 30, 40, 50]", "[10, 20, 30, 40]"],
          answer: 1,
          explanation: "[1:4] means index 1, 2, 3! → [20, 30, 40]!"
        },
        {
          id: "ch2-9",
          type: "mission",
          title: "Problem 20: Merge Dictionaries",
          task: "Fill in the 2 blanks to merge two dictionaries!",
          initialCode: `scores1 = {'Tom': 85, 'Jane': 92}
scores2 = {'Mike': 78, 'Sara': 95}

all_scores = {}
for name, score in scores1.___():
    all_scores[name] = score
for name, score in scores2.items():
    all_scores[___] = score

print(all_scores)
print(f'Average: {sum(all_scores.values())/len(all_scores):.1f}')`,
          expectedOutput: `{'Tom': 85, 'Jane': 92, 'Mike': 78, 'Sara': 95}\nAverage: 87.5`,
          hint: "Iterate with .items() and add to the new dictionary!",
          hint2: "items / name"
        }
      ]
    },

    // ============================================
    // Chapter 3: Comprehensive Challenge (21~30)
    // ============================================
    {
      id: "ch3",
      title: "Comprehensive Challenge (21~30)",
      emoji: "⭐⭐⭐",
      steps: [
        {
          id: "ch3-0",
          type: "tryit",
          title: "Problem 21: Fibonacci Sequence",
          task: "Print the first 10 Fibonacci numbers!",
          initialCode: `fib = [0, 1]
for i in range(8):
    fib.append(fib[-1] + fib[-2])
print(f'Fibonacci: {fib}')
print(f'10th number: {fib[9]}')`,
          expectedOutput: `Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n10th number: 34`,
          hint: "Current = previous + the one before that!",
          hint2: "fib[-1] + fib[-2] gives the next number!"
        },
        {
          id: "ch3-1",
          type: "mission",
          title: "Problem 22: Find Primes",
          task: "Fill in the 2 blanks to find prime numbers between 2 and 30!",
          initialCode: `primes = []
for n in range(2, 31):
    is_prime = True
    for i in range(2, n):
        if n ___ i == 0:
            is_prime = False
            break
    if ___:
        primes.append(n)

print(f'Primes: {primes}')
print(f'Count: {len(primes)}')`,
          expectedOutput: `Primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]\nCount: 10`,
          hint: "If it's not divisible by any number, it's prime!",
          hint2: "% / is_prime"
        },
        {
          id: "ch3-2",
          type: "quiz",
          title: "Problem 23",
          content: "What is the output?\n\n```python\nresult = [x**2 for x in range(1, 6)]\nprint(result)\n```",
          options: ["[1, 2, 3, 4, 5]", "[1, 4, 9, 16, 25]", "[2, 4, 6, 8, 10]", "Error"],
          answer: 1,
          explanation: "List comprehension! 1², 2², 3², 4², 5² = [1, 4, 9, 16, 25]!"
        },
        {
          id: "ch3-3",
          type: "tryit",
          title: "Problem 24: Sort Students",
          task: "Sort students by their scores!",
          initialCode: `students = [
    ('Tom', 85), ('Jane', 92),
    ('Mike', 78), ('Sara', 95),
    ('Alex', 88)
]

# Sort by score (descending)
ranked = sorted(students, key=lambda x: x[1], reverse=True)

print('=== Score Rankings ===')
for i, (name, score) in enumerate(ranked, 1):
    print(f'#{i}: {name} ({score} pts)')`,
          expectedOutput: `=== Score Rankings ===\n#1: Sara (95 pts)\n#2: Jane (92 pts)\n#3: Alex (88 pts)\n#4: Tom (85 pts)\n#5: Mike (78 pts)`,
          hint: "The key parameter in sorted sets the sort criteria!",
          hint2: "lambda x: x[1] sorts by the second element (score) in the tuple!"
        },
        {
          id: "ch3-4",
          type: "mission",
          title: "Problem 25: Star Pyramid",
          task: "Fill in the 2 blanks to complete the star pyramid!",
          initialCode: `n = 5
for i in range(1, n+1):
    spaces = ' ' * (n - ___)
    stars = '*' * (2 * i ___ 1)
    print(spaces + stars)`,
          expectedOutput: `    *\n   ***\n  *****\n *******\n*********`,
          hint: "Spaces decrease while stars increase by odd numbers!",
          hint2: "i / -"
        },
        {
          id: "ch3-5",
          type: "tryit",
          title: "Problem 26: Matrix Addition",
          task: "Perform addition on two 2x3 matrices!",
          initialCode: `matrix1 = [[1, 2, 3], [4, 5, 6]]
matrix2 = [[7, 8, 9], [10, 11, 12]]
result = []

for i in range(len(matrix1)):
    row = []
    for j in range(len(matrix1[0])):
        row.append(matrix1[i][j] + matrix2[i][j])
    result.append(row)

print('Matrix1:', matrix1)
print('Matrix2:', matrix2)
print('Result:', result)`,
          expectedOutput: `Matrix1: [[1, 2, 3], [4, 5, 6]]\nMatrix2: [[7, 8, 9], [10, 11, 12]]\nResult: [[8, 10, 12], [14, 16, 18]]`,
          hint: "Add elements at the same position!",
          hint2: "matrix1[i][j] + matrix2[i][j]!"
        },
        {
          id: "ch3-6",
          type: "quiz",
          title: "Problem 27",
          content: "What is the output?\n\n```python\nwords = ['cat', 'apple', 'dog', 'banana']\nresult = sorted(words, key=len)\nprint(result[0])\n```",
          options: ["apple", "cat", "dog", "banana"],
          answer: 1,
          explanation: "key=len sorts by length! The shortest 'cat' is at [0]!"
        },
        {
          id: "ch3-7",
          type: "mission",
          title: "Problem 28: Find the Mode",
          task: "Fill in the 2 blanks to find the mode (most frequent value)!",
          initialCode: `data = [1, 3, 2, 3, 4, 3, 2, 1, 3, 2]
counter = {}

for n in data:
    if n in counter:
        counter[n] ___ 1
    else:
        counter[n] = 1

max_count = max(counter.___)
for num, count in counter.items():
    if count == max_count:
        print(f'Mode: {num} ({count} times)')`,
          expectedOutput: `Mode: 3 (4 times)`,
          hint: "Count with a dictionary, then find the max!",
          hint2: "+= / values()"
        },
        {
          id: "ch3-8",
          type: "quiz",
          title: "Problem 29",
          content: "What is the output?\n\n```python\na = {1, 2, 3}\nb = {2, 3, 4}\nprint(a & b)\nprint(a | b)\n```",
          options: [
            "{2, 3}\\n{1, 2, 3, 4}",
            "{1, 4}\\n{2, 3}",
            "{2, 3}\\n{1, 4}",
            "Error"
          ],
          answer: 0,
          explanation: "& is intersection {2,3}, | is union {1,2,3,4}!"
        },
        {
          id: "ch3-9",
          type: "tryit",
          title: "Problem 30: Final Mission!",
          task: "Run the comprehensive data processing code!",
          initialCode: `# Shopping data
purchases = [
    {'item': 'Apple', 'price': 1500, 'qty': 3},
    {'item': 'Banana', 'price': 2000, 'qty': 2},
    {'item': 'Apple', 'price': 1500, 'qty': 1},
    {'item': 'Cherry', 'price': 3000, 'qty': 1},
    {'item': 'Banana', 'price': 2000, 'qty': 3},
]

# Total amount per item
totals = {}
for p in purchases:
    item = p['item']
    amount = p['price'] * p['qty']
    if item in totals:
        totals[item] += amount
    else:
        totals[item] = amount

print('=== Total by Item ===')
for item, total in sorted(totals.items(), key=lambda x: x[1], reverse=True):
    print(f'  {item}: {total:,} won')

grand_total = sum(totals.values())
print(f'\\nGrand Total: {grand_total:,} won')`,
          expectedOutput: `=== Total by Item ===\n  Banana: 10,000 won\n  Apple: 6,000 won\n  Cherry: 3,000 won\n\nGrand Total: 19,000 won`,
          hint: "Accumulate totals per item using a dictionary!",
          hint2: "Calculate amount with price * qty, accumulate per item!"
        }
      ]
    }
  ]
}
