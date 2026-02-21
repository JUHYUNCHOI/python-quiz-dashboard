import type { LessonData } from '../types'

export const lesson34: LessonData = {
  id: "34",
  title: "함수 활용",
  description: "지역변수, 전역변수, 람다 함수를 배워요!",
  steps: [
    // ============================================
    // Chapter 1: 지역변수 vs 전역변수
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "변수의 범위",
        desc: "지역변수와 전역변수의 차이를 복습해요!"
      }
    },
    
    // 비유로 설명
    {
      type: "explain",
      content: {
        lines: ["🏠 집에서 물건 찾기!"],
        code: `# 전역변수 = 거실에 있는 물건 (모두 사용 가능)
# 지역변수 = 내 방에 있는 물건 (나만 사용)

x = 5        # 거실에 둔 과자 🍪

def 내방():
    x = 10   # 내 방에 있는 다른 과자 🍫
    print(f'내 방: {x}')

내방()
print(f'거실: {x}')`,
        result: "내 방: 10\n거실: 5",
        note: "함수 안의 x(10)와 밖의 x(5)는 다른 물건이에요!"
      }
    },
    
    // 예측 퀴즈: 지역변수
    {
      type: "explain",
      content: {
        lines: ["🧠 어떤 값이 출력될까요?"],
        code: `y = 100

def test():
    y = 200
    print(y)

test()
print(y)`,
        predict: {
          question: "출력 결과는?",
          options: ["200\n200", "100\n100", "200\n100", "100\n200"],
          answer: 2,
          feedback: "함수 안의 y(200)는 지역변수, 밖의 y(100)는 전역변수!"
        },
        result: "200\n100"
      }
    },
    
    // 퀴즈: global
    {
      type: "quiz",
      content: {
        question: "함수 안에서 전역변수를 수정하려면?",
        options: [
          "그냥 변수명 = 값",
          "global 변수명 사용",
          "외부에서만 가능",
          "불가능"
        ],
        answer: 1,
        explanation: "global 키워드를 쓰면 수정 가능! 하지만 return 쓰는 게 더 좋아요 👍"
      }
    },
    
    // ⭐ 연습: 지역변수 이해
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "함수 안에서 count를 1 증가시키고 출력하는 함수를 만드세요",
        guide: "함수 안에서 지역변수로 처리!",
        hint: "count = count + 1 하고 print!",
        template: null,
        answer: "count = 0\n\ndef increase():\n    count = 1\n    print(f'함수 안: {count}')\n\nincrease()\nprint(f'함수 밖: {count}')",
        alternateAnswers: [
          "count = 0\ndef increase():\n    count = 1\n    print(f'함수 안: {count}')\nincrease()\nprint(f'함수 밖: {count}')"
        ],
        expect: "함수 안: 1\n함수 밖: 0"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "🏠",
        message: "변수 범위 이해 완료!"
      }
    },
    
    // ============================================
    // Chapter 2: 람다 함수
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "람다 함수",
        desc: "한 줄 함수를 복습해요!"
      }
    },
    
    // 비유로 설명
    {
      type: "explain",
      content: {
        lines: ["⚡ 일반 함수 vs 람다 = 편지 vs 문자!"],
        code: `# 일반 함수 = 편지 (길게 쓰기)
def 제곱(x):
    return x ** 2

# 람다 함수 = 문자 (짧게 쓰기)
제곱2 = lambda x: x ** 2

# 둘 다 같은 결과!
print(제곱(5))
print(제곱2(5))`,
        result: "25\n25",
        note: "람다 = def + return 없이 한 줄로!"
      }
    },
    
    // 예측 퀴즈: 람다
    {
      type: "explain",
      content: {
        lines: ["🧠 람다 함수 예측!"],
        code: `double = lambda x: x * 2
print(double(7))`,
        predict: {
          question: "출력 결과는?",
          options: ["7", "14", "72", "에러"],
          answer: 1,
          feedback: "x * 2니까 7 × 2 = 14"
        },
        result: "14"
      }
    },
    
    // ⭐ 연습 1: 람다 함수 - 3배
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "숫자를 3배로 만드는 람다 함수 triple을 만드세요",
        guide: "lambda x: x * 3",
        hint: "곱하기 연산자 *를 사용!",
        template: null,
        answer: "triple = lambda x: x * 3\n\nprint(triple(5))\nprint(triple(10))",
        alternateAnswers: [
          "triple = lambda x: x * 3\nprint(triple(5))\nprint(triple(10))"
        ],
        expect: "15\n30"
      }
    },
    
    // ⭐ 연습 2: 람다 함수 - 두 수
    {
      type: "practice",
      content: {
        level: 2,
        task: "두 수의 합을 반환하는 람다 함수 add를 만드세요",
        guide: "매개변수 2개: lambda a, b: ...",
        hint: "쉼표로 매개변수 2개를 받아요!",
        template: null,
        answer: "add = lambda a, b: a + b\n\nprint(add(3, 5))\nprint(add(10, 20))",
        alternateAnswers: [
          "add = lambda a, b: a + b\nprint(add(3, 5))\nprint(add(10, 20))"
        ],
        expect: "8\n30"
      }
    },
    
    // ⭐ 연습 3: 람다 함수 - 홀수 판별
    {
      type: "practice",
      content: {
        level: 2,
        task: "홀수면 True, 짝수면 False를 반환하는 람다 함수 is_odd를 만드세요",
        guide: "x % 2 == 1 이면 홀수!",
        hint: "나머지 연산자 %를 사용!",
        template: null,
        answer: "is_odd = lambda x: x % 2 == 1\n\nprint(is_odd(7))\nprint(is_odd(4))",
        alternateAnswers: [
          "is_odd = lambda x: x % 2 == 1\nprint(is_odd(7))\nprint(is_odd(4))",
          "is_odd = lambda x: x % 2 != 0\n\nprint(is_odd(7))\nprint(is_odd(4))"
        ],
        expect: "True\nFalse"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "⚡",
        message: "람다 마스터!"
      }
    },
    
    // ============================================
    // Chapter 3: sorted()와 람다
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "sorted + 람다",
        desc: "정렬 기준 마음대로 정하기!"
      }
    },
    
    // 비유로 설명
    {
      type: "explain",
      content: {
        lines: ["📊 줄 세우기! 기준을 정해요"],
        code: `# 학생들을 점수 순으로 줄 세우기!
학생 = [('철수', 85), ('영희', 92), ('민수', 78)]

# key = "이걸 기준으로 줄 세워!"
# lambda x: x[1] = "두 번째 값(점수)으로!"
정렬 = sorted(학생, key=lambda x: x[1])
print(정렬)`,
        result: "[('민수', 78), ('철수', 85), ('영희', 92)]",
        note: "key=lambda로 정렬 기준을 맘대로! Level 2 필수!"
      }
    },
    
    // 예측 퀴즈: sorted + lambda
    {
      type: "explain",
      content: {
        lines: ["🧠 단어 정렬 예측!"],
        code: `단어 = ['apple', 'hi', 'cat']
결과 = sorted(단어, key=lambda x: len(x))
print(결과)`,
        predict: {
          question: "출력 결과는?",
          options: ["['apple', 'hi', 'cat']", "['hi', 'cat', 'apple']", "['cat', 'hi', 'apple']", "에러"],
          answer: 1,
          feedback: "길이 순: hi(2) < cat(3) < apple(5)"
        },
        result: "['hi', 'cat', 'apple']"
      }
    },
    
    // ⭐ 연습 4: sorted + lambda 오름차순
    {
      type: "practice",
      content: {
        level: 2,
        task: "학생 데이터를 점수 기준 오름차순으로 정렬하세요",
        guide: "key=lambda x: x[1]",
        hint: "x[1]이 점수예요!",
        template: null,
        answer: "학생 = [('철수', 85), ('영희', 92), ('민수', 78)]\n\n결과 = sorted(학생, key=lambda x: x[1])\nprint(결과)",
        alternateAnswers: [
          "학생 = [('철수', 85), ('영희', 92), ('민수', 78)]\n결과 = sorted(학생, key=lambda x: x[1])\nprint(결과)"
        ],
        expect: "[('민수', 78), ('철수', 85), ('영희', 92)]"
      }
    },
    
    // ⭐ 연습 5: sorted + lambda 내림차순
    {
      type: "practice",
      content: {
        level: 2.5,
        task: "학생 데이터를 점수 기준 내림차순으로 정렬하세요",
        guide: "reverse=True 추가!",
        hint: "key=lambda x: x[1], reverse=True",
        template: null,
        answer: "학생 = [('철수', 85), ('영희', 92), ('민수', 78)]\n\n결과 = sorted(학생, key=lambda x: x[1], reverse=True)\nprint(결과)",
        alternateAnswers: [
          "학생 = [('철수', 85), ('영희', 92), ('민수', 78)]\n결과 = sorted(학생, key=lambda x: x[1], reverse=True)\nprint(결과)"
        ],
        expect: "[('영희', 92), ('철수', 85), ('민수', 78)]"
      }
    },
    
    // ⭐ 연습 6: 문자열 길이 정렬
    {
      type: "practice",
      content: {
        level: 2.5,
        task: "단어들을 길이 기준으로 정렬하세요",
        guide: "len(x)가 문자열 길이!",
        hint: "key=lambda x: len(x)",
        template: null,
        answer: "단어 = ['apple', 'hi', 'banana', 'cat']\n\n결과 = sorted(단어, key=lambda x: len(x))\nprint(결과)",
        alternateAnswers: [
          "단어 = ['apple', 'hi', 'banana', 'cat']\n결과 = sorted(단어, key=lambda x: len(x))\nprint(결과)"
        ],
        expect: "['hi', 'cat', 'apple', 'banana']"
      }
    },
    
    // 인터리빙: 람다 복습
    {
      type: "interleaving",
      content: {
        message: "🔄 잠깐! 람다 복습!",
        task: "두 수의 곱을 반환하는 람다 함수 multiply를 만드세요",
        hint: "lambda a, b: a * b",
        template: null,
        answer: "multiply = lambda a, b: a * b\n\nprint(multiply(3, 5))",
        alternateAnswers: [
          "multiply = lambda a, b: a * b\nprint(multiply(3, 5))"
        ],
        expect: "15"
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
    // Chapter 4: 함수 안에서 함수 호출
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "함수 조합하기",
        desc: "함수가 함수를 부른다!"
      }
    },
    
    // 설명
    {
      type: "explain",
      content: {
        lines: ["🔗 함수는 다른 함수를 부를 수 있어요!"],
        code: `def 더하기(a, b):
    return a + b

def 곱하기(a, b):
    return a * b

def 계산(a, b):
    합 = 더하기(a, b)    # 더하기 호출
    곱 = 곱하기(a, b)    # 곱하기 호출
    return 합, 곱

합계, 곱셈 = 계산(3, 5)
print(f'합: {합계}, 곱: {곱셈}')`,
        result: "합: 8, 곱: 15",
        note: "큰 문제를 작은 함수로 나눠서 해결!"
      }
    },
    
    // 예측 퀴즈
    {
      type: "explain",
      content: {
        lines: ["🧠 함수 조합 예측!"],
        code: `def 제곱(x):
    return x ** 2

def 두배후제곱(x):
    두배 = x * 2
    return 제곱(두배)

print(두배후제곱(3))`,
        predict: {
          question: "출력 결과는?",
          options: ["6", "9", "36", "18"],
          answer: 2,
          feedback: "3 × 2 = 6, 6² = 36"
        },
        result: "36"
      }
    },
    
    // ⭐ 연습 7: 함수 조합
    {
      type: "practice",
      content: {
        level: 2.5,
        task: "섭씨→화씨 변환 함수와, 그걸 사용해 0~100도를 변환하는 함수를 만드세요",
        guide: "화씨 = 섭씨 * 9/5 + 32",
        hint: "함수 안에서 다른 함수 호출!",
        template: null,
        answer: "def 섭씨to화씨(c):\n    return c * 9/5 + 32\n\ndef 온도출력():\n    print(f'0°C = {섭씨to화씨(0)}°F')\n    print(f'100°C = {섭씨to화씨(100)}°F')\n\n온도출력()",
        alternateAnswers: [
          "def 섭씨to화씨(c):\n    return c * 9/5 + 32\ndef 온도출력():\n    print(f'0°C = {섭씨to화씨(0)}°F')\n    print(f'100°C = {섭씨to화씨(100)}°F')\n온도출력()"
        ],
        expect: "0°C = 32.0°F\n100°C = 212.0°F"
      }
    },
    
    // 보상
    {
      type: "reward",
      content: {
        emoji: "🔗",
        message: "함수 조합 성공!"
      }
    },
    
    // ============================================
    // Chapter 5: 에러 탐정
    // ============================================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "에러 탐정",
        desc: "자주 하는 실수를 찾아요!"
      }
    },
    
    // 에러 퀴즈 1: 람다에서 return
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `f = lambda x: return x * 2`,
        options: [
          "변수명이 잘못됨",
          "람다에서 return 키워드 사용",
          "곱하기 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "람다에선 return 안 써요! lambda x: x * 2 가 맞아요!"
      }
    },
    
    // 에러 퀴즈 2: sorted key
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `학생 = [('철수', 85), ('영희', 92)]
결과 = sorted(학생, key=x[1])`,
        options: [
          "x가 정의되지 않음",
          "sorted 문법 오류",
          "key에 lambda가 필요함",
          "리스트 오류"
        ],
        answer: 2,
        explanation: "key=lambda x: x[1]로 써야 해요! x는 어디서 왔어요?"
      }
    },
    
    // 에러 퀴즈 3: 지역변수
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `def 함수():
    비밀 = 10
    print(비밀)

함수()
print(비밀)`,
        options: [
          "함수 정의 오류",
          "print 오류",
          "함수 밖에서 지역변수 사용",
          "문제 없음"
        ],
        answer: 2,
        explanation: "비밀은 함수 안의 지역변수! 밖에선 못 써요 🤫"
      }
    },
    
    // 에러 퀴즈 4: 람다 여러 줄
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `calc = lambda x:
    result = x * 2
    return result`,
        options: [
          "변수명 오류",
          "람다는 한 줄만 가능",
          "return 위치 오류",
          "문제 없음"
        ],
        answer: 1,
        explanation: "람다는 한 줄만! 여러 줄이 필요하면 def를 써요!"
      }
    },
    
    // ============================================
    // Chapter 6: 마무리
    // ============================================
    {
      type: "chapter",
      content: {
        num: 6,
        title: "마무리",
        desc: "오늘 배운 걸 정리해요!"
      }
    },
    
    // 요약
    {
      type: "summary",
      content: {
        num: 1,
        title: "함수 활용",
        emoji: "⚡",
        learned: [
          "지역변수: 함수 안에서만! (내 방 물건)",
          "전역변수: 어디서든! (거실 물건)",
          "람다: lambda x: 반환값 (한 줄 함수)",
          "sorted + lambda: 정렬 기준 마음대로!",
          "함수 조합: 함수가 함수를 부른다!"
        ],
        canDo: "함수를 더 다양하게 활용할 수 있어요!"
      }
    },
    
    // 완료
    {
      type: "done",
      content: {}
    }
  ]
}
