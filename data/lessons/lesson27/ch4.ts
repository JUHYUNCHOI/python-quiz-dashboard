import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "성적 관리 시스템",
  emoji: "📊",
  steps: [
    {
      id: "ch4-0",
      type: "tryit",
      title: "📊 성적 관리 프로그램!",
      task: "리스트와 딕셔너리로 성적 관리 시스템을 실행해보세요!",
      initialCode: `# 학생 데이터 (input() 대신 고정값!)
students = [
    {'name': '철수', 'kor': 85, 'eng': 92, 'math': 78},
    {'name': '영희', 'kor': 95, 'eng': 88, 'math': 92},
    {'name': '민수', 'kor': 72, 'eng': 65, 'math': 80},
    {'name': '지영', 'kor': 88, 'eng': 95, 'math': 90},
]

print('=== 성적표 ===')
print(f'{"이름":>4} {"국어":>4} {"영어":>4} {"수학":>4} {"평균":>6} {"등급":>2}')
print('-' * 30)

for s in students:
    avg = (s['kor'] + s['eng'] + s['math']) / 3

    if avg >= 90:
        grade = 'A'
    elif avg >= 80:
        grade = 'B'
    elif avg >= 70:
        grade = 'C'
    else:
        grade = 'D'

    print(f'{s["name"]:>4} {s["kor"]:>4} {s["eng"]:>4} {s["math"]:>4} {avg:>6.1f} {grade:>2}')

# 과목별 평균
print('\\n=== 과목별 평균 ===')
for subject in ['kor', 'eng', 'math']:
    scores = [s[subject] for s in students]
    avg = sum(scores) / len(scores)
    name = {'kor': '국어', 'eng': '영어', 'math': '수학'}[subject]
    print(f'{name}: {avg:.1f}')

# 수석
all_avgs = [(s['name'], (s['kor']+s['eng']+s['math'])/3) for s in students]
top = max(all_avgs, key=lambda x: x[1])
print(f'\\n수석: {top[0]} ({top[1]:.1f}점)')`,
      expectedOutput: `=== 성적표 ===\n  이름   국어   영어   수학     평균 등급\n------------------------------\n  철수   85   92   78   85.0  B\n  영희   95   88   92   91.7  A\n  민수   72   65   80   72.3  C\n  지영   88   95   90   91.0  A\n\n=== 과목별 평균 ===\n국어: 85.0\n영어: 85.0\n수학: 85.0\n\n수석: 영희 (91.7점)`,
      hint: "딕셔너리 리스트로 학생 데이터를 관리해요!",
      hint2: "for문으로 순회하면서 평균과 등급을 계산!"
    },
    {
      id: "ch4-1",
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
