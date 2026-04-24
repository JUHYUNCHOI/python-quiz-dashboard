"use client"

import React, { useState, useEffect, useMemo, useRef } from "react"
import { getCppCharColors } from "@/components/ui/code-block"

// ============================================
// SyntaxBuilder: 문법이 단계별로 조립되는 애니메이션
// if가 나타나고 → 괄호가 생기고 → 조건이 들어가고 → 중괄호가 생기고...
// ============================================

// 하이라이트 영역: 어두운 색 → 밝은 색으로 매핑
function brightenColor(cls: string): string {
  // 이미 밝은 색이면 그대로
  if (cls.includes("white")) return cls
  // 어두운 → 밝은 매핑
  return cls
    .replace("text-gray-100", "text-white")
    .replace("text-gray-300", "text-white")
    .replace("text-green-400", "text-green-300")
    .replace("text-green-300", "text-green-200")
    .replace("text-pink-400", "text-pink-300")
    .replace("text-yellow-300", "text-yellow-200")
    .replace("text-orange-300", "text-orange-200")
    .replace("text-purple-400", "text-purple-300")
    .replace("text-sky-300", "text-sky-200")
    .replace("text-yellow-200", "text-yellow-100")
    .replace("opacity-60", "")
    .replace("italic", "")
}

interface SyntaxStep {
  /** 이 단계에서 보여줄 전체 코드 (이전 단계 포함) */
  code: string
  /** 이 단계에서 새로 추가된 부분을 하이라이트할 범위 (단일 또는 복수) */
  highlight: { start: number; end: number } | { start: number; end: number }[]
  /** "이것에서 왔어요" 참조 범위 — 밝게 + 깜빡임. highlight와 별개로 동작 */
  blinkHighlight?: { start: number; end: number } | { start: number; end: number }[]
  /** 이 단계 설명 */
  label: { ko: string; en: string }
  /** 설명 아이콘 */
  icon?: string
  /** 하이라이트 부분에 깜빡임 애니메이션 적용 */
  blink?: boolean
}

interface SyntaxBuilderPreset {
  title: { ko: string; en: string }
  steps: SyntaxStep[]
}

// ========== 프리셋 정의 ==========

const CPP_IF: SyntaxBuilderPreset = {
  title: { ko: "C++ 조건문 (if) 만들기", en: "Building a C++ if statement" },
  steps: [
    {
      code: "if",
      highlight: { start: 0, end: 2 },
      label: { ko: "\"만약에...\" 를 의미하는 키워드", en: "Keyword meaning \"if...\"" },
      icon: "🔑",
    },
    {
      code: "if ()",
      highlight: { start: 3, end: 5 },
      label: { ko: "괄호 안에 true 또는 false가 될 조건을 넣어요!", en: "Put a condition that becomes true or false!" },
      icon: "🫧",
    },
    {
      code: "if (score >= 90)",
      highlight: { start: 4, end: 15 },
      label: { ko: "score가 90 이상이면 → true! 아니면 → false!", en: "score >= 90 → true! Otherwise → false!" },
      icon: "❓",
    },
    {
      code: "if (score >= 90)   // ← true? false?",
      highlight: { start: 17, end: 37 },
      label: { ko: "컴퓨터가 이 조건을 계산해요: true일까 false일까?", en: "The computer evaluates: is this true or false?" },
      icon: "🤔",
    },
    {
      code: "if (score >= 90) {\n\n}",
      highlight: { start: 17, end: 21 },
      label: { ko: "true면 → 중괄호 { } 안의 코드가 실행돼요!", en: "If true → code inside { } runs!" },
      icon: "✅",
    },
    {
      code: 'if (score >= 90) {\n    cout << "A등급!";\n}',
      highlight: { start: 22, end: 41 },
      label: { ko: "true일 때만 이 줄이 실행! false면 통째로 건너뛰어요", en: "This line runs only when true! If false, skip everything" },
      icon: "🎯",
    },
  ],
}

const CPP_FOR: SyntaxBuilderPreset = {
  title: { ko: "C++ 반복문 (for) 만들기", en: "Building a C++ for loop" },
  steps: [
    {
      code: "for",
      highlight: { start: 0, end: 3 },
      label: { ko: "\"반복해!\" — 같은 코드를 여러 번 돌리고 싶을 때!", en: "\"Repeat!\" — when you want to run code multiple times!" },
      icon: "🔁",
    },
    {
      code: "for (int i = 0;          )",
      highlight: { start: 5, end: 14 },
      label: { ko: "① 어디서 시작? i = 0 → 카운터가 0부터!", en: "① Where to start? i = 0 → counter from 0!" },
      icon: "🏁",
    },
    {
      code: "for (int i = 0; i < 5;       )",
      highlight: { start: 16, end: 21 },
      label: { ko: "② 언제까지? i < 5가 true인 동안 계속 반복!", en: "② Until when? Keep going while i < 5 is true!" },
      icon: "🤔",
    },
    {
      code: "for (int i = 0; i < 5; i++)",
      highlight: { start: 23, end: 26 },
      label: { ko: "③ 매번 뭘 바꿔? i++ → 한 바퀴 돌 때마다 i가 1 증가!", en: "③ What changes? i++ → i increases by 1 each round!" },
      icon: "⬆️",
    },
    {
      code: 'for (int i = 0; i < 5; i++) {\n    cout << i << endl;\n}',
      highlight: { start: 32, end: 52 },
      label: { ko: "{ } 안의 코드가 5번 실행! → 0, 1, 2, 3, 4 출력", en: "Code inside { } runs 5 times! → prints 0, 1, 2, 3, 4" },
      icon: "🎯",
    },
  ],
}

const CPP_FUNCTION: SyntaxBuilderPreset = {
  title: { ko: "C++ 함수 만들기", en: "Building a C++ function" },
  steps: [
    {
      code: "int",
      highlight: { start: 0, end: 3 },
      label: { ko: "이 함수는 뭘 돌려줄까? int = 정수를 돌려줄 거야!", en: "What does this function return? int = an integer!" },
      icon: "📤",
    },
    {
      code: "int add",
      highlight: { start: 4, end: 7 },
      label: { ko: "함수 이름 = 이 함수가 뭘 하는지! (더하기!)", en: "Function name = what it does! (add!)" },
      icon: "🏷️",
    },
    {
      code: "int add(int a, int b)",
      highlight: { start: 7, end: 21 },
      label: { ko: "재료 2개를 받아요: 정수 a와 정수 b", en: "Takes 2 ingredients: integer a and integer b" },
      icon: "📥",
    },
    {
      code: "int add(int a, int b) {\n    return a + b;\n}",
      highlight: { start: 26, end: 39 },
      label: { ko: "a + b 계산 → return으로 결과를 돌려줘요!", en: "Calculate a + b → return sends the result back!" },
      icon: "🎯",
    },
    {
      code: "int add(int a, int b) {\n    return a + b;\n}\n\ncout << add(3, 5);  // → 8",
      highlight: { start: 42, end: 68 },
      label: { ko: "add(3, 5) 호출 → a=3, b=5 → 3+5 = 8 출력!", en: "Call add(3, 5) → a=3, b=5 → prints 8!" },
      icon: "✨",
    },
  ],
}

const CPP_WHILE: SyntaxBuilderPreset = {
  title: { ko: "C++ while 반복문 만들기", en: "Building a C++ while loop" },
  steps: [
    {
      code: "while",
      highlight: { start: 0, end: 5 },
      label: { ko: "조건이 true인 동안 계속 반복! 몇 번 돌지 모를 때 쓰세요", en: "Keep repeating while true! Use when you don't know how many times" },
      icon: "🔁",
    },
    {
      code: "while (count < 10)",
      highlight: { start: 7, end: 17 },
      label: { ko: "count < 10이 true? → 실행! false? → 멈춤!", en: "count < 10 is true? → run! false? → stop!" },
      icon: "🤔",
    },
    {
      code: "while (count < 10) {\n    cout << count;\n    count++;\n}",
      highlight: { start: 19, end: 56 },
      label: { ko: "✅ 정상! count++로 매번 1씩 증가 → 10이 되면 멈춤", en: "✅ Correct! count++ adds 1 each time → stops at 10" },
      icon: "✅",
    },
    {
      code: "// 출력: 0 1 2 3 4 5 6 7 8 9\nwhile (count < 10) {\n    cout << count;\n    count++;\n}",
      highlight: { start: 0, end: 29 },
      label: { ko: "count가 0→1→2→...→9, 10이 되면 count<10이 false! 멈춤!", en: "count goes 0→1→2→...→9, at 10 count<10 is false! Stop!" },
      icon: "📊",
    },
    {
      code: "// ⚠️ count++가 없으면?\nwhile (count < 10) {\n    cout << count;\n    // count는 영원히 0! → 무한루프!\n}",
      highlight: { start: 0, end: 97 },
      label: { ko: "⚠️ count++가 없으면? count는 영원히 0! → 무한루프!", en: "⚠️ Without count++? count stays 0 forever! → infinite loop!" },
      icon: "⚠️",
    },
  ],
}

const PY_IF: SyntaxBuilderPreset = {
  title: { ko: "Python 조건문 (if) 만들기", en: "Building a Python if statement" },
  steps: [
    {
      code: "if",
      highlight: { start: 0, end: 2 },
      label: { ko: "\"만약에...\" — 조건에 따라 실행할지 말지 결정!", en: "\"if...\" — decide whether to run based on a condition!" },
      icon: "🔑",
    },
    {
      code: "if score >= 90",
      highlight: { start: 3, end: 14 },
      label: { ko: "score >= 90 → true 또는 false! 괄호 없이 바로 써요", en: "score >= 90 → true or false! No parentheses needed" },
      icon: "🤔",
    },
    {
      code: "if score >= 90:",
      highlight: { start: 14, end: 15 },
      label: { ko: "콜론(:) = \"자, 그러면 아래를 실행해!\" 라는 뜻", en: "Colon(:) = \"then run the following!\"" },
      icon: "👇",
    },
    {
      code: 'if score >= 90:\n    print("A등급!")',
      highlight: { start: 16, end: 35 },
      label: { ko: "true일 때만 실행! 들여쓰기(4칸)가 코드 블록이에요", en: "Runs only when true! Indentation (4 spaces) = code block" },
      icon: "🎯",
    },
  ],
}

const PY_FOR: SyntaxBuilderPreset = {
  title: { ko: "Python 반복문 (for) 만들기", en: "Building a Python for loop" },
  steps: [
    {
      code: "for",
      highlight: { start: 0, end: 3 },
      label: { ko: "\"하나씩 꺼내면서 반복해!\" 키워드", en: "\"Take each one and repeat!\" keyword" },
      icon: "🔁",
    },
    {
      code: "for i in",
      highlight: { start: 4, end: 8 },
      label: { ko: "i = 매번 바뀌는 값, in = \"~안에서 하나씩\"", en: "i = changing value, in = \"one by one from\"" },
      icon: "📦",
    },
    {
      code: "for i in range(5)",
      highlight: { start: 9, end: 17 },
      label: { ko: "range(5) → 0, 1, 2, 3, 4 를 하나씩 i에 넣어줘요!", en: "range(5) → puts 0, 1, 2, 3, 4 into i one by one!" },
      icon: "📊",
    },
    {
      code: "for i in range(5):\n    print(i)",
      highlight: { start: 18, end: 30 },
      label: { ko: "콜론 + 들여쓰기 = 반복할 코드! → 0, 1, 2, 3, 4 출력", en: "Colon + indent = loop body! → prints 0, 1, 2, 3, 4" },
      icon: "🎯",
    },
  ],
}

