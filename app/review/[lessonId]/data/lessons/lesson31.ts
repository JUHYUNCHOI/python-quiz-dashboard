import { LessonData } from '../types';

export const lesson31: LessonData = {
  id: "31",
  title: "종합 문제 복습",
  description: "기초부터 자료구조까지 종합 도전!",
  steps: [
    // ==================== CHAPTER 1: 기초 문제 복습 ====================
    {
      type: "chapter",
      content: {
        num: 1,
        title: "기초 문제 복습",
        desc: "연산자/조건문/반복문/문자열 — 한 번 더!"
      }
    },
    {
      type: "quiz",
      content: {
        question: "10 // 3 의 결과는?",
        options: ["3", "3.33", "1", "3.0"],
        answer: 0,
        explanation: "// 는 몫(정수 나눗셈)! 10을 3으로 나눈 몫은 3."
      }
    },
    {
      type: "quiz",
      content: {
        question: "10 % 3 의 결과는?",
        options: ["3", "1", "0", "3.33"],
        answer: 1,
        explanation: "% 는 나머지! 10 = 3*3 + 1 → 나머지 1."
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `x = '파이썬'
print(x * 3)`,
        predict: {
          options: ["에러", "파이썬3", "파이썬파이썬파이썬", "9"],
          answer: 2,
          feedback: "문자열 * 정수 = 그만큼 반복! '파이썬' * 3 = '파이썬파이썬파이썬'."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 1,
        task: "1부터 10까지의 합을 출력하세요",
        guide: "for + range + 누적!",
        hint: "total += i",
        template: `total = 0
for i in range(1, ___):
    total += i
print(total)`,
        answer: "11",
        expect: "55"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 if/elif 복습!",
        task: "x가 20보다 크면 'A', 10보다 크면 'B', 그 외 'C'",
        template: `x = 15
if x > 20:
    print('A')
___ x > 10:
    print('B')
else:
    print('C')`,
        answer: "elif",
        expect: "B"
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "1~20 사이 짝수의 합을 출력하세요",
        guide: "% 2 == 0 으로 짝수!",
        hint: "if i % 2 == 0: total += i",
        template: `total = 0
for i in range(1, 21):
    if i ___ 2 == 0:
        total += i
print(total)`,
        answer: "%",
        expect: "110"
      }
    },
    {
      type: "quiz",
      content: {
        question: "text = 'Hello World' 일 때 text[0:5] 는?",
        options: ["'Hello'", "'Hello '", "'Hello World'", "'H'"],
        answer: 0,
        explanation: "[0:5] 는 인덱스 0~4 (끝값 미포함) → 'Hello'!"
      }
    },
    {
      type: "summary",
      content: {
        num: 1,
        title: "기초 복습 완료",
        learned: [
          "// 몫, % 나머지",
          "문자열 * 정수 = 반복",
          "for/range + 누적, if/elif/else",
          "[start:end] 슬라이싱"
        ],
        canDo: "기초 문법을 자유롭게 쓸 수 있어!",
        emoji: "⭐"
      }
    },

    // ==================== CHAPTER 2: 자료구조 복습 ====================
    {
      type: "chapter",
      content: {
        num: 2,
        title: "자료구조 복습",
        desc: "리스트, 딕셔너리, 집합, 슬라이싱!"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `fruits = ['사과', '바나나', '체리']
fruits.append('포도')
print(len(fruits))`,
        predict: {
          options: ["3", "4", "5", "에러"],
          answer: 1,
          feedback: "append 로 1개 추가 → 4개!"
        }
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `s = {1, 2, 3, 2, 1}
print(len(s))`,
        predict: {
          options: ["5", "3", "2", "에러"],
          answer: 1,
          feedback: "set 은 중복을 제거! {1, 2, 3} → 3개."
        }
      }
    },
    {
      type: "quiz",
      content: {
        question: "d = {'a': 1, 'b': 2} 일 때 list(d.keys()) 는?",
        options: ["[1, 2]", "['a', 'b']", "['a':1, 'b':2]", "에러"],
        answer: 1,
        explanation: ".keys() 는 키만! 값은 .values(), 키-값 쌍은 .items()."
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "리스트의 중복을 제거하고 정렬해서 출력하세요",
        guide: "set 으로 중복 제거 → sorted!",
        hint: "sorted(set(nums))",
        template: `nums = [3, 1, 4, 1, 5, 3]
print(sorted(___(nums)))`,
        answer: "set",
        expect: "[1, 3, 4, 5]"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["🚨 함정 주의! 결과를 예측해봐!"],
        code: `a = [1, 2, 3]
b = a
b.append(4)
print(a)`,
        predict: {
          options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "에러"],
          answer: 1,
          feedback: "b = a 는 *같은 리스트*에 이름표만 하나 더! 진짜 복사는 b = a.copy() 또는 b = a[:]."
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 2,
        task: "'banana' 에서 글자별 등장 횟수를 딕셔너리로 만들어 'a' 의 개수를 출력하세요",
        guide: "있으면 +1, 없으면 1로 시작!",
        hint: "if ch in counter: counter[ch] += 1; else: counter[ch] = 1",
        template: `text = 'banana'
counter = {}
for ch in text:
    if ch in counter:
        counter[ch] += 1
    else:
        counter[ch] = ___
print(counter['a'])`,
        answer: "1",
        expect: "3"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 슬라이싱 복습!",
        task: "리스트를 뒤집어서 출력하세요",
        template: "nums = [1, 2, 3, 4, 5]\nprint(nums[::___])",
        answer: "-1",
        expect: "[5, 4, 3, 2, 1]"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제는?",
        code: `nums = [10, 20, 30]
print(nums[5])`,
        options: [
          "인덱스가 범위 밖 → IndexError",
          "리스트 문법 오류",
          "print 사용 방법이 잘못됨",
          "문제 없음"
        ],
        answer: 0,
        explanation: "리스트 길이는 3 (인덱스 0~2). nums[5] 는 없는 칸을 가리켜 IndexError!"
      }
    },
    {
      type: "summary",
      content: {
        num: 2,
        title: "자료구조 정리",
        learned: [
          "리스트 append/len/슬라이싱",
          "set 으로 중복 제거",
          "dict 키/값 접근, 빈도수 세기",
          "b = a 는 복사 아님 — 같은 리스트!"
        ],
        canDo: "자료구조들을 자유롭게 다룰 수 있어!",
        emoji: "📚"
      }
    },

    // ==================== CHAPTER 3: 종합 응용 ====================
    {
      type: "chapter",
      content: {
        num: 3,
        title: "종합 응용",
        desc: "여러 개념을 한 번에 — 진짜 도전!"
      }
    },
    {
      type: "interleaving",
      content: {
        message: "🔄 for + range 복습!",
        task: "range로 5,4,3,2,1 을 출력 (역순)",
        template: `for i in range(5, 0, ___):
    print(i)`,
        answer: "-1",
        expect: "5\n4\n3\n2\n1"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["피보나치 수열 만들기!"],
        code: `fib = [0, 1]
for i in range(8):
    fib.append(fib[-1] + fib[-2])
print(fib)`,
        result: "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
        note: "현재 = 이전 + 그 이전! fib[-1] 은 마지막, fib[-2] 는 끝에서 두 번째."
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "2~20 사이 소수만 출력하세요 (n을 2부터 n-1까지 나눠봐서 모두 안 나누어 떨어지면 소수)",
        guide: "is_prime 플래그 사용!",
        hint: "for i in range(2, n): if n % i == 0: is_prime = False; break",
        template: `for n in range(2, 21):
    is_prime = True
    for i in range(2, n):
        if n % i == 0:
            is_prime = ___
            break
    if is_prime:
        print(n, end=' ')`,
        answer: "False",
        expect: "2 3 5 7 11 13 17 19 "
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `data = [1, 3, 2, 3, 4, 3, 2, 1, 3]
counter = {}
for n in data:
    if n in counter:
        counter[n] += 1
    else:
        counter[n] = 1
print(counter[3])`,
        predict: {
          question: "3이 몇 번 등장?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          feedback: "data 안에서 3은 4번 등장!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "리스트의 최빈값(가장 많이 등장한 값)을 출력하세요",
        guide: "딕셔너리로 세고 max(counter, key=counter.get) 으로 최빈값!",
        hint: "딕셔너리 만들고 → max로 가장 큰 값을 가진 키 찾기",
        template: null,
        answer: `data = [1, 3, 2, 3, 4, 3, 2, 1, 3]
counter = {}
for n in data:
    if n in counter:
        counter[n] += 1
    else:
        counter[n] = 1

max_count = 0
mode = 0
for num, count in counter.items():
    if count > max_count:
        max_count = count
        mode = num
print(mode)`,
        alternateAnswers: [
          `data = [1, 3, 2, 3, 4, 3, 2, 1, 3]
counter = {}
for n in data:
    counter[n] = counter.get(n, 0) + 1
max_count = 0
mode = 0
for num, count in counter.items():
    if count > max_count:
        max_count = count
        mode = num
print(mode)`
        ],
        expect: "3"
      }
    },
    {
      type: "quiz",
      content: {
        question: "a = {1,2,3}, b = {2,3,4} 일 때 a & b 는?",
        options: ["{1, 2, 3, 4}", "{2, 3}", "{1, 4}", "{}"],
        answer: 1,
        explanation: "& 는 교집합! 공통 원소 {2, 3}. (|는 합집합, -는 차집합)"
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "두 리스트의 공통 원소 개수를 출력하세요",
        guide: "set 으로 변환 후 교집합!",
        hint: "len(set(a) & set(b))",
        template: `a = [1, 2, 3, 4, 5]
b = [3, 4, 5, 6, 7]
common = set(a) ___ set(b)
print(len(common))`,
        answer: "&",
        expect: "3"
      }
    },
    {
      type: "explain",
      content: {
        lines: ["결과를 예측해봐!"],
        code: `purchases = [
    {'item': '사과', 'amount': 1500},
    {'item': '바나나', 'amount': 2000},
    {'item': '사과', 'amount': 1500},
]
totals = {}
for p in purchases:
    item = p['item']
    if item in totals:
        totals[item] += p['amount']
    else:
        totals[item] = p['amount']
print(totals['사과'])`,
        predict: {
          question: "사과의 누적 금액은?",
          options: ["1500", "3000", "2000", "5000"],
          answer: 1,
          feedback: "사과 1500 + 1500 = 3000!"
        }
      }
    },
    {
      type: "practice",
      content: {
        level: 3,
        task: "쇼핑 데이터에서 바나나의 총 구매 금액을 출력하세요",
        guide: "for문으로 바나나만 골라 누적!",
        hint: "if p['item'] == '바나나': total += p['amount']",
        template: `purchases = [
    {'item': '사과', 'amount': 1500},
    {'item': '바나나', 'amount': 2000},
    {'item': '바나나', 'amount': 2000},
    {'item': '사과', 'amount': 1500},
    {'item': '바나나', 'amount': 2000},
]
total = 0
for p in purchases:
    if p['item'] ___ '바나나':
        total += p['amount']
print(total)`,
        answer: "==",
        expect: "6000"
      }
    },
    {
      type: "errorQuiz",
      content: {
        question: "이 코드의 문제는?",
        code: `info = {'name': '철수'}
print(info['age'])`,
        options: [
          "존재하지 않는 키 접근 → KeyError",
          "딕셔너리 문법 오류",
          "print 사용 방법이 잘못됨",
          "문제 없음"
        ],
        answer: 0,
        explanation: "딕셔너리에 없는 키 접근은 KeyError! info.get('age', 0) 로 안전하게."
      }
    },
    {
      type: "reward",
      content: {
        emoji: "🏆",
        message: "Part 4 종합 마스터!"
      }
    },
    {
      type: "summary",
      content: {
        num: 3,
        title: "종합 정리",
        learned: [
          "기초 연산자/조건/반복/문자열",
          "리스트/딕셔너리/집합/슬라이싱",
          "빈도수, 최빈값, 누적 패턴",
          "set 연산(교집합/합집합)으로 공통/차이",
          "함정: b = a 는 복사 아님"
        ],
        canDo: "Part 4 까지 배운 모든 개념을 자유롭게 써!",
        emoji: "🎓"
      }
    },

    { type: "done", content: {} }
  ]
};
