/**
 * 레슨 콘텐츠용 한국어 → 영어 용어집.
 *
 * 왜 런타임 변환인가:
 *   레슨 데이터(`code`/`result`/`expect`/`answer`/`template`)에는 한국어 문자열
 *   리터럴이 1100곳 넘게 박혀 있다. 이걸 손으로 `en.*` 에 복제하면 한쪽만 고치는
 *   드리프트가 생기고, 특히 `answer`/`expect` 가 어긋나면 **정답 판정이 깨진다**.
 *   그래서 단일 용어집을 두고 모든 필드에 *동일한* 변환을 적용한다.
 *   코드와 기대 출력이 같은 함수를 통과하므로 일관성이 구조적으로 보장된다.
 *
 * 적용 순서:
 *   1. PHRASE_RULES — f-string 안에서 조사가 붙는 패턴 (어순을 바꿔야 함)
 *   2. GLOSSARY     — 긴 항목 우선 최장 일치 치환
 *
 * 모든 키가 한글을 포함하므로 영어/기호/파이썬 문법은 절대 건드리지 않는다.
 */

/**
 * f-string 안에서 한국어 조사가 보간값 뒤에 붙는 경우.
 * 단순 치환으로는 어순이 틀어지므로 먼저 패턴으로 처리한다.
 * 예) f"{name}님 안녕"  →  f"Hi {name}"
 */
const PHRASE_RULES: [RegExp, string][] = [
  // 인사 / 호칭
  [/\{([^{}]+)\}님 안녕하세요/g, "Hi {$1}"],
  [/\{([^{}]+)\}님 안녕/g, "Hi {$1}"],
  [/\{([^{}]+)\}님 환영/g, "Welcome {$1}"],
  [/\{([^{}]+)\}번님 차례입니다/g, "Player {$1}'s turn"],
  [/\{([^{}]+)\}님 차례입니다/g, "{$1}'s turn"],
  [/\{([^{}]+)\}님/g, "{$1}"],
  [/\{([^{}]+)\}에게 인사/g, "Greet {$1}"],

  // 나이 / 수량 + 단위
  [/\{([^{}]+)\}살입니다/g, "is {$1} years old"],
  [/\{([^{}]+)\}살이야/g, "I'm {$1} years old"],
  [/\{([^{}]+)\}살/g, "{$1} years old"],
  [/\{([^{}]+)\}명/g, "{$1} people"],
  [/\{([^{}]+)\}마리/g, "{$1} animals"],
  [/\{([^{}]+)\}개/g, "{$1} items"],
  [/\{([^{}]+)\}원/g, "{$1} won"],
  [/\{([^{}]+)\}점/g, "{$1} points"],
  [/\{([^{}]+)\}번째/g, "No. {$1}"],
  [/\{([^{}]+)\}학년이에요/g, "I'm in grade {$1}"],
  [/\{([^{}]+)\}학년/g, "grade {$1}"],

  // 판정 / 변환 실패 메시지
  [/\{([^{}]+)\}는 숫자가 아님/g, "{$1} is not a number"],
  [/\{([^{}]+)\}는 숫자가 아니에요/g, "{$1} is not a number"],
  [/\{([^{}]+)\}로 변환 필요/g, "needs conversion to {$1}"],
  [/\{([^{}]+)\}으로 못 나눠/g, "cannot divide by {$1}"],
  [/\{([^{}]+)\}로 못 나눠/g, "cannot divide by {$1}"],
  [/\{([^{}]+)\}은 안돼/g, "{$1} is not allowed"],
  [/\{([^{}]+)\}으로 말해야 해/g, "must say it with {$1}"],
  [/\{([^{}]+)\}의 개수/g, "count of {$1}"],

  // 연결 조사
  [/\{([^{}]+)\}이고 점수/g, "{$1}, score"],
  [/\{([^{}]+)\}이고/g, "{$1} and"],
  [/\{([^{}]+)\}이면 장학금/g, "{$1} qualifies for a scholarship"],
  [/\{([^{}]+)\}보다 크다/g, "greater than {$1}"],
  [/\{([^{}]+)\}사이로/g, "between {$1}"],
]

