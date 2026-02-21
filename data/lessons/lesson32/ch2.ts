import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "함수 호출하기",
  emoji: "📞",
  steps: [
    {
      id: "ch2-1",
      type: "explain",
      title: "💭 만들었는데 왜 아무 일도 안 돼?",
      content: `💭 함수를 만들었는데... 실행하면 **아무것도 안 나와**! 왜 그럴까?

\`\`\`python
def 축하(이름):
    print(f"생일 축하해! {이름}!")

# 여기까지는 아무것도 출력 안 됨! 😮
\`\`\`

함수를 **호출(부르기)**해야 실행돼요:

\`\`\`python
축하("철수")  # 👈 이렇게 불러야 실행!
\`\`\`

@핵심: 함수는 **만들기만 하면 안 되고**, \`함수이름(값)\`으로 **호출**해야 실행돼!`
    },
    {
      id: "ch2-2",
      type: "explain",
      title: "💭 호출하면 어떻게 되지?",
      content: `💭 축하("철수")라고 부르면... **이름** 자리에 "철수"가 들어갈까?

\`\`\`python
def 축하(이름):
    print(f"생일 축하해! {이름}!")

축하("철수")   # → "생일 축하해! 철수!"
축하("영희")   # → "생일 축하해! 영희!"
축하("민수")   # → "생일 축하해! 민수!"
\`\`\`

@핵심: 호출할 때마다 함수 안의 코드가 실행! 이름만 바꿔서 **몇 번이든** OK!`
    },
    {
      id: "ch2-3",
      type: "explain",
      title: "💭 메시지를 바꿔야 한다면?",
      content: `💭 "생일 축하해!"를 "Happy Birthday!"로 바꾸려면? **함수 없이 vs 있을 때** 얼마나 다를까?

**함수 없이:** 10줄 다 수정 😵
\`\`\`python
print("생일 축하해! 철수!")
print("생일 축하해! 영희!")
print("생일 축하해! 민수!")
\`\`\`

**함수 있을 때:** 함수 안만 수정! 😎
\`\`\`python
def 축하(이름):
    print(f"생일 축하해! {이름}!")

축하("철수")
축하("영희")
축하("민수")
\`\`\`

@핵심: 함수를 쓰면 **한 곳만 고치면** 전부 바뀌어! 유지보수가 쉬워져!`
    },
    {
      id: "ch2-4",
      type: "interactive",
      title: "따라 써보기: 간단한 함수",
      description: "위의 코드를 보고 똑같이 써보세요!",
      component: "typeAlong",
      targetCode: `def 인사():
    print("안녕하세요!")

인사()`,
      expectedOutput: "안녕하세요!"
    },
    {
      id: "ch2-5",
      type: "interactive",
      title: "따라 써보기: 여러 번 호출",
      description: "함수를 3번 호출해서 3번 출력해봐요!",
      component: "typeAlong",
      targetCode: `def 인사():
    print("안녕하세요!")

인사()
인사()
인사()`,
      expectedOutput: "안녕하세요!\n안녕하세요!\n안녕하세요!"
    },
    {
      id: "ch2-6",
      type: "interactive",
      title: "빈칸 채우기: 함수 호출",
      description: "빈칸을 클릭하고 알맞은 선택지를 골라요!",
      component: "fillInBlank",
      codeTemplate: `def 인사():
    print("안녕하세요!")

___1___`,
      blanks: [{ id: "1", answer: "인사()", hint: "함수를 부르려면 함수이름()" }],
      choices: ["인사()", "인사", "print()", "def"],
      expectedOutput: "안녕하세요!"
    },
    {
      id: "ch2-7",
      type: "interactive",
      title: "빈칸 채우기: 함수 완성",
      description: "함수를 완성하고 호출해보세요!",
      component: "fillInBlank",
      codeTemplate: "___1___ fun():\n    ___2___(\"파이썬 재밌다!\")\n\n___3___",
      blanks: [
        { id: "1", answer: "def", hint: "함수를 만들 때 쓰는 키워드" },
        { id: "2", answer: "print", hint: "화면에 출력하는 함수" },
        { id: "3", answer: "fun()", hint: "함수를 호출!" }
      ],
      choices: ["def", "print", "fun()", "return", "fun", "()"],
      expectedOutput: "파이썬 재밌다!"
    },
    {
      id: "ch2-8",
      type: "quiz",
      title: "확인 퀴즈",
      content: `다음 코드의 출력 결과는?
\`\`\`python
def 안녕():
    print("Hi!")

안녕()
안녕()
\`\`\``,
      options: ["Hi!", "Hi! 가 2번 출력됨", "아무것도 출력 안 됨", "에러 발생"],
      answer: 1,
      explanation: "안녕()을 2번 호출했으니 'Hi!'가 2번 출력돼요!"
    }
  ]
}
