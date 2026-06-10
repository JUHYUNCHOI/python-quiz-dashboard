import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "에러 종류 알아보기",
  emoji: "📋",
  steps: [
    {
      id: "ch3-0",
      type: "interactive",
      title: "📋 에러 종류 카드!",
      description: "카드를 클릭해서 각 에러가 언제 발생하는지 알아보세요!",
      component: "errorTypesCards"
    },
    {
      id: "ch3-1",
      type: "explain",
      title: "💭 특정 에러만 골라서 잡으려면?",
      content: `💭 에러가 여러 종류인데... **내가 원하는 에러만** 잡을 수는 없을까?

\`\`\`python
try:
    숫자 = int('abc')
except ValueError:       # 👈 에러 이름 지정!
    print('숫자로 바꿀 수 없어요!')
\`\`\`

→ except 뒤에 **에러 이름**을 쓰면 그 에러만 잡아요!

**그냥 \`except:\` 로 다 잡으면 편한데, 왜 굳이 이름을 쓸까?** 🛟 그물을 생각해봐요. 곡예사가 떨어지라고 친 그물인데, *지나가던 새, 떨어진 모자, 사고로 미끄러진 직원* 까지 전부 받아버리면 — "어? 방금 그물에 걸린 게 곡예사 맞나?" 헷갈리겠죠. \`except:\` (이름 없는 그물)는 **모든 에러를 무조건 다 받아버려요.** 내가 예상한 ValueError 도, *전혀 예상 못 한 진짜 버그* (변수 이름 오타, 함수 잘못 호출 등)도 똑같이 "처리됨"으로 넘겨버려요. 그럼 진짜 버그가 \`'숫자로 바꿀 수 없어요!'\` 메시지 뒤에 숨어서 — 영원히 못 찾을 수도 있어요.

\`except ValueError:\` 라고 이름을 콕 집으면 → "값 변환 실패만 받고, **나머지 에러는 그냥 통과시켜** 평소처럼 멈추게 해줘" 라는 뜻이에요. 그래야 *예상한 실수* 와 *진짜 버그* 를 구분할 수 있어요.

> ⚠️ 이름 없는 \`except:\` 는 *모든* 에러를 삼켜서 **진짜 버그까지 숨겨버려요.** "어디가 틀렸지?" 를 영영 못 찾게 만드는 함정이에요. 그래서 \`except 에러이름:\` 으로 *내가 예상한 에러만* 콕 집어 잡는 게 좋아요.

@핵심: \`except ValueError:\` 처럼 **에러 이름을 지정**하면 특정 에러만 잡을 수 있어! (이름 없는 except 는 진짜 버그까지 숨김)`
    },
    {
      id: "ch3-1a",
      type: "explain",
      title: "💭 다른 에러도 같은 방법으로?",
      content: `💭 ValueError를 잡는 법을 알았어! 그러면 **0으로 나누기** 에러도 같은 방식으로 잡을 수 있을까?

\`\`\`python
try:
    결과 = 10 / 0
except ZeroDivisionError:  # 👈 0나누기 에러!
    print('0으로 나눌 수 없어요!')
\`\`\`

→ 에러 이름만 바꾸면 **다른 에러도 같은 패턴**으로 잡아!

좋은 소식은 — *패턴은 항상 똑같다*는 거예요. \`except\` 뒤에 들어가는 **이름표만 갈아끼우면** 돼요. 숫자 변환 실패면 \`ValueError\`, 0 으로 나누면 \`ZeroDivisionError\`, 없는 파일을 열면 \`FileNotFoundError\` — 상황마다 파이썬이 정해둔 이름이 다르고, 그 이름을 그대로 적어주면 그 에러만 잡혀요.

이름이 다른 게 오히려 좋은 점이에요. 에러 이름 자체가 *"무엇이 잘못됐는지"* 알려주는 라벨이거든요. \`ZeroDivisionError\` 만 봐도 "아, 0 으로 나눴구나" 하고 바로 알 수 있죠. (에러 이름은 lesson 9 끝에서 살짝 만났던 그 ValueError 와 똑같은 식구예요.)

> 💡 에러 이름 = *"무엇이 잘못됐는지"* 를 알려주는 라벨. \`ValueError\` = 값이 규칙에 안 맞음 · \`ZeroDivisionError\` = 0 으로 나눔. 이름만 정확히 적으면 그 에러만 콕 잡혀요.

@핵심: 에러 종류마다 이름이 달라! **ValueError**, **ZeroDivisionError** 등!`
    },
    {
      id: "ch3-2",
      type: "interactive",
      title: "✏️ 특정 에러 잡기 따라치기!",
      description: "ValueError를 잡는 코드를 직접 써보세요!",
      component: "typeAlong",
      targetTitle: "ValueError 잡기",
      targetDescription: "except 뒤에 에러 이름을 써요",
      targetCode: "try:\n    숫자 = int('abc')\nexcept ValueError:\n    print('숫자가 아니에요!')",
      expectedOutput: "숫자가 아니에요!"
    },
    {
      id: "ch3-3",
      type: "interactive",
      title: "빈칸 채우기: 특정 에러",
      description: "0으로 나누는 에러를 잡아보세요!",
      component: "fillInBlank",
      codeTemplate: "try:\n    print(10 / 0)\nexcept ___1___:\n    print('0으로 못 나눠요!')",
      blanks: [
        { id: "1", answer: "ZeroDivisionError", hint: "0으로 나눌 때 나는 에러!" }
      ],
      choices: ["ZeroDivisionError", "ValueError", "FileNotFoundError", "Error"],
      expectedOutput: "0으로 못 나눠요!"
    },
    {
      id: "ch3-4",
      type: "quiz",
      title: "퀴즈!",
      content: "`int('hello')`는 어떤 에러?",
      options: ["ZeroDivisionError", "ValueError", "FileNotFoundError", "에러 없음"],
      answer: 1,
      explanation: "'hello'는 숫자가 아니라서 ValueError!"
    },
    {
      id: "ch3-5",
      type: "quiz",
      title: "퀴즈!",
      content: "10 / 0은 어떤 에러?",
      options: ["ValueError", "ZeroDivisionError", "FileNotFoundError", "에러 없음"],
      answer: 1,
      explanation: "0으로 나누면 ZeroDivisionError!"
    }
  ]
}
