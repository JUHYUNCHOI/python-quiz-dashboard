import type { LessonData } from '../types';

export const lesson47: LessonData = {
  id: "47",
  title: "미니 프로젝트: 모듈 활용",
  description: "math, random, datetime, os 모듈을 함께 써봐요!",
  steps: [
    // ==================== CHAPTER 1: math 모듈 활용 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "math 모듈 활용",
        desc: "sqrt, pi, ceil, floor!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["math 모듈의 자주 쓰는 함수들!"],
        code: `import math

print(math.sqrt(64))   # 제곱근
print(math.pi)         # 원주율
print(math.ceil(3.2))  # 올림
print(math.floor(3.8)) # 내림`,
        result: "8.0\n3.141592653589793\n4\n3",
        note: "sqrt, pi, ceil, floor 4가지는 꼭!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `import math
print(math.ceil(5.1), math.floor(5.9))`,
        predict: {
          options: ["5 5", "6 6", "6 5", "5 6"],
          answer: 2,
          feedback: "ceil(5.1)은 올림 → 6, floor(5.9)는 내림 → 5!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["5 5", "6 6", "6 5", "5 6"],
            feedback: "ceil(5.1) rounds up → 6, floor(5.9) rounds down → 5!"
          }
        },
        result: "6 5"
      }
    },
    {
      type: "quiz",
      content: {
        question: "`math.ceil(7.001)`의 결과는?",
        options: ["7", "7.001", "8", "에러"],
        answer: 2,
        explanation: "ceil은 무조건 올림! 7.001도 8이 돼요.",
        en: {
          question: "What is `math.ceil(7.001)`?",
          options: ["7", "7.001", "8", "Error"],
          explanation: "ceil always rounds up! Even 7.001 becomes 8."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "math.pi를 사용해 반지름 5의 원 넓이를 출력하세요",
        guide: "넓이 = pi * r^2",
        hint: "math.pi * r ** 2",
        template: "import math\nr = 5\narea = math.___ * r ** 2\nprint(f'{area:.2f}')",
        answer: "pi",
        expect: "78.54",
        en: {
          task: "Use math.pi to print the area of a circle with radius 5",
          guide: "area = pi * r^2",
          hint: "math.pi * r ** 2"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "리스트 [3.2, 5.7, 8.5]의 각 값을 올림한 결과를 리스트로 출력하세요",
        guide: "리스트 컴프리헨션 + math.ceil",
        hint: "[math.ceil(x) for x in nums]",
        template: "import math\nnums = [3.2, 5.7, 8.5]\nresult = [math.___(x) for x in nums]\nprint(result)",
        answer: "ceil",
        expect: "[4, 6, 9]",
        en: {
          task: "Print the ceil values of [3.2, 5.7, 8.5] as a list",
          guide: "List comprehension + math.ceil",
          hint: "[math.ceil(x) for x in nums]"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "math 모듈",
        learned: [
          "math.sqrt(x) — 제곱근",
          "math.pi — 원주율 상수",
          "math.ceil(x) — 올림",
          "math.floor(x) — 내림"
        ],
        canDo: "math 모듈로 수학 계산을 할 수 있어!",
        emoji: "🔢"
      }
    },

    // ==================== CHAPTER 2: random 모듈 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "random 모듈",
        desc: "랜덤 숫자, 랜덤 선택!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["random 모듈의 주요 함수!"],
        code: `import random

# randint(a, b) — a 이상 b 이하 정수
dice = random.randint(1, 6)

# choice(seq) — 시퀀스에서 1개
fruit = random.choice(['사과', '바나나', '포도'])

# sample(seq, k) — 중복 없이 k개
picks = random.sample(range(1, 46), 6)

# shuffle(list) — 리스트를 섞기
deck = [1, 2, 3, 4, 5]
random.shuffle(deck)`,
        note: "randint, choice, sample, shuffle 4가지가 핵심!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "`random.randint(1, 6)`으로 나올 수 없는 값은?",
        options: ["1", "3", "6", "7"],
        answer: 3,
        explanation: "randint(1, 6)은 1 이상 6 이하! 7은 나올 수 없어요.",
        en: {
          question: "Which value cannot come from `random.randint(1, 6)`?",
          options: ["1", "3", "6", "7"],
          explanation: "randint(1, 6) returns 1 to 6 inclusive! 7 is impossible."
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "리스트에서 중복 없이 3개를 뽑는 함수는?",
        options: ["random.choice", "random.choices", "random.sample", "random.shuffle"],
        answer: 2,
        explanation: "sample(seq, k)는 k개를 중복 없이 뽑아요. choice는 1개만, choices는 중복 허용!",
        en: {
          question: "Which picks 3 items without repetition from a list?",
          options: ["random.choice", "random.choices", "random.sample", "random.shuffle"],
          explanation: "sample(seq, k) picks k items without repetition. choice gets 1, choices allows duplicates!"
        }
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 함수 복습!",
        task: "주사위 2개를 굴려서 합을 반환하는 함수를 완성하세요",
        template: "import random\ndef roll_two():\n    a = random.randint(1, 6)\n    b = random.randint(1, 6)\n    ___ a + b\n\nrandom.seed(0)\nprint(roll_two())",
        answer: "return",
        expect: "9",
        en: {
          message: "🔄 Function review!",
          task: "Complete the function that rolls two dice and returns the sum"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "random.choice로 ['가위', '바위', '보']에서 1개를 골라 출력하세요 (시드 1 사용)",
        guide: "seed를 1로 고정하면 결과가 항상 같아요",
        hint: "random.seed(1); random.choice(items)",
        template: "import random\nrandom.seed(1)\nitems = ['가위', '바위', '보']\npick = random.___(items)\nprint(pick)",
        answer: "choice",
        expect: "보",
        en: {
          task: "Use random.choice to pick from ['가위', '바위', '보'] (seed 1)",
          guide: "Fixing seed to 1 makes output deterministic",
          hint: "random.seed(1); random.choice(items)"
        }
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `import random
picks = random.sample([1, 2, 3], 5)`,
        options: [
          "리스트보다 큰 k를 sample에 주면 ValueError",
          "sample 함수가 없음",
          "문법 오류",
          "문제없음"
        ],
        answer: 0,
        explanation: "sample은 중복 없이 뽑으므로, 리스트 길이(3)보다 큰 k(5)를 요청하면 ValueError 발생!",
        en: {
          question: "What's wrong with this code?",
          options: [
            "k larger than list raises ValueError",
            "sample function doesn't exist",
            "Syntax error",
            "No problem"
          ],
          explanation: "sample picks without repetition. Requesting k(5) larger than list size(3) raises ValueError!"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "random 모듈",
        learned: [
          "randint(a, b) — 정수 랜덤",
          "choice(seq) — 1개 선택",
          "sample(seq, k) — k개 중복없이",
          "shuffle(list) — 섞기"
        ],
        canDo: "랜덤 기능을 활용할 수 있어!",
        emoji: "🎲"
      }
    },

    // ==================== CHAPTER 3: datetime + os.path 종합 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "datetime + os.path",
        desc: "시간과 경로를 다루는 모듈!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["datetime 모듈로 날짜와 시간 다루기!"],
        code: `from datetime import date, datetime

# 오늘 날짜
today = date(2026, 5, 31)
print(today)

# 두 날짜의 차이
new_year = date(2026, 1, 1)
diff = today - new_year
print(diff.days)`,
        result: "2026-05-31\n150",
        note: "date끼리 빼면 timedelta! .days로 일수!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `from datetime import date
d1 = date(2024, 12, 25)
d2 = date(2024, 1, 1)
print((d1 - d2).days)`,
        predict: {
          options: ["359", "360", "365", "에러"],
          answer: 0,
          feedback: "1월 1일부터 12월 25일까지 = 359일! (1년이 366일인 윤년)"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["359", "360", "365", "Error"],
            feedback: "Jan 1 to Dec 25 = 359 days! (366-day leap year)"
          }
        },
        result: "359"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["os.path로 파일 경로 다루기!"],
        code: `import os.path

path = '/home/user/data.txt'

print(os.path.basename(path))  # 파일명
print(os.path.dirname(path))   # 폴더 경로
print(os.path.splitext(path))  # (이름, 확장자)`,
        result: "data.txt\n/home/user\n('/home/user/data', '.txt')",
        note: "basename = 파일명, dirname = 폴더, splitext = 분리!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "`os.path.basename('/a/b/c.txt')`의 결과는?",
        options: ["/a/b", "c", "c.txt", "/a/b/c"],
        answer: 2,
        explanation: "basename은 경로의 마지막 파일/폴더 이름! 확장자 포함!",
        en: {
          question: "What is `os.path.basename('/a/b/c.txt')`?",
          options: ["/a/b", "c", "c.txt", "/a/b/c"],
          explanation: "basename returns the final file/folder name, including extension!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "datetime으로 2026년 1월 1일과 6월 1일의 차이를 일 수로 출력하세요",
        guide: "두 date를 빼면 timedelta",
        hint: "(d2 - d1).days",
        template: "from datetime import date\nd1 = date(2026, 1, 1)\nd2 = date(2026, 6, 1)\ndiff = (d2 - d1).___\nprint(diff)",
        answer: "days",
        expect: "151",
        en: {
          task: "Print the number of days between Jan 1 2026 and Jun 1 2026",
          guide: "Subtracting dates gives timedelta",
          hint: "(d2 - d1).days"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "math + random + datetime을 모두 사용해 다음을 출력하세요: 주사위 합계를 5번 굴려 평균(올림)을 계산. 시드 42 사용.",
        guide: "랜덤은 seed(42), 합산하고 평균을 올림",
        hint: "import math, random; random.seed(42); 5번 randint(1,6) 합; ceil(합/5)",
        template: null,
        answer: `import math
import random
random.seed(42)
total = 0
for i in range(5):
    total += random.randint(1, 6)
avg = total / 5
print(math.ceil(avg))`,
        alternateAnswers: [
          `import math, random
random.seed(42)
total = sum(random.randint(1, 6) for _ in range(5))
print(math.ceil(total / 5))`,
          `import random, math
random.seed(42)
rolls = [random.randint(1, 6) for _ in range(5)]
print(math.ceil(sum(rolls) / 5))`
        ],
        expect: "4",
        en: {
          task: "Use math + random: roll 5 dice (seed 42), print ceil of average",
          guide: "Sum, divide by 5, then ceil",
          hint: "seed(42); 5 randint(1,6); math.ceil(sum/5)"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "여러 모듈을 같이 쓸 때 import 위치는?",
        options: [
          "함수 안에 흩어 놓기",
          "사용 직전에 1줄씩",
          "파일 맨 위에 모아두기",
          "위치 무관"
        ],
        answer: 2,
        explanation: "관례상 모든 import는 파일 맨 위에 모아 둬요! 가독성과 의존성 파악에 좋아요.",
        en: {
          question: "Where should you place imports in a file?",
          options: [
            "Scatter inside functions",
            "Right before each use",
            "All at the top of the file",
            "Doesn't matter"
          ],
          explanation: "By convention, all imports go at the top of the file for readability!"
        }
      }
    },
    {
      type: "reward",
      content: {
        emoji: "🛠️",
        message: "모듈 활용 마스터!"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "종합 정리",
        learned: [
          "math — 수학 계산",
          "random — 랜덤 값",
          "datetime — 날짜와 시간",
          "os.path — 경로 다루기",
          "여러 모듈을 조합해 미니 앱 완성"
        ],
        canDo: "모듈을 조합해서 작은 프로젝트를 만들 수 있어!",
        emoji: "🎓"
      }
    },

    { type: "done", content: {} }
  ]
};
