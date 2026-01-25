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
