// ============================================
// 레슨 데이터 자동 레지스트리
// 새 레슨 추가 시 여기에 한 줄만 추가하면 끝!
// ============================================

import type { LessonData } from './types'

// [레슨ID, () => import, export명, 영어버전?]
type LessonEntry = {
  load: () => Promise<Record<string, any>>
  exportName: string
  enLoad?: () => Promise<Record<string, any>>
  enExportName?: string
}

// ============================================
// 레슨 등록부 - 새 레슨은 여기에 한 줄 추가
// ============================================
const registry: Record<string, LessonEntry> = {
  // Part 1: 기초 (1-10)
  "1": {
    load: () => import('./lesson1'), exportName: 'lesson1Data',
    enLoad: () => import('./lesson1-en'), enExportName: 'lesson1EnData',
  },
  "2": {
    load: () => import('./lesson2'), exportName: 'lesson2Data',
    enLoad: () => import('./lesson2-en'), enExportName: 'lesson2EnData',
  },
  "3": {
    load: () => import('./lesson3'), exportName: 'lesson3Data',
    enLoad: () => import('./lesson3-en'), enExportName: 'lesson3EnData',
  },
  "4": {
    load: () => import('./lesson4'), exportName: 'lesson4Data',
    enLoad: () => import('./lesson4-en'), enExportName: 'lesson4EnData',
  },
  "5": {
    load: () => import('./lesson5'), exportName: 'lesson5Data',
    enLoad: () => import('./lesson5-en'), enExportName: 'lesson5EnData',
  },
  "6": {
    load: () => import('./lesson6'), exportName: 'lesson6Data',
    enLoad: () => import('./lesson6-en'), enExportName: 'lesson6EnData',
  },
  "7": {
    load: () => import('./lesson7'), exportName: 'lesson7Data',
    enLoad: () => import('./lesson7-en'), enExportName: 'lesson7EnData',
  },
  "8": {
    load: () => import('./lesson8'), exportName: 'lesson8Data',
    enLoad: () => import('./lesson8-en'), enExportName: 'lesson8EnData',
  },
  "9": {
    load: () => import('./lesson9'), exportName: 'lesson9Data',
    enLoad: () => import('./lesson9-en'), enExportName: 'lesson9EnData',
  },
  "10": {
    load: () => import('./lesson10'), exportName: 'lesson10Data',
    enLoad: () => import('./lesson10-en'), enExportName: 'lesson10EnData',
  },

  // Part 2: 제어문 (11-14)
  "11": {
    load: () => import('./lesson11'), exportName: 'lesson11Data',
    enLoad: () => import('./lesson11-en'), enExportName: 'lesson11EnData',
  },
  "12": {
    load: () => import('./lesson12'), exportName: 'lesson12Data',
    enLoad: () => import('./lesson12-en'), enExportName: 'lesson12EnData',
  },
  "13": {
    load: () => import('./lesson13'), exportName: 'lesson13Data',
    enLoad: () => import('./lesson13-en'), enExportName: 'lesson13EnData',
  },
  "14": {
    load: () => import('./lesson14'), exportName: 'lesson14Data',
    enLoad: () => import('./lesson14-en'), enExportName: 'lesson14EnData',
  },

  // Part 3: 자료구조 (15-22)
  "15": {
    load: () => import('./lesson15'), exportName: 'lesson15Data',
    enLoad: () => import('./lesson15-en'), enExportName: 'lesson15EnData',
  },
  "16": {
    load: () => import('./lesson16'), exportName: 'lesson16Data',
    enLoad: () => import('./lesson16-en'), enExportName: 'lesson16EnData',
  },
  "17": {
    load: () => import('./lesson17'), exportName: 'lesson17Data',
    enLoad: () => import('./lesson17-en'), enExportName: 'lesson17EnData',
  },
  "18": {
    load: () => import('./lesson18'), exportName: 'lesson18Data',
    enLoad: () => import('./lesson18-en'), enExportName: 'lesson18EnData',
  },
  "19": {
    load: () => import('./lesson19'), exportName: 'lesson19Data',
    enLoad: () => import('./lesson19-en'), enExportName: 'lesson19EnData',
  },
  "20": {
    load: () => import('./lesson20'), exportName: 'lesson20Data',
    enLoad: () => import('./lesson20-en'), enExportName: 'lesson20EnData',
  },
  "21": {
    load: () => import('./lesson21'), exportName: 'lesson21Data',
    enLoad: () => import('./lesson21-en'), enExportName: 'lesson21EnData',
  },
  "22": {
    load: () => import('./lesson22'), exportName: 'lesson22Data',
    enLoad: () => import('./lesson22-en'), enExportName: 'lesson22EnData',
  },

  // Part 3 심화: 고급 자료구조 (23-26)
  "23": {
    load: () => import('./lesson23'), exportName: 'lesson23Data',
    enLoad: () => import('./lesson23-en'), enExportName: 'lesson23EnData',
  },
  "24": {
    load: () => import('./lesson24'), exportName: 'lesson24Data',
    enLoad: () => import('./lesson24-en'), enExportName: 'lesson24EnData',
  },
  "25": {
    load: () => import('./lesson25'), exportName: 'lesson25Data',
    enLoad: () => import('./lesson25-en'), enExportName: 'lesson25EnData',
  },
  "26": {
    load: () => import('./lesson26'), exportName: 'lesson26Data',
    enLoad: () => import('./lesson26-en'), enExportName: 'lesson26EnData',
  },

  // Part 4: 프로젝트 & 도전 (27-31)
  "27": {
    load: () => import('./lessons/lesson27'), exportName: 'lesson27',
    enLoad: () => import('./lesson27-en'), enExportName: 'lesson27EnData',
  },
  "28": {
    load: () => import('./lessons/lesson28'), exportName: 'lesson28',
    enLoad: () => import('./lesson28-en'), enExportName: 'lesson28EnData',
  },
  "29": {
    load: () => import('./lessons/lesson29'), exportName: 'lesson29',
    enLoad: () => import('./lesson29-en'), enExportName: 'lesson29EnData',
  },
  "30": {
    load: () => import('./lessons/lesson30'), exportName: 'lesson30',
    enLoad: () => import('./lesson30-en'), enExportName: 'lesson30EnData',
  },
  "31": {
    load: () => import('./lessons/lesson31'), exportName: 'lesson31',
    enLoad: () => import('./lesson31-en'), enExportName: 'lesson31EnData',
  },

  // Part 5: 함수 (32-36) - 양언어
  "32": {
    load: () => import('./lesson32'), exportName: 'lesson32Data',
    enLoad: () => import('./lesson32-en'), enExportName: 'lesson32EnData',
  },
  "33": {
    load: () => import('./lesson33'), exportName: 'lesson33Data',
    enLoad: () => import('./lesson33-en'), enExportName: 'lesson33EnData',
  },
  "34": {
    load: () => import('./lesson34'), exportName: 'lesson34Data',
    enLoad: () => import('./lesson34-en'), enExportName: 'lesson34EnData',
  },
  "35": {
    load: () => import('./lesson35'), exportName: 'lesson35Data',
    enLoad: () => import('./lesson35-en'), enExportName: 'lesson35EnData',
  },
  "36": {
    load: () => import('./lesson36'), exportName: 'lesson36Data',
    enLoad: () => import('./lesson36-en'), enExportName: 'lesson36EnData',
  },

  // Part 6: 에러와 파일 (37-40)
  "37": {
    load: () => import('./lessons/lesson37'), exportName: 'lesson37',
    enLoad: () => import('./lesson37-en'), enExportName: 'lesson37EnData',
  },
  "38": {
    load: () => import('./lesson38'), exportName: 'lesson38',
    enLoad: () => import('./lesson38-en'), enExportName: 'lesson38EnData',
  },
  "39": {
    load: () => import('./lessons/lesson39'), exportName: 'lesson39',
    enLoad: () => import('./lesson39-en'), enExportName: 'lesson39EnData',
  },
  "40": {
    load: () => import('./lessons/lesson40'), exportName: 'lesson40',
    enLoad: () => import('./lesson40-en'), enExportName: 'lesson40EnData',
  },

  // Part 7: 클래스 (41-44)
  "41": {
    load: () => import('./lessons/lesson41'), exportName: 'lesson41',
    enLoad: () => import('./lesson41-en'), enExportName: 'lesson41EnData',
  },
  "42": {
    load: () => import('./lessons/lesson42'), exportName: 'lesson42',
    enLoad: () => import('./lesson42-en'), enExportName: 'lesson42EnData',
  },
  "43": {
    load: () => import('./lessons/lesson43'), exportName: 'lesson43',
    enLoad: () => import('./lesson43-en'), enExportName: 'lesson43EnData',
  },
  "44": {
    load: () => import('./lessons/lesson44'), exportName: 'lesson44',
    enLoad: () => import('./lesson44-en'), enExportName: 'lesson44EnData',
  },

  // Part 8: 모듈과 패키지 (45-48)
  "45": {
    load: () => import('./lessons/lesson45'), exportName: 'lesson45',
    enLoad: () => import('./lesson45-en'), enExportName: 'lesson45EnData',
  },
  "46": {
    load: () => import('./lessons/lesson46'), exportName: 'lesson46',
    enLoad: () => import('./lesson46-en'), enExportName: 'lesson46EnData',
  },
  "47": {
    load: () => import('./lessons/lesson47'), exportName: 'lesson47',
    enLoad: () => import('./lesson47-en'), enExportName: 'lesson47EnData',
  },
  "48": {
    load: () => import('./lessons/lesson48'), exportName: 'lesson48',
    enLoad: () => import('./lesson48-en'), enExportName: 'lesson48EnData',
  },

  // Part 9: 텍스트 RPG (49-52)
  "49": {
    load: () => import('./lessons/lesson49'), exportName: 'lesson49',
    enLoad: () => import('./lesson49-en'), enExportName: 'lesson49EnData',
  },
  "50": {
    load: () => import('./lessons/lesson50'), exportName: 'lesson50',
    enLoad: () => import('./lesson50-en'), enExportName: 'lesson50EnData',
  },
  "51": {
    load: () => import('./lessons/lesson51'), exportName: 'lesson51',
    enLoad: () => import('./lesson51-en'), enExportName: 'lesson51EnData',
  },
  "52": {
    load: () => import('./lessons/lesson52'), exportName: 'lesson52',
    enLoad: () => import('./lesson52-en'), enExportName: 'lesson52EnData',
  },

  // 프로젝트 레슨
  "p1": {
    load: () => import('./lessonP1'), exportName: 'lessonP1Data',
    enLoad: () => import('./lessonP1-en'), enExportName: 'lessonP1EnData',
  },
  "p2": {
    load: () => import('./lessonP2'), exportName: 'lessonP2Data',
    enLoad: () => import('./lessonP2-en'), enExportName: 'lessonP2EnData',
  },
  "p3": {
    load: () => import('./lessonP3'), exportName: 'lessonP3Data',
    enLoad: () => import('./lessonP3-en'), enExportName: 'lessonP3EnData',
  },
  "p4": {
    load: () => import('./lessonP4'), exportName: 'lessonP4Data',
    enLoad: () => import('./lessonP4-en'), enExportName: 'lessonP4EnData',
  },

  // C++ Part 1: 기초 (cpp-1 ~ cpp-8)
  "cpp-1": {
    load: () => import('./cpp/lesson1'), exportName: 'cppLesson1Data',
    enLoad: () => import('./cpp/lesson1-en'), enExportName: 'cppLesson1EnData',
  },
  "cpp-2": {
    load: () => import('./cpp/lesson2'), exportName: 'cppLesson2Data',
    enLoad: () => import('./cpp/lesson2-en'), enExportName: 'cppLesson2EnData',
  },
  "cpp-3": {
    load: () => import('./cpp/lesson3'), exportName: 'cppLesson3Data',
    enLoad: () => import('./cpp/lesson3-en'), enExportName: 'cppLesson3EnData',
  },
  "cpp-4": {
    load: () => import('./cpp/lesson4'), exportName: 'cppLesson4Data',
    enLoad: () => import('./cpp/lesson4-en'), enExportName: 'cppLesson4EnData',
  },
  "cpp-5": {
    load: () => import('./cpp/lesson5'), exportName: 'cppLesson5Data',
    enLoad: () => import('./cpp/lesson5-en'), enExportName: 'cppLesson5EnData',
  },
  "cpp-6": {
    load: () => import('./cpp/lesson6'), exportName: 'cppLesson6Data',
    enLoad: () => import('./cpp/lesson6-en'), enExportName: 'cppLesson6EnData',
  },
  "cpp-7": {
    load: () => import('./cpp/lesson7'), exportName: 'cppLesson7Data',
    enLoad: () => import('./cpp/lesson7-en'), enExportName: 'cppLesson7EnData',
  },
  "cpp-8": {
    load: () => import('./cpp/lesson8'), exportName: 'cppLesson8Data',
    enLoad: () => import('./cpp/lesson8-en'), enExportName: 'cppLesson8EnData',
  },

  // C++ Part 2: 더 깊은 C++ (cpp-9 ~ cpp-14)
  "cpp-9": {
    load: () => import('./cpp/lesson9'), exportName: 'cppLesson9Data',
    enLoad: () => import('./cpp/lesson9-en'), enExportName: 'cppLesson9EnData',
  },
  "cpp-10": {
    load: () => import('./cpp/lesson10'), exportName: 'cppLesson10Data',
    enLoad: () => import('./cpp/lesson10-en'), enExportName: 'cppLesson10EnData',
  },
  "cpp-11": {
    load: () => import('./cpp/lesson11'), exportName: 'cppLesson11Data',
    enLoad: () => import('./cpp/lesson11-en'), enExportName: 'cppLesson11EnData',
  },
  "cpp-12": {
    load: () => import('./cpp/lesson12'), exportName: 'cppLesson12Data',
    enLoad: () => import('./cpp/lesson12-en'), enExportName: 'cppLesson12EnData',
  },
  "cpp-13": {
    load: () => import('./cpp/lesson13'), exportName: 'cppLesson13Data',
    enLoad: () => import('./cpp/lesson13-en'), enExportName: 'cppLesson13EnData',
  },
  "cpp-14": {
    load: () => import('./cpp/lesson14'), exportName: 'cppLesson14Data',
    enLoad: () => import('./cpp/lesson14-en'), enExportName: 'cppLesson14EnData',
  },

  // C++ Part 3: USACO 준비 (cpp-15 ~ cpp-20)
  "cpp-15": {
    load: () => import('./cpp/lesson15'), exportName: 'cppLesson15Data',
    enLoad: () => import('./cpp/lesson15-en'), enExportName: 'cppLesson15EnData',
  },
  "cpp-16": {
    load: () => import('./cpp/lesson16'), exportName: 'cppLesson16Data',
    enLoad: () => import('./cpp/lesson16-en'), enExportName: 'cppLesson16EnData',
  },
  "cpp-17": {
    load: () => import('./cpp/lesson17'), exportName: 'cppLesson17Data',
    enLoad: () => import('./cpp/lesson17-en'), enExportName: 'cppLesson17EnData',
  },
  "cpp-18": {
    load: () => import('./cpp/lesson18'), exportName: 'cppLesson18Data',
    enLoad: () => import('./cpp/lesson18-en'), enExportName: 'cppLesson18EnData',
  },
  "cpp-19": {
    load: () => import('./cpp/lesson19'), exportName: 'cppLesson19Data',
    enLoad: () => import('./cpp/lesson19-en'), enExportName: 'cppLesson19EnData',
  },
  "cpp-20": {
    load: () => import('./cpp/lesson20'), exportName: 'cppLesson20Data',
    enLoad: () => import('./cpp/lesson20-en'), enExportName: 'cppLesson20EnData',
  },

  // C++ 프로젝트 레슨
  "cpp-p1": {
    load: () => import('./cpp/lessonP1'), exportName: 'cppLessonP1Data',
    enLoad: () => import('./cpp/lessonP1-en'), enExportName: 'cppLessonP1EnData',
  },
  "cpp-p2": {
    load: () => import('./cpp/lessonP2'), exportName: 'cppLessonP2Data',
    enLoad: () => import('./cpp/lessonP2-en'), enExportName: 'cppLessonP2EnData',
  },
  "cpp-p3": {
    load: () => import('./cpp/lessonP3'), exportName: 'cppLessonP3Data',
    enLoad: () => import('./cpp/lessonP3-en'), enExportName: 'cppLessonP3EnData',
  },
}