const PY_FUNCTION: SyntaxBuilderPreset = {
  title: { ko: "Python 함수 만들기", en: "Building a Python function" },
  steps: [
    {
      code: "def",
      highlight: { start: 0, end: 3 },
      label: { ko: "def = define = \"함수를 만들겠다!\"", en: "def = define = \"I'm creating a function!\"" },
      icon: "🔑",
    },
    {
      code: "def add(a, b)",
      highlight: { start: 4, end: 13 },
      label: { ko: "이름은 add, 재료(a, b) 2개를 받아요. 타입 안 써도 OK!", en: "Named add, takes 2 ingredients (a, b). No types needed!" },
      icon: "📥",
    },
    {
      code: "def add(a, b):\n    return a + b",
      highlight: { start: 14, end: 29 },
      label: { ko: "콜론 + 들여쓰기 → return으로 결과를 돌려줘요!", en: "Colon + indent → return sends back the result!" },
      icon: "📤",
    },
    {
      code: "def add(a, b):\n    return a + b\n\nresult = add(3, 5)  # → 8",
      highlight: { start: 30, end: 57 },
      label: { ko: "add(3, 5) 호출 → a=3, b=5 → 3+5 = 8이 result에!", en: "Call add(3, 5) → a=3, b=5 → 8 goes into result!" },
      icon: "✨",
    },
  ],
}

const PY_CLASS: SyntaxBuilderPreset = {
  title: { ko: "Python 클래스 만들기", en: "Building a Python class" },
  steps: [
    {
      code: "class",
      highlight: { start: 0, end: 5 },
      label: { ko: "class = 설계도! \"강아지란 이런 거야\"를 정의해요", en: "class = blueprint! Define \"what a Dog is\"" },
      icon: "📐",
    },
    {
      code: "class Dog:",
      highlight: { start: 6, end: 10 },
      label: { ko: "이름은 대문자로! 콜론(:)으로 시작", en: "Name starts with capital! Begin with colon" },
      icon: "🏷️",
    },
    {
      code: "class Dog:\n    def __init__(self, name):",
      highlight: { start: 11, end: 40 },
      label: { ko: "__init__ = 생성자! 객체 만들 때 자동 실행. self = \"나 자신\"", en: "__init__ = constructor! Runs when created. self = \"myself\"" },
      icon: "🏗️",
    },
    {
      code: 'class Dog:\n    def __init__(self, name):\n        self.name = name',
      highlight: { start: 41, end: 61 },
      label: { ko: "self.name = \"이 강아지의 이름\"을 저장!", en: "self.name = store \"this dog's name\"!" },
      icon: "📦",
    },
    {
      code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\nmy_dog = Dog("멍이")  # → name="멍이"',
      highlight: { start: 62, end: 98 },
      label: { ko: "Dog(\"멍이\") → __init__ 실행 → self.name = \"멍이\"!", en: "Dog(\"Buddy\") → __init__ runs → self.name = \"Buddy\"!" },
      icon: "✨",
    },
  ],
}

const CPP_SWITCH: SyntaxBuilderPreset = {
  title: { ko: "C++ switch/case 만들기", en: "Building a C++ switch statement" },
  steps: [
    {
      code: "switch (day)",
      highlight: { start: 0, end: 12 },
      label: { ko: "\"day가 뭔지 확인해볼게!\" — 검사할 변수를 넣어요", en: "\"Let me check what day is!\" — put the variable to check" },
      icon: "🔍",
    },
    {
      code: "switch (day) {\n\n}",
      highlight: { start: 13, end: 17 },
      label: { ko: "중괄호 { } 안에 각 경우(case)를 쓸 거예요", en: "Each case goes inside the curly braces { }" },
      icon: "📦",
    },
    {
      code: "switch (day) {\n    case 1:\n}",
      highlight: { start: 19, end: 26 },
      label: { ko: "case 1: → \"day가 1이면!\" 콜론(:)을 꼭 붙여요", en: "case 1: → \"if day is 1!\" Don't forget the colon(:)" },
      icon: "🏷️",
    },
    {
      code: "switch (day) {\n    case 1:\n        cout << \"월요일\";\n}",
      highlight: { start: 27, end: 49 },
      label: { ko: "day가 1일 때 하고 싶은 일을 써요", en: "Write what to do when day is 1" },
      icon: "✏️",
    },
    {
      code: "switch (day) {\n    case 1:\n        cout << \"월요일\";\n        break;\n}",
      highlight: { start: 50, end: 63 },
      label: { ko: "break; → \"여기서 끝!\" 빼면 아래 case도 실행돼요 (일부러 뺄 수도 있어요!)", en: "break; → \"Stop here!\" Without it, cases below also run (sometimes on purpose!)" },
      icon: "🛑",
    },
    {
      code: "switch (day) {\n    case 1:\n        cout << \"월요일\";\n        break;\n    case 2:\n}",
      highlight: { start: 68, end: 75 },
      label: { ko: "case 2: → \"day가 2이면!\" 같은 패턴이에요", en: "case 2: → \"if day is 2!\" Same pattern" },
      icon: "🏷️",
    },
    {
      code: "switch (day) {\n    case 1:\n        cout << \"월요일\";\n        break;\n    case 2:\n        cout << \"화요일\";\n}",
      highlight: { start: 76, end: 98 },
      label: { ko: "day가 2일 때 할 일을 써요", en: "Write what to do when day is 2" },
      icon: "✏️",
    },
    {
      code: "switch (day) {\n    case 1:\n        cout << \"월요일\";\n        break;\n    case 2:\n        cout << \"화요일\";\n        break;\n}",
      highlight: { start: 99, end: 112 },
      label: { ko: "break; → 여기서도 꼭 멈춰줘야 해요!", en: "break; → Must stop here too!" },
      icon: "🛑",
    },
    {
      code: "switch (day) {\n    case 1:\n        cout << \"월요일\";\n        break;\n    case 2:\n        cout << \"화요일\";\n        break;\n    default:\n}",
      highlight: { start: 117, end: 125 },
      label: { ko: "default: → 1도 2도 아닐 때! if의 else 같은 역할", en: "default: → when it's neither 1 nor 2! Like else" },
      icon: "✨",
    },
    {
      code: "switch (day) {\n    case 1:\n        cout << \"월요일\";\n        break;\n    case 2:\n        cout << \"화요일\";\n        break;\n    default:\n        cout << \"기타\";\n}",
      highlight: { start: 126, end: 148 },
      label: { ko: "default에는 break 없어도 OK — 마지막이니까!", en: "No break needed in default — it's the last one!" },
      icon: "✅",
    },
  ],
}

const CPP_ARRAY: SyntaxBuilderPreset = {
  title: { ko: "C++ 배열과 벡터 만들기", en: "Building C++ arrays & vectors" },
  steps: [
    {
      code: "int arr[5]",
      highlight: { start: 0, end: 10 },
      label: { ko: "\"정수 5개를 나란히 저장할 공간을 만들어!\"", en: "\"Create space for 5 integers in a row!\"" },
      icon: "📦",
    },
    {
      code: "int arr[5] = {1, 2, 3, 4, 5};",
      highlight: { start: 13, end: 30 },
      label: { ko: "{ }로 각 칸에 값을 넣어요: [0]=1, [1]=2, [2]=3...", en: "{ } fills each slot: [0]=1, [1]=2, [2]=3..." },
      icon: "📥",
    },
    {
      code: "int arr[5] = {1, 2, 3, 4, 5};\ncout << arr[0];  // → 1",
      highlight: { start: 30, end: 53 },
      label: { ko: "arr[0] = 첫 번째! (0부터 세는 거 주의!) arr[4] = 마지막!", en: "arr[0] = first! (starts from 0!) arr[4] = last!" },
      icon: "👆",
    },
    {
      code: "int arr[5] = {1, 2, 3, 4, 5};\ncout << arr[0];  // → 1\narr[2] = 99;     // 3번째 칸을 99로 바꿔!",
      highlight: { start: 54, end: 88 },
      label: { ko: "arr[인덱스] = 값 으로 수정 가능!", en: "arr[index] = value to modify!" },
      icon: "✨",
    },
  ],
}

const CPP_POINTER: SyntaxBuilderPreset = {
  title: { ko: "C++ 포인터 이해하기", en: "Understanding C++ pointers" },
  steps: [
    {
      code: "// 변수의 원본을 직접 바꾸고 싶을 때!\n// 주소를 알면 가능해요",
      highlight: { start: 0, end: 58 },
      label: { ko: "변수의 원본을 직접 바꾸고 싶을 때! 주소를 알면 가능해요", en: "When you want to modify the original variable! Possible if you know the address" },
      icon: "💡",
    },
    {
      code: "int x = 42;",
      highlight: { start: 0, end: 11 },
      label: { ko: "먼저 평범한 변수를 만들어요. x에 42가 저장됐어요", en: "First, create a regular variable. 42 is stored in x" },
      icon: "📦",
    },
    {
      code: "int x = 42;\nint* ptr",
      highlight: { start: 12, end: 20 },
      label: { ko: "int* = 정수가 저장된 '위치'를 기억하는 특별한 변수", en: "int* = a special variable that remembers where an integer lives" },
      icon: "📍",
    },
    {
      code: "int x = 42;\nint* ptr = &x;",
      highlight: { start: 19, end: 26 },
      label: { ko: "&x = x가 어디 있는지 주소를 알려줘! ptr이 그 주소를 기억해요", en: "&x = tell me where x is! ptr remembers that address" },
      icon: "🏠",
    },
    {
      code: "int x = 42;\nint* ptr = &x;\ncout << *ptr;  // → 42",
      highlight: { start: 27, end: 49 },
      label: { ko: "*ptr = 그 주소로 가서 값을 읽어! → 42", en: "*ptr = go to that address and read! → 42" },
      icon: "👀",
    },
    {
      code: "int x = 42;\nint* ptr = &x;\ncout << *ptr;  // → 42\n*ptr = 100;    // x도 100!",
      highlight: { start: 50, end: 77 },
      label: { ko: "같은 주소니까 x도 100으로 바뀌어요! 이게 포인터의 힘!", en: "Same address, so x becomes 100 too! That's the power of pointers!" },
      icon: "✨",
    },
  ],
}

