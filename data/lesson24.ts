// ============================================
// 레슨 24: 큐 (Queue) - 심화
// ============================================
import { LessonData } from './types'

export const lesson24Data: LessonData = {
  id: "24",
  title: "큐 (Queue)",
  emoji: "🚶‍♂️",
  description: "FIFO! 먼저 들어간 게 먼저 나오는 자료구조",
  chapters: [
    {
      id: "ch1",
      title: "큐란?",
      emoji: "🚶‍♂️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🚶‍♂️ 큐는 줄 서기!",
          content: `편의점 계산대 앞 줄을 떠올려요:

\`\`\`
입구 → [1번] [2번] [3번] → 출구
       먼저 옴          나중 옴
\`\`\`

**제일 먼저 줄 선 1번 부터 처리.** 새치기 없음!

이게 **큐(Queue)**!
- **FIFO** = First In, First Out
- 먼저 넣은 게 먼저 나옴`
        },
        {
          id: "compare",
          type: "explain",
          title: "📊 스택 vs 큐",
          content: `**스택 (LIFO)** - 마지막이 먼저
\`\`\`
넣기: 1→2→3
빼기: 3→2→1  (역순!)
\`\`\`

**큐 (FIFO)** - 처음이 먼저
\`\`\`
넣기: 1→2→3
빼기: 1→2→3  (순서대로!)
\`\`\`

**비유:**
- 스택 = 프링글스 통 (위에서만)
- 큐 = 터널 (앞뒤가 뚫림)`
        },
        {
          id: "realworld",
          type: "explain",
          title: "🌍 실생활 큐",
          content: `사실 큐는 우리 일상에 *이미* 깔려 있어요. 공통점은 하나 — **"먼저 온 게 먼저 처리된다"**. 왜 이게 큐냐면, 전부 *순서를 지켜야 공정* 하기 때문이에요.

🚶 **줄 서기** — 먼저 온 사람이 먼저. 뒤에 온 사람이 새치기하면? 다들 화나죠. 그래서 줄은 *언제나* FIFO 예요.

🖨️ **프린터 대기열** — 내가 먼저 인쇄 버튼을 눌렀는데 나중에 누른 사람 문서가 먼저 나오면 이상하잖아요. 요청한 *순서대로* 출력돼야 맞아요.

🎮 **게임 매칭** — 먼저 "찾기" 누른 사람부터 매칭. 오래 기다린 사람을 앞에 세워줘야 공정.

📦 **택배 처리** · 🎵 **음악 재생목록** — 먼저 접수된 택배 먼저, 먼저 담은 곡 먼저.

> 💡 **이게 왜 다 큐일까?** 핵심은 *"기다린 순서를 존중한다"* 예요. 먼저 들어온 게 먼저 나가는 것(FIFO) = 새치기 없는 줄. 반대로 *나중에 온 게 먼저* 나가면(LIFO) 그건 큐가 아니라 **스택** 이에요.

**공통점**: 공정하게, 먼저 온 순서대로 처리!`
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "큐에 A→B→C 순서로 넣으면, 나오는 순서는?",
          options: ["C→B→A", "A→B→C", "B→A→C", "랜덤"],
          answer: 1,
          explanation: "FIFO! 먼저 넣은 A가 먼저 나와요. A→B→C"
        },
        {
          id: "pred-fifo",
          type: "predict",
          title: "💭 줄 서기 — 누가 먼저 나올까?",
          code: "from collections import deque\nq = deque()\nq.append('🐶')   # enqueue\nq.append('🐱')\nq.append('🐰')\nprint(q.popleft())   # dequeue: ?",
          options: ["🐶", "🐱", "🐰", "에러"],
          answer: 0,
          explanation: "FIFO! 먼저 줄 선 🐶 가 먼저 나와요. 새치기 없음."
        },
        {
          id: "try-fifo",
          type: "tryit",
          title: "✋ 직접 — 큐로 손님 처리",
          task: "deque 에 손님 3 명 (Alice, Bob, Carol) 을 줄 세우고, 한 명씩 차례로 처리하는 코드!",
          initialCode: "from collections import deque\nq = deque()\n\n# 손님 3 명을 큐에 차례로 추가\nq.___('Alice')\nq.___('Bob')\nq.___('Carol')\n\n# 첫 번째 손님부터 처리 — 두 번 처리해 보세요\nprint(q.___())\nprint(q.___())",
          expectedOutput: "Alice\nBob",
          hint: "추가는 .append, 앞에서 빼는 건 .popleft (FIFO)",
          hint2: "append / append / append / popleft / popleft"
        }
      ]
    },
    {
      id: "ch2",
      title: "파이썬으로 구현",
      emoji: "🐍",
      steps: [
        {
          id: "operations",
          type: "explain",
          title: "⚙️ 큐 연산",
          content: `큐를 *줄 서기* 로 다시 떠올려봐요. 줄에서 일어나는 일은 딱 두 가지예요 — **뒤로 새 사람이 들어오고, 앞에서 한 사람이 빠져나가고.** 이 두 동작에 이름을 붙인 게 큐의 핵심 연산이에요.

**enqueue** — 줄 **뒤** 에 새로 추가 (늦게 온 사람은 맨 뒤로)
\`\`\`
enqueue(3): [1,2] → [1,2,3]
\`\`\`

**dequeue** — 줄 **앞** 에서 제거 (가장 오래 기다린 사람이 나감)
\`\`\`
dequeue(): [1,2,3] → [2,3] (1 반환)
\`\`\`

**왜 *앞* 에서 나갈까?** 큐의 약속이 "먼저 온 게 먼저"(FIFO) 라서예요. 가장 앞에 있는 \`1\` 이 제일 먼저 줄을 섰으니, 제일 먼저 나가는 게 공정하죠. 들어오는 곳(뒤)과 나가는 곳(앞)이 **반대편** 인 게 큐의 모양이에요. (스택은 같은 쪽 — 위에서 넣고 위에서 빼죠.)

**보조 연산 (줄을 *건드리지 않고* 살펴보기):**
- **front**: 맨 앞 사람이 누군지 *확인만* (제거 안 함)
- **isEmpty**: 줄이 비었는지 확인
- **size**: 지금 몇 명 기다리는지`
        },
        {
          id: "pred-list-slow",
          type: "predict",
          title: "💭 리스트로 큐 만들면 어떨까?",
          content: "리스트로 큐를 만든다면:\n```python\nqueue = []\nqueue.append(item)   # 추가\nqueue.pop(0)         # 맨 앞 제거\n```\n원소가 1 만 개일 때 \\`pop(0)\\` 한 번 부르는 데 걸리는 시간은?",
          options: [
            "O(1) — 즉시",
            "O(log n) — 빠름",
            "O(n) — 뒤 원소 모두 한 칸씩 당겨야 함",
            "리스트라서 안 됨"
          ],
          answer: 2,
          explanation: "pop(0) 은 맨 앞 원소를 빼고 **나머지 모두 한 칸씩 앞으로 당겨야** 해서 O(n). 큐로 쓰기엔 느림! 그래서 다음 페이지에서 deque 가 등장."
        },
        {
          id: "deque-explain",
          type: "explain",
          title: "📦 collections.deque 사용",
          content: `리스트로도 큐를 만들 수 있어요. \`append\` 로 뒤에 넣고, \`pop(0)\` 로 맨 앞을 빼면 FIFO 가 되거든요. **그런데 이게 느려요!** 왜 느린지가 오늘의 핵심이에요.

\`\`\`python
# 리스트 - pop(0)이 O(n)으로 느림!
queue = []
queue.append(1)     # enqueue
queue.pop(0)        # dequeue - 느림!
\`\`\`

**왜 \`pop(0)\` 이 느릴까?** 리스트는 칸마다 자리 번호(0, 1, 2, …)가 매겨진 **딱 붙은 좌석** 이에요. 맨 앞 0번 좌석 사람이 빠지면, 0번 자리가 *비면 안 되니까* 뒤에 있던 모두가 **한 칸씩 앞으로 당겨 앉아야** 해요.

\`\`\`
[A][B][C][D]   ← A(맨 앞) 빼기
   ↓ B,C,D 가 전부 한 칸씩 ←
[B][C][D]
\`\`\`

손님이 10 명이면 9 명이, 1 만 명이면 9999 명이 줄줄이 당겨 앉아요. 사람이 많을수록 오래 걸리죠 — 이걸 **O(n)** (개수에 비례) 이라고 해요.

**deque 는 이 당기기를 안 해요!**
\`\`\`python
from collections import deque

queue = deque()
queue.append(1)     # enqueue - O(1)
queue.popleft()     # dequeue - O(1) 빠름!
\`\`\`

\`deque\` 는 **앞문과 뒷문이 따로 있는 줄** 이라고 생각하면 돼요. 자리 번호에 얽매이지 않아서, \`popleft()\` 로 맨 앞 사람을 빼도 *나머지는 가만히* 있어요. 뒤를 당길 필요가 없으니, 손님이 1 만 명이든 100 만 명이든 항상 **즉시(O(1))** 끝나요.

> 💡 \`list.pop(0)\` = 맨 앞 빼면 *전원 한 칸씩 당기기* (O(n), 느림)  ·  \`deque.popleft()\` = 앞문으로 그냥 내보내기 (O(1), 빠름). **큐는 무조건 \`deque\`!**`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ deque로 큐 만들기!",
          task: "deque를 사용해서 큐를 구현해보세요!",
          initialCode: "from collections import deque\n\nqueue = deque()\n\n# enqueue\nqueue.append(\"1번 손님\")\nqueue.append(\"2번 손님\")\nqueue.append(\"3번 손님\")\nprint(\"대기열:\", list(queue))\n\n# dequeue\nprint(\"처리:\", queue.popleft())\nprint(\"처리:\", queue.popleft())\nprint(\"남은 대기열:\", list(queue))",
          expectedOutput: "대기열: ['1번 손님', '2번 손님', '3번 손님']\n처리: 1번 손님\n처리: 2번 손님\n남은 대기열: ['3번 손님']",
          hint: "append()로 뒤에 추가, popleft()로 앞에서 제거!",
          hint2: "FIFO: 1번이 먼저 나옴"
        },
        {
          id: "class-queue",
          type: "explain",
          title: "🖨️ 프린터 대기열 시뮬",
          content: `이제 배운 \`deque\` 로 *진짜처럼 돌아가는* 걸 하나 만들어봐요 — 프린터예요.

학교 공용 프린터에 여러 명이 동시에 인쇄를 보내면 어떻게 될까요? 한꺼번에 다 못 찍으니, 프린터는 들어온 요청을 **줄 세워 두고** 한 장씩 처리해요. 내가 먼저 보냈으면 내 문서가 먼저 — 딱 큐(FIFO)죠. 그래서 \`append\` 로 요청을 쌓고, \`popleft\` 로 앞에서부터 인쇄하면 실제 프린터와 똑같이 동작해요.

\`\`\`python
from collections import deque

printer = deque()

# 인쇄 요청 (큐 뒤에 enqueue)
printer.append("문서1.pdf")
printer.append("사진.jpg")
printer.append("보고서.docx")

print("대기:", len(printer), "개")

# 빌 때까지 한 장씩 출력 (앞에서 dequeue)
while printer:
    print("인쇄 중:", printer.popleft())
\`\`\`

**문서1.pdf 가 가장 먼저 들어왔으니 가장 먼저 인쇄돼요.**`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 — 프린터 대기열 처리",
          task: "deque 로 인쇄 대기열을 만들고, 빌 때까지 한 장씩 출력하세요!",
          initialCode: "from collections import deque\n\nprinter = deque()\n\n# 3 개 인쇄 요청 (큐 뒤에 추가)\nprinter.___(\"문서1.pdf\")\nprinter.___(\"사진.jpg\")\nprinter.___(\"보고서.docx\")\n\nprint(\"대기 중인 작업:\", len(printer), \"개\")\n\n# 빌 때까지 한 장씩 인쇄 (앞에서 빼기)\nwhile printer:\n    print(\"인쇄 중:\", printer.___())",
          expectedOutput: "대기 중인 작업: 3 개\n인쇄 중: 문서1.pdf\n인쇄 중: 사진.jpg\n인쇄 중: 보고서.docx",
          hint: "큐 뒤에 추가 = .append, 큐 앞에서 빼기 = .popleft",
          hint2: "append / append / append / popleft"
        }
      ]
    },
    {
      id: "ch3",
      title: "큐 활용 문제",
      emoji: "🧩",
      steps: [
        {
          id: "problem1-explain",
          type: "explain",
          title: "🧩 문제1: 요세푸스 문제",
          content: `**문제**: N명이 원형으로 앉아서 K번째 사람을 제거!

\`\`\`
N=7, K=3일 때:
1 2 3 4 5 6 7 → 3 제거
1 2 4 5 6 7 → 6 제거
1 2 4 5 7 → 2 제거
...
\`\`\`

**왜 큐로 풀까?** 사람들이 *원형* 으로 앉아 빙글빙글 도는 게 포인트예요. 원을 한 줄로 펴면 — 맨 앞에서 한 명씩 세고, **아직 살아남은 사람은 다시 줄 맨 뒤로** 가서 차례를 기다려요. 이게 정확히 큐의 동작이에요: 앞에서 빼서(\`popleft\`) → 살릴 사람은 뒤에 다시 넣고(\`append\`), K번째에 걸린 사람만 빼고 안 넣으면 제거! 원을 도는 것 = 큐를 한 바퀴 도는 것.

**큐로 해결:**
1. K-1명을 dequeue 후 다시 enqueue (뒤로 보냄)
2. K번째 사람을 dequeue (제거)
3. 반복`
        },
        {
          id: "pre-queue-vs-stack",
          type: "quiz",
          title: "❓ 결정 — 큐 vs 스택",
          content: "**프린터 인쇄 대기 — '먼저 보낸 거 먼저 출력'. 어떤 구조?**",
          options: ["스택 (마지막에 넣은 게 먼저 = LIFO)", "큐 (먼저 넣은 게 먼저 = FIFO)", "둘 다 가능"],
          answer: 1,
          explanation: "*먼저 온 게 먼저* = FIFO = *큐*. 스택 (LIFO) 으로 하면 늦게 보낸 게 먼저 출력 → 부당!"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 — N=7, K=3 요세푸스 풀기",
          task: "7 명이 원으로 앉아 매 3 번째 사람을 제거하는 순서를 큐로 시뮬레이션하세요!",
          initialCode: "from collections import deque\n\nn, k = 7, 3\nqueue = deque(range(1, n + 1))\nresult = []\n\nwhile queue:\n    # 1) 앞에서 k-1 명을 꺼내서 뒤로 보내기 (어느 메서드 짝?)\n    for _ in range(k - 1):\n        queue.___(queue.___())\n    # 2) 그 다음 k번째 사람 제거 (어느 메서드?)\n    result.append(queue.___())\n\nprint(\"제거 순서:\", result)",
          expectedOutput: "제거 순서: [3, 6, 2, 7, 5, 1, 4]",
          hint: "큐 *앞* 에서 꺼내고 *뒤* 에 추가하는 짝",
          hint2: "popleft + append"
        },
        {
          id: "problem2-explain",
          type: "explain",
          title: "🧩 문제2: 카드 섞기",
          content: `**문제**: 카드 덱의 맨 위 카드를 버리고, 그 다음 카드를 맨 아래로!

\`\`\`
[1,2,3,4] 시작
버리기: 1, 2를 맨 아래로 → [3,4,2]
버리기: 3, 4를 맨 아래로 → [2,4]
버리기: 2, 4를 맨 아래로 → [4]
마지막 카드: 4
\`\`\`

**왜 큐일까?** 카드 덱을 위→아래로 세운 줄이라고 보면, 매번 *맨 위(앞)* 만 건드려요 — 한 장은 버리고(\`popleft\`), 한 장은 *맨 아래(뒤)* 로 보내요(\`popleft\` 한 값을 \`append\`). 앞에서 빼고 뒤에 넣는 동작뿐이라 딱 큐예요. 요세푸스와 똑같은 패턴인데, "살리기" 대신 "맨 아래로 보내기" 인 셈.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 — 카드 6 장으로 마지막 남는 카드 찾기",
          task: "카드 [1, 2, 3, 4, 5, 6] 으로 시작! 맨 위 1 장 버리고, 다음 1 장은 맨 아래로 보내요. 마지막에 남는 카드는?",
          initialCode: "from collections import deque\n\ncards = deque(range(1, 7))   # [1, 2, 3, 4, 5, 6]\n\nwhile len(cards) > 1:\n    # 맨 위 카드 버리기 (앞에서 빼기)\n    discarded = cards.___()\n    print(\"버림:\", discarded)\n    # 다음 카드는 맨 아래로 (앞에서 빼서 뒤에 추가)\n    cards.___(cards.___())\n\nprint(\"마지막 카드:\", cards[0])",
          expectedOutput: "버림: 1\n버림: 3\n버림: 5\n버림: 2\n버림: 6\n마지막 카드: 4",
          hint: "버리기 = popleft. 아래로 보내기 = popleft 한 값을 append.",
          hint2: "popleft / append / popleft"
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
          title: "🏆 최종 미션: 콜센터 대기열 시뮬",
          task: "전화 3 건이 들어오고 2 건 상담 처리되는 콜센터를 deque 로 시뮬레이션하세요!",
          initialCode: "from collections import deque\n\nqueue = ___()       # 대기열 큐\ncall_id = 0\n\n# 김철수 전화 접수\ncall_id += 1\nqueue.___((call_id, \"김철수\"))\nprint(f\"📞 김철수님 전화 접수 (대기번호: {call_id})\")\n\n# 이영희 전화 접수\ncall_id += 1\nqueue.___((call_id, \"이영희\"))\nprint(f\"📞 이영희님 전화 접수 (대기번호: {call_id})\")\n\n# 박민수 전화 접수\ncall_id += 1\nqueue.___((call_id, \"박민수\"))\nprint(f\"📞 박민수님 전화 접수 (대기번호: {call_id})\")\n\nprint(f\"\\n대기 인원: {len(queue)}명\\n\")\n\n# 첫 두 명 상담 시작 (앞에서 빼기)\nfor _ in range(2):\n    cid, caller = queue.___()\n    print(f\"✅ {caller}님 상담 시작 (대기번호: {cid})\")\n\nprint(f\"\\n대기 인원: {len(queue)}명\")",
          expectedOutput: "📞 김철수님 전화 접수 (대기번호: 1)\n📞 이영희님 전화 접수 (대기번호: 2)\n📞 박민수님 전화 접수 (대기번호: 3)\n\n대기 인원: 3명\n\n✅ 김철수님 상담 시작 (대기번호: 1)\n✅ 이영희님 상담 시작 (대기번호: 2)\n\n대기 인원: 1명",
          hint: "큐 = deque(). 전화 접수 = .append, 상담 시작 = .popleft (먼저 온 사람부터)",
          hint2: "deque / append / append / append / popleft"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **큐** = FIFO (First In, First Out)
✅ **enqueue** = 뒤에 추가 (append)
✅ **dequeue** = 앞에서 제거 (popleft)
✅ **deque** 사용으로 O(1) 성능!

**스택 vs 큐:**
| 구분 | 스택 | 큐 |
|------|------|------|
| 원리 | LIFO | FIFO |
| 비유 | 프링글스 | 줄서기 |
| 추가 | push (위) | enqueue (뒤) |
| 제거 | pop (위) | dequeue (앞) |

다음 시간에는 **덱(Deque)**를 배워요! 🚀`
        }
      ]
    }
  ]
}
