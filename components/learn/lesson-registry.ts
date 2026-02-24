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
  lessonP4EnData, lessonP4PygameEnData
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
}

// ============================================
// 동적 로딩 API (새 레슨에서 사용 권장)
// ============================================
export { loadLesson, isBilingual, getAllLessonIds, getBilingualLessonIds }
