import type { LessonData } from '../types'

export const lesson32: LessonData = {
  id: "32",
  title: "내장함수 총정리",
  description: "Level 2 필수 내장함수를 정리해요!",
  steps: [
    // ============================================
    // Chapter 1: len(), sum()
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "len()과 sum()",
        desc: "길이와 합계를 구해요!"
      }
    },
    
    // 빠른 복습
    {
      type: "explain",
      content: {
        lines: ["📏 len() = 몇 개? sum() = 다 더하면?"],
        code: `과자 = ['새우깡', '포카칩', '꼬깔콘']
점수 = [80, 90, 70]

print(len(과자))   # 과자 몇 개?
print(sum(점수))   # 점수 다 더하면?
print(sum(점수) / len(점수))  # 평균!`,
        result: "3\n240\n80.0",
        note: "평균 = 합계 ÷ 개수 → sum() / len()!"
      }
    },
    
    // 예측 퀴즈
    {
      type: "explain",
      content: {
        lines: ["🧠 sum() 시작값 예측!"],
        code: `print(sum([1, 2, 3], 100))`,
        predict: {
          question: "출력 결과는?",
          options: ["6", "106", "[100, 1, 2, 3]", "에러"],
          answer: 1,
          feedback: "100부터 시작해서 더함! 100+1+2+3 = 106"
        },
        result: "106"
      }
    },
    
    // ⭐ 연습 1: 평균 구하기
    {
      type: "practice",
      content: {
        level: 1,
        task: "점수 리스트의 평균을 구하세요",
        guide: "sum() / len() 사용!",
        hint: "합계를 개수로 나누면 평균!",
        template: null,
        answer: "점수 = [80, 90, 70, 85, 95]\n\n평균 = sum(점수) / len(점수)\nprint(f'평균: {평균}')",
        alternateAnswers: [
          "점수 = [80, 90, 70, 85, 95]\n평균 = sum(점수) / len(점수)\nprint(f'평균: {평균}')"
        ],
        expect: "평균: 84.0"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "📏",
        message: "기본 함수 OK!"
      }
    },
    
    // ============================================
    // Chapter 2: max(), min()
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "max()와 min()",
        desc: "최대최소를 찾아요!"
      }
    },
    
    // 설명
    {
      type: "explain",
      content: {
        lines: ["🔝 가장 큰 거! 가장 작은 거!"],
        code: `점수 = [85, 92, 78, 95, 88]

print(f'1등: {max(점수)}점')
print(f'꼴등: {min(점수)}점')
print(f'점수 차이: {max(점수) - min(점수)}점')`,
        result: "1등: 95점\n꼴등: 78점\n점수 차이: 17점",
        note: "max() - min()으로 범위도 알 수 있어요!"
      }
    },
    
    // 예측 퀴즈
    {
      type: "explain",
      content: {
        lines: ["🧠 문자열도 가능?"],
        code: `print(max('apple', 'banana', 'cat'))
print(min('apple', 'banana', 'cat'))`,
        predict: {
          question: "출력 결과는?",
          options: ["banana\napple", "cat\napple", "apple\ncat", "에러"],
          answer: 1,
          feedback: "알파벳 순! a < b < c 니까 max는 cat, min은 apple"
        },
        result: "cat\napple"
      }
    },
    
    // ⭐ 연습 2: 최대최소 활용
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트에서 최대값과 최소값의 차이를 출력하세요",
        guide: "max() - min() 사용!",
        hint: "가장 큰 값에서 가장 작은 값을 빼면?",
        template: null,
        answer: "숫자 = [15, 8, 23, 4, 16]\n\nprint(max(숫자) - min(숫자))",
        alternateAnswers: [
          "숫자 = [15, 8, 23, 4, 16]\nprint(max(숫자) - min(숫자))"
        ],
        expect: "19"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "🔝",
        message: "최대최소 마스터!"
      }
    },
    
    // ============================================
    // Chapter 3: sorted()
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "sorted() 정렬",
        desc: "줄 세우기!"
      }
    },
    
    // 비유로 설명
    {
      type: "explain",
      content: {
        lines: ["📊 줄 세우기! 키 순? 이름 순?"],
        code: `숫자 = [3, 1, 4, 1, 5, 9]

# 작은 순 (오름차순)
print(sorted(숫자))

# 큰 순 (내림차순)
print(sorted(숫자, reverse=True))`,
        result: "[1, 1, 3, 4, 5, 9]\n[9, 5, 4, 3, 1, 1]",
        note: "reverse=True면 거꾸로!"
      }
    },
    
    // 예측 퀴즈
    {
      type: "explain",
      content: {
        lines: ["🧠 점수로 줄 세우기!"],
        code: `학생 = [('철수', 85), ('영희', 92), ('민수', 78)]
결과 = sorted(학생, key=lambda x: x[1])
print(결과[0][0])`,
        predict: {
          question: "맨 앞 학생 이름은?",
          options: ["철수", "영희", "민수", "78"],
          answer: 2,
          feedback: "점수 오름차순 → 78점 민수가 맨 앞!"
        },
        result: "민수"
      }
    },
    
    // ⭐ 연습 3: 정렬 활용
    {
      type: "practice",
      content: {
        level: 2,
        task: "점수 내림차순으로 1등의 이름을 출력하세요",
        guide: "reverse=True로 내림차순!",
        hint: "정렬 후 [0][0]으로 1등 이름!",
        template: null,
        answer: "학생 = [('철수', 85), ('영희', 92), ('민수', 78)]\n\n결과 = sorted(학생, key=lambda x: x[1], reverse=True)\nprint(f'1등: {결과[0][0]}')",
        alternateAnswers: [
          "학생 = [('철수', 85), ('영희', 92), ('민수', 78)]\n결과 = sorted(학생, key=lambda x: x[1], reverse=True)\nprint(f'1등: {결과[0][0]}')"
        ],
        expect: "1등: 영희"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "📊",
        message: "정렬 고수!"
      }
    },
    
    // ============================================
    // Chapter 4: map()
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "map() 변환",
        desc: "한 번에 다 바꾸기!"
      }
    },
    
    // 비유로 설명
    {
      type: "explain",
      content: {
        lines: ["🏭 공장처럼 한 번에 변환!"],
        code: `# 문자열 숫자를 진짜 숫자로!
# '1', '2', '3' → 1, 2, 3

문자 = ['1', '2', '3']
숫자 = list(map(int, 문자))

print(숫자)
print(sum(숫자))`,
        result: "[1, 2, 3]\n6",
        note: "map(함수, 리스트) → 모든 요소에 함수 적용!"
      }
    },
    
    // 예측 퀴즈
    {
      type: "explain",
      content: {
        lines: ["🧠 map() 예측!"],
        code: `숫자 = ['10', '20', '30']
결과 = list(map(int, 숫자))
print(sum(결과))`,
        predict: {
          question: "출력 결과는?",
          options: ["'102030'", "60", "[10, 20, 30]", "에러"],
          answer: 1,
          feedback: "문자→정수 변환 후 합계: 10+20+30=60"
        },
        result: "60"
      }
    },
    
    // ⭐ 연습 4: map() 활용
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "문자열 숫자를 정수로 변환 후 평균을 구하세요",
        guide: "map() + sum() / len()",
        hint: "list(map(int, ...))로 변환!",
        template: null,
        answer: "문자 = ['80', '90', '70']\n\n숫자 = list(map(int, 문자))\nprint(sum(숫자) / len(숫자))",
        alternateAnswers: [
          "문자 = ['80', '90', '70']\n숫자 = list(map(int, 문자))\nprint(sum(숫자) / len(숫자))"
        ],
        expect: "80.0"
      }
    },
    
    // 인터리빙
    {
      type: "interleaving",
      content: {
        message: "🔄 잠깐! max/min 복습!",
        task: "리스트에서 최대값과 최소값의 곱을 출력하세요",
        hint: "max() * min()",
        template: null,
        answer: "숫자 = [2, 5, 1, 8, 3]\n\nprint(max(숫자) * min(숫자))",
        alternateAnswers: [
          "숫자 = [2, 5, 1, 8, 3]\nprint(max(숫자) * min(숫자))"
        ],
        expect: "8"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "🏭",
        message: "map() 마스터!"
      }
    },
    
    // ============================================
    // Chapter 5: filter, enumerate, zip
    // ============================================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "filter, enumerate, zip",
        desc: "더 강력한 내장함수!"
      }
    },
    
    // filter 설명
    {
      type: "explain",
      content: {
        lines: ["🔍 filter() = 조건에 맞는 것만 골라!"],
        code: `숫자 = [1, -2, 3, -4, 5]

# 양수만 골라!
양수 = list(filter(lambda x: x > 0, 숫자))
print(양수)`,
        result: "[1, 3, 5]",
        note: "filter(조건함수, 리스트) → 조건 통과한 것만!"
      }
    },
    
    // 예측 퀴즈: filter
    {
      type: "explain",
      content: {
        lines: ["🧠 filter() 예측!"],
        code: `숫자 = [5, 12, 8, 3, 15, 7]
결과 = list(filter(lambda x: x >= 10, 숫자))
print(결과)`,
        predict: {
          question: "출력 결과는?",
          options: ["[5, 8, 3, 7]", "[12, 15]", "[5, 12, 8, 3, 15, 7]", "에러"],
          answer: 1,
          feedback: "10 이상인 것만! 12, 15가 통과!"
        },
        result: "[12, 15]"
      }
    },
    
    // ⭐ 연습 5: filter 활용
    {
      type: "practice",
      content: {
        level: 2,
        task: "양수만 골라서 합계를 구하세요",
        guide: "filter() + sum()",
        hint: "lambda x: x > 0 조건 사용!",
        template: null,
        answer: "숫자 = [3, -1, 4, -2, 5]\n\n양수 = list(filter(lambda x: x > 0, 숫자))\nprint(sum(양수))",
        alternateAnswers: [
          "숫자 = [3, -1, 4, -2, 5]\n양수 = list(filter(lambda x: x > 0, 숫자))\nprint(sum(양수))"
        ],
        expect: "12"
      }
    },
    
    // enumerate 설명
    {
      type: "explain",
      content: {
        lines: ["🔢 enumerate() = 번호표 붙여!"],
        code: `과일 = ['사과', '바나나', '체리']

for i, f in enumerate(과일):
    print(f'{i}번: {f}')`,
        result: "0번: 사과\n1번: 바나나\n2번: 체리",
        note: "인덱스랑 값을 같이 받을 수 있어요!"
      }
    },
    
    // ⭐ 연습 6: enumerate 활용
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "enumerate로 1번부터 순위 출력하세요",
        guide: "enumerate(리스트, 1)로 1부터 시작!",
        hint: "두 번째 인자로 시작 번호 지정!",
        template: null,
        answer: "학생 = ['철수', '영희', '민수']\n\nfor i, name in enumerate(학생, 1):\n    print(f'{i}등: {name}')",
        alternateAnswers: [
          "학생 = ['철수', '영희', '민수']\nfor i, name in enumerate(학생, 1):\n    print(f'{i}등: {name}')"
        ],
        expect: "1등: 철수\n2등: 영희\n3등: 민수"
      }
    },
    
    // zip 설명
    {
      type: "explain",
      content: {
        lines: ["🤐 zip() = 두 줄을 하나로 묶어!"],
        code: `이름 = ['철수', '영희', '민수']
점수 = [85, 92, 78]

# 이름과 점수를 짝지어!
for name, score in zip(이름, 점수):
    print(f'{name}: {score}점')`,
        result: "철수: 85점\n영희: 92점\n민수: 78점",
        note: "두 리스트를 병렬로 처리할 때 딱!"
      }
    },
    
    // ⭐ 연습 7: zip 활용
    {
      type: "practice",
      content: {
        level: 2,
        task: "zip으로 두 리스트를 딕셔너리로 만드세요",
        guide: "dict(zip(키들, 값들))",
        hint: "zip을 dict()로 감싸면 딕셔너리!",
        template: null,
        answer: "과목 = ['국어', '영어', '수학']\n점수 = [90, 85, 95]\n\n성적표 = dict(zip(과목, 점수))\nprint(성적표)",
        alternateAnswers: [
          "과목 = ['국어', '영어', '수학']\n점수 = [90, 85, 95]\n성적표 = dict(zip(과목, 점수))\nprint(성적표)"
        ],
        expect: "{'국어': 90, '영어': 85, '수학': 95}"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "🧰",
        message: "고급 함수 마스터!"
      }
    },
    
    // ============================================
    // Chapter 6: 에러 탐정
    // ============================================
    {
      type: "chapter",
      content: {
        num: 6,
        title: "에러 탐정",
        desc: "자주 하는 실수를 찾아요!"
      }
    },
    
    // 에러 퀴즈 1: map() 인덱싱
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `결과 = map(int, ['1', '2', '3'])
print(결과[0])`,
        options: [
          "map 문법 오류",
          "map 객체는 인덱싱 불가",
          "정수 변환 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "map()은 map 객체 반환! list()로 감싸야 인덱싱 가능!"
      }
    },
    
    // 에러 퀴즈 2: sort() vs sorted()
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `숫자 = [3, 1, 4]
결과 = 숫자.sort()
print(결과)`,
        options: [
          "sort() 문법 오류",
          "sort()는 None을 반환함",
          "리스트 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "sort()는 원본을 바꾸고 None 반환! sorted()는 새 리스트 반환!"
      }
    },
    
    // 에러 퀴즈 3: 빈 리스트
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `리스트 = []
print(sum(리스트) / len(리스트))`,
        options: [
          "sum() 오류",
          "len() 오류",
          "0으로 나누기 오류",
          "문제 없음"
        ],
        answer: 2,
        explanation: "빈 리스트의 len()은 0! 0으로 나누면 에러! 💥"
      }
    },
    
    // 에러 퀴즈 4: filter도 list() 필요
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `결과 = filter(lambda x: x > 0, [1, -2, 3])
print(결과[0])`,
        options: [
          "lambda 문법 오류",
          "filter 객체는 인덱싱 불가",
          "조건식 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "filter()도 map()처럼 filter 객체 반환! list()로 감싸야 해요!"
      }
    },
    
    // ============================================
    // Chapter 7: 마무리
    // ============================================
    {
      type: "chapter",
      content: {
        num: 7,
        title: "마무리",
        desc: "내장함수 총정리!"
      }
    },
    
    // 요약
    {
      type: "summary",
      content: {
        num: 1,
        title: "내장함수",
        emoji: "📚",
        learned: [
          "len(): 몇 개?",
          "sum(): 다 더하면?",
          "max(), min(): 가장 큰/작은 거!",
          "sorted(): 줄 세우기 (reverse=True면 거꾸로)",
          "map(): 한 번에 다 변환! (list() 필수)",
          "filter(): 조건에 맞는 것만! (list() 필수)",
          "enumerate(): 번호표 붙이기",
          "zip(): 두 줄을 하나로!"
        ],
        canDo: "내장함수로 데이터를 자유자재로 다룰 수 있어요!"
      }
    },
    
    // 완료
    {
      type: "done",
      content: {}
    }
  ]
}