const CPP_STRUCT: SyntaxBuilderPreset = {
  title: { ko: "C++ struct — 여러 변수를 하나로!", en: "C++ struct — grouping variables!" },
  steps: [
    {
      code: "struct",
      highlight: { start: 0, end: 6 },
      label: { ko: "struct — 여러 변수를 하나로 묶을 때 쓰는 키워드!", en: "struct — keyword for grouping multiple variables together!" },
      icon: "🔑",
    },
    {
      code: "struct Student",
      highlight: { start: 7, end: 14 },
      label: { ko: "struct 이름 — 새로운 타입의 이름. 대문자로 시작하는 게 관례!", en: "struct name — the name of the new type. Convention: start with uppercase!" },
      icon: "🏷️",
    },
    {
      code: "struct Student {\n};",
      highlight: [{ start: 15, end: 16 }, { start: 17, end: 19 }],
      label: { ko: "중괄호 { }로 멤버들을 감싸요. 닫는 } 뒤엔 세미콜론(;) 필수!", en: "Curly braces { } wrap the members. Semicolon(;) after closing } is required!" },
      icon: "⚠️",
    },
    {
      code: "struct Student {\n    string name;\n};",
      highlight: { start: 20, end: 32 },
      label: { ko: "저장하고 싶은 것 ①: 이름(문자열) — string name;", en: "What to store ①: name (string) — string name;" },
      icon: "📝",
    },
    {
      code: "struct Student {\n    string name;\n    int age;\n};",
      highlight: { start: 37, end: 45 },
      label: { ko: "저장하고 싶은 것 ②: 나이(정수) — int age;", en: "What to store ②: age (integer) — int age;" },
      icon: "📝",
    },
    {
      code: "struct Student {\n    string name;\n    int age;\n    double score;\n};",
      highlight: { start: 50, end: 63 },
      label: { ko: "저장하고 싶은 것 ③: 점수(소수) — double score; 멤버는 원하는 만큼!", en: "What to store ③: score (decimal) — double score; add as many as you need!" },
      icon: "📝",
    },
    // ── 변수 생성: 단계별 ───────────────────────────────────────
    {
      // struct def = 67 chars (0-66), \n\n = 67-68, "Student" starts at 69
      code: "struct Student {\n    string name;\n    int age;\n    double score;\n};\n\nStudent",
      highlight:      { start: 69, end: 76 },   // 새로 나타난 "Student" 타입
      blinkHighlight: { start: 0,  end: 67 },   // 위의 struct 전체 깜빡깜빡
      label: { ko: "Student — 방금 만든 struct 이름이 새로운 타입이 됐어요!", en: "Student — the struct we just defined is now a new type!" },
      icon: "🏷️",
    },
    {
      code: "struct Student {\n    string name;\n    int age;\n    double score;\n};\n\nStudent s",
      highlight: { start: 77, end: 78 },  // "s"
      label: { ko: "변수 이름 s — Student 타입의 변수예요", en: "Variable name s — a variable of type Student" },
      icon: "📦",
    },
    {
      code: "struct Student {\n    string name;\n    int age;\n    double score;\n};\n\nStudent s = {",
      highlight: { start: 78, end: 82 },  // " = {"
      label: { ko: "= { — 중괄호 안에 멤버 순서대로 값을 넣어요. }; 로 닫아요", en: "= { — fill values in declaration order. Close with };" },
      icon: "📋",
    },
    {
      // "Kim" starts at 82 (after '{' at 81)
      code: "struct Student {\n    string name;\n    int age;\n    double score;\n};\n\nStudent s = {\"Kim\",",
      highlight:      { start: 82, end: 88 },  // '"Kim",'
      blinkHighlight: { start: 17, end: 33 },  // "    string name;" 깜빡
      label: { ko: "name = \"Kim\" ← string이니까 따옴표 필수!", en: "name = \"Kim\" ← string type needs quotes!" },
      icon: "📝",
    },
    {
      // ' 15,' starts at 88
      code: "struct Student {\n    string name;\n    int age;\n    double score;\n};\n\nStudent s = {\"Kim\", 15,",
      highlight:      { start: 88, end: 92 },  // ' 15,'
      blinkHighlight: { start: 34, end: 46 },  // "    int age;" 깜빡
      label: { ko: "age = 15 ← int이니까 따옴표 없이!", en: "age = 15 ← int type, no quotes!" },
      icon: "📝",
    },
    {
      // ' 95.5};' starts at 92
      code: "struct Student {\n    string name;\n    int age;\n    double score;\n};\n\nStudent s = {\"Kim\", 15, 95.5};",
      highlight:      { start: 92, end: 99 },  // ' 95.5};'
      blinkHighlight: { start: 47, end: 64 },  // "    double score;" 깜빡
      label: { ko: "score = 95.5 ← 순서 중요! 선언 순서와 같아야 해요", en: "score = 95.5 ← order matters! Must match declaration order" },
      icon: "📝",
    },
    {
      // s.name: s=108, .=109, name=110-113  →  blink "Student s" (69-78) + "string name;" (17-33)
      code: "struct Student {\n    string name;\n    int age;\n    double score;\n};\n\nStudent s = {\"Kim\", 15, 95.5};\ncout << s.name;   // Kim",
      highlight:      { start: 108, end: 114 },                                   // s.name 밑줄
      blinkHighlight: [{ start: 69, end: 78 }, { start: 17, end: 33 }],           // "Student s" + "string name;" 깜빡
      label: { ko: "s → 위에서 만든 변수 s, .name → struct의 name 멤버!", en: "s → variable s above, .name → the name member from the struct!" },
      icon: "✨",
    },
    {
      // s.score: s=133, .=134, score=135-139  →  blink "Student s" (69-78) + "double score;" (47-64)
      code: "struct Student {\n    string name;\n    int age;\n    double score;\n};\n\nStudent s = {\"Kim\", 15, 95.5};\ncout << s.name;   // Kim\ncout << s.score;  // 95.5",
      highlight:      { start: 133, end: 140 },                                   // s.score 밑줄
      blinkHighlight: [{ start: 69, end: 78 }, { start: 47, end: 64 }],           // "Student s" + "double score;" 깜빡
      label: { ko: "s → 같은 변수 s, .score → struct의 score 멤버!", en: "s → same variable s, .score → the score member from the struct!" },
      icon: "✨",
    },
  ],
}

const CPP_CLASS_BASIC: SyntaxBuilderPreset = {
  title: { ko: "C++ class 뼈대 만들기", en: "Building a C++ class skeleton" },
  steps: [
    {
      code: "class",
      highlight: { start: 0, end: 5 },
      label: { ko: "① class 키워드로 시작해요", en: "① Start with the class keyword" },
      icon: "🔤",
    },
    {
      code: "class Car",
      highlight: { start: 6, end: 9 },
      label: { ko: "② 이름을 붙여요. 관례상 **대문자**로 시작! (Car, Dog, Student...)", en: "② Give it a name. By convention, **start with a capital letter!** (Car, Dog, Student...)" },
      icon: "🔠",
    },
    {
      code: "class Car {\n\n}",
      highlight: { start: 10, end: 14 },
      label: { ko: "③ 중괄호 { } 로 감싸요. 안쪽에 멤버들이 들어가요", en: "③ Wrap in braces { }. Members go inside" },
      icon: "📦",
    },
    {
      code: "class Car {\n\n};",
      highlight: { start: 14, end: 15 },
      label: { ko: "④ ⚠️ 마지막에 세미콜론(;)! 빠뜨리면 컴파일 에러!", en: "④ ⚠️ Semicolon(;) at the end! Forget it → compile error!" },
      icon: "⚠️",
    },
    {
      code: "class Car {\n    double speed;\n};",
      highlight: { start: 12, end: 29 },
      label: { ko: "⑤ 중괄호 안 **위쪽**에 **멤버 변수** (예: `double speed;`)", en: "⑤ **Member variables** go at the **top** inside the braces (e.g., `double speed;`)" },
      icon: "💾",
    },
    {
      code: "class Car {\n    double speed;\n\n    void forward() {\n        speed += 10;\n    }\n};",
      highlight: { start: 30, end: 77 },
      label: { ko: "⑥ **아래쪽**에 **멤버 함수** (예: `void forward() { ... }`)", en: "⑥ **Member functions** go **below** (e.g., `void forward() { ... }`)" },
      icon: "⚙️",
    },
  ],
}

const CPP_CLASS: SyntaxBuilderPreset = {
  title: { ko: "C++ 클래스 만들기", en: "Building a C++ class" },
  steps: [
    {
      code: "class Dog {",
      highlight: { start: 0, end: 11 },
      label: { ko: "class = 설계도! '강아지란 이런 거야'를 정의", en: "class = blueprint! Define 'what a Dog is'" },
      icon: "📐",
    },
    {
      code: "class Dog {\npublic:\n    string name;",
      highlight: { start: 12, end: 35 },
      label: { ko: "public: 밖에서 볼 수 있는 데이터. name = 강아지의 이름", en: "public: visible from outside. name = the dog's name" },
      icon: "📦",
    },
    {
      code: "class Dog {\npublic:\n    string name;\n    Dog(string n) {\n        name = n;\n    }",
      highlight: { start: 36, end: 76 },
      label: { ko: "생성자 = 강아지를 만들 때 이름을 정해줘야 해요!", en: "Constructor = must give a name when creating a dog!" },
      icon: "🏗️",
    },
    {
      code: "class Dog {\npublic:\n    string name;\n    Dog(string n) {\n        name = n;\n    }\n    void bark() {\n        cout << name << \": 멍!\";\n    }",
      highlight: { start: 77, end: 128 },
      label: { ko: "멤버 함수 = 강아지가 할 수 있는 행동!", en: "Member function = actions the dog can perform!" },
      icon: "🐕",
    },
    {
      code: "class Dog {\npublic:\n    string name;\n    Dog(string n) {\n        name = n;\n    }\n    void bark() {\n        cout << name << \": 멍!\";\n    }\n};",
      highlight: { start: 129, end: 131 },
      label: { ko: "세미콜론(;)으로 클래스 끝! C++만의 규칙, 까먹으면 에러!", en: "Semicolon(;) ends the class! C++ rule — forget it and you get an error!" },
      icon: "⚠️",
    },
    {
      code: "class Dog {\npublic:\n    string name;\n    Dog(string n) {\n        name = n;\n    }\n    void bark() {\n        cout << name << \": 멍!\";\n    }\n};\n\nDog d(\"멍이\"); d.bark();",
      highlight: { start: 132, end: 157 },
      label: { ko: "설계도로 실제 강아지 만들기! d.bark()로 행동 실행!", en: "Create a real dog from the blueprint! d.bark() runs the action!" },
      icon: "✨",
    },
  ],
}

const PY_WHILE: SyntaxBuilderPreset = {
  title: { ko: "Python while 반복문 만들기", en: "Building a Python while loop" },
  steps: [
    {
      code: "while",
      highlight: { start: 0, end: 5 },
      label: { ko: "\"조건이 true인 동안 계속 반복!\" — 몇 번 돌지 모를 때 쓰세요", en: "\"Repeat while true!\" — use when you don't know how many times" },
      icon: "🔁",
    },
    {
      code: "while count < 10:",
      highlight: { start: 6, end: 17 },
      label: { ko: "count < 10이 true면 → 반복! false가 되면 → 멈춤!", en: "count < 10 is true → repeat! becomes false → stop!" },
      icon: "🤔",
    },
    {
      code: "while count < 10:\n    print(count)",
      highlight: { start: 18, end: 34 },
      label: { ko: "들여쓴 코드가 매번 실행돼요", en: "Indented code runs each time" },
      icon: "▶️",
    },
    {
      code: "while count < 10:\n    print(count)\n    count += 1   # ← 없으면 영원히 반복!",
      highlight: { start: 35, end: 73 },
      label: { ko: "⚠️ 조건을 바꿔줘야 멈춰요! 안 하면 무한루프!", en: "⚠️ Must change condition to stop! Otherwise infinite loop!" },
      icon: "⚠️",
    },
  ],
}

