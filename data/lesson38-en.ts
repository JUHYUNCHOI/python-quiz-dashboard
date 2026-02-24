import { LessonData } from './types'

export const lesson38EnData: LessonData = {
  id: "38en",
  title: "Reading & Writing Files",
  emoji: "📁",
  description: "Save and load your game data!",
  chapters: [
    {
      id: "ch1",
      title: "Why Do We Need Files?",
      emoji: "💾",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "How do you save a game score forever?",
          content: `You stored a score in a variable... but if you **close and reopen** the program, will the score still be there? Where should you save it so it **doesn't disappear?**

\`\`\`python
score = 100
level = 5
# Program ends...
# Restart? score = 0, level = 1
\`\`\`

**Save it to a file?** -> It stays even after the program closes!

@Key point: Variables disappear when the program closes! Save to a **file** and it lasts forever!`
        },
        {
          id: "ch1-1",
          type: "interactive",
          title: "Variable vs File experience!",
          description: "See the difference between 'just closing' and 'saving then closing'!",
          component: "memoryVsFile"
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "Quiz!",
          content: "Data stored in a variable...",
          options: [
            "Stays even after closing the program",
            "Disappears when the program closes",
            "Stays even after restarting the computer",
            "Is saved forever"
          ],
          answer: 1,
          explanation: "Variables are in memory, so they disappear when the program closes!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Writing to Files",
      emoji: "📝",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "How do you save text to a file?",
          content: `You want to **save** data to a file! How do you **open -> write -> close** a file in Python?

\`\`\`python
f = open('test.txt', 'w')  # w = write
f.write('Hello!')
f.close()
\`\`\`

A test.txt file is created with "Hello!" saved in it!

@Key point: **open('file', 'w')** -> **write()** -> **close()** = 3 steps to write a file!`
        },
        {
          id: "ch2-1",
          type: "explain",
          title: "What if you forget close()?",
          content: `You have to write close() every time... but what if you **forget**? Could that cause problems? Is there a way to close it automatically?

\`\`\`python
with open('test.txt', 'w') as f:
    f.write('Hello!')
# close() happens automatically here
\`\`\`

From now on we'll only use the with statement!

@Key point: Use the **with statement** and close() is automatic! Safe and convenient!`
        },
        {
          id: "ch2-2",
          type: "interactive",
          title: "Type it yourself: File writing!",
          description: "Write the code to save to a file using with!",
          component: "typeAlong",
          targetTitle: "Basic file writing",
          targetDescription: "Write to a file with with open",
          targetCode: "with open('hi.txt', 'w') as f:\n    f.write('Hello!')",
          expectedOutput: ""
        },
        {
          id: "ch2-3",
          type: "interactive",
          title: "Fill in the blanks: File writing",
          description: "Save data to a file!",
          component: "fillInBlank",
          codeTemplate: "with ___1___('data.txt', 'w') as f:\n    f.___2___('Hello!')",
          blanks: [
            { id: "1", answer: "open", hint: "The function that opens files!" },
            { id: "2", answer: "write", hint: "The method that writes to files!" }
          ],
          choices: ["open", "write", "read", "close", "file", "save"],
          expectedOutput: ""
        },
        {
          id: "ch2-4",
          type: "quiz",
          title: "Predict the output!",
          content: `What's in the file?

\`\`\`python
with open('a.txt', 'w') as f:
    f.write('A')
    f.write('B')
    f.write('C')
\`\`\``,
          options: ["A\\nB\\nC", "ABC", "A B C", "CBA"],
          answer: 1,
          explanation: "Without \\n there's no line break, so it writes continuously! ABC"
        },
        {
          id: "ch2-5",
          type: "quiz",
          title: "Quiz!",
          content: "What happens when you open a file in 'w' mode?",
          options: [
            "Appends after existing content",
            "Erases existing content and writes new",
            "Read only",
            "Error occurs"
          ],
          answer: 1,
          explanation: "'w' is overwrite mode! Existing content is deleted!"
        }
      ]
    },
    {
      id: "ch3",
      title: "Reading Files",
      emoji: "📖",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "How do you read a saved file?",
          content: `We saved data to a file... now we need a way to **read it back**! If 'w' was for writing, what's for reading?

\`\`\`python
with open('memo.txt', 'r') as f:
    content = f.read()
    print(content)
\`\`\`

Output:
\`\`\`
First line
Second line
Third line
\`\`\`

@Key point: **'r' = read = read mode!** read() reads the entire file at once!`
        },
        {
          id: "ch3-1",
          type: "interactive",
          title: "Compare reading methods!",
          description: "See the differences between read(), readline(), and readlines()!",
          component: "readMethodDemo"
        },
        {
          id: "ch3-2",
          type: "interactive",
          title: "Type it yourself: File reading!",
          description: "Write the code to read a file using with!",
          component: "typeAlong",
          targetTitle: "Basic file reading",
          targetDescription: "Read a file with with open",
          targetCode: "with open('memo.txt', 'r') as f:\n    content = f.read()\n    print(content)",
          expectedOutput: "First line\nSecond line"
        },
        {
          id: "ch3-3",
          type: "interactive",
          title: "Fill in the blanks: File reading",
          description: "Complete the file reading code!",
          component: "fillInBlank",
          codeTemplate: "with open('data.txt', '___1___') as f:\n    content = f.___2___()\n    print(content)",
          blanks: [
            { id: "1", answer: "r", hint: "First letter of read!" },
            { id: "2", answer: "read", hint: "The method that reads everything!" }
          ],
          choices: ["r", "w", "a", "read", "readline", "write"],
          expectedOutput: ""
        },
        {
          id: "ch3-4",
          type: "quiz",
          title: "Quiz!",
          content: "What's the difference between read() and readlines()?",
          options: [
            "No difference",
            "read() returns a string, readlines() returns a list",
            "read() reads one line, readlines() reads all",
            "read() returns numbers, readlines() returns text"
          ],
          answer: 1,
          explanation: "read() returns the whole file as a string, readlines() returns it as a list of lines!"
        },
        {
          id: "ch3-5",
          type: "quiz",
          title: "Predict the output!",
          content: `What gets printed? (data.txt contains: "hello")

\`\`\`python
with open('data.txt', 'r') as f:
    a = f.read()
    b = f.read()
print(len(a), len(b))
\`\`\``,
          options: ["5 5", "5 0", "0 5", "Error"],
          answer: 1,
          explanation: "read() reads to the end, so the second call returns an empty string!"
        }
      ]
    },
    {
      id: "ch4",
      title: "Comparing File Modes",
      emoji: "🔀",
      steps: [
        {
          id: "ch4-0",
          type: "interactive",
          title: "Try w / r / a modes!",
          description: "Open the same file in three different modes! How do the results differ?",
          component: "fileModeSimulator"
        },
        {
          id: "ch4-1",
          type: "explain",
          title: "How do you add without erasing existing content?",
          content: `'w' mode **erases everything** and writes fresh... What if you want to keep existing content and just **add to the end**?

\`\`\`python
with open('log.txt', 'a') as f:
    f.write('New record!\\n')
\`\`\`

Adds after the existing content!

| Mode | Meaning | If file missing | If file exists |
|------|---------|-----------------|----------------|
| 'w' | Write | Creates new | **Erases** then writes |
| 'r' | Read | **Error!** | Read only |
| 'a' | Append | Creates new | **Adds to end** |

@Key point: **'a' = append = append mode!** Writes after the existing content!`
        },
        {
          id: "ch4-2",
          type: "interactive",
          title: "Fill in the blanks: Append mode",
          description: "Add a record to an existing file!",
          component: "fillInBlank",
          codeTemplate: "with open('log.txt', '___1___') as f:\n    f.___2___('New record!\\n')",
          blanks: [
            { id: "1", answer: "a", hint: "First letter of append!" },
            { id: "2", answer: "write", hint: "The method that writes to files!" }
          ],
          choices: ["a", "w", "r", "write", "read", "append"],
          expectedOutput: ""
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "Quiz!",
          content: "To keep adding to a leaderboard, use...",
          options: ["'w' mode", "'r' mode", "'a' mode", "'x' mode"],
          answer: 2,
          explanation: "'a' mode keeps existing records and adds new ones!"
        },
        {
          id: "ch4-4",
          type: "quiz",
          title: "Predict the output!",
          content: `What's in a.txt after running this?

\`\`\`python
with open('a.txt', 'w') as f:
    f.write('X')

with open('a.txt', 'w') as f:
    f.write('Y')
\`\`\``,
          options: ["XY", "X", "Y", "X\\nY"],
          answer: 2,
          explanation: "'w' overwrites every time! Only the second 'Y' remains!"
        }
      ]
    },
    {
      id: "ch5",
      title: "File Error Handling",
      emoji: "⚠️",
      steps: [
        {
          id: "ch5-0",
          type: "explain",
          title: "What happens if you try to open a file that doesn't exist?",
          content: `You tried to read a file... but what if it **doesn't exist**? Will the program crash?

\`\`\`python
with open('missing.txt', 'r') as f:
    content = f.read()
\`\`\`

\`\`\`
FileNotFoundError:
No such file or directory: 'missing.txt'
\`\`\`

We can handle this with try-except!

@Key point: Reading a missing file -> **FileNotFoundError!** Catch it with try-except!`
        },
        {
          id: "ch5-1",
          type: "interactive",
          title: "Type it yourself: File error handling!",
          description: "Write the code to handle file errors with try-except!",
          component: "typeAlong",
          targetTitle: "File Error Handling",
          targetDescription: "Catch FileNotFoundError",
          targetCode: "try:\n    with open('x.txt', 'r') as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print('File not found!')",
          expectedOutput: "File not found!"
        },
        {
          id: "ch5-2",
          type: "interactive",
          title: "Fill in the blanks: File error handling",
          description: "Keep it from crashing even if the file is missing!",
          component: "fillInBlank",
          codeTemplate: "___1___:\n    with open('save.txt', 'r') as f:\n        print(f.read())\nexcept ___2___:\n    print('No save file!')",
          blanks: [
            { id: "1", answer: "try", hint: "Give it a try!" },
            { id: "2", answer: "FileNotFoundError", hint: "The error when a file doesn't exist!" }
          ],
          choices: ["try", "except", "FileNotFoundError", "ValueError", "if", "open"],
          expectedOutput: "No save file!"
        },
        {
          id: "ch5-3",
          type: "quiz",
          title: "Predict the output!",
          content: `What gets printed when the file doesn't exist?

\`\`\`python
try:
    with open('x.txt', 'r') as f:
        print('A')
except FileNotFoundError:
    print('B')
print('C')
\`\`\``,
          options: ["A C", "B C", "A B C", "Error"],
          answer: 1,
          explanation: "File missing -> except -> prints 'B' -> program continues -> prints 'C'"
        }
      ]
    },
    {
      id: "ch6",
      title: "Practice: Saving Scores",
      emoji: "💻",
      steps: [
        {
          id: "ch6-0",
          type: "interactive",
          title: "Type it yourself: Save a score!",
          description: "Write the code to save a score to a file!",
          component: "typeAlong",
          targetTitle: "Save a score",
          targetDescription: "Save a score to a file with with open",
          targetCode: "with open('score.txt', 'w') as f:\n    f.write(str(100))\nprint('Saved!')",
          expectedOutput: "Saved!"
        },
        {
          id: "ch6-1",
          type: "interactive",
          title: "Fill in the blanks: Load a score",
          description: "Load a score from a file! If the file is missing, use 0!",
          component: "fillInBlank",
          codeTemplate: "try:\n    with open('score.txt', '___1___') as f:\n        score = int(f.___2___())\nexcept FileNotFoundError:\n    score = 0",
          blanks: [
            { id: "1", answer: "r", hint: "Read mode!" },
            { id: "2", answer: "read", hint: "The method that reads the entire file!" }
          ],
          choices: ["r", "w", "a", "read", "readline", "write"],
          expectedOutput: ""
        },
        {
          id: "ch6-2",
          type: "mission",
          title: "Create a save_score function",
          task: "Complete a function that saves a score to score.txt",
          initialCode: `def save_score(score):
    # Save score to score.txt
    # Use with open('score.txt', 'w')!
    pass

# Test
save_score(100)
print('Save complete!')`,
          expectedOutput: "Save complete!",
          hint: "with open('score.txt', 'w') as f:",
          hint2: "f.write(str(score)) -- convert the number to a string!"
        },
        {
          id: "ch6-3",
          type: "mission",
          title: "Create a load_score function",
          task: "Load a score from score.txt (return 0 if file missing)",
          initialCode: `def load_score():
    # Load score from score.txt
    # Return 0 if file doesn't exist
    # Use try-except FileNotFoundError!
    pass

# Test
score = load_score()
print(f'Current score: {score}')`,
          expectedOutput: "Current score: 0",
          hint: "try: with open('score.txt', 'r') as f:",
          hint2: "except FileNotFoundError: return 0"
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
          title: "Let's review everything we learned about files!",
          content: `File writing, reading, appending, error handling... we covered it all! What do the **key patterns** look like at a glance?

\`\`\`python
# Write
with open('file.txt', 'w') as f:
    f.write('data')

# Read
with open('file.txt', 'r') as f:
    content = f.read()
\`\`\`

- **'w'** -- write (overwrites)
- **'r'** -- read
- **'a'** -- append
- \`f.read()\` -> whole file as a string
- \`f.readlines()\` -> whole file as a list
- File missing -> FileNotFoundError -> try-except!

@Key point: **with open + mode (w/r/a)** = the basics of file handling! Handle errors with try-except!`
        },
        {
          id: "ch7-1",
          type: "interactive",
          title: "Fill in the blanks: Final review",
          description: "File reading and writing summary!",
          component: "fillInBlank",
          codeTemplate: "# Write to file\nwith open('a.txt', '___1___') as f:\n    f.write('Hello!')\n\n# Read from file\nwith open('a.txt', '___2___') as f:\n    print(f.read())",
          blanks: [
            { id: "1", answer: "w", hint: "First letter of write!" },
            { id: "2", answer: "r", hint: "First letter of read!" }
          ],
          choices: ["w", "r", "a", "x", "rw", "wr"],
          expectedOutput: "Hello!"
        },
        {
          id: "ch7-2",
          type: "quiz",
          title: "Final quiz!",
          content: "To keep adding game records over time, use...",
          options: [
            "'w' mode",
            "'r' mode",
            "'a' mode",
            "Mode doesn't matter"
          ],
          answer: 2,
          explanation: "'a' mode appends after the existing content!"
        }
      ]
    }
  ]
}
