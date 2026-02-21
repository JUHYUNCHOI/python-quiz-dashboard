import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "여러 에러 처리하기",
  emoji: "🎯",
  steps: [
    {
      id: "ch4-0",
      type: "explain",
      title: "💭 에러마다 다른 메시지를 보여주려면?",
      content: `💭 "abc" 입력하면 "숫자를 입력하세요!", 0 입력하면 "0으로 못 나눠요!"... **에러별로 다른 메시지**를 보여주고 싶은데?

\`\`\`python
try:
    숫자a = int(input('첫 번째 숫자: '))
    숫자b = int(input('두 번째 숫자: '))
    결과 = 숫자a / 숫자b
    print(f'결과: {결과}')
except ValueError:
    print('숫자를 입력하세요!')
except ZeroDivisionError:
    print('0으로 나눌 수 없어요!')
\`\`\`

- 'abc' 입력 → \`숫자를 입력하세요!\`
- 0 입력 → \`0으로 나눌 수 없어요!\`

@핵심: **except를 여러 개** 쓰면 에러별로 다른 처리가 가능해!`
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
