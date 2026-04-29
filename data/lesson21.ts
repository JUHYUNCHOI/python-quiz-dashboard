// ============================================
// 레슨 21: 집합 (set)
// ============================================
import { LessonData } from './types'

export const lesson21Data: LessonData = {
  id: "21",
  title: "집합 (set)",
  emoji: "🎯",
  description: "중복 없는 집합을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "집합이란?",
      emoji: "🎯",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎯 중복을 없애고 싶다면?",
          content: `**집합(set)** = 중복이 없고, 순서가 없는 자료구조

\`\`\`python
numbers = {1, 2, 2, 3, 3, 3}
print(numbers)  # {1, 2, 3} - 중복 제거!

names = {"철수", "영희", "철수"}
print(names)  # {'철수', '영희'}
\`\`\`

**특징:**
- ❌ 중복 없음 — 같은 값 두 번 안 들어감
- ❌ 순서 없음 — 인덱스 \`s[0]\` 같은 거 못 함
- ⭕ 빠른 검색 — \`in\` 연산이 리스트보다 훨씬 빠름

### 어디서 자주 만나요?

- **중복 제거**: 사용자 ID 목록에서 한 번 이상 접속한 사람만
- **태그 관리**: 게시물에 달린 태그 (같은 태그 여러 번 X)
- **빠른 회원 확인**: "이 사용자가 가입했나?" 즉시 답
- **두 그룹 비교**: 공통 친구, A 반에만 있는 학생 등 (다음 챕터)`
        },
        {
          id: "creation-ways",
          type: "explain",
          title: "🛠️ 집합 만드는 법 + 빈 set 트랩",
          content: `\`\`\`python
# 1) 중괄호 — 가장 흔함
s1 = {1, 2, 3}

# 2) set() 함수 — 다른 컬렉션 → 집합
s2 = set([1, 2, 2, 3])     # 리스트 → {1, 2, 3}
s3 = set("hello")           # 문자열 → {'h', 'e', 'l', 'o'}
s4 = set((1, 2, 3))         # 튜플 → {1, 2, 3}
\`\`\`

### ⚠️ 빈 집합 트랩

\`\`\`python
empty1 = {}        # ❌ 이건 빈 딕셔너리!
empty2 = set()     # ✅ 진짜 빈 집합
\`\`\`

\`{}\` 는 파이썬에서 **딕셔너리** 가 가져갔어요. 빈 집합은 반드시 \`set()\` 으로.

### 집합 안에 들어갈 수 있는 것

\`\`\`python
# OK — 변하지 않는 (hashable) 값들
{1, "hi", (1, 2), 3.14}

# ❌ 리스트는 안 됨 (수정 가능 → hashable 아님)
{[1, 2], 3}   # TypeError
\`\`\`

> 🎯 한 줄: **set 의 원소는 변하지 않는 값만** (숫자, 문자열, 튜플 OK / 리스트, 딕셔너리 X).`
        },
        {
          id: "vs-list-detail",
          type: "explain",
          title: "🤔 리스트 vs 집합 vs 튜플 — 언제 뭘?",
          content: `세 자료구조 한눈에 정리.

| | 리스트 \`[]\` | 집합 \`{}\` | 튜플 \`()\` |
|---|---|---|---|
| 중복 | OK | ❌ 자동 제거 | OK |
| 순서 | OK (인덱스 가능) | ❌ 없음 | OK (인덱스 가능) |
| 수정 | OK | OK (요소만) | ❌ |
| 검색 (\`in\`) | 느림 (앞에서부터) | **빠름** (해시) | 느림 |
| 주 용도 | 순서 있는 모음 | 중복 없는 모음 | 묶음 (좌표 등) |

### 결정 트리

1. **순서 / 인덱스 필요?** → 리스트나 튜플
2. **중복 허용?**
   - 예 → 리스트
   - 아니오 → 집합
3. **수정?**
   - 자주 바꿈 → 리스트
   - 한 번 정해 끝 → 튜플

### 실전 예시

| 데이터 | 도구 | 이유 |
|---|---|---|
| 학생 명단 (입학 순) | 리스트 | 순서 있음 |
| 좌석 좌표 (5, 7) | 튜플 | 묶음, 안 바뀜 |
| 가입 회원 ID | 집합 | 중복 X, 빠른 확인 |
| 태그 모음 | 집합 | 중복 X |
| 장바구니 | 리스트 | 순서 + 중복 가능 |
| 일주일 요일 | 튜플 | 절대 안 바뀜 |`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "중복을 제거하고 개수를 세보세요!",
          initialCode: "numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\nunique = set(numbers)\nprint(f\"중복 제거 후 개수: {len(unique)}개\")",
          expectedOutput: "중복 제거 후 개수: 4개",
          hint: "set()으로 리스트를 집합으로!",
          hint2: "len()으로 개수 확인"
        },
        {
          id: "try-dedupe-list",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 중복 제거하고 다시 리스트로",
          task: "방문자 명단에서 중복을 제거한 정렬된 리스트를 만들어 보세요. (중복 제거 → 정렬)",
          initialCode: "visitors = [\"철수\", \"영희\", \"철수\", \"민수\", \"영희\", \"수지\", \"철수\"]\n\n# 1) set 으로 변환 → 중복 제거\n# 2) sorted() 로 정렬해 리스트로 다시\nunique_sorted = ___\n\nprint(unique_sorted)",
          expectedOutput: "['민수', '수지', '영희', '철수']",
          hint: "sorted(set(visitors)) — set 거치면서 중복 제거, sorted 가 자동 list 반환.",
          hint2: "unique_sorted = sorted(set(visitors))"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "set([1, 1, 2, 2, 3])의 결과는?",
          options: ["{1, 1, 2, 2, 3}", "{1, 2, 3}", "[1, 2, 3]", "에러"],
          answer: 1,
          explanation: "집합은 중복을 자동으로 제거해요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "집합 연산",
      emoji: "🔧",
      steps: [
        {
          id: "add-remove",
          type: "explain",
          title: "➕➖ 추가와 삭제",
          content: `**add()** - 추가
**remove()** - 삭제 (없으면 에러)
**discard()** - 삭제 (없어도 OK)

\`\`\`python
fruits = {"사과", "바나나"}

fruits.add("딸기")
print(fruits)  # {'사과', '바나나', '딸기'}

fruits.remove("바나나")
print(fruits)  # {'사과', '딸기'}
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 요소 추가하기!",
          task: "집합에 '오렌지'를 추가하고 개수를 확인하세요!",
          initialCode: "fruits = {\"사과\", \"바나나\"}\nfruits.add(\"오렌지\")\nprint(f\"과일 개수: {len(fruits)}개\")",
          expectedOutput: "과일 개수: 3개",
          hint: "add()로 추가!",
          hint2: "fruits.add(\"오렌지\")"
        },
        {
          id: "in-explain",
          type: "explain",
          title: "🔍 포함 여부 확인",
          content: `**in** 연산자로 빠르게 확인!

\`\`\`python
fruits = {"사과", "바나나", "딸기"}

print("사과" in fruits)   # True
print("포도" in fruits)   # False
\`\`\`

💡 집합은 리스트보다 **훨씬 빠르게** 검색해요!`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 포함 확인!",
          task: "'바나나'가 있는지 확인하세요!",
          initialCode: "fruits = {\"사과\", \"바나나\", \"딸기\"}\nprint(\"바나나\" in fruits)",
          expectedOutput: "True",
          hint: "in 연산자 사용!",
          hint2: "\"바나나\" in fruits"
        },
        {
          id: "more-methods",
          type: "explain",
          title: "🔧 더 많은 메서드 — update / pop / clear",
          content: `**update()** — 다른 컬렉션의 모든 요소를 한꺼번에 추가
**pop()** — 임의의 요소 하나 꺼내서 제거 (순서 없으니 어느 것일지 모름)
**clear()** — 전부 지우기

\`\`\`python
fruits = {"사과", "바나나"}

# 한꺼번에 여러 개 추가 (리스트, 튜플, 다른 set 다 OK)
fruits.update(["딸기", "포도"])
fruits.update({"키위", "망고"})
print(fruits)  # 6 가지 — 순서는 들쭉날쭉

# 임의 하나 꺼내기
item = fruits.pop()
print(f"꺼냄: {item}")
print(f"남은: {fruits}")  # 5 개

# 전부 지우기
fruits.clear()
print(fruits)  # set()
\`\`\`

### discard vs remove 다시 보기

\`\`\`python
s = {1, 2, 3}
s.remove(99)    # ❌ KeyError — 없으면 에러
s.discard(99)   # ✅ 조용히 무시
\`\`\`

> 💡 **확실히 있을 때 remove, 있을 수도 없을 수도면 discard.**`
        },
        {
          id: "try-update",
          type: "tryit",
          title: "🖥️ 직접 해보기 — update 로 한꺼번에 추가",
          task: "기존 학생 모음에 신입생 리스트를 update 로 한 번에 합치세요!",
          initialCode: "current = {\"철수\", \"영희\", \"민수\"}\nnew_students = [\"수지\", \"준호\", \"영희\"]   # 영희는 이미 있음\n\n# update 로 한꺼번에\ncurrent.___(new_students)\nprint(f\"전체 인원: {len(current)}명\")",
          expectedOutput: "전체 인원: 5명",
          hint: "current.update(new_students) — 영희는 자동 중복 제거.",
          hint2: "current.update(new_students)"
        },
        {
          id: "comprehension",
          type: "explain",
          title: "✨ set comprehension — 한 줄로 집합 만들기",
          content: `리스트 컴프리헨션 \`[x for x in ...]\` 을 알면 set 도 똑같이 가능. 대괄호만 중괄호로.

\`\`\`python
# 1~10 의 제곱 모음 (중복 없음)
squares = {x * x for x in range(1, 11)}
print(squares)  # {1, 4, 9, 16, 25, 36, 49, 64, 81, 100}

# 문자열에서 모음만
vowels = {ch for ch in "hello world" if ch in "aeiou"}
print(vowels)  # {'e', 'o'}

# 점수 리스트 → 등급 집합
scores = [85, 92, 73, 88, 95, 67]
grades = {"A" if s >= 90 else "B" if s >= 80 else "C" for s in scores}
print(grades)  # {'A', 'B', 'C'} — 등장한 등급들
\`\`\`

> 🎯 **언제 list 컴프리헨션 vs set 컴프리헨션?**
> - 순서 + 중복 유지 → list \`[...]\`
> - 중복 제거 + 검색 빠름 → set \`{...}\``
        },
        {
          id: "try-comprehension",
          type: "tryit",
          title: "🖥️ 직접 해보기 — set comprehension",
          task: "단어 리스트에서 **3 글자 이상** 인 단어들의 집합을 만드세요!",
          initialCode: "words = [\"사과\", \"바나나\", \"키위\", \"파인애플\", \"감\", \"오렌지\"]\n\n# set comprehension 으로 길이 3 이상\nlong_words = ___\n\nprint(sorted(long_words))  # 정렬해서 출력 (재현 가능)",
          expectedOutput: "['바나나', '오렌지', '파인애플']",
          hint: "{w for w in words if len(w) >= 3}",
          hint2: "long_words = {w for w in words if len(w) >= 3}"
        }
      ]
    },
    {
      id: "ch3",
      title: "집합 연산",
      emoji: "🧮",
      steps: [
        {
          id: "set-ops",
          type: "explain",
          title: "🧮 수학의 집합 연산!",
          content: `\`\`\`python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# 합집합 (A 또는 B)
print(A | B)  # {1, 2, 3, 4, 5, 6}

# 교집합 (A 그리고 B)
print(A & B)  # {3, 4}

# 차집합 (A에만 있는 것)
print(A - B)  # {1, 2}
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 교집합 구하기!",
          task: "두 집합의 공통 요소 개수를 구하세요!",
          initialCode: "A = {1, 2, 3, 4, 5}\nB = {4, 5, 6, 7, 8}\ncommon = A & B\nprint(f\"공통 요소 개수: {len(common)}개\")",
          expectedOutput: "공통 요소 개수: 2개",
          hint: "& 연산자로 교집합!",
          hint2: "len()으로 개수"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 차집합 구하기!",
          task: "A에만 있는 요소 개수를 구하세요!",
          initialCode: "A = {1, 2, 3, 4, 5}\nB = {4, 5, 6, 7, 8}\nonly_A = A - B\nprint(f\"A에만 있는 요소 개수: {len(only_A)}개\")",
          expectedOutput: "A에만 있는 요소 개수: 3개",
          hint: "- 연산자로 차집합!",
          hint2: "A - B"
        },
        {
          id: "mission-ops",
          type: "mission",
          title: "🎯 미션: 집합 연산 마스터!",
          task: "빈칸 3개를 채워서 집합 연산을 완성하세요!",
          initialCode: "fruits_a = {'사과', '바나나', '포도', '딸기'}\nfruits_b = {'바나나', '딸기', '망고', '키위'}\n\n# 두 가게 모두 파는 과일 (교집합)\nboth = fruits_a ___ fruits_b\nprint(f'둘 다: {both}')\n\n# A가게만 파는 과일 (차집합)\nonly_a = fruits_a ___ fruits_b\nprint(f'A만: {only_a}')\n\n# 전체 과일 (합집합)\nall_fruits = fruits_a ___ fruits_b\nprint(f'전체: {len(all_fruits)}종류')",
          expectedOutput: "둘 다: {'바나나', '딸기'}\nA만: {'사과', '포도'}\n전체: 6종류",
          hint: "교집합 &, 차집합 -, 합집합 |",
          hint2: "& / - / |"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "{1, 2, 3} | {3, 4, 5}의 결과는?",
          options: ["{3}", "{1, 2, 3, 4, 5}", "{1, 2, 4, 5}", "에러"],
          answer: 1,
          explanation: "| 는 합집합! 모든 요소를 합쳐요."
        },
        {
          id: "symmetric-diff",
          type: "explain",
          title: "⚡ ^ 연산 — 한쪽에만 있는 것 (대칭차)",
          content: `**합집합/교집합/차집합** 외에 한 가지 더 — \`^\` (caret).

\`\`\`python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

print(A ^ B)   # {1, 2, 5, 6}
\`\`\`

→ "**둘 중 한 곳에만 있는 것**" — 양쪽 다 있는 (3, 4) 는 빠짐.

### 실전 — 두 명단 차이 비교

\`\`\`python
어제_접속 = {"철수", "영희", "민수"}
오늘_접속 = {"영희", "민수", "수지"}

다른 = 어제_접속 ^ 오늘_접속
print(다른)
# {"철수", "수지"} — 어제만 또는 오늘만 접속한 사람
\`\`\`

| 연산자 | 의미 | 메서드 형태 |
|---|---|---|
| \`A \\| B\` | 합집합 | \`A.union(B)\` |
| \`A & B\` | 교집합 | \`A.intersection(B)\` |
| \`A - B\` | 차집합 (A에만) | \`A.difference(B)\` |
| \`A ^ B\` | 대칭차 (한쪽만) | \`A.symmetric_difference(B)\` |

> 💡 메서드 형태는 **리스트도 인자로** 받을 수 있어서 가끔 편해요. 연산자 형태는 둘 다 set 이어야 함.`
        },
        {
          id: "try-symmetric",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 대칭차",
          task: "두 동아리 멤버 중 **한 동아리만** 가입한 학생 모음을 ^ 로 구하세요!",
          initialCode: "축구 = {\"철수\", \"영희\", \"민수\", \"준호\"}\n농구 = {\"민수\", \"준호\", \"수지\", \"지영\"}\n\n# 한 동아리만 가입한 사람\n한쪽만 = ___\n\nprint(sorted(한쪽만))",
          expectedOutput: "['수지', '영희', '지영', '철수']",
          hint: "축구 ^ 농구",
          hint2: "한쪽만 = 축구 ^ 농구"
        },
        {
          id: "subset-explain",
          type: "explain",
          title: "📐 부분집합 검사 — <=, <, >=, >",
          content: `**A 가 B 안에 다 들어가나?** 부분집합 검사.

\`\`\`python
대학생 = {"철수", "영희", "민수", "수지"}
독서동아리 = {"영희", "수지"}

# 독서동아리 ⊆ 대학생 (부분집합)?
print(독서동아리 <= 대학생)   # True
print(독서동아리 < 대학생)    # True (진부분집합)
print(독서동아리 == 대학생)   # False (완전 같진 않음)
\`\`\`

| 연산자 | 의미 |
|---|---|
| \`A <= B\` | A 가 B 의 **부분집합** (같아도 OK) |
| \`A < B\` | A 가 B 의 **진부분집합** (A ≠ B) |
| \`A >= B\` | A 가 B 를 **포함** (같아도 OK) |
| \`A > B\` | A 가 B 를 **진정으로** 포함 |
| \`A.isdisjoint(B)\` | 교집합이 비었는지 (공통 X) |

### 실전 — 권한 검사

\`\`\`python
필요_권한 = {"read", "write"}
사용자_권한 = {"read", "write", "admin"}

if 필요_권한 <= 사용자_권한:
    print("접근 허용")
else:
    print("권한 부족")
\`\`\``
        },
        {
          id: "try-subset",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 부분집합",
          task: "내가 가진 재료로 레시피를 만들 수 있는지 확인하세요! (필요 재료 ⊆ 내 재료)",
          initialCode: "내_재료 = {\"밀가루\", \"설탕\", \"버터\", \"계란\", \"우유\", \"바닐라\"}\n팬케이크_레시피 = {\"밀가루\", \"계란\", \"우유\"}\n\n# 만들 수 있나?\n가능 = ___\n\nif 가능:\n    print(\"만들 수 있어요!\")\nelse:\n    print(\"재료가 부족해요\")",
          expectedOutput: "만들 수 있어요!",
          hint: "팬케이크_레시피 <= 내_재료",
          hint2: "가능 = 팬케이크_레시피 <= 내_재료"
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
          title: "🏆 미션 1 — 두 반 공통/전체 학생",
          task: "두 반의 공통 학생 수와 전체 학생 수를 구하세요!",
          initialCode: "class_a = {\"철수\", \"영희\", \"민수\", \"지영\"}\nclass_b = {\"영희\", \"민수\", \"준호\", \"수진\"}\n\n# 공통 학생 (교집합)\ncommon = class_a ___ class_b\n\n# 전체 학생 (합집합)\nall_students = class_a ___ class_b\n\nprint(f\"A반 학생 수: {len(class_a)}명\")\nprint(f\"B반 학생 수: {len(class_b)}명\")\nprint(f\"공통 학생 수: {len(common)}명\")\nprint(f\"전체 학생 수: {len(all_students)}명\")",
          expectedOutput: "A반 학생 수: 4명\nB반 학생 수: 4명\n공통 학생 수: 2명\n전체 학생 수: 6명",
          hint: "& 는 교집합, | 는 합집합!",
          hint2: "len()으로 개수 확인"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 2 — 친구 추천 (공통 친구 기반)",
          task: "내 친구의 친구 중 **나는 모르는 사람** 을 추천 후보로 뽑으세요. (다른 동아리 친구로 응용)",
          initialCode: "내_친구 = {\"철수\", \"영희\", \"민수\"}\n영희의_친구 = {\"철수\", \"민수\", \"수지\", \"준호\", \"지영\"}\n\n# 영희가 알고 있는 친구 중 내가 모르는 사람 = 추천 후보\n추천 = ___\n\nprint(sorted(추천))",
          expectedOutput: "['수지', '준호', '지영']",
          hint: "영희의_친구 - 내_친구 (영희만 알고 나는 모르는). 자기 자신은 자동 제외 안 되지만 여기선 OK.",
          hint2: "추천 = 영희의_친구 - 내_친구"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 미션 3 — 입력 받은 단어 중복 개수",
          task: "공백으로 구분된 단어들을 입력받아 **고유 단어 수** 와 **중복 단어 수** 를 출력하세요.",
          initialCode: "words = input().split()\n\n# 1) 고유 단어 수 = set 의 길이\n# 2) 중복 단어 수 = 전체 - 고유\n\nunique = ___\nduplicates = ___\n\nprint(f\"전체: {len(words)}개\")\nprint(f\"고유: {unique}개\")\nprint(f\"중복: {duplicates}개\")",
          expectedOutput: "전체: 8개\n고유: 5개\n중복: 3개",
          stdin: "사과 배 사과 감 배 키위 사과 감",
          hint: "len(set(words)) 가 고유 수. 중복 = 전체 - 고유.",
          hint2: "unique = len(set(words))\nduplicates = len(words) - unique"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **집합 \`{}\`** — 중복 없음, 순서 없음, 빠른 \`in\` 검색
✅ **빈 집합 트랩** — \`{}\` 는 dict! 빈 set 은 \`set()\`
✅ **자료구조 비교** — list/set/tuple 언제 뭘 쓸지
✅ **add / remove / discard / pop / clear / update** — 집합 메서드
✅ **set comprehension** — \`{x for x in ...}\`
✅ **합집합 \`|\`, 교집합 \`&\`, 차집합 \`-\`, 대칭차 \`^\`**
✅ **부분집합 \`<=\`, \`>=\`, \`<\`, \`>\`, \`isdisjoint\`** — 권한 검사 / 레시피 검사
✅ **실전** — 중복 제거, 추천 시스템 (공통/차집합), 명단 비교

다음 시간에는 **슬라이싱**을 배워요! 🚀`
        }
      ]
    }
  ]
}
