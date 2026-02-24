import { LessonData } from './types'

export const lesson48EnData: LessonData = {
  id: "48en",
  title: "Part 8 Quiz 20",
  emoji: "📝",
  description: "20 practice questions on modules and packages!",
  chapters: [
    {
      id: "ch1",
      title: "⭐ Easy (1~8)",
      emoji: "⭐",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "💭 How well do you remember modules and packages?",
          content: `💭 import, pip install, math, json, random, datetime... How well do you remember everything about **modules and packages** that we've learned?

\`\`\`python
# Goal: Get 16 or more out of 20 questions right!
# ⭐ Easy: 8 questions
# ⭐⭐ Medium: 6 questions
# ⭐⭐⭐ Challenge: 6 questions
\`\`\`

@Key point: Modules and packages review! Take on 20 questions and check your skills!`
        },
        {
          id: "ch1-1",
          type: "quiz",
          title: "Question 1",
          content: "What is the keyword for importing a module?",
          options: ["include", "require", "import", "using"],
          answer: 2,
          explanation: "In Python, modules are imported using the import keyword!"
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "Question 2",
          content: "After `from math import sqrt`, how do you use it?",
          options: ["math.sqrt(16)", "sqrt(16)", "math(sqrt(16))", "import.sqrt(16)"],
          answer: 1,
          explanation: "When imported with from...import, you can use it directly without the module name!"
        },
        {
          id: "ch1-3",
          type: "quiz",
          title: "Question 3",
          content: "What is the result of `math.ceil(3.1)`?",
          options: ["3", "4", "3.1", "Error"],
          answer: 1,
          explanation: "ceil = round up! Rounding up 3.1 gives 4!"
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "Question 4",
          content: "What is the result of `math.floor(7.9)`?",
          options: ["7", "8", "7.9", "Error"],
          answer: 0,
          explanation: "floor = round down! Rounding down 7.9 gives 7!"
        },
        {
          id: "ch1-4b",
          type: "tryit",
          title: "💻 Question 4.5: Try math hands-on!",
          task: "Run the math module functions yourself!",
          initialCode: `import math

# Ceil / Floor / Round
numbers = [3.2, 5.7, 8.5, 1.1]

for n in numbers:
    print(f'{n} -> Ceil:{math.ceil(n)} Floor:{math.floor(n)} Round:{round(n)}')

# Absolute value and square root
print(f'\\nabs(-15) = {abs(-15)}')
print(f'sqrt(144) = {math.sqrt(144)}')
print(f'pi = {math.pi:.4f}')`,
          expectedOutput: `3.2 -> Ceil:4 Floor:3 Round:3\n5.7 -> Ceil:6 Floor:5 Round:6\n8.5 -> Ceil:9 Floor:8 Round:8\n1.1 -> Ceil:2 Floor:1 Round:1\n\nabs(-15) = 15\nsqrt(144) = 12.0\npi = 3.1416`,
          hint: "ceil=round up, floor=round down, round=round off!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch1-5",
          type: "quiz",
          title: "Question 5",
          content: "What is the command to install a package?",
          options: ["python install", "pip install", "import install", "module install"],
          answer: 1,
          explanation: "Use pip install package_name to install packages!"
        },
        {
          id: "ch1-6",
          type: "quiz",
          title: "Question 6",
          content: "What is the relationship between modules and packages?",
          options: [
            "They are the same thing",
            "Module = multiple packages",
            "Package = multiple modules",
            "They are unrelated"
          ],
          answer: 2,
          explanation: "A package is a folder that bundles multiple modules together!"
        },
        {
          id: "ch1-7",
          type: "quiz",
          title: "Question 7",
          content: "After `import math as m`, how do you use pi?",
          options: ["math.pi", "m.pi", "pi", "as.pi"],
          answer: 1,
          explanation: "Since we gave it the alias m with 'as m', we use m.pi!"
        },
        {
          id: "ch1-7b",
          type: "mission",
          title: "🎯 Question 7.5: import Mission!",
          task: "Fill in 3 blanks to complete the module usage!",
          initialCode: `# 1. Import specific functions only
___ math import sqrt, pi

# 2. Give an alias
import json ___ j

# 3. Use them
radius = 5
area = pi * radius ** 2
print(f'Area of circle with radius {radius}: {area:.2f}')
print(f'Square root: {___(area):.2f}')

# Use json with alias
data = j.dumps({'area': round(area, 2)})
print(f'JSON: {data}')`,
          expectedOutput: `Area of circle with radius 5: 78.54\nSquare root: 8.86\nJSON: {"area": 78.54}`,
          hint: "from to get functions, as for alias, sqrt for square root!",
          hint2: "from / as / sqrt"
        },
        {
          id: "ch1-8",
          type: "quiz",
          title: "Question 8",
          content: "What does `json.dumps()` do?",
          options: [
            "Delete a JSON file",
            "Dictionary -> JSON string",
            "JSON string -> Dictionary",
            "Open a JSON file"
          ],
          answer: 1,
          explanation: "dumps = dump string! Converts a dictionary to a string!"
        }
      ]
    },
    {
      id: "ch2",
      title: "⭐⭐ Medium (9~14)",
      emoji: "⭐",
      steps: [
        {
          id: "ch2-0",
          type: "tryit",
          title: "Question 9: Using math",
          task: "Run calculations using the math module!",
          initialCode: `import math

numbers = [3.2, 7.8, 4.5, 9.1, 2.7]

print('=== Ceil/Floor ===')
for n in numbers:
    print(f'{n} -> Ceil: {math.ceil(n)}, Floor: {math.floor(n)}')

print(f'\\nTotal: {sum(numbers)}')
print(f'Average: {sum(numbers)/len(numbers):.1f}')`,
          expectedOutput: `=== Ceil/Floor ===\n3.2 -> Ceil: 4, Floor: 3\n7.8 -> Ceil: 8, Floor: 7\n4.5 -> Ceil: 5, Floor: 4\n9.1 -> Ceil: 10, Floor: 9\n2.7 -> Ceil: 3, Floor: 2\n\nTotal: 27.3\nAverage: 5.5`,
          hint: "ceil rounds up, floor rounds down!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch2-1",
          type: "mission",
          title: "Question 10: JSON conversion",
          task: "Fill in 2 blanks to complete the JSON conversion!",
          initialCode: `import json

student = {'name': 'Alice', 'age': 15, 'scores': [90, 85, 92]}

# Dictionary -> JSON string
json_str = json.___(student)
print(f'JSON: {json_str}')

# JSON string -> Dictionary
parsed = json.___(json_str)
print(f'Name: {parsed["name"]}')
print(f'Average: {sum(parsed["scores"])/len(parsed["scores"]):.1f}')`,
          expectedOutput: `JSON: {"name": "Alice", "age": 15, "scores": [90, 85, 92]}\nName: Alice\nAverage: 89.0`,
          hint: "dumps converts, loads restores!",
          hint2: "dumps / loads"
        },
        {
          id: "ch2-2",
          type: "quiz",
          title: "Question 11",
          content: "Which value **cannot** be a result of `random.randint(1, 6)`?",
          options: ["1", "3", "6", "7"],
          answer: 3,
          explanation: "randint(1, 6) returns values from 1 to 6! 7 is not possible!"
        },
        {
          id: "ch2-3",
          type: "quiz",
          title: "Question 12",
          content: "Which of the following is NOT a built-in module?",
          options: ["math", "json", "requests", "string"],
          answer: 2,
          explanation: "requests is an external package! You need to install it with pip install requests!"
        },
        {
          id: "ch2-4",
          type: "mission",
          title: "Question 13: Circle area",
          task: "Fill in 2 blanks to calculate the area of circles!",
          initialCode: `import ___

radii = [3, 5, 7, 10]

for r in radii:
    area = math.___ * r ** 2
    print(f'Radius {r}: Area = {area:.2f}')`,
          expectedOutput: `Radius 3: Area = 28.27\nRadius 5: Area = 78.54\nRadius 7: Area = 153.94\nRadius 10: Area = 314.16`,
          hint: "Use the pi constant from the math module!",
          hint2: "math / pi"
        },
        {
          id: "ch2-5",
          type: "quiz",
          title: "Question 14",
          content: "What does `pip list` show?",
          options: [
            "Python syntax list",
            "List of installed packages",
            "List of available functions",
            "List of imported modules"
          ],
          answer: 1,
          explanation: "pip list shows all currently installed packages!"
        }
      ]
    },
    {
      id: "ch3",
      title: "⭐⭐⭐ Challenge (15~20)",
      emoji: "⭐",
      steps: [
        {
          id: "ch3-0",
          type: "tryit",
          title: "Question 15: string module",
          task: "Build a password validator using the string module!",
          initialCode: `import string

def check_password(pw):
    has_lower = False
    has_upper = False
    has_digit = False

    for ch in pw:
        if ch in string.ascii_lowercase:
            has_lower = True
        if ch in string.ascii_uppercase:
            has_upper = True
        if ch in string.digits:
            has_digit = True

    results = []
    if len(pw) >= 8:
        results.append('O Length 8 or more')
    else:
        results.append('X Length under 8')

    results.append(f'{"O" if has_lower else "X"} Lowercase')
    results.append(f'{"O" if has_upper else "X"} Uppercase')
    results.append(f'{"O" if has_digit else "X"} Digit')

    return results

passwords = ['abc', 'Hello123!', 'PASSWORD']
for pw in passwords:
    print(f'--- {pw} ---')
    for r in check_password(pw):
        print(f'  {r}')`,
          expectedOutput: `--- abc ---\n  X Length under 8\n  O Lowercase\n  X Uppercase\n  X Digit\n--- Hello123! ---\n  O Length 8 or more\n  O Lowercase\n  O Uppercase\n  O Digit\n--- PASSWORD ---\n  O Length 8 or more\n  X Lowercase\n  O Uppercase\n  X Digit`,
          hint: "Check with string.ascii_lowercase, ascii_uppercase, digits!",
          hint2: "Use the 'in' operator to check which category each character belongs to!"
        },
        {
          id: "ch3-1",
          type: "quiz",
          title: "Question 16",
          content: "What is the `.days` of `datetime.date(2024, 12, 25) - datetime.date(2024, 1, 1)`?",
          options: ["359", "365", "360", "Error"],
          answer: 0,
          explanation: "From January 1 to December 25 is 359 days!"
        },
        {
          id: "ch3-2",
          type: "mission",
          title: "Question 17: math + json combined",
          task: "Fill in 3 blanks to complete the grade statistics system!",
          initialCode: `import math
import json

students = [
    {'name': 'Alice', 'score': 85},
    {'name': 'Bob', 'score': 92},
    {'name': 'Charlie', 'score': 78},
    {'name': 'Diana', 'score': 95},
]

scores = [s['score'] for s in students]
avg = sum(scores) / ___(scores)

print(f'Average: {avg:.1f}')
print(f'Rounded up: {math.ceil(___)}')

# Save as JSON
save = json.___(students)
print(f'Saved: {save}')`,
          expectedOutput: `Average: 87.5\nRounded up: 88\nSaved: [{"name": "Alice", "score": 85}, {"name": "Bob", "score": 92}, {"name": "Charlie", "score": 78}, {"name": "Diana", "score": 95}]`,
          hint: "len for count, ceil the avg, dumps to convert to JSON!",
          hint2: "len / avg / dumps"
        },
        {
          id: "ch3-3",
          type: "quiz",
          title: "Question 18",
          content: "What does `random.choice(['apple', 'banana', 'grape'])` do?",
          options: [
            "Always returns 'apple'",
            "Randomly picks one from the list",
            "Returns the entire list",
            "Sorts the list"
          ],
          answer: 1,
          explanation: "choice randomly picks one item from the list!"
        },
        {
          id: "ch3-4",
          type: "quiz",
          title: "Question 19",
          content: "What is the correct order for using an external package?",
          options: [
            "import -> pip install -> use",
            "use -> pip install -> import",
            "pip install -> import -> use",
            "Just pip install is enough"
          ],
          answer: 2,
          explanation: "pip install (install) -> import (load) -> use! The order matters!"
        },
        {
          id: "ch3-5",
          type: "mission",
          title: "Question 20: Comprehensive module mission!",
          task: "Fill in 3 blanks to complete the game item shop!",
          initialCode: `import math
import ___

shop_items = {
    'Sword': {'price': 1500, 'atk': 20},
    'Shield': {'price': 1200, 'atk': 0},
    'Staff': {'price': 2000, 'atk': 35},
}

# Price statistics
prices = [item['price'] for item in shop_items.___()]
avg_price = sum(prices) / len(prices)

print('=== Item Shop ===')
for name, info in shop_items.items():
    print(f'  {name}: {info["price"]}G (ATK +{info["atk"]})')

print(f'\\nAverage price: {math.___(avg_price)}G (rounded up)')

# Save as JSON
save = json.dumps(shop_items)
print(f'Save data size: {len(save)} chars')`,
          expectedOutput: `=== Item Shop ===\n  Sword: 1500G (ATK +20)\n  Shield: 1200G (ATK +0)\n  Staff: 2000G (ATK +35)\n\nAverage price: 1567G (rounded up)\nSave data size: 111 chars`,
          hint: "json module, values() to get values, ceil to round up!",
          hint2: "json / values / ceil"
        }
      ]
    }
  ]
}
