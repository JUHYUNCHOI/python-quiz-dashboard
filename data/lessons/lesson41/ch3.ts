import { Chapter } from '../types'

export const ch3: Chapter = {
  id: "ch3",
  title: "⭐⭐⭐ 도전 (15~20)",
  emoji: "⭐",
  steps: [
    {
      id: "ch3-0",
      type: "tryit",
      title: "문제 15: 도서관 클래스",
      task: "Library 클래스를 실행하고 결과를 확인하세요!",
      initialCode: `class Library:
    def __init__(s):
        s.books = {}
    def add_book(s, title, author):
        s.books[title] = author
        print(f'추가: {title} ({author})')
    def find_book(s, title):
        if title in s.books:
            print(f'O {title} - {s.books[title]}')
        else:
            print(f'X {title} 없음')
    def count(s):
        return len(s.books)

lib = Library()
lib.add_book('해리포터', 'J.K.롤링')
lib.add_book('어린왕자', '생텍쥐페리')
lib.find_book('해리포터')
lib.find_book('반지의제왕')
print(f'총 {lib.count()}권')`,
      expectedOutput: "추가: 해리포터 (J.K.롤링)\n추가: 어린왕자 (생텍쥐페리)\nO 해리포터 - J.K.롤링\nX 반지의제왕 없음\n총 2권",
      hint: "딕셔너리에 title: author로 저장하고, in으로 검색!",
      hint2: "s.books[title] = author / title in s.books / len(s.books)"
    },
    {
      id: "ch3-1",
      type: "quiz",
      title: "문제 16",
      content: "출력 결과는?\n\n```python\nclass Animal:\n    def speak(s):\n        print('...')\n\nclass Dog(Animal):\n    def speak(s):\n        print('멍멍!')\n\nclass Cat(Animal):\n    def speak(s):\n        print('야옹!')\n\ndog = Dog()\ncat = Cat()\ndog.speak()\ncat.speak()\n```",
      options: ["...\\n...", "멍멍!\\n야옹!", "...\\n멍멍!", "에러"],
      answer: 1,
      explanation: "자식 클래스가 부모의 메서드를 오버라이드(재정의)해요!"
    },
    {
      id: "ch3-2",
      type: "tryit",
      title: "문제 17: 전사 vs 마법사",
      task: "두 클래스의 전투를 실행해보세요!",
      initialCode: `class Warrior:
    def __init__(s):
        s.name = '전사'
        s.hp = 120
        s.atk = 30
    def attack(s, target):
        target.hp -= s.atk
        print(f'{s.name} -> {target.name} ({s.atk} 데미지)')

class Mage:
    def __init__(s):
        s.name = '마법사'
        s.hp = 80
        s.atk = 45
    def attack(s, target):
        target.hp -= s.atk
        print(f'{s.name} -> {target.name} ({s.atk} 데미지)')

warrior = Warrior()
mage = Mage()
warrior.attack(mage)
mage.attack(warrior)
print(f'{warrior.name} HP: {warrior.hp}')
print(f'{mage.name} HP: {mage.hp}')`,
      expectedOutput: "전사 -> 마법사 (30 데미지)\n마법사 -> 전사 (45 데미지)\n전사 HP: 75\n마법사 HP: 50",
      hint: "target.hp에서 s.atk만큼 빼면 돼요!",
      hint2: "target.hp -= s.atk 로 상대 HP를 깎아요"
    },
    {
      id: "ch3-3",
      type: "mission",
      title: "문제 18: 펫 클래스 미션",
      task: "빈칸(___) 3개를 채워서 펫 돌보기 클래스를 완성하세요!",
      initialCode: `class Pet:
    def __init__(s, name, species):
        s.name = name
        s.species = species
        s.hunger = 50
        s.happiness = 50

    def feed(s):
        s.hunger ___ 20
        if s.hunger > 100:
            s.hunger = 100
        print(f'{s.name} 배부름: {s.hunger}')

    def play(s):
        s.___ += 30
        if s.happiness > 100:
            s.happiness = 100
        s.hunger -= 10
        print(f'{s.name} 행복: {s.happiness}')

    def status(s):
        print(f'{s.name}({s.___}): 배부름={s.hunger} 행복={s.happiness}')

pet = Pet('초코', '강아지')
pet.status()
pet.feed()
pet.play()
pet.status()`,
      expectedOutput: "초코(강아지): 배부름=50 행복=50\n초코 배부름: 70\n초코 행복: 80\n초코(강아지): 배부름=60 행복=80",
      hint: "먹이를 주면 배부름 증가, 놀면 행복 증가!",
      hint2: "+= / happiness / species"
    },
    {
      id: "ch3-4",
      type: "quiz",
      title: "문제 19",
      content: "다음 중 **클래스 변수**는?\n\n```python\nclass Shop:\n    discount = 10\n    def __init__(s, name):\n        s.name = name\n```",
      options: ["s.name", "discount", "name", "__init__"],
      answer: 1,
      explanation: "discount는 클래스에 직접 정의된 클래스 변수! s.name은 인스턴스 변수예요."
    },
    {
      id: "ch3-5",
      type: "mission",
      title: "문제 20: 은행 시스템",
      task: "빈칸(___) 4개를 채워서 은행 시스템을 완성하세요!",
      initialCode: `class Bank:
    total_accounts = 0

    def __init__(s, name):
        s.name = name
        s.accounts = {}
        Bank.total_accounts ___ 1

    def create_account(s, owner, initial):
        s.accounts[owner] = initial
        print(f'{owner} 계좌 개설! 잔액: {initial}원')

    def transfer(s, sender, receiver, amount):
        if sender not in s.accounts:
            print(f'{sender} 계좌 없음')
        elif s.accounts[sender] < ___:
            print(f'잔액 부족!')
        else:
            s.accounts[sender] -= amount
            s.accounts[___] += amount
            print(f'{sender} -> {receiver} {amount}원 이체')

    def show_all(s):
        print(f'=== {s.name} ===')
        for owner, balance in s.accounts.___():
            print(f'  {owner}: {balance}원')

bank = Bank('파이썬은행')
bank.create_account('철수', 10000)
bank.create_account('영희', 5000)
bank.transfer('철수', '영희', 3000)
bank.show_all()
print(f'총 은행 수: {Bank.total_accounts}')`,
      expectedOutput: "철수 계좌 개설! 잔액: 10000원\n영희 계좌 개설! 잔액: 5000원\n철수 -> 영희 3000원 이체\n=== 파이썬은행 ===\n  철수: 7000원\n  영희: 8000원\n총 은행 수: 1",
      hint: "이체는 보내는 사람 빼고 받는 사람 더하기!",
      hint2: "+= / amount / receiver / items"
    }
  ]
}
