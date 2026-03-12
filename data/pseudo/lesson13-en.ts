// ============================================
// Pseudocode Lesson 13: File Handling (English)
// CIE Style Pseudocode - Read and write files!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson13EnData: LessonData = {
  id: "pseudo-13",
  title: "File Handling",
  emoji: "📁",
  description: "OPENFILE, READFILE, WRITEFILE, CLOSEFILE!",
  chapters: [
    {
      id: "ch1",
      title: "Opening and Closing Files",
      emoji: "📂",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📋 Why File Handling?",
          content: `So far, all our data disappears when a program ends. Variables are stored in **memory**, which is temporary.

To **save data permanently**, we write it to a **file** on disk. Next time the program runs, it can **read** the data back!

Common uses:
- Saving high scores in a game
- Storing student records
- Logging results

CIE pseudocode provides four key file operations:
- **OPENFILE** - open a file for use
- **READFILE** - read data from a file
- **WRITEFILE** - write data to a file
- **CLOSEFILE** - close the file when done`
        },
        {
          id: "ch1-openclose",
          type: "explain",
          title: "📂 OPENFILE and CLOSEFILE",
          content: `Before reading or writing, you must **open** the file. When you are done, you must **close** it.

\`\`\`
OPENFILE "data.txt" FOR READ
// ... read data here ...
CLOSEFILE "data.txt"
\`\`\`

There are three modes for opening a file:

| Mode | Purpose |
|---|---|
| **READ** | Read data from an existing file |
| **WRITE** | Write new data (overwrites existing content!) |
| **APPEND** | Add data to the end of the file |

Important rules:
- Always put the filename in **quotes**
- Always specify the **mode** (READ, WRITE, or APPEND)
- Always **CLOSEFILE** when you are finished!
- WRITE mode **erases** the old file content
- APPEND mode **keeps** old content and adds new data at the end`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Which file mode should you use to add new data to the end of an existing file WITHOUT deleting old data?',
          options: [
            'APPEND',
            'WRITE',
            'READ',
            'ADD'
          ],
          answer: 0,
          explanation: '**APPEND** mode adds new data to the end of the file while keeping all existing content. WRITE mode would **erase** the old content first!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Open a file for reading, then close it properly.',
          codeTemplate: '___ "scores.txt" ___ READ\n// ... read data ...\n___ "scores.txt"',
          fillBlanks: [
            { id: 1, answer: "OPENFILE", options: ["OPENFILE", "OPEN", "FILE", "READFILE"] },
            { id: 2, answer: "FOR", options: ["FOR", "IN", "AS", "TO"] },
            { id: 3, answer: "CLOSEFILE", options: ["CLOSEFILE", "CLOSE", "ENDFILE", "DONE"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "Reading and Writing Files",
      emoji: "📝",
      steps: [
        {
          id: "ch2-write",
          type: "explain",
          title: "✍️ WRITEFILE: Saving Data",
          content: `**WRITEFILE** writes a line of data to a file:

\`\`\`
OPENFILE "names.txt" FOR WRITE
WRITEFILE "names.txt", "Alice"
WRITEFILE "names.txt", "Bob"
WRITEFILE "names.txt", "Carol"
CLOSEFILE "names.txt"
\`\`\`

After running this, the file \`names.txt\` contains:
\`\`\`
Alice
Bob
Carol
\`\`\`

Each WRITEFILE adds one line to the file.

**Important:** Opening with **WRITE** mode erases the old file! If names.txt already had data, it would be replaced.

To keep old data and add new lines, use **APPEND**:
\`\`\`
OPENFILE "names.txt" FOR APPEND
WRITEFILE "names.txt", "Dave"
CLOSEFILE "names.txt"
\`\`\`

Now the file has: Alice, Bob, Carol, **Dave**`
        },
        {
          id: "ch2-read",
          type: "explain",
          title: "📖 READFILE: Loading Data",
          content: `**READFILE** reads one line from a file into a variable:

\`\`\`
DECLARE name : STRING
OPENFILE "names.txt" FOR READ
READFILE "names.txt", name
OUTPUT name
READFILE "names.txt", name
OUTPUT name
CLOSEFILE "names.txt"
\`\`\`

Output (assuming the file has Alice, Bob, Carol):
\`\`\`
Alice
Bob
\`\`\`

Each READFILE reads the **next** line. It automatically moves to the next line after each read.

To read **all lines** in a file, use a loop with **EOF** (End Of File):

\`\`\`
DECLARE line : STRING
OPENFILE "names.txt" FOR READ
WHILE NOT EOF("names.txt")
    READFILE "names.txt", line
    OUTPUT line
ENDWHILE
CLOSEFILE "names.txt"
\`\`\`

**EOF("filename")** returns TRUE when there are no more lines to read.`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'What does `EOF("data.txt")` return?',
          options: [
            'TRUE when all lines have been read (end of file reached)',
            'The last line of the file',
            'The number of lines in the file',
            'FALSE when the file is empty'
          ],
          answer: 0,
          explanation: '**EOF** stands for "End Of File". It returns **TRUE** when there are no more lines to read. It is used in a WHILE loop condition to read through an entire file.'
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `A file called "colors.txt" contains:
\`\`\`
Red
Green
Blue
\`\`\`

What does this pseudocode output?

\`\`\`
DECLARE color : STRING
OPENFILE "colors.txt" FOR READ
READFILE "colors.txt", color
READFILE "colors.txt", color
OUTPUT color
CLOSEFILE "colors.txt"
\`\`\``,
          options: [
            'Green',
            'Red',
            'Blue',
            'Red Green'
          ],
          answer: 0,
          explanation: 'The first READFILE reads "Red" into color. The second READFILE reads the next line "Green" into color (overwriting "Red"). OUTPUT displays **Green**.'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the code to read all lines from a file.',
          codeTemplate: 'DECLARE line : STRING\nOPENFILE "data.txt" FOR ___\nWHILE NOT ___(\"data.txt\")\n    ___ "data.txt", line\n    OUTPUT line\nENDWHILE\nCLOSEFILE "data.txt"',
          fillBlanks: [
            { id: 1, answer: "READ", options: ["READ", "WRITE", "APPEND", "OPEN"] },
            { id: 2, answer: "EOF", options: ["EOF", "END", "DONE", "EMPTY"] },
            { id: 3, answer: "READFILE", options: ["READFILE", "READ", "INPUT", "GETLINE"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "File Handling Patterns",
      emoji: "🔄",
      steps: [
        {
          id: "ch3-pattern",
          type: "explain",
          title: "🔄 Common File Patterns",
          content: `**Pattern 1: Save array data to a file**
\`\`\`
DECLARE names : ARRAY[1:3] OF STRING
names[1] ← "Alice"
names[2] ← "Bob"
names[3] ← "Carol"

OPENFILE "students.txt" FOR WRITE
FOR i ← 1 TO 3
    WRITEFILE "students.txt", names[i]
NEXT i
CLOSEFILE "students.txt"
\`\`\`

**Pattern 2: Load file data into an array**
\`\`\`
DECLARE names : ARRAY[1:3] OF STRING
DECLARE count : INTEGER
count ← 0

OPENFILE "students.txt" FOR READ
WHILE NOT EOF("students.txt")
    count ← count + 1
    READFILE "students.txt", names[count]
ENDWHILE
CLOSEFILE "students.txt"
\`\`\`

**Pattern 3: Append a log entry**
\`\`\`
OPENFILE "log.txt" FOR APPEND
WRITEFILE "log.txt", "User logged in at 10:30"
CLOSEFILE "log.txt"
\`\`\``
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'What happens if you open an existing file with `OPENFILE "data.txt" FOR WRITE` and then write to it?',
          options: [
            'The old content is erased and replaced with the new data',
            'The new data is added to the end of the file',
            'An error occurs because the file already exists',
            'The old content is backed up automatically'
          ],
          answer: 0,
          explanation: '**WRITE** mode always starts fresh. The old file content is **erased** and replaced with whatever you write. To keep old data, use **APPEND** instead!'
        },
        {
          id: "ch3-predict2",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What is in "output.txt" after this code runs?

\`\`\`
OPENFILE "output.txt" FOR WRITE
WRITEFILE "output.txt", "Line A"
WRITEFILE "output.txt", "Line B"
CLOSEFILE "output.txt"

OPENFILE "output.txt" FOR APPEND
WRITEFILE "output.txt", "Line C"
CLOSEFILE "output.txt"
\`\`\``,
          options: [
            'Line A, Line B, Line C (3 lines)',
            'Line C only (1 line)',
            'Line A, Line B only (2 lines)',
            'Error: file already exists'
          ],
          answer: 0,
          explanation: 'First, WRITE mode creates the file with "Line A" and "Line B". Then APPEND mode adds "Line C" to the end. The file ends up with all **3 lines**: Line A, Line B, Line C.'
        },
        {
          id: "ch3-fill3",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the code to save 5 scores to a file.',
          codeTemplate: 'DECLARE scores : ARRAY[1:5] OF INTEGER\nscores[1] ← 85\nscores[2] ← 92\nscores[3] ← 78\nscores[4] ← 95\nscores[5] ← 88\n\n___ "scores.txt" FOR ___\nFOR i ← 1 TO 5\n    ___ "scores.txt", scores[i]\nNEXT i\nCLOSEFILE "scores.txt"',
          fillBlanks: [
            { id: 1, answer: "OPENFILE", options: ["OPENFILE", "OPEN", "FILE", "CREATE"] },
            { id: 2, answer: "WRITE", options: ["WRITE", "READ", "APPEND", "SAVE"] },
            { id: 3, answer: "WRITEFILE", options: ["WRITEFILE", "WRITE", "OUTPUT", "SAVEFILE"] }
          ]
        }
      ]
    }
  ]
}
