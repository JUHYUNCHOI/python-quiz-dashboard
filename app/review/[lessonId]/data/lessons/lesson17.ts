// 레슨 17: 리스트와 반복문
import { LessonData } from '../types';

export const lesson17: LessonData = {
  id: "17",
  title: "리스트와 반복문",
  description: "리스트와 for문을 함께 활용하자!",
  steps: [
    // ==================== CHAPTER 1: for문으로 리스트 순회 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "for문으로 리스트 순회",
        desc: "리스트의 모든 요소를 하나씩 처리!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["for문으로 리스트를 순회할 수 있어!"],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]\nfor fruit in fruits:\n    print(fruit)",
        result: "사과\n바나나\n포도",
        note: "리스트의 각 요소가 fruit 변수에 차례로 들어가요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["숫자 리스트도 순회 가능!"],
        code: "scores = [90, 85, 100]\ntotal = 0\nfor score in scores:\n    total += score\nprint(total)",
        predict: {
          question: "total의 결과는?",
          options: ["90", "175", "275", "100"],
          answer: 2,
          feedback: "90 + 85 + 100 = 275!"
        },
        result: "275"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["for문 안에서 조건문도 사용!"],
        code: "numbers = [1, 2, 3, 4, 5, 6]\nfor num in numbers:\n    if num % 2 == 0:\n        print(num)",
        predict: {
          question: "출력 결과는?",
          options: ["1 3 5", "2 4 6", "1 2 3 4 5 6", "에러"],
          answer: 1,
          feedback: "짝수만 출력! 2, 4, 6이 나와요."
        },
        result: "2\n4\n6"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트의 모든 이름에 '님' 붙여서 출력",
        guide: "f-string을 사용해요!",
        hint: "f'{name}님' 형태로!",
        template: "names = [\"지민\", \"유진\", \"민수\"]\nfor ___ in names:\n    print(f'{___}님')",
        blanksAnswer: ["name", "name"],
        answer: "names = [\"지민\", \"유진\", \"민수\"]\nfor name in names:\n    print(f'{name}님')",
        expect: "지민님\n유진님\n민수님"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "숫자 리스트에서 80 이상인 점수만 출력",
        guide: "if문으로 조건 체크!",
        hint: "if score >= 80:",
        template: "scores = [75, 90, 60, 85, 100]\nfor score in scores:\n    ___ score ___ 80:\n        print(score)",
        blanksAnswer: ["if", ">="],
        answer: "scores = [75, 90, 60, 85, 100]\nfor score in scores:\n    if score >= 80:\n        print(score)",
        expect: "90\n85\n100"
      }
    },
    {
      type: "quiz",
      content: {
        question: "다음 코드의 출력은?\nfor x in [10, 20, 30]:\n    print(x * 2)",
        options: ["10 20 30", "20 40 60", "[20, 40, 60]", "에러"],
        answer: 1,
        explanation: "각 요소에 2를 곱해서 출력: 20, 40, 60!"
      }
    },
    {
      type: "reward",
      content: {
        message: "리스트 순회 마스터!",
        emoji: "🔁"
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "for문으로 리스트 순회",
        learned: [
          "for x in 리스트: = 하나씩 꺼내기",
          "순회하면서 합계 구하기 가능",
          "for + if = 조건에 맞는 것만 처리"
        ],
        canDo: "리스트의 모든 요소를 하나씩 처리할 수 있어!",
        emoji: "🔁"
      }
    },

    // ==================== CHAPTER 2: enumerate() 사용 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "enumerate() 사용",
        desc: "순서 번호와 값을 함께 받자!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 리스트 인덱싱 복습! (레슨 16)",
        task: "리스트의 첫 번째 요소 출력하기",
        template: "colors = [\"빨강\", \"파랑\", \"초록\"]\nprint(colors[___])",
        blanksAnswer: ["0"],
        answer: "colors = [\"빨강\", \"파랑\", \"초록\"]\nprint(colors[0])",
        expect: "빨강"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["인덱스도 같이 알고 싶다면?", "enumerate()를 사용!"],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]\nfor i, fruit in enumerate(fruits):\n    print(f\"{i}: {fruit}\")",
        result: "0: 사과\n1: 바나나\n2: 포도",
        note: "i에는 인덱스, fruit에는 값이 들어가요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["시작 번호를 바꿀 수도 있어!"],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]\nfor i, fruit in enumerate(fruits, 1):\n    print(f\"{i}번: {fruit}\")",
        predict: {
          question: "첫 번째 출력은?",
          options: ["0번: 사과", "1번: 사과", "1번: 바나나", "에러"],
          answer: 1,
          feedback: "enumerate(리스트, 1)은 1부터 번호를 매겨요!"
        },
        result: "1번: 사과\n2번: 바나나\n3번: 포도"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["enumerate 없이 인덱스를 쓰려면?", "range(len())을 써야 해서 불편해요"],
        code: "fruits = [\"사과\", \"바나나\", \"포도\"]\nfor i in range(len(fruits)):\n    print(f\"{i}: {fruits[i]}\")",
        result: "0: 사과\n1: 바나나\n2: 포도",
        note: "enumerate()가 훨씬 깔끔하죠?"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "enumerate로 학생 이름에 1부터 번호 매기기",
        guide: "enumerate(리스트, 시작번호) 기억!",
        hint: "enumerate(students, 1) 사용!",
        template: "students = [\"철수\", \"영희\", \"민수\"]\nfor i, name in ___(students, ___):\n    print(f\"{i}번: {name}\")",
        blanksAnswer: ["enumerate", "1"],
        answer: "students = [\"철수\", \"영희\", \"민수\"]\nfor i, name in enumerate(students, 1):\n    print(f\"{i}번: {name}\")",
        expect: "1번: 철수\n2번: 영희\n3번: 민수"
      }
    },
    {
      type: "quiz",
      content: {
        question: "enumerate([\"a\", \"b\", \"c\"])의 첫 번째 값은?",
        options: ["(1, \"a\")", "(0, \"a\")", "\"a\"", "[0, \"a\"]"],
        answer: 1,
        explanation: "enumerate()는 기본적으로 0부터 시작하는 (인덱스, 값) 쌍을 줘요!"
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "enumerate() 사용",
        learned: [
          "enumerate() = 인덱스 + 값 동시에",
          "enumerate(리스트, 시작) = 번호 변경 가능",
          "range(len())보다 깔끔!"
        ],
        canDo: "리스트를 순회하면서 인덱스도 함께 활용할 수 있어!",
        emoji: "🔢"
      }
    },

    // ==================== CHAPTER 3: 리스트 컴프리헨션 기초 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "리스트 컴프리헨션 기초",
        desc: "한 줄로 새 리스트 만들기!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 리스트 append 복습! (레슨 16)",
        task: "리스트에 \"딸기\" 추가하기",
        template: "fruits = [\"사과\", \"바나나\"]\nfruits.___(___)  \nprint(fruits)",
        blanksAnswer: ["append", "\"딸기\""],
        answer: "fruits = [\"사과\", \"바나나\"]\nfruits.append(\"딸기\")\nprint(fruits)",
        expect: "['사과', '바나나', '딸기']"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["for문으로 새 리스트를 만드는 기존 방법"],
        code: "numbers = [1, 2, 3, 4, 5]\ndoubled = []\nfor n in numbers:\n    doubled.append(n * 2)\nprint(doubled)",
        result: "[2, 4, 6, 8, 10]",
        note: "이걸 한 줄로 줄일 수 있어!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["리스트 컴프리헨션으로 한 줄에!"],
        code: "numbers = [1, 2, 3, 4, 5]\ndoubled = [n * 2 for n in numbers]\nprint(doubled)",
        predict: {
          question: "결과는?",
          options: ["[1, 2, 3, 4, 5]", "[2, 4, 6, 8, 10]", "에러", "[1, 4, 9, 16, 25]"],
          answer: 1,
          feedback: "각 n에 2를 곱한 새 리스트가 만들어져요!"
        },
        result: "[2, 4, 6, 8, 10]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["조건을 붙일 수도 있어!"],
        code: "numbers = [1, 2, 3, 4, 5, 6]\nevens = [n for n in numbers if n % 2 == 0]\nprint(evens)",
        predict: {
          question: "결과는?",
          options: ["[1, 3, 5]", "[2, 4, 6]", "[1, 2, 3, 4, 5, 6]", "에러"],
          answer: 1,
          feedback: "if 조건에 맞는 것만 새 리스트에 들어가요!"
        },
        result: "[2, 4, 6]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["문자열 리스트에도 사용 가능!"],
        code: "names = [\"철수\", \"영희\", \"민수\"]\ngreetings = [f\"{name}님 안녕!\" for name in names]\nprint(greetings)",
        result: "['철수님 안녕!', '영희님 안녕!', '민수님 안녕!']",
        note: "f-string과 컴프리헨션의 조합!"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "1~5의 제곱을 리스트 컴프리헨션으로 만들기",
        guide: "[표현식 for 변수 in 범위] 형태!",
        hint: "n ** 2 또는 n * n 사용!",
        template: "squares = [___ for n in range(1, 6)]\nprint(squares)",
        blanksAnswer: ["n ** 2"],
        answer: "squares = [n ** 2 for n in range(1, 6)]\nprint(squares)",
        expect: "[1, 4, 9, 16, 25]"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "리스트에서 3글자 이상인 단어만 모으기",
        guide: "if 조건을 뒤에 붙여요!",
        hint: "len(w) >= 3 조건 사용!",
        template: "words = [\"나\", \"사과\", \"안녕하세요\", \"밥\"]\nlong = [w for w in words ___ len(w) >= ___]\nprint(long)",
        blanksAnswer: ["if", "3"],
        answer: "words = [\"나\", \"사과\", \"안녕하세요\", \"밥\"]\nlong = [w for w in words if len(w) >= 3]\nprint(long)",
        expect: "['안녕하세요']"
      }
    },
    {
      type: "quiz",
      content: {
        question: "[x + 1 for x in [10, 20, 30]]의 결과는?",
        options: ["[10, 20, 30]", "[11, 21, 31]", "[1, 1, 1]", "에러"],
        answer: 1,
        explanation: "각 요소에 1을 더한 새 리스트 [11, 21, 31]이 만들어져요!"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "리스트 컴프리헨션 기초",
        learned: [
          "[표현식 for 변수 in 반복대상] = 새 리스트",
          "[표현식 for 변수 in 반복대상 if 조건] = 필터링",
          "for + append 패턴을 한 줄로!"
        ],
        canDo: "리스트 컴프리헨션으로 깔끔하게 새 리스트를 만들 수 있어!",
        emoji: "✨"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
