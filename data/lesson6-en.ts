// ============================================
// Lesson 6: String Methods
// ============================================
import { LessonData } from './types'

export const lesson6EnData: LessonData = {
  id: "6",
  title: "String Methods",
  emoji: "🔧",
  description: "Learn various ways to work with strings!",
  chapters: [
    {
      id: "ch1",
      title: "Case Conversion",
      emoji: "🔤",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔧 What is a Method?",
          content: `**Method** = A function attached to a string

\`\`\`python
text = "hello"
print(text.upper())  # HELLO
\`\`\`

Use the format \`string.method()\`!`
        },
        {
          id: "upper-lower",
          type: "explain",
          title: "🔤 upper() and lower()",
          content: `**upper()** - Convert all to uppercase
**lower()** - Convert all to lowercase

\`\`\`python
text = "Hello World"

print(text.upper())  # HELLO WORLD
print(text.lower())  # hello world
\`\`\`

⚠️ The original string is not modified!
\`\`\`python
text = "Hello"
text.upper()
print(text)  # Hello (unchanged!)
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Convert the string to uppercase!",
          initialCode: "text = \"python\"\n# Use the method that converts to uppercase\nprint(text.___())",
          expectedOutput: "PYTHON",
          hint: "Use the .upper() method!",
          hint2: "text.upper()"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Convert to Lowercase!",
          task: "Convert the string to lowercase!",
          initialCode: "text = \"HELLO\"\nprint(text.___())",
          expectedOutput: "hello",
          hint: "Use the .lower() method!",
          hint2: "text.lower()"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of \"PyThOn\".lower()?",
          options: ["PYTHON", "python", "PyThOn", "Error"],
          answer: 1,
          explanation: "lower() converts all characters to lowercase!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Stripping Whitespace & Replacing",
      emoji: "✂️",
      steps: [
        {
          id: "strip-explain",
          type: "explain",
          title: "✂️ strip() - Remove Whitespace",
          content: `**strip()** - Remove leading and trailing whitespace

\`\`\`python
text = "   Hello   "
print(text.strip())  # "Hello"
\`\`\`

**lstrip()** - Remove left whitespace only
**rstrip()** - Remove right whitespace only

\`\`\`python
text = "   Hello   "
print(text.lstrip())  # "Hello   "
print(text.rstrip())  # "   Hello"
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Remove the leading and trailing whitespace!",
          initialCode: "text = \"   Python   \"\n# Use the method that removes whitespace\nprint(text.___())",
          expectedOutput: "Python",
          hint: "Use the .strip() method!",
          hint2: "text.strip()"
        },
        {
          id: "replace-explain",
          type: "explain",
          title: "🔄 replace() - Replace Characters",
          content: `**replace(old, new)** - Replace parts of a string

\`\`\`python
text = "Hello World"
print(text.replace("World", "Python"))
# Hello Python

text2 = "banana banana"
print(text2.replace("banana", "apple"))
# apple apple
\`\`\`

All matching parts get replaced!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Replace 'apple' with 'grape'!",
          initialCode: "text = \"Apples are delicious\"\nprint(text.replace(___, ___))",
          expectedOutput: "Grapes are delicious",
          hint: ".replace(\"Apples\", \"Grapes\")",
          hint2: "text.replace(\"Apples\", \"Grapes\")"
        }
      ]
    },
    {
      id: "ch3",
      title: "Searching & Length",
      emoji: "🔍",
      steps: [
        {
          id: "find-explain",
          type: "explain",
          title: "🔍 find() and count()",
          content: `**find()** - Find position (returns -1 if not found)
\`\`\`python
text = "Hello World"
print(text.find("World"))  # 6
print(text.find("Python")) # -1 (not found)
\`\`\`

**count()** - Count occurrences
\`\`\`python
text = "banana"
print(text.count("a"))  # 3
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Count how many 'a's there are!",
          initialCode: "text = \"abracadabra\"\nprint(text.___(\"a\"))",
          expectedOutput: "5",
          hint: "Use the .count(\"a\") method!",
          hint2: "text.count(\"a\")"
        },
        {
          id: "len-explain",
          type: "explain",
          title: "📏 len() - Get the Length",
          content: `Use the **len()** function to get a string's length!

\`\`\`python
text = "Hello"
print(len(text))  # 5

name = "Python"
print(len(name))  # 6
\`\`\`

⚠️ len() is a **function**, not a method!
\`\`\`python
len(text)    # ✅ Function
text.len()   # ❌ Error!
\`\`\``
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Get the length of the string!",
          initialCode: "text = \"Python\"\n# Use the function that gets the length\nprint(___(text))",
          expectedOutput: "6",
          hint: "Use the len(text) function!",
          hint2: "len(text)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of len(\"Hello\")?",
          options: ["5", "10", "15", "Error"],
          answer: 0,
          explanation: "Each character counts as 1! 5 characters = 5"
        }
      ]
    },
    {
      id: "ch4",
      title: "Final Mission",
      emoji: "🏆",
      steps: [
        {
          id: "more-methods",
          type: "explain",
          title: "📝 More Methods",
          content: `**startswith() / endswith()** - Check start/end
\`\`\`python
text = "Hello World"
print(text.startswith("Hello"))  # True
print(text.endswith("World"))    # True
\`\`\`

**isdigit()** - Contains only digits?
\`\`\`python
"123".isdigit()   # True
"12a".isdigit()   # False
\`\`\`

**capitalize()** - Capitalize only the first letter
\`\`\`python
"hello".capitalize()  # Hello
\`\`\``
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 Final Mission!",
          task: "Complete the ID validator!",
          initialCode: "user_id = \"  PyThOn_User  \"\n\n# 1. Remove whitespace\nclean_id = user_id.___()\n# 2. Convert to lowercase\nlower_id = clean_id.___()\n# 3. Check length\nlength = ___(lower_id)\n\nprint(\"Original:\", user_id)\nprint(\"Cleaned:\", lower_id)\nprint(\"Length:\", length)",
          expectedOutput: "Original:   PyThOn_User  \nCleaned: python_user\nLength: 11",
          hint: "Use strip() → lower() → len() in order!",
          hint2: "strip(), lower(), len()"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **upper(), lower()** - Case conversion
✅ **strip()** - Remove whitespace
✅ **replace()** - Replace characters
✅ **find(), count()** - Searching
✅ **len()** - Get length

Next time, we'll learn about **print() options** to make our output look even better! 🚀`
        }
      ]
    }
  ]
}
