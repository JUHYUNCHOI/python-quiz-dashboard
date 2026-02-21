import { Chapter } from '../types'

export const ch5: Chapter = {
  id: "ch5",
  title: "게임에서 에러 처리",
  emoji: "🎮",
  steps: [
    {
      id: "ch5-0",
      type: "interactive",
      title: "🎮 직접 체험: 게임 크래시!",
      description: "try-except가 있을 때와 없을 때를 직접 비교해보세요!",
      component: "gameCrashDemo"
    },
    {
      id: "ch5-1",
      type: "explain",
      title: "❌ 에러 처리 없는 게임",
      content: `## 문제: 잘못된 입력으로 게임 종료!

\`\`\`python
import random
정답 = random.randint(1, 10)

while True:
    추측 = int(input('1-10 숫자: '))
    if 추측 == 정답:
        print('정답!')
        break
\`\`\`

**'abc' 입력하면?**
- ValueError!
- 게임 끝! 💥`
    },
    {
      id: "ch5-2",
      type: "explain",
      title: "✅ 에러 처리 있는 게임",
      content: `## try-except로 감싸면!

\`\`\`python
import random
정답 = random.randint(1, 10)

while True:
    try:
        추측 = int(input('1-10 숫자: '))
        if 추측 == 정답:
            print('정답!')
            break
        elif 추측 < 정답:
            print('UP!')
        else:
            print('DOWN!')
    except ValueError:
        print('숫자만 입력해주세요!')
\`\`\`

**'abc' 입력해도:**
- \`숫자만 입력해주세요!\` 출력
- 게임 계속! ✅`
    },
    {
      id: "ch5-3",
      type: "interactive",
      title: "빈칸 채우기: 게임 에러 처리",
      description: "게임 코드에 에러 처리를 추가하세요!",
      component: "fillInBlank",
      codeTemplate: "while True:\n    ___1___:\n        x = int(input('숫자: '))\n        print(x * 2)\n    except ___2___:\n        print('숫자만!')",
      blanks: [
        { id: "1", answer: "try", hint: "시도해본다!" },
        { id: "2", answer: "ValueError", hint: "숫자 변환 실패 에러!" }
      ],
      choices: ["try", "except", "ValueError", "ZeroDivisionError", "if", "while"],
      expectedOutput: ""
    },
    {
      id: "ch5-4",
      type: "quiz",
      title: "퀴즈!",
      content: "게임에서 사용자 입력은?",
      options: [
        "try-except 필요 없음",
        "항상 try-except로 감싸기",
        "가끔만 처리",
        "에러 무시"
      ],
      answer: 1,
      explanation: "사용자 입력은 항상 예상 못 할 수 있어요! try-except 필수!"
    }
  ]
}
