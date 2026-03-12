// ============================================
// 수도코드 레슨 18: 삽입 정렬 (Insertion Sort)
// CIE 스타일 수도코드 - 카드 정렬처럼 올바른 위치에 삽입
// ============================================

import { LessonData } from '../types'

export const pseudoLesson18Data: LessonData = {
  id: "pseudo-18",
  title: "삽입 정렬",
  emoji: "📥",
  description: "올바른 자리에 끼워넣자!",
  chapters: [
    {
      id: "ch1",
      title: "삽입 정렬 개념",
      emoji: "🃏",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🃏 카드 정렬로 이해하는 삽입 정렬",
          content: `카드 게임을 할 때, 손에 카드를 어떻게 정리하나요?

새 카드를 받으면 이미 정리된 카드 사이에 **올바른 위치에 끼워넣죠!**

이것이 바로 **삽입 정렬(Insertion Sort)**이에요!

예를 들어 카드가 이렇게 들어온다면:
\`\`\`
[7] [2] [4] [1]
\`\`\`

1단계: [7] - 첫 번째 카드는 그냥 들어요
2단계: [2] 를 받으면 → 7 앞에 끼워넣기 → [2, 7]
3단계: [4] 를 받으면 → 2와 7 사이에 → [2, 4, 7]
4단계: [1] 을 받으면 → 맨 앞에 → [1, 2, 4, 7]

**정렬 완료!**`
        },
        {
          id: "ch1-how",
          type: "explain",
          title: "📋 삽입 정렬의 원리",
          content: `삽입 정렬의 핵심 아이디어를 정리해 볼게요:

**1) 배열을 두 부분으로 나눠서 생각해요:**
- 왼쪽: 이미 **정렬된** 부분
- 오른쪽: 아직 **정렬되지 않은** 부분

**2) 정렬되지 않은 부분에서 하나를 꺼내요**
- 이 값을 **key(키)**라고 불러요

**3) key를 정렬된 부분의 올바른 위치에 삽입해요**
- 정렬된 부분에서 key보다 큰 값들을 오른쪽으로 한 칸씩 밀어요
- 빈자리에 key를 넣어요

이 과정을 배열의 2번째 원소부터 마지막까지 반복하면 정렬이 완료돼요!`
        },
        {
          id: "ch1-example",
          type: "explain",
          title: "🔍 단계별 예시: [7, 2, 4, 1]",
          content: `배열 [7, 2, 4, 1]을 삽입 정렬로 정리해 볼게요!

**초기 상태:**
\`\`\`
[7, 2, 4, 1]
 ^정렬됨
\`\`\`

**i = 2: key = 2**
\`\`\`
2 < 7 이니까 7을 오른쪽으로 밀기
[_, 7, 4, 1] → [2, 7, 4, 1]
 ^^^^^정렬됨
\`\`\`

**i = 3: key = 4**
\`\`\`
4 < 7 이니까 7을 오른쪽으로 밀기
4 > 2 이니까 여기에 삽입!
[2, _, 7, 1] → [2, 4, 7, 1]
 ^^^^^^^^정렬됨
\`\`\`

**i = 4: key = 1**
\`\`\`
1 < 7 → 7을 밀기
1 < 4 → 4를 밀기
1 < 2 → 2를 밀기
맨 앞에 삽입!
[_, 2, 4, 7] → [1, 2, 4, 7]
 ^^^^^^^^^^^정렬됨
\`\`\`

**정렬 완료!** [1, 2, 4, 7]`
        },
      ]
    },
    {
      id: "ch2",
      title: "삽입 정렬 수도코드",
      emoji: "💻",
      steps: [
        {
          id: "ch2-code",
          type: "explain",
          title: "💻 CIE 수도코드로 삽입 정렬",
          content: `삽입 정렬의 CIE 수도코드를 볼까요?

\`\`\`
PROCEDURE InsertionSort(BYREF arr : ARRAY)
  FOR i ← 2 TO LENGTH(arr)
    key ← arr[i]
    j ← i - 1
    WHILE j >= 1 AND arr[j] > key
      arr[j + 1] ← arr[j]
      j ← j - 1
    ENDWHILE
    arr[j + 1] ← key
  NEXT i
ENDPROCEDURE
\`\`\`

한 줄씩 분석해 볼게요:

1. **BYREF**: 원본 배열을 직접 수정해요
2. **FOR i <- 2**: 2번째 원소부터 시작 (1번째는 이미 정렬된 것으로 봐요)
3. **key <- arr[i]**: 삽입할 값을 저장해요
4. **j <- i - 1**: 정렬된 부분의 마지막 위치부터 비교 시작
5. **WHILE j >= 1 AND arr[j] > key**: key보다 큰 값들을 오른쪽으로 밀어요
6. **arr[j + 1] <- key**: 빈자리에 key를 삽입해요`
        },
        {
          id: "ch2-trace",
          type: "explain",
          title: "📊 코드 추적: [7, 2, 4, 1]",
          content: `배열 [7, 2, 4, 1]로 코드를 따라가 볼게요!

**i = 2: key = 2, j = 1**

| 단계 | j | arr[j] | arr[j] > key? | 동작 |
|------|---|--------|---------------|------|
| 1 | 1 | 7 | 7 > 2? Yes | arr[2] <- 7, j <- 0 |

WHILE 종료 (j = 0 < 1)
arr[0 + 1] = arr[1] <- 2
배열: **[2, 7, 4, 1]**

**i = 3: key = 4, j = 2**

| 단계 | j | arr[j] | arr[j] > key? | 동작 |
|------|---|--------|---------------|------|
| 1 | 2 | 7 | 7 > 4? Yes | arr[3] <- 7, j <- 1 |
| 2 | 1 | 2 | 2 > 4? No | WHILE 종료 |

arr[1 + 1] = arr[2] <- 4
배열: **[2, 4, 7, 1]**

**i = 4: key = 1, j = 3**

| 단계 | j | arr[j] | arr[j] > key? | 동작 |
|------|---|--------|---------------|------|
| 1 | 3 | 7 | 7 > 1? Yes | arr[4] <- 7, j <- 2 |
| 2 | 2 | 4 | 4 > 1? Yes | arr[3] <- 4, j <- 1 |
| 3 | 1 | 2 | 2 > 1? Yes | arr[2] <- 2, j <- 0 |

WHILE 종료 (j = 0 < 1)
arr[0 + 1] = arr[1] <- 1
배열: **[1, 2, 4, 7]** - 정렬 완료!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `배열 [7, 2, 4, 1]에 삽입 정렬을 적용할 때, i = 2 단계가 끝난 후 배열의 상태는?

\`\`\`
PROCEDURE InsertionSort(BYREF arr : ARRAY)
  FOR i ← 2 TO LENGTH(arr)
    key ← arr[i]
    j ← i - 1
    WHILE j >= 1 AND arr[j] > key
      arr[j + 1] ← arr[j]
      j ← j - 1
    ENDWHILE
    arr[j + 1] ← key
  NEXT i
ENDPROCEDURE
\`\`\``,
          options: [
            '[2, 7, 4, 1]',
            '[1, 2, 4, 7]',
            '[2, 4, 7, 1]',
            '[7, 2, 4, 1]'
          ],
          answer: 0,
          explanation: 'i = 2일 때 key = 2이에요. j = 1이고 arr[1] = 7 > 2이므로 7을 오른쪽으로 밀어요. j = 0이 되어 WHILE 종료, arr[1] <- 2. 결과: **[2, 7, 4, 1]**'
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 최종 결과를 예측해봐요!",
          content: `배열 [5, 3, 8, 1]에 삽입 정렬을 완전히 적용하면 결과는?

\`\`\`
PROCEDURE InsertionSort(BYREF arr : ARRAY)
  FOR i ← 2 TO LENGTH(arr)
    key ← arr[i]
    j ← i - 1
    WHILE j >= 1 AND arr[j] > key
      arr[j + 1] ← arr[j]
      j ← j - 1
    ENDWHILE
    arr[j + 1] ← key
  NEXT i
ENDPROCEDURE
\`\`\``,
          options: [
            '[1, 3, 5, 8]',
            '[8, 5, 3, 1]',
            '[1, 5, 3, 8]',
            '[3, 5, 8, 1]'
          ],
          answer: 0,
          explanation: '단계별로 따라가면: [5,3,8,1] -> i=2: [3,5,8,1] -> i=3: [3,5,8,1] (8은 이미 올바른 위치) -> i=4: [1,3,5,8]. 오름차순으로 정렬 완료!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '삽입 정렬 수도코드의 핵심 부분을 완성하세요.',
          code: 'FOR i ← 2 TO LENGTH(arr)\n  key ← arr[i]\n  j ← i - 1\n  WHILE j >= 1 AND arr[j] > ___\n    arr[j + 1] ← arr[j]\n    j ← j - 1\n  ENDWHILE\n  arr[j + 1] ← key\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "key", options: ["key", "arr[i]", "arr[j]", "i"] }
          ]
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: 'WHILE 루프가 끝난 후 key를 올바른 위치에 삽입하는 코드를 완성하세요.',
          code: 'WHILE j >= 1 AND arr[j] > key\n  arr[j + 1] ← arr[j]\n  j ← j - 1\nENDWHILE\narr[___] ← key',
          fillBlanks: [
            { id: 1, answer: "j + 1", options: ["j + 1", "j", "j - 1", "i"] }
          ]
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '삽입 정렬에서 WHILE 루프는 언제 멈추나요?',
          options: [
            'j < 1 이거나, arr[j]가 key보다 작거나 같을 때',
            'key를 찾았을 때',
            'j가 배열의 끝에 도달했을 때',
            '항상 배열의 처음까지 반복한다'
          ],
          answer: 0,
          explanation: 'WHILE 조건은 **j >= 1 AND arr[j] > key**예요. 즉, j가 0이 되거나(배열의 처음을 지남), arr[j]가 key 이하인 값을 만나면 멈춰요. 이때 j + 1 위치가 key가 들어갈 자리예요!'
        }
      ]
    }
  ]
}
