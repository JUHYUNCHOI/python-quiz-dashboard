import { LessonData } from '../types'
import { ch1 } from './ch1'
import { ch2 } from './ch2'
import { ch3 } from './ch3'

export const lesson50: LessonData = {
  id: "50",
  title: "텍스트 RPG: 핵심 시스템",
  emoji: "⚔️",
  description: "캐릭터, 몬스터, 아이템을 구현해요!",
  chapters: [ch1, ch2, ch3]
}
