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
        lines: ["숫자 리스트도 만들 수 있어!"],
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
        lines: ["빈 리스트도 만들 수 있어!"],
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
        expect: "['빨강', '파랑', '초록']"
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
        explanation: "리스트는 대괄호 [ ]를 사용해요! ( )는 튜플, { }는 딕셔너리나 집합이에요."
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
        expect: "0\n1\n2"
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
        lines: ["음수 인덱스로 뒤에서부터 접근!"],
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
        expect: "고양이"
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
        expect: "50"
      }
    },
    {
      type: "quiz",
      content: {
        question: "colors = [\"빨강\", \"파랑\", \"초록\"]일 때 colors[2]는?",
        options: ["빨강", "파랑", "초록", "에러"],
        answer: 2,
        explanation: "인덱스 0=빨강, 1=파랑, 2=초록!"
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
        expect: "1\n2\n3"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["append()로 끝에 추가!"],
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
        lines: ["len()으로 리스트 길이 확인!"],
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
        expect: "['사과', '바나나', '망고']"
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
        expect: "2"
      }
    },
    {
      type: "quiz",
      content: {
        question: "다음 코드의 결과는?\nnums = [1, 2, 3]\nnums.append(4)\nprint(len(nums))",
        options: ["3", "4", "5", "[1, 2, 3, 4]"],
        answer: 1,
        explanation: "append(4)로 4를 추가하면 [1, 2, 3, 4]가 되고 len()은 4!"
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

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
