import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "키워드 인자",
  emoji: "🏷️",
  steps: [
    {
      id: "ch4-1",
      type: "explain",
      title: "🤔 순서가 헷갈려요!",
      content: `## 매개변수가 많으면 헷갈려요!

\`\`\`python
def 프로필(이름, 나이, 학교, 반, 번호):
    print(f'{이름}, {나이}살, {학교} {반}반 {번호}번')
\`\`\`

호출할 때:
\`\`\`python
프로필('철수', 15, '파이썬중', 3, 12)
# 어디가 뭐지? 🤔
# 15가 나이? 반? 번호?
\`\`\`

**→ 이름표를 붙이면 명확해요!**`
    },
    {
      id: "ch4-2",
      type: "explain",
      title: "🏷️ 이름표를 붙여요!",
      content: `## 키워드 인자 = 이름표!

\`\`\`python
def 소개(이름, 나이, 학교):
    print(f'{이름}, {나이}살, {학교}')
\`\`\`

### 위치 인자 (순서대로)
\`\`\`python
소개('철수', 15, '파이썬중')
\`\`\`

### 키워드 인자 (이름표!)
\`\`\`python
소개(학교='파이썬중', 이름='철수', 나이=15)
#    👆 순서 달라도 OK!
\`\`\`

**이름=값** 형태로 쓰면 순서 상관없이 전달!`
    },
    {
      id: "ch4-2-5",
      type: "interactive",
      title: "🎬 키워드 인자 보기",
      description: "애니메이션으로 이름표가 어떻게 동작하는지 확인해보세요!",
      component: "keywordArgVisualizer"
    },
    {
      id: "ch4-3",
      type: "interactive",
      title: "따라 써보기: 키워드 인자",
      description: "이름표를 붙여서 호출해보세요!",
      component: "typeAlong",
      targetCode: `def 프로필(이름, 나이, 직업):
    print(f'{이름}({나이}세) - {직업}')

프로필(직업='개발자', 나이=25, 이름='영희')`,
      expectedOutput: "영희(25세) - 개발자"
    },
    {
      id: "ch4-4",
      type: "quiz",
      title: "🛑 멈추고 예측!",
      content: `다음 코드의 출력 결과는?

\`\`\`python
def greet(name, msg='안녕'):
    print(f'{msg}, {name}!')

greet(msg='반가워', name='민수')
\`\`\``,
      options: ["안녕, 민수!", "반가워, 민수!", "민수, 반가워!", "에러 발생"],
      answer: 1,
      explanation: "키워드 인자로 msg='반가워', name='민수'가 전달! 기본값 '안녕'은 무시됩니다."
    },
    {
      id: "ch4-5",
      type: "interactive",
      title: "빈칸 채우기: 키워드 인자",
      description: "키워드 인자로 호출하세요!",
      component: "fillInBlank",
      codeTemplate: "def 주문(메뉴, 수량):\n    print(f'{메뉴} {수량}개 주문!')\n\n주문(___1___)",
      blanks: [{ id: "1", answer: "수량=3, 메뉴='피자'", hint: "이름표를 붙여서!" }],
      choices: ["수량=3, 메뉴='피자'", "3, '피자'", "'피자', 3", "메뉴:'피자', 수량:3"],
      expectedOutput: "피자 3개 주문!"
    }
  ]
}
