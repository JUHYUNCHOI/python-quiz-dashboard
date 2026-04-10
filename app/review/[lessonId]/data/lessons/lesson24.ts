import { LessonData } from '../types';

export const lesson24: LessonData = {
  id: "24",
  title: "큐 (Queue)",
  description: "줄 서기처럼 먼저 온 사람이 먼저 나가는 큐!",
  steps: [
    // ==================== CHAPTER 1: 큐 개념 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "큐가 뭐야?",
        desc: "FIFO! 먼저 넣은 게 먼저 나와요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `# 편의점 줄 서기
줄 = ["철수", "영희", "민수"]
# 철수가 먼저 왔으니 철수부터 계산!
print("줄:", 줄)
print("먼저 온 사람:", 줄[0])`,
        result: "줄: ['철수', '영희', '민수']\n먼저 온 사람: 철수",
        note: "큐 = 줄 서기! 먼저 들어온 사람이 먼저 나가요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `# 스택 (LIFO): 마지막에 넣은 게 먼저
# 접시 쌓기 → 위에서부터 꺼냄
stack = [1, 2, 3]
print("스택 pop:", stack.pop())  # 3

# 큐 (FIFO): 먼저 넣은 게 먼저
# 줄서기 → 앞에서부터 나감
print("큐 개념: 1이 먼저 나가야 해!")`,
        predict: {
          question: "큐에서 [1, 2, 3] 중 먼저 나오는 건?",
          options: ["3 (마지막에 넣은 것)", "1 (먼저 넣은 것)", "2 (중간)", "랜덤"],
          answer: 1,
          feedback: "FIFO! First In, First Out! 먼저 넣은 1이 먼저 나와요!"
        },
        en: {
          predict: {
            question: "Which comes out first from the queue [1, 2, 3]?",
            options: ["3 (last inserted)", "1 (first inserted)", "2 (middle)", "Random"],
            feedback: "FIFO! First In, First Out! The first inserted value 1 comes out first!"
          }
        },
        result: "스택 pop: 3\n큐 개념: 1이 먼저 나가야 해!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "FIFO는 무슨 뜻일까?",
        options: [
          "First In, First Out (먼저 넣은 게 먼저 나옴)",
          "Last In, First Out (마지막에 넣은 게 먼저 나옴)",
          "First In, Last Out (먼저 넣은 게 마지막에 나옴)",
          "Fast In, Fast Out (빨리 넣고 빨리 나옴)"
        ],
        answer: 0,
        explanation: "FIFO = First In, First Out! 큐는 먼저 넣은 데이터가 먼저 나와요.",
        en: {
          question: "What does FIFO mean?",
          options: [
            "First In, First Out",
            "Last In, First Out",
            "First In, Last Out",
            "Fast In, Fast Out"
          ],
          explanation: "FIFO = First In, First Out! The queue returns the first inserted data first."
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "큐 개념",
        learned: [
          "큐 = 줄서기 (먼저 온 사람이 먼저 나감)",
          "FIFO: First In, First Out",
          "스택(LIFO)과 반대 개념!"
        ],
        canDo: "큐의 개념과 스택과의 차이를 이해했어!",
        emoji: "🚶"
      }
    },

    // ==================== CHAPTER 2: deque로 큐 구현 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "deque로 큐 구현",
        desc: "collections의 deque를 사용해요!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 스택 복습!",
        task: "스택에 10, 20을 넣고 pop한 결과를 출력하세요",
        template: "stack = []\nstack.append(10)\nstack.___(20)\nprint(stack.pop())",
        blanksAnswer: ["append"],
        answer: "stack = []\nstack.append(10)\nstack.append(20)\nprint(stack.pop())",
        expect: "20",
        en: {
          message: "🔄 Stack review!",
          task: "Push 10, 20 onto the stack and print the pop result"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `from collections import deque

queue = deque()

# 뒤에 추가 (줄 서기)
queue.append("철수")
queue.append("영희")
queue.append("민수")
print("줄:", list(queue))

# 앞에서 빼기 (계산 완료!)
first = queue.popleft()
print("계산 완료:", first)
print("남은 줄:", list(queue))`,
        result: "줄: ['철수', '영희', '민수']\n계산 완료: 철수\n남은 줄: ['영희', '민수']",
        note: "append()로 뒤에 넣고, popleft()로 앞에서 빼기!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `# 리스트: pop(0)하면 나머지를 다 앞으로 이동 → 느림!
# [1, 2, 3, 4, 5] → pop(0) → [2, 3, 4, 5] (4개 이동)

# deque: popleft()는 바로 제거 → 빠름!
from collections import deque
q = deque([1, 2, 3, 4, 5])
q.popleft()  # 바로 제거!
print(list(q))`,
        predict: {
          question: "deque의 popleft()가 빠른 이유는?",
          options: [
            "나머지 요소를 이동 안 해도 돼서",
            "파이썬이 특별히 최적화해서",
            "리스트보다 메모리를 적게 써서",
            "정렬이 되어 있어서"
          ],
          answer: 0,
          feedback: "deque는 양쪽 끝에서 O(1)으로 추가/삭제! 리스트 pop(0)은 O(n)이에요."
        },
        en: {
          predict: {
            question: "Why is deque's popleft() faster?",
            options: [
              "No need to shift remaining elements",
              "Python has special optimization for it",
              "Uses less memory than a list",
              "Because it's sorted"
            ],
            feedback: "deque adds/removes from both ends in O(1)! List's pop(0) is O(n)."
          }
        },
        result: "[2, 3, 4, 5]"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "deque를 import하고 큐에 'a', 'b'를 넣은 뒤 popleft하세요",
        guide: "from collections import deque!",
        hint: "deque()로 만들고 append → popleft!",
        template: "from collections import ___\n\nqueue = deque()\nqueue.append('a')\nqueue.append('b')\nprint(queue.___())",
        blanksAnswer: ["deque", "popleft"],
        answer: "from collections import deque\n\nqueue = deque()\nqueue.append('a')\nqueue.append('b')\nprint(queue.popleft())",
        expect: "a",
        en: {
          task: "Import deque, add 'a', 'b' to the queue, then popleft",
          guide: "from collections import deque!",
          hint: "Create with deque() then append → popleft!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "큐에 1, 2, 3을 넣고 모두 popleft하면서 출력하세요",
        guide: "while로 반복하면서 popleft!",
        hint: "while len(queue) > 0: 으로 비어있을 때까지!",
        template: null,
        answer: "from collections import deque\n\nqueue = deque()\nqueue.append(1)\nqueue.append(2)\nqueue.append(3)\nwhile len(queue) > 0:\n    print(queue.popleft())",
        alternateAnswers: [
          "from collections import deque\n\nqueue = deque([1, 2, 3])\nwhile queue:\n    print(queue.popleft())"
        ],
        expect: "1\n2\n3",
        en: {
          task: "Add 1, 2, 3 to the queue and print each as you popleft",
          guide: "Use while to loop and popleft!",
          hint: "while len(queue) > 0: to keep going until empty!"
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "deque(['A','B','C'])에서 popleft()하면?",
        options: ["'C' (마지막)", "'A' (처음)", "'B' (중간)", "에러"],
        answer: 1,
        explanation: "popleft()는 왼쪽(앞쪽)에서 빼기! 'A'가 먼저 나와요.",
        en: {
          question: "What does popleft() return from deque(['A','B','C'])?",
          options: ["'C' (last)", "'A' (first)", "'B' (middle)", "Error"],
          explanation: "popleft() removes from the left (front)! 'A' comes out first."
        }
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "deque로 큐 구현",
        learned: [
          "from collections import deque",
          "append() = 뒤에 추가 (enqueue)",
          "popleft() = 앞에서 빼기 (dequeue)",
          "리스트 pop(0)보다 deque가 훨씬 빠름!"
        ],
        canDo: "deque로 효율적인 큐를 만들 수 있어!",
        emoji: "⚡"
      }
    },

    // ==================== CHAPTER 3: 큐 실전 활용 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "큐 실전 활용",
        desc: "프린터 대기열을 만들어보자!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 deque 기본 복습!",
        task: "deque에 10, 20, 30을 넣고 popleft 결과를 출력하세요",
        template: "from collections import deque\nq = deque()\nq.append(10)\nq.append(20)\nq.append(30)\nprint(q.___())",
        blanksAnswer: ["popleft"],
        answer: "from collections import deque\nq = deque()\nq.append(10)\nq.append(20)\nq.append(30)\nprint(q.popleft())",
        expect: "10",
        en: {
          message: "🔄 deque basics review!",
          task: "Add 10, 20, 30 to a deque and print the popleft result"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `from collections import deque

printer = deque()

# 인쇄 요청 (큐에 추가)
printer.append("보고서.pdf")
printer.append("사진.jpg")
printer.append("이력서.docx")
print("대기열:", list(printer))

# 인쇄 시작 (앞에서부터!)
while len(printer) > 0:
    doc = printer.popleft()
    print(f"인쇄 중: {doc}")

print("모든 인쇄 완료!")`,
        result: "대기열: ['보고서.pdf', '사진.jpg', '이력서.docx']\n인쇄 중: 보고서.pdf\n인쇄 중: 사진.jpg\n인쇄 중: 이력서.docx\n모든 인쇄 완료!",
        note: "프린터, 은행 번호표, 놀이공원 줄... 모두 큐!"
      }
    },
    {
      type: "explain",
      content: {
        lines: [],
        code: `from collections import deque

# 최대 3개까지만!
queue = deque(maxlen=3)
queue.append(1)
queue.append(2)
queue.append(3)
print("꽉 찬 큐:", list(queue))

queue.append(4)  # 4를 넣으면?
print("4 추가 후:", list(queue))`,
        predict: {
          question: "maxlen=3인 큐에 4번째를 넣으면?",
          options: ["에러 발생", "가장 오래된 1이 자동 삭제", "4가 무시됨", "[1, 2, 3, 4]"],
          answer: 1,
          feedback: "maxlen을 넘기면 가장 오래된 항목이 자동으로 빠져요!"
        },
        en: {
          predict: {
            question: "What happens when you add a 4th item to a queue with maxlen=3?",
            options: ["Error occurs", "The oldest item (1) is automatically removed", "4 is ignored", "[1, 2, 3, 4]"],
            feedback: "When maxlen is exceeded, the oldest item is automatically dropped!"
          }
        },
        result: "꽉 찬 큐: [1, 2, 3]\n4 추가 후: [2, 3, 4]"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "주문 큐를 만들고 '피자', '치킨'을 넣은 뒤 하나를 처리하세요",
        guide: "append로 주문 추가, popleft로 처리!",
        hint: "popleft()로 먼저 들어온 주문을 처리!",
        template: "from collections import deque\n\norders = ___()\norders.append('피자')\norders.append('치킨')\ndone = orders.___()\nprint(f'{done} 주문 완료!')",
        blanksAnswer: ["deque", "popleft"],
        answer: "from collections import deque\n\norders = deque()\norders.append('피자')\norders.append('치킨')\ndone = orders.popleft()\nprint(f'{done} 주문 완료!')",
        expect: "피자 주문 완료!",
        en: {
          task: "Create an order queue, add 'pizza' and 'chicken', then process one",
          guide: "Use append to add orders, popleft to process!",
          hint: "Process the first order with popleft()!"
        }
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `from collections import deque
q = deque()
print(q.popleft())`,
        options: [
          "빈 deque에서 popleft하면 에러!",
          "import가 잘못됨",
          "deque()에 리스트를 넣어야 함",
          "문제없음"
        ],
        answer: 0,
        explanation: "빈 deque에서 popleft()하면 IndexError! 비어있는지 먼저 확인하세요."
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "큐 실전",
        learned: [
          "프린터 대기열 = 큐의 대표적 활용",
          "maxlen으로 큐 크기 제한 가능",
          "빈 큐에서 popleft() 주의!",
          "줄서기, 주문처리 등 실생활 속 큐"
        ],
        canDo: "큐를 실전 문제에 활용할 수 있어!",
        emoji: "🖨️"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
