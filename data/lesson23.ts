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
          title: "📚 스택은 쌓아놓은 책!",
          content: `책을 위로 쌓아 올리면:

\`\`\`
    [책3] ← 마지막에 올린 책
    [책2]
    [책1] ← 처음 올린 책
   ======
\`\`\`

**위에 있는 책3 부터 꺼내요.** 책1 부터 못 꺼내요 (무너짐!)

이게 **스택(Stack)**!
- **LIFO** = Last In, First Out
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
          id: "try-ops",
          type: "tryit",
          title: "✋ 스택 기본 연산 직접 — push, pop, peek",
          task: "스택에 1, 2, 3 을 차례로 push 하고, pop 한 다음 맨 위 값을 확인해 보세요!",
          initialCode: "stack = []\n# 1, 2, 3 차례로 맨 위에 추가\nstack.___(1)\nstack.___(2)\nstack.___(3)\n\n# 맨 위 하나 제거\nstack.___()\n\n# 지금 맨 위에 있는 값을 출력 (인덱스로 마지막 원소)\nprint(stack[___])",
          expectedOutput: "2",
          hint: "추가는 .append, 제거는 .pop, 마지막 원소는 인덱스 -1 로!",
          hint2: "append / append / append / pop / -1"
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
        },
        {
          id: "pred-lifo",
          type: "predict",
          title: "💭 누가 먼저 나올까?",
          code: "stack = []\nstack.append('🍎')   # push\nstack.append('🍌')\nstack.append('🍇')\nprint(stack.pop())     # ?",
          options: ["🍎", "🍌", "🍇", "에러"],
          answer: 2,
          explanation: "LIFO! 마지막에 push 된 🍇 가 먼저 pop 돼요. 사과가 가장 아래라 마지막에 나옴."
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
          title: "🔎 peek — 보기만 하고 안 빼기",
          content: `**peek** = 맨 위 값을 **보기만**, 안 빼기.

\`\`\`python
stack = []
stack.append("A")
stack.append("B")
stack.append("C")

# peek — [-1] 로 맨 위 보기
print(stack[-1])    # C (아직 안 빠짐)
print(stack[-1])    # C (또 봐도 그대로)
print(stack)        # ['A', 'B', 'C']
\`\`\`

**규칙:**
- 보기만: \`stack[-1]\`
- 빼기: \`stack.pop()\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 — peek vs pop",
          task: "A, B, C 를 차례로 push 한 다음, peek 한 번 / pop 두 번 해 보세요.",
          initialCode: "stack = []\n\nstack.append(\"A\")\nstack.append(\"B\")\nstack.append(\"C\")\n\n# peek — 맨 위를 보기만 (인덱스 ___)\nprint(\"peek:\", stack[___])\n\n# pop 두 번\nprint(\"pop:\", stack.___())\nprint(\"pop:\", stack.___())",
          expectedOutput: "peek: C\npop: C\npop: B",
          hint: "맨 위 보기 = 인덱스 -1, 빼기 = .pop()",
          hint2: "-1 / pop / pop"
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
          title: "🖥️ 직접 — 괄호 한 줄 검사하기",
          task: "문자열 '(())' 의 괄호가 짝이 맞는지 스택으로 확인하세요!",
          initialCode: "s = \"(())\"\nstack = []\nok = True\n\nfor char in s:\n    if char == '(':\n        stack.___(char)        # 여는 괄호 → push\n    elif char == ')':\n        if not stack:\n            ok = False\n            break\n        stack.___()             # 닫는 괄호 → pop\n\n# 끝났을 때 스택이 비어있으면 ✅\nif ok and len(stack) == 0:\n    print(\"True\")\nelse:\n    print(\"False\")",
          expectedOutput: "True",
          hint: "'(' 만나면 .append, ')' 만나면 .pop. 마지막에 스택이 비어야 ✅",
          hint2: "append / pop"
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
          title: "🖥️ 직접 — 'hello' 를 스택으로 뒤집기",
          task: "'hello' 를 스택에 한 글자씩 넣고, 모두 빼서 뒤집힌 문자열을 만들어 보세요!",
          initialCode: "s = \"hello\"\nstack = []\n\n# 모든 글자를 스택에 push\nfor char in s:\n    stack.___(char)\n\n# 모두 pop 해서 result 에 이어 붙이기\nresult = \"\"\nwhile stack:\n    result += stack.___()\n\nprint(result)",
          expectedOutput: "olleh",
          hint: "넣을 땐 .append, 뺄 땐 .pop. LIFO 라서 자동으로 뒤집힘!",
          hint2: "append / pop"
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
          title: "🏆 최종 미션: 브라우저 뒤로가기 시뮬",
          task: "스택(리스트) 으로 브라우저 히스토리 시뮬레이션을 완성하세요! 빈칸 채우기.",
          initialCode: "history = []           # 방문 기록 스택\ncurrent = \"홈\"\n\n# 방문 1: 네이버\nhistory.___(current)   # 지금 페이지를 history 에 push\ncurrent = \"네이버\"\nprint(\"방문:\", current)\n\n# 방문 2: 구글\nhistory.___(current)\ncurrent = \"구글\"\nprint(\"방문:\", current)\n\n# 방문 3: 유튜브\nhistory.___(current)\ncurrent = \"유튜브\"\nprint(\"방문:\", current)\n\nprint(\"현재 페이지:\", current)\n\n# 뒤로가기 2 번 — history 맨 위 페이지로 돌아감\ncurrent = history.___()\nprint(\"뒤로가기:\", current)\ncurrent = history.___()\nprint(\"뒤로가기:\", current)\n\nprint(\"현재 페이지:\", current)",
          expectedOutput: "방문: 네이버\n방문: 구글\n방문: 유튜브\n현재 페이지: 유튜브\n뒤로가기: 구글\n뒤로가기: 네이버\n현재 페이지: 네이버",
          hint: "방문할 때 = 지금 페이지를 .append, 뒤로가기 = .pop 으로 마지막 페이지 꺼내기!",
          hint2: "append / append / append / pop / pop"
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