// ============================================
// API: 레슨 로딩 함수들
// ============================================

/** 레슨 하나 로드 (동적 import) */
export async function loadLesson(id: string, lang: "ko" | "en" = "ko"): Promise<LessonData | null> {
  const entry = registry[id]
  if (!entry) return null

  if (lang === "en" && entry.enLoad && entry.enExportName) {
    const mod = await entry.enLoad()
    return mod[entry.enExportName] as LessonData
  }

  const mod = await entry.load()
  return mod[entry.exportName] as LessonData
}

/** 양언어 지원 여부 확인 */
export function isBilingual(id: string): boolean {
  return !!registry[id]?.enLoad
}

/** 등록된 모든 레슨 ID 목록 */
export function getAllLessonIds(): string[] {
  return Object.keys(registry)
}

/** 양언어 레슨 ID 목록 */
export function getBilingualLessonIds(): string[] {
  return Object.keys(registry).filter(id => registry[id].enLoad)
}

// ============================================
// 하위 호환: 기존 static import 유지
// lesson-registry.ts에서 사용 중
// ============================================

// Korean lessons
export { lesson1Data } from './lesson1'
export { lesson2Data } from './lesson2'
export { lesson3Data } from './lesson3'
export { lesson4Data } from './lesson4'
export { lesson5Data } from './lesson5'
export { lesson6Data } from './lesson6'
export { lesson7Data } from './lesson7'
export { lesson8Data } from './lesson8'
export { lesson9Data } from './lesson9'
export { lesson10Data } from './lesson10'
export { lesson11Data } from './lesson11'
export { lesson12Data } from './lesson12'
export { lesson13Data } from './lesson13'
export { lesson14Data } from './lesson14'
export { lesson15Data } from './lesson15'
export { lesson16Data } from './lesson16'
export { lesson17Data } from './lesson17'
export { lesson18Data } from './lesson18'
export { lesson19Data } from './lesson19'
export { lesson20Data } from './lesson20'
export { lesson21Data } from './lesson21'
export { lesson22Data } from './lesson22'
export { lesson23Data } from './lesson23'
export { lesson24Data } from './lesson24'
export { lesson25Data } from './lesson25'
export { lesson26Data } from './lesson26'
export { lesson27 } from './lessons/lesson27'
export { lesson28 } from './lessons/lesson28'
export { lesson29 } from './lessons/lesson29'
export { lesson30 } from './lessons/lesson30'
export { lesson31 } from './lessons/lesson31'
export { lesson32Data } from './lesson32'
export { lesson33Data } from './lesson33'
export { lesson34Data } from './lesson34'
export { lesson35Data } from './lesson35'
export { lesson36Data } from './lesson36'
export { lesson37 } from './lesson37'
export { lesson38 } from './lesson38'
export { lesson39 } from './lessons/lesson39'
export { lesson40 } from './lesson40'
export { lesson41 } from './lessons/lesson41'
export { lesson42 } from './lessons/lesson42'
export { lesson43 } from './lessons/lesson43'
export { lesson44 } from './lessons/lesson44'
export { lesson45 } from './lessons/lesson45'
export { lesson46 } from './lessons/lesson46'
export { lesson47 } from './lessons/lesson47'
export { lesson48 } from './lessons/lesson48'
export { lesson49 } from './lessons/lesson49'
export { lesson50 } from './lessons/lesson50'
export { lesson51 } from './lessons/lesson51'
export { lesson52 } from './lessons/lesson52'
export { lessonP1Data } from './lessonP1'
export { lessonP2Data } from './lessonP2'
export { lessonP3Data } from './lessonP3'
export { lessonP4Data } from './lessonP4'
export { lessonP4PygameData } from './lessonP4-pygame'