const PY_TRY_EXCEPT: SyntaxBuilderPreset = {
  title: { ko: "Python try/except 만들기", en: "Building Python try/except" },
  steps: [
    {
      code: "try:",
      highlight: { start: 0, end: 4 },
      label: { ko: "\"일단 해볼게! 에러나면 알려줘!\" 라는 뜻", en: "\"Let me try! Tell me if there's an error!\"" },
      icon: "🎯",
    },
    {
      code: "try:\n    result = 10 / 0",
      highlight: { start: 5, end: 24 },
      label: { ko: "위험할 수 있는 코드! 0으로 나누면 에러가 나요!", en: "Risky code! Dividing by 0 causes an error!" },
      icon: "💥",
    },
    {
      code: "try:\n    result = 10 / 0\nexcept ZeroDivisionError:",
      highlight: { start: 25, end: 51 },
      label: { ko: "에러 발생! → 프로그램 안 멈추고 여기로! 에러 종류도 지정 가능", en: "Error! → Instead of crashing, come here! Can specify error type" },
      icon: "🛡️",
    },
    {
      code: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("0으로 나눌 수 없어요!")',
      highlight: { start: 52, end: 80 },
      label: { ko: "안전하게 처리! 프로그램이 터지지 않고 계속 실행돼요", en: "Handle safely! Program continues without crashing" },
      icon: "✨",
    },
  ],
}

const PY_LIST: SyntaxBuilderPreset = {
  title: { ko: "Python 리스트 만들기", en: "Building a Python list" },
  steps: [
    {
      code: "fruits = []",
      highlight: { start: 0, end: 11 },
      label: { ko: "[ ] = 리스트! 여러 값을 순서대로 담는 상자", en: "[ ] = list! A box holding values in order" },
      icon: "📦",
    },
    {
      code: 'fruits = ["사과", "바나나", "딸기"]',
      highlight: { start: 10, end: 28 },
      label: { ko: "쉼표로 구분해서 값을 넣어요! [0]=사과, [1]=바나나...", en: "Separate with commas! [0]=apple, [1]=banana..." },
      icon: "📥",
    },
    {
      code: 'fruits = ["사과", "바나나", "딸기"]\nfruits.append("포도")',
      highlight: { start: 29, end: 48 },
      label: { ko: "append() = 맨 뒤에 추가! 리스트는 크기가 자유롭게 늘어나요", en: "append() = add to end! Lists grow freely" },
      icon: "➕",
    },
    {
      code: 'fruits = ["사과", "바나나", "딸기"]\nfruits.append("포도")\nprint(fruits[0])  # → 사과',
      highlight: { start: 49, end: 75 },
      label: { ko: "fruits[0] = 첫 번째! (0부터 시작 주의!) fruits[-1] = 마지막!", en: "[0] = first! (starts from 0!) [-1] = last!" },
      icon: "👆",
    },
  ],
}

const PY_DICT: SyntaxBuilderPreset = {
  title: { ko: "Python 딕셔너리 만들기", en: "Building a Python dictionary" },
  steps: [
    {
      code: "student = {}",
      highlight: { start: 0, end: 12 },
      label: { ko: "{ } = 딕셔너리! 이름표를 붙여서 값을 저장하는 사전", en: "{ } = dictionary! Store values with labels" },
      icon: "📖",
    },
    {
      code: 'student = {"이름": "철수"}',
      highlight: { start: 12, end: 24 },
      label: { ko: "\"이름\"이 키(이름표), \"철수\"가 값! 키로 값을 찾아요", en: "\"name\" is key (label), \"Cheolsu\" is value! Find by key" },
      icon: "🔑",
    },
    {
      code: 'student = {"이름": "철수", "나이": 15}',
      highlight: { start: 24, end: 36 },
      label: { ko: "쉼표로 여러 개 저장! 리스트와 달리 순서 대신 키로 찾아요", en: "Multiple pairs! Unlike lists, find by key not index" },
      icon: "➕",
    },
    {
      code: 'student = {"이름": "철수", "나이": 15}\nprint(student["이름"])  # → 철수',
      highlight: { start: 37, end: 68 },
      label: { ko: "student[\"이름\"] → \"철수\"! 이름표로 바로 찾기!", en: "student[\"name\"] → \"Cheolsu\"! Find directly by label!" },
      icon: "👀",
    },
    {
      code: 'student = {"이름": "철수", "나이": 15}\nprint(student["이름"])  # → 철수\nstudent["점수"] = 100  # 새 데이터 추가!',
      highlight: { start: 69, end: 103 },
      label: { ko: "없는 키를 넣으면 자동으로 추가! 있는 키면 수정!", en: "New key = add! Existing key = update!" },
      icon: "✨",
    },
  ],
}

const CPP_TERNARY: SyntaxBuilderPreset = {
  title: { ko: "if/else → 삼항 연산자 변환", en: "if/else → Ternary Operator" },
  steps: [
    {
      // Step 1: if/else 원본
      code: 'if (x > 0)\n    result = "pos";\nelse\n    result = "neg";',
      highlight: { start: 0, end: 55 },
      label: { ko: "이 if/else 4줄을 1줄로 줄일 수 있어요!", en: "We can shrink these 4 lines to just 1!" },
      icon: "🤔",
    },
    {
      // Step 2: 삼항 템플릿 등장 (result = 포함)
      code: 'if (x > 0)\n    result = "pos";\nelse\n    result = "neg";\n\nresult = ___ ? ___ : ___;',
      highlight: { start: 57, end: 82 },
      label: { ko: "삼항 연산자: result = ___ ? ___ : ___  빈칸을 if/else에서 채워볼게요!", en: "Ternary: result = ___ ? ___ : ___  Let's fill from the if/else!" },
      icon: "🗺️",
    },
    {
      // Step 3: 조건 깜빡임 (if문에서)
      code: 'if (x > 0)\n    result = "pos";\nelse\n    result = "neg";\n\nresult = ___ ? ___ : ___;',
      highlight: { start: 3, end: 10 },
      label: { ko: "👀 if 안의 조건을 보세요... 이게 어디로 갈까요?", en: "👀 Look at the condition in if... where does it go?" },
      icon: "👀",
      blink: true,
    },
    {
      // Step 4: 조건이 삼항으로 이동 (양쪽 하이라이트)
      code: 'if (x > 0)\n    result = "pos";\nelse\n    result = "neg";\n\nresult = (x > 0) ? ___ : ___;',
      highlight: [{ start: 3, end: 10 }, { start: 66, end: 73 }],
      label: { ko: "조건 (x > 0)이 → ? 물음표 앞으로!", en: "Condition (x > 0) → goes before the ?" },
      icon: "❓",
    },
    {
      // Step 5: 참값 깜빡임 (if문에서)
      code: 'if (x > 0)\n    result = "pos";\nelse\n    result = "neg";\n\nresult = (x > 0) ? ___ : ___;',
      highlight: { start: 24, end: 29 },
      label: { ko: "👀 if가 참일 때 넣는 값을 보세요...", en: "👀 Look at the value when if is true..." },
      icon: "👀",
      blink: true,
    },
    {
      // Step 6: 참값이 삼항으로 이동
      code: 'if (x > 0)\n    result = "pos";\nelse\n    result = "neg";\n\nresult = (x > 0) ? "pos" : ___;',
      highlight: [{ start: 24, end: 29 }, { start: 76, end: 81 }],
      label: { ko: "참일 때 값 \"pos\"가 → ? 바로 뒤로!", en: "True value \"pos\" → goes right after ?" },
      icon: "✅",
    },
    {
      // Step 7: 거짓값 깜빡임 (else에서)
      code: 'if (x > 0)\n    result = "pos";\nelse\n    result = "neg";\n\nresult = (x > 0) ? "pos" : ___;',
      highlight: { start: 49, end: 54 },
      label: { ko: "👀 else일 때 넣는 값을 보세요...", en: "👀 Look at the value when else..." },
      icon: "👀",
      blink: true,
    },
    {
      // Step 8: 거짓값이 삼항으로 이동
      code: 'if (x > 0)\n    result = "pos";\nelse\n    result = "neg";\n\nresult = (x > 0) ? "pos" : "neg";',
      highlight: [{ start: 49, end: 54 }, { start: 84, end: 89 }],
      label: { ko: "거짓일 때 값 \"neg\"가 → : 콜론 바로 뒤로!", en: "False value \"neg\" → goes right after :" },
      icon: "❌",
    },
    {
      // Step 9: 완성
      code: 'string result = (x > 0) ? "pos" : "neg";',
      highlight: { start: 0, end: 40 },
      label: { ko: "완성! if/else 4줄 → 깔끔한 1줄! 변수 타입까지 붙여서 선언 가능! 🎉", en: "Done! 4 lines → 1 clean line! Can declare with type too! 🎉" },
      icon: "🎉",
    },
  ],
}

// ========== 변수 선언/할당 ==========

const CPP_VARIABLE: SyntaxBuilderPreset = {
  title: { ko: "C++ 변수 선언하기", en: "Declaring a C++ Variable" },
  steps: [
    {
      code: "int",
      highlight: { start: 0, end: 3 },
      label: { ko: "먼저 자료형을 적어요 (정수 = int)", en: "Start with the data type (integer = int)" },
      icon: "📋",
    },
    {
      code: "int age",
      highlight: { start: 4, end: 7 },
      label: { ko: "변수 이름을 정해요", en: "Give it a name" },
      icon: "🏷️",
    },
    {
      code: "int age =",
      highlight: { start: 8, end: 9 },
      label: { ko: "= 으로 값을 넣어줄 준비!", en: "= sign to assign a value!" },
      icon: "👉",
    },
    {
      code: "int age = 15",
      highlight: { start: 10, end: 12 },
      label: { ko: "값을 넣어요!", en: "Put in the value!" },
      icon: "✨",
    },
    {
      code: "int age = 15;",
      highlight: { start: 12, end: 13 },
      label: { ko: "세미콜론으로 문장 끝! C++은 항상 ; 필요해요", en: "End with semicolon! C++ always needs ;" },
      icon: "🔚",
    },
  ],
}

const PY_VARIABLE: SyntaxBuilderPreset = {
  title: { ko: "Python 변수 만들기", en: "Creating a Python Variable" },
  steps: [
    {
      code: "age",
      highlight: { start: 0, end: 3 },
      label: { ko: "변수 이름을 적어요 (자료형 필요 없음!)", en: "Write the variable name (no type needed!)" },
      icon: "🏷️",
    },
    {
      code: "age =",
      highlight: { start: 4, end: 5 },
      label: { ko: "= 으로 값을 넣어줄 준비!", en: "= sign to assign a value!" },
      icon: "👉",
    },
    {
      code: "age = 15",
      highlight: { start: 6, end: 8 },
      label: { ko: "값을 넣으면 끝! 세미콜론도 필요 없어요", en: "Assign the value — done! No semicolon needed" },
      icon: "✨",
    },
  ],
}

