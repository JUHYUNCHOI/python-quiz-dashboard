import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "인스턴스 변수 vs 클래스 변수",
  emoji: "🔀",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "💭 게임 제목처럼 모두 같은 값은 어디에?",
      content: `💭 용사의 HP와 마법사의 HP는 각각 달라야 하는데... **게임 제목**은 모두 같잖아? 이건 어디에 저장하지?

- \`self.hp\` → 각 캐릭터마다 **다른 값** (인스턴스 변수)
- 게임 제목 → 모두 **같은 값**이어야 해...?

@핵심: 각자 다른 값 = **인스턴스 변수**, 모두 같은 값 = **???** (다음 스텝에서!)`
    },
    {
      id: "ch3-0a",
      type: "explain",
      title: "💭 클래스 변수로 모두 공유하는 값을 만들자!",
      content: `💭 **클래스 안, 메서드 밖**에 변수를 선언하면 모든 객체가 공유할 수 있어!

\`\`\`python
class Character:
    game_title = 'RPG 용사 게임'  # 클래스 변수 (공유!)

    def __init__(self, char_name, hp):
        self.char_name = char_name   # 인스턴스 변수 (각자!)
        self.hp = hp                 # 인스턴스 변수 (각자!)
\`\`\`

| 종류 | 선언 위치 | 접근 방법 | 특징 |
|------|-----------|-----------|------|
| 인스턴스 변수 | __init__ 안 | self.xxx | 각자 다른 값 |
| 클래스 변수 | 메서드 밖 | Character.xxx | 모두 공유 |

@핵심: **인스턴스 변수(self.xxx)**는 각자, **클래스 변수(Character.xxx)**는 모두 공유!`
    },
    {
      id: "ch3-1",
      type: "tryit",
      title: "💻 클래스 변수 체험!",
      task: "클래스 변수와 인스턴스 변수의 차이를 확인해보세요!",
      initialCode: `class Character:
    game_title = 'RPG 용사 게임'
    total_count = 0

    def __init__(self, char_name, hp):
        self.char_name = char_name
        self.hp = hp
        Character.total_count = Character.total_count + 1
        print(f'{char_name} 생성! (현재 총 {Character.total_count}명)')

hero = Character('용사', 100)
mage = Character('마법사', 80)
archer = Character('궁수', 90)

print(f'\\n게임 제목: {Character.game_title}')
print(f'캐릭터 수: {Character.total_count}명')
print(f'{hero.char_name}의 HP: {hero.hp}')
print(f'{mage.char_name}의 HP: {mage.hp}')`,
      expectedOutput: `용사 생성! (현재 총 1명)\n마법사 생성! (현재 총 2명)\n궁수 생성! (현재 총 3명)\n\n게임 제목: RPG 용사 게임\n캐릭터 수: 3명\n용사의 HP: 100\n마법사의 HP: 80`,
      hint: "Character.total_count는 모든 객체가 공유하지만, self.hp는 각자 달라요!",
      hint2: "클래스 변수는 Character.변수명으로, 인스턴스 변수는 self.변수명으로 접근!"
    },
    {
      id: "ch3-1b",
      type: "mission",
      title: "🎯 미션: 클래스 변수 활용!",
      task: "빈칸 3개를 채워서 팀 시스템을 완성하세요!",
      initialCode: `class TeamMember:
    team_name = 'RPG 모험단'
    member_count = ___

    def __init__(self, name, role):
        self.name = name
        self.role = role
        TeamMember.member_count = TeamMember.___ + 1

    def introduce(self):
        print(f'[{TeamMember.team_name}] {self.name} ({self.role})')

m1 = TeamMember('용사', '전사')
m2 = TeamMember('린', '궁수')
m3 = TeamMember('소피아', '힐러')

m1.introduce()
m2.introduce()
m3.introduce()
print(f'\\n팀원 수: {TeamMember.___}명')`,
      expectedOutput: `[RPG 모험단] 용사 (전사)\n[RPG 모험단] 린 (궁수)\n[RPG 모험단] 소피아 (힐러)\n\n팀원 수: 3명`,
      hint: "클래스 변수는 0으로 시작, member_count를 1씩 증가!",
      hint2: "0 / member_count / member_count"
    },
    {
      id: "ch3-2",
      type: "quiz",
      title: "퀴즈: 변수 구분!",
      content: "다음 중 **클래스 변수**에 대한 설명으로 옳은 것은?",
      options: [
        "각 객체마다 다른 값을 가진다",
        "self.xxx 형태로 선언한다",
        "모든 객체가 같은 값을 공유한다",
        "__init__ 안에서만 만들 수 있다"
      ],
      answer: 2,
      explanation: "클래스 변수는 모든 객체가 공유해요! 클래스 안, 메서드 밖에 선언해요!"
    },
    {
      id: "ch3-3",
      type: "quiz",
      title: "퀴즈: 코드 예측!",
      content: "다음 코드의 결과는?\n\n```python\nclass Pet:\n    count = 0\n    \n    def __init__(self, name):\n        self.name = name\n        Pet.count = Pet.count + 1\n\na = Pet('멍멍이')\nb = Pet('냥냥이')\nc = Pet('짹짹이')\nprint(Pet.count, a.name)\n```",
      options: [
        "1 멍멍이",
        "3 멍멍이",
        "3 짹짹이",
        "에러"
      ],
      answer: 1,
      explanation: "Pet.count는 클래스 변수라 3마리를 만들면 3이 돼요! a.name은 '멍멍이' 그대로!"
    }
  ]
}
