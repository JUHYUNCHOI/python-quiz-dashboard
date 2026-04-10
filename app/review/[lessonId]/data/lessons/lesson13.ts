import { LessonData } from '../types';

export const lesson13: LessonData = {
  id: "13",
  title: "반복문 (for)",
  description: "for문으로 반복하기!",
  steps: [
    // ==================== CHAPTER 1: 동기 부여 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "for 반복문",
        desc: "같은 일을 여러 번 반복!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["같은 걸 5번 쓰면 힘들지?"],
        code: 'print("안녕")\nprint("안녕")\nprint("안녕")\nprint("안녕")\nprint("안녕")',
        isPreview: true,
        note: "for문이면 한 줄이면 돼!"
      }
    },
    {
      type: "reward",
      content: {
        message: "반복문을 마스터하자!",
        emoji: "🔁"
      }
    },

    // ==================== CHAPTER 2: range()와 for ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "range()와 for",
        desc: "정해진 횟수만큼 반복!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 조건문 복습!",
        task: "x가 10보다 크면 '크다' 출력",
        template: "x = 15\n___ x > 10:\n    print('크다')",
        blanksAnswer: ["if"],
        answer: "x = 15\nif x > 10:\n    print('크다')",
        expect: "크다",
        en: {
          message: "🔄 Conditional review!",
          task: "If x is greater than 10 print '크다'"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: 'for i in range(3):\n    print("안녕!")',
        predict: {
          question: "몇 번 출력될까?",
          options: ["1번", "2번", "3번", "4번"],
          answer: 2,
          feedback: "range(3)은 0, 1, 2 → 3번 반복!"
        },
        result: "안녕!\n안녕!\n안녕!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "for i in range(1, 4):\n    print(i)",
        predict: {
          question: "출력 결과는?",
          options: ["1 2 3", "1 2 3 4", "0 1 2 3", "0 1 2"],
          answer: 0,
          feedback: "range(1, 4)는 1부터 3까지!"
        },
        result: "1\n2\n3"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "1부터 5까지 출력하기",
        guide: "range(시작, 끝+1) 기억!",
        hint: "range(1, 6)을 사용해봐!",
        template: "for i in range(___,___):\n    print(i)",
        blanksAnswer: ["1", "6"],
        answer: "for i in range(1, 10, 2):\n    print(i)",
        expect: "1\n3\n5\n7\n9",
        en: {
          task: "Print numbers from 1 to 5",
          guide: "Remember range(start, end+1)!",
          hint: "Use range(1, 6)!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "range(5)는 어떤 숫자를 만들까?",
        options: ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "0, 1, 2, 3, 4, 5", "1, 2, 3, 4"],
        answer: 1,
        explanation: "range(5)는 0부터 시작해서 4까지!",
        en: {
          question: "What numbers does range(5) generate?",
          options: ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "0, 1, 2, 3, 4, 5", "1, 2, 3, 4"],
          explanation: "range(5) starts from 0 and goes to 4!"
        }
      }
    },

    // ===== 직접 써보기: for + range =====
    {
      type: "practice",
      content: {
        level: 3,
        task: "이렇게 나오게 해봐 ↓\n1\n3\n5\n7\n9\n\n힌트: range(시작, 끝, 간격) 써봐!",
        guide: "range의 3번째 인자로 2씩 건너뛰어봐!",
        hint: "range(1, 10, 2)를 써봐!",
        template: null,
        answer: "for i in range(1, 6):\n    print(i)",
        expect: "1\n2\n3\n4\n5",
        en: {
          task: "Make it print like this ↓\n1\n3\n5\n7\n9\n\nHint: Use range(start, end, step)!",
          guide: "Skip by 2 using the 3rd argument of range!",
          hint: "Use range(1, 10, 2)!"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "range와 for",
        learned: [
          "for i in range(N) = N번 반복",
          "range(시작, 끝) = 시작부터 끝-1까지",
          "i는 반복할 때마다 바뀌는 변수"
        ],
        canDo: "정해진 횟수만큼 반복할 수 있어!",
        emoji: "🔢"
      }
    },

    // ==================== CHAPTER 3: 리스트와 for ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "리스트와 for",
        desc: "리스트 항목을 하나씩 꺼내기!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["리스트를 for문으로 순회!"],
        code: "fruits = ['사과', '바나나', '포도']\nfor fruit in fruits:\n    print(fruit)",
        result: "사과\n바나나\n포도",
        note: "하나씩 꺼내서 fruit에 담아!"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트의 각 이름에 '님' 붙여서 출력",
        guide: "f-string으로 합쳐보자!",
        hint: "f'{name}님' 형태로!",
        template: "names = ['지민', '유진', '민수']\nfor ___ in names:\n    print(f'{___}님')",
        blanksAnswer: ["name", "name"],
        answer: "names = ['지민', '유진', '민수']\nfor name in names:\n    print(f'{name}님')",
        expect: "지민님\n유진님\n민수님",
        en: {
          task: "Print each name from the list with '님' appended",
          guide: "Combine with f-string!",
          hint: "Use the form f'{name}님'!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "for x in [10, 20, 30]: print(x) 의 결과는?",
        options: ["10 20 30 (한 줄)", "10\\n20\\n30 (각 줄)", "[10, 20, 30]", "에러"],
        answer: 1,
        explanation: "for문은 각 요소를 하나씩 꺼내서 print하므로 줄바꿈됩니다!",
        en: {
          question: "What is the result of: for x in [10, 20, 30]: print(x)?",
          options: ["10 20 30 (one line)", "10\\n20\\n30 (each on own line)", "[10, 20, 30]", "Error"],
          explanation: "The for loop takes each element one at a time and prints it, so each is on its own line!"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "리스트와 for",
        learned: [
          "for x in 리스트: = 하나씩 꺼내기",
          "변수 이름은 자유롭게!",
          "문자열도 순회 가능"
        ],
        canDo: "리스트 항목을 하나씩 처리할 수 있어!",
        emoji: "📋"
      }
    },

    // ==================== CHAPTER 4: 합계와 응용 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "for문 응용",
        desc: "합계, 구구단까지!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 range 복습!",
        task: "1부터 3까지 출력",
        template: "for i in range(___, ___):\n    print(i)",
        blanksAnswer: ["1", "4"],
        answer: "for i in range(1, 4):\n    print(i)",
        expect: "1\n2\n3",
        en: {
          message: "🔄 range review!",
          task: "Print from 1 to 3"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)",
        predict: {
          question: "결과는?",
          options: ["100", "5050", "5000", "10000"],
          answer: 1,
          feedback: "1+2+3+...+100 = 5050!"
        },
        result: "5050"
      }
    },
    // ===== 직접 써보기: for + 리스트 =====
    {
      type: "practice",
      content: {
        level: 3,
        task: "이렇게 나오게 해봐 ↓\n안녕!\n안녕!\n안녕!",
        guide: "for + range(3) 전체를 직접 써봐!",
        template: null,
        answer: "for i in range(3):\n    print('안녕!')",
        expect: "안녕!\n안녕!\n안녕!",
        en: {
          task: "Make it print like this ↓\n안녕!\n안녕!\n안녕!",
          guide: "Write the full for + range(3) yourself!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "구구단 3단 출력하기",
        guide: "f-string으로 3 * i = 결과 형태!",
        hint: "range(1, 10)과 3*i를 사용!",
        template: "for i in range(1, 10):\n    print(f'3 * {i} = {___}')",
        blanksAnswer: ["3*i"],
        answer: "for i in range(1, 10):\n    print(f'3 * {i} = {3*i}')",
        expect: "3 * 1 = 3\n3 * 2 = 6\n3 * 3 = 9\n3 * 4 = 12\n3 * 5 = 15\n3 * 6 = 18\n3 * 7 = 21\n3 * 8 = 24\n3 * 9 = 27",
        en: {
          task: "Print the 3 times table",
          guide: "Use f-string in the format 3 * i = result!",
          hint: "Use range(1, 10) and 3*i!"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 4,
        title: "for문 응용",
        learned: [
          "누적 합계: total += i",
          "구구단: f-string + for",
          "range(시작, 끝, 간격) 가능"
        ],
        canDo: "for문으로 다양한 계산을 할 수 있어!",
        emoji: "🧮"
      }
    },

    // ==================== CHAPTER 5: for 손에 익히기 ====================
    {
      type: "chapter",
      content: {
        num: 5,
        title: "for 손에 익히기",
        desc: "range, 리스트 순회, 누적 — 눈 감고도 쓸 수 있게!"
      }
    },

    // Drill 1: range 기본
    {
      type: "practice",
      content: {
        level: 1,
        task: "1부터 5까지 출력하는 for문을 완성해요",
        guide: "range(시작, 끝+1)",
        template: "for i in range(___, ___):\n    print(i)",
        blanksAnswer: ["1", "6"],
        answer: "for i in range(1, 6):\n    print(i)",
        expect: "1\n2\n3\n4\n5",
        en: {
          task: "Complete the for loop to print 1 through 5",
          guide: "range(start, end+1)"
        }
      }
    },

    // Drill 2: 리스트 순회 + f-string
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트를 순회하며 각 과일 앞에 '🍎'를 붙여 출력해요",
        guide: "for item in list: print(f'🍎{item}')",
        template: "fruits = ['사과', '바나나', '포도']\nfor ___ in fruits:\n    print(f'🍎{___}')",
        blanksAnswer: ["fruit", "fruit"],
        answer: "fruits = ['사과', '바나나', '포도']\nfor fruit in fruits:\n    print(f'🍎{fruit}')",
        expect: "🍎사과\n🍎바나나\n🍎포도",
        en: {
          task: "Traverse the list and print each fruit with '🍎' prepended",
          guide: "for item in list: print(f'🍎{item}')"
        }
      }
    },

    // Drill 3: 누적합
    {
      type: "practice",
      content: {
        level: 2,
        task: "리스트 [10, 20, 30, 40]의 합계를 for문으로 구해 출력해요",
        guide: "total = 0; for x in nums: total += x",
        template: "nums = [10, 20, 30, 40]\ntotal = 0\nfor ___ in nums:\n    total ___ ___\nprint(total)",
        blanksAnswer: ["x", "+=", "x"],
        answer: "nums = [10, 20, 30, 40]\ntotal = 0\nfor x in nums:\n    total += x\nprint(total)",
        expect: "100",
        en: {
          task: "Use a for loop to sum the list [10, 20, 30, 40] and print it",
          guide: "total = 0; for x in nums: total += x"
        }
      }
    },

    // Drill 4: 처음부터 — 구구단 5단
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! 구구단 5단을 출력해요\n형식: '5 x 1 = 5'",
        guide: "for i in range(1, 10): print(f'5 x {i} = {5*i}')",
        hint: "for i in range(1, 10):\n    print(f'5 x {i} = {5*i}')",
        template: null,
        answer: "for i in range(1, 10):\n    print(f'5 x {i} = {5*i}')",
        alternateAnswers: [
          "for i in range(1,10):\n    print(f'5 x {i} = {5*i}')"
        ],
        expect: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45",
        en: {
          task: "Write from scratch! Print the 5 times table\nFormat: '5 x 1 = 5'",
          guide: "for i in range(1, 10): print(f'5 x {i} = {5*i}')",
          hint: "for i in range(1, 10):\n    print(f'5 x {i} = {5*i}')"
        }
      }
    },

    // Drill 5: 처음부터 — 짝수 합계
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! 1~10 중 짝수의 합계를 구해 출력해요",
        guide: "for + range + if x%2==0 + 누적합",
        hint: "total = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        total += i\nprint(total)",
        template: null,
        answer: "total = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        total += i\nprint(total)",
        alternateAnswers: [
          "total=0\nfor i in range(2,11,2):\n    total+=i\nprint(total)"
        ],
        expect: "30",
        en: {
          task: "Write from scratch! Find the sum of even numbers from 1 to 10 and print it",
          guide: "for + range + if x%2==0 + accumulate",
          hint: "total = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        total += i\nprint(total)"
        }
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
