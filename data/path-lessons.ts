// 경로(/course/next) 앞단 '수업(레슨)' 노드 — 언어 단계. (2026-06-29 unified_path 통합)
// app/curriculum/page.tsx 의 pythonCurriculumData/cppCurriculumData 순서·제목에서 추출(읽기 전용 복제).
// 완료는 completedLessons(union) 가 id 로 판정. url=/learn/<id>. 레슨 먼저 → 그 뒤 LADDER 문제.

export type PathCourse = "python" | "cpp";
export interface PathLesson { id: string; title: string; project?: boolean }

export const PATH_LESSONS: Record<PathCourse, PathLesson[]> = {
  python: [
    { id: "1", title: "1. print() 출력" }, { id: "2", title: "2. 데이터 타입" }, { id: "3", title: "3. 변수" },
    { id: "4", title: "4. 연산자" }, { id: "5", title: "5. 문자열 연산" }, { id: "6", title: "6. 문자열 메서드" },
    { id: "7", title: "7. print() 옵션" }, { id: "8", title: "8. f-string" }, { id: "9", title: "9. 타입 변환" },
    { id: "10", title: "10. input() 입력" }, { id: "p1", title: "🎮 미니 계산기", project: true },
    { id: "11", title: "11. 조건문 (if)" }, { id: "12", title: "12. 조건문 심화" }, { id: "13", title: "13. 반복문 (for)" },
    { id: "14", title: "14. 반복문 (while)" }, { id: "p2", title: "🎮 숫자 맞추기 게임", project: true },
    { id: "15", title: "15. 자료구조 개요" }, { id: "16", title: "16. 리스트 기초" }, { id: "17", title: "17. 리스트와 반복문" },
    { id: "18", title: "18. split()과 join()" }, { id: "19", title: "19. 튜플" }, { id: "20", title: "20. 딕셔너리" },
    { id: "21", title: "21. 집합 (set)" }, { id: "22", title: "22. 슬라이싱" }, { id: "p3", title: "🎮 Hangman 게임", project: true },
    { id: "23", title: "23. 스택 (Stack)" }, { id: "24", title: "24. 큐 (Queue)" }, { id: "25", title: "25. 덱 (Deque)" },
    { id: "26", title: "26. 자료구조 비교와 선택" },
    { id: "27", title: "27. 가위바위보 게임" }, { id: "28", title: "28. 로또 번호 생성기" }, { id: "29", title: "29. 단어장 프로그램" },
    { id: "30", title: "30. 성적 관리 시스템" }, { id: "31", title: "31. 종합 문제 모음" },
    { id: "32", title: "32. 함수란?" }, { id: "33", title: "33. 매개변수와 반환값" }, { id: "34", title: "34. 함수 활용" },
    { id: "35", title: "35. 내장함수 총정리" }, { id: "36", title: "36. 함수 문제 30" },
    { id: "37", title: "37. 에러 처리하기" }, { id: "38", title: "38. 파일 읽고 쓰기" }, { id: "39", title: "39. 게임 세이브" },
    { id: "40", title: "40. Part 6 문제 20" },
    { id: "41", title: "41. 클래스 기초" }, { id: "42", title: "42. 메서드와 속성" }, { id: "43", title: "43. RPG 게임" },
    { id: "44", title: "44. Part 7 문제 20" },
    { id: "45", title: "45. 모듈 기초" }, { id: "46", title: "46. 패키지와 pip" }, { id: "47", title: "47. 날씨 앱" },
    { id: "48", title: "48. Part 8 문제 20" },
    { id: "49", title: "49. 텍스트 RPG: 게임 설계" }, { id: "50", title: "50. 텍스트 RPG: 핵심 시스템" },
    { id: "51", title: "51. 텍스트 RPG: 게임 완성" }, { id: "52", title: "52. 텍스트 RPG: 업그레이드" },
    { id: "p4", title: "🐍 Snake Game", project: true },
  ],
  cpp: [
    { id: "cpp-1", title: "1. 파이썬 vs C++" }, { id: "cpp-2", title: "2. cout 심화 & namespace" },
    { id: "cpp-3", title: "3. 변수와 타입" }, { id: "cpp-4", title: "4. cin 입력" }, { id: "cpp-5", title: "5. 연산자" },
    { id: "cpp-6", title: "6. 조건문 (if/else)" }, { id: "cpp-7", title: "7. 반복문 (for/while)" }, { id: "cpp-8", title: "8. 함수" },
    { id: "cpp-p1", title: "🎮 숫자 맞추기 게임", project: true },
    { id: "cpp-9", title: "9. 배열 & 벡터" }, { id: "cpp-21", title: "10. 2차원 배열 & 2D vector" },
    { id: "cpp-12", title: "11. 참조와 함수" }, { id: "cpp-13", title: "12. 포인터 기초" }, { id: "cpp-10", title: "13. Range-for & auto" },
    { id: "cpp-11", title: "14. 문자열 심화" }, { id: "cpp-14", title: "15. 구조체 (struct)" }, { id: "cpp-22", title: "16. 클래스 (class)" },
    { id: "cpp-p2", title: "⚔️ RPG 캐릭터 관리", project: true },
    { id: "cpp-15", title: "17. pair & tuple" }, { id: "cpp-23", title: "18. sort 기본" }, { id: "cpp-25", title: "19. 정렬 후 빠른 검색" },
    { id: "cpp-16", title: "20. map & set" }, { id: "cpp-24", title: "21. 🚀 알고리즘 시작 전 셋업" }, { id: "cpp-26", title: "22. sort 응용 패턴 📌" },
    { id: "cpp-17", title: "23. STL 탐색 함수 📌" }, { id: "cpp-18", title: "24. stack & queue" }, { id: "cpp-19", title: "25. 파일 I/O" },
    { id: "cpp-20", title: "26. CP 실전 팁 📌" }, { id: "cpp-p3", title: "🏆 USACO 모의전", project: true },
  ],
};
