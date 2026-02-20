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
      title: "✊ 가위바위보 기본!",
      task: "가위바위보 판정 로직을 실행해보세요!",
      initialCode: `# input() 대신 고정 선택 리스트!
player_choices = ['가위', '바위', '보', '가위', '보']
computer_choices = ['바위', '가위', '가위', '보', '보']

wins = 0
losses = 0
draws = 0

for i in range(len(player_choices)):
    player = player_choices[i]
    computer = computer_choices[i]

    if player == computer:
        result = '무승부'
        draws += 1
    elif (player == '가위' and computer == '보') or \\
         (player == '바위' and computer == '가위') or \\
         (player == '보' and computer == '바위'):
        result = '승리!'
        wins += 1
    else:
        result = '패배'
        losses += 1

    print(f'{i+1}판: {player} vs {computer} → {result}')

print(f'\\n=== 결과: {wins}승 {losses}패 {draws}무 ===')`,
      expectedOutput: `1판: 가위 vs 바위 → 패배\n2판: 바위 vs 가위 → 승리!\n3판: 보 vs 가위 → 패배\n4판: 가위 vs 보 → 승리!\n5판: 보 vs 보 → 무승부\n\n=== 결과: 2승 2패 1무 ===`,
      hint: "가위>보, 바위>가위, 보>바위!",
      hint2: "조건문으로 승/패/무 판정!"
    },
    {
      id: "ch1-2",
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
