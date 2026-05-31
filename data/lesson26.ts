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
          title: "⏱️ 자료구조 선택이 왜 중요해?",
          content: `**같은 일, 다른 속도!**

10 만 개 데이터에서 'X 가 있나?' 찾기:
- 리스트: 최대 10 만 번 비교 😰
- 집합(set): 1 번이면 끝 😎

**자료구조를 잘못 고르면 코드가 100,000 배 느려져요.**

코딩테스트에서:
- 시간 초과 = 자료구조를 잘못 고른 것
- 통과 = 알맞게 고른 것`
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
          id: "pred-bigO-lookup",
          type: "predict",
          title: "💭 1000 명 중 '철수' 찾기 — 누가 빠를까?",
          content: "표만 보고 끝내지 말고 *직접 추측* 해 봐요.\n\n```python\nstudents_list = [\"민지\", \"준호\", ..., \"철수\"]  # 1000명\nstudents_set  = {\"민지\", \"준호\", ..., \"철수\"}\n\n\"철수\" in students_list  # ?\n\"철수\" in students_set   # ?\n```\n\n**둘 중 어느 게 더 빠를까?**",
          options: ["list 가 훨씬 빠름", "set 이 훨씬 빠름", "둘이 비슷"],
          answer: 1,
          explanation: "list 의 `in` 은 *처음부터 끝까지 비교* (O(n)) → 최악 1000 번. set 은 *해시로 단번에* (O(1)) → 1 번. 데이터 많을수록 차이 큼."
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
          id: "quiz-pick-dict",
          type: "quiz",
          title: "🎯 다른 상황 — 어떤 자료구조?",
          content: "**'학생 이름 → 점수' 짝지어서 빠르게 찾기 — 어떤 자료구조?**",
          options: ["리스트 (list)", "딕셔너리 (dict)", "셋 (set)", "튜플 (tuple)"],
          answer: 1,
          explanation: "*키-값 짝* + *빠른 검색* = `dict`. list 로 하면 매번 처음부터 훑어야 해서 느림 (O(n))."
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
          id: "quiz-pick-stack",
          type: "quiz",
          title: "🎯 어떤 구조?",
          content: "**'뒤로가기' (브라우저 / Ctrl+Z) 처럼 *가장 최근 것* 부터 되돌리기 — 어떤 구조?**",
          options: ["스택 (LIFO)", "큐 (FIFO)", "딕셔너리", "셋"],
          answer: 0,
          explanation: "*가장 최근* 부터 = *Last In First Out* = `stack`. 책 쌓아둔 거 위에서부터 꺼내는 느낌."
        },
        {
          id: "quiz-pick-deque",
          type: "quiz",
          title: "🎯 양쪽 빠르게 — 어떤 구조?",
          content: "**'앞뒤 양쪽에서 빠르게 빼고 넣기' — 어떤 자료구조?**",
          options: ["리스트 (list)", "스택 (stack)", "큐 (queue)", "덱 (deque)"],
          answer: 3,
          explanation: "*양쪽 모두 O(1)* 은 `deque`. list 의 `pop(0)`/`insert(0, x)` 는 O(n) 으로 느림."
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "사용자 ID 중복 체크에 가장 좋은 자료구조는?",
          options: ["리스트", "튜플", "집합", "덱"],
          answer: 2,
          explanation: "중복 체크 = 'in' 검색이 많음 → 집합이 O(1)로 가장 빠름!"
        },
        {
          id: "quiz-pick-tuple",
          type: "quiz",
          title: "🎯 바뀌면 안 되는 값 — 어떤 구조?",
          content: "**'좌표 (x, y) 같이 *바뀌면 안 되는 고정값*' — 어떤 자료구조?**",
          options: ["리스트", "튜플", "딕셔너리", "셋"],
          answer: 1,
          explanation: "*변경 불가* (immutable) = `tuple`. 좌표/날짜/RGB 처럼 묶음으로 다니는 *고정값* 표현에 좋음."
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
          title: "🖥️ 직접 — 두 리스트의 공통 요소",
          task: "두 리스트 a, b 의 공통 요소를 (1) 이중 for 문, (2) set 교집합 두 방법으로 구해 보세요!",
          initialCode: "a = [1, 2, 3, 4, 5]\nb = [4, 5, 6, 7, 8]\n\n# 방법 1: 이중 for 문 — O(n²) 느림\nslow = []\nfor x in a:\n    if x in b:\n        slow.append(x)\nprint(\"느린 방법:\", slow)\n\n# 방법 2: set 교집합 — O(n) 빠름\nfast = list(set(a) ___ set(b))    # 교집합 연산자\nprint(\"빠른 방법:\", sorted(fast))",
          expectedOutput: "느린 방법: [4, 5]\n빠른 방법: [4, 5]",
          hint: "집합 교집합 연산자는 `&`. 데이터 많으면 set 이 압도적으로 빠름.",
          hint2: "&"
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
          id: "problem3-intro",
          type: "explain",
          title: "🧩 문제3: 자료구조 선택 연습",
          content: `**이번엔 *답 없이* 다섯 상황을 하나씩 추측해 봐요.**

각 상황을 보고 — 답을 보기 전에 — *직접* 자료구조를 고른 다음 다음으로 넘어가요. 5 문제 연속!`
        },
        {
          id: "problem3-pick1",
          type: "predict",
          title: "💭 상황 1 — 학생 출석 체크",
          content: "**학생 출석 체크** — 이름으로 *출석 여부* 만 빠르게 확인 (있냐 없냐).\n\n어떤 자료구조?",
          options: ["리스트", "딕셔너리/셋", "스택", "튜플"],
          answer: 1,
          explanation: "*있냐 없냐* = 멤버십 검사 → `set` 이 가장 깔끔 (O(1)). 이름→출석시각 까지 저장하고 싶으면 `dict`."
        },
        {
          id: "problem3-pick2",
          type: "predict",
          title: "💭 상황 2 — 브라우저 뒤로가기",
          content: "**브라우저 방문 기록** — *가장 최근* 방문한 페이지부터 되돌아가기 (뒤로가기 버튼).\n\n어떤 자료구조?",
          options: ["큐 (FIFO)", "스택 (LIFO)", "셋", "딕셔너리"],
          answer: 1,
          explanation: "*가장 최근* = LIFO = `stack`. 파이썬에선 list 의 `append`/`pop` 또는 `deque` 로 구현."
        },
        {
          id: "problem3-pick3",
          type: "predict",
          title: "💭 상황 3 — 프린터 대기열",
          content: "**프린터 대기열** — *먼저 보낸 작업* 부터 차례로 인쇄.\n\n어떤 자료구조?",
          options: ["스택 (LIFO)", "큐 (FIFO)", "딕셔너리", "리스트"],
          answer: 1,
          explanation: "*먼저 온 게 먼저* = FIFO = `queue`. `deque` 의 `append` + `popleft` 가 O(1) 이라 가장 적합."
        },
        {
          id: "problem3-pick4",
          type: "predict",
          title: "💭 상황 4 — 최근 본 상품 5 개",
          content: "**최근 본 상품 5 개만 유지** — 6 번째 상품을 보면 가장 오래된 1 개는 *자동으로 사라져야* 함.\n\n어떤 자료구조?",
          options: ["리스트 + pop(0)", "deque(maxlen=5)", "set", "dict"],
          answer: 1,
          explanation: "`deque(maxlen=5)` 한 줄로 끝. 넘치면 *알아서* 앞에서 빠짐. list 로 하면 매번 `pop(0)` 호출해서 O(n) — 굳이?"
        },
        {
          id: "problem3-pick5",
          type: "predict",
          title: "💭 상황 5 — 영한 단어장",
          content: "**단어장** — 영어 단어로 검색하면 한국어 뜻이 나옴.\n\n어떤 자료구조?",
          options: ["리스트", "딕셔너리", "셋", "튜플"],
          answer: 1,
          explanation: "*키* (영어) → *값* (한국어) 짝 → `dict`. 검색 O(1)."
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
          initialCode: "from collections import deque, Counter\n\n# 문제 1: 중복 제거 — 어떤 자료구조로 감쌀까?\nnumbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\nunique = list(___(numbers))\nprint(\"1. 중복 제거:\", sorted(unique))\n\n# 문제 2: 단어 빈도수 Top 3 — 어떤 도구?\nwords = \"apple banana apple cherry banana apple\".split()\nword_count = ___(words)\nprint(\"2. Top 3:\", word_count.most_common(3))\n\n# 문제 3: A 에만 있는 것 — 두 *그룹* 을 무엇으로 만들까? 그리고 연산자는?\ngroup_a = ___({1, 2, 3, 4, 5})    # 어떤 자료구조?\ngroup_b = ___({4, 5, 6, 7, 8})    # 같은 자료구조!\nonly_a = group_a ___ group_b      # 차집합 연산자\nprint(\"3. A에만 있는 것:\", sorted(only_a))\n\n# 문제 4: 최근 검색어 3 개만 — 어떤 자료구조 + 어떤 옵션?\nrecent = ___(___=3)\nfor query in [\"파이썬\", \"자바\", \"C++\", \"자바스크립트\", \"Go\"]:\n    recent.append(query)\nprint(\"4. 최근 검색어:\", list(recent))",
          expectedOutput: "1. 중복 제거: [1, 2, 3, 4]\n2. Top 3: [('apple', 3), ('banana', 2), ('cherry', 1)]\n3. A에만 있는 것: [1, 2, 3]\n4. 최근 검색어: ['C++', '자바스크립트', 'Go']",
          hint: "1: set / 2: Counter / 3: set, set, - / 4: deque, maxlen — *자료구조 이름까지* 직접 쓰세요!",
          hint2: "set, Counter, set, set, -, deque, maxlen"
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
