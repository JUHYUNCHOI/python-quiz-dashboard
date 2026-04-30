// ============================================
// 레슨 5: 문자열 연산
// ============================================
import { LessonData } from './types'

export const lesson5Data: LessonData = {
  id: "5",
  title: "문자열 연산",
  emoji: "🔗",
  description: "문자열을 더하고 곱해봐요!",
  chapters: [
    {
      id: "ch1",
      title: "문자열 더하기",
      emoji: "➕",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔗 문자열도 더할 수 있어!",
          content: `숫자만 더할 수 있다고요? 문자열도 더할 수 있어요!

\`\`\`python
first = "안녕"
second = "하세요"
print(first + second)  # 안녕하세요
\`\`\`

문자열 + 문자열 = **이어붙이기!**

### 어디서 자주 쓰여요?

- **인사 만들기** — \`"안녕, " + name + "!"\`
- **파일명 조합** — \`folder + "/" + filename\`
- **메시지 조합** — 점수+이름+상태 등
- **출력 꾸미기** — 구분선, 박스, 표 (\`* \` 곱하기)
- 사용자 입력값과 안내 문구 연결

문자열 다루는 첫 번째 도구. 이걸 알아야 다음 챕터들이 가벼워져요.`
        },
        {
          id: "concat-explain",
          type: "explain",
          title: "📝 문자열 연결 (Concatenation)",
          content: `**+** 연산자로 문자열을 이어붙여요!

\`\`\`python
name = "철수"
greeting = "안녕, " + name + "!"
print(greeting)  # 안녕, 철수!
\`\`\`

여러 개도 이어붙일 수 있어요:
\`\`\`python
a = "파"
b = "이"
c = "썬"
print(a + b + c)  # 파이썬
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "이름과 인사를 연결해서 출력하세요!",
          initialCode: "name = \"민수\"\n# + 로 문자열을 연결하세요\ngreeting = \"반가워, \" + ___ + \"!\"\nprint(greeting)",
          expectedOutput: "반가워, 민수!",
          hint: "+ 연산자로 문자열을 연결해요",
          hint2: "\"반가워, \" + name + \"!\""
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "\"Hello\" + \"World\"의 결과는?",
          options: ["Hello World", "HelloWorld", "Hello + World", "에러"],
          answer: 1,
          explanation: "문자열 +는 공백 없이 바로 이어붙여요! 공백이 필요하면 \" \"를 추가해야 해요."
        },
        {
          id: "len-explain",
          type: "explain",
          title: "📏 len() — 문자열 길이",
          content: `\`len()\` 으로 문자열의 글자 수 (길이) 를 알 수 있어요.

> 💡 \`len\` 은 영어 **\`length\` (길이)** 의 줄임말이에요. 영단어 약자라 쉽게 외워져요!

\`\`\`python
text = "hello"
print(len(text))   # 5

print(len("안녕"))  # 2

print(len(""))     # 0 — 빈 문자열
\`\`\`

### 활용 — 비밀번호 길이 검사

\`\`\`python
pwd = input("비밀번호: ")
if len(pwd) < 8:
    print("8 자 이상이어야 해요!")
else:
    print("OK")
\`\`\`

> 💡 \`len\` 은 문자열, 리스트, 튜플, 딕셔너리, 집합 다 가능. 여기저기 쓰여요.`
        },
        {
          id: "indexing",
          type: "explain",
          title: "🔢 인덱싱 — 한 글자만 꺼내기",
          content: `문자열도 리스트처럼 \`[인덱스]\` 로 한 글자씩 접근할 수 있어요.

\`\`\`python
text = "Python"
#       P y t h o n
#      [0][1][2][3][4][5]

print(text[0])    # P (첫 글자)
print(text[3])    # h
print(text[-1])   # n (마지막)
print(text[-2])   # o (뒤에서 두 번째)
\`\`\`

### 첫 글자 / 끝 글자 빠른 추출

\`\`\`python
name = "Alice"
initial = name[0]      # 'A' — 이니셜
print(f"{name} 의 이니셜: {initial}")
\`\`\`

> ⚠️ **인덱스가 범위 밖이면 에러!**
> \`\`\`python
> text = "hi"
> print(text[5])   # IndexError
> \`\`\`
> \`len(text)\` 보다 작은 인덱스만 안전.`
        },
        {
          id: "try-len-index",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 길이와 인덱스",
          task: "이름의 첫 글자, 마지막 글자, 길이를 출력하세요!",
          initialCode: "name = \"Python\"\n\n# 첫 글자\nfirst = name[___]\n# 마지막 글자 (음수 인덱스)\nlast = name[___]\n# 길이\nlength = ___(name)\n\nprint(f\"첫: {first}, 끝: {last}, 길이: {length}\")",
          expectedOutput: "첫: P, 끝: n, 길이: 6",
          hint: "name[0], name[-1], len(name)",
          hint2: "first = name[0]\nlast = name[-1]\nlength = len(name)"
        }
      ]
    },
    {
      id: "ch2",
      title: "문자열 곱하기",
      emoji: "✖️",
      steps: [
        {
          id: "multiply-explain",
          type: "explain",
          title: "✖️ 문자열 × 숫자",
          content: `문자열에 숫자를 곱하면 **반복**돼요!

\`\`\`python
print("하" * 3)      # 하하하
print("=" * 10)      # ==========
print("안녕! " * 2)  # 안녕! 안녕! 
\`\`\`

**활용 예시:**
\`\`\`python
print("=" * 20)
print("  메뉴판  ")
print("=" * 20)
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "별(*)을 10개 출력하세요!",
          initialCode: "# 문자열 * 숫자로 반복!\nprint(\"*\" * ___)",
          expectedOutput: "**********",
          hint: "문자열 * 숫자 = 반복!",
          hint2: "\"*\" * 10"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 구분선 만들기!",
          task: "=를 20개 출력해서 구분선을 만드세요!",
          initialCode: "print(\"=\" * ___)",
          expectedOutput: "====================",
          hint: "\"=\" * 20",
          hint2: "print(\"=\" * 20)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "\"AB\" * 3의 결과는?",
          options: ["AB3", "ABABAB", "AB AB AB", "에러"],
          answer: 1,
          explanation: "문자열 전체가 3번 반복돼요! AB + AB + AB = ABABAB"
        },
        {
          id: "in-explain",
          type: "explain",
          title: "🔍 in — 포함되어 있나?",
          content: `\`in\` 으로 문자열 안에 특정 글자/단어가 있는지 확인.

\`\`\`python
text = "I love Python"

print("Python" in text)   # True
print("Java" in text)     # False
print("love" in text)     # True
print("LOVE" in text)     # False — 대소문자 구분!
\`\`\`

### 활용 — 비속어 필터, 주제 검사

\`\`\`python
comment = input("댓글: ")

bad_words = ["멍청", "바보"]
for w in bad_words:
    if w in comment:
        print("부적절한 표현!")
        break
\`\`\`

### not in — 반대

\`\`\`python
print("foo" not in "hello")   # True
\`\`\`

> 💡 대소문자 무시하고 검사하려면 \`text.lower()\` 부터 (lesson 6 메서드).`
        },
        {
          id: "compare-explain",
          type: "explain",
          title: "📊 문자열 비교 — ==, <, >",
          content: `문자열도 \`==\` 으로 같은지 비교 가능.

\`\`\`python
a = "hello"
b = "hello"
c = "Hello"

print(a == b)   # True
print(a == c)   # False — 대소문자 다름
print(a != c)   # True
\`\`\`

### 알파벳 / 사전 순서 — < >

\`\`\`python
print("apple" < "banana")   # True (a 가 b 보다 앞)
print("apple" < "Apple")    # False — 대문자가 소문자보다 작음 (ASCII)
print("a" < "b")            # True
print("kiwi" < "apple")     # False
\`\`\`

→ 사전에서 먼저 나오는 게 "작음". 대문자 > 소문자 (ASCII 코드 차이).

### 활용 — 사용자 답 검사

\`\`\`python
answer = input("y/n: ").lower()
if answer == "y":
    print("진행합니다")
elif answer == "n":
    print("취소합니다")
\`\`\``
        },
        {
          id: "try-in-compare",
          type: "tryit",
          title: "🖥️ 직접 해보기 — in 과 == 검사",
          task: "댓글에 '좋아' 가 들어있는지 + 정확히 'OK' 인지 확인하세요!",
          initialCode: "comment = \"이거 좋아요!\"\nstatus = \"OK\"\n\n# '좋아' 포함 여부\nhas_good = \"좋아\" ___ comment\n\n# 정확히 'OK' 인지\nis_ok = status == ___\n\nprint(f\"좋아 있음: {has_good}\")\nprint(f\"OK: {is_ok}\")",
          expectedOutput: "좋아 있음: True\nOK: True",
          hint: "in 으로 부분 검사, == 으로 완전 일치.",
          hint2: "has_good = \"좋아\" in comment\nis_ok = status == \"OK\""
        }
      ]
    },
    {
      id: "ch3",
      title: "문자열과 숫자",
      emoji: "🔢",
      steps: [
        {
          id: "error-explain",
          type: "explain",
          title: "⚠️ 문자열 + 숫자 = 에러!",
          content: `문자열과 숫자는 바로 더할 수 없어요!

\`\`\`python
age = 15
print("나이: " + age)  # ❌ 에러!
\`\`\`

**해결 방법: str()로 변환!**
\`\`\`python
age = 15
print("나이: " + str(age))  # ✅ 나이: 15
\`\`\`

💡 f-string을 쓰면 이런 고민이 없어요! 하지만 **+로 연결하는 방법도 알아두면** 좋아요.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "점수를 문자열과 연결해서 출력하세요!",
          initialCode: "score = 100\n# 숫자를 문자열로 바꾸는 함수가 필요해요\nprint(\"점수: \" + ___(score) + \"점\")",
          expectedOutput: "점수: 100점",
          hint: "str()로 숫자를 문자열로 변환!",
          hint2: "str(score)"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 미션!",
          task: "이름과 나이를 연결해서 '철수는 15살입니다' 출력하세요!",
          initialCode: "name = \"철수\"\nage = 15\n# 숫자를 문자열로 바꿔서 + 로 연결\nprint(name + \"는 \" + ___(age) + \"살입니다\")",
          expectedOutput: "철수는 15살입니다",
          hint: "str()로 숫자를 문자열로 변환!",
          hint2: "str(age)"
        },
        {
          id: "escape-explain",
          type: "explain",
          title: "🔧 이스케이프 문자 — 특수 문자 표현",
          content: `따옴표 안에 따옴표를 넣고 싶거나 줄바꿈을 표현하려면?

\`\`\`python
# ❌ 따옴표 충돌
text = "He said "hi""    # SyntaxError

# ✅ 백슬래시 \\ 로 이스케이프
text = "He said \\"hi\\""
print(text)   # He said "hi"
\`\`\`

### 자주 쓰는 이스케이프

| 표기 | 의미 | 예시 |
|---|---|---|
| \`\\n\` | 줄바꿈 | \`"a\\nb"\` → 두 줄 |
| \`\\t\` | 탭 | \`"a\\tb"\` → a    b |
| \`\\"\` | 큰따옴표 | \`"\\"hi\\""\` → "hi" |
| \`\\'\` | 작은따옴표 | \`'\\'hi\\''\` → 'hi' |
| \`\\\\\` | 백슬래시 | \`"path\\\\file"\` → path\\file |

### 다른 따옴표 쓰기 — 더 깔끔

\`\`\`python
# 큰따옴표로 둘러싸면 작은따옴표 그대로 OK
print("It's fine")        # It's fine

# 작은따옴표로 둘러싸면 큰따옴표 그대로 OK
print('She said "hello"')  # She said "hello"
\`\`\`

### 여러 줄 — 삼중 따옴표

\`\`\`python
text = """첫 줄
둘째 줄
셋째 줄"""
print(text)
\`\`\`

> 💡 이스케이프 외워야 할 건 \`\\n\` 과 \`\\t\` 정도. 나머지는 따옴표 종류 바꿔서 해결 가능.`
        },
        {
          id: "try-escape",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 이스케이프와 줄바꿈",
          task: "한 줄에 \\n 으로 줄바꿈, \\t 로 탭 들어간 출력 만들기!",
          initialCode: "# 한 print 문으로 두 줄 + 탭으로 들여쓰기\nprint(\"제목\\n\\t항목 1\\n\\t항목 2\")",
          expectedOutput: "제목\n\t항목 1\n\t항목 2",
          hint: "코드 그대로 실행 — \\n 줄바꿈, \\t 탭.",
          hint2: "그대로 실행하세요."
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "summary",
          type: "explain",
          title: "📝 정리",
          content: `## 문자열 연산 정리

**더하기 (+)** - 이어붙이기
\`\`\`python
"Hello" + "World"  # HelloWorld
\`\`\`

**곱하기 (*)** - 반복
\`\`\`python
"Ha" * 3  # HaHaHa
\`\`\`

**숫자와 연결** - str() 필요
\`\`\`python
"점수: " + str(100)  # 점수: 100
\`\`\``
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 1 — 예쁜 메뉴판",
          task: "예쁜 메뉴판을 만들어보세요!",
          initialCode: "print(\"=\" * ___)\nprint(\"    🍗 치킨집    \")\nprint(\"=\" * ___)\nprint(\"후라이드: \" + str(___) + \"원\")\nprint(\"양념: \" + str(___) + \"원\")",
          expectedOutput: "====================\n    🍗 치킨집    \n====================\n후라이드: 18000원\n양념: 19000원",
          hint: "* 로 구분선 20개, str()로 가격 변환!",
          hint2: "20 / 18000 / 19000"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 미션 2 — 비밀번호 길이 검사",
          task: "비밀번호 길이가 8 자 이상이면 'OK', 짧으면 '부족 (현재 N자)' 출력. (입력 stdin)",
          initialCode: "pwd = input()\n\n# len() 사용\nif ___(pwd) >= 8:\n    print(\"OK\")\nelse:\n    print(\"부족 (현재 \" + ___(len(pwd)) + \"자)\")",
          expectedOutput: "부족 (현재 5자)",
          stdin: "abc12",
          hint: "len(pwd) 와 str(len(pwd))",
          hint2: "len(pwd) >= 8 / str(len(pwd))"
        },
        {
          id: "mission4",
          type: "mission",
          title: "🏆 미션 3 — 이름 이니셜 카드",
          task: "성과 이름 받아 이니셜 (첫 글자) 두 개로 카드 만들기. 대문자로 출력!",
          initialCode: "first = input(\"first: \").strip()\nlast = input(\"last: \").strip()\n\n# 첫 글자 + 첫 글자, 대문자로 (lesson 6 메서드 .upper() 미리)\ninitials = (first[___] + last[___]).upper()\n\nprint(\"=\" * 10)\nprint(\"  \" + initials)\nprint(first + \" \" + last)\nprint(\"=\" * 10)",
          expectedOutput: "==========\n  AC\nAlice Choi\n==========",
          stdin: "Alice\nChoi",
          hint: "first[0] 과 last[0] 합쳐 .upper()",
          hint2: "initials = (first[0] + last[0]).upper()"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **+** 로 문자열 이어붙이기
✅ ***** 로 문자열 반복하기 (구분선 단골)
✅ **len()** 으로 문자열 길이
✅ **인덱싱 \`s[0]\`, \`s[-1]\`** — 한 글자씩
✅ **in / not in** — 포함 검사
✅ **==, <, >** — 같음/사전 순서 비교
✅ **str()** — 숫자를 문자열로 변환
✅ **이스케이프** — \`\\n\` 줄바꿈, \`\\t\` 탭, \`\\"\` 따옴표
✅ **삼중 따옴표** — 여러 줄 한 번에

다음 시간에는 **문자열 메서드** 를 배워서 대소문자 변환, 공백 제거, 검색/치환 등을 해볼 거예요! 🚀`
        }
      ]
    }
  ]
}
