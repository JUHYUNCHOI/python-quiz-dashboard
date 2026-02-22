import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "저장 기능 만들기",
  emoji: "💾",
  steps: [
    {
      id: "ch2-0",
      type: "explain",
      title: "💭 캐릭터 데이터 중 뭘 저장해야 할까?",
      content: `💭 캐릭터의 이름, HP, 공격력, 레벨, 경험치... 이걸 **파일에 저장**하려면 먼저 파일을 열어야 해!

\`\`\`python
with open('save.txt', 'w') as 파일:
    파일.write(캐릭터['이름'] + '\\n')
    # 나머지 데이터도 써야 해!
\`\`\`

💡 'w' = write(쓰기) 모드! 이름 뒤에 **\\n**을 붙여서 줄바꿈!

@핵심: **open('파일', 'w')**로 파일을 열고, **write()로 한 줄씩** 써나가!`
    },
    {
      id: "ch2-0a",
      type: "explain",
      title: "💭 숫자 데이터는 어떻게 저장할까?",
      content: `💭 이름은 문자열이라 바로 쓸 수 있었는데... **HP, 공격력 같은 숫자**는 그냥 쓸 수 있을까?

\`\`\`python
# 숫자는 str()로 변환해야 저장 가능!
파일.write(str(캐릭터['HP']) + '\\n')
파일.write(str(캐릭터['공격력']) + '\\n')
파일.write(str(캐릭터['레벨']) + '\\n')
\`\`\`

→ write()는 **문자열만** 쓸 수 있어서, 숫자는 \`str()\`로 변환!

@핵심: **str()로 변환** + **\\n으로 줄바꿈** = 한 줄에 하나씩 깔끔하게 저장!`
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
