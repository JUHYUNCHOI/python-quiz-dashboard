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
          title: "🚶‍♂️ 줄 서기를 생각해봐요!",
          content: `은행에서 줄을 서면 어떻게 될까요?

\`\`\`
입구 → [1번] [2번] [3번] → 출구
       먼저온    나중온
       사람      사람
\`\`\`

**먼저 온 1번이 먼저 처리돼요!**

이게 바로 **큐(Queue)**!
- **FIFO**: First In, First Out
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
          title: "🏗️ Queue 클래스",
          content: `클래스로 깔끔하게 만들기:

\`\`\`python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
    
    def front(self):
        if not self.is_empty():
            return self.items[0]
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ Queue 클래스 사용!",
          task: "Queue 클래스를 테스트해보세요!",
          initialCode: "from collections import deque\n\nclass Queue:\n    def __init__(self):\n        self.items = deque()\n    def enqueue(self, item):\n        self.items.append(item)\n    def dequeue(self):\n        return self.items.popleft() if self.items else None\n    def front(self):\n        return self.items[0] if self.items else None\n    def is_empty(self):\n        return len(self.items) == 0\n\n# 프린터 대기열 시뮬레이션\nprinter = Queue()\nprinter.enqueue(\"문서1.pdf\")\nprinter.enqueue(\"사진.jpg\")\nprinter.enqueue(\"보고서.docx\")\n\nprint(\"대기 중인 작업:\", printer.size(), \"개\")\nwhile not printer.is_empty():\n    print(\"인쇄 중:\", printer.dequeue())",
          expectedOutput: "대기 중인 작업: 3 개\n인쇄 중: 문서1.pdf\n인쇄 중: 사진.jpg\n인쇄 중: 보고서.docx",
          hint: "먼저 추가한 문서1.pdf가 먼저 인쇄됨!",
          hint2: "is_empty()로 큐가 빌 때까지 반복"
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
          title: "🖥️ 요세푸스 문제 풀기!",
          task: "요세푸스 문제를 큐로 해결하세요!",
          initialCode: "from collections import deque\n\ndef josephus(n, k):\n    queue = deque(range(1, n + 1))\n    result = []\n    \n    while queue:\n        # k-1명을 뒤로 보냄\n        for _ in range(k - 1):\n            queue.append(queue.popleft())\n        # k번째 사람 제거\n        result.append(queue.popleft())\n    \n    return result\n\nprint(\"제거 순서:\", josephus(7, 3))",
          expectedOutput: "제거 순서: [3, 6, 2, 7, 5, 1, 4]",
          hint: "k-1명을 뒤로 보내고, k번째를 제거!",
          hint2: "원형 구조를 큐로 시뮬레이션"
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
          title: "🖥️ 카드 섞기!",
          task: "마지막에 남는 카드를 찾으세요!",
          initialCode: "from collections import deque\n\ndef last_card(n):\n    cards = deque(range(1, n + 1))\n    \n    while len(cards) > 1:\n        # 맨 위 카드 버리기\n        discarded = cards.popleft()\n        print(f\"버림: {discarded}\")\n        # 그 다음 카드를 맨 아래로\n        cards.append(cards.popleft())\n    \n    return cards[0]\n\nprint(f\"마지막 카드: {last_card(6)}\")",
          expectedOutput: "버림: 1\n버림: 3\n버림: 5\n버림: 2\n버림: 6\n마지막 카드: 4",
          hint: "popleft()로 버리고, popleft() + append()로 아래로!",
          hint2: "len(cards) > 1일 동안 반복"
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
          title: "🏆 최종 미션: 콜센터 시뮬레이션!",
          task: "콜센터 대기열을 시뮬레이션하세요!",
          initialCode: "from collections import deque\n\nclass CallCenter:\n    def __init__(self):\n        self.queue = deque()\n        self.call_id = 0\n    \n    def receive_call(self, caller):\n        self.call_id += 1\n        self.queue.append((self.call_id, caller))\n        print(f\"📞 {caller}님 전화 접수 (대기번호: {self.call_id})\")\n    \n    def handle_call(self):\n        if self.queue:\n            call_id, caller = self.queue.popleft()\n            print(f\"✅ {caller}님 상담 시작 (대기번호: {call_id})\")\n        else:\n            print(\"대기 중인 전화가 없습니다\")\n    \n    def waiting_count(self):\n        return len(self.queue)\n\n# 시뮬레이션\ncall_center = CallCenter()\ncall_center.receive_call(\"김철수\")\ncall_center.receive_call(\"이영희\")\ncall_center.receive_call(\"박민수\")\nprint(f\"\\n대기 인원: {call_center.waiting_count()}명\\n\")\ncall_center.handle_call()\ncall_center.handle_call()\nprint(f\"\\n대기 인원: {call_center.waiting_count()}명\")",
          expectedOutput: "📞 김철수님 전화 접수 (대기번호: 1)\n📞 이영희님 전화 접수 (대기번호: 2)\n📞 박민수님 전화 접수 (대기번호: 3)\n\n대기 인원: 3명\n\n✅ 김철수님 상담 시작 (대기번호: 1)\n✅ 이영희님 상담 시작 (대기번호: 2)\n\n대기 인원: 1명",
          hint: "먼저 전화한 김철수님이 먼저 상담!",
          hint2: "FIFO로 공정하게 처리"
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
