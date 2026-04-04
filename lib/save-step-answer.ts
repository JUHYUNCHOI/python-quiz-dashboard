/**
 * 레슨 스텝별 답변 저장 (fire-and-forget)
 * 선생님이 학생이 각 스텝을 어떻게 풀었는지 확인할 수 있도록 저장합니다.
 *
 * DB 테이블 (Supabase에서 직접 실행):
 * ─────────────────────────────────────────────────────────────
 * CREATE TABLE IF NOT EXISTS lesson_step_answers (
 *   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
 *   lesson_id text NOT NULL,
 *   progress_type text NOT NULL DEFAULT 'learn',
 *   step_id text NOT NULL,
 *   step_type text NOT NULL,
 *   is_correct boolean NOT NULL,
 *   user_answer jsonb,
 *   correct_answer jsonb,
 *   updated_at timestamptz DEFAULT now() NOT NULL,
 *   created_at timestamptz DEFAULT now() NOT NULL,
 *   CONSTRAINT lesson_step_answers_upsert_key
 *     UNIQUE (user_id, lesson_id, progress_type, step_id)
 * );
 *
 * ALTER TABLE lesson_step_answers ENABLE ROW LEVEL SECURITY;
 *
 * -- 학생 본인 데이터 관리
 * CREATE POLICY "Users can manage their own step answers"
 *   ON lesson_step_answers FOR ALL
 *   USING (auth.uid() = user_id)
 *   WITH CHECK (auth.uid() = user_id);
 *
 * -- 선생님이 자기 반 학생 데이터 조회
 * CREATE POLICY "Teachers can read students step answers"
 *   ON lesson_step_answers FOR SELECT
 *   USING (
 *     EXISTS (
 *       SELECT 1 FROM class_members cm
 *       JOIN classes c ON c.id = cm.class_id
 *       WHERE cm.user_id = lesson_step_answers.user_id
 *         AND c.teacher_id = auth.uid()
 *     )
 *   );
 * ─────────────────────────────────────────────────────────────
 */

export interface StepAnswerData {
  lessonId: string
  progressType: "learn" | "review"
  stepId: string
  stepType: string
  isCorrect: boolean
  /** quiz/predict: { selectedIdx, option } / fillblank: { 0: "값", 1: "값" } */
  userAnswer: Record<string, unknown>
  /** quiz/predict: { selectedIdx, option } / fillblank: { 0: "정답", 1: "정답" } */
  correctAnswer: Record<string, unknown>
}

/**
 * 스텝 답변을 Supabase에 저장합니다 (fire-and-forget — UI 블로킹 없음).
 * 로그인하지 않은 상태면 조용히 스킵합니다.
 */
export function saveStepAnswer(data: StepAnswerData): void {
  import("@/lib/supabase/client")
    .then(({ createClient }) => {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data: authData }) => {
        const user = authData.user
        if (!user) return // 비로그인 → 저장 안 함
        supabase
          .from("lesson_step_answers")
          .upsert(
            {
              user_id: user.id,
              lesson_id: data.lessonId,
              progress_type: data.progressType,
              step_id: data.stepId,
              step_type: data.stepType,
              is_correct: data.isCorrect,
              user_answer: data.userAnswer,
              correct_answer: data.correctAnswer,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id,lesson_id,progress_type,step_id" }
          )
          .then(({ error }) => {
            if (error) console.error("[saveStepAnswer] upsert failed:", error.message)
          })
      })
    })
    .catch(() => {}) // import 실패 시 조용히 무시
}
