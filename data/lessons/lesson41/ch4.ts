import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "실습 & 정리",
  emoji: "🎮",
  steps: [
    {
      id: "ch4-0",
      type: "explain",
      title: "💭 Monster 클래스, 어떻게 만들까?",
      content: `💭 Character 클래스를 배웠으니까... **Monster 클래스**도 비슷하게 만들 수 있겠지? 어떤 속성이 필요할까?

**요구사항:**
- 속성: char_name, hp, atk
- 몬스터 3마리 생성: 슬라임, 고블린, 드래곤
- 각 몬스터 정보 출력

⏱️ 5분 도전!

### 힌트
\`\`\`python
class Monster:
    def __init__(self, char_name, hp, atk):
        # self.xxx = xxx 형태로 3개 저장!
\`\`\`

@핵심: 클래스 구조는 같다 — \`class 이름: → __init__ → self.속성 = 값\`!`
    },
    {
      id: "ch4-1",
      type: "interactive",
      title: "✏️ 몬스터 클래스 따라치기!",
      description: "Monster 클래스를 직접 만들어보세요!",
      component: "typeAlong",
      targetTitle: "몬스터 클래스",
      targetDescription: "3마리 몬스터 생성하기",
      targetCode: "class Monster:\n    def __init__(self, name, hp, atk):\n        self.name = name\n        self.hp = hp\n        self.atk = atk\n\nslime = Monster('슬라임', 30, 5)\ngoblin = Monster('고블린', 50, 10)\ndragon = Monster('드래곤', 200, 50)\n\nprint(f'{slime.name}: HP {slime.hp}')\nprint(f'{dragon.name}: HP {dragon.hp}')",
      expectedOutput: "슬라임: HP 30\n드래곤: HP 200"
    },
    {
      id: "ch4-2",
      type: "interactive",
      title: "빈칸 채우기: Student 클래스",
      description: "학생 정보를 담는 클래스를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "___1___ Student:\n    def __init__(___2___, name, grade, score):\n        self.name = name\n        self.grade = ___3___\n        self.score = score\n\ns1 = Student('철수', 3, 85)\nprint(f'{s1.___4___}: {s1.grade}학년, {s1.score}점')",
      blanks: [
        { id: "1", answer: "class", hint: "클래스 정의!" },
        { id: "2", answer: "s, name, grade, score", hint: "s + 매개변수 3개!" },
        { id: "3", answer: "grade", hint: "학년을 저장!" },
        { id: "4", answer: "name", hint: "이름 속성!" }
      ],
      choices: ["class", "def", "s, name, grade, score", "name, grade, score", "grade", "score", "name", "student"],
      expectedOutput: "철수: 3학년, 85점"
    },
    {
      id: "ch4-3",
      type: "quiz",
      title: "최종 퀴즈!",
      content: "다음 코드의 결과는?\n\n```python\nclass Character:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp\n\na = Character('용사', 100)\nb = Character('마법사', 80)\na.hp = a.hp - 20\nprint(a.hp, b.hp)\n```",
      options: ["80 80", "100 80", "80 60", "에러"],
      answer: 0,
      explanation: "a와 b는 서로 다른 객체! a.hp만 줄어들고 b.hp는 그대로 80!"
    },
    {
      id: "ch4-4",
      type: "explain",
      title: "💭 오늘 배운 걸 한눈에 정리하면?",
      content: `💭 class, __init__, self... 오늘 배운 것들을 **표 하나**로 정리할 수 있을까?

| 코드 | 설명 | 예시 |
|------|------|------|
| class 클래스명: | 클래스 정의 (틀) | class Character: |
| def __init__(self): | 초기화 함수 | def __init__(self, hp): |
| s | 객체 자신 (self) | self.hp = hp |
| 클래스명() | 객체 생성 | hero = Character() |
| 객체.속성 | 속성 접근 | hero.hp |

### ✅ 체크리스트
- □ 클래스 = 틀, 객체 = 찍어낸 것
- □ class로 클래스를 정의할 수 있다
- □ __init__이 언제 실행되는지 안다
- □ s(self)가 뭔지 이해했다

@핵심: 클래스는 **틀**, 객체는 **찍어낸 것**, s는 **나 자신**!`
    }
  ]
}
