import { Chapter } from '../types'

export const ch2: Chapter = {
  id: "ch2",
  title: "⭐⭐ 보통 (9~14)",
  emoji: "⭐",
  steps: [
    {
      id: "ch2-0",
      type: "mission",
      title: "문제 9: Calculator 클래스",
      task: "빈칸을 채워서 Calculator 클래스를 완성하세요!",
      initialCode: `class Calculator:
    def add(s, a, b):
        ___
    def multiply(s, a, b):
        ___

calc = Calculator()
print(calc.add(3, 5))
print(calc.multiply(4, 6))`,
      expectedOutput: "8\n24",
      hint: "메서드는 s 다음에 매개변수를 받아요",
      hint2: "return a + b / return a * b"
    },
    {
      id: "ch2-1",
      type: "mission",
      title: "문제 10: 사각형 클래스",
      task: "빈칸을 채워서 Rectangle 클래스의 area와 perimeter를 완성하세요!",
      initialCode: `class Rectangle:
    def __init__(s, width, height):
        s.width = width
        s.height = height
    def area(s):
        ___
    def perimeter(s):
        ___

rect = Rectangle(5, 3)
print(f'넓이: {rect.area()}')
print(f'둘레: {rect.perimeter()}')`,
      expectedOutput: "넓이: 15\n둘레: 16",
      hint: "넓이 = 가로 × 세로, 둘레 = (가로 + 세로) × 2",
      hint2: "return s.width * s.height / return (s.width + s.height) * 2"
    },
    {
      id: "ch2-2",
      type: "quiz",
      title: "문제 11",
      content: "출력 결과는?\n\n```python\nclass Animal:\n    total = 0\n    def __init__(s, species):\n        s.species = species\n        Animal.total += 1\ncat = Animal('고양이')\ndog = Animal('강아지')\nprint(f'{cat.species}, {dog.species}')\nprint(f'총: {Animal.total}마리')\n```",
      options: [
        "고양이, 강아지\\n총: 1마리",
        "고양이, 강아지\\n총: 2마리",
        "강아지, 고양이\\n총: 2마리",
        "에러"
      ],
      answer: 1,
      explanation: "Animal()을 2번 호출 → total = 2! 각 객체는 자기 species를 가져요!"
    },
    {
      id: "ch2-3",
      type: "mission",
      title: "문제 12: 학생 성적 클래스",
      task: "빈칸을 채워서 Student 클래스의 add_score와 average를 완성하세요!",
      initialCode: `class Student:
    def __init__(s, name):
        s.name = name
        s.scores = []
    def add_score(s, score):
        ___
    def average(s):
        ___

student = Student('민수')
student.add_score(85)
student.add_score(92)
student.add_score(78)
print(f'{student.name}의 평균: {student.average():.1f}')`,
      expectedOutput: "민수의 평균: 85.0",
      hint: "append로 점수 추가, sum/len으로 평균 계산!",
      hint2: "s.scores.append(score) / return sum(s.scores) / len(s.scores)"
    },
    {
      id: "ch2-4",
      type: "quiz",
      title: "문제 13",
      content: "`hero.attack(monster)`에서 `s`에 들어가는 것은?\n\n```python\nclass Character:\n    def attack(s, target):\n        print(f'{s.name} → {target.name}')\n```",
      options: ["monster", "hero", "attack", "None"],
      answer: 1,
      explanation: "메서드를 호출한 객체(hero)가 s에 들어가요!"
    },
    {
      id: "ch2-5",
      type: "tryit",
      title: "문제 14: 자판기 클래스",
      task: "VendingMachine 클래스를 실행하고 결과를 확인하세요!",
      initialCode: `class VendingMachine:
    def __init__(s):
        s.items = {'콜라': 1200, '사이다': 1000, '주스': 1500}
    def show_menu(s):
        for name, price in s.items.items():
            print(f'{name}: {price}원')
    def buy(s, item, money):
        if item not in s.items:
            print('없는 상품!')
        elif money < s.items[item]:
            print(f'돈 부족! {s.items[item] - money}원 더 필요')
        else:
            change = money - s.items[item]
            print(f'{item} 구매! 거스름돈: {change}원')

vm = VendingMachine()
vm.show_menu()
vm.buy('콜라', 2000)
vm.buy('주스', 1000)`,
      expectedOutput: "콜라: 1200원\n사이다: 1000원\n주스: 1500원\n콜라 구매! 거스름돈: 800원\n돈 부족! 500원 더 필요",
      hint: "딕셔너리의 .items()로 이름과 가격을 가져와요",
      hint2: "조건문으로 상품 존재, 금액 부족, 구매 성공을 분기해요"
    }
  ]
}
