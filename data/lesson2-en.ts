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
- **Text**: "안녕", "파이썬"
- **Yes/No**: True, False

Python also distinguishes between these **data types**!`
        },
        {
          id: "types-explain",
          type: "explain",
          title: "📋 4 Basic Types",
          content: `**1. Integer (int)** - Numbers without a decimal point
\`\`\`python
10, -5, 0, 1000
\`\`\`

**2. Float (float)** - Numbers with a decimal point
\`\`\`python
3.14, -0.5, 2.0
\`\`\`

**3. String (str)** - Text characters
\`\`\`python
"안녕", '파이썬', "123"
\`\`\`

**4. Boolean (bool)** - True/False
\`\`\`python
True, False
\`\`\``
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
          content: `Use **type()** to check the data type!

\`\`\`python
print(type(10))       # <class 'int'>
print(type(3.14))     # <class 'float'>
print(type('안녕'))   # <class 'str'>
print(type(True))     # <class 'bool'>
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try it yourself!",
          task: "Check the type of 100!",
          initialCode: "print(type(___))",
          expectedOutput: "<class 'int'>",
          hint: "Put a value inside type()",
          hint2: "print(type(100))"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Check a string type!",
          task: "Check the type of '파이썬'!",
          initialCode: "print(type(___))",
          expectedOutput: "<class 'str'>",
          hint: "Strings are str!",
          hint2: "print(type('파이썬'))"
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
print(True)   # 참
print(False)  # 거짓
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
          task: "Print the result of 10 > 5!",
          initialCode: "print(___ > ___)",
          expectedOutput: "True",
          hint: "The result of a comparison is True or False!",
          hint2: "print(10 > 5)"
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try False too!",
          task: "Print the result of 3 > 7!",
          initialCode: "print(___ > ___)",
          expectedOutput: "False",
          hint: "3 is less than 7, right?",
          hint2: "print(3 > 7)"
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
| str | "안녕", '123' | String |
| bool | True, False | Boolean |

**Remember!**
- Strings **require quotes**
- Booleans **start with a capital letter**`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Print various data types along with their type()!",
          initialCode: "print(42, type(___))\nprint(3.14, type(___))\nprint('Hello', type(___))\nprint(True, type(___))",
          expectedOutput: "42 <class 'int'>\n3.14 <class 'float'>\nHello <class 'str'>\nTrue <class 'bool'>",
          hint: "Put the same value inside type() as the one before it!",
          hint2: "type(42), type(3.14), type('Hello'), type(True)"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **int** - Integer (10, -5)
✅ **float** - Float (3.14)
✅ **str** - String ("안녕")
✅ **bool** - Boolean (True, False)
✅ **type()** - Check the type

Next time, we'll learn about **variables**! 📦`
        }
      ]
    }
  ]
}
