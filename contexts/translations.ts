export const translations = {
  // 공통 UI
  "common.next": { ko: "다음", en: "Next" },
  "common.previous": { ko: "이전", en: "Previous" },
  "common.skip": { ko: "건너뛰기", en: "Skip" },
  "common.close": { ko: "닫기", en: "Close" },
  "common.confirm": { ko: "확인", en: "Confirm" },
  "common.cancel": { ko: "취소", en: "Cancel" },
  "common.exit": { ko: "나가기", en: "Exit" },
  "common.continue": { ko: "계속 하기", en: "Continue" },
  "common.correct": { ko: "정답!", en: "Correct!" },
  "common.wrong": { ko: "틀렸어요", en: "Wrong" },
  "common.loading": { ko: "로딩 중...", en: "Loading..." },

  // 대시보드
  "dashboard.curriculum": { ko: "커리큘럼", en: "Curriculum" },
  "dashboard.quiz": { ko: "퀴즈", en: "Quiz" },
  "dashboard.review": { ko: "복습", en: "Review" },
  "dashboard.progress": { ko: "진도", en: "Progress" },
  "dashboard.analytics": { ko: "분석", en: "Analytics" },
  "dashboard.admin": { ko: "관리", en: "Admin" },

  // 퀴즈
  "quiz.question": { ko: "문제", en: "Question" },
  "quiz.complete": { ko: "완료", en: "Complete" },
  "quiz.remaining": { ko: "남음", en: "remaining" },
  "quiz.reviewPending": { ko: "복습 대기", en: "Review pending" },
  "quiz.tooFast": { ko: "너무 빨리 풀었어요", en: "Too fast!" },
  "quiz.tooFastDesc": { ko: "다시 한번 확인해볼까요?", en: "Let's check again" },
  "quiz.welcomeBack": { ko: "다시 돌아왔네요!", en: "Welcome back!" },
  "quiz.welcomeBackDesc": { ko: "이어서 할까요?", en: "Shall we continue?" },
  "quiz.halfwayTitle": { ko: "절반 왔어요!", en: "Halfway there!" },
  "quiz.halfwayDesc": { ko: "잘하고 있어요!", en: "You're doing great!" },
  "quiz.accuracyRate": { ko: "정답률", en: "accuracy" },
  "quiz.pauseTitle": { ko: "괜찮아요?", en: "Are you okay?" },
  "quiz.pauseDesc": { ko: "너무 어려운가요?", en: "Too hard?" },
  "quiz.lowerDifficulty": { ko: "난이도 낮추기", en: "Lower difficulty" },
  "quiz.takeBreak": { ko: "쉬었다가 하기", en: "Take a break" },
  "quiz.swipeHint": { ko: "좌우로 스와이프하여 이동하세요", en: "Swipe left/right to navigate" },
  "quiz.keyHint": { ko: "1-4 키로 답변 선택", en: "Press 1-4 to select" },

  // 난이도
  "difficulty.easy": { ko: "쉬움", en: "Easy" },
  "difficulty.medium": { ko: "보통", en: "Medium" },
  "difficulty.hard": { ko: "어려움", en: "Hard" },

  // 학습
  "learn.chapter": { ko: "챕터", en: "Chapter" },
  "learn.lesson": { ko: "레슨", en: "Lesson" },
  "learn.tryIt": { ko: "해보기", en: "Try it" },
  "learn.mission": { ko: "미션", en: "Mission" },
  "learn.run": { ko: "실행", en: "Run" },
  "learn.reset": { ko: "초기화", en: "Reset" },
  "learn.hint": { ko: "힌트", en: "Hint" },

  // 설명 패널
  "explanation.reviewTitle": { ko: "함께 다시 볼까요?", en: "Let's review together" },
  "explanation.reviewDesc": { ko: "차근차근 이해해봐요", en: "Let's understand step by step" },
  "explanation.yourAnswer": { ko: "선택한 답", en: "Your answer" },
  "explanation.correctAnswer": { ko: "정답", en: "Correct answer" },
  "explanation.codeComparison": { ko: "코드 비교", en: "Code comparison" },
  "explanation.wrongUnderstanding": { ko: "틀린 이해", en: "Wrong" },
  "explanation.correctUnderstanding": { ko: "올바른 이해", en: "Correct" },
  "explanation.remember": { ko: "기억하세요!", en: "Remember!" },
  "explanation.alsoKnow": { ko: "이것도 알아두세요", en: "Also good to know" },
  "explanation.understood": { ko: "이해했어요, 다음 문제로", en: "Got it, next question" },
  "explanation.willReview": { ko: "비슷한 문제가 나중에 다시 나올 거예요", en: "Similar questions will appear later" },

  // 축하
  "celebration.correct": { ko: "정답!", en: "Correct!" },
  "celebration.streak": { ko: "일 연속!", en: "day streak!" },
} as const

export type TranslationKey = keyof typeof translations
