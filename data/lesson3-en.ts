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
Player name: 용사
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
name = '용사'
hp = 100
gold = 5000
\`\`\`

- Put '용사' into the box called \`name\`
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

hp = 80    # 데미지를 받았다!
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
name = '홍길동'
player_hp = 100
score2 = 50
\`\`\`

### ❌ Invalid Names
\`\`\`python
2score = 50    # Starts with a number ❌
my-name = '홍'  # Hyphen (-) ❌
my name = '홍'  # Space ❌
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
name = '용사'
hp = 100

print(f'이름: {name}, 체력: {hp}')
# Result: 이름: 용사, 체력: 100
\`\`\`

Use the format \`f'...{variable}...'\` and the variable is automatically inserted!

💡 **This is just a preview!** We'll learn more about f-strings later.
For now, just remember \`f'...{variable}...'\` and you're good!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ Try It Yourself!",
          task: "Print using f-string with name='홍길동' and age=15!",
          initialCode: "name = '홍길동'\nage = 15\n# f-string으로 이름과 나이를 출력하세요\nprint(f'이름: {___}, 나이: {___}')",
          expectedOutput: "이름: 홍길동, 나이: 15",
          hint: "Put the variable names inside the curly braces!",
          hint2: "print(f'이름: {name}, 나이: {age}')"
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
          task: "Complete the self-introduction! (Name: 홍길동, Age: 15, Hobby: 게임)",
          initialCode: "name = '홍길동'\nage = ___\nhobby = '게임'\n\nprint(f'=== 자기소개 ===')\nprint(f'이름: {name}')\nprint(f'나이: {___}살')\nprint(f'취미: {hobby}')\nprint(f'{name}의 {age}살 생일을 축하해!')",
          expectedOutput: "=== 자기소개 ===\n이름: 홍길동\n나이: 15살\n취미: 게임\n홍길동의 15살 생일을 축하해!",
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
