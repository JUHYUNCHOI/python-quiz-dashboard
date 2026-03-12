// ============================================
// 수도코드 레슨 23: 레코드 타입 (Record Types)
// CIE 스타일 수도코드 - 사용자 정의 데이터 타입
// ============================================

import { LessonData } from '../types'

export const pseudoLesson23Data: LessonData = {
  id: "pseudo-23",
  title: "레코드 타입",
  emoji: "🏗️",
  description: "나만의 데이터 구조를 만들어요!",
  chapters: [
    {
      id: "ch1",
      title: "TYPE...ENDTYPE",
      emoji: "📦",
      steps: [
        {
          id: "ch1-intro",
          type: "explain",
          title: "📦 왜 새로운 데이터 타입이 필요할까?",
          content: `학생 한 명의 정보를 저장한다고 생각해 봐요.

이름, 나이, 학년을 각각 **따로따로** 변수에 저장하면?

\`\`\`
DECLARE studentName : STRING
DECLARE studentAge : INTEGER
DECLARE studentGrade : CHAR
\`\`\`

학생이 한 명이면 괜찮지만... **30명**이라면?

\`\`\`
DECLARE studentName1 : STRING
DECLARE studentAge1 : INTEGER
DECLARE studentGrade1 : CHAR
DECLARE studentName2 : STRING
DECLARE studentAge2 : INTEGER
...
\`\`\`

변수가 **90개**나 필요해요! 너무 복잡하죠?

**레코드 타입(Record Type)**을 사용하면 관련된 데이터를 **하나로 묶어서** 관리할 수 있어요!`
        },
        {
          id: "ch1-syntax",
          type: "explain",
          title: "📝 TYPE...ENDTYPE 문법",
          content: `CIE 수도코드에서 레코드 타입을 만드는 문법이에요:

\`\`\`
TYPE Student
    DECLARE name : STRING
    DECLARE age : INTEGER
    DECLARE grade : CHAR
ENDTYPE
\`\`\`

하나씩 살펴볼게요:

- \`TYPE Student\` : "Student"라는 새로운 데이터 타입을 만들어요
- \`DECLARE name : STRING\` : 필드(field)를 선언해요
- \`ENDTYPE\` : 타입 정의가 끝났다는 표시

다른 예시도 볼까요?

\`\`\`
TYPE Book
    DECLARE title : STRING
    DECLARE author : STRING
    DECLARE pages : INTEGER
    DECLARE price : REAL
ENDTYPE
\`\`\`

이렇게 하면 책 한 권의 정보를 **하나의 타입**으로 묶을 수 있어요!`
        },
        {
          id: "ch1-usage",
          type: "explain",
          title: "💻 레코드 변수 사용하기",
          content: `타입을 만들었으면 이제 **변수를 선언**하고 **사용**해 볼게요!

**1) 변수 선언:**
\`\`\`
DECLARE student1 : Student
\`\`\`

**2) 값 저장 (점 표기법 사용):**
\`\`\`
student1.name ← "김코딩"
student1.age ← 15
student1.grade ← 'A'
\`\`\`

**3) 값 읽기:**
\`\`\`
OUTPUT student1.name
OUTPUT student1.age
\`\`\`

결과:
\`\`\`
김코딩
15
\`\`\`

핵심은 **점(.) 표기법**이에요!
- \`student1.name\` → student1의 이름 필드에 접근
- \`student1.age\` → student1의 나이 필드에 접근

마치 "student1의 name"이라고 읽으면 돼요!`
        },
        {
          id: "ch1-predict1",
          type: "predict",
          title: "🔮 결과를 예측해봐요!",
          content: `다음 코드의 출력 결과는?

\`\`\`
TYPE Car
    DECLARE brand : STRING
    DECLARE year : INTEGER
ENDTYPE

DECLARE myCar : Car
myCar.brand ← "Tesla"
myCar.year ← 2024

OUTPUT myCar.brand
OUTPUT myCar.year
\`\`\``,
          options: [
            'Tesla\n2024',
            'myCar.brand\nmyCar.year',
            'Car\nTesla',
            '에러'
          ],
          answer: 0,
          explanation: '\`myCar.brand\`는 "Tesla"를, \`myCar.year\`는 2024를 저장하고 있어요. OUTPUT은 필드의 **값**을 출력하므로 **Tesla**와 **2024**가 출력돼요!'
        },
        {
          id: "ch1-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '다음 중 Book 레코드 타입을 **올바르게** 선언한 것은?',
          options: [
            'TYPE Book\n    DECLARE title : STRING\n    DECLARE pages : INTEGER\nENDTYPE',
            'RECORD Book\n    DECLARE title : STRING\n    DECLARE pages : INTEGER\nENDRECORD',
            'TYPE Book\n    title = STRING\n    pages = INTEGER\nENDTYPE',
            'DEFINE Book\n    STRING title\n    INTEGER pages\nENDBOOK'
          ],
          answer: 0,
          explanation: 'CIE 수도코드에서는 **TYPE...ENDTYPE** 키워드를 사용하고, 각 필드는 **DECLARE 이름 : 자료형** 형식으로 선언해요. RECORD나 DEFINE은 CIE 수도코드 키워드가 아니에요!'
        },
        {
          id: "ch1-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '영화(Movie) 레코드 타입을 완성하세요.',
          codeTemplate: '___ Movie\n    DECLARE title : STRING\n    DECLARE director : STRING\n    DECLARE rating : REAL\nENDTYPE',
          fillBlanks: [
            { id: 1, answer: "TYPE", options: ["TYPE", "RECORD", "DEFINE", "CLASS"] }
          ]
        }
      ]
    },
    {
      id: "ch2",
      title: "레코드와 배열",
      emoji: "📊",
      steps: [
        {
          id: "ch2-array",
          type: "explain",
          title: "📊 레코드 배열이란?",
          content: `학생 **30명**의 정보를 저장하려면, 레코드 타입의 **배열**을 만들면 돼요!

\`\`\`
TYPE Student
    DECLARE name : STRING
    DECLARE age : INTEGER
    DECLARE grade : CHAR
ENDTYPE

DECLARE students : ARRAY[1:30] OF Student
\`\`\`

이렇게 하면 \`students[1]\`부터 \`students[30]\`까지 각각 Student 레코드를 담을 수 있어요!

**값 저장하기:**
\`\`\`
students[1].name ← "김코딩"
students[1].age ← 15
students[1].grade ← 'A'

students[2].name ← "이수도"
students[2].age ← 16
students[2].grade ← 'B'
\`\`\`

변수 90개 대신 **배열 하나**로 깔끔하게 관리할 수 있어요!`
        },
        {
          id: "ch2-loop",
          type: "explain",
          title: "🔄 반복문으로 레코드 배열 다루기",
          content: `FOR 반복문을 사용하면 레코드 배열을 쉽게 처리할 수 있어요!

**모든 학생의 이름과 학년 출력하기:**
\`\`\`
FOR i ← 1 TO 30
    OUTPUT students[i].name, " - Grade: ", students[i].grade
NEXT i
\`\`\`

**나이가 16세 이상인 학생만 출력하기:**
\`\`\`
FOR i ← 1 TO 30
    IF students[i].age >= 16 THEN
        OUTPUT students[i].name, " (", students[i].age, "세)"
    ENDIF
NEXT i
\`\`\`

핵심 패턴: \`배열이름[인덱스].필드이름\`
- \`students[i].name\` → i번째 학생의 이름
- \`students[i].age\` → i번째 학생의 나이`
        },
        {
          id: "ch2-search",
          type: "explain",
          title: "🔍 레코드 배열에서 검색하기",
          content: `이름으로 학생을 검색하는 코드를 만들어 볼게요!

\`\`\`
FUNCTION FindStudent(students : ARRAY, target : STRING) RETURNS INTEGER
    FOR i ← 1 TO 30
        IF students[i].name = target THEN
            RETURN i
        ENDIF
    NEXT i
    RETURN -1
ENDFUNCTION
\`\`\`

사용 예시:
\`\`\`
pos ← FindStudent(students, "이수도")
IF pos <> -1 THEN
    OUTPUT "찾았습니다! 학년: ", students[pos].grade
ELSE
    OUTPUT "학생을 찾을 수 없습니다."
ENDIF
\`\`\`

이 코드의 동작:
1. 배열을 처음부터 끝까지 반복
2. \`students[i].name\`이 찾는 이름과 같으면 인덱스 반환
3. 끝까지 못 찾으면 -1 반환

레슨 15에서 배운 **선형 검색**과 같은 원리예요!`
        },
        {
          id: "ch2-predict1",
          type: "predict",
          title: "🔮 코드를 추적해봐요!",
          content: `다음 코드의 출력 결과는?

\`\`\`
TYPE Product
    DECLARE name : STRING
    DECLARE price : REAL
ENDTYPE

DECLARE items : ARRAY[1:3] OF Product
items[1].name ← "펜"
items[1].price ← 1.50
items[2].name ← "노트"
items[2].price ← 3.00
items[3].name ← "지우개"
items[3].price ← 0.75

total ← 0
FOR i ← 1 TO 3
    total ← total + items[i].price
NEXT i
OUTPUT total
\`\`\``,
          options: [
            '5.25',
            '5.00',
            '3.00',
            '1.50'
          ],
          answer: 0,
          explanation: 'i=1: total = 0 + 1.50 = 1.50\ni=2: total = 1.50 + 3.00 = 4.50\ni=3: total = 4.50 + 0.75 = **5.25**\n\n모든 상품의 가격을 합산하면 5.25가 돼요!'
        },
        {
          id: "ch2-quiz1",
          type: "quiz",
          title: "🧠 퀴즈!",
          content: '레코드 배열 \`employees[1:50]\`에서 3번째 직원의 이름에 접근하는 올바른 코드는?',
          options: [
            'employees[3].name',
            'employees.name[3]',
            'employees[3][name]',
            'name.employees[3]'
          ],
          answer: 0,
          explanation: '레코드 배열에서 특정 원소의 필드에 접근하려면 **배열이름[인덱스].필드이름** 형식을 써요. \`employees[3].name\`이 올바른 표현이에요!'
        },
        {
          id: "ch2-fill1",
          type: "fillblank",
          title: "✏️ 빈칸을 채워봐요!",
          content: '이름이 "김코딩"인 학생을 찾아서 학년을 출력하는 코드를 완성하세요.',
          codeTemplate: 'FOR i ← 1 TO 30\n    IF students[i].___ = "김코딩" THEN\n        OUTPUT students[i].grade\n    ENDIF\nNEXT i',
          fillBlanks: [
            { id: 1, answer: "name", options: ["name", "grade", "age", "student"] }
          ]
        }
      ]
    }
  ]
}
