// ============================================
// Pseudocode Lesson P2: Combined Project 2 (English)
// CIE Style Pseudocode - Student Grade Management System!
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP2EnData: LessonData = {
  id: "pseudo-p2",
  title: "Combined Project 2",
  emoji: "🏆",
  description: "Student grade management system!",
  chapters: [
    {
      id: "ch1",
      title: "Grade Management System",
      emoji: "🎓",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎓 The Project: Student Grade Manager",
          content: `Let's build a **Student Grade Management System** that combines everything from Part 2!

The system will:
1. Store student names and scores in a **2D structure**
2. Use a **CASE statement** for menu navigation
3. Use **procedures and functions** for organization
4. Use **string handling** to format output
5. Use **file handling** to save and load data
6. Use **BYREF parameters** to modify data

This is a realistic project that ties together all Part 2 concepts!`
        },
        {
          id: "ch1-structure",
          type: "explain",
          title: "📋 Data Structure",
          content: `We'll use a 2D array to store scores for 3 students across 4 subjects:

\`\`\`
DECLARE names : ARRAY[1:3] OF STRING
DECLARE scores : ARRAY[1:3, 1:4] OF INTEGER

names[1] ← "Alice"
names[2] ← "Bob"
names[3] ← "Carol"

// Alice's scores
scores[1, 1] ← 85
scores[1, 2] ← 92
scores[1, 3] ← 78
scores[1, 4] ← 90
// Bob's scores
scores[2, 1] ← 70
scores[2, 2] ← 65
scores[2, 3] ← 80
scores[2, 4] ← 75
// Carol's scores
scores[3, 1] ← 95
scores[3, 2] ← 88
scores[3, 3] ← 92
scores[3, 4] ← 97
\`\`\`

Each row represents a student, each column is a subject.`
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'In the grade management system, what does `scores[2, 3]` represent?',
          options: [
            'Bob\'s 3rd subject score (80)',
            'Carol\'s 2nd subject score (88)',
            'Alice\'s 3rd subject score (78)',
            'Bob\'s 2nd subject score (65)'
          ],
          answer: 0,
          explanation: 'Row 2 is Bob, column 3 is the 3rd subject. So `scores[2, 3]` is **Bob\'s 3rd subject score**, which is **80**.'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Declare the 2D array for 3 students and 4 subjects.',
          codeTemplate: 'DECLARE names : ARRAY[1:3] OF STRING\nDECLARE scores : ___[1:3, ___] OF ___',
          fillBlanks: [
            { id: 1, answer: "ARRAY", options: ["ARRAY", "TABLE", "GRID", "LIST"] },
            { id: 2, answer: "1:4", options: ["1:4", "4", "1:3", "0:3"] },
            { id: 3, answer: "INTEGER", options: ["INTEGER", "REAL", "STRING", "NUMBER"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "Functions and Procedures",
      emoji: "🔧",
      steps: [
        {
          id: "ch2-average",
          type: "explain",
          title: "🔧 Average Calculation Function",
          content: `Let's create a function to calculate a student's average:

\`\`\`
FUNCTION CalcAverage(scores : ARRAY, student : INTEGER) RETURNS REAL
    DECLARE total : INTEGER
    total ← 0
    FOR col ← 1 TO 4
        total ← total + scores[student, col]
    NEXT col
    RETURN total / 4
ENDFUNCTION
\`\`\`

And a function to determine the grade letter:

\`\`\`
FUNCTION GetGrade(average : REAL) RETURNS STRING
    DECLARE tens : INTEGER
    tens ← average DIV 10
    CASE OF tens
        10 : RETURN "A+"
        9  : RETURN "A"
        8  : RETURN "B"
        7  : RETURN "C"
        6  : RETURN "D"
        OTHERWISE : RETURN "F"
    ENDCASE
ENDFUNCTION
\`\`\`

Notice how the **CASE statement** makes the grade logic clean, and the **FUNCTION** returns a value we can use elsewhere!`
        },
        {
          id: "ch2-procedure",
          type: "explain",
          title: "📋 Display Procedure",
          content: `Now a procedure to display one student's report:

\`\`\`
PROCEDURE ShowReport(names : ARRAY, scores : ARRAY, student : INTEGER)
    DECLARE avg : REAL
    avg ← CalcAverage(scores, student)
    DECLARE grade : STRING
    grade ← GetGrade(avg)

    OUTPUT "=========================="
    OUTPUT "Student: " & UCASE(names[student])
    OUTPUT "Scores: " & scores[student, 1] & ", " & scores[student, 2] & ", " & scores[student, 3] & ", " & scores[student, 4]
    OUTPUT "Average: " & avg
    OUTPUT "Grade: " & grade
    OUTPUT "=========================="
ENDPROCEDURE
\`\`\`

Notice:
- The procedure **calls** the CalcAverage function
- It also **calls** the GetGrade function
- \`UCASE()\` converts the student name to uppercase for display
- A procedure is used because we just display (no return value needed)`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Why is CalcAverage a FUNCTION and ShowReport a PROCEDURE?',
          options: [
            'CalcAverage needs to return a value (the average); ShowReport just displays output',
            'Procedures are faster than functions',
            'Functions cannot use OUTPUT statements',
            'There is no specific reason; they could be swapped'
          ],
          answer: 0,
          explanation: '**CalcAverage** calculates and **returns** a number (REAL), so it must be a FUNCTION. **ShowReport** only displays information (no value to return), so it is a PROCEDURE.'
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `Given Alice's scores: 85, 92, 78, 90. What does GetGrade return for Alice?

\`\`\`
average ← (85 + 92 + 78 + 90) / 4
grade ← GetGrade(average)
OUTPUT grade
\`\`\``,
          options: [
            'B',
            'A',
            'C',
            'A+'
          ],
          answer: 0,
          explanation: 'Alice\'s total is 85 + 92 + 78 + 90 = 345. Average = 345 / 4 = 86.25. `tens = 86.25 DIV 10 = 8`. CASE matches 8, so the grade is **"B"**.'
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the function that returns a grade based on the average.',
          codeTemplate: '___ GetGrade(average : REAL) ___ STRING\n    DECLARE tens : INTEGER\n    tens ← average DIV 10\n    CASE OF tens\n        10 : RETURN "A+"\n        9  : RETURN "A"\n        8  : RETURN "B"\n        OTHERWISE : RETURN "C"\n    ___\nENDFUNCTION',
          fillBlanks: [
            { id: 1, answer: "FUNCTION", options: ["FUNCTION", "PROCEDURE", "DEF", "SUB"] },
            { id: 2, answer: "RETURNS", options: ["RETURNS", "RETURN", "GIVES", "TYPE"] },
            { id: 3, answer: "ENDCASE", options: ["ENDCASE", "ENDIF", "END", "ENDFUNCTION"] }
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "Comprehensive Review",
      emoji: "📝",
      steps: [
        {
          id: "ch3-menu",
          type: "explain",
          title: "📝 The Menu System",
          content: `Here is the main menu using a CASE statement and REPEAT loop:

\`\`\`
DECLARE choice : INTEGER

REPEAT
    OUTPUT "=== Grade Manager ==="
    OUTPUT "1. View student report"
    OUTPUT "2. Find highest scorer"
    OUTPUT "3. Save data to file"
    OUTPUT "4. Exit"
    OUTPUT "Enter choice: "
    INPUT choice

    CASE OF choice
        1 : CALL ShowReport(names, scores, 1)
        2 : CALL FindHighest(names, scores)
        3 : CALL SaveToFile(names, scores)
        4 : OUTPUT "Goodbye!"
        OTHERWISE : OUTPUT "Invalid choice!"
    ENDCASE
UNTIL choice = 4
\`\`\`

This combines:
- **REPEAT...UNTIL** loop for the menu cycle
- **CASE** statement for clean menu selection
- **CALL** to run different procedures
- **INPUT/OUTPUT** for user interaction`
        },
        {
          id: "ch3-save",
          type: "explain",
          title: "💾 Saving Data to a File",
          content: `Here is the procedure to save all student data to a file:

\`\`\`
PROCEDURE SaveToFile(names : ARRAY, scores : ARRAY)
    OPENFILE "grades.txt" FOR WRITE
    FOR student ← 1 TO 3
        WRITEFILE "grades.txt", names[student]
        FOR col ← 1 TO 4
            WRITEFILE "grades.txt", scores[student, col]
        NEXT col
    NEXT student
    CLOSEFILE "grades.txt"
    OUTPUT "Data saved successfully!"
ENDPROCEDURE
\`\`\`

This writes to the file:
\`\`\`
Alice
85
92
78
90
Bob
70
...
\`\`\`

Each student's name is followed by their 4 scores, using **nested loops** and **file handling** together.`
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'In the SaveToFile procedure, how many total lines are written to the file for 3 students with 4 scores each?',
          options: [
            '15 lines (3 names + 12 scores)',
            '12 lines (just the scores)',
            '3 lines (just the names)',
            '7 lines (3 + 4)'
          ],
          answer: 0,
          explanation: 'For each of the 3 students, we write 1 name + 4 scores = 5 lines. Total: 3 x 5 = **15 lines**.'
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🧠 Part 2 Review: BYVAL vs BYREF",
          content: 'A procedure updates a student\'s score. Which parameter passing method is needed?',
          options: [
            'BYREF, because the original score must be changed',
            'BYVAL, because we only need to read the score',
            'Either one works the same way',
            'BYREF for reading, BYVAL for writing'
          ],
          answer: 0,
          explanation: 'To **update** the original score, we need **BYREF** so changes inside the procedure affect the original variable. BYVAL would only change a copy!'
        },
        {
          id: "ch3-quiz3",
          type: "quiz",
          title: "🧠 Part 2 Review: String Functions",
          content: 'What does `SUBSTRING(UCASE("computer"), 1, 4)` return?',
          options: [
            '"COMP"',
            '"comp"',
            '"COMPUTER"',
            '"Computer"'
          ],
          answer: 0,
          explanation: 'First, `UCASE("computer")` gives "COMPUTER". Then `SUBSTRING("COMPUTER", 1, 4)` extracts the first 4 characters: **"COMP"**. Remember: CIE uses 1-based indexing!'
        },
        {
          id: "ch3-predict2",
          type: "predict",
          title: "🔮 Final Challenge!",
          content: `What does this combined pseudocode output?

\`\`\`
FUNCTION GetInitial(name : STRING) RETURNS STRING
    RETURN UCASE(SUBSTRING(name, 1, 1))
ENDFUNCTION

PROCEDURE ShowInitials(BYVAL name1 : STRING, BYVAL name2 : STRING)
    DECLARE result : STRING
    result ← GetInitial(name1) & GetInitial(name2)
    OUTPUT result
ENDPROCEDURE

CALL ShowInitials("alice", "bob")
\`\`\``,
          options: [
            'AB',
            'ab',
            'Alice Bob',
            'aAbB'
          ],
          answer: 0,
          explanation: '`GetInitial("alice")` extracts "a" then UCASE gives "A". `GetInitial("bob")` extracts "b" then UCASE gives "B". Concatenated: **"AB"**. This combines FUNCTION, PROCEDURE, SUBSTRING, UCASE, and BYVAL!'
        },
        {
          id: "ch3-fill3",
          type: "fillblank",
          title: "✏️ Final Fill-in!",
          content: 'Complete the procedure that loads student names from a file into an array.',
          codeTemplate: 'PROCEDURE LoadNames(BYREF names : ARRAY)\n    DECLARE count : INTEGER\n    count ← 0\n    ___ "students.txt" FOR READ\n    WHILE NOT ___("students.txt")\n        count ← count + 1\n        ___ "students.txt", names[count]\n    ENDWHILE\n    CLOSEFILE "students.txt"\nENDPROCEDURE',
          fillBlanks: [
            { id: 1, answer: "OPENFILE", options: ["OPENFILE", "OPEN", "FILE", "READ"] },
            { id: 2, answer: "EOF", options: ["EOF", "END", "DONE", "EMPTY"] },
            { id: 3, answer: "READFILE", options: ["READFILE", "READ", "INPUT", "GETLINE"] }
          ]
        }
      ]
    }
  ]
}
