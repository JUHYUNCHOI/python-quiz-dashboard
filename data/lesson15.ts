// ============================================
// 레슨 15: 자료구조 개요
// ============================================
import { LessonData } from './types'

export const lesson15Data: LessonData = {
  id: "15",
  title: "자료구조 개요",
  emoji: "📦",
  description: "파이썬의 자료구조를 소개해요!",
  chapters: [
    {
      id: "ch1",
      title: "자료구조가 뭐야?",
      emoji: "📦",
      steps: [
        {
          id: "intro",
          type: "explain",
          title: "📦 데이터를 정리하는 방법",
          content: `학생 이름을 저장하고 싶어요!

\`\`\`python
name1 = "철수"
name2 = "영희"
name3 = "민수"
\`\`\`

학생이 100명이면? **변수 100개?** 😱

**자료구조**를 쓰면 한 번에 관리할 수 있어요!`
        },
        {
          id: "solution",
          type: "explain",
          title: "✅ 리스트 하나면 끝!",
          content: `\`\`\`python
students = ["철수", "영희", "민수"]
\`\`\`

이렇게 **하나의 변수**에 여러 개를 담을 수 있어요!

파이썬에는 **4가지 자료구조**가 있어요:
- **리스트 [ ]** - 가장 많이 씀!
- **튜플 ( )** - 수정 불가
- **딕셔너리 { }** - 이름으로 찾기
- **집합 { }** - 중복 없음`
        },
        {
          id: "tryit-list-basic",
          type: "tryit",
          title: "💻 4가지 자료구조 비교!",
          task: "파이썬의 4가지 자료구조를 직접 실행해서 비교해보세요!",
          initialCode: `# 1. 리스트 - 순서 있고, 수정 가능!
fruits = ['사과', '바나나', '포도']
print(f'리스트: {fruits}')
print(f'첫번째: {fruits[0]}')

# 2. 튜플 - 순서 있지만, 수정 불가!
colors = (255, 0, 128)
print(f'\\n튜플: {colors}')
print(f'빨강: {colors[0]}')

# 3. 딕셔너리 - 이름으로 찾기!
scores = {'철수': 90, '영희': 95}
print(f'\\n딕셔너리: {scores}')
print(f'영희 점수: {scores["영희"]}')

# 4. 집합 - 중복 자동 제거!
numbers = {1, 2, 2, 3, 3, 3}
print(f'\\n집합: {numbers}')`,
          expectedOutput: `리스트: ['사과', '바나나', '포도']\n첫번째: 사과\n\n튜플: (255, 0, 128)\n빨강: 255\n\n딕셔너리: {'철수': 90, '영희': 95}\n영희 점수: 95\n\n집합: {1, 2, 3}`,
          hint: "[ ]리스트, ( )튜플, {'키':값}딕셔너리, {값}집합!",
          hint2: "코드를 그대로 실행하세요!"
        }
      ]
    },
    {
      id: "ch2",
      title: "직접 체험해보기!",
      emoji: "🎮",
      steps: [
        {
          id: "interactive-intro",
          type: "explain",
          title: "🎮 직접 클릭해보면서 배워요!",
          content: `각 자료구조가 **왜 필요한지** 직접 체험해봐요!

- 🧊 **List** - 냉장고 (여러 개 저장)
- 🔒 **Tuple** - RGB 색상 (바뀌면 안 됨)
- 🏷️ **Dict** - 사물함 (이름으로 찾기)
- ✋ **Set** - 출석부 (중복 없이)

다음 화면에서 **각 탭을 눌러서** 차이를 느껴보세요!`
        },
        {
          id: "interactive",
          type: "interactive",
          title: "🎮 직접 체험하기!",
          component: "dataStructures",
          description: "각 탭을 눌러서 List, Tuple, Dict, Set의 차이를 체험해보세요!"
        },
        {
          id: "coding-dict",
          type: "coding",
          title: "📝 딕셔너리 직접 만들어보기",
          description: "사물함처럼 이름으로 찾는 딕셔너리를 만들어보세요!",
          starterCode: `# 사물함 딕셔너리를 만들어보세요!\n# 철수: 축구공, 영희: 가방\n\nlocker = {\n    # 여기에 코드를 작성하세요\n}\n\nprint(locker["철수"])`,
          testCases: [
            {
              expectedOutput: "축구공",
              description: "철수의 사물함에는 축구공이 있어요!"
            }
          ],
          hints: [
            "딕셔너리는 { } 안에 '이름': '값' 형태로 쓰세요",
            "'철수': '축구공', '영희': '가방' 이렇게 쓰면 돼요!",
            "정답: locker = { '철수': '축구공', '영희': '가방' }"
          ]
        }
      ]
    },
    {
      id: "ch3",
      title: "정리",
      emoji: "📊",
      steps: [
        {
          id: "tryit-when",
          type: "tryit",
          title: "💻 언제 뭘 쓸까?",
          task: "상황에 맞는 자료구조를 사용하는 예시를 실행해보세요!",
          initialCode: `# 상황 1: 장보기 목록 → 리스트! (순서, 수정 가능)
shopping = ['우유', '빵', '계란']
shopping.append('치즈')
print(f'장보기: {shopping}')

# 상황 2: 좌표 → 튜플! (변하면 안 됨)
position = (37, 127)
print(f'위치: {position}')

# 상황 3: 학생 점수 → 딕셔너리! (이름으로 찾기)
scores = {'철수': 85, '영희': 92, '민수': 78}
print(f'영희 점수: {scores["영희"]}점')

# 상황 4: 출석 체크 → 집합! (중복 없이)
attendance = {'철수', '영희', '철수', '민수'}
print(f'출석: {attendance} ({len(attendance)}명)')`,
          expectedOutput: `장보기: ['우유', '빵', '계란', '치즈']\n위치: (37, 127)\n영희 점수: 92점\n출석: {'철수', '영희', '민수'} (3명)`,
          hint: "각 자료구조의 특징에 맞는 상황이 있어요!",
          hint2: "코드를 그대로 실행하세요!"
        },
        {
          id: "quiz1",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "순서가 있고, 수정도 가능한 자료구조는?",
          options: ["튜플 ()", "리스트 []", "집합 {}", "딕셔너리 {}"],
          answer: 1,
          explanation: "리스트는 순서O, 중복O, 수정O! 가장 많이 써요."
        },
        {
          id: "quiz2",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "RGB 색상처럼 '절대 바뀌면 안 되는 값'에 쓰는 건?",
          options: ["리스트 []", "튜플 ()", "집합 {}", "딕셔너리 {}"],
          answer: 1,
          explanation: "튜플은 수정이 안 돼서 실수로 바꿀 일이 없어요!"
        },
        {
          id: "quiz3",
          type: "quiz",
          title: "❓ 퀴즈!",
          content: "'철수 점수 몇이야?' 이렇게 이름으로 바로 찾고 싶을 때?",
          options: ["리스트 []", "튜플 ()", "집합 {}", "딕셔너리 {}"],
          answer: 3,
          explanation: "딕셔너리는 이름(키)으로 바로 찾을 수 있어요!"
        },
        {
          id: "mission1",
          type: "mission",
          title: "🎯 미션: 알맞은 자료구조!",
          task: "빈칸 3개를 채워서 자료구조를 완성하세요!",
          initialCode: `# 1. 과일 목록 → 리스트!
fruits = ___'딸기', '포도', '망고']
print(f'과일: {fruits}')
print(f'개수: {len(fruits)}개')

# 2. 학생 정보 → 딕셔너리!
student = {'이름': '철수', '나이': 15, '취미': '축구'}
print(f'이름: {student[___]}')

# 3. 중복 제거 → 집합!
colors = {'빨강', '파랑', '빨강', '초록', '파랑'}
print(f'색상 종류: {___(colors)}개')`,
          expectedOutput: `과일: ['딸기', '포도', '망고']\n개수: 3개\n이름: 철수\n색상 종류: 3개`,
          hint: "리스트는 [, 딕셔너리는 키로 접근, len()으로 개수!",
          hint2: "[ / '이름' / len"
        },
        {
          id: "complete",
          type: "explain",
          title: "🎉 완료!",
          content: `## 오늘 배운 것

✅ **List 🧊** - 냉장고 (순서O, 중복O, 수정O)
✅ **Tuple 🔒** - RGB색상 (수정 불가!)
✅ **Dict 🏷️** - 사물함 (이름으로 찾기)
✅ **Set ✋** - 출석부 (중복 불가!)

다음 시간에는 **리스트**를 자세히 배워요! 🚀`
        }
      ]
    }
  ]
}
