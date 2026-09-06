import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "미니 전투 & 미션",
  emoji: "🎮",
  steps: [
    {
      /* 2026-09-06: 바로 아래 데모에 `'O' if s.alive else 'X'` 가 나오는데,
         **한 줄 if 를 설명하는 곳이 52개 레슨 어디에도 없었다**
         (`scripts/check-concept-order.py` 로 확인).
         학생: "이거 순서가 왜 이래? if 가 왜 중간에 있지?" 하고 거꾸로 읽었다.
         레슨42·43·46·47·48·50·52 가 전부 이걸 쓴다 — 여기가 처음 나오는 자리다. */
      id: "ch4-0a",
      type: "explain",
      title: "🩹 한 줄로 쓰는 if",
      content: `우리가 아는 if 는 이렇게 여러 줄이에요.

\`\`\`python
if 살아있음:
    표시 = 'O'
else:
    표시 = 'X'
\`\`\`

**둘 중 하나를 고르기만** 할 때는 한 줄로 줄여 쓸 수 있어요.

\`\`\`python
표시 = 'O' if 살아있음 else 'X'
\`\`\`

읽는 순서가 조금 낯설어요. **가운데 if 부터** 읽으면 돼요 —
"살아있으면 'O', 아니면 'X'".

| 순서 | 뜻 |
|---|---|
| 맨 앞 \`'O'\` | 조건이 **참**일 때 쓸 값 |
| 가운데 \`if 살아있음\` | 판단할 조건 |
| 맨 뒤 \`else 'X'\` | 조건이 **거짓**일 때 쓸 값 |

> 💡 이건 **값을 고를 때만** 써요. 여러 줄을 실행해야 하면 원래 if 를 쓰세요.

@핵심: \`값1 if 조건 else 값2\` — 조건 하나로 **값 둘 중 하나**를 고를 때!`
    },
    {
      id: "ch4-0",
      type: "tryit",
      title: "⚔️ 미니 전투 시스템!",
      task: "alive 속성을 활용한 전투 시스템을 실행해보세요!",
      initialCode: `class Character:
    def __init__(s, char_name, hp, atk):
        s.char_name = char_name
        s.hp = hp
        s.atk = atk
        s.alive = True

    def attack(s, target):
        if not s.alive:
            print(f'{s.char_name}은(는) 사망했습니다!')
            return
        print(f'{s.char_name} -> {target.char_name} 공격! (-{s.atk})')
        target.hp = target.hp - s.atk
        if target.hp <= 0:
            target.hp = 0
            target.alive = False
            print(f'{target.char_name} 사망!')
        else:
            print(f'{target.char_name} 남은 HP: {target.hp}')

    def status(s):
        state = 'O' if s.alive else 'X'
        print(f'[{state}] {s.char_name}: HP {s.hp}')

hero = Character('용사', 100, 25)
slime = Character('슬라임', 40, 10)

print('=== 전투 시작! ===')
hero.status()
slime.status()

print('\\n--- 1턴 ---')
hero.attack(slime)

print('\\n--- 2턴 ---')
hero.attack(slime)

print('\\n=== 결과 ===')
hero.status()
slime.status()`,
      expectedOutput: `=== 전투 시작! ===\n[O] 용사: HP 100\n[O] 슬라임: HP 40\n\n--- 1턴 ---\n용사 -> 슬라임 공격! (-25)\n슬라임 남은 HP: 15\n\n--- 2턴 ---\n용사 -> 슬라임 공격! (-25)\n슬라임 사망!\n\n=== 결과 ===\n[O] 용사: HP 100\n[X] 슬라임: HP 0`,
      hint: "alive가 True면 살아있고, False면 사망!",
      hint2: "target.hp <= 0이면 target.alive = False로 사망 처리!"
    },
    {
      id: "ch4-1",
      type: "mission",
      title: "🏦 미션: 은행 계좌 클래스!",
      task: "방금 전투에서 쓴 '속성 바꾸기 + 조건 확인' 을 이번엔 은행 계좌에 써봐요. 빈칸 3개를 채워 입금·출금·잔액 조회를 완성하세요!",
      initialCode: `class BankAccount:
    def __init__(s, owner, balance):
        s.owner = owner
        s.balance = balance

    def deposit(s, amount):
        s.balance = s.balance ___ amount
        print(f'{amount}원 입금! 잔액: {s.balance}원')

    def withdraw(s, amount):
        if s.balance ___ amount:
            s.balance = s.balance - amount
            print(f'{amount}원 출금! 잔액: {s.balance}원')
        else:
            print(f'잔액 부족! 현재: {s.balance}원')

    def show_balance(s):
        print(f'{s.owner}님 잔액: {s.___}원')

account = BankAccount('철수', 10000)
account.show_balance()
account.deposit(5000)
account.withdraw(3000)
account.withdraw(20000)
account.show_balance()`,
      expectedOutput: `철수님 잔액: 10000원\n5000원 입금! 잔액: 15000원\n3000원 출금! 잔액: 12000원\n잔액 부족! 현재: 12000원\n철수님 잔액: 12000원`,
      hint: "입금은 더하기, 출금 조건은 잔액 비교!",
      hint2: "+ / >= / balance"
    }
  ]
}
