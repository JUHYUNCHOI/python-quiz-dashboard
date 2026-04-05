export interface LessonOption {
  id: string
  label: string
  group: string
}

export const PYTHON_LESSONS: LessonOption[] = [
  { id: "1",  label: "1. print() 출력",        group: "Python Part 1" },
  { id: "2",  label: "2. 데이터 타입",          group: "Python Part 1" },
  { id: "3",  label: "3. 변수",                group: "Python Part 1" },
  { id: "4",  label: "4. 연산자",              group: "Python Part 1" },
  { id: "5",  label: "5. 문자열 연산",          group: "Python Part 1" },
  { id: "6",  label: "6. 문자열 메서드",        group: "Python Part 1" },
  { id: "7",  label: "7. print() 옵션",        group: "Python Part 1" },
  { id: "8",  label: "8. f-string",            group: "Python Part 1" },
  { id: "9",  label: "9. 타입 변환",            group: "Python Part 1" },
  { id: "10", label: "10. input() 입력",        group: "Python Part 1" },
  { id: "11", label: "11. 조건문 (if)",         group: "Python Part 2" },
  { id: "12", label: "12. 조건문 심화",         group: "Python Part 2" },
  { id: "13", label: "13. 반복문 (for)",        group: "Python Part 2" },
  { id: "14", label: "14. 반복문 (while)",      group: "Python Part 2" },
  { id: "15", label: "15. 자료구조 개요",        group: "Python Part 3" },
  { id: "16", label: "16. 리스트 기초",         group: "Python Part 3" },
  { id: "17", label: "17. 리스트와 반복문",      group: "Python Part 3" },
  { id: "18", label: "18. split()과 join()",   group: "Python Part 3" },
  { id: "19", label: "19. 튜플",               group: "Python Part 3" },
  { id: "20", label: "20. 딕셔너리",            group: "Python Part 3" },
  { id: "21", label: "21. 집합 (set)",          group: "Python Part 3" },
  { id: "22", label: "22. 슬라이싱",            group: "Python Part 3" },
  { id: "23", label: "23. 스택 (Stack)",        group: "Python Part 4" },
  { id: "24", label: "24. 큐 (Queue)",          group: "Python Part 4" },
  { id: "25", label: "25. 덱 (Deque)",          group: "Python Part 4" },
  { id: "26", label: "26. 자료구조 비교와 선택", group: "Python Part 4" },
  { id: "27", label: "27. 가위바위보 게임",      group: "Python Part 4" },
  { id: "28", label: "28. 로또 번호 생성기",     group: "Python Part 4" },
  { id: "29", label: "29. 단어장 프로그램",      group: "Python Part 4" },
  { id: "30", label: "30. 성적 관리 시스템",     group: "Python Part 4" },
  { id: "31", label: "31. 종합 문제 모음",       group: "Python Part 4" },
  { id: "32", label: "32. 함수란?",             group: "Python Part 5" },
  { id: "33", label: "33. 매개변수와 반환값",    group: "Python Part 5" },
  { id: "34", label: "34. 함수 활용",           group: "Python Part 5" },
  { id: "35", label: "35. 내장함수 총정리",      group: "Python Part 5" },
  { id: "36", label: "36. 함수 문제 30",        group: "Python Part 5" },
  { id: "37", label: "37. 에러 처리하기",        group: "Python Part 6" },
  { id: "38", label: "38. 파일 읽고 쓰기",       group: "Python Part 6" },
  { id: "39", label: "39. 게임 세이브",          group: "Python Part 6" },
  { id: "40", label: "40. Part 6 문제 20",      group: "Python Part 6" },
  { id: "41", label: "41. 클래스 기초",          group: "Python Part 7" },
  { id: "42", label: "42. 메서드와 속성",        group: "Python Part 7" },
  { id: "43", label: "43. RPG 게임",            group: "Python Part 7" },
  { id: "44", label: "44. Part 7 문제 20",      group: "Python Part 7" },
  { id: "45", label: "45. 모듈 기초",            group: "Python Part 8" },
  { id: "46", label: "46. 패키지와 pip",         group: "Python Part 8" },
  { id: "47", label: "47. 날씨 앱",              group: "Python Part 8" },
  { id: "48", label: "48. Part 8 문제 20",      group: "Python Part 8" },
  { id: "49", label: "49. 텍스트 RPG: 게임 설계", group: "Python Part 9" },
  { id: "50", label: "50. 텍스트 RPG: 핵심 시스템", group: "Python Part 9" },
  { id: "51", label: "51. 텍스트 RPG: 게임 완성", group: "Python Part 9" },
  { id: "52", label: "52. 텍스트 RPG: 업그레이드", group: "Python Part 9" },
]

