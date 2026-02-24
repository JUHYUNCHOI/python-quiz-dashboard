// ============================================
// Lesson 30: Grade Management System
// ============================================
import { LessonData } from './types'

export const lesson30EnData: LessonData = {
  id: "30en",
  title: "Grade Management System",
  emoji: "📊",
  description: "Build a report card with lists and dictionaries!",
  chapters: [
    {
      id: "ch1",
      title: "Grade Management System",
      emoji: "📊",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "💭 Think About It: Student Data",
          content: `![Student Data](/lessons/l30/ch1-0-data.png)

💭 How do we store Korean, English, and Math scores for 4 students? Put dictionaries inside a list and you can manage it like a **table**!

\`\`\`python
students = [
    {'name': 'Alice', 'kor': 85, 'eng': 92, 'math': 78},
    {'name': 'Bob', 'kor': 95, 'eng': 88, 'math': 92},
]
# students[0]['name'] → 'Alice'
\`\`\`

@Key idea: Use a **list + dictionary** combo to store table-like data!`
        },
        {
          id: "ch1-1",
          type: "tryit",
          title: "📊 Print the Report Card!",
          task: "Fill in the blanks to print each student's average and grade!",
          initialCode: `students = [
    {'name': 'Alice', 'kor': 85, 'eng': 92, 'math': 78},
    {'name': 'Bob', 'kor': 95, 'eng': 88, 'math': 92},
    {'name': 'Charlie', 'kor': 72, 'eng': 65, 'math': 80},
    {'name': 'Diana', 'kor': 88, 'eng': 95, 'math': 90},
]

for s in students:
    avg = (s['kor'] + s['eng'] + s['___']) / 3

    if avg >= 90:
        grade = 'A'
    elif avg >= ___:
        grade = 'B'
    else:
        grade = 'C'

    print(f'{s["___"]}: avg {avg:.1f} -> {grade}')`,
          expectedOutput: `Alice: avg 85.0 -> B\nBob: avg 91.7 -> A\nCharlie: avg 72.3 -> C\nDiana: avg 91.0 -> A`,
          hint: "Average of 3 subjects! 90+ is A, 80+ is B, rest is C!",
          hint2: "math / 80 / name"
        },
        {
          id: "ch1-2",
          type: "explain",
          title: "💭 Think About It: Subject Analysis",
          content: `![Subject Analysis](/lessons/l30/ch1-2-analysis.png)

💭 We've seen grades by student... but how do we get the **average by subject**? We need to extract just the Korean scores and compute the average!

\`\`\`python
# Use list comprehension to extract one subject!
kor_scores = [s['kor'] for s in students]
# [85, 95, 72, 88]

avg = sum(kor_scores) / len(kor_scores)
\`\`\`

@Key idea: Use **list comprehension** to extract scores for a specific subject and average them!`
        },
        {
          id: "ch1-3",
          type: "mission",
          title: "🎯 Mission: Find Failing Students!",
          task: "Fill in 3 blanks to find students who have failing subjects (below 70)!",
          initialCode: `students = [
    {'name': 'Alice', 'kor': 85, 'eng': 92, 'math': 78},
    {'name': 'Bob', 'kor': 95, 'eng': 88, 'math': 92},
    {'name': 'Charlie', 'kor': 72, 'eng': 65, 'math': 80},
    {'name': 'Diana', 'kor': 88, 'eng': 95, 'math': 90},
]

subjects = {'kor': 'Korean', 'eng': 'English', '___': 'Math'}

print('=== Fail Check ===')
for s in students:
    fails = []
    for key, name in subjects.___():
        if s[key] ___ 70:
            fails.append(f'{name}({s[key]})')

    if fails:
        print(f'{s["name"]}: {", ".join(fails)}')
    else:
        print(f'{s["name"]}: no fails')`,
          expectedOutput: `=== Fail Check ===\nAlice: no fails\nBob: no fails\nCharlie: English(65)\nDiana: no fails`,
          hint: "Below 70 is a fail! Use .items() to iterate over the dictionary!",
          hint2: "math / items / <"
        }
      ]
    }
  ]
}
