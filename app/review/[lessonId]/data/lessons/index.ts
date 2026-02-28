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
import { lesson32 } from './lesson32';
import { lesson33 } from './lesson33';
import { lesson34 } from './lesson34';
import { lesson35 } from './lesson35';
import { lesson36 } from './lesson36';
import { lesson37 } from './lesson37';
import { lesson38 } from './lesson38';
import { lesson39 } from './lesson39';
import { lesson40 } from './lesson40';
import { lesson41 } from './lesson41';
import { lessonCpp1 } from './lessonCpp1';
import { lessonCpp2 } from './lessonCpp2';
import { lessonCpp3 } from './lessonCpp3';
import { lessonCpp4 } from './lessonCpp4';
import { lessonCpp5 } from './lessonCpp5';
import { lessonCpp6 } from './lessonCpp6';
import { lessonCpp7 } from './lessonCpp7';
import { lessonCpp8 } from './lessonCpp8';
import { lessonCpp9 } from './lessonCpp9';
import { lessonCpp10 } from './lessonCpp10';
import { lessonCpp11 } from './lessonCpp11';
import { lessonCpp12 } from './lessonCpp12';
import { lessonCpp13 } from './lessonCpp13';
import { lessonCpp14 } from './lessonCpp14';
import { lessonCpp15 } from './lessonCpp15';
import { lessonCpp16 } from './lessonCpp16';
import { lessonCpp17 } from './lessonCpp17';
import { lessonCpp18 } from './lessonCpp18';
import { lessonCpp19 } from './lessonCpp19';
import { lessonCpp20 } from './lessonCpp20';
import { lessonCppP1 } from './lessonCppP1';
import { lessonCppP2 } from './lessonCppP2';
import { lessonCppP3 } from './lessonCppP3';

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
  // Part 5: 함수
  "32": lesson32,
  "33": lesson33,
  "34": lesson34,
  "35": lesson35,
  "36": lesson36,
  // Part 6: 에러와 파일
  "37": lesson37,
  "38": lesson38,
  "39": lesson39,
  "40": lesson40,
  // Part 7: 클래스
  "41": lesson41,
  // C++ 레슨
  "cpp-1": lessonCpp1,
  "cpp-2": lessonCpp2,
  "cpp-3": lessonCpp3,
  "cpp-4": lessonCpp4,
  "cpp-5": lessonCpp5,
  "cpp-6": lessonCpp6,
  "cpp-7": lessonCpp7,
  "cpp-8": lessonCpp8,
  "cpp-9": lessonCpp9,
  "cpp-10": lessonCpp10,
  "cpp-11": lessonCpp11,
  "cpp-12": lessonCpp12,
  "cpp-13": lessonCpp13,
  "cpp-14": lessonCpp14,
  "cpp-15": lessonCpp15,
  "cpp-16": lessonCpp16,
  "cpp-17": lessonCpp17,
  "cpp-18": lessonCpp18,
  "cpp-19": lessonCpp19,
  "cpp-20": lessonCpp20,
  // C++ 프로젝트
  "cpp-p1": lessonCppP1,
  "cpp-p2": lessonCppP2,
  "cpp-p3": lessonCppP3,
  // 프로젝트
  "p1": createDummyLesson("p1", "미니 계산기"),
  "p2": createDummyLesson("p2", "숫자 맞추기 게임"),
  "p3": createDummyLesson("p3", "Hangman 게임"),
}

export default lessonsData;
