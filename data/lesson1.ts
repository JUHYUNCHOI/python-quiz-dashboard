// ============================================
// 레슨 1: print() 출력
// ============================================
import { LessonData } from './types'

export const lesson1Data: LessonData = {
  id: "1",
  title: "print() 출력",
  emoji: "🖨️",
  description: "화면에 글자와 숫자를 출력해요!",
  chapters: [
    {
      id: "ch1",
      title: "첫 출력!",
      emoji: "👋",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "🎉 파이썬 세계에 온 걸 환영해요!",
          content: `프로그래밍의 첫 번째 단계!
**화면에 글자를 출력**하는 것부터 시작해요.

모든 프로그래머의 첫 코드:
\`\`\`python
print('Hello, World!')
\`\`\`

실행하면 화면에 \`Hello, World!\`가 나타나요! ✨`
        },
        {
          id: "print-explain",
          type: "explain",
          title: "🖨️ print() 함수",
          content: `**print()** = 화면에 출력하는 함수

\`\`\`python
print('안녕하세요!')
\`\`\`

- \`print\` = 출력해! 라는 명령어
- \`( )\` = 괄호 안에 출력할 내용
- \`' '\` = 문자열은 따옴표로 감싸요

**작은따옴표 '** 또는 **큰따옴표 "** 둘 다 OK!`
        },
        {
          id: "try1",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "Hello, World!를 출력해보세요!",
          initialCode: "print(___)",
          expectedOutput: "Hello, World!",
          hint: "print() 안에 문자열을 넣어요",
          hint2: "print('Hello, World!')"
        },
        {
          id: "try2",
          type: "tryit",
          title: "🖥️ 한글도 돼요!",
          task: "'안녕하세요!'를 출력해보세요!",
          initialCode: "print(___)",
          expectedOutput: "안녕하세요!",
          hint: "한글도 따옴표 안에!",
          hint2: "print('안녕하세요!')"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`print('파이썬')`의 출력 결과는?",
          options: ["print('파이썬')", "'파이썬'", "파이썬", "에러"],
          answer: 2,
          explanation: "따옴표 안의 내용만 출력돼요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "숫자 출력",
      emoji: "🔢",
      steps: [
        {
          id: "number-explain",
          type: "explain",
          title: "🔢 숫자 출력하기",
          content: `숫자는 **따옴표 없이** 출력해요!

\`\`\`python
print(123)      # 정수
print(3.14)     # 소수
print(100 + 50) # 계산도 가능!
\`\`\`

파이썬이 자동으로 계산해서 출력해요! 🧮`
        },
        {
          id: "try3",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "숫자 2024를 출력해보세요!",
          initialCode: "print(___)",
          expectedOutput: "2024",
          hint: "숫자는 따옴표 없이!",
          hint2: "print(2024)"
        },
        {
          id: "try4",
          type: "tryit",
          title: "🖥️ 계산도 해봐요!",
          task: "100 + 200의 결과를 출력하세요!",
          initialCode: "# 100 + 200을 계산해서 출력하세요\nprint(___)",
          expectedOutput: "300",
          hint: "print() 안에서 바로 계산!",
          hint2: "print(100 + 200)"
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "`print('100')`과 `print(100)`의 차이는?",
          options: [
            "차이 없음",
            "'100'은 문자, 100은 숫자",
            "'100'은 에러",
            "100은 에러"
          ],
          answer: 1,
          explanation: "따옴표가 있으면 문자열, 없으면 숫자예요!"
        }
      ]
    },
    {
      id: "ch3",
      title: "여러 줄 출력",
      emoji: "📝",
      steps: [
        {
          id: "multi-explain",
          type: "explain",
          title: "📝 여러 줄 출력하기",
          content: `print()를 여러 번 쓰면 여러 줄 출력!

\`\`\`python
print('첫 번째 줄')
print('두 번째 줄')
print('세 번째 줄')
\`\`\`

결과:
\`\`\`
첫 번째 줄
두 번째 줄
세 번째 줄
\`\`\``
        },
        {
          id: "try5",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "'나이: 15'와 '취미: 게임'을 출력하세요!",
          initialCode: "print('이름: 홍길동')\n# 나이와 취미도 출력하세요\nprint(___)\nprint(___)",
          expectedOutput: "이름: 홍길동\n나이: 15\n취미: 게임",
          hint: "따옴표 안에 출력할 내용을 넣으세요!",
          hint2: "print('나이: 15')\nprint('취미: 게임')"
        },
        {
          id: "comma-explain",
          type: "explain",
          title: "📎 쉼표로 여러 값 출력",
          content: `**쉼표(,)**로 여러 값을 한 줄에!

\`\`\`python
print('이름:', '홍길동')
# 결과: 이름: 홍길동

print('나이:', 15, '살')
# 결과: 나이: 15 살
\`\`\`

쉼표로 구분하면 자동으로 **공백**이 들어가요!`
        },
        {
          id: "try6",
          type: "tryit",
          title: "🖥️ 직접 해보기!",
          task: "쉼표로 '결과:' 와 100을 출력하세요!",
          initialCode: "# 쉼표로 '결과:' 와 100을 출력하세요\nprint('결과:', ___)",
          expectedOutput: "결과: 100",
          hint: "쉼표로 문자와 숫자를 연결!",
          hint2: "print('결과:', 100)"
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
          task: "게임 캐릭터 정보를 완성하세요!",
          initialCode: "print('=== 🎮 캐릭터 정보 ===')\nprint('이름: 용사')\nprint('레벨: 5')\nprint('체력: ___')\nprint('공격력: ___')\nprint('=== 모험을 시작하자! ===')",
          expectedOutput: "=== 🎮 캐릭터 정보 ===\n이름: 용사\n레벨: 5\n체력: 100\n공격력: 25\n=== 모험을 시작하자! ===",
          hint: "print() 안에 숫자를 채워보세요!",
          hint2: "print('체력: 100')\nprint('공격력: 25')"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **print()** - 화면에 출력
✅ **따옴표** - 문자열 감싸기
✅ **숫자** - 따옴표 없이
✅ **쉼표** - 여러 값 한 줄에

다음 시간에는 **데이터 타입**을 배워요! 🚀`
        }
      ]
    }
  ]
}
