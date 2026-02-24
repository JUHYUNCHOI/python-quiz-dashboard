// ============================================
// Lesson 4: Operators (English)
// ============================================
import { LessonData } from './types'

export const lesson4EnData: LessonData = {
  id: "4en",
  title: "Operators",
  emoji: "🧮",
  description: "Learn operators for calculating and comparing!",
  chapters: [
    {
      id: "ch1",
      title: "Arithmetic Operators",
      emoji: "➕",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🧮 Python Calculator!",
          content: `Python is a powerful calculator!

\`\`\`python
print(10 + 3)   # Addition → 13
print(10 - 3)   # Subtraction → 7
print(10 * 3)   # Multiplication → 30
print(10 / 3)   # Division → 3.333...
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It!",
          task: "Calculate and print 19000 * 3!",
          initialCode: "# 19000 * 3을 계산하세요\nprint(___)",
          expectedOutput: "57000",
          hint: "Use the * symbol for multiplication",
          hint2: "print(19000 * 3)"
        },
        {
          id: "special-explain",
          type: "explain",
          title: "🔢 Special Operators",
          content: `### Division-Related Operators

\`\`\`python
print(10 / 3)   # Division → 3.333...
print(10 // 3)  # Quotient only → 3
print(10 % 3)   # Remainder only → 1
print(2 ** 3)   # Exponent → 8
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It!",
          task: "Print the remainder of 17 divided by 5!",
          initialCode: "# 나머지 연산자 %를 사용하세요\nprint(17 ___ 5)",
          expectedOutput: "2",
          hint: "Use the % symbol for remainder",
          hint2: "print(17 % 5)"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of 2 ** 4?",
          options: ["6", "8", "16", "24"],
          answer: 2,
          explanation: "2 ** 4 = 2 to the power of 4 = 2×2×2×2 = 16"
        }
      ]
    },
    {
      id: "ch2",
      title: "Comparison Operators",
      emoji: "⚖️",
      steps: [
        {
          id: "compare-explain",
          type: "explain",
          title: "⚖️ Comparing Values",
          content: `When you compare two values, you get **True** or **False**!

\`\`\`python
print(10 > 5)    # Greater than → True
print(10 < 5)    # Less than → False
print(10 >= 10)  # Greater or equal → True
print(10 <= 5)   # Less or equal → False
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It!",
          task: "Print the result of 100 > 50!",
          initialCode: "print(100 ___ 50)",
          expectedOutput: "True",
          hint: "> compares if something is greater",
          hint2: "print(100 > 50)"
        },
        {
          id: "equal-explain",
          type: "explain",
          title: "🟰 Equal / Not Equal",
          content: `**Equal** is \`==\` (two equal signs!)
**Not equal** is \`!=\`

\`\`\`python
print(10 == 10)  # Equal → True
print(10 == 5)   # Equal → False
print(10 != 5)   # Not equal → True
\`\`\`

⚠️ \`=\` is for assignment, \`==\` is for comparison!`
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the difference between `x = 10` and `x == 10`?",
          options: [
            "They are the same",
            "= is assignment, == is comparison",
            "= is comparison, == is assignment",
            "Both cause errors"
          ],
          answer: 1,
          explanation: "= stores a value, == compares if two values are equal!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Logical Operators",
      emoji: "🔗",
      steps: [
        {
          id: "logic-explain",
          type: "explain",
          title: "🔗 and, or, not",
          content: `You can combine multiple conditions!

\`\`\`python
# and: Both must be True for True
print(True and True)   # True
print(True and False)  # False

# or: Only one needs to be True for True
print(True or False)   # True

# not: Reverses the value
print(not True)        # False
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It!",
          task: "Print the result of (10 > 5) and (3 < 7)!",
          initialCode: "print((10 > 5) ___ (3 < 7))",
          expectedOutput: "True",
          hint: "If both are True, the and result is also True!",
          hint2: "print((10 > 5) and (3 < 7))"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of True or False?",
          options: ["True", "False", "Error", "TrueFalse"],
          answer: 0,
          explanation: "or returns True if even just one is True!"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "compound-explain",
          type: "explain",
          title: "📝 Compound Assignment Operators",
          content: `You can use a shorthand when updating variable values!

\`\`\`python
score = 100
score = score + 10  # Long way
score += 10         # Short way (same meaning!)
\`\`\`

\`+=\`, \`-=\`, \`*=\`, \`/=\` and more are available!`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It!",
          task: "Start with hp = 100, apply hp -= 30, then print it!",
          initialCode: "hp = 100\nhp ___ 30\nprint(hp)",
          expectedOutput: "70",
          hint: "-= subtracts and saves the result",
          hint2: "hp = 100\nhp -= 30\nprint(hp)"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Complete the price calculator! (unit price 15000 won, 3 items, 10% discount)",
          initialCode: "price = 15000\ncount = 3\n# 합계를 계산하세요\ntotal = ___\n# 10% 할인 계산\ndiscount = ___\n# 최종 가격\nfinal = ___\n\nprint(f'단가: {price}원')\nprint(f'수량: {count}개')\nprint(f'합계: {total}원')\nprint(f'할인: {discount}원')\nprint(f'최종: {final}원')",
          expectedOutput: "단가: 15000원\n수량: 3개\n합계: 45000원\n할인: 4500.0원\n최종: 40500.0원",
          hint: "total = price * count, discount = total * 0.1",
          hint2: "final = total - discount"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **Arithmetic Operators**: +, -, *, /, //, %, **
✅ **Comparison Operators**: >, <, >=, <=, ==, !=
✅ **Logical Operators**: and, or, not
✅ **Compound Assignment**: +=, -=, *=, /=

Next time, we'll learn **string operations** to add and multiply text! 🚀`
        }
      ]
    }
  ]
}
