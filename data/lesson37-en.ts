import { LessonData } from './types'

export const lesson37EnData: LessonData = {
  id: "37en",
  title: "Error Handling",
  emoji: "🛡️",
  description: "Make your games crash-proof, even when bugs happen!",
  chapters: [
    {
      id: "ch1",
      title: "Why Do We Need Error Handling?",
      emoji: "💥",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "What happens if you type something weird during a game?",
          content: `You asked for a number... but the user types **"abc"**. Will the program handle it on its own?

\`\`\`python
num = int(input('Enter a number: '))
print(num * 2)
\`\`\`

**What if they type "abc"?**

\`\`\`
ValueError: invalid literal for int()
\`\`\`

The program crashes! The game shuts down!

@Key point: When an error occurs, the program **stops completely!** That's why we need error handling!`
        },
        {
          id: "ch1-2",
          type: "explain",
          title: "How do we keep it from crashing?",
          content: `We said errors make the program stop... Is there a way to keep it **running** even when errors happen?

\`\`\`python
try:
    num = int(input('Enter a number: '))
    print(num * 2)
except:
    print('Please enter a number!')
\`\`\`

**Even if they type "abc":**
- Prints \`Please enter a number!\`
- The program doesn't crash!

@Key point: Wrap it in **try-except** and the program won't stop even when errors happen!`
        },
        {
          id: "ch1-3",
          type: "quiz",
          title: "Quiz!",
          content: "What happens when an error occurs in a program?",
          options: ["Keeps running", "Stops", "Restarts", "Nothing happens"],
          answer: 1,
          explanation: "When an error occurs, the program stops! That's why error handling is needed!"
        }
      ]
    },
    {
      id: "ch2",
      title: "The try-except Structure",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-1",
          type: "explain",
          title: "What does the try-except structure look like?",
          content: `To catch errors, what **structure** should we wrap our code in? How do we write "try this, and if there's an error, do that!" in code?

\`\`\`python
try:
    # Code that might cause an error
    num = int(input('Number: '))
    print(num * 2)
except:
    # Code to run if an error occurs
    print('Error occurred!')
\`\`\`

@Key point: **try** = "give it a shot", **except** = "if there's an error, do this!"`
        },
        {
          id: "ch2-2",
          type: "interactive",
          title: "Follow the try-except flow",
          description: "See how it works differently with and without errors!",
          component: "tryExceptFlow"
        },
        {
          id: "ch2-3",
          type: "interactive",
          title: "Type it yourself: try-except!",
          description: "Look at the code and type it exactly! Typing it by hand helps you remember!",
          component: "typeAlong",
          targetTitle: "Basic try-except typing practice",
          targetDescription: "Follow the guide and type it the same way",
          targetCode: "try:\n    print(10 / 2)\nexcept:\n    print('Error!')",
          expectedOutput: "5.0"
        },
        {
          id: "ch2-4",
          type: "interactive",
          title: "Fill in the blanks: try-except",
          description: "Complete the try-except structure!",
          component: "fillInBlank",
          codeTemplate: "___1___:\n    print(10 / 0)\n___2___:\n    print('Error occurred!')",
          blanks: [
            { id: "1", answer: "try", hint: "It means 'give it a try'" },
            { id: "2", answer: "except", hint: "The keyword that catches errors" }
          ],
          choices: ["try", "except", "if", "else", "catch", "def"],
          expectedOutput: "Error occurred!"
        },
        {
          id: "ch2-5",
          type: "quiz",
          title: "Predict the output!",
          content: `What gets printed?

\`\`\`python
try:
    print(10 / 0)
except:
    print('Error!')
\`\`\``,
          options: ["10", "0", "Error!", "Program crashes"],
          answer: 2,
          explanation: "Dividing by 0 causes an error! except catches it and prints 'Error!'"
        },
        {
          id: "ch2-6",
          type: "quiz",
          title: "Predict the output!",
          content: `What gets printed?

\`\`\`python
try:
    print(10 / 2)
except:
    print('Error!')
\`\`\``,
          options: ["5.0", "Error!", "10 / 2", "Program crashes"],
          answer: 0,
          explanation: "No error occurs, so only the code inside try runs! Prints 5.0"
        }
      ]
    },
    {
      id: "ch3",
      title: "Types of Errors",
      emoji: "📋",
      steps: [
        {
          id: "ch3-0",
          type: "interactive",
          title: "Error type cards!",
          description: "Click each card to learn when each error occurs!",
          component: "errorTypesCards"
        },
        {
          id: "ch3-1",
          type: "explain",
          title: "What if you only want to catch a specific error?",
          content: `There are many types of errors... Can we catch **only the one we want**?

\`\`\`python
try:
    num = int('abc')
except ValueError:       # Specify the error name!
    print('Cannot convert to number!')
\`\`\`

Write the **error name** after except to catch only that error!

@Key point: Write \`except ValueError:\` with the **error name** to catch only that specific error!`
        },
        {
          id: "ch3-1a",
          type: "explain",
          title: "Can we catch other errors the same way?",
          content: `We learned how to catch ValueError! Can we catch a **division by zero** error the same way?

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:  # Division by zero error!
    print('Cannot divide by zero!')
\`\`\`

Just change the error name and you can catch **any error** with the same pattern!

@Key point: Each error type has a different name! **ValueError**, **ZeroDivisionError**, etc.!`
        },
        {
          id: "ch3-2",
          type: "interactive",
          title: "Type it yourself: Catch a specific error!",
          description: "Write the code to catch a ValueError yourself!",
          component: "typeAlong",
          targetTitle: "Catch ValueError",
          targetDescription: "Write the error name after except",
          targetCode: "try:\n    num = int('abc')\nexcept ValueError:\n    print('Not a number!')",
          expectedOutput: "Not a number!"
        },
        {
          id: "ch3-3",
          type: "interactive",
          title: "Fill in the blanks: Specific error",
          description: "Catch the division by zero error!",
          component: "fillInBlank",
          codeTemplate: "try:\n    print(10 / 0)\nexcept ___1___:\n    print('Cannot divide by 0!')",
          blanks: [
            { id: "1", answer: "ZeroDivisionError", hint: "The error when dividing by zero!" }
          ],
          choices: ["ZeroDivisionError", "ValueError", "FileNotFoundError", "Error"],
          expectedOutput: "Cannot divide by 0!"
        },
        {
          id: "ch3-4",
          type: "quiz",
          title: "Quiz!",
          content: "What error does `int('hello')` cause?",
          options: ["ZeroDivisionError", "ValueError", "FileNotFoundError", "No error"],
          answer: 1,
          explanation: "'hello' isn't a number, so it's a ValueError!"
        },
        {
          id: "ch3-5",
          type: "quiz",
          title: "Quiz!",
          content: "What error does 10 / 0 cause?",
          options: ["ValueError", "ZeroDivisionError", "FileNotFoundError", "No error"],
          answer: 1,
          explanation: "Dividing by zero causes a ZeroDivisionError!"
        }
      ]
    },
    {
      id: "ch4",
      title: "Handling Multiple Errors",
      emoji: "🎯",
      steps: [
        {
          id: "ch4-0",
          type: "explain",
          title: "What if one block of code can cause two types of errors?",
          content: `Code that takes a number and divides... typing 'abc' causes **ValueError**, typing 0 causes **ZeroDivisionError**! We need to catch both!

\`\`\`python
try:
    num = int(input('Number: '))
    result = 10 / num
except ValueError:
    print('Enter a number!')
\`\`\`

This only catches ValueError -- **entering 0 still crashes!**

@Key point: A try block can have **multiple types of errors**! One except might not be enough!`
        },
        {
          id: "ch4-0a",
          type: "explain",
          title: "Adding more except blocks solves it!",
          content: `What if we **add one more** except block -- can we catch both errors?

\`\`\`python
except ValueError:
    print('Enter a number!')
except ZeroDivisionError:       # Added!
    print('Cannot divide by zero!')
\`\`\`

- Type 'abc' -> \`Enter a number!\`
- Type 0 -> \`Cannot divide by zero!\`

@Key point: Use **multiple except blocks** to show different messages for each error!`
        },
        {
          id: "ch4-1",
          type: "interactive",
          title: "Experience multiple except flow!",
          description: "See which except runs depending on the input!",
          component: "multiExceptFlow"
        },
        {
          id: "ch4-2",
          type: "interactive",
          title: "Fill in the blanks: Multiple except",
          description: "Catch two different errors separately!",
          component: "fillInBlank",
          codeTemplate: "try:\n    x = int(input())\n    print(10 / x)\nexcept ___1___:\n    print('Not a number!')\nexcept ___2___:\n    print('No zero!')",
          blanks: [
            { id: "1", answer: "ValueError", hint: "When converting a non-number!" },
            { id: "2", answer: "ZeroDivisionError", hint: "When dividing by zero!" }
          ],
          choices: ["ValueError", "ZeroDivisionError", "FileNotFoundError", "TypeError"],
          expectedOutput: ""
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "Predict the output!",
          content: `What if you type 'abc'?

\`\`\`python
try:
    x = int(input())  # type 'abc'
    print(10 / x)
except ValueError:
    print('A')
except ZeroDivisionError:
    print('B')
\`\`\``,
          options: ["A", "B", "Both A and B", "Error"],
          answer: 0,
          explanation: "'abc' isn't a number so it's a ValueError -> prints 'A'!"
        },
        {
          id: "ch4-4",
          type: "quiz",
          title: "Predict the output!",
          content: `What if you type '0'?

\`\`\`python
try:
    x = int(input())  # type '0'
    print(10 / x)
except ValueError:
    print('A')
except ZeroDivisionError:
    print('B')
\`\`\``,
          options: ["A", "B", "10", "Error"],
          answer: 1,
          explanation: "Dividing by 0 causes ZeroDivisionError -> prints 'B'!"
        }
      ]
    },
    {
      id: "ch5",
      title: "Error Handling in Games",
      emoji: "🎮",
      steps: [
        {
          id: "ch5-0",
          type: "interactive",
          title: "Try it: Game crash!",
          description: "Compare what happens with and without try-except!",
          component: "gameCrashDemo"
        },
        {
          id: "ch5-1",
          type: "explain",
          title: "What if a game has no error handling?",
          content: `You made a number guessing game... but the user types **'abc'**? Will the game just **shut down**?

\`\`\`python
import random
answer = random.randint(1, 10)

while True:
    guess = int(input('1-10 number: '))
    if guess == answer:
        print('Correct!')
        break
\`\`\`

**Type 'abc'?**
- ValueError!
- Game over!

@Key point: Without error handling, **one bad input kills the game!**`
        },
        {
          id: "ch5-2",
          type: "explain",
          title: "What if we put try inside while?",
          content: `We want the game to keep going even with bad input! What if we put **try-except inside while**?

\`\`\`python
while True:
    try:
        guess = int(input('Number: '))
        # game logic...
    except ValueError:
        print('Numbers only please!')
\`\`\`

If an error occurs, it goes to except, then **while loops again**!

@Key point: **while + try-except** = the loop keeps going even when errors happen!`
        },
        {
          id: "ch5-2a",
          type: "explain",
          title: "How does it look in the actual game?",
          content: `What does this pattern look like when applied to a real game?

\`\`\`python
while True:
    try:
        guess = int(input('1-10 number: '))
        if guess == answer:
            print('Correct!')
            break
        print('UP!' if guess < answer else 'DOWN!')
    except ValueError:
        print('Numbers only please!')
\`\`\`

Type 'abc' -> \`Numbers only please!\` -> game continues!

@Key point: For games that take user input, you **must** use while + try-except!`
        },
        {
          id: "ch5-3",
          type: "interactive",
          title: "Fill in the blanks: Game error handling",
          description: "Add error handling to the game code!",
          component: "fillInBlank",
          codeTemplate: "while True:\n    ___1___:\n        x = int(input('Number: '))\n        print(x * 2)\n    except ___2___:\n        print('Numbers only!')",
          blanks: [
            { id: "1", answer: "try", hint: "Give it a try!" },
            { id: "2", answer: "ValueError", hint: "Number conversion failure error!" }
          ],
          choices: ["try", "except", "ValueError", "ZeroDivisionError", "if", "while"],
          expectedOutput: ""
        },
        {
          id: "ch5-4",
          type: "quiz",
          title: "Quiz!",
          content: "User input in games should be...",
          options: [
            "No try-except needed",
            "Always wrapped in try-except",
            "Only sometimes handled",
            "Errors ignored"
          ],
          answer: 1,
          explanation: "User input is always unpredictable! try-except is a must!"
        }
      ]
    },
    {
      id: "ch6",
      title: "Practice: Safe Programs",
      emoji: "💻",
      steps: [
        {
          id: "ch6-0",
          type: "interactive",
          title: "Type it yourself: Safe division",
          description: "Write the code to handle division by 0 with try-except!",
          component: "typeAlong",
          targetTitle: "Safe Division",
          targetDescription: "Catch ZeroDivisionError",
          targetCode: "try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print('No zero!')",
          expectedOutput: "No zero!"
        },
        {
          id: "ch6-1",
          type: "interactive",
          title: "Fill in the blanks: Safe input function",
          description: "Handle errors inside a function!",
          component: "fillInBlank",
          codeTemplate: "def safe_input():\n    ___1___:\n        return int(input())\n    except ___2___:\n        return -1",
          blanks: [
            { id: "1", answer: "try", hint: "Give it a try!" },
            { id: "2", answer: "ValueError", hint: "Number conversion failure error!" }
          ],
          choices: ["try", "except", "ValueError", "ZeroDivisionError", "if", "return"],
          expectedOutput: ""
        },
        {
          id: "ch6-2",
          type: "interactive",
          title: "Fill in the blanks: Catch two errors",
          description: "Catch ValueError and ZeroDivisionError separately!",
          component: "fillInBlank",
          codeTemplate: "___1___:\n    num = int(input('Number: '))\n    print(100 / num)\nexcept ___2___:\n    print('Enter a number!')\nexcept ___3___:\n    print('No zero!')",
          blanks: [
            { id: "1", answer: "try", hint: "Give it a try!" },
            { id: "2", answer: "ValueError", hint: "Number conversion failure!" },
            { id: "3", answer: "ZeroDivisionError", hint: "When dividing by zero!" }
          ],
          choices: ["try", "except", "ValueError", "ZeroDivisionError", "if", "while"],
          expectedOutput: ""
        },
        {
          id: "ch6-3",
          type: "mission",
          title: "Complete the safe calculator",
          task: "Add error handling with try-except",
          initialCode: `# Simple calculator
# Wrap it with try-except!

num = int(input('Number: '))
result = 100 / num
print(f'Result: {result}')

# Hint: You need to catch two types of errors
# - ValueError (text input)
# - ZeroDivisionError (zero input)`,
          expectedOutput: "Result: 50.0",
          hint: "Put all three lines inside try:",
          hint2: "Use except ValueError: and except ZeroDivisionError: -- two of them!"
        }
      ]
    },
    {
      id: "ch7",
      title: "Summary",
      emoji: "📝",
      steps: [
        {
          id: "ch7-0",
          type: "explain",
          title: "Let's review everything we learned about error handling!",
          content: `try-except structure, catching specific errors, multiple except blocks... Let's put it **all together** at a glance!

\`\`\`python
try:
    num = int(input())
    print(10 / num)
except ValueError:
    print('Not a number!')
except ZeroDivisionError:
    print('Divided by zero!')
\`\`\`

- **try**: give it a shot
- **except**: if there's an error, do this
- **ValueError**: value conversion failed
- **ZeroDivisionError**: divided by zero
- User input should always use try-except!

@Key point: Catch errors with **try-except** and the program won't crash! You can handle each error type differently!`
        },
        {
          id: "ch7-1",
          type: "interactive",
          title: "Fill in the blanks: Final review",
          description: "One more try-except structure!",
          component: "fillInBlank",
          codeTemplate: "___1___:\n    num = int('abc')\n___2___ ValueError:\n    print('Handled!')",
          blanks: [
            { id: "1", answer: "try", hint: "Try it!" },
            { id: "2", answer: "except", hint: "The error catcher!" }
          ],
          choices: ["try", "except", "if", "else", "catch", "finally"],
          expectedOutput: "Handled!"
        },
        {
          id: "ch7-2",
          type: "quiz",
          title: "Final quiz!",
          content: "What is the role of try in try-except?",
          options: [
            "Runs when an error occurs",
            "Runs code that might cause an error",
            "Terminates the program",
            "Declares a variable"
          ],
          answer: 1,
          explanation: "You put code that might cause an error inside try!"
        }
      ]
    }
  ]
}
