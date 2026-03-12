// ============================================
// 수도코드 레슨 15: 선형 검색 (Linear Search)
// CIE 스타일 수도코드 - 배열에서 값 찾기
// ============================================

import { LessonData } from '../types'

export const pseudoLesson15Data: LessonData = {
  id: "pseudo-15",
  title: "선형 검색",
  emoji: "🔍",
  description: "하나씩 찾아보자!",
  chapters: [
    {
      id: "ch1",
      title: "선형 검색 개념",
      emoji: "📝",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🔍 선형 검색이 뭐예요?",
          content: `여러분이 책장에서 특정 책을 찾는다고 상상해 봐요.

**첫 번째 칸**부터 시작해서, **한 권씩** 확인하면서 찾는 책인지 비교해요.

이것이 바로 **선형 검색(Linear Search)**이에요!

\`\`\`
배열: [7, 3, 9, 1, 5]
찾는 값: 9

1번째 확인: 7 → 아니에요!
2번째 확인: 3 → 아니에요!
3번째 확인: 9 → 찾았어요! ✓
\`\`\`

처음부터 끝까지 **하나씩 순서대로** 비교하는 방법이에요.

배열이 **정렬되어 있지 않아도** 사용할 수 있어요!`
        },
        {
          id: "ch1-how",
          type: "explain",
          title: "📋 선형 검색의 과정",
          content: `선형 검색은 이렇게 동작해요:

**1단계:** 배열의 **첫 번째** 원소부터 시작
**2단계:** 현재 원소가 찾는 값인지 **비교**
**3단계:** 같으면 → **찾았다!** (위치 반환)
**4단계:** 다르면 → **다음 원소**로 이동
**5단계:** 끝까지 못 찾으면 → **없다!** (-1 반환)

예시:
\`\`\`
배열: [4, 8, 2, 6, 10]
찾는 값: 6

[4] → 4 ≠ 6, 다음!
[8] → 8 ≠ 6, 다음!
[2] → 2 ≠ 6, 다음!
[6] → 6 = 6, 찾았어요! (4번째 위치)
\`\`\`

만약 찾는 값이 **3**이라면? 끝까지 확인해도 없으니 **-1**을 반환해요.`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `배열 [20, 5, 13, 7, 30]에서 선형 검색으로 값 **13**을 찾을 때, 검색이 끝나는 위치(인덱스)는?

\`\`\`
arr[1] = 20  → 13이 아님
arr[2] = 5   → 13이 아님
arr[3] = 13  → ???
\`\`\``,
          options: [
            '3',
            '2',
            '4',
            '-1'
          ],
          answer: 0,
          explanation: 'arr[1]=20은 아니고, arr[2]=5도 아니고, arr[3]=13은 찾는 값! 인덱스 **3**에서 찾았어요!'
        }
      ]
    },
    {
      id: "ch2",
      title: "선형 검색 수도코드",
      emoji: "💻",
      steps: [
        {
          id: "ch2-code",
          type: "explain",
          title: "💻 선형 검색 수도코드",
          content: `CIE 수도코드로 선형 검색을 작성해 볼게요!

\`\`\`
FUNCTION LinearSearch(arr : ARRAY, target : INTEGER) RETURNS INTEGER
    FOR i ← 1 TO LENGTH(arr)
        IF arr[i] = target THEN
            RETURN i
        ENDIF
    NEXT i
    RETURN -1
ENDFUNCTION
\`\`\`

하나씩 살펴볼게요:

- **FUNCTION** ~ **RETURNS INTEGER**: 정수를 반환하는 함수
- **FOR i ← 1 TO LENGTH(arr)**: 배열의 처음(1)부터 끝까지 반복
- **IF arr[i] = target**: 현재 값이 찾는 값과 같으면
- **RETURN i**: 그 위치(인덱스)를 반환하고 끝!
- **RETURN -1**: 끝까지 못 찾으면 -1을 반환 (없다는 뜻)`
        },
        {
          id: "ch2-detail",
          type: "explain",
          title: "🔎 코드 자세히 보기",
          content: `선형 검색 코드의 핵심 부분을 더 자세히 봐요!

\`\`\`
FOR i ← 1 TO LENGTH(arr)
    IF arr[i] = target THEN
        RETURN i
    ENDIF
NEXT i
\`\`\`

**LENGTH(arr)**: 배열의 길이(원소 개수)를 알려주는 함수예요.

예를 들어 arr = [7, 3, 9, 1, 5]이면:
- LENGTH(arr) = **5**
- FOR i ← 1 TO 5 → i는 1, 2, 3, 4, 5

**RETURN**은 값을 돌려주고 함수를 **바로 끝내요!**
중간에 찾으면 나머지는 확인하지 않아요.

만약 끝까지 반복해도 못 찾으면?
→ FOR 반복이 끝나고 **RETURN -1**이 실행돼요.`
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '선형 검색 함수의 빈칸을 완성하세요.',
          codeTemplate: 'FUNCTION LinearSearch(arr : ARRAY, target : INTEGER) RETURNS INTEGER\n    FOR i ← 1 TO ___(arr)\n        IF arr[i] = target THEN\n            RETURN i\n        ENDIF\n    NEXT i\n    RETURN -1\nENDFUNCTION',
          fillBlanks: [
            { id: 1, answer: "LENGTH", options: ["LENGTH", "SIZE", "COUNT", "MAX"] }
          ]
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 코드를 추적해봐요!",
          content: `다음 코드를 실행하면 result의 값은?

\`\`\`
DECLARE arr : ARRAY[1:5] OF INTEGER
arr[1] ← 10
arr[2] ← 25
arr[3] ← 7
arr[4] ← 18
arr[5] ← 3

result ← LinearSearch(arr, 18)
OUTPUT result
\`\`\`

추적:
- i=1: arr[1]=10, 10≠18 → 다음
- i=2: arr[2]=25, 25≠18 → 다음
- i=3: arr[3]=7,  7≠18  → 다음
- i=4: arr[4]=18, 18=18 → ???`,
          options: [
            '4',
            '18',
            '3',
            '-1'
          ],
          answer: 0,
          explanation: 'i=4일 때 arr[4]=18이 target=18과 같으므로 **RETURN 4**가 실행돼요. result에는 찾은 위치인 **4**가 저장돼요!'
        },
        {
          id: "ch2-predict3",
          type: "predict",
          title: "🔮 못 찾으면 어떻게 될까?",
          content: `다음 코드를 실행하면 result의 값은?

\`\`\`
DECLARE arr : ARRAY[1:4] OF INTEGER
arr[1] ← 5
arr[2] ← 12
arr[3] ← 8
arr[4] ← 20

result ← LinearSearch(arr, 15)
OUTPUT result
\`\`\`

추적:
- i=1: arr[1]=5,  5≠15  → 다음
- i=2: arr[2]=12, 12≠15 → 다음
- i=3: arr[3]=8,  8≠15  → 다음
- i=4: arr[4]=20, 20≠15 → 다음
- 반복 끝!`,
          options: [
            '-1',
            '0',
            '4',
            '15'
          ],
          answer: 0,
          explanation: '배열의 모든 원소를 확인했지만 15는 없어요. FOR 반복이 끝나고 **RETURN -1**이 실행돼요. -1은 "찾지 못했다"는 뜻이에요!'
        }
      ]
    }
  ]
}
