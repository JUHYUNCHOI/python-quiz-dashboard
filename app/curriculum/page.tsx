"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { RequireAuth } from "@/components/require-auth"
import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import {
  CheckCircle2,
  Circle,
  BookOpen,
  Trophy,
  Clock,
  ChevronDown,
  ChevronRight,
  Play,
  Sparkles,
  Lock,
} from "lucide-react"

// ============================================================
// 코스 타입
// ============================================================
type CourseType = "python" | "cpp" | "pseudo"

// ============================================================
// /review에 실제 레슨이 있는 ID 목록 (게임형 복습) — Python 전용
// ============================================================
const lessonsInReview = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48])

// C++ 복습이 있는 레슨 ID 목록
const cppReviewIds = new Set([
  "cpp-1", "cpp-2", "cpp-3", "cpp-4", "cpp-5", "cpp-6", "cpp-7", "cpp-8",
  "cpp-9", "cpp-10", "cpp-11", "cpp-12", "cpp-13", "cpp-14",
  "cpp-21",
  "cpp-15", "cpp-16", "cpp-17", "cpp-18", "cpp-19", "cpp-20",
  "cpp-p1", "cpp-p2", "cpp-p3"
])

// 복습 경로 결정: /review에 있으면 review, 없으면 learn으로 fallback
const getReviewPath = (lessonId: number | string) => {
  if (typeof lessonId === 'number' && lessonsInReview.has(lessonId)) {
    return `/review/${lessonId}`
  }
  if (typeof lessonId === 'string' && cppReviewIds.has(lessonId)) {
    return `/review/${lessonId}`
  }
  return `/learn/${lessonId}`
}

// ============================================================
// 파트 데이터 타입
// ============================================================
type PartData = {
  id: string
  title: string
  description: string
  comingSoon?: boolean
  lessons: { id: number | string; title: string; description: string; duration: string; hasQuiz?: boolean; isProject?: boolean }[]
}

