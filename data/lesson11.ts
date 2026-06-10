// ============================================
// 레슨 11: 조건문 (if)
// ============================================
import { LessonData } from './types'

export const lesson11Data: LessonData = {
  id: "11",
  title: "조건문 (if)",
  emoji: "🔀",
  description: "조건에 따라 다르게 실행하는 방법을 배워요!",
  chapters: [
    {
      id: "ch1",
      title: "if문 기초",
      emoji: "❓",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎮 갈림길 만들기",
          content: `지금까지 우리가 쓴 코드는 **위에서 아래로 한 줄도 안 빼고 전부 실행** 됐어요. 길이 하나뿐인 외길이었죠.

그런데 진짜 프로그램은 상황에 따라 **다르게** 움직여야 해요. 게임에서 HP 가 0 이 되면 게임 오버 화면이 뜨고, 아직 살아있으면 계속 진행되잖아요?

이게 바로 **갈림길** 이에요. 길을 걷다 갈림길을 만나면, *어떤 조건* 에 따라 왼쪽 길 / 오른쪽 길로 갈라지죠.

\`\`\`
HP 가 0 이야?
   ├─ 응  → 게임 오버 화면
   └─ 아니 → 계속 플레이
\`\`\`

"HP 가 0 이면 → 게임 오버" 같은 **"~ 면 ~ 한다"** 가 바로 코드의 갈림길이에요. 이렇게 코드에 갈림길을 만드는 게 오늘 배울 **조건문 (if 문)** — 프로그램이 *생각하고 판단하게* 만드는 첫걸음이에요.`
        },
        {
          id: "syntax-explain",
          type: "explain",
          title: "📝 if 문 문법",
          content: `\`\`\`python
if 조건:
    실행할 코드
\`\`\`

기억할 건 딱 두 개!

1. 조건 뒤에 **콜론 \`:\`** — 빠지면 빨간 줄!
2. 다음 줄은 **4 칸 들여쓰기**

\`\`\`python
score = 100
if score >= 100:
    print('레벨업!')   ← 4 칸 들여쓰기
\`\`\`

**그런데 콜론이랑 들여쓰기가 왜 필요할까요?** 파이썬한테 *"여기서부터 여기까지가 if 안에 있는 코드야"* 라고 알려주는 표시거든요.

- **콜론 \`:\`** 은 *"자, 이제부터 if 에 딸린 내용이 시작돼!"* 하는 시작 신호예요.
- **들여쓰기(4 칸)** 는 *"이 줄들은 if 의 *자식* 이야"* 하고 묶어주는 거예요. 마치 글에서 소제목 아래 내용을 한 칸 안으로 들여 쓰는 것처럼요.

\`\`\`python
if score >= 100:
    print('레벨업!')   ← 들여쓰기 O → if 가 참일 때만 실행
print('게임 계속')      ← 들여쓰기 X → 조건과 상관없이 항상 실행
\`\`\`

들여쓰기 한 줄만 if 의 영향을 받고, 다시 왼쪽 끝으로 나온 줄은 if 밖이라 *항상* 실행돼요. C++ 같은 언어는 \`{ }\` 중괄호로 묶지만, 파이썬은 **들여쓰기 자체** 로 묶어서 코드가 깔끔해 보여요.

> 💡 들여쓰기 안 하면 "들여쓰기가 잘못됐어요" 라고 알려줘요 (\`IndentationError\`). 콜론을 빼먹는 것도 흔한 실수니까, if 줄 끝엔 항상 \`:\` 부터 찍는 습관!`
        },
        {
          id: "syntax-builder",
          type: "explain",
          title: "🧱 if 문 조립해보기",
          content: `if 문이 어떻게 한 조각씩 쌓이는지 봐요. **▶ 재생** 누르고 따라가요!`,
          component: "pyIfBuilder",
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ if 문 빈칸 채우기 — hp 가 0 이면 게임 오버",
          task: "hp가 0이면 '게임 오버!'를 출력하세요!",
          initialCode: "hp = 0\n# hp가 0이면 '게임 오버!' 출력\nif ___:\n    print('게임 오버!')",
          expectedOutput: "게임 오버!",
          hint: "hp가 0인지 확인하는 조건을 쓰세요!",
          hint2: "if hp == 0:"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈 — if 문에 꼭 필요한 2 가지",
          content: "if문에서 꼭 필요한 것 2가지는?",
          options: ["괄호와 세미콜론", "콜론(:)과 들여쓰기", "중괄호와 콜론", "괄호와 들여쓰기"],
          answer: 1,
          explanation: "파이썬 if문은 콜론(:)과 들여쓰기가 필수!"
        }
      ]
    },
    {
      id: "ch2",
      title: "if-else",
      emoji: "↔️",
      steps: [
        {
          id: "else-explain",
          type: "explain",
          title: "↔️ if-else: 둘 중 하나",
          content: `앞에서 본 \`if\` 는 *"조건이 맞으면 한다, 아니면 아무것도 안 한다"* 였어요. 그런데 갈림길은 보통 **양쪽 길** 이 다 있잖아요?

문 앞에서 *"성인이면 들여보내고, 아니면 돌려보낸다"* 처럼 — 둘 중 **반드시 하나** 를 해야 할 때가 많아요. 이때 쓰는 게 **else** ("그게 아니라면").

\`\`\`python
age = 15

if age >= 18:
    print('성인입니다')
else:
    print('미성년자입니다')
\`\`\`

→ 15세는 18 미만이니까 '미성년자입니다' 출력!

\`if\` 와 \`else\` 는 **갈림길의 두 갈래** 예요. 조건이 참이면 \`if\` 쪽, 거짓이면 \`else\` 쪽 — 둘 중 **딱 하나만** 실행돼요. 양쪽이 동시에 실행되거나, 둘 다 건너뛰는 일은 절대 없어요.

> 💡 \`else\` 에는 조건을 안 적어요. \`else:\` 만 쓰면 끝! "위 조건이 거짓인 *나머지 모든 경우*" 를 알아서 맡거든요.`
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ if-else 빈칸 — 합격 / 불합격",
          task: "점수가 60점 이상이면 '합격', 아니면 '불합격' 출력!",
          initialCode: "score = 75\n# 합격 / 불합격을 가르는 조건을 적어보세요\nif ___:\n    print('합격')\nelse:\n    print('불합격')",
          expectedOutput: "합격",
          hint: "score가 60 이상인 조건을 쓰세요!",
          hint2: "if score >= 60:"
        },
        {
          id: "nested-sim",
          type: "explain",
          title: "🔍 실행 추적 — 둘 다 참일 때",
          content: `if 안에 또 if가 있을 때, **둘 다 참**이면 어떻게 되는지 봐요!

**▶ 실행하기** 또는 **▷ 한 단계** 버튼을 눌러보세요.`,
          component: "codeTracePyNestedIf",
        },
        {
          id: "nested-sim-false",
          type: "explain",
          title: "🔍 실행 추적 — 안쪽 조건이 안 맞을 때",
          content: `이번엔 has_id가 **거짓**! 바깥 if는 통과했지만 안쪽 if가 안 맞으면 어디로 갈까요?

**▶ 실행하기** 또는 **▷ 한 단계** 버튼을 눌러보세요.`,
          component: "codeTracePyNestedIfFalse",
        },
        {
          id: "try-nested-outer",
          type: "tryit",
          title: "🖥️ 중첩 if 사다리 1 — 바깥 if 만 채우기",
          task: "안쪽 if 는 이미 채워져 있어요. logged_in 이 참일 때만 안쪽 if 까지 들어가도록 바깥 if 를 완성하세요!",
          initialCode: "logged_in = True\nis_admin = True\n# 바깥 if 만 채우면 돼요\nif ___:\n    if is_admin:\n        print('관리자 메뉴')",
          expectedOutput: "관리자 메뉴",
          hint: "logged_in 이 참인지 확인하면 끝!",
          hint2: "if logged_in:"
        },
        {
          id: "pre-try-nested",
          type: "quiz",
          title: "❓ 결정 — 두 조건 모두 확인할 때",
          content: "**'학생이면서 면허 있음 → 할인' 같은 *두 조건 모두* 확인 — 어떤 구조?**",
          options: ["if 안에 if (중첩)", "if 두 개 따로", "elif"],
          answer: 0,
          explanation: "중첩 if 는 *바깥 조건* 통과 후 *안쪽 조건* 도 확인. `and` 와 비슷하지만 디버깅에 좋아요."
        },
        {
          id: "try-nested",
          type: "tryit",
          title: "🖥️ 중첩 if 사다리 2 — 양쪽 다 채우기",
          task: "logged_in 과 is_admin 둘 다 참일 때만 '관리자 메뉴' 출력!",
          initialCode: "logged_in = True\nis_admin = True\n# 두 조건이 모두 참이어야 해요\nif ___:\n    if ___:\n        print('관리자 메뉴')",
          expectedOutput: "관리자 메뉴",
          hint: "바깥 if 가 먼저 검사, 통과하면 안쪽 if 검사!",
          hint2: "if logged_in:\n    if is_admin:"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈 — if-else 출력 예측",
          content: "출력 결과는?\n\n```python\nx = 5\nif x > 10:\n    print('A')\nelse:\n    print('B')\n```",
          options: ["A", "B", "AB", "아무것도 안 나옴"],
          answer: 1,
          explanation: "5 > 10은 False니까 else의 'B'가 출력돼요!"
        }
      ]
    },
    {
      id: "ch3",
      title: "elif: 여러 조건",
      emoji: "🔢",
      steps: [
        {
          id: "elif-explain",
          type: "explain",
          title: "🔢 elif — 갈림길이 3 개 이상일 때",
          content: `if / else 만 있으면 갈림길은 2 개. 그런데 성적은 A·B·C·F 처럼 **3 개 이상** 으로 갈라지죠? 이럴 때 **elif** 가 필요해요.

\`elif\` 는 \`else if\` 의 줄임말 — "그게 아니라면 또 다른 if".

\`\`\`python
if score >= 90:
    print('A')
elif score >= 80:
    print('B')
elif score >= 70:
    print('C')
else:
    print('F')
\`\`\`

**그냥 if 를 여러 개 쓰면 안 되나요?** — 여기가 핵심이에요. \`if\` 를 따로따로 쓰면 파이썬은 **모든 조건을 다 검사** 해요. 그래서 점수 95 점이면:

\`\`\`python
if score >= 90:    # 95 >= 90 → 참! 'A' 출력
    print('A')
if score >= 80:    # 95 >= 80 → 또 참! 'B' 도 출력 😱
    print('B')
if score >= 70:    # 95 >= 70 → 또또 참! 'C' 까지 출력 😱😱
    print('C')
\`\`\`

→ \`A B C\` 가 **전부** 나와버려요! 우린 'A' 하나만 원했는데.

\`elif\` 는 이걸 막아줘요. **위 조건이 이미 참이었으면, 아래 elif 는 아예 검사도 안 해요.** 그래서 처음 맞는 가지 하나만 실행되고 끝 — 우리가 원하던 그대로요.`
        },
        {
          id: "elif-flow",
          type: "explain",
          title: "📐 elif 실행 규칙",
          content: `if / elif / else 묶음은 **자판기** 같아요. 동전을 넣으면 위 버튼부터 차례로 확인하다가, *처음 맞는 칸* 에서 음료가 나오고 **딱 멈춰요**. 아래 버튼은 눌러보지도 않죠.

또는 **검문소** 를 떠올려도 좋아요. 위에서부터 한 줄씩 검사하다가, **처음으로 통과(참)하는 가지** 하나만 실행하고 나머지는 전부 건너뛰어요.

예: \`score = 85\`
- \`score >= 90\` ? → 아니요, 건너뜀
- \`score >= 80\` ? → 네! → **'B' 출력하고 끝**
- 나머지 elif / else 는 검사도 안 함

> 💡 그래서 **순서가 정말 중요** 해요. 만약 \`score >= 70\` 을 맨 위에 적으면, 85 점도 95 점도 전부 거기서 먼저 걸려서 'C' 가 나와버려요. *가장 좁은(까다로운) 조건* 을 위에, *넓은 조건* 을 아래에 두는 게 비결이에요.`
        },
        {
          id: "elif-sim",
          type: "explain",
          title: "🔍 실행 추적 — 점수가 85 일 때",
          content: `score=85일 때, if → elif → else 중 어디로 가는지 추적해 보세요!

**▶ 실행하기** 또는 **▷ 한 단계** 버튼을 눌러보세요.`,
          component: "codeTracePyIfElse",
        },
        {
          id: "elif-sim-false",
          type: "explain",
          title: "🔍 실행 추적 — 점수가 65 일 때",
          content: `이번엔 score=65! 모든 조건이 거짓이면 else로 가는 과정을 봐요!

**▶ 실행하기** 또는 **▷ 한 단계** 버튼을 눌러보세요.`,
          component: "codeTracePyIfElseLow",
        },
        {
          id: "predict-elif",
          type: "predict",
          title: "💭 score=75 면 어느 가지로?",
          content: "이 코드를 실행하면 무엇이 출력될까요?\n\n```python\nscore = 75\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelse:\n    print('D')\n```",
          options: ["A", "B", "C", "D"],
          answer: 2,
          explanation: "75 는 90 미만, 80 미만이지만 70 이상! 그래서 세 번째 elif 가 처음으로 참 → 'C' 출력. elif 는 위에서부터 순서대로 검사하다가 처음 참이 되는 가지에서 멈춰요."
        },
        {
          id: "pre-try3-elif",
          type: "quiz",
          title: "❓ 결정 — 'B' 조건은 어떻게 시작?",
          content: "**점수가 90 이상 → 'A', 80 이상 → 'B', 그 외 → 'C'. *두 번째 줄* 'B' 조건은 어떻게 시작?**",
          options: ["if (첫 조건)", "elif (또 다른 조건)", "else (나머지)", "for (반복)"],
          answer: 1,
          explanation: "*첫 조건* 다음 *또 다른 조건* 은 `elif`. else 는 *모든 조건 외 나머지* 일 때만!"
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ elif 빈칸 채우기 — 등급 출력",
          task: "점수에 따른 등급을 출력하세요! (95점 → A)",
          initialCode: "score = 95\nif score >= 90:\n    print('A')\n___:\n    print('B')\nelse:\n    print('C')",
          expectedOutput: "A",
          hint: "80점 이상인 조건을 elif로 쓰세요!",
          hint2: "elif score >= 80:"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ 퀴즈 — elif 는 몇 개까지?",
          content: "elif는 몇 개까지 쓸 수 있을까요?",
          options: ["1개만", "2개까지", "5개까지", "무제한"],
          answer: 3,
          explanation: "elif는 필요한 만큼 무제한으로 쓸 수 있어요!"
        }
      ]
    },
    {
      id: "ch4",
      title: "최종 미션",
      emoji: "🏆",
      steps: [
        {
          id: "pre-mission1-elif",
          type: "quiz",
          title: "❓ 결정 — 'hp <= 30' 조건은?",
          content: "**hp <= 0 (사망), hp <= 30 (위험), hp <= 70 (보통), 그 외 (건강). *두 번째 'hp <= 30'* 조건은?**",
          options: ["또 다른 if 로 다시 시작", "elif — 위에서 이미 걸러진 거 빼고", "else (조건 없음)"],
          answer: 1,
          explanation: "elif 는 *위 조건에서 이미 걸러진 거 빼고* 만 봐요. 'hp <= 0' 통과한 거 (즉 hp > 0) 중에서만 hp <= 30 인지 확인 — 그래서 자동으로 *0 < hp <= 30* 범위."
        },
        {
          id: "mission1",
          type: "mission",
          title: "🏆 최종 미션 — RPG 체력 시스템!",
          task: "hp 값에 따라 상태 메시지를 출력해요. hp=30 일 때 '⚠️ 위험!' 이 떠야 해요.\n\n| HP 범위 | 출력 |\n|---|---|\n| 0 이하 | 💀 게임 오버! |\n| 1~30 | ⚠️ 위험! |\n| 31~70 | 🟢 양호 |\n| 71 이상 | 💪 풀 컨디션! |\n\nelif 두 칸을 채우세요!",
          initialCode: "hp = 30\nif hp <= 0:\n    print('💀 게임 오버!')\nelif ___:\n    print('⚠️ 위험! 회복 필요!')\nelif ___:\n    print('🟢 양호')\nelse:\n    print('💪 풀 컨디션!')",
          expectedOutput: "⚠️ 위험! 회복 필요!",
          hint: "위에서부터 검사하는 거 기억! hp <= 0 이 이미 걸러졌으니, 다음 elif 는 30 까지만 보면 돼요.",
          hint2: "첫 번째 빈칸: hp <= 30\n두 번째 빈칸: hp <= 70"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ \`if 조건:\` - 조건이 참이면 실행
✅ \`else:\` - 조건이 거짓이면 실행
✅ \`elif 조건:\` - 여러 조건 체크
✅ **들여쓰기** 필수!

다음 시간에는 **조건문 심화**를 배워요! 🔄`
        }
      ]
    }
  ]
}
