import {
  // Korean lessons 1-26
  lesson1Data, lesson2Data, lesson3Data, lesson4Data, lesson5Data,
  lesson6Data, lesson7Data, lesson8Data, lesson9Data, lesson10Data,
  lesson11Data, lesson12Data, lesson13Data, lesson14Data, lesson15Data,
  lesson16Data, lesson17Data, lesson18Data, lesson19Data, lesson20Data,
  lesson21Data, lesson22Data, lesson23Data, lesson24Data, lesson25Data,
  lesson26Data,
  // Korean lessons 27-31
  lesson27, lesson28, lesson29, lesson30, lesson31,
  // Korean lessons 32-36
  lesson32Data, lesson33Data, lesson34Data, lesson35Data, lesson36Data,
  // Korean lessons 37-52
  lesson37, lesson38, lesson39, lesson40, lesson41,
  lesson42, lesson43, lesson44,
  lesson45, lesson46, lesson47, lesson48,
  lesson49, lesson50, lesson51, lesson52,
  // Korean project lessons
  lessonP1Data, lessonP2Data, lessonP3Data,
  lessonP4Data, lessonP4PygameData,
  // IGCSE Korean lessons
  igcseLessonSql1Data, igcseLessonSql2Data, igcseLessonLogic1Data,
  // English lessons 1-26
  lesson1EnData, lesson2EnData, lesson3EnData, lesson4EnData, lesson5EnData,
  lesson6EnData, lesson7EnData, lesson8EnData, lesson9EnData, lesson10EnData,
  lesson11EnData, lesson12EnData, lesson13EnData, lesson14EnData, lesson15EnData,
  lesson16EnData, lesson17EnData, lesson18EnData, lesson19EnData, lesson20EnData,
  lesson21EnData, lesson22EnData, lesson23EnData, lesson24EnData, lesson25EnData,
  lesson26EnData,
  // English lessons 27-31
  lesson27EnData, lesson28EnData, lesson29EnData, lesson30EnData, lesson31EnData,
  // English lessons 32-36
  lesson32EnData, lesson33EnData, lesson34EnData, lesson35EnData, lesson36EnData,
  // English lessons 37-52
  lesson37EnData, lesson38EnData, lesson39EnData, lesson40EnData,
  lesson41EnData, lesson42EnData, lesson43EnData, lesson44EnData,
  lesson45EnData, lesson46EnData, lesson47EnData, lesson48EnData,
  lesson49EnData, lesson50EnData, lesson51EnData, lesson52EnData,
  // English project lessons
  lessonP1EnData, lessonP2EnData, lessonP3EnData,
  lessonP4EnData, lessonP4PygameEnData,
  // IGCSE English lessons
  igcseLessonSql1EnData, igcseLessonSql2EnData, igcseLessonLogic1EnData,
  // C++ Korean lessons
  cppLesson1Data, cppLesson2Data, cppLesson3Data, cppLesson4Data,
  cppLesson5Data, cppLesson6Data, cppLesson7Data, cppLesson8Data,
  cppLesson9Data, cppLesson10Data, cppLesson11Data, cppLesson12Data,
  cppLesson13Data, cppLesson14Data,
  // C++ Korean lessons 15-22
  cppLesson15Data, cppLesson16Data, cppLesson17Data, cppLesson18Data,
  cppLesson19Data, cppLesson20Data, cppLesson21Data, cppLesson22Data, cppLesson23Data,
  // C++ lesson 23 English
  cppLesson23EnData,
  // C++ checkpoint lessons (Korean)
  cppLessonCk1Data, cppLessonCk2Data, cppLessonCk3Data, cppLessonCk4Data, cppLessonCk5Data,
  cppLessonCk6Data, cppLessonCk7Data, cppLessonCk8Data, cppLessonCk9Data, cppLessonCk10Data,
  // C++ checkpoint lessons (English)
  cppLessonCk1EnData, cppLessonCk2EnData, cppLessonCk3EnData, cppLessonCk4EnData, cppLessonCk5EnData,
  cppLessonCk6EnData, cppLessonCk7EnData, cppLessonCk8EnData, cppLessonCk9EnData, cppLessonCk10EnData,
  // C++ project lessons
  cppLessonP1Data, cppLessonP2Data, cppLessonP3Data,
  // C++ English lessons
  cppLesson1EnData, cppLesson2EnData, cppLesson3EnData, cppLesson4EnData,
  cppLesson5EnData, cppLesson6EnData, cppLesson7EnData, cppLesson8EnData,
  cppLesson9EnData, cppLesson10EnData, cppLesson11EnData, cppLesson12EnData,
  cppLesson13EnData, cppLesson14EnData,
  // C++ English lessons 15-22
  cppLesson15EnData, cppLesson16EnData, cppLesson17EnData, cppLesson18EnData,
  cppLesson19EnData, cppLesson20EnData, cppLesson21EnData, cppLesson22EnData,
  // C++ English project lessons
  cppLessonP1EnData, cppLessonP2EnData, cppLessonP3EnData,
  // Pseudocode Korean lessons
  pseudoLesson1Data, pseudoLesson2Data, pseudoLesson3Data, pseudoLesson4Data,
  pseudoLesson5Data, pseudoLesson6Data, pseudoLesson7Data, pseudoLesson8Data,
  pseudoLesson9Data, pseudoLesson10Data, pseudoLesson11Data, pseudoLesson12Data,
  pseudoLesson13Data, pseudoLesson14Data,
  pseudoLesson15Data, pseudoLesson16Data, pseudoLesson17Data, pseudoLesson18Data,
  pseudoLesson19Data, pseudoLesson20Data,
  pseudoLesson21Data, pseudoLesson22Data, pseudoLesson23Data, pseudoLesson24Data,
  pseudoLesson25Data, pseudoLesson26Data, pseudoLesson27Data, pseudoLesson28Data,
  pseudoLessonP1Data, pseudoLessonP2Data, pseudoLessonP3Data,
  // Pseudocode English lessons
  pseudoLesson1EnData, pseudoLesson2EnData, pseudoLesson3EnData, pseudoLesson4EnData,
  pseudoLesson5EnData, pseudoLesson6EnData, pseudoLesson7EnData, pseudoLesson8EnData,
  pseudoLesson9EnData, pseudoLesson10EnData, pseudoLesson11EnData, pseudoLesson12EnData,
  pseudoLesson13EnData, pseudoLesson14EnData,
  pseudoLesson15EnData, pseudoLesson16EnData, pseudoLesson17EnData, pseudoLesson18EnData,
  pseudoLesson19EnData, pseudoLesson20EnData,
  pseudoLesson21EnData, pseudoLesson22EnData, pseudoLesson23EnData, pseudoLesson24EnData,
  pseudoLesson25EnData, pseudoLesson26EnData, pseudoLesson27EnData, pseudoLesson28EnData,
  pseudoLessonP1EnData, pseudoLessonP2EnData, pseudoLessonP3EnData,
} from "@/data"
import { loadLesson, isBilingual, getAllLessonIds, getBilingualLessonIds } from "@/data"
import type { LessonData } from "./types"