export const CPP_LESSONS: LessonOption[] = [
  { id: "cpp-1",  label: "1. 파이썬 vs C++",          group: "C++ Part 1" },
  { id: "cpp-2",  label: "2. cout 심화 & namespace",   group: "C++ Part 1" },
  { id: "cpp-3",  label: "3. 변수와 타입",              group: "C++ Part 1" },
  { id: "cpp-4",  label: "4. cin 입력",                group: "C++ Part 1" },
  { id: "cpp-5",  label: "5. 연산자",                  group: "C++ Part 1" },
  { id: "cpp-6",  label: "6. 조건문 (if/else)",        group: "C++ Part 1" },
  { id: "cpp-7",  label: "7. 반복문 (for/while)",      group: "C++ Part 1" },
  { id: "cpp-8",  label: "8. 함수",                   group: "C++ Part 1" },
  { id: "cpp-9",  label: "9. 배열 & 벡터",             group: "C++ Part 2" },
  { id: "cpp-21", label: "10. 2차원 배열 & 2D vector", group: "C++ Part 2" },
  { id: "cpp-10", label: "11. Range-for & auto",      group: "C++ Part 2" },
  { id: "cpp-11", label: "12. 문자열 심화",             group: "C++ Part 2" },
  { id: "cpp-12", label: "13. 참조와 함수",             group: "C++ Part 2" },
  { id: "cpp-13", label: "14. 포인터 기초",             group: "C++ Part 2" },
  { id: "cpp-14", label: "15. 구조체 (struct)",         group: "C++ Part 2" },
  { id: "cpp-22", label: "16. 클래스 (class)",          group: "C++ Part 2" },
  { id: "cpp-15", label: "17. pair & tuple",           group: "C++ Part 3" },
  { id: "cpp-23", label: "18. sort 마스터",             group: "C++ Part 3" },
  { id: "cpp-16", label: "19. map & set",              group: "C++ Part 3" },
  { id: "cpp-17", label: "20. STL 탐색 함수",           group: "C++ Part 3" },
  { id: "cpp-18", label: "21. stack & queue",          group: "C++ Part 3" },
  { id: "cpp-19", label: "22. 파일 I/O & Fast I/O",    group: "C++ Part 3" },
  { id: "cpp-20", label: "23. CP 실전 팁",              group: "C++ Part 3" },
]

export const PSEUDO_LESSONS: LessonOption[] = [
  { id: "pseudo-1",  label: "1. OUTPUT 출력",        group: "Pseudocode Part 1" },
  { id: "pseudo-2",  label: "2. 변수",               group: "Pseudocode Part 1" },
  { id: "pseudo-3",  label: "3. INPUT 입력",         group: "Pseudocode Part 1" },
  { id: "pseudo-4",  label: "4. 자료형",              group: "Pseudocode Part 1" },
  { id: "pseudo-28", label: "5. 연산자 & 필수 표현",  group: "Pseudocode Part 1" },
  { id: "pseudo-5",  label: "6. 조건문",              group: "Pseudocode Part 1" },
  { id: "pseudo-6",  label: "7. 반복문 1",            group: "Pseudocode Part 1" },
  { id: "pseudo-7",  label: "8. 반복문 2",            group: "Pseudocode Part 1" },
  { id: "pseudo-8",  label: "9. 배열",               group: "Pseudocode Part 1" },
  { id: "pseudo-9",  label: "10. CASE 선택문",        group: "Pseudocode Part 2" },
  { id: "pseudo-10", label: "11. 프로시저 & 함수",    group: "Pseudocode Part 2" },
  { id: "pseudo-11", label: "12. 매개변수",           group: "Pseudocode Part 2" },
  { id: "pseudo-12", label: "13. 문자열 처리",        group: "Pseudocode Part 2" },
  { id: "pseudo-13", label: "14. 파일 처리",          group: "Pseudocode Part 2" },
  { id: "pseudo-14", label: "15. 2D 배열",            group: "Pseudocode Part 2" },
]

export const ALL_LESSONS: LessonOption[] = [
  ...PYTHON_LESSONS,
  ...CPP_LESSONS,
  ...PSEUDO_LESSONS,
]

export function getLessonLabel(id: string | number): string {
  const sid = String(id)
  return ALL_LESSONS.find(l => l.id === sid)?.label ?? sid
}

/** Returns only lessons for a given language */
export function getLessonsForLanguage(language: string): LessonOption[] {
  if (language === "python") return PYTHON_LESSONS
  if (language === "cpp") return CPP_LESSONS
  if (language === "pseudocode") return PSEUDO_LESSONS
  return ALL_LESSONS
}
