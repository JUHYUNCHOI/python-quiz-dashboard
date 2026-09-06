import { Chapter } from '../types'

export const ch7: Chapter = {
  id: "ch7",
  title: "정리",
  emoji: "🎯",
  steps: [
    {
      id: "ch7-1",
      type: "explain",
      title: "🎯 오늘 배운 3가지 총정리!",
      content: `💭 오늘 배운 기본값, 여러 값 반환, 키워드 인자... 각각 **어떻게 쓰는지** 기억나?

1️⃣ 기본값
\`\`\`python
def 함수(a, b=10):   # b 안 주면 10
    return a + b
\`\`\`
기본값 있는 건 **뒤에**!

2️⃣ 여러 값 반환
\`\`\`python
def 계산(a, b):
    return a + b, a - b   # 2개 반환

합, 차 = 계산(10, 3)       # 각각 받기
\`\`\`

3️⃣ 키워드 인자
\`\`\`python
함수(이름='철수', 나이=15)   # 순서 상관없이!
\`\`\`

@핵심: **기본값=편리함**, **여러 반환=쉼표**, **키워드 인자=이름표** 이 세 가지면 함수 마스터!`
    },
    {
      /* 2026-09-06: 이 챕터는 스텝이 explain 하나뿐이고 **퀴즈조차 없었다.**
         레슨 전체에서 유일하게 확인이 0인 마무리였다.
         형제 정리 챕터(lesson37/ch7 · lesson38/ch7)가 전부
         explain + fillInBlank + quiz 3스텝이라 같은 모양으로 맞췄다.
         (새 모양을 발명하지 않았다 — memory/quest_season_shape_consistency.md) */
      id: "ch7-2",
      type: "interactive",
      title: "빈칸 채우기: 세 가지를 한 번에",
      description: "기본값 · 여러 값 반환 · 키워드 인자를 합쳐서 완성해요.",
      component: "fillInBlank",
      codeTemplate: "def 소개(이름, 나이___1___):\n    return 이름, 나이\n\n이름, 나이 = 소개(___2___='민수')\nprint(이름, 나이)",
      blanks: [
        { id: "1", answer: "=15", hint: "기본값은 매개변수 뒤에 붙여요. 어떤 기호였죠?" },
        { id: "2", answer: "이름", hint: "이름표를 붙일 매개변수를 골라요." }
      ],
      choices: ["=15", ":15", "이름", "나이"],
      expectedOutput: "민수 15"
    },
    {
      id: "ch7-3",
      type: "quiz",
      title: "마지막 퀴즈!",
      content: `다음 코드에서 x, y 는 각각 무엇일까요?

\`\`\`python
def 계산(a, b=5):
    return a + b, a - b

x, y = 계산(10)
\`\`\``,
      options: ["15, 5", "10, 5", "15, -5", "에러 발생"],
      answer: 0,
      explanation: "b 를 안 줬으니 기본값 5 를 써요. a+b=15, a-b=5 가 튜플로 나와서 x, y 에 각각 담겨요."
    }
  ]
}
