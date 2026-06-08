// ============================================
// 레슨 25: 덱 (Deque) - 심화
// ============================================
import { LessonData } from './types'

export const lesson25Data: LessonData = {
  id: "25",
  title: "덱 (Deque)",
  emoji: "↔️",
  description: "양쪽에서 넣고 뺄 수 있는 자료구조",
  chapters: [
    {
      id: "ch1",
      title: "덱이란?",
      emoji: "↔️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "↔️ 덱은 양쪽 다 가능!",
          content: `지난 시간 **큐**는 한쪽으로만 넣고 반대쪽으로만 뺐죠 (놀이공원 줄처럼 — 뒤로 서서 앞으로 빠져나감). 그런데 현실에는 *"앞에서도 끼어들 수 있고, 뒤에서도 빠질 수 있는"* 상황이 많아요. 그래서 나온 게 덱이에요.

**덱(Deque)** = Double-Ended Queue ("**양쪽 끝(double-ended)**이 열린 큐").
양쪽 끝에서 다 넣고 뺄 수 있어요!

\`\`\`
      ←  [A] [B] [C]  →
    앞에서            뒤에서
    넣기/빼기        넣기/빼기
\`\`\`

**비유: 양쪽이 뚫린 터널.** 큐가 *한쪽만 입구, 한쪽만 출구* 인 일방통행 터널이라면, 덱은 **양쪽이 다 입구이자 출구** 예요.
- 한쪽만 쓰면 → **스택**처럼 쓸 수 있고
- 한쪽으로 넣고 반대쪽으로 빼면 → **큐**처럼 쓸 수 있고
- 어느 끝을 건드려도 **둘 다 O(1)** 로 빨라요!`
        },
        {
          id: "compare",
          type: "explain",
          title: "📊 스택 vs 큐 vs 덱",
          content: `스택과 큐는 사실 **"입구를 일부러 막아 둔"** 자료구조예요. 스택은 한쪽만 열어서 *나중에 넣은 게 먼저 나오게*, 큐는 한쪽으로만 넣고 반대쪽으로만 빼서 *먼저 온 게 먼저 나가게* 만든 거죠. 규칙을 단순하게 만들려고 일부러 한쪽씩 닫아 둔 거예요.

| 자료구조 | 앞에서 | 뒤에서 |
|----------|--------|--------|
| **스택** | ❌ | 추가/삭제 |
| **큐** | 삭제만 | 추가만 |
| **덱** | 추가/삭제 | 추가/삭제 |

표를 보면 덱만 네 칸이 **전부 열려** 있죠? 덱은 *"막아 둔 입구를 다시 다 뚫어 놓은"* 구조예요. 그래서 **앞도 뒤도 자유롭게** 넣고 뺄 수 있어요.

**덱 = 가장 유연한 자료구조!** 한쪽만 쓰면 스택, 한쪽으로 넣고 반대쪽으로 빼면 큐 — 즉 덱 하나면 스택도 큐도 **흉내 낼 수 있어요**.

\`\`\`
스택: 뒤로만 →  [   ]
큐:   앞←뒤 →   [   ]
덱:   ← 양쪽 → [   ]
\`\`\`

> 💡 그럼 항상 덱만 쓰면 되지 않냐고요? 양쪽이 다 열려 있으면 *"어느 쪽으로 넣었더라?"* 하고 헷갈리기 쉬워요. **한쪽만 필요하면** 규칙이 분명한 스택/큐를 쓰고, **양쪽이 진짜 필요할 때만** 덱을 꺼내는 게 좋아요.`
        },
        {
          id: "realworld",
          type: "explain",
          title: "🌍 실생활 덱",
          content: `덱이 어울리는 건 한 가지 공통점이 있어요 — **양쪽 끝을 둘 다 만져야** 한다는 것. 한쪽만 만지면 스택이나 큐로 충분하지만, 아래 예시들은 *앞도 뒤도* 필요해요.

🚂 **양방향 기차/지하철** - 1호차(앞)에서도, 마지막 칸(뒤)에서도 사람이 타고 내려요. 양쪽 문이 다 열리니 딱 덱이에요.
🎮 **실행취소 / 다시실행** - 방금 한 행동은 뒤에 쌓고(append), 너무 오래된 기록은 앞에서 버려요(popleft). 양 끝을 같이 써야 하죠.
📄 **최근 문서 목록** - 새로 연 문서는 맨 앞에 넣고(appendleft), 목록이 꽉 차면 가장 오래된 걸 뒤에서 떨어뜨려요(pop).
🎵 **음악 플레이어** - 이전 곡(앞)과 다음 곡(뒤) 둘 다로 움직여야 해서 양쪽 접근이 필요해요.

**알고리즘에서도 같은 이유로 등장해요:**
- **회문(팰린드롬) 검사** - "level" 처럼 앞뒤가 같은지 보려면 *맨 앞 글자와 맨 뒤 글자를 동시에* 꺼내 비교해야 해요 → 양쪽 빼기.
- **슬라이딩 윈도우 최댓값** - 새 값은 뒤로 밀어 넣고(append), 창에서 빠져나간 오래된 값은 앞에서 떨어뜨려요(popleft) → 양쪽 사용.
- **BFS 최적화** (0-1 BFS 등) - 가까운 건 앞에, 먼 건 뒤에 넣어 우선순위를 조절.

> 💡 한 문장 판별법: *"앞에서도 빼고 뒤에서도 넣어야 해?"* → Yes 면 덱.`
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "Deque의 뜻은?",
          options: [
            "Double Queue",
            "Double-Ended Queue",
            "Delete Queue",
            "Dynamic Queue"
          ],
          answer: 1,
          explanation: "Deque = Double-Ended Queue! 양쪽 끝이 열린 큐예요."
        },
        {
          id: "pred-both-ends",
          type: "predict",
          title: "💭 양쪽으로 다 넣고 빼면?",
          code: "from collections import deque\nd = deque([2, 3])\nd.appendleft(1)    # 왼쪽 끝에 추가\nd.append(4)        # 오른쪽 끝에 추가\nprint(list(d))",
          options: ["[1, 2, 3, 4]", "[4, 3, 2, 1]", "[2, 3, 1, 4]", "[1, 4, 2, 3]"],
          answer: 0,
          explanation: "appendleft 로 왼쪽에 1, append 로 오른쪽에 4 → [1, 2, 3, 4]. deque 는 양쪽 끝에 O(1) 로 추가/삭제 가능."
        },
        {
          id: "try-rotate",
          type: "tryit",
          title: "✋ 직접 — 양쪽 끝 다루기",
          task: "deque [1, 2, 3, 4, 5] 에서 왼쪽 끝 / 오른쪽 끝 한 번씩 빼서 출력하세요.",
          initialCode: "from collections import deque\nd = deque([1, 2, 3, 4, 5])\n\n# 왼쪽 끝 하나 빼기\nleft = d.___()\n# 오른쪽 끝 하나 빼기\nright = d.___()\n\nprint(left, right)",
          expectedOutput: "1 5",
          hint: "왼쪽에서 빼는 함수와 오른쪽에서 빼는 함수가 따로 있어요.",
          hint2: "popleft() / pop()"
        }
      ]
    },
    {
      id: "ch2",
      title: "덱 연산",
      emoji: "⚙️",
      steps: [
        {
          id: "operations",
          type: "explain",
          title: "⚙️ 덱의 4가지 핵심 연산",
          content: `연산 이름이 외우기 쉽게 짜여 있어요. 기본은 **뒤(오른쪽)** 담당이고, 이름에 \`left\` 가 붙으면 **앞(왼쪽)** 담당이에요. \`append\` 는 넣기, \`pop\` 은 빼기 — 여기에 \`left\` 만 붙이면 방향이 바뀌는 거죠.

\`\`\`python
from collections import deque
d = deque()

# 뒤에 추가/삭제
d.append(x)      # 뒤에 추가
d.pop()          # 뒤에서 삭제

# 앞에 추가/삭제
d.appendleft(x)  # 앞에 추가
d.popleft()      # 앞에서 삭제
\`\`\`

**비유: 양쪽이 뻥 뚫린 빨대(터널).** 빨대 안에 구슬이 들어 있다고 생각해요. 양쪽 입구가 다 열려 있으니, 왼쪽 구슬이든 오른쪽 구슬이든 **손만 뻗으면 바로** 넣고 뺄 수 있어요.

**왜 4개 다 O(1)(즉시) 일까?** 덱은 *맨 앞과 맨 뒤가 어디인지를 항상 기억* 하도록 만들어졌어요. 그래서 어느 끝을 건드리든 "그 자리"로 바로 가요 — 줄을 처음부터 세지 않아요.

> 💡 리스트와의 결정적 차이: 리스트는 맨 앞(\`insert(0, x)\`, \`pop(0)\`)을 건드리면 *뒤의 모든 원소를 한 칸씩 밀어야* 해서 길수록 느려져요(O(n)). 덱은 앞을 건드려도 밀기가 없어서 **항상 O(1)** — 앞쪽 작업이 잦으면 덱이 훨씬 빨라요.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 덱 기본 연산!",
          task: "덱의 4가지 연산을 모두 사용해보세요!",
          initialCode: "from collections import deque\n\nd = deque([2, 3, 4])\nprint(\"초기:\", list(d))\n\n# 뒤에 추가\nd.append(5)\nprint(\"append(5):\", list(d))\n\n# 앞에 추가\nd.appendleft(1)\nprint(\"appendleft(1):\", list(d))\n\n# 뒤에서 삭제\nd.pop()\nprint(\"pop():\", list(d))\n\n# 앞에서 삭제\nd.popleft()\nprint(\"popleft():\", list(d))",
          expectedOutput: "초기: [2, 3, 4]\nappend(5): [2, 3, 4, 5]\nappendleft(1): [1, 2, 3, 4, 5]\npop(): [1, 2, 3, 4]\npopleft(): [2, 3, 4]",
          hint: "append/pop은 뒤, appendleft/popleft는 앞!",
          hint2: "모든 연산이 O(1)로 빠름"
        },
        {
          id: "more-operations",
          type: "explain",
          title: "🔧 추가 기능들",
          content: `덱에는 양쪽 끝을 활용한 편리한 기능이 두 개 더 있어요. 둘 다 *직접 손으로 하면 귀찮은 일* 을 한 줄로 해줘요.

\`\`\`python
from collections import deque

d = deque([1, 2, 3, 4, 5])

# 회전
d.rotate(2)   # 오른쪽으로 2칸
print(d)      # [4, 5, 1, 2, 3]

d.rotate(-2)  # 왼쪽으로 2칸
print(d)      # [1, 2, 3, 4, 5]

# 확장
d.extend([6, 7])       # 뒤에 여러 개
d.extendleft([0, -1])  # 앞에 여러 개 (역순!)

# 최대 길이 제한
d = deque(maxlen=3)
d.extend([1, 2, 3, 4, 5])
print(d)  # [3, 4, 5] 최근 3개만!
\`\`\`

**🔄 rotate — 통째로 돌리기.** 뒤에서 뺀 걸 다시 앞에 끼우는 일을 한 번에 해줘요. **언제 써요?** 순서를 유지한 채 *시작점만 옮기고 싶을 때*. 예를 들어 게임에서 차례가 한 바퀴 돌 때(\`rotate(-1)\` → 다음 사람이 맨 앞), 또는 원형으로 배열된 자리(원탁)를 돌릴 때 딱이에요. 직접 하면 "뒤 빼고 → 앞에 넣고" 를 칸 수만큼 반복해야 하는데 \`rotate(n)\` 한 줄로 끝나요.

**📏 maxlen — 최근 N개만 자동 유지.** \`deque(maxlen=3)\` 으로 만들면 *길이가 3을 넘는 순간 반대쪽 끝이 알아서 떨어져 나가요*. **언제 써요?** "최근 것만 기억하면 되는" 상황 — 채팅의 최근 메시지 10개, 최근 점수 5판, 센서의 마지막 100개 측정값 같은 것. \`if len > N: pop()\` 같은 코드를 *내가 안 써도* 덱이 알아서 오래된 걸 버려줘요.

> 💡 \`maxlen\` 의 핵심: 가득 찬 덱에 \`append\`(뒤에 넣기) 하면 → **앞쪽**이 떨어지고, \`appendleft\`(앞에 넣기) 하면 → **뒤쪽**이 떨어져요. 즉 *새 걸 넣은 반대편* 이 밀려 나가요.`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 회전과 maxlen!",
          task: "덱의 회전과 최대 길이를 테스트하세요!",
          initialCode: "from collections import deque\n\n# 회전 테스트\nd = deque([1, 2, 3, 4, 5])\nprint(\"원본:\", list(d))\nd.rotate(2)\nprint(\"rotate(2):\", list(d))\nd.rotate(-2)\nprint(\"rotate(-2):\", list(d))\n\n# maxlen 테스트 - 최근 3개만 유지\nrecent = deque(maxlen=3)\nfor i in range(1, 6):\n    recent.append(i)\n    print(f\"추가 {i}: {list(recent)}\")",
          expectedOutput: "원본: [1, 2, 3, 4, 5]\nrotate(2): [4, 5, 1, 2, 3]\nrotate(-2): [1, 2, 3, 4, 5]\n추가 1: [1]\n추가 2: [1, 2]\n추가 3: [1, 2, 3]\n추가 4: [2, 3, 4]\n추가 5: [3, 4, 5]",
          hint: "rotate(양수)는 오른쪽, rotate(음수)는 왼쪽!",
          hint2: "maxlen=3이면 오래된 것이 자동 삭제"
        }
      ]
    },
    {
      id: "ch3",
      title: "덱 활용 문제",
      emoji: "🧩",
      steps: [
        {
          id: "problem1-explain",
          type: "explain",
          title: "🧩 문제1: 회문(팰린드롬) 검사",
          content: `**회문**: 앞뒤가 같은 단어 (예: "level", "기러기")

**왜 덱이 딱 맞을까?** 회문 검사는 *맨 앞 글자와 맨 뒤 글자를 짝지어 비교* 하고, 같으면 한 겹씩 안쪽으로 좁혀 들어가는 일이에요. 딱 **양쪽 끝을 동시에** 다루는 작업이죠. 덱은 \`popleft()\`(앞 글자)와 \`pop()\`(뒤 글자)을 둘 다 O(1)로 빼주니, "양 끝에서 안으로 좁히기" 를 그대로 표현할 수 있어요.

**덱으로 검사:**
1. 문자들을 덱에 넣음
2. 앞뒤에서 하나씩 빼서 비교 (\`popleft()\` ↔ \`pop()\`)
3. 다른 글자가 나오면 즉시 "회문 아님", 끝까지 다 같으면 회문!

\`\`\`
"level"
앞: l ↔ 뒤: l ✓   ← popleft()=l, pop()=l
앞: e ↔ 뒤: e ✓   ← popleft()=e, pop()=e
가운데: v (홀수면 남음)
→ 회문!
\`\`\`

> 💡 가운데로 좁혀 들어가니, 길이가 1 이하가 되면(\`len(d) <= 1\`) 멈춰요. 홀수 길이면 가운데 한 글자가 남는데, 그건 자기 자신과 비교할 필요가 없어서 그냥 통과예요.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 — 'level' 회문 검사",
          task: "'level' 을 덱에 넣고 앞뒤 한 글자씩 빼서 비교해 보세요. 회문이면 True!",
          initialCode: "from collections import deque\n\nword = \"level\"\nd = deque(word)\nresult = True\n\nwhile len(d) > 1:\n    front = d.___()   # 앞에서 빼기\n    back  = d.___()   # 뒤에서 빼기\n    if front != back:\n        result = False\n        break\n\nprint(result)",
          expectedOutput: "True",
          hint: "앞에서 빼기 = popleft, 뒤에서 빼기 = pop. 두 값이 다르면 회문 아님.",
          hint2: "popleft / pop"
        },
        {
          id: "problem2-explain",
          type: "explain",
          title: "🧩 문제2: 슬라이딩 윈도우 최댓값",
          content: `**문제**: 크기 K인 윈도우를 이동하며 각 위치의 최댓값!

\`\`\`
배열: [1, 3, -1, -3, 5, 3, 6, 7], K=3

윈도우 [1, 3, -1] → 최댓값: 3
윈도우 [3, -1, -3] → 최댓값: 3
윈도우 [-1, -3, 5] → 최댓값: 5
...
\`\`\`

**왜 덱이 딱 맞을까?** 창(윈도우)이 오른쪽으로 한 칸 미끄러질 때마다 *오른쪽 끝에 새 값이 들어오고, 왼쪽 끝의 오래된 값이 빠져나가요*. 들어오는 건 뒤(append), 나가는 건 앞(popleft) — 바로 덱의 양쪽 동작이에요.

여기에 한 가지 영리한 점이 더 있어요. **이미 들어와 있는 값보다 더 큰 새 값이 오면**, 작은 옛날 값들은 *영원히 최댓값이 될 수 없으니* 뒤에서 버려요(pop). 이렇게 덱에는 "앞쪽일수록 크고, 뒤로 갈수록 작은" 후보들만 남아서 **맨 앞이 항상 현재 창의 최댓값** 이 돼요.

**덱을 사용한 최적화:**
- 덱에 "최댓값이 될 수 있는 인덱스"만 유지 (앞=가장 큰 값)
- 창을 벗어난 앞 인덱스는 \`popleft\`, 자기보다 작은 뒤 인덱스는 \`pop\`
- 각 원소가 덱에 한 번 들어갔다 한 번 나오므로 전체 **O(n)** — 매번 다시 최댓값을 찾는 O(nK)보다 훨씬 빠름!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 — 윈도우 K=3 슬라이딩 최댓값",
          task: "배열 [1, 3, -1, -3, 5, 3, 6, 7] 에서 크기 3 윈도우의 최댓값을 차례로 출력해 보세요!",
          initialCode: "from collections import deque\n\nnums = [1, 3, -1, -3, 5, 3, 6, 7]\nk = 3\nresult = []\nd = deque()   # 후보 인덱스 저장\n\nfor i in range(len(nums)):\n    # 윈도우 벗어난 앞 인덱스 제거\n    if d and d[0] < i - k + 1:\n        d.___()\n    \n    # 현재 값보다 작은 뒤쪽 인덱스 제거\n    while d and nums[d[-1]] < nums[i]:\n        d.___()\n    \n    d.append(i)\n    \n    # 윈도우 완성 시 맨 앞 = 최댓값\n    if i >= k - 1:\n        result.append(nums[d[0]])\n\nprint(\"배열:\", nums)\nprint(\"K=3 최댓값:\", result)",
          expectedOutput: "배열: [1, 3, -1, -3, 5, 3, 6, 7]\nK=3 최댓값: [3, 3, 5, 5, 6, 7]",
          hint: "오래된 앞 인덱스 = popleft, 작은 뒤 인덱스 = pop 으로 정리!",
          hint2: "popleft / pop"
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
          title: "🏆 최종 미션: 최근 검색어 (최대 5 개)",
          task: "deque maxlen 으로 최근 검색어 5 개만 유지! 새 검색은 **앞**에 추가, 중복 검색은 제거 후 다시 앞에 추가.",
          initialCode: "from collections import deque\n\n# 최대 5 개만 유지하는 deque (오래된 건 자동 탈락)\nsearches = deque(___=5)\n\n# 검색 5 개 — 새 검색은 앞에 추가\nfor q in [\"파이썬\", \"자료구조\", \"알고리즘\", \"덱\", \"스택\"]:\n    if q in searches:\n        searches.remove(q)\n    searches.___(q)             # 앞에 추가\n    print(f\"검색: '{q}'\")\nprint(\"최근 검색어:\", list(searches))\n\n# 새 검색 '큐' — 가장 오래된 '파이썬' 자동 탈락\nq = \"큐\"\nif q in searches:\n    searches.remove(q)\nsearches.appendleft(q)\nprint(f\"검색: '{q}'\")\nprint(\"최근 검색어:\", list(searches))\n\n# 중복 검색 — '자료구조' 가 맨 앞으로 이동\nq = \"자료구조\"\nif q in searches:\n    searches.remove(q)\nsearches.appendleft(q)\nprint(f\"검색: '{q}'\")\nprint(\"최근 검색어:\", list(searches))",
          expectedOutput: "검색: '파이썬'\n검색: '자료구조'\n검색: '알고리즘'\n검색: '덱'\n검색: '스택'\n최근 검색어: ['스택', '덱', '알고리즘', '자료구조', '파이썬']\n검색: '큐'\n최근 검색어: ['큐', '스택', '덱', '알고리즘', '자료구조']\n검색: '자료구조'\n최근 검색어: ['자료구조', '큐', '스택', '덱', '알고리즘']",
          hint: "최대 길이는 maxlen, 앞에 추가는 appendleft.",
          hint2: "maxlen / appendleft"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **덱** = 양쪽에서 추가/삭제 가능
✅ **append/pop** = 뒤에서
✅ **appendleft/popleft** = 앞에서
✅ **rotate** = 회전
✅ **maxlen** = 최대 길이 제한

**성능 비교:**
| 연산 | 리스트 | 덱 |
|------|--------|------|
| 뒤 추가/삭제 | O(1) | O(1) |
| 앞 추가/삭제 | O(n) | O(1) |

다음 시간에는 **자료구조 비교**를 배워요! 🚀`
        }
      ]
    }
  ]
}
