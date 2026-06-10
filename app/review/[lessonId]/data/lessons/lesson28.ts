import { LessonData } from '../types';

export const lesson28: LessonData = {
  id: "28",
  title: "로또 번호 생성기",
  description: "랜덤, 중복 체크, 반복문으로 로또 번호를 만들어요!",
  steps: [
    // ==================== CHAPTER 1: 랜덤 번호 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "랜덤 번호 뽑기",
        desc: "random.randint로 1~45 사이 숫자 하나!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["random.randint(a, b)는 a~b 사이 정수 하나"],
        code: `import random
random.seed(0)

n = random.randint(1, 45)
print(n)`,
        result: "25",
        note: "randint는 양쪽 끝(1과 45)을 모두 포함해요!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "random.randint(1, 45)가 만들 수 있는 값은?",
        options: [
          "1~44 사이 정수",
          "1~45 사이 정수 (45 포함)",
          "0~45 사이 정수",
          "1~45 사이 실수"
        ],
        answer: 1,
        explanation: "randint(a, b)는 a 이상 b 이하 정수! 45도 나올 수 있어요. (range는 b 미포함이지만 randint는 포함!)",
        en: {
          question: "What values can random.randint(1, 45) return?",
          options: [
            "Integers 1~44",
            "Integers 1~45 (45 included)",
            "Integers 0~45",
            "Floats 1~45"
          ],
          explanation: "randint(a, b) returns integers from a to b INCLUSIVE. Unlike range, the end is included!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "1~10 사이 랜덤 정수를 뽑으세요",
        guide: "random.randint(시작, 끝)!",
        hint: "양 끝 모두 포함!",
        template: "import random\nrandom.seed(7)\n\nn = random.___(1, 10)\nprint(n)",
        answer: "randint",
        expect: "6"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 리스트 추가 복습!",
        task: "빈 리스트에 숫자 5를 추가하세요",
        template: "nums = []\nnums.___(5)\nprint(nums)",
        answer: "append",
        expect: "[5]",
        en: {
          message: "🔄 List append review!",
          task: "Add the number 5 to an empty list"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "랜덤 번호",
        learned: [
          "import random",
          "random.randint(1, 45) → 1~45 정수 (양 끝 포함)",
          "random.seed(숫자) → 같은 결과 재현"
        ],
        canDo: "랜덤 정수를 뽑을 수 있어!",
        emoji: "🎲"
      }
    },

    // ==================== CHAPTER 2: 중복 체크 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "중복 없이 뽑기",
        desc: "in / not in 으로 이미 있는지 확인!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["in / not in 으로 리스트에 있는지 확인"],
        code: `numbers = [3, 14, 25]
print(14 in numbers)
print(7 in numbers)
print(7 not in numbers)`,
        result: "True\nFalse\nTrue",
        note: "in은 있으면 True, not in은 없으면 True!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "5가 [1, 3, 5, 7]에 있는지 확인하는 방법은?",
        options: ["5.in(list)", "list.has(5)", "5 in list", "list.contains(5)"],
        answer: 2,
        explanation: "파이썬은 5 in list 처럼 in 연산자를 써요! 다른 언어처럼 .has() 같은 메서드가 아니에요.",
        en: {
          question: "How to check if 5 is in [1, 3, 5, 7]?",
          options: ["5.in(list)", "list.has(5)", "5 in list", "list.contains(5)"],
          explanation: "Python uses the 'in' operator: 5 in list. Not a .has() method like some other languages."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "n이 numbers에 없을 때만 append하세요",
        guide: "not in으로 체크!",
        hint: "if n not in numbers: numbers.append(n)",
        template: "numbers = [3, 14, 25]\nn = 7\nif n ___ in numbers:\n    numbers.append(n)\nprint(numbers)",
        answer: "not",
        expect: "[3, 14, 25, 7]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `numbers = [10, 20, 30]
if 20 not in numbers:
    numbers.append(20)
if 40 not in numbers:
    numbers.append(40)
print(numbers)`,
        predict: {
          options: ["[10, 20, 30, 20, 40]", "[10, 20, 30, 40]", "[10, 20, 30]", "[20, 40]"],
          answer: 1,
          feedback: "20은 이미 있어서 append 안 됨, 40은 없어서 추가 → [10, 20, 30, 40]"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["[10, 20, 30, 20, 40]", "[10, 20, 30, 40]", "[10, 20, 30]", "[20, 40]"],
            feedback: "20 already exists (skip), 40 doesn't (append) → [10, 20, 30, 40]"
          }
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["while로 6개가 될 때까지 반복"],
        code: `import random
random.seed(42)

numbers = []
while len(numbers) < 6:
    n = random.randint(1, 45)
    if n not in numbers:
        numbers.append(n)

print(len(numbers))`,
        result: "6",
        note: "len(numbers) < 6 인 동안 계속 뽑아요. 중복은 무시!"
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "while 조건: 리스트 길이가 6보다 작은 동안",
        guide: "len(numbers) < 6",
        hint: "< 부등호!",
        template: "numbers = []\nwhile len(numbers) ___ 6:\n    numbers.append(0)\nprint(len(numbers))",
        answer: "<",
        expect: "6"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은? (무한 루프!)",
        code: `numbers = []
while len(numbers) < 6:
    n = 7
    if n not in numbers:
        numbers.append(n)`,
        options: [
          "n이 항상 7이라 한 번 append 후 not in이 계속 False → 무한 루프",
          "while 문법 오류",
          "append 문법 오류",
          "문제없음"
        ],
        answer: 0,
        explanation: "고정값 7을 넣으면 한 번 들어간 후엔 영원히 not in이 False가 돼요. 다음 반복에서 append가 안 일어나서 len이 1로 멈춰 무한 루프! 그래서 random으로 뽑아야 해요.",
        en: {
          question: "What's wrong with this code? (Infinite loop!)",
          options: [
            "n is always 7 → after one append, not in becomes False forever → infinite loop",
            "while syntax error",
            "append syntax error",
            "No problem"
          ],
          explanation: "Fixed 7 only appends once, then not in is False forever. len stays at 1 → infinite loop. Need random for new values!"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "중복 없이 뽑기",
        learned: [
          "n in 리스트 → 있으면 True",
          "n not in 리스트 → 없으면 True",
          "while + not in 조합으로 중복 없이 수집",
          "while 조건: len(리스트) < 목표 개수"
        ],
        canDo: "중복 없이 정해진 개수만큼 모을 수 있어!",
        emoji: "🚫"
      }
    },

    // ==================== CHAPTER 3: 정렬과 종합 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "정렬 + 종합",
        desc: "sort()로 오름차순 + 종합 퀴즈!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 sort 복습!",
        task: "리스트를 오름차순 정렬하세요",
        template: "nums = [25, 3, 14, 40, 30]\nnums.___()\nprint(nums)",
        answer: "sort",
        expect: "[3, 14, 25, 30, 40]",
        en: {
          message: "🔄 sort review!",
          task: "Sort the list in ascending order"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "리스트를 오름차순으로 정렬하는 방법은? (원본 변경)",
        options: ["sorted(list)", "list.sort()", "list.order()", "list.asc()"],
        answer: 1,
        explanation: "list.sort()는 원본을 정렬, sorted(list)는 새 리스트를 반환! 로또에서는 sort()를 써요.",
        en: {
          question: "How to sort a list in ascending order (modify original)?",
          options: ["sorted(list)", "list.sort()", "list.order()", "list.asc()"],
          explanation: "list.sort() modifies the original. sorted(list) returns a new list! Lotto uses sort()."
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `import random
random.seed(42)

numbers = []
while len(numbers) < 3:
    n = random.randint(1, 10)
    if n not in numbers:
        numbers.append(n)

numbers.sort()
print(numbers)`,
        predict: {
          options: ["3개 숫자 (오름차순)", "3개 숫자 (랜덤 순서)", "1개 숫자", "에러"],
          answer: 0,
          feedback: "중복 없이 3개를 뽑은 후 sort()로 정렬 → 오름차순 3개!"
        },
        en: {
          lines: ["Predict the output!"],
          predict: {
            options: ["3 numbers (ascending)", "3 numbers (random order)", "1 number", "Error"],
            feedback: "3 unique numbers then sort() → ascending order!"
          }
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "1~45 중 6개를 중복 없이 뽑고 정렬해서 출력",
        guide: "while + not in + append + sort",
        hint: "random.seed(42)와 randint(1, 45) 사용!",
        template: null,
        answer: "import random\nrandom.seed(42)\nnumbers = []\nwhile len(numbers) < 6:\n    n = random.randint(1, 45)\n    if n not in numbers:\n        numbers.append(n)\nnumbers.sort()\nprint(numbers)",
        alternateAnswers: ["import random\nrandom.seed(42)\nnumbers = []\nwhile len(numbers) < 6:\n    n = random.randint(1, 45)\n    if n not in numbers:\n        numbers.append(n)\nprint(sorted(numbers))"],
        expect: "[2, 8, 15, 16, 18, 41]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["random.sample로 한 번에!"],
        code: `import random
random.seed(42)

numbers = random.sample(range(1, 46), 6)
numbers.sort()
print(numbers)`,
        result: "[2, 8, 15, 16, 18, 41]",
        note: "random.sample(범위, 개수)는 중복 없이 한 번에! while/not in 없이 끝나요."
      }
    },
    {
      type: "quiz",
      content: {
        question: "random.sample(range(1, 46), 6) 이 반환하는 것은?",
        options: [
          "1~45 사이 중복 가능 6개",
          "1~45 사이 중복 없는 6개",
          "1~46 사이 중복 없는 6개",
          "에러"
        ],
        answer: 1,
        explanation: "sample은 범위에서 중복 없이 골라요! range(1, 46)은 1~45를 의미해요 (46 미포함).",
        en: {
          question: "What does random.sample(range(1, 46), 6) return?",
          options: [
            "6 numbers 1~45, duplicates allowed",
            "6 unique numbers from 1~45",
            "6 unique numbers from 1~46",
            "Error"
          ],
          explanation: "sample picks WITHOUT duplicates! range(1, 46) means 1~45 (46 excluded)."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "여러 세트 뽑기: for로 3세트, 각 세트 3개씩, 정렬",
        guide: "이중 반복: for + while",
        hint: "매 세트마다 numbers = []로 초기화!",
        template: null,
        answer: "import random\nrandom.seed(1)\nfor game in range(1, 4):\n    numbers = []\n    while len(numbers) < 3:\n        n = random.randint(1, 10)\n        if n not in numbers:\n            numbers.append(n)\n    numbers.sort()\n    print(f'{game}: {numbers}')",
        expect: "1: [2, 3, 10]\n2: [2, 5, 8]\n3: [4, 7, 8]"
      }
    },
    {
      type: "reward",
      content: {
        emoji: "🎱",
        message: "로또 마스터!"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "로또 번호 생성기 완성!",
        learned: [
          "random.randint(a, b) → a~b 정수",
          "in / not in 으로 중복 체크",
          "while + not in + append → 중복 없이 수집",
          "list.sort() → 오름차순 정렬",
          "random.sample(범위, 개수) → 한 번에 중복 없이!"
        ],
        canDo: "랜덤 + 중복 체크 + 정렬로 로또 번호를 만들 수 있어!",
        emoji: "🏆"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
