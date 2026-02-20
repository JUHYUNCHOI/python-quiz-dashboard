import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "단어장 프로그램",
  emoji: "📖",
  steps: [
    {
      id: "ch3-0",
      type: "tryit",
      title: "📖 단어장 만들기!",
      task: "딕셔너리로 단어장 프로그램을 실행해보세요!",
      initialCode: `# 단어장 (딕셔너리)
vocab = {}

# input() 대신 고정 명령 리스트!
commands = [
    ('add', 'apple', '사과'),
    ('add', 'banana', '바나나'),
    ('add', 'cherry', '체리'),
    ('search', 'apple', ''),
    ('search', 'grape', ''),
    ('list', '', ''),
    ('delete', 'banana', ''),
    ('list', '', ''),
]

for cmd in commands:
    action = cmd[0]

    if action == 'add':
        word, meaning = cmd[1], cmd[2]
        vocab[word] = meaning
        print(f'+ {word}: {meaning}')

    elif action == 'search':
        word = cmd[1]
        if word in vocab:
            print(f'O {word} = {vocab[word]}')
        else:
            print(f'X {word} 없음')

    elif action == 'delete':
        word = cmd[1]
        if word in vocab:
            del vocab[word]
            print(f'- {word} 삭제')

    elif action == 'list':
        print(f'--- 단어장 ({len(vocab)}개) ---')
        for w, m in vocab.items():
            print(f'  {w}: {m}')`,
      expectedOutput: `+ apple: 사과\n+ banana: 바나나\n+ cherry: 체리\nO apple = 사과\nX grape 없음\n--- 단어장 (3개) ---\n  apple: 사과\n  banana: 바나나\n  cherry: 체리\n- banana 삭제\n--- 단어장 (2개) ---\n  apple: 사과\n  cherry: 체리`,
      hint: "딕셔너리로 단어:뜻을 저장, in으로 검색!",
      hint2: "add/search/delete/list 4가지 명령!"
    },
    {
      id: "ch3-1",
      type: "quiz",
      title: "퀴즈!",
      content: "딕셔너리에서 키를 삭제하는 방법은?",
      options: [
        "vocab.remove('apple')",
        "del vocab['apple']",
        "vocab.delete('apple')",
        "vocab.pop_key('apple')"
      ],
      answer: 1,
      explanation: "del 딕셔너리[키]로 삭제해요! .pop(키)도 가능해요!"
    }
  ]
}
