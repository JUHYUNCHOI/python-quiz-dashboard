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
first = "Hello"
second = " there"
print(first + second)  # Hello there
\`\`\`

String + String = **Concatenation!**`
        },
        {
          id: "concat-explain",
          type: "explain",
          title: "📝 String Concatenation",
          content: `Use the **+** operator to join strings together!

\`\`\`python
name = "Tom"
greeting = "Hey, " + name + "!"
print(greeting)  # Hey, Tom!
\`\`\`

You can join multiple strings:
\`\`\`python
a = "Py"
b = "th"
c = "on"
print(a + b + c)  # Python
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Connect the name and greeting, then print the result!",
          initialCode: "name = \"Mike\"\n# Use + to connect strings\ngreeting = \"Hey, \" + ___ + \"!\"\nprint(greeting)",
          expectedOutput: "Hey, Mike!",
          hint: "Use the + operator to connect strings",
          hint2: "\"Hey, \" + name + \"!\""
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
print("Ha" * 3)      # HaHaHa
print("=" * 10)      # ==========
print("Hi! " * 2)    # Hi! Hi!
\`\`\`

**Usage example:**
\`\`\`python
print("=" * 20)
print("  Menu  ")
print("=" * 20)
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print 10 asterisks (*)!",
          initialCode: "# Repeat a string with *!\nprint(\"*\" * ___)",
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
print("Age: " + age)  # ❌ Error!
\`\`\`

**Solution: Convert with str()!**
\`\`\`python
age = 15
print("Age: " + str(age))  # ✅ Age: 15
\`\`\`

💡 Using f-strings avoids this problem! But it's still good to know **how to concatenate with +**.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Connect the score with a string and print it!",
          initialCode: "score = 100\n# Use str() to convert number to string and connect\nprint(\"Score: \" + ___(score) + \" pts\")",
          expectedOutput: "Score: 100 pts",
          hint: "Use str() to convert numbers to strings!",
          hint2: "str(score)"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 Mission!",
          task: "Connect the name and age to print 'Tom is 15 years old'!",
          initialCode: "name = \"Tom\"\nage = 15\n# Use str() to convert number and connect!\nprint(name + \" is \" + ___(age) + \" years old\")",
          expectedOutput: "Tom is 15 years old",
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
"Score: " + str(100)  # Score: 100
\`\`\``
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Create a nice-looking menu board!",
          initialCode: "print(\"=\" * ___)\nprint(\"    🍗 Chicken Shop    \")\nprint(\"=\" * ___)\nprint(\"Fried: \" + str(___) + \" won\")\nprint(\"Spicy: \" + str(___) + \" won\")",
          expectedOutput: "====================\n    🍗 Chicken Shop    \n====================\nFried: 18000 won\nSpicy: 19000 won",
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
