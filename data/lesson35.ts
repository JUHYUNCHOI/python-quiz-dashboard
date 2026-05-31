// ============================================
// 레슨 35: 내장함수 총정리
// Part 5: 함수 - 내장함수
// ============================================

import { LessonData } from './types'

export const lesson35Data: LessonData = {
  id: "35",
  title: "내장함수 총정리",
  emoji: "📚",
  description: "Python Level 2에 나오는 내장함수를 정리해요!",
  chapters: [
    // ============================================
    // Chapter 1: len(), sum()
    // ============================================
    {
      id: "ch1",
      title: "len()과 sum()",
      emoji: "📏",
      steps: [
        {
          id: "ch1-1",
          type: "explain",
          title: "💭 파이썬이 미리 만들어 둔 함수가 있다고?",
          content: `💭 직접 함수를 다 만들지 않아도 돼! 파이썬이 **자주 쓰는 함수**를 미리 만들어 놨어. 이걸 **내장함수**라고 해.

이번 시간엔 시험에 자주 나오는 **5가지**만 골라서 마스터해요!

1. \`len()\` — **길이** 재기 📏
2. \`sum()\` — **합계** 구하기 ➕
3. \`max()\`, \`min()\` — **최대/최소** 🔝
4. \`sorted()\` — **정렬** 📊
5. \`map()\` — **변환** 🔄

@핵심: 내장함수 = 파이썬이 **미리 만들어 둔** 함수! \`len()\`, \`sum()\` 처럼 그냥 부르기만 하면 돼.`
        },
        {
          id: "ch1-2",
          type: "tryit",
          title: "len() - 길이",
          task: "len()으로 다양한 길이를 확인해보세요",
          initialCode: `print(len([1, 2, 3]))       # 리스트 길이
print(len('Hello'))         # 문자열 길이
print(len({'a': 1, 'b': 2}))  # 딕셔너리 키 개수`,
          expectedOutput: "3\n5\n2",
          hint: "리스트 3개, 문자 5개, 키 2개"
        },
        {
          id: "ch1-3",
          type: "tryit",
          title: "sum() - 합계",
          task: "sum()으로 합계를 구해보세요",
          initialCode: `print(sum([1, 2, 3, 4, 5]))   # 기본
print(sum([10, 20, 30]))      # 기본

# 시작값 지정
print(sum([1, 2, 3], 10))     # 10부터 시작해서 더함`,
          expectedOutput: "15\n60\n16",
          hint: "세 번째는 10 + 1 + 2 + 3 = 16"
        },
        {
          id: "ch1-4",
          type: "quiz",
          title: "sum() 이해하기",
          content: `다음 코드의 출력 결과는?
\`\`\`python
print(sum([1, 2, 3, 4, 5]))
\`\`\``,
          options: [
            "12345",
            "15",
            "[1, 2, 3, 4, 5]",
            "에러 발생"
          ],
          answer: 1,
          explanation: "sum()은 리스트의 모든 숫자를 더해요. 1+2+3+4+5 = 15"
        },
        {
          id: "ch1-5",
          type: "mission",
          title: "평균 구하기",
          task: "리스트의 평균을 출력해보세요! 합 ÷ 개수.",
          initialCode: `숫자들 = [80, 90, 70, 85, 95]

# 1) 합 구하기 (어떤 내장함수?)
합 = ___
# 2) 개수 구하기 (어떤 내장함수?)
개수 = ___
# 3) 평균 출력
print(f'평균: {___}')`,
          expectedOutput: "평균: 84.0",
          hint: "합 → 모두 더하는 함수. 개수 → 길이 재는 함수.",
          hint2: "합 = sum(숫자들), 개수 = len(숫자들), 평균 = 합/개수"
        }
      ]
    },
    // ============================================
    // Chapter 2: max(), min()
    // ============================================
    {
      id: "ch2",
      title: "max()와 min()",
      emoji: "🔝",
      steps: [
        {
          id: "ch2-1",
          type: "tryit",
          title: "max(), min() 기본",
          task: "최대값과 최소값을 구해보세요",
          initialCode: `print(max([3, 7, 1, 9]))    # 리스트에서 최대
print(min([3, 7, 1, 9]))    # 리스트에서 최소

# 여러 인자로도 가능
print(max(3, 7, 1, 9))      # 여러 값 중 최대
print(min(3, 7, 1, 9))      # 여러 값 중 최소`,
          expectedOutput: "9\n1\n9\n1",
          hint: "9가 가장 크고, 1이 가장 작아요"
        },
        {
          id: "ch2-2",
          type: "quiz",
          title: "max() 이해하기",
          content: `다음 코드의 출력 결과는?
\`\`\`python
print(max([3, 7, 1, 9, 2]))
\`\`\``,
          options: [
            "1",
            "3",
            "7",
            "9"
          ],
          answer: 3,
          explanation: "max()는 가장 큰 값을 반환해요. 9가 최대!"
        },
        {
          id: "ch2-3",
          type: "mission",
          title: "점수 분석",
          task: "점수 데이터를 분석해보세요! 최고, 최저, 합, 개수, 평균을 출력하세요.",
          initialCode: `점수 = [85, 92, 78, 95, 88]

최고 = ___(점수)
최저 = ___(점수)
합 = ___(점수)
개수 = ___(점수)
평균 = ___ / ___

print(f'최고: {최고}')
print(f'최저: {최저}')
print(f'평균: {평균}')`,
          expectedOutput: "최고: 95\n최저: 78\n평균: 87.6",
          hint: "각 빈칸에 어울리는 내장함수를 떠올려봐. 4 가지 (최대, 최소, 합, 개수) + 평균식 1 개.",
          hint2: "max, min, sum, len. 평균 = 합 / 개수."
        }
      ]
    },
    // ============================================
    // Chapter 3: sorted()
    // ============================================
    {
      id: "ch3",
      title: "sorted() - 정렬",
      emoji: "📊",
      steps: [
        {
          id: "ch3-1",
          type: "tryit",
          title: "기본 정렬",
          task: "오름차순과 내림차순 정렬을 해보세요",
          initialCode: `숫자 = [3, 1, 4, 1, 5, 9]

print(sorted(숫자))                    # 오름차순
print(sorted(숫자, reverse=True))     # 내림차순`,
          expectedOutput: "[1, 1, 3, 4, 5, 9]\n[9, 5, 4, 3, 1, 1]",
          hint: "reverse=True는 내림차순"
        },
        {
          id: "ch3-2",
          type: "quiz",
          title: "sorted() 내림차순",
          content: `다음 코드의 출력 결과는?
\`\`\`python
print(sorted([3, 1, 4, 1, 5], reverse=True))
\`\`\``,
          options: [
            "[1, 1, 3, 4, 5]",
            "[5, 4, 3, 1, 1]",
            "[1, 1, 4, 3, 5]",
            "에러 발생"
          ],
          answer: 1,
          explanation: "reverse=True는 내림차순! 5, 4, 3, 1, 1 순서로 정렬돼요."
        },
        {
          id: "ch3-3",
          type: "explain",
          title: "💭 알파벳 말고, 길이 순으로 정렬하려면?",
          content: `💭 단어 리스트를 그냥 \`sorted()\` 하면 **알파벳 순**이야. 그런데 **길이 순**으로 정렬하려면 어떻게?

\`\`\`python
단어 = ['apple', 'pie', 'banana']

# 길이 기준 정렬!
print(sorted(단어, key=len))
# ['pie', 'apple', 'banana']
\`\`\`

각 단어의 길이: apple=5, pie=3, banana=6
길이 순서로 정렬: 3, 5, 6 → pie, apple, banana

@핵심: \`key=함수\`로 **정렬 기준**을 정할 수 있어! \`key=len\` 이면 길이 순.`
        },
        {
          id: "ch3-4",
          type: "tryit",
          title: "튜플 리스트 정렬",
          task: "점수 기준으로 정렬해보세요",
          initialCode: `학생 = [('철수', 85), ('영희', 92), ('민수', 78)]

# 점수(두 번째 요소) 기준 정렬
print(sorted(학생, key=lambda x: x[1]))`,
          expectedOutput: "[('민수', 78), ('철수', 85), ('영희', 92)]",
          hint: "x[1]은 점수! 78, 85, 92 순서로 정렬"
        },
        {
          id: "ch3-5",
          type: "mission",
          title: "1등 찾기",
          task: "점수 가장 높은 학생의 이름을 출력하세요",
          initialCode: `학생 = [('철수', 85), ('영희', 92), ('민수', 78)]

# 점수 내림차순 정렬 (key 와 reverse 채우기!)
결과 = sorted(학생, key=___, reverse=___)

# 1등의 이름 출력
print(___)`,
          expectedOutput: "영희",
          hint: "key = 점수(두 번째 요소)를 꺼내는 람다. 1 등 = 결과의 0 번째 → 이름은 0 번째의 0 번째.",
          hint2: "key=lambda x: x[1], reverse=True. print(결과[0][0])"
        }
      ]
    },
    // ============================================
    // Chapter 4: map()
    // ============================================
    {
      id: "ch4",
      title: "map() - 변환",
      emoji: "🔄",
      steps: [
        {
          id: "ch4-0",
          type: "interactive",
          title: "🏭 map() 공장 체험!",
          description: "map()이 어떻게 작동하는지 눈으로 확인해보세요!",
          component: "mapFactory"
        },
        {
          id: "ch4-1",
          type: "explain",
          title: "💭 리스트의 모든 값을 한꺼번에 바꿀 수 없을까?",
          content: `💭 \`['1', '2', '3']\` 처럼 문자열이 든 리스트를 **정수 리스트**로 바꾸려면? 하나씩 변환하는 건 너무 번거로워!

\`\`\`
['1', '2', '3']  ── map(int, ...) ──→  [1, 2, 3]
   문자열              한 번에 변환!      정수
\`\`\`

**기본 사용:**
\`\`\`python
# 문자열 숫자를 정수로
문자들 = ['1', '2', '3']
숫자들 = list(map(int, 문자들))
print(숫자들)  # [1, 2, 3]
\`\`\`

🚨 **주의!** \`map()\`은 map 객체를 돌려줘요! **\`list()\`로 감싸야** 리스트가 돼요.

@핵심: \`map(함수, 리스트)\` = 리스트의 **모든 값**에 함수를 적용! \`list()\`로 감싸기 잊지 말기.`
        },
        {
          id: "ch4-2",
          type: "tryit",
          title: "map() 기본",
          task: "문자열을 정수로 변환해보세요",
          initialCode: `문자들 = ['1', '2', '3']
숫자들 = list(map(int, 문자들))
print(숫자들)`,
          expectedOutput: "[1, 2, 3]",
          hint: "map(int, ...)는 모든 요소를 int로 변환"
        },
        {
          id: "ch4-3",
          type: "quiz",
          title: "map() 이해하기",
          content: `다음 코드의 출력 결과는?
\`\`\`python
숫자 = ['3', '1', '4']
결과 = list(map(int, 숫자))
print(sum(결과))
\`\`\``,
          options: [
            "'314'",
            "8",
            "[3, 1, 4]",
            "에러 발생"
          ],
          answer: 1,
          explanation: "['3','1','4'] → [3,1,4] → 합계 = 3+1+4 = 8"
        },
        {
          id: "ch4-4",
          type: "explain",
          title: "💭 한 줄에 여러 숫자를 받으려면?",
          content: `💭 사용자가 \`10 20 30\` 처럼 **한 줄에 여러 숫자**를 입력하면, 그걸 어떻게 받아 정수로 만들지?

\`\`\`python
# 한 줄에 여러 숫자 입력받기 (각각 변수로)
a, b, c = map(int, input().split())

# 리스트로 받기
숫자들 = list(map(int, input().split()))
\`\`\`

**동작 순서:**
1. \`input()\` = "10 20 30" (문자열)
2. \`.split()\` = ['10', '20', '30'] (문자 리스트)
3. \`map(int, ...)\` = 각 문자를 int로 변환

💡 이 패턴은 Level 2 시험에 **거의 매번** 나와요!

@핵심: \`map(int, input().split())\` — 한 줄에 여러 숫자 입력받는 마법의 한 줄!`
        },
        {
          id: "ch4-5",
          type: "mission",
          title: "문자열을 숫자로 변환 후 합계",
          task: "문자열 점수 리스트를 모두 정수로 변환한 뒤 합을 출력!",
          initialCode: `문자열_숫자 = ['10', '20', '30', '40']

# 1. 모두 정수로 변환 (리스트로!)
숫자들 = list(___(___, 문자열_숫자))

# 2. 합계 출력
print(___(숫자들))`,
          expectedOutput: "100",
          hint: "변환 함수 = 모든 원소에 적용. 합계 함수 = 모두 더하기.",
          hint2: "list(map(int, 문자열_숫자)), 그리고 sum(숫자들)"
        }
      ]
    },
    // ============================================
    // Chapter 5: 기타 유용한 함수들
    // ============================================
    {
      id: "ch5",
      title: "기타 유용한 함수들",
      emoji: "🧰",
      steps: [
        {
          id: "ch5-1",
          type: "tryit",
          title: "abs(), round()",
          task: "절대값과 반올림을 해보세요",
          initialCode: `# abs() - 절대값
print(abs(-5))
print(abs(5))

# round() - 반올림
print(round(3.7))
print(round(3.14159, 2))  # 소수점 2자리`,
          expectedOutput: "5\n5\n4\n3.14",
          hint: "abs()는 절대값, round()는 반올림"
        },
        {
          id: "ch5-2",
          type: "tryit",
          title: "filter() - 필터링",
          task: "조건에 맞는 요소만 걸러보세요",
          initialCode: `숫자 = [1, -2, 3, -4, 5]

# 양수만 필터
양수 = list(filter(lambda x: x > 0, 숫자))
print(양수)`,
          expectedOutput: "[1, 3, 5]",
          hint: "x > 0인 것만 남아요"
        },
        {
          id: "ch5-3",
          type: "quiz",
          title: "filter() 이해하기",
          content: `다음 코드의 출력 결과는?
\`\`\`python
숫자 = [1, -2, 3, -4, 5]
결과 = list(filter(lambda x: x > 0, 숫자))
print(sum(결과))
\`\`\``,
          options: [
            "3",
            "9",
            "-2",
            "15"
          ],
          answer: 1,
          explanation: "양수만 필터: [1, 3, 5] → 1+3+5 = 9"
        },
        {
          id: "ch5-4",
          type: "tryit",
          title: "enumerate() - 번호와 값",
          task: "인덱스와 값을 함께 출력해보세요",
          initialCode: `과일 = ['사과', '바나나', '체리']

for i, f in enumerate(과일):
    print(f'{i}: {f}')`,
          expectedOutput: "0: 사과\n1: 바나나\n2: 체리",
          hint: "enumerate()는 인덱스와 값을 함께 줘요"
        },
        {
          id: "ch5-5",
          type: "tryit",
          title: "zip() - 묶기",
          task: "두 리스트를 하나로 묶어보세요",
          initialCode: `이름 = ['철수', '영희']
점수 = [85, 92]

결과 = list(zip(이름, 점수))
print(결과)`,
          expectedOutput: "[('철수', 85), ('영희', 92)]",
          hint: "zip()은 여러 리스트를 튜플로 묶어요"
        }
      ]
    }
  ]
}
