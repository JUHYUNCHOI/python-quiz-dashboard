// ============================================
// 레슨 23: 스택 (Stack) - 심화
// ============================================
import { LessonData } from './types'

export const lesson23Data: LessonData = {
  id: "23",
  title: "스택 (Stack)",
  emoji: "📚",
  description: "LIFO! 마지막에 넣은 게 먼저 나오는 자료구조",
  chapters: [
    {
      id: "ch1",
      title: "스택이란?",
      emoji: "📚",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📚 책을 쌓아보자!",
          content: `책을 쌓으면 어떻게 될까요?

\`\`\`
    [책3] ← 마지막에 올린 책
    [책2]
    [책1] ← 처음 올린 책
   ======
\`\`\`

**마지막에 올린 책3을 먼저 빼야 해요!**

이게 바로 **스택(Stack)**!
- **LIFO**: Last In, First Out
- 마지막에 넣은 게 먼저 나옴`
        },
        {
          id: "realworld",
          type: "explain",
          title: "🌍 실생활 스택",
          content: `**스택의 예시들:**

📚 **책 쌓기** - 위에서부터 꺼냄
🍽️ **접시 쌓기** - 맨 위 접시부터 사용
⬅️ **브라우저 뒤로가기** - 최근 페이지부터
↩️ **Ctrl+Z 실행취소** - 최근 작업부터 취소
📱 **앱 뒤로가기** - 이전 화면으로

**공통점**: 가장 최근 것을 먼저 처리!`
        },
        {
          id: "operations",
          type: "explain",
          title: "⚙️ 스택 연산",
          content: `**핵심 연산 2가지:**

**push** - 맨 위에 추가
\`\`\`
push(3):  [1,2] → [1,2,3]
\`\`\`

**pop** - 맨 위에서 제거
\`\`\`
pop():    [1,2,3] → [1,2] (3 반환)
\`\`\`

**보조 연산:**
- **peek/top**: 맨 위 확인 (제거 안 함)
- **isEmpty**: 비었는지 확인
- **size**: 개수 확인`
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "LIFO의 뜻은?",
          options: [
            "First In, First Out",
            "Last In, First Out",
            "Last In, Last Out",
            "First In, Last Out"
          ],
          answer: 1,
          explanation: "LIFO = Last In, First Out! 마지막에 들어간 게 먼저 나와요."
        }
      ]
    },
    {
      id: "ch2",
      title: "파이썬으로 구현",
      emoji: "🐍",
      steps: [
        {
          id: "list-stack",
          type: "explain",
          title: "📋 리스트로 스택 만들기",
          content: `파이썬 리스트로 스택을 쉽게 구현해요!

\`\`\`python
stack = []

# push - append()
stack.append(1)
stack.append(2)
stack.append(3)
print(stack)  # [1, 2, 3]

# pop - pop()
top = stack.pop()
print(top)    # 3
print(stack)  # [1, 2]

# peek - [-1]
print(stack[-1])  # 2 (제거 안 됨)
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 스택 기본 연산!",
          task: "스택에 1, 2, 3을 넣고 하나씩 빼보세요!",
          initialCode: "stack = []\n\n# push\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint(\"push 후:\", stack)\n\n# pop 3번\nprint(\"pop:\", stack.pop())\nprint(\"pop:\", stack.pop())\nprint(\"pop:\", stack.pop())\nprint(\"최종:\", stack)",
          expectedOutput: "push 후: [1, 2, 3]\npop: 3\npop: 2\npop: 1\n최종: []",
          hint: "pop()은 마지막 요소를 제거하고 반환!",
          hint2: "LIFO: 3 → 2 → 1 순서로 나옴"
        },
        {
          id: "class-stack",
          type: "explain",
          title: "🏗️ 클래스로 스택 만들기",
          content: `더 깔끔하게 클래스로 만들 수도 있어요:

\`\`\`python
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 스택 클래스 사용!",
          task: "Stack 클래스를 사용해보세요!",
          initialCode: "class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, item):\n        self.items.append(item)\n    def pop(self):\n        return self.items.pop() if self.items else None\n    def peek(self):\n        return self.items[-1] if self.items else None\n    def is_empty(self):\n        return len(self.items) == 0\n\n# 사용\ns = Stack()\ns.push(\"A\")\ns.push(\"B\")\ns.push(\"C\")\nprint(\"peek:\", s.peek())\nprint(\"pop:\", s.pop())\nprint(\"pop:\", s.pop())",
          expectedOutput: "peek: C\npop: C\npop: B",
          hint: "peek()은 보기만, pop()은 제거까지!",
          hint2: "C가 마지막에 들어갔으니 먼저 나옴"
        }
      ]
    },
    {
      id: "ch3",
      title: "스택 활용 문제",
      emoji: "🧩",
      steps: [
        {
          id: "problem1-explain",
          type: "explain",
          title: "🧩 문제1: 괄호 검사",
          content: `**문제**: 괄호가 올바르게 짝지어졌는지 확인!

\`\`\`
"(())"  → ✅ 올바름
"(()"   → ❌ 닫는 괄호 부족
"())"   → ❌ 여는 괄호 부족
\`\`\`

**알고리즘:**
1. 여는 괄호 '(' → push
2. 닫는 괄호 ')' → pop
3. 끝났을 때 스택이 비어있으면 ✅`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 괄호 검사 구현!",
          task: "괄호가 올바른지 검사하세요!",
          initialCode: "def check_parentheses(s):\n    stack = []\n    for char in s:\n        if char == '(':\n            stack.append(char)\n        elif char == ')':\n            if not stack:\n                return False\n            stack.pop()\n    return len(stack) == 0\n\n# 테스트\nprint(check_parentheses(\"(())\"))   # True\nprint(check_parentheses(\"(()\"))    # False\nprint(check_parentheses(\"())\"))    # False\nprint(check_parentheses(\"()()\"))   # True",
          expectedOutput: "True\nFalse\nFalse\nTrue",
          hint: "'(' 만나면 push, ')' 만나면 pop",
          hint2: "pop할 때 스택이 비어있으면 False"
        },
        {
          id: "problem2-explain",
          type: "explain",
          title: "🧩 문제2: 문자열 뒤집기",
          content: `**스택으로 문자열 뒤집기!**

\`\`\`python
# "hello" → "olleh"

1. 순서대로 push: h→e→l→l→o
2. 순서대로 pop:  o→l→l→e→h
\`\`\`

LIFO 특성을 활용한 뒤집기!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 문자열 뒤집기!",
          task: "스택으로 문자열을 뒤집으세요!",
          initialCode: "def reverse_string(s):\n    stack = []\n    # 모든 문자 push\n    for char in s:\n        stack.append(char)\n    \n    # 모두 pop해서 결과 만들기\n    result = \"\"\n    while stack:\n        result += stack.pop()\n    \n    return result\n\nprint(reverse_string(\"hello\"))\nprint(reverse_string(\"Python\"))\nprint(reverse_string(\"12345\"))",
          expectedOutput: "olleh\nnohtyP\n54321",
          hint: "push 순서의 역순으로 pop!",
          hint2: "물론 s[::-1]이 더 간단하지만, 스택 원리 이해용!"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션: 브라우저 뒤로가기!",
          task: "브라우저 히스토리를 스택으로 구현하세요!",
          initialCode: "class Browser:\n    def __init__(self):\n        self.history = []\n        self.current = \"홈\"\n    \n    def visit(self, page):\n        self.history.___(self.current)\n        self.current = page\n        print(f\"방문: {page}\")\n    \n    def back(self):\n        if self.history:\n            self.current = self.history.___()\n            print(f\"뒤로가기: {self.current}\")\n        else:\n            print(\"더 이상 뒤로 갈 수 없습니다\")\n    \n    def show(self):\n        print(f\"현재 페이지: {self.current}\")\n\n# 테스트\nbrowser = Browser()\nbrowser.visit(\"네이버\")\nbrowser.visit(\"구글\")\nbrowser.visit(\"유튜브\")\nbrowser.show()\nbrowser.back()\nbrowser.back()\nbrowser.show()",
          expectedOutput: "방문: 네이버\n방문: 구글\n방문: 유튜브\n현재 페이지: 유튜브\n뒤로가기: 구글\n뒤로가기: 네이버\n현재 페이지: 네이버",
          hint: "스택은 append()로 push하고 pop()으로 꺼내요!",
          hint2: "visit에는 append, back에는 pop을 넣으세요!"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **스택** = LIFO (Last In, First Out)
✅ **push** = 맨 위에 추가
✅ **pop** = 맨 위에서 제거
✅ **활용** = 괄호 검사, 뒤로가기, 실행취소

**시간 복잡도:**
- push: O(1)
- pop: O(1)
- peek: O(1)

다음 시간에는 **큐(Queue)**를 배워요! 🚀`
        }
      ]
    }
  ]
}