// ========== 출력 (cout / print) ==========

const CPP_COUT: SyntaxBuilderPreset = {
  title: { ko: "C++ 출력 (cout) 만들기", en: "Building C++ Output (cout)" },
  steps: [
    {
      code: "cout",
      highlight: { start: 0, end: 4 },
      label: { ko: "cout = \"C-out\" = 화면에 출력!", en: "cout = \"C-out\" = print to screen!" },
      icon: "📢",
    },
    {
      code: "cout <<",
      highlight: { start: 5, end: 7 },
      label: { ko: "<< 는 \"이걸 보내줘!\" 라는 뜻", en: "<< means \"send this!\"" },
      icon: "👉",
    },
    {
      code: 'cout << "Hello!"',
      highlight: { start: 8, end: 16 },
      label: { ko: "출력할 내용을 큰따옴표로 감싸요", en: "Wrap the text in double quotes" },
      icon: "💬",
    },
    {
      code: 'cout << "Hello!" << endl',
      highlight: { start: 17, end: 24 },
      label: { ko: "<< endl 로 줄바꿈! (enter 키 효과)", en: "<< endl for a new line! (like pressing Enter)" },
      icon: "↩️",
    },
    {
      code: 'cout << "Hello!" << endl;',
      highlight: { start: 24, end: 25 },
      label: { ko: "세미콜론으로 마무리!", en: "End with semicolon!" },
      icon: "🔚",
    },
  ],
}

const PY_PRINT: SyntaxBuilderPreset = {
  title: { ko: "Python 출력 (print) 만들기", en: "Building Python Output (print)" },
  steps: [
    {
      code: "print",
      highlight: { start: 0, end: 5 },
      label: { ko: "print = 화면에 출력하는 함수!", en: "print = function to output to screen!" },
      icon: "📢",
    },
    {
      code: "print()",
      highlight: { start: 5, end: 7 },
      label: { ko: "괄호 안에 출력할 내용을 넣어요", en: "Put content inside parentheses" },
      icon: "🫧",
    },
    {
      code: 'print("Hello!")',
      highlight: { start: 6, end: 14 },
      label: { ko: "문자열은 따옴표로 감싸요. 끝! 줄바꿈은 자동!", en: "Wrap text in quotes. Done! Newline is automatic!" },
      icon: "✨",
    },
  ],
}

// ========== 입력 (cin / input) ==========

const CPP_CIN: SyntaxBuilderPreset = {
  title: { ko: "C++ 입력 (cin) 만들기", en: "Building C++ Input (cin)" },
  steps: [
    {
      code: "int age;",
      highlight: { start: 0, end: 8 },
      label: { ko: "먼저 값을 저장할 변수를 만들어요", en: "First, create a variable to store the value" },
      icon: "📦",
    },
    {
      code: "int age;\ncin",
      highlight: { start: 9, end: 12 },
      label: { ko: "cin = C-in = 키보드에서 입력받기!", en: "cin = C-in = get input from keyboard!" },
      icon: "⌨️",
    },
    {
      code: "int age;\ncin >>",
      highlight: { start: 13, end: 15 },
      label: { ko: ">> = '입력을 이쪽으로 보내줘!' (cout의 <<와 반대 방향!)", en: ">> = 'send input this way!' (opposite direction of cout's <<)" },
      icon: "👉",
    },
    {
      code: "int age;\ncin >> age;",
      highlight: { start: 16, end: 20 },
      label: { ko: "키보드에서 입력한 값 → age 변수에 저장!", en: "Value from keyboard → stored in age variable!" },
      icon: "📥",
    },
    {
      code: "int age;\ncin >> age;\ncout << age;  // 키보드 → age → 화면",
      highlight: { start: 21, end: 56 },
      label: { ko: "입력받은 값을 출력! 키보드 → age → 화면", en: "Print the input! Keyboard → age → screen" },
      icon: "✨",
    },
  ],
}

const PY_INPUT: SyntaxBuilderPreset = {
  title: { ko: "Python 입력 (input) 만들기", en: "Building Python Input (input)" },
  steps: [
    {
      code: "input()",
      highlight: { start: 0, end: 7 },
      label: { ko: "input() = 키보드에서 입력 받기!", en: "input() = get keyboard input!" },
      icon: "⌨️",
    },
    {
      code: 'input("나이: ")',
      highlight: { start: 6, end: 13 },
      label: { ko: "괄호 안에 안내 메시지를 넣을 수 있어요", en: "You can put a prompt message inside" },
      icon: "💬",
    },
    {
      code: 'age = input("나이: ")',
      highlight: { start: 0, end: 6 },
      label: { ko: "변수에 저장하면 끝! (항상 문자열로 받아요)", en: "Store in a variable — done! (always returns a string)" },
      icon: "✨",
    },
  ],
}

// ========== C++ string ==========

const CPP_STRING: SyntaxBuilderPreset = {
  title: { ko: "C++ 문자열 (string) 만들기", en: "Building a C++ String" },
  steps: [
    {
      code: "#include <string>",
      highlight: { start: 0, end: 17 },
      label: { ko: "#include = '이 도구를 가져와!' string 기능을 쓰려면 필수", en: "#include = 'bring this tool!' Required to use string features" },
      icon: "📦",
    },
    {
      code: "#include <string>\n\nstring",
      highlight: { start: 19, end: 25 },
      label: { ko: "string = 글자들의 묶음! int(숫자)처럼 자료형이에요", en: "string = a bundle of characters! A data type like int(number)" },
      icon: "📋",
    },
    {
      code: '#include <string>\n\nstring name',
      highlight: { start: 26, end: 30 },
      label: { ko: "변수 이름 짓기: 뭘 저장할지 알 수 있게!", en: "Name your variable: make it clear what it stores!" },
      icon: "🏷️",
    },
    {
      code: '#include <string>\n\nstring name = "Hello";',
      highlight: { start: 31, end: 42 },
      label: { ko: "큰따옴표로 감싸서 값을 넣어요! (char는 작은따옴표)", en: "Use double quotes for the value! (char uses single quotes)" },
      icon: "💬",
    },
    {
      code: '#include <string>\n\nstring name = "Hello";\ncout << name;  // Hello',
      highlight: { start: 43, end: 67 },
      label: { ko: "일반 변수처럼 출력, 비교, 연산 다 가능!", en: "Print, compare, operate — just like regular variables!" },
      icon: "✨",
    },
  ],
}

// ========== C++ do-while ==========

const CPP_DO_WHILE: SyntaxBuilderPreset = {
  title: { ko: "C++ do-while문 만들기", en: "Building a C++ do-while Loop" },
  steps: [
    {
      code: "do",
      highlight: { start: 0, end: 2 },
      label: { ko: "\"일단 해!\" — do로 시작해요", en: "\"Just do it!\" — start with do" },
      icon: "🏃",
    },
    {
      code: "do {\n\n}",
      highlight: { start: 3, end: 7 },
      label: { ko: "중괄호 안에 실행할 코드를 넣어요", en: "Put the code to run inside braces" },
      icon: "📦",
    },
    {
      code: 'do {\n  cout << "Hello!" << endl;\n}',
      highlight: { start: 6, end: 30 },
      label: { ko: "먼저 한 번 실행하고...", en: "Run this first, then..." },
      icon: "▶️",
    },
    {
      code: 'do {\n  cout << "Hello!" << endl;\n} while',
      highlight: { start: 32, end: 37 },
      label: { ko: "그 다음에 조건을 확인해요!", en: "Then check the condition!" },
      icon: "🔄",
    },
    {
      code: 'do {\n  cout << "Hello!" << endl;\n} while (count < 5);',
      highlight: { start: 38, end: 51 },
      label: { ko: "조건이 참이면 다시 반복! (세미콜론 필수!)", en: "If true, loop again! (semicolon required!)" },
      icon: "🔚",
    },
  ],
}

// ========== C++ 이스케이프 문자 ==========

const CPP_ESCAPE: SyntaxBuilderPreset = {
  title: { ko: "C++ 이스케이프 문자 배우기", en: "Learning C++ Escape Characters" },
  steps: [
    {
      code: 'cout << "Hello\\nWorld";',
      highlight: { start: 14, end: 16 },
      label: { ko: "\\n = 줄바꿈! Hello 다음에 줄이 바뀌어요", en: "\\n = newline! Line breaks after Hello" },
      icon: "↩️",
    },
    {
      code: 'cout << "이름\\t나이";',
      highlight: { start: 14, end: 16 },
      label: { ko: "\\t = 탭! 깔끔하게 간격을 맞춰요", en: "\\t = tab! Neatly align spacing" },
      icon: "➡️",
    },
    {
      code: 'cout << "\\"안녕\\"";',
      highlight: { start: 9, end: 17 },
      label: { ko: "\\\" = 큰따옴표를 글자로! \\\\로 특수문자를 표시해요", en: "\\\" = literal quote! Use \\\\ to show special characters" },
      icon: "💬",
    },
    {
      code: 'cout << "Hello\\nWorld" << endl;\ncout << "이름\\t나이" << endl;\ncout << "\\"안녕\\"" << endl;\n// 출력:\n// Hello\n// World\n// 이름    나이\n// "안녕"',
      highlight: { start: 0, end: 131 },
      label: { ko: "전부 모으면 이렇게! \\n, \\t, \\\"를 기억하세요", en: "All together! Remember \\n, \\t, \\\"" },
      icon: "🎯",
    },
  ],
}

// ========== C++ char vs string ==========

const CPP_CHAR: SyntaxBuilderPreset = {
  title: { ko: "C++ char vs string 구분하기", en: "C++ char vs string" },
  steps: [
    {
      code: "char grade = 'A';",
      highlight: { start: 0, end: 17 },
      label: { ko: "작은따옴표 = 글자 딱 하나! (char)", en: "Single quotes = exactly one character! (char)" },
      icon: "🔤",
    },
    {
      code: "char grade = 'A';\nstring name = \"Alice\";",
      highlight: { start: 18, end: 40 },
      label: { ko: "큰따옴표 = 글자 여러개! (string)", en: "Double quotes = multiple characters! (string)" },
      icon: "📝",
    },
    {
      code: "// 'A'  → char   (1바이트, 글자 1개)\n// \"A\"  → string (문자열 객체!)\n// 같아 보이지만 완전히 다른 타입!",
      highlight: { start: 0, end: 82 },
      label: { ko: "같아 보이지만 완전히 다른 타입! 'A'는 char, \"A\"는 string", en: "They look the same but are totally different types!" },
      icon: "⚠️",
    },
    {
      code: "char grade = 'A';\nif (grade == 'A') {\n    cout << \"최고 등급!\";\n}",
      highlight: { start: 18, end: 55 },
      label: { ko: "char 비교할 때도 작은따옴표! grade == 'A'", en: "Compare char with single quotes too! grade == 'A'" },
      icon: "✅",
    },
  ],
}

// ========== C++ 타입 변환 ==========

