// ============================================
// 레슨 26: 자료구조 비교와 선택 - 심화
// ============================================
import { LessonData } from './types'

export const lesson26Data: LessonData = {
  id: "26",
  title: "자료구조 비교와 선택",
  emoji: "⚖️",
  description: "상황에 맞는 자료구조를 선택하는 방법!",
  chapters: [
    {
      id: "ch1",
      title: "시간 복잡도 비교",
      emoji: "⏱️",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "⏱️ 왜 자료구조 선택이 중요할까?",
          content: `**같은 문제, 다른 성능!**

10만 개 데이터에서 검색:
- 리스트: 최대 10만 번 비교 😰
- 집합: 1번이면 끝! 😎

**자료구조 선택이 성능을 결정해요!**

코딩테스트에서:
- 시간 초과 = 틀린 자료구조
- 통과 = 올바른 자료구조`
        },
        {
          id: "bigO",
          type: "explain",
          title: "📊 시간 복잡도 총정리",
          content: `| 연산 | 리스트 | 딕셔너리 | 집합 | 덱 |
|------|--------|----------|------|------|
| 인덱스 접근 | O(1) | - | - | O(n) |
| 검색 (in) | O(n) | O(1) | O(1) | O(n) |
| 맨 뒤 추가 | O(1) | O(1) | O(1) | O(1) |
| 맨 앞 추가 | O(n) | - | - | O(1) |
| 맨 뒤 삭제 | O(1) | O(1) | O(1) | O(1) |
| 맨 앞 삭제 | O(n) | - | - | O(1) |
| 중간 삽입 | O(n) | - | - | O(n) |

**기억할 것:**
- 검색이 많으면 → 딕셔너리/집합
- 앞뒤 작업이 많으면 → 덱`
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "리스트에서 'in' 연산의 시간 복잡도는?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          answer: 2,
          explanation: "리스트는 처음부터 끝까지 하나씩 확인해서 O(n)이에요!"
        },
        {
          id: "quiz-pick",
          type: "quiz",
          title: "🎯 어떤 자료구조?",
          content: "100,000 개 단어가 들어있는 사전에서 **\"이 단어가 사전에 있는지\"** 를 빠르게 확인하고 싶어요. 가장 적합한 자료구조는?",
          options: [
            "리스트 (list)",
            "튜플 (tuple)",
            "집합 (set)",
            "스택 (stack)"
          ],
          answer: 2,
          explanation: "set! O(1) 평균. 리스트/튜플은 O(n) 이라 큰 사전에선 느림. set 은 hash 기반이라 즉시 확인 가능."
        },
        {
          id: "try-pick-ds",
          type: "tryit",
          title: "✋ 직접 — 상황에 맞는 자료구조 고르기",
          task: "이름 5 명 중에 'Bob' 이 있는지 빠르게 확인해 보세요. 어떤 자료구조 + 연산을 쓸까?",
          initialCode: "names = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve']\n\n# 빠른 확인을 위해 적절한 자료구조로 변환\nlookup = ___(names)\n\n# 'Bob' 이 들어있는지 in 으로 확인\nprint('Bob' ___ lookup)",
          expectedOutput: "True",
          hint: "list 를 set 으로 바꾸면 in 검사가 O(1) 평균이 돼요. 'in' 키워드로 멤버십 확인.",
          hint2: "set / in"
        }
      ]
    },
    {
      id: "ch2",
      title: "상황별 선택 가이드",
      emoji: "🎯",
      steps: [
        {
          id: "guide",
          type: "explain",
          title: "🎯 이럴 땐 이 자료구조!",
          content: `**📋 리스트** 사용:
- 순서가 중요할 때
- 인덱스로 접근할 때
- 중복 허용할 때

**📖 딕셔너리** 사용:
- 키로 빠르게 찾을 때
- 연관 데이터 저장할 때
- 카운팅할 때

**🎯 집합** 사용:
- 중복 제거할 때
- 포함 여부만 확인할 때
- 집합 연산(합/교/차)할 때

**↔️ 덱** 사용:
- 앞뒤 모두 추가/삭제할 때
- 슬라이딩 윈도우
- 스택과 큐 모두 필요할 때`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 검색 성능 원리!",
          task: "리스트 vs 집합 검색 원리를 이해하세요!",
          initialCode: "# 리스트: 처음부터 하나씩 확인 (O(n))\nmy_list = [10, 20, 30, 40, 50]\ntarget = 40\n\n# 리스트 검색 과정\nprint(\"리스트 검색:\")\nfor i, val in enumerate(my_list):\n    print(f\"  {i}번째: {val} 확인\", end=\"\")\n    if val == target:\n        print(\" → 찾았다!\")\n        break\n    print()\n\n# 집합: 해시로 바로 접근 (O(1))\nmy_set = {10, 20, 30, 40, 50}\nprint(f\"\\n집합 검색:\")\nprint(f\"  {target} in 집합? {target in my_set} (바로 찾음!)\")",
          expectedOutput: "리스트 검색:\n  0번째: 10 확인\n  1번째: 20 확인\n  2번째: 30 확인\n  3번째: 40 확인 → 찾았다!\n\n집합 검색:\n  40 in 집합? True (바로 찾음!)",
          hint: "리스트는 순차 탐색, 집합은 해시 탐색!",
          hint2: "데이터가 많을수록 차이가 커짐"
        },
        {
          id: "problem-solving",
          type: "explain",
          title: "🧩 문제 유형별 자료구조",
          content: `**1. "~가 있는지 확인" → 집합/딕셔너리**
\`\`\`python
# ❌ 느림
if item in my_list:
# ✅ 빠름  
if item in my_set:
\`\`\`

**2. "개수 세기" → 딕셔너리 / Counter**
\`\`\`python
from collections import Counter
counts = Counter(items)
\`\`\`

**3. "앞에서 빼기" → 덱**
\`\`\`python
from collections import deque
q = deque()
q.popleft()  # O(1)
\`\`\`

**4. "최근 N개 유지" → 덱(maxlen)**
\`\`\`python
recent = deque(maxlen=N)
\`\`\``
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "사용자 ID 중복 체크에 가장 좋은 자료구조는?",
          options: ["리스트", "튜플", "집합", "덱"],
          answer: 2,
          explanation: "중복 체크 = 'in' 검색이 많음 → 집합이 O(1)로 가장 빠름!"
        }
      ]
    },
    {
      id: "ch3",
      title: "실전 문제",
      emoji: "🧩",
      steps: [
        {
          id: "problem1",
          type: "explain",
          title: "🧩 문제1: 두 리스트의 공통 요소",
          content: `**문제**: 두 리스트에서 공통 요소 찾기

\`\`\`python
a = [1, 2, 3, 4, 5]
b = [4, 5, 6, 7, 8]
# 공통: [4, 5]
\`\`\`

**방법 1: 이중 for문** - O(n²) 느림!
**방법 2: 집합 교집합** - O(n) 빠름!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 공통 요소 찾기!",
          task: "두 가지 방법을 비교하세요!",
          initialCode: "# 방법 1: 이중 for문 - O(n²)\ndef common_slow(a, b):\n    result = []\n    for x in a:\n        if x in b:  # O(n)\n            result.append(x)\n    return result\n\n# 방법 2: 집합 - O(n)\ndef common_fast(a, b):\n    return list(set(a) & set(b))\n\na = [1, 2, 3, 4, 5]\nb = [4, 5, 6, 7, 8]\n\nprint(\"느린 방법:\", common_slow(a, b))\nprint(\"빠른 방법:\", sorted(common_fast(a, b)))",
          expectedOutput: "느린 방법: [4, 5]\n빠른 방법: [4, 5]",
          hint: "집합의 & 연산은 O(n)!",
          hint2: "데이터가 많으면 차이가 엄청남"
        },
        {
          id: "problem2",
          type: "explain",
          title: "🧩 문제2: 문자 빈도수 세기",
          content: `**문제**: 문자열에서 각 문자의 개수 세기

**방법 1: 직접 딕셔너리**
\`\`\`python
counts = {}
for char in text:
    counts[char] = counts.get(char, 0) + 1
\`\`\`

**방법 2: Counter 사용**
\`\`\`python
from collections import Counter
counts = Counter(text)
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 빈도수 세기!",
          task: "두 가지 방법으로 빈도수를 세보세요!",
          initialCode: "from collections import Counter\n\ntext = \"hello\"\n\n# 방법 1: 직접 딕셔너리\ncounts1 = {}\nfor char in text:\n    counts1[char] = counts1.get(char, 0) + 1\nprint(\"딕셔너리:\", counts1)\n\n# 방법 2: Counter\ncounts2 = Counter(text)\nprint(\"Counter:\", dict(counts2))\n\n# 가장 많은 문자\nprint(\"가장 많은 문자:\", counts2.most_common(1))",
          expectedOutput: "딕셔너리: {'h': 1, 'e': 1, 'l': 2, 'o': 1}\nCounter: {'h': 1, 'e': 1, 'l': 2, 'o': 1}\n가장 많은 문자: [('l', 2)]",
          hint: "Counter는 딕셔너리의 서브클래스!",
          hint2: "most_common()으로 순위 확인 가능"
        },
        {
          id: "problem3",
          type: "explain",
          title: "🧩 문제3: 자료구조 선택 연습",
          content: `**다음 상황에 어떤 자료구조?**

1. **학생 출석 체크** (이름으로 출석 여부)
   → 집합 또는 딕셔너리

2. **브라우저 방문 기록** (뒤로가기)
   → 스택 (덱으로 구현)

3. **프린터 대기열**
   → 큐 (덱으로 구현)

4. **최근 본 상품 5개**
   → 덱 (maxlen=5)

5. **단어장** (영어 → 한국어)
   → 딕셔너리`
        },
        {
          id: "try-recent",
          type: "tryit",
          title: "✋ 직접 — 최근 본 5 개만 유지",
          task: "사용자가 본 상품을 차례로 추가하는데, **항상 마지막 3 개만** 보관되게 만들어 보세요. (deque 의 maxlen 옵션 활용)",
          initialCode: "from collections import deque\n\n# 길이가 3 으로 제한된 deque 만들기\nrecent = deque(___=3)\n\nrecent.append('A')\nrecent.append('B')\nrecent.append('C')\nrecent.append('D')   # 추가하면 가장 오래된 게 자동으로 빠져요\nrecent.append('E')\n\nprint(list(recent))",
          expectedOutput: "['C', 'D', 'E']",
          hint: "deque 생성 시 maxlen 옵션을 주면 그 길이를 넘는 만큼 자동으로 앞에서 빠져요.",
          hint2: "deque(maxlen=3)"
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
          title: "🏆 최종 미션: 종합 문제!",
          task: "적절한 자료구조를 선택해서 문제를 해결하세요!",
          initialCode: "from collections import deque, Counter\n\n# 문제 1: 중복 제거\nnumbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\nunique = list(___(numbers))  # 어떤 자료구조?\nprint(\"1. 중복 제거:\", sorted(unique))\n\n# 문제 2: 단어 빈도수 Top 3\nwords = \"apple banana apple cherry banana apple\".split()\nword_count = ___(words)  # 어떤 도구?\nprint(\"2. Top 3:\", word_count.most_common(3))\n\n# 문제 3: 두 집합의 차이\nset_a = {1, 2, 3, 4, 5}\nset_b = {4, 5, 6, 7, 8}\nonly_a = set_a ___ set_b  # 어떤 연산?\nprint(\"3. A에만 있는 것:\", sorted(only_a))\n\n# 문제 4: 최근 검색어 3개 유지\nrecent = deque(___=3)  # 어떤 옵션?\nfor query in [\"파이썬\", \"자바\", \"C++\", \"자바스크립트\", \"Go\"]:\n    recent.append(query)\nprint(\"4. 최근 검색어:\", list(recent))",
          expectedOutput: "1. 중복 제거: [1, 2, 3, 4]\n2. Top 3: [('apple', 3), ('banana', 2), ('cherry', 1)]\n3. A에만 있는 것: [1, 2, 3]\n4. 최근 검색어: ['C++', '자바스크립트', 'Go']",
          hint: "중복 제거는 set, 개수 세기는 Counter, 차집합은 -, 최근 N개는 deque의 maxlen!",
          hint2: "set, Counter, -, maxlen을 넣으세요!"
        },
        {
          id: "cheatsheet",
          type: "explain",
          title: "📋 치트시트",
          content: `## 자료구조 선택 치트시트

**"~가 있나요?"** → **집합/딕셔너리** (O(1) 검색)
**"몇 개 있나요?"** → **Counter**
**"순서대로 저장"** → **리스트**
**"바꾸면 안 됨"** → **튜플**
**"키로 찾기"** → **딕셔너리**
**"중복 없이"** → **집합**
**"앞뒤로 넣고 빼기"** → **덱**
**"마지막만"** → **스택 (리스트)**
**"먼저 온 순서"** → **큐 (덱)**
**"최근 N개만"** → **덱 (maxlen)**`
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 Part 3 심화 완료!",
          content: `## 심화 과정에서 배운 것

✅ **스택** - LIFO, 괄호 검사, 뒤로가기
✅ **큐** - FIFO, 대기열, 순서 처리
✅ **덱** - 양방향, 회문, 슬라이딩 윈도우
✅ **자료구조 선택** - 상황에 맞게!

**핵심:**
- 검색 많으면 → 해시 기반 (딕셔너리, 집합)
- 순서 중요하면 → 리스트, 덱
- 앞뒤 작업 → 덱

🎉 **축하합니다!**
자료구조 마스터가 되셨어요! 🏆`
        }
      ]
    }
  ]
}
