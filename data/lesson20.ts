// ============================================
// 레슨 20: 딕셔너리
// ============================================
import { LessonData } from './types'

export const lesson20Data: LessonData = {
  id: "20",
  title: "딕셔너리",
  emoji: "📖",
  description: "키-값 쌍으로 데이터를 저장해요!",
  chapters: [
    {
      id: "ch1",
      title: "딕셔너리란?",
      emoji: "📖",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📖 사전처럼 찾기!",
          content: `영어사전에서 단어를 찾듯이!

**딕셔너리** = 키(key)로 값(value)을 찾는 자료구조

\`\`\`python
person = {
    "이름": "철수",
    "나이": 15,
    "학교": "파이썬중학교"
}

print(person["이름"])  # 철수
print(person["나이"])  # 15
\`\`\`

**{키: 값, 키: 값, ...}** 형태!

### 어디서 자주 만나요?

- **이름 → 정보**: 학생 이름 → 점수, 사용자 ID → 프로필
- **빈도 카운트**: 단어 → 등장 횟수, 점수 → 학생 수
- **JSON 데이터**: 웹에서 받는 데이터의 기본 형태
- **설정값**: 옵션 이름 → 값 ("음량": 50, "다크모드": True)
- **그룹화**: 반 → 학생 명단, 카테고리 → 상품 목록

리스트가 "순서대로 줄 세우기" 라면, 딕셔너리는 "이름표 붙여서 정리".`
        },
        {
          id: "creation-ways",
          type: "explain",
          title: "🛠️ 만드는 법 + 키 규칙",
          content: `\`\`\`python
# 1) 중괄호 — 가장 흔함
person = {"이름": "철수", "나이": 15}

# 2) dict() 함수 — 키워드 인자
person = dict(이름="철수", 나이=15)
# 키가 변수명 형태일 때만 가능 (한글도 OK)

# 3) 빈 딕셔너리
empty = {}        # ✅ 빈 dict
empty = dict()    # ✅ 같은 결과

# 4) 키-값 쌍 리스트로
pairs = [("a", 1), ("b", 2), ("c", 3)]
d = dict(pairs)   # {"a": 1, "b": 2, "c": 3}

# 5) fromkeys — 같은 값으로 초기화
d = dict.fromkeys(["A", "B", "C"], 0)
# {"A": 0, "B": 0, "C": 0} — 빈도 카운트 시작용
\`\`\`

### ⚠️ 키는 immutable 만!

\`\`\`python
{"a": 1}        # ✅ 문자열 OK
{1: "one"}      # ✅ 정수 OK
{(1, 2): "점"}  # ✅ 튜플 OK (immutable)
{[1, 2]: "x"}   # ❌ 리스트 X — TypeError!
{{1, 2}: "x"}   # ❌ 집합 X
\`\`\`

키는 변하지 않는 값만 가능해요. 값(value) 은 뭐든 OK — 리스트/집합/다른 딕셔너리도.

> 🎯 **빈 \`{}\` 는 딕셔너리** (집합 아님). 빈 set 은 \`set()\`.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "딕셔너리에서 값을 찾아보세요!",
          initialCode: "student = {\n    \"이름\": \"영희\",\n    \"점수\": 95,\n    \"반\": \"A\"\n}\n\nprint(student[\"이름\"])\nprint(student[\"점수\"])",
          expectedOutput: "영희\n95",
          hint: "딕셔너리[키]로 값을 찾아요!",
          hint2: "student[\"이름\"]"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "딕셔너리에서 값을 찾는 방법은?",
          options: ["dict[0]", "dict[키]", "dict(키)", "dict.키"],
          answer: 1,
          explanation: "딕셔너리[키]로 해당 키의 값을 찾아요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "딕셔너리 수정",
      emoji: "✏️",
      steps: [
        {
          id: "modify-explain",
          type: "explain",
          title: "✏️ 추가와 수정",
          content: `**값 추가/수정:**
\`\`\`python
person = {"이름": "철수"}

# 추가
person["나이"] = 15

# 수정
person["이름"] = "영희"

print(person)
# {'이름': '영희', '나이': 15}
\`\`\`

없는 키면 **추가**, 있는 키면 **수정**!`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 값 추가하기!",
          task: "딕셔너리에 '취미'를 추가하세요!",
          initialCode: "person = {\"이름\": \"철수\", \"나이\": 15}\nperson[\"취미\"] = \"게임\"\nprint(person)",
          expectedOutput: "{'이름': '철수', '나이': 15, '취미': '게임'}",
          hint: "새 키를 넣으면 추가돼요!",
          hint2: "person[\"취미\"] = \"게임\""
        },
        {
          id: "del-explain",
          type: "explain",
          title: "🗑️ 삭제하기",
          content: `**del** 또는 **pop()**으로 삭제:

\`\`\`python
person = {"이름": "철수", "나이": 15}

# del로 삭제
del person["나이"]

# pop()으로 삭제 (값 반환)
name = person.pop("이름")
\`\`\``
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 값 삭제하기!",
          task: "'나이' 키를 삭제하세요!",
          initialCode: "person = {\"이름\": \"철수\", \"나이\": 15, \"학교\": \"중학교\"}\ndel person[\"나이\"]\nprint(person)",
          expectedOutput: "{'이름': '철수', '학교': '중학교'}",
          hint: "del 딕셔너리[키] 형태로 삭제!",
          hint2: "del person[\"나이\"]"
        },
        {
          id: "pop-safe",
          type: "explain",
          title: "🛡️ 안전한 삭제 — pop 의 기본값",
          content: `\`del\` 이나 \`pop()\` 으로 없는 키를 삭제하면 에러나요. **pop 에 기본값** 을 주면 안전.

\`\`\`python
person = {"이름": "철수"}

# ❌ 에러 — 키가 없음
del person["나이"]            # KeyError
person.pop("나이")            # KeyError

# ✅ 안전한 pop — 두 번째 인자가 기본값
result = person.pop("나이", None)
print(result)   # None — 에러 안 남
\`\`\`

### popitem() — 마지막 쌍 꺼내기

\`\`\`python
person = {"이름": "철수", "나이": 15, "학교": "중학교"}

key, val = person.popitem()
print(key, val)   # 학교 중학교 — 가장 마지막
print(person)     # {"이름": "철수", "나이": 15}
\`\`\`

### clear() — 전부 비우기

\`\`\`python
person.clear()
print(person)   # {}
\`\`\``
        },
        {
          id: "update-method",
          type: "explain",
          title: "🔀 update — 딕셔너리 합치기",
          content: `**update()** 로 다른 딕셔너리의 키-값을 한꺼번에 합쳐요.

\`\`\`python
person = {"이름": "철수", "나이": 15}
extra  = {"학교": "중학교", "취미": "축구"}

person.update(extra)
print(person)
# {'이름': '철수', '나이': 15, '학교': '중학교', '취미': '축구'}
\`\`\`

### 같은 키가 있으면 새 값으로 덮어씀

\`\`\`python
person = {"이름": "철수", "나이": 15}
update = {"나이": 16, "학교": "중학교"}

person.update(update)
print(person)
# {'이름': '철수', '나이': 16, '학교': '중학교'}  ← 나이 16 으로 변경
\`\`\`

### 키워드 인자로도 OK

\`\`\`python
person = {"이름": "철수"}
person.update(나이=15, 학교="중학교")
\`\`\`

> 💡 **딕셔너리 병합 \`|\`** (Python 3.9+):
> \`\`\`python
> merged = person | extra   # 새 딕셔너리
> person |= extra            # update 와 같은 효과
> \`\`\``
        },
        {
          id: "try-update",
          type: "tryit",
          title: "🖥️ 직접 해보기 — update 로 두 딕셔너리 합치기",
          task: "기존 학생 정보에 추가 정보를 update 로 합치세요!",
          initialCode: "student = {\"이름\": \"영희\", \"나이\": 14}\nextra = {\"학교\": \"중학교\", \"학년\": 2, \"나이\": 15}   # 나이는 새 값으로\n\n# update 로 합치기\nstudent.___(extra)\nprint(student)",
          expectedOutput: "{'이름': '영희', '나이': 15, '학교': '중학교', '학년': 2}",
          hint: "student.update(extra) — 같은 키는 덮어씀.",
          hint2: "student.update(extra)"
        }
      ]
    },
    {
      id: "ch3",
      title: "딕셔너리 메서드",
      emoji: "🔧",
      steps: [
        {
          id: "method-explain",
          type: "explain",
          title: "🔧 유용한 메서드들",
          content: `**keys()** - 모든 키
**values()** - 모든 값
**items()** - 키-값 쌍

\`\`\`python
person = {"이름": "철수", "나이": 15}

print(person.keys())    # dict_keys(['이름', '나이'])
print(person.values())  # dict_values(['철수', 15])
print(person.items())   # dict_items([('이름', '철수'), ...])
\`\`\`

**get()** - 안전하게 값 가져오기
\`\`\`python
print(person.get("이름"))  # 철수
print(person.get("직업"))  # None (에러 안 남!)
\`\`\``
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 딕셔너리 순회!",
          task: "모든 키-값 쌍을 출력하세요!",
          initialCode: "scores = {\"국어\": 90, \"영어\": 85, \"수학\": 95}\n\nfor subject, score in scores.items():\n    print(f\"{subject}: {score}점\")",
          expectedOutput: "국어: 90점\n영어: 85점\n수학: 95점",
          hint: "items()로 키-값 쌍을 순회!",
          hint2: "for key, value in dict.items():"
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ keys, values, get!",
          task: "딕셔너리 메서드를 다양하게 사용해보세요!",
          initialCode: "menu = {'치킨': 18000, '피자': 20000, '햄버거': 7000, '떡볶이': 4000}\n\n# 메뉴 이름만 (keys)\nprint('=== 메뉴 목록 ===')\nfor name in menu.keys():\n    print(f'  {name}')\n\n# 가격만 (values)\nprices = list(menu.values())\nprint(f'\\n평균 가격: {sum(prices)//len(prices)}원')\n\n# 안전하게 찾기 (get)\nprint(f'\\n치킨: {menu.get(\"치킨\")}원')\nprint(f'초밥: {menu.get(\"초밥\", \"없는 메뉴\")}')",
          expectedOutput: "=== 메뉴 목록 ===\n  치킨\n  피자\n  햄버거\n  떡볶이\n\n평균 가격: 12250원\n\n치킨: 18000원\n초밥: 없는 메뉴",
          hint: "keys()는 키들, values()는 값들, get()은 없어도 에러 안 나요!",
          hint2: "코드를 그대로 실행하세요!"
        },
        {
          id: "mission-method",
          type: "mission",
          title: "🎯 미션: 딕셔너리 메서드!",
          task: "빈칸 3개를 채워서 성적 분석을 완성하세요!",
          initialCode: "grades = {'철수': 85, '영희': 92, '민수': 78, '지연': 96}\n\n# 모든 학생 이름 출력\nfor name in grades.___():\n    print(f'학생: {name}')\n\n# 모든 점수로 평균 계산\nscores = list(grades.___())\navg = sum(scores) // len(scores)\nprint(f'\\n평균: {avg}점')\n\n# 없는 학생 안전하게 찾기\nresult = grades.___(\"동수\", \"없는 학생\")\nprint(f'동수: {result}')",
          expectedOutput: "학생: 철수\n학생: 영희\n학생: 민수\n학생: 지연\n\n평균: 87점\n\n동수: 없는 학생",
          hint: "keys()로 이름, values()로 점수, get()으로 안전 접근!",
          hint2: "keys / values / get"
        },
        {
          id: "in-check",
          type: "explain",
          title: "🔍 in — 키 존재 검사",
          content: `\`in\` 은 **키** 가 있는지 확인. 값(value) 검사 아니에요.

\`\`\`python
person = {"이름": "철수", "나이": 15}

print("이름" in person)       # True — 키 검사
print("철수" in person)       # False — 값은 안 검사

# 값 검사하려면 values() 거치기
print("철수" in person.values())   # True
\`\`\`

### 안전한 접근 패턴

\`\`\`python
# 패턴 1) in 으로 먼저 확인
if "이름" in person:
    print(person["이름"])

# 패턴 2) get() 으로 한 번에
print(person.get("이름", "이름 없음"))
\`\`\`

둘 다 같은 결과지만 \`get\` 이 한 줄이라 깔끔.

> 🎯 한 줄: **존재 여부만 알면 \`in\`, 값까지 가져오려면 \`get\`.**`
        },
        {
          id: "counter-pattern",
          type: "explain",
          title: "📊 빈도 카운트 — 딕셔너리의 단골 패턴",
          content: `"이 단어가 몇 번 나왔지?" 같은 빈도 세기는 딕셔너리의 가장 흔한 사용처.

\`\`\`python
words = ["사과", "배", "사과", "감", "배", "사과"]

# 패턴 1) get 으로 안전하게 +1
count = {}
for w in words:
    count[w] = count.get(w, 0) + 1
print(count)  # {'사과': 3, '배': 2, '감': 1}
\`\`\`

\`get(w, 0)\` = "있으면 그 값, 없으면 0". 거기에 +1.

### 더 짧게 — collections.Counter

\`\`\`python
from collections import Counter
count = Counter(words)
print(count)
# Counter({'사과': 3, '배': 2, '감': 1})

# 가장 많이 등장한 2 개
print(count.most_common(2))
# [('사과', 3), ('배', 2)]
\`\`\`

\`Counter\` 는 딕셔너리의 특별한 형태로, 빈도 카운트에 최적화됨.

### setdefault — 또 다른 패턴

\`\`\`python
count = {}
for w in words:
    count.setdefault(w, 0)
    count[w] += 1
\`\`\`

\`setdefault(키, 기본값)\` = "키 없으면 기본값으로 만들고, 그 값 반환". 빈 리스트로 시작할 때 더 유용.`
        },
        {
          id: "try-counter",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 단어 빈도 카운트",
          task: "글자 빈도수를 세는 딕셔너리를 만들어 보세요. (가장 자주 나오는 글자 1 개도)",
          initialCode: "text = \"banana\"\n\n# 글자 빈도 카운트\ncount = {}\nfor ch in text:\n    count[ch] = count.___(ch, ___) + 1\n\nprint(count)\n\n# 가장 많이 나온 글자 (가장 큰 value 의 key)\ntop = max(count, key=count.get)\nprint(f\"top: {top} ({count[top]} 번)\")",
          expectedOutput: "{'b': 1, 'a': 3, 'n': 2}\ntop: a (3 번)",
          hint: "count.get(ch, 0) + 1 — 없으면 0, 있으면 그 값에 +1.",
          hint2: "count[ch] = count.get(ch, 0) + 1"
        },
        {
          id: "comprehension",
          type: "explain",
          title: "✨ dict comprehension — 한 줄로 만들기",
          content: `\`{key: value for ... in ...}\` 형태로 딕셔너리도 한 줄에 만들 수 있어요.

\`\`\`python
# 1) 1~5 의 제곱표
squares = {n: n*n for n in range(1, 6)}
print(squares)
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 2) 점수 → 등급
scores = {"철수": 85, "영희": 92, "민수": 73}
grades = {name: ("A" if s >= 90 else "B" if s >= 80 else "C")
          for name, s in scores.items()}
print(grades)
# {'철수': 'B', '영희': 'A', '민수': 'C'}

# 3) 키-값 뒤집기
d = {"a": 1, "b": 2, "c": 3}
flipped = {v: k for k, v in d.items()}
print(flipped)
# {1: 'a', 2: 'b', 3: 'c'}
\`\`\`

리스트 컴프리헨션 (\`[x for x in ...]\`) 의 딕셔너리 버전. 익숙해지면 강력해요.`
        },
        {
          id: "try-comprehension",
          type: "tryit",
          title: "🖥️ 직접 해보기 — dict comprehension",
          task: "이름 리스트와 점수 리스트를 묶어서 학생-점수 딕셔너리로 만드세요!",
          initialCode: "names = [\"철수\", \"영희\", \"민수\"]\nscores = [85, 92, 78]\n\n# zip 으로 묶고 dict comp 로\nresult = {___ for name, score in zip(names, scores)}\n\nprint(result)",
          expectedOutput: "{'철수': 85, '영희': 92, '민수': 78}",
          hint: "{name: score for name, score in zip(names, scores)}",
          hint2: "result = {name: score for name, score in zip(names, scores)}"
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
          title: "🏆 미션 1 — 단어장 검색",
          task: "단어장에서 단어를 찾아보세요!",
          initialCode: "dictionary = {\n    \"apple\": \"사과\",\n    \"banana\": \"바나나\",\n    \"cherry\": \"체리\"\n}\n\nword = \"apple\"\nif word ___ dictionary:\n    print(f\"{word} = {dictionary[___]}\")\nelse:\n    print(\"단어를 찾을 수 없습니다\")",
          expectedOutput: "apple = 사과",
          hint: "in으로 키 존재 여부 확인!",
          hint2: "word in dictionary"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 2 — 학생 성적 분석",
          task: "학생-점수 딕셔너리에서 **평균, 최고점 학생, 합격자 (60 이상) 명단** 을 출력하세요.",
          initialCode: "grades = {\"철수\": 85, \"영희\": 92, \"민수\": 55, \"수지\": 78, \"준호\": 60}\n\n# 평균 (소수 첫째 자리)\nscores = list(grades.values())\navg = sum(scores) / len(scores)\nprint(f\"평균: {avg:.1f}\")\n\n# 최고점 학생 — max + key=...\ntop = max(grades, key=___)\nprint(f\"최고: {top} ({grades[top]}점)\")\n\n# 합격자 (60 이상) 명단\npassed = [name for name, s in grades.items() if s >= ___]\nprint(f\"합격자: {sorted(passed)}\")",
          expectedOutput: "평균: 74.0\n최고: 영희 (92점)\n합격자: ['수지', '영희', '준호', '철수']",
          hint: "max(grades, key=grades.get) — 점수 기준 최대 키. 합격선 60.",
          hint2: "top = max(grades, key=grades.get)\npassed = [name for name, s in grades.items() if s >= 60]"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 미션 3 — 입력 단어 빈도 분석",
          task: "공백으로 구분된 단어를 입력받아 **각 단어의 등장 횟수** + **가장 자주 나온 단어** 를 출력하세요.",
          initialCode: "words = input().split()\n\n# 빈도 카운트\ncount = {}\nfor w in words:\n    count[w] = count.___(w, 0) + 1\n\nprint(\"=== 빈도 ===\")\nfor w in sorted(count):   # 알파벳/한글 정렬\n    print(f\"{w}: {count[w]}\")\n\n# 가장 많이 나온 단어\ntop = max(count, key=count.get)\nprint(f\"\\n최다: {top} ({count[top]}회)\")",
          expectedOutput: "=== 빈도 ===\n감: 1\n배: 2\n사과: 3\n\n최다: 사과 (3회)",
          stdin: "사과 배 사과 감 배 사과",
          hint: "count.get(w, 0) + 1 패턴 활용.",
          hint2: "count[w] = count.get(w, 0) + 1"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **딕셔너리 \`{ }\`** — 키:값 쌍, 이름표로 빠른 접근
✅ **만드는 법** — \`{...}\`, \`dict()\`, \`fromkeys()\`
✅ **키 규칙** — immutable 만 (str, int, tuple OK / list X)
✅ **dict[키]** vs **get(키, 기본값)** — 안전한 접근
✅ **추가/수정/삭제** — \`dict[키] = 값\`, \`del\`, \`pop(키, 기본)\`, \`clear()\`
✅ **update / popitem** — 합치기 / 마지막 꺼내기
✅ **keys / values / items** — 순회 메서드
✅ **in 검사** — 키 존재 (값은 \`values()\` 거쳐서)
✅ **빈도 카운트 패턴** — \`count[w] = count.get(w, 0) + 1\`
✅ **dict comprehension** — \`{k: v for ... in ...}\`
✅ **실전** — 학생 성적 분석, 단어 빈도, 단어장

다음 시간에는 **집합 (set)** 을 배워요! 🚀 — 딕셔너리에서 키만 남기면 집합.`
        }
      ]
    }
  ]
}
