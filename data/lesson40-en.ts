import { LessonData } from './types'

export const lesson40EnData: LessonData = {
  id: "40en",
  title: "Part 6 Problem Set 20",
  emoji: "\uD83D\uDCDD",
  description: "Error handling and file I/O comprehensive review problems!",
  chapters: [
    {
      id: "ch1",
      title: "Easy (1~7)",
      emoji: "\u2B50",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "How much of Part 6 do you remember?",
          content: `We learned error handling (try-except) and file reading/writing (with open)... Let's test your skills with **20 problems**!

| Difficulty | # of Problems |
|------------|---------------|
| Easy | 7 problems |
| Medium | 7 problems |
| Hard | 6 problems |

@Key point: Goal is to get **16 or more correct**! Let's go!`
        },
        {
          id: "ch1-1",
          type: "quiz",
          title: "Problem 1",
          content: `What is the output?\n\n\`\`\`python\ntry:\n    print(10 / 2)\nexcept:\n    print('Error!')\n\`\`\``,
          options: ["5.0", "Error!", "5", "10 / 2"],
          answer: 0,
          explanation: "No error! 10/2 = 5.0 prints normally!"
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "Problem 2",
          content: `What is the output?\n\n\`\`\`python\ntry:\n    print(10 / 0)\nexcept:\n    print('Error!')\n\`\`\``,
          options: ["0", "Error!", "Infinity", "Program terminates"],
          answer: 1,
          explanation: "Division by 0 -> ZeroDivisionError -> except -> 'Error!'"
        },
        {
          id: "ch1-3",
          type: "quiz",
          title: "Problem 3",
          content: `What is the output?\n\n\`\`\`python\ntry:\n    x = int('abc')\nexcept:\n    print('A')\nfinally:\n    print('B')\n\`\`\``,
          options: ["A only", "B only", "A then B", "Error"],
          answer: 2,
          explanation: "except -> 'A' -> finally always runs -> 'B'"
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "Problem 4",
          content: `What is in test.txt after running this?\n\n\`\`\`python\nwith open('test.txt', 'w') as f:\n    f.write('Hello')\n\`\`\``,
          options: ["Hello", "hello", "Empty file", "Error"],
          answer: 0,
          explanation: "write() saves exactly what you give it! Hello"
        },
        {
          id: "ch1-5",
          type: "quiz",
          title: "Problem 5",
          content: `If test.txt contains 'Hello', what is the content after running this?\n\n\`\`\`python\nwith open('test.txt', 'a') as f:\n    f.write(' World')\n\`\`\``,
          options: [" World", "Hello World", "World Hello", "Error"],
          answer: 1,
          explanation: "'a' mode appends to the end! Hello + ' World' = Hello World"
        },
        {
          id: "ch1-6",
          type: "interactive",
          title: "Problem 6: Fill in the Blanks",
          description: "Complete the basic file opening structure!",
          component: "fillInBlank",
          codeTemplate: "___1___ open('data.txt', 'r') ___2___ f:\n    text = f.read()\n    print(text)",
          blanks: [
            { id: "1", answer: "with", hint: "Safe file opening syntax!" },
            { id: "2", answer: "as", hint: "Assign to a variable name" }
          ],
          choices: ["with", "as", "open", "for", "in", "try"],
          expectedOutput: ""
        },
        {
          id: "ch1-7",
          type: "interactive",
          title: "Problem 7: Fill in the Blanks",
          description: "Complete the error-catching code!",
          component: "fillInBlank",
          codeTemplate: "try:\n    x = int(input())\n___1___ ValueError:\n    print('Please enter a number!')",
          blanks: [
            { id: "1", answer: "except", hint: "Catch the error!" }
          ],
          choices: ["except", "try", "finally", "if", "else", "catch"],
          expectedOutput: ""
        }
      ]
    },
    {
      id: "ch2",
      title: "Medium (8~14)",
      emoji: "\u2B50\u2B50",
      steps: [
        {
          id: "ch2-0",
          type: "quiz",
          title: "Problem 8",
          content: `What is the output?\n\n\`\`\`python\ntry:\n    x = int('10')\n    print(x + 5)\nexcept ValueError:\n    print('A')\nfinally:\n    print('C')\n\`\`\``,
          options: ["A C", "15 C", "15 only", "A only"],
          answer: 1,
          explanation: "int('10') succeeds! -> prints 15 -> finally always runs -> C"
        },
        {
          id: "ch2-1",
          type: "quiz",
          title: "Problem 9",
          content: `What is the output?\n\n\`\`\`python\ntry:\n    nums = [1, 2, 3]\n    print(nums[5])\nexcept IndexError:\n    print('A')\nexcept:\n    print('B')\n\`\`\``,
          options: ["A", "B", "A B", "Error"],
          answer: 0,
          explanation: "Index 5 doesn't exist -> IndexError -> the more specific except 'A' matches first!"
        },
        {
          id: "ch2-2",
          type: "quiz",
          title: "Problem 10",
          content: `How many lines will test.txt have after this?\n\n\`\`\`python\nwith open('test.txt', 'w') as f:\n    f.write('A\\nB\\nC')\n\`\`\``,
          options: ["1 line", "3 lines (A, B, C)", "2 lines", "Empty file"],
          answer: 1,
          explanation: "\\n = newline! A, B, C each on their own line = 3 lines!"
        },
        {
          id: "ch2-3",
          type: "interactive",
          title: "Problem 11: Missing File Error Handling",
          description: "Complete the error handling code for when a file doesn't exist!",
          component: "fillInBlank",
          codeTemplate: "___1___:\n    with open('x.txt', '___2___') as f:\n        print(f.read())\nexcept ___3___:\n    print('File not found!')",
          blanks: [
            { id: "1", answer: "try", hint: "Give it a try!" },
            { id: "2", answer: "r", hint: "Read mode!" },
            { id: "3", answer: "FileNotFoundError", hint: "Error when file is missing!" }
          ],
          choices: ["try", "except", "r", "w", "a", "FileNotFoundError", "ValueError", "IndexError"],
          expectedOutput: "File not found!"
        },
        {
          id: "ch2-4",
          type: "interactive",
          title: "Problem 12: Save a List to a File",
          description: "Save each item of a list to a file, one per line!",
          component: "fillInBlank",
          codeTemplate: "names = ['Alice', 'Bob', 'Charlie']\nwith open('names.txt', '___1___') as f:\n    for name in names:\n        f.___2___(name + '___3___')",
          blanks: [
            { id: "1", answer: "w", hint: "Write mode!" },
            { id: "2", answer: "write", hint: "Write to the file!" },
            { id: "3", answer: "\\n", hint: "Newline!" }
          ],
          choices: ["w", "r", "a", "write", "read", "\\n", "\\t", " "],
          expectedOutput: ""
        },
        {
          id: "ch2-5",
          type: "quiz",
          title: "Problem 13",
          content: `What is the output when input is 0?\n\n\`\`\`python\ntry:\n    x = int(input())  # 0\n    y = 10 / x\n    print(y)\nexcept ValueError:\n    print('A')\nexcept ZeroDivisionError:\n    print('B')\n\`\`\``,
          options: ["A", "B", "0", "Error"],
          answer: 1,
          explanation: "int(0) succeeds! -> 10/0 -> ZeroDivisionError -> 'B'"
        },
        {
          id: "ch2-6",
          type: "interactive",
          title: "Problem 14: Accept Only Numbers",
          description: "Keep looping until the user enters a valid number!",
          component: "fillInBlank",
          codeTemplate: "___1___ True:\n    ___2___:\n        x = int(input('Number: '))\n        ___3___\n    except ___4___:\n        print('Please enter a number!')",
          blanks: [
            { id: "1", answer: "while", hint: "Infinite loop!" },
            { id: "2", answer: "try", hint: "Give it a try!" },
            { id: "3", answer: "break", hint: "Exit on success!" },
            { id: "4", answer: "ValueError", hint: "Bad value error!" }
          ],
          choices: ["while", "for", "try", "except", "break", "continue", "ValueError", "TypeError"],
          expectedOutput: ""
        }
      ]
    },
    {
      id: "ch3",
      title: "Hard (15~20)",
      emoji: "\u2B50\u2B50\u2B50",
      steps: [
        {
          id: "ch3-0",
          type: "interactive",
          title: "Problem 15: Range-Validated Input",
          description: "Accept only numbers between 1 and 100!",
          component: "fillInBlank",
          codeTemplate: "___1___ True:\n    ___2___:\n        x = int(input('Number(1-100): '))\n        if 1 <= x <= 100:\n            ___3___\n        print('Out of range!')\n    except ___4___:\n        print('Please enter a number!')",
          blanks: [
            { id: "1", answer: "while", hint: "Infinite loop!" },
            { id: "2", answer: "try", hint: "Give it a try!" },
            { id: "3", answer: "break", hint: "Exit if in range!" },
            { id: "4", answer: "ValueError", hint: "Bad value!" }
          ],
          choices: ["while", "for", "try", "except", "break", "return", "ValueError", "TypeError"],
          expectedOutput: ""
        },
        {
          id: "ch3-1",
          type: "interactive",
          title: "Problem 16: Save/Load Scores",
          description: "Save a score to a file and load it back!",
          component: "fillInBlank",
          codeTemplate: "def save_score(name, score):\n    with open('score.txt', '___1___') as f:\n        f.___2___(f'{name},{score}')\n\ndef load_score():\n    ___3___:\n        with open('score.txt', 'r') as f:\n            return f.read()\n    except ___4___:\n        return 'File not found!'",
          blanks: [
            { id: "1", answer: "w", hint: "Write mode!" },
            { id: "2", answer: "write", hint: "Write to the file!" },
            { id: "3", answer: "try", hint: "Give it a try!" },
            { id: "4", answer: "FileNotFoundError", hint: "When file is missing!" }
          ],
          choices: ["w", "r", "a", "write", "read", "try", "except", "FileNotFoundError", "ValueError"],
          expectedOutput: ""
        },
        {
          id: "ch3-2",
          type: "interactive",
          title: "Problem 17: Simple Notepad",
          description: "Add a memo (append mode) + read (read mode) + try-except!",
          component: "fillInBlank",
          codeTemplate: "# Add memo\nwith open('memo.txt', '___1___') as f:\n    f.___2___('New memo\\n')\n\n# Read memos\n___3___:\n    with open('memo.txt', 'r') as f:\n        print(f.read())\nexcept ___4___:\n    print('No memos!')",
          blanks: [
            { id: "1", answer: "a", hint: "Append mode!" },
            { id: "2", answer: "write", hint: "Write to the file!" },
            { id: "3", answer: "try", hint: "Give it a try!" },
            { id: "4", answer: "FileNotFoundError", hint: "When file is missing!" }
          ],
          choices: ["a", "w", "r", "write", "read", "try", "except", "FileNotFoundError", "ValueError"],
          expectedOutput: ""
        },
        {
          id: "ch3-3",
          type: "interactive",
          title: "Problem 18: Safe Division",
          description: "A function that returns None on error!",
          component: "fillInBlank",
          codeTemplate: "def safe_divide(a, b):\n    ___1___:\n        return a / b\n    except ___2___:\n        return ___3___",
          blanks: [
            { id: "1", answer: "try", hint: "Give it a try!" },
            { id: "2", answer: "ZeroDivisionError", hint: "Division by zero!" },
            { id: "3", answer: "None", hint: "Python's 'nothing' value!" }
          ],
          choices: ["try", "except", "ZeroDivisionError", "ValueError", "None", "0", "False", "return"],
          expectedOutput: ""
        },
        {
          id: "ch3-4",
          type: "interactive",
          title: "Problem 19: Sum Numbers (Skip Non-Numbers)",
          description: "Pick only numbers from a list and sum them!",
          component: "fillInBlank",
          codeTemplate: "total = 0\nlines = ['10', 'abc', '20', '30']\n___1___ line in lines:\n    ___2___:\n        total += ___3___(line)\n    except ___4___:\n        pass\nprint(f'Total: {total}')",
          blanks: [
            { id: "1", answer: "for", hint: "Loop!" },
            { id: "2", answer: "try", hint: "Give it a try!" },
            { id: "3", answer: "int", hint: "String to number!" },
            { id: "4", answer: "ValueError", hint: "Bad value!" }
          ],
          choices: ["for", "while", "try", "except", "int", "str", "ValueError", "TypeError"],
          expectedOutput: "Total: 60"
        },
        {
          id: "ch3-5",
          type: "interactive",
          title: "Problem 20: Game Save",
          description: "Complete the save/load system!",
          component: "fillInBlank",
          codeTemplate: "def save_game(name, level):\n    with open('save.txt', '___1___') as f:\n        f.write(name + '\\n')\n        f.___2___(___3___(level))\n    print('Saved!')\n\ndef load_game():\n    ___4___:\n        with open('save.txt', 'r') as f:\n            name = f.readline().strip()\n            level = int(f.readline().strip())\n        print(f'{name} Lv.{level}')\n    except ___5___:\n        print('No save found!')",
          blanks: [
            { id: "1", answer: "w", hint: "Write mode!" },
            { id: "2", answer: "write", hint: "Write to the file!" },
            { id: "3", answer: "str", hint: "Number to string!" },
            { id: "4", answer: "try", hint: "Give it a try!" },
            { id: "5", answer: "FileNotFoundError", hint: "When file is missing!" }
          ],
          choices: ["w", "r", "a", "write", "read", "str", "int", "try", "except", "FileNotFoundError", "ValueError"],
          expectedOutput: "Saved!"
        }
      ]
    },
    {
      id: "ch4",
      title: "Part 6 Complete!",
      emoji: "\uD83C\uDFC6",
      steps: [
        {
          id: "ch4-0",
          type: "explain",
          title: "Let's review all of Part 6 at a glance!",
          content: `Error handling, file operations, game saves... What if we **summarize everything** from Part 6?

\`\`\`python
try:
    risky_code()
except ErrorName:
    handle_error()
finally:
    always_runs()
\`\`\`

| Error | Cause |
|-------|-------|
| **ValueError** | Bad value (int('abc')) |
| **ZeroDivisionError** | Division by zero |
| **FileNotFoundError** | File doesn't exist |
| **IndexError** | Index out of range |

- **'w'** = write, **'r'** = read, **'a'** = append
- **while True + try-except** = safe input
- **try + with open('r')** = safe file reading

@Key point: **try-except + with open** = the core pattern of Part 6! Master error handling and file operations!`
        },
        {
          id: "ch4-1",
          type: "quiz",
          title: "Final Quiz!",
          content: "What is the most important pattern from Part 6?",
          options: [
            "Just use print() well",
            "try-except for error handling + with open for file operations",
            "Just use variables well",
            "Just use for loops well"
          ],
          answer: 1,
          explanation: "try-except + with open = the core of Part 6!"
        },
        {
          id: "ch4-2",
          type: "explain",
          title: "What's coming next?",
          content: `We managed characters with dictionaries... But what if there was an even cooler way to **stamp out characters like a mold**?

\`\`\`python
class Character:
    def __init__(self, name, HP):
        self.name = name
        self.HP = HP

hero = Character('Hero', 100)
\`\`\`

@Key point: In Part 7, we'll learn **classes** = a way to create objects like a cookie cutter!`
        }
      ]
    }
  ]
}
