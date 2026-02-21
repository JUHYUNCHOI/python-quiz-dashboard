import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "매개변수",
  emoji: "📦",
  steps: [
    {
      id: "ch3-1",
      type: "explain",
      title: "매개변수가 뭐예요?",
      content: `## 📦 매개변수 = 함수에 전달하는 재료!

아까 본 코드:
\`\`\`python
def 축하(이름):    # 👈 이름 = 매개변수!
    print(f"생일 축하해! {이름}!")
\`\`\`

**매개변수**는 함수가 받을 **재료의 이름**이에요.

\`\`\`python
축하("철수")   # "철수"가 이름에 들어감
축하("영희")   # "영희"가 이름에 들어감
\`\`\`

매개변수 덕분에 **다른 값**으로 함수를 사용할 수 있어요!`
    },
    {
      id: "ch3-2",
      type: "interactive",
      title: "매개변수 구조",
      description: "매개변수가 어떻게 전달되는지 살펴보세요!",
      component: "parameterStructure"
    },
    {
      id: "ch3-3",
      type: "mission",
      title: "이름을 받는 함수",
      task: "아래 코드에 '민수'를 추가해서 3명에게 인사하세요!",
      initialCode: `def 인사(이름):
    print(f"안녕, {이름}!")

인사("철수")
인사("영희")
# 여기에 민수에게 인사하는 코드를 추가하세요!`,
      expectedOutput: "안녕, 철수!\n안녕, 영희!\n안녕, 민수!",
      hint: "인사(\"민수\")를 추가하면 돼요!",
      hint2: "마지막 줄에 인사(\"민수\")를 입력하세요"
    },
    {
      id: "ch3-4",
      type: "explain",
      title: "매개변수가 여러 개?",
      content: `## 📦📦 여러 개도 가능!

\`\`\`python
def 소개(이름, 나이):
    print(f"저는 {이름}이고, {나이}살입니다.")

소개("철수", 15)   # 이름=철수, 나이=15
소개("영희", 14)   # 이름=영희, 나이=14
\`\`\`

**쉼표(,)**로 구분해서 여러 개를 받을 수 있어요!`
    },
    {
      id: "ch3-5",
      type: "mission",
      title: "여러 매개변수 사용하기",
      task: "'민수', 16살을 추가해서 3명을 소개하세요!",
      initialCode: `def 소개(이름, 나이):
    print(f"저는 {이름}이고, {나이}살입니다.")

소개("철수", 15)
소개("영희", 14)
# 여기에 민수(16살)를 추가하세요!`,
      expectedOutput: "저는 철수이고, 15살입니다.\n저는 영희이고, 14살입니다.\n저는 민수이고, 16살입니다.",
      hint: "소개(\"민수\", 16)을 추가하면 돼요!",
      hint2: "마지막 줄에 소개(\"민수\", 16) 입력"
    },
    {
      id: "ch3-6",
      type: "interactive",
      title: "빈칸 채우기: 매개변수 사용",
      description: "매개변수를 사용해서 출력해보세요!",
      component: "fillInBlank",
      codeTemplate: "def 인사(이름):\n    print(f\"안녕, ___1___!\")\n\n인사(\"철수\")",
      blanks: [{ id: "1", answer: "{이름}", hint: "매개변수 이름을 중괄호로 감싸요" }],
      choices: ["{이름}", "이름", "\"{이름}\"", "name"],
      expectedOutput: "안녕, 철수!"
    },
    {
      id: "ch3-7",
      type: "mission",
      title: "음식 주문 함수",
      task: "order 함수가 '피자 주문이요!'처럼 출력하도록 빈칸을 채우세요",
      initialCode: `def order(food):
    print(f"_____ 주문이요!")  # food를 넣으세요

order("피자")
order("치킨")`,
      expectedOutput: "피자 주문이요!\n치킨 주문이요!",
      hint: "_____를 {food}로 바꿔요!",
      hint2: "f-string 안에 중괄호로 변수를 감싸요!"
    },
    {
      id: "ch3-8",
      type: "quiz",
      title: "매개변수 퀴즈",
      content: `다음 코드의 출력 결과는?
\`\`\`python
def 인사(이름):
    print(f"{이름}아 안녕!")

인사("민수")
\`\`\``,
      options: ["이름아 안녕!", "민수아 안녕!", "안녕!", "에러 발생"],
      answer: 1,
      explanation: "'민수'가 이름 매개변수에 전달되어 '민수아 안녕!'이 출력돼요!"
    }
  ]
}
