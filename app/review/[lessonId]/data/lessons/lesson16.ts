// 레슨 16: 리스트 기초
import { LessonData } from '../types';

export const lesson16: LessonData = {
  id: "16",
  title: "리스트 기초",
  description: "파이썬 리스트를 만들고 사용해보자!",
  steps: [
    // ==================== CHAPTER 1: 리스트 만들기 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "리스트 만들기",
        desc: "여러 데이터를 한 곳에 담자!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["변수 하나에 값 하나만?", "여러 개를 한 번에 담고 싶어!"],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]",
        result: "['사과', '바나나', '포도']",
        note: "대괄호 [ ] 안에 콤마로 구분해서 넣어요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "scores = [90, 85, 100, 77]\nprint(scores)",
        predict: {
          question: "출력 결과는?",
          options: ["90 85 100 77", "[90, 85, 100, 77]", "90", "에러"],
          answer: 1,
          feedback: "리스트를 print하면 대괄호째 출력돼요!"
        },
        result: "[90, 85, 100, 77]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["리스트에는 여러 타입을 섞을 수도 있어!"],
        code: "mix = [\"철수\", 17, True, 3.14]\nprint(mix)",
        result: "['철수', 17, True, 3.14]",
        note: "문자열, 숫자, 불리언 모두 OK!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "empty = []\nprint(empty)\nprint(len(empty))",
        predict: {
          question: "len(empty)의 결과는?",
          options: ["1", "0", "None", "에러"],
          answer: 1,
          feedback: "빈 리스트의 길이는 0이에요!"
        },
        result: "[]\n0"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "좋아하는 색깔 3개를 리스트로 만들기",
        guide: "대괄호와 따옴표를 사용해요!",
        hint: "colors = [\"빨강\", \"파랑\", \"초록\"]",
        template: "colors = [___, ___, ___]\nprint(colors)",
        blanksAnswer: ["\"빨강\"", "\"파랑\"", "\"초록\""],
        answer: "colors = [\"빨강\", \"파랑\", \"초록\"]\nprint(colors)",
        expect: "['빨강', '파랑', '초록']",
        en: {
          task: "Create a list of 3 favorite colors",
          guide: "Use square brackets and quotes!",
          hint: "colors = [\"red\", \"blue\", \"green\"]"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "리스트를 만드는 올바른 방법은?",
        options: [
          "fruits = (\"사과\", \"바나나\")",
          "fruits = [\"사과\", \"바나나\"]",
          "fruits = {\"사과\", \"바나나\"}",
          "fruits = \"사과\", \"바나나\""
        ],
        answer: 1,
        explanation: "리스트는 대괄호 [ ]를 사용해요! ( )는 튜플, { }는 딕셔너리나 집합이에요.",
        en: {
          question: "What is the correct way to create a list?",
          options: [
            "fruits = (\"apple\", \"banana\")",
            "fruits = [\"apple\", \"banana\"]",
            "fruits = {\"apple\", \"banana\"}",
            "fruits = \"apple\", \"banana\""
          ],
          explanation: "Lists use square brackets [ ]! ( ) is tuple, { } is dict or set."
        }
      }
    },
    {
      type: "reward",
      content: {
        message: "리스트 만들기 성공!",
        emoji: "📦"
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "리스트 만들기",
        learned: [
          "리스트 = 대괄호 [ ] 사용",
          "여러 타입을 섞을 수 있다",
          "빈 리스트 = []"
        ],
        canDo: "다양한 데이터를 리스트에 담을 수 있어!",
        emoji: "📦"
      }
    },

    // ==================== CHAPTER 2: 인덱싱 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "인덱싱",
        desc: "리스트에서 원하는 값 꺼내기!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 for문 복습! (레슨 13)",
        task: "0부터 2까지 출력하기",
        template: "for i in ___(___):\n    print(i)",
        blanksAnswer: ["range", "3"],
        answer: "for i in range(3):\n    print(i)",
        expect: "0\n1\n2",
        en: {
          message: "🔄 for loop review! (Lesson 13)",
          task: "Print 0 to 2"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["리스트 인덱스는 0부터 시작!"],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]\nprint(fruits[0])\nprint(fruits[1])\nprint(fruits[2])",
        result: "사과\n바나나\n포도",
        note: "첫 번째 = [0], 두 번째 = [1], 세 번째 = [2]"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]\nprint(fruits[-1])",
        predict: {
          question: "fruits[-1]의 결과는?",
          options: ["사과", "바나나", "포도", "에러"],
          answer: 2,
          feedback: "-1은 마지막 요소! -2는 뒤에서 두 번째!"
        },
        result: "포도"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["존재하지 않는 인덱스는 에러!"],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]\nprint(fruits[5])",
        result: "IndexError: list index out of range",
        isError: true,
        note: "인덱스가 범위를 벗어나면 에러가 나요!"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트의 두 번째 요소 출력하기",
        guide: "인덱스는 0부터 시작!",
        hint: "두 번째 = 인덱스 1",
        template: "animals = [\"강아지\", \"고양이\", \"토끼\"]\nprint(animals[___])",
        blanksAnswer: ["1"],
        answer: "animals = [\"강아지\", \"고양이\", \"토끼\"]\nprint(animals[1])",
        expect: "고양이",
        en: {
          task: "Print the second element of the list",
          guide: "Index starts at 0!",
          hint: "Second element = index 1"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "리스트의 마지막 요소를 음수 인덱스로 출력",
        guide: "뒤에서 첫 번째 = -1",
        hint: "[-1] 사용!",
        template: "numbers = [10, 20, 30, 40, 50]\nprint(numbers[___])",
        blanksAnswer: ["-1"],
        answer: "numbers = [10, 20, 30, 40, 50]\nprint(numbers[-1])",
        expect: "50",
        en: {
          task: "Print the last element of the list using a negative index",
          guide: "First from the back = -1",
          hint: "Use [-1]!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "colors = [\"빨강\", \"파랑\", \"초록\"]일 때 colors[2]는?",
        options: ["빨강", "파랑", "초록", "에러"],
        answer: 2,
        explanation: "인덱스 0=빨강, 1=파랑, 2=초록!",
        en: {
          question: "Given colors = [\"red\", \"blue\", \"green\"], what is colors[2]?",
          options: ["red", "blue", "green", "Error"],
          explanation: "Index 0=red, 1=blue, 2=green!"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "인덱싱",
        learned: [
          "인덱스는 0부터 시작",
          "음수 인덱스 = 뒤에서부터 (-1이 마지막)",
          "범위를 벗어나면 IndexError"
        ],
        canDo: "리스트에서 원하는 값을 꺼낼 수 있어!",
        emoji: "🎯"
      }
    },

    // ==================== CHAPTER 3: 리스트 수정 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "리스트 수정",
        desc: "추가, 삭제, 길이 확인!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 for문 + range 복습! (레슨 13)",
        task: "1부터 3까지 출력하기",
        template: "for i in range(___, ___):\n    print(i)",
        blanksAnswer: ["1", "4"],
        answer: "for i in range(1, 4):\n    print(i)",
        expect: "1\n2\n3",
        en: {
          message: "🔄 for loop + range review! (Lesson 13)",
          task: "Print 1 to 3"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "fruits = [\"사과\", \"바나나\"]\nfruits.append(\"포도\")\nprint(fruits)",
        predict: {
          question: "결과는?",
          options: [
            "[\"포도\", \"사과\", \"바나나\"]",
            "[\"사과\", \"바나나\", \"포도\"]",
            "[\"사과\", \"포도\", \"바나나\"]",
            "에러"
          ],
          answer: 1,
          feedback: "append()는 항상 맨 뒤에 추가해요!"
        },
        result: "['사과', '바나나', '포도']"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["remove()로 특정 값 삭제!"],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]\nfruits.remove(\"바나나\")\nprint(fruits)",
        result: "['사과', '포도']",
        note: "값을 찾아서 첫 번째 것만 삭제해요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]\nprint(len(fruits))",
        predict: {
          question: "len(fruits)의 결과는?",
          options: ["2", "3", "4", "에러"],
          answer: 1,
          feedback: "리스트에 3개의 요소가 있으니까 3!"
        },
        result: "3"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["인덱스로 값을 바꿀 수도 있어!"],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]\nfruits[1] = \"딸기\"\nprint(fruits)",
        result: "['사과', '딸기', '포도']",
        note: "바나나가 딸기로 바뀌었어요!"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트에 \"망고\"를 추가하고 전체 출력",
        guide: "append()를 사용해요!",
        hint: ".append(\"망고\")",
        template: "fruits = [\"사과\", \"바나나\"]\nfruits.___(___)  \nprint(fruits)",
        blanksAnswer: ["append", "\"망고\""],
        answer: "fruits = [\"사과\", \"바나나\"]\nfruits.append(\"망고\")\nprint(fruits)",
        expect: "['사과', '바나나', '망고']",
        en: {
          task: "Add \"mango\" to the list and print everything",
          guide: "Use append()!",
          hint: ".append(\"mango\")"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "리스트에서 \"바나나\"를 삭제하고 길이 출력",
        guide: "remove()로 삭제, len()으로 길이!",
        hint: "remove(\"바나나\") 후 len() 사용",
        template: "fruits = [\"사과\", \"바나나\", \"포도\"]\nfruits.___(___)\nprint(len(___))",
        blanksAnswer: ["remove", "\"바나나\"", "fruits"],
        answer: "fruits = [\"사과\", \"바나나\", \"포도\"]\nfruits.remove(\"바나나\")\nprint(len(fruits))",
        expect: "2",
        en: {
          task: "Remove \"banana\" from the list and print the length",
          guide: "Use remove() to delete, len() for length!",
          hint: "After remove(\"banana\"), use len()"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "다음 코드의 결과는?\nnums = [1, 2, 3]\nnums.append(4)\nprint(len(nums))",
        options: ["3", "4", "5", "[1, 2, 3, 4]"],
        answer: 1,
        explanation: "append(4)로 4를 추가하면 [1, 2, 3, 4]가 되고 len()은 4!",
        en: {
          question: "What is the result of this code?\nnums = [1, 2, 3]\nnums.append(4)\nprint(len(nums))",
          options: ["3", "4", "5", "[1, 2, 3, 4]"],
          explanation: "After append(4), list becomes [1, 2, 3, 4] and len() returns 4!"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "리스트 수정",
        learned: [
          "append() = 맨 끝에 추가",
          "remove() = 값 찾아서 삭제",
          "len() = 리스트 길이",
          "리스트[인덱스] = 값 으로 수정"
        ],
        canDo: "리스트를 자유롭게 추가, 삭제, 수정할 수 있어!",
        emoji: "🛠️"
      }
    },

    // ==================== CHAPTER 4: 리스트 손에 익히기 ====================
    {
      type: "chapter",
      content: {
        num: 4,
        title: "리스트 손에 익히기",
        desc: "[], 인덱싱, append, remove, len — 자동으로 손이 나오게!"
      }
    },

    // Drill 1: 리스트 만들기 + 인덱싱
    {
      type: "practice",
      content: {
        level: 1,
        task: "숫자 리스트를 만들고 세 번째 요소를 출력해요",
        guide: "인덱스는 0부터! 세 번째 = [2]",
        template: "nums = [10, 20, 30, 40, 50]\nprint(nums[___])",
        blanksAnswer: ["2"],
        answer: "nums = [10, 20, 30, 40, 50]\nprint(nums[2])",
        expect: "30",
        en: {
          task: "Create a number list and print the third element",
          guide: "Index starts at 0! Third = [2]"
        }
      }
    },

    // Drill 2: append + len
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트에 두 항목을 추가하고 길이를 출력해요",
        guide: "append() 두 번, 마지막에 len()",
        template: "items = ['펜', '공책']\nitems.___('지우개')\nitems.___('자')\nprint(___(items))",
        blanksAnswer: ["append", "append", "len"],
        answer: "items = ['펜', '공책']\nitems.append('지우개')\nitems.append('자')\nprint(len(items))",
        expect: "4",
        en: {
          task: "Add two items to the list and print the length",
          guide: "append() twice, then len() at the end"
        }
      }
    },

    // Drill 3: append + remove + 출력
    {
      type: "practice",
      content: {
        level: 2,
        task: "'망고'를 추가하고 '바나나'를 제거한 뒤 리스트를 출력해요",
        guide: "append() 후 remove()",
        template: "fruits = ['사과', '바나나', '포도']\nfruits.___('망고')\nfruits.___('바나나')\nprint(fruits)",
        blanksAnswer: ["append", "remove"],
        answer: "fruits = ['사과', '바나나', '포도']\nfruits.append('망고')\nfruits.remove('바나나')\nprint(fruits)",
        expect: "['사과', '포도', '망고']",
        en: {
          task: "Add 'mango' and remove 'banana', then print the list",
          guide: "append() then remove()"
        }
      }
    },

    // Drill 4: 처음부터 — 리스트 만들고 조작
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! 빈 리스트를 만들고\n1부터 5까지 append로 채운 뒤 전체를 출력해요",
        guide: "nums = []; for i in range(1, 6): nums.append(i); print(nums)",
        hint: "nums = []\nfor i in range(1, 6):\n    nums.append(i)\nprint(nums)",
        template: null,
        answer: "nums = []\nfor i in range(1, 6):\n    nums.append(i)\nprint(nums)",
        alternateAnswers: [
          "nums=[]\nfor i in range(1,6):\n    nums.append(i)\nprint(nums)"
        ],
        expect: "[1, 2, 3, 4, 5]",
        en: {
          task: "Write from scratch! Create an empty list, fill it with 1 through 5 using append, then print it",
          guide: "nums = []; for i in range(1, 6): nums.append(i); print(nums)",
          hint: "nums = []\nfor i in range(1, 6):\n    nums.append(i)\nprint(nums)"
        }
      }
    },

    // Drill 5: 처음부터 — 최댓값 찾기
    {
      type: "practice",
      content: {
        level: 3,
        task: "처음부터 작성! 리스트 [3, 7, 1, 9, 4]의 최댓값을 for문으로 직접 찾아 출력해요\n(max() 함수 사용 금지!)",
        guide: "best = nums[0]; for x in nums: if x > best: best = x",
        hint: "nums = [3, 7, 1, 9, 4]\nbest = nums[0]\nfor x in nums:\n    if x > best:\n        best = x\nprint(best)",
        template: null,
        answer: "nums = [3, 7, 1, 9, 4]\nbest = nums[0]\nfor x in nums:\n    if x > best:\n        best = x\nprint(best)",
        alternateAnswers: [
          "nums=[3,7,1,9,4]\nbest=nums[0]\nfor x in nums:\n    if x>best:best=x\nprint(best)"
        ],
        expect: "9",
        en: {
          task: "Write from scratch! Find the maximum value in [3, 7, 1, 9, 4] using a for loop\n(No max() function!)",
          guide: "best = nums[0]; for x in nums: if x > best: best = x",
          hint: "nums = [3, 7, 1, 9, 4]\nbest = nums[0]\nfor x in nums:\n    if x > best:\n        best = x\nprint(best)"
        }
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