// ============================================
// Static 레슨 맵 (기존 호환)
// ============================================
export const lessonsData: Record<string, LessonData> = {
  "1": lesson1Data, "2": lesson2Data, "3": lesson3Data, "4": lesson4Data, "5": lesson5Data,
  "6": lesson6Data, "7": lesson7Data, "8": lesson8Data, "9": lesson9Data, "10": lesson10Data,
  "11": lesson11Data, "12": lesson12Data, "13": lesson13Data, "14": lesson14Data,
  "15": lesson15Data, "16": lesson16Data, "17": lesson17Data, "18": lesson18Data,
  "19": lesson19Data, "20": lesson20Data, "21": lesson21Data, "22": lesson22Data,
  "23": lesson23Data, "24": lesson24Data, "25": lesson25Data, "26": lesson26Data,
  "27": lesson27 as any, "28": lesson28 as any, "29": lesson29 as any, "30": lesson30 as any,
  "31": lesson31 as any,
  "32": lesson32Data, "33": lesson33Data, "34": lesson34Data, "35": lesson35Data, "36": lesson36Data,
  "37": lesson37 as any, "38": lesson38 as any, "39": lesson39 as any, "40": lesson40 as any,
  "41": lesson41 as any, "42": lesson42 as any, "43": lesson43 as any, "44": lesson44 as any,
  "45": lesson45 as any, "46": lesson46 as any, "47": lesson47 as any, "48": lesson48 as any,
  "49": lesson49 as any, "50": lesson50 as any, "51": lesson51 as any, "52": lesson52 as any,
  "p1": lessonP1Data, "p2": lessonP2Data, "p3": lessonP3Data, "p4": lessonP4Data,
  // C++ Part 1
  "cpp-1": cppLesson1Data, "cpp-2": cppLesson2Data, "cpp-3": cppLesson3Data, "cpp-4": cppLesson4Data,
  "cpp-5": cppLesson5Data, "cpp-6": cppLesson6Data, "cpp-7": cppLesson7Data, "cpp-ck1": cppLessonCk1Data, "cpp-8": cppLesson8Data,
  // C++ Part 2
  "cpp-9": cppLesson9Data, "cpp-ck2": cppLessonCk2Data, "cpp-10": cppLesson10Data, "cpp-11": cppLesson11Data, "cpp-12": cppLesson12Data,
  "cpp-13": cppLesson13Data, "cpp-14": cppLesson14Data,
  "cpp-21": cppLesson21Data, "cpp-22": cppLesson22Data, "cpp-ck3": cppLessonCk3Data,
  // C++ Part 3
  "cpp-15": cppLesson15Data, "cpp-23": cppLesson23Data, "cpp-ck4": cppLessonCk4Data,
  "cpp-16": cppLesson16Data, "cpp-ck5": cppLessonCk5Data, "cpp-17": cppLesson17Data, "cpp-18": cppLesson18Data,
  "cpp-ck6": cppLessonCk6Data, "cpp-ck7": cppLessonCk7Data, "cpp-ck8": cppLessonCk8Data,
  "cpp-ck9": cppLessonCk9Data, "cpp-ck10": cppLessonCk10Data,
  "cpp-19": cppLesson19Data, "cpp-20": cppLesson20Data,
  // C++ projects
  "cpp-p1": cppLessonP1Data, "cpp-p2": cppLessonP2Data, "cpp-p3": cppLessonP3Data,
  // Pseudocode Part 1
  "pseudo-1": pseudoLesson1Data, "pseudo-2": pseudoLesson2Data, "pseudo-3": pseudoLesson3Data, "pseudo-4": pseudoLesson4Data,
  "pseudo-5": pseudoLesson5Data, "pseudo-6": pseudoLesson6Data, "pseudo-7": pseudoLesson7Data, "pseudo-8": pseudoLesson8Data,
  "pseudo-p1": pseudoLessonP1Data,
  // Pseudocode Part 2
  "pseudo-9": pseudoLesson9Data, "pseudo-10": pseudoLesson10Data, "pseudo-11": pseudoLesson11Data, "pseudo-12": pseudoLesson12Data,
  "pseudo-13": pseudoLesson13Data, "pseudo-14": pseudoLesson14Data, "pseudo-p2": pseudoLessonP2Data,
  // Pseudocode Part 3
  "pseudo-15": pseudoLesson15Data, "pseudo-16": pseudoLesson16Data, "pseudo-17": pseudoLesson17Data, "pseudo-18": pseudoLesson18Data,
  "pseudo-19": pseudoLesson19Data, "pseudo-20": pseudoLesson20Data, "pseudo-p3": pseudoLessonP3Data,
  // Pseudocode Part 4
  "pseudo-21": pseudoLesson21Data, "pseudo-22": pseudoLesson22Data, "pseudo-23": pseudoLesson23Data, "pseudo-24": pseudoLesson24Data,
  "pseudo-25": pseudoLesson25Data, "pseudo-26": pseudoLesson26Data, "pseudo-27": pseudoLesson27Data,
  "pseudo-28": pseudoLesson28Data,
  // IGCSE lessons
  "igcse-sql1": igcseLessonSql1Data,
  "igcse-sql2": igcseLessonSql2Data,
  "igcse-logic1": igcseLessonLogic1Data,
}

