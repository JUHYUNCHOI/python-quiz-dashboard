// ============================================
// 프로젝트 4: Snake Game – Turtle, Class & Module
// VS Code에서 따라하면서 배우는 프로젝트
// 수업용: 퀴즈/미션 없이 설명만
// ============================================
import { LessonData } from './types'

export const lessonP4Data: LessonData = {
  id: "p4",
  title: "Snake Game 만들기",
  emoji: "🐍",
  description: "turtle, 클래스, 모듈로 Snake Game을 만들어요!",
  chapters: [
    // ============================================
    // Chapter 1: turtle 라이브러리 – 화면 만들기
    // ============================================
    {
      id: "ch1",
      title: "turtle로 화면 만들기",
      emoji: "🖥️",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "🐍 오늘 만들 것!",
          content: `## Snake Game을 만들어요!

![Snake Game 미리보기](/lessons/p4/game-preview.svg)

WASD 키로 뱀을 조종하고, 먹이를 먹으면 꼬리가 길어져요!
점수가 올라가고, 벽에 부딪히면 리셋!

**이걸 만들면서 배울 것:**
- \`turtle\` 라이브러리 (그래픽)
- \`class\` (클래스) – Head, Tail, Tails, Food
- \`import\` (모듈) – 파일 나누기

💻 **VS Code에서 따라 치면서 배워요!**`
        },
        {
          id: "ch1-1",
          type: "explain",
          title: "📦 turtle이 뭐야?",
          content: `## turtle = 화면에 그림 그리는 도구!

Python에 기본으로 들어있는 라이브러리예요.
\`import\`만 하면 바로 쓸 수 있어요!

\`\`\`python
import turtle
\`\`\`

**turtle로 할 수 있는 것:**
- 🖥️ 창(화면) 만들기
- 🐢 거북이(도형) 만들어서 움직이기
- ⌨️ 키보드 입력 받기

게임 만들기에 딱이에요!`
        },
        {
          id: "ch1-2",
          type: "explain",
          title: "🖥️ 1단계: 화면 만들기",
          content: `## VS Code에서 따라 쳐보세요!

📁 새 폴더 \`snake_game\`을 만들고, \`main.py\`를 만드세요.

\`\`\`python
import turtle

# 화면의 가로세로 길이
w = 600
h = 600

# 화면의 가로세로 길이의 반
halfW = w / 2
halfH = h / 2

# 화면
screen = turtle.Screen()
screen.title('Snake Game')
screen.setup(width=w, height=h)
screen.bgcolor('#cfe0e8')
screen.tracer(0)
\`\`\`

**실행해보세요!** (Ctrl+F5 또는 Run)
하늘색 배경의 화면이 뜨면 성공! ✅

### 한 줄 한 줄 뜯어보기!

- \`w = 600\`, \`h = 600\` → 화면 크기를 변수에 저장! 나중에 여기만 바꾸면 전체가 바뀜
- \`halfW = w / 2\` → **300**. 벽 충돌 판정에 쓸 거예요 (화면 반쪽 크기)
- \`turtle.Screen()\` → 게임 창(화면)을 만들어요
- \`.title('Snake Game')\` → 창 제목 설정
- \`.setup(width=w, height=h)\` → 가로 600, 세로 600 픽셀
- \`.bgcolor('#cfe0e8')\` → 배경색! \`#cfe0e8\`은 하늘색 (HTML 색상 코드)
- \`.tracer(0)\` → 자동 화면 그리기를 끄고, 우리가 \`screen.update()\`로 직접 갱신!

### 🖥️ 여기까지 실행하면?
코드 맨 아래에 \`screen.mainloop()\`을 추가하고 실행(Ctrl+F5)하면:
하늘색 600×600 창이 뜨면 성공! ✅ (아직 아무것도 안 보여요, 빈 화면이 맞아요!)`
        },
        {
          id: "ch1-3",
          type: "explain",
          title: "📐 좌표계 이해하기",
          content: `## 화면의 중심이 (0, 0)!

![turtle 좌표계](/lessons/p4/coordinate.svg)

보통 화면은 왼쪽 위가 (0,0)이지만,
**turtle은 화면 한가운데가 (0, 0)** 이에요!

600×600 화면이면:
- **오른쪽** 끝: x = **300** (halfW)
- **왼쪽** 끝: x = **-300** (-halfW)
- **위쪽** 끝: y = **300** (halfH)
- **아래쪽** 끝: y = **-300** (-halfH)

💡 그래서 \`halfW\`, \`halfH\`를 미리 구해둔 거예요!
벽 밖으로 나갔는지 확인할 때 쓸 거예요.`
        },
      ]
    },
    // ============================================
    // Chapter 2: 뱀 머리 – Head 클래스
    // ============================================
    {
      id: "ch2",
      title: "뱀 머리 만들기 (Head)",
      emoji: "🔴",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "🤔 왜 클래스를 써야 할까?",
          content: `## main.py에 전부 쓰면 어떻게 될까?

머리, 꼬리, 먹이, 점수...
**한 파일에 다 넣으면 수백 줄!** 😱

**클래스로 나누면:**
- Head 클래스 → 머리 관련 코드만!
- Tail 클래스 → 꼬리 한 칸
- Tails 클래스 → 꼬리 전체 관리
- Food 클래스 → 먹이 관련만!

![클래스 = 설계도](/lessons/p4/class-diagram.svg)

📁 같은 폴더에 \`snake.py\` 파일을 새로 만드세요!`
        },
        {
          id: "ch2-1",
          type: "explain",
          title: "🏗️ Head 클래스 - 기본 설정",
          content: `## snake.py에 입력하세요!

\`\`\`python
import turtle

class Head:
    def __init__(self):
        self.a = turtle.Turtle()
        self.a.shape('circle')
        self.a.color('#587e76')
        self.a.penup()
        self.a.goto(0, 100)
        self.a.direction = 'stop'
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`class Head:\` → **Head**라는 클래스(설계도)를 만든다!
- \`def __init__(self):\` → \`Head()\`를 호출하면 **자동으로 실행**되는 함수
- \`self\` → "나 자신"을 가리킴. 클래스 안의 모든 함수에서 첫 번째 파라미터!
- \`self.a = turtle.Turtle()\` → 거북이를 하나 만들어서 \`self.a\`에 저장
- \`.shape('circle')\` → 동그라미 모양
- \`.color('#587e76')\` → 녹색 계열 색상 (HTML 색상 코드)
- \`.penup()\` → 이동할 때 선을 안 그려요 (펜을 들어올림)
- \`.goto(0, 100)\` → 시작 위치를 (0, 100)으로 (중앙보다 약간 위)
- \`self.a.direction = 'stop'\` → **새 속성 추가!** 처음에는 멈춰있음

💡 \`direction\`은 turtle에 원래 없는 속성이에요.
우리가 \`self.a.direction = 'stop'\`으로 **직접 만든 것!**
Python은 이렇게 객체에 속성을 자유롭게 추가할 수 있어요.

### 🖥️ 여기까지 실행하면?
main.py에서 \`import snake\`하고 \`head = snake.Head()\` + \`screen.update()\`를 추가하면:
화면 중앙 약간 위에 **녹색 동그라미** 하나가 보여요! 그게 뱀 머리! 🟢`
        },
        {
          id: "ch2-2",
          type: "explain",
          title: "🚀 Head의 move() 메서드",
          content: `## 방향에 따라 움직이기!

![격자 이동 원리](/lessons/p4/grid-move.svg)

Head 클래스에 이어서 추가:

\`\`\`python
    def move(self):
        if self.a.direction == 'right':
            x = self.a.xcor()
            self.a.setx(x + 20)

        elif self.a.direction == 'left':
            x = self.a.xcor()
            self.a.setx(x - 20)

        if self.a.direction == 'up':
            y = self.a.ycor()
            self.a.sety(y + 20)

        elif self.a.direction == 'down':
            y = self.a.ycor()
            self.a.sety(y - 20)
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`def move(self):\` → 매 프레임마다 호출되는 이동 함수!
- \`if self.a.direction == 'right':\` → 현재 방향이 'right'이면...
- \`x = self.a.xcor()\` → 현재 x 좌표를 가져와서
- \`self.a.setx(x + 20)\` → x 좌표를 20 증가! (오른쪽으로 이동)
- 왼쪽은 \`x - 20\`, 위는 \`y + 20\`, 아래는 \`y - 20\`

💡 \`direction\`이 \`'stop'\`이면? 어느 \`if\`에도 안 걸려서 안 움직여요!
그래서 처음에 \`direction = 'stop'\`으로 설정한 거예요.

💡 \`forward()\` 대신 \`setx()\`, \`sety()\`를 쓰는 이유:
x, y 좌표를 직접 조작해서 딱딱 격자처럼 움직여요!`
        },
        {
          id: "ch2-3",
          type: "explain",
          title: "⌨️ 방향 바꾸기 메서드",
          content: `## 역방향 방지가 핵심!

Head 클래스에 이어서 추가:

\`\`\`python
    def move_up(self):
        if self.a.direction != 'down':
            self.a.direction = 'up'

    def move_down(self):
        if self.a.direction != 'up':
            self.a.direction = 'down'

    def move_right(self):
        if self.a.direction != 'left':
            self.a.direction = 'right'

    def move_left(self):
        if self.a.direction != 'right':
            self.a.direction = 'left'
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`def move_up(self):\` → W키를 누르면 호출될 함수
- \`if self.a.direction != 'down':\` → **지금 아래로 가고 있지 않을 때만!**
- \`self.a.direction = 'up'\` → 방향을 위로 변경

💡 **왜 역방향을 막을까?**
뱀이 오른쪽으로 가는데 왼쪽을 누르면?
→ 뱀이 자기 몸을 뚫고 가버려요! 😱
→ 그래서 현재 방향의 **반대 방향은 무시**해요!

- 위로 가는 중 → 아래(down)는 무시
- 오른쪽 가는 중 → 왼쪽(left)은 무시`
        },
        {
          id: "ch2-4",
          type: "explain",
          title: "📍 Head 나머지 메서드",
          content: `## 위치 관련 메서드들!

Head 클래스에 이어서 추가:

\`\`\`python
    def getDistance(self, x, y):
        return self.a.distance(x, y)

    def getX(self):
        return self.a.xcor()

    def getY(self):
        return self.a.ycor()

    def goto(self, x, y):
        self.a.goto(x, y)
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`def getDistance(self, x, y):\` → 머리와 (x, y) 사이의 **거리**를 구해요!
- \`self.a.distance(x, y)\` → turtle에 내장된 거리 계산 함수! 피타고라스 정리를 자동으로 해줘요
- \`getX()\`, \`getY()\` → 머리의 현재 x, y 좌표를 돌려줌
- \`goto(self, x, y)\` → 지정한 좌표로 순간이동! 벽에 부딪히면 (0, 0)으로 리셋할 때 사용

💡 \`distance()\`는 turtle의 **내장 메서드**예요!
직접 피타고라스 공식을 쓸 필요 없이 바로 거리를 구해줘요.`
        },
      ]
    },
    // ============================================
    // Chapter 3: 꼬리 – Tail & Tails 클래스
    // ============================================
    {
      id: "ch3",
      title: "꼬리 만들기 (Tail & Tails)",
      emoji: "🟢",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "🟢 꼬리 구조 이해하기",
          content: `## 꼬리는 클래스가 2개!

**왜 2개일까?**

- **\`Tail\` 클래스** → 꼬리 **한 칸** (초록 동그라미 하나)
- **\`Tails\` 클래스** → 꼬리 **전체 관리** (리스트로 여러 Tail을 관리)

먹이를 먹을 때마다:
1. 새 \`Tail\` 객체를 만들고
2. \`Tails\`의 리스트에 추가!

이렇게 나누면 역할이 깔끔해요:
- \`Tail\` = "나는 초록 동그라미 하나야"
- \`Tails\` = "나는 전체 꼬리를 관리해"`
        },
        {
          id: "ch3-1",
          type: "explain",
          title: "🏗️ Tail 클래스 (꼬리 한 칸)",
          content: `## snake.py에 Head 아래에 추가!

\`\`\`python
class Tail:
    def __init__(self):
        self.a = turtle.Turtle()
        self.a.penup()
        self.a.color('#c5d5c5')
        self.a.shape('circle')
        self.a.goto(0, 100)
        self.a.direction = 'stop'

    def getX(self):
        return self.a.xcor()

    def getY(self):
        return self.a.ycor()

    def goto(self, x, y):
        self.a.goto(x, y)
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`class Tail:\` → 꼬리 **한 칸**을 나타내는 클래스!
- \`self.a = turtle.Turtle()\` → 거북이 하나 생성
- \`.color('#c5d5c5')\` → 연한 녹색! 머리(\`#587e76\`)보다 밝아서 구분됨
- \`.shape('circle')\` → 동그라미 모양
- \`.goto(0, 100)\` → 처음 위치는 머리와 같은 곳 (나중에 \`followHead()\`에서 재배치)
- \`getX()\`, \`getY()\` → 이 꼬리의 현재 위치
- \`goto()\` → 이 꼬리를 특정 위치로 이동 (\`followHead\`에서 사용)`
        },
        {
          id: "ch3-2",
          type: "explain",
          title: "🏗️ Tails 클래스 (꼬리 전체 관리)",
          content: `## snake.py에 Tail 아래에 추가!

\`\`\`python
class Tails:
    def __init__(self):
        self.tails = []

    def addTail(self, t):
        self.tails.append(t)

    def clear(self):
        for tail in self.tails:
            tail.goto(1000000, 1000000)
        self.tails.clear()
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`class Tails:\` → 꼬리 **전체**를 관리하는 클래스! (복수형 s 주의!)
- \`self.tails = []\` → 빈 리스트! 여기에 Tail 객체들이 하나씩 쌓임
- \`def addTail(self, t):\` → Tail 객체 \`t\`를 받아서 리스트에 추가
- \`self.tails.append(t)\` → 리스트 끝에 붙이기!
- \`def clear(self):\` → 벽에 부딪히면 꼬리 전부 삭제!
- \`tail.goto(1000000, 1000000)\` → 화면 밖 아주 먼 곳으로 보내서 안 보이게!
- \`self.tails.clear()\` → 리스트 자체도 비우기

💡 왜 \`hideturtle()\` 대신 \`goto(1000000, ...)\`?
화면 밖으로 보내는 것도 숨기는 방법 중 하나예요!`
        },
        {
          id: "ch3-3",
          type: "explain",
          title: "🔄 followHead() – 따라가기!",
          content: `## Tails 클래스에 이어서 추가!

![꼬리 따라가기 원리](/lessons/p4/tail-follow.svg)

\`\`\`python
    def followHead(self, x, y):
        for i in range(len(self.tails) - 1, 0, -1):
            t = self.tails[i]
            bt = self.tails[i - 1]
            t.goto(bt.getX(), bt.getY())

        if len(self.tails) > 0:
            self.tails[0].goto(x, y)
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`def followHead(self, x, y):\` → 머리의 x, y 좌표를 받아서 꼬리 전체를 이동!
- \`range(len(self.tails) - 1, 0, -1)\` → **뒤에서부터 앞으로** 반복!

예를 들어 꼬리가 3개면: \`range(2, 0, -1)\` → i = 2, 1

- \`t = self.tails[i]\` → 현재 꼬리 (뒤쪽)
- \`bt = self.tails[i - 1]\` → 바로 앞 꼬리
- \`t.goto(bt.getX(), bt.getY())\` → 현재 꼬리를 앞 꼬리가 있던 위치로!

이동 순서 (꼬리가 3개일 때):
1. 꼬리3 → 꼬리2가 있던 자리로
2. 꼬리2 → 꼬리1이 있던 자리로
3. 꼬리1 → 머리가 있던 자리로 (\`self.tails[0].goto(x, y)\`)

💡 **왜 뒤에서부터?** 앞에서부터 하면 위치가 겹쳐서 전부 같은 곳에 모여요!`
        },
      ]
    },
    // ============================================
    // Chapter 4: 먹이 – Food 클래스
    // ============================================
    {
      id: "ch4",
      title: "먹이 만들기 (Food)",
      emoji: "⭐",
      steps: [
        {
          id: "ch4-0",
          type: "explain",
          title: "⭐ 먹이가 필요해!",
          content: `## 뱀이 먹을 것을 만들자!

**먹이 규칙:**
- 화면 랜덤 위치에 나타남
- 뱀 머리가 가까이 가면 → 먹은 것!
- 먹으면 → 꼬리 +1, 점수 +10
- 먹이는 새 랜덤 위치로 이동

📁 새 파일 \`food.py\`를 만들어요!

![프로젝트 구조](/lessons/p4/file-structure.svg)`
        },
        {
          id: "ch4-1",
          type: "explain",
          title: "🏗️ Food 클래스",
          content: `## food.py에 입력하세요!

\`\`\`python
import turtle
import random

class Food:
    def __init__(self):
        self.food = turtle.Turtle()
        self.food.shape('turtle')
        self.food.color('green')
        self.food.goto(0, 0)
        self.food.penup()
        self.food.speed(0)

    def getX(self):
        return self.food.xcor()

    def getY(self):
        return self.food.ycor()

    def goToRandom(self, x1, x2, y1, y2):
        x = random.randint(x1, x2)
        y = random.randint(y1, y2)
        self.food.goto(x, y)
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`import random\` → 랜덤 숫자를 만드는 라이브러리!
- \`self.food = turtle.Turtle()\` → 먹이용 거북이 생성
- \`.shape('turtle')\` → 모양을 **거북이**로! 🐢 (머리는 circle, 먹이는 turtle로 구분)
- \`.color('green')\` → 초록색
- \`.goto(0, 0)\` → 처음 위치는 화면 중앙
- \`.speed(0)\` → 이동 속도 최대! (애니메이션 없이 즉시 이동)
- \`getX()\`, \`getY()\` → 먹이의 현재 위치 (충돌 판정에 사용!)
- \`def goToRandom(self, x1, x2, y1, y2):\` → 범위 안의 랜덤 위치로 이동!
- \`random.randint(x1, x2)\` → x1부터 x2 사이의 **정수** 하나를 랜덤으로!
- \`self.food.goto(x, y)\` → 랜덤 좌표로 순간이동!

💡 \`goToRandom\`에 범위를 파라미터로 받는 이유:
main.py에서 화면 크기에 맞게 범위를 전달할 수 있어요!`
        },
      ]
    },
    // ============================================
    // Chapter 5: 모듈 – 파일 나누기
    // ============================================
    {
      id: "ch5",
      title: "모듈로 파일 나누기",
      emoji: "📦",
      steps: [
        {
          id: "ch5-0",
          type: "explain",
          title: "📦 모듈이 뭐야?",
          content: `## 모듈 = .py 파일!

우리가 만든 \`snake.py\`, \`food.py\` 자체가 모듈이에요!
다른 파일에서 \`import\`해서 쓸 수 있어요.

![프로젝트 구조](/lessons/p4/file-structure.svg)

**한 파일에 다 쓰면:** 500줄짜리 스파게티 코드 🍝
**파일을 나누면:** 각 파일이 짧고 깔끔! ✨

- \`snake.py\` → Head, Tail, Tails 클래스
- \`food.py\` → Food 클래스
- \`main.py\` → 게임 실행 (총괄 감독!)`
        },
        {
          id: "ch5-1",
          type: "explain",
          title: "🔗 import로 연결!",
          content: `## main.py에서 모듈 사용하기!

![import로 파일 연결하기](/lessons/p4/import-flow.svg)

\`\`\`python
import turtle
import snake       # snake.py를 가져와!
import food        # food.py를 가져와!
import time
\`\`\`

### import는 이렇게 작동해요:

- \`import snake\` → 같은 폴더의 \`snake.py\`를 불러와요
- \`snake.Head()\` → snake 모듈의 Head 클래스를 사용!
- \`snake.Tails()\` → snake 모듈의 Tails 클래스를 사용!
- \`import food\` → 같은 폴더의 \`food.py\`를 불러와요
- \`food.Food()\` → food 모듈의 Food 클래스를 사용!

사용법: **모듈이름.클래스이름()** 으로 객체를 만들어요!

\`\`\`python
head = snake.Head()     # Head 객체 생성
tails = snake.Tails()   # Tails 객체 생성
my_food = food.Food()   # Food 객체 생성
\`\`\`

💡 \`food = food.Food()\`라고 하면 변수명과 모듈명이 겹쳐서 에러!
그래서 변수명을 \`my_food\`로 쓰기도 해요. (우리 코드에서는 \`food = food.Food()\`로 씁니다)`
        },
      ]
    },
    // ============================================
    // Chapter 6: 키보드 연결 + 게임 루프
    // ============================================
    {
      id: "ch6",
      title: "키보드 + 게임 루프",
      emoji: "⌨️",
      steps: [
        {
          id: "ch6-0",
          type: "explain",
          title: "⌨️ 키보드 연결하기",
          content: `## main.py에 이어서 추가!

\`\`\`python
# 이벤트는 Screen에 연결한다.
screen.listen()
screen.onkeypress(head.move_up, 'w')
screen.onkeypress(head.move_down, 's')
screen.onkeypress(head.move_right, 'd')
screen.onkeypress(head.move_left, 'a')

# 대문자도!
screen.onkeypress(head.move_up, 'W')
screen.onkeypress(head.move_down, 'S')
screen.onkeypress(head.move_right, 'D')
screen.onkeypress(head.move_left, 'A')
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`screen.listen()\` → 화면에서 키보드 입력을 감지 시작!
- \`screen.onkeypress(head.move_up, 'w')\` → **'w' 키를 누르면** \`head.move_up\` 함수 실행!

💡 **중요:** \`head.move_up\`에 \`()\`가 없어요!
- \`head.move_up\` = 함수를 **전달**만 (나중에 실행해줘!)
- \`head.move_up()\` = **지금 당장** 실행
- 키를 **누를 때** 실행해야 하니까 ()를 빼요!

💡 **WASD 키 사용!** 화살표 키 대신 게이머 스타일 ⌨️
대문자(W, S, D, A)도 등록해서 Caps Lock이 켜져 있어도 작동!

### 🖥️ 여기까지 실행하면?
main.py에 키보드 연결 + 간단한 while 루프를 넣고 실행하면:
WASD로 **녹색 동그라미가 20픽셀씩 움직여요!** ⌨️
(아직 꼬리, 먹이, 점수는 없어요)`
        },
        {
          id: "ch6-1",
          type: "explain",
          title: "🔄 게임 루프 시작!",
          content: `## 게임의 심장: while True 루프!

main.py 맨 아래에 추가:

\`\`\`python
while True:
    # (여기에 게임 로직이 들어갈 거예요!)

    # 머리 이동
    head.move()

    # 꼬리 이동
    tails.followHead(head.getX(), head.getY())

    time.sleep(0.1)
    screen.update()

screen.mainloop()
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`while True:\` → **무한 반복!** 게임이 끝날 때까지 계속 실행
- \`head.move()\` → 현재 direction에 따라 20픽셀 이동
- \`tails.followHead(...)\` → 꼬리 전체가 머리를 따라감
- \`time.sleep(0.1)\` → **0.1초 대기**! 이 숫자가 게임 속도를 결정해요
- \`screen.update()\` → 화면 새로고침! (tracer(0)이니까 직접 해야 함)
- \`screen.mainloop()\` → 화면이 닫히지 않게 유지 (while 밖)

💡 \`time.sleep(0.05)\`로 바꾸면 2배 빨라져요!
\`time.sleep(0.2)\`로 바꾸면 느려져요!

### 🖥️ 여기까지 실행하면?
WASD로 머리가 움직이고, 먹이(🐢 거북이 모양)가 화면에 보여요!
아직 먹어도 아무 일 안 일어나요. 다음 챕터에서 추가할 거예요!`
        },
      ]
    },
    // ============================================
    // Chapter 7: 먹이 먹기 + 벽 충돌
    // ============================================
    {
      id: "ch7",
      title: "먹이 먹기 & 벽 충돌",
      emoji: "🍽️",
      steps: [
        {
          id: "ch7-0",
          type: "explain",
          title: "📊 점수 시스템 만들기",
          content: `## main.py – 게임 루프 위에 추가!

\`\`\`python
# 점수를 위한 변수들
score = 0
high_score = 0

# 점수 표시용 거북이
pen = turtle.Turtle()
pen.penup()
pen.hideturtle()
pen.goto(0, halfH - 50)
pen.write('score: 0, High Score: 0',
          align="center",
          font=('candara', 24, 'bold'))
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`score = 0\` → 현재 점수! 먹이 먹으면 +10
- \`high_score = 0\` → 최고 점수! 벽에 부딪혀도 안 줄어요
- \`pen = turtle.Turtle()\` → 점수 표시 전용 거북이!
- \`.penup()\` → 이동 시 선 안 그림
- \`.hideturtle()\` → 거북이 모양은 숨기고 **글자만** 보이게!
- \`.goto(0, halfH - 50)\` → 화면 위쪽에 위치 (300 - 50 = 250)
- \`.write(...)\` → 화면에 텍스트 출력!
- \`align="center"\` → 가운데 정렬
- \`font=('candara', 24, 'bold')\` → 글꼴, 크기 24, 굵게`
        },
        {
          id: "ch7-1",
          type: "explain",
          title: "🍽️ 먹이 먹기 판정",
          content: `## while True 루프 안에 추가!

![거리 판정 원리](/lessons/p4/distance-check.svg)

\`\`\`python
    # 뱀 머리가 아이템에 닿았을 때
    x = food.getX()
    y = food.getY()

    if head.getDistance(x, y) < 20:
        # 꼬리가 길어짐
        tail = snake.Tail()
        tails.addTail(tail)

        # 아이템이 랜덤 위치로 이동
        food.goToRandom(-(halfW-20), halfW - 20,
                        -(halfH-20), halfH - 20)

        # 점수
        score += 10
        if score > high_score:
            high_score = score
        pen.clear()
        pen.write('score: {}, High Score: {}'.format(
            score, high_score),
            align="center",
            font=('candara', 24, 'bold'))
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`x = food.getX()\` → 먹이의 현재 x 좌표
- \`head.getDistance(x, y)\` → 머리와 먹이 사이의 **거리**! turtle 내장 함수
- \`if ... < 20:\` → 거리가 20픽셀 미만이면 "먹었다!" 판정
- \`tail = snake.Tail()\` → **새 Tail 객체** 생성! (초록 동그라미 하나)
- \`tails.addTail(tail)\` → Tails 리스트에 추가!
- \`food.goToRandom(...)\` → 먹이를 화면 안쪽의 랜덤 위치로! \`halfW-20\`은 벽 근처를 피하려고
- \`score += 10\` → 점수 10점 추가!
- \`if score > high_score:\` → 현재 점수가 최고 점수를 넘으면 갱신
- \`pen.clear()\` → 이전 점수 글자를 지움! (안 하면 글자가 겹침)
- \`pen.write(...)\` → 새 점수를 다시 표시
- \`.format(score, high_score)\` → \`{}\` 자리에 값을 넣어줘요!`
        },
        {
          id: "ch7-2",
          type: "explain",
          title: "🧱 벽 충돌 처리",
          content: `## while True 루프 안에 추가!

\`\`\`python
    # 뱀 머리가 벽에 닿았을 때
    hx = head.getX()
    hy = head.getY()

    if hx < -halfW or hx > halfW or hy < -halfH or hy > halfH:
        # 뱀 머리를 중간으로 이동
        head.goto(0, 0)
        # 꼬리 없앰
        tails.clear()
        # 점수
        score = 0
        pen.clear()
        pen.write('score: {}, High Score: {}'.format(
            score, high_score),
            align="center",
            font=('candara', 24, 'bold'))
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`hx = head.getX()\` → 머리의 현재 x 좌표
- \`if hx < -halfW\` → 왼쪽 벽 밖으로 나갔나? (x < -300)
- \`or hx > halfW\` → 오른쪽 벽 밖으로? (x > 300)
- \`or hy < -halfH\` → 아래쪽 벽 밖으로? (y < -300)
- \`or hy > halfH\` → 위쪽 벽 밖으로? (y > 300)
- \`head.goto(0, 0)\` → 머리를 화면 중앙으로 리셋!
- \`tails.clear()\` → 꼬리 전부 화면 밖으로 보내고 리스트 비우기
- \`score = 0\` → 점수 리셋! (high_score는 유지!)
- \`pen.clear()\` + \`pen.write(...)\` → 점수 표시 갱신

💡 **high_score**는 안 줄어요!
벽에 부딪혀도 최고 점수는 계속 남아있어요.
이게 게임의 재미 포인트! 🎯

### 🖥️ 여기까지 실행하면?
**드디어 완전한 게임!** 🎮
- WASD로 머리 이동 → 먹이 먹으면 꼬리 추가 + 점수 +10
- 벽에 부딪히면 리셋! (최고 점수는 유지)
- **Chapter 8에서 전체 코드를 확인하세요!**`
        },
      ]
    },
    // ============================================
    // Chapter 8: 완성! 전체 코드
    // ============================================
    {
      id: "ch8",
      title: "게임 완성하기!",
      emoji: "🎮",
      steps: [
        {
          id: "ch8-0",
          type: "explain",
          title: "📁 최종 snake.py",
          content: `## snake.py 완성 코드!

지금까지 만든 Head, Tail, Tails를 합쳐서 확인하세요:

\`\`\`python
import turtle

class Head:
    def __init__(self):
        self.a = turtle.Turtle()
        self.a.shape('circle')
        self.a.color('#587e76')
        self.a.penup()
        self.a.goto(0, 100)
        self.a.direction = 'stop'

    def move(self):
        if self.a.direction == 'right':
            x = self.a.xcor()
            self.a.setx(x + 20)
        elif self.a.direction == 'left':
            x = self.a.xcor()
            self.a.setx(x - 20)
        if self.a.direction == 'up':
            y = self.a.ycor()
            self.a.sety(y + 20)
        elif self.a.direction == 'down':
            y = self.a.ycor()
            self.a.sety(y - 20)

    def move_up(self):
        if self.a.direction != 'down':
            self.a.direction = 'up'

    def move_down(self):
        if self.a.direction != 'up':
            self.a.direction = 'down'

    def move_right(self):
        if self.a.direction != 'left':
            self.a.direction = 'right'

    def move_left(self):
        if self.a.direction != 'right':
            self.a.direction = 'left'

    def getDistance(self, x, y):
        return self.a.distance(x, y)

    def getX(self):
        return self.a.xcor()

    def getY(self):
        return self.a.ycor()

    def goto(self, x, y):
        self.a.goto(x, y)


class Tail:
    def __init__(self):
        self.a = turtle.Turtle()
        self.a.penup()
        self.a.color('#c5d5c5')
        self.a.shape('circle')
        self.a.goto(0, 100)
        self.a.direction = 'stop'

    def getX(self):
        return self.a.xcor()

    def getY(self):
        return self.a.ycor()

    def goto(self, x, y):
        self.a.goto(x, y)


class Tails:
    def __init__(self):
        self.tails = []

    def addTail(self, t):
        self.tails.append(t)

    def clear(self):
        for tail in self.tails:
            tail.goto(1000000, 1000000)
        self.tails.clear()

    def followHead(self, x, y):
        for i in range(len(self.tails) - 1, 0, -1):
            t = self.tails[i]
            bt = self.tails[i - 1]
            t.goto(bt.getX(), bt.getY())
        if len(self.tails) > 0:
            self.tails[0].goto(x, y)
\`\`\``
        },
        {
          id: "ch8-1",
          type: "explain",
          title: "📁 최종 food.py",
          content: `## food.py 완성 코드!

\`\`\`python
import turtle
import random

class Food:
    def __init__(self):
        self.food = turtle.Turtle()
        self.food.shape('turtle')
        self.food.color('green')
        self.food.goto(0, 0)
        self.food.penup()
        self.food.speed(0)

    def getX(self):
        return self.food.xcor()

    def getY(self):
        return self.food.ycor()

    def goToRandom(self, x1, x2, y1, y2):
        x = random.randint(x1, x2)
        y = random.randint(y1, y2)
        self.food.goto(x, y)
\`\`\`

**3개 파일, 각각 역할이 명확!** ✨
- \`snake.py\` → Head(머리) + Tail(꼬리 한 칸) + Tails(꼬리 관리)
- \`food.py\` → Food(먹이) 관리
- \`main.py\` → 화면, 입력, 게임 루프 (총괄 감독!)`
        },
        {
          id: "ch8-2",
          type: "explain",
          title: "📁 최종 main.py",
          content: `## main.py 완성 코드!

\`\`\`python
import turtle
import snake
import time
import food

# 화면의 가로세로 길이
w = 600
h = 600
halfW = w / 2
halfH = h / 2

# 화면
screen = turtle.Screen()
screen.title('Snake Game')
screen.setup(width=w, height=h)
screen.bgcolor('#cfe0e8')
screen.tracer(0)

# 뱀의 머리 객체(Object)를 만든다.
head = snake.Head()

# 이벤트는 Screen에 연결한다.
screen.listen()
screen.onkeypress(head.move_up, 'w')
screen.onkeypress(head.move_down, 's')
screen.onkeypress(head.move_right, 'd')
screen.onkeypress(head.move_left, 'a')
screen.onkeypress(head.move_up, 'W')
screen.onkeypress(head.move_down, 'S')
screen.onkeypress(head.move_right, 'D')
screen.onkeypress(head.move_left, 'A')

# 뱀이 먹을 아이템 객체(Object)를 만든다.
food = food.Food()

# 뱀의 꼬리 객체(Object)를 만든다.
tails = snake.Tails()

# 점수를 위한 변수들 초기화
score = 0
high_score = 0

# 점수
pen = turtle.Turtle()
pen.penup()
pen.hideturtle()
pen.goto(0, halfH - 50)
pen.write('score: 0, High Score: 0',
          align="center",
          font=('candara', 24, 'bold'))

while True:
    # 뱀 머리가 아이템에 닿았을 때
    x = food.getX()
    y = food.getY()
    if head.getDistance(x, y) < 20:
        tail = snake.Tail()
        tails.addTail(tail)
        food.goToRandom(-(halfW-20), halfW - 20,
                        -(halfH-20), halfH - 20)
        score += 10
        if score > high_score:
            high_score = score
        pen.clear()
        pen.write('score: {}, High Score: {}'.format(
            score, high_score),
            align="center",
            font=('candara', 24, 'bold'))

    # 뱀 머리가 벽에 닿았을 때
    hx = head.getX()
    hy = head.getY()
    if hx < -halfW or hx > halfW or hy < -halfH or hy > halfH:
        head.goto(0, 0)
        tails.clear()
        score = 0
        pen.clear()
        pen.write('score: {}, High Score: {}'.format(
            score, high_score),
            align="center",
            font=('candara', 24, 'bold'))

    # 머리 이동
    head.move()

    # 꼬리 이동
    tails.followHead(head.getX(), head.getY())

    time.sleep(0.1)
    screen.update()

screen.mainloop()
\`\`\``
        },
        {
          id: "ch8-3",
          type: "explain",
          title: "🎉 Snake Game 완성!",
          content: `## 축하해요! 🎉 Snake Game이 완성됐어요!

**VS Code에서 main.py를 실행해보세요!**

**만든 것 총정리:**
- 🖥️ \`turtle.Screen()\` – 600×600 게임 화면
- 🐍 \`Head\` 클래스 – 뱀 머리 (방향 전환, 역방향 방지!)
- 🟢 \`Tail\` 클래스 – 꼬리 한 칸
- 📋 \`Tails\` 클래스 – 꼬리 전체 관리 (리스트!)
- 🐢 \`Food\` 클래스 – 랜덤 위치 먹이
- 📊 점수 + 최고 점수 시스템
- ⌨️ WASD 키보드 입력
- 🧱 벽 충돌 처리

**배운 개념:**
- \`class\`, \`__init__\`, \`self\`, 메서드
- \`import\` (모듈 = .py 파일)
- 게임 루프, 리스트 활용, 거리 계산

**도전 과제:** 🌟
- 뱀이 자기 꼬리에 부딪히면 리셋
- 게임 오버 화면 추가
- 속도를 점점 빠르게!
- 배경음악 추가 (pygame.mixer)`
        },
      ]
    },
  ]
}