/**
 * 단어/문장 단위 용어집.
 * 런타임에 키 길이 내림차순으로 정렬해 최장 일치를 보장한다.
 * (예) "철수님 안녕" 이 "안녕" 보다 먼저 매칭됨
 */
const GLOSSARY: Record<string, string> = {
  // ── 사람 이름 ───────────────────────────────────────────
  "홍길동": "John Doe",
  "김철수": "Alex Kim",
  "이영희": "Emma Lee",
  "박민준": "Ethan Park",
  "김민준": "Ethan Kim",
  "김민수": "Noah Kim",
  "철수": "Alex",
  "영희": "Emma",
  "민수": "Noah",
  "민준": "Ethan",
  "지민": "Jimin",
  "유진": "Yujin",
  "주현": "Juhyun",
  "코린이": "Corin",
  "김작가": "Writer Kim",
  "해리포터": "Harry Potter",
  "롤링": "Rowling",

  // ── 동물 / 반려동물 ────────────────────────────────────
  "강아지": "puppy",
  "고양이": "cat",
  "토끼": "rabbit",
  "푸들": "poodle",
  "뽀삐": "Poppy",
  "나비": "Nabi",
  "멍멍이": "Doggy",
  "멍멍": "Woof",
  "음매": "Moo",
  "슬라임": "Slime",
  "고블린": "Goblin",

  // ── 과일 / 음식 ────────────────────────────────────────
  "사과": "apple",
  "바나나": "banana",
  "포도": "grape",
  "딸기": "strawberry",
  "망고": "mango",
  "키위": "kiwi",
  "체리": "cherry",
  "피자": "pizza",
  "햄버거": "burger",
  "치킨": "chicken",
  "콜라": "cola",
  "아메리카노": "Americano",
  "라떼": "Latte",
  "음료": "drink",
  "밥": "rice",

  // ── 색상 ───────────────────────────────────────────────
  "빨강": "red",
  "초록": "green",
  "파랑": "blue",
  "노랑": "yellow",
  "주황": "orange",
  "검정": "black",

  // ── 과목 / 성적 ────────────────────────────────────────
  "국어": "Korean",
  "수학": "Math",
  "영어": "English",
  "과학": "Science",
  "과목": "subject",
  "성적표": "report card",
  "성적 등급 판정기": "Grade calculator",
  "학년": "grade",
  "등급": "grade",
  "평균": "average",
  "합계": "total",
  "총합": "total",
  "점수 추가": "add score",
  "점수": "score",
  "유효한 점수": "valid score",
  "장학금 대상": "scholarship eligible",
  "최종 합격": "finally accepted",
  "합격": "pass",
  "불합격": "fail",
  "통과": "pass",
  "조건 미충족": "requirements not met",

  // ── 학교 / 장소 ────────────────────────────────────────
  "한강중학교": "Hangang Middle School",
  "코딩중학교": "Coding Middle School",
  "중학교": "middle school",
  "학교": "school",
  "학생": "student",
  "공통 학생": "students in common",
  "결석": "absent",
  "서울": "Seoul",
  "도시": "city",
  "주소": "address",
  "내 방": "my room",
  "거실": "living room",
  "놀이공원 입장 시스템": "Theme park entry system",
  "롤러코스터": "roller coaster",
  "어린이존": "kids zone",

  // ── 게임 / RPG ─────────────────────────────────────────
  "데미지 계산기": "Damage calculator",
  "기본 공격력": "base attack",
  "최종 데미지": "final damage",
  "치명타": "critical hit",
  "용사": "hero",
  "영웅": "hero",
  "전사": "warrior",
  "마법사": "wizard",
  "보스 잡았나": "boss defeated?",
  "물약 구매": "buy potion",
  "물약": "potion",
  "골드": "gold",
  "가방": "bag",
  "보물": "treasure",
  "레벨": "level",
  "첫 아이템": "first item",
  "새 게임": "new game",
  "새게임": "newgame",
  "게임 시작": "game start",
  "게임 계속": "game continues",
  "게임 종료": "game over",
  "게임": "game",
  "승리": "victory",
  "무승부": "draw",
  "승부": "match",
  "플레이어": "player",
  "가위": "scissors",
  "바위": "rock",
  "보": "paper",
  "발사": "fire",
  "검": "sword",
  "크리": "crit",
  "데미지": "damage",

  // ── 저장 / 파일 ────────────────────────────────────────
  "아직 한 번도 만든 적 없는 파일": "a file that has never been created",
  "불러올 세이브를 먼저 만들어 둠": "create a save file to load first",
  "읽을 파일을 먼저 만들어 둠": "create the file to read first",
  "저장 파일이 없어요": "no save file found",
  "파일 없으면 생성": "create the file if missing",
  "세이브 없음": "no save",
  "저장 없음": "no save",
  "파일 없음": "file not found",
  "없는파일": "missing_file",
  "저장 완료": "save complete",
  "저장하기": "save",
  "불러오기": "load",
  "저장": "save",
  "읽기": "read",
  "읽은 값": "value read",
  "메모 없음": "no memo",
  "새 메모": "new memo",
  "새 기록": "new record",
  "랭킹 추가": "add to ranking",
  "오늘 할 일": "today's tasks",
  "보고서": "report",
  "이력서": "resume",
  "편지": "letter",
  "사진": "photo",
  "파일": "file",

  // ── 입력 / 프롬프트 ────────────────────────────────────
  "숫자를 맞춰보세요": "Guess the number",
  "이름을 입력해주세요": "Please enter your name",
  "이름을 입력하세요": "Enter your name",
  "나이를 입력하세요": "Enter your age",
  "키를 입력하세요": "Enter your height",
  "숫자를 입력하세요": "Enter a number",
  "숫자를 입력": "Enter a number",
  "당신의 나이": "your age",
  "이름 전체": "full name",
  "자기소개": "introduce myself",
  "입력": "input",
  "출력": "output",
  "온도출력": "print_temp",

  // ── 판정 / 조건 ────────────────────────────────────────
  "로그인이 필요합니다": "Login required",
  "결제 수단 없음": "no payment method",
  "결제 가능": "payment available",
  "정가 결제": "full price",
  "할인 적용": "discount applied",
  "특별 혜택": "special offer",
  "일반 회원": "regular member",
  "보호자 동반": "guardian required",
  "영화 관람 가능": "can watch the movie",
  "소풍 가자": "let's go on a picnic",
  "산책 가자": "let's take a walk",
  "밖에 나가자": "let's go outside",
  "집에 있자": "let's stay home",
  "입장 가능": "entry allowed",
  "입장 불가": "entry denied",
  "미성년자": "minor",
  "미성년": "minor",
  "성인입니다": "is an adult",
  "성인": "adult",
  "범위 벗어남": "out of range",
  "범위 초과": "out of range",
  "범위 안": "in range",
  "양수 아님": "not positive",
  "양수 또는": "positive or",
  "양수": "positive",
  "음수": "negative",
  "홀수": "odd",
  "짝수": "even",
  "계산 불가": "cannot calculate",
  "계산 가능": "can calculate",
  "계산중": "calculating",
  "비밀번호 맞음": "password correct",
  "티켓 없음": "no ticket",
  "해당없음": "not applicable",
  "정보 없음": "no info",
  "없는 키": "missing key",
  "취소됐어요": "cancelled",
  "확인됐어요": "confirmed",
  "변환 실패": "conversion failed",
  "수정 가능": "editable",
  "부족": "not enough",
  "실패": "failed",
  "정상": "normal",
  "주의": "caution",
  "과속": "speeding",
  "너무 느림": "too slow",
  "더 작게": "smaller",
  "더 크게": "bigger",
  "못 찾음": "not found",
  "찾았어요": "found it",
  "완료": "done",
  "종료": "end",
  "계속": "continue",
  "시작 전이에요": "not started yet",
  "시작": "start",

  // ── 날짜 / 요일 ────────────────────────────────────────
  "일요일": "Sunday",
  "토요일": "Saturday",
  "평일이다": "is a weekday",
  "주말이다": "is a weekend",

  // ── 온도 / 날씨 ────────────────────────────────────────
  "더워요": "It's hot",
  "더워": "hot",
  "따뜻해": "warm",
  "선선해": "cool",
  "추워": "cold",
  "섭씨": "Celsius",
  "화씨": "Fahrenheit",
  "온도": "temperature",

  // ── 자료구조 / 프로그래밍 용어 ─────────────────────────
  "스택이 비어있어요": "the stack is empty",
  "마지막에 넣은 것": "last pushed item",
  "빈 벡터": "empty vector",
  "리스트": "list",
  "스택": "stack",
  "전역변수": "global variable",
  "일반 함수": "regular function",
  "함수 안": "inside the function",
  "함수 밖": "outside the function",
  "중복 제거": "remove duplicates",
  "다른 언어 방식": "other language style",
  "대괄호": "square brackets",
  "줄바꿈": "newline",
  "최댓값": "max value",
  "최솟값": "min value",
  "거듭제곱": "exponentiation",
  "제곱근": "square root",
  "제곱": "square",
  "나머지": "remainder",
  "더하기": "plus",
  "빼기": "minus",
  "곱하기": "times",
  "나누기": "divided by",
  "교환 전": "before swap",
  "교환 후": "after swap",
  "추가 후": "after adding",
  "첫 번째 숫자": "first number",
  "두 번째 숫자": "second number",
  "첫 번째 수": "first number",
  "두 번째 수": "second number",
  "첫 번째 항목": "first item",
  "두 번째 항목": "second item",
  "그룹의": "of the group",
  "완성된 모습": "finished result",
  "정수": "integer",
  "실수": "float",
  "문자": "character",
  "글자": "letter",
  "단어": "word",
  "숫자들": "numbers",
  "숫자만": "numbers only",
  "숫자는": "the number is",
  "숫자가 아니에요": "not a number",
  "숫자": "number",
  "에러": "Error",
  "오류": "Error",

  // ── 상거래 / 주문 ──────────────────────────────────────
  "치킨 계산기": "Chicken calculator",
  "주문 완료": "order complete",
  "총 가격": "total price",
  "결과": "result",
  "잔액": "balance",
  "가격": "price",
  "수량": "quantity",
  "사이즈": "size",
  "메뉴": "menu",
  "주문": "order",
  "구매": "buy",
  "배달": "delivery",
  "코인": "coin",
  "티켓": "ticket",
  "휘발유": "gasoline",
  "전기": "electric",
  "소나타": "Sonata",
  "현대": "Hyundai",

  // ── 사물 / 문구 ────────────────────────────────────────
  "지우개": "eraser",
  "공책": "notebook",
  "접시": "plate",
  "펜": "pen",
  "자": "ruler",
  "칸": "cell",
  "열": "column",
  "행": "row",
  "쪽": "page",
  "줄들": "lines",
  "줄": "line",

  // ── 인사 / 감탄 ────────────────────────────────────────
  "나는 파이썬을 좋아해": "I like Python",
  "파이썬 정말 재밌다": "Python is really fun",
  "재밌다 정말 파이썬": "fun really Python",
  "파이썬 재밌다": "Python is fun",
  "파이썬 입문": "Intro to Python",
  "너무 많은 공백": "too many spaces",
  "안녕하세요": "Hello",
  "반갑습니다": "Nice to meet you",
  "반가워": "Nice to meet you",
  "안녕": "Hello",
  "화이팅": "Go for it",
  "나는 용사": "I am a hero",
  "내 점수는": "My score is",
  "내 나이는": "My age is",
  "좋아하는 음식": "favorite food",
  "전부 코딩": "all coding",
  "코딩": "coding",
  "파이썬": "Python",
  "파이썬을": "Python",
  "좋아해": "like",
  "자기": "self",

  // ── 일반 명사 / 기타 ───────────────────────────────────
  "최대최소": "max_min",
  "통계": "stats",
  "비교": "compare",
  "조건": "condition",
  "방법": "method",
  "방식": "style",
  "간결": "concise",
  "인쇄 중": "printing",
  "로딩": "loading",
  "신규": "new",
  "대입": "assignment",
  "정답": "correct",
  "아님": "not",
  "있어요": "exists",
  "있음": "yes",
  "없음": "None",
  "있다": "exists",
  "비어있다": "empty",
  "같다": "same",
  "크다": "big",
  "느림": "slow",
  "제거": "remove",
  "추가": "add",
  "변환": "convert",
  "인사": "greeting",
  "계산": "calculate",
  "종류": "kind",
  "내용": "content",
  "데이터": "data",
  "정보": "info",
  "코드": "code",
  "넓이": "area",
  "크기": "size",
  "좌표": "coordinates",
  "이름": "name",
  "나이": "age",
  "선택": "choice",
  "사용": "use",
  "전체": "all",
  "일반": "normal",
  "범위": "range",
  "최대": "max",
  "최소": "min",
  "최종": "final",
  "하나": "one",
  "다시": "again",
  "원래": "original",
  "마지막": "last",
  "번째": "th",
  "이상": "or more",
  "그래서": "so",
  "나는": "I am",
  "저는": "I am",
  "나": "me",
  "값": "value",
  "수": "number",
  "합": "sum",
  "몫": "quotient",
  "곱": "product",
  "차": "difference",
  // "키" 는 신체 키(height)로 쓰는 레슨이 더 많다. 딕셔너리 키는 아래 "키로"/"키니까" 로 따로 받는다.
  "키": "height",
  "키로": "as key",
  "성": "surname",
  "김": "Kim",
  "세": "three",
  "중": "medium",
  "대": "large",
  "위": "up",
  "아래": "down",
  "등": "rank",
  "승": "win",
  "화": "anger",
  "월": "month",
  "번": "no.",
  "명": "people",
  "개": "items",
  "원": "won",
  "점": "points",
  "살": "years old",
  "마리": "animals",
  "님": "",

  // ── 자료구조 레슨 ──────────────────────────────────────
  "배열": "array",
  "튜플": "tuple",
  "집합": "set",
  "딕셔너리": "dict",
  "큐": "queue",
  "덱": "deque",
  "대기열": "waiting line",
  "자료구조": "data structure",
  "쌓기": "stacking",
  "쌓은": "stacked",
  "접시들": "plates",
  "상자": "box",
  "꽉 찬": "full",
  "양쪽 끝": "both ends",
  "양쪽": "both sides",
  "오른쪽": "right",
  "왼쪽": "left",
  "뺌": "removed",
  "꺼낸접시": "popped_plate",
  "꺼낸": "popped",
  "넣기": "push",
  "넣은": "pushed",
  "넣어라": "put in",
  "넣어요": "put in",
  "뒤에 넣기": "push back",
  "앞에 넣기": "push front",
  "삭제된": "deleted",
  "삭제하면서": "while deleting",
  "중괄호": "braces",
  "초기화": "initialize",
  "타입명": "type name",
  "멤버": "member",
  "고정": "fixed",
  "동적": "dynamic",
  "순서대로": "in order",
  "사전순": "alphabetical",
  "오름차순": "ascending",
  "내림차순": "descending",
  "상위": "top",
  "꼴등": "last place",
  "세우기": "line up",
  "출석부": "attendance list",
  "출석": "attendance",
  "인원": "count",
  "개수": "count",
  "길이": "length",
  "원본": "original",
  "복사본": "copy",
  "넘겨요": "is passed",
  "참조": "reference",

  // ── 파일 / 입출력 레슨 ─────────────────────────────────
  "모드": "mode",
  "쓰기": "write",
  "읽음": "read",
  "읽으려면": "to read",
  "덮어쓰기": "overwrite",
  "지우고": "erase",
  "새로": "new",
  "씀": "writes",
  "첫줄": "first line",
  "버퍼": "buffer",
  "자동으로": "automatically",
  "닫아줌": "closes",
  "저장됨": "saved",
  "입력한": "entered",
  "그대로": "as-is",
  "엔터": "Enter",
  "표준입력": "stdin",

  // ── 함수 / 모듈 / 환경 ────────────────────────────────
  "함수": "function",
  "매개변수": "parameter",
  "기본값": "default",
  "호출": "call",
  "반환": "return",
  "모듈": "module",
  "패키지": "package",
  "프로젝트": "project",
  "가상환경": "virtual env",
  "터미널": "terminal",
  "명령어": "command",
  "설치": "install",
  "실행": "run",
  "명시적": "explicit",
  "생략": "omitted",
  "단일": "single",

  // ── 조건 / 비교 / 판정 ────────────────────────────────
  "작다": "is smaller",
  "다르다": "is different",
  "크거나": "greater or",
  "작거나": "less or",
  "같니": "equal?",
  "못 나눠": "cannot divide",
  "나눌": "divide",
  "나누는수": "divisor",
  "안돼": "not allowed",
  "불가": "not allowed",
  "가능": "possible",
  "유효한": "valid",
  "확인": "check",
  "여부": "status",
  "성공": "success",
  "안전한": "safe",
  "거부": "rejected",
  "무시됨": "ignored",
  "건너뜀": "skipped",
  "멈춤": "stops",
  "찾음": "found",
  "있으면": "if it exists",
  "없으면": "if it does not exist",
  "있을": "when there is",
  "바꾸면": "if changed",
  "바뀜": "changes",
  "바뀌어": "changes",
  "여전히": "still",
  "이상해": "is wrong",
  "빠졌어요": "is missing",
  "계속돼요": "keeps going",
  "출력됨": "printed",
  "말하면": "if told",
  "인사하면": "when greeting",
  "달성": "achieved",
  "장학금": "scholarship",
  "접근": "access",
  "완전히": "completely",
  "동일": "the same",
  "같아요": "is the same",
  "딱 맞게": "exactly",

  // ── 게임 / RPG 추가 ───────────────────────────────────
  "보스": "boss",
  "방어력": "defense",
  "기사": "knight",
  "직업": "job",
  "회복": "heal",
  "전투": "battle",
  "상점": "shop",
  "보상": "reward",
  "보유": "owned",
  "응원": "cheer",
  "패배": "lose",
  "컴퓨터": "computer",
  "뒤로가기": "back",

  // ── 사물 / 장소 / 음식 추가 ───────────────────────────
  "수박": "watermelon",
  "과자": "snack",
  "새우깡": "Shrimp Chips",
  "포카칩": "Poca Chips",
  "꼬깔콘": "Corn Snack",
  "편의점": "convenience store",
  "물건": "item",
  "이름표": "name tag",
  "용돈": "allowance",
  "계산기": "calculator",
  "소개": "intro",
  "메시지": "message",
  "로딩중": "Loading",
  "세상": "world",
  "언어": "language",
  "아이디": "ID",
  "이메일": "email",
  "별명": "nickname",
  "앱": "app",
  "웹사이트": "website",
  "프로그램": "program",
  "프로그래밍": "programming",
  "재밌다": "is fun",
  "문제": "problem",
  "풀이": "solution",
  "수식": "expression",
  "문자열": "string",
  "동물": "animal",
  "소리내요": "makes a sound",
  "소리": "sound",
  "학생들": "students",

  // ── 학교 / 이름 추가 ──────────────────────────────────
  "파이썬중": "Python Middle School",
  "코딩고": "Coding High School",
  "김코딩": "Kim Coding",
  "코딩짱": "Coding Star",
  "바둑이": "Spot",
  "뽀삐이": "Poppy",
  "지수": "Jisoo",
  "썬이파": "nohtyP",

  // ── 수량 / 위치 / 시간 부사 ───────────────────────────
  "남은": "remaining",
  "모두": "all",
  "모든": "all",
  "전부": "all",
  "처음": "first",
  "첫": "first",
  "먼저": "first",
  "현재": "current",
  "변화": "change",
  "이동": "shift",
  "그냥": "just",
  "이미": "already",
  "너무": "too",
  "많은": "many",
  "공백": "spaces",
  "총": "total",
  "차이": "difference",
  "기본": "default",
  "단계": "step",
  "목록": "list",
  "개념": "concept",
  "올해": "this year",
  "살아": "lives",
  "환영해요": "Welcome",
  "안 함": "none",
  "없어요": "none",
  "없어": "missing",
  "없는": "missing",
  "필요": "needed",
  "주문이요": "order please",
  "두": "two",
  "보다": "than",
  "사이": "between",
  "부터": "from",
  // "맨"+방향은 반드시 묶음으로 먼저 잡는다. 안 그러면 "맨 아래" → "very down" 이 된다.
  "맨 아래": "bottom",
  "맨 위": "top",
  "맨 앞": "front",
  "맨 뒤": "back",
  "맨": "very",
  "앞": "front",
  "뒤": "back",
  "밖": "outside",
  "단": "only",
  "다": "all",
  "곳": "place",
  "끝": "end",
  "큰": "big",
  "빈": "empty",
  "년": "year",
  "목": "Thu",
  "문": "statement",
  "내": "my",

  // ── 잔여 어휘 (검증 리포트 기반) ───────────────────────
  "사고": "buying",
  "돈": "money",
  "있는": "in",
  "수정": "modify",
  "후": "after",
  "서기": "standing",
  "온": "came",
  "사람": "person",
  "나가야 해": "goes out first",
  "하면": "if",
  "인쇄": "print",
  "하나면": "if one",
  "됩니다": "works",
  "가지": "kinds",
  "차례입니다": "'s turn",
  "길게": "long",
  "진짜": "real",
  "없이": "without",
  "별로": "by",
  "다른": "different",
  "실행하는": "to run",
  "과일들": "fruits",
  "순": "order",
  "씩": "each",
  "때": "when",
  "한": "one",
  "안": "not",
  "패": "loss",
  "무": "draw",
  "게": "one",
  "삭제": "delete",
  "과일": "fruit",
  "종류별로": "by kind",
  "줄씩": "line at a time",
  "필요한": "required",
  "만들기": "create",
  "대문자": "uppercase",
  "치환": "replace",
  "키니까": "key, so",
  "날까": "occur?",
  "것": "one",
  "빠름": "fast",
  "수부터": "numbers from",
  "출력하고 싶어요": "want to print",
  "말해야 해": "must say",
  "이게": "this",
  "인지": "check",
  "함": "no",
  "짱": "star",
  "파이": "Py",
  "썬": "thon",
}

