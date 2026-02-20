import { LessonData } from '../types'
import { ch1 } from './ch1'
import { ch2 } from './ch2'
import { ch3 } from './ch3'
import { ch4 } from './ch4'

export const lesson27: LessonData = {
  id: "27",
  title: "미니 프로젝트 모음",
  emoji: "🎮",
  description: "가위바위보, 로또, 단어장, 성적관리를 만들어요!",
  chapters: [ch1, ch2, ch3, ch4]
}
