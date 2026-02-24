// ============================================
// Lesson 18: split() and join()
// ============================================
import { LessonData } from './types'

export const lesson18EnData: LessonData = {
  id: "18",
  title: "split() and join()",
  emoji: "✂️",
  description: "Split and combine strings!",
  chapters: [
    {
      id: "ch1",
      title: "split() - Splitting Strings",
      emoji: "✂️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "✂️ Turn a String into a List!",
          content: `Sometimes you want to process multiple values at once!

\`\`\`python
text = "apple banana strawberry"
fruits = text.split()
print(fruits)  # ['apple', 'banana', 'strawberry']
\`\`\`

**split()** = string → list!`
        },
        {
          id: "split-explain",
          type: "explain",
          title: "✂️ How to Use split()",
          content: `**Split by spaces** (default)
\`\`\`python
"a b c".split()      # ['a', 'b', 'c']
\`\`\`

**Split by a specific character**
\`\`\`python
"2024-01-15".split("-")  # ['2024', '01', '15']
"a,b,c".split(",")       # ['a', 'b', 'c']
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Split a string into a list!",
          initialCode: "text = \"Alice Bob Charlie\"\nnames = text.split()\nprint(names)",
          expectedOutput: "['Alice', 'Bob', 'Charlie']",
          hint: "split() splits by spaces!",
          hint2: "text.split()"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Split by Comma!",
          task: "Split the comma-separated fruits!",
          initialCode: "text = \"apple,banana,strawberry\"\nfruits = text.split(\",\")\nprint(fruits)",
          expectedOutput: "['apple', 'banana', 'strawberry']",
          hint: "Use split(\",\") to split by comma!",
          hint2: "text.split(\",\")"
        }
      ]
    },
    {
      id: "ch2",
      title: "Converting with map()",
      emoji: "🔢",
      steps: [
        {
          id: "map-explain",
          type: "explain",
          title: "🔢 Convert All at Once with map()",
          content: `The result of split() is a **list of strings**!

\`\`\`python
text = "10 20 30"
nums = text.split()
print(nums)  # ['10', '20', '30'] (strings!)
\`\`\`

**map(function, list)** = apply a function to every element

\`\`\`python
nums = list(map(int, text.split()))
print(nums)  # [10, 20, 30] (integers!)
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Convert string numbers into a list of integers!",
          initialCode: "text = \"10 20 30 40 50\"\nnums = list(map(int, text.split()))\nprint(nums)\nprint(f\"Total: {sum(nums)}\")",
          expectedOutput: "[10, 20, 30, 40, 50]\nTotal: 150",
          hint: "Wrapping with list() turns it into a list!",
          hint2: "list(map(int, text.split()))"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of `\"1 2 3\".split()`?",
          options: ["[1, 2, 3]", "['1', '2', '3']", "'1 2 3'", "Error"],
          answer: 1,
          explanation: "split() always returns a list of strings!"
        }
      ]
    },
    {
      id: "ch3",
      title: "join() - Combining Lists",
      emoji: "🔗",
      steps: [
        {
          id: "join-explain",
          type: "explain",
          title: "🔗 Turn a List into a String!",
          content: `**join()** = list → string (the opposite of split!)

\`\`\`python
fruits = ['apple', 'banana', 'strawberry']

# Join with spaces
result = ' '.join(fruits)
print(result)  # "apple banana strawberry"

# Join with commas
result = ','.join(fruits)
print(result)  # "apple,banana,strawberry"
\`\`\`

The format is **'separator'.join(list)**!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Join the list with - as the separator!",
          initialCode: "words = ['2024', '01', '15']\ndate = '-'.join(words)\nprint(date)",
          expectedOutput: "2024-01-15",
          hint: "Use the format separator.join(list)!",
          hint2: "'-'.join(words)"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Combine and Print!",
          task: "Join the letters to form a word!",
          initialCode: "letters = ['P', 'y', 't', 'h', 'o', 'n']\nword = ''.join(letters)\nprint(word)",
          expectedOutput: "Python",
          hint: "''.join() combines with no separator!",
          hint2: "Join with an empty string ''"
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
          task: "Reverse the order of the words and print the result!",
          initialCode: "text = \"Hello World Python\"\nwords = text.___()\nwords.___()\nresult = ' '.___(words)\nprint(result)",
          expectedOutput: "Python World Hello",
          hint: "split() → reverse() → join()",
          hint2: "Use words.reverse() to reverse the order!"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What You Learned Today

✅ **split()** - Split a string into a list
✅ **join()** - Combine a list into a string
✅ **map()** - Convert types all at once

Next time, we'll learn about **tuples**! 🚀`
        }
      ]
    }
  ]
}
