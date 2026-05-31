import type { LessonData } from '../types'

export const lesson45: LessonData = {
  id: "45",
  title: "모듈 기초",
  description: "import로 math, random, datetime을 빌려와요!",
  steps: [
    // ============================================
    // Chapter 1: import 기본
    // ============================================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "import의 4가지 방법",
        desc: "import / from import / as 별명!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `import math
print(math.sqrt(16))
print(math.pi)`,
        result: "4.0\n3.141592653589793",
        note: "import 모듈 → 모듈.기능 으로 사용!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `from math import sqrt
print(sqrt(25))
print(sqrt(100))`,
        predict: {
          question: "출력 결과는?",
          options: ["5.0\\n10.0", "math.sqrt(25)\\nmath.sqrt(100)", "에러", "25\\n100"],
          answer: 0,
          feedback: "from import로 가져오면 모듈명 없이 바로 사용! sqrt(25)=5.0, sqrt(100)=10.0!"
        },
        result: "5.0\n10.0"
      }
    },

    {
      type: "quiz",
      content: {
        question: "from math import sqrt 후 sqrt(16)을 어떻게 호출하나요?",
        options: [
          "math.sqrt(16)",
          "sqrt(16)",
          "import.sqrt(16)",
          "math(sqrt(16))"
        ],
        answer: 1,
        explanation: "from...import로 가져오면 모듈명 없이 바로 sqrt(16)!"
      }
    },

    {
      type: "practice",
      content: {
        level: 1,
        task: "___ 자리를 채워 math 모듈을 import해요!",
        guide: "import 모듈명",
        hint: "import math",
        template: "___ math\nprint(math.pi)",
        answer: "import",
        expect: "3.141592653589793"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채워 sqrt와 pi를 한 번에 import 해요!",
        guide: "from 모듈 import 기능1, 기능2",
        hint: "from math import sqrt, pi",
        template: "___ math ___ sqrt, pi\nprint(sqrt(9))\nprint(pi)",
        blanksAnswer: ["from", "import"],
        answer: "from math import sqrt, pi\nprint(sqrt(9))\nprint(pi)",
        expect: "3.0\n3.141592653589793"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `import math as m
print(m.sqrt(81))
print(m.pi)`,
        result: "9.0\n3.141592653589793",
        note: "as로 별명을 붙이면 짧게 쓸 수 있어요!"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채워 math에 별명 m을 붙여요!",
        guide: "import 모듈 as 별명",
        hint: "as를 사용!",
        template: "import math ___ m\nprint(m.floor(3.9))",
        answer: "as",
        expect: "3"
      }
    },

    { type: "reward", content: { emoji: "📦", message: "import 마스터!" } },

    // ============================================
    // Chapter 2: math 모듈
    // ============================================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "math 모듈 — 수학 공구함",
        desc: "sqrt, ceil, floor, pi!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `import math
print(math.ceil(3.2))
print(math.floor(3.9))
print(math.sqrt(64))`,
        predict: {
          question: "출력 결과는?",
          options: ["3\\n3\\n8.0", "4\\n3\\n8.0", "4\\n4\\n8", "3\\n4\\n8.0"],
          answer: 1,
          feedback: "ceil=올림(4), floor=내림(3), sqrt=제곱근(8.0)!"
        },
        result: "4\n3\n8.0"
      }
    },

    {
      type: "quiz",
      content: {
        question: "math.ceil(2.1)의 결과는?",
        options: ["2", "3", "2.1", "2.0"],
        answer: 1,
        explanation: "ceil은 올림! 2.1 → 3!"
      }
    },

    {
      type: "quiz",
      content: {
        question: "math.floor(7.9)의 결과는?",
        options: ["7", "8", "7.9", "7.0"],
        answer: 0,
        explanation: "floor는 내림! 7.9 → 7!"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채워 원의 넓이를 계산해요!",
        guide: "원의 넓이 = π × r²",
        hint: "math.pi와 r ** 2 사용!",
        template: "import math\n\nr = 5\narea = math.___ * r ** ___\nprint(f'{area:.2f}')",
        blanksAnswer: ["pi", "2"],
        answer: "import math\n\nr = 5\narea = math.pi * r ** 2\nprint(f'{area:.2f}')",
        expect: "78.54"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! math 모듈을 import해서\n10의 제곱근, 5의 팩토리얼, 2.3의 올림 값을 한 줄씩 출력해요.\n(힌트: sqrt, factorial, ceil)",
        guide: "math.sqrt(10), math.factorial(5), math.ceil(2.3)",
        hint: "import math\nprint(math.sqrt(10))\nprint(math.factorial(5))\nprint(math.ceil(2.3))",
        template: null,
        answer: "import math\nprint(math.sqrt(10))\nprint(math.factorial(5))\nprint(math.ceil(2.3))",
        alternateAnswers: [
          "from math import sqrt, factorial, ceil\nprint(sqrt(10))\nprint(factorial(5))\nprint(ceil(2.3))"
        ],
        expect: "3.1622776601683795\n120\n3"
      }
    },

    { type: "reward", content: { emoji: "🔢", message: "math 모듈 완성!" } },

    // ============================================
    // Chapter 3: random 모듈
    // ============================================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "random 모듈 — 랜덤 공구함",
        desc: "randint, choice, shuffle!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `import random
random.seed(42)
print(random.randint(1, 10))
print(random.choice(['가위', '바위', '보']))`,
        result: "2\n바위",
        note: "seed(42)로 결과 고정! randint=정수 범위, choice=리스트에서 하나!"
      }
    },

    {
      type: "quiz",
      content: {
        question: "random.randint(1, 6)의 결과로 나올 수 없는 값은?",
        options: ["1", "3", "6", "7"],
        answer: 3,
        explanation: "randint(1, 6)은 1~6 사이! 7은 불가능!"
      }
    },

    {
      type: "quiz",
      content: {
        question: "random.choice(['a', 'b', 'c'])는 무엇을 하나요?",
        options: [
          "항상 'a'를 반환",
          "리스트에서 랜덤으로 하나 선택",
          "리스트를 정렬",
          "리스트를 거꾸로 만듦"
        ],
        answer: 1,
        explanation: "choice는 리스트에서 랜덤으로 하나를 골라줘요!"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리 2개를 채워 1~100 사이 랜덤 정수를 뽑아요!",
        guide: "random 모듈을 import한 뒤 randint!",
        hint: "import random / random.randint(1, 100)",
        template: "___ random\nrandom.seed(0)\nn = random.___(1, 100)\nprint(n)",
        blanksAnswer: ["import", "randint"],
        answer: "import random\nrandom.seed(0)\nn = random.randint(1, 100)\nprint(n)",
        expect: "50"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `import random
random.seed(7)
cards = [1, 2, 3, 4, 5]
random.shuffle(cards)
print(cards)`,
        result: "[2, 5, 4, 1, 3]",
        note: "shuffle은 리스트를 직접 섞어요 (return 없음)!"
      }
    },

    {
      type: "interleaving",
      content: {
        message: "잠깐! 리스트와 for문 복습이에요. (lesson 17 복습)",
        task: "___ 자리를 채워 주사위를 3번 굴려요!",
        guide: "for문으로 반복하고 randint!",
        hint: "for i in range(3):",
        template: "import random\nrandom.seed(1)\nfor i in ___(3):\n    print(random.randint(1, 6))",
        answer: "range",
        expect: "2\n5\n1"
      }
    },

    { type: "reward", content: { emoji: "🎲", message: "random 모듈 완성!" } },

    // ============================================
    // Chapter 4: datetime + 종합
    // ============================================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "datetime + 종합",
        desc: "날짜/시간 다루기와 처음부터 작성!"
      }
    },

    {
      type: "explain",
      content: {
        lines: [],
        code: `from datetime import date

today = date(2026, 5, 31)
print(today)
print(today.year)
print(today.month)`,
        result: "2026-05-31\n2026\n5",
        note: "date(년, 월, 일)로 날짜를 만들고, .year/.month/.day로 접근!"
      }
    },

    {
      type: "quiz",
      content: {
        question: "from datetime import date 한 뒤 d = date(2026, 1, 1) 이라 하면 d.year는?",
        options: ["1", "2026", "'2026'", "에러"],
        answer: 1,
        explanation: "date(2026, 1, 1)의 year 속성은 2026!"
      }
    },

    {
      type: "practice",
      content: {
        level: 2,
        task: "___ 자리를 채워 date 모듈을 import해요!",
        guide: "from datetime import date",
        hint: "datetime 모듈에서 date만!",
        template: "from ___ import date\nd = date(2026, 12, 25)\nprint(d.month)",
        answer: "datetime",
        expect: "12"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! random 모듈을 import해서\nseed(5)로 고정한 뒤 1~10 사이 랜덤 정수 3개를 한 줄씩 출력해요.\nfor문 사용.",
        guide: "for i in range(3): print(random.randint(1, 10))",
        hint: "import random\nrandom.seed(5)\nfor i in range(3):\n    print(random.randint(1, 10))",
        template: null,
        answer: "import random\nrandom.seed(5)\nfor i in range(3):\n    print(random.randint(1, 10))",
        alternateAnswers: [
          "from random import randint, seed\nseed(5)\nfor i in range(3):\n    print(randint(1, 10))"
        ],
        expect: "10\n2\n9"
      }
    },

    {
      type: "errorQuiz",
      content: {
        question: "다음 코드의 문제점은?",
        code: `from math import sqrt
print(math.sqrt(16))`,
        options: [
          "from math import sqrt로 가져왔으면 그냥 sqrt(16)으로 호출해야 함",
          "math 모듈은 sqrt가 없음",
          "import 문법이 틀림",
          "print를 써야 함"
        ],
        answer: 0,
        explanation: "from math import sqrt는 sqrt만 가져온 것! math.sqrt가 아니라 그냥 sqrt(16)!"
      }
    },

    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! math의 pi와 random의 randint를 둘 다 사용해요.\nseed(0)로 고정 후 1~5 사이 랜덤 정수 r을 뽑고,\n반지름 r인 원의 넓이를 출력 (소수점 2자리).",
        guide: "import math, random; random.seed(0); r = randint(1,5); area = math.pi * r ** 2",
        hint: "import math\nimport random\nrandom.seed(0)\nr = random.randint(1, 5)\narea = math.pi * r ** 2\nprint(f'{area:.2f}')",
        template: null,
        answer: "import math\nimport random\nrandom.seed(0)\nr = random.randint(1, 5)\narea = math.pi * r ** 2\nprint(f'{area:.2f}')",
        alternateAnswers: [
          "from math import pi\nfrom random import randint, seed\nseed(0)\nr = randint(1, 5)\nprint(f'{pi * r ** 2:.2f}')"
        ],
        expect: "50.27"
      }
    },

    { type: "reward", content: { emoji: "🎉", message: "모듈 기초 완전 정복!" } },

    // 요약
    {
      type: "summary",
      content: {
        num: 45,
        title: "모듈 기초",
        learned: [
          "모듈 = 함수가 들어있는 공구함 (.py 파일)",
          "import 모듈 → 모듈.기능() 형태로 호출",
          "from 모듈 import 기능 → 모듈명 없이 기능() 직접 호출",
          "import 모듈 as 별명 → 짧은 별명으로 사용",
          "math: sqrt, ceil, floor, pi, factorial",
          "random: randint, choice, shuffle (seed로 결과 고정)",
          "datetime: date(년, 월, 일)로 날짜 객체 생성"
        ],
        canDo: "필요한 모듈을 골라 import하고, math/random/datetime을 활용할 수 있어요!",
        emoji: "📦"
      }
    },

    { type: "done", content: {} }
  ]
}
