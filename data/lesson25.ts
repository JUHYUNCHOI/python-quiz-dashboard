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
          content: `**덱(Deque)** = Double-Ended Queue.
양쪽 끝에서 다 넣고 뺄 수 있어요!

\`\`\`
      ←  [A] [B] [C]  →
    앞에서            뒤에서
    넣기/빼기        넣기/빼기
\`\`\`

**비유: 양쪽이 뚫린 터널.**
- 스택처럼도 쓸 수 있고
- 큐처럼도 쓸 수 있고
- 둘 다 O(1) 빠름!`
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

**덱을 사용한 최적화:**
- 덱에 "최댓값이 될 수 있는 인덱스"만 유지
- O(n) 시간 복잡도!`
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