const CPP_TYPE_CONVERT: SyntaxBuilderPreset = {
  title: { ko: "C++ 타입 변환 (stoi, stod, to_string)", en: "C++ Type Conversion (stoi, stod, to_string)" },
  steps: [
    {
      code: "// \"42\" + 10 → 에러!\n// string + int = 안 돼요!",
      highlight: { start: 0, end: 46 },
      label: { ko: "문자열 \"42\"와 숫자 10은 바로 더할 수 없어요! 타입이 달라요", en: "String \"42\" and number 10 can't be added! Different types" },
      icon: "❌",
    },
    {
      code: "stoi(\"42\")   // → 42 (정수)",
      highlight: { start: 0, end: 27 },
      label: { ko: "stoi = string to int! 문자열 → 정수로 변환", en: "stoi = string to int! Convert string → integer" },
      icon: "🔢",
    },
    {
      code: "stod(\"3.14\")  // → 3.14 (소수)",
      highlight: { start: 0, end: 30 },
      label: { ko: "stod = string to double! 문자열 → 소수로 변환", en: "stod = string to double! Convert string → decimal" },
      icon: "🔢",
    },
    {
      code: "to_string(42)  // → \"42\" (문자열)",
      highlight: { start: 0, end: 33 },
      label: { ko: "to_string = 반대로! 숫자 → 문자열로 변환", en: "to_string = reverse! Convert number → string" },
      icon: "🔄",
    },
    {
      code: "string input = \"100\";\nint num = stoi(input);\nint result = num + 50;\ncout << result;  // → 150",
      highlight: { start: 0, end: 89 },
      label: { ko: "문자열 입력 → stoi로 숫자 변환 → 계산 가능!", en: "String input → stoi to number → now you can calculate!" },
      icon: "✨",
    },
  ],
}

// ========== C++ 정수 나눗셈 ==========

const CPP_INT_DIVISION: SyntaxBuilderPreset = {
  title: { ko: "C++ 정수 나눗셈의 함정", en: "C++ Integer Division Trap" },
  steps: [
    {
      code: "// Python: 7 / 2 = 3.5\n// C++:    7 / 2 = ???",
      highlight: { start: 0, end: 45 },
      label: { ko: "Python에서 7/2는 3.5! 하지만 C++에서는...?", en: "In Python 7/2 is 3.5! But in C++...?" },
      icon: "🤔",
    },
    {
      code: "int a = 7 / 2;   // → 3 (0.5는 버림!)\n// int ÷ int = int! 소수점은 사라져요",
      highlight: { start: 0, end: 63 },
      label: { ko: "정수 ÷ 정수 = 정수! 소수점은 버려요! 7/2 = 3", en: "int / int = int! Decimal is dropped! 7/2 = 3" },
      icon: "✂️",
    },
    {
      code: "double b = 7.0 / 2;  // → 3.5",
      highlight: { start: 0, end: 30 },
      label: { ko: "하나라도 double이면 → 결과도 double! = 3.5", en: "If either is double → result is double! = 3.5" },
      icon: "✅",
    },
    {
      code: "double c = (double)7 / 2;  // → 3.5",
      highlight: { start: 11, end: 20 },
      label: { ko: "(double) = 강제 형변환! 정수를 double로 바꿔서 계산", en: "(double) = cast! Convert int to double before dividing" },
      icon: "🔄",
    },
    {
      code: "int sum = 17;\nint count = 5;\ndouble avg = (double)sum / count;\n// avg = 3.4  (17 ÷ 5)",
      highlight: { start: 0, end: 82 },
      label: { ko: "자주 쓰는 패턴! 평균 구할 때 꼭 (double)로 변환하세요", en: "Common pattern! Always cast to (double) when calculating averages" },
      icon: "🎯",
    },
  ],
}

// ========== C++ else if ==========

const CPP_ELSE_IF: SyntaxBuilderPreset = {
  title: { ko: "C++ else if / else 체이닝", en: "Building C++ else if / else chain" },
  steps: [
    {
      code: "if (score >= 90) {\n    cout << \"A\";\n}",
      highlight: { start: 0, end: 37 },
      label: { ko: "첫 번째 조건! 90점 이상이면 A!", en: "First condition! 90 or above gets A!" },
      icon: "🥇",
    },
    {
      code: "if (score >= 90) {\n    cout << \"A\";\n} else if (score >= 80) {\n    cout << \"B\";\n}",
      highlight: { start: 38, end: 79 },
      label: { ko: "첫 번째가 false면 → 두 번째 조건 확인! 80점 이상이면 B", en: "If first is false → check second! 80 or above gets B" },
      icon: "🥈",
    },
    {
      code: "if (score >= 90) {\n    cout << \"A\";\n} else if (score >= 80) {\n    cout << \"B\";\n} else if (score >= 70) {\n    cout << \"C\";\n}",
      highlight: { start: 80, end: 122 },
      label: { ko: "계속 이어서 조건 체크 가능! 70점 이상이면 C", en: "Keep chaining conditions! 70 or above gets C" },
      icon: "🥉",
    },
    {
      code: "if (score >= 90) {\n    cout << \"A\";\n} else if (score >= 80) {\n    cout << \"B\";\n} else if (score >= 70) {\n    cout << \"C\";\n} else {\n    cout << \"F\";\n}",
      highlight: { start: 123, end: 155 },
      label: { ko: "위의 모든 조건이 false면 → else 실행! 나머지는 전부 F", en: "If ALL above are false → else runs! Everything else gets F" },
      icon: "🔚",
    },
    {
      code: "// score = 85일 때:\nif (score >= 90) {       // 85>=90? NO\n    cout << \"A\";\n} else if (score >= 80) { // 85>=80? YES!\n    cout << \"B\";          // → \"B\" 출력!\n}",
      highlight: { start: 0, end: 156 },
      label: { ko: "score=85 → 90이상? NO → 80이상? YES! → B 출력!", en: "score=85 → >=90? NO → >=80? YES! → prints B!" },
      icon: "🎯",
    },
  ],
}

// ========== C++ vector ==========

const CPP_VECTOR: SyntaxBuilderPreset = {
  title: { ko: "C++ vector 기초", en: "C++ vector Basics" },
  steps: [
    {
      code: "vector<int> v;",
      highlight: { start: 0, end: 14 },
      label: { ko: "크기가 자유로운 배열! <int> = 정수를 담아요", en: "Flexible array! <int> = holds integers" },
      icon: "📦",
    },
    {
      code: "vector<int> v;\nv.push_back(10);",
      highlight: { start: 15, end: 31 },
      label: { ko: "뒤에 추가! 배열과 달리 크기가 자동으로 늘어나요", en: "Add to back! Unlike arrays, size grows automatically" },
      icon: "➕",
    },
    {
      code: "vector<int> v;\nv.push_back(10);\nv.push_back(20);\nv.push_back(30);\n// v = {10, 20, 30}",
      highlight: { start: 32, end: 84 },
      label: { ko: "계속 추가! v = {10, 20, 30}", en: "Keep adding! v = {10, 20, 30}" },
      icon: "📥",
    },
    {
      code: "cout << v[0];   // → 10\ncout << v.size(); // → 3",
      highlight: { start: 0, end: 48 },
      label: { ko: "[0]으로 접근, .size()로 크기 확인! 배열처럼 써요", en: "Access with [0], check size with .size()!" },
      icon: "👆",
    },
    {
      code: "v.pop_back();\n// v = {10, 20}  ← 30이 빠졌어요!",
      highlight: { start: 0, end: 46 },
      label: { ko: "맨 뒤 제거! v = {10, 20}. push_back의 반대!", en: "Remove last! v = {10, 20}. Opposite of push_back!" },
      icon: "🗑️",
    },
  ],
}

// ========== C++ range-based for ==========

const CPP_RANGE_FOR: SyntaxBuilderPreset = {
  title: { ko: "C++ 범위 기반 for 루프", en: "C++ Range-based for Loop" },
  steps: [
    {
      code: "// 옛날 방식:\nfor (int i = 0; i < v.size(); i++)\n    cout << v[i];",
      highlight: { start: 0, end: 55 },
      label: { ko: "매번 이렇게 길게 써야 했어요... 더 짧은 방법이 있다면?", en: "Had to write this long code every time... What if there's a shorter way?" },
      icon: "😩",
    },
    {
      code: "for (int x : v)\n    cout << x;",
      highlight: { start: 0, end: 15 },
      label: { ko: "새로운 방법! v에서 하나씩 꺼내서 x에 넣어줘요", en: "New way! Takes each item from v and puts it in x" },
      icon: "✨",
    },
    {
      code: "for (int x : v)\n    cout << x;",
      highlight: { start: 5, end: 9 },
      label: { ko: "타입을 직접 써줘요. v의 원소 타입이 int니까 int x!",  en: "Write the type directly. Elements are int, so int x!" },
      icon: "📦",
    },
  ],
}

// ========== C++ auto ==========

const CPP_AUTO: SyntaxBuilderPreset = {
  title: { ko: "C++ auto 키워드", en: "C++ auto Keyword" },
  steps: [
    {
      code: "int x = 42;",
      highlight: { start: 0, end: 3 },
      label: { ko: "지금까지 타입을 직접 썼어요 (int, double, string...)", en: "Until now we wrote types manually (int, double, string...)" },
      icon: "✍️",
    },
    {
      code: "auto x = 42;   // auto → int",
      highlight: { start: 0, end: 4 },
      label: { ko: "auto = 컴파일러가 알아서 타입을 정해줘요! (42니까 int!)", en: "auto = compiler decides the type! (42 so it's int!)" },
      icon: "🤖",
    },
    {
      code: "auto name = string(\"Hello\");  // auto → string",
      highlight: { start: 0, end: 47 },
      label: { ko: "string도 자동! 길고 복잡한 타입일수록 편해요", en: "Works with string too! More convenient for long types" },
      icon: "📝",
    },
    {
      code: "vector<int> nums = {1, 2, 3};\nfor (auto x : nums)\n    cout << x;  // auto → int",
      highlight: { start: 0, end: 67 },
      label: { ko: "range-for에서도 auto! nums가 vector<int>니까 x는 int로 추론돼요", en: "auto in range-for! nums is vector<int> so x becomes int" },
      icon: "🎯",
    },
  ],
}

// ========== C++ 참조(별명) ==========

const CPP_REFERENCE: SyntaxBuilderPreset = {
  title: { ko: "C++ 참조(별명) 이해하기", en: "Understanding C++ References" },
  steps: [
    {
      code: "int x = 42;",
      highlight: { start: 0, end: 11 },
      label: { ko: "변수 x에 42가 저장되어 있어요", en: "Variable x stores 42" },
      icon: "📦",
    },
    {
      code: "int x = 42;\nint& ref = x;",
      highlight: { start: 12, end: 25 },
      label: { ko: "& = 별명! ref는 x의 다른 이름이에요 (복사가 아님!)", en: "& = alias! ref is another name for x (not a copy!)" },
      icon: "🏷️",
    },
    {
      code: "int x = 42;\nint& ref = x;\nref = 100;",
      highlight: { start: 26, end: 36 },
      label: { ko: "ref를 바꾸면 x도 바뀌어요! (같은 것이니까)", en: "Change ref and x changes too! (they're the same thing)" },
      icon: "🔗",
    },
    {
      code: "int x = 42;\nint& ref = x;\nref = 100;\ncout << x;  // → 100!",
      highlight: { start: 37, end: 58 },
      label: { ko: "x를 출력하면 100! ref와 x는 완전히 같은 것이에요", en: "Print x and get 100! ref and x are the exact same thing" },
      icon: "✨",
    },
  ],
}

