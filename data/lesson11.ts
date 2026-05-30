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
          content: `게임에서 HP 가 0 이 되면 게임 오버 화면이 뜨죠?

"HP 가 0 이면 → 게임 오버" 같은 **"~ 면 ~ 한다"** 가 바로 코드의 **갈림길**.

이걸 만드는 게 오늘 배울 **조건문 (if 문)** 이에요.`
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

> 💡 들여쓰기 안 하면 "들여쓰기가 잘못됐어요" 라고 알려줘요 (\`IndentationError\`).`
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
          content: `조건이 거짓일 때도 뭔가 하고 싶다면 **else**!

\`\`\`python
age = 15

if age >= 18:
    print('성인입니다')
else:
    print('미성년자입니다')
\`\`\`

→ 15세는 18 미만이니까 '미성년자입니다' 출력!`
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
          content: `if / else 만 있으면 갈림길은 2 개. **3 개 이상**이면 **elif** 가 필요해요.

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
\`\`\``
        },
        {
          id: "elif-flow",
          type: "explain",
          title: "📐 elif 실행 규칙",
          content: `**위에서 아래로** 검사하다가 **처음 참인 가지** 하나만 실행하고 나머지는 건너뛰어요.

예: \`score = 85\`
- \`score >= 90\` ? → 아니요, 건너뜀
- \`score >= 80\` ? → 네! → **'B' 출력하고 끝**
- 나머지 elif / else 는 검사도 안 함`
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
