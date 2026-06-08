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
          content: `스택은 멀리 있는 개념이 아니에요. 사실 여러분이 **매일 쓰는 기능들** 이 전부 스택이에요. 공통점은 하나 — *"마지막에 한 것부터 되돌린다"* (LIFO).

↩️ **Ctrl+Z 실행취소** — 글을 쓰다 Ctrl+Z 를 누르면 *방금* 한 동작부터 취소돼요. 10 분 전 동작이 아니라 *가장 최근* 동작. 컴퓨터는 내가 한 동작들을 차곡차곡 쌓아두다가, 취소할 땐 맨 위(가장 최근) 것부터 빼는 거예요. 이게 정확히 스택!

⬅️ **브라우저 뒤로가기** — 네이버 → 구글 → 유튜브 순으로 갔다가 뒤로가기를 누르면? 유튜브 직전인 *구글* 로 가죠. 첫 페이지(네이버)가 아니라 *바로 직전* 페이지. 방문한 페이지를 쌓아두고 맨 위부터 꺼내는 거예요.

📚 **책 쌓기 · 🍽️ 접시 쌓기** — 책을 위로 쌓으면 맨 위 책부터 꺼내야 해요. 식당 접시 더미도 맨 위 접시부터 집죠. 맨 아래 걸 빼려다간 와르르 무너지니까요.

> 💡 왜 전부 "최근 것부터"일까요? 실행취소는 *방금 한 실수* 를 되돌리고 싶은 거고, 뒤로가기는 *방금 떠난 페이지* 로 돌아가고 싶은 거예요. 사람이 "되돌리고 싶은 것" 은 거의 항상 *가장 최근에 한 것*. 그래서 스택의 "마지막에 넣은 게 먼저 나온다" 가 이렇게 자주 쓰여요.`
        },
        {
          id: "operations",
          type: "explain",
          title: "⚙️ 스택 연산",
          content: `스택으로 할 수 있는 일은 딱 두 가지예요. 그것도 전부 **맨 위에서만**. 접시 더미를 떠올려 보세요 — 접시를 올릴 때도 맨 위, 집을 때도 맨 위죠.

**push (푸시) — 맨 위에 하나 얹기**
\`\`\`
push(3):  [1,2] → [1,2,3]
\`\`\`
접시 더미 위에 새 접시 한 장을 *올려놓는* 동작이에요.

**pop (팝) — 맨 위 하나 집어내기**
\`\`\`
pop():    [1,2,3] → [1,2] (3 을 꺼내 돌려줌)
\`\`\`
맨 위 접시를 *집어 드는* 동작. 집어 든 접시(3)를 우리한테 건네줘요(반환).

**왜 맨 위만?** 더미 *한가운데* 접시를 쏙 빼면 위에 쌓인 게 다 무너지잖아요. 스택도 똑같이 *맨 위* 만 만질 수 있게 일부러 막아둔 자료구조예요. 이 "맨 위만" 규칙 덕분에 push·pop 이 아주 빠르고(O(1)), LIFO 순서가 저절로 지켜져요.

**보조 연산 (있으면 편한 것들):**
- **peek/top**: 맨 위가 뭔지 *보기만* — 집어내진 않음
- **isEmpty**: 더미가 비었는지 확인
- **size**: 쌓인 개수 세기`
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
          content: `좋은 소식 — 스택을 위해 새 도구를 배울 필요가 없어요. lesson 16-17 에서 배운 **리스트가 그대로 스택** 이 돼요!

비결은 *리스트의 끝(오른쪽)을 "맨 위"로 보는 것*. 리스트에서 우리가 이미 아는 두 메서드가 딱 스택 연산이거든요.

\`\`\`python
stack = []

# push - 끝에 붙이기 = append()
stack.append(1)
stack.append(2)
stack.append(3)
print(stack)  # [1, 2, 3]   ← 맨 끝(3)이 "맨 위"

# pop - 끝에서 빼기 = pop()
top = stack.pop()
print(top)    # 3   ← 끝에 있던 게 나옴
print(stack)  # [1, 2]

# peek - 끝을 보기 = [-1]
print(stack[-1])  # 2 (보기만, 제거 안 됨)
\`\`\`

**왜 끝을 "맨 위"로 잡을까요?** \`append()\` 는 리스트 *끝* 에 붙이고, 그냥 \`pop()\` 도 리스트 *끝* 을 떼어내요. 둘 다 같은 쪽(끝)을 다루니, 마지막에 \`append\` 한 게 가장 먼저 \`pop\` 돼요 → 이게 바로 LIFO! 만약 맨 *앞* (인덱스 0)을 맨 위로 잡으면 뒤 원소들을 전부 한 칸씩 밀어야 해서 느려요. 그래서 끝을 맨 위로 쓰는 거예요.

> 💡 정리: \`append()\` = push, \`pop()\` = pop, \`[-1]\` = peek. 리스트의 *끝* 이 곧 스택의 *맨 위*.`
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
          content: `**peek** = 맨 위 값을 **보기만** 하고, 안 빼는 거예요.

\`\`\`python
stack = []
stack.append("A")
stack.append("B")
stack.append("C")

# peek — [-1] 로 맨 위 보기
print(stack[-1])    # C (아직 안 빠짐)
print(stack[-1])    # C (또 봐도 그대로)
print(stack)        # ['A', 'B', 'C']  ← 그대로!
\`\`\`

**peek 가 왜 따로 필요해요?** 우리한테 자주 있는 상황이에요 — *"꺼내기 전에 맨 위가 뭔지부터 보고 결정하고 싶다."*

예를 들어 괄호 검사(다음 챕터)에서 닫는 괄호 \`)\` 를 만나면, "맨 위가 진짜 여는 괄호 \`(\` 가 맞나?" 를 *확인한 뒤* 빼고 싶어요. \`pop()\` 으로 빼버리면 아니었을 때 되돌리기 곤란하죠. 마트에서 카트에 담기 전에 가격표를 *보기만* 하는 것과 같아요 — 보는 것과 집는 것은 다른 동작이에요.

**규칙:**
- 보기만 (peek): \`stack[-1]\` → 더미는 그대로
- 빼기 (pop): \`stack.pop()\` → 맨 위가 사라짐`
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

**왜 하필 스택일까요?** 닫는 괄호 \`)\` 를 만났을 때, 이게 짝지어야 할 상대는 *아직 안 닫힌 여는 괄호 중 가장 최근 것* 이에요. \`"(())"\` 에서 두 번째 \`)\` 는 바로 직전의 \`(\` 와 짝이죠. "가장 최근에 연 것부터 닫는다" — 이게 정확히 LIFO! 그래서 여는 괄호를 스택에 쌓아두면, 닫는 괄호를 만날 때마다 맨 위(가장 최근)를 꺼내 짝 맞추면 돼요.

**알고리즘:**
1. 여는 괄호 \`(\` → push (쌓아둔다)
2. 닫는 괄호 \`)\` → pop (가장 최근 여는 괄호와 짝지어 없앤다)
3. 끝났을 때 스택이 비어있으면 → 모두 짝이 맞았다는 뜻 ✅

> 💡 만약 닫는 괄호인데 스택이 *텅 비어 있으면*? 짝지을 여는 괄호가 없다는 뜻 → 잘못된 괄호예요 (\`"())"\` 의 마지막 \`)\` 가 그런 경우). 반대로 끝까지 다 봤는데 스택에 \`(\` 가 *남아 있으면* 안 닫힌 게 있다는 뜻 (\`"(()"\`).`
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

1. 순서대로 push: h→e→l→l→o   (h 가 맨 아래, o 가 맨 위)
2. 순서대로 pop:  o→l→l→e→h   (맨 위 o 부터 나옴)
\`\`\`

**왜 뒤집힐까요?** 스택에 \`h, e, l, l, o\` 순으로 넣으면 *맨 처음 넣은 h 가 맨 아래*, *마지막에 넣은 o 가 맨 위* 에 깔려요. 그런데 꺼낼 땐 맨 위부터(LIFO) 나오니까 \`o\` 가 가장 먼저, \`h\` 가 가장 나중에 나와요. 넣은 순서와 꺼낸 순서가 정반대 → 저절로 뒤집힘!

마치 책을 한 권씩 위로 쌓았다가 다시 한 권씩 집어 내려놓으면, 더미의 순서가 거꾸로 뒤집히는 것과 똑같아요. 따로 "뒤집어라" 명령을 안 줘도, 스택의 성질만으로 공짜로 뒤집기가 되는 거예요. 🎁`
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
