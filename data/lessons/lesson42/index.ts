import { LessonData } from '../types'
import { ch1 } from './ch1'
import { ch2 } from './ch2'
import { ch3 } from './ch3'

export const lesson42: LessonData = {
  id: "42",
  title: "모듈 기초",
  emoji: "📦",
  description: "math, json 등 유용한 모듈을 배워요!",
  chapters: [ch1, ch2, ch3]
}
