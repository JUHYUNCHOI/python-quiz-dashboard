import { Chapter } from '../types'

export const ch6: Chapter = {
  id: "ch6",
  title: "실습: 점수 저장하기",
  emoji: "💻",
  steps: [
    {
      id: "ch6-0",
      type: "interactive",
      title: "✏️ 점수 저장 따라치기!",
      description: "파일에 점수를 저장하는 코드를 써보세요!",
      component: "typeAlong",
      targetTitle: "점수 저장하기",
      targetDescription: "with open으로 점수를 파일에 저장",
      targetCode: "with open('score.txt', 'w') as f:\n    f.write(str(100))\nprint('저장!')",
      expectedOutput: "저장!"
    },
    {
      id: "ch6-1",
      type: "interactive",
      title: "빈칸 채우기: 점수 불러오기",
      description: "파일에서 점수를 불러오세요! 파일 없으면 0!",
      component: "fillInBlank",
      codeTemplate: "try:\n    with open('score.txt', '___1___') as f:\n        점수 = int(f.___2___())\nexcept FileNotFoundError:\n    점수 = 0",
      blanks: [
        { id: "1", answer: "r", hint: "읽기 모드!" },
        { id: "2", answer: "read", hint: "파일 전체를 읽는 메서드!" }
      ],
      choices: ["r", "w", "a", "read", "readline", "write"],
      expectedOutput: ""
    },
    {
      id: "ch6-2",
      type: "mission",
      title: "🎯 점수 저장 함수를 만드세요",
      task: "score.txt에 점수를 저장하는 함수 완성하기",
      initialCode: `def save_score(점수):
    # score.txt에 점수 저장하기
    # 💡 with open('score.txt', 'w') 사용!
    pass

# 테스트
save_score(100)
print('저장 완료!')`,
      expectedOutput: "저장 완료!",
      hint: "with open('score.txt', 'w') as f:",
      hint2: "f.write(str(점수)) — 숫자를 문자열로 변환!"
    },
    {
      id: "ch6-3",
      type: "mission",
      title: "🎯 점수 불러오기 함수를 만드세요",
      task: "score.txt에서 점수 불러오기 (파일 없으면 0)",
      initialCode: `def load_score():
    # score.txt에서 점수 불러오기
    # 파일 없으면 0 반환
    # 💡 try-except FileNotFoundError 사용!
    pass

# 테스트
점수 = load_score()
print(f'현재 점수: {점수}')`,
      expectedOutput: "현재 점수: 0",
      hint: "try: with open('score.txt', 'r') as f:",
      hint2: "except FileNotFoundError: return 0"
    }
  ]
}
