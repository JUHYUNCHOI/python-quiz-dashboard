import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "성적 관리 시스템",
  emoji: "📊",
  steps: [
    {
      id: "ch4-0",
      type: "explain",
      title: "💭 생각해보기: 학생 데이터",
      content: `![학생 데이터](/lessons/l27/ch4-0-data.png)

💭 학생 4명의 국어, 영어, 수학 점수를 저장하려면? 리스트 안에 딕셔너리를 넣으면 **표**처럼 관리할 수 있어!

\`\`\`python
students = [
    {'name': '철수', 'kor': 85, 'eng': 92, 'math': 78},
    {'name': '영희', 'kor': 95, 'eng': 88, 'math': 92},
]
# students[0]['name'] → '철수'
\`\`\`

@핵심: **리스트 + 딕셔너리** 조합으로 표 형태 데이터를 저장!`
    },
    {
      id: "ch4-1",
      type: "tryit",
      title: "📊 성적표 출력!",
      task: "빈칸을 채워서 각 학생의 평균과 등급을 출력하세요!",
      initialCode: `students = [
    {'name': '철수', 'kor': 85, 'eng': 92, 'math': 78},
    {'name': '영희', 'kor': 95, 'eng': 88, 'math': 92},
    {'name': '민수', 'kor': 72, 'eng': 65, 'math': 80},
    {'name': '지영', 'kor': 88, 'eng': 95, 'math': 90},
]

for s in students:
    avg = (s['kor'] + s['eng'] + s['___']) / 3

    if avg >= 90:
        grade = 'A'
    elif avg >= ___:
        grade = 'B'
    else:
        grade = 'C'

    print(f'{s["___"]}: 평균 {avg:.1f} → {grade}')`,
      expectedOutput: `철수: 평균 85.0 → B\n영희: 평균 91.7 → A\n민수: 평균 72.3 → C\n지영: 평균 91.0 → A`,
      hint: "3과목 평균! 90이상 A, 80이상 B, 나머지 C!",
      hint2: "math / 80 / name"
    },
    {
      id: "ch4-2",
      type: "explain",
      title: "💭 생각해보기: 과목별 분석",
      content: `![과목별 분석](/lessons/l27/ch4-2-analysis.png)

💭 학생별 성적은 봤는데... **과목별 평균**은 어떻게 구하지? 국어 점수만 쏙쏙 뽑아서 평균을 내야 하는데!

\`\`\`python
# 리스트 컴프리헨션으로 한 과목만 뽑기!
kor_scores = [s['kor'] for s in students]
# [85, 95, 72, 88]

avg = sum(kor_scores) / len(kor_scores)
\`\`\`

@핵심: **리스트 컴프리헨션**으로 특정 과목 점수만 뽑아서 평균!`
    },
    {
      id: "ch4-3",
      type: "mission",
      title: "🎯 미션: 과락 학생 찾기!",
      task: "빈칸 3개를 채워서 과락(70점 미만) 과목이 있는 학생을 찾으세요!",
      initialCode: `students = [
    {'name': '철수', 'kor': 85, 'eng': 92, 'math': 78},
    {'name': '영희', 'kor': 95, 'eng': 88, 'math': 92},
    {'name': '민수', 'kor': 72, 'eng': 65, 'math': 80},
    {'name': '지영', 'kor': 88, 'eng': 95, 'math': 90},
]

subjects = {'kor': '국어', 'eng': '영어', '___': '수학'}

print('=== 과락 확인 ===')
for s in students:
    fails = []
    for key, name in subjects.___():
        if s[key] ___ 70:
            fails.append(f'{name}({s[key]})')

    if fails:
        print(f'{s["name"]}: {", ".join(fails)}')
    else:
        print(f'{s["name"]}: 과락 없음')`,
      expectedOutput: `=== 과락 확인 ===\n철수: 과락 없음\n영희: 과락 없음\n민수: 영어(65)\n지영: 과락 없음`,
      hint: "70점 미만이 과락! 딕셔너리의 .items()로 과목 순회!",
      hint2: "math / items / <"
    }
  ]
}
