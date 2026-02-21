import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "🎉 Part 6 완료!",
  emoji: "🏆",
  steps: [
    {
      id: "ch4-0",
      type: "explain",
      title: "💭 Part 6 전체를 한눈에 정리하면?",
      content: `💭 에러 처리, 파일 다루기, 게임 세이브... Part 6에서 배운 모든 것을 **한번에 정리**하면?

\`\`\`python
try:
    위험한_코드()
except 에러이름:
    처리_코드()
finally:
    항상_실행()
\`\`\`

| 에러 | 원인 |
|------|------|
| **ValueError** | 잘못된 값 (int('abc')) |
| **ZeroDivisionError** | 0으로 나누기 |
| **FileNotFoundError** | 파일 없음 |
| **IndexError** | 인덱스 범위 초과 |

- **'w'** = 쓰기, **'r'** = 읽기, **'a'** = 추가
- **while True + try-except** = 안전한 입력
- **try + with open('r')** = 안전한 파일 읽기

@핵심: **try-except + with open** = Part 6의 핵심 패턴! 에러 처리와 파일 다루기 마스터!`
    },
    {
      id: "ch4-1",
      type: "quiz",
      title: "마지막 퀴즈!",
      content: "Part 6에서 가장 중요한 패턴은?",
      options: [
        "print()만 잘 쓰면 됨",
        "try-except로 에러 처리 + with open으로 파일 다루기",
        "변수만 잘 쓰면 됨",
        "for문만 잘 쓰면 됨"
      ],
      answer: 1,
      explanation: "try-except + with open = Part 6의 핵심!"
    },
    {
      id: "ch4-2",
      type: "explain",
      title: "💭 다음엔 뭘 배울까?",
      content: `💭 딕셔너리로 캐릭터를 관리했는데... 캐릭터를 **틀처럼 찍어내는** 더 멋진 방법이 있다면?

\`\`\`python
class 캐릭터:
    def __init__(self, 이름, HP):
        self.이름 = 이름
        self.HP = HP

용사 = 캐릭터('용사', 100)
\`\`\`

@핵심: Part 7에서는 **클래스** = 붕어빵 틀처럼 객체를 찍어내는 방법을 배워!`
    }
  ]
}
