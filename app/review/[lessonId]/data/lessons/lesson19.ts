// 레슨 19: 튜플
import { LessonData } from '../types';

export const lesson19: LessonData = {
  id: "19",
  title: "튜플",
  description: "변경 불가능한 시퀀스, 튜플을 배워요!",
  steps: [
    // ==================== CHAPTER 1: 튜플 만들기 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "튜플 만들기",
        desc: "소괄호로 묶는 변경 불가 리스트!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["튜플은 소괄호 ()로 만들어요!"],
        code: "colors = ('빨강', '파랑', '초록')\nprint(colors)\nprint(type(colors))",
        result: "('빨강', '파랑', '초록')\n<class 'tuple'>",
        note: "리스트와 비슷하지만 () 소괄호를 써요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["tuple() 함수로도 만들 수 있어요!"],
        code: "nums = tuple([1, 2, 3])\nprint(nums)",
        predict: {
          question: "결과는?",
          options: ["[1, 2, 3]", "(1, 2, 3)", "{1, 2, 3}"],
          answer: 1,
          feedback: "tuple()로 리스트를 튜플로 변환!"
        },
        result: "(1, 2, 3)"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["튜플은 수정이 불가능해요! (immutable)"],
        code: "colors = ('빨강', '파랑', '초록')\ncolors[0] = '노랑'",
        result: "TypeError: 'tuple' object does not support item assignment",
        isError: true,
        note: "리스트와 가장 큰 차이! 한 번 만들면 바꿀 수 없어요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["인덱싱과 길이는 리스트와 똑같아요!"],
        code: "fruits = ('사과', '바나나', '포도')\nprint(fruits[0])\nprint(fruits[-1])\nprint(len(fruits))",
        predict: {
          question: "출력 결과는?",
          options: ["사과\\n포도\\n3", "사과\\n바나나\\n3", "(사과)\\n(포도)\\n3"],
          answer: 0,
          feedback: "인덱싱은 리스트와 동일! [0]은 첫째, [-1]은 마지막!"
        },
        result: "사과\n포도\n3"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "리스트 복습! 리스트와 비교해봐요!",
        task: "리스트 [10, 20, 30]에서 두 번째 값을 출력하세요",
        template: "nums = [10, 20, 30]\nprint(nums[___])",
        blanksAnswer: ["1"],
        answer: "nums = [10, 20, 30]\nprint(nums[1])",
        expect: "20"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "튜플 ('월', '화', '수')를 만들고 첫 번째 요소를 출력하세요",
        guide: "소괄호로 만들고 [0]으로 접근!",
        hint: "days = ('월', '화', '수') 후 print(days[0])",
        template: "days = (___)\nprint(days[___])",
        blanksAnswer: ["'월', '화', '수'", "0"],
        answer: "days = ('월', '화', '수')\nprint(days[0])",
        expect: "월"
      }
    },
    {
      type: "quiz",
      content: {
        question: "튜플과 리스트의 가장 큰 차이점은?",
        options: [
          "튜플은 숫자만 저장 가능",
          "튜플은 수정이 불가능",
          "튜플은 인덱싱이 안 됨",
          "튜플은 3개까지만 저장 가능"
        ],
        answer: 1,
        explanation: "튜플은 immutable(불변)! 한 번 만들면 요소를 추가, 삭제, 변경할 수 없어요."
      }
    },
    {
      type: "reward",
      content: {
        message: "튜플 기초 완벽!",
        emoji: "📦"
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "튜플 만들기",
        learned: [
          "() 소괄호로 튜플을 만들어요",
          "tuple()로 변환할 수 있어요",
          "인덱싱, len()은 리스트와 동일",
          "수정 불가능 (immutable)!"
        ],
        canDo: "튜플을 만들고 값을 읽을 수 있어!",
        emoji: "📦"
      }
    },

    // ==================== CHAPTER 2: 튜플 활용 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "튜플 활용",
        desc: "언패킹, 함수 반환값, 값 교환!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["튜플 언패킹 = 한 번에 여러 변수에 넣기!"],
        code: "name, age, city = ('민수', 15, '서울')\nprint(name)\nprint(age)\nprint(city)",
        predict: {
          question: "출력 결과는?",
          options: ["('민수', 15, '서울')", "민수\\n15\\n서울", "에러"],
          answer: 1,
          feedback: "튜플의 각 값이 변수에 하나씩 들어가요!"
        },
        result: "민수\n15\n서울"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["함수에서 여러 값을 돌려줄 때 튜플!"],
        code: "def min_max(numbers):\n    return min(numbers), max(numbers)\n\nresult = min_max([3, 1, 7, 2])\nprint(result)\nprint(type(result))",
        result: "(1, 7)\n<class 'tuple'>",
        note: "콤마로 구분하면 자동으로 튜플이 돼요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["언패킹으로 바로 받으면 편해요!"],
        code: "def min_max(numbers):\n    return min(numbers), max(numbers)\n\nsmallest, biggest = min_max([3, 1, 7, 2])\nprint(f'최솟값: {smallest}')\nprint(f'최댓값: {biggest}')",
        result: "최솟값: 1\n최댓값: 7",
        note: "함수 반환값을 바로 언패킹!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["파이썬의 마법! 두 변수 값 교환!"],
        code: "a = 10\nb = 20\nprint(f'교환 전: a={a}, b={b}')\n\na, b = b, a\nprint(f'교환 후: a={a}, b={b}')",
        predict: {
          question: "교환 후 a와 b의 값은?",
          options: ["a=10, b=20", "a=20, b=10", "a=20, b=20", "에러"],
          answer: 1,
          feedback: "a, b = b, a는 튜플 언패킹을 이용한 값 교환!"
        },
        result: "교환 전: a=10, b=20\n교환 후: a=20, b=10"
      }
    },
    {
      type: "practice",
      content: {
        level: 1.5,
        task: "튜플 ('파이썬', 2024)를 언패킹해서 name과 year에 넣고 출력하세요",
        guide: "name, year = 튜플 형태로!",
        hint: "name, year = ('파이썬', 2024) 후 print!",
        template: "___, ___ = ('파이썬', 2024)\nprint(f'{name} {year}')",
        blanksAnswer: ["name", "year"],
        answer: "name, year = ('파이썬', 2024)\nprint(f'{name} {year}')",
        expect: "파이썬 2024"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "x=5, y=10의 값을 교환하고 출력하세요",
        guide: "a, b = b, a 패턴!",
        hint: "x, y = y, x 한 줄이면 끝!",
        template: "x = 5\ny = 10\nx, y = ___, ___\nprint(f'x={x}, y={y}')",
        blanksAnswer: ["y", "x"],
        answer: "x = 5\ny = 10\nx, y = y, x\nprint(f'x={x}, y={y}')",
        expect: "x=10, y=5"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "리스트 복습! 리스트에서 최댓값 찾기",
        task: "리스트 [4, 9, 2, 7]에서 max()로 최댓값을 출력하세요",
        template: "nums = [4, 9, 2, 7]\nprint(___)",
        blanksAnswer: ["max(nums)"],
        answer: "nums = [4, 9, 2, 7]\nprint(max(nums))",
        expect: "9"
      }
    },
    {
      type: "reward",
      content: {
        message: "튜플 활용 마스터!",
        emoji: "🎯"
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "튜플 활용",
        learned: [
          "언패킹: a, b, c = (1, 2, 3)",
          "함수에서 여러 값 반환: return a, b",
          "값 교환: a, b = b, a"
        ],
        canDo: "튜플 언패킹과 값 교환을 할 수 있어!",
        emoji: "🎯"
      }
    },

    // ==================== CHAPTER 3: 리스트 vs 튜플 비교 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "리스트 vs 튜플",
        desc: "언제 뭘 쓰는 게 좋을까?"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["리스트 = 변경 가능 / 튜플 = 변경 불가!"],
        code: "# 리스트: 수정 가능\nfruits = ['사과', '바나나']\nfruits.append('포도')\nprint(fruits)\n\n# 튜플: 수정 불가\ncolors = ('빨강', '파랑')\n# colors.append('초록')  # 에러!",
        result: "['사과', '바나나', '포도']",
        note: "바뀌어야 하면 리스트, 바뀌면 안 되면 튜플!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["튜플은 딕셔너리의 키로 쓸 수 있어요!"],
        code: "# 좌표를 키로 사용!\nmap_data = {}\nmap_data[(0, 0)] = '시작'\nmap_data[(1, 2)] = '보물'\nprint(map_data[(1, 2)])",
        predict: {
          question: "출력 결과는?",
          options: ["(1, 2)", "보물", "시작", "에러"],
          answer: 1,
          feedback: "튜플은 불변이라 딕셔너리 키로 사용 가능!"
        },
        result: "보물"
      }
    },
    {
      type: "quiz",
      content: {
        question: "다음 중 튜플을 써야 하는 상황은?",
        options: [
          "학생 명단을 추가/삭제해야 할 때",
          "요일 이름처럼 절대 변하지 않는 데이터",
          "장바구니에 물건을 넣었다 뺄 때",
          "게임 점수를 기록할 때"
        ],
        answer: 1,
        explanation: "월, 화, 수...처럼 변하지 않는 데이터에 튜플이 딱! 바뀌어야 하면 리스트!"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "좌표 튜플 (3, 5)를 x, y로 언패킹하고 'x좌표: 3, y좌표: 5' 형태로 출력하세요",
        guide: "x, y = (3, 5) 후 f-string!",
        hint: "f'x좌표: {x}, y좌표: {y}'",
        template: "point = (3, 5)\n___, ___ = point\nprint(f'x좌표: {x}, y좌표: {y}')",
        blanksAnswer: ["x", "y"],
        answer: "point = (3, 5)\nx, y = point\nprint(f'x좌표: {x}, y좌표: {y}')",
        expect: "x좌표: 3, y좌표: 5"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "리스트 복습! append로 추가하기",
        task: "리스트 ['a', 'b']에 'c'를 추가하고 출력하세요",
        template: "letters = ['a', 'b']\nletters.___(___)\nprint(letters)",
        blanksAnswer: ["append", "'c'"],
        answer: "letters = ['a', 'b']\nletters.append('c')\nprint(letters)",
        expect: "['a', 'b', 'c']"
      }
    },
    {
      type: "quiz",
      content: {
        question: "다음 중 올바른 것은?",
        options: [
          "t = (1, 2, 3); t[0] = 10  # 가능",
          "t = (1, 2, 3); t.append(4)  # 가능",
          "t = (1, 2, 3); print(t[0])  # 가능",
          "t = (1, 2, 3); del t[0]  # 가능"
        ],
        answer: 2,
        explanation: "튜플은 읽기만 가능! 수정, 추가, 삭제는 불가능해요."
      }
    },
    {
      type: "reward",
      content: {
        message: "리스트 vs 튜플 완벽 이해!",
        emoji: "🏆"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "리스트 vs 튜플",
        learned: [
          "리스트 []: 수정 가능 (mutable)",
          "튜플 (): 수정 불가 (immutable)",
          "변하지 않는 데이터에 튜플 사용",
          "튜플은 딕셔너리 키로 사용 가능"
        ],
        canDo: "상황에 맞게 리스트와 튜플을 선택할 수 있어!",
        emoji: "🏆"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
