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
          title: "🎮 게임 속 조건문",
          content: `게임에서 이런 상황 본 적 있죠?

- HP가 0이면 → 게임 오버!
- 점수가 100점 이상이면 → 레벨업!
- 아이템이 있으면 → 사용 가능!

이런 **"~하면 ~한다"**를 만드는 게 **조건문**이에요!`
        },
        {
          id: "syntax-explain",
          type: "explain",
          title: "📝 if문 문법",
          content: `\`\`\`python
if 조건:
    실행할 코드
\`\`\`

**중요!** 
- 조건 뒤에 **콜론(:)** 필수!
- 실행할 코드는 **들여쓰기(Tab)** 필수!

\`\`\`python
score = 100
if score >= 100:
    print('레벨업!')
\`\`\``
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "hp가 0이면 '게임 오버!'를 출력하세요!",
          initialCode: "hp = 0\n# hp가 0이면 '게임 오버!' 출력\nif ___:\n    print('게임 오버!')",
          expectedOutput: "게임 오버!",
          hint: "hp가 0인지 확인하는 조건을 쓰세요!",
          hint2: "if hp == 0:"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
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
          title: "🖥️ 직접 해보기!",
          task: "점수가 60점 이상이면 '합격', 아니면 '불합격' 출력!",
          initialCode: "score = 75\n# 합격 / 불합격을 가르는 조건을 적어보세요\nif ___:\n    print('합격')\nelse:\n    print('불합격')",
          expectedOutput: "합격",
          hint: "score가 60 이상인 조건을 쓰세요!",
          hint2: "if score >= 60:"
        },
        {
          id: "nested-sim",
          type: "explain",
          title: "🔍 실행 추적: if 안에 if가 있다면? (True 경로)",
          content: `if 안에 또 if가 있을 때, **둘 다 참**이면 어떻게 되는지 봐요!

**▶ 실행하기** 또는 **▷ 한 단계** 버튼을 눌러보세요.`,
          component: "codeTracePyNestedIf",
        },
        {
          id: "nested-sim-false",
          type: "explain",
          title: "🔍 실행 추적: 안쪽 if가 거짓이면? (False 경로)",
          content: `이번엔 has_id가 **False**! 바깥 if는 참이지만 안쪽 if가 거짓이면 어디로 갈까요?

**▶ 실행하기** 또는 **▷ 한 단계** 버튼을 눌러보세요.`,
          component: "codeTracePyNestedIfFalse",
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
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
          title: "🔢 elif: 조건이 여러 개일 때",
          content: `조건이 3개 이상이면 **elif**를 써요!

\`\`\`python
score = 85

if score >= 90:
    print('A')
elif score >= 80:
    print('B')
elif score >= 70:
    print('C')
else:
    print('F')
\`\`\`

→ 85점은 80 이상이니까 'B' 출력!`
        },
        {
          id: "elif-sim",
          type: "explain",
          title: "🔍 실행 추적: score=85 → B학점 (elif 경로)",
          content: `score=85일 때, if → elif → else 중 어디로 가는지 추적해 보세요!

**▶ 실행하기** 또는 **▷ 한 단계** 버튼을 눌러보세요.`,
          component: "codeTracePyIfElse",
        },
        {
          id: "elif-sim-false",
          type: "explain",
          title: "🔍 실행 추적: score=65 → C학점 (else 경로)",
          content: `이번엔 score=65! 모든 조건이 거짓이면 else로 가는 과정을 봐요!

**▶ 실행하기** 또는 **▷ 한 단계** 버튼을 눌러보세요.`,
          component: "codeTracePyIfElseLow",
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "점수에 따른 등급을 출력하세요! (95점 → A)",
          initialCode: "score = 95\nif score >= 90:\n    print('A')\n___:\n    print('B')\nelse:\n    print('C')",
          expectedOutput: "A",
          hint: "80점 이상인 조건을 elif로 쓰세요!",
          hint2: "elif score >= 80:"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ 퀴즈!",
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
          title: "🏆 최종 미션!",
          task: "나이에 따른 요금을 출력하세요! (8세: 어린이 500원)",
          initialCode: "age = 8\nif age <= 7:\n    print('무료')\nelif ___:\n    print('어린이 500원')\nelif ___:\n    print('청소년 1000원')\nelse:\n    print('성인 1500원')",
          expectedOutput: "어린이 500원",
          hint: "나이 범위에 맞는 조건을 쓰세요!",
          hint2: "age <= 12 / age <= 18"
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
