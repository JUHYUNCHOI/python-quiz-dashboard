// ============================================
// Pseudocode Lesson 23: Record Types (English)
// CIE Style Pseudocode - Create your own data structures!
// ============================================

import { LessonData } from '../types'

export const pseudoLesson23EnData: LessonData = {
  id: "pseudo-23",
  title: "Record Types",
  emoji: "🏗️",
  description: "Create your own data structures!",
  chapters: [
    {
      id: "ch1",
      title: "TYPE...ENDTYPE",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 Why Do We Need Custom Types?",
          content: `Imagine you need to store information about a student: their **name**, **age**, and **grade**.

You could use separate variables:
\`\`\`
DECLARE studentName : STRING
DECLARE studentAge : INTEGER
DECLARE studentGrade : CHAR
\`\`\`

But what if you have **30 students**? That's 90 separate variables! And they are not linked together in any way.

A **record type** lets you group related data into **one custom data structure**:

| Separate Variables | Record Type |
|---|---|
| studentName, studentAge, studentGrade | ONE Student record |
| 3 unlinked variables per student | All fields bundled together |
| 90 variables for 30 students | 30 records for 30 students |

Records keep related data **together** and make code much easier to manage!`
        },
        {
          id: "ch1-syntax",
          type: "explain",
          title: "📝 Defining a Record with TYPE",
          content: `To create a custom record type, use **TYPE...ENDTYPE**:

\`\`\`
TYPE Student
    DECLARE name : STRING
    DECLARE age : INTEGER
    DECLARE grade : CHAR
ENDTYPE
\`\`\`

This **defines** a new data type called \`Student\`. It does NOT create a variable yet!

Think of it like a **blueprint**:
- The TYPE block describes what fields every Student record will have
- Each field has a **name** and a **data type**
- You can have as many fields as you need

Another example - a record for a product:
\`\`\`
TYPE Product
    DECLARE productID : INTEGER
    DECLARE description : STRING
    DECLARE price : REAL
    DECLARE inStock : BOOLEAN
ENDTYPE
\`\`\`

The TYPE definition usually goes at the **top** of your program, before the main code.`
        },
        {
          id: "ch1-using",
          type: "explain",
          title: "🔧 Declaring and Using Record Variables",
          content: `After defining a TYPE, you can **declare variables** of that type and use **dot notation** to access fields:

\`\`\`
TYPE Student
    DECLARE name : STRING
    DECLARE age : INTEGER
    DECLARE grade : CHAR
ENDTYPE

DECLARE pupil : Student

pupil.name ← "Alice"
pupil.age ← 15
pupil.grade ← 'A'

OUTPUT pupil.name
OUTPUT pupil.age
OUTPUT pupil.grade
\`\`\`

Output:
\`\`\`
Alice
15
A
\`\`\`

Key points:
- \`DECLARE pupil : Student\` creates a variable of type Student
- Use **dot notation** (\`pupil.name\`) to access each field
- Each field behaves like a normal variable of its declared type
- You can read from and write to fields just like any variable`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
TYPE Book
    DECLARE title : STRING
    DECLARE pages : INTEGER
    DECLARE fiction : BOOLEAN
ENDTYPE

DECLARE myBook : Book
myBook.title ← "Python Guide"
myBook.pages ← 320
myBook.fiction ← FALSE

OUTPUT myBook.title
OUTPUT myBook.pages
OUTPUT myBook.fiction
\`\`\``,
          options: [
            'Python Guide\n320\nFALSE',
            'Book\ntitle\npages',
            'myBook\n320\nTRUE',
            'Error - cannot use BOOLEAN in a record'
          ],
          answer: 0,
          explanation: 'The record \`myBook\` is created with title "Python Guide", pages 320, and fiction FALSE. Dot notation accesses each field, so the output is **Python Guide**, **320**, and **FALSE** on separate lines.'
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: 'Which TYPE declaration correctly represents a **Book** record with a title (text), page count (whole number), and price (decimal)?',
          options: [
            'TYPE Book\n    DECLARE title : STRING\n    DECLARE pages : INTEGER\n    DECLARE price : REAL\nENDTYPE',
            'TYPE Book\n    title = STRING\n    pages = INTEGER\n    price = REAL\nENDTYPE',
            'RECORD Book\n    DECLARE title : STRING\n    DECLARE pages : INTEGER\n    DECLARE price : REAL\nENDRECORD',
            'TYPE Book\n    DECLARE title : CHAR\n    DECLARE pages : REAL\n    DECLARE price : INTEGER\nENDTYPE'
          ],
          answer: 0,
          explanation: 'The correct CIE pseudocode syntax uses **TYPE...ENDTYPE** with **DECLARE** for each field. Title should be STRING (not CHAR, which is a single character), pages should be INTEGER (whole number), and price should be REAL (decimal number).'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the TYPE declaration for an Employee record with a name, salary, and department.',
          codeTemplate: '___ Employee\n    DECLARE name : STRING\n    DECLARE salary : ___\n    DECLARE department : STRING\n___',
          fillBlanks: [
            { id: 1, answer: "TYPE", options: ["TYPE", "RECORD", "STRUCT", "CLASS"] },
            { id: 2, answer: "REAL", options: ["REAL", "INTEGER", "STRING", "NUMBER"] },
            { id: 3, answer: "ENDTYPE", options: ["ENDTYPE", "ENDRECORD", "END TYPE", "END"] }
          ]
        },
      ]
    },
    {
      id: "ch2",
      title: "Records and Arrays",
      emoji: "📊",
      steps: [
        {
          id: "ch2-array",
          type: "explain",
          title: "📊 Arrays of Records",
          content: `The real power of records comes when you combine them with **arrays**!

\`\`\`
TYPE Student
    DECLARE name : STRING
    DECLARE age : INTEGER
    DECLARE grade : CHAR
ENDTYPE

DECLARE students : ARRAY[1:30] OF Student
\`\`\`

This creates an array of 30 Student records. Each element in the array is a complete Student record with all its fields.

Assigning values:
\`\`\`
students[1].name ← "Alice"
students[1].age ← 15
students[1].grade ← 'A'

students[2].name ← "Bob"
students[2].age ← 16
students[2].grade ← 'B'
\`\`\`

Think of it as a **table**:

| Index | .name | .age | .grade |
|---|---|---|---|
| 1 | Alice | 15 | A |
| 2 | Bob | 16 | B |
| 3 | ... | ... | ... |

Each row is one record, each column is one field!`
        },
        {
          id: "ch2-loop",
          type: "explain",
          title: "🔄 Looping Through Record Arrays",
          content: `You can use a FOR loop to process every record in the array:

\`\`\`
// Output all student names and grades
FOR i ← 1 TO 30
    OUTPUT students[i].name, " - Grade: ", students[i].grade
NEXT i
\`\`\`

A more practical example - calculating the **average age**:

\`\`\`
DECLARE totalAge : INTEGER
totalAge ← 0

FOR i ← 1 TO 30
    totalAge ← totalAge + students[i].age
NEXT i

DECLARE averageAge : REAL
averageAge ← totalAge / 30
OUTPUT "Average age: ", averageAge
\`\`\`

Key pattern: use \`arrayName[index].fieldName\` to access a specific field of a specific record.`
        },
        {
          id: "ch2-search",
          type: "explain",
          title: "🔍 Searching an Array of Records",
          content: `A very common exam question: search for a record by one of its fields.

Example - find a student by name:

\`\`\`
FUNCTION FindStudent(students : ARRAY, size : INTEGER, searchName : STRING) RETURNS INTEGER
    FOR i ← 1 TO size
        IF students[i].name = searchName THEN
            RETURN i
        ENDIF
    NEXT i
    RETURN -1
ENDFUNCTION
\`\`\`

Using the function:
\`\`\`
DECLARE position : INTEGER
position ← FindStudent(students, 30, "Carol")

IF position <> -1 THEN
    OUTPUT "Found! Grade: ", students[position].grade
ELSE
    OUTPUT "Student not found."
ENDIF
\`\`\`

This is a **linear search** applied to records - you search by comparing one **field** of each record to the target value.`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 Predict the output!",
          content: `What does this pseudocode output?

\`\`\`
TYPE Item
    DECLARE name : STRING
    DECLARE price : REAL
ENDTYPE

DECLARE shop : ARRAY[1:3] OF Item
shop[1].name ← "Pen"
shop[1].price ← 1.50
shop[2].name ← "Book"
shop[2].price ← 8.99
shop[3].name ← "Ruler"
shop[3].price ← 2.25

DECLARE total : REAL
total ← 0

FOR i ← 1 TO 3
    IF shop[i].price > 2.00 THEN
        total ← total + shop[i].price
        OUTPUT shop[i].name
    ENDIF
NEXT i

OUTPUT total
\`\`\``,
          options: [
            'Book\nRuler\n11.24',
            'Pen\nBook\nRuler\n12.74',
            'Book\n8.99',
            'Book\nRuler\n12.74'
          ],
          answer: 0,
          explanation: 'The loop checks each item\'s price: Pen (1.50 - not > 2.00, skip), Book (8.99 - yes, total=8.99, output "Book"), Ruler (2.25 - yes, total=8.99+2.25=11.24, output "Ruler"). Final output of total is **11.24**. So the full output is: Book, Ruler, 11.24.'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 Quiz!",
          content: `Given this record array, which code correctly changes the grade of the student at index 5 to 'A'?

\`\`\`
TYPE Student
    DECLARE name : STRING
    DECLARE grade : CHAR
ENDTYPE

DECLARE students : ARRAY[1:30] OF Student
\`\`\``,
          options: [
            'students.grade[5] ← \'A\'',
            'students[5].grade ← \'A\'',
            'Student[5].grade ← \'A\'',
            'grade.students[5] ← \'A\''
          ],
          answer: 1,
          explanation: 'The correct syntax is \`students[5].grade ← \'A\'\`. First you index the array (\`students[5]\`) to get the record, then use dot notation (\`.grade\`) to access the field. The array name comes first, then the index, then the dot and field name.'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ Fill in the blanks!",
          content: 'Complete the function that searches an array of records to find a product by its ID.',
          codeTemplate: 'FUNCTION FindProduct(products : ARRAY, size : INTEGER, searchID : INTEGER) RETURNS INTEGER\n    FOR i ← 1 TO ___\n        IF products[i].___ = searchID THEN\n            RETURN ___\n        ENDIF\n    NEXT i\n    RETURN -1\nENDFUNCTION',
          fillBlanks: [
            { id: 1, answer: "size", options: ["size", "products", "searchID", "LENGTH"] },
            { id: 2, answer: "productID", options: ["productID", "name", "ID", "product"] },
            { id: 3, answer: "i", options: ["i", "-1", "searchID", "products[i]"] }
          ]
        },
      ]
    },
  ]
}
