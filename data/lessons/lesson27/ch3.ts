import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "단어장 프로그램",
  emoji: "📖",
  steps: [
    {
      id: "ch3-0",
      type: "explain",
      title: "💭 생각해보기: 단어 저장",
      content: `![단어 저장](/lessons/l27/ch3-0-vocab.png)

💭 영어 단어장을 만들고 싶어! apple은 사과, banana는 바나나... **단어**와 **뜻**을 짝지어 저장하려면 뭘 써야 할까?

\`\`\`python
vocab = {}
vocab['apple'] = '사과'
vocab['banana'] = '바나나'
print(vocab['apple'])  # 사과
\`\`\`

@핵심: **딕셔너리**로 단어:뜻을 짝지어 저장!`
    },
    {
      id: "ch3-1",
      type: "tryit",
      title: "📖 단어 추가하기!",
      task: "빈칸을 채워서 단어장에 단어를 추가하고 검색해보세요!",
      initialCode: `vocab = {}

# 단어 추가
vocab['apple'] = '사과'
vocab['banana'] = '바나나'
vocab[___] = '체리'

# 단어 검색
word = 'apple'
if word ___ vocab:
    print(f'{word} = {vocab[___]}')
else:
    print(f'{word} 없음')

print(f'단어장: {len(vocab)}개')`,
      expectedOutput: `apple = 사과\n단어장: 3개`,
      hint: "딕셔너리에 키로 저장! in으로 있는지 확인!",
      hint2: "'cherry' / in / word"
    },
    {
      id: "ch3-2",
      type: "explain",
      title: "💭 생각해보기: 추가/검색/삭제",
      content: `![단어장 기능](/lessons/l27/ch3-2-crud.png)

💭 단어장에 **추가**만 하면 뭐해! **검색**도 하고, 틀린 단어는 **삭제**도 해야지. 이 기능들을 어떻게 구분하지?

\`\`\`python
# 명령어로 구분!
action = 'add'      # 추가
action = 'search'   # 검색
action = 'delete'   # 삭제
action = 'list'     # 전체 보기

# if/elif로 분기!
\`\`\`

@핵심: 명령어를 \`if/elif\`로 분기해서 추가/검색/삭제/목록 처리!`
    },
    {
      id: "ch3-3",
      type: "mission",
      title: "🎯 미션: 단어장 완성!",
      task: "빈칸 3개를 채워서 단어장 프로그램을 완성하세요!",
      initialCode: `vocab = {}

commands = [
    ('add', 'apple', '사과'),
    ('add', 'banana', '바나나'),
    ('add', 'cherry', '체리'),
    ('search', 'apple', ''),
    ('search', 'grape', ''),
    ('delete', 'banana', ''),
    ('list', '', ''),
]

for cmd in commands:
    action = cmd[0]

    if action == 'add':
        word, meaning = cmd[1], cmd[2]
        vocab[word] = ___
        print(f'+ {word}: {meaning}')

    elif action == 'search':
        word = cmd[1]
        if word ___ vocab:
            print(f'O {word} = {vocab[word]}')
        else:
            print(f'X {word} 없음')

    elif action == 'delete':
        word = cmd[1]
        if word in vocab:
            ___ vocab[word]
            print(f'- {word} 삭제')

    elif action == 'list':
        print(f'--- 단어장 ({len(vocab)}개) ---')
        for w, m in vocab.items():
            print(f'  {w}: {m}')`,
      expectedOutput: `+ apple: 사과\n+ banana: 바나나\n+ cherry: 체리\nO apple = 사과\nX grape 없음\n- banana 삭제\n--- 단어장 (2개) ---\n  apple: 사과\n  cherry: 체리`,
      hint: "뜻을 저장, in으로 검색, del로 삭제!",
      hint2: "meaning / in / del"
    }
  ]
}
