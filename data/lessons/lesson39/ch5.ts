import { Chapter } from '../types'

export const ch5: Chapter = {
  id: "ch5",
  title: "정리 & 도전",
  emoji: "🏆",
  steps: [
    {
      id: "ch5-0",
      type: "explain",
      title: "💭 전체 코드 구조를 한눈에 보면?",
      content: `💭 데이터, 함수, 메인 루프... 지금까지 만든 게임 세이브 시스템의 **전체 구조**를 정리하면 어떤 모습일까?

\`\`\`python
import random

# 1. 데이터
캐릭터 = {'이름': '', 'HP': 100, '공격력': 25, '레벨': 1, '경험치': 0}

# 2. 기능 함수들
def 새게임(): ...       # 이름 입력, 초기화
def 저장하기(): ...     # with open('w')
def 불러오기(): ...     # try + with open('r')
def 몬스터잡기(): ...   # random + while
def 상태보기(): ...     # 딕셔너리 출력

# 3. 메인 루프
while True:             # while + try-except
    메뉴 표시
    선택에 따라 함수 호출
\`\`\`

- try-except로 **파일 없음 에러** 처리
- try-except로 **잘못된 입력** 처리
- with open으로 파일 **저장/불러오기**
- 함수로 코드 **정리**

@핵심: **데이터 + 함수들 + 메인 루프** = 깔끔한 게임 구조!`
    },
    {
      id: "ch5-1",
      type: "quiz",
      title: "최종 퀴즈!",
      content: "게임 세이브에서 '이어하기'를 할 때 필요한 것은?",
      options: [
        "with open('save.txt', 'w')만",
        "with open('save.txt', 'r') + try-except",
        "print()만",
        "input()만"
      ],
      answer: 1,
      explanation: "'r'로 읽고, 파일 없을 수도 있으니 try-except!"
    },
    {
      id: "ch5-mission",
      type: "mission",
      title: "🏆 최종 미션 — 회복 아이템 만들기",
      task: "회복() 함수를 만들어보세요. HP 를 30 회복하되, 100 을 넘지 않게 (min 사용)! 그리고 회복 후 'HP 회복! 현재 HP: ___' 형식으로 출력하세요.",
      initialCode: "캐릭터 = {'이름': '용사', 'HP': 80}\n\n# 회복() 함수를 만들어보세요\n# - HP 를 30 더하되, 100 을 넘지 않게 min() 사용\n# - 'HP 회복! 현재 HP: ___' 출력\n\n\n회복()",
      expectedOutput: "HP 회복! 현재 HP: 100",
      hint: "min(100, x) 는 x 와 100 중 작은 값. HP 가 80 이면 80+30=110 이지만 min 이 100 으로 잘라줘요.",
      hint2: "def 회복():\n    캐릭터['HP'] = min(100, 캐릭터['HP'] + 30)\n    print(f'HP 회복! 현재 HP: {캐릭터[\"HP\"]}')"
    },
    {
      id: "ch5-2",
      type: "explain",
      title: "💭 더 도전해보고 싶다면?",
      content: `💭 회복 아이템은 만들었어! 더 재밌게 하고 싶으면 도전해볼 만한 것들:

### ⭐ 도전 1: 여러 종류 몬스터
\`\`\`python
몬스터들 = ['고블린', '오크', '드래곤']
몬스터 = random.choice(몬스터들)
\`\`\`
random.choice 로 매번 다른 몬스터가 나오게!

### ⭐⭐⭐ 도전 2: 몬스터 반격
몬스터도 공격해서 내 HP 가 깎이게! while 루프 안에서 캐릭터 HP 도 같이 줄어들도록.

---
**다음 시간:** Part 6 문제 20!

@핵심: 한 번 만든 게임도 random.choice, while, 함수 분리 등으로 **계속 확장**할 수 있어요!`
    }
  ]
}
