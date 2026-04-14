// ============================================
// Lesson 3: Variables (English)
// ============================================
import { LessonData } from './types'

export const lesson3EnData: LessonData = {
  id: "3",
  title: "Variables",
  emoji: "📦",
  description: "Learn about variables — the boxes that store data!",
  chapters: [
    {
      id: "ch1",
      title: "What is a Variable?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎮 Why Do We Need Variables in Games?",
          content: `Imagine you're making a game!

\`\`\`
Player name: Hero
Health: 100
Attack: 25
Gold: 5000
\`\`\`

Where do we store all this information?
We store it in **variables**! 📦`
        },
        {
          id: "concept",
          type: "explain",
          title: "📦 Variable = A Labeled Box",
          content: `A **variable** is a box that holds data!

\`\`\`python
name = 'Hero'
hp = 100
gold = 5000
\`\`\`

- Put 'Hero' into the box called \`name\`
- Put 100 into the box called \`hp\`
- Put 5000 into the box called \`gold\`!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Store 15 in the variable age and print it!",
          initialCode: "age = ___\nprint(age)",
          expectedOutput: "15",
          hint: "Store it using: variable_name = value",
          hint2: "age = 15\nprint(age)"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What does `=` mean in `x = 10`?",
          options: [
            "x and 10 are equal",
            "Store 10 in x",
            "Divide x by 10",
            "It causes an error"
          ],
          answer: 1,
          explanation: "In programming, = means 'store' (assign a value)!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Using Variables",
      emoji: "🔧",
      steps: [
        {
          id: "use-explain",
          type: "explain",
          title: "📝 Using Variable Values",
          content: `You can retrieve a stored value by using the variable name!

\`\`\`python
price = 19000
print(price)        # 19000
print(price + 2000) # 21000
\`\`\`

When you use the variable name, the value inside comes out!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Store 19000 in chicken, then print chicken + 2000!",
          initialCode: "chicken = ___\nprint(chicken + 2000)",
          expectedOutput: "21000",
          hint: "Store the value in the variable, then calculate",
          hint2: "chicken = 19000\nprint(chicken + 2000)"
        },
        {
          id: "change-explain",
          type: "explain",
          title: "🔄 Changing Variable Values",
          content: `You can change a variable's value anytime!

\`\`\`python
hp = 100
print(hp)  # 100

hp = 80    # took damage!
print(hp)  # 80
\`\`\`

When you assign a new value to the same variable, it gets overwritten!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Start score at 0, change it to 100, and print it!",
          initialCode: "score = 0\nscore = ___\nprint(score)",
          expectedOutput: "100",
          hint: "Just assign a new value to the same variable",
          hint2: "score = 0\nscore = 100\nprint(score)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ Quiz!",
          content: "What is the value of x after `x = 5`, `x = x + 3`?",
          options: ["5", "3", "8", "Error"],
          answer: 2,
          explanation: "x = x + 3 takes the current value of x (5), adds 3, and stores it back in x!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Variable Naming Rules",
      emoji: "📋",
      steps: [
        {
          id: "rules-explain",
          type: "explain",
          title: "📋 Variable Naming Rules",
          content: `### ✅ Valid Names
\`\`\`python
name = 'Alice'
player_hp = 100
score2 = 50
\`\`\`

### ❌ Invalid Names
\`\`\`python
2score = 50    # Starts with a number ❌
my-name = 'Lee'  # Hyphen (-) ❌
my name = 'Lee'  # Space ❌
\`\`\``
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ Quiz!",
          content: "Which is a valid variable name?",
          options: ["1st_place", "my-score", "player_name", "my name"],
          answer: 2,
          explanation: "player_name is correct! Underscores (_) are OK!"
        },
        {
          id: "fstring-explain",
          type: "explain",
          title: "✨ Printing with f-strings",
          content: `**f-strings** make it easy to put variables inside strings!

\`\`\`python
name = 'Hero'
hp = 100

print(f'Name: {name}, HP: {hp}')
# Result: Name: Hero, HP: 100
\`\`\`

Use the format \`f'...{variable}...'\` and the variable is automatically inserted!

💡 **This is just a preview!** We'll learn more about f-strings later.
For now, just remember \`f'...{variable}...'\` and you're good!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print using f-string with name='Alice' and age=15!",
          initialCode: "name = 'Alice'\nage = 15\n# Use f-string to print name and age\nprint(f'Name: {___}, Age: {___}')",
          expectedOutput: "Name: Alice, Age: 15",
          hint: "Put the variable names inside the curly braces!",
          hint2: "print(f'Name: {name}, Age: {age}')"
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
          task: "Complete the self-introduction! (Name: Alice, Age: 15, Hobby: gaming)",
          initialCode: "name = 'Alice'\nage = ___\nhobby = 'gaming'\n\nprint(f'=== About Me ===')\nprint(f'Name: {name}')\nprint(f'Age: {___}')\nprint(f'Hobby: {hobby}')\nprint(f\"Happy {age}th birthday, {name}!\")",
          expectedOutput: "=== About Me ===\nName: Alice\nAge: 15\nHobby: gaming\nHappy 15th birthday, Alice!",
          hint: "Store 15 in age and use the variable in the f-string!",
          hint2: "age = 15 / {age}"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Complete!",
          content: `## What We Learned Today

✅ **Variable** = A labeled box that holds data
✅ Store with \`variable = value\`
✅ Use the variable name to retrieve its value
✅ Print easily with **f-strings**

Next time, we'll learn about **operators** to calculate and compare! 🚀`
        }
      ]
    }
  ]
}
