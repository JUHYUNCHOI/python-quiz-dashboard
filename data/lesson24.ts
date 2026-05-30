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
          content: `**큐의 예시들:**

🚶 **줄 서기** - 먼저 온 사람 먼저
🖨️ **프린터 대기열** - 먼저 요청한 것 먼저
🎮 **게임 매칭** - 먼저 신청한 사람 먼저
📦 **택배 처리** - 먼저 접수된 것 먼저
🎵 **음악 재생목록** - 순서대로 재생

**공통점**: 공정하게 순서대로 처리!`
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
          content: `**핵심 연산 2가지:**

**enqueue** - 뒤에 추가
\`\`\`
enqueue(3): [1,2] → [1,2,3]
\`\`\`

**dequeue** - 앞에서 제거
\`\`\`
dequeue(): [1,2,3] → [2,3] (1 반환)
\`\`\`

**보조 연산:**
- **front**: 맨 앞 확인 (제거 안 함)
- **isEmpty**: 비었는지 확인
- **size**: 개수 확인`
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
          content: `리스트로 큐를 만들면 **느려요!**
\`\`\`python
# 리스트 - pop(0)이 O(n)으로 느림!
queue = []
queue.append(1)     # enqueue
queue.pop(0)        # dequeue - 느림!
\`\`\`

**deque를 쓰면 빨라요!**
\`\`\`python
from collections import deque

queue = deque()
queue.append(1)     # enqueue - O(1)
queue.popleft()     # dequeue - O(1) 빠름!
\`\`\``
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
          content: `프린터 대기열 = 전형적인 큐!
파일을 인쇄 요청한 **순서대로** 출력돼요.

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

**큐로 해결:**
1. K-1명을 dequeue 후 다시 enqueue (뒤로 보냄)
2. K번째 사람을 dequeue (제거)
3. 반복`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 — N=7, K=3 요세푸스 풀기",
          task: "7 명이 원으로 앉아 매 3 번째 사람을 제거하는 순서를 큐로 시뮬레이션하세요!",
          initialCode: "from collections import deque\n\nn, k = 7, 3\nqueue = deque(range(1, n + 1))\nresult = []\n\nwhile queue:\n    # k-1 명을 뒤로 돌려보냄 (popleft → append)\n    for _ in range(k - 1):\n        queue.___(queue.___())\n    # k 번째 사람 제거\n    result.append(queue.___())\n\nprint(\"제거 순서:\", result)",
          expectedOutput: "제거 순서: [3, 6, 2, 7, 5, 1, 4]",
          hint: "앞에서 빼서 뒤로 보내기 = popleft 한 값을 append. 마지막은 popleft 로 제거.",
          hint2: "append / popleft / popleft"
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
\`\`\``
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
