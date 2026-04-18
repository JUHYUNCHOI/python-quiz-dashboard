// ============================================
// Lesson 2: Data Types (English)
// ============================================
import { LessonData } from './types'

export const lesson2EnData: LessonData = {
  id: "2",
  title: "Data Types",
  emoji: "📊",
  description: "Learn the differences between numbers, strings, and booleans!",
  chapters: [
    {
      id: "ch1",
      title: "What are Data Types?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📊 Data comes in different types!",
          content: `In real life, data comes in different forms, right?

- **Numbers**: 100, 3.14, -5
- **Text**: "hello", "python"
- **Yes/No**: True, False

Python also distinguishes between these **data types**!`
        },
        {
          id: "types-explain",
          type: "explain",
          title: "📋 4 Basic Types",
          content: `**1. Integer (int)** - Whole numbers, no decimal point
\`\`\`python
10, -5, 0, 1000
\`\`\`
Use this for counting things: age, score, number of items.

---

**2. Float (float)** - Numbers with a decimal point
\`\`\`python
3.14, -0.5, 2.0
\`\`\`
Even \`2.0\` is a float — the \`.0\` makes it one!

---

**3. String (str)** - Text wrapped in quotes
\`\`\`python
"hello"    # double quotes ✅
'python'   # single quotes ✅
"123"      # looks like a number, but it's text! ✅
\`\`\`
⚠️ **Quotes make it a string!** \`123\` is a number, but \`"123"\` is text.
Both \`"double"\` and \`'single'\` quotes work — just be consistent!

---

**4. Boolean (bool)** - Only two possible values
\`\`\`python
True, False
\`\`\`
⚠️ Must start with a **capital letter**: \`True\` ✅, \`true\` ❌`
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What type is 3.14?",
          options: ["int (integer)", "float (floating-point)", "str (string)", "bool (boolean)"],
          answer: 1,
          explanation: "It has a decimal point, so it's a float!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Checking Types",
      emoji: "🔍",
      steps: [
        {
          id: "type-explain",
          type: "explain",
          title: "🔍 The type() Function",
          content: `Want to know what type a value is? Use **type()**!

\`\`\`python
print(type(10))       # <class 'int'>
print(type(3.14))     # <class 'float'>
print(type('hello'))  # <class 'str'>
print(type(True))     # <class 'bool'>
\`\`\`

How to read the output:
- \`<class 'int'>\` → it's an integer
- \`<class 'str'>\` → it's a string
- \`<class 'float'>\` → it's a decimal number
- \`<class 'bool'>\` → it's True or False

Just wrap any value with \`type()\` and Python tells you exactly what type it is!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try it yourself!",
          task: "Check the type of 100!",
          initialCode: "print(type(___))",
          expectedOutput: "<class 'int'>",
          hint: "Put a value inside type()",
          hint2: "100",
          choices: ["100", "3.14", "'Python'", "True"]
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Check a string type!",
          task: "Check the type of 'Python'!",
          initialCode: "print(type(___))",
          expectedOutput: "<class 'str'>",
          hint: "Strings are str!",
          hint2: "'Python'",
          choices: ["100", "3.14", "'Python'", "True"]
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of type('123')?",
          options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "123"],
          answer: 2,
          explanation: "If it's inside quotes, it's a string (str)!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Boolean Type",
      emoji: "✅",
      steps: [
        {
          id: "bool-explain",
          type: "explain",
          title: "✅ True and False",
          content: `**Boolean (bool)** has only two values: True and False!

\`\`\`python
print(True)   # True
print(False)  # False
\`\`\`

⚠️ They must **start with a capital letter**!
- ✅ True, False
- ❌ true, false

**Comparisons return booleans:**
\`\`\`python
print(10 > 5)   # True
print(10 < 5)   # False
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try it yourself!",
          task: "10 > 5 → 10 is greater than 5, so the result is True!\nFill in the blank with 5.",
          initialCode: "print(10 > ___)",
          expectedOutput: "True",
          hint: "The result of a comparison is True or False!",
          hint2: "5",
          choices: ["5", "10", "15", "0"]
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try False too!",
          task: "3 > 7 → 3 is less than 7, so the result is False!\nFill in the blank with 7.",
          initialCode: "print(3 > ___)",
          expectedOutput: "False",
          hint: "3 is less than 7, right?",
          hint2: "7",
          choices: ["7", "3", "1", "10"]
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
          content: `## Data Types Summary

| Type | Example | Description |
|------|---------|-------------|
| int | 10, -5 | Integer |
| float | 3.14, 2.0 | Floating-point |
| str | "hello", '123' | String |
| bool | True, False | Boolean |

**Remember!**
- Strings **require quotes**
- Booleans **start with a capital letter**`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Each line: put the value on the left inside type() too!\nEx) print(42, type( 42 )) → 42 <class 'int'>",
          initialCode: "print(42, type(___))\nprint(3.14, type(___))\nprint('Hello', type(___))\nprint(True, type(___))",
          expectedOutput: "42 <class 'int'>\n3.14 <class 'float'>\nHello <class 'str'>\nTrue <class 'bool'>",
          hint: "Blank 1 → 42, Blank 2 → 3.14, Blank 3 → 'Hello', Blank 4 → True",
          hint2: "42",
          choices: ["42", "3.14", "'Hello'", "True"]
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **int** - Integer (10, -5)
✅ **float** - Float (3.14)
✅ **str** - String ("hello")
✅ **bool** - Boolean (True, False)
✅ **type()** - Check the type

Next time, we'll learn about **variables**! 📦`
        }
      ]
    }
  ]
}
