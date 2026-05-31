// ============================================
// 레슨 19: 튜플
// ============================================
import { LessonData } from './types'

export const lesson19Data: LessonData = {
  id: "19",
  title: "튜플",
  emoji: "📦",
  description: "수정할 수 없는 리스트, 튜플을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "튜플이란?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📦 튜플 (tuple = 묶음) — 안 바뀌는 모임",
          content: `**튜플 (tuple = 묶음)** = 한 번 만들면 **안 바뀌는** 리스트.

🎒 비유: 생일 정보 \`(2014, 3, 15)\`. 태어난 날짜는 평생 안 바뀌죠? 그런 "고정된 묶음"이 튜플.

\`\`\`python
# 리스트 — 바꿀 수 있음
fruits = ["사과", "바나나"]
fruits[0] = "포도"  # OK!

# 튜플 — 못 바꿈
colors = ("빨강", "파랑")
colors[0] = "녹색"  # ❌ 에러!
\`\`\`

**소괄호 \`( )\`** 또는 그냥 쉼표로 만들어요.

### 왜 굳이 못 바꾸게 해요?

좌표 \`(x, y)\`, RGB \`(255, 128, 0)\`, 학생 \`(이름, 점수)\` — 이런 건 **한 묶음** 이에요. 한 부분만 바꾸면 의미가 깨져요. ("점수만 따로 바꾼 학생" 이라는 게 뭐죠?)

→ "이건 바꾸면 안 되는 묶음" 이라고 표시하는 도구 = 튜플.`
        },
        {
          id: "creation-ways",
          type: "explain",
          title: "🛠️ 튜플 만드는 법 — 4가지",
          content: `튜플 만드는 방법이 여러 가지예요. 다 같은 결과지만 상황에 따라 골라 써요.

\`\`\`python
# 1) 소괄호 () — 가장 기본
t1 = (1, 2, 3)

# 2) 괄호 없이 쉼표만 — 자주 쓰는 짧은 표기
t2 = 1, 2, 3
print(t2)  # (1, 2, 3) — 같은 튜플!

# 3) tuple() 함수로 변환
t3 = tuple([1, 2, 3])  # 리스트 → 튜플
t4 = tuple("abc")       # 문자열 → ('a', 'b', 'c')

# 4) 빈 튜플
empty = ()
empty2 = tuple()
\`\`\`

> 💡 **2번 방식** 이 함수에서 여러 값 반환할 때 자주 보여요 — \`return x, y\` 가 사실 \`return (x, y)\` 예요. (다음 챕터에서 자세히)

⚠️ 다음 페이지에서 한 가지 함정 — **요소 1개짜리 튜플** — 보고 가요 👇`
        },
        {
          id: "single-tuple-trap",
          type: "explain",
          title: "⚠️ 함정 — (1) vs (1,)",
          content: `요소 1개짜리 튜플은 헷갈려요.

\`\`\`python
a = (1)     # 그냥 숫자 1! 튜플 아님
b = (1,)    # 튜플 (요소 1개)

print(type(a))  # <class 'int'>
print(type(b))  # <class 'tuple'>
\`\`\`

🤔 왜 이래요? 파이썬은 괄호를 **그룹화 연산자** 로도 써요 — \`(2 + 3) * 4\` 처럼. \`(1)\` 도 그냥 "괄호로 묶인 숫자 1".

**튜플임을 알리는 진짜 표시는 쉼표** — 그래서 요소 1개일 땐 끝에 쉼표를 꼭 찍어야 해요.

\`\`\`python
# 함수에 한 개짜리 튜플 넘기기
print((1,))      # (1,)
print((1))       # 1 — 튜플 아님!
\`\`\`

> 🎯 한 줄로: **튜플의 본체는 쉼표, 괄호는 보조**.`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 좌표 튜플 — point 만들고 x, y 꺼내기",
          task: "좌표를 튜플로 만들고 인덱스로 꺼내보세요!",
          initialCode: "point = (100, 200)\nprint(point)\nprint(f\"x: {point[0]}, y: {point[1]}\")",
          expectedOutput: "(100, 200)\nx: 100, y: 200",
          hint: "인덱스로 접근은 리스트와 같아요!",
          hint2: "point[0], point[1]"
        },
        {
          id: "try-creation",
          type: "tryit",
          title: "🖥️ 다양한 만들기 — 글자별 / 단일 / 괄호 없이",
          task: "튜플을 *3가지 방법* 으로 만들어보세요! (글자별 / 단일 / 괄호 없이)",
          initialCode: "# 1) \"hello\" 를 글자별 튜플로\nt1 = ___(\"hello\")\nprint(t1)\n\n# 2) 단일 요소 튜플 (쉼표 잊지 말기!)\nsingle = (42,)\nprint(single, type(single).__name__)\n\n# 3) 괄호 없이 쉼표만\nt2 = 10, 20, 30\nprint(t2)",
          expectedOutput: "('h', 'e', 'l', 'l', 'o')\n(42,) tuple\n(10, 20, 30)",
          hint: "문자열을 *글자 단위* 묶음으로 만들어주는 변환 함수가 있어요.",
          hint2: "t1 = tuple(\"hello\") — tuple() 이 각 글자를 요소로 나눠요."
        },
        {
          id: "try1b",
          type: "tryit",
          title: "🖥️ 리스트 vs 튜플 — 직접 비교",
          task: "리스트와 튜플의 차이를 직접 확인해보세요!",
          initialCode: "# 리스트 - 수정 가능!\nfruits = ['사과', '바나나', '포도']\nfruits[0] = '딸기'\nfruits.append('망고')\nprint(f'리스트: {fruits}')\n\n# 튜플 - 수정 불가! (하지만 안전!)\ncolors = ('빨강', '파랑', '초록')\nprint(f'튜플: {colors}')\nprint(f'길이: {len(colors)}')\nprint(f'포함? {\"파랑\" in colors}')\n\n# 여러 타입도 OK!\nmixed = ('철수', 15, True, 3.14)\nfor item in mixed:\n    print(f'  {item} ({type(item).__name__})')",
          expectedOutput: "리스트: ['딸기', '바나나', '포도', '망고']\n튜플: ('빨강', '파랑', '초록')\n길이: 3\n포함? True\n  철수 (str)\n  15 (int)\n  True (bool)\n  3.14 (float)",
          hint: "튜플은 수정은 안 되지만 읽기, 반복, in 연산은 가능!",
          hint2: "코드를 그대로 실행하세요!"
        },
        {
          id: "vs-list-deep",
          type: "explain",
          title: "🤔 그럼 언제 리스트, 언제 튜플?",
          content: `정답: **나중에 바꿀 예정인지 아닌지** 로 정해요.

| 상황 | 도구 | 이유 |
|---|---|---|
| 학생 이름 모음 (추가/삭제 자주) | 리스트 | 자주 바뀜 |
| RGB 색상 (255, 128, 0) | 튜플 | 한 번 정하면 끝 |
| 좌표 (x, y) | 튜플 | 한 점은 묶음 |
| 일주일 요일 ("월", "화", ..., "일") | 튜플 | 절대 안 바뀜 |
| 장바구니 | 리스트 | 추가/제거 |

### 보너스 — 튜플이 살짝 빨라요

리스트는 "나중에 늘어날지 모르니" 여유 공간을 둬요. 튜플은 "이대로 끝" 이라서 딱 맞춰 저장. 메모리 살짝 절약 + 미세한 속도 이득.

> 🎯 첫 언어 학생용 한 줄: **"바꿀 거면 리스트, 안 바꿀 거면 튜플."**`
        },
        {
          id: "methods",
          type: "explain",
          title: "🔧 튜플 메서드 — count, index",
          content: `튜플은 수정 못 하니까 메서드가 별로 없어요. **읽기 전용** 두 개만 외워두면 됨.

\`\`\`python
nums = (3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5)

# count() — 특정 값이 몇 번 나오는지
print(nums.count(5))   # 3
print(nums.count(7))   # 0 — 없으면 0

# index() — 특정 값이 처음 나오는 위치
print(nums.index(4))   # 2 — 인덱스 2 위치
print(nums.index(5))   # 4 — 처음 나온 5 의 위치
\`\`\`

⚠️ \`index()\` 는 **값이 없으면 에러** 나요 — \`in\` 으로 먼저 확인하면 안전.

\`\`\`python
if 7 in nums:
    print(nums.index(7))
else:
    print("없어요")
\`\`\``
        },
        {
          id: "try-methods",
          type: "tryit",
          title: "🖥️ count / index — 90 점 몇 번? 80 점 위치?",
          task: "점수 튜플에서 90점이 몇 번 나오는지, 처음 80점이 어느 위치인지 출력하세요!",
          initialCode: "scores = (75, 80, 90, 85, 90, 80, 95, 90, 70)\n\n# 1) 90 점이 몇 번 나오는지 → print('count:', ___)\n\n\n# 2) 처음 80 점이 나오는 위치 → print('index:', ___)\n",
          expectedOutput: "count: 3\nindex: 1",
          hint: "*몇 번* 나오는지 세는 메서드 / *어디* 있는지 알려주는 메서드, 둘이 짝!",
          hint2: "print(f\"count: {scores.count(90)}\")\nprint(f\"index: {scores.index(80)}\")"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "(1)과 (1,)의 차이는?",
          options: ["둘 다 튜플", "(1)은 숫자, (1,)은 튜플", "둘 다 숫자", "에러"],
          answer: 1,
          explanation: "(1)은 그냥 숫자 1, (1,)은 요소 1개짜리 튜플이에요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "언패킹",
      emoji: "📤",
      steps: [
        {
          id: "unpack-explain",
          type: "explain",
          title: "📤 언패킹 (unpacking = 풀어서 받기)",
          content: `**언패킹 = 묶음 풀기**. 튜플의 값을 **한 번에** 여러 변수에 나눠 담아요.

🎒 비유: 도시락 통(튜플)을 열어서 밥, 반찬, 김치를 각각 그릇에 옮기는 느낌.

\`\`\`python
point = (10, 20)
x, y = point  # 언패킹!
print(x)  # 10
print(y)  # 20
\`\`\`

좌변 변수 개수 = 우변 튜플 요소 개수. 안 맞으면 에러.`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 언패킹 해보기 — RGB 풀어 받기",
          task: "RGB 튜플을 r, g, b 세 변수에 언패킹하세요!",
          initialCode: "rgb = (255, 128, 0)\nr, g, b = rgb\nprint(f\"R: {r}, G: {g}, B: {b}\")",
          expectedOutput: "R: 255, G: 128, B: 0",
          hint: "변수 개수와 요소 개수가 같아야 해요",
          hint2: "r, g, b = rgb로 한 번에!"
        },
        {
          id: "swap-explain",
          type: "explain",
          title: "🔄 값 바꿔치기 (swap) — 한 줄로 교환",
          content: `튜플 덕분에 두 변수 값 **바꿔치기** 가 한 줄에 돼요!

🎒 비유: 두 손에 든 물건을 동시에 휙 — 임시로 어디 둘 필요 없음.

\`\`\`python
a = 10
b = 20
a, b = b, a  # 한 줄로 교환!
print(a)  # 20
print(b)  # 10
\`\`\`

> 💡 우변에서 \`(b, a)\` 튜플을 먼저 만들어 두고, 좌변에서 풀어 담아요. 그래서 안 꼬임.`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 값 바꿔치기 — x ↔ y",
          task: "x와 y의 값을 한 줄로 바꿔치세요!",
          initialCode: "x = 100\ny = 200\nprint(f\"교환 전: x={x}, y={y}\")\nx, y = y, x\nprint(f\"교환 후: x={x}, y={y}\")",
          expectedOutput: "교환 전: x=100, y=200\n교환 후: x=200, y=100",
          hint: "임시 변수 없이 교환!",
          hint2: "x, y = y, x 한 줄로!"
        },
        {
          id: "star-unpack-explain",
          type: "explain",
          title: "✨ 별표 언패킹 — *rest",
          content: `요소 개수가 정확히 안 맞으면 어떻게 해요? **앞 하나 + 나머지 전부** 같은 패턴은 \`*\` (별표) 로 처리.

\`\`\`python
nums = (1, 2, 3, 4, 5)

# 첫 번째 + 나머지
first, *rest = nums
print(first)   # 1
print(rest)    # [2, 3, 4, 5] — 리스트로 모임!

# 첫 + 마지막 + 가운데 전부
first, *middle, last = nums
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

# 마지막 빼고
*head, last = nums
print(head)    # [1, 2, 3, 4]
print(last)    # 5
\`\`\`

> 💡 \`*변수\` 가 받은 건 항상 **리스트**예요 (튜플 아님). 한 묶음으로 모은다는 의미.

⚠️ \`*\` 는 한 번만 쓸 수 있어요. \`*a, *b = nums\` 는 어디서 쪼개야 할지 애매하니까 에러.`
        },
        {
          id: "try-star",
          type: "tryit",
          title: "🖥️ 별표 언패킹 — top/mid/bot 분리",
          task: "점수 5 개에서 1 등 점수 + 가운데 + 꼴등 점수 분리하기. 'top: ___, mid: ___, bot: ___' 형식 출력!",
          initialCode: "scores = (98, 85, 76, 90, 62)\n\n# top, *mid, bot 형태로 언패킹\n\n\n# 'top: 98, mid: [85, 76, 90], bot: 62' 형식 출력\n",
          expectedOutput: "top: 98, mid: [85, 76, 90], bot: 62",
          hint: "top, *mid, bot = scores 한 줄!",
          hint2: "top, *mid, bot = scores\nprint(f\"top: {top}, mid: {mid}, bot: {bot}\")"
        },
        {
          id: "iter-unpack-explain",
          type: "explain",
          title: "🔁 for 안에서 바로 언패킹",
          content: `튜플의 진짜 매력은 **for 루프 안에서 바로 풀어쓰기** 예요.

\`\`\`python
students = [
    ("철수", 85),
    ("영희", 92),
    ("민수", 78),
]

# 안 풀고 쓰면? 인덱스로 접근해야 — 못생김
for s in students:
    print(s[0], s[1])

# 풀어쓰면? 의미있는 변수 이름!
for name, score in students:
    print(name, score)
\`\`\`

→ 두 번째 방식이 훨씬 읽기 좋아요. \`s[0]\` 보다 \`name\` 이 의미 명확.

### enumerate() 와 함께

\`\`\`python
fruits = ["사과", "배", "감"]
for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 사과
# 1 배
# 2 감
\`\`\`

\`enumerate\` 는 사실 \`(인덱스, 값)\` 튜플들을 만들어 줘요. 학생이 모르고 써도 동작하지만, 알면 "왜 두 변수로 받아지지?" 가 풀려요.`
        },
        {
          id: "try-iter-unpack",
          type: "tryit",
          title: "🖥️ for 안 언패킹 — 도시 이름/인구 출력",
          task: "도시 데이터 (이름, 인구) 를 for 루프에서 언패킹하면서 출력하세요!",
          initialCode: "cities = [\n    (\"서울\", 950),\n    (\"부산\", 340),\n    (\"인천\", 295),\n]\n\n# for 안에서 (이름, 인구) 풀어쓰기\nfor ___, ___ in cities:\n    print(f\"{name}: {pop}만 명\")",
          expectedOutput: "서울: 950만 명\n부산: 340만 명\n인천: 295만 명",
          hint: "for name, pop in cities: 형태!",
          hint2: "for name, pop in cities:"
        }
      ]
    },
    {
      id: "ch3",
      title: "튜플의 활용 + 최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "two-values-explain",
          type: "explain",
          title: "🎁 활용 1 — 두 값을 한 번에 묶기",
          content: `여러 정보를 **한 변수에 묶어서** 다루고 싶을 때 — 튜플로 묶고, 필요하면 언패킹으로 풀어요.

\`\`\`python
# 학생 1 명의 정보 = (이름, 점수)
student = ("영희", 92)

# 그대로 출력
print(student)            # ('영희', 92)

# 풀어서 받기 (가장 흔한 패턴)
name, score = student
print(name, score)        # 영희 92
\`\`\`

### 왜 따로 변수 안 쓰고 묶을까?

\`\`\`python
# 묶지 않으면 — 변수 두 개를 항상 같이 옮겨야 함
name1 = "철수"
score1 = 85
# 두 개를 따로 다뤄야 해요 (실수 가능)

# 묶으면 — 한 덩어리
s1 = ("철수", 85)
# 한 변수만 옮기면 됨
\`\`\`

> 🎯 한 줄: **튜플은 "관련된 값들을 한 묶음으로" 다루기 위해.**

(나중에 lesson 32 에서 함수를 배우면 — 함수 결과를 \`return x, y\` 로 두 개 돌려줄 때 이 튜플 묶음이 그대로 쓰여요.)`
        },
        {
          id: "try-two-values",
          type: "tryit",
          title: "🖥️ 두 값 묶기 — 원의 둘레+넓이",
          task: "원의 반지름이 5 일 때, 둘레와 넓이를 튜플로 묶어 출력하세요. (π = 3.14)",
          initialCode: "r = 5\n# 둘레 = 2 * π * r\n# 넓이 = π * r * r\n# 둘을 튜플로 묶기\ncircle = (___, ___)\n\nperi, area = circle\nprint(f\"둘레: {peri}, 넓이: {area}\")",
          expectedOutput: "둘레: 31.400000000000002, 넓이: 78.5",
          hint: "circle = (2 * 3.14 * r, 3.14 * r * r) — 괄호 + 콤마.",
          hint2: "circle = (2 * 3.14 * r, 3.14 * r * r)"
        },
        {
          id: "coord-explain",
          type: "explain",
          title: "🗺️ 활용 2 — 좌표와 묶음 데이터",
          content: `**좌표 \`(x, y)\`** 같은 묶음은 튜플의 대표 사용처.

\`\`\`python
# 캐릭터 위치
player = (3, 5)
goal   = (8, 2)

# 거리 계산 (간단히 차이의 절댓값 합)
dx = abs(player[0] - goal[0])
dy = abs(player[1] - goal[1])
print(f"거리: {dx + dy}")   # 거리: 8
\`\`\`

### 왜 리스트로 안 하고 튜플?

\`\`\`python
# 리스트로 좌표
p = [3, 5]
p[0] = 999  # 실수로 좌표가 깨질 수 있음!

# 튜플로 좌표
p = (3, 5)
p[0] = 999  # ❌ 에러! → 실수 차단됨
\`\`\`

좌표 한 번 정한 다음 바뀌면 안 되는 데이터 → **튜플 = "실수 방지턱"**.

### 딕셔너리 키로도 쓰여요

리스트는 딕셔너리 키로 못 써요 (다음 레슨에서 깊이). 튜플은 OK.

\`\`\`python
# (행, 열) → 그 칸의 값
board = {
    (0, 0): "X",
    (0, 1): "O",
    (1, 1): "X",
}
print(board[(0, 0)])  # "X"
\`\`\``
        },
        {
          id: "try-coord",
          type: "tryit",
          title: "🖥️ 좌표 거리 — 두 점 사이 맨해튼 거리",
          task: "두 점 사이의 맨해튼 거리 (|x1-x2| + |y1-y2|) 를 계산하세요!",
          initialCode: "p1 = (1, 2)\np2 = (4, 6)\n\n# 언패킹 후 거리 계산\nx1, y1 = p1\nx2, y2 = p2\n\ndist = ___\nprint(f\"거리: {dist}\")",
          expectedOutput: "거리: 7",
          hint: "abs(x1 - x2) + abs(y1 - y2)",
          hint2: "dist = abs(x1 - x2) + abs(y1 - y2)"
        },
        {
          id: "enumerate-explain",
          type: "explain",
          title: "🔢 활용 3 — enumerate() 가 튜플을 준다",
          content: `enumerate 가 왜 \`for i, x in enumerate(...)\` 형태로 풀려서 받아지는지, 이제 답이 나와요.

\`\`\`python
fruits = ["사과", "배", "감"]

# enumerate 가 만드는 것 = (인덱스, 값) 튜플들
for pair in enumerate(fruits):
    print(pair)
# (0, '사과')
# (1, '배')
# (2, '감')

# 풀어서 받기 — 튜플 언패킹과 같은 원리!
for i, fruit in enumerate(fruits):
    print(i, fruit)
\`\`\`

### zip() 도 마찬가지

\`\`\`python
names = ["철수", "영희"]
ages  = [15, 14]

for pair in zip(names, ages):
    print(pair)
# ('철수', 15)
# ('영희', 14)

# 풀어서
for name, age in zip(names, ages):
    print(name, age)
\`\`\`

→ 파이썬 곳곳의 "두 변수로 받기" 패턴은 **튜플 언패킹** 이 기본이에요.`
        },
        {
          id: "try-enumerate",
          type: "tryit",
          title: "🖥️ enumerate 언패킹 — 메뉴에 1 번부터 번호",
          task: "메뉴 리스트의 각 항목에 1 부터 번호를 붙여 출력하세요. (enumerate 의 start 인자 활용)",
          initialCode: "menu = [\"라떼\", \"아메리카노\", \"카푸치노\"]\n\nfor i, name in enumerate(menu, start=1):\n    print(f\"{i}. {name}\")",
          expectedOutput: "1. 라떼\n2. 아메리카노\n3. 카푸치노",
          hint: "그대로 실행하세요 — enumerate(menu, start=1) 이면 인덱스가 1 부터 시작.",
          hint2: "코드 그대로 → 1. 라떼 / 2. 아메리카노 / 3. 카푸치노"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 학생 정보 출력 — for 안에서 언패킹",
          task: "학생 명단 (이름, 점수) 을 for 안에서 언패킹해 출력하세요!",
          initialCode: "students = [\n    (\"철수\", 85),\n    (\"영희\", 92),\n    (\"민수\", 78)\n]\n\nfor ___, ___ in students:\n    print(f\"{name}: {score}점\")",
          expectedOutput: "철수: 85점\n영희: 92점\n민수: 78점",
          hint: "for문에서 바로 언패킹!",
          hint2: "for name, score in students:"
        },
        {
          id: "mission2",
          type: "mission",
          title: "🏆 미션 — 평균 점수 + 1 등 이름 찾기",
          task: "(이름, 점수) 튜플 학생 4 명에서 **평균 점수** 와 **1 등 이름** 을 찾아 출력하세요. for-언패킹만 사용.",
          initialCode: "students = [\n    (\"철수\", 75),\n    (\"영희\", 92),\n    (\"민수\", 80),\n    (\"수지\", 88),\n]\n\n# 1) 평균 점수 — 점수들의 합 / 사람 수\ntotal = 0\nfor name, score in students:\n    total += ___\navg = total / len(students)\n\n# 2) 1 등 이름 — 가장 높은 점수의 학생 이름\ntop_name = \"\"\ntop_score = -1\nfor name, score in students:\n    if score > ___:\n        top_score = score\n        top_name = name\n\nprint(f\"평균: {avg}\")\nprint(f\"1 등: {top_name}\")",
          expectedOutput: "평균: 83.75\n1 등: 영희",
          hint: "평균: total += score. 1 등: if score > top_score 이면 갱신.",
          hint2: "total += score   # 점수만 더함\nif score > top_score:   # 지금까지 최고보다 크면 갱신"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **튜플 만들기** — \`( )\`, 쉼표만, \`tuple()\` 변환, 단일 요소 \`(x,)\`
✅ **튜플 vs 리스트** — 바꿀 거면 리스트, 안 바꿀 거면 튜플
✅ **메서드** — \`count()\`, \`index()\` (읽기 전용 두 개)
✅ **언패킹** — 한 번에 여러 변수, \`*rest\` 별표 언패킹
✅ **swap** — \`a, b = b, a\` 한 줄
✅ **for 안 언패킹** — \`for name, score in students:\`
✅ **두 값 묶기** — 관련된 정보를 한 변수로 (이름+점수, 둘레+넓이, …)
✅ **좌표/딕셔너리 키** — 묶음 데이터 + 실수 방지턱
✅ **enumerate / zip** — 튜플 언패킹 패턴이 곳곳에

다음 시간에는 **딕셔너리** 를 배워요! 🚀 — 튜플의 (x, y) 묶음을 (key, value) 로 확장하는 도구.`
        }
      ]
    }
  ]
}
