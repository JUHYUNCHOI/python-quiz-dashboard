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
    def __init__(self):
        self.books = {}
    def add_book(self, title, author):
        self.books[title] = author
        print(f'추가: {title} ({author})')
    def find_book(self, title):
        if title in self.books:
            print(f'O {title} - {self.books[title]}')
        else:
            print(f'X {title} 없음')
    def count(self):
        return len(self.books)

lib = Library()
lib.add_book('해리포터', 'J.K.롤링')
lib.add_book('어린왕자', '생텍쥐페리')
lib.find_book('해리포터')
lib.find_book('반지의제왕')
print(f'총 {lib.count()}권')`,
      expectedOutput: "추가: 해리포터 (J.K.롤링)\n추가: 어린왕자 (생텍쥐페리)\nO 해리포터 - J.K.롤링\nX 반지의제왕 없음\n총 2권",
      hint: "딕셔너리에 title: author로 저장하고, in으로 검색!",
      hint2: "self.books[title] = author / title in self.books / len(self.books)"
    },
    {
      id: "ch3-1",
      type: "quiz",
      title: "문제 16",
      content: "출력 결과는?\n\n```python\nclass Animal:\n    def speak(self):\n        print('...')\n\nclass Dog(Animal):\n    def speak(self):\n        print('멍멍!')\n\nclass Cat(Animal):\n    def speak(self):\n        print('야옹!')\n\ndog = Dog()\ncat = Cat()\ndog.speak()\ncat.speak()\n```",
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
    def __init__(self):
        self.name = '전사'
        self.hp = 120
        self.atk = 30
    def attack(self, target):
        target.hp -= self.atk
        print(f'{self.name} -> {target.name} ({self.atk} 데미지)')

class Mage:
    def __init__(self):
        self.name = '마법사'
        self.hp = 80
        self.atk = 45
    def attack(self, target):
        target.hp -= self.atk
        print(f'{self.name} -> {target.name} ({self.atk} 데미지)')

warrior = Warrior()
mage = Mage()
warrior.attack(mage)
mage.attack(warrior)
print(f'{warrior.name} HP: {warrior.hp}')
print(f'{mage.name} HP: {mage.hp}')`,
      expectedOutput: "전사 -> 마법사 (30 데미지)\n마법사 -> 전사 (45 데미지)\n전사 HP: 75\n마법사 HP: 50",
      hint: "target.hp에서 self.atk만큼 빼면 돼요!",
      hint2: "target.hp -= self.atk 로 상대 HP를 깎아요"
    },
    {
      id: "ch3-3",
      type: "mission",
      title: "문제 18: 펫 클래스 미션",
      task: "빈칸(___) 3개를 채워서 펫 돌보기 클래스를 완성하세요!",
      initialCode: `class Pet:
    def __init__(self, name, species):
        self.name = name
        self.species = species
        self.hunger = 50
        self.happiness = 50

    def feed(self):
        self.hunger ___ 20
        if self.hunger > 100:
            self.hunger = 100
        print(f'{self.name} 배부름: {self.hunger}')

    def play(self):
        self.___ += 30
        if self.happiness > 100:
            self.happiness = 100
        self.hunger -= 10
        print(f'{self.name} 행복: {self.happiness}')

    def status(self):
        print(f'{self.name}({self.___}): 배부름={self.hunger} 행복={self.happiness}')

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
      content: "다음 중 **클래스 변수**는?\n\n```python\nclass Shop:\n    discount = 10\n    def __init__(self, name):\n        self.name = name\n```",
      options: ["self.name", "discount", "name", "__init__"],
      answer: 1,
      explanation: "discount는 클래스에 직접 정의된 클래스 변수! self.name은 인스턴스 변수예요."
    },
    {
      id: "ch3-5",
      type: "mission",
      title: "문제 20: 은행 시스템",
      task: "빈칸(___) 4개를 채워서 은행 시스템을 완성하세요!",
      initialCode: `class Bank:
    total_accounts = 0

    def __init__(self, name):
        self.name = name
        self.accounts = {}
        Bank.total_accounts ___ 1

    def create_account(self, owner, initial):
        self.accounts[owner] = initial
        print(f'{owner} 계좌 개설! 잔액: {initial}원')

    def transfer(self, sender, receiver, amount):
        if sender not in self.accounts:
            print(f'{sender} 계좌 없음')
        elif self.accounts[sender] < ___:
            print(f'잔액 부족!')
        else:
            self.accounts[sender] -= amount
            self.accounts[___] += amount
            print(f'{sender} -> {receiver} {amount}원 이체')

    def show_all(self):
        print(f'=== {self.name} ===')
        for owner, balance in self.accounts.___():
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
