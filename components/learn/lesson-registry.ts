import {
  lesson1Data, lesson2Data, lesson3Data, lesson4Data, lesson5Data,
  lesson6Data, lesson7Data, lesson8Data, lesson9Data, lesson10Data,
  lesson11Data, lesson12Data, lesson13Data, lesson14Data, lesson15Data,
  lesson16Data, lesson17Data, lesson18Data, lesson19Data, lesson20Data,
  lesson21Data, lesson22Data, lesson23Data, lesson24Data, lesson25Data,
  lesson26Data, lesson29Data, lesson30Data, lesson31Data, lesson32Data,
  lesson33Data, lesson29EnData, lesson30EnData, lesson31EnData, lesson32EnData,
  lesson33EnData, lessonP1Data, lessonP2Data, lessonP3Data,
  lesson34, lesson35, lesson36, lesson37, lesson38,
  lesson27, lesson28,
  lesson39, lesson40, lesson41,
  lesson42, lesson43, lesson44, lesson45,
  lessonP4Data, lessonP4EnData
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
  "29": lesson29Data, "30": lesson30Data, "31": lesson31Data, "32": lesson32Data, "33": lesson33Data,
  "27": lesson27 as any, "28": lesson28 as any,
  "34": lesson34 as any, "35": lesson35 as any, "36": lesson36 as any, "37": lesson37 as any,
  "38": lesson38 as any,
  "39": lesson39 as any, "40": lesson40 as any, "41": lesson41 as any,
  "42": lesson42 as any, "43": lesson43 as any, "44": lesson44 as any, "45": lesson45 as any,
  "p1": lessonP1Data, "p2": lessonP2Data, "p3": lessonP3Data, "p4": lessonP4Data,
}

// 양언어 지원 레슨
export const bilingualLessons: Record<string, { ko: LessonData, en: LessonData }> = {
  "29": { ko: lesson29Data, en: lesson29EnData },
  "30": { ko: lesson30Data, en: lesson30EnData },
  "31": { ko: lesson31Data, en: lesson31EnData },
  "32": { ko: lesson32Data, en: lesson32EnData },
  "33": { ko: lesson33Data, en: lesson33EnData },
  "p4": { ko: lessonP4Data, en: lessonP4EnData },
}

// ============================================
// 동적 로딩 API (새 레슨에서 사용 권장)
// ============================================
export { loadLesson, isBilingual, getAllLessonIds, getBilingualLessonIds }
