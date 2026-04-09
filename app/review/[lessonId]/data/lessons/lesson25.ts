import { LessonData } from '../types';

export const lesson25: LessonData = {
  id: "25",
  title: "덱 (Deque)",
  description: "양쪽 끝에서 자유롭게! 덱을 마스터하자!",
  steps: [
    // ==================== CHAPTER 1: 덱 개념 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "덱(Deque)이 뭐야?",
        desc: "양쪽 끝에서 추가하고 삭제할 수 있어요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["스택은 한쪽 끝, 큐는 앞뒤 한 방향...", "덱은 양쪽 끝에서 자유롭게!"],
        code: `# 덱 = Double-Ended Queue (양쪽 끝 큐)
# 앞에서도 넣고 빼고, 뒤에서도 넣고 빼고!

from collections import deque

d = deque([1, 2, 3])
print("원래:", list(d))

d.append(4)       # 오른쪽에 추가
d.appendleft(0)   # 왼쪽에 추가
print("양쪽 추가:", list(d))`,
        result: "원래: [1, 2, 3]\n양쪽 추가: [0, 1, 2, 3, 4]",
        note: "Deque = Double-Ended Queue! 양쪽 끝에서 모두 가능!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["양쪽에서 빼기도 가능!"],
        code: `from collections import deque

d = deque([10, 20, 30, 40])

right = d.pop()       # 오른쪽에서 빼기
left = d.popleft()    # 왼쪽에서 빼기

print(f"오른쪽에서 뺌: {right}")
print(f"왼쪽에서 뺌: {left}")
print(f"남은 덱: {list(d)}")`,
        predict: {
          question: "오른쪽 pop, 왼쪽 popleft 후 남는 건?",
          options: ["[10, 20]", "[20, 30]", "[10, 30]", "[20, 40]"],
          answer: 1,
          feedback: "40(오른쪽)과 10(왼쪽)이 빠지고 [20, 30]이 남아요!"
        },
        result: "오른쪽에서 뺌: 40\n왼쪽에서 뺌: 10\n남은 덱: [20, 30]"
      }
    },
    {
      type: "quiz",
      content: {
        question: "Deque의 풀네임은?",
        options: [
          "Double-Ended Queue",
          "Dynamic Efficient Queue",
          "Dual Entry Queue",
          "Data Extended Queue"
        ],
        answer: 0,
        explanation: "Deque = Double-Ended Queue! 양쪽 끝(Double-Ended)에서 작동하는 큐예요.",
        en: {
          question: "What is the full name of Deque?",
          options: [
            "Double-Ended Queue",
            "Dynamic Efficient Queue",
            "Dual Entry Queue",
            "Data Extended Queue"
          ],
          explanation: "Deque = Double-Ended Queue! A queue that operates at both ends."
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "덱 개념",
        learned: [
          "Deque = Double-Ended Queue (양쪽 끝 큐)",
          "양쪽 끝에서 추가/삭제 모두 가능",
          "append/pop (오른쪽) + appendleft/popleft (왼쪽)"
        ],
        canDo: "덱의 개념과 양방향 동작을 이해했어!",
        emoji: "↔️"
      }
    },

    // ==================== CHAPTER 2: deque 메서드 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "deque 핵심 메서드",
        desc: "appendleft, popleft, rotate 마스터!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 큐 복습!",
        task: "큐에 'a', 'b'를 넣고 popleft로 먼저 들어간 걸 출력하세요",
        template: "from collections import deque\nq = deque()\nq.append('a')\nq.append('b')\nprint(q.___())",
        blanksAnswer: ["popleft"],
        answer: "from collections import deque\nq = deque()\nq.append('a')\nq.append('b')\nprint(q.popleft())",
        expect: "a",
        en: {
          message: "🔄 Queue review!",
          task: "Add 'a', 'b' to the queue and popleft to print the first one"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["덱의 4가지 핵심 메서드!"],
        code: `from collections import deque

d = deque([2, 3])

# 오른쪽 추가/삭제
d.append(4)        # [2, 3, 4]
# 왼쪽 추가/삭제
d.appendleft(1)    # [1, 2, 3, 4]

print("추가 후:", list(d))

d.pop()            # 4 제거 → [1, 2, 3]
d.popleft()        # 1 제거 → [2, 3]

print("삭제 후:", list(d))`,
        result: "추가 후: [1, 2, 3, 4]\n삭제 후: [2, 3]",
        note: "append/pop(오른쪽) + appendleft/popleft(왼쪽) = 4가지!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["rotate()로 회전시키기!", "양수면 오른쪽, 음수면 왼쪽으로 회전!"],
        code: `from collections import deque

d = deque([1, 2, 3, 4, 5])
print("원래:", list(d))

d.rotate(2)   # 오른쪽으로 2칸 회전
print("오른쪽 2칸:", list(d))`,
        predict: {
          question: "[1,2,3,4,5]를 오른쪽 2칸 rotate하면?",
          options: ["[4, 5, 1, 2, 3]", "[3, 4, 5, 1, 2]", "[1, 2, 3, 4, 5]", "[2, 3, 4, 5, 1]"],
          answer: 0,
          feedback: "오른쪽으로 2칸! 뒤의 4, 5가 앞으로 와요!"
        },
        result: "원래: [1, 2, 3, 4, 5]\n오른쪽 2칸: [4, 5, 1, 2, 3]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["음수로 rotate하면 왼쪽으로!"],
        code: `from collections import deque

d = deque([1, 2, 3, 4, 5])
d.rotate(-1)  # 왼쪽으로 1칸 회전
print("왼쪽 1칸:", list(d))`,
        predict: {
          question: "[1,2,3,4,5]를 왼쪽 1칸 rotate하면?",
          options: ["[2, 3, 4, 5, 1]", "[5, 1, 2, 3, 4]", "[1, 2, 3, 4, 5]", "[3, 4, 5, 1, 2]"],
          answer: 0,
          feedback: "왼쪽으로 1칸! 맨 앞의 1이 맨 뒤로 이동!"
        },
        result: "왼쪽 1칸: [2, 3, 4, 5, 1]"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "덱의 왼쪽에 0을 추가하세요",
        guide: "appendleft()를 사용!",
        hint: "d.appendleft(값)으로 왼쪽에 추가!",
        template: "from collections import deque\n\nd = deque([1, 2, 3])\nd.___(0)\nprint(list(d))",
        blanksAnswer: ["appendleft"],
        answer: "from collections import deque\n\nd = deque([1, 2, 3])\nd.appendleft(0)\nprint(list(d))",
        expect: "[0, 1, 2, 3]",
        en: {
          task: "Add 0 to the left side of the deque",
          guide: "Use appendleft()!",
          hint: "Use d.appendleft(value) to add to the left!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "덱을 오른쪽으로 1칸 회전시키세요",
        guide: "rotate(1)을 사용!",
        hint: "양수면 오른쪽 회전!",
        template: "from collections import deque\n\nd = deque(['a', 'b', 'c', 'd'])\nd.___(___)\nprint(list(d))",
        blanksAnswer: ["rotate", "1"],
        answer: "from collections import deque\n\nd = deque(['a', 'b', 'c', 'd'])\nd.rotate(1)\nprint(list(d))",
        expect: "['d', 'a', 'b', 'c']",
        en: {
          task: "Rotate the deque one step to the right",
          guide: "Use rotate(1)!",
          hint: "Positive value rotates right!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "deque([1,2,3])에서 appendleft(0) 후 popleft()하면?",
        options: ["0", "1", "3", "에러"],
        answer: 0,
        explanation: "appendleft(0) → [0,1,2,3], popleft() → 0이 나오고 [1,2,3] 남음!",
        en: {
          question: "After appendleft(0) on deque([1,2,3]), what does popleft() return?",
          options: ["0", "1", "3", "Error"],
          explanation: "appendleft(0) → [0,1,2,3], popleft() → returns 0, leaving [1,2,3]!"
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "deque 핵심 메서드",
        learned: [
          "appendleft(x) → 왼쪽에 추가",
          "popleft() → 왼쪽에서 제거",
          "rotate(n) → 양수: 오른쪽, 음수: 왼쪽 회전",
          "모든 양쪽 끝 연산이 O(1)으로 빠름!"
        ],
        canDo: "deque의 핵심 메서드를 자유자재로 사용할 수 있어!",
        emoji: "🎡"
      }
    },

    // ==================== CHAPTER 3: 스택/큐 vs 덱 비교 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "스택/큐 vs 덱 비교",
        desc: "언제 뭘 쓸지 정리하자!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 rotate 복습!",
        task: "덱을 왼쪽으로 2칸 회전시키세요",
        template: "from collections import deque\nd = deque([1, 2, 3, 4, 5])\nd.rotate(___)\nprint(list(d))",
        blanksAnswer: ["-2"],
        answer: "from collections import deque\nd = deque([1, 2, 3, 4, 5])\nd.rotate(-2)\nprint(list(d))",
        expect: "[3, 4, 5, 1, 2]",
        en: {
          message: "🔄 rotate review!",
          task: "Rotate the deque two steps to the left"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["deque 하나로 스택도 큐도 만들 수 있어요!"],
        code: `from collections import deque

# deque를 스택으로 사용
stack = deque()
stack.append(1)    # push
stack.append(2)
print("스택 pop:", stack.pop())   # 2 (LIFO)

# deque를 큐로 사용
queue = deque()
queue.append(1)    # enqueue
queue.append(2)
print("큐 popleft:", queue.popleft())  # 1 (FIFO)`,
        result: "스택 pop: 2\n큐 popleft: 1",
        note: "deque는 만능! 스택과 큐를 모두 대체할 수 있어요."
      }
    },
    {
      type: "explain",
      content: {
        lines: ["정리: 언제 뭘 쓸까?"],
        code: `# 스택 (LIFO) → 리스트 or deque
# - 뒤로가기, 실행취소(Ctrl+Z), 괄호 검사

# 큐 (FIFO) → deque
# - 줄서기, 프린터, 주문처리

# 덱 (양방향) → deque
# - 양쪽 끝에서 추가/삭제 필요할 때
# - 회전이 필요할 때
# - 슬라이딩 윈도우 문제

print("deque 하나면 다 됩니다!")`,
        result: "deque 하나면 다 됩니다!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "다음 중 deque로 할 수 없는 것은?",
        options: [
          "스택처럼 사용 (LIFO)",
          "큐처럼 사용 (FIFO)",
          "인덱스로 중간 요소 빠르게 접근",
          "양쪽 끝에서 추가/삭제"
        ],
        answer: 2,
        explanation: "deque는 양쪽 끝 연산은 O(1)이지만, 중간 접근은 O(n)으로 리스트보다 느려요!",
        en: {
          question: "Which of the following cannot be done efficiently with deque?",
          options: [
            "Use as a stack (LIFO)",
            "Use as a queue (FIFO)",
            "Fast access to middle elements by index",
            "Add/remove at both ends"
          ],
          explanation: "deque is O(1) at both ends, but middle access is O(n) — slower than a list!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "deque를 스택처럼 사용해서 'a', 'b', 'c'를 넣고 pop하세요",
        guide: "append와 pop 사용!",
        hint: "스택 = append + pop (LIFO)",
        template: "from collections import deque\n\nstack = deque()\nstack.append('a')\nstack.append('b')\nstack.append('c')\nprint(stack.___())",
        blanksAnswer: ["pop"],
        answer: "from collections import deque\n\nstack = deque()\nstack.append('a')\nstack.append('b')\nstack.append('c')\nprint(stack.pop())",
        expect: "c",
        en: {
          task: "Use deque as a stack to push 'a', 'b', 'c' and then pop",
          guide: "Use append and pop!",
          hint: "Stack = append + pop (LIFO)"
        }
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `from collections import deque
d = deque([1, 2, 3])
d.rotate()
print(list(d))`,
        options: [
          "rotate()에 인자가 없으면 에러",
          "문제없음 (기본값 1로 회전)",
          "deque에 rotate 메서드는 없음",
          "list() 변환이 불가능"
        ],
        answer: 1,
        explanation: "rotate()의 기본값은 1이에요! 인자 없이 호출하면 오른쪽으로 1칸 회전합니다."
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "스택/큐 vs 덱",
        learned: [
          "스택: append + pop (LIFO)",
          "큐: append + popleft (FIFO)",
          "덱: 양쪽 끝 모두 가능 + rotate",
          "deque 하나로 스택과 큐를 모두 구현 가능!"
        ],
        canDo: "상황에 맞게 스택, 큐, 덱을 선택할 수 있어!",
        emoji: "🎯"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