export default function CurriculumPage() {
  const { t } = useLanguage()

  const pythonCurriculumData: PartData[] = [
    {
      id: "part1",
      title: t("Part 1: 기초", "Part 1: Basics"),
      description: t("파이썬 설치부터 기본적인 입출력까지! 이 파트를 끝내면 간단한 계산 프로그램을 만들 수 있어요.", "From installing Python to basic I/O! After this part, you can build a simple calculator."),
      lessons: [
        { id: 1, title: t("1. print() 출력", "1. print() Output"), description: t("화면에 글자와 숫자 출력하기", "Printing text and numbers to the screen"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: 2, title: t("2. 데이터 타입", "2. Data Types"), description: t("숫자, 문자열, 불리언의 차이", "Differences between numbers, strings, and booleans"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: 3, title: t("3. 변수", "3. Variables"), description: t("데이터를 저장하는 상자", "A box that stores data"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: 4, title: t("4. 연산자", "4. Operators"), description: t("계산하고 비교하기", "Calculating and comparing"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: 5, title: t("5. 문자열 연산", "5. String Operations"), description: t("문자열 더하고 곱하기", "Adding and multiplying strings"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: 6, title: t("6. 문자열 메서드", "6. String Methods"), description: t("upper, lower, strip 등", "upper, lower, strip, etc."), duration: t("20분", "20 min"), hasQuiz: true },
        { id: 7, title: t("7. print() 옵션", "7. print() Options"), description: t("sep, end로 출력 꾸미기", "Formatting output with sep and end"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: 8, title: "8. f-string", description: t("편리한 문자열 포맷팅", "Convenient string formatting"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: 9, title: t("9. 타입 변환", "9. Type Conversion"), description: t("int, float, str 변환", "Converting int, float, str"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: 10, title: t("10. input() 입력", "10. input() Input"), description: t("사용자에게 입력받기", "Getting user input"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: "p1", title: t("🎮 미니 계산기", "🎮 Mini Calculator"), description: t("Part 1 복습 프로젝트", "Part 1 Review Project"), duration: t("20분", "20 min"), isProject: true },
      ],
    },
    {
      id: "part2",
      title: t("Part 2: 제어문", "Part 2: Control Flow"),
      description: t("프로그램에 판단력과 반복 능력을 주는 제어문! 조건에 따라 다르게 동작하고, 반복 작업을 자동화해요.", "Control flow gives your program decision-making and looping! Act differently based on conditions and automate repetitive tasks."),
      lessons: [
        { id: 11, title: t("11. 조건문 (if)", "11. Conditionals (if)"), description: t("조건에 따라 다르게 실행", "Execute differently based on conditions"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 12, title: t("12. 조건문 심화", "12. Advanced Conditionals"), description: t("and, or, not 논리 연산자", "and, or, not logical operators"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: 13, title: t("13. 반복문 (for)", "13. Loops (for)"), description: t("정해진 횟수만큼 반복", "Repeat a set number of times"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 14, title: t("14. 반복문 (while)", "14. Loops (while)"), description: t("조건이 참인 동안 반복", "Repeat while condition is true"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "p2", title: t("🎮 숫자 맞추기 게임", "🎮 Number Guessing Game"), description: t("Part 2 복습 프로젝트", "Part 2 Review Project"), duration: t("25분", "25 min"), isProject: true },
      ],
    },
    {
      id: "part3",
      title: t("Part 3: 자료구조", "Part 3: Data Structures"),
      description: t("데이터를 효율적으로 저장하고 관리하는 방법! 리스트, 튜플, 딕셔너리, 집합을 활용해요.", "Store and manage data efficiently! Learn lists, tuples, dictionaries, and sets."),
      lessons: [
        { id: 15, title: t("15. 자료구조 개요", "15. Data Structures Overview"), description: t("4가지 자료구조 소개", "Introduction to 4 data structures"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: 16, title: t("16. 리스트 기초", "16. List Basics"), description: t("여러 데이터를 한 번에 저장", "Store multiple data at once"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 17, title: t("17. 리스트와 반복문", "17. Lists & Loops"), description: t("for문으로 리스트 순회", "Iterating lists with for loops"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: 18, title: t("18. split()과 join()", "18. split() & join()"), description: t("문자열 쪼개고 합치기", "Splitting and joining strings"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: 19, title: t("19. 튜플", "19. Tuples"), description: t("수정할 수 없는 리스트", "Immutable lists"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: 20, title: t("20. 딕셔너리", "20. Dictionaries"), description: t("키-값 쌍으로 데이터 저장", "Store data as key-value pairs"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 21, title: t("21. 집합 (set)", "21. Sets"), description: t("중복 없는 집합", "Collections without duplicates"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: 22, title: t("22. 슬라이싱", "22. Slicing"), description: t("리스트/문자열 일부 추출", "Extract parts of lists/strings"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "p3", title: t("🎮 Hangman 게임", "🎮 Hangman Game"), description: t("Part 3 복습 프로젝트", "Part 3 Review Project"), duration: t("40분", "40 min"), isProject: true },
      ],
    },
    {
      id: "part3-advanced",
      title: t("Part 3+: 자료구조 심화 ⭐", "Part 3+: Advanced Data Structures ⭐"),
      description: t("스택, 큐, 덱을 배우고 코딩테스트에 자주 나오는 자료구조를 마스터해요!", "Learn stacks, queues, and deques — master data structures common in coding tests!"),
      lessons: [
        { id: 23, title: t("23. 스택 (Stack)", "23. Stack"), description: t("LIFO! 마지막이 먼저 나오는 자료구조", "LIFO! Last in, first out data structure"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 24, title: t("24. 큐 (Queue)", "24. Queue"), description: t("FIFO! 먼저 온 게 먼저 나오는 자료구조", "FIFO! First in, first out data structure"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 25, title: t("25. 덱 (Deque)", "25. Deque"), description: t("양쪽에서 넣고 빼는 자료구조", "Add and remove from both ends"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 26, title: t("26. 자료구조 비교와 선택", "26. Comparing Data Structures"), description: t("상황에 맞는 자료구조 고르기", "Choosing the right data structure"), duration: t("30분", "30 min"), hasQuiz: true },
      ],
    },
    {
      id: "part4",
      title: t("Part 4: 프로젝트 & 도전", "Part 4: Projects & Challenges"),
      description: t("Part 1~3에서 배운 모든 것을 활용! 프로젝트를 만들고 다양한 문제를 풀어요.", "Apply everything from Parts 1–3! Build projects and solve various problems."),
      lessons: [
        { id: 27, title: t("27. 가위바위보 게임", "27. Rock Paper Scissors"), description: t("리스트, 조건문, 반복문으로 가위바위보!", "Build RPS with lists, conditionals, and loops!"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 28, title: t("28. 로또 번호 생성기", "28. Lotto Number Generator"), description: t("random 모듈과 리스트로 로또 만들기", "Create lotto numbers with random and lists"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 29, title: t("29. 단어장 프로그램", "29. Vocabulary App"), description: t("딕셔너리로 나만의 단어장!", "Build your own vocab app with dictionaries!"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 30, title: t("30. 성적 관리 시스템", "30. Grade Manager"), description: t("리스트와 딕셔너리로 성적 관리", "Manage grades with lists and dictionaries"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 31, title: t("31. 종합 문제 모음", "31. Mixed Problems"), description: t("기초부터 자료구조까지 30문제!", "30 problems from basics to data structures!"), duration: t("50분", "50 min"), hasQuiz: true },
      ],
    },
    {
      id: "part5",
      title: t("Part 5: 함수", "Part 5: Functions"),
      description: t("코드를 재사용하고 정리하는 함수를 배워요! Level 2 시험의 핵심!", "Learn functions to reuse and organize code! Key for Level 2 exams!"),
      lessons: [
        { id: 32, title: t("32. 함수란?", "32. What is a Function?"), description: t("def로 함수 만들기, return으로 결과 반환", "Create with def, return results"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 33, title: t("33. 매개변수와 반환값", "33. Parameters & Return Values"), description: t("기본값, 여러 값 반환, 키워드 인자", "Defaults, multiple returns, keyword args"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 34, title: t("34. 함수 활용", "34. Using Functions"), description: t("지역변수, 전역변수, 람다 함수", "Local/global variables, lambda functions"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 35, title: t("35. 내장함수 총정리", "35. Built-in Functions"), description: "len, sum, max, min, sorted, map", duration: t("30분", "30 min"), hasQuiz: true },
        { id: 36, title: t("36. 함수 문제 30", "36. 30 Function Problems"), description: t("함수 마스터를 위한 30문제!", "30 problems to master functions!"), duration: t("40분", "40 min"), hasQuiz: true },
      ],
    },
    {
      id: "part6",
      title: t("Part 6: 에러와 파일", "Part 6: Errors & Files"),
      description: t("에러를 처리하고 파일을 다뤄요! 게임 세이브 시스템을 만들어요.", "Handle errors and work with files! Build a game save system."),
      lessons: [
        { id: 37, title: t("37. 에러 처리하기", "37. Error Handling"), description: t("try-except로 에러 잡기", "Catch errors with try-except"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 38, title: t("38. 파일 읽고 쓰기", "38. Reading & Writing Files"), description: t("파일로 데이터 저장하기", "Save data to files"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 39, title: t("39. 게임 세이브", "39. Game Save"), description: t("RPG 게임 저장/불러오기", "Save/load RPG game data"), duration: t("30분", "30 min"), hasQuiz: true },
        { id: 40, title: t("40. Part 6 문제 20", "40. Part 6: 20 Problems"), description: t("에러와 파일 연습 문제", "Practice problems for errors and files"), duration: t("40분", "40 min"), hasQuiz: true },
      ],
    },
    {
      id: "part7",
      title: t("Part 7: 클래스", "Part 7: Classes"),
      description: t("객체지향 프로그래밍의 기초를 배워요. 붕어빵 틀처럼 객체를 찍어내요!", "Learn the basics of OOP. Create objects like a cookie cutter!"),
      lessons: [
        { id: 41, title: t("41. 클래스 기초", "41. Class Basics"), description: t("클래스와 객체 만들기", "Creating classes and objects"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 42, title: t("42. 메서드와 속성", "42. Methods & Attributes"), description: t("메서드 만들기와 변수 종류", "Creating methods and variable types"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 43, title: t("43. RPG 게임", "43. RPG Game"), description: t("클래스로 RPG 게임 만들기", "Build an RPG game with classes"), duration: t("30분", "30 min"), hasQuiz: true },
        { id: 44, title: t("44. Part 7 문제 20", "44. Part 7: 20 Problems"), description: t("클래스 연습 문제", "Practice problems for classes"), duration: t("40분", "40 min"), hasQuiz: true },
      ],
    },
    {
      id: "part8",
      title: t("Part 8: 모듈과 패키지", "Part 8: Modules & Packages"),
      description: t("다른 사람이 만든 코드를 활용해요.", "Use code made by others."),
      lessons: [
        { id: 45, title: t("45. 모듈 기초", "45. Module Basics"), description: t("import와 내장 모듈 사용법", "How to use import and built-in modules"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 46, title: t("46. 패키지와 pip", "46. Packages & pip"), description: t("패키지 개념과 내장 모듈 활용", "Package concepts and built-in modules"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: 47, title: t("47. 날씨 앱", "47. Weather App"), description: t("모듈로 날씨 앱 만들기", "Build a weather app with modules"), duration: t("30분", "30 min"), hasQuiz: true },
        { id: 48, title: t("48. Part 8 문제 20", "48. Part 8: 20 Problems"), description: t("모듈과 패키지 연습 문제", "Practice problems for modules and packages"), duration: t("40분", "40 min"), hasQuiz: true },
      ],
    },
    {
      id: "part9",
      title: t("Part 9: 종합 프로젝트", "Part 9: Final Projects"),
      description: t("모든 것을 활용한 대형 프로젝트!", "Big projects using everything you've learned!"),
      lessons: [
        { id: 49, title: t("49. 텍스트 RPG: 게임 설계", "49. Text RPG: Game Design"), description: t("클래스 구조 설계와 게임 흐름", "Class structure design and game flow"), duration: t("30분", "30 min"), hasQuiz: true },
        { id: 50, title: t("50. 텍스트 RPG: 핵심 시스템", "50. Text RPG: Core Systems"), description: t("캐릭터, 몬스터, 아이템 구현", "Implement characters, monsters, and items"), duration: t("45분", "45 min"), hasQuiz: true },
        { id: 51, title: t("51. 텍스트 RPG: 게임 완성", "51. Text RPG: Complete Game"), description: t("상점, 세이브, 게임 루프 통합", "Integrate shop, save, and game loop"), duration: t("45분", "45 min"), hasQuiz: true },
        { id: 52, title: t("52. 텍스트 RPG: 업그레이드", "52. Text RPG: Upgrades"), description: t("치명타, 퀘스트, 스킬 추가", "Add critical hits, quests, and skills"), duration: t("40분", "40 min"), hasQuiz: true },
        { id: "p4", title: "🐍 Snake Game", description: t("turtle, 클래스, 모듈로 뱀 게임 만들기", "Build Snake with turtle, classes, and modules"), duration: t("60분", "60 min"), isProject: true },
      ],
    },
  ]

  const cppCurriculumData: PartData[] = [
    {
      id: "cpp-part1",
      title: t("Part 1: C++ 기초", "Part 1: C++ Basics"),
      description: t("파이썬을 아는 학생을 위한 C++ 입문! 두 언어의 차이부터 시작해서 기본 문법을 배워요.", "C++ intro for Python students! Start with language differences and learn basic syntax."),
      lessons: [
        { id: "cpp-1", title: t("1. 파이썬 vs C++", "1. Python vs C++"), description: t("인터프리터 vs 컴파일러, 핵심 차이", "Interpreter vs compiler, key differences"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "cpp-2", title: t("2. cout 심화 & namespace", "2. Advanced cout & namespace"), description: t("숫자·수식 출력, 이스케이프, using namespace std", "Number/expression output, escape chars, using namespace std"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "cpp-3", title: t("3. 변수와 타입", "3. Variables & Types"), description: t("int, double, string 직접 선언", "Declaring int, double, string"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "cpp-4", title: t("4. cin 입력", "4. cin Input"), description: t("cin >>으로 입력받기", "Getting input with cin >>"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "cpp-5", title: t("5. 연산자", "5. Operators"), description: t("정수 나눗셈, ++, &&, || 연산자", "Integer division, ++, &&, || operators"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "cpp-6", title: t("6. 조건문 (if/else)", "6. Conditionals (if/else)"), description: t("중괄호 {}와 switch/case", "Curly braces {} and switch/case"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "cpp-7", title: t("7. 반복문 (for/while)", "7. Loops (for/while)"), description: "for(int i=0; i<n; i++)", duration: t("20분", "20 min"), hasQuiz: true },
        { id: "cpp-8", title: t("8. 함수", "8. Functions"), description: t("반환 타입, void, 함수 오버로딩", "Return types, void, function overloading"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "cpp-p1", title: t("🎮 숫자 맞추기 게임", "🎮 Number Guessing Game"), description: t("Part 1 복습 프로젝트", "Part 1 Review Project"), duration: t("25분", "25 min"), isProject: true },
      ],
    },
    {
      id: "cpp-part2",
      title: t("Part 2: 더 깊은 C++", "Part 2: Deeper C++"),
      description: t("배열, 벡터, 참조, 포인터, 클래스까지! C++만의 강력한 기능을 배워요.", "Arrays, vectors, references, pointers, and classes! Learn C++'s powerful features."),
      lessons: [
        { id: "cpp-9", title: t("9. 배열 & 벡터", "9. Arrays & Vectors"), description: "int arr[5], vector<int>, push_back", duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-21", title: t("10. 2차원 배열 & 2D vector", "10. 2D Arrays & 2D Vectors"), description: t("grid[행][열], vector<vector<int>>, 이중 for문", "grid[row][col], vector<vector<int>>, nested loops"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-10", title: t("11. Range-for & auto", "11. Range-for & auto"), description: t("for(auto x : vec), 타입 추론", "for(auto x : vec), type inference"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "cpp-11", title: t("12. 문자열 심화", "12. Advanced Strings"), description: t("substr, find, replace, 비교", "substr, find, replace, comparison"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "cpp-12", title: t("13. 참조와 함수", "13. References & Functions"), description: "int& ref, call by reference", duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-13", title: t("14. 포인터 기초", "14. Pointer Basics"), description: "int* ptr, &, *, nullptr", duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-14", title: t("15. 구조체 (struct)", "15. Structs"), description: t("struct, 멤버 변수, 점(.) 연산자", "struct, member variables, dot operator"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-22", title: t("16. 클래스 (class)", "16. Classes"), description: t("class, public/private, 생성자", "class, public/private, constructors"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-p2", title: t("⚔️ RPG 캐릭터 관리", "⚔️ RPG Character Manager"), description: t("Part 2 복습 프로젝트", "Part 2 Review Project"), duration: t("30분", "30 min"), isProject: true },
      ],
    },
    {
      id: "cpp-part3",
      title: t("Part 3: USACO 준비 🏆", "Part 3: USACO Prep 🏆"),
      description: t("USACO는 미국 최고의 코딩 대회예요! 어렵지 않아요 — STL 도구들을 배우면 복잡한 문제도 쉽게 풀 수 있어요. C++의 강력한 무기들을 익혀봐요!", "USACO is a prestigious US coding olympiad! Don't worry — learning STL tools makes hard problems manageable. Master C++'s powerful weapons!"),
      lessons: [
        { id: "cpp-15", title: t("15. pair & 정렬", "15. pair & Sorting"), description: t("pair<int,int>, sort(), 커스텀 비교", "pair<int,int>, sort(), custom comparison"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-16", title: "16. map & set", description: "map, unordered_map, set", duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-17", title: t("17. STL 알고리즘", "17. STL Algorithms"), description: "sort, find, lower_bound, accumulate", duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-18", title: "18. stack, queue & deque", description: t("STL 컨테이너, priority_queue", "STL containers, priority_queue"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-19", title: t("19. 파일 I/O & Fast I/O", "19. File I/O & Fast I/O"), description: "freopen, ifstream, sync_with_stdio", duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-20", title: t("20. CP 실전 팁", "20. CP Practical Tips"), description: t("bits/stdc++.h, typedef, 비트 연산", "bits/stdc++.h, typedef, bitwise operations"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "cpp-p3", title: t("🏆 USACO 모의전", "🏆 USACO Mock Contest"), description: t("Part 3 복습 프로젝트", "Part 3 Review Project"), duration: t("30분", "30 min"), isProject: true },
      ],
    },
  ]

  const pseudoCurriculumData: PartData[] = [
    {
      id: "pseudo-part1",
      title: t("Part 1: 수도코드 기초", "Part 1: Pseudocode Basics"),
      description: t(
        "프로그래밍 언어 없이 알고리즘 사고력을 키워요! CIE 수도코드로 논리적으로 생각하는 법을 배워요.",
        "Build algorithmic thinking without any programming language! Learn to think logically with CIE pseudocode."
      ),
      lessons: [
        { id: "pseudo-1", title: t("1. OUTPUT 출력", "1. OUTPUT"), description: t("화면에 글자를 출력해요!", "Display text on screen!"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: "pseudo-2", title: t("2. 변수", "2. Variables"), description: t("데이터를 저장하는 상자 SET ←", "A box that stores data SET ←"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: "pseudo-3", title: t("3. INPUT 입력", "3. INPUT"), description: t("사용자에게 입력받기", "Getting input from the user"), duration: t("15분", "15 min"), hasQuiz: true },
        { id: "pseudo-4", title: t("4. 자료형", "4. Data Types"), description: "INTEGER, REAL, STRING, BOOLEAN", duration: t("15분", "15 min"), hasQuiz: true },
        { id: "pseudo-28", title: t("5. 연산자 & 필수 표현", "5. Operators & Exam Essentials"), description: t("DIV, MOD, 짝수/홀수, 내장 함수 총정리", "DIV, MOD, even/odd, built-in functions"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "pseudo-5", title: t("6. 조건문", "6. Conditionals"), description: "IF...THEN...ELSE...ENDIF", duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-6", title: t("7. 반복문 1", "7. Loops 1"), description: t("FOR...TO...NEXT, WHILE", "FOR...TO...NEXT, WHILE"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-7", title: t("8. 반복문 2", "8. Loops 2"), description: t("REPEAT...UNTIL, 중첩 반복", "REPEAT...UNTIL, nested loops"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-8", title: t("9. 배열", "9. Arrays"), description: t("DECLARE 배열, 인덱싱", "DECLARE arrays, indexing"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-p1", title: t("📝 기출문제 연습 1", "📝 Past Paper Practice 1"), description: t("Part 1 기출 스타일 연습", "Part 1 Exam Practice"), duration: t("25분", "25 min"), isProject: true },
      ],
    },
    {
      id: "pseudo-part2",
      title: t("Part 2: 중급", "Part 2: Intermediate"),
      description: t(
        "CASE 선택문, 프로시저/함수, 문자열 처리, 파일 처리, 2D 배열까지! IGCSE 시험 핵심 주제를 마스터해요.",
        "CASE statements, procedures/functions, string handling, file handling, 2D arrays! Master key IGCSE exam topics."
      ),
      lessons: [
        { id: "pseudo-9", title: t("10. CASE 선택문", "10. CASE Statement"), description: "CASE...OF...OTHERWISE...ENDCASE", duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-10", title: t("11. 프로시저 & 함수", "11. Procedures & Functions"), description: "PROCEDURE, FUNCTION, CALL, RETURN", duration: t("25분", "25 min"), hasQuiz: true },
        { id: "pseudo-11", title: t("12. 매개변수", "12. Parameters"), description: t("BYVAL, BYREF 전달 방식", "BYVAL, BYREF passing modes"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-12", title: t("13. 문자열 처리", "13. String Handling"), description: "LENGTH, SUBSTRING, UCASE, LCASE", duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-13", title: t("14. 파일 처리", "14. File Handling"), description: "OPENFILE, READFILE, WRITEFILE, CLOSEFILE", duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-14", title: t("15. 2D 배열", "15. 2D Arrays"), description: t("2차원 배열 선언과 사용", "Declaring and using 2D arrays"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-p2", title: t("📝 기출문제 연습 2", "📝 Past Paper Practice 2"), description: t("Part 2 기출 스타일 연습", "Part 2 Exam Practice"), duration: t("30분", "30 min"), isProject: true },
      ],
    },
    {
      id: "pseudo-part3",
      title: t("Part 3: 알고리즘", "Part 3: Algorithms"),
      description: t(
        "검색, 정렬, Trace Table, 검증까지! IGCSE 시험에 나오는 알고리즘을 수도코드로 완벽하게 익혀요.",
        "Searching, sorting, trace tables, and validation! Master exam algorithms in pseudocode."
      ),
      lessons: [
        { id: "pseudo-15", title: t("16. 선형 검색", "16. Linear Search"), description: t("처음부터 끝까지 하나씩 찾기", "Find by checking one by one"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-16", title: t("17. 이진 검색", "17. Binary Search"), description: t("반씩 나눠서 빠르게 찾기", "Find quickly by halving"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-17", title: t("18. 버블 정렬", "18. Bubble Sort"), description: t("이웃한 값을 비교하여 정렬", "Sort by comparing adjacent values"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "pseudo-18", title: t("19. 삽입 정렬", "19. Insertion Sort"), description: t("올바른 위치에 삽입하여 정렬", "Sort by inserting into correct position"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "pseudo-19", title: t("20. Trace Table", "20. Trace Table"), description: t("코드를 한 줄씩 추적하기", "Trace code line by line"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "pseudo-20", title: t("21. 검증과 확인", "21. Validation & Verification"), description: t("데이터 검증 기법들", "Data validation techniques"), duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-p3", title: t("📝 기출문제 연습 3", "📝 Past Paper Practice 3"), description: t("Part 3 기출 스타일 연습", "Part 3 Exam Practice"), duration: t("30분", "30 min"), isProject: true },
      ],
    },
    {
      id: "pseudo-part4",
      title: t("Part 4: 시험 대비", "Part 4: Exam Prep"),
      description: t(
        "플로우차트와 레코드 타입! IGCSE Paper 2 수도코드 심화 주제를 마스터해요.",
        "Flowcharts and record types! Master advanced pseudocode topics for IGCSE Paper 2."
      ),
      lessons: [
        { id: "pseudo-21", title: t("22. 플로우차트 기초", "22. Flowchart Basics"), description: t("기호, 읽기, 수도코드 변환", "Symbols, reading, pseudocode conversion"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "pseudo-22", title: t("23. 플로우차트 실전", "23. Flowchart Practice"), description: t("Trace Table, 설계, 시험 연습", "Trace tables, design, exam practice"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "pseudo-23", title: t("24. 레코드 타입", "24. Record Types"), description: "TYPE...ENDTYPE, ARRAY OF records", duration: t("20분", "20 min"), hasQuiz: true },
      ],
    },
    {
      id: "pseudo-part5",
      title: t("Part 5: CS 이론", "Part 5: CS Theory"),
      description: t(
        "SQL과 불리언 로직! 수도코드는 아니지만 IGCSE Paper 2에 나오는 CS 이론 주제를 배워요.",
        "SQL and Boolean logic! CS theory topics that appear on IGCSE Paper 2, beyond pseudocode."
      ),
      lessons: [
        { id: "pseudo-24", title: t("25. SQL 기초", "25. SQL Basics"), description: "SELECT, FROM, WHERE", duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-25", title: t("26. SQL 심화", "26. SQL Advanced"), description: "ORDER BY, COUNT, SUM, AVG", duration: t("20분", "20 min"), hasQuiz: true },
        { id: "pseudo-26", title: t("27. 불리언 로직 1", "27. Boolean Logic 1"), description: t("AND, OR, NOT 게이트와 진리표", "AND, OR, NOT gates & truth tables"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "pseudo-27", title: t("28. 불리언 로직 2", "28. Boolean Logic 2"), description: t("NAND, NOR, XOR과 논리 회로", "NAND, NOR, XOR & logic circuits"), duration: t("25분", "25 min"), hasQuiz: true },
      ],
    },
    {
      id: "igcse-sql",
      title: t("기출: SQL", "Past Papers: SQL"),
      description: t("IGCSE Paper 2 SQL 기출 연습! SELECT, WHERE, ORDER BY, 집계함수, GROUP BY.", "IGCSE Paper 2 SQL past paper practice! SELECT, WHERE, ORDER BY, aggregate functions, GROUP BY."),
      lessons: [
        { id: "igcse-sql1", title: t("🗃️ SQL 기출 1", "🗃️ SQL Practice 1"), description: t("SELECT, WHERE, ORDER BY", "SELECT, WHERE, ORDER BY"), duration: t("25분", "25 min"), hasQuiz: true },
        { id: "igcse-sql2", title: t("🗃️ SQL 기출 2", "🗃️ SQL Practice 2"), description: t("COUNT, SUM, AVG, GROUP BY, LIKE", "COUNT, SUM, AVG, GROUP BY, LIKE"), duration: t("30분", "30 min"), hasQuiz: true },
      ],
    },
    {
      id: "igcse-logic",
      title: t("기출: Logic Gates", "Past Papers: Logic Gates"),
      description: t("IGCSE Paper 2 Logic Gates 기출 연습! AND, OR, NOT, XOR, 진리표, 논리식.", "IGCSE Paper 2 Logic Gates past paper practice! AND, OR, NOT, XOR, truth tables, logic expressions."),
      lessons: [
        { id: "igcse-logic1", title: t("🔌 Logic Gates 기출", "🔌 Logic Gates Practice"), description: t("AND, OR, NOT, NAND, NOR, XOR, 진리표", "AND, OR, NOT, NAND, NOR, XOR, truth tables"), duration: t("30분", "30 min"), hasQuiz: true },
      ],
    },
  ]

  const { profile } = useAuth()
  const isTeacher = profile?.role === "teacher"

  const [completedLessons, setCompletedLessons] = useState<Set<number | string>>(new Set())
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<number | string>>(new Set())
  const [expandedParts, setExpandedParts] = useState<Set<string>>(new Set(["part1", "cpp-part1", "pseudo-part1"]))
  const [selectedCourse, setSelectedCourse] = useState<CourseType>("python")
  const [loaded, setLoaded] = useState(false)
  // P2 민준: 건너뛰기 확인 상태 (어떤 레슨 ID를 건너뛸지)
  const [skipConfirmId, setSkipConfirmId] = useState<number | string | null>(null)

  // 초기 로드: localStorage에서 진도/코스 복원
  useEffect(() => {
    const saved = localStorage.getItem("completedLessons")
    if (saved) {
      const arr: (string | number)[] = JSON.parse(saved)
      setCompletedLessons(new Set(arr.map(id => typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id)))
    }
    const savedQuizzes = localStorage.getItem("completedQuizzes")
    if (savedQuizzes) {
      const arr: (string | number)[] = JSON.parse(savedQuizzes)
      setCompletedQuizzes(new Set(arr.map(id => typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id)))
    }
    const savedCourse = localStorage.getItem("selectedCourse") as CourseType
    if (savedCourse === "python" || savedCourse === "cpp" || savedCourse === "pseudo") {
      setSelectedCourse(savedCourse)
    } else if (savedCourse === "igcse") {
      setSelectedCourse("pseudo")
      localStorage.setItem("selectedCourse", "pseudo")
    }
    setLoaded(true)
  }, [])

  // 진도에 따라 현재 파트만 열기 (완료된 파트 + 첫 미완료 파트)
  useEffect(() => {
    if (!loaded) return
    const allData = selectedCourse === "python" ? pythonCurriculumData : selectedCourse === "cpp" ? cppCurriculumData : pseudoCurriculumData
    const active = new Set<string>()
    for (const part of allData) {
      const ids = part.lessons.map(l => l.id)
      const hasAnyComplete = ids.some(id => completedLessons.has(id))
      const hasIncomplete = ids.some(id => !completedLessons.has(id))
      if (hasAnyComplete) active.add(part.id)
      if (hasIncomplete) { active.add(part.id); break } // 첫 미완료 파트까지
    }
    if (active.size === 0 && allData.length > 0) active.add(allData[0].id)
    setExpandedParts(active)
  }, [loaded, selectedCourse]) // eslint-disable-line react-hooks/exhaustive-deps

  // 학생이 IGCSE 탭에 있으면 Python으로 리셋 (profile 로드 후 확인)
  useEffect(() => {
    if (profile !== undefined && !isTeacher && selectedCourse === "pseudo") {
      setSelectedCourse("python")
      localStorage.setItem("selectedCourse", "python")
    }
  }, [profile, isTeacher, selectedCourse])

  // 진도 갱신 헬퍼 (클라우드 복원 + visibility 복귀 시 공유)
  const refreshProgress = useCallback(() => {
    const saved = localStorage.getItem("completedLessons")
    if (saved) {
      const arr: (string | number)[] = JSON.parse(saved)
      setCompletedLessons(new Set(arr.map(id => typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id)))
    }
    const savedQ = localStorage.getItem("completedQuizzes")
    if (savedQ) {
      const arr: (string | number)[] = JSON.parse(savedQ)
      setCompletedQuizzes(new Set(arr.map(id => typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id)))
    }
  }, [])

  // 클라우드 복원 완료 시 진도 갱신
  useEffect(() => {
    window.addEventListener("cloud-data-restored", refreshProgress)
    return () => window.removeEventListener("cloud-data-restored", refreshProgress)
  }, [refreshProgress])

  // 퀴즈/레슨에서 돌아올 때 진도 갱신 (stale state 방지)
  useEffect(() => {
    const handleVisibility = () => { if (!document.hidden) refreshProgress() }
    document.addEventListener("visibilitychange", handleVisibility)
    return () => document.removeEventListener("visibilitychange", handleVisibility)
  }, [refreshProgress])

  // 로드 완료 후 다음 수업으로 자동 스크롤
  useEffect(() => {
    if (!loaded) return

    // URL hash가 있으면 hash 기반 스크롤 우선
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 400)
      return
    }

    // 다음 미완료 수업으로 스크롤
    const data = selectedCourse === "python" ? pythonCurriculumData : selectedCourse === "cpp" ? cppCurriculumData : pseudoCurriculumData
    for (const part of data) {
      for (const lesson of part.lessons) {
        if (!completedLessons.has(lesson.id)) {
          setTimeout(() => {
            const el = document.getElementById(`lesson-${lesson.id}`)
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          }, 400)
          return
        }
      }
    }
  }, [loaded]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCourseChange = (course: CourseType) => {
    setSelectedCourse(course)
    localStorage.setItem("selectedCourse", course)
  }

  const curriculumData = selectedCourse === "python" ? pythonCurriculumData : selectedCourse === "cpp" ? cppCurriculumData : pseudoCurriculumData
  const isCpp = selectedCourse === "cpp"
  const isPseudo = selectedCourse === "pseudo"

  const allLessons = curriculumData.flatMap((part) => part.lessons)
  const totalCount = allLessons.length
  const completedCount = allLessons.filter((lesson) => completedLessons.has(lesson.id)).length
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  // 학생: 순서대로만 열림 (완료한 곳 + 바로 다음 1개). 선생님: 전부 열림
  const unlockedLessons = new Set<number | string>()
  if (isTeacher || isPseudo) {
    // 선생님이거나 IGCSE 트랙이면 전부 열림
    allLessons.forEach((l) => unlockedLessons.add(l.id))
  } else {
    for (const lesson of allLessons) {
      unlockedLessons.add(lesson.id)
      if (!completedLessons.has(lesson.id)) break // 첫 미완료까지만
    }
  }

  const toggleCompletion = (id: number | string) => {
    const newCompleted = new Set(completedLessons)
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
    } else {
      newCompleted.add(id)
    }
    setCompletedLessons(newCompleted)
    localStorage.setItem("completedLessons", JSON.stringify([...newCompleted]))
  }

  /** 해당 레슨까지(포함) 모든 이전 레슨을 완료 처리 (건너뛰기) */
  const skipToLesson = (targetId: number | string) => {
    const data = selectedCourse === "python" ? pythonCurriculumData : selectedCourse === "cpp" ? cppCurriculumData : pseudoCurriculumData
    const allLessonIds = data.flatMap((p) => p.lessons.map((l) => l.id))
    const newCompleted = new Set(completedLessons)
    for (const id of allLessonIds) {
      newCompleted.add(id)
      if (id === targetId) break
    }
    setCompletedLessons(newCompleted)
    localStorage.setItem("completedLessons", JSON.stringify([...newCompleted]))
    setSkipConfirmId(null)
    // 건너뛴 이후 파트 자동 열기
    for (const part of data) {
      const ids = part.lessons.map((l) => l.id)
      if (ids.includes(targetId)) {
        const nextPartIdx = data.indexOf(part) + 1
        if (nextPartIdx < data.length) {
          setExpandedParts((prev) => new Set([...prev, data[nextPartIdx].id]))
        }
        break
      }
    }
  }

  const togglePart = (partId: string) => {
    const newExpanded = new Set(expandedParts)
    if (newExpanded.has(partId)) {
      newExpanded.delete(partId)
    } else {
      newExpanded.add(partId)
    }
    setExpandedParts(newExpanded)
  }

  const getNextLesson = () => {
    for (const part of curriculumData) {
      for (const lesson of part.lessons) {
        if (!completedLessons.has(lesson.id)) {
          return { lesson, part }
        }
      }
    }
    return null
  }

  const nextLessonInfo = getNextLesson()

  return (
    <RequireAuth>
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <Header />

      {/* 커리큘럼: 넓은 레이아웃 + 양쪽 여백 */}
      <main className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-24">
        
        {/* 코스 선택 탭 */}
        <div className="max-w-[1600px] mx-auto mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => handleCourseChange("python")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border-3 border-black font-bold text-base transition-all ${
                selectedCourse === "python"
                  ? "bg-orange-400 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-gray-600 hover:bg-orange-50"
              }`}
            >
              🐍 Python
            </button>
            <button
              onClick={() => handleCourseChange("cpp")}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border-3 border-black font-bold text-base transition-all ${
                selectedCourse === "cpp"
                  ? "bg-blue-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-gray-600 hover:bg-blue-50"
              }`}
            >
              ⚡ C++
            </button>
            {isTeacher && (
              <button
                onClick={() => handleCourseChange("pseudo")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border-3 border-black font-bold text-base transition-all ${
                  selectedCourse === "pseudo"
                    ? "bg-green-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-gray-600 hover:bg-green-50"
                }`}
              >
                📄 IGCSE
              </button>
            )}
          </div>
        </div>

        {/* 상단 진도 바 */}
        <div className="max-w-[1600px] mx-auto">
          <div className={`bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border-4 border-black`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className={`${isPseudo ? 'bg-green-100' : isCpp ? 'bg-blue-100' : 'bg-orange-100'} p-3 rounded-xl border-2 border-black`}>
                  <BookOpen className={`h-8 w-8 ${isPseudo ? 'text-green-500' : isCpp ? 'text-blue-500' : 'text-orange-500'}`} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {isPseudo ? t("IGCSE 0478 마스터", "IGCSE 0478 Master") : isCpp ? t("C++ 기초 (파이썬 → C++)", "C++ Basics (Python → C++)") : t("파이썬 기초 마스터", "Python Basics Master")}
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {isPseudo ? t("수도코드, SQL, Logic Gates까지! 📄", "Pseudocode, SQL, Logic Gates & more! 📄") : isCpp ? t("파이썬을 아는 학생을 위한 C++ 입문! ⚡", "C++ for Python students! ⚡") : t("웹에서 바로 배우는 파이썬! 🚀", "Learn Python on the web! 🚀")}
                  </p>
                </div>
              </div>
              
              {/* 다음 수업 버튼 */}
              {nextLessonInfo && (
                <Link
                  href={`/learn/${nextLessonInfo.lesson.id}`}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl border-2 border-black font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Sparkles className="h-5 w-5" />
                  <span className="hidden sm:inline">{t("다음:", "Next:")}</span> {nextLessonInfo.lesson.title}
                  <Play className="h-5 w-5" />
                </Link>
              )}
            </div>
            
            {/* 진도 바 */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="h-4 sm:h-5 bg-gray-200 rounded-full border-2 border-black overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${isPseudo ? 'bg-gradient-to-r from-green-400 to-green-500' : isCpp ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-gradient-to-r from-orange-400 to-orange-500'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`text-xl sm:text-2xl font-bold ${isPseudo ? 'text-green-500' : isCpp ? 'text-blue-500' : 'text-orange-500'}`}>{progress}%</span>
                <span className="text-gray-500 ml-1 text-sm">({completedCount}/{totalCount})</span>
              </div>
            </div>
          </div>
        </div>

        {/* P2 민준: 신규 학생 시작점 설정 배너 */}
        {loaded && completedCount === 0 && !isTeacher && !isPseudo && (
          <div className="max-w-[1600px] mx-auto mb-4">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border-2 border-indigo-200 p-4 flex items-start gap-3">
              <span className="text-2xl shrink-0">🎯</span>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm">
                  {t(
                    "이미 Python을 배운 적 있나요?",
                    "Have you learned Python before?",
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t(
                    "처음부터 할 필요 없어요! 아는 레슨의 🔓 건너뛰기 버튼을 눌러 원하는 레슨부터 시작하세요.",
                    "No need to start from scratch! Click 🔓 Skip on lessons you already know.",
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 커리큘럼 그리드 - 반응형 */}
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
            {curriculumData.map((part) => {
              const partLessons = part.lessons
              const isComingSoon = part.comingSoon
              const partCompletedCount = partLessons.filter((l) => completedLessons.has(l.id)).length
              const partProgress = partLessons.length > 0 ? Math.round((partCompletedCount / partLessons.length) * 100) : 0
              const isExpanded = expandedParts.has(part.id)
              const hasLessons = partLessons.length > 0

              return (
                <div key={part.id} className={`bg-white rounded-2xl border-3 border-black shadow-lg overflow-hidden ${isComingSoon ? 'opacity-60' : ''}`}>
                  {/* Part Header */}
                  <button
                    onClick={() => !isComingSoon && hasLessons && togglePart(part.id)}
                    disabled={isComingSoon}
                    className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
                  >
                    {!isComingSoon && hasLessons ? (
                      isExpanded ? (
                        <ChevronDown className="h-6 w-6 text-gray-600 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-6 w-6 text-gray-600 flex-shrink-0" />
                      )
                    ) : (
                      <div className="h-6 w-6 flex-shrink-0" />
                    )}

                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">{part.title}</h2>
                        {isComingSoon && (
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs font-bold">
                            {t("준비중", "Coming Soon")}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{part.description}</p>

                      {hasLessons && (
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-semibold text-gray-500">
                              {partCompletedCount}/{partLessons.length} {t("완료", "done")}
                            </span>
                            <span className={`text-xs font-bold ${isPseudo ? 'text-green-500' : isCpp ? 'text-blue-500' : 'text-orange-500'}`}>{partProgress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full border border-black overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${isPseudo ? 'bg-gradient-to-r from-green-400 to-green-500' : isCpp ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-gradient-to-r from-orange-400 to-orange-500'}`}
                              style={{ width: `${partProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {partProgress === 100 && hasLessons && (
                      <Trophy className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                    )}
                  </button>

                  {/* Lessons List */}
                  {isExpanded && hasLessons && !isComingSoon && (
                    <div className="border-t-2 border-black bg-gray-50 p-3 sm:p-4">
                      <div className="space-y-2 sm:space-y-3">
                        {partLessons.map((lesson) => {
                          const isCompleted = completedLessons.has(lesson.id)
                          const isQuizDone = completedQuizzes.has(lesson.id)
                          const isNextLesson = nextLessonInfo?.lesson.id === lesson.id
                          const isLocked = !unlockedLessons.has(lesson.id)

                          return (
                            <div
                              key={lesson.id}
                              id={`lesson-${lesson.id}`}
                              className={`rounded-xl p-3 sm:p-4 border-2 transition-all ${
                                isLocked
                                  ? 'bg-gray-100 border-gray-300 opacity-60'
                                  : isNextLesson
                                    ? `bg-white border-orange-400 ring-2 ${isPseudo ? 'ring-green-400' : isCpp ? 'ring-blue-400' : 'ring-orange-400'} ring-offset-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`
                                    : 'bg-white border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {/* 체크박스 또는 잠금 아이콘 */}
                                {isLocked ? (
                                  <Lock className="h-6 w-6 sm:h-7 sm:w-7 text-gray-400 flex-shrink-0" />
                                ) : (
                                  <button
                                    onClick={() => toggleCompletion(lesson.id)}
                                    className="flex-shrink-0"
                                  >
                                    {isCompleted ? (
                                      <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 text-green-500" />
                                    ) : (
                                      <Circle className="h-6 w-6 sm:h-7 sm:w-7 text-gray-300 hover:text-gray-400" />
                                    )}
                                  </button>
                                )}

                                {/* 레슨 정보 */}
                                <div className="flex-1 min-w-0">
                                  <h3 className={`font-bold text-sm sm:text-base ${isLocked ? "text-gray-400" : isCompleted ? "line-through text-gray-400" : "text-gray-900"}`}>
                                    {lesson.title}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    {isNextLesson && !isLocked && (
                                      <span className={`whitespace-nowrap px-2 py-0.5 rounded-full text-xs font-bold text-white animate-pulse ${isPseudo ? 'bg-green-500' : isCpp ? 'bg-blue-500' : 'bg-orange-500'}`}>
                                        ▶ {t("다음", "Next")}
                                      </span>
                                    )}
                                    {isLocked ? (
                                      <span className="text-xs text-gray-400 italic">
                                        {t("이전 수업을 완료하면 열려요", "Complete the previous lesson to unlock")}
                                      </span>
                                    ) : (
                                      <>
                                        <span className="flex items-center gap-1 text-gray-500 text-xs">
                                          <Clock className="h-3 w-3" />
                                          {lesson.duration}
                                        </span>
                                        {lesson.hasQuiz && (
                                          <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-xs font-bold">
                                            {t("복습", "Review")}
                                          </span>
                                        )}
                                        {lesson.isProject && (
                                          <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded text-xs font-bold">
                                            {t("프로젝트", "Project")}
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>

                                {/* 버튼들: 잠긴 수업은 건너뛰기 버튼 표시 (선생님 제외) */}
                                <div className="flex gap-2 flex-shrink-0">
                                  {isLocked ? (
                                    !isTeacher && !isPseudo ? (
                                      skipConfirmId === lesson.id ? (
                                        // 확인 단계
                                        <div className="flex flex-col items-end gap-1">
                                          <p className="text-[10px] text-gray-500 text-right leading-tight">
                                            {t("이전 레슨도 완료 처리돼요", "Previous lessons will be marked done")}
                                          </p>
                                          <div className="flex gap-1">
                                            <button
                                              onClick={() => setSkipConfirmId(null)}
                                              className="px-2 py-1 rounded-lg border border-gray-300 text-gray-400 text-[10px] font-bold hover:bg-gray-50"
                                            >
                                              {t("취소", "Cancel")}
                                            </button>
                                            <button
                                              onClick={() => skipToLesson(lesson.id)}
                                              className="px-2 py-1 rounded-lg border border-orange-400 bg-orange-50 text-orange-600 text-[10px] font-bold hover:bg-orange-100"
                                            >
                                              {t("건너뛰기 ✓", "Skip ✓")}
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() => setSkipConfirmId(lesson.id)}
                                          className="px-2 sm:px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-400 text-xs font-bold hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                                          title={t("이미 아는 내용이라면 건너뛰기", "Skip if you already know this")}
                                        >
                                          🔓 {t("건너뛰기", "Skip")}
                                        </button>
                                      )
                                    ) : (
                                      <span className="px-3 sm:px-4 py-2 rounded-lg border-2 border-gray-300 font-bold text-gray-400 text-xs sm:text-sm cursor-not-allowed">
                                        🔒
                                      </span>
                                    )
                                  ) : (
                                    <>
                                      <Link
                                        href={`/learn/${lesson.id}`}
                                        className={`min-w-[5.5rem] sm:min-w-[6.5rem] text-center px-3 sm:px-4 py-2 rounded-lg border-2 font-bold text-xs sm:text-sm ${
                                          isCompleted
                                            ? "border-green-600 bg-green-50 text-green-700 hover:bg-green-100"
                                            : `border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isPseudo ? "bg-green-500 hover:bg-green-600" : isCpp ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`
                                        }`}
                                      >
                                        {isCompleted ? t("✅ 수업완료", "✅ Done") : t("📺 수업", "📺 Lesson")}
                                      </Link>
                                      {isCompleted && !isPseudo && (!isCpp || cppReviewIds.has(String(lesson.id))) && (
                                        <Link
                                          href={getReviewPath(lesson.id)}
                                          className={`min-w-[5.5rem] sm:min-w-[6.5rem] text-center px-3 sm:px-4 py-2 rounded-lg border-2 font-bold text-xs sm:text-sm ${
                                            isQuizDone
                                              ? "border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100"
                                              : "border-black bg-orange-400 text-white hover:bg-orange-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                          }`}
                                        >
                                          {isQuizDone ? t("📘 복습완료", "📘 Reviewed") : t("📝 복습", "📝 Review")}
                                        </Link>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
    </RequireAuth>
  )
}
