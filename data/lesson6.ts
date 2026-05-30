// ============================================
// 레슨 6: 문자열 메서드
// ============================================
import { LessonData } from './types'

export const lesson6Data: LessonData = {
  id: "6",
  title: "문자열 메서드",
  emoji: "🔧",
  description: "문자열을 다루는 다양한 방법을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "대소문자 변환",
      emoji: "🔤",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🔧 메서드란?",
          content: `**메서드 = 문자열한테 "붙어 다니는" 기능** 이에요. 문자열 뒤에 점 \`.\` 을 찍고 이름을 적으면 그 문자열이 자기 일을 해줘요.

\`\`\`python
text = "hello"
print(text.upper())  # HELLO
\`\`\`

위 코드의 의미: "text 야, 너 자신을 대문자로 만들어줘 (upper)" 라고 시키는 거예요.

### 모양 외우기

\`\`\`
문자열 . 메서드이름 ( )
   ↑       ↑       ↑
  누가    무엇을   괄호는 꼭!
\`\`\`

- **점 \`.\`** — "이 문자열한테 시킨다" 라는 신호
- **이름** — \`upper\`, \`lower\`, \`strip\` 등 메서드 이름
- **괄호 \`()\`** — 빼먹으면 메서드가 실행 안 돼요. 꼭!`
        },
        {
          id: "intro-vs-function",
          type: "explain",
          title: "🆚 함수랑 뭐가 달라?",
          content: `점 찍고 부르는 게 메서드, 괄호 안에 넣는 게 함수.

- \`len(text)\` — **함수**. 괄호 안에 문자열을 넣어요.
- \`text.upper()\` — **메서드**. 문자열 뒤에 붙여요.

> 💡 메서드는 "그 문자열한테만" 시킬 수 있는 일. 함수는 "바깥에서 데이터를 받는" 일.

### ❌ 자주 하는 실수

\`\`\`python
text.upper      # ❌ 괄호 없음 — 실행 안 됨!
text.Upper()    # ❌ 대문자 U — 파이썬은 이름 정확해야!
text.uper()     # ❌ 오타 — AttributeError
\`\`\``
        },
        {
          id: "upper-lower",
          type: "explain",
          title: "🔤 upper() 와 lower()",
          content: `대소문자를 한번에 바꾸는 두 메서드.

- **upper()** — 모든 글자를 **대문자** 로
- **lower()** — 모든 글자를 **소문자** 로

\`\`\`python
text = "Hello World"

print(text.upper())  # HELLO WORLD
print(text.lower())  # hello world
\`\`\`

### 왜 필요해?

- **검색** 할 때 — 사용자가 "PYTHON" 을 검색해도 "python" 글에서 찾아야 해요. 둘 다 소문자로 맞춰서 비교.
- **아이디 / 이메일** — 보통 소문자로 통일해서 저장.
- **강조 표시** — 중요한 단어를 대문자로 변환.

### 한글에는 어떻게?

\`\`\`python
print("안녕".upper())   # 안녕 (한글은 대소문자가 없음)
\`\`\`

한글, 숫자, 기호 같은 건 그대로. 영문 글자만 바뀌어요.`
        },
        {
          id: "predict-upper-result",
          type: "predict",
          title: "💭 결과 예측 — upper()",
          content: `이 코드 결과는?

\`\`\`python
name = "Hello"
print(name.upper())
\`\`\``,
          options: ["Hello", "HELLO", "hello", "에러"],
          answer: 1,
          explanation: "upper() 는 모든 글자를 대문자로 바꿔요. H→H, e→E, l→L, l→L, o→O → HELLO."
        },
        {
          id: "upper-lower-immutable",
          type: "explain",
          title: "⚠️ 원본은 안 바뀌어요",
          content: `메서드를 부르면 **새 문자열** 이 나와요. 원본은 그대로!

\`\`\`python
text = "Hello"
text.upper()         # 결과는 HELLO 지만 어디로?
print(text)          # Hello (그대로!)
\`\`\`

upper() 가 새 문자열을 돌려주는데, 우리가 그걸 어디에도 안 받았어요. 그래서 그냥 사라짐.

**받아두려면 변수에 저장:**

\`\`\`python
text = "Hello"
big = text.upper()   # 새 문자열을 big 에 저장
print(text)          # Hello
print(big)           # HELLO
\`\`\`

> 💡 문자열은 한번 만들면 못 바꿔요 (**불변**). 메서드는 항상 **새 문자열을 돌려줘요.**`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "문자열을 대문자로 변환하세요!",
          initialCode: "text = \"python\"\n# 대문자로 변환하는 메서드를 사용하세요\nprint(text.___())",
          expectedOutput: "PYTHON",
          hint: ".upper() 메서드 사용!",
          hint2: "text.upper()"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 소문자로 변환!",
          task: "문자열을 소문자로 변환하세요!",
          initialCode: "text = \"HELLO\"\nprint(text.___())",
          expectedOutput: "hello",
          hint: ".lower() 메서드 사용!",
          hint2: "text.lower()"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "\"PyThOn\".lower()의 결과는?",
          options: ["PYTHON", "python", "PyThOn", "에러"],
          answer: 1,
          explanation: "lower()는 모든 글자를 소문자로 바꿔요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "공백 제거와 치환",
      emoji: "✂️",
      steps: [
        {
          id: "strip-explain",
          type: "explain",
          title: "✂️ strip() - 공백 제거",
          content: `**strip()** — 문자열 **양쪽 끝** 의 공백을 잘라내요. 가운데 공백은 그대로!

\`\`\`python
text = "   안녕하세요   "
print(text.strip())  # "안녕하세요"
\`\`\`

### 왜 필요해?

사람이 적은 입력에는 실수로 공백이 끼는 경우가 많아요.

- 검색창에 \`" 파이썬 "\` 입력 → 공백 빼고 비교해야 매칭됨
- 아이디 \`"  julia  "\` 와 \`"julia"\` 는 같은 사람!
- 줄 끝에 보이지 않는 줄바꿈 \`\\n\` 이 붙어있을 때도 strip 으로 정리

### 가운데 공백은 안 잘려요

\`\`\`python
text = "   안녕 친구   "
print(text.strip())  # "안녕 친구"  (가운데 공백은 그대로!)
\`\`\``
        },
        {
          id: "predict-strip-middle",
          type: "predict",
          title: "💭 결과 예측 — strip() 가운데 공백은?",
          content: `이 코드 결과는?

\`\`\`python
text = "   안녕 친구   "
print(text.strip())
\`\`\`

힌트: strip() 은 **양쪽 끝** 만 잘라요.`,
          options: ["안녕친구", "안녕 친구", "   안녕 친구   ", "안녕"],
          answer: 1,
          explanation: "양쪽 끝 공백만 잘려요. 가운데 공백은 그대로! → \"안녕 친구\""
        },
        {
          id: "strip-variants",
          type: "explain",
          title: "↔️ lstrip / rstrip + 보이지 않는 글자",
          content: `### 한쪽만 자르고 싶을 때

- **lstrip()** — left, 왼쪽만
- **rstrip()** — right, 오른쪽만

\`\`\`python
text = "   Hello   "
print(text.lstrip())  # "Hello   "
print(text.rstrip())  # "   Hello"
\`\`\`

### 공백 말고도 잘라줘요

strip() 은 **공백, 탭 \\t, 줄바꿈 \\n** 같은 "보이지 않는 글자" 도 다 잘라요.

\`\`\`python
text = "\\n\\t  안녕  \\n"
print(text.strip())  # "안녕"
\`\`\`

> 💡 원본은 그대로. 항상 새 문자열이 돌아와요.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "앞뒤 공백을 제거하세요!",
          initialCode: "text = \"   파이썬   \"\n# 공백을 제거하는 메서드를 사용하세요\nprint(text.___())",
          expectedOutput: "파이썬",
          hint: ".strip() 메서드 사용!",
          hint2: "text.strip()"
        },
        {
          id: "replace-explain",
          type: "explain",
          title: "🔄 replace() - 글자 / 단어 바꾸기",
          content: `**replace(찾을것, 바꿀것)** — 문자열 안에서 일치하는 부분을 다른 글자로 바꿔줘요. **"찾기 및 바꾸기"** 라고 생각하면 돼요.

\`\`\`python
text = "Hello World"
print(text.replace("World", "Python"))
# Hello Python
\`\`\`

### 일치하는 거 **모두** 바꿔요

\`\`\`python
text = "바나나 바나나 바나나"
print(text.replace("바나나", "사과"))
# 사과 사과 사과
\`\`\`

하나만 보고 멈추는 게 아니라 **다 찾아서 다 바꿔요.**

### 지우개로도 써요

바꿀 것에 \`""\` (빈 문자열) 을 주면 **삭제** 효과!

\`\`\`python
text = "안 녕 하 세 요"
print(text.replace(" ", ""))  # 안녕하세요  (공백 다 지움)
\`\`\``
        },
        {
          id: "predict-replace-all",
          type: "predict",
          title: "💭 결과 예측 — replace() 몇 군데 바뀔까?",
          content: `이 코드 결과는?

\`\`\`python
text = "바나나 바나나 바나나"
print(text.replace("바나나", "사과"))
\`\`\`

힌트: 일치하는 거 **하나만** 바꿀까, **다** 바꿀까?`,
          options: ["사과 바나나 바나나", "바나나 바나나 사과", "사과 사과 사과", "바나나 바나나 바나나"],
          answer: 2,
          explanation: "replace() 는 첫 매칭에서 멈추지 않고 **다 찾아서 다 바꿔요.** 세 개 모두 \"사과\" 로 변환."
        },
        {
          id: "replace-chain",
          type: "explain",
          title: "⛓️ replace 체이닝 & 대소문자",
          content: `### 연속해서 여러 번 (chain)

메서드 결과가 또 문자열이니까 뒤에 점 찍고 또 메서드 부를 수 있어요.

\`\`\`python
text = "고양이와 소"
print(text.replace("고양이", "강아지").replace("소", "토끼"))
# 강아지와 토끼
\`\`\`

> 💡 메서드를 점으로 줄줄이 잇는 걸 **체이닝 (chaining)** 이라고 해요. 자주 써요!

### ⚠️ 대소문자 구별해요

\`\`\`python
print("Hello".replace("hello", "안녕"))  # Hello  (안 바뀜!)
\`\`\`

\`"Hello"\` 와 \`"hello"\` 는 다른 문자열. 정확히 일치해야 바꿔져요.`
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "'사과'를 '포도'로 바꾸세요!",
          initialCode: "text = \"사과가 맛있다\"\nprint(text.replace(___, ___))",
          expectedOutput: "포도가 맛있다",
          hint: ".replace(\"사과\", \"포도\")",
          hint2: "text.replace(\"사과\", \"포도\")"
        },
        {
          id: "try-replace-scratch",
          type: "tryit",
          title: "✋ 손으로 직접 — replace 처음부터",
          task: "'안녕'을 '반가워'로 바꿔서 출력해봐. print 한 줄을 직접 써보자!",
          initialCode: "text = \"안녕 친구! 안녕 모두!\"\n# 여기에 print 한 줄을 직접 써봐\n",
          expectedOutput: "반가워 친구! 반가워 모두!",
          hint: "print( ... ) 안에 text.replace(\"안녕\", \"반가워\") 모양으로 넣으면 돼요",
          hint2: "print(text.replace(\"안녕\", \"반가워\"))"
        },
        {
          id: "try-replace-chain",
          type: "tryit",
          title: "✋ 두 개 한꺼번에 바꾸기",
          task: "replace 를 두 번 연결해서 '고양이'→'강아지', '소'→'토끼'로 바꿔봐.",
          initialCode: "text = \"고양이와 소\"\n# replace 를 .replace(...).replace(...) 처럼 이어붙일 수 있어\n",
          expectedOutput: "강아지와 토끼",
          hint: "한 줄에 replace 를 두 번 연결: text.replace(...).replace(...)",
          hint2: "print(text.replace(\"고양이\", \"강아지\").replace(\"소\", \"토끼\"))"
        }
      ]
    },
    {
      id: "ch3",
      title: "검색과 길이",
      emoji: "🔍",
      steps: [
        {
          id: "find-explain",
          type: "explain",
          title: "🔍 find() — \"어디에 있어?\"",
          content: `찾는 글자/단어가 **몇 번째 자리** 에 있는지 알려줘요. 자리는 **0부터** 세요 (lesson 5 인덱스랑 같음).

\`\`\`python
text = "Hello World"
print(text.find("World"))   # 6
print(text.find("H"))       # 0  (맨 앞)
print(text.find("o"))       # 4  (제일 먼저 나오는 o)
\`\`\`

\`"Hello World"\` 자리 표:
\`\`\`
H e l l o   W o r l d
0 1 2 3 4 5 6 7 8 9 10
\`\`\`

\`"World"\` 는 6번 자리에서 시작 → 6.

### 없으면 -1

\`\`\`python
text = "Hello"
print(text.find("Python"))  # -1
\`\`\`

\`-1\` 은 "못 찾았다" 라는 약속된 신호. (조건문 배우면 "있나 없나" 검사에 쓸 거예요.)`
        },
        {
          id: "predict-find-position",
          type: "predict",
          title: "💭 결과 예측 — find() 몇 번 자리?",
          content: `이 코드 결과는?

\`\`\`python
text = "Python is fun"
print(text.find("is"))
\`\`\`

자리 표:
\`\`\`
P y t h o n   i s   f u n
0 1 2 3 4 5 6 7 8 9 ...
\`\`\``,
          options: ["6", "7", "8", "-1"],
          answer: 1,
          explanation: "\"is\" 는 7번 자리에서 시작 (i=7, s=8). find() 는 시작 위치를 돌려줘요 → 7."
        },
        {
          id: "find-count",
          type: "explain",
          title: "🔢 count() — \"몇 번 나와?\"",
          content: `찾는 글자/단어가 **몇 번** 나오는지 세줘요.

\`\`\`python
text = "banana"
print(text.count("a"))   # 3
print(text.count("an"))  # 2  (단어도 셀 수 있음!)
print(text.count("z"))   # 0
\`\`\`

### 자주 헷갈리는 것

- \`find\` → **자리 번호** (0, 1, 2, ...)
- \`count\` → **개수** (0, 1, 2, ...)

값은 둘 다 숫자라 비슷해 보여도 의미가 달라요!

### 대소문자 구별 — replace 와 똑같음

\`\`\`python
print("Hello".find("h"))   # -1  (소문자 h 는 없음)
print("Hello".find("H"))   # 0
\`\`\``
        },
        {
          id: "predict-count-banana",
          type: "predict",
          title: "💭 결과 예측 — count() 몇 개?",
          content: `이 코드 결과는?

\`\`\`python
text = "banana"
print(text.count("an"))
\`\`\`

힌트: \`b-a-n-a-n-a\` — \"an\" 이 어디 어디 들어있는지 손으로 찾아보세요.`,
          options: ["1", "2", "3", "0"],
          answer: 1,
          explanation: "banana 안에 \"an\" 은 b**an**ana 한 번, ban**an**a 한 번 → 총 2개."
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "'a'가 몇 개인지 세보세요!",
          initialCode: "text = \"abracadabra\"\nprint(text.___(\"a\"))",
          expectedOutput: "5",
          hint: ".count(\"a\") 메서드 사용!",
          hint2: "text.count(\"a\")"
        },
        {
          id: "try-count-scratch",
          type: "tryit",
          title: "✋ 손으로 직접 — count 처음부터",
          task: "문장에서 '는' 글자가 몇 번 나오는지 세서 출력해봐. print 한 줄을 직접 써보자!",
          initialCode: "text = \"나는 코딩을 배우는 중이고 나는 멋지다\"\n# 여기에 print 한 줄을 직접 써봐\n",
          expectedOutput: "3",
          hint: "print( text.count(\"는\") ) 모양으로 써요",
          hint2: "print(text.count(\"는\"))"
        },
        {
          id: "try-count-word",
          type: "tryit",
          title: "✋ 단어도 셀 수 있어",
          task: "한 글자 말고 '바나나' 같은 단어도 count 로 세지요. 'banana' 가 몇 번 나오는지 세서 출력해봐.",
          initialCode: "text = \"banana smoothie with banana chips and banana bread\"\n# print 한 줄로 'banana' 횟수 출력!\n",
          expectedOutput: "3",
          hint: "글자 대신 단어를 넣어요: text.count(\"banana\")",
          hint2: "print(text.count(\"banana\"))"
        },
        {
          id: "len-explain",
          type: "explain",
          title: "📏 len() - 길이 구하기",
          content: `**len()** 은 문자열에 글자가 **몇 개** 있는지 세줘요. lesson 5 에서 잠깐 봤죠? 메서드 단원이라 다시 정리.

\`\`\`python
text = "Hello"
print(len(text))  # 5

name = "파이썬"
print(len(name))  # 3
\`\`\`

### 공백도 세요

\`\`\`python
print(len("Hello World"))  # 11  (공백 1개 포함)
print(len("    "))         # 4   (공백 4개)
print(len(""))             # 0   (빈 문자열)
\`\`\`

### 한글 / 영어 / 숫자 모두 1글자

\`\`\`python
print(len("안녕"))   # 2
print(len("hi"))    # 2
print(len("12"))    # 2
\`\`\`

> 💡 "글자 하나당 1" 이라고 외우면 끝. 한글이 더 크게 보여도 1.`
        },
        {
          id: "len-is-function",
          type: "explain",
          title: "⚠️ len 은 함수, 메서드 아니에요!",
          content: `다른 애들 (\`text.upper()\`, \`text.strip()\`) 은 점을 찍고 부르는데, len 만 **밖에서 괄호 안에 넣어요.**

\`\`\`python
len(text)    # ✅ 함수 — 괄호 안에 문자열을 넣음
text.len()   # ❌ AttributeError — 문자열엔 .len() 없음!
\`\`\`

왜 다른가? — 파이썬에서 \`len()\` 은 **문자열뿐 아니라 다른 것 (리스트, 딕셔너리 등)** 길이도 잴 수 있는 만능 함수라서요. 나중에 다른 자료구조 배울 때도 다시 만나요.`
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "문자열 길이를 구하세요!",
          initialCode: "text = \"Python\"\n# 길이를 구하는 함수를 사용하세요\nprint(___(text))",
          expectedOutput: "6",
          hint: "len(text) 함수 사용!",
          hint2: "len(text)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`len(\"안녕하세요\")`의 결과는?",
          options: ["5", "10", "15", "에러"],
          answer: 0,
          explanation: "한글도 글자 하나당 1로 세요! 5글자 = 5"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "more-methods",
          type: "explain",
          title: "📝 startswith / endswith / isdigit",
          content: `자주 쓰는 친구들 몇 개 더. 결과가 **True / False** 인 것에 주목하세요 — 나중에 조건문에서 진가가 나와요.

### startswith() / endswith() — "이걸로 시작/끝나?"

\`\`\`python
text = "Hello World"
print(text.startswith("Hello"))  # True
print(text.startswith("World"))  # False
print(text.endswith("World"))    # True
print(text.endswith("!"))        # False
\`\`\`

언제 쓸까?
- 파일 이름 확인 — \`name.endswith(".png")\` 로 이미지 파일인지 검사
- URL 검사 — \`url.startswith("https")\` 로 안전한 주소인지

### isdigit() — "숫자로만 돼있어?"

\`\`\`python
print("123".isdigit())   # True
print("12a".isdigit())   # False
print("".isdigit())      # False
print("3.14".isdigit())  # False (점이 끼어서)
\`\`\`

입력값이 진짜 숫자인지 검사할 때 유용. (lesson 9 에서 타입 변환 배우면 더 자주 써요.)`
        },
        {
          id: "more-methods-case",
          type: "explain",
          title: "🅰️ capitalize / title + 메서드 정리",
          content: `### capitalize() — "첫 글자만 대문자"

\`\`\`python
print("hello world".capitalize())  # Hello world
print("PYTHON".capitalize())       # Python
\`\`\`

이름 같은 거 정리할 때.

### title() — "단어마다 첫 글자 대문자"

\`\`\`python
print("hello world".title())  # Hello World
\`\`\`

### 정리 — 메서드 종류별

- **변환** — \`upper, lower, capitalize, title, strip, replace\` → 새 문자열 반환
- **검색** — \`find, count\` → 숫자 반환
- **검사** — \`startswith, endswith, isdigit\` → True/False 반환`
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션!",
          task: "아이디 검사기를 완성하세요!",
          initialCode: "user_id = \"  PyThOn_User  \"\n\n# 1. 공백 제거\nclean_id = user_id.___()\n# 2. 소문자로 변환\nlower_id = clean_id.___()\n# 3. 길이 확인\nlength = ___(lower_id)\n\nprint(\"원본:\", user_id)\nprint(\"정리:\", lower_id)\nprint(\"길이:\", length)",
          expectedOutput: "원본:   PyThOn_User  \n정리: python_user\n길이: 11",
          hint: "strip() → lower() → len() 순서로!",
          hint2: "strip(), lower(), len()"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **upper(), lower()** - 대소문자 변환
✅ **strip()** - 공백 제거
✅ **replace()** - 문자 치환
✅ **find(), count()** - 검색
✅ **len()** - 길이 구하기

다음 시간에는 **print() 옵션**을 배워서 출력을 더 멋지게 꾸밀 거예요! 🚀`
        }
      ]
    }
  ]
}
