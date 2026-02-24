import { LessonData } from './types'

export const lesson45EnData: LessonData = {
  id: "45en",
  title: "Module Basics",
  emoji: "📦",
  description: "Learn useful modules like math, json, and more!",
  chapters: [
    {
      id: "ch1",
      title: "What Are Modules? import Basics",
      emoji: "📦",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "💭 Square roots... do I have to code it myself?",
          content: `💭 Square roots, ceiling, floor... do you have to **code these complex calculations** from scratch every time? What if there was a pre-built **toolbox**?

\`\`\`python
# Calculate square roots yourself? Too hard!
# → With the math module, it's just one line!
import math
print(math.sqrt(16))  # 4.0
\`\`\`

@Key point: A **module** = a .py file containing functions and variables! Use import to bring them in!

| Module | Description | Key Features |
|--------|-------------|--------------|
| math | Math calculations | sqrt, ceil, floor, pi |
| json | JSON processing | dumps, loads |
| string | String constants | ascii_lowercase |
| random | Random values | randint, choice |
| datetime | Date/time | now, date |

> Python has over 200 built-in modules!`
        },
        {
          id: "ch1-1",
          type: "explain",
          title: "💭 Is there only one way to import?",
          content: `💭 When importing a module, do you always have to write **module.function()** every time? Isn't there a **shorter, more convenient** way?

\`\`\`python
# 1. Full import
import math
print(math.sqrt(16))  # module.function()

# 2. Import specific features only
from math import sqrt
print(sqrt(16))  # directly function()

# 3. Import multiple
from math import sqrt, ceil, floor

# 4. Give an alias
import math as m
print(m.sqrt(16))  # alias.function()
\`\`\`

@Key point: **import** has 4 methods = full, from...import, multiple, as alias! Pick the right one for the situation!`
        },
        {
          id: "ch1-2",
          type: "tryit",
          title: "💻 Try different import methods!",
          task: "Run different import methods to see how they work!",
          initialCode: `# Method 1: Full import
import math
print(f'sqrt(25) = {math.sqrt(25)}')

# Method 2: Specific features only
from math import pi, ceil
print(f'pi = {pi:.4f}')
print(f'ceil(3.2) = {ceil(3.2)}')

# Method 3: Alias
import math as m
print(f'floor(3.9) = {m.floor(3.9)}')`,
          expectedOutput: `sqrt(25) = 5.0\npi = 3.1416\nceil(3.2) = 4\nfloor(3.9) = 3`,
          hint: "import math uses math.function(), from math import uses function() directly!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch1-3",
          type: "tryit",
          title: "💻 Clean code with from import!",
          task: "Use from import to bring in only the functions you need!",
          initialCode: `# Import only what you need!
from math import sqrt, pi, ceil, floor

# Use directly without module name!
print(f'sqrt(64) = {sqrt(64)}')
print(f'pi = {pi:.4f}')
print(f'ceil(7.3) = {ceil(7.3)}')
print(f'floor(7.9) = {floor(7.9)}')

# Give an alias
import math as m
print(f'\\nm.pow(3, 4) = {m.pow(3, 4)}')
print(f'm.factorial(6) = {m.factorial(6)}')`,
          expectedOutput: `sqrt(64) = 8.0\npi = 3.1416\nceil(7.3) = 8\nfloor(7.9) = 7\n\nm.pow(3, 4) = 81.0\nm.factorial(6) = 720`,
          hint: "With from import, you can use just the function name without the module name!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch1-4",
          type: "mission",
          title: "🎯 Mission: Choose the right import method!",
          task: "Fill in 3 blanks to complete different import methods!",
          initialCode: `# Method 1: Full import
import math
print(f'sqrt(100) = {math.sqrt(100)}')

# Method 2: Import specific functions
___ math import ceil, floor
print(f'ceil(2.1) = {ceil(2.1)}')
print(f'floor(2.9) = {floor(2.9)}')

# Method 3: Alias
import math ___ m
print(f'pi = {m.___:.2f}')`,
          expectedOutput: `sqrt(100) = 10.0\nceil(2.1) = 3\nfloor(2.9) = 2\npi = 3.14`,
          hint: "from to get functions, as for alias, pi is a math constant!",
          hint2: "from / as / pi"
        },
        {
          id: "ch1-5",
          type: "quiz",
          title: "Quiz!",
          content: "After importing with `from math import sqrt`, how do you use it?",
          options: [
            "math.sqrt(16)",
            "sqrt(16)",
            "import.sqrt(16)",
            "math(sqrt(16))"
          ],
          answer: 1,
          explanation: "When you import with from...import, you can use sqrt(16) directly without the module name!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Mastering the math Module",
      emoji: "🔢",
      steps: [
        {
          id: "ch2-0",
          type: "tryit",
          title: "🔢 Key math module features!",
          task: "Run various math module functions!",
          initialCode: `import math

# Rounding up / down
print('=== Rounding ===')
print(f'ceil(3.2) = {math.ceil(3.2)}')
print(f'floor(3.9) = {math.floor(3.9)}')

# Square root, power
print('\\n=== Powers ===')
print(f'sqrt(144) = {math.sqrt(144)}')
print(f'pow(2, 10) = {math.pow(2, 10)}')

# Constants
print('\\n=== Constants ===')
print(f'pi = {math.pi:.6f}')
print(f'e = {math.e:.6f}')

# Absolute value, factorial
print('\\n=== Others ===')
print(f'fabs(-7.5) = {math.fabs(-7.5)}')
print(f'factorial(5) = {math.factorial(5)}')`,
          expectedOutput: `=== Rounding ===\nceil(3.2) = 4\nfloor(3.9) = 3\n\n=== Powers ===\nsqrt(144) = 12.0\npow(2, 10) = 1024.0\n\n=== Constants ===\npi = 3.141593\ne = 2.718282\n\n=== Others ===\nfabs(-7.5) = 7.5\nfactorial(5) = 120`,
          hint: "ceil = round up, floor = round down, sqrt = square root!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch2-1",
          type: "tryit",
          title: "🔵 Circle area calculator!",
          task: "Use math.pi to calculate the area of circles!",
          initialCode: `import math

radii = [1, 3, 5, 10]

print('=== Circle Area ===')
for r in radii:
    area = math.pi * r ** 2
    print(f'Radius {r}: Area = {area:.2f}')

print(f'\\n=== Sphere Volume ===')
r = 5
volume = (4/3) * math.pi * r ** 3
print(f'Radius {r}: Volume = {volume:.2f}')`,
          expectedOutput: `=== Circle Area ===\nRadius 1: Area = 3.14\nRadius 3: Area = 28.27\nRadius 5: Area = 78.54\nRadius 10: Area = 314.16\n\n=== Sphere Volume ===\nRadius 5: Volume = 523.60`,
          hint: "Circle area = pi * r^2, Sphere volume = (4/3) * pi * r^3",
          hint2: "math.pi * r ** 2 calculates the circle area!"
        },
        {
          id: "ch2-2",
          type: "mission",
          title: "🎯 Mission: Grade statistics with math!",
          task: "Fill in 3 blanks to complete grade statistics using the math module!",
          initialCode: `import ___

scores = [78, 92, 85, 67, 94, 88, 73, 91]

total = sum(scores)
avg = total / len(scores)

print(f'Total: {total}')
print(f'Average: {avg:.1f}')
print(f'Rounded up: {math.___(avg)}')
print(f'Rounded down: {math.___(avg)}')`,
          expectedOutput: `Total: 668\nAverage: 83.5\nRounded up: 84\nRounded down: 83`,
          hint: "Round up is ceil, round down is floor!",
          hint2: "math / ceil / floor"
        },
        {
          id: "ch2-3",
          type: "quiz",
          title: "Quiz!",
          content: "What are the results of `math.ceil(4.1)` and `math.floor(4.9)`?",
          options: [
            "4, 4",
            "5, 5",
            "5, 4",
            "4, 5"
          ],
          answer: 2,
          explanation: "ceil(4.1) = 5 (round up), floor(4.9) = 4 (round down)!"
        }
      ]
    },
    {
      id: "ch3",
      title: "random & datetime Concepts",
      emoji: "🎲",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "💭 How do you make dice rolling in code?",
          content: `💭 **Rolling dice** in a game, **random rock-paper-scissors**... how do you code these? How do you get a different value each time?

\`\`\`python
import random

# Random integer
random.randint(1, 6)    # Dice: one of 1~6

# Pick from a list
random.choice(['rock', 'paper', 'scissors'])

# Shuffle a list
cards = [1, 2, 3, 4, 5]
random.shuffle(cards)

# Float between 0 and 1
random.random()  # 0.7432... etc
\`\`\`

@Key point: **random** module = randint(integer range), choice(pick from list), shuffle(mix up)!

⚠️ random gives different results every time you run it!
💡 **seed** lets you get the same results:
\`\`\`python
random.seed(42)  # Fix the seed
random.randint(1, 10)  # Always the same value!
\`\`\``
        },
        {
          id: "ch3-1",
          type: "quiz",
          title: "Quiz: random!",
          content: "Which value **cannot** be a result of `random.randint(1, 10)`?",
          options: ["1", "5", "10", "11"],
          answer: 3,
          explanation: "randint(1, 10) returns values from 1 to 10! 11 is not possible!"
        },
        {
          id: "ch3-2",
          type: "quiz",
          title: "Quiz: random.choice!",
          content: "What does `random.choice(['a', 'b', 'c'])` do?",
          options: [
            "Always returns 'a'",
            "Randomly picks one from the list",
            "Sorts the list",
            "Shuffles the list"
          ],
          answer: 1,
          explanation: "choice randomly picks one item from the list!"
        },
        {
          id: "ch3-3",
          type: "explain",
          title: "💭 How do you calculate days until your birthday?",
          content: `💭 Want to know **today's date**, or calculate the **number of days** between two dates... doing the subtraction yourself is complicated!

\`\`\`python
import datetime

# Current date/time
now = datetime.datetime.now()
print(now)  # 2024-03-15 14:30:00.123456

# Create a specific date
birthday = datetime.date(2010, 5, 20)
print(birthday)  # 2010-05-20

# Calculate date difference
d1 = datetime.date(2024, 1, 1)
d2 = datetime.date(2024, 12, 31)
diff = d2 - d1
print(diff.days)  # 365
\`\`\`

@Key point: **datetime** module = create dates (date), current time (now), subtract dates (-) to calculate difference!`
        },
        {
          id: "ch3-4",
          type: "tryit",
          title: "💻 datetime practice with fixed dates!",
          task: "Run date calculations with fixed dates!",
          initialCode: `import datetime

# Practice with fixed dates
birthday = datetime.date(2010, 5, 20)
school_start = datetime.date(2024, 3, 4)
today = datetime.date(2024, 6, 15)

# Extract date info
print(f'Birthday: {birthday.year}/{birthday.month}/{birthday.day}')

# Calculate date differences
age_days = today - birthday
school_days = today - school_start

print(f'Days since birth: {age_days.days}')
print(f'Days since school started: {school_days.days}')

# Comparison
if today > birthday:
    print('Birthday has passed!')`,
          expectedOutput: `Birthday: 2010/5/20\nDays since birth: 5139\nDays since school started: 103\nBirthday has passed!`,
          hint: "Subtracting dates gives you the difference in days!",
          hint2: "Use .days to get the number of days!"
        },
        {
          id: "ch3-5",
          type: "quiz",
          title: "Quiz!",
          content: "How do you find the difference between two dates?",
          options: [
            "date.diff(d1, d2)",
            "d2 - d1",
            "datetime.between(d1, d2)",
            "d1.diff(d2)"
          ],
          answer: 1,
          explanation: "In Python, you can subtract dates with (-)! Use .days on the result to get the number of days!"
        },
        {
          id: "ch3-6",
          type: "tryit",
          title: "🎲 Fix random results with seed!",
          task: "Use random.seed() to fix random results and run!",
          initialCode: `import random

# With seed fixed, same results every time!
random.seed(42)
print('=== 5 Dice Rolls ===')
for i in range(5):
    roll = random.randint(1, 6)
    print(f'Roll {i+1}: {roll}')

# Random pick from list
random.seed(42)
foods = ['chicken', 'pizza', 'burger', 'tacos', 'sushi']
for i in range(3):
    pick = random.choice(foods)
    print(f'\\nToday\\'s menu {i+1}: {pick}')`,
          expectedOutput: `=== 5 Dice Rolls ===\nRoll 1: 1\nRoll 2: 1\nRoll 3: 6\nRoll 4: 6\nRoll 5: 6\n\nToday's menu 1: chicken\nToday's menu 2: chicken\nToday's menu 3: sushi`,
          hint: "Setting seed(42) always gives the same sequence of random values!",
          hint2: "Just run the code as is!"
        },
        {
          id: "ch3-7",
          type: "mission",
          title: "🎯 Mission: Combined module challenge!",
          task: "Fill in 3 blanks to complete a program using three modules!",
          initialCode: `import math
import random
import datetime

# 1. Calculate with math
scores = [85, 92, 78, 96, 88]
avg = sum(scores) / len(scores)
print(f'Average: {avg}')
print(f'Rounded up: {math.___(avg)}')

# 2. Random with seed
random.seed(100)
items = ['sword', 'shield', 'potion', 'spellbook']
prize = random.___(items)
print(f'\\nToday\\'s reward: {prize}')

# 3. Date with datetime
start = datetime.date(2024, 3, 1)
end = datetime.date(2024, 12, 31)
diff = end - start
print(f'\\nDays remaining: {diff.___}')`,
          expectedOutput: `Average: 87.8\nRounded up: 88\n\nToday's reward: shield\n\nDays remaining: 305`,
          hint: "Rounding up function, random pick function, date difference property!",
          hint2: "ceil / choice / days"
        }
      ]
    }
  ]
}
