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
  "1":  { load: () => import('./lesson1'),  exportName: 'lesson1Data' },
  "2":  { load: () => import('./lesson2'),  exportName: 'lesson2Data' },
  "3":  { load: () => import('./lesson3'),  exportName: 'lesson3Data' },
  "4":  { load: () => import('./lesson4'),  exportName: 'lesson4Data' },
  "5":  { load: () => import('./lesson5'),  exportName: 'lesson5Data' },
  "6":  { load: () => import('./lesson6'),  exportName: 'lesson6Data' },
  "7":  { load: () => import('./lesson7'),  exportName: 'lesson7Data' },
  "8":  { load: () => import('./lesson8'),  exportName: 'lesson8Data' },
  "9":  { load: () => import('./lesson9'),  exportName: 'lesson9Data' },
  "10": { load: () => import('./lesson10'), exportName: 'lesson10Data' },

  // Part 2: 제어문 (11-14)
  "11": { load: () => import('./lesson11'), exportName: 'lesson11Data' },
  "12": { load: () => import('./lesson12'), exportName: 'lesson12Data' },
  "13": { load: () => import('./lesson13'), exportName: 'lesson13Data' },
  "14": { load: () => import('./lesson14'), exportName: 'lesson14Data' },

  // Part 3: 자료구조 (15-22)
  "15": { load: () => import('./lesson15'), exportName: 'lesson15Data' },
  "16": { load: () => import('./lesson16'), exportName: 'lesson16Data' },
  "17": { load: () => import('./lesson17'), exportName: 'lesson17Data' },
  "18": { load: () => import('./lesson18'), exportName: 'lesson18Data' },
  "19": { load: () => import('./lesson19'), exportName: 'lesson19Data' },
  "20": { load: () => import('./lesson20'), exportName: 'lesson20Data' },
  "21": { load: () => import('./lesson21'), exportName: 'lesson21Data' },
  "22": { load: () => import('./lesson22'), exportName: 'lesson22Data' },

  // Part 3 심화: 고급 자료구조 (23-26)
  "23": { load: () => import('./lesson23'), exportName: 'lesson23Data' },
  "24": { load: () => import('./lesson24'), exportName: 'lesson24Data' },
  "25": { load: () => import('./lesson25'), exportName: 'lesson25Data' },
  "26": { load: () => import('./lesson26'), exportName: 'lesson26Data' },

  // Part 4: 프로젝트 & 도전 (27-31)
  "27": { load: () => import('./lessons/lesson27'), exportName: 'lesson27' },
  "28": { load: () => import('./lessons/lesson28'), exportName: 'lesson28' },
  "29": { load: () => import('./lessons/lesson29'), exportName: 'lesson29' },
  "30": { load: () => import('./lessons/lesson30'), exportName: 'lesson30' },
  "31": { load: () => import('./lessons/lesson31'), exportName: 'lesson31' },

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
  "37": { load: () => import('./lessons/lesson37'), exportName: 'lesson37' },
  "38": { load: () => import('./lesson38'), exportName: 'lesson38' },
  "39": { load: () => import('./lessons/lesson39'), exportName: 'lesson39' },
  "40": { load: () => import('./lessons/lesson40'), exportName: 'lesson40' },

  // Part 7: 클래스 (41-44)
  "41": { load: () => import('./lessons/lesson41'), exportName: 'lesson41' },
  "42": { load: () => import('./lessons/lesson42'), exportName: 'lesson42' },
  "43": { load: () => import('./lessons/lesson43'), exportName: 'lesson43' },
  "44": { load: () => import('./lessons/lesson44'), exportName: 'lesson44' },

  // Part 8: 모듈과 패키지 (45-48)
  "45": { load: () => import('./lessons/lesson45'), exportName: 'lesson45' },
  "46": { load: () => import('./lessons/lesson46'), exportName: 'lesson46' },
  "47": { load: () => import('./lessons/lesson47'), exportName: 'lesson47' },
  "48": { load: () => import('./lessons/lesson48'), exportName: 'lesson48' },

  // Part 9: 텍스트 RPG (49-52)
  "49": { load: () => import('./lessons/lesson49'), exportName: 'lesson49' },
  "50": { load: () => import('./lessons/lesson50'), exportName: 'lesson50' },
  "51": { load: () => import('./lessons/lesson51'), exportName: 'lesson51' },
  "52": { load: () => import('./lessons/lesson52'), exportName: 'lesson52' },

  // 프로젝트 레슨
  "p1": { load: () => import('./lessonP1'), exportName: 'lessonP1Data' },
  "p2": { load: () => import('./lessonP2'), exportName: 'lessonP2Data' },
  "p3": { load: () => import('./lessonP3'), exportName: 'lessonP3Data' },
  "p4": {
    load: () => import('./lessonP4'), exportName: 'lessonP4Data',
    enLoad: () => import('./lessonP4-en'), enExportName: 'lessonP4EnData',
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
export { lesson32EnData } from './lesson32-en'
export { lesson33EnData } from './lesson33-en'
export { lesson34EnData } from './lesson34-en'
export { lesson35EnData } from './lesson35-en'
export { lesson36EnData } from './lesson36-en'
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
export { lessonP4EnData } from './lessonP4-en'
export { lessonP4PygameData } from './lessonP4-pygame'
export { lessonP4PygameEnData } from './lessonP4-pygame-en'

export type { LessonData, LessonStep, Chapter } from './types'
