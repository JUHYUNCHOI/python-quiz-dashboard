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
      title: "💭 게임에서 에러 처리 안 하면?",
      content: `💭 숫자 맞추기 게임을 만들었는데... 사용자가 **'abc'**를 입력하면? 게임이 그냥 **꺼져버릴까?**

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
- 게임 끝! 💥

@핵심: 에러 처리 없으면 **잘못된 입력 한 번에 게임 종료!**`
    },
    {
      id: "ch5-2",
      type: "explain",
      title: "💭 게임이 안 꺼지게 하려면?",
      content: `💭 잘못된 입력을 해도 게임이 **계속 돌아가게** 하고 싶어! while 안에서 try-except를 쓰면 어떻게 될까?

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
- 게임 계속! ✅

@핵심: **while + try-except** = 잘못 입력해도 게임이 안 꺼지고 계속!`
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
