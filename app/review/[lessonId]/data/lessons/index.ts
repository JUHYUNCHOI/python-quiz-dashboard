// Auto-generated lesson exports
import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';
import { lesson3 } from './lesson3';
import { lesson4 } from './lesson4';
import { lesson5 } from './lesson5';
import { lesson6 } from './lesson6';
import { lesson7 } from './lesson7';
import { lesson8 } from './lesson8';
import { lesson9 } from './lesson9';
import { lesson10 } from './lesson10';
import { lesson11 } from './lesson11';
import { lesson12 } from './lesson12';
import { lesson13 } from './lesson13';
import { lesson14 } from './lesson14';
import { lesson15 } from './lesson15';
import { lesson16 } from './lesson16';
import { lesson17 } from './lesson17';
import { lesson18 } from './lesson18';
import { lesson19 } from './lesson19';
import { lesson20 } from './lesson20';
import { lesson21 } from './lesson21';
import { lesson22 } from './lesson22';
import { lesson23 } from './lesson23';
import { lesson24 } from './lesson24';
import { lesson25 } from './lesson25';
import { lesson26 } from './lesson26';
import { lesson38 } from './lesson38';
import { lesson29 } from './lesson29';
import { lesson30 } from './lesson30';
import { lesson31 } from './lesson31';
import { lesson32 } from './lesson32';
import { lesson33 } from './lesson33';
import { lesson34 } from './lesson34';
import { lesson35 } from './lesson35';
import { lesson36 } from './lesson36';
import { lesson37 } from './lesson37';

import { LessonData } from '../types';

// 더미 레슨 데이터 (복습 모드용 - 수업 모드 사용 권장)
const createDummyLesson = (id: string, title: string): LessonData => ({
  id,
  title,
  description: `${title} 복습`,
  steps: [
    {
      type: "chapter",
      content: { num: 1, title, desc: "이 레슨의 복습 모드는 준비 중이에요. '수업' 버튼을 눌러주세요!" }
    },
    {
      type: "done",
      content: {}
    }
  ]
});

export const lessonsData: Record<string, LessonData> = {
  "1": lesson1,
  "2": lesson2,
  "3": lesson3,
  "4": lesson4,
  "5": lesson5,
  "6": lesson6,
  "7": lesson7,
  "8": lesson8,
  "9": lesson9,
  "10": lesson10,
  "11": lesson11,
  "12": lesson12,
  "13": lesson13,
  "14": lesson14,
  "15": lesson15,
  "16": lesson16,
  "17": lesson17,
  "18": lesson18,
  "19": lesson19,
  "20": lesson20,
  "21": lesson21,
  "22": lesson22,
  "23": lesson23,
  "24": lesson24,
  "25": lesson25,
  "26": lesson26,
  // Part 7: 클래스
  "38": lesson38,
  // Part 5: 함수
  "29": lesson29,
  "30": lesson30,
  "31": lesson31,
  "32": lesson32,
  "33": lesson33,
  // Part 6: 에러와 파일
  "34": lesson34,
  "35": lesson35,
  "36": lesson36,
  "37": lesson37,
  // 프로젝트
  "p1": createDummyLesson("p1", "미니 계산기"),
  "p2": createDummyLesson("p2", "숫자 맞추기 게임"),
  "p3": createDummyLesson("p3", "Hangman 게임"),
}

export default lessonsData;
