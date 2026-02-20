import { Chapter } from '../types'

export const ch1: Chapter = {
  id: "ch1",
  title: "가위바위보 게임",
  emoji: "✊",
  steps: [
    {
      id: "ch1-0",
      type: "explain",
      title: "🎮 미니 프로젝트 모음!",
      content: `![미니 프로젝트 소개](/lessons/l27/ch1-0-intro.png)

@핵심: 지금까지 배운 걸 총동원! 첫 번째는 **가위바위보**부터!`
    },
    {
      id: "ch1-1",
      type: "explain",
      title: "💭 생각해보기: 컴퓨터의 선택",
      content: `![컴퓨터의 선택](/lessons/l27/ch1-1-computer-choice.png)

\`\`\`python
choices = ['가위', '바위', '보']
computer = choices[0]  # 첫 번째 = '가위'
\`\`\`

@핵심: 리스트에 선택지를 넣고, **인덱스**로 하나를 꺼내면 돼!`
    },
    {
      id: "ch1-2",
      type: "tryit",
      title: "✊ 컴퓨터 선택 만들기!",
      task: "리스트에서 컴퓨터의 선택을 꺼내보세요!",
      initialCode: `player = '가위'

# 컴퓨터가 낼 수 있는 선택지
choices = ['가위', '바위', '보']

# 리스트에서 첫 번째를 골라보자!
computer = ___[0]

print(f'플레이어: {player}')
print(f'컴퓨터: {___}')`,
      expectedOutput: `플레이어: 가위\n컴퓨터: 가위`,
      hint: "리스트 이름으로 인덱스 접근! choices[0]은 '가위'",
      hint2: "choices / computer"
    },
    {
      id: "ch1-3",
      type: "explain",
      title: "💭 생각해보기: 승패 판정",
      content: `![승패 판정](/lessons/l27/ch1-3-judge.png)

- ✊ 같으면 → **무승부**
- ✌️ 가위 vs 보 → **승리!**
- 👊 바위 vs 가위 → **승리!**
- 🖐 보 vs 바위 → **승리!**
- 나머지 → **패배**

@핵심: \`if\` → \`elif\` → \`else\`로 순서대로 체크하면 돼!`
    },
    {
      id: "ch1-4",
      type: "tryit",
      title: "⚔️ 승패 판정!",
      task: "같으면 무승부! 가위>보, 바위>가위, 보>바위! 빈칸 3개를 채우세요!",
      initialCode: `player = '가위'
computer = '보'

if player ___ computer:
    result = '무승부'
elif player == '가위' and computer == '___':
    result = '승리!'
elif player == '바위' and computer == '가위':
    result = '승리!'
elif player == '보' and computer == '바위':
    result = '___'
else:
    result = '패배'

print(f'{player} vs {computer} → {result}')`,
      expectedOutput: `가위 vs 보 → 승리!`,
      hint: "같다 = ==, 가위가 이기는 상대는 '보'!",
      hint2: "== / 보 / 승리!"
    },
    {
      id: "ch1-5",
      type: "explain",
      title: "💭 생각해보기: 여러 번 대결",
      content: `![여러 번 대결](/lessons/l27/ch1-5-repeat.png)

\`\`\`python
wins = 0
losses = 0
draws = 0

for i in range(5):
    # 한 판 진행...
    # 이기면 wins += 1
\`\`\`

@핵심: \`for\`문으로 반복하고, 승/패/무를 **변수로 세면** 돼!`
    },
    {
      id: "ch1-6",
      type: "tryit",
      title: "🔄 5판 대결!",
      task: "5번 반복하면서 승/패/무를 세보세요! 빈칸 3개를 채우세요!",
      initialCode: `player_choices = ['가위', '바위', '보', '가위', '보']
computer_choices = ['바위', '가위', '가위', '보', '보']

wins = 0
losses = 0
draws = 0

for i in ___(len(player_choices)):
    player = player_choices[i]
    computer = computer_choices[i]

    if player == computer:
        result = '무승부'
        ___ += 1
    elif (player == '가위' and computer == '보') or \\
         (player == '바위' and computer == '가위') or \\
         (player == '보' and computer == '바위'):
        result = '승리!'
        wins += 1
    else:
        result = '패배'
        ___ += 1

    print(f'{i+1}판: {player} vs {computer} → {result}')

print(f'\\n=== 결과: {wins}승 {losses}패 {draws}무 ===')`,
      expectedOutput: `1판: 가위 vs 바위 → 패배\n2판: 바위 vs 가위 → 승리!\n3판: 보 vs 가위 → 패배\n4판: 가위 vs 보 → 승리!\n5판: 보 vs 보 → 무승부\n\n=== 결과: 2승 2패 1무 ===`,
      hint: "range()로 0부터 반복! 무승부는 draws, 패배는 losses!",
      hint2: "range / draws / losses"
    },
    {
      id: "ch1-7",
      type: "explain",
      title: "💭 생각해보기: 연승 기록",
      content: `![연승 기록](/lessons/l27/ch1-7-streak.png)

\`\`\`python
streak = 0       # 현재 연승
max_streak = 0   # 최대 연승

# 이기면: streak += 1
# 지면:   streak = 0
# 매번:   max_streak 갱신!
\`\`\`

@핵심: \`streak\`은 이기면 +1, 지면 0으로 리셋! \`max_streak\`에 최대값 저장!`
    },
    {
      id: "ch1-8",
      type: "mission",
      title: "🎯 미션: 연승 카운터 완성!",
      task: "빈칸 3개를 채워서 연승 카운터를 완성하세요!",
      initialCode: `player_choices = ['가위', '바위', '바위', '보', '가위']
computer_choices = ['보', '가위', '가위', '가위', '보']

streak = 0
max_streak = 0

for i in range(len(player_choices)):
    player = player_choices[i]
    computer = computer_choices[i]

    if player == computer:
        result = '무승부'
        streak = ___
    elif (player == '가위' and computer == '보') or \\
         (player == '바위' and computer == '가위') or \\
         (player == '보' and computer == '바위'):
        result = '승리!'
        streak ___ 1
    else:
        result = '패배'
        streak = 0

    if streak > ___:
        max_streak = streak

    print(f'{i+1}판: {result} (연승: {streak})')

print(f'\\n최대 연승: {max_streak}')`,
      expectedOutput: `1판: 승리! (연승: 1)\n2판: 승리! (연승: 2)\n3판: 승리! (연승: 3)\n4판: 패배 (연승: 0)\n5판: 승리! (연승: 1)\n\n최대 연승: 3`,
      hint: "무승부면 연승 리셋, 승리면 +1, 최대값 갱신!",
      hint2: "0 / += / max_streak"
    }
  ]
}
