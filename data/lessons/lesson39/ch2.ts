import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "저장 기능 만들기",
  emoji: "💾",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "💭 캐릭터 데이터를 파일에 어떻게 저장할까?",
      content: `💭 딕셔너리에 있는 캐릭터 정보를 **파일에 저장**하고 싶어! 이름, HP, 공격력... 각각을 어떻게 써야 나중에 **다시 읽을 수 있을까?**

\`\`\`python
def 저장하기():
    if 캐릭터['이름'] == '':
        print('먼저 새 게임을 시작하세요!')
        return

    with open('save.txt', 'w') as 파일:
        파일.write(캐릭터['이름'] + '\\n')
        파일.write(str(캐릭터['HP']) + '\\n')
        파일.write(str(캐릭터['공격력']) + '\\n')
        파일.write(str(캐릭터['레벨']) + '\\n')
        파일.write(str(캐릭터['경험치']) + '\\n')
    print('저장 완료!')
\`\`\`

@핵심: 'w' 모드로 열고, **str()로 변환** + **\\n으로 줄바꿈** 해서 한 줄씩 저장!`
    },
    {
      id: "ch2-1",
      type: "interactive",
      title: "✏️ 저장 함수 따라치기!",
      description: "파일에 데이터를 저장하는 코드를 직접 써보세요!",
      component: "typeAlong",
      targetTitle: "간단 저장하기",
      targetDescription: "with open으로 이름과 HP 저장",
      targetCode: "with open('save.txt', 'w') as f:\n    f.write('용사\\n')\n    f.write(str(100))\nprint('저장!')",
      expectedOutput: "저장!"
    },
    {
      id: "ch2-2",
      type: "interactive",
      title: "빈칸 채우기: 저장 함수",
      description: "저장 함수를 완성하세요!",
      component: "fillInBlank",
      codeTemplate: "def save(name, hp):\n    with open('save.txt', '___1___') as f:\n        f.write(name + '\\n')\n        f.write(___2___(hp))\n    print('저장!')",
      blanks: [
        { id: "1", answer: "w", hint: "쓰기 모드!" },
        { id: "2", answer: "str", hint: "숫자를 문자열로 변환!" }
      ],
      choices: ["w", "r", "a", "str", "int", "write"],
      expectedOutput: "저장!"
    },
    {
      id: "ch2-3",
      type: "quiz",
      title: "예측해보세요!",
      content: `저장 후 save.txt 내용은?\n\n\`\`\`python\nwith open('save.txt', 'w') as f:\n    f.write('용사' + '\\n')\n    f.write(str(85))\n\`\`\``,
      options: ["용사85", "용사 (줄바꿈) 85", "85용사", "에러"],
      answer: 1,
      explanation: "'\\n' 덕분에 '용사'와 '85'가 다른 줄에 저장!"
    }
  ]
}
