// ============================================
// 레슨 53: 2차원 리스트
// ============================================
import { LessonData } from './types'

export const lesson53Data: LessonData = {
  id: "53",
  title: "2차원 리스트",
  emoji: "🧩",
  description: "리스트 속의 리스트 — 표처럼 생긴 데이터를 다뤄요!",
  chapters: [
    {
      id: "ch1",
      title: "리스트 안에 리스트",
      emoji: "📋",
      steps: [
        {
          id: "lesson-intro",
          type: "explain",
          title: `🧩 오늘 배울 것 — 리스트 속 리스트`,
          content: `이번 레슨에서 배울 것 네 가지예요.

1️⃣ **리스트 안에 리스트** — 학생 여러 명의 출석 기록을 한 번에 담기
2️⃣ **만들기** — 잘못 만들면 생기는 함정 피하기
3️⃣ **순회하기** — for 를 두 번 겹쳐서 칸을 전부 훑기
4️⃣ **통째로 바꾸기** — 한 줄로 새 2차원 리스트 만들기`
        },
        {
          id: "review-three-vars",
          type: "explain",
          title: `📋 출석부, 세 명`,
          content: `16 과에서 출석을 리스트 하나로 적었죠.

\`\`\`python
att = [1, 1, 0, 1, 1]   # 1 = 출석, 0 = 결석
\`\`\`

이제 학생이 세 명이면? 리스트를 세 개 만들면 돼요.

\`\`\`python
att1 = [1, 1, 0, 1, 1]   # 민지
att2 = [1, 0, 1, 1, 1]   # 서준
att3 = [0, 1, 1, 0, 1]   # 하은

print(att2)
\`\`\`

아직은 괜찮아요. 변수 세 개로 그냥 넘어가면 되니까요.`
        },
        {
          id: "try-att2-index",
          type: "tryit",
          title: `🖥️ 직접 해보기!`,
          task: `att2 의 두 번째 값(인덱스 1)을 출력하세요!`,
          initialCode: `att1 = [1, 1, 0, 1, 1]
att2 = [1, 0, 1, 1, 1]
att3 = [0, 1, 1, 0, 1]

print(att2[___])`,
          expectedOutput: "0",
          hint: `인덱스는 0 부터 시작해요. 두 번째 값 = 인덱스 1.`,
          hint2: `1`
        },
        {
          id: "predict-thirty-students",
          type: "predict",
          title: `💭 그런데 30 명이면?`,
          content: `학생이 30 명이면 att1, att2, att3, ... att30 까지 변수를 30 개 만들어야 해요. 이 30 개를 for 문으로 한 번에 훑을 수 있을까요?`,
          options: ["네, for 문이 변수 이름을 하나씩 읽어줘요", "아니요, for 는 리스트 '안'의 값만 돌 수 있고 변수 이름 자체는 못 돌아요"],
          answer: 1,
          explanation: "for 는 리스트 같은 통 안에 든 값을 하나씩 꺼내는 거지, att1·att2·att3 같은 변수 이름을 순서대로 읽어주는 기능이 아니에요. 변수 이름이 30 개면 코드를 30 줄 따로 써야 해요."
        },
        {
          id: "students-list-explain",
          type: "explain",
          title: `📦 그래서 — 리스트 안에 리스트`,
          content: `변수 이름 att1, att2, att3 대신, 이 셋을 큰 리스트 하나에 넣어버리면 어떨까요?

\`\`\`python
att1 = [1, 1, 0, 1, 1]
att2 = [1, 0, 1, 1, 1]
att3 = [0, 1, 1, 0, 1]

students = [att1, att2, att3]

print(students)
# [[1, 1, 0, 1, 1], [1, 0, 1, 1, 1], [0, 1, 1, 0, 1]]
\`\`\`

이제 students 는 리스트 하나예요. 그런데 그 안에 든 값 세 개가 전부 또 리스트네요. **리스트 안에 리스트** — 이게 오늘 배울 전부예요.`
        },
        {
          id: "try-students-one-row",
          type: "tryit",
          title: `🖥️ 한 줄만 꺼내보기`,
          task: `students 에서 첫 번째 학생(민지)의 기록을 출력하세요!`,
          initialCode: `att1 = [1, 1, 0, 1, 1]
att2 = [1, 0, 1, 1, 1]
att3 = [0, 1, 1, 0, 1]
students = [att1, att2, att3]

print(students[___])`,
          expectedOutput: "[1, 1, 0, 1, 1]",
          hint: `첫 번째 = 인덱스 0.`,
          hint2: `0`
        },
        {
          id: "interactive-grid-explore",
          type: "interactive",
          title: `🎮 가로줄 전체 vs 칸 하나`,
          description: `버튼을 눌러 '가로줄 전체 보기'와 '칸 하나만 보기'를 바꿔보고, 아무 칸이나 눌러보세요.`,
          component: "py2dGridExplore"
        },
        {
          id: "try-students-cell",
          type: "tryit",
          title: `🖥️ 칸 하나만 꺼내보기`,
          task: `students 에서 두 번째 학생(서준)의 세 번째 날 기록을 출력하세요!`,
          initialCode: `att1 = [1, 1, 0, 1, 1]
att2 = [1, 0, 1, 1, 1]
att3 = [0, 1, 1, 0, 1]
students = [att1, att2, att3]

print(students[___][___])`,
          expectedOutput: "1",
          hint: `두 번째 학생 = 인덱스 1. 세 번째 날 = 인덱스 2.`,
          hint2: `1 / 2`
        },
        {
          id: "predict-cell-meaning",
          type: "predict",
          title: `💭 students[1][0] 은 누구의 며칠째 기록일까요?`,
          content: `students[1][0] 이 가리키는 게 몇 번째 학생의 몇 번째 날 기록인지 골라보세요. (인덱스는 0 부터예요!)`,
          options: ["1번째 학생의 1번째 날", "2번째 학생의 1번째 날", "2번째 학생의 2번째 날", "1번째 학생의 2번째 날"],
          answer: 1,
          explanation: "인덱스는 0 부터 세니까, students[1] 은 두 번째 학생(서준), 그 안의 [0] 은 첫 번째 날이에요. 그래서 '2번째 학생의 1번째 날'이 맞아요."
        },
        {
          id: "name-2d-list",
          type: "explain",
          title: `📛 이름 붙이기 — 2차원 리스트`,
          content: `지금까지 만든 students 처럼, **리스트 안에 또 리스트가 들어있는 것**을 2차원 리스트라고 불러요.

- **가로줄** — 학생 한 명의 기록 전체. students[1] 처럼 인덱스 하나로 꺼내요.
- **세로줄** — 같은 날짜끼리 모은 것. 지금은 따로 꺼내는 방법이 없고, 가로줄 안에서 인덱스로 골라요.

\`\`\`python
students[1]        # 가로줄 하나 — 서준의 기록 전체
students[1][0]      # 가로줄 안의 칸 하나 — 서준의 첫째 날
\`\`\`

**정리:** 대괄호 두 번 — 앞은 '몇 번째 가로줄', 뒤는 '그 줄의 몇 번째 칸'이에요.`
        }
      ]
    },
    {
      id: "ch2",
      title: "만들기",
      emoji: "🧱",
      steps: [
        {
          id: "review-repeat-mult",
          type: "explain",
          title: `🔁 복습 — 리스트 × 숫자`,
          content: `16 과에서 \`[0] * 5\` 를 쓰면 0 다섯 개짜리 리스트가 나왔죠.

\`\`\`python
row = [0] * 5
print(row)   # [0, 0, 0, 0, 0]
\`\`\`

그럼 이 한 줄을 세 번 반복하는 것도 같은 방법으로 되지 않을까요?

\`\`\`python
board = [row] * 3
print(board)
# [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
\`\`\`

칸 15 개짜리 2차원 리스트가 뚝딱 만들어졌어요. 다음 스텝에서 직접 써봐요.`
        },
        {
          id: "try-mult-trap",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 한 칸만 바꿔볼게요`,
          task: `빈칸을 채워서 board 를 만들고, board[0][0] 을 9 로 바꾼 뒤 출력해보세요!`,
          initialCode: `board = [[0] * 5] * ___
board[0][0] = 9
print(board)`,
          expectedOutput: "[[9, 0, 0, 0, 0], [9, 0, 0, 0, 0], [9, 0, 0, 0, 0]]",
          hint: `가로줄 3개니까 3.`,
          hint2: `3`
        },
        {
          id: "predict-why-all-changed",
          type: "predict",
          title: `💭 분명 board[0] 만 바꿨는데?`,
          content: `board[0][0] 딱 하나만 9 로 바꿨는데, 왜 board[1], board[2] 까지 전부 9 로 바뀌었을까요?`,
          options: ["board[0], board[1], board[2] 가 사실 전부 똑같은 리스트 하나를 가리키고 있어서", "파이썬이 세 줄을 자동으로 똑같이 맞춰줘서"],
          answer: 0,
          explanation: "[row] * 3 은 row 리스트를 '복사'하는 게 아니라, 같은 리스트를 가리키는 화살표를 세 개 만드는 거예요. 그래서 하나를 바꾸면 셋 다 바뀐 것처럼 보여요."
        },
        {
          id: "interactive-alias-arrows",
          type: "interactive",
          title: `🎮 화살표 셋, 리스트 하나`,
          description: `❌ 탭과 ✅ 탭을 눌러 비교해보고, 버튼을 눌러 무슨 일이 생기는지 확인해보세요.`,
          component: "py2dAliasArrows"
        },
        {
          id: "try-comprehension-fix",
          type: "tryit",
          title: `🖥️ 직접 해보기 — 이번엔 안 옮아요`,
          task: `빈칸을 채워 board 를 만들고, 이번엔 board[0][0] 을 9 로 바꿔도 한 줄만 바뀌는지 확인하세요!`,
          initialCode: `board = [[0] * 5 for _ in range(___)]
board[0][0] = 9
print(board)`,
          expectedOutput: "[[9, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]",
          hint: `가로줄 3개.`,
          hint2: `3`
        },
        {
          id: "predict-transfer-check",
          type: "predict",
          title: `💭 다시 확인 — rows = [[1] * 3] * 2`,
          content: `이번엔 다른 예로 확인해봐요.

\`\`\`python
rows = [[1] * 3] * 2
rows[1][0] = 9
print(rows)
\`\`\`

결과로 알맞은 건 뭘까요?`,
          options: ["[[9, 1, 1], [9, 1, 1]]", "[[1, 1, 1], [9, 1, 1]]"],
          answer: 0,
          explanation: "* 로 만든 건 여전히 같은 리스트를 가리켜요. rows[1] 만 바꾼 것 같지만 rows[0] 도 같은 리스트라 같이 9 로 바뀌어요."
        },
        {
          id: "mistake-box-mult-vs-comprehension",
          type: "explain",
          title: `🚫 자주 하는 실수 — 2차원 리스트 만들기`,
          content: `\`\`\`python
# ❌ 이렇게 만들면 안 돼요 — 가로줄 m개가 전부 같은 리스트를 가리켜요
board = [[0] * n] * m

# ✅ 이렇게 만들어요 — 가로줄마다 새 리스트가 따로 생겨요
board = [[0] * n for _ in range(m)]
\`\`\`

앞으로 2차원 리스트를 만들 땐 항상 오른쪽 방법만 쓰세요.`
        },
        {
          id: "mission-build-board",
          type: "mission",
          title: `🏆 미션 — 4행 6열 보드 만들기`,
          task: `가로줄 4개, 세로줄 6개짜리 보드를 만들고, 전부 '.' 으로 채워서 출력하세요! (컴프리헨션 방법으로)`,
          initialCode: `board = [['.'] * ___ for _ in range(___)]
print(board)`,
          expectedOutput: "[['.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.']]",
          hint: `안쪽은 세로줄(칸) 개수, range() 안은 가로줄 개수.`,
          hint2: `6 / 4`
        }
      ]
    },
    {
      id: "ch3",
      title: "순회하기",
      emoji: "🚶",
      steps: [
        {
          id: "explain-row-loop",
          type: "explain",
          title: `🔄 한 가로줄씩 꺼내기`,
          content: `for 로 students 를 돌면, 한 번에 한 가로줄(리스트 하나)씩 나와요.

\`\`\`python
students = [[1, 1, 0], [0, 1, 1], [1, 0, 0]]

for row in students:
    print(row)
# [1, 1, 0]
# [0, 1, 1]
# [1, 0, 0]
\`\`\`

row 에는 매번 리스트 하나가 통째로 들어와요. 그런데 그 줄 '안의' 칸 하나하나를 보려면 어떻게 할까요?`
        },
        {
          id: "try-nested-for-first",
          type: "tryit",
          title: `🖥️ for 를 두 번 — 이중 for`,
          task: `빈칸을 채워서 각 칸을 한 줄씩 출력하세요!`,
          initialCode: `students = [[1, 1, 0], [0, 1, 1], [1, 0, 0]]

for row in students:
    for day in ___:
        print(day)`,
          expectedOutput: "1\n1\n0\n0\n1\n1\n1\n0\n0",
          hint: `안쪽 for 는 바깥에서 방금 꺼낸 row 를 다시 돌아요.`,
          hint2: `row`
        },
        {
          id: "interactive-grid-walk",
          type: "interactive",
          title: `🎮 커서로 순서 따라가기`,
          description: `다음/이전 버튼을 눌러서 이중 for 가 칸을 어떤 순서로 도는지 확인해보세요.`,
          component: "py2dGridWalk"
        },
        {
          id: "predict-total-visits",
          type: "predict",
          title: `💭 2행 3열이면 print(day) 는 총 몇 번?`,
          content: `가로줄 2개, 각 줄에 칸 3개짜리 리스트를 이중 for 로 돌면, print(day) 는 총 몇 번 실행될까요?`,
          options: ["2번", "3번", "5번", "6번"],
          answer: 3,
          explanation: "바깥 for 가 2번(가로줄 2개) 돌고, 그때마다 안쪽 for 가 3번(칸 3개)씩 도니까 2 × 3 = 6번이에요."
        },
        {
          id: "try-nested-for-index",
          type: "tryit",
          title: `🖥️ 인덱스까지 같이 — range(len(...))`,
          task: `인덱스로 순회하면서 '행i 칸j: 값' 형식으로 출력하세요!`,
          initialCode: `students = [[1, 1, 0], [0, 1, 1]]

for i in range(len(students)):
    for j in range(len(___)):
        print(f"행{i} 칸{j}: {students[i][j]}")`,
          expectedOutput: "행0 칸0: 1\n행0 칸1: 1\n행0 칸2: 0\n행1 칸0: 0\n행1 칸1: 1\n행1 칸2: 1",
          hint: `안쪽 range 는 '그 가로줄'의 길이 — students[i].`,
          hint2: `students[i]`
        },
        {
          id: "mission-attendance-total",
          type: "mission",
          title: `🏆 미션 — 전체 출석 일수 합계`,
          task: `이중 for 와 누적(+=)으로 전체 출석 합계를 구하세요! (1 = 출석)`,
          initialCode: `students = [[1, 1, 0, 1], [0, 1, 1, 1], [1, 1, 1, 0]]
total = 0

for row in students:
    for day in row:
        total ___ day

print(f"전체 출석: {total}일")`,
          expectedOutput: "전체 출석: 9일",
          hint: `지금까지 합에 day 를 더해서 다시 total 에 넣어요.`,
          hint2: `+=`
        }
      ]
    },
    {
      id: "ch4",
      title: "통째로 바꾸기",
      emoji: "🔀",
      steps: [
        {
          id: "explain-doubled-verbose",
          type: "explain",
          title: `✖️ 모든 칸을 2배로 — 여러 줄 버전`,
          content: `students 의 모든 칸을 2배로 만든 새 리스트를 만들어봐요. 지금까지 배운 이중 for 로도 할 수 있어요.

\`\`\`python
students = [[1, 1, 0], [0, 1, 1]]

doubled = []
for row in students:
    new_row = []
    for v in row:
        new_row.append(v * 2)
    doubled.append(new_row)

print(doubled)
# [[2, 2, 0], [0, 2, 2]]
\`\`\`

5줄이나 걸렸어요. 한 줄로 줄일 수 있는 방법이 있어요 — 컴프리헨션.`
        },
        {
          id: "try-nested-comprehension",
          type: "tryit",
          title: `🖥️ 한 줄로 — 컴프리헨션 두 겹`,
          task: `빈칸을 채워서 컴프리헨션 한 줄로 doubled 를 만드세요!`,
          initialCode: `students = [[1, 1, 0], [0, 1, 1]]

doubled = [[___ for v in row] for row in students]
print(doubled)`,
          expectedOutput: "[[2, 2, 0], [0, 2, 2]]",
          hint: `칸 하나(v)를 2배로.`,
          hint2: `v * 2`
        },
        {
          id: "explain-comprehension-parts",
          type: "explain",
          title: `🎨 컴프리헨션 뜯어보기 — 안쪽 for, 바깥 for`,
          content: `한 줄처럼 보이지만, 사실 이중 for 랑 똑같이 두 부분으로 나뉘어요.

\`\`\`python
doubled = [[v * 2 for v in row] for row in students]
#           ------- 안쪽 -------   -------- 바깥 --------
\`\`\`

- **바깥 (\`for row in students\`)** — 이중 for 의 바깥 for 와 똑같아요. 가로줄을 하나씩 꺼내요.
- **안쪽 (\`[v * 2 for v in row]\`)** — 그 가로줄 안에서 칸을 하나씩 돌면서 2배로 만들어요.

**안쪽 대괄호가 통째로 바깥 for 의 '몸통'**이에요. 가로줄마다 안쪽 컴프리헨션이 한 번씩 통째로 실행돼서 새 가로줄을 만들어요.`
        },
        {
          id: "predict-transpose-outer",
          type: "predict",
          title: `💭 전치(행↔열 바꾸기) 하려면?`,
          content: `행과 열을 바꾼 새 리스트(전치)를 만들려고 해요. 이번엔 바깥 for 가 '가로줄'이 아니라 다른 것을 돌아야 해요. 무엇을 돌아야 할까요?`,
          options: ["여전히 원래 가로줄 (row)", "열 번호 (0, 1, 2, ... 세로줄 인덱스)"],
          answer: 1,
          explanation: "전치는 세로줄이 새로운 가로줄이 되는 거예요. 그러니 바깥 for 가 '세로줄 번호'를 하나씩 돌면서, 그 번호에 해당하는 칸들을 모아 새 가로줄을 만들어야 해요."
        },
        {
          id: "mission-transpose",
          type: "mission",
          title: `🏆 최종 미션 — 전치하기`,
          task: `grid (2행 3열)를 전치해서 3행 2열로 만드세요! 이중 for + append 로 직접 짜보세요.`,
          initialCode: `grid = [[1, 2, 3], [4, 5, 6]]
rows = len(grid)
cols = len(grid[0])

transposed = []
for c in range(cols):
    new_row = []
    for r in range(rows):
        new_row.append(grid[___][___])
    transposed.append(new_row)

print(transposed)`,
          expectedOutput: "[[1, 4], [2, 5], [3, 6]]",
          hint: `원래 grid 에서 행 인덱스는 r, 열 인덱스는 c 예요.`,
          hint2: `r / c`
        },
        {
          id: "complete",
          type: "explain",
          title: `🎉 완료!`,
          content: `## 오늘 배운 것

✅ **2차원 리스트** — 리스트 안에 리스트, 가로줄/세로줄
✅ **만들기** — \`[[0] * n for _ in range(m)]\` (❌ \`[[0] * n] * m\` 아님!)
✅ **순회** — 이중 for 로 가로줄 → 그 안 칸까지
✅ **통째로 바꾸기** — \`[[식 for v in row] for row in students]\`

다음엔 한 겹 더 쌓아요.`
        }
      ]
    }
  ]
}
