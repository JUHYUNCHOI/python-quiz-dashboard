// ============================================
// Lesson 12: Advanced Conditionals
// ============================================
import { LessonData } from './types'

export const lesson12EnData: LessonData = {
  id: "12",
  title: "Advanced Conditionals",
  emoji: "🔀",
  description: "Learn nested conditionals and logical operators!",
  chapters: [
    {
      id: "ch1",
      title: "Logical Operators",
      emoji: "🔗",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔗 Multiple Conditions at Once!",
          content: `Sometimes you want to combine conditions like
"age is 13 or older **and** less than 19"!

**Logical operators** connect conditions:
- **and** - True only if both are true
- **or** - True if at least one is true
- **not** - Reverses the value`
        },
        {
          id: "and-explain",
          type: "explain",
          title: "🔗 and - Both Must Be True",
          content: `**and** = Both must be True for the result to be True!

\`\`\`python
age = 15
# Teenager: 13 or older and less than 19
if age >= 13 and age < 19:
    print("You are a teenager")
\`\`\`

**and truth table:**
- True and True → True
- True and False → False
- False and True → False
- False and False → False`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Check if the score is between 80 and 100 (inclusive)!",
          initialCode: "score = 85\n\n# Connect two conditions with and\nif score >= 80 ___ score <= 100:\n    print(\"Pass!\")\nelse:\n    print(\"Fail\")",
          expectedOutput: "Pass!",
          hint: "Connect the two conditions with and!",
          hint2: "score >= 80 and score <= 100"
        },
        {
          id: "or-explain",
          type: "explain",
          title: "🔗 or - At Least One",
          content: `**or** = True if at least one is True!

\`\`\`python
day = "Saturday"
# Weekend: Saturday or Sunday
if day == "Saturday" or day == "Sunday":
    print("It's the weekend!")
\`\`\`

**or truth table:**
- True or True → True
- True or False → True
- False or True → True
- False or False → False`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "If VIP or has a coupon, give a discount!",
          initialCode: "is_vip = False\nhas_coupon = True\n\n# Connect with or\nif is_vip ___ has_coupon:\n    print(\"10% discount!\")\nelse:\n    print(\"Full price\")",
          expectedOutput: "10% discount!",
          hint: "With or, only one condition needs to be true!",
          hint2: "is_vip or has_coupon"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of True and False?",
          options: ["True", "False", "Error", "None"],
          answer: 1,
          explanation: "With and, both must be True! If either is False, the result is False."
        }
      ]
    },
    {
      id: "ch2",
      title: "not and Compound Conditions",
      emoji: "🔄",
      steps: [
        {
          id: "not-explain",
          type: "explain",
          title: "🔄 not - Reverse It",
          content: `**not** = Turns True into False, and False into True!

\`\`\`python
is_raining = False

if not is_raining:
    print("Let's go for a walk!")  # This prints!
\`\`\`

**not truth table:**
- not True → False
- not False → True`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "If not logged in, print a message!",
          initialCode: "is_logged_in = False\n\n# Use not to reverse the condition!\nif ___ is_logged_in:\n    print(\"Please log in\")",
          expectedOutput: "Please log in",
          hint: "Use the operator that reverses a condition!",
          hint2: "not is_logged_in"
        },
        {
          id: "complex-explain",
          type: "explain",
          title: "🧩 Compound Conditions",
          content: `You can combine multiple operators:

\`\`\`python
age = 25
has_license = True

# Adult with a license can drive
if age >= 18 and has_license:
    print("You can drive!")

# Minor or no license
if age < 18 or not has_license:
    print("You cannot drive!")
\`\`\`

**Precedence:** not > and > or
It's best to use parentheses for clarity!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "If aged 13-19 or a student, print 'Discount applied!'",
          initialCode: "age = 20\nis_student = True\n\n# Teen (13-19) or student gets a discount\nif (age >= 13 ___ age <= 19) ___ is_student:\n    print(\"Discount applied!\")\nelse:\n    print(\"Full price\")",
          expectedOutput: "Discount applied!",
          hint: "Use parentheses to group conditions clearly!",
          hint2: "(age >= 13 and age <= 19) or is_student"
        }
      ]
    },
    {
      id: "ch3",
      title: "Nested Conditionals and in",
      emoji: "📦",
      steps: [
        {
          id: "nested-explain",
          type: "explain",
          title: "📦 if Inside if",
          content: `You can put an if statement inside another if:

\`\`\`python
age = 15
has_ticket = True

if has_ticket:
    if age >= 18:
        print("Adult admission")
    else:
        print("Youth admission")
else:
    print("Please buy a ticket")
\`\`\`

⚠️ Make sure to match the indentation!`
        },
        {
          id: "in-explain",
          type: "explain",
          title: "📝 The in Operator",
          content: `**in** = Check if something is contained

\`\`\`python
# In a string
if "a" in "apple":
    print("a is found!")  # This prints

if "python" in "I love python":
    print("Found it!")  # This prints
\`\`\`

**not in** = Not contained
\`\`\`python
if "z" not in "hello":
    print("z is not here!")  # This prints
\`\`\`

💡 \`in\` also works with lists! We'll learn about lists in a future lesson.`
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Use the in operator to check if a character is contained!",
          initialCode: "word = \"python\"\n\n# Use in to check if it's contained\nif \"y\" ___ word:\n    print(\"y is in the word!\")\nelse:\n    print(\"y is not here\")",
          expectedOutput: "y is in the word!",
          hint: "Use in to check if a character is in the string!",
          hint2: "\"y\" in word"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the result of \"abc\" in \"abcdef\"?",
          options: ["True", "False", "Error", "\"abc\""],
          answer: 0,
          explanation: "\"abcdef\" contains \"abc\", so the result is True!"
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
          task: "Build a login system!",
          initialCode: "username = \"admin\"\npassword = \"1234\"\nis_active = True\n\n# Condition: correct username, correct password, and active account\nif username == \"admin\" ___ password == \"1234\" ___ is_active:\n    print(\"Login successful!\")\nelse:\n    print(\"Login failed\")",
          expectedOutput: "Login successful!",
          hint: "All three conditions must be true, so use and to connect them!",
          hint2: "and"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **and** - True only if both are true
✅ **or** - True if at least one is true
✅ **not** - Reverses the value
✅ **Nested if** - if inside if
✅ **in** - Check if something is contained

Next time, we'll learn about **loops (for)**! 🚀`
        }
      ]
    }
  ]
}
