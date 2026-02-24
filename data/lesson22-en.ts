// ============================================
// Lesson 22: Slicing
// ============================================
import { LessonData } from './types'

export const lesson22EnData: LessonData = {
  id: "22",
  title: "Slicing",
  emoji: "🔪",
  description: "Cut out parts of lists and strings!",
  chapters: [
    {
      id: "ch1",
      title: "Slicing Basics",
      emoji: "✂️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔪 Grab Just the Part You Want!",
          content: `You can get just a **portion** of a list or string!

\`\`\`python
fruits = ["apple", "banana", "strawberry", "grape", "watermelon"]

# From index 1 up to (but not including) index 3
print(fruits[1:3])  # ['banana', 'strawberry']
\`\`\`

**[start:end]** - From start up to but **not including** end!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print indices 1 through 3!",
          initialCode: "nums = [0, 1, 2, 3, 4, 5]\nprint(nums[1:4])",
          expectedOutput: "[1, 2, 3]",
          hint: "[1:4] means indices 1, 2, 3!",
          hint2: "The end index is not included!"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of [0, 1, 2, 3, 4][1:3]?",
          options: ["[1, 2, 3]", "[1, 2]", "[0, 1, 2]", "[2, 3]"],
          answer: 1,
          explanation: "[1:3] includes indices 1 and 2 only! Index 3 is not included."
        }
      ]
    },
    {
      id: "ch2",
      title: "Omitting & Negative Indices",
      emoji: "🎯",
      steps: [
        {
          id: "omit-explain",
          type: "explain",
          title: "🎯 Omitting Start/End",
          content: `**From the beginning** - omit start
\`\`\`python
nums = [0, 1, 2, 3, 4]
print(nums[:3])   # [0, 1, 2]
\`\`\`

**To the end** - omit end
\`\`\`python
print(nums[2:])   # [2, 3, 4]
\`\`\`

**Full copy**
\`\`\`python
print(nums[:])    # [0, 1, 2, 3, 4]
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ First 3 Elements!",
          task: "Get the first 3 elements!",
          initialCode: "nums = [10, 20, 30, 40, 50]\nprint(nums[:3])",
          expectedOutput: "[10, 20, 30]",
          hint: "[:3] means the first 3 items!",
          hint2: "nums[:3]"
        },
        {
          id: "negative-explain",
          type: "explain",
          title: "➖ Negative Indices",
          content: `You can count from the end too!

\`\`\`python
nums = [0, 1, 2, 3, 4]

print(nums[-1])     # 4 (last item)
print(nums[-2:])    # [3, 4] (last 2 items)
print(nums[:-1])    # [0, 1, 2, 3] (exclude last)
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Last 2 Items!",
          task: "Get the last 2 elements!",
          initialCode: "fruits = [\"apple\", \"banana\", \"strawberry\", \"grape\", \"watermelon\"]\nprint(fruits[-2:])",
          expectedOutput: "['grape', 'watermelon']",
          hint: "[-2:] means from the 2nd-to-last onward!",
          hint2: "fruits[-2:]"
        }
      ]
    },
    {
      id: "ch3",
      title: "Step & Reversing",
      emoji: "🚶",
      steps: [
        {
          id: "step-explain",
          type: "explain",
          title: "🚶 Step - Skip Elements",
          content: `**[start:end:step]** - how many to skip at a time

\`\`\`python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(nums[::2])    # [0, 2, 4, 6, 8] (every 2nd)
print(nums[1::2])   # [1, 3, 5, 7, 9] (from 1, every 2nd)
\`\`\`

**Reversing:**
\`\`\`python
print(nums[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Reverse a List!",
          task: "Print the list in reverse order!",
          initialCode: "nums = [1, 2, 3, 4, 5]\nprint(nums[::-1])",
          expectedOutput: "[5, 4, 3, 2, 1]",
          hint: "[::-1] means reverse order!",
          hint2: "nums[::-1]"
        },
        {
          id: "string-explain",
          type: "explain",
          title: "📝 Strings Can Be Sliced Too!",
          content: `Strings can be sliced the same way!

\`\`\`python
text = "Hello World"

print(text[0:5])    # "Hello"
print(text[6:])     # "World"
print(text[::-1])   # "dlroW olleH"
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Reverse a String!",
          task: "Reverse a string and check if it's a palindrome!",
          initialCode: "word = \"level\"\nreversed_word = word[::-1]\nprint(f\"Original: {word}\")\nprint(f\"Reversed: {reversed_word}\")\nprint(f\"Palindrome? {word == reversed_word}\")",
          expectedOutput: "Original: level\nReversed: level\nPalindrome? True",
          hint: "Reverse with [::-1] and compare!",
          hint2: "word == word[::-1]"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Split a phone number into area code, middle, and last parts!",
          initialCode: "phone = \"010-1234-5678\"\n\narea = phone[:___]\nmiddle = phone[___:___]\nlast = phone[-___:]\n\nprint(f\"Full: {phone}\")\nprint(f\"Area code: {area}\")\nprint(f\"Middle: {middle}\")\nprint(f\"Last: {last}\")",
          expectedOutput: "Full: 010-1234-5678\nArea code: 010\nMiddle: 1234\nLast: 5678",
          hint: "[:3], [4:8], [-4:]",
          hint2: "Strings can be sliced too!"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **[start:end]** - basic slicing
✅ **[:end], [start:]** - omitting start/end
✅ **[-n:]** - from the end
✅ **[::-1]** - reversing

🎉 **Part 3 Complete!**
In the next Part, you'll learn about **projects** and **functions**! 🚀`
        }
      ]
    }
  ]
}
