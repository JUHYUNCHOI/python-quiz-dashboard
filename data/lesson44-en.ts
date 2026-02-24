import { LessonData } from './types'

export const lesson44EnData: LessonData = {
  id: "44en",
  title: "Part 7 Practice Problems 20",
  emoji: "📝",
  description: "20 practice problems on classes and methods!",
  chapters: [
    {
      id: "ch1",
      title: "Easy (1-8)",
      emoji: "⭐",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "How far have your class skills come?",
          content: `You've learned classes, methods, attributes, and class variables... Let's check if you **really understand** with 20 problems!

| Difficulty | Problems |
|------------|----------|
| Easy | 8 problems |
| Medium | 6 problems |
| Challenge | 6 problems |

@Key Point: The goal is to get **16 or more out of 20** correct! Let's go!`
        },
        {
          id: "ch1-1",
          type: "quiz",
          title: "Problem 1",
          content: "What is the output?\n\n```python\nclass Dog:\n    def bark(s):\n        print('Woof!')\ndog = Dog()\ndog.bark()\n```",
          options: ["Woof!", "Error", "Dog.bark()", "None"],
          answer: 0,
          explanation: "dog.bark() is called -> dog goes into s -> 'Woof!' is printed!"
        },
        {
          id: "ch1-2",
          type: "quiz",
          title: "Problem 2",
          content: "What is the output?\n\n```python\nclass Cat:\n    def __init__(s, name):\n        s.name = name\n    def meow(s):\n        print(f'{s.name}: Meow!')\ncat = Cat('Nabi')\ncat.meow()\n```",
          options: ["Meow!", "Nabi: Meow!", "Cat: Meow!", "Error"],
          answer: 1,
          explanation: "s.name is 'Nabi', so 'Nabi: Meow!' is printed!"
        },
        {
          id: "ch1-3",
          type: "quiz",
          title: "Problem 3",
          content: "What is the output?\n\n```python\nclass Box:\n    def __init__(s, item):\n        s.item = item\nbox1 = Box('apple')\nbox2 = Box('banana')\nprint(box1.item)\nprint(box2.item)\n```",
          options: ["apple\\napple", "banana\\nbanana", "apple\\nbanana", "Error"],
          answer: 2,
          explanation: "box1 and box2 are different objects! Each has its own item!"
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "Problem 4",
          content: "What is the output?\n\n```python\nclass Counter:\n    count = 0\n    def __init__(s):\n        Counter.count += 1\na = Counter()\nb = Counter()\nc = Counter()\nprint(Counter.count)\n```",
          options: ["1", "2", "3", "0"],
          answer: 2,
          explanation: "Counter() is called 3 times -> count increases 3 times -> 3!"
        },
        {
          id: "ch1-4b",
          type: "tryit",
          title: "Problem 4.5: Build a Class Yourself!",
          task: "Create a simple class and run it!",
          initialCode: `class Student:
    def __init__(s, name, grade):
        s.name = name
        s.grade = grade

    def introduce(s):
        print(f'Name: {s.name}, Grade: {s.grade}')

    def is_senior(s):
        if s.grade >= 3:
            return True
        return False

# Create students
s1 = Student('Alice', 2)
s2 = Student('Bob', 3)

s1.introduce()
s2.introduce()

print(f'\\n{s1.name} senior? {s1.is_senior()}')
print(f'{s2.name} senior? {s2.is_senior()}')`,
          expectedOutput: `Name: Alice, Grade: 2\nName: Bob, Grade: 3\n\nAlice senior? False\nBob senior? True`,
          hint: "__init__ sets attributes, methods define behavior!",
          hint2: "Just run the code as-is!"
        },
        {
          id: "ch1-5",
          type: "quiz",
          title: "Problem 5",
          content: "What is the output?\n\n```python\nclass Player:\n    def __init__(s, name, score):\n        s.name = name\n        s.score = score\np = Player('Alice', 85)\np.score = p.score + 10\nprint(f'{p.name}: {p.score} pts')\n```",
          options: ["Alice: 85 pts", "Alice: 95 pts", "Alice: 10 pts", "Error"],
          answer: 1,
          explanation: "85 + 10 = 95! Attributes can be changed anytime!"
        },
        {
          id: "ch1-6",
          type: "quiz",
          title: "Problem 6",
          content: "What is the output?\n\n```python\nclass Greeting:\n    def hello(s, name):\n        return f'Hi, {name}!'\ng = Greeting()\nresult = g.hello('Bob')\nprint(result)\n```",
          options: ["Hi, Bob!", "None", "Error", "Hi, name!"],
          answer: 0,
          explanation: "return gives back the string, and print outputs it!"
        },
        {
          id: "ch1-7",
          type: "quiz",
          title: "Problem 7",
          content: "What is the output?\n\n```python\nclass Number:\n    def __init__(s, value):\n        s.value = value\n    def double(s):\n        return s.value * 2\nn = Number(7)\nprint(n.double())\n```",
          options: ["7", "14", "77", "Error"],
          answer: 1,
          explanation: "7 * 2 = 14! The double() method doubles the value!"
        },
        {
          id: "ch1-7b",
          type: "mission",
          title: "Problem 7.5: Calculator Class!",
          task: "Fill in 3 blanks to complete the calculator class!",
          initialCode: `class Calculator:
    def __init__(s, name):
        s.name = name
        s.result = 0

    def add(s, n):
        s.___ = s.result + n
        return s

    def subtract(s, n):
        s.result = s.result - n
        return ___

    def show(s):
        print(f'{s.name}: {s.result}')

calc = Calculator('My Calculator')
calc.add(10)
calc.add(5)
calc.subtract(3)
calc.___()`,
          expectedOutput: `My Calculator: 12`,
          hint: "Store in result, return s, display with show!",
          hint2: "result / s / show"
        },
        {
          id: "ch1-8",
          type: "quiz",
          title: "Problem 8",
          content: "What is the output?\n\n```python\nclass Stack:\n    def __init__(s):\n        s.items = []\n    def push(s, item):\n        s.items.append(item)\n    def size(s):\n        return len(s.items)\nstack = Stack()\nstack.push('a')\nstack.push('b')\nstack.push('c')\nprint(stack.size())\n```",
          options: ["0", "1", "2", "3"],
          answer: 3,
          explanation: "Pushed 'a', 'b', 'c' — three items -> size() = 3!"
        }
      ]
    },
    {
      id: "ch2",
      title: "Medium (9-14)",
      emoji: "⭐",
      steps: [
        {
          id: "ch2-0",
          type: "mission",
          title: "Problem 9: Calculator Class",
          task: "Fill in the blanks to complete the Calculator class!",
          initialCode: `class Calculator:
    def add(s, a, b):
        ___
    def multiply(s, a, b):
        ___

calc = Calculator()
print(calc.add(3, 5))
print(calc.multiply(4, 6))`,
          expectedOutput: "8\n24",
          hint: "Methods take parameters after s",
          hint2: "return a + b / return a * b"
        },
        {
          id: "ch2-1",
          type: "mission",
          title: "Problem 10: Rectangle Class",
          task: "Fill in the blanks to complete the Rectangle's area and perimeter!",
          initialCode: `class Rectangle:
    def __init__(s, width, height):
        s.width = width
        s.height = height
    def area(s):
        ___
    def perimeter(s):
        ___

rect = Rectangle(5, 3)
print(f'Area: {rect.area()}')
print(f'Perimeter: {rect.perimeter()}')`,
          expectedOutput: "Area: 15\nPerimeter: 16",
          hint: "Area = width x height, Perimeter = (width + height) x 2",
          hint2: "return s.width * s.height / return (s.width + s.height) * 2"
        },
        {
          id: "ch2-2",
          type: "quiz",
          title: "Problem 11",
          content: "What is the output?\n\n```python\nclass Animal:\n    total = 0\n    def __init__(s, species):\n        s.species = species\n        Animal.total += 1\ncat = Animal('cat')\ndog = Animal('dog')\nprint(f'{cat.species}, {dog.species}')\nprint(f'Total: {Animal.total}')\n```",
          options: [
            "cat, dog\\nTotal: 1",
            "cat, dog\\nTotal: 2",
            "dog, cat\\nTotal: 2",
            "Error"
          ],
          answer: 1,
          explanation: "Animal() is called 2 times -> total = 2! Each object has its own species!"
        },
        {
          id: "ch2-3",
          type: "mission",
          title: "Problem 12: Student Grades Class",
          task: "Fill in the blanks to complete the Student's add_score and average!",
          initialCode: `class Student:
    def __init__(s, name):
        s.name = name
        s.scores = []
    def add_score(s, score):
        ___
    def average(s):
        ___

student = Student('Mike')
student.add_score(85)
student.add_score(92)
student.add_score(78)
print(f"{student.name}'s average: {student.average():.1f}")`,
          expectedOutput: "Mike's average: 85.0",
          hint: "Use append to add scores, sum/len for the average!",
          hint2: "s.scores.append(score) / return sum(s.scores) / len(s.scores)"
        },
        {
          id: "ch2-4",
          type: "quiz",
          title: "Problem 13",
          content: "In `hero.attack(monster)`, what goes into `s`?\n\n```python\nclass Character:\n    def attack(s, target):\n        print(f'{s.name} -> {target.name}')\n```",
          options: ["monster", "hero", "attack", "None"],
          answer: 1,
          explanation: "The object that calls the method (hero) goes into s!"
        },
        {
          id: "ch2-5",
          type: "tryit",
          title: "Problem 14: Vending Machine Class",
          task: "Run the VendingMachine class and check the result!",
          initialCode: `class VendingMachine:
    def __init__(s):
        s.items = {'Cola': 1200, 'Sprite': 1000, 'Juice': 1500}
    def show_menu(s):
        for name, price in s.items.items():
            print(f'{name}: \${price}')
    def buy(s, item, money):
        if item not in s.items:
            print('Item not found!')
        elif money < s.items[item]:
            print(f'Not enough! Need \${s.items[item] - money} more')
        else:
            change = money - s.items[item]
            print(f'{item} purchased! Change: \${change}')

vm = VendingMachine()
vm.show_menu()
vm.buy('Cola', 2000)
vm.buy('Juice', 1000)`,
          expectedOutput: "Cola: $1200\nSprite: $1000\nJuice: $1500\nCola purchased! Change: $800\nNot enough! Need $500 more",
          hint: "Use .items() on the dictionary to get name and price",
          hint2: "Conditionals branch for: item exists, not enough money, purchase success"
        }
      ]
    },
    {
      id: "ch3",
      title: "Challenge (15-20)",
      emoji: "⭐",
      steps: [
        {
          id: "ch3-0",
          type: "tryit",
          title: "Problem 15: Library Class",
          task: "Run the Library class and check the result!",
          initialCode: `class Library:
    def __init__(s):
        s.books = {}
    def add_book(s, title, author):
        s.books[title] = author
        print(f'Added: {title} ({author})')
    def find_book(s, title):
        if title in s.books:
            print(f'O {title} - {s.books[title]}')
        else:
            print(f'X {title} not found')
    def count(s):
        return len(s.books)

lib = Library()
lib.add_book('Harry Potter', 'J.K. Rowling')
lib.add_book('Little Prince', 'Saint-Exupery')
lib.find_book('Harry Potter')
lib.find_book('Lord of the Rings')
print(f'Total {lib.count()} books')`,
          expectedOutput: "Added: Harry Potter (J.K. Rowling)\nAdded: Little Prince (Saint-Exupery)\nO Harry Potter - J.K. Rowling\nX Lord of the Rings not found\nTotal 2 books",
          hint: "Store as title: author in the dictionary, search with in!",
          hint2: "s.books[title] = author / title in s.books / len(s.books)"
        },
        {
          id: "ch3-1",
          type: "quiz",
          title: "Problem 16",
          content: "What is the output?\n\n```python\nclass Animal:\n    def speak(s):\n        print('...')\n\nclass Dog(Animal):\n    def speak(s):\n        print('Woof!')\n\nclass Cat(Animal):\n    def speak(s):\n        print('Meow!')\n\ndog = Dog()\ncat = Cat()\ndog.speak()\ncat.speak()\n```",
          options: ["...\\n...", "Woof!\\nMeow!", "...\\nWoof!", "Error"],
          answer: 1,
          explanation: "Child classes override the parent's method!"
        },
        {
          id: "ch3-2",
          type: "tryit",
          title: "Problem 17: Warrior vs Mage",
          task: "Run the battle between two classes!",
          initialCode: `class Warrior:
    def __init__(s):
        s.name = 'Warrior'
        s.hp = 120
        s.atk = 30
    def attack(s, target):
        target.hp -= s.atk
        print(f'{s.name} -> {target.name} ({s.atk} dmg)')

class Mage:
    def __init__(s):
        s.name = 'Mage'
        s.hp = 80
        s.atk = 45
    def attack(s, target):
        target.hp -= s.atk
        print(f'{s.name} -> {target.name} ({s.atk} dmg)')

warrior = Warrior()
mage = Mage()
warrior.attack(mage)
mage.attack(warrior)
print(f'{warrior.name} HP: {warrior.hp}')
print(f'{mage.name} HP: {mage.hp}')`,
          expectedOutput: "Warrior -> Mage (30 dmg)\nMage -> Warrior (45 dmg)\nWarrior HP: 75\nMage HP: 50",
          hint: "Subtract s.atk from target.hp!",
          hint2: "target.hp -= s.atk reduces the opponent's HP"
        },
        {
          id: "ch3-3",
          type: "mission",
          title: "Problem 18: Pet Class Mission",
          task: "Fill in 3 blanks (___) to complete the pet care class!",
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
        print(f'{s.name} fullness: {s.hunger}')

    def play(s):
        s.___ += 30
        if s.happiness > 100:
            s.happiness = 100
        s.hunger -= 10
        print(f'{s.name} happiness: {s.happiness}')

    def status(s):
        print(f'{s.name}({s.___}): fullness={s.hunger} happiness={s.happiness}')

pet = Pet('Choco', 'dog')
pet.status()
pet.feed()
pet.play()
pet.status()`,
          expectedOutput: "Choco(dog): fullness=50 happiness=50\nChoco fullness: 70\nChoco happiness: 80\nChoco(dog): fullness=60 happiness=80",
          hint: "Feeding increases fullness, playing increases happiness!",
          hint2: "+= / happiness / species"
        },
        {
          id: "ch3-4",
          type: "quiz",
          title: "Problem 19",
          content: "Which is a **class variable**?\n\n```python\nclass Shop:\n    discount = 10\n    def __init__(s, name):\n        s.name = name\n```",
          options: ["s.name", "discount", "name", "__init__"],
          answer: 1,
          explanation: "discount is defined directly on the class — it's a class variable! s.name is an instance variable."
        },
        {
          id: "ch3-5",
          type: "mission",
          title: "Problem 20: Banking System",
          task: "Fill in 4 blanks (___) to complete the banking system!",
          initialCode: `class Bank:
    total_accounts = 0

    def __init__(s, name):
        s.name = name
        s.accounts = {}
        Bank.total_accounts ___ 1

    def create_account(s, owner, initial):
        s.accounts[owner] = initial
        print(f'{owner} account created! Balance: \${initial}')

    def transfer(s, sender, receiver, amount):
        if sender not in s.accounts:
            print(f'{sender} account not found')
        elif s.accounts[sender] < ___:
            print(f'Insufficient balance!')
        else:
            s.accounts[sender] -= amount
            s.accounts[___] += amount
            print(f'{sender} -> {receiver} \${amount} transferred')

    def show_all(s):
        print(f'=== {s.name} ===')
        for owner, balance in s.accounts.___():
            print(f'  {owner}: \${balance}')

bank = Bank('Python Bank')
bank.create_account('Alice', 10000)
bank.create_account('Bob', 5000)
bank.transfer('Alice', 'Bob', 3000)
bank.show_all()
print(f'Total banks: {Bank.total_accounts}')`,
          expectedOutput: "Alice account created! Balance: $10000\nBob account created! Balance: $5000\nAlice -> Bob $3000 transferred\n=== Python Bank ===\n  Alice: $7000\n  Bob: $8000\nTotal banks: 1",
          hint: "Transfer = subtract from sender and add to receiver!",
          hint2: "+= / amount / receiver / items"
        }
      ]
    }
  ]
}
