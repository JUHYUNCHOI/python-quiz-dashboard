import { LessonData } from '../types';

export const lesson26: LessonData = {
  id: "26",
  title: "자료구조 비교와 선택",
  description: "어떤 상황에 어떤 자료구조? 총정리!",
  steps: [
    // ==================== CHAPTER 1: 자료구조 총정리 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "자료구조 총정리",
        desc: "list, tuple, dict, set, stack, queue, deque!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["지금까지 배운 자료구조를 한눈에!"],
        code: `# 1. 리스트 (list) - 순서 있고, 수정 가능
fruits = ["사과", "바나나", "포도"]

# 2. 튜플 (tuple) - 순서 있고, 수정 불가
point = (3, 4)

# 3. 딕셔너리 (dict) - 키:값 쌍
student = {"이름": "철수", "나이": 15}

# 4. 집합 (set) - 중복 없음, 순서 없음
unique = {1, 2, 3, 3, 2}
print(unique)`,
        result: "{1, 2, 3}",
        note: "기본 4가지! 이제 스택, 큐, 덱도 추가!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["스택, 큐, 덱은 리스트/deque로 구현!"],
        code: `from collections import deque

# 5. 스택 (Stack) - LIFO
stack = []
stack.append(1); stack.pop()

# 6. 큐 (Queue) - FIFO
queue = deque()
queue.append(1); queue.popleft()

# 7. 덱 (Deque) - 양쪽 끝
d = deque()
d.appendleft(1); d.append(2)

print("7가지 자료구조 완료!")`,
        result: "7가지 자료구조 완료!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "수정이 불가능한 자료구조는?",
        options: ["리스트 (list)", "튜플 (tuple)", "딕셔너리 (dict)", "덱 (deque)"],
        answer: 1,
        explanation: "튜플은 한 번 만들면 수정, 추가, 삭제가 불가능해요! 안전하게 데이터를 보관할 때 써요."
      }
    },
    {
      type: "quiz",
      content: {
        question: "중복을 자동으로 제거해주는 자료구조는?",
        options: ["리스트 (list)", "튜플 (tuple)", "딕셔너리 (dict)", "집합 (set)"],
        answer: 3,
        explanation: "set은 중복을 허용하지 않아요! {1, 1, 2, 2} → {1, 2}"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "리스트에서 중복을 제거하세요 (set 활용)",
        guide: "set()으로 변환 후 다시 list()!",
        hint: "list(set(리스트))로 중복 제거!",
        template: "nums = [1, 2, 2, 3, 3, 3]\nresult = list(___(nums))\nprint(sorted(result))",
        blanksAnswer: ["set"],
        answer: "nums = [1, 2, 2, 3, 3, 3]\nresult = list(set(nums))\nprint(sorted(result))",
        expect: "[1, 2, 3]"
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "자료구조 총정리",
        learned: [
          "list: 순서O, 수정O, 중복O",
          "tuple: 순서O, 수정X, 중복O",
          "dict: 키:값, 키로 빠른 검색",
          "set: 중복X, 순서X",
          "stack: LIFO (append + pop)",
          "queue: FIFO (append + popleft)",
          "deque: 양쪽 끝 추가/삭제"
        ],
        canDo: "7가지 자료구조의 특징을 이해했어!",
        emoji: "📚"
      }
    },

    // ==================== CHAPTER 2: 상황별 자료구조 선택 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "상황별 자료구조 선택",
        desc: "언제 어떤 자료구조를 쓸까?"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 덱 복습!",
        task: "deque에 왼쪽으로 0을 추가하세요",
        template: "from collections import deque\nd = deque([1, 2, 3])\nd.___(0)\nprint(list(d))",
        blanksAnswer: ["appendleft"],
        answer: "from collections import deque\nd = deque([1, 2, 3])\nd.appendleft(0)\nprint(list(d))",
        expect: "[0, 1, 2, 3]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["학생 성적 관리 → 딕셔너리!"],
        code: `scores = {
    "철수": 95,
    "영희": 88,
    "민수": 92
}

# 이름으로 바로 찾기!
print(f"철수 점수: {scores['철수']}")

# 새 학생 추가
scores["지민"] = 90
print(f"전체: {scores}")`,
        result: "철수 점수: 95\n전체: {'철수': 95, '영희': 88, '민수': 92, '지민': 90}",
        note: "이름(키)으로 빠르게 찾아야 할 때 → 딕셔너리!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["출석 체크 (중복 방지) → 집합!"],
        code: `attendance = set()

attendance.add("철수")
attendance.add("영희")
attendance.add("철수")  # 중복! 무시됨

print(f"출석 인원: {len(attendance)}명")
print(f"출석부: {attendance}")`,
        predict: {
          question: "철수를 2번 add하면 몇 명?",
          options: ["3명", "2명", "1명", "에러"],
          answer: 1,
          feedback: "set은 중복을 자동 제거! 철수는 한 번만 저장돼요."
        },
        result: "출석 인원: 2명\n출석부: {'철수', '영희'}"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["실행 취소(Undo) → 스택!"],
        code: `# 실행 취소는 가장 최근 작업부터!
undo_stack = []

undo_stack.append("글자 입력: A")
undo_stack.append("글자 입력: B")
undo_stack.append("글자 삭제")

# Ctrl+Z 누르면?
last_action = undo_stack.pop()
print(f"취소: {last_action}")
print(f"남은 기록: {undo_stack}")`,
        result: "취소: 글자 삭제\n남은 기록: ['글자 입력: A', '글자 입력: B']",
        note: "가장 최근 작업을 취소 → LIFO → 스택!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "은행 번호표 시스템에 적합한 자료구조는?",
        options: ["스택 (Stack)", "큐 (Queue)", "집합 (Set)", "튜플 (Tuple)"],
        answer: 1,
        explanation: "먼저 번호표를 뽑은 사람이 먼저 서비스 받아요! FIFO = 큐!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "좌표 (x, y)를 저장할 때 적합한 자료구조는?",
        options: ["리스트 (list)", "튜플 (tuple)", "딕셔너리 (dict)", "집합 (set)"],
        answer: 1,
        explanation: "좌표는 한번 정하면 바꿀 일이 없어요! 수정 불가인 튜플이 안전해요."
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "딕셔너리로 과일 가격표를 만들고 사과 가격을 출력하세요",
        guide: "{ 키: 값 } 형태로 만들기!",
        hint: "prices = {'사과': 1000, ...} 처럼!",
        template: "prices = {___: 1000, '바나나': 500}\nprint(prices[___])",
        blanksAnswer: ["'사과'", "'사과'"],
        answer: "prices = {'사과': 1000, '바나나': 500}\nprint(prices['사과'])",
        expect: "1000"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "큐로 대기열을 만들고 첫 번째 사람을 처리하세요",
        guide: "deque + append + popleft!",
        hint: "from collections import deque로 시작!",
        template: "from collections import ___\n\nwait = deque()\nwait.append('1번')\nwait.append('2번')\nwait.append('3번')\nprint(f'{wait.___()}님 차례입니다!')",
        blanksAnswer: ["deque", "popleft"],
        answer: "from collections import deque\n\nwait = deque()\nwait.append('1번')\nwait.append('2번')\nwait.append('3번')\nprint(f'{wait.popleft()}님 차례입니다!')",
        expect: "1번님 차례입니다!"
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "상황별 선택",
        learned: [
          "이름으로 검색 → 딕셔너리",
          "중복 방지 → 집합",
          "실행취소 → 스택 (LIFO)",
          "줄서기/대기열 → 큐 (FIFO)",
          "수정 불가 데이터 → 튜플"
        ],
        canDo: "상황에 맞는 자료구조를 선택할 수 있어!",
        emoji: "🧭"
      }
    },

    // ==================== CHAPTER 3: 종합 퀴즈 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "종합 퀴즈",
        desc: "지금까지 배운 걸 총복습!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 슬라이싱 복습!",
        task: "리스트를 뒤집어서 출력하세요",
        template: "nums = [1, 2, 3, 4, 5]\nprint(nums[::___])",
        blanksAnswer: ["-1"],
        answer: "nums = [1, 2, 3, 4, 5]\nprint(nums[::-1])",
        expect: "[5, 4, 3, 2, 1]"
      }
    },
    {
      type: "quiz",
      content: {
        question: "다음 중 LIFO 방식의 자료구조는?",
        options: ["큐 (Queue)", "스택 (Stack)", "덱 (Deque)", "리스트 (List)"],
        answer: 1,
        explanation: "LIFO = Last In, First Out! 마지막에 넣은 게 먼저 나오는 스택이에요."
      }
    },
    {
      type: "quiz",
      content: {
        question: "deque의 popleft()와 같은 동작을 리스트로 하면?",
        options: ["list.pop()", "list.pop(0)", "list.remove(0)", "list.popleft()"],
        answer: 1,
        explanation: "list.pop(0)은 첫 번째 요소를 제거해요. 하지만 deque.popleft()보다 느려요!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "딕셔너리에서 키가 존재하는지 확인하는 방법은?",
        options: ["key in dict", "dict.has(key)", "dict.find(key)", "dict.exists(key)"],
        answer: 0,
        explanation: "'key' in dict로 키 존재 여부를 확인할 수 있어요!"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `point = (3, 4)
point[0] = 5`,
        options: [
          "튜플은 수정 불가! TypeError 발생",
          "인덱스가 잘못됨",
          "튜플에 = 대신 : 사용",
          "문제없음"
        ],
        answer: 0,
        explanation: "튜플은 불변(immutable)! 값을 바꾸려고 하면 TypeError가 발생해요."
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "set으로 두 리스트의 공통 요소를 찾으세요",
        guide: "교집합 연산자 & 사용!",
        hint: "set(a) & set(b)로 교집합!",
        template: "a = [1, 2, 3, 4]\nb = [3, 4, 5, 6]\ncommon = ___(a) ___ set(b)\nprint(sorted(common))",
        blanksAnswer: ["set", "&"],
        answer: "a = [1, 2, 3, 4]\nb = [3, 4, 5, 6]\ncommon = set(a) & set(b)\nprint(sorted(common))",
        expect: "[3, 4]"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "스택을 이용해서 문자열 'hello'를 뒤집으세요",
        guide: "각 글자를 push 후 pop!",
        hint: "append로 넣고 pop으로 빼면서 새 문자열 만들기!",
        template: null,
        answer: "stack = []\nfor ch in 'hello':\n    stack.append(ch)\n\nresult = ''\nwhile len(stack) > 0:\n    result += stack.pop()\nprint(result)",
        alternateAnswers: [
          "stack = []\nfor ch in 'hello':\n    stack.append(ch)\nresult = ''\nwhile stack:\n    result += stack.pop()\nprint(result)"
        ],
        expect: "olleh"
      }
    },
    {
      type: "quiz",
      content: {
        question: "deque([1,2,3]).rotate(-1) 의 결과는?",
        options: ["[2, 3, 1]", "[3, 1, 2]", "[1, 2, 3]", "[3, 2, 1]"],
        answer: 0,
        explanation: "rotate(-1)은 왼쪽으로 1칸 회전! 맨 앞의 1이 맨 뒤로 → [2, 3, 1]"
      }
    },
    {
      type: "reward",
      content: {
        emoji: "🏆",
        message: "자료구조 마스터!"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "종합 정리",
        learned: [
          "list: 범용, 순서 있는 데이터",
          "tuple: 변경 불가, 안전한 데이터",
          "dict: 키로 빠른 검색",
          "set: 중복 제거, 집합 연산",
          "stack: LIFO (실행취소, 뒤로가기)",
          "queue: FIFO (줄서기, 대기열)",
          "deque: 양쪽 끝 + 회전"
        ],
        canDo: "상황에 맞는 최적의 자료구조를 선택할 수 있어!",
        emoji: "🎓"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
