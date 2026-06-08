import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "반환값 (return)",
  emoji: "🎁",
  steps: [
    {
      id: "ch4-1",
      type: "explain",
      title: "💭 결과를 저장하고 싶다면?",
      content: `💭 함수가 계산한 결과를 **변수에 저장**하고 싶어! print는 화면에 보여주기만 하잖아... 결과를 **돌려받는** 방법은?

자판기에 동전을 넣으면 **음료가 나오죠.** 그 음료를 손에 받아 들어야 마실 수도 있고, 가방에 넣을 수도 있어요. 함수도 마찬가지로, 일을 시켰으면 **결과물을 손에 쥐여주는** 방법이 있어야 해요. 그게 바로 \`return\` 이에요.

\`\`\`python
def 더하기(a, b):
    return a + b  # 결과를 돌려줌!

결과 = 더하기(3, 5)   # 8이 결과에 저장됨
print(결과)           # 8
\`\`\`

\`return a + b\` 를 만나는 순간, 함수는 \`a + b\` 를 계산해서 그 값(8)을 **호출한 자리로 돌려줘요.** 그래서 \`더하기(3, 5)\` 라고 쓴 자리가 통째로 \`8\` 로 바뀌고, \`결과 = 8\` 이 되는 거예요. 이제 8은 변수에 담겨 있으니, 출력하든 또 계산하든 마음대로 쓸 수 있어요.

> 💡 \`return\` 을 만나면 함수는 그 자리에서 **즉시 끝나요.** 음료가 나왔으면 자판기 일은 끝난 거죠. \`return\` 아래에 코드가 더 있어도 실행되지 않아요.

@핵심: **return** = 결과를 돌려줘! 변수에 저장하거나 계산에 쓸 수 있어!`
    },
    {
      id: "ch4-2",
      type: "interactive",
      title: "return 구조",
      description: "return이 어떻게 작동하는지 살펴보세요!",
      component: "returnStructure"
    },
    {
      id: "ch4-3",
      type: "mission",
      title: "더하기 함수 사용하기",
      task: "10 + 7의 결과를 출력하도록 숫자를 바꿔보세요!",
      initialCode: `def 더하기(a, b):
    return a + b

결과 = 더하기(3, 5)  # 3과 5를 10과 7로 바꿔보세요!
print(결과)`,
      expectedOutput: "17",
      hint: "더하기(10, 7)로 바꿔요!",
      hint2: "결과 = 더하기(10, 7)"
    },
    {
      id: "ch4-4",
      type: "interactive",
      title: "빈칸 채우기: return 사용",
      description: "return으로 결과를 돌려주세요!",
      component: "fillInBlank",
      codeTemplate: "def 빼기(a, b):\n    ___1___ a - b\n\n결과 = 빼기(10, 3)\nprint(결과)",
      blanks: [{ id: "1", answer: "return", hint: "결과를 돌려주는 키워드" }],
      choices: ["return", "print", "def", "result"],
      expectedOutput: "7"
    },
    {
      id: "ch4-5",
      type: "explain",
      title: "💭 print랑 return이 뭐가 다르지?",
      content: `💭 둘 다 결과를 보여주는 거 아닌가? **print**로 충분하지 않을까? 차이가 뭘까?

이게 이번 레슨에서 **가장 헷갈리지만 가장 중요한** 부분이에요. 둘 다 "결과를 내놓는다" 처럼 보이지만, 누구한테 내놓느냐가 완전히 달라요.

- **print** 는 결과를 **화면에 보여주고 끝.** 사람이 눈으로 볼 수는 있지만, 프로그램은 그 값을 다시 쓸 수 없어요. (벽에 글씨를 써 붙인 것 — 읽을 순 있어도 손에 쥘 순 없죠.)
- **return** 은 결과를 **호출한 코드한테 손에 쥐여줘요.** 화면엔 안 나오지만, 변수에 담아 저장하거나 다른 계산에 쓸 수 있어요.

**print** = 화면에 보여주기만 (저장 X)
\`\`\`python
def 인사():
    print("안녕!")

x = 인사()    # "안녕!" 출력됨
print(x)      # None (비어있음 😱)
\`\`\`
\`인사()\` 는 \`return\` 이 없어요. 그러니 돌려주는 값이 없고, 파이썬은 "빈손" 을 뜻하는 \`None\` 을 줘요. 그래서 \`x\` 에 None 이 담기죠.

**return** = 값을 돌려줌 (저장 O)
\`\`\`python
def 더하기(a, b):
    return a + b

x = 더하기(3, 5)
print(x)      # 8
print(x * 2)  # 16 - 계산에도 사용 가능!
\`\`\`

> 💡 한 줄 정리: **print 는 사람한테 보여주는 것, return 은 프로그램한테 건네주는 것.**
> 점수를 계산하는 함수를 떠올려봐요. \`print\` 만 하면 화면에 점수가 *보이긴* 하지만, 그 점수로 등수를 매기거나 평균을 낼 수가 없어요 — 값이 어디에도 남아있지 않으니까요. \`return\` 으로 돌려받아야 \`총점 = 점수1 + 점수2\` 처럼 계속 이어서 쓸 수 있어요. 그래서 *계산하는 함수* 는 거의 항상 \`return\` 을 써요.

@핵심: **print**는 보여주기만, **return**은 돌려줘서 저장/계산 가능!`
    },
    {
      id: "ch4-6",
      type: "interactive",
      title: "빈칸 채우기: 곱하기 결과",
      description: "곱한 결과를 돌려주세요!",
      component: "fillInBlank",
      codeTemplate: "def multiply(a, b):\n    return ___1___\n\nprint(multiply(3, 4))",
      blanks: [{ id: "1", answer: "a * b", hint: "두 수를 곱하는 식" }],
      choices: ["a * b", "a + b", "a - b", "a / b"],
      expectedOutput: "12"
    },
    {
      id: "ch4-7",
      type: "mission",
      title: "제곱 함수 만들기",
      task: "square 함수가 숫자의 제곱을 돌려주도록 빈칸을 채우세요 (3의 제곱 = 3 * 3 = 9)",
      initialCode: `def square(n):
    return _____  # n 을 두 번 곱한 값을 돌려주세요

print(square(3))   # 9가 나와야 해요
print(square(5))   # 25가 나와야 해요`,
      expectedOutput: "9\n25",
      hint: "제곱은 같은 수를 두 번 곱하는 거예요!",
      hint2: "n을 두 번 곱하려면 n * n"
    },
    {
      id: "ch4-8",
      type: "quiz",
      title: "return 퀴즈",
      content: `다음 코드의 출력 결과는?
\`\`\`python
def 계산(a, b):
    return a * b

결과 = 계산(4, 5)
print(결과)
\`\`\``,
      options: ["9", "20", "45", "에러 발생"],
      answer: 1,
      explanation: "4 × 5 = 20이 return되어 결과에 저장됩니다!"
    }
  ]
}
