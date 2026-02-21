import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "여러 값 반환하기",
  emoji: "📤",
  steps: [
    {
      id: "ch3-1",
      type: "explain",
      title: "💭 결과가 2개 필요하면?",
      content: `💭 17 나누기 5의 **몫**과 **나머지**가 동시에 필요해. 함수는 결과를 하나만 돌려주는데... 두 개를 한 번에 받을 방법 없을까?

\`\`\`python
# 두 번 계산해야 하나? 😩
몫 = 17 // 5      # 3
나머지 = 17 % 5   # 2
\`\`\`

함수 하나로 **둘 다** 받을 수 없을까?

@핵심: 함수에서 **여러 값을 한 번에 돌려받는** 방법이 필요하다!`
    },
    {
      id: "ch3-2",
      type: "explain",
      title: "📦 return에 쉼표를 쓰면?",
      content: `💭 return 뒤에 **쉼표로 값을 나열**하면 어떻게 될까? 받을 때는 어떻게 받지?

\`\`\`python
def 나누기(숫자, 나누는수):
    몫 = 숫자 // 나누는수
    나머지 = 숫자 % 나누는수
    return 몫, 나머지    # 👈 쉼표로 2개!
\`\`\`

받는 방법:
\`\`\`python
# 방법 1: 하나로 받기 (튜플)
결과 = 나누기(17, 5)
print(결과)      # (3, 2)

# 방법 2: 각각 받기 ✅ 추천!
몫, 나머지 = 나누기(17, 5)
print(몫)        # 3
print(나머지)    # 2
\`\`\`

**return 값1, 값2** → **변수1, 변수2 = 함수()**

@핵심: return에 **쉼표**로 여러 값을 나열하면, 변수도 쉼표로 **각각 받을 수 있다!**`
    },
    {
      id: "ch3-3",
      type: "interactive",
      title: "🎬 여러 값 반환 체험!",
      description: "클릭하며 두 값이 어떻게 반환되는지 직접 확인해보세요!",
      component: "multipleReturnVisualizer"
    },
    {
      id: "ch3-4",
      type: "interactive",
      title: "따라 써보기: 여러 값 반환",
      description: "몫과 나머지를 한 번에 받아보세요!",
      component: "typeAlong",
      targetCode: `def 나누기(a, b):
    return a // b, a % b

몫, 나머지 = 나누기(17, 5)
print(f'몫: {몫}, 나머지: {나머지}')`,
      expectedOutput: "몫: 3, 나머지: 2"
    },
    {
      id: "ch3-5",
      type: "interactive",
      title: "빈칸 채우기: 여러 값 반환",
      description: "합과 곱을 한 번에 반환하세요!",
      component: "fillInBlank",
      codeTemplate: "def calc(a, b):\n    return ___1___\n\n합, 곱 = calc(3, 5)\nprint(f'합: {합}, 곱: {곱}')",
      blanks: [{ id: "1", answer: "a + b, a * b", hint: "쉼표로 두 값을 나열!" }],
      choices: ["a + b, a * b", "a + b", "a * b", "a + b & a * b"],
      expectedOutput: "합: 8, 곱: 15"
    },
    {
      id: "ch3-6",
      type: "mission",
      title: "📊 최대/최소 함수",
      task: "리스트의 최대값과 최소값을 한 번에 반환하세요!",
      initialCode: `def 최대최소(숫자들):
    # max()는 최대값, min()은 최소값!
    # 두 값을 한 번에 return하세요


최대, 최소 = 최대최소([3, 7, 1, 9, 4])
print(f'최대: {최대}, 최소: {최소}')`,
      expectedOutput: "최대: 9, 최소: 1",
      hint: "return max(숫자들), min(숫자들)",
      hint2: "쉼표로 두 값을 나열하면 돼요!"
    },
    {
      id: "ch3-7",
      type: "mission",
      title: "📈 통계 함수",
      task: "합계와 평균을 한 번에 반환하세요!",
      initialCode: `def 통계(숫자들):
    합계 = sum(숫자들)
    평균 = 합계 / len(숫자들)
    # 합계와 평균을 한 번에 return하세요!


합계, 평균 = 통계([10, 20, 30])
print(f'합계: {합계}, 평균: {평균}')`,
      expectedOutput: "합계: 60, 평균: 20.0",
      hint: "return에 쉼표로 두 값을 나열!",
      hint2: "return 합계, 평균"
    }
  ]
}
