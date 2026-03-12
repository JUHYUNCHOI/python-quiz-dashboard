// ============================================
// 수도코드 레슨 16: 이진 검색 (Binary Search)
// CIE 스타일 수도코드 - 정렬된 배열에서 반씩 나눠 찾기
// ============================================

import { LessonData } from '../types'

export const pseudoLesson16Data: LessonData = {
  id: "pseudo-16",
  title: "이진 검색",
  emoji: "🎯",
  description: "반씩 나눠서 빠르게 찾자!",
  chapters: [
    {
      id: "ch1",
      title: "이진 검색 개념",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎯 이진 검색이 뭐예요?",
          content: `사전에서 "호랑이"라는 단어를 찾는다고 상상해 봐요.

첫 페이지부터 한 장씩 넘기나요? 아니죠!

**중간쯤 펴서** 확인하고, "호"가 더 뒤에 있으면 **뒷부분만** 찾아봐요.

이것이 바로 **이진 검색(Binary Search)**이에요!

\`\`\`
정렬된 배열: [2, 5, 8, 12, 16, 23, 38]
찾는 값: 23

1단계: 중간값 = 12 → 23 > 12, 오른쪽으로!
2단계: 중간값 = 23 → 찾았어요! ✓
\`\`\`

매번 검색 범위를 **반으로 줄이기** 때문에 매우 빨라요!

**중요:** 이진 검색은 배열이 **반드시 정렬**되어 있어야 해요!`
        },
        {
          id: "ch1-how",
          type: "explain",
          title: "📋 이진 검색의 과정",
          content: `이진 검색은 이렇게 동작해요:

**1단계:** low = 첫 번째, high = 마지막 위치로 설정
**2단계:** mid = (low + high) DIV 2 (중간 위치 계산)
**3단계:** arr[mid]와 target 비교:
  - **같으면** → 찾았다! mid 반환
  - **target이 더 크면** → low = mid + 1 (오른쪽 반)
  - **target이 더 작으면** → high = mid - 1 (왼쪽 반)
**4단계:** low > high가 되면 → 없다! -1 반환

예시:
\`\`\`
배열: [3, 7, 11, 15, 20, 25, 30]
찾는 값: 7

low=1, high=7, mid=4 → arr[4]=15
  7 < 15 → high = 3

low=1, high=3, mid=2 → arr[2]=7
  7 = 7 → 찾았어요! (2번째 위치)
\`\`\`

단 **2번** 만에 찾았어요! 선형 검색이면 2번이지만, 큰 배열일수록 차이가 커져요.`
        },
        {
          id: "ch1-div",
          type: "explain",
          title: "🔢 DIV란?",
          content: `이진 검색에서 중간 위치를 구할 때 **DIV**를 사용해요.

**DIV**는 나눗셈의 **몫만** 구하는 연산이에요 (소수점 버림).

\`\`\`
7 DIV 2 = 3  (7 ÷ 2 = 3.5 → 3)
10 DIV 3 = 3 (10 ÷ 3 = 3.33 → 3)
9 DIV 2 = 4  (9 ÷ 2 = 4.5 → 4)
\`\`\`

왜 DIV를 쓸까요?

인덱스는 **정수**여야 해요! arr[3.5]는 안 되잖아요.

\`\`\`
mid ← (low + high) DIV 2
\`\`\`

예: low=1, high=7이면
→ mid = (1 + 7) DIV 2 = 8 DIV 2 = **4**

예: low=1, high=6이면
→ mid = (1 + 6) DIV 2 = 7 DIV 2 = **3**`
        },
      ]
    },
    {
      id: "ch2",
      title: "이진 검색 수도코드",
      emoji: "💻",
      steps: [
        {
          id: "ch2-code",
          type: "explain",
          title: "💻 이진 검색 수도코드",
          content: `CIE 수도코드로 이진 검색을 작성해 봐요!

\`\`\`
FUNCTION BinarySearch(arr, target) RETURNS INTEGER
    low ← 1
    high ← LENGTH(arr)
    WHILE low <= high
        mid ← (low + high) DIV 2
        IF arr[mid] = target THEN
            RETURN mid
        ELSE IF arr[mid] < target THEN
            low ← mid + 1
        ELSE
            high ← mid - 1
        ENDIF
    ENDWHILE
    RETURN -1
ENDFUNCTION
\`\`\`

핵심 포인트:
- **low, high**: 검색 범위의 시작과 끝
- **mid**: 중간 위치 (DIV로 정수 나눗셈)
- **WHILE low <= high**: 검색 범위가 남아있는 동안 반복
- **arr[mid] < target**: 찾는 값이 더 크면 **오른쪽 반**으로
- **ELSE**: 찾는 값이 더 작으면 **왼쪽 반**으로`
        },
        {
          id: "ch2-trace",
          type: "explain",
          title: "📊 코드 추적해보기",
          content: `구체적인 예시로 코드를 추적해 봐요!

\`\`\`
배열: [3, 7, 11, 15, 20, 25, 30]
BinarySearch(arr, 25)
\`\`\`

**1회차:**
- low=1, high=7
- mid = (1+7) DIV 2 = **4**
- arr[4] = 15, 15 < 25 → low = 4 + 1 = **5**

**2회차:**
- low=5, high=7
- mid = (5+7) DIV 2 = **6**
- arr[6] = 25, 25 = 25 → **찾았다! RETURN 6**

7개의 원소에서 단 **2번** 만에 찾았어요!

선형 검색이었다면? 6번 비교해야 했을 거예요.`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '이진 검색에서 중간 위치를 계산하는 코드를 완성하세요.',
          code: 'mid ← (low + high) ___ 2',
          fillBlanks: [
            { id: 1, answer: "DIV", options: ["DIV", "MOD", "/", "*"] }
          ]
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 코드를 추적해봐요!",
          content: `다음 이진 검색을 실행하면 result의 값은?

\`\`\`
배열: [2, 5, 8, 12, 16, 23, 38]
result ← BinarySearch(arr, 16)
\`\`\`

추적:
- low=1, high=7, mid=4 → arr[4]=12
  12 < 16 → low = 5
- low=5, high=7, mid=6 → arr[6]=23
  23 > 16 → high = 5
- low=5, high=5, mid=5 → arr[5]=16
  16 = 16 → ???`,
          options: [
            '5',
            '16',
            '6',
            '4'
          ],
          answer: 0,
          explanation: '3번의 비교 후 arr[5]=16에서 target=16을 찾았어요! **RETURN 5**가 실행되어 result에는 **5**가 저장돼요.'
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 못 찾으면 어떻게 될까?",
          content: `다음 이진 검색을 실행하면 result의 값은?

\`\`\`
배열: [10, 20, 30, 40, 50]
result ← BinarySearch(arr, 35)
\`\`\`

추적:
- low=1, high=5, mid=3 → arr[3]=30
  30 < 35 → low = 4
- low=4, high=5, mid=4 → arr[4]=40
  40 > 35 → high = 3
- low=4, high=3 → low > high! 반복 끝!`,
          options: [
            '-1',
            '0',
            '3',
            '4'
          ],
          answer: 0,
          explanation: 'low(4) > high(3)이 되어 WHILE 반복이 끝나요. 35는 배열에 없으므로 **RETURN -1**이 실행돼요!'
        }
      ]
    },
    {
      id: "ch3",
      title: "선형 vs 이진 비교",
      emoji: "⚖️",
      steps: [
        {
          id: "ch3-compare",
          type: "explain",
          title: "⚖️ 선형 검색 vs 이진 검색",
          content: `두 검색 방법을 비교해 볼까요?

| 특징 | 선형 검색 | 이진 검색 |
|---|---|---|
| 방법 | 처음부터 하나씩 | 반씩 나눠서 |
| 정렬 필요? | 아니요 | **반드시 정렬** |
| 속도 | 느림 | 빠름 |
| 최악의 경우 | n번 비교 | log2(n)번 비교 |

원소가 **1000개**일 때:
- 선형 검색: 최대 **1000번** 비교
- 이진 검색: 최대 **10번** 비교!

원소가 **100만 개**일 때:
- 선형 검색: 최대 **1,000,000번** 비교
- 이진 검색: 최대 **20번** 비교!

엄청난 차이죠? 하지만 이진 검색은 **정렬이 필수**라는 조건이 있어요!`
        },
        {
          id: "ch3-when",
          type: "explain",
          title: "🤔 언제 어떤 걸 쓸까?",
          content: `**선형 검색을 쓸 때:**
- 배열이 **정렬되어 있지 않을 때**
- 배열의 크기가 **작을 때**
- 데이터가 자주 바뀌어서 정렬 유지가 어려울 때

**이진 검색을 쓸 때:**
- 배열이 **이미 정렬**되어 있을 때
- 배열의 크기가 **클 때**
- 같은 배열에서 **여러 번** 검색할 때

기억하세요:
\`\`\`
정렬 안 된 배열 → 선형 검색만 가능!
정렬 된 배열   → 이진 검색이 훨씬 빠름!
\`\`\``
        },
        {
          id: "ch3-quiz1",
          type: "quiz",
          title: "🧠 어떤 검색을 써야 할까?",
          content: '정렬되지 않은 배열 [9, 2, 7, 4, 1]에서 값을 찾으려면 어떤 검색을 사용해야 할까요?',
          options: [
            '선형 검색',
            '이진 검색',
            '둘 다 사용 가능',
            '둘 다 사용 불가'
          ],
          answer: 0,
          explanation: '이진 검색은 **정렬된 배열에서만** 사용할 수 있어요. 정렬되지 않은 배열에서는 **선형 검색**을 사용해야 해요!'
        },
        {
          id: "ch3-fill2",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '이진 검색에서 찾는 값이 중간값보다 클 때, 검색 범위를 오른쪽 반으로 좁히는 코드를 완성하세요.',
          code: 'IF arr[mid] < target THEN\n    ___ ← mid + 1',
          fillBlanks: [
            { id: 1, answer: "low", options: ["low", "high", "mid", "target"] }
          ]
        },
        {
          id: "ch3-quiz2",
          type: "quiz",
          title: "🧠 최종 확인!",
          content: '원소가 1024개인 정렬된 배열에서 이진 검색을 사용하면 최대 몇 번 비교해야 할까요? (힌트: 2^10 = 1024)',
          options: [
            '10번',
            '1024번',
            '512번',
            '100번'
          ],
          answer: 0,
          explanation: '이진 검색은 매번 반으로 줄이므로 최대 **log2(1024) = 10번**만 비교하면 돼요. 1024 → 512 → 256 → 128 → 64 → 32 → 16 → 8 → 4 → 2 → 1, 총 10단계!'
        }
      ]
    }
  ]
}
