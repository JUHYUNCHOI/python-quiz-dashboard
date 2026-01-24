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
          initialCode: "hp = 0\nif hp == 0:\n    print('게임 오버!')",
          expectedOutput: "게임 오버!",
          hint: "if hp == 0: 다음 줄에 들여쓰기!",
          hint2: "if hp == 0:\n    print('게임 오버!')"
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
          initialCode: "score = 75\nif score >= 60:\n    print('합격')\nelse:\n    print('불합격')",
          expectedOutput: "합격",
          hint: "if-else 구조를 사용해요",
          hint2: "if score >= 60:"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "x = 5일 때, if x > 10: print('A') else: print('B')의 출력은?",
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
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "점수에 따른 등급을 출력하세요! (95점 → A)",
          initialCode: "score = 95\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('C')",
          expectedOutput: "A",
          hint: "if-elif-else 구조!",
          hint2: "if score >= 90:"
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
          initialCode: "age = 8\nif age <= 7:\n    print('무료')\nelif age <= 12:\n    print('어린이 500원')\nelif age <= 18:\n    print('청소년 1000원')\nelse:\n    print('성인 1500원')",
          expectedOutput: "어린이 500원",
          hint: "나이 범위를 elif로 나눠요",
          hint2: "elif age <= 12:"
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