// English lessons
export { lesson1EnData } from './lesson1-en'
export { lesson2EnData } from './lesson2-en'
export { lesson3EnData } from './lesson3-en'
export { lesson4EnData } from './lesson4-en'
export { lesson5EnData } from './lesson5-en'
export { lesson6EnData } from './lesson6-en'
export { lesson7EnData } from './lesson7-en'
export { lesson8EnData } from './lesson8-en'
export { lesson9EnData } from './lesson9-en'
export { lesson10EnData } from './lesson10-en'
export { lesson11EnData } from './lesson11-en'
export { lesson12EnData } from './lesson12-en'
export { lesson13EnData } from './lesson13-en'
export { lesson14EnData } from './lesson14-en'
export { lesson15EnData } from './lesson15-en'
export { lesson16EnData } from './lesson16-en'
export { lesson17EnData } from './lesson17-en'
export { lesson18EnData } from './lesson18-en'
export { lesson19EnData } from './lesson19-en'
export { lesson20EnData } from './lesson20-en'
export { lesson21EnData } from './lesson21-en'
export { lesson22EnData } from './lesson22-en'
export { lesson23EnData } from './lesson23-en'
export { lesson24EnData } from './lesson24-en'
export { lesson25EnData } from './lesson25-en'
export { lesson26EnData } from './lesson26-en'
export { lesson27EnData } from './lesson27-en'
export { lesson28EnData } from './lesson28-en'
export { lesson29EnData } from './lesson29-en'
export { lesson30EnData } from './lesson30-en'
export { lesson31EnData } from './lesson31-en'
export { lesson32EnData } from './lesson32-en'
export { lesson33EnData } from './lesson33-en'
export { lesson34EnData } from './lesson34-en'
export { lesson35EnData } from './lesson35-en'
export { lesson36EnData } from './lesson36-en'
export { lesson37EnData } from './lesson37-en'
export { lesson38EnData } from './lesson38-en'
export { lesson39EnData } from './lesson39-en'
export { lesson40EnData } from './lesson40-en'
export { lesson41EnData } from './lesson41-en'
export { lesson42EnData } from './lesson42-en'
export { lesson43EnData } from './lesson43-en'
export { lesson44EnData } from './lesson44-en'
export { lesson45EnData } from './lesson45-en'
export { lesson46EnData } from './lesson46-en'
export { lesson47EnData } from './lesson47-en'
export { lesson48EnData } from './lesson48-en'
export { lesson49EnData } from './lesson49-en'
export { lesson50EnData } from './lesson50-en'
export { lesson51EnData } from './lesson51-en'
export { lesson52EnData } from './lesson52-en'
export { lessonP1EnData } from './lessonP1-en'
export { lessonP2EnData } from './lessonP2-en'
export { lessonP3EnData } from './lessonP3-en'
export { lessonP4EnData } from './lessonP4-en'
export { lessonP4PygameEnData } from './lessonP4-pygame-en'

