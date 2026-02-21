import { Chapter } from '../types'

export const ch7: Chapter = {
  id: "ch7",
  title: "정리",
  emoji: "📝",
  steps: [
    {
      id: "ch7-0",
      type: "explain",
      title: "💭 오늘 배운 에러 처리, 한눈에 정리하면?",
      content: `💭 try-except 구조, 특정 에러 잡기, 여러 except... 지금까지 배운 걸 **한번에 정리**하면 어떤 모습일까?

\`\`\`python
try:
    숫자 = int(input())
    print(10 / 숫자)
except ValueError:
    print('숫자가 아님!')
except ZeroDivisionError:
    print('0으로 나눔!')
\`\`\`

- **try**: 시도해봐
- **except**: 에러나면 이거 해
- **ValueError**: 값 변환 실패
- **ZeroDivisionError**: 0으로 나눔
- 사용자 입력은 항상 try-except!

@핵심: **try-except**로 에러를 잡으면 프로그램이 안 멈춰! 에러별로 다르게 처리도 가능!`
    },
    {
      id: "ch7-1",
      type: "interactive",
      title: "빈칸 채우기: 최종 정리",
      description: "try-except 구조를 한번 더!",
      component: "fillInBlank",
      codeTemplate: "___1___:\n    숫자 = int('abc')\n___2___ ValueError:\n    print('처리 완료!')",
      blanks: [
        { id: "1", answer: "try", hint: "시도!" },
        { id: "2", answer: "except", hint: "에러를 잡는!" }
      ],
      choices: ["try", "except", "if", "else", "catch", "finally"],
      expectedOutput: "처리 완료!"
    },
    {
      id: "ch7-2",
      type: "quiz",
      title: "마지막 퀴즈!",
      content: "try-except에서 try의 역할은?",
      options: [
        "에러 발생시 실행",
        "에러가 날 수 있는 코드 실행",
        "프로그램 종료",
        "변수 선언"
      ],
      answer: 1,
      explanation: "try 안에 에러가 날 수 있는 코드를 넣어요!"
    }
  ]
}