// ========== C++ 값 전달 vs 참조 전달 ==========

const CPP_CALL_BY_REF: SyntaxBuilderPreset = {
  title: { ko: "C++ 값 전달 vs 참조 전달", en: "C++ Call by Value vs Reference" },
  steps: [
    {
      code: "void addOne(int n) {\n    n++;\n}",
      highlight: { start: 0, end: 30 },
      label: { ko: "값 복사! 함수 안에서 n을 바꿔도 원본은 안 변해요", en: "Copy! Changing n inside the function doesn't affect the original" },
      icon: "📋",
    },
    {
      code: "int x = 5;\naddOne(x);\ncout << x;  // → 5 (안 변함!)",
      highlight: { start: 0, end: 43 },
      label: { ko: "복사본만 바뀌고 원본은 그대로! x는 여전히 5", en: "Only the copy changed! x is still 5" },
      icon: "😐",
    },
    {
      code: "void addOne(int& n) {\n    n++;\n}",
      highlight: { start: 12, end: 18 },
      label: { ko: "&를 붙이면 원본을 직접 바꿔요! 복사가 아니라 별명!", en: "Add & to modify the original! Not a copy, but an alias!" },
      icon: "🔗",
    },
    {
      code: "int x = 5;\naddOne(x);   // &n = x의 별명\ncout << x;   // → 6!",
      highlight: { start: 0, end: 52 },
      label: { ko: "원본이 바뀌었어요! x가 6! 이게 참조 전달의 힘!", en: "Original changed! x is 6! That's the power of pass by reference!" },
      icon: "✨",
    },
  ],
}

// ========== C++ public/private ==========

const CPP_PUBLIC_PRIVATE: SyntaxBuilderPreset = {
  title: { ko: "C++ public vs private", en: "C++ public vs private" },
  steps: [
    {
      code: "class Dog {\n\n};",
      highlight: { start: 0, end: 14 },
      label: { ko: "클래스 안에는 두 구역이 있어요: public과 private", en: "Inside a class there are two zones: public and private" },
      icon: "🏠",
    },
    {
      code: "class Dog {\nprivate:\n    int age;\n};",
      highlight: { start: 12, end: 31 },
      label: { ko: "private = 비밀! 클래스 밖에서 절대 접근 불가", en: "private = secret! Cannot access from outside the class" },
      icon: "🔒",
    },
    {
      code: "class Dog {\nprivate:\n    int age;\npublic:\n    string name;\n};",
      highlight: { start: 32, end: 55 },
      label: { ko: "public = 공개! 밖에서 자유롭게 사용할 수 있어요", en: "public = open! Can be used freely from outside" },
      icon: "🔓",
    },
    {
      code: "Dog d;\nd.name = \"멍이\";  // OK!",
      highlight: { start: 0, end: 28 },
      label: { ko: "public이니까 OK! 밖에서 이름을 설정할 수 있어요", en: "It's public so OK! Can set the name from outside" },
      icon: "✅",
    },
    {
      code: "Dog d;\nd.age = 3;  // ERROR!\n// private이니까 밖에서 접근 불가!\n// getter/setter 함수로만 접근해요",
      highlight: { start: 0, end: 78 },
      label: { ko: "private이니까 에러! getter/setter 함수로만 접근해야 해요", en: "It's private so ERROR! Must use getter/setter functions" },
      icon: "❌",
    },
  ],
}

const CPP_BRACE_TRAP: SyntaxBuilderPreset = {
  title: { ko: "중괄호 함정 알아보기", en: "The Curly Brace Trap" },
  steps: [
    {
      code: "if (score >= 90)\n    cout << \"A등급!\";\n    cout << \"축하!\";",
      highlight: { start: 0, end: 55 },
      label: { ko: "❌ 중괄호가 없으면? 들여쓰기만 했는데... 둘 다 실행될까?", en: "❌ No braces? Just indented... will both lines run?" },
      icon: "🤔",
    },
    {
      code: "if (score >= 90)\n    cout << \"A등급!\";   // ← if에 속함\n    cout << \"축하!\";   // ← 항상 실행됨!",
      highlight: { start: 36, end: 95 },
      label: { ko: "중괄호 없으면 딱 한 줄만 if에 속해요! 두 번째 줄은 항상 실행!", en: "Without braces, only ONE line belongs to if! Second line ALWAYS runs!" },
      icon: "😱",
    },
    {
      code: "if (score >= 90) {\n    cout << \"A등급!\";\n    cout << \"축하!\";\n}",
      highlight: { start: 17, end: 60 },
      label: { ko: "✅ 중괄호를 쓰면 안전! { } 안의 코드는 전부 if에 속해요", en: "✅ With braces, safe! All code inside { } belongs to if" },
      icon: "🛡️",
    },
    {
      code: "// 💡 여러 줄이면 반드시 중괄호!\nif (score >= 90) {\n    cout << \"A등급!\";\n    cout << \"축하!\";\n}",
      highlight: { start: 0, end: 33 },
      label: { ko: "💡 한 줄이면 중괄호 생략 가능, 여러 줄이면 반드시 { }로 감싸세요!", en: "💡 One line can skip braces, but multiple lines NEED { }!" },
      icon: "✨",
    },
  ],
}

const CPP_CONSTRUCTOR: SyntaxBuilderPreset = {
  title: { ko: "C++ 생성자 만들기", en: "Building a C++ Constructor" },
  steps: [
    {
      code: "BankAccount",
      highlight: { start: 0, end: 11 },
      label: { ko: "이름은 클래스 이름 그대로! void나 int 같은 리턴 타입이 없어요", en: "Name = class name exactly! No return type like void or int!" },
      icon: "🏷️",
    },
    {
      code: "BankAccount()",
      highlight: { start: 11, end: 13 },
      label: { ko: "괄호 안에 받을 초기값을 쓸 거예요. 없으면 그냥 빈 괄호 ( )도 돼요!", en: "Initial values go inside. If you don't need any, just leave it empty ( )!" },
      icon: "🫧",
    },
    {
      code: "BankAccount(string name, double initial)",
      highlight: { start: 12, end: 39 },
      label: { ko: "초기값을 파라미터로 받아요! 객체 만들 때 이 값들이 전달돼요", en: "Receive initial values as parameters! These get passed when creating an object" },
      icon: "📥",
    },
    {
      code: "BankAccount(string name, double initial) {\n    owner = name;\n    balance = initial;\n}",
      highlight: { start: 40, end: 85 },
      label: { ko: "받은 값을 멤버변수에 저장! 객체가 태어나는 순간 초기화 완료!", en: "Store received values into member variables! Initialized the moment the object is created!" },
      icon: "📦",
    },
    {
      code: "BankAccount(string name, double initial) {\n    owner = name;\n    balance = initial;\n}\n\nBankAccount acc(\"김철수\", 1000);",
      highlight: { start: 87, end: 116 },
      label: { ko: "BankAccount acc(\"김철수\", 1000) → 생성자 자동 호출! 초기값이 바로 세팅돼요", en: "BankAccount acc(\"Alice\", 1000) → constructor called automatically! Values set instantly" },
      icon: "✨",
    },
  ],
}

// ── struct 배열 만들기 ──────────────────────────────────────────────────────
// struct def = 53 chars (0-52):
//   "struct Student {\n    string name;\n    int score;\n};\n\n"
//   string name; = 17-32, int score; = 34-47
// Array part starts at 53:
//   Student(53-59)  students(61-68)  [3](69-71)  = {(72-75)
//   element 0: {…김철수…95}, = 81-92  (77-93 with indent+\n)
//   element 1: {…이영희…87}, = 98-109 (94-110 with indent+\n)
//   element 2: {…박민준…72}, = 115-126 (111-127 with indent+\n)
//   }; = 128-129
const CPP_STRUCT_ARRAY: SyntaxBuilderPreset = {
  title: { ko: "struct 배열 만들기", en: "Creating a struct Array" },
  steps: [
    {
      code: "struct Student {\n    string name;\n    int score;\n};\n\nStudent",
      highlight:      { start: 53, end: 60 },   // "Student" 타입
      blinkHighlight: { start: 0,  end: 51 },   // struct 정의 전체 깜빡
      label: { ko: "Student — 바로 위 struct 이름이 새로운 타입이에요!", en: "Student — the struct name above becomes a new type!" },
      icon: "🏷️",
    },
    {
      code: "struct Student {\n    string name;\n    int score;\n};\n\nStudent students",
      highlight: { start: 60, end: 69 },  // " students"
      label: { ko: "변수 이름 students — 여러 명이니까 복수형!", en: "Variable name students — plural because it holds many!" },
      icon: "📦",
    },
    {
      code: "struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3]",
      highlight: { start: 69, end: 72 },  // "[3]"
      label: { ko: "[3] — Student를 3개 담는 배열! 숫자 바꾸면 크기 변경 가능", en: "[3] — array that holds 3 Students! Change the number for different size" },
      icon: "📊",
    },
    {
      code: "struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {",
      highlight: { start: 72, end: 76 },  // " = {"
      label: { ko: "= { — 각 칸에 Student를 {}로 하나씩 채워요", en: "= { — fill each slot with one Student using {}" },
      icon: "📋",
    },
    {
      // indent(77-80) + {"김철수", 95}, = 81-92
      code: "struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {\"김철수\", 95},",
      highlight:      { start: 77, end: 93 },                         // 첫 번째 원소
      blinkHighlight: [{ start: 17, end: 34 }, { start: 34, end: 49 }], // name + score 멤버 깜빡
      label: { ko: "students[0] → {\"김철수\", 95} — name 자리에 이름, score 자리에 점수!", en: "students[0] → {\"김철수\", 95} — name slot then score slot!" },
      icon: "📝",
    },
    {
      // indent(94-97) + {"이영희", 87}, = 98-109
      code: "struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {\"김철수\", 95},\n    {\"이영희\", 87},",
      highlight:      { start: 94, end: 111 },                         // 두 번째 원소
      blinkHighlight: [{ start: 17, end: 34 }, { start: 34, end: 49 }],
      label: { ko: "students[1] → {\"이영희\", 87} — 같은 형식으로 두 번째 학생!", en: "students[1] → {\"이영희\", 87} — second student, same format!" },
      icon: "📝",
    },
    {
      // indent(111-114) + {"박민준", 72}, = 115-126
      code: "struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {\"김철수\", 95},\n    {\"이영희\", 87},\n    {\"박민준\", 72},",
      highlight:      { start: 111, end: 128 },                        // 세 번째 원소
      blinkHighlight: [{ start: 17, end: 34 }, { start: 34, end: 49 }],
      label: { ko: "students[2] → {\"박민준\", 72} — 세 번째! 배열 꽉 찼어요 (크기 [3])", en: "students[2] → {\"박민준\", 72} — third and last! Array is full ([3])" },
      icon: "📝",
    },
    {
      code: "struct Student {\n    string name;\n    int score;\n};\n\nStudent students[3] = {\n    {\"김철수\", 95},\n    {\"이영희\", 87},\n    {\"박민준\", 72},\n};",
      highlight: { start: 128, end: 131 },  // "};"
      label: { ko: "}; — 배열 완성! students[0]·[1]·[2]에 Student가 하나씩 들어갔어요", en: "}; — Array complete! Each slot students[0]·[1]·[2] holds one Student" },
      icon: "✅",
    },
  ],
}