/** 길이 내림차순 정렬된 [ko, en] 목록 — 최장 일치 보장 */
const SORTED_ENTRIES: [string, string][] = Object.entries(GLOSSARY)
  .sort((a, b) => b[0].length - a[0].length)

/**
 * 용어 뒤에 붙는 조사/서술어미. 이게 없으면 `민수님`, `코린이는`, `배열과` 처럼
 * 조사가 붙은 형태가 "뒤에 한글이 이어진다"는 이유로 통째로 번역을 못 한다.
 * 위치 조사(에/로/에서)는 영어 어순과 맞지 않아 빈 문자열로 지운다.
 * 길이 내림차순으로 유지할 것 — 먼저 걸린 항목이 채택된다.
 */
const PARTICLES: [string, string][] = [
  ["입니다", ""], ["이에요", ""], ["이야", ""], ["이다", ""], ["예요", ""],
  ["에서", ""], ["으로", ""], ["에게", ""], ["이고", " and"], ["이면", " if"],
  ["님", ""], ["의", "'s"], ["와", " and"], ["과", " and"],
  ["도", " too"], ["만", " only"],
  ["는", ""], ["은", ""], ["이", ""], ["가", ""], ["를", ""], ["을", ""],
  ["로", ""], ["에", ""], ["야", ""],
]

