// ============================================================
// 레슨 데이터 타입 정의
// ============================================================

export interface ChapterContent {
  num: number;
  title: string;
  desc: string;
}

export interface ExplainContent {
  lines: string[];
  code?: string;
  result?: string;
  note?: string;
  isPreview?: boolean;
  isError?: boolean;
  // 예측 퀴즈 (결과 보여주기 전에 맞춰보기)
  predict?: {
    question?: string;  // 기본: "결과가 뭘까?"
    options: string[];
    answer: number;
    feedback?: string;  // 틀렸을 때 설명
  };
}

export interface PracticeContent {
  level: number;
  task: string;
  guide?: string;
  hint?: string;
  template: { before: string; after: string } | null;
  answer: string;
  alternateAnswers?: string[];
  expect: string;
}

export interface QuizContent {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface ErrorQuizContent {
  question: string;
  code: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface InterleavingContent {
  message: string;
  task: string;
  hint?: string;
  template: { before: string; after: string } | null;
  answer: string;
  alternateAnswers?: string[];
  expect: string;
}

export interface RewardContent {
  message: string;
  emoji: string;
}

export interface SummaryContent {
  num: number;
  title: string;
  learned: string[];
  canDo: string;
  emoji: string;
}

export interface ProjectContent {
  step: number;
  total: number;
  task: string;
  target: string;
  hint?: string;
  done: string[];
  answer: string;
}

export interface DoneContent {}

// 인터랙티브 애니메이션 컴포넌트
export interface InteractiveContent {
  component: "dataStructures" | "functionBuilder"; // 추후 다른 애니메이션 추가 가능
  title: string;
  description?: string;
}

export type StepContent = 
  | { type: "chapter"; content: ChapterContent }
  | { type: "explain"; content: ExplainContent }
  | { type: "practice"; content: PracticeContent }
  | { type: "quiz"; content: QuizContent }
  | { type: "errorQuiz"; content: ErrorQuizContent }
  | { type: "interleaving"; content: InterleavingContent }
  | { type: "reward"; content: RewardContent }
  | { type: "summary"; content: SummaryContent }
  | { type: "project"; content: ProjectContent }
  | { type: "done"; content: DoneContent }
  | { type: "interactive"; content: InteractiveContent };

export interface LessonData {
  id: string;
  title: string;
  description: string;
  steps: StepContent[];
}

export type LessonsData = Record<string, LessonData>;