// C++ Korean lessons
export { cppLesson1Data } from './cpp/lesson1'
export { cppLesson2Data } from './cpp/lesson2'
export { cppLesson3Data } from './cpp/lesson3'
export { cppLesson4Data } from './cpp/lesson4'
export { cppLesson5Data } from './cpp/lesson5'
export { cppLesson6Data } from './cpp/lesson6'
export { cppLesson7Data } from './cpp/lesson7'
export { cppLesson8Data } from './cpp/lesson8'
export { cppLesson9Data } from './cpp/lesson9'
export { cppLesson10Data } from './cpp/lesson10'
export { cppLesson11Data } from './cpp/lesson11'
export { cppLesson12Data } from './cpp/lesson12'
export { cppLesson13Data } from './cpp/lesson13'
export { cppLesson14Data } from './cpp/lesson14'
export { cppLesson15Data } from './cpp/lesson15'
export { cppLesson16Data } from './cpp/lesson16'
export { cppLesson17Data } from './cpp/lesson17'
export { cppLesson18Data } from './cpp/lesson18'
export { cppLesson19Data } from './cpp/lesson19'
export { cppLesson20Data } from './cpp/lesson20'
export { cppLessonP1Data } from './cpp/lessonP1'
export { cppLessonP2Data } from './cpp/lessonP2'
export { cppLessonP3Data } from './cpp/lessonP3'

