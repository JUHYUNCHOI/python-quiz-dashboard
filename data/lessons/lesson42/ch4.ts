import { Chapter } from '../types'

export const ch4: Chapter = {
  id: "ch4",
  title: "미니 전투 & 미션",
  emoji: "🎮",
  steps: [
    {
      id: "ch4-0",
      type: "tryit",
      title: "⚔️ 미니 전투 시스템!",
      task: "alive 속성을 활용한 전투 시스템을 실행해보세요!",
      initialCode: `class Character:
    def __init__(self, char_name, hp, atk):
        self.char_name = char_name
        self.hp = hp
        self.atk = atk
        self.alive = True

    def attack(self, target):
        if not self.alive:
            print(f'{self.char_name}은(는) 사망했습니다!')
            return
        print(f'{self.char_name} -> {target.char_name} 공격! (-{self.atk})')
        target.hp = target.hp - self.atk
        if target.hp <= 0:
            target.hp = 0
            target.alive = False
            print(f'{target.char_name} 사망!')
        else:
            print(f'{target.char_name} 남은 HP: {target.hp}')

    def status(self):
        state = 'O' if self.alive else 'X'
        print(f'[{state}] {self.char_name}: HP {self.hp}')

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
      task: "BankAccount 클래스의 빈칸(___) 3개를 채워서 입금, 출금, 잔액 조회 기능을 완성하세요!",
      initialCode: `class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance = self.balance ___ amount
        print(f'{amount}원 입금! 잔액: {self.balance}원')

    def withdraw(self, amount):
        if self.balance ___ amount:
            self.balance = self.balance - amount
            print(f'{amount}원 출금! 잔액: {self.balance}원')
        else:
            print(f'잔액 부족! 현재: {self.balance}원')

    def show_balance(self):
        print(f'{self.owner}님 잔액: {self.___}원')

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
