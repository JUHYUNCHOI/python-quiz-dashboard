// ============================================
// Lesson 9: Type Conversion
// ============================================
import { LessonData } from './types'

export const lesson9EnData: LessonData = {
  id: "9",
  title: "Type Conversion",
  emoji: "🔄",
  description: "Convert data types with ease!",
  chapters: [
    {
      id: "ch1",
      title: "int() - Convert to Integer",
      emoji: "🔢",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔄 Why Do We Need Type Conversion?",
          content: `In the next lesson, we'll learn about \`input()\`, a function that receives user input.
But the value you get from input is always a **string**!

\`\`\`python
age = input("Age: ")  # "15" (a string!)
print(age + 1)        # ❌ Error!
\`\`\`

To do calculations, you need to **convert it to a number**!

\`\`\`python
age = int(input("Age: "))  # 15 (an integer!)
print(age + 1)              # ✅ 16
\`\`\`

💡 We'll learn about \`input()\` in detail next lesson! For now, just understand **why type conversion is needed**!`
        },
        {
          id: "int-explain",
          type: "explain",
          title: "🔢 int() - Convert to Integer",
          content: `**int()** = convert to integer

\`\`\`python
# String → Integer
num = int("123")
print(num + 1)  # 124

# Float → Integer (decimals are truncated!)
num = int(3.7)
print(num)  # 3

# With input
age = int(input("Age: "))
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Convert a string to an integer!",
          initialCode: "text = \"100\"\n# Convert the string to an integer\nnum = ___(text)\nprint(num + 50)",
          expectedOutput: "150",
          hint: "Use int(text) to convert!",
          hint2: "int(\"100\")"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Float to Integer!",
          task: "Convert a float to an integer!",
          initialCode: "pi = 3.14159\nprint(___(pi))",
          expectedOutput: "3",
          hint: "int() truncates the decimal part!",
          hint2: "int(3.14159) = 3"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of `int(\"3.14\")`?",
          options: ["3", "3.14", "Error", "\"3\""],
          answer: 2,
          explanation: "The string \"3.14\" can't be directly converted to int! You need to convert it to float first."
        }
      ]
    },
    {
      id: "ch2",
      title: "float() and str()",
      emoji: "🔄",
      steps: [
        {
          id: "float-explain",
          type: "explain",
          title: "🔢 float() - Convert to Float",
          content: `**float()** = convert to floating point number

\`\`\`python
# String → Float
num = float("3.14")
print(num)  # 3.14

# Integer → Float
num = float(10)
print(num)  # 10.0

# With input
height = float(input("Height(cm): "))
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Convert a string to a float!",
          initialCode: "text = \"3.14\"\nnum = ___(text)\nprint(num * 2)",
          expectedOutput: "6.28",
          hint: "Use float(text) to convert!",
          hint2: "float(\"3.14\")"
        },
        {
          id: "str-explain",
          type: "explain",
          title: "📝 str() - Convert to String",
          content: `**str()** = convert to string

\`\`\`python
# Number → String
text = str(123)
print("Score: " + text)  # Score: 123

# Float → String
text = str(3.14)
print("Pi: " + text)  # Pi: 3.14
\`\`\`

⚠️ If you use f-strings, you don't need str()!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Convert a number to a string!",
          initialCode: "score = 95\ntext = ___(score)\nprint(\"Score: \" + text + \" points\")",
          expectedOutput: "Score: 95 points",
          hint: "Use str(score) to convert!",
          hint2: "str(95)"
        }
      ]
    },
    {
      id: "ch3",
      title: "bool() and Error Handling",
      emoji: "✅",
      steps: [
        {
          id: "bool-explain",
          type: "explain",
          title: "✅ bool() - Convert to Boolean",
          content: `**bool()** = convert to True/False

**Values that become False:**
\`\`\`python
bool(0)       # False
bool(0.0)     # False
bool("")      # False (empty string)
bool(None)    # False
\`\`\`

**Everything else is True!**
\`\`\`python
bool(1)       # True
bool(-1)      # True
bool("hello") # True
\`\`\`

💡 An empty list \`[]\` is also False! We'll learn about lists later.`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Check the bool values of 0 and an empty string!",
          initialCode: "# Predict the bool result of each value\nprint(bool(___))\nprint(bool(___))\nprint(bool(___))\nprint(bool(___))",
          expectedOutput: "False\nTrue\nFalse\nTrue",
          hint: "0 and empty string are False!",
          hint2: "bool(0) = False"
        },
        {
          id: "error-explain",
          type: "explain",
          title: "⚠️ Watch Out for Conversion Errors!",
          content: `Invalid conversions cause errors:

\`\`\`python
int("abc")      # ❌ Error! Not a number
int("3.14")     # ❌ Error! Has a decimal point
float("hello")  # ❌ Error! Not a number
\`\`\`

**Safe conversion:**
\`\`\`python
# String with decimal → Integer
text = "3.14"
num = int(float(text))  # Convert to float first!
print(num)  # 3
\`\`\``
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of bool(\"\")?",
          options: ["True", "False", "\"\"", "Error"],
          answer: 1,
          explanation: "An empty string \"\" is False! If it's empty, it's falsy."
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
          content: `## Type Conversion Functions

| Function | Description | Example |
|----------|-------------|---------|
| **int()** | To integer | int("123") → 123 |
| **float()** | To float | float("3.14") → 3.14 |
| **str()** | To string | str(123) → "123" |
| **bool()** | To boolean | bool(1) → True |

**Remember!**
- input() always returns a string!
- Use int() or float() for calculations!
- 0, "", [] etc. are False!`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Build a simple calculator!",
          initialCode: "a = '25'\nb = '17'\n\n# Convert strings to numbers\nnum_a = ___(a)\nnum_b = ___(b)\n\nprint(f'{num_a} + {num_b} = {num_a + num_b}')\nprint(f'{num_a} × {num_b} = {num_a * num_b}')\nprint(f'Type of sum: {type(num_a + num_b)}')",
          expectedOutput: "25 + 17 = 42\n25 × 17 = 425\nType of sum: <class 'int'>",
          hint: "Use int() to convert strings to integers!",
          hint2: "int(a)"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **int()** - Convert to integer
✅ **float()** - Convert to float
✅ **str()** - Convert to string
✅ **bool()** - Convert to boolean

Next lesson, we'll learn about **input()** for user input! 🚀`
        }
      ]
    }
  ]
}
