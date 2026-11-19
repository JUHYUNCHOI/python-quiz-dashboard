// 복습(/review/[lessonId]) 챕터 제목의 영어 표.
//
// 왜 용어집(ko-en-glossary)이 아니라 별도 표인가:
//   용어집은 **코드·출력값** 번역기다 (접시들 → plates). 산문에 걸면 조사가 남아서
//   "스택이 뭐야?" → "stack 뭐야?" 같은 반쪽짜리가 나온다. 챕터 제목은 산문이므로
//   통째로 사람이 번역한 문장을 쓴다.
//
// 왜 데이터 파일마다 en.title 을 넣지 않는가:
//   챕터 스텝 235개 중 198개가 en.title 이 없었고(2026-11-19), 제목은 파일 간 중복이
//   많아서(에러 탐정 8회, 마무리 7회) 중앙 표가 169개로 끝난다. 파일 78개를 건드리는
//   것보다 단일 출처가 유지보수에 낫다.
//
// 조회 우선순위 (client-page.tsx chapterLabel):
//   step.content.en.title  →  이 표  →  용어집  →  한국어 원문

export const REVIEW_CHAPTER_TITLE_EN: Record<string, string> = {
  // ── 공통 ──────────────────────────────────────────
  "에러 탐정": "Error Detective",
  "마무리": "Wrap-up",
  "종합 — 처음부터 작성": "Putting It Together — Write From Scratch",
  "실전 활용": "Real-World Use",
  "종합 정리": "Full Recap",
  "종합 도전": "Final Challenge",
  "종합 퀴즈": "Final Quiz",
  "종합 문제": "Mixed Problems",
  "종합 응용": "Mixed Applications",
  "종합 복습": "Full Review",
  "전체 통합": "Putting It All Together",
  "추가 연습": "Extra Practice",
  "직접 써보기": "Try It Yourself",
  "결과 예측": "Predict the Output",
  "결과 예측 훈련": "Output Prediction Drill",
  "오류 찾기": "Find the Bug",
  "예측 & 오류 찾기": "Predict & Debug",
  "오류 찾기 & 실전 연습": "Find the Bug & Practice",
  "⭐ 쉬움": "⭐ Easy",
  "⭐⭐ 보통": "⭐⭐ Medium",
  "⭐⭐⭐ 어려움": "⭐⭐⭐ Hard",
  "⭐⭐⭐ 도전": "⭐⭐⭐ Challenge",
  "🎉 Part 6 완료!": "🎉 Part 6 Complete!",

  // ── input() ──────────────────────────────────────
  "input() 소개": "Meet input()",
  "input() 기본": "input() Basics",
  "숫자 입력": "Numeric Input",
  "자기소개 프로그램": "Self-Introduction Program",

  // ── 조건문 ────────────────────────────────────────
  "조건문 소개": "Meet Conditionals",
  "if 문": "The if Statement",
  "등급 판정기": "Grade Checker",
  "논리 연산자 소개": "Meet Logical Operators",
  "복합 조건": "Compound Conditions",
  "놀이공원 입장 시스템": "Theme Park Entry System",

  // ── 반복문 ────────────────────────────────────────
  "for 반복문": "The for Loop",
  "range()와 for": "range() and for",
  "리스트와 for": "Lists and for",
  "for문 응용": "for Loop Applications",
  "for 손에 익히기": "Get Comfortable with for",
  "while 반복문": "The while Loop",
  "while 기본": "while Basics",
  "숫자 맞추기": "Number Guessing",
  "while 손에 익히기": "Get Comfortable with while",

  // ── 자료구조 개요 ─────────────────────────────────
  "4가지 자료구조 복습": "Review of the 4 Data Structures",
  "순서 & 수정 가능 여부": "Order & Mutability",
  "데이터 접근하기": "Accessing Data",
  "자료구조 복습": "Data Structure Review",
  "자료구조 총정리": "Data Structures All Together",
  "상황별 자료구조 선택": "Choosing the Right Data Structure",

  // ── 리스트 ────────────────────────────────────────
  "리스트 만들기": "Creating Lists",
  "인덱싱": "Indexing",
  "리스트 수정": "Modifying Lists",
  "리스트 손에 익히기": "Get Comfortable with Lists",
  "for문으로 리스트 순회": "Looping Over a List",
  "enumerate() 사용": "Using enumerate()",
  "리스트 컴프리헨션 기초": "List Comprehension Basics",
  "리스트+반복문 손에 익히기": "Get Comfortable with Lists + Loops",

  // ── 문자열 ────────────────────────────────────────
  "split() - 문자열 쪼개기": "split() — Splitting Strings",
  "join() - 리스트 합치기": "join() — Joining a List",
  "기본 슬라이싱 [start:end]": "Basic Slicing [start:end]",
  "스텝 슬라이싱과 역순": "Step Slicing and Reversing",
  "문자열 슬라이싱 활용": "String Slicing in Practice",

  // ── 튜플 / 딕셔너리 / 집합 ────────────────────────
  "튜플 만들기": "Creating Tuples",
  "튜플 활용": "Using Tuples",
  "리스트 vs 튜플": "List vs Tuple",
  "딕셔너리 만들기": "Creating Dictionaries",
  "수정과 삭제": "Updating and Deleting",
  "딕셔너리 순회": "Looping Over a Dictionary",
  "딕셔너리 손에 익히기": "Get Comfortable with Dictionaries",
  "집합 만들기": "Creating Sets",
  "집합 연산": "Set Operations",

  // ── 스택 / 큐 / 덱 ────────────────────────────────
  "스택이 뭐야?": "What Is a Stack?",
  "리스트로 스택 구현": "Implementing a Stack with a List",
  "스택 실전 활용": "Stacks in Practice",
  "큐가 뭐야?": "What Is a Queue?",
  "deque로 큐 구현": "Implementing a Queue with deque",
  "큐 실전 활용": "Queues in Practice",
  "덱(Deque)이 뭐야?": "What Is a Deque?",
  "deque 핵심 메서드": "Key deque Methods",
  "스택/큐 vs 덱 비교": "Stack/Queue vs Deque",

  // ── 미니 프로젝트 ─────────────────────────────────
  "컴퓨터의 선택": "The Computer's Move",
  "승패 판정": "Deciding Win or Lose",
  "여러 판 + 점수": "Multiple Rounds + Score",
  "랜덤 번호 뽑기": "Drawing Random Numbers",
  "중복 없이 뽑기": "Drawing Without Duplicates",
  "정렬 + 종합": "Sorting + Wrap-up",
  "단어 저장": "Saving Words",
  "검색하기": "Searching",
  "삭제 + 전체 보기": "Deleting + Viewing All",
  "리스트 안의 딕셔너리": "Dictionaries Inside a List",
  "평균과 합계": "Average and Sum",
  "조건으로 분류하기": "Classifying by Condition",
  "기초 문제 복습": "Basics Review",

  // ── 함수 ──────────────────────────────────────────
  "함수가 뭐였지?": "What Was a Function Again?",
  "함수 호출하기": "Calling Functions",
  "매개변수": "Parameters",
  "반환값 (return)": "Return Values (return)",
  "계산기 만들기": "Building a Calculator",
  "함수 손에 익히기": "Get Comfortable with Functions",
  "함수 기초": "Function Basics",
  "기본값이 뭐였지?": "What Was a Default Value Again?",
  "기본값 & 다중 반환": "Default Values & Multiple Returns",
  "여러 값 반환하기": "Returning Multiple Values",
  "키워드 인자": "Keyword Arguments",
  "변수의 범위": "Variable Scope",
  "변수 범위": "Variable Scope",
  "람다 함수": "Lambda Functions",
  "sorted + 람다": "sorted + Lambda",
  "람다 & sorted": "Lambda & sorted",
  "함수 조합하기": "Composing Functions",

  // ── 내장함수 ──────────────────────────────────────
  "내장함수": "Built-in Functions",
  "len()과 sum()": "len() and sum()",
  "max()와 min()": "max() and min()",
  "sorted() 정렬": "Sorting with sorted()",
  "map() 변환": "Transforming with map()",

  // ── 에러 처리 / 파일 ──────────────────────────────
  "에러 처리 기초": "Error Handling Basics",
  "에러 종류": "Kinds of Errors",
  "여러 에러 처리": "Handling Multiple Errors",
  "실전: 게임 메뉴": "In Practice: Game Menu",
  "파일 쓰기": "Writing Files",
  "파일 읽기": "Reading Files",
  "파일 모드": "File Modes",
  "파일 에러 처리": "File Error Handling",
  "게임 세이브 만들기": "Building a Game Save",
  "불러오기 기능": "The Load Feature",
  "메인 메뉴": "Main Menu",

  // ── 클래스 ────────────────────────────────────────
  "왜 클래스가 필요할까?": "Why Do We Need Classes?",
  "클래스 손에 익히기": "Get Comfortable with Classes",
  "메서드 = 클래스 안의 함수": "Methods = Functions Inside a Class",
  "속성을 바꾸는 메서드": "Methods That Change Attributes",
  "인스턴스 변수 vs 클래스 변수": "Instance vs Class Variables",
  "클래스 변수 vs 인스턴스 변수": "Class vs Instance Variables",
  "캐릭터 클래스 복습": "Character Class Review",
  "은행 계좌 클래스": "Bank Account Class",
  "도형 클래스": "Shape Class",
  "책 클래스 — 종합 프로젝트": "Book Class — Capstone Project",
  "상속 — 부모 클래스 물려받기": "Inheritance — Extending a Parent Class",
  "오버라이딩 & super()": "Overriding & super()",

  // ── 모듈 / 패키지 ─────────────────────────────────
  "import의 4가지 방법": "4 Ways to import",
  "math 모듈 — 수학 공구함": "The math Module — Math Toolbox",
  "math 모듈 활용": "Using the math Module",
  "random 모듈 — 랜덤 공구함": "The random Module — Randomness Toolbox",
  "random 모듈": "The random Module",
  "datetime + 종합": "datetime + Wrap-up",
  "모듈 vs 패키지": "Module vs Package",
  "pip 명령어": "pip Commands",
  "패키지 사용 흐름": "The Package Workflow",

  // ── 텍스트 RPG ────────────────────────────────────
  "Character 클래스 설계": "Designing the Character Class",
  "Monster & Item 클래스": "Monster & Item Classes",
  "actions 패턴": "The actions Pattern",
  "직업별 스탯": "Stats by Class",
  "전투 시스템": "Combat System",
  "레벨업 + heal": "Level Up + heal",
  "Item 사용 + 인벤토리": "Using Items + Inventory",
  "휴식 시스템": "Rest System",
  "치명타 시스템": "Critical Hit System",
  "장비 시스템": "Equipment System",

  // ── f-string / 타입 변환 ──────────────────────────
  "f-string 소개": "Meet f-strings",
  "기본 f-string": "Basic f-strings",
  "식 계산": "Evaluating Expressions",
  "소수점 포맷": "Decimal Formatting",
  "0 채우기와 메서드": "Zero Padding and Methods",
  "성적표 만들기": "Building a Report Card",
  "타입 변환 소개": "Meet Type Conversion",
  "int() 변환": "Converting with int()",
  "float()와 str()": "float() and str()",
  "bool() 변환": "Converting with bool()",
  "점수 계산기": "Score Calculator",

  // ── 정렬 / 탐색 ───────────────────────────────────
  "정렬 후 빠른 검색": "Fast Search After Sorting",
  "sort 응용 패턴 (심화)": "sort Patterns (Advanced)",
}
