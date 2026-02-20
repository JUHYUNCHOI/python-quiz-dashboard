import { LessonData } from '../types';

export const lesson23: LessonData = {
  id: "23",
  title: "스택 (Stack)",
  description: "쌓고 꺼내는 자료구조, 스택을 배워요!",
  steps: [
    // ==================== CHAPTER 1: 스택 개념 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "스택이 뭐야?",
        desc: "LIFO! 마지막에 넣은 게 먼저 나와요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["접시를 쌓는다고 생각해봐요!", "마지막에 올린 접시를 먼저 꺼내죠?"],
        code: `# 접시 쌓기
접시들 = []
접시들.append("접시1")  # 맨 아래
접시들.append("접시2")  # 중간
접시들.append("접시3")  # 맨 위
print(접시들)`,
        result: "['접시1', '접시2', '접시3']",
        note: "스택 = 접시 쌓기! 맨 위에서만 넣고 빼요!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["꺼낼 때는? 맨 위부터!"],
        code: `접시들 = ["접시1", "접시2", "접시3"]
꺼낸접시 = 접시들.pop()
print(f"꺼낸 접시: {꺼낸접시}")
print(f"남은 접시: {접시들}")`,
        predict: {
          question: "어떤 접시가 먼저 나올까?",
          options: ["접시1 (맨 아래)", "접시2 (중간)", "접시3 (맨 위)", "랜덤"],
          answer: 2,
          feedback: "LIFO! Last In, First Out! 마지막에 넣은 접시3이 먼저!"
        },
        result: "꺼낸 접시: 접시3\n남은 접시: ['접시1', '접시2']"
      }
    },
    {
      type: "quiz",
      content: {
        question: "LIFO는 무슨 뜻일까?",
        options: [
          "Last In, First Out (마지막에 넣은 게 먼저 나옴)",
          "First In, First Out (먼저 넣은 게 먼저 나옴)",
          "Last In, Last Out (마지막에 넣은 게 마지막에 나옴)",
          "First In, Last Out (먼저 넣은 게 마지막에 나옴)"
        ],
        answer: 0,
        explanation: "LIFO = Last In, First Out! 스택은 마지막에 넣은 데이터가 먼저 나와요."
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "스택 개념",
        learned: [
          "스택 = 접시 쌓기 (위에서만 넣고 빼기)",
          "LIFO: Last In, First Out",
          "append()로 넣고, pop()으로 빼기"
        ],
        canDo: "스택의 개념과 동작 원리를 이해했어!",
        emoji: "🥞"
      }
    },

    // ==================== CHAPTER 2: 리스트로 스택 구현 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "리스트로 스택 구현",
        desc: "append와 pop으로 스택을 만들자!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 슬라이싱 복습!",
        task: "리스트의 마지막 2개 요소만 가져오세요",
        template: "data = [10, 20, 30, 40, 50]\nprint(data[___:])",
        blanksAnswer: ["-2"],
        answer: "data = [10, 20, 30, 40, 50]\nprint(data[-2:])",
        expect: "[40, 50]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["파이썬 리스트로 스택을 쉽게 만들 수 있어요!"],
        code: `stack = []

# push (넣기)
stack.append("A")
stack.append("B")
stack.append("C")
print("쌓은 후:", stack)

# pop (빼기)
top = stack.pop()
print("꺼낸 값:", top)
print("남은 스택:", stack)`,
        result: "쌓은 후: ['A', 'B', 'C']\n꺼낸 값: C\n남은 스택: ['A', 'B']",
        note: "append = push(넣기), pop = pop(빼기)!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["스택의 맨 위를 확인만 하고 싶다면?", "[-1]로 peek(엿보기)!"],
        code: `stack = ["A", "B", "C"]
print("맨 위:", stack[-1])
print("스택 변화 없음:", stack)`,
        predict: {
          question: "stack[-1]의 결과는?",
          options: ["A", "B", "C", "에러"],
          answer: 2,
          feedback: "[-1]은 마지막 요소! pop과 달리 꺼내지 않아요."
        },
        result: "맨 위: C\n스택 변화 없음: ['A', 'B', 'C']"
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "스택에 1, 2, 3을 넣고 하나를 pop해서 출력하세요",
        guide: "append로 넣고, pop으로 빼기!",
        hint: "stack.append()로 넣고 stack.pop()으로 빼요!",
        template: "stack = []\nstack.append(1)\nstack.append(2)\nstack.___(3)\nprint(stack.___())",
        blanksAnswer: ["append", "pop"],
        answer: "stack = []\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint(stack.pop())",
        expect: "3"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "스택이 비어있는지 확인하는 코드를 완성하세요",
        guide: "len()이 0이면 비어있어요!",
        hint: "len(stack) == 0 또는 not stack",
        template: "stack = []\nif ___(___)  == 0:\n    print('스택이 비어있어요!')",
        blanksAnswer: ["len", "stack"],
        answer: "stack = []\nif len(stack) == 0:\n    print('스택이 비어있어요!')",
        alternateAnswers: [
          "stack = []\nif not stack:\n    print('스택이 비어있어요!')"
        ],
        expect: "스택이 비어있어요!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "stack = [1, 2, 3]에서 stack.pop()을 2번 하면 남는 것은?",
        options: ["[1]", "[3]", "[1, 2]", "[]"],
        answer: 0,
        explanation: "pop() 1번 → 3 제거 → [1, 2], pop() 2번 → 2 제거 → [1]"
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "리스트로 스택 구현",
        learned: [
          "append() = push (넣기)",
          "pop() = pop (빼기)",
          "[-1] = peek (엿보기)",
          "len(stack) == 0 = 비어있는지 확인"
        ],
        canDo: "파이썬 리스트로 스택을 만들 수 있어!",
        emoji: "📚"
      }
    },

    // ==================== CHAPTER 3: 스택 실전 활용 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "스택 실전 활용",
        desc: "괄호 검사와 뒤로가기 구현!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 스택 기본 복습!",
        task: "스택에 'x', 'y'를 넣고 맨 위 값을 peek(확인만)하세요",
        template: "stack = []\nstack.append('x')\nstack.append('y')\nprint(stack[___])",
        blanksAnswer: ["-1"],
        answer: "stack = []\nstack.append('x')\nstack.append('y')\nprint(stack[-1])",
        expect: "y"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["실전 1: 괄호 짝 맞추기!", "여는 괄호를 스택에 넣고, 닫는 괄호를 만나면 pop!"],
        code: `def check_brackets(text):
    stack = []
    for ch in text:
        if ch == '(':
            stack.append(ch)
        elif ch == ')':
            if len(stack) == 0:
                return False
            stack.pop()
    return len(stack) == 0

print(check_brackets("(1+2)*(3+4)"))
print(check_brackets("((1+2)"))`,
        result: "True\nFalse",
        note: "스택이 비면 짝이 맞는 거! 남으면 짝이 안 맞아요."
      }
    },
    {
      type: "explain",
      content: {
        lines: ["실전 2: 브라우저 뒤로가기!", "방문한 페이지를 스택에 쌓아요"],
        code: `history = []

# 페이지 방문
history.append("google.com")
history.append("youtube.com")
history.append("github.com")
print("현재:", history[-1])

# 뒤로가기
history.pop()
print("뒤로가기:", history[-1])`,
        predict: {
          question: "뒤로가기하면 어디로?",
          options: ["google.com", "youtube.com", "github.com", "에러"],
          answer: 1,
          feedback: "github.com을 pop하면 그 아래 youtube.com이 맨 위!"
        },
        result: "현재: github.com\n뒤로가기: youtube.com"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "문자열을 스택으로 뒤집어서 출력하세요",
        guide: "글자를 하나씩 push, 하나씩 pop!",
        hint: "for로 각 글자를 append, while로 pop!",
        template: null,
        answer: "stack = []\nfor ch in 'abc':\n    stack.append(ch)\n\nresult = ''\nwhile len(stack) > 0:\n    result += stack.pop()\nprint(result)",
        alternateAnswers: [
          "stack = []\nfor ch in 'abc':\n    stack.append(ch)\nresult = ''\nwhile stack:\n    result += stack.pop()\nprint(result)"
        ],
        expect: "cba"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제점은?",
        code: `stack = []
print(stack.pop())`,
        options: [
          "빈 스택에서 pop하면 에러!",
          "append를 먼저 해야 함",
          "print 문법 오류",
          "문제없음"
        ],
        answer: 0,
        explanation: "빈 리스트에서 pop()하면 IndexError! 항상 비어있는지 확인 후 pop하세요."
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "스택 실전",
        learned: [
          "괄호 검사: 여는 괄호 push, 닫는 괄호 pop",
          "브라우저 뒤로가기: 방문 기록을 스택으로",
          "문자열 뒤집기: push 후 pop",
          "빈 스택 pop 주의! IndexError 발생"
        ],
        canDo: "스택을 실전 문제에 활용할 수 있어!",
        emoji: "🏆"
      }
    },

    // ==================== DONE ====================
    { type: "done", content: {} }
  ]
};
