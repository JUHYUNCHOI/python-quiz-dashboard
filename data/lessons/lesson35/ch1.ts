import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "왜 파일이 필요할까?",
  emoji: "💾",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "💾 게임 세이브는 어디에?",
      content: `## 변수는 프로그램 끄면 사라져요!

\`\`\`python
점수 = 100
레벨 = 5
# 프로그램 종료... 
# 다시 시작하면? 점수 = 0, 레벨 = 1 😢
\`\`\`

**파일에 저장하면?** → 프로그램 꺼도 남아있음! 🎉`
    },
    {
      id: "ch1-1",
      type: "interactive",
      title: "💾 변수 vs 파일 체험!",
      description: "'그냥 끄기'와 '저장하고 끄기' 차이를 직접 확인해보세요!",
      component: "memoryVsFile"
    },
    {
      id: "ch1-2",
      type: "quiz",
      title: "퀴즈!",
      content: "변수에 저장한 데이터는?",
      options: [
        "프로그램 꺼도 남아있음",
        "프로그램 끄면 사라짐",
        "컴퓨터 껐다 켜도 남음",
        "영원히 저장됨"
      ],
      answer: 1,
      explanation: "변수는 메모리에 있어서 프로그램 끄면 사라져요!"
    }
  ]
}
