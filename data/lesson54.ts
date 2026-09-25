// ============================================
// 레슨 54: 3차원 리스트
// ============================================
import { LessonData } from './types'

export const lesson54Data: LessonData = {
  id: "54",
  title: "3차원 리스트",
  emoji: "🧊",
  description: "리스트가 또 층으로 쌓이면? 그리고 축이 꼭 '자리'가 아니어도 돼요!",
  chapters: [
    {
      id: "ch1",
      title: "리스트 세 겹",
      emoji: "📦",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `📦 오늘 배울 것 — 리스트 세 겹`,
          content: `이번 레슨에서 배울 것 네 가지예요.

1️⃣ **리스트 세 겹** — 표가 여러 장 쌓이면 층까지 생겨요
2️⃣ **만들기** — 53과 똑같은 함정이 한 겹 더 있어요
3️⃣ **축이 공간이 아닐 수도 있어요** — 층·행·칸 말고 다른 뜻의 축도 있어요
4️⃣ **다 함께 훑기** — for를 세 번 겹쳐서 칸을 전부 훑기`,
        },
        {
          id: "review-board",
          type: "explain",
          title: `📋 53 복습 — board, 기억나죠?`,
          content: `53과에서 만든 board, 기억나죠?

\`\`\`python
board = [[0, 0, 0],
         [0, 0, 0]]
\`\`\`

행과 열로 만든 표 하나였어요.

그런데 이 표가 여러 장 있으면 어떨까요? 예를 들어 반마다 성적표가 필요하면, 표를 여러 장 쌓아야 해요.

\`\`\`python
board1 = [[0, 0, 0], [0, 0, 0]]   # 1층 — 1반 성적표
board2 = [[1, 0, 1], [0, 1, 0]]   # 2층 — 2반 성적표
\`\`\`

이 두 표를 하나로 묶어서 층처럼 쌓으면 어떻게 될까요?`,
        },
        {
          id: "try-floors-first-floor",
          type: "tryit",
          title: `🖥️ 층 하나 통째로 꺼내보기`,
          task: `floors 에서 1층 표를 통째로 출력하세요!`,
          initialCode: `board1 = [[0, 0, 0], [0, 0, 0]]   # 1층
board2 = [[1, 0, 1], [0, 1, 0]]   # 2층
floors = [board1, board2]

print(floors[___])`,
          expectedOutput: "[[0, 0, 0], [0, 0, 0]]",
          hint: `1층 = 인덱스 0.`,
          hint2: `0`,
        },
        {
          id: "try-floors-cell",
          type: "tryit",
          title: `🖥️ 층 속 칸 하나 꺼내보기`,
          task: `1층의 2번째 행, 3번째 칸 값을 출력하세요!`,
          initialCode: `board1 = [[0, 0, 0], [0, 0, 0]]   # 1층
board2 = [[1, 0, 1], [0, 1, 0]]   # 2층
floors = [board1, board2]

print(floors[0][___][___])`,
          expectedOutput: "0",
          hint: `2번째 행 = 인덱스 1. 3번째 칸 = 인덱스 2.`,
          hint2: `1 / 2`,
        },
        {
          id: "predict-floor-cell-meaning",
          type: "predict",
          title: `💭 floors[1][0][2] 는 몇 층 몇 행 몇 칸일까요?`,
          content: `floors[1][0][2] 가 가리키는 게 몇 층, 몇 번째 행, 몇 번째 칸인지 골라보세요. (인덱스는 0부터예요!)`,
          options: ["1층의 1행 1칸", "2층의 1행 3칸", "2층의 3행 1칸", "1층의 3행 2칸"],
          answer: 1,
          explanation: "인덱스는 0부터 세니까, floors[1] 은 2층(두 번째 표), 그 안의 [0] 은 1행(첫 번째 줄), 그 안의 [2] 는 3칸(세 번째 칸)이에요.",
        },
        {
          id: "interactive-floor-explore",
          type: "interactive",
          title: `🎮 층을 넘기며 살펴보기`,
          description: `◀▶ 로 층을 옮기고, 아무 칸이나 눌러보세요.`,
          component: "py3dFloorExplore",
        },
        {
          id: "name-3d-list",
          type: "explain",
          title: `📛 이름 붙이기 — 3차원 리스트`,
          content: `지금까지 만든 floors 처럼, **2차원 리스트가 또 리스트 안에 여러 장 들어있는 것**을 3차원 리스트라고 불러요.

- **층** — floors[1] 처럼 인덱스 하나로 표 한 장을 통째로 꺼내요.
- **행** — floors[1][0] 처럼 그 표 안의 한 줄을 꺼내요.
- **칸** — floors[1][0][2] 처럼 그 줄 안의 칸 하나를 꺼내요.

층·행·칸처럼 대괄호 하나하나가 고르는 기준을 **축**이라고 불러요. floors 는 축이 세 개예요.

**정리:** 대괄호 세 번 — 층, 행, 칸. 53에서 배운 대괄호 두 번에 한 겹만 더 붙은 거예요.`,
        }
      ]
    },
    {
      id: "ch2",
      title: "만들기",
      emoji: "🧱",
      steps: [
        {
          id: "recall-2d-trap",
          type: "explain",
          title: `🔁 기억 불러오기 — 53의 함정`,
          content: `53에서 이렇게 만들면 안 된다고 배웠죠?

\`\`\`python
board = [[0] * n] * m   # ❌ 가로줄 m개가 전부 같은 리스트를 가리켜요
\`\`\`

3차원도 똑같은 함정이 있어요. 한 겹 더 쌓였을 뿐이에요.`,
        },
        {
          id: "try-3d-mult-trap",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 한 칸만 바꿔볼게요`,
          task: `빈칸을 채워서 floors 를 만들고, floors[0][0][0] 을 9로 바꾼 뒤 출력해보세요!`,
          initialCode: `floors = [[[0] * 3] * 2] * ___
floors[0][0][0] = 9
print(floors)`,
          expectedOutput: "[[[9, 0, 0], [9, 0, 0]], [[9, 0, 0], [9, 0, 0]]]",
          hint: `층 2개니까 2.`,
          hint2: `2`,
        },
        {
          id: "predict-3d-why-all-changed",
          type: "predict",
          title: `💭 분명 floors[0][0][0] 만 바꿨는데?`,
          content: `floors[0][0][0] 딱 하나만 9로 바꿨는데, 왜 다른 층·다른 행까지 전부 9로 바뀌었을까요?`,
          options: ["* 로 겹겹이 반복하면 안쪽부터 바깥까지 전부 같은 리스트 하나를 가리키게 돼서", "파이썬이 층과 행을 자동으로 똑같이 맞춰줘서"],
          answer: 0,
          explanation: "[[0]*3]*2 를 만들 때 이미 행 두 개가 같은 리스트를 가리켰고, 그걸 다시 *2 로 층까지 반복하면 층 두 개도 같은 걸 가리켜요. 그래서 한 칸만 바꿔도 층·행 전부에 그대로 나타나요.",
        },
        {
          id: "explain-3d-comprehension-fix",
          type: "explain",
          title: `🎨 3중 컴프리헨션 — 올바르게 만들기`,
          content: `53에서 배운 컴프리헨션을 한 겹 더 겹치면 돼요.

\`\`\`python
# ❌ 이렇게 만들면 안 돼요
floors = [[[0] * n] * m] * k

# ✅ 이렇게 만들어요 — range() 를 세 번
floors = [[[0] * n for _ in range(m)] for _ in range(k)]
\`\`\`

안쪽부터 칸(n), 행(m), 층(k) 순서예요.`,
        },
        {
          id: "try-3d-comprehension-fix",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 이번엔 안 옮아요`,
          task: `빈칸을 채워 floors 를 만들고, floors[0][0][0] 을 9로 바꿔도 한 칸만 바뀌는지 확인하세요!`,
          initialCode: `floors = [[[0] * 3 for _ in range(2)] for _ in range(___)]
floors[0][0][0] = 9
print(floors)`,
          expectedOutput: "[[[9, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0]]]",
          hint: `층 2개.`,
          hint2: `2`,
        },
        {
          id: "mission-build-3d-board",
          type: "mission",
          title: `🏆 미션 — 2층 3행 4칸 보드 만들기`,
          task: `층 2개, 행 3개, 칸 4개짜리 3차원 리스트를 만들고, 전부 '.' 으로 채워서 출력하세요! (컴프리헨션 방법으로)`,
          initialCode: `floors = [[['.'] * ___ for _ in range(___)] for _ in range(___)]
print(floors)`,
          expectedOutput: "[[['.', '.', '.', '.'], ['.', '.', '.', '.'], ['.', '.', '.', '.']], [['.', '.', '.', '.'], ['.', '.', '.', '.'], ['.', '.', '.', '.']]]",
          hint: `안쪽부터 칸, 행, 층 개수예요.`,
          hint2: `4 / 3 / 2`,
        }
      ]
    },
    {
      id: "ch3",
      title: "축이 공간이 아닐 수도 있어요",
      emoji: "🧭",
      steps: [
        {
          id: "explain-axis-not-space-intro",
          type: "explain",
          title: `🧭 지금까지 축은 전부 '어디' 였어요`,
          content: `층, 행, 칸 — 지금까지 만든 축 세 개는 전부 **'어디 있나'**를 나타냈어요. 표 안에서의 위치였죠.

그런데 축이 꼭 위치여야 할까요? 다른 뜻으로도 쓸 수 있을까요?`,
        },
        {
          id: "explain-state-axis-table",
          type: "explain",
          title: `📊 ways[행][열][지금까지 쓴 개수]`,
          content: `이런 3차원 리스트가 있다고 해봐요.

\`\`\`python
ways = [
    [[1, 0], [2, 1]],
    [[3, 1], [0, 2]],
]
\`\`\`

여기서 앞의 두 축(행, 열)은 지금까지처럼 '어디'예요. 그런데 **세 번째 축은 '아이템을 지금까지 몇 개 썼는지'**를 나타내요. 위치가 아니라 **지금까지 어떻게 했는지**를 저장하는 칸이에요.

- ways[0][1][0] — 0행 1열, 아직 0개 썼을 때
- ways[0][1][1] — 0행 1열, 지금까지 1개 썼을 때

행·열은 똑같은데, 세 번째 숫자만 다르면 완전히 다른 값이 나와요.`,
        },
        {
          id: "try-ways-lookup",
          type: "tryit",
          title: `🖥️ 표에서 값 하나 꺼내기`,
          task: `0행 1열, 지금까지 0개 썼을 때의 값을 출력하세요!`,
          initialCode: `ways = [
    [[1, 0], [2, 1]],
    [[3, 1], [0, 2]],
]

print(ways[0][___][0])`,
          expectedOutput: "2",
          hint: `0행 1열이니까 두 번째 대괄호는 1.`,
          hint2: `1`,
        },
        {
          id: "predict-state-axis-trap",
          type: "predict",
          title: `💭 ways[1][0][1] 은 무슨 뜻일까요?`,
          content: `ways[1][0][1] 이 무슨 뜻인지 골라보세요.`,
          options: ["1행 0열에 아이템이 1개 놓여 있을 때", "1행 0열인데, 지금까지 아이템을 1개 썼을 때"],
          answer: 1,
          explanation: "세 번째 축은 '어디'가 아니라 '지금까지 어떻게 했는지'예요. 그러니까 '아이템이 1개 있다'가 아니라 '아이템을 1개 썼다' 가 맞아요.",
        },
        {
          id: "interactive-state-toggle",
          type: "interactive",
          title: `🎮 위치는 그대로, 상태만 바꿔보기`,
          description: `위치(행, 열)를 고르고, k 탭을 눌러 값이 어떻게 바뀌는지 보세요.`,
          component: "py3dStateToggle",
        },
        {
          id: "predict-state-axis-range",
          type: "predict",
          title: `💭 k 축은 몇 가지 값을 가질 수 있을까요?`,
          content: `아이템이 총 1개뿐이라면, '지금까지 쓴 개수'가 가질 수 있는 값은 몇 가지일까요?`,
          options: ["1가지 (0만)", "2가지 (0 또는 1)", "3가지 (0, 1, 2)", "정해져 있지 않다"],
          answer: 1,
          explanation: "아이템이 1개면 쓴 개수는 0개 아니면 1개, 딱 두 가지뿐이에요. 그래서 이 축도 크기를 정해줘야 해요 — range(2) 처럼요.",
        },
        {
          id: "mission-fill-ways-table",
          type: "mission",
          title: `🏆 미션 — 표 채우기`,
          task: `행 2개, 열 2개, 상태 2개짜리 표를 만들고 전부 0으로 채운 뒤, 1행 1열의 0번째 상태만 5로 바꿔서 출력하세요!`,
          initialCode: `ways = [[[0] * 2 for _ in range(2)] for _ in range(___)]
ways[1][1][0] = 5
print(ways)`,
          expectedOutput: "[[[0, 0], [0, 0]], [[0, 0], [5, 0]]]",
          hint: `행 2개니까 2.`,
          hint2: `2`,
        }
      ]
    },
    {
      id: "ch4",
      title: "다 함께 훑기",
      emoji: "🚶",
      steps: [
        {
          id: "explain-triple-for",
          type: "explain",
          title: `🔄 for 를 세 번 겹쳐서`,
          content: `축이 세 개면 for 도 세 번 겹치면 돼요.

\`\`\`python
for f in range(len(floors)):
    for r in range(len(floors[f])):
        for c in range(len(floors[f][r])):
            print(floors[f][r][c])
\`\`\`

바깥부터 층 → 행 → 칸 순서예요. 53에서 배운 이중 for 에 한 겹만 더 붙었어요.`,
        },
        {
          id: "predict-triple-for-count",
          type: "predict",
          title: `💭 층2 행3 칸4 면 print 는 총 몇 번?`,
          content: `층 2개, 각 층마다 행 3개, 각 행마다 칸 4개짜리 리스트를 삼중 for 로 돌면, print 는 총 몇 번 실행될까요?`,
          options: ["9번 (2+3+4)", "24번 (2×3×4)", "12번 (3×4)", "20번"],
          answer: 1,
          explanation: "층 2번 돌 때마다 행 3번씩, 행마다 칸 4번씩 도니까 2 × 3 × 4 = 24번이에요. 더하기가 아니라 곱하기예요.",
        },
        {
          id: "try-triple-for-fill",
          type: "tryit",
          title: `🖥️ 삼중 for 채우기 — 전체 합`,
          task: `빈칸을 채워서 floors 안 모든 칸의 합을 구하세요!`,
          initialCode: `floors = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]

count = 0
for f in range(len(floors)):
    for r in range(len(floors[f])):
        for c in range(len(___)):
            count += floors[f][r][c]

print(count)`,
          expectedOutput: "36",
          hint: `안쪽 range 는 지금 행의 길이 — floors[f][r].`,
          hint2: `floors[f][r]`,
        },
        {
          id: "mission-count-condition",
          type: "mission",
          title: `🏆 최종 미션 — 조건 맞는 칸 개수 세기`,
          task: `floors 에서 값이 5 이상인 칸이 몇 개인지 세어보세요!`,
          initialCode: `floors = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
count = 0

for f in range(len(floors)):
    for r in range(len(floors[f])):
        for c in range(len(floors[f][r])):
            if floors[f][r][c] ___ 5:
                count += 1

print(count)`,
          expectedOutput: "4",
          hint: `5 이상이면 세어요.`,
          hint2: `>=`,
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 완료!`,
          content: `## 오늘 배운 것

✅ **3차원 리스트** — 리스트 안에 2차원 리스트가 여러 장, 층·행·칸
✅ **만들기** — \`[[[0]*n for _ in range(m)] for _ in range(k)]\` (❌ \`[[[0]*n]*m]*k\` 아님!)
✅ **축이 공간이 아닐 수도 있어요** — 세 번째 축이 '지금까지 어떻게 했는지'를 담을 수도 있어요
✅ **다 함께 훑기** — 삼중 for 로 층 → 행 → 칸까지

축이 4개, 5개로 늘어도 방법은 똑같아요. 다음 문제(치즈, 집으로 가는 길)에서 바로 써먹어요!`,
        }
      ]
    }
  ]
}
