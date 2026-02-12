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
import { lesson15 } from './lesson15';
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
  // 새 레슨들 (복습 모드 준비 중)
  "13": createDummyLesson("13", "반복문 (for)"),
  "14": createDummyLesson("14", "반복문 (while)"),
  "15": lesson15,
  "16": createDummyLesson("16", "리스트 기초"),
  "17": createDummyLesson("17", "리스트와 반복문"),
  "18": createDummyLesson("18", "split()과 join()"),
  "19": createDummyLesson("19", "튜플"),
  "20": createDummyLesson("20", "딕셔너리"),
  "21": createDummyLesson("21", "집합 (set)"),
  "22": createDummyLesson("22", "슬라이싱"),
  "23": createDummyLesson("23", "스택 (Stack)"),
  "24": createDummyLesson("24", "큐 (Queue)"),
  "25": createDummyLesson("25", "덱 (Deque)"),
  "26": createDummyLesson("26", "자료구조 비교와 선택"),
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
