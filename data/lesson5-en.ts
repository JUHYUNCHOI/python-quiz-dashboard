// ============================================
// Lesson 5: String Operations (English)
// ============================================
import { LessonData } from './types'

export const lesson5EnData: LessonData = {
  id: "5",
  title: "String Operations",
  emoji: "🔗",
  description: "Let's add and multiply strings!",
  chapters: [
    {
      id: "ch1",
      title: "Adding Strings",
      emoji: "➕",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔗 You Can Add Strings Too!",
          content: `Think only numbers can be added? Strings can be added too!

\`\`\`python
first = "안녕"
second = "하세요"
print(first + second)  # 안녕하세요
\`\`\`

String + String = **Concatenation!**`
        },
        {
          id: "concat-explain",
          type: "explain",
          title: "📝 String Concatenation",
          content: `Use the **+** operator to join strings together!

\`\`\`python
name = "철수"
greeting = "안녕, " + name + "!"
print(greeting)  # 안녕, 철수!
\`\`\`

You can join multiple strings:
\`\`\`python
a = "파"
b = "이"
c = "썬"
print(a + b + c)  # 파이썬
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Connect the name and greeting, then print the result!",
          initialCode: "name = \"민수\"\n# + 로 문자열을 연결하세요\ngreeting = \"반가워, \" + ___ + \"!\"\nprint(greeting)",
          expectedOutput: "반가워, 민수!",
          hint: "Use the + operator to connect strings",
          hint2: "\"반가워, \" + name + \"!\""
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of \"Hello\" + \"World\"?",
          options: ["Hello World", "HelloWorld", "Hello + World", "Error"],
          answer: 1,
          explanation: "String + joins them directly without spaces! If you need a space, you have to add \" \" explicitly."
        }
      ]
    },
    {
      id: "ch2",
      title: "Multiplying Strings",
      emoji: "✖️",
      steps: [
        {
          id: "multiply-explain",
          type: "explain",
          title: "✖️ String × Number",
          content: `When you multiply a string by a number, it **repeats**!

\`\`\`python
print("하" * 3)      # 하하하
print("=" * 10)      # ==========
print("안녕! " * 2)  # 안녕! 안녕!
\`\`\`

**Usage example:**
\`\`\`python
print("=" * 20)
print("  메뉴판  ")
print("=" * 20)
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print 10 asterisks (*)!",
          initialCode: "# 문자열 * 숫자로 반복!\nprint(\"*\" * ___)",
          expectedOutput: "**********",
          hint: "String * number = repeat!",
          hint2: "\"*\" * 10"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Make a Divider Line!",
          task: "Print 20 equal signs (=) to make a divider line!",
          initialCode: "print(\"=\" * ___)",
          expectedOutput: "====================",
          hint: "\"=\" * 20",
          hint2: "print(\"=\" * 20)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of \"AB\" * 3?",
          options: ["AB3", "ABABAB", "AB AB AB", "Error"],
          answer: 1,
          explanation: "The entire string repeats 3 times! AB + AB + AB = ABABAB"
        }
      ]
    },
    {
      id: "ch3",
      title: "Strings and Numbers",
      emoji: "🔢",
      steps: [
        {
          id: "error-explain",
          type: "explain",
          title: "⚠️ String + Number = Error!",
          content: `You can't directly add a string and a number!

\`\`\`python
age = 15
print("나이: " + age)  # ❌ 에러!
\`\`\`

**Solution: Convert with str()!**
\`\`\`python
age = 15
print("나이: " + str(age))  # ✅ 나이: 15
\`\`\`

💡 Using f-strings avoids this problem! But it's still good to know **how to concatenate with +**.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Connect the score with a string and print it!",
          initialCode: "score = 100\n# str()로 숫자를 문자열로 바꿔서 연결하세요\nprint(\"점수: \" + ___(score) + \"점\")",
          expectedOutput: "점수: 100점",
          hint: "Use str() to convert numbers to strings!",
          hint2: "str(score)"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 Mission!",
          task: "Connect the name and age to print '철수는 15살입니다'!",
          initialCode: "name = \"철수\"\nage = 15\n# str()로 숫자를 문자열로 변환해서 연결!\nprint(name + \"는 \" + ___(age) + \"살입니다\")",
          expectedOutput: "철수는 15살입니다",
          hint: "Use str() to convert numbers to strings!",
          hint2: "str(age)"
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
          content: `## String Operations Summary

**Addition (+)** - Concatenation
\`\`\`python
"Hello" + "World"  # HelloWorld
\`\`\`

**Multiplication (*)** - Repetition
\`\`\`python
"Ha" * 3  # HaHaHa
\`\`\`

**Joining with numbers** - str() needed
\`\`\`python
"점수: " + str(100)  # 점수: 100
\`\`\``
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Create a nice-looking menu board!",
          initialCode: "print(\"=\" * ___)\nprint(\"    🍗 치킨집    \")\nprint(\"=\" * ___)\nprint(\"후라이드: \" + str(___) + \"원\")\nprint(\"양념: \" + str(___) + \"원\")",
          expectedOutput: "====================\n    🍗 치킨집    \n====================\n후라이드: 18000원\n양념: 19000원",
          hint: "Use * for 20 divider characters, str() to convert prices!",
          hint2: "20 / 18000 / 19000"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ Concatenating strings with **+**
✅ Repeating strings with *****
✅ Converting numbers to strings with **str()**

Next time, we'll learn about **string methods** to change case, remove whitespace, and more! 🚀`
        }
      ]
    }
  ]
}
