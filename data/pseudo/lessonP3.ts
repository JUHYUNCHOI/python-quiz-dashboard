// ============================================
// 수도코드 종합 프로젝트: Part 3 복습
// 검색, 정렬, Trace Table, 검증 종합
// ============================================

import { LessonData } from '../types'

export const pseudoLessonP3Data: LessonData = {
  id: "pseudo-p3",
  title: "Part 3 종합 프로젝트",
  emoji: "🏆",
  description: "Part 3 복습 프로젝트!",
  chapters: [
    {
      id: "ch1",
      title: "학생 점수 정렬 & 검색 시스템",
      emoji: "🎓",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "🎓 프로젝트: 학생 점수 관리 시스템",
          content: `지금까지 배운 모든 것을 합쳐서 **학생 점수 관리 시스템**을 만들어 볼게요!

이 시스템은 다음 기능이 있어요:
1. **입력 검증** (Validation) - 점수가 0~100 사이인지 확인
2. **삽입 정렬** (Insertion Sort) - 점수를 오름차순으로 정렬
3. **선형 검색** (Linear Search) - 특정 점수를 가진 학생 찾기
4. **Trace Table** - 각 단계를 추적

실제 IGCSE 시험에서도 이런 종합 문제가 나와요!

사용할 데이터:
\`\`\`
학생 이름: ["민수", "지영", "태호", "서연", "준혁"]
학생 점수: [78, 92, 65, 88, 45]
\`\`\``
        },
        {
          id: "ch1-validation",
          type: "explain",
          title: "🛡️ 1단계: 점수 입력 & 검증",
          content: `먼저 학생 5명의 점수를 입력받으면서 **Validation**을 해요!

\`\`\`
DECLARE names : ARRAY[1:5] OF STRING
DECLARE scores : ARRAY[1:5] OF INTEGER

names[1] ← "민수"
names[2] ← "지영"
names[3] ← "태호"
names[4] ← "서연"
names[5] ← "준혁"

FOR i ← 1 TO 5
    REPEAT
        OUTPUT names[i], "의 점수를 입력하세요 (0-100): "
        INPUT scores[i]
        IF scores[i] < 0 OR scores[i] > 100 THEN
            OUTPUT "오류: 점수는 0에서 100 사이여야 합니다!"
        ENDIF
    UNTIL scores[i] >= 0 AND scores[i] <= 100
NEXT i
\`\`\`

여기서 사용된 개념:
- **배열**: 이름과 점수를 저장
- **FOR 반복문**: 5명의 학생에 대해 반복
- **REPEAT...UNTIL**: Range Check (0~100)
- **IF문**: 오류 메시지 출력`
        },
        {
          id: "ch1-sort",
          type: "explain",
          title: "📥 2단계: 삽입 정렬로 점수 정렬",
          content: `점수를 오름차순으로 정렬해 볼게요!

이름도 함께 이동해야 하니까, 점수를 옮길 때 **이름도 같이** 옮겨야 해요!

\`\`\`
FOR i ← 2 TO 5
    keyScore ← scores[i]
    keyName ← names[i]
    j ← i - 1
    WHILE j >= 1 AND scores[j] > keyScore
        scores[j + 1] ← scores[j]
        names[j + 1] ← names[j]
        j ← j - 1
    ENDWHILE
    scores[j + 1] ← keyScore
    names[j + 1] ← keyName
NEXT i
\`\`\`

정렬 과정 (Trace Table):

| i | keyScore | keyName | 정렬 후 scores | 정렬 후 names |
|---|----------|---------|---------------|--------------|
| 초기 | | | [78,92,65,88,45] | [민수,지영,태호,서연,준혁] |
| 2 | 92 | 지영 | [78,92,65,88,45] | [민수,지영,태호,서연,준혁] |
| 3 | 65 | 태호 | [65,78,92,88,45] | [태호,민수,지영,서연,준혁] |
| 4 | 88 | 서연 | [65,78,88,92,45] | [태호,민수,서연,지영,준혁] |
| 5 | 45 | 준혁 | [45,65,78,88,92] | [준혁,태호,민수,서연,지영] |

최종 결과: **45, 65, 78, 88, 92** (오름차순 정렬 완료!)`
        },
        {
          id: "ch1-search",
          type: "explain",
          title: "🔍 3단계: 선형 검색으로 학생 찾기",
          content: `정렬된 배열에서 특정 점수를 가진 학생을 찾아 볼게요!

\`\`\`
OUTPUT "검색할 점수를 입력하세요: "
INPUT searchScore

found ← FALSE

FOR i ← 1 TO 5
    IF scores[i] = searchScore THEN
        OUTPUT names[i], "의 점수가 ", searchScore, "점입니다!"
        found ← TRUE
    ENDIF
NEXT i

IF found = FALSE THEN
    OUTPUT "해당 점수를 가진 학생이 없습니다."
ENDIF
\`\`\`

예시: searchScore = 78을 검색하면?

| i | scores[i] | scores[i] = 78? | 결과 |
|---|-----------|-----------------|------|
| 1 | 45 | No | |
| 2 | 65 | No | |
| 3 | 78 | Yes | "민수의 점수가 78점입니다!" |
| 4 | 88 | No | |
| 5 | 92 | No | |

3번째 비교에서 찾았어요!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 정렬 결과를 예측해봐요!",
          content: `점수 [78, 92, 65, 88, 45]를 삽입 정렬할 때, i = 3 (key = 65) 단계가 끝난 후의 배열은?

\`\`\`
i = 2 후: [78, 92, 65, 88, 45]  (92 > 78이라 변화 없음)
i = 3: key = 65
  j = 2: 92 > 65 → 92를 밀기
  j = 1: 78 > 65 → 78을 밀기
  j = 0 → 종료, arr[1] ← 65
\`\`\``,
          options: [
            '[65, 78, 92, 88, 45]',
            '[78, 65, 92, 88, 45]',
            '[65, 92, 78, 88, 45]',
            '[78, 92, 65, 88, 45]'
          ],
          answer: 0,
          explanation: 'key = 65는 92와 78보다 작으므로 둘 다 오른쪽으로 밀려요. 65는 맨 앞(인덱스 1)에 삽입돼요. 결과: **[65, 78, 92, 88, 45]**'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 검색 코드 빈칸 채우기!",
          content: '선형 검색에서 학생을 찾는 조건을 완성하세요.',
          code: 'FOR i ← 1 TO 5\n    IF scores[i] ___ searchScore THEN\n        OUTPUT names[i]\n        found ← TRUE\n    ENDIF\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "=", options: ["=", "<>", ">", "<"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "종합 퀴즈",
      emoji: "📝",
      steps: [
        {
          id: "ch2-intro",
          type: "explain",
          title: "📝 Part 3 종합 복습!",
          content: `Part 3에서 배운 내용을 모두 복습해 볼게요!

**배운 주제들:**
- 선형 검색 (Linear Search)
- 버블 정렬 (Bubble Sort)
- 삽입 정렬 (Insertion Sort)
- Trace Table (추적 표)
- Validation (데이터 검증)
- Verification (데이터 확인)

지금부터 종합 퀴즈로 실력을 확인해 볼 거예요!

시험 대비 핵심 포인트:
1. 검색과 정렬 알고리즘의 **수도코드를 읽고 쓸 수 있어야** 해요
2. **Trace Table**을 정확하게 그릴 수 있어야 해요
3. **Validation과 Verification의 차이**를 설명할 수 있어야 해요

준비됐나요? 시작할게요!`
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 종합 퀴즈 1 - 검색",
          content: '선형 검색(Linear Search)에서 배열에 10개의 원소가 있고 찾는 값이 마지막에 있다면, 비교는 몇 번 필요한가요?',
          options: [
            '10번',
            '1번',
            '5번',
            '100번'
          ],
          answer: 0,
          explanation: '선형 검색은 **처음부터 끝까지 하나씩** 확인해요. 찾는 값이 마지막(10번째)에 있으면 **10번** 비교해야 해요. 이것이 선형 검색의 **최악의 경우(worst case)**예요!'
        },
        {
          id: "ch2-quiz2",
          type: "quiz",
          title: "🧠 종합 퀴즈 2 - 정렬",
          content: '버블 정렬과 삽입 정렬의 공통점은?',
          options: [
            '둘 다 인접한 원소들을 비교하면서 정렬한다',
            '둘 다 배열을 반으로 나누어 정렬한다',
            '둘 다 항상 같은 횟수의 비교를 한다',
            '둘 다 추가 배열이 필요하다'
          ],
          answer: 0,
          explanation: '버블 정렬은 인접한 원소를 비교해서 교환하고, 삽입 정렬은 정렬된 부분에서 올바른 위치를 찾기 위해 인접한 원소들을 비교해요. 둘 다 **원본 배열 안에서(in-place)** 정렬하기 때문에 추가 배열이 필요 없어요!'
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 종합 퀴즈 3 - Trace Table",
          content: `다음 코드의 OUTPUT은?

\`\`\`
x ← 1
total ← 0
WHILE x <= 4
    total ← total + x
    x ← x + 1
ENDWHILE
OUTPUT total
\`\`\`

Trace Table:

| x | total | x <= 4? |
|---|-------|---------|
| 1 | 0 | |
| | 1 | Yes |
| 2 | | |
| | 3 | Yes |
| 3 | | |
| | 6 | Yes |
| 4 | | |
| | 10 | Yes |
| 5 | | No |`,
          options: [
            '10',
            '4',
            '15',
            '6'
          ],
          answer: 0,
          explanation: 'Trace Table을 따라가면: total = 0+1=1, 1+2=3, 3+3=6, 6+4=**10**. x = 5가 되면 x <= 4가 거짓이 되어 반복 종료! 총합은 1+2+3+4 = **10**이에요.'
        },
        {
          id: "ch2-quiz3",
          type: "quiz",
          title: "🧠 종합 퀴즈 4 - Validation",
          content: '회원가입 시 "이메일 주소에 @ 기호가 포함되어야 합니다"는 어떤 종류의 검증인가요?',
          options: [
            'Format Check',
            'Range Check',
            'Presence Check',
            'Verification'
          ],
          answer: 0,
          explanation: '이메일의 **형식(format)**이 올바른지 확인하는 것이므로 **Format Check**예요! @ 기호가 있는지, "xxx@xxx.xxx" 형태인지 등 정해진 패턴을 확인하는 거예요.'
        },
        {
          id: "ch2-predict2",
          type: "predict",
          title: "🔮 종합 퀴즈 5 - 삽입 정렬 Trace",
          content: `배열 [4, 1, 3]에 삽입 정렬을 적용하면 최종 결과는?

단계별 추적:
\`\`\`
초기: [4, 1, 3]

i = 2: key = 1
  j = 1: arr[1]=4 > 1 → 4를 밀기
  j = 0 → 종료
  arr[1] ← 1
  결과: [1, 4, 3]

i = 3: key = 3
  j = 2: arr[2]=4 > 3 → 4를 밀기
  j = 1: arr[1]=1 > 3? No → 종료
  arr[2] ← 3
  결과: ?
\`\`\``,
          options: [
            '[1, 3, 4]',
            '[3, 1, 4]',
            '[1, 4, 3]',
            '[4, 3, 1]'
          ],
          answer: 0,
          explanation: 'i = 2에서 1이 맨 앞으로 → [1, 4, 3]. i = 3에서 key = 3, 4 > 3이므로 4를 밀고, 1 < 3이므로 멈춤 → arr[2] ← 3. 최종: **[1, 3, 4]**!'
        },
        {
          id: "ch2-quiz4",
          type: "quiz",
          title: "🧠 종합 퀴즈 6 - Verification",
          content: '다음 중 Verification(확인) 방법이 아닌 것은?',
          options: [
            'Range Check로 나이가 1~120인지 확인',
            'Double Entry로 이메일을 두 번 입력받아 비교',
            'Screen Check로 입력한 정보를 화면에 보여주고 확인',
            '비밀번호를 두 번 입력해서 일치하는지 확인'
          ],
          answer: 0,
          explanation: 'Range Check는 **Validation(검증)**이에요! 데이터가 합리적인 범위에 있는지 **컴퓨터가 자동으로** 확인하는 것이죠. 나머지는 모두 사용자가 **의도한 데이터가 맞는지 확인**하는 Verification 방법이에요.'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 종합 빈칸 채우기!",
          content: '삽입 정렬에서 key를 올바른 위치에 삽입하는 코드를 완성하세요.',
          code: 'FOR i ← 2 TO LENGTH(arr)\n    key ← arr[i]\n    j ← i - 1\n    WHILE j >= 1 AND arr[j] > key\n        arr[j + 1] ← arr[j]\n        j ← j - 1\n    ENDWHILE\n    arr[j + 1] ← ___\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "key", options: ["key", "arr[j]", "arr[i]", "j"] }
          ]
        },
        {
          id: "ch2-fill2",
          type: "fillblank",
          title: "✏️ 검증 빈칸 채우기!",
          content: 'Range Check로 점수(0~100)를 입력받는 코드를 완성하세요.',
          code: 'REPEAT\n    OUTPUT "점수를 입력하세요 (0-100): "\n    INPUT score\n___ score >= 0 AND score <= 100',
          fillBlanks: [
            { id: 1, answer: "UNTIL", options: ["UNTIL", "WHILE", "IF", "ENDWHILE"] }
          ]
        },
        {
          id: "ch2-predict3",
          type: "predict",
          title: "🔮 최종 도전 문제!",
          content: `다음 코드에서 사용자가 순서대로 200, -5, 75를 입력하면, "Invalid!"는 몇 번 출력될까요?

\`\`\`
REPEAT
    OUTPUT "Enter score (0-100): "
    INPUT score
    IF score < 0 OR score > 100 THEN
        OUTPUT "Invalid!"
    ENDIF
UNTIL score >= 0 AND score <= 100
OUTPUT "Score accepted: ", score
\`\`\``,
          options: [
            '2번 (200과 -5에서)',
            '1번 (200에서만)',
            '3번 (모든 입력에서)',
            '0번 (출력되지 않음)'
          ],
          answer: 0,
          explanation: '1번째 입력 200: 200 > 100이므로 "Invalid!" 출력. 2번째 입력 -5: -5 < 0이므로 "Invalid!" 출력. 3번째 입력 75: 0 <= 75 <= 100이므로 조건 만족, 반복 종료! **"Invalid!"는 2번** 출력되고, 마지막에 "Score accepted: 75"가 출력돼요.'
        }
      ]
    }
  ]
}