// 라이브러리 변형 (turtle/pygame 등) — 양언어 지원
export const lessonVariants: Record<string, Record<string, { ko: LessonData, en: LessonData }>> = {
  "p4": {
    "turtle": { ko: lessonP4Data, en: lessonP4EnData },
    "pygame": { ko: lessonP4PygameData, en: lessonP4PygameEnData },
  }
}

// 양언어 지원 레슨 — 모든 레슨
export const bilingualLessons: Record<string, { ko: LessonData, en: LessonData }> = {
  // Part 1: 기초 (1-10)
  "1": { ko: lesson1Data, en: lesson1EnData },
  "2": { ko: lesson2Data, en: lesson2EnData },
  "3": { ko: lesson3Data, en: lesson3EnData },
  "4": { ko: lesson4Data, en: lesson4EnData },
  "5": { ko: lesson5Data, en: lesson5EnData },
  "6": { ko: lesson6Data, en: lesson6EnData },
  "7": { ko: lesson7Data, en: lesson7EnData },
  "8": { ko: lesson8Data, en: lesson8EnData },
  "9": { ko: lesson9Data, en: lesson9EnData },
  "10": { ko: lesson10Data, en: lesson10EnData },
  // Part 2: 제어문 (11-14)
  "11": { ko: lesson11Data, en: lesson11EnData },
  "12": { ko: lesson12Data, en: lesson12EnData },
  "13": { ko: lesson13Data, en: lesson13EnData },
  "14": { ko: lesson14Data, en: lesson14EnData },
  // Part 3: 자료구조 (15-22)
  "15": { ko: lesson15Data, en: lesson15EnData },
  "16": { ko: lesson16Data, en: lesson16EnData },
  "17": { ko: lesson17Data, en: lesson17EnData },
  "18": { ko: lesson18Data, en: lesson18EnData },
  "19": { ko: lesson19Data, en: lesson19EnData },
  "20": { ko: lesson20Data, en: lesson20EnData },
  "21": { ko: lesson21Data, en: lesson21EnData },
  "22": { ko: lesson22Data, en: lesson22EnData },
  // Part 3 심화: 고급 자료구조 (23-26)
  "23": { ko: lesson23Data, en: lesson23EnData },
  "24": { ko: lesson24Data, en: lesson24EnData },
  "25": { ko: lesson25Data, en: lesson25EnData },
  "26": { ko: lesson26Data, en: lesson26EnData },
  // Part 4: 프로젝트 & 도전 (27-31)
  "27": { ko: lesson27 as any, en: lesson27EnData },
  "28": { ko: lesson28 as any, en: lesson28EnData },
  "29": { ko: lesson29 as any, en: lesson29EnData },
  "30": { ko: lesson30 as any, en: lesson30EnData },
  "31": { ko: lesson31 as any, en: lesson31EnData },
  // Part 5: 함수 (32-36)
  "32": { ko: lesson32Data, en: lesson32EnData },
  "33": { ko: lesson33Data, en: lesson33EnData },
  "34": { ko: lesson34Data, en: lesson34EnData },
  "35": { ko: lesson35Data, en: lesson35EnData },
  "36": { ko: lesson36Data, en: lesson36EnData },
  // Part 6: 에러와 파일 (37-40)
  "37": { ko: lesson37 as any, en: lesson37EnData },
  "38": { ko: lesson38 as any, en: lesson38EnData },
  "39": { ko: lesson39 as any, en: lesson39EnData },
  "40": { ko: lesson40 as any, en: lesson40EnData },
  // Part 7: 클래스 (41-44)
  "41": { ko: lesson41 as any, en: lesson41EnData },
  "42": { ko: lesson42 as any, en: lesson42EnData },
  "43": { ko: lesson43 as any, en: lesson43EnData },
  "44": { ko: lesson44 as any, en: lesson44EnData },
  // Part 8: 모듈과 패키지 (45-48)
  "45": { ko: lesson45 as any, en: lesson45EnData },
  "46": { ko: lesson46 as any, en: lesson46EnData },
  "47": { ko: lesson47 as any, en: lesson47EnData },
  "48": { ko: lesson48 as any, en: lesson48EnData },
  // Part 9: 텍스트 RPG (49-52)
  "49": { ko: lesson49 as any, en: lesson49EnData },
  "50": { ko: lesson50 as any, en: lesson50EnData },
  "51": { ko: lesson51 as any, en: lesson51EnData },
  "52": { ko: lesson52 as any, en: lesson52EnData },
  // 프로젝트 레슨
  "p1": { ko: lessonP1Data, en: lessonP1EnData },
  "p2": { ko: lessonP2Data, en: lessonP2EnData },
  "p3": { ko: lessonP3Data, en: lessonP3EnData },
  "p4": { ko: lessonP4Data, en: lessonP4EnData },
  // C++ Part 1
  "cpp-1": { ko: cppLesson1Data, en: cppLesson1EnData },
  "cpp-2": { ko: cppLesson2Data, en: cppLesson2EnData },
  "cpp-3": { ko: cppLesson3Data, en: cppLesson3EnData },
  "cpp-4": { ko: cppLesson4Data, en: cppLesson4EnData },
  "cpp-5": { ko: cppLesson5Data, en: cppLesson5EnData },
  "cpp-6": { ko: cppLesson6Data, en: cppLesson6EnData },
  "cpp-7": { ko: cppLesson7Data, en: cppLesson7EnData },
  "cpp-ck1": { ko: cppLessonCk1Data, en: cppLessonCk1EnData },
  "cpp-8": { ko: cppLesson8Data, en: cppLesson8EnData },
  "cpp-ck7": { ko: cppLessonCk7Data, en: cppLessonCk7EnData },
  // C++ Part 2
  "cpp-9": { ko: cppLesson9Data, en: cppLesson9EnData },
  "cpp-10": { ko: cppLesson10Data, en: cppLesson10EnData },
  "cpp-11": { ko: cppLesson11Data, en: cppLesson11EnData },
  "cpp-12": { ko: cppLesson12Data, en: cppLesson12EnData },
  "cpp-13": { ko: cppLesson13Data, en: cppLesson13EnData },
  "cpp-14": { ko: cppLesson14Data, en: cppLesson14EnData },
  "cpp-ck2": { ko: cppLessonCk2Data, en: cppLessonCk2EnData },
  "cpp-21": { ko: cppLesson21Data, en: cppLesson21EnData },
  "cpp-ck6": { ko: cppLessonCk6Data, en: cppLessonCk6EnData },
  "cpp-22": { ko: cppLesson22Data, en: cppLesson22EnData },
  "cpp-ck3": { ko: cppLessonCk3Data, en: cppLessonCk3EnData },
  "cpp-ck9": { ko: cppLessonCk9Data, en: cppLessonCk9EnData },
  // C++ Part 3
  "cpp-15": { ko: cppLesson15Data, en: cppLesson15EnData },
  "cpp-23": { ko: cppLesson23Data, en: cppLesson23EnData },
  "cpp-ck4": { ko: cppLessonCk4Data, en: cppLessonCk4EnData },
  "cpp-16": { ko: cppLesson16Data, en: cppLesson16EnData },
  "cpp-ck5": { ko: cppLessonCk5Data, en: cppLessonCk5EnData },
  "cpp-17": { ko: cppLesson17Data, en: cppLesson17EnData },
  "cpp-18": { ko: cppLesson18Data, en: cppLesson18EnData },
  "cpp-ck8": { ko: cppLessonCk8Data, en: cppLessonCk8EnData },
  "cpp-ck10": { ko: cppLessonCk10Data, en: cppLessonCk10EnData },
  "cpp-19": { ko: cppLesson19Data, en: cppLesson19EnData },
  "cpp-20": { ko: cppLesson20Data, en: cppLesson20EnData },
  // C++ projects
  "cpp-p1": { ko: cppLessonP1Data, en: cppLessonP1EnData },
  "cpp-p2": { ko: cppLessonP2Data, en: cppLessonP2EnData },
  "cpp-p3": { ko: cppLessonP3Data, en: cppLessonP3EnData },
  // Pseudocode Part 1
  "pseudo-1": { ko: pseudoLesson1Data, en: pseudoLesson1EnData },
  "pseudo-2": { ko: pseudoLesson2Data, en: pseudoLesson2EnData },
  "pseudo-3": { ko: pseudoLesson3Data, en: pseudoLesson3EnData },
  "pseudo-4": { ko: pseudoLesson4Data, en: pseudoLesson4EnData },
  "pseudo-5": { ko: pseudoLesson5Data, en: pseudoLesson5EnData },
  "pseudo-6": { ko: pseudoLesson6Data, en: pseudoLesson6EnData },
  "pseudo-7": { ko: pseudoLesson7Data, en: pseudoLesson7EnData },
  "pseudo-8": { ko: pseudoLesson8Data, en: pseudoLesson8EnData },
  "pseudo-p1": { ko: pseudoLessonP1Data, en: pseudoLessonP1EnData },
  // Pseudocode Part 2
  "pseudo-9": { ko: pseudoLesson9Data, en: pseudoLesson9EnData },
  "pseudo-10": { ko: pseudoLesson10Data, en: pseudoLesson10EnData },
  "pseudo-11": { ko: pseudoLesson11Data, en: pseudoLesson11EnData },
  "pseudo-12": { ko: pseudoLesson12Data, en: pseudoLesson12EnData },
  "pseudo-13": { ko: pseudoLesson13Data, en: pseudoLesson13EnData },
  "pseudo-14": { ko: pseudoLesson14Data, en: pseudoLesson14EnData },
  "pseudo-p2": { ko: pseudoLessonP2Data, en: pseudoLessonP2EnData },
  // Pseudocode Part 3
  "pseudo-15": { ko: pseudoLesson15Data, en: pseudoLesson15EnData },
  "pseudo-16": { ko: pseudoLesson16Data, en: pseudoLesson16EnData },
  "pseudo-17": { ko: pseudoLesson17Data, en: pseudoLesson17EnData },
  "pseudo-18": { ko: pseudoLesson18Data, en: pseudoLesson18EnData },
  "pseudo-19": { ko: pseudoLesson19Data, en: pseudoLesson19EnData },
  "pseudo-20": { ko: pseudoLesson20Data, en: pseudoLesson20EnData },
  "pseudo-p3": { ko: pseudoLessonP3Data, en: pseudoLessonP3EnData },
  // Pseudocode Part 4: 시험 대비
  "pseudo-21": { ko: pseudoLesson21Data, en: pseudoLesson21EnData },
  "pseudo-22": { ko: pseudoLesson22Data, en: pseudoLesson22EnData },
  "pseudo-23": { ko: pseudoLesson23Data, en: pseudoLesson23EnData },
  "pseudo-24": { ko: pseudoLesson24Data, en: pseudoLesson24EnData },
  "pseudo-25": { ko: pseudoLesson25Data, en: pseudoLesson25EnData },
  "pseudo-26": { ko: pseudoLesson26Data, en: pseudoLesson26EnData },
  "pseudo-27": { ko: pseudoLesson27Data, en: pseudoLesson27EnData },
  "pseudo-28": { ko: pseudoLesson28Data, en: pseudoLesson28EnData },
  // IGCSE lessons
  "igcse-sql1": { ko: igcseLessonSql1Data, en: igcseLessonSql1EnData },
  "igcse-sql2": { ko: igcseLessonSql2Data, en: igcseLessonSql2EnData },
  "igcse-logic1": { ko: igcseLessonLogic1Data, en: igcseLessonLogic1EnData },
}

// ============================================
// 동적 로딩 API (새 레슨에서 사용 권장)
// ============================================
export { loadLesson, isBilingual, getAllLessonIds, getBilingualLessonIds }
