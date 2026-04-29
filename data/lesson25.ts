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
          title: "↔️ 양쪽이 열린 통!",
          content: `**덱(Deque)** = Double-Ended Queue

양쪽 끝에서 추가/삭제가 가능해요!

\`\`\`
      ←  [A] [B] [C]  →
    앞에서            뒤에서
    넣기/빼기        넣기/빼기
\`\`\`

**스택 + 큐 = 덱!**
- 스택처럼 사용 가능
- 큐처럼 사용 가능
- 둘 다 O(1)!`
        },
        {
          id: "compare",
          type: "explain",
          title: "📊 스택 vs 큐 vs 덱",
          content: `| 자료구조 | 앞에서 | 뒤에서 |
|----------|--------|--------|
| **스택** | ❌ | 추가/삭제 |
| **큐** | 삭제만 | 추가만 |
| **덱** | 추가/삭제 | 추가/삭제 |

**덱 = 가장 유연한 자료구조!**

\`\`\`
스택: 뒤로만 →  [   ]
큐:   앞←뒤 →   [   ]
덱:   ← 양쪽 → [   ]
\`\`\``
        },
        {
          id: "realworld",
          type: "explain",
          title: "🌍 실생활 덱",
          content: `**덱의 예시들:**

🎵 **음악 플레이어** - 이전/다음 곡 모두 접근
📄 **최근 문서** - 새 문서 추가, 오래된 문서 제거
🎮 **게임 행동** - 실행취소/다시실행
🚂 **양방향 기차** - 양쪽에서 승하차

**알고리즘에서:**
- 슬라이딩 윈도우 최댓값
- 회문(팰린드롬) 검사
- BFS 최적화`
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
          content: `\`\`\`python
from collections import deque
d = deque()

# 뒤에 추가/삭제
d.append(x)      # 뒤에 추가
d.pop()          # 뒤에서 삭제

# 앞에 추가/삭제
d.appendleft(x)  # 앞에 추가
d.popleft()      # 앞에서 삭제
\`\`\`

**모두 O(1)!** 리스트보다 빠름!`
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
          content: `\`\`\`python
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
\`\`\``
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

**덱으로 검사:**
1. 문자들을 덱에 넣음
2. 앞뒤에서 하나씩 빼서 비교
3. 모두 같으면 회문!

\`\`\`
"level"
앞: l ↔ 뒤: l ✓
앞: e ↔ 뒤: e ✓
가운데: v (홀수면 남음)
→ 회문!
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 회문 검사!",
          task: "덱으로 회문을 검사하세요!",
          initialCode: "from collections import deque\n\ndef is_palindrome(s):\n    d = deque(s.lower().replace(\" \", \"\"))\n    \n    while len(d) > 1:\n        if d.popleft() != d.pop():\n            return False\n    return True\n\n# 테스트\nwords = [\"level\", \"hello\", \"A man a plan a canal Panama\", \"기러기\"]\nfor word in words:\n    result = \"✅ 회문\" if is_palindrome(word) else \"❌ 회문 아님\"\n    print(f\"{word}: {result}\")",
          expectedOutput: "level: ✅ 회문\nhello: ❌ 회문 아님\nA man a plan a canal Panama: ✅ 회문\n기러기: ✅ 회문",
          hint: "앞에서 popleft(), 뒤에서 pop()으로 비교!",
          hint2: "공백 제거, 소문자 변환 후 비교"
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

**덱을 사용한 최적화:**
- 덱에 "최댓값이 될 수 있는 인덱스"만 유지
- O(n) 시간 복잡도!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 간단한 슬라이딩 윈도우!",
          task: "슬라이딩 윈도우의 최댓값을 구하세요!",
          initialCode: "from collections import deque\n\ndef sliding_max(nums, k):\n    result = []\n    d = deque()  # 인덱스 저장\n    \n    for i in range(len(nums)):\n        # 윈도우 벗어난 인덱스 제거\n        if d and d[0] < i - k + 1:\n            d.popleft()\n        \n        # 현재 값보다 작은 값들 제거\n        while d and nums[d[-1]] < nums[i]:\n            d.pop()\n        \n        d.append(i)\n        \n        # 윈도우 완성되면 최댓값 추가\n        if i >= k - 1:\n            result.append(nums[d[0]])\n    \n    return result\n\nnums = [1, 3, -1, -3, 5, 3, 6, 7]\nprint(\"배열:\", nums)\nprint(\"K=3 최댓값:\", sliding_max(nums, 3))",
          expectedOutput: "배열: [1, 3, -1, -3, 5, 3, 6, 7]\nK=3 최댓값: [3, 3, 5, 5, 6, 7]",
          hint: "덱에 최댓값 후보 인덱스만 유지!",
          hint2: "O(n) 시간에 해결 가능"
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
          title: "🏆 최종 미션: 최근 검색어!",
          task: "최근 검색어 기능을 덱으로 구현하세요!",
          initialCode: "from collections import deque\n\nclass RecentSearches:\n    def __init__(self, max_size=5):\n        self.searches = deque(___=max_size)\n    \n    def add(self, query):\n        # 이미 있으면 제거 후 맨 앞에 추가\n        if query in self.searches:\n            self.searches.remove(query)\n        self.searches.___(query)\n        print(f\"검색: '{query}'\")\n    \n    def show(self):\n        print(\"최근 검색어:\", list(self.searches))\n    \n    def clear(self):\n        self.searches.clear()\n        print(\"검색 기록 삭제됨\")\n\n# 테스트\nrecent = RecentSearches(max_size=5)\nrecent.add(\"파이썬\")\nrecent.add(\"자료구조\")\nrecent.add(\"알고리즘\")\nrecent.add(\"덱\")\nrecent.add(\"스택\")\nrecent.show()\n\nrecent.add(\"큐\")  # 오래된 '파이썬' 삭제됨\nrecent.show()\n\nrecent.add(\"자료구조\")  # 중복! 맨 앞으로\nrecent.show()",
          expectedOutput: "검색: '파이썬'\n검색: '자료구조'\n검색: '알고리즘'\n검색: '덱'\n검색: '스택'\n최근 검색어: ['스택', '덱', '알고리즘', '자료구조', '파이썬']\n검색: '큐'\n최근 검색어: ['큐', '스택', '덱', '알고리즘', '자료구조']\n검색: '자료구조'\n최근 검색어: ['자료구조', '큐', '스택', '덱', '알고리즘']",
          hint: "deque의 최대 길이 제한과 앞에 추가하는 메서드를 사용해요!",
          hint2: "maxlen과 appendleft를 넣으세요!"
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
