import { Chapter } from '../types'

export const ch5: Chapter = {
  id: "ch5",
  title: "정리 & 도전",
  emoji: "🏆",
  steps: [
    {
      id: "ch5-0",
      type: "explain",
      title: "🏗️ 전체 구조 정리!",
      content: `## 게임 세이브 시스템 구조

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

### 이 프로젝트에서 배운 것!
- try-except로 **파일 없음 에러** 처리
- try-except로 **잘못된 입력** 처리
- with open으로 파일 **저장/불러오기**
- 함수로 코드 **정리**`
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
      id: "ch5-2",
      type: "explain",
      title: "🚀 도전 과제!",
      content: `## 추가 기능을 만들어보세요!

### ⭐ 도전 1: 여러 종류 몬스터
\`\`\`python
몬스터들 = ['고블린', '오크', '드래곤']
몬스터 = random.choice(몬스터들)
\`\`\`

### ⭐⭐ 도전 2: 회복 아이템
\`\`\`python
def 회복():
    캐릭터['HP'] = min(100, 캐릭터['HP'] + 30)
    print(f'HP 회복! 현재 HP: {캐릭터["HP"]}')
\`\`\`

### ⭐⭐⭐ 도전 3: 몬스터 반격
몬스터도 공격해서 내 HP가 깎이게!

---
**다음 시간:** Part 6 문제 20!`
    }
  ]
}
