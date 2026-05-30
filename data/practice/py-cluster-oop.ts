import type { PracticeCluster } from "./types"

export const pyOopCluster: PracticeCluster = {
  id: "py-oop",
  title: "클래스/OOP",
  emoji: "🏗️",
  description: "class, __init__, 메서드, 상속, 캡슐화",
  unlockAfter: "42",
  en: {
    title: "Classes / OOP",
    description: "class, __init__, methods, inheritance, encapsulation",
  },
  problems: [
    {
      id: "pyoop-001",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "쉬움",
      title: "사각형 클래스",
      description: `가로(w)와 세로(h)를 받는 Rectangle 클래스를 구현하세요.
- area(): 넓이 반환 (w × h)
- perimeter(): 둘레 반환 (2 × (w + h))

입력: 첫 줄에 w h, 이후 호출할 메서드 이름 (area 또는 perimeter)`,
      constraints: "1 ≤ w, h ≤ 1000",
      initialCode: `class Rectangle:
    def __init__(self, w, h):
        # 인스턴스 변수 설정
        pass

    def area(self):
        pass

    def perimeter(self):
        pass

w, h = map(int, input().split())
method = input().strip()
rect = Rectangle(w, h)
if method == "area":
    print(rect.area())
else:
    print(rect.perimeter())`,
      testCases: [
        { stdin: "4 3\narea", expectedOutput: "12", label: "넓이" },
        { stdin: "4 3\nperimeter", expectedOutput: "14", label: "둘레" },
        { stdin: "10 5\narea", expectedOutput: "50", label: "큰 사각형 넓이" },
        { stdin: "7 2\nperimeter", expectedOutput: "18", label: "큰 사각형 둘레" },
      ],
      hints: [
        "__init__에서 self.w = w, self.h = h로 저장하세요.",
        "area는 self.w * self.h를 반환합니다.",
        "perimeter는 2 * (self.w + self.h)를 반환합니다.",
      ],
      solutionCode: `class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

    def perimeter(self):
        return 2 * (self.w + self.h)

w, h = map(int, input().split())
method = input().strip()
rect = Rectangle(w, h)
if method == "area":
    print(rect.area())
else:
    print(rect.perimeter())`,
      solutionExplanation: "__init__은 객체 생성 시 자동으로 호출됩니다. self는 현재 인스턴스를 가리키며, self.w처럼 인스턴스 변수를 정의합니다.",
      en: {
        title: "Rectangle Class",
        description: `Implement a Rectangle class that accepts width (w) and height (h).
- area(): returns the area (w × h)
- perimeter(): returns the perimeter (2 × (w + h))

Input: w h on the first line, then the method name (area or perimeter)`,
        constraints: "1 ≤ w, h ≤ 1000",
        hints: [
          "In __init__, store the values as self.w = w and self.h = h.",
          "area() returns self.w * self.h.",
          "perimeter() returns 2 * (self.w + self.h).",
        ],
        solutionExplanation: "__init__ is called automatically when an object is created. self refers to the current instance, and instance attributes like self.w are defined here.",
      },
      language: "python",
    },
    {
      id: "pyoop-002",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "쉬움",
      title: "카운터 클래스",
      description: `Counter 클래스를 구현하세요.
- increment(): 카운터를 1 증가
- decrement(): 카운터를 1 감소
- get_count(): 현재 카운터 값 반환 (초기값 0)

입력: 명령어 리스트 (각 줄에 inc / dec / get)`,
      constraints: "1 ≤ 명령어 수 ≤ 20",
      initialCode: `class Counter:
    def __init__(self):
        pass

    def increment(self):
        pass

    def decrement(self):
        pass

    def get_count(self):
        pass

c = Counter()
n = int(input())
for _ in range(n):
    cmd = input().strip()
    if cmd == "inc":
        c.increment()
    elif cmd == "dec":
        c.decrement()
    elif cmd == "get":
        print(c.get_count())`,
      testCases: [
        { stdin: "3\ninc\ninc\nget", expectedOutput: "2", label: "증가 후 조회" },
        { stdin: "4\ninc\ninc\ndec\nget", expectedOutput: "1", label: "증감 후 조회" },
        { stdin: "1\nget", expectedOutput: "0", label: "초기값" },
        { stdin: "5\ninc\ninc\ninc\ndec\nget", expectedOutput: "2", label: "복합" },
      ],
      hints: [
        "self.count = 0으로 초기화하세요.",
        "increment: self.count += 1",
        "get_count: return self.count",
      ],
      solutionCode: `class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1

    def decrement(self):
        self.count -= 1

    def get_count(self):
        return self.count

c = Counter()
n = int(input())
for _ in range(n):
    cmd = input().strip()
    if cmd == "inc":
        c.increment()
    elif cmd == "dec":
        c.decrement()
    elif cmd == "get":
        print(c.get_count())`,
      solutionExplanation: "클래스의 상태는 인스턴스 변수(self.count)에 저장됩니다. 각 메서드는 self를 통해 인스턴스 변수에 접근하고 수정합니다.",
      en: {
        title: "Counter Class",
        description: `Implement a Counter class.
- increment(): increases the counter by 1
- decrement(): decreases the counter by 1
- get_count(): returns the current counter value (initial value 0)

Input: number of commands, then each command (inc / dec / get)`,
        constraints: "1 ≤ number of commands ≤ 20",
        hints: [
          "Initialize with self.count = 0.",
          "increment: self.count += 1",
          "get_count: return self.count",
        ],
        solutionExplanation: "A class stores its state in instance attributes (self.count). Each method accesses and modifies the instance attribute through self.",
      },
      language: "python",
    },
    {
      id: "pyoop-003",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "쉬움",
      title: "은행 계좌 클래스",
      description: `BankAccount 클래스를 구현하세요.
- __init__(balance): 초기 잔액 설정
- deposit(n): n원 입금 (잔액 증가)
- withdraw(n): n원 출금. 잔액 부족 시 "잔액 부족" 출력
- get_balance(): 현재 잔액 반환`,
      constraints: "0 ≤ 초기 잔액 ≤ 1000000, 0 < n ≤ 1000000",
      initialCode: `class BankAccount:
    def __init__(self, balance):
        pass

    def deposit(self, n):
        pass

    def withdraw(self, n):
        # 잔액 부족 시 "잔액 부족" 출력
        pass

    def get_balance(self):
        pass

balance = int(input())
account = BankAccount(balance)
q = int(input())
for _ in range(q):
    line = input().split()
    cmd = line[0]
    if cmd == "deposit":
        account.deposit(int(line[1]))
    elif cmd == "withdraw":
        account.withdraw(int(line[1]))
    elif cmd == "balance":
        print(account.get_balance())`,
      testCases: [
        { stdin: "1000\n2\ndeposit 500\nbalance", expectedOutput: "1500", label: "입금 후 잔액" },
        { stdin: "1000\n2\nwithdraw 300\nbalance", expectedOutput: "700", label: "출금 후 잔액" },
        { stdin: "500\n2\nwithdraw 600\nbalance", expectedOutput: "잔액 부족\n500", label: "잔액 부족" },
        { stdin: "0\n3\ndeposit 1000\nwithdraw 1000\nbalance", expectedOutput: "0", label: "입출금 동일" },
      ],
      hints: [
        "self.balance = balance로 초기화하세요.",
        "withdraw에서 n > self.balance이면 print('잔액 부족')을 출력하고 return합니다.",
      ],
      solutionCode: `class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def deposit(self, n):
        self.balance += n

    def withdraw(self, n):
        if n > self.balance:
            print("잔액 부족")
            return
        self.balance -= n

    def get_balance(self):
        return self.balance

balance = int(input())
account = BankAccount(balance)
q = int(input())
for _ in range(q):
    line = input().split()
    cmd = line[0]
    if cmd == "deposit":
        account.deposit(int(line[1]))
    elif cmd == "withdraw":
        account.withdraw(int(line[1]))
    elif cmd == "balance":
        print(account.get_balance())`,
      solutionExplanation: "잔액 부족 조건을 먼저 확인하고 early return으로 처리합니다. 클래스가 상태(잔액)를 관리하고, 메서드가 상태를 안전하게 변경합니다.",
      en: {
        title: "Bank Account Class",
        description: `Implement a BankAccount class.
- __init__(balance): set the initial balance
- deposit(n): add n to the balance
- withdraw(n): subtract n from the balance. Print "잔액 부족" if insufficient funds
- get_balance(): return the current balance`,
        constraints: "0 ≤ initial balance ≤ 1000000, 0 < n ≤ 1000000",
        hints: [
          "Initialize with self.balance = balance.",
          "In withdraw, check if n > self.balance first; if so, print '잔액 부족' and return.",
        ],
        solutionExplanation: "Check the insufficient funds condition first and use an early return. The class manages state (balance), and the methods modify that state safely.",
      },
      language: "python",
    },
    {
      id: "pyoop-004",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "보통",
      title: "스택 클래스",
      description: `Stack 클래스를 구현하세요.
- push(x): x를 스택에 추가
- pop(): 스택 최상단 값 제거 후 반환. 빈 스택이면 "비어있음" 출력
- peek(): 최상단 값 반환 (제거하지 않음). 빈 스택이면 "비어있음" 출력
- is_empty(): 스택이 비어있으면 True, 아니면 False
- size(): 스택의 크기 반환`,
      constraints: "1 ≤ 명령어 수 ≤ 30",
      initialCode: `class Stack:
    def __init__(self):
        self.data = []

    def push(self, x):
        pass

    def pop(self):
        pass

    def peek(self):
        pass

    def is_empty(self):
        pass

    def size(self):
        pass

s = Stack()
n = int(input())
for _ in range(n):
    line = input().split()
    cmd = line[0]
    if cmd == "push":
        s.push(int(line[1]))
    elif cmd == "pop":
        print(s.pop())
    elif cmd == "peek":
        print(s.peek())
    elif cmd == "empty":
        print(s.is_empty())
    elif cmd == "size":
        print(s.size())`,
      testCases: [
        { stdin: "4\npush 1\npush 2\npop\npeek", expectedOutput: "2\n1", label: "push/pop/peek" },
        { stdin: "3\npush 5\nempty\nsize", expectedOutput: "False\n1", label: "is_empty/size" },
        { stdin: "2\npop\nempty", expectedOutput: "비어있음\nTrue", label: "빈 스택" },
        { stdin: "5\npush 10\npush 20\npush 30\npop\npop", expectedOutput: "30\n20", label: "LIFO 확인" },
      ],
      hints: [
        "push: self.data.append(x)",
        "pop: is_empty()를 먼저 확인 후, self.data.pop() 호출",
        "peek: self.data[-1]로 마지막 요소 접근",
        "LIFO: Last In, First Out — 나중에 넣은 것이 먼저 나옵니다.",
      ],
      solutionCode: `class Stack:
    def __init__(self):
        self.data = []

    def push(self, x):
        self.data.append(x)

    def pop(self):
        if self.is_empty():
            return "비어있음"
        return self.data.pop()

    def peek(self):
        if self.is_empty():
            return "비어있음"
        return self.data[-1]

    def is_empty(self):
        return len(self.data) == 0

    def size(self):
        return len(self.data)

s = Stack()
n = int(input())
for _ in range(n):
    line = input().split()
    cmd = line[0]
    if cmd == "push":
        s.push(int(line[1]))
    elif cmd == "pop":
        print(s.pop())
    elif cmd == "peek":
        print(s.peek())
    elif cmd == "empty":
        print(s.is_empty())
    elif cmd == "size":
        print(s.size())`,
      solutionExplanation: "스택은 LIFO(Last In First Out) 구조입니다. Python 리스트의 append()/pop()은 O(1)이라 스택 구현에 적합합니다. 빈 스택 처리를 항상 먼저 확인해야 합니다.",
      en: {
        title: "Stack Class",
        description: `Implement a Stack class.
- push(x): add x to the top of the stack
- pop(): remove and return the top value. Print "비어있음" if empty
- peek(): return the top value without removing it. Print "비어있음" if empty
- is_empty(): return True if empty, False otherwise
- size(): return the number of elements`,
        constraints: "1 ≤ number of commands ≤ 30",
        hints: [
          "push: self.data.append(x)",
          "pop: check is_empty() first, then call self.data.pop()",
          "peek: access self.data[-1] for the last element",
          "LIFO: Last In, First Out — the most recently added item comes out first.",
        ],
        solutionExplanation: "A stack is LIFO (Last In First Out). Python list's append()/pop() are both O(1), making it ideal for stack implementation. Always check for an empty stack before popping or peeking.",
      },
      language: "python",
    },
    {
      id: "pyoop-005",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "보통",
      title: "큐 클래스",
      description: `Queue 클래스를 구현하세요.
- enqueue(x): x를 큐의 뒤에 추가
- dequeue(): 큐의 앞에서 제거 후 반환. 빈 큐이면 "비어있음" 출력
- front(): 앞 요소 반환 (제거 안 함). 빈 큐이면 "비어있음" 출력
- is_empty(): 비어있으면 True`,
      constraints: "1 ≤ 명령어 수 ≤ 30",
      initialCode: `from collections import deque

class Queue:
    def __init__(self):
        self.data = deque()

    def enqueue(self, x):
        pass

    def dequeue(self):
        pass

    def front(self):
        pass

    def is_empty(self):
        pass

q = Queue()
n = int(input())
for _ in range(n):
    line = input().split()
    cmd = line[0]
    if cmd == "enqueue":
        q.enqueue(int(line[1]))
    elif cmd == "dequeue":
        print(q.dequeue())
    elif cmd == "front":
        print(q.front())
    elif cmd == "empty":
        print(q.is_empty())`,
      testCases: [
        { stdin: "4\nenqueue 1\nenqueue 2\ndequeue\nfront", expectedOutput: "1\n2", label: "enqueue/dequeue/front" },
        { stdin: "2\ndequeue\nempty", expectedOutput: "비어있음\nTrue", label: "빈 큐" },
        { stdin: "5\nenqueue 10\nenqueue 20\nenqueue 30\ndequeue\ndequeue", expectedOutput: "10\n20", label: "FIFO 확인" },
        { stdin: "3\nenqueue 5\nempty\nfront", expectedOutput: "False\n5", label: "is_empty/front" },
      ],
      hints: [
        "deque의 append()는 뒤에 추가, popleft()는 앞에서 제거입니다.",
        "enqueue: self.data.append(x)",
        "dequeue: self.data.popleft()",
        "front: self.data[0]으로 첫 번째 요소에 접근",
      ],
      solutionCode: `from collections import deque

class Queue:
    def __init__(self):
        self.data = deque()

    def enqueue(self, x):
        self.data.append(x)

    def dequeue(self):
        if self.is_empty():
            return "비어있음"
        return self.data.popleft()

    def front(self):
        if self.is_empty():
            return "비어있음"
        return self.data[0]

    def is_empty(self):
        return len(self.data) == 0

q = Queue()
n = int(input())
for _ in range(n):
    line = input().split()
    cmd = line[0]
    if cmd == "enqueue":
        q.enqueue(int(line[1]))
    elif cmd == "dequeue":
        print(q.dequeue())
    elif cmd == "front":
        print(q.front())
    elif cmd == "empty":
        print(q.is_empty())`,
      solutionExplanation: "큐는 FIFO(First In First Out) 구조입니다. 리스트의 pop(0)은 O(n)이지만 deque의 popleft()는 O(1)입니다. 항상 deque를 사용하는 것이 좋습니다.",
      en: {
        title: "Queue Class",
        description: `Implement a Queue class.
- enqueue(x): add x to the back of the queue
- dequeue(): remove and return the front element. Print "비어있음" if empty
- front(): return the front element without removing it. Print "비어있음" if empty
- is_empty(): return True if empty`,
        constraints: "1 ≤ number of commands ≤ 30",
        hints: [
          "deque's append() adds to the back; popleft() removes from the front.",
          "enqueue: self.data.append(x)",
          "dequeue: self.data.popleft()",
          "front: access self.data[0] for the first element",
        ],
        solutionExplanation: "A queue is FIFO (First In First Out). list's pop(0) is O(n), but deque's popleft() is O(1). Always prefer deque for queue implementations.",
      },
      language: "python",
    },
    {
      id: "pyoop-006",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "보통",
      title: "상속: 도형 넓이",
      description: `Shape 기본 클래스에서 Circle과 Rectangle을 상속받아 구현하세요.
- Shape: area() 메서드 (기본값 0 반환)
- Circle(r): area() = π × r² (π = 3.14159)
- Rectangle(w, h): area() = w × h

입력: 도형 종류(circle/rectangle) + 파라미터, 출력: 넓이 (소수점 2자리)`,
      constraints: "1 ≤ r, w, h ≤ 1000",
      initialCode: `class Shape:
    def area(self):
        return 0

class Circle(Shape):
    def __init__(self, r):
        pass

    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, w, h):
        pass

    def area(self):
        pass

line = input().split()
shape_type = line[0]
if shape_type == "circle":
    r = int(line[1])
    shape = Circle(r)
else:
    w, h = int(line[1]), int(line[2])
    shape = Rectangle(w, h)
print(f'{shape.area():.2f}')`,
      testCases: [
        { stdin: "circle 5", expectedOutput: "78.54", label: "원" },
        { stdin: "rectangle 4 3", expectedOutput: "12.00", label: "사각형" },
        { stdin: "circle 1", expectedOutput: "3.14", label: "반지름 1" },
        { stdin: "rectangle 10 10", expectedOutput: "100.00", label: "정사각형" },
      ],
      hints: [
        "class Circle(Shape):로 상속을 선언합니다.",
        "Circle.area()에서 부모의 area()를 오버라이드합니다.",
        "π = 3.14159를 사용하세요.",
      ],
      solutionCode: `class Shape:
    def area(self):
        return 0

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return 3.14159 * self.r * self.r

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

line = input().split()
shape_type = line[0]
if shape_type == "circle":
    r = int(line[1])
    shape = Circle(r)
else:
    w, h = int(line[1]), int(line[2])
    shape = Rectangle(w, h)
print(f'{shape.area():.2f}')`,
      solutionExplanation: "상속(inheritance)으로 공통 인터페이스를 정의하고 각 자식 클래스가 area()를 오버라이드합니다. 다형성 덕분에 shape.area()를 호출하면 각 클래스에 맞는 메서드가 실행됩니다.",
      en: {
        title: "Inheritance: Shape Area",
        description: `Inherit from the Shape base class to implement Circle and Rectangle.
- Shape: area() method (returns 0 by default)
- Circle(r): area() = π × r² (π = 3.14159)
- Rectangle(w, h): area() = w × h

Input: shape type (circle/rectangle) + parameters. Output: area to 2 decimal places.`,
        constraints: "1 ≤ r, w, h ≤ 1000",
        hints: [
          "Declare inheritance with class Circle(Shape):.",
          "Override area() in each child class.",
          "Use π = 3.14159.",
        ],
        solutionExplanation: "Inheritance defines a common interface in Shape, and each child class overrides area(). Thanks to polymorphism, shape.area() calls the correct method for each class.",
      },
      language: "python",
    },
    {
      id: "pyoop-007",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "보통",
      title: "학생 클래스",
      description: `Student(name, scores) 클래스를 구현하세요.
- scores: 정수 점수 리스트
- average(): 평균 (소수점 1자리)
- grade(): 평균 기준 등급 반환 (90이상=A, 80이상=B, 70이상=C, 60이상=D, 미만=F)

입력: 이름, 점수 개수 N, N개 점수`,
      constraints: "1 ≤ 점수 개수 ≤ 10, 0 ≤ 점수 ≤ 100",
      initialCode: `class Student:
    def __init__(self, name, scores):
        self.name = name
        self.scores = scores

    def average(self):
        pass

    def grade(self):
        # 90이상: A, 80이상: B, 70이상: C, 60이상: D, 미만: F
        pass

name = input()
n = int(input())
scores = list(map(int, input().split()))
student = Student(name, scores)
print(f'{student.average():.1f}')
print(student.grade())`,
      testCases: [
        { stdin: "Alice\n3\n90 85 92", expectedOutput: "89.0\nB", label: "B 등급" },
        { stdin: "Bob\n2\n95 98", expectedOutput: "96.5\nA", label: "A 등급" },
        { stdin: "Charlie\n3\n50 55 60", expectedOutput: "55.0\nF", label: "F 등급" },
        { stdin: "Dana\n4\n70 75 72 71", expectedOutput: "72.0\nC", label: "C 등급" },
      ],
      hints: [
        "average: sum(self.scores) / len(self.scores)",
        "grade: avg = self.average()로 평균 구한 뒤 if/elif로 등급 결정",
      ],
      solutionCode: `class Student:
    def __init__(self, name, scores):
        self.name = name
        self.scores = scores

    def average(self):
        return sum(self.scores) / len(self.scores)

    def grade(self):
        avg = self.average()
        if avg >= 90:
            return 'A'
        elif avg >= 80:
            return 'B'
        elif avg >= 70:
            return 'C'
        elif avg >= 60:
            return 'D'
        else:
            return 'F'

name = input()
n = int(input())
scores = list(map(int, input().split()))
student = Student(name, scores)
print(f'{student.average():.1f}')
print(student.grade())`,
      solutionExplanation: "grade() 메서드에서 average()를 재사용합니다. elif 체인으로 높은 조건부터 낮은 순으로 확인합니다. 메서드가 다른 메서드를 호출하는 패턴은 코드 재사용의 핵심입니다.",
      en: {
        title: "Student Class",
        description: `Implement a Student(name, scores) class.
- scores: a list of integer scores
- average(): return the average to 1 decimal place
- grade(): return the letter grade based on the average (≥90=A, ≥80=B, ≥70=C, ≥60=D, otherwise=F)

Input: name, number of scores N, then N scores`,
        constraints: "1 ≤ number of scores ≤ 10, 0 ≤ score ≤ 100",
        hints: [
          "average: sum(self.scores) / len(self.scores)",
          "grade: call avg = self.average(), then determine the grade with if/elif",
        ],
        solutionExplanation: "grade() reuses average() internally. The elif chain checks from highest to lowest. One method calling another method is a key code reuse pattern.",
      },
      language: "python",
    },
    {
      id: "pyoop-008",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "보통",
      title: "__str__ 구현",
      description: `Point(x, y) 클래스를 구현하세요.
- __str__: "(x, y)" 형식으로 출력
- distance_to(other): 다른 Point까지의 거리 (소수점 2자리)

입력: x1 y1, x2 y2`,
      constraints: "-1000 ≤ x, y ≤ 1000",
      initialCode: `import math

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        # "(x, y)" 형식으로 반환
        pass

    def distance_to(self, other):
        # 두 점 사이의 거리: sqrt((x2-x1)^2 + (y2-y1)^2)
        pass

x1, y1 = map(int, input().split())
x2, y2 = map(int, input().split())
p1 = Point(x1, y1)
p2 = Point(x2, y2)
print(p1)
print(p2)
print(f'{p1.distance_to(p2):.2f}')`,
      testCases: [
        { stdin: "0 0\n3 4", expectedOutput: "(0, 0)\n(3, 4)\n5.00", label: "3-4-5 삼각형" },
        { stdin: "1 1\n1 1", expectedOutput: "(1, 1)\n(1, 1)\n0.00", label: "같은 점" },
        { stdin: "-1 -1\n2 3", expectedOutput: "(-1, -1)\n(2, 3)\n5.00", label: "음수 좌표" },
      ],
      hints: [
        "__str__: return f'({self.x}, {self.y})'",
        "distance_to: math.sqrt((self.x - other.x)**2 + (self.y - other.y)**2)",
        "print(p1)은 자동으로 p1.__str__()을 호출합니다.",
      ],
      solutionCode: `import math

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f'({self.x}, {self.y})'

    def distance_to(self, other):
        return math.sqrt((self.x - other.x)**2 + (self.y - other.y)**2)

x1, y1 = map(int, input().split())
x2, y2 = map(int, input().split())
p1 = Point(x1, y1)
p2 = Point(x2, y2)
print(p1)
print(p2)
print(f'{p1.distance_to(p2):.2f}')`,
      solutionExplanation: "__str__은 print()나 str()로 객체를 문자열로 변환할 때 호출되는 매직 메서드입니다. distance_to에서 other는 다른 Point 인스턴스이며, other.x, other.y로 속성에 접근합니다.",
      en: {
        title: "Implementing __str__",
        description: `Implement a Point(x, y) class.
- __str__: return the point as "(x, y)"
- distance_to(other): return the distance to another Point (to 2 decimal places)

Input: x1 y1, then x2 y2`,
        constraints: "-1000 ≤ x, y ≤ 1000",
        hints: [
          "__str__: return f'({self.x}, {self.y})'",
          "distance_to: math.sqrt((self.x - other.x)**2 + (self.y - other.y)**2)",
          "print(p1) automatically calls p1.__str__().",
        ],
        solutionExplanation: "__str__ is a magic method called when an object is converted to a string via print() or str(). In distance_to, other is another Point instance accessed through other.x and other.y.",
      },
      language: "python",
    },
    {
      id: "pyoop-009",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "어려움",
      title: "연산자 오버로딩: 벡터 합",
      description: `Vector(x, y) 클래스를 구현하세요.
- __add__(other): 두 벡터의 합 (Vector 반환)
- __str__: "Vector(x, y)" 형식으로 출력

입력: x1 y1, x2 y2`,
      constraints: "-1000 ≤ x, y ≤ 1000",
      initialCode: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        # 두 벡터 합을 새 Vector로 반환
        pass

    def __str__(self):
        # "Vector(x, y)" 형식
        pass

x1, y1 = map(int, input().split())
x2, y2 = map(int, input().split())
v1 = Vector(x1, y1)
v2 = Vector(x2, y2)
v3 = v1 + v2
print(v1)
print(v2)
print(v3)`,
      testCases: [
        { stdin: "1 2\n3 4", expectedOutput: "Vector(1, 2)\nVector(3, 4)\nVector(4, 6)", label: "기본 합" },
        { stdin: "0 0\n5 5", expectedOutput: "Vector(0, 0)\nVector(5, 5)\nVector(5, 5)", label: "영벡터 합" },
        { stdin: "-1 -2\n1 2", expectedOutput: "Vector(-1, -2)\nVector(1, 2)\nVector(0, 0)", label: "역벡터" },
      ],
      hints: [
        "__add__는 + 연산자를 오버로딩합니다.",
        "return Vector(self.x + other.x, self.y + other.y)로 새 벡터를 반환하세요.",
        "__str__: return f'Vector({self.x}, {self.y})'",
      ],
      solutionCode: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __str__(self):
        return f'Vector({self.x}, {self.y})'

x1, y1 = map(int, input().split())
x2, y2 = map(int, input().split())
v1 = Vector(x1, y1)
v2 = Vector(x2, y2)
v3 = v1 + v2
print(v1)
print(v2)
print(v3)`,
      solutionExplanation: "__add__는 + 연산자를 오버로딩합니다. v1 + v2는 v1.__add__(v2)를 호출합니다. 새 객체를 반환해야 원본이 변경되지 않습니다.",
      en: {
        title: "Operator Overloading: Vector Addition",
        description: `Implement a Vector(x, y) class.
- __add__(other): return the sum of two vectors as a new Vector
- __str__: return "Vector(x, y)"

Input: x1 y1, then x2 y2`,
        constraints: "-1000 ≤ x, y ≤ 1000",
        hints: [
          "__add__ overloads the + operator.",
          "return Vector(self.x + other.x, self.y + other.y) to return a new vector.",
          "__str__: return f'Vector({self.x}, {self.y})'",
        ],
        solutionExplanation: "__add__ overloads the + operator. v1 + v2 calls v1.__add__(v2). Always return a new object so the originals remain unchanged.",
      },
      language: "python",
    },
    {
      id: "pyoop-010",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "어려움",
      title: "불변 클래스",
      description: `한 번 생성되면 속성을 변경할 수 없는 Immutable 클래스를 구현하세요.
__setattr__을 오버라이드하여 __init__ 이후의 속성 변경을 막습니다.
속성 변경 시도 시 "변경 불가" 출력 후 무시합니다.

입력: x y 값, 이후 "get" 또는 "set x_val y_val"`,
      constraints: "-1000 ≤ x, y ≤ 1000",
      initialCode: `class Immutable:
    def __init__(self, x, y):
        # __init__에서는 object.__setattr__을 사용하세요
        object.__setattr__(self, 'x', x)
        object.__setattr__(self, 'y', y)
        object.__setattr__(self, '_initialized', True)

    def __setattr__(self, name, value):
        if getattr(self, '_initialized', False):
            print("변경 불가")
        else:
            object.__setattr__(self, name, value)

x, y = map(int, input().split())
obj = Immutable(x, y)
n = int(input())
for _ in range(n):
    line = input().split()
    if line[0] == "get":
        print(f'({obj.x}, {obj.y})')
    elif line[0] == "set":
        obj.x = int(line[1])`,
      testCases: [
        { stdin: "3 5\n1\nget", expectedOutput: "(3, 5)", label: "값 읽기" },
        { stdin: "3 5\n2\nset 10\nget", expectedOutput: "변경 불가\n(3, 5)", label: "변경 시도" },
        { stdin: "0 0\n3\nset 1\nset 2\nget", expectedOutput: "변경 불가\n변경 불가\n(0, 0)", label: "여러 번 시도" },
      ],
      hints: [
        "__setattr__은 속성 대입(obj.x = ...) 시 자동 호출됩니다.",
        "_initialized 플래그로 __init__ 완료 여부를 추적합니다.",
        "__init__에서 object.__setattr__을 직접 사용하여 무한 재귀를 방지합니다.",
      ],
      solutionCode: `class Immutable:
    def __init__(self, x, y):
        object.__setattr__(self, 'x', x)
        object.__setattr__(self, 'y', y)
        object.__setattr__(self, '_initialized', True)

    def __setattr__(self, name, value):
        if getattr(self, '_initialized', False):
            print("변경 불가")
        else:
            object.__setattr__(self, name, value)

x, y = map(int, input().split())
obj = Immutable(x, y)
n = int(input())
for _ in range(n):
    line = input().split()
    if line[0] == "get":
        print(f'({obj.x}, {obj.y})')
    elif line[0] == "set":
        obj.x = int(line[1])`,
      solutionExplanation: "__setattr__을 오버라이드하면 속성 대입 시 자동 호출됩니다. __init__ 중에는 object.__setattr__로 우회합니다. _initialized 플래그로 초기화 완료 후 변경을 차단합니다.",
      en: {
        title: "Immutable Class",
        description: `Implement an Immutable class whose attributes cannot be changed after creation.
Override __setattr__ to block any attribute assignment after __init__ completes.
Print "변경 불가" and ignore the change when an attempt is made.

Input: x y values, then "get" or "set x_val y_val" commands`,
        constraints: "-1000 ≤ x, y ≤ 1000",
        hints: [
          "__setattr__ is called automatically whenever an attribute is assigned (obj.x = ...).",
          "Use the _initialized flag to track whether __init__ has completed.",
          "Use object.__setattr__ inside __init__ to bypass your custom __setattr__ and avoid infinite recursion.",
        ],
        solutionExplanation: "Overriding __setattr__ intercepts every attribute assignment. Inside __init__, use object.__setattr__ to bypass it. The _initialized flag blocks changes once construction is done.",
      },
      language: "python",
    },
    {
      id: "pyoop-011",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "어려움",
      title: "싱글톤 패턴",
      description: `Singleton 클래스를 구현하세요. __new__를 오버라이드하여 항상 같은 인스턴스를 반환합니다.
두 변수에 각각 Singleton()을 대입했을 때 is 연산으로 같은 객체인지 확인합니다.`,
      constraints: "없음",
      initialCode: `class Singleton:
    _instance = None

    def __new__(cls):
        # _instance가 None이면 새 인스턴스 생성, 아니면 기존 반환
        pass

    def __init__(self):
        # 최초 1회만 초기화
        if not hasattr(self, 'initialized'):
            self.initialized = True
            self.value = 0

a = Singleton()
b = Singleton()
a.value = 42
print(a is b)       # True 출력
print(b.value)      # 42 출력`,
      testCases: [
        { stdin: "", expectedOutput: "True\n42", label: "싱글톤 확인" },
      ],
      hints: [
        "if cls._instance is None: cls._instance = super().__new__(cls)",
        "return cls._instance",
        "a.value = 42 후 b.value를 읽으면 같은 객체이므로 42가 나옵니다.",
      ],
      solutionCode: `class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.initialized = True
            self.value = 0

a = Singleton()
b = Singleton()
a.value = 42
print(a is b)
print(b.value)`,
      solutionExplanation: "__new__는 __init__ 이전에 호출되는 인스턴스 생성 메서드입니다. 클래스 변수 _instance로 유일한 인스턴스를 저장합니다. a is b는 두 변수가 같은 메모리 주소를 가리키는지 확인합니다.",
      en: {
        title: "Singleton Pattern",
        description: `Implement a Singleton class. Override __new__ so that it always returns the same instance.
When two variables are each assigned Singleton(), confirm they are the same object using the is operator.`,
        constraints: "none",
        hints: [
          "if cls._instance is None: cls._instance = super().__new__(cls)",
          "return cls._instance",
          "After a.value = 42, reading b.value will return 42 because they point to the same object.",
        ],
        solutionExplanation: "__new__ is the instance creation method called before __init__. The class variable _instance stores the single instance. a is b checks whether two variables point to the same memory address.",
      },
      language: "python",
    },
    {
      id: "pyoop-012",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "어려움",
      title: "RPG 캐릭터 전투",
      description: `Character(name, hp, atk) 클래스를 구현하세요.
- attack(enemy): enemy.hp를 self.atk만큼 감소, "{name}이(가) {enemy.name}을(를) 공격! ({enemy.name} HP: {enemy.hp})" 출력
- is_alive(): hp > 0이면 True
- 전투: 서로 번갈아 공격, 한 캐릭터가 쓰러지면(hp ≤ 0) "{name} 패배!"를 출력하고 종료

입력: name1 hp1 atk1, name2 hp2 atk2`,
      constraints: "1 ≤ hp ≤ 200, 1 ≤ atk ≤ 50, 전투는 최대 100라운드",
      initialCode: `class Character:
    def __init__(self, name, hp, atk):
        self.name = name
        self.hp = hp
        self.atk = atk

    def attack(self, enemy):
        enemy.hp -= self.atk
        print(f'{self.name}이(가) {enemy.name}을(를) 공격! ({enemy.name} HP: {enemy.hp})')

    def is_alive(self):
        return self.hp > 0

name1, hp1, atk1 = input().split()
name2, hp2, atk2 = input().split()
c1 = Character(name1, int(hp1), int(atk1))
c2 = Character(name2, int(hp2), int(atk2))

# c1이 먼저 공격, 번갈아 공격, 쓰러지면 "{name} 패배!" 출력 후 종료
# 여기에 전투 루프를 작성하세요`,
      testCases: [
        {
          stdin: "Hero 10 5\nMonster 8 3",
          expectedOutput: "Hero이(가) Monster을(를) 공격! (Monster HP: 3)\nMonster이(가) Hero을(를) 공격! (Hero HP: 7)\nHero이(가) Monster을(를) 공격! (Monster HP: -2)\nMonster 패배!",
          label: "Hero 승리"
        },
        {
          stdin: "Warrior 5 2\nDragon 20 10",
          expectedOutput: "Warrior이(가) Dragon을(를) 공격! (Dragon HP: 18)\nDragon이(가) Warrior을(를) 공격! (Warrior HP: -5)\nWarrior 패배!",
          label: "Dragon 승리"
        },
      ],
      hints: [
        "while c1.is_alive() and c2.is_alive():로 전투 루프를 구성합니다.",
        "c1.attack(c2) 후 c2.is_alive()를 확인, False이면 루프 종료",
        "c2.attack(c1) 후 c1.is_alive()를 확인합니다.",
        "루프 종료 후 is_alive()가 False인 캐릭터의 이름으로 '{name} 패배!'를 출력합니다.",
      ],
      solutionCode: `class Character:
    def __init__(self, name, hp, atk):
        self.name = name
        self.hp = hp
        self.atk = atk

    def attack(self, enemy):
        enemy.hp -= self.atk
        print(f'{self.name}이(가) {enemy.name}을(를) 공격! ({enemy.name} HP: {enemy.hp})')

    def is_alive(self):
        return self.hp > 0

name1, hp1, atk1 = input().split()
name2, hp2, atk2 = input().split()
c1 = Character(name1, int(hp1), int(atk1))
c2 = Character(name2, int(hp2), int(atk2))

while c1.is_alive() and c2.is_alive():
    c1.attack(c2)
    if not c2.is_alive():
        break
    c2.attack(c1)

if not c1.is_alive():
    print(f'{c1.name} 패배!')
else:
    print(f'{c2.name} 패배!')`,
      solutionExplanation: "attack() 후 즉시 is_alive()를 확인해야 죽은 캐릭터가 반격하지 않습니다. 전투 루프는 양쪽 모두 살아있는 동안 지속되며, 쓰러진 캐릭터를 루프 후에 판별합니다.",
      en: {
        title: "RPG Character Battle",
        description: `Implement a Character(name, hp, atk) class.
- attack(enemy): reduce enemy.hp by self.atk and print "{name}이(가) {enemy.name}을(를) 공격! ({enemy.name} HP: {enemy.hp})"
- is_alive(): return True if hp > 0
- Battle: characters attack in turns starting with c1. When one character falls (hp ≤ 0), print "{name} 패배!" and stop.

Input: name1 hp1 atk1, then name2 hp2 atk2`,
        constraints: "1 ≤ hp ≤ 200, 1 ≤ atk ≤ 50, battle lasts at most 100 rounds",
        hints: [
          "Use while c1.is_alive() and c2.is_alive(): to structure the battle loop.",
          "After c1.attack(c2), immediately check c2.is_alive(); break if False.",
          "Check c1.is_alive() after c2.attack(c1) as well.",
          "After the loop, check which character is not alive and print '{name} 패배!'.",
        ],
        solutionExplanation: "Check is_alive() immediately after each attack() so a defeated character cannot counter-attack. The battle loop continues while both are alive; the loser is determined after the loop ends.",
      },
      language: "python",
    },
    {
      id: "pyoop-013",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "쉬움",
      title: "책 클래스",
      description: `Book(title, author, pages) 클래스를 구현하세요.
- info(): "{title} - {author} ({pages}쪽)" 형식의 문자열을 반환
- is_long(): pages가 300 이상이면 True, 아니면 False

입력: 첫 줄에 title author pages (공백 구분), 둘째 줄에 호출할 메서드 이름 (info 또는 long)`,
      constraints: "1 ≤ pages ≤ 10000",
      initialCode: `class Book:
    def __init__(self, title, author, pages):
        # 인스턴스 변수 설정
        pass

    def info(self):
        pass

    def is_long(self):
        pass

title, author, pages = input().split()
method = input().strip()
book = Book(title, author, int(pages))
if method == "info":
    print(book.info())
else:
    print(book.is_long())`,
      testCases: [
        { stdin: "파이썬 김코딩 250\ninfo", expectedOutput: "파이썬 - 김코딩 (250쪽)", label: "info 출력" },
        { stdin: "파이썬 김코딩 250\nlong", expectedOutput: "False", label: "짧은 책" },
        { stdin: "알고리즘 이박사 500\nlong", expectedOutput: "True", label: "긴 책" },
        { stdin: "수학 박교수 320\ninfo", expectedOutput: "수학 - 박교수 (320쪽)", label: "info 다른 책" },
      ],
      hints: [
        "__init__에서 self.title, self.author, self.pages에 값을 저장하세요.",
        "info()는 f-string으로 형식을 만드세요: f'{self.title} - {self.author} ({self.pages}쪽)'",
        "is_long()은 self.pages >= 300을 그대로 반환하면 됩니다.",
      ],
      solutionCode: `class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def info(self):
        return f'{self.title} - {self.author} ({self.pages}쪽)'

    def is_long(self):
        return self.pages >= 300

title, author, pages = input().split()
method = input().strip()
book = Book(title, author, int(pages))
if method == "info":
    print(book.info())
else:
    print(book.is_long())`,
      solutionExplanation: "객체의 속성(title, author, pages)을 __init__에서 저장하고, 메서드에서 self.속성으로 사용합니다. is_long처럼 비교식 결과를 그대로 return하면 True/False가 반환됩니다.",
      en: {
        title: "Book Class",
        description: `Implement a Book(title, author, pages) class.
- info(): returns "{title} - {author} ({pages}쪽)" formatted string
- is_long(): returns True if pages >= 300, else False

Input: title author pages on the first line (space-separated), then the method name (info or long)`,
        constraints: "1 ≤ pages ≤ 10000",
        hints: [
          "Store self.title, self.author, self.pages in __init__.",
          "info() uses f-string: f'{self.title} - {self.author} ({self.pages}쪽)'",
          "is_long() can simply return self.pages >= 300.",
        ],
        solutionExplanation: "Store attributes in __init__ and access them via self.attribute in methods. Returning a comparison expression directly yields True/False.",
      },
      language: "python",
    },
    {
      id: "pyoop-014",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "쉬움",
      title: "입장권 클래스",
      description: `Ticket(kind, price) 클래스를 구현하세요.
- discount(rate): 가격을 rate(%)만큼 할인 (예: rate=20이면 20% 할인)
- final_price(): 현재 가격을 정수로 반환

입력: 첫 줄에 kind price, 둘째 줄에 할인율(rate). 할인 후 최종 가격을 출력하세요.`,
      constraints: "1 ≤ price ≤ 100000, 0 ≤ rate ≤ 100",
      initialCode: `class Ticket:
    def __init__(self, kind, price):
        pass

    def discount(self, rate):
        # self.price를 rate% 할인
        pass

    def final_price(self):
        pass

kind, price = input().split()
rate = int(input())
t = Ticket(kind, int(price))
t.discount(rate)
print(t.final_price())`,
      testCases: [
        { stdin: "어린이 10000\n20", expectedOutput: "8000", label: "20% 할인" },
        { stdin: "어른 15000\n0", expectedOutput: "15000", label: "할인 없음" },
        { stdin: "노인 12000\n50", expectedOutput: "6000", label: "50% 할인" },
        { stdin: "학생 8000\n10", expectedOutput: "7200", label: "10% 할인" },
      ],
      hints: [
        "__init__에서 self.kind, self.price를 저장하세요.",
        "discount는 self.price = self.price * (100 - rate) // 100 이렇게 계산할 수 있어요.",
        "final_price는 int(self.price)를 반환하세요.",
      ],
      solutionCode: `class Ticket:
    def __init__(self, kind, price):
        self.kind = kind
        self.price = price

    def discount(self, rate):
        self.price = self.price * (100 - rate) // 100

    def final_price(self):
        return int(self.price)

kind, price = input().split()
rate = int(input())
t = Ticket(kind, int(price))
t.discount(rate)
print(t.final_price())`,
      solutionExplanation: "메서드 안에서 self.price를 직접 바꾸면 객체의 상태가 변경됩니다. 이후 다른 메서드(final_price)에서도 바뀐 값이 그대로 보입니다.",
      en: {
        title: "Ticket Class",
        description: `Implement a Ticket(kind, price) class.
- discount(rate): apply rate(%) discount to price (e.g. rate=20 means 20% off)
- final_price(): return current price as integer

Input: kind price on first line, then rate. Print the final price after discount.`,
        constraints: "1 ≤ price ≤ 100000, 0 ≤ rate ≤ 100",
        hints: [
          "Store self.kind and self.price in __init__.",
          "discount: self.price = self.price * (100 - rate) // 100",
          "final_price returns int(self.price).",
        ],
        solutionExplanation: "Modifying self.price inside a method changes the object's state, and later calls (like final_price) see the updated value.",
      },
      language: "python",
    },
    {
      id: "pyoop-015",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "보통",
      title: "자동차 클래스",
      description: `Car(fuel) 클래스를 구현하세요. (fuel: 시작 연료, 주행거리는 0으로 시작)
- refuel(amount): 연료를 amount만큼 추가
- drive(km): km만큼 달림. 1km당 연료 1을 소모. 연료 부족하면 갈 수 있는 만큼만 가고 "연료 부족" 출력
- status(): "연료:{fuel}, 거리:{distance}" 출력

입력: 첫 줄에 시작 연료, 둘째 줄에 명령어 개수 n, 이후 n개 명령어 (refuel X / drive X / status)`,
      constraints: "0 ≤ fuel ≤ 100, 1 ≤ n ≤ 20",
      initialCode: `class Car:
    def __init__(self, fuel):
        self.fuel = fuel
        self.distance = 0

    def refuel(self, amount):
        pass

    def drive(self, km):
        # 연료가 km보다 적으면 fuel만큼만 가고 "연료 부족" 출력
        pass

    def status(self):
        print(f'연료:{self.fuel}, 거리:{self.distance}')

fuel = int(input())
n = int(input())
car = Car(fuel)
for _ in range(n):
    parts = input().split()
    cmd = parts[0]
    if cmd == "refuel":
        car.refuel(int(parts[1]))
    elif cmd == "drive":
        car.drive(int(parts[1]))
    else:
        car.status()`,
      testCases: [
        { stdin: "10\n3\ndrive 5\ndrive 3\nstatus", expectedOutput: "연료:2, 거리:8", label: "기본 주행" },
        { stdin: "5\n3\ndrive 10\nstatus\nrefuel 7", expectedOutput: "연료 부족\n연료:0, 거리:5", label: "연료 부족" },
        { stdin: "0\n2\nrefuel 20\nstatus", expectedOutput: "연료:20, 거리:0", label: "주유만" },
        { stdin: "8\n4\ndrive 3\nrefuel 5\ndrive 6\nstatus", expectedOutput: "연료:4, 거리:9", label: "주유 후 주행" },
      ],
      hints: [
        "refuel은 self.fuel += amount.",
        "drive는 if km <= self.fuel: 모든 km를 갈 수 있고, else: 갈 수 있는 만큼만 가고 '연료 부족' 출력.",
        "drive 후 self.fuel과 self.distance를 잊지 말고 업데이트하세요.",
      ],
      solutionCode: `class Car:
    def __init__(self, fuel):
        self.fuel = fuel
        self.distance = 0

    def refuel(self, amount):
        self.fuel += amount

    def drive(self, km):
        if km <= self.fuel:
            self.fuel -= km
            self.distance += km
        else:
            self.distance += self.fuel
            self.fuel = 0
            print("연료 부족")

    def status(self):
        print(f'연료:{self.fuel}, 거리:{self.distance}')

fuel = int(input())
n = int(input())
car = Car(fuel)
for _ in range(n):
    parts = input().split()
    cmd = parts[0]
    if cmd == "refuel":
        car.refuel(int(parts[1]))
    elif cmd == "drive":
        car.drive(int(parts[1]))
    else:
        car.status()`,
      solutionExplanation: "객체는 fuel과 distance 두 개의 상태를 가집니다. drive 메서드는 연료가 충분한지 먼저 확인하고, 부족하면 갈 수 있는 만큼만 가고 fuel을 0으로 만듭니다.",
      en: {
        title: "Car Class",
        description: `Implement a Car(fuel) class. (fuel: starting fuel, distance starts at 0)
- refuel(amount): add amount to fuel
- drive(km): drive km. Consumes 1 fuel per km. If not enough fuel, drive only what's possible and print "연료 부족"
- status(): print "연료:{fuel}, 거리:{distance}"

Input: starting fuel on first line, n on second line, then n commands (refuel X / drive X / status)`,
        constraints: "0 ≤ fuel ≤ 100, 1 ≤ n ≤ 20",
        hints: [
          "refuel: self.fuel += amount.",
          "drive: if km <= self.fuel, drive all km; else drive only fuel km and print '연료 부족'.",
          "Don't forget to update self.fuel and self.distance after driving.",
        ],
        solutionExplanation: "The object holds two states: fuel and distance. drive() first checks if there's enough fuel, otherwise drives the remaining fuel and sets fuel to 0.",
      },
      language: "python",
    },
    {
      id: "pyoop-016",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "보통",
      title: "시계 클래스",
      description: `Clock(h, m, s) 클래스를 구현하세요.
- tick(): 1초 진행. 60초 = 1분, 60분 = 1시간, 24시간이 되면 0시로 돌아감
- show(): "HH:MM:SS" 형식으로 출력 (2자리, 0으로 채움)

입력: 첫 줄에 h m s, 둘째 줄에 tick 횟수 n. 모든 tick 후 show() 결과 출력`,
      constraints: "0 ≤ h ≤ 23, 0 ≤ m, s ≤ 59, 1 ≤ n ≤ 100000",
      initialCode: `class Clock:
    def __init__(self, h, m, s):
        self.h = h
        self.m = m
        self.s = s

    def tick(self):
        # 1초 진행. 자리올림 처리 + 24시 → 0시
        pass

    def show(self):
        print(f'{self.h:02d}:{self.m:02d}:{self.s:02d}')

h, m, s = map(int, input().split())
n = int(input())
clock = Clock(h, m, s)
for _ in range(n):
    clock.tick()
clock.show()`,
      testCases: [
        { stdin: "10 30 0\n60", expectedOutput: "10:31:00", label: "1분 진행" },
        { stdin: "23 59 59\n1", expectedOutput: "00:00:00", label: "자정 넘기기" },
        { stdin: "0 0 0\n3661", expectedOutput: "01:01:01", label: "1시간 1분 1초" },
        { stdin: "12 0 0\n3600", expectedOutput: "13:00:00", label: "1시간 진행" },
      ],
      hints: [
        "self.s += 1 후 if self.s == 60: self.s = 0; self.m += 1",
        "m도 60이 되면 0으로 돌리고 self.h += 1",
        "h가 24가 되면 self.h = 0으로 돌립니다.",
        "f-string의 {x:02d}는 2자리 0으로 채운 정수 형식입니다.",
      ],
      solutionCode: `class Clock:
    def __init__(self, h, m, s):
        self.h = h
        self.m = m
        self.s = s

    def tick(self):
        self.s += 1
        if self.s == 60:
            self.s = 0
            self.m += 1
            if self.m == 60:
                self.m = 0
                self.h += 1
                if self.h == 24:
                    self.h = 0

    def show(self):
        print(f'{self.h:02d}:{self.m:02d}:{self.s:02d}')

h, m, s = map(int, input().split())
n = int(input())
clock = Clock(h, m, s)
for _ in range(n):
    clock.tick()
clock.show()`,
      solutionExplanation: "시·분·초의 자리올림을 if 중첩으로 처리합니다. 객체의 상태(h, m, s)는 tick할 때마다 변하고, 마지막 show에서 한꺼번에 출력됩니다.",
      en: {
        title: "Clock Class",
        description: `Implement a Clock(h, m, s) class.
- tick(): advance 1 second. 60s = 1min, 60min = 1h, after 24h wraps to 0.
- show(): print "HH:MM:SS" (2 digits, zero-padded)

Input: h m s on first line, then number of ticks n. Print show() after all ticks.`,
        constraints: "0 ≤ h ≤ 23, 0 ≤ m, s ≤ 59, 1 ≤ n ≤ 100000",
        hints: [
          "self.s += 1, then if self.s == 60: self.s = 0; self.m += 1",
          "Do the same carry for minutes to hours.",
          "When h reaches 24, wrap back to 0.",
          "f-string {x:02d} zero-pads to 2 digits.",
        ],
        solutionExplanation: "Handle the second→minute→hour carry with nested ifs. Object state (h, m, s) updates each tick; show() prints all at once.",
      },
      language: "python",
    },
    {
      id: "pyoop-017",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "어려움",
      title: "분수 클래스",
      description: `Fraction(num, den) 클래스를 구현하세요. (num: 분자, den: 분모)
- add(other): 두 분수를 더하고, 결과를 약분해서 새 Fraction을 반환
- show(): "분자/분모" 형식 출력 (분모가 1이면 분자만 출력)

약분: 분자/분모의 최대공약수(GCD)로 나눕니다.
입력: 첫 줄에 a b (첫 분수), 둘째 줄에 c d (둘째 분수). a/b + c/d를 약분 후 출력.`,
      constraints: "1 ≤ a, c ≤ 100, 1 ≤ b, d ≤ 100",
      initialCode: `def gcd(x, y):
    while y:
        x, y = y, x % y
    return x

class Fraction:
    def __init__(self, num, den):
        self.num = num
        self.den = den

    def add(self, other):
        # self/d1 + other/d2 = (self.num*other.den + other.num*self.den) / (self.den*other.den)
        # 그 후 gcd로 약분해서 새 Fraction 반환
        pass

    def show(self):
        if self.den == 1:
            print(self.num)
        else:
            print(f'{self.num}/{self.den}')

a, b = map(int, input().split())
c, d = map(int, input().split())
f1 = Fraction(a, b)
f2 = Fraction(c, d)
result = f1.add(f2)
result.show()`,
      testCases: [
        { stdin: "1 2\n1 3", expectedOutput: "5/6", label: "1/2 + 1/3" },
        { stdin: "1 4\n1 4", expectedOutput: "1/2", label: "1/4 + 1/4 (약분)" },
        { stdin: "2 3\n1 3", expectedOutput: "1", label: "2/3 + 1/3 = 1" },
        { stdin: "3 8\n5 8", expectedOutput: "1", label: "3/8 + 5/8" },
      ],
      hints: [
        "통분: 새 분자 = self.num*other.den + other.num*self.den, 새 분모 = self.den*other.den",
        "약분: g = gcd(새 분자, 새 분모) 후 둘 다 g로 나눕니다.",
        "Fraction(new_num // g, new_den // g)를 return합니다.",
      ],
      solutionCode: `def gcd(x, y):
    while y:
        x, y = y, x % y
    return x

class Fraction:
    def __init__(self, num, den):
        self.num = num
        self.den = den

    def add(self, other):
        new_num = self.num * other.den + other.num * self.den
        new_den = self.den * other.den
        g = gcd(new_num, new_den)
        return Fraction(new_num // g, new_den // g)

    def show(self):
        if self.den == 1:
            print(self.num)
        else:
            print(f'{self.num}/{self.den}')

a, b = map(int, input().split())
c, d = map(int, input().split())
f1 = Fraction(a, b)
f2 = Fraction(c, d)
result = f1.add(f2)
result.show()`,
      solutionExplanation: "분수 덧셈은 통분(분모를 같게 만들기) 후 약분(GCD로 나누기)이 필요합니다. add 메서드는 새 Fraction 객체를 만들어 반환하므로 원본은 변하지 않습니다.",
      en: {
        title: "Fraction Class",
        description: `Implement a Fraction(num, den) class.
- add(other): add two fractions, simplify with GCD, return a new Fraction
- show(): print "num/den" (or just num if den is 1)

Input: a b (first fraction), then c d (second). Print a/b + c/d simplified.`,
        constraints: "1 ≤ a, c ≤ 100, 1 ≤ b, d ≤ 100",
        hints: [
          "Common denominator: new_num = self.num*other.den + other.num*self.den, new_den = self.den*other.den",
          "Simplify: g = gcd(new_num, new_den), divide both by g.",
          "Return Fraction(new_num // g, new_den // g).",
        ],
        solutionExplanation: "Fraction addition requires a common denominator then simplification via GCD. add() returns a new Fraction, leaving the originals unchanged.",
      },
      language: "python",
    },
    {
      id: "pyoop-018",
      cluster: "py-oop",
      unlockAfter: "42",
      difficulty: "어려움",
      title: "적금 통장 클래스",
      description: `Savings(monthly, rate) 클래스를 구현하세요.
- monthly: 매월 입금액, rate: 연 이율(%, 정수)
- deposit(): 1개월 입금 — 잔액에 monthly를 더하고, 그 잔액에 월이율(rate/12%)을 적용해 이자를 더함 (소수점 버림, 정수만 보관)
- balance(): 현재 잔액 출력

입력: 첫 줄에 monthly rate, 둘째 줄에 개월 수 n. n번 deposit 후 balance 출력`,
      constraints: "1000 ≤ monthly ≤ 1000000, 0 ≤ rate ≤ 12, 1 ≤ n ≤ 60",
      initialCode: `class Savings:
    def __init__(self, monthly, rate):
        self.monthly = monthly
        self.rate = rate  # 연이율 %
        self.bal = 0

    def deposit(self):
        # 1) 잔액에 monthly 더함
        # 2) 새 잔액에 월이율 적용: bal = bal + bal * rate / 12 / 100 (정수로 버림)
        pass

    def balance(self):
        print(self.bal)

monthly, rate = map(int, input().split())
n = int(input())
s = Savings(monthly, rate)
for _ in range(n):
    s.deposit()
s.balance()`,
      testCases: [
        { stdin: "10000 0\n3", expectedOutput: "30000", label: "이자 0%" },
        { stdin: "100000 12\n1", expectedOutput: "101000", label: "1개월 12%" },
        { stdin: "100000 12\n2", expectedOutput: "203010", label: "2개월 복리" },
        { stdin: "50000 6\n4", expectedOutput: "202511", label: "4개월 6%" },
      ],
      hints: [
        "deposit 안: self.bal += self.monthly",
        "그 후 self.bal = self.bal + self.bal * self.rate // 12 // 100",
        "또는 self.bal = self.bal * (1200 + self.rate) // 1200 처럼 한 번에. // 는 정수 나눗셈입니다.",
        "복리이므로 매월 새 잔액에 이자가 붙습니다.",
      ],
      solutionCode: `class Savings:
    def __init__(self, monthly, rate):
        self.monthly = monthly
        self.rate = rate
        self.bal = 0

    def deposit(self):
        self.bal += self.monthly
        self.bal = self.bal + self.bal * self.rate // 12 // 100

    def balance(self):
        print(self.bal)

monthly, rate = map(int, input().split())
n = int(input())
s = Savings(monthly, rate)
for _ in range(n):
    s.deposit()
s.balance()`,
      solutionExplanation: "객체 안에 bal(잔액)을 누적 상태로 보관합니다. 매월 입금 → 월이율(연이율/12) 적용 순서로 처리하며, 복리이기 때문에 매월 새 잔액에 이자가 붙어 점점 더 빨리 늘어납니다. // 는 소수점을 버리는 정수 나눗셈입니다.",
      en: {
        title: "Savings Account Class",
        description: `Implement a Savings(monthly, rate) class.
- monthly: monthly deposit, rate: annual interest rate (%, integer)
- deposit(): one month — add monthly to balance, then apply monthly rate (rate/12%) as interest (integer floor)
- balance(): print current balance

Input: monthly rate on first line, n months on second. Print balance after n deposits.`,
        constraints: "1000 ≤ monthly ≤ 1000000, 0 ≤ rate ≤ 12, 1 ≤ n ≤ 60",
        hints: [
          "Inside deposit: self.bal += self.monthly",
          "Then self.bal = self.bal + self.bal * self.rate // 12 // 100",
          "Or compactly: self.bal = self.bal * (1200 + self.rate) // 1200. // is integer division.",
          "Compound interest — each month's interest applies to the new balance.",
        ],
        solutionExplanation: "The object keeps bal as a running state. Each month: deposit then apply monthly rate. Compound interest means balance grows faster over time. // is floor division.",
      },
      language: "python",
    },
  ],
}