// C++ English lessons
export { cppLesson1EnData } from './cpp/lesson1-en'
export { cppLesson2EnData } from './cpp/lesson2-en'
export { cppLesson3EnData } from './cpp/lesson3-en'
export { cppLesson4EnData } from './cpp/lesson4-en'
export { cppLesson5EnData } from './cpp/lesson5-en'
export { cppLesson6EnData } from './cpp/lesson6-en'
export { cppLesson7EnData } from './cpp/lesson7-en'
export { cppLesson8EnData } from './cpp/lesson8-en'
export { cppLesson9EnData } from './cpp/lesson9-en'
export { cppLesson10EnData } from './cpp/lesson10-en'
export { cppLesson11EnData } from './cpp/lesson11-en'
export { cppLesson12EnData } from './cpp/lesson12-en'
export { cppLesson13EnData } from './cpp/lesson13-en'
export { cppLesson14EnData } from './cpp/lesson14-en'
export { cppLesson15EnData } from './cpp/lesson15-en'
export { cppLesson16EnData } from './cpp/lesson16-en'
export { cppLesson17EnData } from './cpp/lesson17-en'
export { cppLesson18EnData } from './cpp/lesson18-en'
export { cppLesson19EnData } from './cpp/lesson19-en'
export { cppLesson20EnData } from './cpp/lesson20-en'
export { cppLessonP1EnData } from './cpp/lessonP1-en'
export { cppLessonP2EnData } from './cpp/lessonP2-en'
export { cppLessonP3EnData } from './cpp/lessonP3-en'

export type { LessonData, LessonStep, Chapter } from './types'