const HANGUL_RE = /[\uAC00-\uD7A3]/

function isHangul(ch: string | undefined): boolean {
  return ch !== undefined && HANGUL_RE.test(ch)
}

/** 용어 바로 뒤가 조사 하나로 끝나면 그 조사를 반환 */
function matchParticle(src: string, at: number): [string, string] | undefined {
  return PARTICLES.find(([ko]) => src.startsWith(ko, at) && !isHangul(src[at + ko.length]))
}

/**
 * f-string 변수나 영어 단어 뒤에 홀로 남은 조사를 정리한다.
 * (예) `{name}는` — 앞이 한글이 아니라 용어 매칭이 일어나지 않아 조사만 남는다.
 */
const PARTICLE_MAP = new Map(PARTICLES)
const STANDALONE_PARTICLE_RE = new RegExp(
  `(^|[^\\uAC00-\\uD7A3])(${PARTICLES.map(([ko]) => ko).join("|")})(?![\\uAC00-\\uD7A3])`,
  "g"
)

/**
 * 레슨 콘텐츠 문자열의 한국어를 영어로 치환한다.
 * 한글이 없으면 원본을 그대로 반환하므로 코드/기호는 손상되지 않는다.
 *
 * `code`/`result`/`expect`/`answer`/`template` 에 **모두 동일하게**
 * 적용해야 한다. 한쪽만 적용하면 정답 판정이 깨진다.
 *
 * 구현 주의 (둘 다 과거에 실제로 터진 버그):
 *   1. 단일 패스 스캐너다. `split().join()` 을 용어마다 돌리면 앞선 치환 결과가
 *      다음 치환의 입력이 되어 영어가 다시 번역된다.
 *   2. 앞뒤가 한글이면 매칭하지 않는다. 이게 없으면 "성"→"surname" 규칙이
 *      "작성" 을 "작surname" 으로 망가뜨린다.
 */
