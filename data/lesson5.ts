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
          title: "🔗 문자열도 더할 수 있어요!",
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
print(greeting)
\`\`\`

### 왜 \`+\` 일까?

숫자에서 \`2 + 3 = 5\` 처럼 "합치는" 느낌. 문자열도 똑같이 "합쳐서 하나로" — 그래서 같은 \`+\` 기호를 써요. 새로 외울 게 없죠!

### 여러 개도 OK

\`\`\`python
a = "파"
b = "이"
c = "썬"
print(a + b + c)   # 파이썬
\`\`\``
        },
        {
          id: "concat-explain-spaces",
          type: "explain",
          title: "⚠️ 공백과 숫자 — 주의할 것",
          content: `### 공백은 직접 챙겨야 해요

\`\`\`python
print("Hello" + "World")        # HelloWorld — 공백 없이 딱 붙음!
print("Hello" + " " + "World")  # Hello World
\`\`\`

\`+\` 는 **두 문자열을 글자 그대로** 이어붙여요. 공백이 필요하면 \`" "\` 를 직접 끼워넣어요.

### 어디서 자주 써요?

- **인사 만들기** — \`"안녕, " + name + "!"\`
- **파일명 조합** — \`folder + "/" + filename\`
- **HTML / 경로 조합** — 조각조각 이어붙이기

### ❌ 안 되는 것

\`\`\`python
print("나이: " + 15)   # TypeError — 문자열 + 숫자는 불가!
\`\`\`

문자열은 문자열끼리만 \`+\` 가능해요. 숫자랑 같이 쓰는 법은 이 단원 챕터 3 에서 다뤄요.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "빈칸에 변수 이름을 넣어 \"반가워, 민수!\" 가 출력되게 하세요!",
          initialCode: "name = \"민수\"\n# 빈칸에 변수 이름을 넣으세요 (값 X)\ngreeting = \"반가워, \" + ___ + \"!\"\nprint(greeting)",
          expectedOutput: "반가워, 민수!",
          hint: "위에서 만든 변수 이름이 뭐였죠? \"민수\" 라는 값을 가진 변수.",
          hint2: "name"
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

> 💡 \`len\` 은 영어 **\`length\` (길이)** 의 줄임말. 영단어 약자라 쉽게 외워져요!

\`\`\`python
text = "hello"
print(len(text))

print(len("안녕"))   # 한글 한 글자도 1개로 셈
\`\`\`

### 왜 필요해요?

"이 입력이 너무 길지 않은가?" "비밀번호 8자 이상인가?" "메시지가 비어있나?" — 글자 수를 알면 답할 수 있는 질문이 많아요.

### 자주 쓰는 곳

- **비밀번호 길이 체크** — 8 자 이상인가?
- **빈 입력 확인** — \`len(text) == 0\` 이면 비었음
- **글자 수 제한** — 트위터 280 자, SMS 90 자`
        },
        {
          id: "predict-len-hello",
          type: "predict",
          title: "💭 결과 예측 — len()",
          content: `이 코드를 실행하면 어떤 결과가 나올까요?

\`\`\`python
text = "hello"
print(len(text))
\`\`\``,
          options: ["4", "5", "6", "에러"],
          answer: 1,
          explanation: "hello 는 h-e-l-l-o 다섯 글자. len() 은 글자 수를 세요."
        },
        {
          id: "len-explain-edges",
          type: "explain",
          title: "🪤 len() — 헷갈리는 경우들",
          content: `### 엣지 케이스 — 빈 문자열

\`\`\`python
print(len(""))      # 0 — 글자가 0개
print(len(" "))     # 1 — 공백도 한 글자!
\`\`\`

빈 따옴표 \`""\` 는 진짜 비어있는 거. 공백 \`" "\` 은 보이지 않지만 1 글자예요. 헷갈리기 쉬워요.

### ❌ 숫자엔 못 써요

\`\`\`python
print(len(12345))   # TypeError — 숫자는 글자 수 개념이 없음
\`\`\`

\`len\` 은 "여러 개 모인 것" 의 개수를 세는 도구예요. 숫자 12345 는 한 개의 값일 뿐.

> 💡 \`len\` 은 문자열뿐 아니라 나중에 배울 리스트/딕셔너리/튜플 등에도 다 쓸 수 있어요. 한 번 익히면 여기저기 활용!`
        },
        {
          id: "indexing",
          type: "explain",
          title: "🔢 인덱싱 — 한 글자만 꺼내기",
          content: `문자열도 리스트처럼 \`[인덱스]\` 로 한 글자씩 접근할 수 있어요.

### 앞에서부터 — 0, 1, 2, ...

\`\`\`python
text = "Python"
#       P  y  t  h  o  n
#      [0][1][2][3][4][5]

print(text[0])    # P (첫 글자)
print(text[3])    # h
\`\`\`

> 첫 글자가 \`[1]\` 이 아니라 \`[0]\` 인 거 잊지 말기! 컴퓨터는 0부터 세요.`
        },
        {
          id: "indexing-neg",
          type: "explain",
          title: "🔄 뒤에서부터 — 음수 인덱스",
          content: `마지막 글자가 자주 필요해요. 근데 \`text[5]\` 처럼 길이를 알아야 쓰기 귀찮죠?

**음수 인덱스** 를 쓰면 **뒤에서부터** 셀 수 있어요!

\`\`\`python
text = "Python"
#        P  y  t  h  o  n
#      [-6][-5][-4][-3][-2][-1]   ← 뒤에서부터

print(text[-1])   # n (마지막)
print(text[-2])   # o (뒤에서 두 번째)
\`\`\`

\`text[-1]\` 은 **항상 마지막 글자** — 문자열 길이를 몰라도 됨! 매우 자주 쓰여요.

### 첫 글자 / 끝 글자 빠른 추출

\`\`\`python
name = "Alice"
initial = name[0]      # 'A'
last = name[-1]        # 'e'
print(name, "의 이니셜:", initial)
\`\`\`

### ⚠️ 인덱스가 범위 밖이면 에러!

\`\`\`python
text = "hi"
print(text[5])   # IndexError
\`\`\`

안전한 범위: \`0 ~ len(text)-1\` (앞에서), \`-len(text) ~ -1\` (뒤에서).`
        },
        {
          id: "indexing-visualizer",
          type: "interactive",
          title: "🎬 직접 인덱스 눌러보기",
          component: "pyStringIndexVisualizer",
          componentProps: { initialText: "Python" },
        },
        {
          id: "predict-neg-index",
          type: "predict",
          title: "💭 어떤 글자가 나올까?",
          content: `이 코드를 실행하면 어떤 결과가 나올까요?

\`\`\`python
word = "MONKEY"
print(word[-2])
\`\`\``,
          options: ["M", "K", "E", "Y"],
          answer: 2,
          explanation: "MONKEY 의 마지막 글자는 Y (인덱스 -1). 그 앞은 E (인덱스 -2). 그래서 word[-2] = E.\n\nM(0/-6) O(1/-5) N(2/-4) K(3/-3) E(4/-2) Y(5/-1) — 앞 인덱스와 뒤 인덱스가 같은 글자를 가리켜요."
        },
        {
          id: "try-len-index",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 길이와 인덱스",
          task: "이름의 첫 글자, 마지막 글자, 길이를 출력하세요!",
          initialCode: "name = \"Python\"\n\n# 첫 글자\nfirst = name[___]\n# 마지막 글자 (음수 인덱스)\nlast = name[___]\n# 길이\nlength = ___(name)\n\nprint(\"첫:\", first)\nprint(\"끝:\", last)\nprint(\"길이:\", length)",
          expectedOutput: "첫: P\n끝: n\n길이: 6",
          hint: "첫 글자는 0번. 마지막 글자는 음수 인덱스로 한 번에. 길이 구하는 내장함수도 기억나죠?",
          hint2: "0 / -1 / len"
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
          content: `문자열에 숫자를 곱하면 **같은 문자열이 그 횟수만큼 반복**돼요!

\`"하" * 3\` 은 \`"하" + "하" + "하"\` 와 똑같아요 — 그냥 **더 짧게 쓰는 방법**.

\`\`\`python
print("하" * 3)       # 하하하
print("=" * 5)        # =====
print("안녕! " * 2)   # 안녕! 안녕!
\`\`\`

> 💡 \`5 * "="\` 처럼 **순서 바꿔도** 똑같이 동작해요!

### 자주 쓰는 곳

- **구분선 / 테두리** — \`"=" * 50\`
- **들여쓰기 / 공백** — \`" " * 4\`
- **점수 시각화** — \`"⭐" * 5\``
        },
        {
          id: "multiply-explain-uses",
          type: "explain",
          title: "🎨 활용 + 함정",
          content: `### 활용 예시 — 메뉴판 테두리

\`\`\`python
print("=" * 8)
print(" 메뉴판 ")
print("=" * 8)
\`\`\`

결과:
\`\`\`
========
 메뉴판
========
\`\`\`

### ⚠️ 0 또는 음수를 곱하면?

\`\`\`python
print("하" * 0)    # (빈 문자열 — 아무것도 안 나옴)
print("하" * -3)   # (역시 빈 문자열, 에러 안 남)
\`\`\`

신기하죠? 직접 해보면 확인 가능.

### ❌ 안 되는 것

\`\`\`python
print("3" * "하")    # TypeError — 문자열 × 문자열은 불가
print("하" * 2.5)    # TypeError — 소수는 불가, 정수만!
\`\`\``
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "별(*)을 5개 출력하세요! (빈칸엔 반복 횟수 = 숫자)",
          initialCode: "# 빈칸에 반복할 횟수 (숫자) 를 넣으세요\nprint(\"*\" * ___)",
          expectedOutput: "*****",
          hint: "별이 몇 개 나와야 하나요? 그 숫자를 빈칸에.",
          hint2: "5"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 구분선 만들기!",
          task: "=를 8개 출력해서 구분선을 만드세요! (빈칸엔 숫자)",
          initialCode: "# 빈칸에 반복 횟수 (숫자)\nprint(\"=\" * ___)",
          expectedOutput: "========",
          hint: "= 가 몇 개 필요한가요? 그 숫자.",
          hint2: "8"
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
          content: `\`in\` 으로 문자열 안에 특정 글자/단어가 있는지 확인해요. 결과는 \`True\` 또는 \`False\`.

\`\`\`python
text = "I love Python"

print("Python" in text)
print("Java" in text)
print("love" in text)
print("LOVE" in text)
\`\`\`

각 줄이 무엇을 출력할까요? 직접 돌려보고 어떤 게 \`True\` 인지 확인해보세요. (힌트: 대소문자 구분이 있어요!)

### 왜 필요해요?

"이 메시지에 욕설이 들어있나?" "검색어가 제목에 있나?" "이메일에 @ 가 들어있나?" — 우리가 매일 하는 질문이에요. 그걸 코드로 옮긴 게 \`in\`.

### 자주 쓰는 곳

- **검색** — \`"파이썬" in title\` (제목에 검색어 있나?)
- **필터** — \`"@" in email\` (이메일 형식인가?)
- **확장자 확인** — \`".jpg" in filename\``
        },
        {
          id: "predict-in-case",
          type: "predict",
          title: "💭 결과 예측 — 대소문자 in",
          content: `이 코드 결과는?

\`\`\`python
text = "I love Python"
print("LOVE" in text)
\`\`\``,
          options: ["True", "False", "에러", "love"],
          answer: 1,
          explanation: "\`in\` 은 대소문자를 구분해요. text 안에는 소문자 \`love\` 만 있고 \`LOVE\` 는 없어요 → False.\n\n대소문자 무시 검사는 lesson 6 에서 \`.lower()\` 같은 메서드로 배워요."
        },
        {
          id: "in-explain-detail",
          type: "explain",
          title: "🔧 in — not in / 대소문자 주의",
          content: `### 활용 — 댓글 검사

\`\`\`python
comment = "이거 좀 멍청한 댓글이네"
print("멍청 포함?:", "멍청" in comment)
print("바보 포함?:", "바보" in comment)
\`\`\`

> 💡 \`print(..., ...)\` 는 콤마로 여러 개를 한 줄에 출력해요. \`True/False\` 같은 결과를 글자 사이에 끼워 넣을 때 편해요. 문자열에 \`+\` 로 \`True\` 를 바로 붙이면 에러나거든요!

### not in — 반대

\`\`\`python
print("foo" not in "hello")   # True (포함 안 됨)
print("h" not in "hello")     # False (h 가 있으므로)
\`\`\`

### ⚠️ 대소문자 구분

\`"LOVE" in "I love Python"\` 은 \`False\`. \`love\` 와 \`LOVE\` 는 다른 글자예요. 대소문자 무시 검사는 lesson 6 메서드에서 다뤄요.`
        },
        {
          id: "compare-explain",
          type: "explain",
          title: "📊 문자열 비교 — ==",
          content: `문자열도 \`==\` 으로 같은지 비교할 수 있어요. 숫자에서 배운 비교 연산자가 문자열에도 그대로 통해요.

\`\`\`python
a = "hello"
b = "hello"
c = "Hello"

print(a == b)
print(a == c)
print(a != c)
\`\`\`

각 줄의 결과는? \`a\` 와 \`c\` 의 차이를 잘 보면 답이 보여요.

### 왜 필요해요?

"비밀번호가 맞나?" "사용자가 'yes' 라고 답했나?" "이름이 일치하나?" — 두 문자열이 같은지 확인하는 건 어디서나 필요해요. \`==\` 가 그 일을 해줘요.

### 자주 쓰는 곳

- **로그인 검사** — \`input_pw == saved_pw\`
- **답 확인** — \`answer == "y"\`
- **상태 비교** — \`status == "OK"\`
- **명령어 매칭** — \`cmd == "quit"\``
        },
        {
          id: "predict-compare-case",
          type: "predict",
          title: "💭 결과 예측 — == 대소문자",
          content: `이 코드 결과는?

\`\`\`python
a = "hello"
c = "Hello"
print(a == c)
\`\`\``,
          options: ["True", "False", "에러", "hello"],
          answer: 1,
          explanation: "\`==\` 는 글자가 **완전히 같아야** True. \`a\` (소문자 h) 와 \`c\` (대문자 H) 는 다른 글자라 False.\n\n대소문자 무시하고 비교하려면 lesson 6 에서 배울 \`.lower()\` 가 필요해요."
        },
        {
          id: "compare-explain-order",
          type: "explain",
          title: "🔤 사전 순서 — <, >",
          content: `\`<\` 와 \`>\` 도 문자열에 통해요. **사전에서 앞에 있는 단어** 가 더 작다고 봐요.

\`\`\`python
print("apple" < "banana")   # True — a 가 b 보다 사전에서 앞
print("apple" < "Apple")    # False — 대문자가 소문자보다 작음
print("kiwi" < "apple")     # False — k 가 a 보다 뒤
\`\`\`

**왜 그래요?** 컴퓨터는 글자마다 숫자 코드 (ASCII) 를 매겨두고, 그 숫자로 비교해요. 대문자 \`A\` (65) < 소문자 \`a\` (97). 그래서 \`"Apple" < "apple"\` 이 \`True\`.

사전 순서 = 첫 글자부터 한 글자씩 비교. 첫 글자가 같으면 다음 글자로 넘어가요. 사전 찾는 방법과 똑같아요.

### 활용 — 답 검사

\`\`\`python
answer = "y"
print("y 인가?:", answer == "y")
print("n 인가?:", answer == "n")
\`\`\`

> 💡 \`print(..., ...)\` 콤마 출력 — \`True/False\` 같은 결과를 글자 사이에 끼워 넣기에 딱이에요. \`+\` 로는 문자열+불린이 안 되거든요!`
        },
        {
          id: "compare-explain-trap",
          type: "explain",
          title: "🪤 숫자처럼 보이지만 문자열이면…",
          content: `### ❌ 헷갈리기 쉬운 것

\`\`\`python
print("10" < "9")    # True (?!) — 첫 글자 '1' < '9' 라서
\`\`\`

문자열은 **글자 단위 비교**. \`"10"\` 의 첫 글자는 \`'1'\`, \`"9"\` 는 \`'9'\` — 사전상 \`'1'\` 이 \`'9'\` 보다 앞이라 결과는 \`True\`.

숫자처럼 비교하고 싶다면 lesson 9 에서 배울 **타입 변환** 이 필요해요. \`int("10") < int("9")\` 처럼.`
        },
        {
          id: "try-in-compare",
          type: "tryit",
          title: "🖥️ 직접 해보기 — in 과 == 검사",
          task: "빈칸 1: '좋아' 와 comment 사이에 들어갈 키워드. 빈칸 2: status 와 비교할 문자열 (따옴표 포함).",
          initialCode: "comment = \"이거 좋아요!\"\nstatus = \"OK\"\n\n# 빈칸: 포함 여부 검사 키워드\nhas_good = \"좋아\" ___ comment\n\n# 빈칸: 비교할 문자열 (따옴표 포함)\nis_ok = status == ___\n\nprint(\"좋아 있음:\", has_good)\nprint(\"OK:\", is_ok)",
          expectedOutput: "좋아 있음: True\nOK: True",
          hint: "첫 빈칸: 포함 검사 키워드 (영어 2글자). 둘째 빈칸: \"OK\" 문자열 통째.",
          hint2: "in / \"OK\""
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
          content: `문자열과 숫자는 \`+\` 로 바로 더할 수 없어요.

\`\`\`python
age = 15
print("나이: " + age)   # ❌ TypeError
\`\`\`

### 왜 안 돼요?

\`+\` 는 같은 종류끼리만 동작해요:
- **숫자 + 숫자** → 더하기 (\`2 + 3 = 5\`)
- **문자열 + 문자열** → 이어붙이기 (\`"a" + "b" = "ab"\`)
- **문자열 + 숫자** → ❓ 더해야 해? 붙여야 해?

파이썬은 헷갈리는 걸 싫어해요. "둘 중 뭘 원하는지 모르겠으니까 네가 정해줘" 라고 에러를 내요. 다른 언어는 자동으로 합치기도 하지만, 파이썬은 **명확함** 을 더 중요하게 봐요.`
        },
        {
          id: "error-explain-solution",
          type: "explain",
          title: "✅ 해결 — print() 콤마",
          content: `\`print()\` 안에서 콤마 \`,\` 로 나누면 종류가 달라도 한 줄에 출력할 수 있어요. \`print\` 가 알아서 각각을 글자로 바꿔서 보여줘요.

\`\`\`python
age = 15
print("나이:", age)
\`\`\`

결과: \`나이: 15\`

> 💡 콤마는 자동으로 공백을 한 칸 넣어줘요. \`"나이:"\` 와 \`15\` 사이에 한 칸이 생기는 게 그래서!

### 여러 개도 OK

\`\`\`python
name = "민수"
score = 95
print(name, "의 점수는", score, "점")
# 민수 의 점수는 95 점
\`\`\`

### 💡 더 우아한 방법은 곧 배워요

\`+\` 로 직접 합치고 싶다면 숫자를 문자열로 **변환** 해야 해요. 그 변환 도구는 **lesson 9 (타입 변환)** 에서.

더 깔끔하게 끼워 넣는 \`f-string\` 은 **lesson 8** 에서 배울 거예요. 지금은 콤마만으로 충분!`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "빈칸에 변수 이름을 넣어 \"점수: 100\" 을 출력하세요! (값 100 X)",
          initialCode: "score = 100\n# 빈칸엔 변수 이름 (값 100 직접 X)\nprint(\"점수:\", ___)",
          expectedOutput: "점수: 100",
          hint: "100 이라는 값을 가진 변수의 이름이 뭐였죠?",
          hint2: "score"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 미션!",
          task: "두 빈칸에 변수 이름을 넣어 \"이름: 철수 나이: 15\" 가 출력되게 하세요! (값 X)",
          initialCode: "name = \"철수\"\nage = 15\n# 빈칸 둘 다 변수 이름 (값 \"철수\", 15 직접 X)\nprint(\"이름:\", ___, \"나이:\", ___)",
          expectedOutput: "이름: 철수 나이: 15",
          hint: "첫 빈칸엔 \"철수\" 가진 변수, 둘째 빈칸엔 15 가진 변수.",
          hint2: "name / age"
        },
        {
          id: "escape-explain",
          type: "explain",
          title: "🔧 이스케이프 — 백슬래시의 신호",
          content: `따옴표 안에 따옴표를 넣거나 줄바꿈을 글자로 표현하고 싶을 때 — 그냥 쓰면 안 돼요.

### 문제 — 따옴표가 헷갈려요

\`\`\`python
text = "He said "hi""   # ❌ SyntaxError
\`\`\`

파이썬은 \`"He said "\` 까지를 문자열로 보고, \`hi\` 를 뭔지 모르겠다고 헷갈려해요. **어디까지가 문자열인지** 알 수 없는 거죠.

### 해결 — 백슬래시 \`\\\\\` 로 "이건 글자야" 표시

백슬래시는 "다음 한 글자는 특별하게 다뤄줘" 라는 신호예요.

\`\`\`python
text = "He said \\"hi\\""
print(text)   # He said "hi"
\`\`\`

\`\\"\` 는 "이건 문자열을 끝내는 따옴표가 아니라, 그냥 큰따옴표 글자야" 라는 뜻.`
        },
        {
          id: "escape-explain-table",
          type: "explain",
          title: "📋 자주 쓰는 이스케이프",
          content: `| 표기 | 의미 | 결과 |
|---|---|---|
| \`\\n\` | 줄바꿈 (new line) | 다음 줄로 |
| \`\\t\` | 탭 (tab) | 공백 여러 칸 |
| \`\\"\` | 큰따옴표 글자 | \`"\` |
| \`\\'\` | 작은따옴표 글자 | \`'\` |
| \`\\\\\` | 백슬래시 자체 | \`\\\` |

### 어디서 자주 써요?

- **줄바꿈** \`\\n\` — 출력을 여러 줄로 (제일 자주!)
- **탭** \`\\t\` — 표/리스트 들여쓰기
- **파일 경로** — 윈도우 경로의 \`\\\` 표시
- **인용문** — 따옴표 안에 따옴표

> 💡 외울 건 \`\\n\` 과 \`\\t\` 정도. 나머지는 따옴표 종류로 해결 가능!`
        },
        {
          id: "escape-explain-tricks",
          type: "explain",
          title: "💡 더 깔끔한 방법 — 따옴표 바꾸기 / 삼중 따옴표",
          content: `### 따옴표 종류 바꾸기

큰따옴표 안에 큰따옴표가 필요하면? 그냥 **바깥쪽을 작은따옴표로** 바꿔요!

\`\`\`python
print("It's fine")          # 큰따옴표 바깥 → 작은따옴표 그대로 OK
print('She said "hello"')   # 작은따옴표 바깥 → 큰따옴표 그대로 OK
\`\`\`

이스케이프 없이도 해결되니까 코드가 읽기 쉬워요.

### 여러 줄 — 삼중 따옴표

\`\\n\` 이 여러 번 들어가면 지저분해져요. 그럴 땐 \`"""\` 세 개로 감싸기:

\`\`\`python
text = """첫 줄
둘째 줄
셋째 줄"""
print(text)
\`\`\`

엔터키 그대로 들어가요. 시 / 메뉴판 / 긴 메시지에 딱.

### ❌ 헷갈리지 마세요

\`\`\`python
print("a\\nb")    # 두 줄로 출력
print("a\\\\nb")   # 글자 그대로: a\\nb (백슬래시 자체를 표현)
\`\`\`

\`\\\\\` 두 개를 써야 백슬래시 한 글자가 나와요.`
        },
        {
          id: "try-escape",
          type: "tryit",
          title: "🖥️ 직접 해보기 — 이스케이프와 줄바꿈",
          task: "코드를 그대로 실행해 \\n 과 \\t 가 실제로 어떻게 보이는지 확인하세요!",
          initialCode: "# 빈칸 없음 — 그대로 실행 버튼 누르기\nprint(\"제목\\n\\t항목 1\\n\\t항목 2\")",
          expectedOutput: "제목\n\t항목 1\n\t항목 2",
          hint: "그대로 실행 — \\n 은 줄바꿈, \\t 는 탭 으로 바뀝니다.",
          hint2: ""
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

**더하기 (+)** — 이어붙이기
\`\`\`python
"Hello" + "World"   # HelloWorld
\`\`\`

**곱하기 (*)** — 반복
\`\`\`python
"Ha" * 3   # HaHaHa
\`\`\`

**길이 / 인덱싱** — len() 과 [ ]
\`\`\`python
len("Python")    # 6
"Python"[0]      # 'P'
"Python"[-1]     # 'n'
\`\`\`

**포함 / 비교** — in, ==
\`\`\`python
"py" in "Python"     # False (대소문자 구분)
"hi" == "hi"          # True
\`\`\`

**숫자와 같이 출력** — \`print()\` 콤마 사용 (이 단원에서 배운 방법)
\`\`\`python
score = 100
print("점수:", score)   # 점수: 100
\`\`\`

> 💡 \`+\` 로 문자열에 숫자를 붙이려면 변환이 필요해요 — **lesson 9 (타입 변환)** 에서 \`str()\` 같은 도구를 배워요. 더 깔끔한 \`f-string\` 은 **lesson 8** 에서!`
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 1 — 예쁜 메뉴판",
          task: "빈칸 4개 채우기: 위 2개는 구분선 반복 횟수 (=8개), 아래 2개는 가격 숫자 (18000, 19000).",
          initialCode: "# 빈칸 1,2: = 반복 횟수 (숫자)\nprint(\"=\" * ___)\nprint(\"  🍗 치킨집  \")\nprint(\"=\" * ___)\n# 빈칸 3,4: 가격 (숫자)\nprint(\"후라이드:\", ___)\nprint(\"양념:\", ___)",
          expectedOutput: "========\n  🍗 치킨집  \n========\n후라이드: 18000\n양념: 19000",
          hint: "구분선은 = 가 8개. 후라이드 18000원, 양념 19000원.",
          hint2: "8 / 8 / 18000 / 19000"
        },
        {
          id: "mission3",
          type: "mission",
          title: "🏆 미션 2 — 비밀번호 정보 카드",
          task: "비밀번호와 그 길이를 두 줄로 출력하세요!\n출력 예:\n비밀번호: abc12\n길이: 5",
          initialCode: "pwd = \"abc12\"\n\n# 1 줄: 비밀번호 그대로 출력 (문자열끼리는 + OK)\nprint(\"비밀번호: \" + ___)\n\n# 2 줄: 길이는 숫자 → print() 콤마로 출력\nprint(\"길이:\", ___(pwd))",
          expectedOutput: "비밀번호: abc12\n길이: 5",
          hint: "1 줄 빈칸: pwd. 2 줄 빈칸: 길이 구하는 내장함수!",
          hint2: "pwd / len"
        },
        {
          id: "mission4",
          type: "mission",
          title: "🏆 미션 3 — 이름 이니셜 카드",
          task: "두 빈칸 모두 인덱스 번호 (숫자) — 첫 글자를 가리키는 번호를 넣으세요!",
          initialCode: "first = \"Alice\"\nlast = \"Choi\"\n\n# 빈칸: 첫 글자를 가리키는 인덱스 (숫자)\ninitials = (first[___] + last[___]).upper()\n\nprint(\"=\" * 8)\nprint(\"  \" + initials)\nprint(first + \" \" + last)\nprint(\"=\" * 8)",
          expectedOutput: "========\n  AC\nAlice Choi\n========",
          hint: "첫 글자의 인덱스는? (0부터 셈)",
          hint2: "0 / 0"
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
✅ **숫자와 함께 출력** — \`print()\` 콤마로 (\`+\` 대신)
✅ **이스케이프** — \`\\n\` 줄바꿈, \`\\t\` 탭, \`\\"\` 따옴표
✅ **삼중 따옴표** — 여러 줄 한 번에

다음 시간에는 **문자열 메서드** 를 배워서 대소문자 변환, 공백 제거, 검색/치환 등을 해볼 거예요! 🚀`
        }
      ]
    }
  ]
}
