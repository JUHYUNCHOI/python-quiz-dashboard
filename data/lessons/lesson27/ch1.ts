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
      content: `## 4개의 미니 프로젝트!

지금까지 배운 걸 총동원해서 프로젝트를 만들어요!

| 프로젝트 | 핵심 개념 |
|----------|-----------|
| ✊ 가위바위보 | 조건문, 리스트 |
| 🎱 로또 번호 | 정렬, 반복문 |
| 📖 단어장 | 딕셔너리 |
| 📊 성적 관리 | 리스트, 함수 |

> input()은 사용 불가! 대신 **고정 값**으로 대체해요.`
    },
    {
      id: "ch1-1",
      type: "tryit",
      title: "✊ 1단계: 컴퓨터 선택!",
      task: "플레이어가 '가위'를 냈어요. 컴퓨터도 내게 하려면?",
      initialCode: `player = '가위'

# 컴퓨터가 낼 수 있는 선택지 리스트
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
      id: "ch1-2",
      type: "tryit",
      title: "⚔️ 2단계: 승패 판정!",
      task: "같으면 무승부! 가위>보, 바위>가위, 보>바위! 조건문을 완성하세요!",
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
      id: "ch1-3",
      type: "tryit",
      title: "🔄 3단계: 5판 대결!",
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
      id: "ch1-4",
      type: "mission",
      title: "🎯 미션: 연승 카운터 추가!",
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