export function translateKoContent(text: string): string {
  if (!HANGUL_RE.test(text)) return text

  let src = text
  for (const [pattern, replacement] of PHRASE_RULES) {
    src = src.replace(pattern, replacement)
  }

  let out = ""
  let i = 0
  outer: while (i < src.length) {
    if (isHangul(src[i]) && !isHangul(src[i - 1])) {
      for (const [ko, en] of SORTED_ENTRIES) {
        if (!src.startsWith(ko, i)) continue
        const after = i + ko.length
        if (!isHangul(src[after])) {
          out += en
          i = after
          continue outer
        }
        // 뒤에 한글이 이어져도 그게 조사 하나뿐이면 "용어 + 조사" 로 본다.
        // 그 외에는 더 긴 단어의 일부이므로 건너뛴다 ("작성" → "작surname" 방지)
        const particle = matchParticle(src, after)
        if (particle) {
          out += en + particle[1]
          i = after + particle[0].length
          continue outer
        }
      }
    }
    out += src[i]
    i++
  }

  return out.replace(
    STANDALONE_PARTICLE_RE,
    (_m, before: string, particle: string) => before + (PARTICLE_MAP.get(particle) ?? "")
  )
}

/** EN 모드일 때만 변환. 미리 작성된 `en.*` 값에도 적용해 잔여 한국어를 제거한다. */
export function localizeContent(text: string | null | undefined, isEn: boolean): string {
  if (typeof text !== "string") return ""
  return isEn ? translateKoContent(text) : text
}