// 프리셋 매핑
const PRESETS: Record<string, SyntaxBuilderPreset> = {
  "cpp-if": CPP_IF,
  "cpp-for": CPP_FOR,
  "cpp-while": CPP_WHILE,
  "cpp-function": CPP_FUNCTION,
  "cpp-ternary": CPP_TERNARY,
  "cpp-switch": CPP_SWITCH,
  "cpp-array": CPP_ARRAY,
  "cpp-pointer": CPP_POINTER,
  "cpp-struct": CPP_STRUCT,
  "cpp-class": CPP_CLASS,
  "cpp-class-basic": CPP_CLASS_BASIC,
  "cpp-variable": CPP_VARIABLE,
  "cpp-cout": CPP_COUT,
  "cpp-cin": CPP_CIN,
  "cpp-string": CPP_STRING,
  "cpp-do-while": CPP_DO_WHILE,
  "cpp-escape": CPP_ESCAPE,
  "cpp-char": CPP_CHAR,
  "cpp-type-convert": CPP_TYPE_CONVERT,
  "cpp-int-division": CPP_INT_DIVISION,
  "cpp-else-if": CPP_ELSE_IF,
  "cpp-vector": CPP_VECTOR,
  "cpp-range-for": CPP_RANGE_FOR,
  "cpp-auto": CPP_AUTO,
  "cpp-reference": CPP_REFERENCE,
  "cpp-call-by-ref": CPP_CALL_BY_REF,
  "cpp-public-private": CPP_PUBLIC_PRIVATE,
  "cpp-brace-trap": CPP_BRACE_TRAP,
  "cpp-constructor": CPP_CONSTRUCTOR,
  "cpp-struct-array": CPP_STRUCT_ARRAY,
  "py-if": PY_IF,
  "py-for": PY_FOR,
  "py-while": PY_WHILE,
  "py-function": PY_FUNCTION,
  "py-class": PY_CLASS,
  "py-try-except": PY_TRY_EXCEPT,
  "py-list": PY_LIST,
  "py-dict": PY_DICT,
  "py-variable": PY_VARIABLE,
  "py-print": PY_PRINT,
  "py-input": PY_INPUT,
}

// ========== 컴포넌트 ==========

// ── 타이핑되는 주석 설명 ────────────────────────────────────────
function TypewriterComment({ text, icon, stepKey }: { text: string; icon?: string; stepKey: number }) {
  const [displayed, setDisplayed] = useState("")
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setDisplayed("")
    if (timerRef.current) clearInterval(timerRef.current)
    if (startRef.current) clearTimeout(startRef.current)

    startRef.current = setTimeout(() => {
      let i = 0
      timerRef.current = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length && timerRef.current) clearInterval(timerRef.current)
      }, 22)
    }, 280)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (startRef.current) clearTimeout(startRef.current)
    }
  }, [stepKey, text])

  const isDone = displayed.length >= text.length

  return (
    <div className="px-5 pb-5 font-mono text-xs flex items-center gap-1.5 text-emerald-400/80">
      <span className="opacity-50 select-none">{"//"}</span>
      {icon && <span className="text-sm leading-none">{icon}</span>}
      <span>{displayed}</span>
      {!isDone && <span className="inline-block w-px h-3.5 bg-emerald-400/80 animate-pulse ml-px" />}
    </div>
  )
}

interface SyntaxBuilderProps {
  preset?: string
  lang?: "ko" | "en"
  onSuccess?: () => void
}

export function SyntaxBuilder({ preset = "cpp-if", lang = "ko", onSuccess }: SyntaxBuilderProps) {
  const data = PRESETS[preset] || CPP_IF
  const [currentStep, setCurrentStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // 자동 재생
  useEffect(() => {
    if (!isAutoPlaying) return
    if (currentStep >= data.steps.length) {
      setIsAutoPlaying(false)
      onSuccess?.()
      return
    }
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1)
    }, 1800)
    return () => clearTimeout(timer)
  }, [currentStep, isAutoPlaying, data.steps.length, onSuccess])

  const step = data.steps[Math.min(currentStep, data.steps.length - 1)]
  const isComplete = currentStep >= data.steps.length

  // 내부 스텝 변경 시 스크롤 없음 — 이미 화면에 보이는 상태에서 내용만 변경

  // 하이라이트 범위를 배열로 정규화
  const highlights = useMemo(() => {
    const raw = Array.isArray(step.highlight) ? step.highlight : [step.highlight]
    const codeLen = step.code.length
    return raw.map(h => ({
      start: Math.max(0, Math.min(h.start, codeLen)),
      end: Math.min(h.end, codeLen),
    }))
  }, [step.highlight, step.code])

  // blinkHighlight — "참조" 범위: 밝게 + 깜빡임 (highlight와 독립)
  const blinkHighlights = useMemo(() => {
    if (!step.blinkHighlight) return []
    const raw = Array.isArray(step.blinkHighlight) ? step.blinkHighlight : [step.blinkHighlight]
    const codeLen = step.code.length
    return raw.map(h => ({
      start: Math.max(0, Math.min(h.start, codeLen)),
      end: Math.min(h.end, codeLen),
    }))
  }, [step.blinkHighlight, step.code])

  // 구문 하이라이팅 색상 계산 (코드가 바뀔 때만 재계산)
  const charColors = useMemo(() => getCppCharColors(step.code), [step.code])

  // 최종 코드의 줄 수로 코드 박스 높이 고정 (스텝마다 크기 안 변하게)
  const finalCodeLines = useMemo(() => {
    const lastCode = data.steps[data.steps.length - 1].code
    return lastCode.split("\n").length
  }, [data.steps])

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      {/* ── 헤더: Mac dots + 제목 + 단계 ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <span className="text-slate-500 text-xs font-mono ml-1">
            {lang === "ko" ? data.title.ko : data.title.en}
          </span>
        </div>
        <span className="text-xs font-medium text-slate-400">
          {Math.min(currentStep + 1, data.steps.length)}/{data.steps.length}
        </span>
      </div>

      {/* ── 코드 영역 ── */}
      <div className="bg-slate-900 overflow-x-auto">
        {/* 코드 */}
        <div
          className="px-5 pt-5 pb-2 font-mono text-sm leading-relaxed min-w-0"
          style={{ minHeight: `${finalCodeLines * 1.6 + 2}rem` }}
        >
          <pre className="text-slate-300 whitespace-pre-wrap">
            {step.code.split("").map((char, i) => {
              const isHighlighted = highlights.some(h => i >= h.start && i < h.end)
              const isBlinkRef    = blinkHighlights.some(h => i >= h.start && i < h.end)
              const isAnyActive   = isHighlighted || isBlinkRef
              const blinkClass    = (step.blink && isHighlighted) || isBlinkRef ? " syntax-blink" : ""
              const baseColor     = charColors[i] || "text-slate-300"
              const hlColor       = isAnyActive ? brightenColor(baseColor) : baseColor
              return (
                <span
                  key={i}
                  className={`${hlColor} ${isAnyActive ? "font-bold" : "opacity-40"} transition-all duration-300${blinkClass}`}
                  style={
                    isHighlighted
                      ? { textShadow: "0 0 6px currentColor", borderBottom: "2px solid rgba(250, 204, 21, 0.7)" }
                      : isBlinkRef
                      ? { textShadow: "0 0 5px currentColor" }
                      : undefined
                  }
                >
                  {char}
                </span>
              )
            })}
            <span className="animate-pulse text-yellow-400">|</span>
          </pre>
        </div>

        {/* 타이핑되는 주석 설명 */}
        <TypewriterComment
          key={currentStep}
          text={lang === "ko" ? step.label.ko : step.label.en}
          icon={step.icon}
          stepKey={currentStep}
        />
      </div>

      {/* ── 진행 바 + 컨트롤 ── */}
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-t border-slate-200">
        <button
          onClick={() => { setIsAutoPlaying(false); setCurrentStep(Math.max(0, currentStep - 1)) }}
          disabled={currentStep <= 0}
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 disabled:opacity-30 transition-colors flex-shrink-0"
        >
          ←
        </button>

        <div className="flex gap-1.5 flex-1">
          {data.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsAutoPlaying(false); setCurrentStep(i) }}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 ${
                i <= currentStep ? "bg-indigo-500" : "bg-slate-300"
              }`}
            />
          ))}
        </div>

        {isComplete ? (
          <button
            onClick={() => { setCurrentStep(0); setIsAutoPlaying(false) }}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors flex-shrink-0"
          >
            🔄 {lang === "ko" ? "다시" : "Again"}
          </button>
        ) : (
          <button
            onClick={() => { setIsAutoPlaying(false); setCurrentStep(Math.min(data.steps.length, currentStep + 1)) }}
            className="px-4 py-1.5 text-xs font-bold rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-sm flex-shrink-0"
          >
            {lang === "ko" ? "다음 →" : "Next →"}
          </button>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  )
}

// 편의 컴포넌트들
export function CppIfBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-if" />
}
export function CppForBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-for" />
}
export function CppWhileBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-while" />
}
export function CppFunctionBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-function" />
}
export function PyIfBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="py-if" />
}
export function PyForBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="py-for" />
}
export function PyFunctionBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="py-function" />
}
export function PyClassBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="py-class" />
}
export function CppSwitchBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-switch" />
}
export function CppArrayBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-array" />
}
export function CppPointerBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-pointer" />
}
export function CppStructBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-struct" />
}
export function CppStructArrayBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-struct-array" />
}
export function CppClassBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-class" />
}
export function CppClassBasicBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-class-basic" />
}
export function PyWhileBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="py-while" />
}
export function PyTryExceptBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="py-try-except" />
}
export function PyListBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="py-list" />
}
export function PyDictBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="py-dict" />
}
export function CppTernaryBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-ternary" />
}
export function CppVariableBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-variable" />
}
export function CppCoutBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-cout" />
}
export function CppCinBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-cin" />
}
export function CppStringBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-string" />
}
export function CppDoWhileBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-do-while" />
}
export function PyVariableBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="py-variable" />
}
export function PyPrintBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="py-print" />
}
export function PyInputBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="py-input" />
}
export function CppEscapeBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-escape" />
}
export function CppCharBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-char" />
}
export function CppTypeConvertBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-type-convert" />
}
export function CppIntDivisionBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-int-division" />
}
export function CppElseIfBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-else-if" />
}
export function CppVectorBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-vector" />
}
export function CppRangeForBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-range-for" />
}
export function CppAutoBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-auto" />
}
export function CppReferenceBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-reference" />
}
export function CppCallByRefBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-call-by-ref" />
}
export function CppPublicPrivateBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-public-private" />
}
export function CppBraceTrapBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-brace-trap" />
}
export function CppConstructorBuilder(props: Omit<SyntaxBuilderProps, "preset">) {
  return <SyntaxBuilder {...props} preset="cpp-constructor" />
}
