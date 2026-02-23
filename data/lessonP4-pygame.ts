// ============================================
// 프로젝트 4: Snake Game – pygame 버전
// VS Code에서 따라하면서 배우는 프로젝트
// 수업용: 퀴즈/미션 없이 설명만
// ============================================
import { LessonData } from './types'

export const lessonP4PygameData: LessonData = {
  id: "p4",
  title: "Snake Game 만들기 (pygame)",
  emoji: "🎮",
  description: "pygame, 클래스, 모듈로 Snake Game을 만들어요!",
  chapters: [
    // ============================================
    // Chapter 1: pygame 소개 + 화면 만들기
    // ============================================
    {
      id: "pg-ch1",
      title: "pygame 소개 + 화면 만들기",
      emoji: "🖥️",
      steps: [
        {
          id: "pg-ch1-0",
          type: "explain",
          title: "💭 pygame이 뭐예요?",
          content: `💭 turtle 말고 **더 강력한 게임 라이브러리**가 있다면? 이미지, 소리, FPS 제어까지?

Python에서 **게임을 만들기 위한 모듈**이에요!
turtle과 다르게, 이미지 출력, 소리 재생, 키보드/마우스 입력, 프레임 제어 등 게임에 필요한 기능을 모두 제공합니다.

**설치:**
\`\`\`python
pip install pygame
\`\`\`

@핵심: **pygame** = 게임 전용 라이브러리, turtle보다 더 많은 기능 (이미지, 소리, FPS 등)!`
        },
        {
          id: "pg-ch1-1",
          type: "explain",
          title: "💭 turtle과 pygame은 뭐가 다를까?",
          content: `💭 같은 스네이크 게임인데... **turtle과 pygame은 어떻게 다를까?**

| | turtle | pygame |
|---|---|---|
| 좌표 기준점 | 화면 **중앙** (0,0) | **왼쪽 상단** (0,0) |
| y축 방향 | 위쪽이 + | **아래쪽이 +** |
| 그리기 방식 | Turtle 객체가 스스로 그려짐 | **매 프레임 직접 그려야 함** |
| 키 입력 | \`onkeypress()\` | **이벤트 루프** |
| 속도 제어 | \`time.sleep()\` | \`Clock.tick(FPS)\` |
| 화면 갱신 | \`screen.update()\` | \`pygame.display.flip()\` |

@핵심: pygame은 **왼쪽 상단이 (0,0)**, 아래쪽이 +y! turtle과 좌표가 반대야!`
        },
        {
          id: "pg-ch1-2",
          type: "explain",
          title: "💭 pygame 화면은 어떻게 만들까?",
          content: `💭 600x600 크기의 검은색 게임 화면을 띄우려면?

📁 새 폴더 \`SnakeGame_pygame\`을 만들고, \`main.py\`를 만드세요.

\`\`\`python
import pygame
import sys

pygame.init()

WIDTH = 600
HEIGHT = 600
CELL_SIZE = 20    # 뱀, 먹이, 꼬리의 한 칸 크기

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Snake Game')
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`pygame.init()\` → pygame의 모든 기능을 초기화!
- \`CELL_SIZE = 20\` → 스네이크 게임은 격자 기반, 한 칸 크기를 정해둠
- \`set_mode((WIDTH, HEIGHT))\` → 화면 크기를 **튜플**로 설정
- \`set_caption()\` → 창 제목 설정

@핵심: **pygame.init()으로 초기화** → **set_mode()로 화면 생성** → **set_caption()으로 제목!**`
        },
        {
          id: "pg-ch1-3",
          type: "explain",
          title: "💭 색상은 어떻게 표현할까?",
          content: `💭 turtle에서는 \`'#cfe0e8'\` 같은 HTML 색상 코드를 썼는데... pygame에서는?

\`\`\`python
# pygame은 RGB 튜플로 색상 표현!
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 200, 0)
RED = (255, 0, 0)
\`\`\`

각 숫자는 0~255 범위의 **빨강(R), 초록(G), 파랑(B)** 값이에요.

- \`(0, 0, 0)\` → 검은색 (모든 빛 없음)
- \`(255, 255, 255)\` → 흰색 (모든 빛 최대)
- \`(0, 200, 0)\` → 초록색 (Green만 200)

@핵심: pygame에서 색은 **(R, G, B) 튜플**! 각 0~255 범위!`
        },
        {
          id: "pg-ch1-4",
          type: "explain",
          title: "💭 게임이 계속 돌아가게 하려면?",
          content: `💭 화면을 만들었는데 바로 닫혀버려! **계속 실행되는 루프**가 필요하지 않을까?

\`\`\`python
clock = pygame.time.Clock()
running = True

while running:
    # 1. 이벤트 처리
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 2. 화면 그리기
    screen.fill(BLACK)
    pygame.display.flip()

    # 3. 속도 조절
    clock.tick(10)

pygame.quit()
sys.exit()
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`clock = pygame.time.Clock()\` → 프레임 제어용 시계!
- \`while running:\` → 게임 루프! 매 프레임 실행
- \`pygame.event.get()\` → 이벤트(키보드, 마우스, 창닫기) 확인
- \`pygame.QUIT\` → 창 X 버튼 누르면 종료
- \`screen.fill(BLACK)\` → 화면 전체를 검은색으로 칠하기
- \`pygame.display.flip()\` → 화면 갱신!
- \`clock.tick(10)\` → **초당 10프레임** (스네이크에 적합한 속도)

💡 turtle에서는 \`tracer(0)\` + \`update()\`를 썼지만, pygame에서는 **매 프레임 화면 전체를 다시 그리는** 방식!

**실행해보세요!** 검은 배경의 600x600 창이 뜨면 성공!

@핵심: **while 루프 + event 처리 + fill + flip + tick** = pygame 게임 루프!`
        },
      ]
    },
    // ============================================
    // Chapter 2: 뱀 머리 – Head 클래스
    // ============================================
    {
      id: "pg-ch2",
      title: "뱀 머리 만들기 (Head)",
      emoji: "🟩",
      steps: [
        {
          id: "pg-ch2-0",
          type: "explain",
          title: "💭 pygame에서 Head 클래스는 뭐가 다를까?",
          content: `💭 turtle에서는 \`turtle.Turtle()\` 객체가 알아서 그려졌는데... pygame에서는?

**turtle 버전:** Turtle 객체가 위치와 모양을 다 관리
**pygame 버전:** 우리가 **x, y 좌표를 직접 관리**!

📁 같은 폴더에 \`snake.py\` 파일을 새로 만드세요!

\`\`\`python
import pygame

class Head:
    def __init__(self, x, y, size):
        self.x = x
        self.y = y
        self.size = size
        self.direction = 'stop'
\`\`\`

turtle 버전과 비교:
- turtle: \`self.a = turtle.Turtle()\` → 객체가 다 해줌
- pygame: \`self.x = x\`, \`self.y = y\` → **좌표를 직접 저장!**

@핵심: pygame Head는 **x, y 좌표를 직접 관리** — turtle처럼 객체가 알아서 안 해줘!`
        },
        {
          id: "pg-ch2-1",
          type: "explain",
          title: "💭 방향에 따라 이동하려면?",
          content: `💭 direction이 'right'이면 x를 20 늘리면 되지! 근데 **위로 갈 때 y를 빼야 한다고?**

Head 클래스에 이어서 추가:

\`\`\`python
    def move(self):
        if self.direction == 'right':
            self.x += self.size
        elif self.direction == 'left':
            self.x -= self.size
        elif self.direction == 'up':
            self.y -= self.size     # 위쪽이 y 감소!
        elif self.direction == 'down':
            self.y += self.size
\`\`\`

⚠️ **주의**: pygame의 y축은 turtle과 **반대**!
- 위로 가려면 y를 **빼야** 함
- 아래로 가려면 y를 **더해야** 함

@핵심: pygame은 **위 = y 감소, 아래 = y 증가** — turtle과 반대!`
        },
        {
          id: "pg-ch2-2",
          type: "explain",
          title: "💭 화면에 뱀을 어떻게 그릴까?",
          content: `💭 turtle은 객체가 자동으로 보였는데... pygame에서는 **직접 그려야** 한다면?

Head 클래스에 이어서 추가:

\`\`\`python
    def draw(self, screen, color):
        pygame.draw.rect(screen, color,
            (self.x, self.y, self.size, self.size))
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`pygame.draw.rect()\` → 화면에 **사각형**을 그려요!
- \`screen\` → 어디에 그릴지 (화면)
- \`color\` → 무슨 색으로 (RGB 튜플)
- \`(self.x, self.y, self.size, self.size)\` → **(x, y, 너비, 높이)**

turtle은 circle/square 모양을 선택했지만, pygame은 **직접 사각형을 그리는** 방식!

@핵심: **pygame.draw.rect(화면, 색, (x, y, 너비, 높이))**로 직접 그리기!`
        },
        {
          id: "pg-ch2-3",
          type: "explain",
          title: "💭 위치 확인 + 충돌 판정은?",
          content: `💭 먹이를 먹었는지 판정하려면 좌표를 알아야 하고... pygame만의 **충돌 판정 방법**이 있을까?

Head 클래스에 이어서 추가:

\`\`\`python
    def getX(self):
        return self.x

    def getY(self):
        return self.y

    def getRect(self):
        return pygame.Rect(self.x, self.y,
                          self.size, self.size)
\`\`\`

### getRect()가 특별한 이유!

- \`pygame.Rect\` = pygame이 제공하는 **사각형 객체**
- \`colliderect()\` 함수로 두 사각형이 **겹치는지** 쉽게 확인 가능!
- turtle에서는 \`distance() < 20\`으로 거리를 계산했지만, pygame에서는 **사각형 겹침으로 판단** → 더 정확!

@핵심: **pygame.Rect + colliderect()** = turtle의 distance()보다 더 정확한 충돌 판정!`
        },
        {
          id: "pg-ch2-4",
          type: "explain",
          title: "💭 main.py에서 뱀을 띄워보자!",
          content: `💭 Head 클래스를 만들었으니... main.py에서 **import해서 화면에 그려보자!**

main.py 수정:

\`\`\`python
import snake

# 뱀 머리 만들기 (화면 중앙)
head = snake.Head(WIDTH // 2, HEIGHT // 2, CELL_SIZE)
head.direction = 'right'    # 테스트용!
\`\`\`

게임 루프 안에서:

\`\`\`python
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    head.move()                    # 뱀 이동
    screen.fill(BLACK)             # 배경 칠하기
    head.draw(screen, GREEN)       # 뱀 그리기
    pygame.display.flip()          # 화면 갱신
    clock.tick(10)
\`\`\`

**실행해보세요!** 초록색 사각형이 오른쪽으로 계속 이동하면 성공!

@핵심: **move()로 이동 → fill()로 지우기 → draw()로 그리기 → flip()으로 갱신** = 매 프레임 반복!`
        },
      ]
    },
    // ============================================
    // Chapter 3: 키보드 입력
    // ============================================
    {
      id: "pg-ch3",
      title: "키보드로 뱀 움직이기",
      emoji: "⌨️",
      steps: [
        {
          id: "pg-ch3-0",
          type: "explain",
          title: "💭 방향키를 누르면 뱀이 움직이게 하려면?",
          content: `💭 turtle에서는 \`onkeypress()\`로 함수를 연결했는데... pygame에서는 **이벤트 루프에서 직접 확인**한다면?

snake.py의 Head 클래스에 추가:

\`\`\`python
    def go_up(self):
        if self.direction != 'down':
            self.direction = 'up'

    def go_down(self):
        if self.direction != 'up':
            self.direction = 'down'

    def go_left(self):
        if self.direction != 'right':
            self.direction = 'left'

    def go_right(self):
        if self.direction != 'left':
            self.direction = 'right'
\`\`\`

turtle 버전과 **동일한 로직**! 반대 방향으로는 꺾을 수 없어요.

@핵심: 방향 전환 로직은 turtle과 동일! **반대 방향 무시**로 자기 몸 뚫기 방지!`
        },
        {
          id: "pg-ch3-1",
          type: "explain",
          title: "💭 이벤트 루프에서 키를 어떻게 확인할까?",
          content: `💭 pygame에서는 키보드 입력도 **이벤트**로 처리한다면?

main.py 게임 루프의 이벤트 처리 부분을 수정:

\`\`\`python
for event in pygame.event.get():
    if event.type == pygame.QUIT:
        running = False

    if event.type == pygame.KEYDOWN:
        if event.key == pygame.K_UP:
            head.go_up()
        elif event.key == pygame.K_DOWN:
            head.go_down()
        elif event.key == pygame.K_LEFT:
            head.go_left()
        elif event.key == pygame.K_RIGHT:
            head.go_right()
\`\`\`

### turtle vs pygame 키 입력 비교

**turtle:**
\`\`\`python
screen.onkeypress(head.move_up, 'w')   # 함수를 연결!
\`\`\`

**pygame:**
\`\`\`python
if event.type == pygame.KEYDOWN:        # 이벤트 루프에서 직접!
    if event.key == pygame.K_UP:
        head.go_up()
\`\`\`

💡 \`KEYDOWN\`은 키가 눌린 순간만 감지! 스네이크 게임에 딱 맞아요.

그리고 테스트용 \`head.direction = 'right'\`은 삭제하세요!

@핵심: pygame은 **이벤트 루프 안에서 KEYDOWN**으로 키 입력을 처리!`
        },
      ]
    },
    // ============================================
    // Chapter 4: 먹이 – Food 클래스
    // ============================================
    {
      id: "pg-ch4",
      title: "먹이 만들기 (Food)",
      emoji: "🔴",
      steps: [
        {
          id: "pg-ch4-0",
          type: "explain",
          title: "💭 먹이 클래스를 어떻게 만들까?",
          content: `💭 먹이도 x, y 좌표로 관리하고 **사각형으로 그리면** 되지 않을까?

📁 같은 폴더에 \`food.py\`를 만드세요!

\`\`\`python
import pygame
import random

class Food:
    def __init__(self, size):
        self.size = size
        self.x = 0
        self.y = 0
\`\`\`

💡 turtle 버전에서는 \`turtle.Turtle()\` 객체를 만들었지만, pygame에서는 **좌표만 저장**하면 돼요!

@핵심: pygame Food 클래스는 **좌표만 관리** — turtle 객체 없이 깔끔!`
        },
        {
          id: "pg-ch4-1",
          type: "explain",
          title: "💭 먹이를 격자에 딱 맞게 랜덤 배치하려면?",
          content: `💭 뱀이 20px씩 움직이니까, 먹이도 **20의 배수 좌표**에 있어야 정확하게 먹을 수 있겠지?

Food 클래스에 이어서 추가:

\`\`\`python
    def goToRandom(self, max_w, max_h):
        # CELL_SIZE의 배수로 위치를 정해야 격자에 딱 맞음
        self.x = random.randint(0, (max_w - self.size) // self.size) * self.size
        self.y = random.randint(0, (max_h - self.size) // self.size) * self.size

    def draw(self, screen, color):
        pygame.draw.rect(screen, color,
            (self.x, self.y, self.size, self.size))

    def getRect(self):
        return pygame.Rect(self.x, self.y,
                          self.size, self.size)
\`\`\`

### 왜 CELL_SIZE의 배수?

- 뱀이 (0, 20, 40, 60, ...) 좌표에서만 이동
- 먹이도 같은 격자에 있어야 정확히 겹침!
- \`randint(...) * self.size\` → **항상 20의 배수!**

@핵심: **randint() × CELL_SIZE** = 격자에 딱 맞는 랜덤 좌표!`
        },
        {
          id: "pg-ch4-2",
          type: "explain",
          title: "💭 뱀이 먹이를 먹었는지 어떻게 알까?",
          content: `💭 두 사각형이 **겹치면** 먹은 거로 판정! turtle의 distance()보다 더 정확!

main.py에서 먹이 생성 + 충돌 확인:

\`\`\`python
import food

myFood = food.Food(CELL_SIZE)
myFood.goToRandom(WIDTH, HEIGHT)
\`\`\`

게임 루프에서 충돌 확인:

\`\`\`python
    # 뱀 머리와 먹이가 겹치면 먹은 것!
    if head.getRect().colliderect(myFood.getRect()):
        myFood.goToRandom(WIDTH, HEIGHT)
\`\`\`

그리기 부분에 먹이 추가:

\`\`\`python
    screen.fill(BLACK)
    head.draw(screen, GREEN)
    myFood.draw(screen, RED)      # 먹이 그리기!
    pygame.display.flip()
\`\`\`

💡 \`colliderect()\`는 pygame이 제공하는 충돌 판정 함수!
turtle에서는 \`distance() < 20\`이었지만, pygame에서는 **사각형 겹침**으로 판단!

@핵심: **colliderect()** = 두 Rect가 겹치는지 확인하는 pygame 내장 충돌 판정!`
        },
      ]
    },
    // ============================================
    // Chapter 5: 꼬리 – Tail & Tails 클래스
    // ============================================
    {
      id: "pg-ch5",
      title: "꼬리 만들기 (Tail & Tails)",
      emoji: "🟢",
      steps: [
        {
          id: "pg-ch5-0",
          type: "explain",
          title: "💭 pygame에서 꼬리가 더 쉬운 이유?",
          content: `💭 turtle에서는 \`hideturtle()\`, \`showturtle()\` 순서를 지켜야 했는데... pygame에서는?

**turtle 버전**: 꼬리 이동 시 숨기고 → 이동하고 → 다시 보여야 함 (안 하면 깜빡임!)
**pygame 버전**: 매 프레임 화면을 새로 그리니까 **좌표만 바꾸면 끝!**

📁 같은 폴더에 \`tail.py\`를 만드세요!

\`\`\`python
import pygame

class Tail:
    def __init__(self, x, y, size):
        self.x = x
        self.y = y
        self.size = size

    def goto(self, x, y):
        self.x = x
        self.y = y

    def getX(self):
        return self.x

    def getY(self):
        return self.y

    def draw(self, screen, color):
        pygame.draw.rect(screen, color,
            (self.x, self.y, self.size, self.size))
\`\`\`

turtle 버전보다 훨씬 간단! 그냥 x, y 좌표만 저장하면 돼요.

@핵심: pygame Tail은 **좌표만 관리** — turtle처럼 hideturtle 신경 안 써도 돼!`
        },
        {
          id: "pg-ch5-1",
          type: "explain",
          title: "💭 꼬리 전체를 관리하는 Tails 클래스는?",
          content: `💭 turtle 버전과 같은 원리! 리스트로 Tail을 관리하고 **뒤에서부터 따라오게**!

tail.py에 이어서 추가:

\`\`\`python
class Tails:
    def __init__(self):
        self.tails = []

    def addTail(self, t):
        self.tails.append(t)

    def followHead(self, x, y):
        for i in range(len(self.tails) - 1, 0, -1):
            t = self.tails[i]
            front = self.tails[i - 1]
            t.goto(front.getX(), front.getY())
        if len(self.tails) > 0:
            self.tails[0].goto(x, y)

    def drawAll(self, screen, color):
        for t in self.tails:
            t.draw(screen, color)

    def clear(self):
        self.tails.clear()
\`\`\`

### turtle 버전과의 차이

- **followHead**: 동일한 로직! 뒤에서부터 앞으로 이동
- **drawAll**: pygame 전용! 꼬리 전부를 한꺼번에 그림
- **clear**: turtle은 화면 밖으로 보내야 했지만 (goto(100만, 100만)), pygame은 **리스트만 비우면 끝!** 다음 프레임에 안 그려지니까!

@핵심: pygame Tails의 clear()는 **리스트만 비우면 자동으로 사라짐!** turtle보다 깔끔!`
        },
        {
          id: "pg-ch5-2",
          type: "explain",
          title: "💭 main.py에서 꼬리를 연결하면?",
          content: `💭 먹이를 먹으면 꼬리 추가, 이동 순서도 중요! **followHead는 move 전에!**

main.py에 추가:

\`\`\`python
import tail

LIGHT_GREEN = (144, 238, 144)
tails = tail.Tails()
\`\`\`

먹이 먹을 때 꼬리 추가:

\`\`\`python
    if head.getRect().colliderect(myFood.getRect()):
        myFood.goToRandom(WIDTH, HEIGHT)
        newTail = tail.Tail(head.getX(), head.getY(), CELL_SIZE)
        tails.addTail(newTail)
\`\`\`

게임 루프 이동 순서:

\`\`\`python
    # 순서 중요!
    tails.followHead(head.getX(), head.getY())  # 1. 꼬리가 머리 위치로
    head.move()                                  # 2. 그 다음 머리 이동
\`\`\`

그리기:

\`\`\`python
    screen.fill(BLACK)
    tails.drawAll(screen, LIGHT_GREEN)  # 꼬리 먼저
    head.draw(screen, GREEN)            # 머리는 나중에 (위에 그려짐)
    myFood.draw(screen, RED)
    pygame.display.flip()
\`\`\`

⚠️ **followHead()는 head.move() 전에!** 머리 이동 전 좌표로 따라와야 자연스러워요.

@핵심: **followHead → move 순서** + 그리기는 **꼬리 먼저, 머리 나중에**!`
        },
      ]
    },
    // ============================================
    // Chapter 6: 벽 충돌 + 점수
    // ============================================
    {
      id: "pg-ch6",
      title: "벽 충돌 & 점수판",
      emoji: "🏆",
      steps: [
        {
          id: "pg-ch6-0",
          type: "explain",
          title: "💭 벽 밖으로 나갔는지 어떻게 알까?",
          content: `💭 pygame 좌표는 0부터 시작이니까... 벽 충돌 조건이 turtle과 **다르겠지?**

게임 루프에 추가:

\`\`\`python
    hx = head.getX()
    hy = head.getY()

    if hx < 0 or hx >= WIDTH or hy < 0 or hy >= HEIGHT:
        head.x = WIDTH // 2
        head.y = HEIGHT // 2
        head.direction = 'stop'
        tails.clear()
        score = 0
\`\`\`

### turtle vs pygame 벽 충돌 비교

**turtle** (중앙이 0,0):
\`\`\`python
if hx < -halfW or hx > halfW    # -300 ~ +300
\`\`\`

**pygame** (왼쪽상단이 0,0):
\`\`\`python
if hx < 0 or hx >= WIDTH        # 0 ~ 599
\`\`\`

좌표 체계가 다르니까 충돌 조건도 달라요!

@핵심: pygame 벽 충돌은 **0 ~ WIDTH/HEIGHT** 범위! turtle의 -halfW~+halfW와 다름!`
        },
        {
          id: "pg-ch6-1",
          type: "explain",
          title: "💭 화면에 점수를 어떻게 표시할까?",
          content: `💭 turtle에서는 \`pen.write()\`로 글자를 썼는데... pygame에서는 **글자를 이미지로 만들어서 붙이는** 방식이라면?

main.py에 추가:

\`\`\`python
font = pygame.font.SysFont('candara', 30)
score = 0
high_score = 0

def drawScore(screen, score, high_score):
    text = font.render(
        f'Score: {score}  High Score: {high_score}',
        True, WHITE)
    screen.blit(text,
        (WIDTH // 2 - text.get_width() // 2, 10))
\`\`\`

### 한 줄 한 줄 뜯어보기!

- \`font.render()\` → 문자열을 **이미지(Surface)**로 변환!
- \`True\` → 안티앨리어싱 (글자 부드럽게)
- \`screen.blit()\` → 그 이미지를 **화면에 붙이기!**
- \`text.get_width() // 2\` → 가운데 정렬용 계산

turtle에서는 \`pen.write()\` 한 줄이면 됐지만, pygame에서는 **render → blit** 2단계!

@핵심: pygame 글자 = **font.render()로 이미지 만들기 → blit()으로 화면에 붙이기!**`
        },
        {
          id: "pg-ch6-2",
          type: "explain",
          title: "💭 점수 처리를 게임 루프에 연결하면?",
          content: `💭 먹이 먹으면 +10, 벽 충돌이면 리셋! **drawScore를 화면에 추가**하면 완성!

먹이 먹을 때:

\`\`\`python
    if head.getRect().colliderect(myFood.getRect()):
        myFood.goToRandom(WIDTH, HEIGHT)
        newTail = tail.Tail(head.getX(), head.getY(), CELL_SIZE)
        tails.addTail(newTail)
        score += 10
        if score > high_score:
            high_score = score
\`\`\`

화면 그리기에 점수 추가:

\`\`\`python
    screen.fill(BLACK)
    tails.drawAll(screen, LIGHT_GREEN)
    head.draw(screen, GREEN)
    myFood.draw(screen, RED)
    drawScore(screen, score, high_score)   # 점수!
    pygame.display.flip()
\`\`\`

@핵심: 먹이 먹으면 **score += 10**, 벽 충돌이면 **score = 0** (high_score는 유지!)!`
        },
      ]
    },
    // ============================================
    // Chapter 7: 게임 완성!
    // ============================================
    {
      id: "pg-ch7",
      title: "게임 완성하기!",
      emoji: "🎮",
      steps: [
        {
          id: "pg-ch7-0",
          type: "explain",
          title: "💭 snake.py 완성 코드",
          content: `💭 Head 클래스의 **완성된 모습**을 확인해볼까?

\`\`\`python
import pygame

class Head:
    def __init__(self, x, y, size):
        self.x = x
        self.y = y
        self.size = size
        self.direction = 'stop'

    def move(self):
        if self.direction == 'right':
            self.x += self.size
        elif self.direction == 'left':
            self.x -= self.size
        elif self.direction == 'up':
            self.y -= self.size
        elif self.direction == 'down':
            self.y += self.size

    def go_up(self):
        if self.direction != 'down':
            self.direction = 'up'

    def go_down(self):
        if self.direction != 'up':
            self.direction = 'down'

    def go_left(self):
        if self.direction != 'right':
            self.direction = 'left'

    def go_right(self):
        if self.direction != 'left':
            self.direction = 'right'

    def draw(self, screen, color):
        pygame.draw.rect(screen, color,
            (self.x, self.y, self.size, self.size))

    def getX(self):
        return self.x

    def getY(self):
        return self.y

    def getRect(self):
        return pygame.Rect(self.x, self.y,
                          self.size, self.size)
\`\`\`

@핵심: snake.py에는 **Head 클래스** — 좌표 관리, 이동, 방향 전환, 그리기, 충돌 판정!`
        },
        {
          id: "pg-ch7-1",
          type: "explain",
          title: "💭 food.py + tail.py 완성 코드",
          content: `💭 먹이와 꼬리 파일도 확인!

**food.py:**
\`\`\`python
import pygame
import random

class Food:
    def __init__(self, size):
        self.size = size
        self.x = 0
        self.y = 0

    def goToRandom(self, max_w, max_h):
        self.x = random.randint(0, (max_w - self.size) // self.size) * self.size
        self.y = random.randint(0, (max_h - self.size) // self.size) * self.size

    def draw(self, screen, color):
        pygame.draw.rect(screen, color, (self.x, self.y, self.size, self.size))

    def getRect(self):
        return pygame.Rect(self.x, self.y, self.size, self.size)
\`\`\`

**tail.py:**
\`\`\`python
import pygame

class Tail:
    def __init__(self, x, y, size):
        self.x = x
        self.y = y
        self.size = size

    def goto(self, x, y):
        self.x = x
        self.y = y

    def getX(self):
        return self.x

    def getY(self):
        return self.y

    def draw(self, screen, color):
        pygame.draw.rect(screen, color, (self.x, self.y, self.size, self.size))

class Tails:
    def __init__(self):
        self.tails = []

    def addTail(self, t):
        self.tails.append(t)

    def clear(self):
        self.tails.clear()

    def followHead(self, x, y):
        for i in range(len(self.tails) - 1, 0, -1):
            t = self.tails[i]
            front = self.tails[i - 1]
            t.goto(front.getX(), front.getY())
        if len(self.tails) > 0:
            self.tails[0].goto(x, y)

    def drawAll(self, screen, color):
        for t in self.tails:
            t.draw(screen, color)
\`\`\`

@핵심: **4개 파일** — snake.py(Head), food.py(Food), tail.py(Tail+Tails), main.py(총괄)!`
        },
        {
          id: "pg-ch7-2",
          type: "explain",
          title: "💭 main.py 완성 코드!",
          content: `💭 모든 걸 합친 **main.py 최종본!** 실행해보세요!

\`\`\`python
import pygame
import sys
import snake
import food
import tail

pygame.init()

WIDTH = 600
HEIGHT = 600
CELL_SIZE = 20

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 200, 0)
LIGHT_GREEN = (144, 238, 144)
RED = (255, 0, 0)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Snake Game')
clock = pygame.time.Clock()
font = pygame.font.SysFont('candara', 30)

head = snake.Head(WIDTH // 2, HEIGHT // 2, CELL_SIZE)
myFood = food.Food(CELL_SIZE)
myFood.goToRandom(WIDTH, HEIGHT)
tails = tail.Tails()

score = 0
high_score = 0

def drawScore(screen, score, high_score):
    text = font.render(f'Score: {score}  High Score: {high_score}', True, WHITE)
    screen.blit(text, (WIDTH // 2 - text.get_width() // 2, 10))

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP:
                head.go_up()
            elif event.key == pygame.K_DOWN:
                head.go_down()
            elif event.key == pygame.K_LEFT:
                head.go_left()
            elif event.key == pygame.K_RIGHT:
                head.go_right()

    tails.followHead(head.getX(), head.getY())
    head.move()

    if head.getRect().colliderect(myFood.getRect()):
        myFood.goToRandom(WIDTH, HEIGHT)
        newTail = tail.Tail(head.getX(), head.getY(), CELL_SIZE)
        tails.addTail(newTail)
        score += 10
        if score > high_score:
            high_score = score

    hx = head.getX()
    hy = head.getY()
    if hx < 0 or hx >= WIDTH or hy < 0 or hy >= HEIGHT:
        head.x = WIDTH // 2
        head.y = HEIGHT // 2
        head.direction = 'stop'
        tails.clear()
        score = 0

    screen.fill(BLACK)
    tails.drawAll(screen, LIGHT_GREEN)
    head.draw(screen, GREEN)
    myFood.draw(screen, RED)
    drawScore(screen, score, high_score)
    pygame.display.flip()
    clock.tick(10)

pygame.quit()
sys.exit()
\`\`\`

@핵심: main.py는 **화면 + 입력 + 이동 + 충돌 + 점수 + 그리기**를 합친 총괄 감독 파일!`
        },
        {
          id: "pg-ch7-3",
          type: "explain",
          title: "🎉 축하합니다! pygame 스네이크 완성!",
          content: `**VS Code에서 main.py를 실행해보세요!**

## turtle vs pygame 최종 비교

| | turtle 버전 | pygame 버전 |
|---|---|---|
| 그리기 | Turtle 객체가 스스로 그려짐 | **매 프레임 직접 그림** |
| 좌표 | 중앙이 (0,0), 위쪽 +y | **왼쪽상단이 (0,0), 아래쪽 +y** |
| 충돌 | \`distance()\` 거리 계산 | **\`colliderect()\` 사각형 겹침** |
| 화면 갱신 | \`tracer(0)\` + \`update()\` | **\`fill()\` + \`flip()\`** |
| 꼬리 삭제 | goto(100만, 100만)으로 숨김 | **리스트 clear()만 하면 끝** |
| 글자 | \`pen.write()\` | **\`font.render()\` + \`blit()\`** |
| 키 입력 | \`onkeypress()\` | **이벤트 루프 KEYDOWN** |
| 종료 | \`mainloop()\` | **\`pygame.quit()\` + \`sys.exit()\`** |

**배운 개념:**
- pygame 초기화, 화면, 색상 (RGB)
- 게임 루프 (이벤트 → 로직 → 그리기)
- 클래스로 뱀/먹이/꼬리 관리
- 모듈로 파일 나누기
- 충돌 판정 (colliderect)
- 프레임 제어 (Clock.tick)

@핵심: **같은 게임, 다른 도구!** turtle은 간편하고, pygame은 더 강력해!`
        },
      ]
    },
  ]
}
