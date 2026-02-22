import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "여러 에러 처리하기",
  emoji: "🎯",
  steps: [
    {
      id: "ch4-0",
      type: "explain",
      title: "💭 한 코드에서 에러가 두 종류 날 수 있다면?",
      content: `💭 숫자를 입력받아 나누는 코드에서... 'abc' 입력하면 **ValueError**, 0 입력하면 **ZeroDivisionError**! 둘 다 잡아야 하는데?

\`\`\`python
try:
    숫자 = int(input('숫자: '))
    결과 = 10 / 숫자
except ValueError:
    print('숫자를 입력하세요!')
\`\`\`

→ 이러면 ValueError만 잡히고 **0 입력하면 여전히 에러!**

@핵심: try 안에 **여러 종류의 에러**가 날 수 있어! except 하나론 부족할 수 있어!`
    },
    {
      id: "ch4-0a",
      type: "explain",
      title: "💭 except를 여러 개 쓰면 해결!",
      content: `💭 except를 **하나 더 추가**하면 두 에러 다 잡을 수 있을까?

\`\`\`python
except ValueError:
    print('숫자를 입력하세요!')
except ZeroDivisionError:       # 👈 추가!
    print('0으로 나눌 수 없어요!')
\`\`\`

- 'abc' 입력 → \`숫자를 입력하세요!\`
- 0 입력 → \`0으로 나눌 수 없어요!\`

@핵심: **except를 여러 개** 쓰면 에러별로 다른 메시지를 보여줄 수 있어!`
    },
    {
      id: "ch4-1",
      type: "interactive",
      title: "🎯 여러 except 흐름 체험!",
      description: "입력값에 따라 어떤 except가 실행되는지 직접 확인해보세요!",
      component: "multiExceptFlow"
    },
    {
      id: "ch4-2",
      type: "interactive",
      title: "빈칸 채우기: 여러 except",
      description: "두 가지 에러를 각각 잡아보세요!",
      component: "fillInBlank",
      codeTemplate: "try:\n    x = int(input())\n    print(10 / x)\nexcept ___1___:\n    print('숫자 아님!')\nexcept ___2___:\n    print('0 안돼!')",
      blanks: [
        { id: "1", answer: "ValueError", hint: "숫자가 아닌 걸 변환할 때!" },
        { id: "2", answer: "ZeroDivisionError", hint: "0으로 나눌 때!" }
      ],
      choices: ["ValueError", "ZeroDivisionError", "FileNotFoundError", "TypeError"],
      expectedOutput: ""
    },
    {
      id: "ch4-3",
      type: "quiz",
      title: "예측해보세요!",
      content: `'abc' 입력하면?

\`\`\`python
try:
    x = int(input())  # 'abc' 입력
    print(10 / x)
except ValueError:
    print('A')
except ZeroDivisionError:
    print('B')
\`\`\``,
      options: ["A", "B", "A와 B 둘 다", "에러"],
      answer: 0,
      explanation: "'abc'는 숫자가 아니라 ValueError → 'A' 출력!"
    },
    {
      id: "ch4-4",
      type: "quiz",
      title: "예측해보세요!",
      content: `'0' 입력하면?

\`\`\`python
try:
    x = int(input())  # '0' 입력
    print(10 / x)
except ValueError:
    print('A')
except ZeroDivisionError:
    print('B')
\`\`\``,
      options: ["A", "B", "10", "에러"],
      answer: 1,
      explanation: "0으로 나누면 ZeroDivisionError → 'B' 출력!"
    }
  ]
}
