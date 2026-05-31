import { LessonData } from '../types';

export const lesson30: LessonData = {
  id: "30",
  title: "성적 관리 시스템 복습",
  description: "리스트와 딕셔너리로 표 데이터를 다뤄봐!",
  steps: [
    // ==================== CHAPTER 1: 리스트 안의 딕셔너리 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "리스트 안의 딕셔너리",
        desc: "표 형태 데이터 — 학생 명단부터 차근차근!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["학생 한 명 = 딕셔너리 1개, 학생 여러 명 = 딕셔너리들의 리스트!"],
        code: `students = [
    {'name': '철수', 'kor': 85, 'eng': 92},
    {'name': '영희', 'kor': 95, 'eng': 88},
]
# 첫 번째 학생의 이름?
print(students[0]['name'])`,
        result: "철수",
        note: "students[i][키] — 인덱스로 학생 고르고, 키로 속성 꺼내기!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `students = [
    {'name': '철수', 'kor': 85},
    {'name': '영희', 'kor': 95},
    {'name': '민수', 'kor': 72},
]
print(students[2]['kor'])`,
        predict: {
          options: ["85", "95", "72", "에러"],
          answer: 2,
          feedback: "students[2]는 민수 딕셔너리. 그 안의 'kor' 값은 72!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "students = [{'name':'A'}, {'name':'B'}] 일 때 students[1]['name']은?",
        options: ["'A'", "'B'", "['A','B']", "에러"],
        answer: 1,
        explanation: "students[1]은 두 번째 딕셔너리. 그 안의 'name' 값은 'B'!"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "두 번째 학생의 영어 점수를 출력하세요",
        guide: "students[인덱스]['키'] 패턴!",
        hint: "students[1]['eng']!",
        template: `students = [
    {'name': '철수', 'kor': 85, 'eng': 92},
    {'name': '영희', 'kor': 95, 'eng': 88},
]
print(students[___]['eng'])`,
        answer: "1",
        expect: "88"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "모든 학생의 이름을 한 줄씩 출력하세요",
        guide: "for s in students: 로 순회!",
        hint: "for s in students: print(s['name'])",
        template: `students = [
    {'name': '철수', 'kor': 85},
    {'name': '영희', 'kor': 95},
    {'name': '민수', 'kor': 72},
]
for s in ___:
    print(s['___'])`,
        blanksAnswer: ["students", "name"],
        answer: `students = [
    {'name': '철수', 'kor': 85},
    {'name': '영희', 'kor': 95},
    {'name': '민수', 'kor': 72},
]
for s in students:
    print(s['name'])`,
        expect: "철수\n영희\n민수"
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "리스트 안의 딕셔너리",
        learned: [
          "students = [딕셔너리1, 딕셔너리2, ...] 로 표 데이터 저장",
          "students[i]['키'] 로 한 칸 꺼내기",
          "for s in students: 로 순회"
        ],
        canDo: "표 형태 데이터를 만들고 꺼낼 수 있어!",
        emoji: "📋"
      }
    },

    // ==================== CHAPTER 2: 평균/합계 계산 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "평균과 합계",
        desc: "각 학생, 각 과목 평균 구하기!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 sum과 len 복습!",
        task: "리스트 평균을 구하세요",
        template: "nums = [80, 90, 70]\navg = ___(nums) / len(nums)\nprint(avg)",
        answer: "sum",
        expect: "80.0"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["한 학생의 3과목 평균을 구하려면?"],
        code: `s = {'name': '철수', 'kor': 85, 'eng': 92, 'math': 78}
total = s['kor'] + s['eng'] + s['math']
avg = total / 3
print(f'{s["name"]}: {avg:.1f}')`,
        result: "철수: 85.0",
        note: "각 키를 꺼내서 더한 다음 과목 수로 나누면 끝!"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "각 학생의 평균을 출력하세요",
        guide: "for문 + 평균 계산!",
        hint: "총합 / 3 으로 평균!",
        template: `students = [
    {'name': '철수', 'kor': 80, 'eng': 90, 'math': 70},
    {'name': '영희', 'kor': 90, 'eng': 100, 'math': 80},
]
for s in students:
    avg = (s['kor'] + s['eng'] + s['___']) / 3
    print(f'{s["name"]}: {avg:.1f}')`,
        answer: "math",
        expect: "철수: 80.0\n영희: 90.0"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["국어 점수만 모아서 평균을 내려면?"],
        code: `students = [
    {'name': '철수', 'kor': 80},
    {'name': '영희', 'kor': 100},
    {'name': '민수', 'kor': 60},
]
kor_scores = []
for s in students:
    kor_scores.append(s['kor'])
print(kor_scores)
print(sum(kor_scores) / len(kor_scores))`,
        result: "[80, 100, 60]\n80.0",
        note: "한 과목만 뽑아서 리스트 → sum/len 으로 평균!"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "수학 점수만 모아 리스트로 만든 뒤 최댓값을 출력하세요",
        guide: "append + max()!",
        hint: "for문으로 'math' 만 모으고 max(리스트)!",
        template: `students = [
    {'name': '철수', 'math': 70},
    {'name': '영희', 'math': 95},
    {'name': '민수', 'math': 80},
]
math_scores = []
for s in students:
    math_scores.___(s['math'])
print(___(math_scores))`,
        blanksAnswer: ["append", "max"],
        answer: `students = [
    {'name': '철수', 'math': 70},
    {'name': '영희', 'math': 95},
    {'name': '민수', 'math': 80},
]
math_scores = []
for s in students:
    math_scores.append(s['math'])
print(max(math_scores))`,
        expect: "95"
      }
    },
    {
      type: "quiz",
      content: {
        question: "students의 모든 학생의 'kor' 점수 합을 구하는 방법은?",
        options: [
          "sum(students['kor'])",
          "for s in students: total += s['kor']",
          "students.sum('kor')",
          "students + 'kor'"
        ],
        answer: 1,
        explanation: "리스트 안의 딕셔너리는 for문으로 순회하면서 누적해야 해요!"
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "평균과 합계",
        learned: [
          "한 학생 평균: 각 키 값 더해서 과목 수로 나눔",
          "한 과목 평균: for문으로 그 키만 모아서 sum/len",
          "max/min/sum 으로 통계 한 번에"
        ],
        canDo: "표 데이터로 평균/최댓값을 구할 수 있어!",
        emoji: "📊"
      }
    },

    // ==================== CHAPTER 3: 조건/등급 분류 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "조건으로 분류하기",
        desc: "등급 매기기, 과락 찾기!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 if/elif 복습!",
        task: "점수에 따라 등급을 출력하세요 (90↑ A, 80↑ B, 그 외 C)",
        template: `score = 85
if score >= 90:
    print('A')
___ score >= 80:
    print('B')
else:
    print('C')`,
        answer: "elif",
        expect: "B"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["학생 평균으로 등급 매기기!"],
        code: `students = [
    {'name': '철수', 'avg': 92},
    {'name': '영희', 'avg': 75},
]
for s in students:
    if s['avg'] >= 90:
        grade = 'A'
    elif s['avg'] >= 80:
        grade = 'B'
    else:
        grade = 'C'
    print(f'{s["name"]}: {grade}')`,
        result: "철수: A\n영희: C"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `students = [
    {'name': '철수', 'kor': 65},
    {'name': '영희', 'kor': 88},
    {'name': '민수', 'kor': 45},
]
count = 0
for s in students:
    if s['kor'] < 70:
        count += 1
print(count)`,
        predict: {
          question: "70점 미만은 몇 명?",
          options: ["1", "2", "3", "0"],
          answer: 1,
          feedback: "철수(65) + 민수(45) = 2명!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "평균이 80 이상인 학생만 이름을 출력하세요",
        guide: "if 조건문 + 출력!",
        hint: "if s['avg'] >= 80:",
        template: `students = [
    {'name': '철수', 'avg': 92},
    {'name': '영희', 'avg': 75},
    {'name': '민수', 'avg': 85},
]
for s in students:
    if s['avg'] ___ 80:
        print(s['name'])`,
        answer: ">=",
        expect: "철수\n민수"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제는?",
        code: `students = [{'name': '철수', 'kor': 80}]
print(students['kor'])`,
        options: [
          "students는 리스트라서 키로 접근 불가 → 먼저 인덱스로 학생을 꺼내야 함",
          "딕셔너리 문법 오류",
          "print 사용 방법이 잘못됨",
          "문제 없음"
        ],
        answer: 0,
        explanation: "리스트는 정수 인덱스로! students[0]['kor'] 처럼 학생을 먼저 꺼낸 다음 키로 접근해야 해요."
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "students 안에서 'kor' 점수가 가장 높은 학생의 이름을 출력하세요",
        guide: "최댓값 찾기 패턴! 첫 학생을 best로 두고 비교!",
        hint: "best = students[0]; for s in students: if s['kor'] > best['kor']: best = s",
        template: null,
        answer: `students = [
    {'name': '철수', 'kor': 85},
    {'name': '영희', 'kor': 95},
    {'name': '민수', 'kor': 72},
]
best = students[0]
for s in students:
    if s['kor'] > best['kor']:
        best = s
print(best['name'])`,
        alternateAnswers: [
          `students = [{'name':'철수','kor':85},{'name':'영희','kor':95},{'name':'민수','kor':72}]
best = students[0]
for s in students:
    if s['kor'] > best['kor']:
        best = s
print(best['name'])`
        ],
        expect: "영희"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "조건으로 분류하기",
        learned: [
          "if/elif/else 로 점수 → 등급 매핑",
          "조건을 만족하는 학생만 셀 수 있음",
          "최댓값 학생은 'best' 변수로 갱신하면서 찾기"
        ],
        canDo: "조건을 걸어 데이터를 분류할 수 있어!",
        emoji: "🏷️"
      }
    },

    // ==================== CHAPTER 4: 종합 도전 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "종합 도전",
        desc: "지금까지 배운 걸 한 번에!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `students = [
    {'name': '철수', 'kor': 80, 'eng': 70},
    {'name': '영희', 'kor': 90, 'eng': 100},
]
total = 0
for s in students:
    total += s['kor'] + s['eng']
print(total)`,
        predict: {
          options: ["170", "190", "340", "260"],
          answer: 2,
          feedback: "철수: 80+70=150, 영희: 90+100=190 → 합 340!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "students 리스트에서 영어 점수의 평균을 구하는 정확한 코드는?",
        options: [
          "sum(students['eng']) / len(students)",
          "for문으로 'eng' 점수만 모아 sum/len",
          "students.average('eng')",
          "students[eng].mean()"
        ],
        answer: 1,
        explanation: "리스트 안의 딕셔너리에서 한 키 평균은 for문으로 모아서 sum/len! 첫 번째 옵션은 students['eng']가 에러예요."
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "students의 평균 점수 합계를 출력하세요 (각 학생 2과목 평균 → 다 더하기)",
        guide: "for 안에서 평균 계산 + 누적!",
        hint: "avg = (s['kor']+s['eng'])/2 후 total += avg",
        template: `students = [
    {'name': '철수', 'kor': 80, 'eng': 70},
    {'name': '영희', 'kor': 90, 'eng': 100},
]
total = 0
for s in students:
    avg = (s['kor'] + s['eng']) / ___
    total += avg
print(total)`,
        answer: "2",
        expect: "170.0"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 슬라이싱 복습!",
        task: "students 리스트의 처음 2명만 잘라서 출력하세요",
        template: `students = [
    {'name': '철수'}, {'name': '영희'}, {'name': '민수'}
]
print(students[___])`,
        answer: ":2",
        expect: "[{'name': '철수'}, {'name': '영희'}]"
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "70점 미만 점수가 하나라도 있는 학생 이름을 출력하세요",
        guide: "각 학생의 점수 중 하나라도 70 미만이면 출력!",
        hint: "if s['kor'] < 70 or s['eng'] < 70: print(...)",
        template: `students = [
    {'name': '철수', 'kor': 80, 'eng': 65},
    {'name': '영희', 'kor': 90, 'eng': 100},
    {'name': '민수', 'kor': 60, 'eng': 70},
]
for s in students:
    if s['kor'] < 70 ___ s['eng'] < 70:
        print(s['name'])`,
        answer: "or",
        expect: "철수\n민수"
      }
    },
    {
      type: "reward",
      content: {
        emoji: "🏆",
        message: "성적 관리 마스터!"
      }
    },
    {
      type: "summary",
      content: {
        num: 4,
        title: "종합 정리",
        learned: [
          "리스트 안의 딕셔너리 = 표 데이터",
          "students[i][키] 로 한 칸 접근",
          "for문 + 누적으로 평균/합계",
          "if 조건으로 학생 분류",
          "최댓값은 'best' 변수 갱신"
        ],
        canDo: "표 형태 데이터로 다양한 분석을 할 수 있어!",
        emoji: "🎓"
      }
    },

    { type: "done", content: {} }
  ]
};
